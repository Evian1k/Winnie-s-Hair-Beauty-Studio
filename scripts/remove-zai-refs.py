#!/usr/bin/env python3
"""
Replace all sfile.chatglm.cn image URLs with local /images/*.svg paths.
Also removes z-ai-web-dev-sdk from package.json and cleans next.config.ts.
"""
import os
import re
import json

PROJECT = "/home/z/my-project"

# Mapping: old Z.ai image hash → local SVG placeholder
URL_MAP = {
    # Salon interiors
    "12a31a152fe9.jpg": "/images/salon-interior.svg",
    "7a5d8b07bb8c.jpeg": "/images/salon-stations.svg",
    "cab219cbd04b.jpg": "/images/salon-reception.svg",
    "06a25c33f3d9.png": "/images/salon-interior.svg",
    "d0f0d8bd1344.jpg": "/images/salon-products.svg",

    # Hair services
    "74ac5010ae4a.jpg": "/images/hair-styling.svg",
    "44a43fcb3aa2.jpg": "/images/hair-treatment.svg",
    "1cdec30d3ac9.jpg": "/images/braiding.svg",
    "ec6648e539c4.webp": "/images/natural-hair.svg",
    "6655e75c93bc.jpg": "/images/hair-coloring.svg",
    "7ed4a1aba38a.jpg": "/images/hair-wash.svg",
    "f5c2c459a4e1.jpeg": "/images/hair-coloring.svg",
    "f2b02279fc27.jpeg": "/images/hair-coloring.svg",
    "09d1c5628518.jpg": "/images/hair-coloring.svg",
    "989c9a78c9a0.jpg": "/images/hair-coloring.svg",

    # Nail services
    "b2dc2e1dafda.jpg": "/images/manicure.svg",
    "006b28763775.jpg": "/images/pedicure.svg",
    "13d3a950c249.jpg": "/images/gel-polish.svg",
    "bc0fc36754b1.jpg": "/images/acrylic-nails.svg",
    "5c9ad7358a16.jpg": "/images/nude-nails.svg",
    "2a402f9fe773.jpg": "/images/gel-polish.svg",

    # Beauty services
    "04784dfeae4d.jpg": "/images/makeup.svg",
    "eebb3f44105e.jpg": "/images/eyebrows.svg",
    "2c284b29b962.jpg": "/images/eyelashes.svg",
    "7eefed5d5d7d.jpg": "/images/facial.svg",
    "299e93bd86bb.jpg": "/images/spa-glow.svg",
    "a861d31ab00d.jpg": "/images/brightening.svg",
    "9c150cff485c.jpg": "/images/massage.svg",
    "f6637fe36eeb.jpg": "/images/spa-glow.svg",
    "d68a7d2ea1e2.jpg": "/images/makeup.svg",
    "73ef1380e6c9.jpg": "/images/makeup.svg",
    "e35e57058017.jpg": "/images/makeup.svg",

    # Team members
    "df0444e28785.jpg": "/images/team-winnie.svg",
    "04a2300f6c3d.png": "/images/team-grace.svg",
    "0eac04c19266.jpg": "/images/team-lucy.svg",
    "aabe1c4dc6ba.jpg": "/images/team-amina.svg",
    "795ee4ca683a.jpg": "/images/team-grace.svg",

    # Testimonial avatars
    "9d42851274ef.jpg": "/images/testimonial-1.svg",
    "94ec56f8fe9c.jpg": "/images/testimonial-2.svg",
    "87c0034ed79d.jpg": "/images/testimonial-3.svg",
    "5140c1a76725.jpg": "/images/testimonial-4.svg",
    "720409d7c7ab.jpg": "/images/testimonial-5.svg",
    "aab1d0f5caa5.jpg": "/images/testimonial-6.svg",
    "40d6b26a9c0d.jpg": "/images/testimonial-7.svg",
    "d12f07da2d15.jpg": "/images/testimonial-8.svg",
}


