#!/usr/bin/env python3
"""Crea la carpeta del documento de diseño a partir de las plantillas de la skill.

Uso:  python3 scaffold.py <carpeta-destino> --name "Nombre" [--lang es] [--force]

Copia assets/template/ (index.html, doc.css, doc.js, ui.css, icons.js, scenes.js, tokens.json, tools/),
sustituye {{NAME}}, {{LANG}}, {{DATE}} y {{INITIAL}}, y genera tokens.css y tokens.js.
No sobrescribe una carpeta con contenido salvo con --force.
"""
import argparse
import datetime
import pathlib
import shutil
import subprocess
import sys

TEMPLATE = pathlib.Path(__file__).resolve().parent.parent / "assets" / "template"
MONTHS = {"es": ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"]}


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("dest")
    ap.add_argument("--name", required=True)
    ap.add_argument("--lang", default="es")
    ap.add_argument("--force", action="store_true")
    a = ap.parse_args()

    dest = pathlib.Path(a.dest).expanduser().resolve()
    if dest.exists() and any(dest.iterdir()) and not a.force:
        sys.exit(f"{dest} ya tiene contenido. Usa --force para sobrescribir las plantillas (tus archivos extra se conservan).")
    dest.mkdir(parents=True, exist_ok=True)
    shutil.copytree(TEMPLATE, dest, dirs_exist_ok=True)

    today = datetime.date.today()
    date = f"{today.day} {MONTHS[a.lang][today.month - 1]} {today.year}" if a.lang in MONTHS else today.isoformat()
    subs = {"{{NAME}}": a.name, "{{LANG}}": a.lang, "{{DATE}}": date, "{{INITIAL}}": a.name.strip()[:1].upper()}
    for f in ("index.html", "tokens.json", "scenes.js"):
        p = dest / f
        s = p.read_text()
        for k, v in subs.items():
            s = s.replace(k, v)
        p.write_text(s)

    subprocess.run([sys.executable, str(dest / "tools" / "build_tokens.py")], check=True)
    print(f"Documento de diseño creado en {dest}")
    print(f"  Abrir:      python3 -m http.server --directory {dest}  (o abrir index.html)")
    print(f"  Comprobar:  python3 {dest / 'tools' / 'check.py'}")


if __name__ == "__main__":
    main()
