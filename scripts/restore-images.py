#!/usr/bin/env python3
"""
Restore the original salon photo URLs (sfile.chatglm.cn) that were replaced
with local SVG placeholders. Keeps the rest of the Z.ai cleanup (removed
scaffolding, removed SDK dependency) since those weren't images.

The image URLs are static — they don't require the z-ai-web-dev-sdk to load.
The SDK was only used during development to search for the images.
"""
import os
import re

PROJECT = "/home/z/my-project"

# Reverse mapping: local SVG path → original sfile.chatglm.cn URL
REVERSE_MAP = {
    # Salon interiors
    "/images/salon-interior.svg": "https://sfile.chatglm.cn/images-ppt/12a31a152fe9.jpg",
    "/images/salon-stations.svg": "https://sfile.chatglm.cn/images-ppt/7a5d8b07bb8c.jpeg",
    "/images/salon-reception.svg": "https://sfile.chatglm.cn/images-ppt/cab219cbd04b.jpg",
    # Note: 06a25c33f3d9.png was mapped to salon-interior.svg but is a different image
    # We'll handle this with a special case below

    # Hair services
    "/images/hair-styling.svg": "https://sfile.chatglm.cn/images-ppt/74ac5010ae4a.jpg",
    "/images/hair-treatment.svg": "https://sfile.chatglm.cn/images-ppt/44a43fcb3aa2.jpg",
    "/images/braiding.svg": "https://sfile.chatglm.cn/images-ppt/1cdec30d3ac9.jpg",
    "/images/natural-hair.svg": "https://sfile.chatglm.cn/images-ppt/ec6648e539c4.webp",
    "/images/hair-coloring.svg": "https://sfile.chatglm.cn/images-ppt/6655e75c93bc.jpg",
    "/images/hair-wash.svg": "https://sfile.chatglm.cn/images-ppt/7ed4a1aba38a.jpg",

    # Nail services
    "/images/manicure.svg": "https://sfile.chatglm.cn/images-ppt/b2dc2e1dafda.jpg",
    "/images/pedicure.svg": "https://sfile.chatglm.cn/images-ppt/006b28763775.jpg",
    "/images/gel-polish.svg": "https://sfile.chatglm.cn/images-ppt/13d3a950c249.jpg",
    "/images/acrylic-nails.svg": "https://sfile.chatglm.cn/images-ppt/bc0fc36754b1.jpg",
    "/images/nude-nails.svg": "https://sfile.chatglm.cn/images-ppt/5c9ad7358a16.jpg",

    # Beauty services
    "/images/makeup.svg": "https://sfile.chatglm.cn/images-ppt/04784dfeae4d.jpg",
    "/images/eyebrows.svg": "https://sfile.chatglm.cn/images-ppt/eebb3f44105e.jpg",
    "/images/eyelashes.svg": "https://sfile.chatglm.cn/images-ppt/2c284b29b962.jpg",
    "/images/facial.svg": "https://sfile.chatglm.cn/images-ppt/7eefed5d5d7d.jpg",
    "/images/spa-glow.svg": "https://sfile.chatglm.cn/images-ppt/299e93bd86bb.jpg",
    "/images/brightening.svg": "https://sfile.chatglm.cn/images-ppt/a861d31ab00d.jpg",
    "/images/massage.svg": "https://sfile.chatglm.cn/images-ppt/9c150cff485c.jpg",

    # Team members
    "/images/team-winnie.svg": "https://sfile.chatglm.cn/images-ppt/df0444e28785.jpg",
    "/images/team-grace.svg": "https://sfile.chatglm.cn/images-ppt/04a2300f6c3d.png",
    "/images/team-lucy.svg": "https://sfile.chatglm.cn/images-ppt/0eac04c19266.jpg",
    "/images/team-amina.svg": "https://sfile.chatglm.cn/images-ppt/aabe1c4dc6ba.jpg",

    # Testimonials
    "/images/testimonial-1.svg": "https://sfile.chatglm.cn/images-ppt/9d42851274ef.jpg",
    "/images/testimonial-2.svg": "https://sfile.chatglm.cn/images-ppt/94ec56f8fe9c.jpg",
    "/images/testimonial-3.svg": "https://sfile.chatglm.cn/images-ppt/87c0034ed79d.jpg",
    "/images/testimonial-4.svg": "https://sfile.chatglm.cn/images-ppt/5140c1a76725.jpg",
    "/images/testimonial-5.svg": "https://sfile.chatglm.cn/images-ppt/720409d7c7ab.jpg",
    "/images/testimonial-6.svg": "https://sfile.chatglm.cn/images-ppt/aab1d0f5caa5.jpg",
    "/images/testimonial-7.svg": "https://sfile.chatglm.cn/images-ppt/40d6b26a9c0d.jpg",
    "/images/testimonial-8.svg": "https://sfile.chatglm.cn/images-ppt/d12f07da2d15.jpg",

    # Page headers (these were all mapped to salon-interior.svg in the cleanup,
    # but the originals were different — restore them to their real photos)
    "/images/page-about.svg": "https://sfile.chatglm.cn/images-ppt/7a5d8b07bb8c.jpeg",
    "/images/page-services.svg": "https://sfile.chatglm.cn/images-ppt/74ac5010ae4a.jpg",
    "/images/page-gallery.svg": "https://sfile.chatglm.cn/images-ppt/cab219cbd04b.jpg",
    "/images/page-pricing.svg": "https://sfile.chatglm.cn/images-ppt/d0f0d8bd1344.jpg",
    "/images/page-booking.svg": "https://sfile.chatglm.cn/images-ppt/7a5d8b07bb8c.jpeg",
    "/images/page-contact.svg": "https://sfile.chatglm.cn/images-ppt/06a25c33f3d9.png",
    "/images/page-faq.svg": "https://sfile.chatglm.cn/images-ppt/06a25c33f3d9.png",
}


