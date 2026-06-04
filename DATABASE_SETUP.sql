-- MAX & Co final database setup
-- Run this once inside Supabase SQL Editor.

create extension if not exists "pgcrypto";

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,

  user_id uuid references auth.users(id) on delete set null,
  student_email text,

  student_name text not null,
  class_grade text not null,
  project_type text not null,
  subject text not null,
  topic text not null,
  pages text not null,
  deadline text not null,

  instructions text,
  reference_notes text,

  status text not null default 'new',

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.order_messages (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  sender text not null check (sender in ('customer', 'owner', 'system')),
  body text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.push_subscriptions (
  id uuid primary key default gen_random_uuid(),
  endpoint text not null unique,
  p256dh text not null,
  auth text not null,
  created_at timestamptz not null default now()
);

create index if not exists orders_code_idx on public.orders(code);
create index if not exists orders_created_at_idx on public.orders(created_at desc);
create index if not exists orders_user_id_idx on public.orders(user_id);
create index if not exists order_messages_order_id_created_at_idx on public.order_messages(order_id, created_at asc);
create index if not exists push_subscriptions_endpoint_idx on public.push_subscriptions(endpoint);

alter table public.orders enable row level security;
alter table public.order_messages enable row level security;
alter table public.push_subscriptions enable row level security;

-- This app uses Next.js API routes with SUPABASE_SERVICE_ROLE_KEY.
-- Never expose SUPABASE_SERVICE_ROLE_KEY in browser code or GitHub.
