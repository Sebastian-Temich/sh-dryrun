begin;
select plan(2);

select has_table('public', 'notatki', 'tabela notatki istnieje');
select is(
  (select relrowsecurity from pg_class where oid = 'public.notatki'::regclass),
  true,
  'RLS włączone'
);

select * from finish();
rollback;
