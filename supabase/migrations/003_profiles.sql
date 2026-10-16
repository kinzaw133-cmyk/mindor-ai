-- Profiles: one row per user, created automatically at sign-up and kept in sync with the name in auth metadata.
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  email text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

drop policy if exists "read own profile" on public.profiles;
create policy "read own profile" on public.profiles for select using (auth.uid() = id);
drop policy if exists "update own profile" on public.profiles;
create policy "update own profile" on public.profiles for update using (auth.uid() = id) with check (auth.uid() = id);

-- Runs with elevated rights so it can write the row even though the user has no INSERT policy.
create or replace function public.handle_user_upsert() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, full_name, email)
  values (new.id, new.raw_user_meta_data ->> 'full_name', new.email)
  on conflict (id) do update
    set full_name = excluded.full_name, email = excluded.email, updated_at = now();
  return new;
end $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users
  for each row execute function public.handle_user_upsert();

drop trigger if exists on_auth_user_updated on auth.users;
create trigger on_auth_user_updated after update of raw_user_meta_data, email on auth.users
  for each row execute function public.handle_user_upsert();

-- Backfill users who signed up before this migration
insert into public.profiles (id, full_name, email)
select id, raw_user_meta_data ->> 'full_name', email from auth.users
on conflict (id) do nothing;
