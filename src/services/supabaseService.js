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
    // Check if user created a local startup
    const localStartups = getLocalStoredStartups();
    if (localStartups.length > 0) {
      const topStartup = localStartups[0];
      return {
        isLiveSupabase: false,
        stats: {
          mrr: topStartup.mrr,
          arr: topStartup.arr,
          customers: topStartup.customerCount || 45,
          growthMoM: topStartup.growthMoM || 22.4,
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

/**
 * Generate 12-month synthetic revenue curve leading to MRR
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
      razorpay: razorpayVal,
      upi: upiVal,
      stripe: stripeVal,
      paying_customers: custVal
    };
  });
}

/**
 * Create a new startup with full 12-month revenue curve and save to Supabase + local cache
 */
export async function createStartup(formData, userId) {
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
  const startupId = `startup_${uniqueSuffix}_${Date.now().toString(36)}`;

  const randomCin = `U72900KA${foundedYear}PTC${Math.floor(100000 + Math.random() * 900000)}`;
  const randomGstin = `29AAAC${Math.floor(1000 + Math.random() * 9000)}R1Z${Math.floor(1 + Math.random() * 9)}`;
  const randomHash = `FL-2026-KA-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

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

  const startupRecord = {
    id: startupId,
    user_id: userId || null,
    name: formData.name,
    slug,
    tagline: formData.description || 'Verified Indian startup ledger profile.',
    category: categoryKey,
    category_label: categoryLabel,
    location: formData.location || 'Bengaluru, KA',
    founded: foundedYear,
    website: formData.website || `https://${baseSlug}.io`,
    logo: formData.logo || null,
    logoInitials: formData.name ? formData.name.substring(0, 2).toUpperCase() : 'FL',
    mrr: mrrNum,
    arr: arrNum,
    customerCount: customersNum,
    growthMoM: 24.5,
    netMargin: 65.0,
    churnRate: 1.5,
    tier: 'Platinum',
    badgeText: 'Triple-Lock Verified',
    dealStatus: 'open_acquisition',
    dealLabel: 'Open for Acquisition',
    askingPrice: arrNum * 4,
    multiple: '4.0x ARR',
    techStack: ['Next.js', 'PostgreSQL', 'Razorpay Subscriptions', 'AWS Mumbai'],
    gstin: randomGstin,
    gstStatus: 'Reconciled (100% Match)',
    mcaCin: randomCin,
    ledgerHash: randomHash,
    auditDate: 'March 2026',
    revenueBreakdown: {
      razorpay: 68,
      upiAutoPay: 22,
      stripe: 10,
      bankWire: 0
    },
    monthlyHistory
  };

  // Always save locally for instant seamless access
  saveLocalStartup(startupRecord);

  // If Supabase is connected, persist to cloud
  if (isSupabaseConfigured && supabase) {
    try {
      const dbPayload = {
        id: startupRecord.id,
        user_id: startupRecord.user_id,
        name: startupRecord.name,
        slug: startupRecord.slug,
        tagline: startupRecord.tagline,
        category: startupRecord.category,
        category_label: startupRecord.category_label,
        location: startupRecord.location,
        founded: startupRecord.founded,
        mrr: startupRecord.mrr,
        arr: startupRecord.arr,
        growth_mom: startupRecord.growthMoM,
        net_margin: startupRecord.netMargin,
        churn_rate: startupRecord.churnRate,
        tier: startupRecord.tier,
        badge_text: startupRecord.badgeText,
        deal_status: startupRecord.dealStatus,
        deal_label: startupRecord.dealLabel,
        asking_price: startupRecord.askingPrice,
        multiple: startupRecord.multiple,
        tech_stack: startupRecord.techStack,
        gstin: startupRecord.gstin,
        gst_status: startupRecord.gstStatus,
        mca_cin: startupRecord.mcaCin,
        ledger_hash: startupRecord.ledgerHash,
        audit_date: startupRecord.auditDate,
        revenue_breakdown: startupRecord.revenueBreakdown
      };

      const { data, error } = await supabase
        .from('startups')
        .insert([dbPayload])
        .select()
        .single();

      if (error) {
        console.warn('[Supabase Service] Startup insert notice:', error.message);
      } else {
        // Also insert monthly revenue records
        const recordsPayload = monthlyHistory.map(m => ({
          startup_id: startupRecord.id,
          month: m.month,
          revenue: m.revenue,
          mrr: m.mrr,
          razorpay: m.razorpay,
          upi: m.upi,
          stripe: m.stripe,
          paying_customers: m.paying_customers
        }));

        await supabase.from('revenue_records').insert(recordsPayload);
      }
    } catch (err) {
      console.warn('[Supabase Service] Startup creation fallback:', err);
    }
  }

  return { success: true, startup: startupRecord };
}

/**
 * Fetch a startup by its slug or ID from Supabase, local cache, or platform seed data
 */
export async function fetchStartupBySlug(slug) {
  // 1. Check local storage cache first
  const localList = getLocalStoredStartups();
  const localMatch = localList.find(s => s.slug === slug || s.id === slug);
  if (localMatch) {
    return localMatch;
  }

  // 2. Check PLATFORM_DATA.startups
  const platformMatch = PLATFORM_DATA.startups.find(s => s.slug === slug || s.id === slug);
  if (platformMatch) {
    return platformMatch;
  }

  // 3. Check Supabase
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('startups')
        .select('*')
        .or(`slug.eq.${slug},id.eq.${slug}`)
        .single();

      if (data && !error) {
        // Fetch revenue history
        const { data: recs } = await supabase
          .from('revenue_records')
          .select('*')
          .eq('startup_id', data.id)
          .order('created_at', { ascending: true });

        const history = recs && recs.length > 0
          ? recs.map(r => ({
              month: r.month,
              revenue: Number(r.revenue || r.mrr || 0),
              mrr: Number(r.mrr || 0),
              razorpay: Number(r.razorpay || 0),
              upi: Number(r.upi || 0),
              stripe: Number(r.stripe || 0),
              paying_customers: Number(r.paying_customers || 0)
            }))
          : generateMonthlyHistory(Number(data.mrr), 50);

        return {
          id: data.id,
          name: data.name,
          slug: data.slug,
          tagline: data.tagline,
          category: data.category,
          categoryLabel: data.category_label,
          location: data.location,
          founded: data.founded,
          mrr: Number(data.mrr),
          arr: Number(data.arr),
          customerCount: history.length > 0 ? history[history.length - 1].paying_customers : 45,
          growthMoM: Number(data.growth_mom),
          netMargin: Number(data.net_margin),
          churnRate: Number(data.churn_rate),
          tier: data.tier,
          badgeText: data.badge_text,
          dealStatus: data.deal_status,
          dealLabel: data.deal_label,
          askingPrice: Number(data.asking_price),
          multiple: data.multiple,
          techStack: data.tech_stack || ['Next.js', 'PostgreSQL'],
          gstin: data.gstin,
          gstStatus: data.gst_status,
          mcaCin: data.mca_cin,
          ledgerHash: data.ledger_hash,
          auditDate: data.audit_date,
          revenueBreakdown: data.revenue_breakdown || { razorpay: 70, upiAutoPay: 20, stripe: 10 },
          monthlyHistory: history
        };
      }
    } catch (err) {
      console.warn('[Supabase Service] Failed to fetch startup by slug:', err);
    }
  }

  // 4. Return default DocuPulse if not found
  return PLATFORM_DATA.startups[0];
}

