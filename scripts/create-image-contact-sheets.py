import json
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageOps

ROOT = Path(__file__).resolve().parent.parent
MANIFEST = json.loads((ROOT / "data" / "brand-image-manifest.json").read_text())
ITEMS = [item for item in MANIFEST.values() if item.get("imagePath")]
THUMB_W, THUMB_H, LABEL_H = 190, 170, 52
COLS, ROWS = 5, 5
FONT = ImageFont.load_default()

for page_index in range(0, len(ITEMS), COLS * ROWS):
    subset = ITEMS[page_index:page_index + COLS * ROWS]
    sheet = Image.new("RGB", (COLS * THUMB_W, ROWS * (THUMB_H + LABEL_H)), "#f5f0e7")
    draw = ImageDraw.Draw(sheet)
    for local_index, item in enumerate(subset):
        x = (local_index % COLS) * THUMB_W
        y = (local_index // COLS) * (THUMB_H + LABEL_H)
        source = ROOT / "public" / item["imagePath"].lstrip("/").replace("images/", "images/", 1)
        try:
            image = Image.open(source).convert("RGB")
            image = ImageOps.contain(image, (THUMB_W - 16, THUMB_H - 16))
            tile = Image.new("RGB", (THUMB_W, THUMB_H), "white")
            tile.paste(image, ((THUMB_W - image.width) // 2, (THUMB_H - image.height) // 2))
            sheet.paste(tile, (x, y))
        except Exception as error:
            draw.rectangle((x, y, x + THUMB_W, y + THUMB_H), fill="#eadacb")
            draw.text((x + 8, y + 8), str(error)[:45], fill="#662718", font=FONT)
        number = page_index + local_index + 1
        label = f"{number:03d} {item['brand']}\n{item['product']}"
        draw.multiline_text((x + 6, y + THUMB_H + 5), label[:75], fill="#171512", font=FONT, spacing=2)
        draw.rectangle((x, y, x + THUMB_W - 1, y + THUMB_H + LABEL_H - 1), outline="#c8beb0")
    output = Path(f"/private/tmp/cafeadaptogene-image-qa-{page_index // (COLS * ROWS) + 1}.jpg")
    sheet.save(output, quality=88)
    print(output)
