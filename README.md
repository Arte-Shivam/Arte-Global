# Arte Global Skills Recruitment — Website

Official website for **Arte Global Skills Recruitment Private Limited**, a trusted international recruitment agency placing candidates from India, Nepal and beyond across Europe, UAE, Qatar, Mauritius and more.

---

## Tech Stack

| Layer                  | Technology                             |
|------------------------|----------------------------------------|
| Frontend               | React 19 + TypeScript + Vite           |
| Styling                | Tailwind CSS v4                        |
| Animations             | Framer Motion                          |
| Backend                | Supabase (Auth, Database, RLS)         |
| Email Notifications    | EmailJS                                |
| Forms                  | React Hook Form + Zod                  |
| Hosting                | Netlify                                |
| Analytics              | Google Analytics 4 + Microsoft Clarity |
| Chatbot                | Chatling AI                            |

---

## Features

### Audience Split
The site separates into two distinct experiences from the landing page:
- **Candidate side** (`/candidate`) — for job seekers looking for international placements
- **Recruiter side** (`/recruiter`) — for employers looking to hire skilled talent

### Authentication
- Email-based signup and login via Supabase Auth
- Role-based accounts: `candidate`, `recruiter`, `admin`
- Profile auto-created on signup via a Postgres trigger
- Admin access gated by `role = 'admin'` in the `profiles` table

### Job Management
- Admin can Add, Edit, Delete jobs from the admin dashboard
- Jobs have Active / Closed status toggle (deactivated jobs disappear from public listings)
- Featured and Urgent flags per job
- Public jobs page has search, industry filter, country filter, and tabs (All / Featured / Urgent / Recent)
- Job detail page with full description and application form

### Blog Management
- Admin can Add, Edit, Delete blog posts
- 3-state status: **Active** (public) / **Inactive** (hidden) / **Draft** (hidden, work in progress)
- New posts default to Draft — must be explicitly activated to go live
- Cover image URL field with placeholder fallback
- Separate blog listing and detail pages for both candidate and recruiter sides

### FAQ Management
- Admin can Add, Edit, Delete FAQs
- Active / Inactive toggle
- Audience field: `candidate`, `recruiter`, or `both` — controls which side the FAQ appears on
- Sort order field for manual display ordering

### Reviews & Testimonials (with Admin Approval)
- **Candidate Review Form** on the candidate homepage → saved to `candidate_reviews` table (unapproved) + email notification
- **Recruiter Review Form** on the recruiter homepage → saved to `recruiter_reviews` table + email notification
- Admin dashboard has separate **Candidate Reviews** and **Recruiter Reviews** tabs
- **Approve** → copies review into `testimonials` table (goes live on site immediately)
- **Reject** → deletes from the review queue
- Testimonials on homepages pull from Supabase with static demo fallback if no real testimonials exist yet

### Admin Dashboard (`/admin`)
Accessible only to users with `role = 'admin'`. Contains 5 tabs:
1. **Jobs** — Add, Edit, Delete, Activate/Deactivate jobs
2. **Candidate Reviews** — Approve or Reject pending candidate reviews
3. **Recruiter Reviews** — Approve or Reject pending recruiter reviews
4. **Blogs** — Add, Edit, Delete, status management (Active / Inactive / Draft)
5. **FAQs** — Add, Edit, Delete, Activate/Deactivate, audience and sort order control

### Contact Forms
All contact/submission forms send email notifications via EmailJS:
- Candidate and Recruiter contact forms
- Job application form (on each job detail page)
- FAQ question submission form

### Analytics & Tracking
- **Google Analytics 4** — pageview tracking for every client-side route change (not just initial load)
- **Microsoft Clarity** — session recordings and heatmaps
- Both loaded globally via `index.html`

### Design
- Color scheme: White (`#ffffff`) + Blue (`#0089cf`) + Navy (`#002561`)
- Fonts: Catamaran (headings) + Montserrat (body) via Google Fonts
- Animated route-line motif in hero sections (evoking international placement)
- Stats bar: **2000+ Candidates Placed · 20+ Countries · 500+ Partner Employers**
- Responsive layout with mobile burger menu

---

## Pages

### Candidate Side (`/candidate/...`)
| Route                   | Page                                                                                  |
|-------------------------|---------------------------------------------------------------------------------------|
| `/candidate`            | Homepage — hero, stats, featured jobs, how it works, media, testimonials, review form |
| `/candidate/jobs`       | Jobs listing with search and filters                                                  |
| `/candidate/jobs/:slug` | Job detail + application form                                                         |
| `/candidate/blog`       | Blog listing                                                                          |
| `/candidate/blog/:slug` | Blog post detail                                                                      |
| `/candidate/faqs`       | FAQ accordion (candidate + both audience)                                             |
| `/candidate/about`      | About page                                                                            |
| `/candidate/contact`    | Contact form                                                                          |

