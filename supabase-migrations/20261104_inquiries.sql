-- Inquiries table: contact messages, partner inquiries and newsletter signups
-- Written by API routes using the service role only. No public policies.
create table if not exists public.inquiries (
  id uuid default gen_random_uuid() primary key,
  created_at timestamptz default now() not null,
  kind text not null check (kind in ('contact', 'partner', 'newsletter')),
  name text,
  email text not null,
  organization text,
  subject text,
  message text,
  payload jsonb not null default '{}'::jsonb,
  status text not null default 'new',
  ip_hash text
);

-- Only service role can access inquiries (admin only)
alter table public.inquiries enable row level security;

create index if not exists inquiries_kind_created_at_idx
  on public.inquiries (kind, created_at desc);

-- Repeat newsletter subscribes are no-ops
create unique index if not exists inquiries_newsletter_email_unique
  on public.inquiries (lower(email))
  where kind = 'newsletter';
