#!/usr/bin/env python3
"""Comprobaciones del documento de diseño.

Uso:  python3 tools/check.py            (comprobaciones locales)
      python3 tools/check.py --w3c      (además valida los ejemplos en validator.w3.org; envía su HTML a ese servicio)

0. Huecos «⟨…⟩» de la plantilla sin rellenar.
1. Estructura: etiquetas equilibradas en index.html.
2. Tabla de estados (table#matrix): sin celdas vacías; cada «N/A» explica por qué.
3. Contraste: los pares de tokens.json → $extensions.doc.contrast en todos los temas, y las etiquetas de categoría si se configuran.
4. ID y enlaces: ID únicos, enlaces internos que existen, pantallas S-01…S-NN seguidas y sin huecos.
5. Ejemplos de salida (ejemplo/*.html): sin recursos externos, lang, un único h1, títulos en orden, alt en imágenes.
Sale con código 1 si algo falla.
"""
import json
import pathlib
import re
import sys
import urllib.parse
import urllib.request
from html.parser import HTMLParser

ROOT = pathlib.Path(__file__).resolve().parent.parent
DOC, TOKENS, EXAMPLES = ROOT / "index.html", ROOT / "tokens.json", sorted((ROOT / "ejemplo").glob("*.html"))
VOID = {"area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "source", "track", "wbr"}
SVG_VOID = {"path", "circle", "rect", "stop", "use", "ellipse", "line", "polyline", "polygon"}
results = []


def report(name, ok, detail):
    results.append(ok)
    print(f"[{'OK' if ok else 'FALLA'}] {name}: {detail}")


# ---------------------------------------------------------------- estructura
class Structure(HTMLParser):
    def __init__(self):
        super().__init__()
        self.stack, self.errors, self.headings, self.external = [], [], [], []
        self.lang, self.imgs_no_alt = None, 0

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == "html":
            self.lang = a.get("lang")
        if re.fullmatch(r"h[1-6]", tag):
            self.headings.append(int(tag[1]))
        if tag == "img" and not a.get("alt"):
            self.imgs_no_alt += 1
        for k in ("src", "href", "poster", "data"):
            if re.match(r"(https?:)?//", a.get(k) or ""):
                self.external.append(a[k])
        if tag not in VOID and tag not in SVG_VOID:
            self.stack.append(tag)

    def handle_startendtag(self, tag, attrs):
        self.handle_starttag(tag, attrs)
        if tag not in VOID and tag not in SVG_VOID and self.stack and self.stack[-1] == tag:
            self.stack.pop()

    def handle_endtag(self, tag):
        if tag in VOID or tag in SVG_VOID:
            return
        if self.stack and self.stack[-1] == tag:
            self.stack.pop()
        else:
            self.errors.append(f"</{tag}> inesperado (abierto: {self.stack[-1] if self.stack else 'nada'})")


def check_placeholders(html):
    body = html.split("<body>", 1)[-1]
    import re as _re
    body = _re.sub(r"<!--.*?-->", "", body, flags=_re.S)
    holes = _re.findall(r"⟨[^⟩]{0,60}⟩", body)
    report("Huecos de plantilla", not holes, "ninguno" if not holes else f"{len(holes)} sin rellenar, p. ej. {holes[:3]}")


def check_structure(html):
    p = Structure(); p.feed(html)
    ok = not p.errors and not p.stack
    report("Estructura", ok, "etiquetas equilibradas" if ok else "; ".join(p.errors[:3] + ([f"sin cerrar {p.stack[-3:]}"] if p.stack else [])))


# ---------------------------------------------------------------- tabla de estados
class Matrix(HTMLParser):
    def __init__(self):
        super().__init__()
        self.inside, self.row, self.cell, self.in_th = False, None, None, False
        self.rows, self.headers = [], []

    def handle_starttag(self, tag, attrs):
        if tag == "table" and dict(attrs).get("id") == "matrix":
            self.inside = True
        if not self.inside:
            return
        if tag == "tr":
            self.row = []
        elif tag in ("td", "th"):
            self.cell, self.in_th = "", tag == "th"

    def handle_endtag(self, tag):
        if not self.inside:
            return
        if tag in ("td", "th") and self.cell is not None:
            (self.headers if self.in_th else self.row).append(self.cell.strip())
            self.cell = None
        elif tag == "tr" and self.row:
            self.rows.append(self.row); self.row = None
        elif tag == "table":
            self.inside = False

    def handle_data(self, data):
        if self.inside and self.cell is not None:
            self.cell += data


def check_matrix(html):
    p = Matrix(); p.feed(html)
    cols, problems = len(p.headers), []
    if not p.rows:
        problems.append("no hay table#matrix o no tiene filas")
    for row in p.rows:
        if len(row) != cols:
            problems.append(f"{row[0] if row else '?'}: {len(row)} celdas en vez de {cols}")
        for i, c in enumerate(row[1:], 1):
            col = p.headers[i] if i < cols else f"columna {i}"
            if not c:
                problems.append(f"{row[0]} × {col}: vacía")
            elif c.upper().startswith("N/A") and len(re.sub(r"^N/A:?\s*", "", c, flags=re.I)) < 6:
                problems.append(f"{row[0]} × {col}: N/A sin motivo")
    report("Tabla de estados", not problems,
           f"{len(p.rows)} objetos × {cols - 1} estados = {len(p.rows) * (cols - 1)} celdas con respuesta" if not problems else "; ".join(problems[:12]))


# ---------------------------------------------------------------- contraste
def lum(h):
    h = h.lstrip("#")[:6]
    c = [int(h[i:i + 2], 16) / 255 for i in (0, 2, 4)]
    c = [v / 12.92 if v <= 0.03928 else ((v + 0.055) / 1.055) ** 2.4 for v in c]
    return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]


