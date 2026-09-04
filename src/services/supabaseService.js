import { supabase, isSupabaseConfigured } from '../lib/supabase';

// Fallback seed data if Supabase is offline, not yet configured, or syncing initial rows
export const DEFAULT_MRR_HISTORY = [
  { month: 'Apr 25', mrr: 780000, razorpay: 530000, upi: 170000, stripe: 80000 },
  { month: 'May 25', mrr: 890000, razorpay: 605000, upi: 195000, stripe: 90000 },
  { month: 'Jun 25', mrr: 1020000, razorpay: 693000, upi: 224000, stripe: 103000 },
  { month: 'Jul 25', mrr: 1180000, razorpay: 802000, upi: 260000, stripe: 118000 },
  { month: 'Aug 25', mrr: 1310000, razorpay: 890000, upi: 288000, stripe: 132000 },
  { month: 'Sep 25', mrr: 1420000, razorpay: 965000, upi: 312000, stripe: 143000 },
  { month: 'Oct 25', mrr: 1540000, razorpay: 1047000, upi: 339000, stripe: 154000 },
  { month: 'Nov 25', mrr: 1620000, razorpay: 1101000, upi: 356000, stripe: 163000 },
  { month: 'Dec 25', mrr: 1690000, razorpay: 1149000, upi: 372000, stripe: 169000 },
  { month: 'Jan 26', mrr: 1740000, razorpay: 1183000, upi: 383000, stripe: 174000 },
  { month: 'Feb 26', mrr: 1810000, razorpay: 1230000, upi: 398000, stripe: 182000 },
  { month: 'Mar 26', mrr: 1850000, razorpay: 1258000, upi: 407000, stripe: 185000 }
];

export const DEFAULT_CATEGORY_REVENUE = [
  { category: 'B2B SaaS', arr: 18400000, color: '#2563EB' },
  { category: 'AI DevTools', arr: 11200000, color: '#7C3AED' },
  { category: 'FinTech', arr: 7600000, color: '#059669' },
  { category: 'D2C Commerce', arr: 6400000, color: '#D97706' },
  { category: 'EdTech', arr: 4600000, color: '#0284C7' }
];

export const DEFAULT_CUSTOMER_GROWTH = [
  { month: 'Apr 25', customers: 85 },
  { month: 'May 25', customers: 98 },
  { month: 'Jun 25', customers: 114 },
  { month: 'Jul 25', customers: 132 },
  { month: 'Aug 25', customers: 149 },
  { month: 'Sep 25', customers: 165 },
  { month: 'Oct 25', customers: 182 },
  { month: 'Nov 25', customers: 198 },
  { month: 'Dec 25', customers: 215 },
  { month: 'Jan 26', customers: 228 },
  { month: 'Feb 26', customers: 239 },
  { month: 'Mar 26', customers: 248 }
];

export const DEFAULT_GATEWAY_DISTRIBUTION = [
  { name: 'Razorpay Subscriptions', value: 68, color: '#2563EB' },
  { name: 'UPI AutoPay (PhonePe/GPay)', value: 22, color: '#10B981' },
  { name: 'Stripe India (USD/SaaS)', value: 10, color: '#6366F1' }
];

