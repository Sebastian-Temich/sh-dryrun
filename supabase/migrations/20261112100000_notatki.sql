create table public.notatki (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users (id) on delete cascade,
  tresc text not null check (char_length(tresc) <= 2000),
  utworzono timestamptz not null default now()
);
create index notatki_user_id_idx on public.notatki (user_id);
alter table public.notatki enable row level security;

create policy notatki_select on public.notatki for select to authenticated
  using ((select auth.uid()) = user_id);
create policy notatki_insert on public.notatki for insert to authenticated
  with check ((select auth.uid()) = user_id);
create policy notatki_update on public.notatki for update to authenticated
  using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy notatki_delete on public.notatki for delete to authenticated
  using ((select auth.uid()) = user_id);
