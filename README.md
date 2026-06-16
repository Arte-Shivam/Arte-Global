<<<<<<< HEAD
# Arte-Global
Arte Global Skills Recruitment Pvt. Ltd.'s website
=======
# Arte Recruitment

Modern React website for Arte Global Skills Recruitment Private Limited.

## Tech Stack

- **Frontend:** React 19 + TypeScript + Vite + Tailwind CSS v4
- **Animations:** Framer Motion
- **Backend:** Supabase (Auth, Database, Storage)
- **Email:** EmailJS (free tier) — Resend can be added later
- **Hosting:** Netlify (free tier)
- **Forms:** React Hook Form + Zod validation

## Getting Started

```bash
npm install
cp .env.example .env
npm run dev
```

## Environment Variables

Copy `.env.example` to `.env` and fill in:

| Variable | Description |
|----------|-------------|
| `VITE_SUPABASE_URL` | Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Supabase anon/public key |
| `VITE_EMAILJS_SERVICE_ID` | EmailJS service ID |
| `VITE_EMAILJS_TEMPLATE_ID` | EmailJS template ID |
| `VITE_EMAILJS_PUBLIC_KEY` | EmailJS public key |

## Supabase Setup

1. Create a free project at [supabase.com](https://supabase.com)
2. Run `supabase/schema.sql` in the SQL Editor
3. Enable Email auth in Authentication → Providers
4. Create an admin user and set `role = 'admin'` in the profiles table

## Netlify Deployment

1. Push to GitHub
2. Connect repo to Netlify
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Add environment variables in Netlify dashboard

## Project Structure

```
src/
  components/     # Reusable UI components
  contexts/       # React contexts (Auth)
  data/           # Static content (from old website)
  lib/            # Utilities, Supabase, Email
  pages/          # Route pages
    candidate/    # Candidate-specific pages
    recruiter/    # Recruiter-specific pages
    shared/       # Shared pages (About, Contact, etc.)
    admin/        # Admin dashboard
    auth/         # Login & Register
public/
  icons/          # SVG icons (replaceable as images)
  logo.svg        # Placeholder logo — replace with your brand logo
```

## Customization

- **Logo:** Replace `public/logo.svg` and `public/logo-white.svg`
- **Icons:** All icons are SVG images in `public/icons/` — swap any file to update sitewide
- **Content:** Edit `src/data/content.ts` or connect Supabase for dynamic content
- **Colors:** Defined in `src/index.css` — primary (white), secondary (#0089cf), accent (#002561)
- **Fonts:** Catamaran (headings) + Montserrat (body) via Google Fonts

## Features

- Candidate / Recruiter audience split with registration modal
- Job listings with search, filters, and application forms
- Admin dashboard for job management
- Testimonials, media showcase, blog, FAQs
- Contact, review, and FAQ submission forms
- Responsive design with mobile burger menu
- Subtle geometric shapes and smooth animations
- SEO-friendly meta tags

## Free Tier Limits

| Service | Free Tier |
|---------|-----------|
| Supabase | 500MB DB, 50K monthly active users |
| Netlify | 100GB bandwidth/month |
| EmailJS | 200 emails/month |
>>>>>>> c12f702 (Initial Commit)
