"""Downscale generated 3D icons to alpha-preserving web assets (no creative edits)."""

import argparse
import json
from pathlib import Path

from PIL import Image


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("sources", nargs="+", help="service-key=absolute-source-png")
    args = parser.parse_args()
    target = Path(__file__).resolve().parents[1] / "public" / "static" / "service-icons-v2"
    target.mkdir(parents=True, exist_ok=True)
    known = {"viral", "performance", "influencer", "seeding", "review", "oliveyoung", "ppl"}
    report = []
    for source_arg in args.sources:
        key, source = source_arg.split("=", 1)
        if key not in known:
            raise ValueError(f"Unknown service key: {key}")
        with Image.open(source) as image:
            if "A" not in image.getbands():
                raise ValueError(f"{key}: generated asset has no alpha channel")
            rgba = image.convert("RGBA")
            if rgba.width != rgba.height:
                raise ValueError(f"{key}: service artwork must be square")
            alpha = rgba.getchannel("A")
            if alpha.getextrema() != (0, 255):
                raise ValueError(f"{key}: transparent background was not preserved")
            if any(alpha.getpixel(p) for p in [(0, 0), (rgba.width - 1, 0), (0, rgba.height - 1), (rgba.width - 1, rgba.height - 1)]):
                raise ValueError(f"{key}: image corners should be transparent")
            rgba.thumbnail((1024, 1024), Image.Resampling.LANCZOS)
            destination = target / f"{key}.webp"
            rgba.save(destination, "WEBP", quality=92, method=6, alpha_quality=100, exact=True)
        with Image.open(destination) as saved:
            assert "A" in saved.getbands(), f"{key}: optimized file lost alpha"
            assert saved.getchannel("A").getextrema() == (0, 255)
            report.append({"service": key, "path": str(destination), "size": list(saved.size), "bytes": destination.stat().st_size, "alpha_bbox": saved.getchannel("A").getbbox()})
    print(json.dumps(report, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
