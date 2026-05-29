# Beam

A calm daily workspace that brings your **notes**, **todos**, and a **context-aware AI assistant** together on one page. Built by Beam Labs LLC.

- **Marketing site** — an S-tier landing page, pricing, and legal pages.
- **App** (`/app`) — today's auto-saving note, a todos rail, and **Beam**, an AI assistant that can see your note and todos.
- **Auth** — email + password via Supabase.
- **Billing** — Stripe subscriptions (monthly / annual) with a customer portal.

## Stack

| Concern        | Choice                                            |
| -------------- | ------------------------------------------------- |
| Framework      | Next.js (App Router) + TypeScript                 |
| Styling        | Tailwind CSS, custom "warm beam" dark theme       |
| Auth + DB      | Supabase (Postgres + Auth) via `@supabase/ssr`    |
| AI             | Anthropic API (server-side only)                  |
| Payments       | Stripe Billing                                    |
| Animation      | Motion (`motion/react`) — marketing pages only    |
| Deploy target  | Vercel                                            |

---

## 1. Prerequisites

- Node.js 18.18+ (Node 20+ recommended)
- A [Supabase](https://supabase.com) project
- A [Stripe](https://stripe.com) account
- An [Anthropic API key](https://console.anthropic.com)

## 2. Install

```bash
npm install
cp .env.example .env.local   # then fill in the values (see below)
```

## 3. Environment variables

Every variable lives in `.env.example`. Copy it to `.env.local` for local dev,
and set the same variables in the Vercel dashboard for production.

| Variable | Where to find it | Exposed to browser? |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Your site URL (`http://localhost:3000` locally) | yes |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase → Settings → API | yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase → Settings → API | yes |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase → Settings → API | **no — server only** |
| `ANTHROPIC_API_KEY` | Anthropic console | **no — server only** |
| `ANTHROPIC_MODEL` | optional, defaults to `claude-sonnet-4-6` | no |
| `STRIPE_SECRET_KEY` | Stripe → Developers → API keys | **no — server only** |
| `STRIPE_PRICE_MONTHLY` | Stripe price ID for the £14.99/mo plan | no |
| `STRIPE_PRICE_YEARLY` | Stripe price ID for the £49.99/yr plan | no |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret | **no — server only** |

> The build is designed to succeed even with these unset — all third-party
> clients are initialised lazily inside route handlers, never at module load.

## 4. Set up Supabase

1. Create a project at [supabase.com](https://supabase.com).
2. Open the **SQL Editor** and run the migration in
   [`supabase/migrations/0001_init.sql`](supabase/migrations/0001_init.sql).
   This creates `profiles`, `notes`, `todos`, and `messages`, enables **Row
   Level Security** on every table (each policy is keyed to
   `auth.uid() = user_id`), and adds a trigger that creates a profile row when
   a user signs up.
   - Alternatively, with the [Supabase CLI](https://supabase.com/docs/guides/cli):
     `supabase db push` (after `supabase link`).
3. **Auth settings** (Authentication → URL Configuration):
   - **Site URL**: your deployment URL (e.g. `https://your-app.vercel.app`),
     or `http://localhost:3000` locally.
   - **Redirect URLs**: add `${SITE_URL}/auth/confirm` and
     `${SITE_URL}/auth/callback`.
4. **Email confirmation** (Authentication → Providers → Email): for the SSR
   cookie flow, set the **"Confirm signup"** email template link to:

   ```
   {{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=email&next=/app
   ```

   (For quick local testing you can disable "Confirm email" so signup logs you
   straight in.)

## 5. Set up Stripe

1. Create one **Product** (e.g. "Beam") with two recurring **prices**:
   - £14.99 / month → copy its price ID into `STRIPE_PRICE_MONTHLY`
   - £49.99 / year → copy its price ID into `STRIPE_PRICE_YEARLY`
2. Copy your **secret key** into `STRIPE_SECRET_KEY`.
3. **Webhook** (Developers → Webhooks → Add endpoint):
   - Endpoint URL: `https://your-app.vercel.app/api/stripe/webhook`
   - Events: `checkout.session.completed`, `customer.subscription.created`,
     `customer.subscription.updated`, `customer.subscription.deleted`
   - Copy the **signing secret** into `STRIPE_WEBHOOK_SECRET`.
4. Enable the **Customer Portal** (Settings → Billing → Customer portal) so the
   "Manage billing" button works.

### Testing webhooks locally

```bash
stripe login
stripe listen --forward-to localhost:3000/api/stripe/webhook
# copy the printed whsec_... into STRIPE_WEBHOOK_SECRET
```

## 6. Run locally

```bash
npm run dev
# http://localhost:3000
```

- `/` — landing page
- `/pricing` — plans + Stripe checkout
- `/signup`, `/login` — auth
- `/app` — the workspace (redirects to `/login` if signed out)

## 7. Deploy to Vercel

This is a standard Next.js App Router project — **no custom server, no extra
config** beyond environment variables.

1. Push the repo to GitHub.
2. In [Vercel](https://vercel.com), **Add New → Project** and import the repo.
   Vercel auto-detects Next.js; accept the defaults.
3. In **Project → Settings → Environment Variables**, add **every** variable
   from `.env.example` (set `NEXT_PUBLIC_SITE_URL` to your Vercel domain).
4. Deploy.
5. **Post-deploy wiring:**
   - **Stripe webhook**: set the endpoint URL to
     `https://<your-domain>/api/stripe/webhook` and put its signing secret in
     `STRIPE_WEBHOOK_SECRET` (then redeploy if you changed it).
   - **Supabase**: set the **Site URL** and **Redirect URLs** (step 4 above) to
     your Vercel domain.

The Stripe webhook route runs on the **Node.js runtime** and verifies the raw
request body signature, which works out of the box on Vercel.

## Project structure

```
src/
  app/
    page.tsx              # landing page
    pricing/              # pricing + checkout
    terms|privacy|refunds|contact/   # legal (templated)
    login|signup/         # auth screens
    auth/confirm|callback # email / PKCE auth callbacks
    app/                  # the authenticated workspace
    api/
      chat/               # Beam AI (server-side Anthropic call)
      stripe/checkout|portal|webhook/
  components/
    marketing/            # landing + legal building blocks (animated)
    app/                  # workspace: note, todos, Beam panel, header
    auth/                 # auth form + shell
  lib/
    supabase/             # client / server / middleware / admin helpers
    stripe.ts             # lazy Stripe client
    anthropic.ts          # lazy Anthropic client
    constants.ts, dates.ts, types.ts
middleware.ts             # refreshes session + guards /app
supabase/migrations/      # schema + RLS
```

## Notes & scope

This is an MVP. Built intentionally to the spec; deliberately **not** included:
daily check-in, weekly reflection, smart-capture-to-todos, cross-note search,
sharing/collaboration, mobile app, themes, tags, integrations.

The legal pages (`/terms`, `/privacy`, `/refunds`, `/contact`) are populated
with the company's real contact details (address + `hello@beamday.app`) and
Colorado as the governing law, all sourced from `src/lib/constants.ts`. They
remain AI-drafted **templates** — have them reviewed by a qualified lawyer
before relying on them.

## Privacy

Your notes and todos are used only to operate the service and to power **your
own** Beam assistant. Content is **never used to train AI models**, and you can
delete it at any time. See [`/privacy`](src/app/privacy/page.tsx).
