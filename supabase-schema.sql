-- LABS Database Schema
-- Run this in your Supabase SQL Editor after creating the project

-- Members table
create table public.members (
  id uuid references auth.users on delete cascade not null primary key,
  email text not null unique,
  name text not null,
  tier text not null default 'explorer' check (tier in ('explorer', 'pro', 'leader')),
  status text not null default 'active' check (status in ('active', 'inactive', 'pending')),
  stripe_customer_id text,
  circle_invited_at timestamptz,
  notes text,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- Enable RLS
alter table public.members enable row level security;

-- Members can read their own record
create policy "Members can view own record"
  on public.members for select
  using (auth.uid() = id);

-- Members can update their own name
create policy "Members can update own name"
  on public.members for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- Applications table (PRO/Leader/Partner applications)
create table public.applications (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null,
  tier text not null check (tier in ('PRO', 'Leader', 'Partner')),
  organization text,
  role text,
  why text,
  status text not null default 'pending' check (status in ('pending', 'approved', 'declined', 'waitlisted')),
  notes text,
  created_at timestamptz default now() not null,
  reviewed_at timestamptz,
  reviewed_by text
);

-- Only service role can access applications (admin only)
alter table public.applications enable row level security;

-- No public access to applications — accessed via service role only
-- (Admin uses Supabase dashboard or service role API)

-- Auto-update updated_at on members
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger on_members_updated
  before update on public.members
  for each row execute procedure public.handle_updated_at();

-- View for admin (shows all members with basic info)
create view public.members_admin_view as
  select
    id, email, name, tier, status,
    circle_invited_at,
    created_at, updated_at
  from public.members
  order by created_at desc;

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
