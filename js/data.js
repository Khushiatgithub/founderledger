export const FL_DATA = {
  stats: {
    totalVerifiedARR: 1846000000, // ₹184.6 Cr
    totalStartups: 482,
    reconciliationAccuracy: 99.98,
    acquisitionsCompleted: 38,
    totalEscrowVolume: 345000000, // ₹34.5 Cr
    avgGrowthRate: 18.4,
    gatewaysSupported: ["Razorpay", "PhonePe", "Cashfree", "Stripe India", "GST Portal", "RBI Account Aggregator"]
  },

  categories: [
    { id: "all", label: "All Categories", count: 482 },
    { id: "b2b_saas", label: "B2B SaaS", count: 184 },
    { id: "ai_devtools", label: "AI & DevTools", count: 112 },
    { id: "fintech", label: "FinTech & Payments", count: 76 },
    { id: "d2c_ecommerce", label: "D2C & Commerce", count: 64 },
    { id: "edtech_hr", label: "EdTech & HR Tech", count: 46 }
  ],

  startups: [
    {
      id: "docupulse",
      name: "DocuPulse AI",
      slug: "docupulse-ai",
      tagline: "AI-powered GST invoice parsing & reconciliation for Indian CFOs",
      category: "ai_devtools",
      categoryLabel: "AI & DevTools",
      location: "Bengaluru, KA",
      founded: "2023",
      mrr: 1850000, // ₹18.5 Lakhs/mo
      arr: 22200000, // ₹2.22 Cr ARR
      growthMoM: 24.8,
      netMargin: 68.5,
      churnRate: 1.4,
      tier: "Platinum",
      badgeText: "Triple-Lock Verified",
      dealStatus: "open_acquisition",
      dealLabel: "Open for Acquisition",
      askingPrice: 88800000, // ₹8.88 Cr (4.0x ARR)
      multiple: "4.0x ARR",
      techStack: ["Next.js", "Python FastApi", "PostgreSQL", "Razorpay Subscriptions", "AWS Mumbai"],
      gstin: "29AAACD4982R1Z8",
      gstStatus: "Reconciled (100% Match)",
      mcaCin: "U72900KA2023PTC172819",
      ledgerHash: "FL-2026-KA-88A92F",
      auditDate: "March 2026",
      revenueBreakdown: {
        razorpay: 68,
        upiAutoPay: 22,
        stripe: 10,
        bankWire: 0
      },
      monthlyHistory: [
        { month: "Apr 25", revenue: 780000 },
        { month: "May 25", revenue: 890000 },
        { month: "Jun 25", revenue: 1020000 },
        { month: "Jul 25", revenue: 1180000 },
        { month: "Aug 25", revenue: 1310000 },
        { month: "Sep 25", revenue: 1420000 },
        { month: "Oct 25", revenue: 1540000 },
        { month: "Nov 25", revenue: 1620000 },
        { month: "Dec 25", revenue: 1690000 },
        { month: "Jan 26", revenue: 1740000 },
        { month: "Feb 26", revenue: 1810000 },
        { month: "Mar 26", revenue: 1850000 }
      ],
      founder: {
        name: "Arjun Venkatesh",
        role: "Solo Founder & CEO",
        avatar: "AV",
        twitter: "@arjunv_dev",
        quote: "Listing our verified Razorpay ARR on FounderLedger eliminated 3 weeks of due diligence friction with institutional buyers."
      },
      metrics: {
        customers: 248,
        arpu: 7450,
        ltv: 182000,
        cac: 12400
      }
    },
    {
      id: "quikform",
      name: "QuikForm Bharat",
      slug: "quikform-bharat",
      tagline: "WhatsApp conversational forms & leads engine with UPI QR checkout",
      category: "b2b_saas",
      categoryLabel: "B2B SaaS",
      location: "Pune, MH",
      founded: "2022",
      mrr: 3240000, // ₹32.4 Lakhs/mo
      arr: 38880000, // ₹3.88 Cr ARR
      growthMoM: 19.2,
      netMargin: 74.2,
      churnRate: 1.8,
      tier: "Platinum",
      badgeText: "Triple-Lock Verified",
      dealStatus: "not_for_sale",
      dealLabel: "Verified Proof Only",
      askingPrice: null,
      multiple: null,
      techStack: ["React", "Node.js", "Redis", "PhonePe Merchant", "Razorpay"],
      gstin: "27AABCT8192Q1Z4",
      gstStatus: "Reconciled (99.8% Match)",
      mcaCin: "U72200PN2022PTC209182",
      ledgerHash: "FL-2026-MH-71C40B",
      auditDate: "February 2026",
      revenueBreakdown: {
        razorpay: 52,
        upiAutoPay: 40,
        stripe: 8,
        bankWire: 0
      },
      monthlyHistory: [
        { month: "Apr 25", revenue: 1850000 },
        { month: "May 25", revenue: 2010000 },
        { month: "Jun 25", revenue: 2180000 },
        { month: "Jul 25", revenue: 2360000 },
        { month: "Aug 25", revenue: 2540000 },
        { month: "Sep 25", revenue: 2710000 },
        { month: "Oct 25", revenue: 2880000 },
        { month: "Nov 25", revenue: 2990000 },
        { month: "Dec 25", revenue: 3080000 },
        { month: "Jan 26", revenue: 3140000 },
        { month: "Feb 26", revenue: 3200000 },
        { month: "Mar 26", revenue: 3240000 }
      ],
      founder: {
        name: "Tanvi Deshmukh",
        role: "Co-Founder & CTO",
        avatar: "TD",
        twitter: "@tanvicodes",
        quote: "Our UPI AutoPay recurring revenue is completely authentic and verified in real time on the public ledger."
      },
      metrics: {
        customers: 1420,
        arpu: 2280,
        ltv: 49500,
        cac: 3100
      }
    },
    {
      id: "hirestack",
      name: "HireStack India",
      slug: "hirestack-india",
      tagline: "Automated tech assessment & payroll pipeline for Indian remote engineering teams",
      category: "edtech_hr",
      categoryLabel: "EdTech & HR Tech",
      location: "Gurugram, HR",
      founded: "2023",
      mrr: 1450000, // ₹14.5 Lakhs/mo
      arr: 17400000, // ₹1.74 Cr ARR
      growthMoM: 14.6,
      netMargin: 58.0,
      churnRate: 2.1,
      tier: "Gold",
      badgeText: "GST & Bank Verified",
      dealStatus: "open_acquisition",
      dealLabel: "Open for Acquisition",
      askingPrice: 52200000, // ₹5.22 Cr (3.0x ARR)
      multiple: "3.0x ARR",
      techStack: ["Vue.js", "Django", "PostgreSQL", "Cashfree AutoCollect"],
      gstin: "06AAACH1092P1ZF",
      gstStatus: "Reconciled (100% Match)",
      mcaCin: "U74999HR2023PTC112340",
      ledgerHash: "FL-2026-HR-44F81A",
      auditDate: "March 2026",
      revenueBreakdown: {
        razorpay: 35,
        upiAutoPay: 15,
        stripe: 10,
        bankWire: 40
      },
      monthlyHistory: [
        { month: "Apr 25", revenue: 680000 },
        { month: "May 25", revenue: 740000 },
        { month: "Jun 25", revenue: 820000 },
        { month: "Jul 25", revenue: 910000 },
        { month: "Aug 25", revenue: 1010000 },
        { month: "Sep 25", revenue: 1100000 },
        { month: "Oct 25", revenue: 1190000 },
        { month: "Nov 25", revenue: 1260000 },
        { month: "Dec 25", revenue: 1320000 },
        { month: "Jan 26", revenue: 1380000 },
        { month: "Feb 26", revenue: 1410000 },
        { month: "Mar 26", revenue: 1450000 }
      ],
      founder: {
        name: "Rohan Aggarwal",
        role: "Founder",
        avatar: "RA",
        twitter: "@rohan_aggarwal",
        quote: "We are profitable, growing at 15% MoM, and looking for a clean acquisition via FounderLedger's ICICI escrow."
      },
      metrics: {
        customers: 86,
        arpu: 16860,
        ltv: 340000,
        cac: 28000
      }
    },
    {
      id: "vaultpay",
      name: "VaultKit APIs",
      slug: "vaultkit-apis",
      tagline: "Developer SDK for instant e-NACH mandates & recurring UPI payment collection",
      category: "fintech",
      categoryLabel: "FinTech & Payments",
      location: "Hyderabad, TS",
      founded: "2022",
      mrr: 5800000, // ₹58.0 Lakhs/mo
      arr: 69600000, // ₹6.96 Cr ARR
      growthMoM: 28.5,
      netMargin: 61.4,
      churnRate: 0.9,
      tier: "Platinum",
      badgeText: "Triple-Lock Verified",
      dealStatus: "fundraising",
      dealLabel: "Fundraising Series A",
      askingPrice: null,
      multiple: null,
      techStack: ["Go", "Kubernetes", "PostgreSQL", "Razorpay X", "NPCI e-NACH"],
      gstin: "36AABCV9921E1Z0",
      gstStatus: "Reconciled (100% Match)",
      mcaCin: "U72900TG2022PTC160492",
      ledgerHash: "FL-2026-TS-93E11D",
      auditDate: "March 2026",
      revenueBreakdown: {
        razorpay: 72,
        upiAutoPay: 20,
        stripe: 0,
        bankWire: 8
      },
      monthlyHistory: [
        { month: "Apr 25", revenue: 2600000 },
        { month: "May 25", revenue: 2950000 },
        { month: "Jun 25", revenue: 3350000 },
        { month: "Jul 25", revenue: 3800000 },
        { month: "Aug 25", revenue: 4200000 },
        { month: "Sep 25", revenue: 4550000 },
        { month: "Oct 25", revenue: 4900000 },
        { month: "Nov 25", revenue: 5150000 },
        { month: "Dec 25", revenue: 5400000 },
        { month: "Jan 26", revenue: 5580000 },
        { month: "Feb 26", revenue: 5710000 },
        { month: "Mar 26", revenue: 5800000 }
      ],
      founder: {
        name: "Vikram Reddy",
        role: "Founder & CEO",
        avatar: "VR",
        twitter: "@vikram_fintech",
        quote: "Our verified ledger link is in our investor deck. VCs don't even ask for raw Excel data rooms anymore."
      },
      metrics: {
        customers: 312,
        arpu: 18580,
        ltv: 520000,
        cac: 24500
      }
    },
    {
      id: "shopkaro",
      name: "ShopKaro Logistics",
      slug: "shopkaro-logistics",
      tagline: "Same-day COD verification & automated NDR management for Indian D2C brands",
      category: "d2c_ecommerce",
      categoryLabel: "D2C & Commerce",
      location: "Delhi NCR",
      founded: "2023",
      mrr: 2150000, // ₹21.5 Lakhs/mo
      arr: 25800000, // ₹2.58 Cr ARR
      growthMoM: 16.4,
      netMargin: 48.2,
      churnRate: 2.8,
      tier: "Gold",
      badgeText: "GST & Bank Verified",
      dealStatus: "open_acquisition",
      dealLabel: "Open for Acquisition",
      askingPrice: 64500000, // ₹6.45 Cr (2.5x ARR)
      multiple: "2.5x ARR",
      techStack: ["Next.js", "Node.js", "MongoDB", "Shiprocket API", "Cashfree"],
      gstin: "07AABCS3310M1Z9",
      gstStatus: "Reconciled (99.4% Match)",
      mcaCin: "U63090DL2023PTC398124",
      ledgerHash: "FL-2026-DL-19A77C",
      auditDate: "February 2026",
      revenueBreakdown: {
        razorpay: 45,
        upiAutoPay: 35,
        stripe: 0,
        bankWire: 20
      },
      monthlyHistory: [
        { month: "Apr 25", revenue: 1100000 },
        { month: "May 25", revenue: 1220000 },
        { month: "Jun 25", revenue: 1350000 },
        { month: "Jul 25", revenue: 1480000 },
        { month: "Aug 25", revenue: 1620000 },
        { month: "Sep 25", revenue: 1740000 },
        { month: "Oct 25", revenue: 1850000 },
        { month: "Nov 25", revenue: 1940000 },
        { month: "Dec 25", revenue: 2010000 },
        { month: "Jan 26", revenue: 2080000 },
        { month: "Feb 26", revenue: 2120000 },
        { month: "Mar 26", revenue: 2150000 }
      ],
      founder: {
        name: "Pooja Sharma",
        role: "Co-Founder & COO",
        avatar: "PS",
        twitter: "@pooja_d2c",
        quote: "Clear audit of our D2C merchant software SaaS revenue gave buyers full confidence in our low churn numbers."
      },
      metrics: {
        customers: 195,
        arpu: 11020,
        ltv: 280000,
        cac: 18000
      }
    },
    {
      id: "codebharat",
      name: "CodeBharat IDE",
      slug: "codebharat-ide",
      tagline: "Cloud development environments pre-configured with Indian compliance & payment SDKs",
      category: "ai_devtools",
      categoryLabel: "AI & DevTools",
      location: "Chennai, TN",
      founded: "2024",
      mrr: 920000, // ₹9.2 Lakhs/mo
      arr: 11040000, // ₹1.10 Cr ARR
      growthMoM: 32.4,
      netMargin: 82.0,
      churnRate: 1.1,
      tier: "Platinum",
      badgeText: "Triple-Lock Verified",
      dealStatus: "not_for_sale",
      dealLabel: "Verified Proof Only",
      askingPrice: null,
      multiple: null,
      techStack: ["Rust", "WASM", "Docker", "Stripe India", "Razorpay"],
      gstin: "33AABCC7740K1Z5",
      gstStatus: "Reconciled (100% Match)",
      mcaCin: "U72900TN2024PTC168291",
      ledgerHash: "FL-2026-TN-62D55E",
      auditDate: "March 2026",
      revenueBreakdown: {
        razorpay: 40,
        upiAutoPay: 30,
        stripe: 30,
        bankWire: 0
      },
      monthlyHistory: [
        { month: "Apr 25", revenue: 180000 },
        { month: "May 25", revenue: 250000 },
        { month: "Jun 25", revenue: 340000 },
        { month: "Jul 25", revenue: 450000 },
        { month: "Aug 25", revenue: 560000 },
        { month: "Sep 25", revenue: 640000 },
        { month: "Oct 25", revenue: 710000 },
        { month: "Nov 25", revenue: 770000 },
        { month: "Dec 25", revenue: 820000 },
        { month: "Jan 26", revenue: 860000 },
        { month: "Feb 26", revenue: 890000 },
        { month: "Mar 26", revenue: 920000 }
      ],
      founder: {
        name: "Karthik Subramanian",
        role: "Solo Builder",
        avatar: "KS",
        twitter: "@karthik_devs",
        quote: "We grew from ₹1.8L to ₹9.2L MRR purely bootstrapped. Having a verified public badge on our landing page drove 40% more enterprise signups."
      },
      metrics: {
        customers: 840,
        arpu: 1095,
        ltv: 24000,
        cac: 1200
      }
    },
    {
      id: "leadchakra",
      name: "LeadChakra",
      slug: "leadchakra",
      tagline: "Automated B2B lead enrichment & verified phone discovery for Indian sales teams",
      category: "b2b_saas",
      categoryLabel: "B2B SaaS",
      location: "Mumbai, MH",
      founded: "2023",
      mrr: 2600000, // ₹26.0 Lakhs/mo
      arr: 31200000, // ₹3.12 Cr ARR
      growthMoM: 18.0,
      netMargin: 71.0,
      churnRate: 1.6,
      tier: "Platinum",
      badgeText: "Triple-Lock Verified",
      dealStatus: "open_acquisition",
      dealLabel: "Open for Acquisition",
      askingPrice: 109200000, // ₹10.92 Cr (3.5x ARR)
      multiple: "3.5x ARR",
      techStack: ["Next.js", "Python", "ElasticSearch", "Razorpay Invoices"],
      gstin: "27AABCL6619H1Z3",
      gstStatus: "Reconciled (100% Match)",
      mcaCin: "U72900MH2023PTC401923",
      ledgerHash: "FL-2026-MH-33B91C",
      auditDate: "March 2026",
      revenueBreakdown: {
        razorpay: 60,
        upiAutoPay: 30,
        stripe: 5,
        bankWire: 5
      },
      monthlyHistory: [
        { month: "Apr 25", revenue: 1300000 },
        { month: "May 25", revenue: 1450000 },
        { month: "Jun 25", revenue: 1600000 },
        { month: "Jul 25", revenue: 1780000 },
        { month: "Aug 25", revenue: 1950000 },
        { month: "Sep 25", revenue: 2100000 },
        { month: "Oct 25", revenue: 2240000 },
        { month: "Nov 25", revenue: 2360000 },
        { month: "Dec 25", revenue: 2450000 },
        { month: "Jan 26", revenue: 2510000 },
        { month: "Feb 26", revenue: 2560000 },
        { month: "Mar 26", revenue: 2600000 }
      ],
      founder: {
        name: "Sameer Kulkarni",
        role: "Co-Founder & CEO",
        avatar: "SK",
        twitter: "@sameer_kulkarni",
        quote: "FounderLedger's verified financials cut our M&A LOI time from 4 months to 11 days."
      },
      metrics: {
        customers: 340,
        arpu: 7640,
        ltv: 165000,
        cac: 15400
      }
    },
    {
      id: "invoicewali",
      name: "InvoiceWali",
      slug: "invoicewali",
      tagline: "1-click GST & e-Way bill generator tailored for MSMEs & freelance creators",
      category: "fintech",
      categoryLabel: "FinTech & Payments",
      location: "Jaipur, RJ",
      founded: "2024",
      mrr: 750000, // ₹7.5 Lakhs/mo
      arr: 9000000, // ₹90 Lakhs ARR
      growthMoM: 26.5,
      netMargin: 80.5,
      churnRate: 1.3,
      tier: "Gold",
      badgeText: "GST & Bank Verified",
      dealStatus: "open_acquisition",
      dealLabel: "Open for Acquisition",
      askingPrice: 27000000, // ₹2.7 Cr (3.0x ARR)
      multiple: "3.0x ARR",
      techStack: ["React", "Fastify", "PostgreSQL", "PhonePe Gateway"],
      gstin: "08AABCI5541L1Z2",
      gstStatus: "Reconciled (100% Match)",
      mcaCin: "U72200RJ2024PTC082910",
      ledgerHash: "FL-2026-RJ-81A22E",
      auditDate: "March 2026",
      revenueBreakdown: {
        razorpay: 20,
        upiAutoPay: 70,
        stripe: 0,
        bankWire: 10
      },
      monthlyHistory: [
        { month: "Apr 25", revenue: 210000 },
        { month: "May 25", revenue: 280000 },
        { month: "Jun 25", revenue: 350000 },
        { month: "Jul 25", revenue: 430000 },
        { month: "Aug 25", revenue: 500000 },
        { month: "Sep 25", revenue: 560000 },
        { month: "Oct 25", revenue: 610000 },
        { month: "Nov 25", revenue: 650000 },
        { month: "Dec 25", revenue: 680000 },
        { month: "Jan 26", revenue: 710000 },
        { month: "Feb 26", revenue: 730000 },
        { month: "Mar 26", revenue: 750000 }
      ],
      founder: {
        name: "Ananya Mehta",
        role: "Solo Founder",
        avatar: "AM",
        twitter: "@ananyamehta_saas",
        quote: "We run completely on UPI AutoPay. FounderLedger proved every single rupee with zero manual paperwork."
      },
      metrics: {
        customers: 620,
        arpu: 1210,
        ltv: 28000,
        cac: 1800
      }
    }
  ],

  marketplaceListings: [
    {
      id: "deal-docupulse",
      startupId: "docupulse",
      title: "DocuPulse AI — B2B Document AI SaaS",
      category: "AI & DevTools",
      ttmRevenue: 19800000, // ₹1.98 Cr TTM
      ttmProfit: 13500000, // ₹1.35 Cr TTM Net Profit
      profitMargin: 68,
      askingPrice: 88800000, // ₹8.88 Cr
      multiple: "4.0x ARR / 6.5x Profit",
      location: "Bengaluru, KA",
      subscribers: 248,
      churnRate: 1.4,
      verifiedHash: "FL-2026-KA-88A92F",
      escrowReady: true,
      broker: "FounderLedger Capital Escrow",
      highlights: [
        "100% automated AI pipeline with GST portal API bridge",
        "₹18.5L current MRR with 24.8% MoM growth",
        "Zero employee overhead, solo founder ready for 60-day transition",
        "All IP & MCA private limited shares transfer-ready"
      ]
    },
    {
      id: "deal-hirestack",
      startupId: "hirestack",
      title: "HireStack India — Tech Assessment & Screening SaaS",
      category: "EdTech & HR Tech",
      ttmRevenue: 14200000, // ₹1.42 Cr TTM
      ttmProfit: 8200000, // ₹82 Lakhs TTM Net Profit
      profitMargin: 58,
      askingPrice: 52200000, // ₹5.22 Cr
      multiple: "3.0x ARR / 6.3x Profit",
      location: "Gurugram, HR",
      subscribers: 86,
      churnRate: 2.1,
      verifiedHash: "FL-2026-HR-44F81A",
      escrowReady: true,
      broker: "FounderLedger Capital Escrow",
      highlights: [
        "86 active enterprise B2B customers on annual contracts",
        "High barrier to entry with proprietary coding sandbox",
        "40% revenue collected via direct NEFT/RTGS with verified GST e-invoices",
        "Clear Indian MCA share transfer pathway"
      ]
    },
    {
      id: "deal-shopkaro",
      startupId: "shopkaro",
      title: "ShopKaro Logistics — D2C NDR Automation Tool",
      category: "D2C & Commerce",
      ttmRevenue: 21000000, // ₹2.10 Cr TTM
      ttmProfit: 10100000, // ₹1.01 Cr TTM Net Profit
      profitMargin: 48,
      askingPrice: 64500000, // ₹6.45 Cr
      multiple: "2.5x ARR / 6.3x Profit",
      location: "Delhi NCR",
      subscribers: 195,
      churnRate: 2.8,
      verifiedHash: "FL-2026-DL-19A77C",
      escrowReady: true,
      broker: "FounderLedger Capital Escrow",
      highlights: [
        "195 active Indian Shopify & WooCommerce brand customers",
        "Integrated with Delhivery, Shiprocket, and BlueDart",
        "Strong cash flows and verified Razorpay Auto-collect history",
        "Includes full codebase, customer contracts, and marketing playbook"
      ]
    },
    {
      id: "deal-invoicewali",
      startupId: "invoicewali",
      title: "InvoiceWali — Micro MSME Billing & E-Way Software",
      category: "FinTech & Payments",
      ttmRevenue: 7200000, // ₹72 Lakhs TTM
      ttmProfit: 5800000, // ₹58 Lakhs TTM Net Profit
      profitMargin: 80,
      askingPrice: 27000000, // ₹2.7 Cr
      multiple: "3.0x ARR / 4.6x Profit",
      location: "Jaipur, RJ",
      subscribers: 620,
      churnRate: 1.3,
      verifiedHash: "FL-2026-RJ-81A22E",
      escrowReady: true,
      broker: "FounderLedger Capital Escrow",
      highlights: [
        "620 active paying freelancers and MSME business owners",
        "70% recurring revenue collected via PhonePe & UPI AutoPay",
        "80.5% net profit margin with negligible hosting costs",
        "Perfect turn-key micro-acquisition for solo operator"
      ]
    }
  ],

  tickerEvents: [
    { text: "₹18.5L MRR verified for DocuPulse AI via Razorpay Webhook", time: "2 mins ago" },
    { text: "New acquisition LOI submitted for HireStack (₹5.2 Cr Escrow)", time: "6 mins ago" },
    { text: "VaultKit APIs verified ₹58L MRR with 100% GST E-Invoice match", time: "11 mins ago" },
    { text: "QuikForm Bharat crossed ₹38.8 Cr ARR milestone", time: "19 mins ago" },
    { text: "₹7.5L MRR verified for InvoiceWali via UPI AutoPay", time: "24 mins ago" },
    { text: "Deal closed: CodeCraft Labs acquired for ₹3.8 Cr via ICICI Escrow", time: "38 mins ago" }
  ],

  faqs: [
    {
      question: "How does FounderLedger verify Indian startup revenue?",
      answer: "We use a proprietary Triple-Lock Verification engine. First, we connect directly via read-only OAuth to payment gateways like Razorpay, PhonePe, and Cashfree. Second, we reconcile transaction totals against filed GST E-Invoices and GSTR-1 returns. Third, we cross-verify net cash flows via RBI-approved Account Aggregator (AA) banking feeds. This eliminates any possibility of fake screenshots or manipulated Excel sheets."
    },
    {
      question: "Can I verify UPI AutoPay and direct NEFT/IMPS bank transfers?",
      answer: "Yes! Over 42% of Indian micro-SaaS revenue happens via UPI AutoPay and direct B2B bank wires. Our Sahamati-compliant Account Aggregator integration safely ingests your verified corporate bank statements and matches invoice line items automatically."
    },
    {
      question: "How does buying or selling a startup work on FounderLedger?",
      answer: "Startups listed as 'Open for Acquisition' have 100% verified financials. Buyers sign a standardized 1-click mutual NDA to unlock the confidential data room. Deals are transacted via regulated escrow accounts with ICICI and Axis Bank, ensuring safe share purchase agreements (SPA), MCA filings, and immediate IP asset handover."
    },
    {
      question: "Is my proprietary financial data kept private if I only want a verified badge?",
      answer: "You have complete control over visibility. You can choose to display exact numbers publicly, display rounded tiers (e.g., '₹10L+ MRR Club'), or share your private verified data room only with approved VCs or prospective buyers."
    },
    {
      question: "What is the fee structure for acquisitions?",
      answer: "Listing your startup and getting verified on FounderLedger is free for founders. For acquisitions, we charge a flat 1.5% escrow success fee upon final deal closing, which is significantly lower than traditional investment bankers charging 5-10%."
    }
  ]
};

if (typeof window !== 'undefined') {
  window.FL_DATA = FL_DATA;
}

