#!/usr/bin/env python3
"""Normalize \\uXXXX JS escapes -> real UTF-8 chars in frontend/src.

Root cause of the bug: \\uXXXX written into JSX attribute values or JSX text
nodes is NOT interpreted by JSX (only by JS string literals), so it renders
literally on screen (e.g. "headquarters\\u2026"). Converting to the real glyph
fixes the JSX render and is a semantic no-op inside JS string literals.

Safety rules:
- Only convert codepoints >= 0x00A0 (skip ASCII/control -> never touches regex
  control ranges, \\n, \\t, etc.).
- Combine valid UTF-16 surrogate PAIRS (\\uD8xx\\uDCxx) into one astral char
  (emoji/flags). NEVER emit a lone surrogate (would corrupt UTF-8).
- Leave a lone/unpaired surrogate escape untouched.
- Skip files that already contain a literal double-backslash escape (none exist,
  but guard anyway).

Usage:  python3 normalize_unicode_escapes.py [--apply]
Default is dry-run (reports only).
"""
import os, re, sys

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "frontend", "src")
APPLY = "--apply" in sys.argv

ESC = re.compile(r'\\u([0-9a-fA-F]{4})')

def transform(txt):
    n = len(txt)
    out = []
    i = 0
    count = 0
    while i < n:
        m = ESC.match(txt, i)
        if not m:
            out.append(txt[i]); i += 1; continue
        cp = int(m.group(1), 16)
        # high surrogate? try to pair with following low surrogate escape
        if 0xD800 <= cp <= 0xDBFF:
            m2 = ESC.match(txt, m.end())
            if m2:
                lo = int(m2.group(1), 16)
                if 0xDC00 <= lo <= 0xDFFF:
                    astral = 0x10000 + ((cp - 0xD800) << 10) + (lo - 0xDC00)
                    out.append(chr(astral)); i = m2.end(); count += 1; continue
            # unpaired high surrogate -> leave untouched
            out.append(txt[i:m.end()]); i = m.end(); continue
        if 0xDC00 <= cp <= 0xDFFF:
            # lone low surrogate -> leave untouched
            out.append(txt[i:m.end()]); i = m.end(); continue
        if cp >= 0x00A0:
            out.append(chr(cp)); i = m.end(); count += 1; continue
        # ASCII / control -> leave untouched
        out.append(txt[i:m.end()]); i = m.end()
    return "".join(out), count

def main():
    total = 0; files = 0
    for root, _, fs in os.walk(ROOT):
        for fn in fs:
            if not fn.endswith((".js", ".jsx", ".ts", ".tsx")):
                continue
            p = os.path.join(root, fn)
            txt = open(p, encoding="utf-8").read()
            if "\\\\u" in txt:   # literal double-backslash -> skip (none expected)
                print("SKIP (double-escape present):", p); continue
            new, c = transform(txt)
            if c:
                files += 1; total += c
                print(f"{c:5d}  {os.path.relpath(p, ROOT)}")
                if APPLY:
                    open(p, "w", encoding="utf-8").write(new)
    print(f"\n{'APPLIED' if APPLY else 'DRY-RUN'}: {total} replacements across {files} files")

if __name__ == "__main__":
    main()
