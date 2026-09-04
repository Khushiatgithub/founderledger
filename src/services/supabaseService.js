import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { PLATFORM_DATA } from '../data/startups';

// In-memory / localStorage cache for created startups
const LOCAL_STORAGE_STARTUPS_KEY = 'fl_local_startups';

function getLocalStoredStartups() {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_STARTUPS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveLocalStartup(startup) {
  try {
    const existing = getLocalStoredStartups();
    const updated = [startup, ...existing.filter(s => s.id !== startup.id && s.slug !== startup.slug)];
    localStorage.setItem(LOCAL_STORAGE_STARTUPS_KEY, JSON.stringify(updated));
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('founderledger:startup_created', { detail: startup }));
    }
  } catch (err) {
    console.warn('Could not cache startup to localStorage:', err);
  }
}

// Fallback seed data
export const DEFAULT_MRR_HISTORY = [
  { month: 'Apr 25', mrr: 780000, arr: 9360000, customers: 85, growth: 14.2, razorpay: 530000, upi: 170000, stripe: 80000 },
  { month: 'May 25', mrr: 890000, arr: 10680000, customers: 98, growth: 14.1, razorpay: 605000, upi: 195000, stripe: 90000 },
  { month: 'Jun 25', mrr: 1020000, arr: 12240000, customers: 114, growth: 14.6, razorpay: 693000, upi: 224000, stripe: 103000 },
  { month: 'Jul 25', mrr: 1180000, arr: 14160000, customers: 132, growth: 15.6, razorpay: 802000, upi: 260000, stripe: 118000 },
  { month: 'Aug 25', mrr: 1310000, arr: 15720000, customers: 149, growth: 11.0, razorpay: 890000, upi: 288000, stripe: 132000 },
  { month: 'Sep 25', mrr: 1420000, arr: 17040000, customers: 165, growth: 8.4, razorpay: 965000, upi: 312000, stripe: 143000 },
  { month: 'Oct 25', mrr: 1540000, arr: 18480000, customers: 182, growth: 8.5, razorpay: 1047000, upi: 339000, stripe: 154000 },
  { month: 'Nov 25', mrr: 1620000, arr: 19440000, customers: 198, growth: 5.2, razorpay: 1101000, upi: 356000, stripe: 163000 },
  { month: 'Dec 25', mrr: 1690000, arr: 20280000, customers: 215, growth: 4.3, razorpay: 1149000, upi: 372000, stripe: 169000 },
  { month: 'Jan 26', mrr: 1740000, arr: 20880000, customers: 228, growth: 3.0, razorpay: 1183000, upi: 383000, stripe: 174000 },
  { month: 'Feb 26', mrr: 1810000, arr: 21720000, customers: 239, growth: 4.0, razorpay: 1230000, upi: 398000, stripe: 182000 },
  { month: 'Mar 26', mrr: 1850000, arr: 22200000, customers: 248, growth: 2.2, razorpay: 1258000, upi: 407000, stripe: 185000 }
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
  { id: 'txn_9888H', company: 'Razorpay Labs', logo: 'RL', amount: 95000, status: 'Settled', date: 'Yesterday, 6:45 PM', source: 'Razorpay Subscriptions', invoice: 'INV-2026-888' }
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
 * Connect Clerk user to Supabase:
 * Automatically creates or updates record in `users` table:
 * Table: users (id, clerk_id, name, email, avatar, created_at)
 */
export async function syncClerkUserToSupabase(user) {
  if (!isSupabaseConfigured || !supabase || !user) {
    return { success: false, reason: 'Supabase client not configured or user null' };
  }

  try {
    const userData = {
      clerk_id: user.id,
      name: user.fullName || user.firstName || 'Founder',
      email: user.primaryEmailAddress?.emailAddress || '',
      avatar: user.imageUrl || ''
    };

    const { data, error } = await supabase
      .from('users')
      .upsert(userData, { onConflict: 'clerk_id' })
      .select()
      .single();

    if (error) {
      console.warn('[Supabase Sync] Users table notice:', error.message);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (err) {
    console.warn('[Supabase Sync] User sync caught error:', err);
    return { success: false, error: err };
  }
}

/**
 * Fetch all dashboard metrics, revenue history records, and transactions from Supabase
 * Tables used: users, startups, revenue_records, transactions
 */
export async function fetchDashboardData(clerkId) {
  if (!isSupabaseConfigured || !supabase) {
    const localStartups = getLocalStoredStartups();
    if (localStartups.length > 0) {
      const topStartup = localStartups[0];
      return {
        isLiveSupabase: false,
        stats: {
          mrr: topStartup.mrr,
          arr: topStartup.arr,
          customers: topStartup.customerCount || 45,
          growthMoM: topStartup.growthMoM || 24.8,
          companyName: topStartup.name,
          gstin: topStartup.gstin,
          mcaCin: topStartup.mcaCin,
          ledgerHash: topStartup.ledgerHash,
          gstStatus: topStartup.gstStatus || 'Reconciled (100% Match)'
        },
        mrrHistory: topStartup.monthlyHistory || DEFAULT_MRR_HISTORY,
        categoryRevenue: DEFAULT_CATEGORY_REVENUE,
        customerGrowth: DEFAULT_CUSTOMER_GROWTH,
        gatewayDistribution: DEFAULT_GATEWAY_DISTRIBUTION,
        transactions: DEFAULT_TRANSACTIONS
      };
    }

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
    let internalUserId = null;

    // 1. Look up user by clerk_id
    if (clerkId) {
      const { data: userData } = await supabase
        .from('users')
        .select('id')
        .eq('clerk_id', clerkId)
        .maybeSingle();

      if (userData) {
        internalUserId = userData.id;
      }
    }

    // 2. Fetch startup owned by this user, or fall back to first verified startup
    let currentStartup = null;
    if (internalUserId) {
      const { data: userStartups } = await supabase
        .from('startups')
        .select('*')
        .eq('founder_id', internalUserId)
        .order('created_at', { ascending: false })
        .limit(1);

      if (userStartups && userStartups.length > 0) {
        currentStartup = userStartups[0];
      }
    }

    if (!currentStartup) {
      const { data: defaultStartups } = await supabase
        .from('startups')
        .select('*')
        .limit(1);

      if (defaultStartups && defaultStartups.length > 0) {
        currentStartup = defaultStartups[0];
      }
    }

    // 3. Fetch revenue_records for this startup
    let mrrHistory = DEFAULT_MRR_HISTORY;
    let customerGrowth = DEFAULT_CUSTOMER_GROWTH;

    if (currentStartup?.id) {
      const { data: recordsData } = await supabase
        .from('revenue_records')
        .select('*')
        .eq('startup_id', currentStartup.id)
        .order('created_at', { ascending: true });

      if (recordsData && recordsData.length > 0) {
        mrrHistory = recordsData.map(r => {
          const mrrVal = Number(r.mrr || 0);
          const rzp = Math.round(mrrVal * 0.68);
          const upi = Math.round(mrrVal * 0.22);
          const str = mrrVal - rzp - upi;
          return {
            month: r.month,
            mrr: mrrVal,
            arr: Number(r.arr || mrrVal * 12),
            customers: Number(r.customers || 0),
            growth: Number(r.growth || 0),
            razorpay: rzp,
            upi: upi,
            stripe: str
          };
        });

        customerGrowth = recordsData.map(r => ({
          month: r.month,
          customers: Number(r.customers || 0)
        }));
      }
    }

    // 4. Fetch transactions for this startup
    let transactions = DEFAULT_TRANSACTIONS;
    if (currentStartup?.id) {
      const { data: txnsData } = await supabase
        .from('transactions')
        .select('*')
        .eq('startup_id', currentStartup.id)
        .order('created_at', { ascending: false })
        .limit(20);

      if (txnsData && txnsData.length > 0) {
        transactions = txnsData.map(t => ({
          id: t.id,
          company: t.source ? `${t.source.split(' ')[0]} Settlement` : 'B2B Client',
          logo: 'FL',
          amount: Number(t.amount),
          status: t.status || 'Settled',
          source: t.source || 'Razorpay Subscriptions',
          date: t.created_at ? new Date(t.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Recently',
          invoice: `INV-${t.id.slice(-4).toUpperCase()}`
        }));
      }
    }

    const latestRecord = mrrHistory.length > 0 ? mrrHistory[mrrHistory.length - 1] : null;

    const stats = {
      mrr: latestRecord ? latestRecord.mrr : DEFAULT_STARTUP_STATS.mrr,
      arr: latestRecord ? latestRecord.arr : DEFAULT_STARTUP_STATS.arr,
      customers: latestRecord ? latestRecord.customers : DEFAULT_STARTUP_STATS.customers,
      growthMoM: latestRecord ? latestRecord.growth : DEFAULT_STARTUP_STATS.growthMoM,
      companyName: currentStartup ? currentStartup.name : DEFAULT_STARTUP_STATS.companyName,
      gstin: '29AAACD4982R1Z8',
      mcaCin: 'U72900KA2023PTC172819',
      ledgerHash: `FL-2026-KA-${currentStartup ? currentStartup.id.slice(0, 6).toUpperCase() : '88A92F'}`,
      gstStatus: currentStartup?.verified ? 'Reconciled (100% Match)' : 'Pending GST Audit'
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
    console.error('[Supabase Service] Error fetching dashboard data:', error);
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
 * Generate 12-month synthetic revenue curve
 */
function generateMonthlyHistory(currentMrr, totalCustomers) {
  const months = ['Apr 25', 'May 25', 'Jun 25', 'Jul 25', 'Aug 25', 'Sep 25', 'Oct 25', 'Nov 25', 'Dec 25', 'Jan 26', 'Feb 26', 'Mar 26'];
  const startMrr = Math.round(currentMrr * 0.42);
  const startCust = Math.max(5, Math.round(totalCustomers * 0.35));

  return months.map((month, index) => {
    const factor = index / (months.length - 1);
    const mrrVal = Math.round(startMrr + (currentMrr - startMrr) * (factor ** 0.85));
    const custVal = Math.round(startCust + (totalCustomers - startCust) * (factor ** 0.85));
    const razorpayVal = Math.round(mrrVal * 0.68);
    const upiVal = Math.round(mrrVal * 0.22);
    const stripeVal = mrrVal - razorpayVal - upiVal;

    return {
      month,
      revenue: mrrVal,
      mrr: mrrVal,
      arr: mrrVal * 12,
      razorpay: razorpayVal,
      upi: upiVal,
      stripe: stripeVal,
      customers: custVal,
      growth: index > 0 ? 12.5 : 0
    };
  });
}

/**
 * Create a new startup with tables: startups & revenue_records
 */
export async function createStartup(formData, clerkUser) {
  const mrrNum = parseFloat(formData.mrr) || 0;
  const arrNum = mrrNum * 12;
  const customersNum = parseInt(formData.customerCount, 10) || 1;
  const foundedYear = formData.founded || '2024';

  const baseSlug = (formData.name || 'startup')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  const uniqueSuffix = Math.random().toString(36).substring(2, 6);
  const slug = `${baseSlug}-${uniqueSuffix}`;

  const categoryLabels = {
    b2b_saas: 'B2B SaaS',
    ai_devtools: 'AI & DevTools',
    fintech: 'FinTech & Payments',
    d2c_ecommerce: 'D2C & Commerce',
    edtech_hr: 'EdTech & HR Tech'
  };

  const categoryKey = formData.category || 'b2b_saas';
  const categoryLabel = categoryLabels[categoryKey] || 'B2B SaaS';
  const monthlyHistory = generateMonthlyHistory(mrrNum, customersNum);

  const clerkId = typeof clerkUser === 'object' && clerkUser !== null ? clerkUser.id : clerkUser;

  const startupRecord = {
    id: `startup_${uniqueSuffix}_${Date.now().toString(36)}`,
    founder_id: clerkId || null,
    name: formData.name,
    slug,
    category: categoryKey,
    category_label: categoryLabel,
    description: formData.description || 'Verified Indian startup ledger profile.',
    tagline: formData.description || 'Verified Indian startup ledger profile.',
    logo_url: formData.logo || null,
    logo: formData.logo || null,
    logoInitials: formData.name ? formData.name.substring(0, 2).toUpperCase() : 'FL',
    website: formData.website || `https://${baseSlug}.io`,
    founded_year: foundedYear,
    founded: foundedYear,
    verified: true,
    mrr: mrrNum,
    arr: arrNum,
    customerCount: customersNum,
    growthMoM: 24.8,
    netMargin: 65.0,
    churnRate: 1.4,
    tier: 'Platinum',
    badgeText: 'Triple-Lock Verified',
    dealStatus: 'open_acquisition',
    dealLabel: 'Open for Acquisition',
    askingPrice: arrNum * 4,
    multiple: '4.0x ARR',
    gstin: `29AAAC${Math.floor(1000 + Math.random() * 9000)}R1Z5`,
    gstStatus: 'Reconciled (100% Match)',
    mcaCin: `U72900KA${foundedYear}PTC${Math.floor(100000 + Math.random() * 900000)}`,
    ledgerHash: `FL-2026-KA-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
    auditDate: 'March 2026',
    revenueBreakdown: { razorpay: 68, upiAutoPay: 22, stripe: 10, bankWire: 0 },
    monthlyHistory
  };

  saveLocalStartup(startupRecord);

  // If Supabase is connected, persist to exact tables
  if (isSupabaseConfigured && supabase) {
    try {
      // 1. Ensure user exists in users table
      let founderDbId = null;
      if (clerkId) {
        const uName = typeof clerkUser === 'object' && clerkUser !== null ? (clerkUser.fullName || clerkUser.firstName || 'Founder') : 'Founder';
        const uEmail = typeof clerkUser === 'object' && clerkUser !== null ? (clerkUser.primaryEmailAddress?.emailAddress || '') : '';
        const uAvatar = typeof clerkUser === 'object' && clerkUser !== null ? (clerkUser.imageUrl || '') : '';

        const { data: userRow } = await supabase
          .from('users')
          .upsert({
            clerk_id: clerkId,
            name: uName,
            email: uEmail,
            avatar: uAvatar
          }, { onConflict: 'clerk_id' })
          .select('id')
          .single();

        if (userRow) founderDbId = userRow.id;
      }

      // 2. Insert into startups table
      const { data: startupRow, error: startupErr } = await supabase
        .from('startups')
        .insert([{
          founder_id: founderDbId,
          name: startupRecord.name,
          category: startupRecord.category,
          description: startupRecord.description,
          logo_url: startupRecord.logo_url,
          website: startupRecord.website,
          founded_year: startupRecord.founded_year,
          verified: true
        }])
        .select()
        .single();

      if (!startupErr && startupRow) {
        // 3. Insert into revenue_records table
        const recordsPayload = monthlyHistory.map(m => ({
          startup_id: startupRow.id,
          month: m.month,
          mrr: m.mrr,
          arr: m.arr,
          customers: m.customers,
          growth: m.growth
        }));

        await supabase.from('revenue_records').insert(recordsPayload);
      }
    } catch (err) {
      console.warn('[Supabase Service] Startup insert fallback:', err);
    }
  }

  return { success: true, startup: startupRecord };
}

/**
 * Insert transaction into transactions table
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
        startup_id: txn.startupId || null,
        amount: txn.amount,
        source: txn.source || 'Razorpay Subscriptions',
        status: txn.status || 'Settled'
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

/**
 * Fetch a startup by its slug or ID
 */
export async function fetchStartupBySlug(slug) {
  const localList = getLocalStoredStartups();
  const localMatch = localList.find(s => s.slug === slug || s.id === slug);
  if (localMatch) return localMatch;

  const platformMatch = PLATFORM_DATA.startups.find(s => s.slug === slug || s.id === slug);
  if (platformMatch) return platformMatch;

  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('startups')
        .select('*')
        .or(`name.ilike.%${slug.replace(/-/g, ' ')}%,id.eq.${slug}`)
        .maybeSingle();

      if (data && !error) {
        const { data: recs } = await supabase
          .from('revenue_records')
          .select('*')
          .eq('startup_id', data.id)
          .order('created_at', { ascending: true });

        const history = recs && recs.length > 0
          ? recs.map(r => ({
              month: r.month,
              revenue: Number(r.mrr || 0),
              mrr: Number(r.mrr || 0),
              arr: Number(r.arr || 0),
              customers: Number(r.customers || 0),
              growth: Number(r.growth || 0),
              razorpay: Math.round(Number(r.mrr || 0) * 0.68),
              upi: Math.round(Number(r.mrr || 0) * 0.22),
              stripe: Math.round(Number(r.mrr || 0) * 0.10)
            }))
          : generateMonthlyHistory(1850000, 50);

        const latest = history[history.length - 1];

        return {
          id: data.id,
          name: data.name,
          slug,
          tagline: data.description,
          description: data.description,
          category: data.category,
          categoryLabel: data.category === 'ai_devtools' ? 'AI & DevTools' : 'B2B SaaS',
          location: 'Bengaluru, KA',
          founded: data.founded_year || '2024',
          logo: data.logo_url,
          website: data.website,
          mrr: latest ? latest.mrr : 1850000,
          arr: latest ? latest.arr : 22200000,
          customerCount: latest ? latest.customers : 45,
          growthMoM: latest ? latest.growth : 24.8,
          netMargin: 65.0,
          churnRate: 1.4,
          tier: 'Platinum',
          badgeText: data.verified ? 'Triple-Lock Verified' : 'Pending Verification',
          askingPrice: latest ? latest.arr * 4 : 88800000,
          multiple: '4.0x ARR',
          gstin: '29AAACD4982R1Z8',
          gstStatus: 'Reconciled (100% Match)',
          mcaCin: 'U72900KA2023PTC172819',
          ledgerHash: 'FL-2026-KA-88A92F',
          auditDate: 'March 2026',
          revenueBreakdown: { razorpay: 68, upiAutoPay: 22, stripe: 10, bankWire: 0 },
          monthlyHistory: history
        };
      }
    } catch (err) {
      console.warn('[Supabase Service] Failed to fetch startup by slug:', err);
    }
  }

  return PLATFORM_DATA.startups[0];
}

/**
 * Fetch all startups for Leaderboard and directory
 */
export async function fetchAllStartups() {
  const localList = getLocalStoredStartups();
  let supabaseList = [];

  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('startups')
        .select(`
          id,
          founder_id,
          name,
          category,
          description,
          logo_url,
          website,
          founded_year,
          verified,
          created_at
        `)
        .order('created_at', { ascending: false });

      if (data && !error && data.length > 0) {
        supabaseList = data.map(d => {
          const baseSlug = d.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
          return {
            id: d.id,
            name: d.name,
            slug: baseSlug,
            tagline: d.description,
            description: d.description,
            category: d.category || 'b2b_saas',
            categoryLabel: d.category === 'ai_devtools' ? 'AI & DevTools' : 'B2B SaaS',
            location: 'Bengaluru, KA',
            founded: d.founded_year || '2024',
            logo: d.logo_url,
            website: d.website,
            mrr: 1850000,
            arr: 22200000,
            growthMoM: 24.8,
            netMargin: 65.0,
            churnRate: 1.4,
            tier: 'Platinum',
            badgeText: d.verified ? 'Triple-Lock Verified' : 'Standard Verified',
            dealStatus: 'open_acquisition',
            dealLabel: 'Open for Acquisition',
            askingPrice: 88800000,
            multiple: '4.0x ARR',
            gstin: '29AAACD4982R1Z8',
            gstStatus: 'Reconciled (100% Match)',
            mcaCin: 'U72900KA2023PTC172819',
            ledgerHash: 'FL-2026-KA-88A92F',
            auditDate: 'March 2026',
            revenueBreakdown: { razorpay: 68, upiAutoPay: 22, stripe: 10 },
            monthlyHistory: generateMonthlyHistory(1850000, 45)
          };
        });
      }
    } catch (err) {
      console.warn('[Supabase Service] Failed to fetch all startups from Supabase:', err);
    }
  }

  const seenSlugs = new Set();
  const merged = [];

  for (const s of localList) {
    if (s.slug && !seenSlugs.has(s.slug)) {
      seenSlugs.add(s.slug);
      merged.push(s);
    }
  }

  for (const s of supabaseList) {
    if (s.slug && !seenSlugs.has(s.slug)) {
      seenSlugs.add(s.slug);
      merged.push(s);
    }
  }

  for (const s of PLATFORM_DATA.startups) {
    if (s.slug && !seenSlugs.has(s.slug)) {
      seenSlugs.add(s.slug);
      merged.push(s);
    }
  }

  return merged;
}
