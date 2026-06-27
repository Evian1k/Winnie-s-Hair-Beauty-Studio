# Winnie's Hair & Beauty Studio

> A production-ready luxury salon website for **Winnie's Hair & Beauty Studio** in Katani, Kenya. Built with Next.js 16, TypeScript, Tailwind CSS 4, Framer Motion, React Hook Form, and Zod.

★★★★★ (5.0 Google rating) · 16 services · 4 stylists · Full booking system · Admin dashboard · PWA-ready

---

## ✨ Features

### Customer-facing
- **12 fully-built pages**: Home, About, Services, Gallery, Pricing, Book, Contact, FAQ, Privacy, Terms, Admin, 404
- **5-step booking wizard**: Service → Date & Time → Stylist → Details → Review → Confirmation email
- **Masonry gallery** with 6 filters and full-screen lightbox (keyboard navigable)
- **Live chat widget** with intelligent bot replies for booking, pricing, location, hours
- **Premium loading screen**, parallax hero, glass-morphism navbar, smooth page transitions
- **Dark mode** with full theme system
- **Search dialog** across services, packages, and FAQs
- **Floating action buttons**: WhatsApp, Call, Back-to-top, Live chat
- **PWA**: installable, offline-capable, custom icon, manifest
- **SEO**: meta tags, Open Graph, Twitter Cards, JSON-LD `HairSalon` schema, sitemap, robots.txt
- **Responsive**: mobile-first, tested on iPhone, tablet, and desktop

### Admin dashboard (`/#admin`, password `winnie2024`)
- **Overview**: revenue, bookings count, messages, subscribers, pending alerts
- **Bookings**: filter by status, confirm/cancel/complete/delete
- **Messages**: read/reply/delete contact form submissions
- **Services**: inline price editing
- **Gallery**: Cloudinary image upload UI
- **Settings**: business info editor + integration status panel

### Backend integrations (all optional — graceful fallback to localStorage)
- **Supabase** (Postgres database + auth) — via Prisma ORM
- **Cloudinary** (image uploads with signed uploads — API secret never exposed)
- **Resend** (transactional email — booking confirmations + admin notifications + contact autoresponders)
- **Google Maps** (embedded location)
- **WhatsApp** deep links

---

## 🎨 Design System

| Token | Value |
|-------|-------|
| Primary | Rose gold `#B76E79` |
| Accent | Gold `#D4AF37` |
| Background (light) | Warm cream `oklch(0.99 0.008 70)` |
| Background (dark) | Deep noir `oklch(0.16 0.015 320)` |
| Headings | Playfair Display (serif) |
| Body | Inter (sans-serif) |
| Decorative | Cormorant Garamond |

Effects: glass morphism, gradient text, shimmer, parallax, image hover zoom, animated gold rings on loading screen.

---

## 🚀 Quick Start

```bash
# 1. Install dependencies
bun install

# 2. Copy env template (works in demo mode with no keys)
cp .env.example .env

# 3. Set up local SQLite database
bun run db:push

# 4. Start the dev server
bun run dev
```

Open `http://localhost:3000` — the premium loading screen plays, then the home page loads.

---

## 🔌 Connecting Real Backends

The site works in **demo mode** out of the box (localStorage + console-logged emails). Add API keys to `.env` to activate each integration — they auto-enable when their keys are present.

