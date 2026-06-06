# LABS — Longevity and Biohacking Society

Website for the LABS professional community. Built with Next.js 14, deployed on Vercel.

## Tech Stack
- **Framework:** Next.js 14 (App Router)
- **Hosting:** Vercel
- **Repository:** GitHub (aireadyteam)
- **Domain:** longevityandbiohacking.org (GoDaddy DNS)
- **Community:** Circle
- **Database:** Supabase (phase 2)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Pages
- `/` — Homepage
- `/about` — About LABS
- `/resources` — Cheat sheet library
- `/community` — Circle community groups
- `/events` — Events and programming
- `/conference` — Annual conference (January 2027)
- `/membership` — Membership tiers and pricing
- `/partners` — Partner program
- `/blog` — Articles and research
- `/newsletter` — LABS Report newsletter
- `/contact` — Contact

## Deployment

Connected to Vercel. Push to `main` branch triggers automatic deployment.

DNS is managed through GoDaddy pointing to Vercel nameservers.

## Design System
- **Display/Headlines:** Fraunces (variable, optical sizing)
- **Body:** Karla
- **Mono/Labels:** Fira Code
- **Primary color:** #138a48 (green)
- **Background:** #fafafa (light), #112119 (dark sections)

See `src/styles/globals.css` for full token set.
