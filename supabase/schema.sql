-- ==============================================================================
-- FounderLedger — Complete Supabase Database Schema
-- Tables: users, startups, revenue_records, transactions
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==============================================================================
-- 1. USERS TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  clerk_id TEXT UNIQUE NOT NULL,
  name TEXT,
  email TEXT,
  avatar TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index on clerk_id for instant lookups
CREATE INDEX IF NOT EXISTS idx_users_clerk_id ON public.users(clerk_id);

-- Enable RLS
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to users"
  ON public.users FOR SELECT
  USING (true);

CREATE POLICY "Allow public insert/update to users"
  ON public.users FOR ALL
  USING (true)
  WITH CHECK (true);

-- ==============================================================================
-- 2. STARTUPS TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.startups (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  founder_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  category TEXT DEFAULT 'b2b_saas',
  description TEXT,
  logo_url TEXT,
  website TEXT,
  founded_year TEXT DEFAULT '2023',
  verified BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_startups_founder ON public.startups(founder_id);

ALTER TABLE public.startups ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to startups"
  ON public.startups FOR SELECT
  USING (true);

CREATE POLICY "Allow public insert/update to startups"
  ON public.startups FOR ALL
  USING (true)
  WITH CHECK (true);

-- ==============================================================================
-- 3. REVENUE_RECORDS TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.revenue_records (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  startup_id UUID REFERENCES public.startups(id) ON DELETE CASCADE,
  month TEXT NOT NULL,
  mrr BIGINT DEFAULT 0,
  arr BIGINT DEFAULT 0,
  customers INTEGER DEFAULT 0,
  growth NUMERIC(5,2) DEFAULT 0.0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_revenue_records_startup ON public.revenue_records(startup_id);

ALTER TABLE public.revenue_records ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to revenue_records"
  ON public.revenue_records FOR SELECT
  USING (true);

CREATE POLICY "Allow public insert/update to revenue_records"
  ON public.revenue_records FOR ALL
  USING (true)
  WITH CHECK (true);

-- ==============================================================================
-- 4. TRANSACTIONS TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.transactions (
  id TEXT PRIMARY KEY,
  startup_id UUID REFERENCES public.startups(id) ON DELETE CASCADE,
  amount BIGINT NOT NULL,
  source TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'Settled',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_transactions_startup ON public.transactions(startup_id);
CREATE INDEX IF NOT EXISTS idx_transactions_created ON public.transactions(created_at DESC);

ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to transactions"
  ON public.transactions FOR SELECT
  USING (true);

CREATE POLICY "Allow public insert/update to transactions"
  ON public.transactions FOR ALL
  USING (true)
  WITH CHECK (true);

-- ==============================================================================
-- SEED INITIAL MOCK DATA
-- ==============================================================================

-- 1. Insert seed user
INSERT INTO public.users (id, clerk_id, name, email, avatar)
VALUES (
  'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
  'user_demo_founder_001',
  'Aditya Sharma',
  'aditya@docupulse.ai',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'
) ON CONFLICT (clerk_id) DO NOTHING;

-- 2. Insert seed startup (DocuPulse AI)
INSERT INTO public.startups (
  id, founder_id, name, category, description, logo_url, website, founded_year, verified
) VALUES (
  'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380b22',
  'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
  'DocuPulse AI',
  'ai_devtools',
  'AI-powered GST invoice parsing & reconciliation for Indian CFOs & enterprise finance teams',
  NULL,
  'https://docupulse.ai',
  '2023',
  true
) ON CONFLICT (id) DO NOTHING;

-- 3. Insert 12-Month Revenue History
INSERT INTO public.revenue_records (startup_id, month, mrr, arr, customers, growth) VALUES
  ('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380b22', 'Apr 25', 780000, 9360000, 85, 14.2),
  ('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380b22', 'May 25', 890000, 10680000, 98, 14.1),
  ('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380b22', 'Jun 25', 1020000, 12240000, 114, 14.6),
  ('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380b22', 'Jul 25', 1180000, 14160000, 132, 15.6),
  ('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380b22', 'Aug 25', 1310000, 15720000, 149, 11.0),
  ('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380b22', 'Sep 25', 1420000, 17040000, 165, 8.4),
  ('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380b22', 'Oct 25', 1540000, 18480000, 182, 8.5),
  ('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380b22', 'Nov 25', 1620000, 19440000, 198, 5.2),
  ('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380b22', 'Dec 25', 1690000, 20280000, 215, 4.3),
  ('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380b22', 'Jan 26', 1740000, 20880000, 228, 3.0),
  ('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380b22', 'Feb 26', 1810000, 21720000, 239, 4.0),
  ('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380b22', 'Mar 26', 1850000, 22200000, 248, 2.2)
ON CONFLICT (id) DO NOTHING;

-- 4. Insert Transactions
INSERT INTO public.transactions (id, startup_id, amount, source, status) VALUES
  ('txn_9881A', 'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380b22', 45000, 'Razorpay Subscriptions', 'Captured'),
  ('txn_9882B', 'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380b22', 124000, 'ICICI Bank Wire', 'Settled'),
  ('txn_9883C', 'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380b22', 18500, 'UPI AutoPay', 'Reconciled'),
  ('txn_9884D', 'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380b22', 84000, 'Razorpay Subscriptions', 'Captured'),
  ('txn_9885E', 'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380b22', 29999, 'Stripe India', 'Settled'),
  ('txn_9886F', 'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380b22', 62500, 'UPI AutoPay', 'Reconciled'),
  ('txn_9887G', 'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380b22', 48000, 'UPI AutoPay', 'Captured'),
  ('txn_9888H', 'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380b22', 95000, 'Razorpay Subscriptions', 'Settled')
ON CONFLICT (id) DO NOTHING;
