-- =========================================================================
-- POSYTEXTS.COM — Supabase Database Schema
-- Creator: Shruti Arya (miss.shrutiarya@gmail.com)
-- 
-- Instructions:
-- 1. Go to your Supabase Project Dashboard (https://supabase.com/dashboard)
-- 2. Click on "SQL Editor" in the left sidebar
-- 3. Paste this entire script and click "Run" (Ctrl+Enter)
-- 4. Your posy database is now live with public read, insert & opened tracking!
-- =========================================================================

-- 1. Create table for storing bouquets and letters
create table if not exists public.posies (
  id text primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  recipient_name text not null,
  recipient_email text,
  sender_name text,
  sender_email text,
  message text,
  paper_style text default 'vintage-cream',
  font_style text default 'font-handwriting',
  stickers jsonb default '[]'::jsonb,
  opened boolean default false,
  opened_at timestamp with time zone
);

-- 2. Enable Row Level Security (RLS) for data protection
alter table public.posies enable row level security;

-- 3. Policy: Anyone can read posy by ID (allows recipients to unseal their letter)
drop policy if exists "Allow public read posies" on public.posies;
create policy "Allow public read posies" 
  on public.posies 
  for select 
  using (true);

-- 4. Policy: Anyone can insert a posy (allows senders to seal their letter)
drop policy if exists "Allow public insert posies" on public.posies;
create policy "Allow public insert posies" 
  on public.posies 
  for insert 
  with check (true);

-- 5. Policy: Anyone can update opened status when unsealing
drop policy if exists "Allow public update opened status" on public.posies;
create policy "Allow public update opened status" 
  on public.posies 
  for update 
  using (true)
  with check (true);

-- 6. Performance index for instant letter retrieval
create index if not exists idx_posies_id on public.posies (id);