def replace_in_file(filepath: str) -> int:
    """Replace all Z.ai URLs in a file. Returns count of replacements."""
    try:
        with open(filepath, "r", encoding="utf-8") as f:
            content = f.read()
    except Exception:
        return 0

    original = content
    count = 0

    for old_hash, new_path in URL_MAP.items():
        # Match full URL pattern: https://sfile.chatglm.cn/images-ppt/<hash>
        old_url = f"https://sfile.chatglm.cn/images-ppt/{old_hash}"
        if old_url in content:
            count += content.count(old_url)
            content = content.replace(old_url, new_path)

    # Also catch any remaining sfile.chatglm.cn URLs not in the map
    # (replace with a generic salon placeholder)
    remaining = re.findall(r'https://sfile\.chatglm\.cn/images-ppt/[^\s"\'\\)]+', content)
    for url in remaining:
        content = content.replace(url, "/images/salon-interior.svg")
        count += 1

    if content != original:
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(content)

    return count


def clean_next_config():
    """Remove sfile.chatglm.cn hostname from next.config.ts."""
    filepath = os.path.join(PROJECT, "next.config.ts")
    with open(filepath, "r") as f:
        content = f.read()

    # Replace the chatglm hostname entry with nothing (local images don't need it)
    content = content.replace(
        """      {
        protocol: "https",
        hostname: "sfile.chatglm.cn",
        pathname: "/images-ppt/**",
      },
""", ""
    )

    with open(filepath, "w") as f:
        f.write(content)
    print(f"  ✓ Cleaned next.config.ts (removed chatglm hostname)")


def clean_package_json():
    """Remove z-ai-web-dev-sdk from package.json."""
    filepath = os.path.join(PROJECT, "package.json")
    with open(filepath, "r") as f:
        data = json.load(f)

    if "z-ai-web-dev-sdk" in data.get("dependencies", {}):
        del data["dependencies"]["z-ai-web-dev-sdk"]
        with open(filepath, "w") as f:
            json.dump(data, f, indent=2)
            f.write("\n")
        print(f"  ✓ Removed z-ai-web-dev-sdk from package.json")
    else:
        print(f"  - z-ai-web-dev-sdk not found in package.json (already clean)")


def clean_deployment_md():
    """Remove sfile.chatglm.cn mentions from DEPLOYMENT.md."""
    filepath = os.path.join(PROJECT, "DEPLOYMENT.md")
    with open(filepath, "r") as f:
        content = f.read()

    # Replace the specific mentions
    content = content.replace(
        "Replace the `https://sfile.chatglm.cn/...` URLs in the `GALLERY`, `PORTFOLIO`, `SERVICES`, and `STYLISTS` arrays with your real Cloudinary URLs",
        "Replace the `/images/*.svg` placeholder paths in the `GALLERY`, `PORTFOLIO`, `SERVICES`, and `STYLISTS` arrays with your real Cloudinary URLs"
    )
    content = content.replace(
        "The demo images are hosted on `sfile.chatglm.cn` — make sure your network allows this",
        "The demo images are local SVG placeholders in `/public/images/` — no network dependency"
    )
    content = content.replace(
        "For production, replace demo images with your own Cloudinary URLs (see section 4)",
        "For production, replace the SVG placeholders with your own Cloudinary URLs (see section 4)"
    )

    with open(filepath, "w") as f:
        f.write(content)
    print(f"  ✓ Cleaned DEPLOYMENT.md")


def main():
    # Files to process
    src_files = []
    for root, dirs, files in os.walk(os.path.join(PROJECT, "src")):
        for fname in files:
            if fname.endswith((".ts", ".tsx")):
                src_files.append(os.path.join(root, fname))

    # Also process DEPLOYMENT.md and layout files
    all_files = src_files + [
        os.path.join(PROJECT, "DEPLOYMENT.md"),
    ]

    print("Replacing Z.ai image URLs with local SVGs...\n")
    total = 0
    for filepath in all_files:
        count = replace_in_file(filepath)
        if count > 0:
            relpath = os.path.relpath(filepath, PROJECT)
            print(f"  ✓ {relpath}: {count} replacements")
            total += count

    print(f"\nTotal: {total} URL replacements across {len(all_files)} files\n")

    # Clean config files
    print("Cleaning config files...")
    clean_next_config()
    clean_package_json()
    clean_deployment_md()

    print("\n✅ All Z.ai references removed. Project is now self-contained.")


if __name__ == "__main__":
    main()