def ratio(a, b):
    x, y = lum(a), lum(b)
    return (max(x, y) + 0.05) / (min(x, y) + 0.05)


def mix(a, b, t):
    a, b = a.lstrip("#"), b.lstrip("#")
    return "#" + "".join(f"{round(int(a[i:i+2], 16) * t + int(b[i:i+2], 16) * (1 - t)):02x}" for i in (0, 2, 4))


def check_contrast():
    data = json.loads(TOKENS.read_text())
    cfg = data.get("$extensions", {}).get("doc", {})
    colors = data["color"]
    themes = ["claro"] + cfg.get("themes", [])
    fails, n = [], 0

    def val(path, theme):
        node = colors
        for k in path.split("."):
            node = node[k]
        if theme != "claro":
            return node.get("$extensions", {}).get("mode", {}).get(theme, node["$value"])
        return node["$value"]

    for theme in themes:
        for f, b, m in cfg.get("contrast", []):
            try:
                fv, bv = val(f, theme), val(b, theme)
            except KeyError as e:
                fails.append(f"token inexistente {e}"); continue
            if not (fv.startswith("#") and bv.startswith("#")):
                fails.append(f"{f}/{b}: solo se comprueban colores hex opacos"); continue
            r = ratio(fv, bv); n += 1
            if r < m:
                fails.append(f"{f} sobre {b} ({theme}) {r:.2f} < {m}")
        cat = cfg.get("categoryCheck")
        if cat and cat.get("group") in colors:
            (lt, lref), (bt, bref) = cat["label"], cat["background"]
            for name, c in colors[cat["group"]].items():
                if name.startswith("$"):
                    continue
                label, bg = mix(c["$value"], val(lref, theme), lt), mix(c["$value"], val(bref, theme), bt)
                r = ratio(label, bg); n += 1
                if r < cat.get("min", 4.5):
                    fails.append(f"etiqueta de {cat['group']}.{name} ({theme}) {r:.2f}")
    report("Contraste", not fails and n > 0, f"{n} pares en {len(themes)} temas, todos pasan" if not fails else "; ".join(fails))


# ---------------------------------------------------------------- ID y enlaces
def check_ids(html):
    ids = re.findall(r'\sid="([^"]+)"', html)
    dup = sorted({i for i in ids if ids.count(i) > 1})
    hrefs = set(re.findall(r'href="#([^"]+)"', html))
    missing = sorted(h for h in hrefs if h not in ids)
    nums = sorted(int(i[2:]) for i in ids if re.fullmatch(r"S-\d+", i))
    gaps = [f"S-{k:02d}" for k in range(1, (nums[-1] if nums else 0) + 1) if k not in nums]
    cited = set(re.findall(r">(S-\d+)<", html))
    bad = sorted(c for c in cited if c not in ids)
    ok = not (dup or missing or gaps or bad) and nums
    report("ID y enlaces", bool(ok),
           f"{len(ids)} ID únicos, {len(hrefs)} enlaces internos, {len(nums)} pantallas seguidas" if ok else
           f"duplicados {dup} · enlaces rotos {missing} · huecos en pantallas {gaps} · citas sin destino {bad}" + ("" if nums else " · no hay pantallas S-xx"))


# ---------------------------------------------------------------- ejemplos de salida
def check_examples(w3c):
    if not EXAMPLES:
        print("[--] Ejemplos de salida: no hay ejemplo/*.html (solo hace falta si el producto entrega HTML a terceros)")
        return
    for ex in EXAMPLES:
        html = ex.read_text()
        p = Structure(); p.feed(html)
        css_urls = [u for u in re.findall(r"url\(([^)]+)\)", urllib.parse.unquote(html)) if not u.strip("'\" ").startswith(("data:", "#"))]
        probs = []
        if p.external or css_urls or "@import" in html:
            probs.append(f"recursos externos: {(p.external + css_urls)[:3]}")
        if not p.lang:
            probs.append("falta lang")
        if p.headings.count(1) != 1:
            probs.append(f"{p.headings.count(1)} h1")
        probs += [f"salto h{a}→h{b}" for a, b in zip(p.headings, p.headings[1:]) if b > a + 1]
        if p.imgs_no_alt:
            probs.append(f"{p.imgs_no_alt} imágenes sin alt")
        if p.errors or p.stack:
            probs.append("etiquetas desequilibradas")
        report(f"Ejemplo {ex.name}", not probs, "autocontenido, lang, un h1, títulos en orden, alt" if not probs else "; ".join(probs))
        if w3c:
            req = urllib.request.Request("https://validator.w3.org/nu/?out=json", data=html.encode(),
                                         headers={"Content-Type": "text/html; charset=utf-8", "User-Agent": "design-doc-check/1.0"})
            try:
                msgs = json.load(urllib.request.urlopen(req, timeout=30)).get("messages", [])
                errs = [m for m in msgs if m.get("type") == "error"]
                report(f"W3C {ex.name}", not errs, "0 errores" if not errs else "; ".join(f"l.{m.get('lastLine')}: {m['message']}" for m in errs[:4]))
            except Exception as e:
                report(f"W3C {ex.name}", False, f"no se pudo contactar con el validador ({e})")


if __name__ == "__main__":
    doc = DOC.read_text()
    check_placeholders(doc)
    check_structure(doc)
    check_matrix(doc)
    check_contrast()
    check_ids(doc)
    check_examples("--w3c" in sys.argv)
    sys.exit(0 if all(results) else 1)
