alter table public.conversations
  add column if not exists track text not null default 'general'
  check (track in ('general','iba','nthp','sthp'));
