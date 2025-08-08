-- Create extensions if needed
create extension if not exists pgcrypto;

-- Helper function to keep updated_at fresh
create or replace function public.update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Profiles table for user data
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

-- RLS policies for profiles (drop then create for idempotency)
drop policy if exists "Users can view their own profile" on public.profiles;
create policy "Users can view their own profile"
  on public.profiles for select
  using (auth.uid() = id);

drop policy if exists "Users can insert their own profile" on public.profiles;
create policy "Users can insert their own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

drop policy if exists "Users can update their own profile" on public.profiles;
create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Trigger to keep updated_at fresh
drop trigger if exists profiles_updated_at on public.profiles;
create trigger profiles_updated_at
before update on public.profiles
for each row execute function public.update_updated_at_column();

-- Keywords table to persist user keywords per app and region
create table if not exists public.keywords (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  app_package text not null,
  region text not null,
  keyword text not null,
  score int,
  rank int,
  lang text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists keywords_user_idx on public.keywords (user_id);
create index if not exists keywords_user_app_region_idx on public.keywords (user_id, app_package, region);

alter table public.keywords enable row level security;

-- RLS: users can only access their own rows
drop policy if exists "Users can select own keywords" on public.keywords;
create policy "Users can select own keywords"
  on public.keywords for select
  using (auth.uid() = user_id);

drop policy if exists "Users can insert own keywords" on public.keywords;
create policy "Users can insert own keywords"
  on public.keywords for insert
  with check (auth.uid() = user_id);

drop policy if exists "Users can update own keywords" on public.keywords;
create policy "Users can update own keywords"
  on public.keywords for update
  using (auth.uid() = user_id);

drop policy if exists "Users can delete own keywords" on public.keywords;
create policy "Users can delete own keywords"
  on public.keywords for delete
  using (auth.uid() = user_id);

-- Trigger to keep updated_at fresh
drop trigger if exists keywords_updated_at on public.keywords;
create trigger keywords_updated_at
before update on public.keywords
for each row execute function public.update_updated_at_column();