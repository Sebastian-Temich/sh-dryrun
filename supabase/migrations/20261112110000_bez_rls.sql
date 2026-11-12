create table public.bez_rls (id bigint primary key, user_id uuid references auth.users (id));
