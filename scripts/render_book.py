"""Render the portfolio's public PDF as WebP pages for the flip reader.

Requires PyMuPDF and Pillow. Run from the repository root:
    python scripts/render_book.py
"""

from pathlib import Path

import fitz
from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "public" / "files" / "Actually-Faster-Complete-Book.pdf"
DESTINATION = ROOT / "public" / "book-full"
SCALE = 2.5


def main() -> None:
    DESTINATION.mkdir(parents=True, exist_ok=True)
    document = fitz.open(SOURCE)
    for index, page in enumerate(document):
        output = DESTINATION / f"page-{index + 1:03d}.webp"
        pixmap = page.get_pixmap(matrix=fitz.Matrix(SCALE, SCALE), alpha=False)
        image = Image.frombytes("RGB", (pixmap.width, pixmap.height), pixmap.samples)
        image.save(output, "WEBP", quality=83, method=5)
        if (index + 1) % 25 == 0 or index + 1 == len(document):
            print(f"Rendered {index + 1}/{len(document)} pages")


if __name__ == "__main__":
    main()