/**
 * Fetch all startups merging Supabase live database, local creations, and platform seed list
 */
export async function fetchAllStartups() {
  const localList = getLocalStoredStartups();
  let supabaseList = [];

  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('startups')
        .select('*')
        .order('arr', { ascending: false });

      if (data && !error && data.length > 0) {
        supabaseList = data.map(d => ({
          id: d.id,
          name: d.name,
          slug: d.slug,
          tagline: d.tagline,
          category: d.category,
          categoryLabel: d.category_label,
          location: d.location || 'Bengaluru, KA',
          founded: d.founded || '2024',
          mrr: Number(d.mrr || 0),
          arr: Number(d.arr || 0),
          growthMoM: Number(d.growth_mom || 20.0),
          netMargin: Number(d.net_margin || 60.0),
          churnRate: Number(d.churn_rate || 1.5),
          tier: d.tier || 'Platinum',
          badgeText: d.badge_text || 'Triple-Lock Verified',
          dealStatus: d.deal_status || 'open_acquisition',
          dealLabel: d.deal_label || 'Open for Acquisition',
          askingPrice: Number(d.asking_price || (d.arr * 4)),
          multiple: d.multiple || '4.0x ARR',
          techStack: d.tech_stack || ['Next.js', 'PostgreSQL', 'Razorpay Subscriptions'],
          gstin: d.gstin,
          gstStatus: d.gst_status || 'Reconciled (100% Match)',
          mcaCin: d.mca_cin,
          ledgerHash: d.ledger_hash,
          auditDate: d.audit_date || 'March 2026',
          revenueBreakdown: d.revenue_breakdown || { razorpay: 68, upiAutoPay: 22, stripe: 10 },
          monthlyHistory: generateMonthlyHistory(Number(d.mrr || 0), 45)
        }));
      }
    } catch (err) {
      console.warn('[Supabase Service] Failed to fetch all startups from Supabase:', err);
    }
  }

  // Combine: Local Created Startups + Supabase Live Startups + Platform Seed Startups
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

