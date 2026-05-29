-- Beam — initial schema with Row Level Security.
-- Run this in the Supabase SQL editor (or via the Supabase CLI) once.

-- ---------------------------------------------------------------------------
-- profiles: one row per auth user, holds billing linkage.
-- ---------------------------------------------------------------------------
create table if not exists public.profiles (
  id                  uuid primary key references auth.users (id) on delete cascade,
  created_at          timestamptz not null default now(),
  stripe_customer_id  text unique,
  subscription_status text
);

alter table public.profiles enable row level security;

create policy "Profiles are viewable by their owner"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can insert their own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- Automatically create a profile row when a new auth user signs up.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id)
  values (new.id)
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------------------------------------------------------------------------
-- notes: one row per user per calendar day.
-- ---------------------------------------------------------------------------
create table if not exists public.notes (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references auth.users (id) on delete cascade,
  note_date  date not null,
  body       text not null default '',
  updated_at timestamptz not null default now(),
  unique (user_id, note_date)
);

create index if not exists notes_user_date_idx
  on public.notes (user_id, note_date desc);

alter table public.notes enable row level security;

create policy "Users manage their own notes"
  on public.notes for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- todos
-- ---------------------------------------------------------------------------
create table if not exists public.todos (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users (id) on delete cascade,
  todo_date   date not null,
  text        text not null,
  done        boolean not null default false,
  due_date    date,
  sort_order  integer not null default 0,
  created_at  timestamptz not null default now()
);

create index if not exists todos_user_date_idx
  on public.todos (user_id, todo_date, sort_order);

alter table public.todos enable row level security;

create policy "Users manage their own todos"
  on public.todos for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- messages: Beam chat history.
-- ---------------------------------------------------------------------------
create table if not exists public.messages (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references auth.users (id) on delete cascade,
  role       text not null check (role in ('user', 'assistant')),
  content    text not null,
  created_at timestamptz not null default now()
);

create index if not exists messages_user_created_idx
  on public.messages (user_id, created_at);

alter table public.messages enable row level security;

create policy "Users manage their own messages"
  on public.messages for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
