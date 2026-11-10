create table public.notatki (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users (id) on delete cascade,
  tresc text not null,
  utworzono timestamptz not null default now()
);

alter table public.notatki enable row level security;

create policy notatki_select on public.notatki for select using (auth.uid() = user_id);
create policy notatki_insert on public.notatki for insert with check (auth.uid() = user_id);
create policy notatki_update on public.notatki for update using (auth.uid() = user_id);
create policy notatki_delete on public.notatki for delete using (auth.uid() = user_id);