### Recruiter Side (`/recruiter/...`)
| Route                   | Page                                                                                  |
|-------------------------|---------------------------------------------------------------------------------------|
| `/recruiter`            | Homepage — hero, stats, services, how it works, testimonials, review form             |
| `/recruiter/services`   | Services overview                                                                     |
| `/recruiter/blog`       | Blog listing (same posts, different base path)                                        |
| `/recruiter/blog/:slug` | Blog post detail                                                                      |
| `/recruiter/faqs`       | FAQ accordion (recruiter + both audience)                                             |
| `/recruiter/about`      | About page                                                                            |
| `/recruiter/contact`    | Contact form                                                                          |

### Shared
| Route                   | Page                                                                                  |
|-------------------------|---------------------------------------------------------------------------------------|
| `/`                     | Landing page — audience selector (Candidate / Recruiter)                              |
| `/login`                | Login                                                                                 |
| `/register`             | Register                                                                              |
| `/admin`                | Admin dashboard (admin role required)                                                 |
| `/privacy`              | Privacy Policy                                                                        |
| `/terms`                | Terms & Conditions                                                                    |
| `/cookies`              | Cookie Policy                                                                         |

---

## Screenshots

> Add screenshots here once the site is deployed. Suggested captures:
> - Landing page (audience selector)
> - Candidate homepage (hero + stats bar)
> - Jobs page (search + filters)
> - Admin dashboard (Jobs tab + Blogs tab)
> - Recruiter homepage

---

## Project Structure

```
arte-recruitment/
├── public/
│   ├── logo.svg                  # Brand logo (header)
│   ├── logo-white.svg            # White logo (footer)
│   ├── blog-placeholder.jpg      # Default cover image for blog posts with no image set
│   ├── favicon.svg               # Browser tab icon
│   └── icons/                    # SVG icons used across the site
├── src/
│   ├── components/
│   │   ├── common/               # Button, Input, Modal, GeometricShapes, Icon
│   │   ├── forms/                # ContactForm, ReviewForm, RecruiterReviewForm,
│   │   │                         # JobApplicationForm, FAQForm, LoginForm, RegisterForm
│   │   ├── layout/               # Header, Footer, Layout
│   │   └── ui/                   # JobCard, TestimonialsSection, MediaCarousel, StatsBar
│   ├── contexts/
│   │   └── AuthContext.tsx       # Auth state, signIn, signUp, signOut
│   ├── data/
│   │   └── content.ts            # Static fallback content (demo jobs, FAQs, testimonials, etc.)
│   ├── lib/
│   │   ├── supabase.ts           # Supabase client initialisation
│   │   ├── email.ts              # EmailJS send wrapper
│   │   ├── analytics.ts          # GA4 pageview tracking utility
│   │   └── utils.ts              # Shared helpers (slugify, formatDate, etc.)
│   ├── pages/
│   │   ├── admin/                # AdminPage (Jobs, Reviews, Blogs, FAQs tabs)
│   │   ├── auth/                 # LoginPage, RegisterPage
│   │   ├── candidate/            # CandidateHomePage, JobsPage, JobDetailPage
│   │   ├── recruiter/            # RecruiterHomePage, ServicesPage
│   │   ├── shared/               # AboutPage, BlogPage, BlogDetailPage,
│   │   │                         # ContactPage, FAQPage, LegalPages
│   │   └── LandingPage.tsx       # Audience selector (root route)
│   ├── types/
│   │   └── index.ts              # TypeScript interfaces (Job, BlogPost, FAQ, etc.)
│   ├── App.tsx                   # Routes + AnalyticsTracker
│   ├── main.tsx                  # React entry point
│   └── index.css                 # Global styles, CSS variables, Tailwind
├── supabase/
│   └── schema.sql                # Full database schema — run this in Supabase SQL Editor
├── index.html                    # GA4 + Clarity + Chatling scripts
└── netlify.toml                  # Netlify build config + SPA redirect rule
```

---

## Getting Started (Local Development)

**Prerequisites:** Node.js 20+

```bash
# 1. Install dependencies
npm install

# 2. Set up environment variables
cp .env
# Fill in your real values (see Environment Variables section below)

# 3. Start dev server
npm run dev
# Opens at http://localhost:5173
```

---

## Environment Variables

