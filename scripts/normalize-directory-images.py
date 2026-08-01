import json
from pathlib import Path

from PIL import Image, ImageOps


ROOT = Path(__file__).resolve().parents[1]
MANIFEST_PATH = ROOT / "data" / "brand-image-manifest.json"
IMAGE_DIR = ROOT / "public" / "images" / "directory"

manifest = json.loads(MANIFEST_PATH.read_text(encoding="utf-8"))
converted = 0

for entry in manifest.values():
    image_path = entry.get("imagePath")
    if not image_path or not image_path.startswith("/images/directory/"):
        continue

    source = ROOT / "public" / image_path.lstrip("/")
    destination = IMAGE_DIR / f"{entry['id']}.webp"
    with Image.open(source) as opened:
        image = ImageOps.exif_transpose(opened)
        if image.mode in ("RGBA", "LA") or (image.mode == "P" and "transparency" in image.info):
            rgba = image.convert("RGBA")
            background = Image.new("RGBA", rgba.size, "white")
            image = Image.alpha_composite(background, rgba).convert("RGB")
        else:
            image = image.convert("RGB")
        image.thumbnail((1000, 1000), Image.Resampling.LANCZOS)
        image.save(destination, "WEBP", quality=84, method=6)

    if source != destination and source.exists():
        source.unlink()
    entry["imagePath"] = f"/images/directory/{entry['id']}.webp"
    entry["bytes"] = destination.stat().st_size
    converted += 1

MANIFEST_PATH.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
referenced_files = {
    Path(entry["imagePath"]).name
    for entry in manifest.values()
    if (entry.get("imagePath") or "").startswith("/images/directory/")
}
removed = 0
for candidate in IMAGE_DIR.iterdir():
    if candidate.is_file() and candidate.name not in referenced_files:
        candidate.unlink()
        removed += 1

print(f"{converted} images normalisées en WebP, {removed} fichiers orphelins supprimés.")
