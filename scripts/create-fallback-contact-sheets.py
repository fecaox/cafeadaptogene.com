import json
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageOps

ROOT = Path("/private/tmp/cafeadaptogene-fallback-candidates")
REPORT = json.loads((ROOT / "report.json").read_text())
ITEMS = list(REPORT.items())
COLS, ROWS_PER_PAGE = 6, 5
CELL_W, IMAGE_H, LABEL_H = 185, 145, 58
FONT = ImageFont.load_default()

for page_start in range(0, len(ITEMS), ROWS_PER_PAGE):
    rows = ITEMS[page_start:page_start + ROWS_PER_PAGE]
    sheet = Image.new("RGB", (COLS * CELL_W, len(rows) * (IMAGE_H + LABEL_H)), "#f5f0e7")
    draw = ImageDraw.Draw(sheet)
    for row_index, (item_id, item) in enumerate(rows):
        for column_index in range(COLS):
            x = column_index * CELL_W
            y = row_index * (IMAGE_H + LABEL_H)
            candidate = item["candidates"][column_index] if column_index < len(item["candidates"]) else None
            if candidate:
                source = ROOT / item_id / candidate["destination"]
                try:
                    image = Image.open(source).convert("RGB")
                    image = ImageOps.contain(image, (CELL_W - 12, IMAGE_H - 12))
                    tile = Image.new("RGB", (CELL_W, IMAGE_H), "white")
                    tile.paste(image, ((CELL_W - image.width) // 2, (IMAGE_H - image.height) // 2))
                    sheet.paste(tile, (x, y))
                except Exception as error:
                    draw.rectangle((x, y, x + CELL_W, y + IMAGE_H), fill="#eadacb")
                    draw.text((x + 6, y + 6), str(error)[:35], fill="#662718", font=FONT)
            label = f"{page_start + row_index + 1:02d}.{column_index + 1} {item['brand']}\n{item['product']}"
            draw.multiline_text((x + 5, y + IMAGE_H + 4), label[:80], fill="#171512", font=FONT, spacing=2)
            draw.rectangle((x, y, x + CELL_W - 1, y + IMAGE_H + LABEL_H - 1), outline="#c8beb0")
    output = Path(f"/private/tmp/cafeadaptogene-fallback-qa-{page_start // ROWS_PER_PAGE + 1}.jpg")
    sheet.save(output, quality=88)
    print(output)
