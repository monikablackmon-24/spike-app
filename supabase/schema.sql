-- ============================================================
-- SPIKE Volleyball App — Database Schema
-- Run this in Supabase: Dashboard → SQL Editor → New query
-- ============================================================

-- Profiles (extends Supabase auth.users)
create table if not exists public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  display_name text not null default '',
  role text not null default 'player' check (role in ('player', 'coach', 'parent', 'admin')),
  avatar_url text,
  level integer not null default 1,
  xp integer not null default 0,
  streak_count integer not null default 0,
  last_active date not null default current_date,
  streak_shield_used boolean not null default false,
  skill_serve integer not null default 0,
  skill_pass integer not null default 0,
  skill_set integer not null default 0,
  skill_attack integer not null default 0,
  skill_block integer not null default 0,
  skill_defense integer not null default 0,
  skill_fitness integer not null default 0,
  created_at timestamptz not null default now()
);

-- Video completions
create table if not exists public.video_completions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  video_id text not null,
  xp_awarded integer not null default 15,
  completed_at timestamptz not null default now(),
  unique(user_id, video_id)
);

-- Session completions (completing a full plan session)
create table if not exists public.session_completions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  plan_id text not null,
  session_key text not null,
  xp_awarded integer not null default 50,
  completed_at timestamptz not null default now(),
  unique(user_id, plan_id, session_key)
);

-- Badges earned
create table if not exists public.badges (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  badge_id text not null,
  earned_at timestamptz not null default now(),
  unique(user_id, badge_id)
);

-- Active plan assignments
create table if not exists public.plan_assignments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  plan_id text not null,
  assigned_by uuid references auth.users(id) on delete set null,
  start_date date not null default current_date,
  end_date date,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

-- Teams (for Coach Mode)
create table if not exists public.teams (
  id uuid primary key default gen_random_uuid(),
  coach_id uuid references auth.users(id) on delete cascade not null,
  name text not null,
  invite_code text not null unique default upper(substring(gen_random_uuid()::text, 1, 8)),
  created_at timestamptz not null default now()
);

-- Team members
create table if not exists public.team_members (
  team_id uuid references public.teams(id) on delete cascade,
  player_id uuid references auth.users(id) on delete cascade,
  joined_at timestamptz not null default now(),
  primary key (team_id, player_id)
);

-- ============================================================
-- Row Level Security
-- ============================================================

alter table public.profiles enable row level security;
alter table public.video_completions enable row level security;
alter table public.session_completions enable row level security;
alter table public.badges enable row level security;
alter table public.plan_assignments enable row level security;
alter table public.teams enable row level security;
alter table public.team_members enable row level security;

-- Profiles: users can read all profiles, but only edit their own
create policy "profiles_select" on public.profiles for select using (true);
create policy "profiles_update" on public.profiles for update using (auth.uid() = id);

-- Video completions: own rows only
create policy "video_completions_select" on public.video_completions for select using (auth.uid() = user_id);
create policy "video_completions_insert" on public.video_completions for insert with check (auth.uid() = user_id);

-- Session completions: own rows only
create policy "session_completions_select" on public.session_completions for select using (auth.uid() = user_id);
create policy "session_completions_insert" on public.session_completions for insert with check (auth.uid() = user_id);

-- Badges: own rows only
create policy "badges_select" on public.badges for select using (auth.uid() = user_id);
create policy "badges_insert" on public.badges for insert with check (auth.uid() = user_id);

-- Plan assignments: own rows, or coach who assigned
create policy "plan_assignments_select" on public.plan_assignments for select using (auth.uid() = user_id or auth.uid() = assigned_by);
create policy "plan_assignments_insert" on public.plan_assignments for insert with check (auth.uid() = user_id or auth.uid() = assigned_by);
create policy "plan_assignments_update" on public.plan_assignments for update using (auth.uid() = user_id or auth.uid() = assigned_by);

-- Teams: coaches manage their own teams, players can see teams they belong to
create policy "teams_select" on public.teams for select using (auth.uid() = coach_id);
create policy "teams_insert" on public.teams for insert with check (auth.uid() = coach_id);
create policy "team_members_select" on public.team_members for select using (
  auth.uid() = player_id or
  exists (select 1 from public.teams where id = team_id and coach_id = auth.uid())
);
create policy "team_members_insert" on public.team_members for insert with check (
  exists (select 1 from public.teams where id = team_id and coach_id = auth.uid())
);

-- ============================================================
-- Auto-create profile on signup
-- ============================================================

create or replace function public.handle_new_user()
returns trigger
language plpgsql security definer set search_path = public
as $$
begin
  insert into public.profiles (id, display_name, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1)),
    coalesce(new.raw_user_meta_data->>'role', 'player')
  );
  return new;
end;
$$;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ============================================================
-- Award XP and update level + streak
-- ============================================================

create or replace function public.award_xp(p_user_id uuid, p_xp integer)
returns void
language plpgsql security definer
as $$
declare
  v_xp integer;
  v_level integer;
begin
  update public.profiles
  set xp = xp + p_xp
  where id = p_user_id
  returning xp into v_xp;

  -- Recalculate level from XP
  v_level := case
    when v_xp < 500   then greatest(1, floor(v_xp / 167.0) + 1)
    when v_xp < 1500  then floor((v_xp - 500) / 333.0) + 4
    when v_xp < 3500  then floor((v_xp - 1500) / 667.0) + 7
    when v_xp < 7000  then floor((v_xp - 3500) / 1167.0) + 10
    when v_xp < 12000 then floor((v_xp - 7000) / 1667.0) + 13
    else 16
  end;

  update public.profiles set level = v_level where id = p_user_id;
end;
$$;

-- Update streak on login/activity
create or replace function public.update_streak(p_user_id uuid)
returns void
language plpgsql security definer
as $$
declare
  v_last_active date;
  v_streak integer;
  v_shield boolean;
begin
  select last_active, streak_count, streak_shield_used
  into v_last_active, v_streak, v_shield
  from public.profiles where id = p_user_id;

  if v_last_active = current_date then
    -- Already updated today, do nothing
    return;
  elsif v_last_active = current_date - 1 then
    -- Consecutive day
    update public.profiles
    set streak_count = streak_count + 1,
        last_active = current_date,
        streak_shield_used = false
    where id = p_user_id;
  elsif v_last_active = current_date - 2 and not v_shield then
    -- Missed one day but has shield
    update public.profiles
    set last_active = current_date,
        streak_shield_used = true
    where id = p_user_id;
  else
    -- Streak broken
    update public.profiles
    set streak_count = 1,
        last_active = current_date,
        streak_shield_used = false
    where id = p_user_id;
  end if;
end;
$$;
