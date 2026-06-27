#!/usr/bin/env python3
"""
Generate elegant SVG placeholder images for the salon website.
Replaces all Z.ai CDN image dependencies with local, self-contained SVGs.
Each placeholder uses the salon's luxury color palette and displays the image category.
"""
import os
import textwrap

OUTPUT_DIR = "/home/z/my-project/public/images"

# Salon color palette
ROSE_GOLD = "#B76E79"
GOLD = "#D4AF37"
SOFT_PINK = "#F4B8C4"
CREAM = "#FFF5F7"
DARK = "#2D1F2D"
MUTED = "#8B7B8B"

# Category metadata: (filename, label, icon_svg_path)
CATEGORIES = [
    # Salon interiors
    ("salon-interior", "Salon Interior", "M3 21h18M3 7v14M21 7v14M6 21v-6h12v6M9 9h6M9 12h6M5 7l7-4 7 4"),
    ("salon-stations", "Styling Stations", "M4 4h16v16H4zM8 8h8v8H8zM2 8h2M2 12h2M2 16h2M20 8h2M20 12h2M20 16h2"),
    ("salon-reception", "Reception Lounge", "M3 21h18M5 21V9l7-5 7 5v12M9 21v-6h6v6M9 12h6"),
    ("salon-products", "Premium Products", "M3 8l9-5 9 5v8l-9 5-9-5V8zM12 3v18M3 8l9 5 9-5"),

    # Hair services
    ("hair-styling", "Hair Styling", "M12 2C9 6 7 10 7 14a5 5 0 0010 0c0-4-2-8-5-12z"),
    ("hair-treatment", "Hair Treatment", "M12 2C9 6 7 10 7 14a5 5 0 0010 0c0-4-2-8-5-12zM12 6v8"),
    ("braiding", "Braiding", "M4 4c4 4 12 4 16 0M4 10c4 4 12 4 16 0M4 16c4 4 12 4 16 0M4 22c4 4 12 4 16 0"),
    ("natural-hair", "Natural Hair", "M12 2C8 6 6 10 6 14a6 6 0 0012 0c0-4-2-8-6-12z"),
    ("hair-coloring", "Hair Coloring", "M12 2C9 6 7 10 7 14a5 5 0 0010 0c0-4-2-8-5-12zM9 10c1 1 5 1 6 0"),
    ("hair-wash", "Hair Wash & Blow Dry", "M12 2C9 6 7 10 7 14a5 5 0 0010 0c0-4-2-8-5-12zM3 14c3 2 6 3 9 3s6-1 9-3"),

    # Nail services
    ("manicure", "Manicure", "M8 2v6M12 2v6M16 2v6M6 8h12l-1 12H7L6 8z"),
    ("pedicure", "Pedicure", "M6 2v8M10 2v8M14 2v8M18 2v8M4 10h16l-1 10H5L4 10z"),
    ("gel-polish", "Gel Polish", "M8 2v6M12 2v6M16 2v6M6 8h12l-1 12H7L6 8z"),
    ("acrylic-nails", "Acrylic & Extensions", "M8 2v6M12 2v8M16 2v6M6 8h12l-1 12H7L6 8z"),
    ("nude-nails", "Nude Set", "M8 2v6M12 2v6M16 2v6M6 8h12l-1 12H7L6 8z"),

    # Beauty services
    ("makeup", "Makeup", "M12 2l3 6 6 1-4 4 1 6-6-3-6 3 1-6-4-4 6-1z"),
    ("eyebrows", "Eyebrows", "M2 8c4-2 16-2 20 0M2 12c4-2 16-2 20 0M2 16c4-2 16-2 20 0"),
    ("eyelashes", "Eyelashes", "M2 12c4-4 16-4 20 0M6 8v8M10 6v12M14 6v12M18 8v8"),
    ("facial", "Facials", "M12 2a5 5 0 015 5c0 5-5 15-5 15S7 12 7 7a5 5 0 015-5z"),
    ("spa-glow", "Spa Glow", "M12 2a5 5 0 015 5c0 5-5 15-5 15S7 12 7 7a5 5 0 015-5zM12 8v8"),
    ("brightening", "Brightening", "M12 2l2 6h6l-5 4 2 6-5-4-5 4 2-6-5-4h6z"),
    ("massage", "Massage Therapy", "M3 12c3-3 6-3 9 0s6 3 9 0M3 8c3-3 6-3 9 0s6 3 9 0M3 16c3-3 6-3 9 0s6 3 9 0"),

    # Team members
    ("team-winnie", "Winnie Achieng", "M12 12a4 4 0 100-8 4 4 0 000 8zM4 20c0-4 4-6 8-6s8 2 8 6"),
    ("team-grace", "Grace Wanjiru", "M12 12a4 4 0 100-8 4 4 0 000 8zM4 20c0-4 4-6 8-6s8 2 8 6"),
    ("team-lucy", "Lucy Njeri", "M12 12a4 4 0 100-8 4 4 0 000 8zM4 20c0-4 4-6 8-6s8 2 8 6"),
    ("team-amina", "Amina Hassan", "M12 12a4 4 0 100-8 4 4 0 000 8zM4 20c0-4 4-6 8-6s8 2 8 6"),

    # Testimonials (generic female portraits)
    ("testimonial-1", "Happy Client", "M12 12a4 4 0 100-8 4 4 0 000 8zM4 20c0-4 4-6 8-6s8 2 8 6"),
    ("testimonial-2", "Happy Client", "M12 12a4 4 0 100-8 4 4 0 000 8zM4 20c0-4 4-6 8-6s8 2 8 6"),
    ("testimonial-3", "Happy Client", "M12 12a4 4 0 100-8 4 4 0 000 8zM4 20c0-4 4-6 8-6s8 2 8 6"),
    ("testimonial-4", "Happy Client", "M12 12a4 4 0 100-8 4 4 0 000 8zM4 20c0-4 4-6 8-6s8 2 8 6"),
    ("testimonial-5", "Happy Client", "M12 12a4 4 0 100-8 4 4 0 000 8zM4 20c0-4 4-6 8-6s8 2 8 6"),
    ("testimonial-6", "Happy Client", "M12 12a4 4 0 100-8 4 4 0 000 8zM4 20c0-4 4-6 8-6s8 2 8 6"),
    ("testimonial-7", "Happy Client", "M12 12a4 4 0 100-8 4 4 0 000 8zM4 20c0-4 4-6 8-6s8 2 8 6"),
    ("testimonial-8", "Happy Client", "M12 12a4 4 0 100-8 4 4 0 000 8zM4 20c0-4 4-6 8-6s8 2 8 6"),

    # Page headers
    ("page-about", "About Us", "M12 12a4 4 0 100-8 4 4 0 000 8zM4 20c0-4 4-6 8-6s8 2 8 6"),
    ("page-services", "Our Services", "M12 2l2 6h6l-5 4 2 6-5-4-5 4 2-6-5-4h6z"),
    ("page-gallery", "Gallery", "M3 3h18v18H3zM3 9h18M9 3v18"),
    ("page-pricing", "Pricing", "M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"),
    ("page-booking", "Book Appointment", "M3 3h18v18H3zM3 8h18M8 3v18"),
    ("page-contact", "Contact Us", "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0zM12 12a3 3 0 100-6 3 3 0 000 6z"),
    ("page-faq", "FAQ", "M9 9a3 3 0 016 0c0 2-3 2-3 4M12 17h.01M12 22a10 10 0 100-20 10 10 0 000 20z"),
]