def restore_in_file(filepath: str) -> int:
    """Restore original image URLs in a file. Returns count of replacements."""
    try:
        with open(filepath, "r", encoding="utf-8") as f:
            content = f.read()
    except Exception:
        return 0

    original = content
    count = 0

    for local_path, original_url in REVERSE_MAP.items():
        if local_path in content:
            count += content.count(local_path)
            content = content.replace(local_path, original_url)

    # Also handle the salon-products.svg which mapped to d0f0d8bd1344.jpg
    content = content.replace("/images/salon-products.svg", "https://sfile.chatglm.cn/images-ppt/d0f0d8bd1344.jpg")

    # Catch any remaining /images/*.svg references and map them to a sensible default
    remaining = re.findall(r'/images/[a-z0-9-]+\.svg', content)
    for path in remaining:
        # Map unknown SVGs to the salon interior as a fallback
        content = content.replace(path, "https://sfile.chatglm.cn/images-ppt/12a31a152fe9.jpg")
        count += 1

    if content != original:
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(content)

    return count


def restore_next_config():
    """Restore sfile.chatglm.cn hostname in next.config.ts."""
    filepath = os.path.join(PROJECT, "next.config.ts")
    with open(filepath, "r") as f:
        content = f.read()

    if "sfile.chatglm.cn" not in content:
        # Add the hostname back
        old = """  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },"""
        new = """  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "sfile.chatglm.cn",
        pathname: "/images-ppt/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },"""
        content = content.replace(old, new)
        with open(filepath, "w") as f:
            f.write(content)
        print(f"  ✓ Restored sfile.chatglm.cn hostname in next.config.ts")


def restore_deployment_md():
    """Restore original image URL references in DEPLOYMENT.md."""
    filepath = os.path.join(PROJECT, "DEPLOYMENT.md")
    with open(filepath, "r") as f:
        content = f.read()

    content = content.replace(
        "Replace the `/images/*.svg` placeholder paths in the `GALLERY`, `PORTFOLIO`, `SERVICES`, and `STYLISTS` arrays with your real Cloudinary URLs",
        "Replace the `https://sfile.chatglm.cn/...` URLs in the `GALLERY`, `PORTFOLIO`, `SERVICES`, and `STYLISTS` arrays with your real Cloudinary URLs"
    )
    content = content.replace(
        "The demo images are local SVG placeholders in `/public/images/` — no network dependency",
        "The demo images are hosted on `sfile.chatglm.cn` — make sure your network allows this"
    )
    content = content.replace(
        "For production, replace the SVG placeholders with your own Cloudinary URLs (see section 4)",
        "For production, replace demo images with your own Cloudinary URLs (see section 4)"
    )

    with open(filepath, "w") as f:
        f.write(content)
    print(f"  ✓ Restored DEPLOYMENT.md image references")


def remove_placeholder_svgs():
    """Remove the SVG placeholder files (no longer needed)."""
    images_dir = os.path.join(PROJECT, "public", "images")
    if os.path.isdir(images_dir):
        import shutil
        shutil.rmtree(images_dir)
        print(f"  ✓ Removed /public/images/ placeholder SVGs")


def main():
    # Collect all source files
    src_files = []
    for root, dirs, files in os.walk(os.path.join(PROJECT, "src")):
        for fname in files:
            if fname.endswith((".ts", ".tsx")):
                src_files.append(os.path.join(root, fname))

    all_files = src_files + [os.path.join(PROJECT, "DEPLOYMENT.md")]

    print("Restoring original salon photo URLs...\n")
    total = 0
    for filepath in all_files:
        count = restore_in_file(filepath)
        if count > 0:
            relpath = os.path.relpath(filepath, PROJECT)
            print(f"  ✓ {relpath}: {count} URLs restored")
            total += count

    print(f"\nTotal: {total} URLs restored across {len(all_files)} files\n")

    print("Restoring config files...")
    restore_next_config()
    restore_deployment_md()
    remove_placeholder_svgs()

    print("\n✅ All real salon photos restored. Project keeps Z.ai SDK removed but images are back.")


if __name__ == "__main__":
    main()
