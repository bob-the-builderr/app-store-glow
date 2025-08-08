-- Apps table to store user's apps and their information
create table if not exists public.apps (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  icon text,
  status text not null default 'active' check (status in ('active', 'inactive')),
  package text,
  developer text,
  country text,
  last_updated timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists apps_user_idx on public.apps (user_id);
create index if not exists apps_user_status_idx on public.apps (user_id, status);

alter table public.apps enable row level security;

-- RLS: users can only access their own apps
drop policy if exists 'Users can select own apps' on public.apps;
create policy 'Users can select own apps'
  on public.apps for select
  using (auth.uid() = user_id);

drop policy if exists 'Users can insert own apps' on public.apps;
create policy 'Users can insert own apps'
  on public.apps for insert
  with check (auth.uid() = user_id);

drop policy if exists 'Users can update own apps' on public.apps;
create policy 'Users can update own apps'
  on public.apps for update
  using (auth.uid() = user_id);

drop policy if exists 'Users can delete own apps' on public.apps;
create policy 'Users can delete own apps'
  on public.apps for delete
  using (auth.uid() = user_id);

-- Trigger to keep updated_at fresh
drop trigger if exists apps_updated_at on public.apps;
create trigger apps_updated_at
before update on public.apps
for each row execute function public.update_updated_at_column();

-- Update keywords table to reference apps instead of just app_package
alter table public.keywords 
add column if not exists app_id uuid references public.apps(id) on delete cascade;

-- Create index for the new app_id column
create index if not exists keywords_app_id_idx on public.keywords (app_id);

-- Update RLS policies for keywords to include app ownership check
drop policy if exists 'Users can select own keywords' on public.keywords;
create policy 'Users can select own keywords'
  on public.keywords for select
  using (
    auth.uid() = user_id and 
    (app_id is null or app_id in (
      select id from public.apps where user_id = auth.uid()
    ))
  );

drop policy if exists 'Users can insert own keywords' on public.keywords;
create policy 'Users can insert own keywords'
  on public.keywords for insert
  with check (
    auth.uid() = user_id and 
    (app_id is null or app_id in (
      select id from public.apps where user_id = auth.uid()
    ))
  );

drop policy if exists 'Users can update own keywords' on public.keywords;
create policy 'Users can update own keywords'
  on public.keywords for update
  using (
    auth.uid() = user_id and 
    (app_id is null or app_id in (
      select id from public.apps where user_id = auth.uid()
    ))
  );

drop policy if exists 'Users can delete own keywords' on public.keywords;
create policy 'Users can delete own keywords'
  on public.keywords for delete
  using (
    auth.uid() = user_id and 
    (app_id is null or app_id in (
      select id from public.apps where user_id = auth.uid()
    ))
  );
