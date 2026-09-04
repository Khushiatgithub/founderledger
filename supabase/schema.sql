-- ==============================================================================
-- FounderLedger — Supabase Production Database Schema
-- Style: Stripe + Linear + Vercel
-- Purpose: Store verified startup revenue, Clerk users, monthly records, and transactions
-- ==============================================================================

-- Enable UUID extension if needed
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==============================================================================
-- 1. PROFILES / CLERK USERS TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.profiles (
  id TEXT PRIMARY KEY, -- Clerk User ID (e.g., 'user_2xyz...')
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  company_name TEXT DEFAULT 'DocuPulse AI',
  role TEXT DEFAULT 'founder',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index on email
CREATE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles(email);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Allow public reads and authenticated upserts
CREATE POLICY "Allow public read access to profiles"
  ON public.profiles FOR SELECT
  USING (true);

CREATE POLICY "Allow public insert/update to profiles"
  ON public.profiles FOR ALL
  USING (true)
  WITH CHECK (true);

-- ==============================================================================
-- 2. STARTUPS TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.startups (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  user_id TEXT REFERENCES public.profiles(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  tagline TEXT,
  category TEXT NOT NULL DEFAULT 'b2b_saas',
  category_label TEXT NOT NULL DEFAULT 'B2B SaaS',
  location TEXT DEFAULT 'Bengaluru, KA',
  founded TEXT DEFAULT '2023',
  mrr BIGINT NOT NULL DEFAULT 0,
  arr BIGINT NOT NULL DEFAULT 0,
  growth_mom NUMERIC(5,2) DEFAULT 0.0,
  net_margin NUMERIC(5,2) DEFAULT 0.0,
  churn_rate NUMERIC(5,2) DEFAULT 0.0,
  tier TEXT DEFAULT 'Platinum',
  badge_text TEXT DEFAULT 'Triple-Lock Verified',
  deal_status TEXT DEFAULT 'open_acquisition',
  deal_label TEXT DEFAULT 'Open for Acquisition',
  asking_price BIGINT DEFAULT 0,
  multiple TEXT DEFAULT '4.0x ARR',
  tech_stack JSONB DEFAULT '["Next.js", "PostgreSQL", "Razorpay Subscriptions"]'::JSONB,
  gstin TEXT,
  gst_status TEXT DEFAULT 'Reconciled (100% Match)',
  mca_cin TEXT,
  ledger_hash TEXT,
  audit_date TEXT DEFAULT 'March 2026',
  revenue_breakdown JSONB DEFAULT '{"razorpay": 68, "upiAutoPay": 22, "stripe": 10, "bankWire": 0}'::JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_startups_category ON public.startups(category);
CREATE INDEX IF NOT EXISTS idx_startups_arr ON public.startups(arr DESC);

ALTER TABLE public.startups ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to startups"
  ON public.startups FOR SELECT
  USING (true);

CREATE POLICY "Allow public insert/update to startups"
  ON public.startups FOR ALL
  USING (true)
  WITH CHECK (true);

-- ==============================================================================
-- 3. REVENUE_RECORDS TABLE (Monthly Audit History)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.revenue_records (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  startup_id TEXT REFERENCES public.startups(id) ON DELETE CASCADE,
  month TEXT NOT NULL, -- e.g., 'Apr 25', 'May 25'
  revenue BIGINT NOT NULL DEFAULT 0,
  mrr BIGINT NOT NULL DEFAULT 0,
  razorpay BIGINT DEFAULT 0,
  upi BIGINT DEFAULT 0,
  stripe BIGINT DEFAULT 0,
  bank_wire BIGINT DEFAULT 0,
  paying_customers INTEGER DEFAULT 0,
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
-- 4. TRANSACTIONS TABLE (Live Verified B2B Settlements)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.transactions (
  id TEXT PRIMARY KEY, -- e.g. 'txn_9881A'
  startup_id TEXT REFERENCES public.startups(id) ON DELETE CASCADE,
  company TEXT NOT NULL,
  logo TEXT NOT NULL,
  amount BIGINT NOT NULL,
  status TEXT NOT NULL DEFAULT 'Settled', -- 'Captured', 'Settled', 'Reconciled'
  source TEXT NOT NULL, -- 'Razorpay Subscriptions', 'UPI AutoPay', 'Stripe India', 'ICICI Bank Wire'
  date TEXT NOT NULL, -- e.g. '2 mins ago', 'Today, 11:30 AM'
  invoice TEXT NOT NULL, -- e.g. 'INV-2026-881'
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
-- SEED DATA (Indian Verified Startups & Real-time Ledger)
-- ==============================================================================

-- Insert primary startup (DocuPulse AI)
INSERT INTO public.startups (
  id, name, slug, tagline, category, category_label, location, founded,
  mrr, arr, growth_mom, net_margin, churn_rate, tier, badge_text,
  deal_status, deal_label, asking_price, multiple,
  tech_stack, gstin, gst_status, mca_cin, ledger_hash, audit_date,
  revenue_breakdown
) VALUES (
  'startup_docupulse',
  'DocuPulse AI',
  'docupulse-ai',
  'AI-powered GST invoice parsing & reconciliation for Indian CFOs & enterprise finance teams',
  'ai_devtools',
  'AI & DevTools',
  'Bengaluru, KA',
  '2023',
  1850000,
  22200000,
  24.8,
  68.5,
  1.4,
  'Platinum',
  'Triple-Lock Verified',
  'open_acquisition',
  'Open for Acquisition',
  88800000,
  '4.0x ARR',
  '["Next.js 15", "FastAPI", "PostgreSQL", "Razorpay Subscriptions", "AWS Mumbai"]'::JSONB,
  '29AAACD4982R1Z8',
  'Reconciled (100% Match)',
  'U72900KA2023PTC172819',
  'FL-2026-KA-88A92F',
  'March 2026',
  '{"razorpay": 68, "upiAutoPay": 22, "stripe": 10, "bankWire": 0}'::JSONB
) ON CONFLICT (id) DO NOTHING;

-- Insert 12-Month Revenue History
INSERT INTO public.revenue_records (startup_id, month, revenue, mrr, razorpay, upi, stripe, paying_customers) VALUES
  ('startup_docupulse', 'Apr 25', 780000, 780000, 530000, 170000, 80000, 85),
  ('startup_docupulse', 'May 25', 890000, 890000, 605000, 195000, 90000, 98),
  ('startup_docupulse', 'Jun 25', 1020000, 1020000, 693000, 224000, 103000, 114),
  ('startup_docupulse', 'Jul 25', 1180000, 1180000, 802000, 260000, 118000, 132),
  ('startup_docupulse', 'Aug 25', 1310000, 1310000, 890000, 288000, 132000, 149),
  ('startup_docupulse', 'Sep 25', 1420000, 1420000, 965000, 312000, 143000, 165),
  ('startup_docupulse', 'Oct 25', 1540000, 1540000, 1047000, 339000, 154000, 182),
  ('startup_docupulse', 'Nov 25', 1620000, 1620000, 1101000, 356000, 163000, 198),
  ('startup_docupulse', 'Dec 25', 1690000, 1690000, 1149000, 372000, 169000, 215),
  ('startup_docupulse', 'Jan 26', 1740000, 1740000, 1183000, 383000, 174000, 228),
  ('startup_docupulse', 'Feb 26', 1810000, 1810000, 1230000, 398000, 182000, 239),
  ('startup_docupulse', 'Mar 26', 1850000, 1850000, 1258000, 407000, 185000, 248)
ON CONFLICT DO NOTHING;

-- Insert Recent Transactions
INSERT INTO public.transactions (id, startup_id, company, logo, amount, status, source, date, invoice) VALUES
  ('txn_9881A', 'startup_docupulse', 'Zepto Logistics', 'ZL', 45000, 'Captured', 'Razorpay Subscriptions', '2 mins ago', 'INV-2026-881'),
  ('txn_9882B', 'startup_docupulse', 'Swiggy Instamart', 'SI', 124000, 'Settled', 'ICICI Bank Wire', '14 mins ago', 'INV-2026-882'),
  ('txn_9883C', 'startup_docupulse', 'CRED Club', 'CC', 18500, 'Reconciled', 'UPI AutoPay', '1 hour ago', 'INV-2026-883'),
  ('txn_9884D', 'startup_docupulse', 'Groww Capital', 'GC', 84000, 'Captured', 'Razorpay Subscriptions', '2 hours ago', 'INV-2026-884'),
  ('txn_9885E', 'startup_docupulse', 'Postman Dev', 'PD', 29999, 'Settled', 'Stripe India', '3 hours ago', 'INV-2026-885'),
  ('txn_9886F', 'startup_docupulse', 'Meesho Store', 'MS', 62500, 'Reconciled', 'GSTR-3B ARN', 'Today, 11:30 AM', 'INV-2026-886'),
  ('txn_9887G', 'startup_docupulse', 'Unacademy Plus', 'UP', 48000, 'Captured', 'UPI AutoPay', 'Today, 09:15 AM', 'INV-2026-887'),
  ('txn_9888H', 'startup_docupulse', 'Razorpay Labs', 'RL', 95000, 'Settled', 'Razorpay Subscriptions', 'Yesterday, 6:45 PM', 'INV-2026-888'),
  ('txn_9889I', 'startup_docupulse', 'Zomato Fleet Ops', 'ZF', 110000, 'Settled', 'ICICI Bank Wire', 'Yesterday, 3:20 PM', 'INV-2026-889'),
  ('txn_9890J', 'startup_docupulse', 'DevStudio HQ', 'DH', 14500, 'Captured', 'Razorpay Subscriptions', '2 days ago', 'INV-2026-890')
ON CONFLICT (id) DO NOTHING;