export const DEFAULT_TRANSACTIONS = [
  { id: 'txn_9881A', company: 'Zepto Logistics', logo: 'ZL', amount: 45000, status: 'Captured', date: '2 mins ago', source: 'Razorpay Subscriptions', invoice: 'INV-2026-881' },
  { id: 'txn_9882B', company: 'Swiggy Instamart', logo: 'SI', amount: 124000, status: 'Settled', date: '14 mins ago', source: 'ICICI Bank Wire', invoice: 'INV-2026-882' },
  { id: 'txn_9883C', company: 'CRED Club', logo: 'CC', amount: 18500, status: 'Reconciled', date: '1 hour ago', source: 'UPI AutoPay', invoice: 'INV-2026-883' },
  { id: 'txn_9884D', company: 'Groww Capital', logo: 'GC', amount: 84000, status: 'Captured', date: '2 hours ago', source: 'Razorpay Subscriptions', invoice: 'INV-2026-884' },
  { id: 'txn_9885E', company: 'Postman Dev', logo: 'PD', amount: 29999, status: 'Settled', date: '3 hours ago', source: 'Stripe India', invoice: 'INV-2026-885' },
  { id: 'txn_9886F', company: 'Meesho Store', logo: 'MS', amount: 62500, status: 'Reconciled', date: 'Today, 11:30 AM', source: 'GSTR-3B ARN', invoice: 'INV-2026-886' },
  { id: 'txn_9887G', company: 'Unacademy Plus', logo: 'UP', amount: 48000, status: 'Captured', date: 'Today, 09:15 AM', source: 'UPI AutoPay', invoice: 'INV-2026-887' },
  { id: 'txn_9888H', company: 'Razorpay Labs', logo: 'RL', amount: 95000, status: 'Settled', date: 'Yesterday, 6:45 PM', source: 'Razorpay Subscriptions', invoice: 'INV-2026-888' },
  { id: 'txn_9889I', company: 'Zomato Fleet Ops', logo: 'ZF', amount: 110000, status: 'Settled', date: 'Yesterday, 3:20 PM', source: 'ICICI Bank Wire', invoice: 'INV-2026-889' },
  { id: 'txn_9890J', company: 'DevStudio HQ', logo: 'DH', amount: 14500, status: 'Captured', date: '2 days ago', source: 'Razorpay Subscriptions', invoice: 'INV-2026-890' }
];

export const DEFAULT_STARTUP_STATS = {
  mrr: 1850000,
  arr: 22200000,
  customers: 248,
  growthMoM: 24.8,
  companyName: 'DocuPulse AI',
  gstin: '29AAACD4982R1Z8',
  mcaCin: 'U72900KA2023PTC172819',
  ledgerHash: 'FL-2026-KA-88A92F',
  gstStatus: 'Reconciled (100% Match)'
};

/**
 * Sync authenticated Clerk user to Supabase profiles table
 */
