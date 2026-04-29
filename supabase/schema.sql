create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text,
  role text not null default 'viewer' check (role in ('viewer', 'admin')),
  created_at timestamptz not null default now()
);

create table if not exists public.documents (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  category text not null default 'General',
  file_name text not null,
  file_type text,
  file_size bigint,
  storage_path text not null unique,
  public_url text not null,
  preview_kind text not null default 'file',
  uploaded_by uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now()
);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
as $$
begin
  insert into public.profiles (id, full_name, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', new.email),
    'viewer'
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();

alter table public.profiles enable row level security;
alter table public.documents enable row level security;

drop policy if exists "profiles_read_own" on public.profiles;
create policy "profiles_read_own"
on public.profiles
for select
to authenticated
using (auth.uid() = id);

drop policy if exists "documents_public_read" on public.documents;
create policy "documents_public_read"
on public.documents
for select
to anon, authenticated
using (true);

drop policy if exists "documents_admin_insert" on public.documents;
create policy "documents_admin_insert"
on public.documents
for insert
to authenticated
with check (
  exists (
    select 1
    from public.profiles
    where profiles.id = auth.uid()
      and profiles.role = 'admin'
  )
);

drop policy if exists "documents_admin_delete" on public.documents;
create policy "documents_admin_delete"
on public.documents
for delete
to authenticated
using (
  exists (
    select 1
    from public.profiles
    where profiles.id = auth.uid()
      and profiles.role = 'admin'
  )
);

insert into storage.buckets (id, name, public)
values ('documents', 'documents', true)
on conflict (id) do nothing;

drop policy if exists "storage_documents_public_read" on storage.objects;
create policy "storage_documents_public_read"
on storage.objects
for select
to anon, authenticated
using (bucket_id = 'documents');

drop policy if exists "storage_documents_admin_insert" on storage.objects;
create policy "storage_documents_admin_insert"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'documents'
  and exists (
    select 1
    from public.profiles
    where profiles.id = auth.uid()
      and profiles.role = 'admin'
  )
);

drop policy if exists "storage_documents_admin_delete" on storage.objects;
create policy "storage_documents_admin_delete"
on storage.objects
for delete
to authenticated
using (
  bucket_id = 'documents'
  and exists (
    select 1
    from public.profiles
    where profiles.id = auth.uid()
      and profiles.role = 'admin'
  )
);
