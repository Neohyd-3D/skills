#!/usr/bin/env python3
"""Genera tokens.css y tokens.js a partir de tokens.json (formato W3C DTCG).

Uso:  python3 tools/build_tokens.py      (desde la carpeta de diseño o cualquier otra)

Temas: el valor base es el tema claro. Cada tema adicional se declara en
$extensions.doc.themes (por ejemplo ["dark"]) y su valor va en $extensions.mode.<tema> de cada token.
«dark» se activa con prefers-color-scheme y con [data-theme="dark"]; los demás, solo con [data-theme="<tema>"].
"""
import json
import pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent
SRC, CSS, JS = ROOT / "tokens.json", ROOT / "tokens.css", ROOT / "tokens.js"

# Ruta del token → prefijo de la variable CSS
PREFIX = {
    ("font",): "font",
    ("color",): "",
    ("size", "text"): "text",
    ("size", "space"): "space",
    ("size", "radius"): "radius",
    ("size", "control"): "control",
    ("shadow",): "shadow",
    ("motion", "duration"): "dur",
    ("motion", "ease"): "ease",
    ("layer",): "z",
}


def var_name(path):
    if path == ["font", "sans"]:
        return "--font"
    for n in range(len(path), 0, -1):
        key = tuple(path[:n])
        if key in PREFIX:
            parts = ([PREFIX[key]] if PREFIX[key] else []) + path[n:]
            return "--" + "-".join(parts)
    return "--" + "-".join(path)


def fmt(value, typ):
    if value is None:
        return None
    if typ == "fontFamily" and isinstance(value, list):
        return ", ".join(f'"{v}"' if " " in v else v for v in value)
    if typ == "cubicBezier":
        return "cubic-bezier(" + ", ".join(str(v) for v in value) + ")"
    return str(value)


def walk(node, path, typ, out):
    typ = node.get("$type", typ)
    if "$value" in node:
        modes = node.get("$extensions", {}).get("mode", {})
        out.append((var_name(path), fmt(node["$value"], typ), {k: fmt(v, typ) for k, v in modes.items()}))
        return
    for k, v in node.items():
        if not k.startswith("$") and isinstance(v, dict):
            walk(v, path + [k], typ, out)


def block(tokens, theme, indent):
    pad = " " * indent
    return "\n".join(f"{pad}{n}: {m[theme]};" for n, _, m in tokens if theme in m)


def main():
    data = json.loads(SRC.read_text())
    themes = data.get("$extensions", {}).get("doc", {}).get("themes", ["dark"])
    tokens = []
    walk(data, [], None, tokens)
    light = "\n".join(f"  {n}: {v};" for n, v, _ in tokens)
    css = [f"/* GENERADO por tools/build_tokens.py desde tokens.json. No editar a mano. */\n:root {{\n{light}\n  color-scheme: light;\n}}"]
    for t in themes:
        scheme = "dark" if t == "dark" else "light"
        if t == "dark":
            css.append(f'@media (prefers-color-scheme: dark) {{\n  :root:not([data-theme="light"]) {{\n{block(tokens, t, 4)}\n    color-scheme: dark;\n  }}\n}}')
        css.append(f':root[data-theme="{t}"] {{\n{block(tokens, t, 2)}\n  color-scheme: {scheme};\n}}')
    css.append("@media (prefers-reduced-motion: reduce) {\n  :root { --dur-fast: 0ms; --dur-base: 0ms; --dur-slow: 0ms; }\n}\n")
    CSS.write_text("\n".join(css))
    JS.write_text("/* GENERADO por tools/build_tokens.py. No editar a mano. */\nwindow.DOC_TOKENS = "
                  + json.dumps(data, ensure_ascii=False) + ";\n")
    print(f"{len(tokens)} tokens · temas: claro + {', '.join(themes) or 'ninguno'} → tokens.css, tokens.js")


if __name__ == "__main__":
    main()