export async function syncClerkUserToSupabase(user) {
  if (!isSupabaseConfigured || !supabase || !user) {
    return { success: false, reason: 'Supabase client not configured or user null' };
  }

  try {
    const profileData = {
      id: user.id,
      email: user.primaryEmailAddress?.emailAddress || '',
      full_name: user.fullName || user.firstName || 'Founder',
      avatar_url: user.imageUrl || '',
      company_name: user.publicMetadata?.companyName || 'DocuPulse AI',
      updated_at: new Date().toISOString()
    };

    const { data, error } = await supabase
      .from('profiles')
      .upsert(profileData, { onConflict: 'id' })
      .select()
      .single();

    if (error) {
      console.warn('[Supabase Sync] Profile upsert notice:', error.message);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (err) {
    console.warn('[Supabase Sync] Profile sync caught error:', err);
    return { success: false, error: err };
  }
}

/**
 * Fetch all dashboard metrics, revenue history records, and live transactions
 */
export async function fetchDashboardData(userId) {
  if (!isSupabaseConfigured || !supabase) {
    return {
      isLiveSupabase: false,
      stats: DEFAULT_STARTUP_STATS,
      mrrHistory: DEFAULT_MRR_HISTORY,
      categoryRevenue: DEFAULT_CATEGORY_REVENUE,
      customerGrowth: DEFAULT_CUSTOMER_GROWTH,
      gatewayDistribution: DEFAULT_GATEWAY_DISTRIBUTION,
      transactions: DEFAULT_TRANSACTIONS
    };
  }

  try {
    // 1. Fetch startup profile
    let startupQuery = supabase
      .from('startups')
      .select('*')
      .limit(1);

    if (userId) {
      startupQuery = startupQuery.eq('user_id', userId);
    }

    const { data: startupData, error: startupError } = await startupQuery;

    // If user has no specific startup row yet, get primary seed startup or fallback
    let currentStartup = startupData && startupData.length > 0 ? startupData[0] : null;

    if (!currentStartup) {
      const { data: defaultStartup } = await supabase
        .from('startups')
        .select('*')
        .limit(1);
      if (defaultStartup && defaultStartup.length > 0) {
        currentStartup = defaultStartup[0];
      }
    }

    // 2. Fetch revenue records
    let mrrHistory = DEFAULT_MRR_HISTORY;
    let customerGrowth = DEFAULT_CUSTOMER_GROWTH;

    const startupId = currentStartup?.id || 'startup_docupulse';
    const { data: recordsData, error: recordsError } = await supabase
      .from('revenue_records')
      .select('*')
      .eq('startup_id', startupId)
      .order('created_at', { ascending: true });

    if (recordsData && recordsData.length > 0) {
      mrrHistory = recordsData.map(r => ({
        month: r.month,
        mrr: Number(r.mrr || r.revenue || 0),
        razorpay: Number(r.razorpay || 0),
        upi: Number(r.upi || 0),
        stripe: Number(r.stripe || 0)
      }));

      customerGrowth = recordsData.map(r => ({
        month: r.month,
        customers: Number(r.paying_customers || 0)
      }));
    }

    // 3. Fetch recent transactions
    let transactions = DEFAULT_TRANSACTIONS;
    const { data: txnsData, error: txnsError } = await supabase
      .from('transactions')
      .select('*')
      .eq('startup_id', startupId)
      .order('created_at', { ascending: false })
      .limit(20);

    if (txnsData && txnsData.length > 0) {
      transactions = txnsData.map(t => ({
        id: t.id,
        company: t.company,
        logo: t.logo,
        amount: Number(t.amount),
        status: t.status,
        source: t.source,
        date: t.date,
        invoice: t.invoice
      }));
    }

    const stats = {
      mrr: currentStartup ? Number(currentStartup.mrr) : DEFAULT_STARTUP_STATS.mrr,
      arr: currentStartup ? Number(currentStartup.arr) : DEFAULT_STARTUP_STATS.arr,
      customers: customerGrowth.length > 0 ? customerGrowth[customerGrowth.length - 1].customers : DEFAULT_STARTUP_STATS.customers,
      growthMoM: currentStartup ? Number(currentStartup.growth_mom) : DEFAULT_STARTUP_STATS.growthMoM,
      companyName: currentStartup ? currentStartup.name : DEFAULT_STARTUP_STATS.companyName,
      gstin: currentStartup?.gstin || DEFAULT_STARTUP_STATS.gstin,
      mcaCin: currentStartup?.mca_cin || DEFAULT_STARTUP_STATS.mcaCin,
      ledgerHash: currentStartup?.ledger_hash || DEFAULT_STARTUP_STATS.ledgerHash,
      gstStatus: currentStartup?.gst_status || DEFAULT_STARTUP_STATS.gstStatus
    };

    return {
      isLiveSupabase: true,
      stats,
      mrrHistory,
      categoryRevenue: DEFAULT_CATEGORY_REVENUE,
      customerGrowth,
      gatewayDistribution: DEFAULT_GATEWAY_DISTRIBUTION,
      transactions
    };
  } catch (error) {
    console.error('[Supabase Service] Failed to fetch dashboard data:', error);
    return {
      isLiveSupabase: false,
      error: error.message || 'Error communicating with Supabase',
      stats: DEFAULT_STARTUP_STATS,
      mrrHistory: DEFAULT_MRR_HISTORY,
      categoryRevenue: DEFAULT_CATEGORY_REVENUE,
      customerGrowth: DEFAULT_CUSTOMER_GROWTH,
      gatewayDistribution: DEFAULT_GATEWAY_DISTRIBUTION,
      transactions: DEFAULT_TRANSACTIONS
    };
  }
}

/**
 * Insert a verified settlement transaction into Supabase
 */
export async function createTransaction(txn) {
  if (!isSupabaseConfigured || !supabase) {
    return { success: false, reason: 'Supabase not configured' };
  }

  try {
    const { data, error } = await supabase
      .from('transactions')
      .insert([{
        id: txn.id || `txn_${Math.random().toString(36).substring(2, 7).toUpperCase()}`,
        startup_id: txn.startupId || 'startup_docupulse',
        company: txn.company,
        logo: txn.logo || txn.company.substring(0, 2).toUpperCase(),
        amount: txn.amount,
        status: txn.status || 'Settled',
        source: txn.source || 'Razorpay Subscriptions',
        date: txn.date || 'Just now',
        invoice: txn.invoice || `INV-2026-${Math.floor(100 + Math.random() * 900)}`
      }])
      .select()
      .single();

    if (error) throw error;
    return { success: true, data };
  } catch (err) {
    console.error('[Supabase Service] Error creating transaction:', err);
    return { success: false, error: err };
  }
}
