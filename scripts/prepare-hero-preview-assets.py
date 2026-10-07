"""Encode existing generated PNGs as WebP; no cropping, retouching or resizing."""
from pathlib import Path
import argparse
from PIL import Image

root = Path(__file__).resolve().parents[1]
parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument("--source-dir", default="output/hero-video-v1")
parser.add_argument("--target-dir", default="public/static/hero-preview-v1")
parser.add_argument("--expected-count", type=int, default=6)
args = parser.parse_args()
source_dir = root / args.source_dir
target_dir = root / args.target_dir
target_dir.mkdir(parents=True, exist_ok=True)
sources = sorted(source_dir.glob("*.png"))
if len(sources) != args.expected_count:
    raise SystemExit(f"Expected {args.expected_count} source images, found {len(sources)}")
for source in sources:
    target = target_dir / f"{source.stem}.webp"
    if target.exists():
        raise SystemExit(f"Refusing to overwrite existing asset: {target}")
    with Image.open(source) as image:
        image.save(target, "WEBP", quality=86, method=6)
        print(f"{target.name}: {image.width}x{image.height}, {target.stat().st_size} bytes")