Create a `.env` file at the project root (never commit this file):

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key

VITE_EMAILJS_SERVICE_ID=service_xxxxxxx
VITE_EMAILJS_TEMPLATE_ID=template_xxxxxxx
VITE_EMAILJS_PUBLIC_KEY=your-public-key
```

> GA4 Measurement ID and Microsoft Clarity Project ID are hardcoded directly in `index.html` and `src/lib/analytics.ts` (not env vars).

---

## Supabase Setup

1. Create a free project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** and run the full contents of `supabase/schema.sql`
3. Enable Email auth: **Authentication → Providers → Email → Enable**
4. Register an account on the live site, then run this in the SQL Editor to make yourself admin:
   ```sql
   UPDATE profiles SET role = 'admin' WHERE email = 'your-email@example.com';
   ```
5. Add your Supabase URL and anon key to `.env`

> **Note:** The schema in `supabase/schema.sql` is the base scaffold. Additional columns and policies were added during development (blog `status`, FAQ `status`, `recruiter_reviews` table, admin write policies). If you ever need to rebuild the database from scratch, run the base schema (/supabase/schema.sql) first, then refer to the migration notes below.

### Additional SQL applied after initial schema

The following were added after the initial schema was deployed and are **not** in `schema.sql`. Apply them manually if rebuilding:

```sql
-- Blog post status (replaces is_published boolean)
ALTER TABLE blog_posts ADD COLUMN status TEXT NOT NULL DEFAULT 'draft'
  CHECK (status IN ('active', 'inactive', 'draft'));
ALTER TABLE blog_posts ADD COLUMN updated_at TIMESTAMPTZ DEFAULT NOW();
DROP POLICY IF EXISTS "Published blog posts are viewable" ON blog_posts;
CREATE POLICY "Active blog posts are viewable by everyone" ON blog_posts
  FOR SELECT USING (status = 'active');
CREATE POLICY "Admins can view all blog posts" ON blog_posts
  FOR SELECT USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));
CREATE POLICY "Admins can insert blog posts" ON blog_posts
  FOR INSERT WITH CHECK (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));
CREATE POLICY "Admins can update blog posts" ON blog_posts
  FOR UPDATE USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));
CREATE POLICY "Admins can delete blog posts" ON blog_posts
  FOR DELETE USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

-- FAQ status and admin policies
ALTER TABLE faqs ADD COLUMN status TEXT NOT NULL DEFAULT 'active'
  CHECK (status IN ('active', 'inactive'));
ALTER TABLE faqs ADD COLUMN updated_at TIMESTAMPTZ DEFAULT NOW();
DROP POLICY IF EXISTS "FAQs are viewable by everyone" ON faqs;
CREATE POLICY "Active FAQs are viewable by everyone" ON faqs
  FOR SELECT USING (status = 'active');
CREATE POLICY "Admins can view all faqs" ON faqs
  FOR SELECT USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));
CREATE POLICY "Admins can insert faqs" ON faqs
  FOR INSERT WITH CHECK (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));
CREATE POLICY "Admins can update faqs" ON faqs
  FOR UPDATE USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));
CREATE POLICY "Admins can delete faqs" ON faqs
  FOR DELETE USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

-- Recruiter reviews table
CREATE TABLE recruiter_reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  company_name TEXT NOT NULL,
  email TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  review TEXT NOT NULL,
  is_approved BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE recruiter_reviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit recruiter review" ON recruiter_reviews
  FOR INSERT WITH CHECK (TRUE);
CREATE POLICY "Admins can view all recruiter reviews" ON recruiter_reviews
  FOR SELECT USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));
CREATE POLICY "Admins can update recruiter reviews" ON recruiter_reviews
  FOR UPDATE USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));
CREATE POLICY "Admins can delete recruiter reviews" ON recruiter_reviews
  FOR DELETE USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

-- Testimonials admin policies
CREATE POLICY "Admins can insert testimonials" ON testimonials
  FOR INSERT WITH CHECK (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));
CREATE POLICY "Admins can update testimonials" ON testimonials
  FOR UPDATE USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));
CREATE POLICY "Admins can delete testimonials" ON testimonials
  FOR DELETE USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

-- Jobs admin write policies
CREATE POLICY "Admins can insert jobs" ON jobs
  FOR INSERT WITH CHECK (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));
CREATE POLICY "Admins can update jobs" ON jobs
  FOR UPDATE USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));
CREATE POLICY "Admins can delete jobs" ON jobs
  FOR DELETE USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