def generate_svg(name: str, label: str, icon_path: str) -> str:
    """Generate an elegant SVG placeholder with the salon's branding."""
    # Split label into multiple lines if long
    words = label.split()
    if len(words) > 2:
        line1 = " ".join(words[:len(words) // 2])
        line2 = " ".join(words[len(words) // 2:])
    else:
        line1 = label
        line2 = ""

    label_lines = f"""
      <text x="200" y="180" text-anchor="middle"
            font-family="Georgia, serif" font-size="20" font-weight="600"
            fill="{ROSE_GOLD}">{line1}</text>"""
    if line2:
        label_lines += f"""
      <text x="200" y="205" text-anchor="middle"
            font-family="Georgia, serif" font-size="20" font-weight="600"
            fill="{ROSE_GOLD}">{line2}</text>"""

    return f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 500" fill="none">
  <defs>
    <linearGradient id="bg-{name}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="{CREAM}"/>
      <stop offset="100%" stop-color="{SOFT_PINK}" stop-opacity="0.3"/>
    </linearGradient>
    <linearGradient id="icon-{name}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="{ROSE_GOLD}"/>
      <stop offset="100%" stop-color="{GOLD}"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="400" height="500" fill="url(#bg-{name})"/>

  <!-- Decorative corners -->
  <g stroke="{GOLD}" stroke-width="1" opacity="0.3" fill="none">
    <path d="M 20 20 L 20 40 M 20 20 L 40 20"/>
    <path d="M 380 20 L 380 40 M 380 20 L 360 20"/>
    <path d="M 20 480 L 20 460 M 20 480 L 40 480"/>
    <path d="M 380 480 L 380 460 M 380 480 L 360 480"/>
  </g>

  <!-- W monogram at top -->
  <circle cx="200" cy="80" r="32" fill="url(#icon-{name})"/>
  <text x="200" y="92" text-anchor="middle"
        font-family="Georgia, serif" font-size="28" font-weight="bold"
        fill="white">W</text>

  <!-- Category icon -->
  <g transform="translate(200, 280)">
    <g transform="translate(-30, -30) scale(2.5)" stroke="url(#icon-{name})" stroke-width="2"
       fill="none" stroke-linecap="round" stroke-linejoin="round">
      <path d="{icon_path}"/>
    </g>
  </g>

  <!-- Label -->
  {label_lines}

  <!-- Divider -->
  <g transform="translate(200, 240)">
    <line x1="-40" y1="0" x2="-8" y2="0" stroke="{GOLD}" stroke-width="0.8" opacity="0.6"/>
    <circle cx="0" cy="0" r="2" fill="{GOLD}" opacity="0.8"/>
    <line x1="8" y1="0" x2="40" y2="0" stroke="{GOLD}" stroke-width="0.8" opacity="0.6"/>
  </g>

  <!-- Footer text -->
  <text x="200" y="440" text-anchor="middle"
        font-family="Georgia, serif" font-size="10"
        letter-spacing="2" fill="{MUTED}" opacity="0.7">WINNIE'S HAIR &amp; BEAUTY STUDIO</text>
  <text x="200" y="460" text-anchor="middle"
        font-family="Georgia, serif" font-size="8"
        letter-spacing="1.5" fill="{MUTED}" opacity="0.5">Replace with your photo via Cloudinary</text>
</svg>
"""


def main():
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    for name, label, icon_path in CATEGORIES:
        svg = generate_svg(name, label, icon_path)
        filepath = os.path.join(OUTPUT_DIR, f"{name}.svg")
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(svg)
        print(f"  ✓ {name}.svg")

    print(f"\nGenerated {len(CATEGORIES)} SVG placeholders in {OUTPUT_DIR}")


if __name__ == "__main__":
    main()
