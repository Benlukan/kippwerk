-- KIPPWERK · Online-Bestenliste (Supabase)
-- Einmal komplett im Supabase-Dashboard unter "SQL Editor" ausführen.
-- Kann gefahrlos erneut ausgeführt werden (Funktionen werden ersetzt, Daten bleiben).
--
-- Sicherheitsprinzip: Die Tabelle ist für die App NICHT direkt lesbar/schreibbar
-- (RLS an, keine Policies). Die App ruft nur die vier Funktionen unten auf.
-- Die volle Spieler-ID verlässt den Server nie, öffentlich ist nur die Kurzkennung (#1A2B).

create table if not exists public.kw_scores (
  id          bigint generated always as identity primary key,
  player_id   uuid        not null,
  name        text        not null check (char_length(name) between 1 and 12),
  mode        text        not null check (mode in ('daily', 'endless')),
  size        smallint    not null check (size between 5 and 8),
  daily_no    integer     not null default 0,      -- 0 = Endlos
  score       integer     not null check (score between 0 and 10000000),
  level       integer     not null default 0 check (level between 0 and 10000),
  chain       integer     not null default 0 check (chain between 0 and 1000),
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  unique (player_id, mode, size, daily_no),
  check ((mode = 'daily' and daily_no > 0 and size = 6) or (mode = 'endless' and daily_no = 0))
);

create index if not exists kw_scores_board on public.kw_scores (mode, size, daily_no, score desc);

alter table public.kw_scores enable row level security;
revoke all on table public.kw_scores from anon, authenticated;

-- Tagesrätsel-Nummer wie im Spiel: #1 = 30.10.2026
create or replace function public.kw_daily_no_today()
returns integer language sql stable set search_path = '' as $$
  select (current_date - date '2026-10-30') + 1
$$;

create or replace function public.kw_clean_name(p_name text)
returns text language sql immutable set search_path = '' as $$
  select coalesce(nullif(left(btrim(regexp_replace(coalesce(p_name, ''), '[[:cntrl:]<>]', '', 'g')), 12), ''), 'Spieler')
$$;

-- Ergebnis einreichen. Tagesrätsel: nur das erste zählt. Endlos: nur das beste je Feldgröße.
-- Gibt die aktuelle Platzierung zurück.
create or replace function public.kw_submit(
  p_player uuid, p_name text, p_mode text, p_size integer,
  p_daily_no integer, p_score integer, p_level integer default 0, p_chain integer default 0
) returns integer
language plpgsql security definer set search_path = '' as $$
declare
  v_name  text := public.kw_clean_name(p_name);
  v_today integer := public.kw_daily_no_today();
  v_no    integer := case when p_mode = 'daily' then p_daily_no else 0 end;
  v_size  integer := case when p_mode = 'daily' then 6 else p_size end;
  v_score integer;
begin
  if p_player is null or p_mode not in ('daily', 'endless') then
    raise exception 'ungültige Anfrage';
  end if;
  -- Zeitzonen-Spielraum: gestern bis morgen
  if p_mode = 'daily' and (v_no is null or v_no < v_today - 1 or v_no > v_today + 1) then
    raise exception 'Tagesrätsel nicht mehr offen';
  end if;

  insert into public.kw_scores as s (player_id, name, mode, size, daily_no, score, level, chain)
  values (p_player, v_name, p_mode, v_size, v_no, p_score, coalesce(p_level, 0), coalesce(p_chain, 0))
  on conflict (player_id, mode, size, daily_no) do update
    set score = excluded.score, level = excluded.level, chain = excluded.chain,
        name = excluded.name, updated_at = now()
    where s.mode = 'endless' and excluded.score > s.score;

  -- Name gilt für alle Einträge des Spielers
  update public.kw_scores set name = v_name where player_id = p_player and name <> v_name;

  select score into v_score from public.kw_scores
   where player_id = p_player and mode = p_mode and size = v_size and daily_no = v_no;

  return (select count(*) + 1 from public.kw_scores
           where mode = p_mode and size = v_size and daily_no = v_no and score > v_score);
end $$;

-- Top-Liste (max. 50) + eigene Zeile, falls man nicht in den Top ist
create or replace function public.kw_top(
  p_mode text, p_size integer, p_daily_no integer default 0,
  p_player uuid default null, p_limit integer default 10
) returns table (rank bigint, name text, tag text, score integer, level integer, chain integer, day date, is_me boolean)
language sql stable security definer set search_path = '' as $$
  with r as (
    select rank() over (order by s.score desc, s.created_at) as rank,
           s.name, upper(left(replace(s.player_id::text, '-', ''), 4)) as tag,
           s.score, s.level, s.chain, (s.updated_at at time zone 'Europe/Berlin')::date as day,
           (p_player is not null and s.player_id = p_player) as is_me
      from public.kw_scores s
     where s.mode = p_mode
       and s.size = case when p_mode = 'daily' then 6 else p_size end
       and s.daily_no = case when p_mode = 'daily' then p_daily_no else 0 end
  )
  select * from r where r.rank <= least(greatest(coalesce(p_limit, 10), 1), 50) or r.is_me
  order by r.rank
$$;

-- Tagesspiel-Bestenlisten (ab v1.13.0):
--   'day'  = Tagesspiel p_daily_no
--   'week' = Summe aller Tagesspiele der Woche (Mo–So) von p_daily_no, je Spieler
--   'all'  = bestes einzelnes Tagesspiel je Spieler, aller Zeiten ("All the best")
create or replace function public.kw_top_daily(
  p_period text, p_daily_no integer, p_player uuid default null, p_limit integer default 10
) returns table (rank bigint, name text, tag text, score bigint, days integer, chain integer, day date, is_me boolean)
language sql stable security definer set search_path = '' as $$
  with base as (
    select s.player_id, s.name, s.score, s.chain, s.created_at,
           date '2026-10-30' + (s.daily_no - 1) as d
      from public.kw_scores s
     where s.mode = 'daily'
  ), sel as (
    select * from base b
     where case p_period
             when 'day'  then b.d = date '2026-10-30' + (p_daily_no - 1)
             when 'week' then date_trunc('week', b.d) = date_trunc('week', date '2026-10-30' + (p_daily_no - 1))
             else true end
  ), agg as (
    select player_id, max(name) as name,
           case when p_period = 'week' then sum(score) else max(score)::bigint end as score,
           count(*)::integer as days,
           (array_agg(chain order by score desc, created_at))[1] as chain,
           (array_agg(d order by score desc, created_at))[1] as day,
           min(created_at) as first_at
      from sel group by player_id
  ), r as (
    select rank() over (order by a.score desc, a.first_at) as rank,
           a.name, upper(left(replace(a.player_id::text, '-', ''), 4)) as tag,
           a.score, a.days, a.chain, a.day,
           (p_player is not null and a.player_id = p_player) as is_me
      from agg a
  )
  select * from r where r.rank <= least(greatest(coalesce(p_limit, 10), 1), 50) or r.is_me
  order by r.rank
$$;

-- Namen ändern (alle eigenen Einträge)
create or replace function public.kw_rename(p_player uuid, p_name text)
returns void language sql security definer set search_path = '' as $$
  update public.kw_scores set name = public.kw_clean_name(p_name) where player_id = p_player
$$;

-- Alle eigenen Online-Einträge löschen (DSGVO). Gibt die Anzahl zurück.
create or replace function public.kw_delete(p_player uuid)
returns integer language plpgsql security definer set search_path = '' as $$
declare n integer;
begin
  delete from public.kw_scores where player_id = p_player;
  get diagnostics n = row_count;
  return n;
end $$;

-- Nur diese Funktionen sind für die App freigegeben
revoke execute on function public.kw_submit(uuid, text, text, integer, integer, integer, integer, integer) from public;
revoke execute on function public.kw_top(text, integer, integer, uuid, integer) from public;
revoke execute on function public.kw_top_daily(text, integer, uuid, integer) from public;
revoke execute on function public.kw_rename(uuid, text) from public;
revoke execute on function public.kw_delete(uuid) from public;
grant execute on function public.kw_submit(uuid, text, text, integer, integer, integer, integer, integer) to anon, authenticated;
grant execute on function public.kw_top(text, integer, integer, uuid, integer) to anon, authenticated;
grant execute on function public.kw_top_daily(text, integer, uuid, integer) to anon, authenticated;
grant execute on function public.kw_rename(uuid, text) to anon, authenticated;
grant execute on function public.kw_delete(uuid) to anon, authenticated;