### Supabase (database)
1. Sign up at [supabase.com](https://supabase.com) (free)
2. Create a project, copy your connection string + API keys
3. Add to `.env`:
   ```env
   DATABASE_URL="postgresql://postgres.[ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres?pgbouncer=true"
   NEXT_PUBLIC_SUPABASE_URL="https://xxxxxxxx.supabase.co"
   NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
   SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"
   ```
4. Run `bun run db:push` to create tables

### Cloudinary (image uploads)
1. Sign up at [cloudinary.com](https://cloudinary.com) (free)
2. From your dashboard, add to `.env`:
   ```env
   CLOUDINARY_CLOUD_NAME="your-cloud-name"
   CLOUDINARY_API_KEY="your-api-key"
   CLOUDINARY_API_SECRET="your-api-secret"
   ```
3. The admin Gallery tab now accepts real uploads

### Resend (email)
1. Sign up at [resend.com](https://resend.com) (free, 3,000 emails/month)
2. Verify your sending domain
3. Create an API key, add to `.env`:
   ```env
   RESEND_API_KEY="re_xxxxxxxxxxxxxxxx"
   EMAIL_FROM="Winnie's Hair & Beauty Studio <noreply@winnieshairandbeauty.co.ke>"
   EMAIL_TO_SALON="hello@winnieshairandbeauty.co.ke"
   ```
4. Booking confirmations + admin notifications now send automatically

📖 **Full step-by-step guide**: see [`DEPLOYMENT.md`](./DEPLOYMENT.md)

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 4 + shadcn/ui (New York) |
| Animations | Framer Motion 12 |
| Forms | React Hook Form + Zod |
| State | Zustand (client) + TanStack Query (server) |
| Database | Prisma ORM (SQLite dev / Supabase Postgres prod) |
| Email | Resend |
| Images | Cloudinary |
| Auth | NextAuth.js v4 (available, optional) |
| Icons | Lucide React |
| Fonts | Playfair Display, Inter, Cormorant Garamond |
| Deployment | Vercel |

---

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Fonts, SEO metadata, JSON-LD structured data
│   ├── page.tsx                # View router (hash-based) with AnimatePresence
│   ├── globals.css             # Luxury design system (colors, effects, utilities)
│   └── api/
│       ├── bookings/route.ts          # POST: create booking + send emails
│       ├── contact/route.ts           # POST: save message + notify salon
│       ├── newsletter/route.ts        # POST: subscribe
│       ├── cloudinary-signature/route.ts  # GET: signed upload payload (admin-only)
│       ├── health/route.ts            # GET: integration status
│       └── admin/
│           ├── verify/route.ts        # POST: admin auth
│           ├── bookings/route.ts      # GET/PATCH/DELETE
│           ├── messages/route.ts      # GET/PATCH/DELETE
│           └── subscribers/route.ts   # GET
├── components/
│   ├── ui/                     # shadcn/ui library (full set)
│   ├── views/                  # 12 page views
│   │   ├── home-view.tsx
│   │   ├── about-view.tsx
│   │   ├── services-view.tsx
│   │   ├── gallery-view.tsx
│   │   ├── pricing-view.tsx
│   │   ├── booking-view.tsx
│   │   ├── contact-view.tsx
│   │   ├── faq-view.tsx
│   │   ├── admin-view.tsx
│   │   └── legal-views.tsx     # Privacy, Terms, 404
│   ├── loading-screen.tsx
│   ├── navbar.tsx
│   ├── footer.tsx
│   ├── floating-buttons.tsx    # WhatsApp/Call/Chat/Back-to-top
│   ├── theme-provider.tsx
│   ├── salon-provider.tsx
│   └── section-heading.tsx
└── lib/
    ├── salon-data.ts           # All salon content (services, FAQ, portfolio, etc.)
    ├── salon-store.ts          # Zustand store (localStorage-persisted)
    ├── data-layer.ts           # Server-side data access (Prisma + in-memory fallback)
    ├── email.ts                # Resend integration + HTML email templates
    ├── cloudinary.ts           # Signed upload signatures
    ├── supabase.ts             # Supabase client
    ├── db.ts                   # Prisma client
    └── utils.ts                # cn() utility
```

---

## 🌐 Deployment

### Vercel (recommended — free)

1. Push to GitHub
2. Import the repo at [vercel.com](https://vercel.com)
3. Add all env vars from `.env` in the Vercel dashboard
4. Deploy — Vercel auto-detects Next.js
5. Add your custom domain in Vercel → Settings → Domains

The `vercel.json` is already configured. `postinstall` runs `prisma generate` automatically.

📖 **Full guide**: see [`DEPLOYMENT.md`](./DEPLOYMENT.md)

### Other platforms
The `output: "standalone"` config in `next.config.ts` makes the build portable — you can deploy to any Node host (Railway, Render, Fly.io, Docker, etc.).

---

## 🔒 Security

- **Input validation** on every API route (Zod schemas)
- **Rate limiting** on booking endpoint (5 per 10 min per IP)
- **Admin auth** via password (server-side authoritative check)
- **Cloudinary signed uploads** — API secret never reaches the client
- **Service role keys** kept server-side only
- **Spam protection** via honeypot + rate limits on contact form

For production multi-admin auth, swap the password check for Supabase Auth or NextAuth.js (both already installed).

---

## 📝 Customisation

### Editing content
All salon content lives in [`src/lib/salon-data.ts`](src/lib/salon-data.ts):
- Services (name, description, price, duration, image)
- Portfolio items
- Testimonials
- Stylists
- FAQs
- Packages & offers
- Gallery images
- Business hours

Edit the file → save → hot reload picks it up.

### Changing colors / fonts
Edit [`src/app/globals.css`](src/app/globals.css) — the `:root` and `.dark` blocks define all design tokens.

### Changing the admin password
Set `ADMIN_PASSWORD` in `.env` (and `NEXT_PUBLIC_ADMIN_PASSWORD` to match).

---

## 📊 Performance

- Lazy-loaded images everywhere
- Code-split per view (only the current view's code loads)
- Premium loading screen masks initial hydration
- `next/font` for zero-layout-shift font loading
- Standalone build for smaller deployment size
- Targeting Lighthouse 90+ on all metrics

---

## 📞 Salon Information

| | |
|---|---|
| **Name** | Winnie's Hair & Beauty Studio |
| **Location** | Katani Lounge Building, Syokimau–Katani Road, Katani, Kenya |
| **Phone** | +254 790 573509 |
| **Email** | hello@winnieshairandbeauty.co.ke |
| **Hours** | Mon–Fri 8AM–8PM, Sat 8AM–7PM, Sun 10AM–5PM |
| **Rating** | ★★★★★ 5.0 (127 reviews) |

---

## 📄 License

Proprietary — built for Winnie's Hair & Beauty Studio. All rights reserved.

---

**Built with care for a salon that deserves the best. 🌹**