-- Candidate reviews admin policies
CREATE POLICY "Admins can view all reviews" ON candidate_reviews
  FOR SELECT USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));
CREATE POLICY "Admins can update reviews" ON candidate_reviews
  FOR UPDATE USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));
CREATE POLICY "Admins can delete reviews" ON candidate_reviews
  FOR DELETE USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));
```

---

## EmailJS Setup

1. Create an account at [emailjs.com](https://emailjs.com)
2. Add a service (Gmail, Outlook, etc.) → copy the **Service ID**
3. Create a template with these variables:

   | Variable         | Description                      |
   |------------------|----------------------------------|
   | `{{subject}}`    | Email subject line               |
   | `{{form_type}}`  | Which form was submitted         |
   | `{{from_name}}`  | Sender's name                    |
   | `{{from_email}}` | Sender's email (set as Reply-To) |
   | `{{phone}}`      | Phone number (if provided)       |
   | `{{message}}`    | Form message / review content    |

4. Copy the **Template ID** and your **Public Key**
5. Add all three to `.env`

All 4 forms (Contact, Job Application, FAQ, Candidate Review, Recruiter Review) use this one shared template — the `form_type` field tells you which form each email came from.

---

## Netlify Deployment

1. Push the repo to GitHub
2. Connect the GitHub repo to Netlify
3. Build settings (auto-detected from `netlify.toml`):
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node version: `20`
4. Add environment variables in **Netlify → Site Settings → Environment Variables**:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `VITE_EMAILJS_SERVICE_ID`
   - `VITE_EMAILJS_TEMPLATE_ID`
   - `VITE_EMAILJS_PUBLIC_KEY`
5. Deploy — Netlify auto-deploys on every push to `main`

> The `netlify.toml` includes a catch-all redirect (`/* → /index.html`) so React Router's client-side routes work correctly on direct URL access and page refresh.

---

## Analytics

### Google Analytics 4
- Script loaded in `index.html`
- Measurement ID also set in `src/lib/analytics.ts`
- `AnalyticsTracker` component in `App.tsx` fires a pageview event on every React Router navigation (not just the initial page load)
- View data in [GA4 → Reports → Realtime](https://analytics.google.com)

### Microsoft Clarity
- Script loaded in `index.html`
- Records session replays and generates heatmaps automatically
- View data at [clarity.microsoft.com](https://clarity.microsoft.com)

---

## Customisation

| What                    | Where                                                                                     |
|-------------------------|-------------------------------------------------------------------------------------------|
| Logo                    | Replace `public/logo.svg` (header) and `public/logo-white.svg` (footer)                   |
| Favicon                 | Replace `public/favicon.svg`                                                              |
| Icons                   | SVG files in `public/icons/` — replace any file to update it sitewide                     |
| Brand colours           | `src/index.css` CSS variables — `--color-secondary` (#0089cf), `--color-accent` (#002561) |
| Fonts                   | Google Fonts link in `index.html` — currently Catamaran + Montserrat                      |
| Stats bar figures       | `src/components/ui/StatsBar.tsx`                                                          |
| Company info            | `src/data/content.ts` → `COMPANY` object                                                  |
| Static fallback content | `src/data/content.ts` — used when Supabase returns no data                                |
| Blog placeholder image  | Replace `public/blog-placeholder.jpg`                                                     |
| GA4 Measurement ID      | `index.html` (×2) and `src/lib/analytics.ts`                                              |
| Clarity Project ID      | `index.html`                                                                              |
| Chatbot                 | `index.html` — Chatling script at the bottom of `<body>`                                  |

---

## Demo / Fallback Mode

The site runs gracefully without Supabase configured:
- All pages, navigation, and UI work normally
- Jobs, blog posts, FAQs, and testimonials fall back to static demo content from `src/data/content.ts`
- Form submissions log to the browser console instead of saving to the database
- The admin dashboard shows demo jobs in memory (changes don't persist on refresh)

This makes local development possible without needing a live Supabase connection.

---

## Free Tier Limits

| Service           | Free Tier                                      |
|-------------------|------------------------------------------------|
| Supabase          | 500MB database, 50,000 monthly active users    |
| Netlify           | 100GB bandwidth/month, 300 build minutes/month |
| EmailJS           | 200 emails/month                               |
| Google Analytics  | Unlimited (free)                               |
| Microsoft Clarity | Unlimited (free)                               |
| Chatling AI       | Free tier available                            |

---

## Available Scripts

```bash
npm run dev       # Start development server (http://localhost:5173)
npm run build     # Production build → dist/
npm run preview   # Preview production build locally
npm run lint      # Run ESLint
```