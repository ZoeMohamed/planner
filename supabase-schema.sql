-- Menu Minggu — Supabase Schema
-- Run this in the Supabase SQL Editor

-- ============================================
-- DISHES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS dishes (
  id              BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name            TEXT NOT NULL,
  slot            TEXT NOT NULL CHECK (slot IN ('Lauk Utama', 'Sayur', 'Pelengkap', 'Buah/Dessert')),
  protein_tag     TEXT NOT NULL,
  method_tag      TEXT NOT NULL,
  spice_level     INTEGER DEFAULT 0,
  cost_per_portion INTEGER NOT NULL DEFAULT 0,
  ingredients     JSONB DEFAULT '[]'::jsonb,
  active          BOOLEAN DEFAULT true,
  last_served_date DATE,
  created_at      TIMESTAMPTZ DEFAULT now(),
  updated_at      TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE dishes ENABLE ROW LEVEL SECURITY;

-- Allow public read/write (no auth)
CREATE POLICY "Allow all access to dishes"
  ON dishes FOR ALL
  USING (true)
  WITH CHECK (true);

-- ============================================
-- WEEKLY MENUS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS weekly_menus (
  id              BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  week_start_date DATE NOT NULL UNIQUE,
  menu_data       JSONB NOT NULL DEFAULT '{}'::jsonb,
  total_cost      INTEGER DEFAULT 0,
  created_at      TIMESTAMPTZ DEFAULT now(),
  updated_at      TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE weekly_menus ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all access to weekly_menus"
  ON weekly_menus FOR ALL
  USING (true)
  WITH CHECK (true);
