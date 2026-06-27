# Winnie's Hair & Beauty Studio — Deployment Guide

This guide walks you through everything needed to take the salon website live: connecting real backends, configuring social links, and deploying to Vercel.

---

## Table of Contents

1. [Prerequisites](#1-prerequisites)
2. [Quick Start (Local Dev)](#2-quick-start-local-dev)
3. [Connect Supabase (Database + Auth)](#3-connect-supabase-database--auth)
4. [Connect Cloudinary (Image Uploads)](#4-connect-cloudinary-image-uploads)
5. [Connect Resend (Email)](#5-connect-resend-email)
6. [Update Social Links & Business Info](#6-update-social-links--business-info)
7. [Deploy to Vercel](#7-deploy-to-vercel)
8. [Post-Deployment Checklist](#8-post-deployment-checklist)
9. [Troubleshooting](#9-troubleshooting)

---

## 1. Prerequisites

Before you start, you'll need:

- A computer with [Node.js 18+](https://nodejs.org/) and [Git](https://git-scm.com/) installed
- A [GitHub](https://github.com/) account (free)
- A [Vercel](https://vercel.com/) account (free — sign in with GitHub)
- The salon's real social media handles (Instagram, TikTok, Facebook)
- 5–10 minutes per integration (Supabase, Cloudinary, Resend)

> **Good news:** The site works in "demo mode" without any of these. Add integrations one at a time — each one activates automatically when you add its API keys.

---

## 2. Quick Start (Local Dev)

```bash
# Clone the repo (or download the ZIP)
git clone <your-repo-url> winnies-salon
cd winnies-salon

# Install dependencies
bun install    # or: npm install

# Copy the env template
cp .env.example .env

# Set up the local database (SQLite — no signup needed)
bun run db:push

# Start the dev server
bun run dev
```

Open http://localhost:3000 — the site should load with the premium loading screen.

---

## 3. Connect Supabase (Database + Auth)

Supabase is a free, open-source Firebase alternative. It gives you a Postgres database that bookings, messages, and newsletter subscribers sync to — so data persists across devices and survives page reloads.

### Step-by-step

1. **Sign up** at [supabase.com](https://supabase.com) (free tier: 500MB database, 50,000 monthly active users — more than enough)
2. **Create a new project:**
   - Name: `winnies-salon`
   - Database password: choose a strong one and **save it somewhere safe**
   - Region: choose the closest to Kenya (e.g. `Frankfurt` or `London`)
   - Plan: Free
3. **Wait 2 minutes** for the project to provision
4. **Get your connection string:**
   - Go to **Settings** (gear icon, bottom left) → **Database**
   - Find **Connection string** → **URI**
   - Copy the string that looks like:
     ```
     postgresql://postgres.[ref]:[YOUR-PASSWORD]@aws-0-[region].pooler.supabase.com:6543/postgres
     ```
   - Replace `[YOUR-PASSWORD]` with the password you set in step 2
5. **Get your API keys:**
   - Go to **Settings** → **API**
   - Copy:
     - `Project URL` (looks like `https://xxxxxxxx.supabase.co`)
     - `anon` `public` key
     - `service_role` key (keep this **secret** — never expose to the client)
6. **Update your `.env` file:**
   ```env
   DATABASE_URL="postgresql://postgres.[ref]:[YOUR-PASSWORD]@aws-0-[region].pooler.supabase.com:6543/postgres?pgbouncer=true"
   NEXT_PUBLIC_SUPABASE_URL="https://xxxxxxxx.supabase.co"
   NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
   SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"
   ```
7. **Push the schema to Supabase:**
   ```bash
   bun run db:push
   ```
   This creates all the tables (bookings, messages, subscribers, services, etc.) in your Supabase database.

### What this unlocks
- Bookings, messages, and newsletter signups sync to a real database
- Data is preserved across devices and browser sessions
- The admin dashboard reads from the database instead of localStorage
- Ready for multi-device admin access

---

## 4. Connect Cloudinary (Image Uploads)

Cloudinary hosts and optimises the salon's portfolio images. Free tier: 25 credits/month (~25GB storage + bandwidth).

### Step-by-step

1. **Sign up** at [cloudinary.com](https://cloudinary.com) (free, no credit card needed)
2. **Go to your dashboard** — you'll see:
   - `Cloud Name` (e.g. `winnies-salon`)
   - `API Key`
   - `API Secret` (click to reveal)
3. **Update your `.env` file:**
   ```env
   CLOUDINARY_CLOUD_NAME="winnies-salon"
   CLOUDINARY_API_KEY="123456789012345"
   CLOUDINARY_API_SECRET="your-api-secret-here"
   ```
4. **Restart the dev server:** `bun run dev`
5. **Test it:**
   - Open the site → click **Admin** in the footer
   - Sign in with password `winnie2024`
   - Go to the **Gallery** tab
   - You should see a green "✓ Cloudinary connected" badge
   - Click **Upload Image**, pick a photo, and it'll upload to Cloudinary
   - Copy the returned URL and add it to your gallery data in `src/lib/salon-data.ts`

### What this unlocks
- The admin can upload real portfolio photos from the dashboard
- Images are automatically optimised (WebP, responsive sizes)
- Fast CDN delivery worldwide

### Replacing the demo images with real photos

Once Cloudinary is connected:

1. Upload your salon's real photos via the admin Gallery tab
2. Copy each uploaded URL
3. Open `src/lib/salon-data.ts`
4. Replace the `https://sfile.chatglm.cn/...` URLs in the `GALLERY`, `PORTFOLIO`, `SERVICES`, and `STYLISTS` arrays with your real Cloudinary URLs
5. Commit and redeploy

---

## 5. Connect Resend (Email)

Resend sends transactional emails: booking confirmations to clients, and booking notifications to the salon. Free tier: 3,000 emails/month.

### Step-by-step

1. **Sign up** at [resend.com](https://resend.com) (free, sign in with GitHub)
2. **Verify your sending domain:**
   - Go to **Domains** → **Add Domain**
   - Enter `winnieshairandbeauty.co.ke` (or whichever domain you own)
   - Add the displayed DNS records (SPF, DKIM, DMARC) at your domain registrar
   - Wait 5–30 minutes for DNS to propagate
   - Click **Verify** — status should change to **Verified**
3. **Create an API key:**
   - Go to **API Keys** → **Create API Key**
   - Name: `Winnie's Salon Production`
   - Permission: `Sending access`
   - Copy the key (starts with `re_`)
4. **Update your `.env` file:**
   ```env
   RESEND_API_KEY="re_xxxxxxxxxxxxxxxxx"
   EMAIL_FROM="Winnie's Hair & Beauty Studio <noreply@winnieshairandbeauty.co.ke>"
   EMAIL_TO_SALON="hello@winnieshairandbeauty.co.ke"
   ```
5. **Restart the dev server:** `bun run dev`
6. **Test it:**
   - Make a test booking on the site
   - You should receive:
     - A confirmation email at the customer email you entered
     - A notification email at `EMAIL_TO_SALON`
   - Fill in the contact form — you should receive a notification + the customer gets an auto-responder

### What this unlocks
- Booking confirmations sent to clients automatically
- Admin notifications when new bookings/messages arrive
- Auto-responder to contact form submissions
- Beautiful HTML email templates (already built — see `src/lib/email.ts`)

> **Don't have a domain yet?** You can use Resend's `onboarding@resend.dev` sender for testing, but production emails should come from your own verified domain for deliverability.

---

## 6. Update Social Links & Business Info

All social links and key business info are configurable via environment variables — **no code changes needed**.

Update your `.env` file:

```env
# Replace with the salon's real social media URLs
NEXT_PUBLIC_INSTAGRAM_URL="https://instagram.com/winnies_actual_handle"
NEXT_PUBLIC_TIKTOK_URL="https://tiktok.com/@winnies_actual_handle"
NEXT_PUBLIC_FACEBOOK_URL="https://facebook.com/winnies_actual_page"

# Site URL (used for SEO, Open Graph, sitemap)
NEXT_PUBLIC_SITE_URL="https://winnieshairandbeauty.co.ke"

# WhatsApp number in international format (no + or spaces)
NEXT_PUBLIC_WHATSAPP_NUMBER="254790573509"

# Optional: custom Google Maps embed
# Search your business on Google Maps → Share → Embed a map → Copy the src URL
NEXT_PUBLIC_GOOGLE_MAPS_EMBED="https://www.google.com/maps/embed?pb=..."

# Change the admin password!
ADMIN_PASSWORD="your-strong-password-here"
NEXT_PUBLIC_ADMIN_PASSWORD="your-strong-password-here"
```

> **Important:** Change `ADMIN_PASSWORD` from `winnie2024` to a strong, unique password before deploying to production.

### Changing other business info

Phone number, email, address, hours, and team member details are in `src/lib/salon-data.ts`. Edit that file and redeploy to update them.

---

## 7. Deploy to Vercel

Vercel is the company behind Next.js — they offer free hosting with global CDN, automatic HTTPS, and instant deployments from GitHub.

### Step-by-step

1. **Push your code to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit — Winnie's Hair & Beauty Studio"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/winnies-salon.git
   git push -u origin main
   ```

   > **Important:** Make sure `.gitignore` includes `.env` so your secrets aren't pushed to GitHub. The project's `.gitignore` already does this.

2. **Connect to Vercel:**
   - Go to [vercel.com](https://vercel.com) and sign in with GitHub
   - Click **Add New** → **Project**
   - Import your `winnies-salon` repository
   - Vercel auto-detects Next.js — no config needed

3. **Add environment variables:**
   - In the Vercel deploy screen, expand **Environment Variables**
   - Add **every variable** from your local `.env` file (copy-paste each one)
   - Make sure to add them for **Production**, **Preview**, and **Development** environments
   - Especially important: `DATABASE_URL`, `CLOUDINARY_*`, `RESEND_API_KEY`, `ADMIN_PASSWORD`

4. **Deploy:**
   - Click **Deploy**
   - Wait 2–3 minutes for the build to complete
   - You'll get a URL like `winnies-salon.vercel.app`

5. **Run database migrations on Vercel:**
   - After the first deploy, go to your project on Vercel
   - Click the **Storage** tab → connect your Supabase database (or use the DATABASE_URL env var)
   - Run `bun run db:push` locally with the production `DATABASE_URL` to create tables in your Supabase Postgres

6. **Add your custom domain:**
   - In Vercel: **Settings** → **Domains**
   - Add `winnieshairandbeauty.co.ke` (or whatever domain you own)
   - Follow the DNS instructions (add an A record and CNAME at your registrar)
   - Wait for the SSL certificate to provision (5–30 minutes)
   - Update `NEXT_PUBLIC_SITE_URL` in your Vercel env vars to match

### Continuous deployment

Every time you push to the `main` branch on GitHub, Vercel automatically rebuilds and deploys. Preview deployments are created for pull requests.

---

## 8. Post-Deployment Checklist

Run through this list after going live:

- [ ] **Site loads** at your custom domain with HTTPS
- [ ] **Loading screen** plays once, then disappears
- [ ] **Hero section** displays with the salon image background
- [ ] **Navigation** works for all pages (Home, About, Services, Gallery, Pricing, Book, Contact)
- [ ] **Dark mode** toggle works
- [ ] **Search** dialog returns relevant results
- [ ] **Mobile menu** opens and closes on phone-sized screens
- [ ] **Booking flow** completes end-to-end (pick service → date → time → stylist → details → confirm)
- [ ] **Confirmation email** arrives in the customer's inbox
- [ ] **Admin notification** arrives at the salon's email
- [ ] **Contact form** submits successfully
- [ ] **Newsletter signup** works
- [ ] **Gallery** filters work, lightbox opens with keyboard nav (← → Esc)
- [ ] **Floating buttons** work: WhatsApp opens chat, Call dials, Back-to-top scrolls up, Chat opens widget
- [ ] **Admin dashboard** signs in with your new password
- [ ] **Admin dashboard** shows real bookings from the database
- [ ] **Cloudinary upload** works in admin Gallery tab
- [ ] **Google Maps** shows the salon location on the Contact page
- [ ] **Footer** shows correct social links, hours, contact info
- [ ] **Privacy Policy** and **Terms** pages load
- [ ] **404 page** appears when visiting a non-existent URL hash
- [ ] **SEO:** view page source — meta tags, Open Graph, and JSON-LD structured data are present
- [ ] **Lighthouse** audit (Chrome DevTools) scores 90+ on Performance, Accessibility, Best Practices, SEO

---

## 9. Troubleshooting

### "Database connection failed"
- Double-check the `DATABASE_URL` format — it must end with `?pgbouncer=true` for Supabase
- Make sure your Supabase project is not paused (free tier pauses after 7 days of inactivity)
- Verify the database password is correct (no special characters that need URL-encoding)

### "Email not sending"
- Check that your domain is verified in Resend (Domains tab)
- Verify `RESEND_API_KEY` is set correctly
- Check the Vercel function logs (Vercel dashboard → your project → Functions → `/api/bookings`)
- For testing without a domain, set `EMAIL_FROM="Winnie's Salon <onboarding@resend.dev>"`

### "Cloudinary upload fails"
- Make sure all three env vars are set: `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`
- Check the file size — max 5MB
- File must be PNG, JPG, or WebP

### "Admin login doesn't work"
- Verify `ADMIN_PASSWORD` and `NEXT_PUBLIC_ADMIN_PASSWORD` are both set in Vercel env vars
- Clear browser localStorage: DevTools → Application → Local Storage → clear `winnies-salon-store`
- Try a hard refresh (Ctrl+Shift+R / Cmd+Shift+R)

### "Images not loading"
- The demo images are hosted on `sfile.chatglm.cn` — make sure your network allows this
- For production, replace demo images with your own Cloudinary URLs (see section 4)

### "Build fails on Vercel"
- Check the build logs in Vercel — usually a missing env var or TypeScript error
- The `next.config.ts` has `typescript.ignoreBuildErrors: true` to prevent type errors from blocking deploys
- If Prisma client isn't generated, add a `postinstall` script to `package.json`: `"postinstall": "prisma generate"`

### "Hydration mismatch"
- Usually caused by `Date.now()` or `Math.random()` rendering differently on server vs client
- Check the browser console for the specific component
- Wrap client-only logic in `useEffect`

---

## Need help?

If you run into issues, the fastest way to get help is:

1. Check the browser console (F12 → Console tab) for error messages
2. Check the Vercel function logs
3. Check the Supabase logs (Database → Logs)
4. Reach out to your developer with screenshots of the errors

**Congratulations — your salon website is live! 🎉**
