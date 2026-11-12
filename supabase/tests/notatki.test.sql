begin;
select plan(7);

insert into auth.users (id, email) values
  ('00000000-0000-0000-0000-00000000000a', 'a@example.com'),
  ('00000000-0000-0000-0000-00000000000b', 'b@example.com');
insert into public.notatki (user_id, tresc) values
  ('00000000-0000-0000-0000-00000000000a', 'notatka A'),
  ('00000000-0000-0000-0000-00000000000b', 'notatka B');

set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-00000000000a","role":"authenticated"}', true);

select results_eq('select tresc from public.notatki', $$values ('notatka A')$$, 'A widzi tylko swoje');
select lives_ok($$insert into public.notatki (user_id, tresc) values ('00000000-0000-0000-0000-00000000000a', 'nowa')$$, 'A dodaje swoja');
select throws_ok($$insert into public.notatki (user_id, tresc) values ('00000000-0000-0000-0000-00000000000b', 'cudza')$$, '42501', null, 'A nie dodaje cudzej');
select is_empty($$update public.notatki set tresc = 'x' where user_id = '00000000-0000-0000-0000-00000000000b' returning id$$, 'A nie zmienia cudzej');
select throws_ok($$update public.notatki set user_id = '00000000-0000-0000-0000-00000000000b' where tresc = 'notatka A'$$, '42501', null, 'A nie przepisuje swojej na B');
select is_empty($$delete from public.notatki where user_id = '00000000-0000-0000-0000-00000000000b' returning id$$, 'A nie usuwa cudzej');

reset role;
select is((select count(*)::int from public.notatki where user_id = '00000000-0000-0000-0000-00000000000b'), 1, 'notatka B nietknieta');

select * from finish();
rollback;
