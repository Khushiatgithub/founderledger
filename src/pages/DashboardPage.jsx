import React, { useState, useMemo } from 'react';
import { useUser, UserButton, RedirectToSignIn } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend
} from 'recharts';
import {
  ShieldCheck,
  ArrowLeft,
  TrendingUp,
  Activity,
  CreditCard,
  FileCheck2,
  Key,
  Lock,
  ExternalLink,
  Copy,
  Check,
  Plus,
  RefreshCw,
  Zap,
  Building2,
  AlertCircle,
  Search,
  Bell,
  Sun,
  Moon,
  Users,
  Layers,
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  BarChart3,
  Sliders,
  DollarSign,
  Download,
  Filter,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  Sparkles
} from 'lucide-react';
import { formatCurrency } from '../utils/formatters';
import { useCountUp } from '../utils/useCountUp';

// 12-Month MRR History Data
const MRR_HISTORY_1Y = [
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

// Category Breakdown Data
const CATEGORY_REVENUE = [
  { category: 'B2B SaaS', arr: 18400000, color: '#2563EB' },
  { category: 'AI DevTools', arr: 11200000, color: '#7C3AED' },
  { category: 'FinTech', arr: 7600000, color: '#059669' },
  { category: 'D2C Commerce', arr: 6400000, color: '#D97706' },
  { category: 'EdTech', arr: 4600000, color: '#0284C7' }
];

// Customer Growth Data
const CUSTOMER_GROWTH = [
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

// ARR Gateway Distribution Donut Data
const GATEWAY_DISTRIBUTION = [
  { name: 'Razorpay Subscriptions', value: 68, color: '#2563EB' },
  { name: 'UPI AutoPay (PhonePe/GPay)', value: 22, color: '#10B981' },
  { name: 'Stripe India (USD/SaaS)', value: 10, color: '#6366F1' }
];

// Realistic Transactions Dataset
const INITIAL_TRANSACTIONS = [
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

export default function DashboardPage() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'analytics', 'gateways', 'tax', 'deals'
  const [currency, setCurrency] = useState('INR');
  const [theme, setTheme] = useState(() => localStorage.getItem('fl_theme') || 'light');
  const [timeRange, setTimeRange] = useState('1Y');
  const [searchTxn, setSearchTxn] = useState('');
  const [filterSource, setFilterSource] = useState('all');
  const [copiedKey, setCopiedKey] = useState(false);
  const [dataRoomActive, setDataRoomActive] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Razorpay Settlement Batched', desc: '₹1,24,000 credited to ICICI merchant escrow account.', time: '14m ago', read: false },
    { id: 2, title: 'GSTR-3B Tax Match Confirmed', desc: 'March 2026 filed tax returns 100% matched with MCA CIN.', time: '2h ago', read: false },
    { id: 3, title: 'Peak XV Partners Requested NDA', desc: 'Investor requested private access to your audited deal room.', time: '5h ago', read: false }
  ]);

  if (!isLoaded) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-canvas)' }}>
        <div className="skeleton-shimmer" style={{ width: '220px', height: '44px', borderRadius: '12px' }} />
      </div>
    );
  }

  if (!isSignedIn) {
    return <RedirectToSignIn />;
  }

  const founderName = user.fullName || user.firstName || user.primaryEmailAddress?.emailAddress?.split('@')[0] || 'Founder';
  const companyName = user.publicMetadata?.companyName || 'DocuPulse AI';
  const apiKey = 'fl_live_key_98a7fbc210084ad99';

  const handleCopyKey = () => {
    navigator.clipboard.writeText(apiKey);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  // Animated Count-Up Numbers
  const animatedMRR = useCountUp(1850000, 1000);
  const animatedARR = useCountUp(22200000, 1000);
  const animatedCustomers = useCountUp(248, 800);
  const animatedGrowth = useCountUp(24.8, 800);

  // Filtered transactions
  const filteredTransactions = useMemo(() => {
    return INITIAL_TRANSACTIONS.filter(t => {
      const matchSearch = t.company.toLowerCase().includes(searchTxn.toLowerCase()) || t.invoice.toLowerCase().includes(searchTxn.toLowerCase());
      const matchSource = filterSource === 'all' || t.source.toLowerCase().includes(filterSource.toLowerCase());
      return matchSearch && matchSource;
    });
  }, [searchTxn, filterSource]);

  // MRR Chart Filter
  const chartData = useMemo(() => {
    if (timeRange === '7D') {
      return [
        { month: 'Mon', mrr: 61000 },
        { month: 'Tue', mrr: 67000 },
        { month: 'Wed', mrr: 64000 },
        { month: 'Thu', mrr: 72000 },
        { month: 'Fri', mrr: 78000 },
        { month: 'Sat', mrr: 69000 },
        { month: 'Sun', mrr: 74000 }
      ];
    } else if (timeRange === '30D') {
      return [
        { month: 'W1', mrr: 410000 },
        { month: 'W2', mrr: 445000 },
        { month: 'W3', mrr: 480000 },
        { month: 'W4', mrr: 515000 }
      ];
    } else if (timeRange === '90D') {
      return MRR_HISTORY_1Y.slice(-3);
    }
    return MRR_HISTORY_1Y;
  }, [timeRange]);

  return (
    <div className="dashboard-container" data-theme={theme}>
      {/* Background Ambience */}
      <div className="bg-grid-ambient" aria-hidden="true" />

      {/* ==========================================================================
          Left Collapsible Sidebar (Stripe + Linear)
          ========================================================================== */}
      <aside className={`dashboard-sidebar-container ${sidebarCollapsed ? 'dashboard-sidebar-collapsed' : 'dashboard-sidebar-expanded'}`}>
        <div>
          {/* Sidebar Brand Header */}
          <div style={{
            height: '64px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: sidebarCollapsed ? 'center' : 'space-between',
            padding: sidebarCollapsed ? '0' : '0 16px',
            borderBottom: '1px solid var(--border-light)'
          }}>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: 'var(--brand-primary)',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <ShieldCheck size={18} strokeWidth={2.4} />
              </div>
              {!sidebarCollapsed && (
                <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.05rem', color: 'var(--text-primary)', letterSpacing: '-0.03em' }}>
                  FounderLedger
                </span>
              )}
            </Link>
          </div>

          {/* Sidebar Navigation Items */}
          <nav className="dashboard-sidebar-nav">
            {[
              { id: 'overview', label: 'Overview', icon: <LayoutDashboard size={18} /> },
              { id: 'analytics', label: 'Analytics & Trends', icon: <BarChart3 size={18} /> },
              { id: 'gateways', label: 'Gateways & Webhooks', icon: <Zap size={18} /> },
              { id: 'tax', label: 'GSTR-3B Tax Ledger', icon: <FileCheck2 size={18} /> },
              { id: 'deals', label: 'M&A Deal Room', icon: <Lock size={18} /> }
            ].map(item => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`dashboard-nav-btn ${activeTab === item.id ? 'active' : ''}`}
                style={{ justifyContent: sidebarCollapsed ? 'center' : 'flex-start' }}
                title={sidebarCollapsed ? item.label : undefined}
              >
                {item.icon}
                {!sidebarCollapsed && <span>{item.label}</span>}
              </button>
            ))}
          </nav>
        </div>

        {/* Sidebar Bottom Controls */}
        <div style={{ padding: '12px', borderTop: '1px solid var(--border-light)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <Link
            to="/"
            className="dashboard-nav-btn"
            style={{ justifyContent: sidebarCollapsed ? 'center' : 'flex-start', color: 'var(--text-muted)' }}
            title="Public Index"
          >
            <ArrowLeft size={18} />
            {!sidebarCollapsed && <span>Public Directory</span>}
          </Link>

          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="dashboard-nav-btn"
            style={{ justifyContent: sidebarCollapsed ? 'center' : 'flex-start', color: 'var(--text-muted)' }}
            title={sidebarCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            {sidebarCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
            {!sidebarCollapsed && <span>Collapse Sidebar</span>}
          </button>
        </div>
      </aside>

      {/* ==========================================================================
          Main Dashboard Area
          ========================================================================== */}
      <div className="dashboard-main-area">
        
        {/* Top Bar Navigation */}
        <header className="dashboard-topbar-nav">
          {/* Global Search Bar */}
          <div style={{ position: 'relative', width: '320px', maxWidth: '100%' }}>
            <Search size={15} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              type="text"
              value={searchTxn}
              onChange={(e) => setSearchTxn(e.target.value)}
              placeholder="Search transactions, customers, or ARN..."
              style={{
                width: '100%',
                padding: '7px 12px 7px 34px',
                background: 'var(--bg-subtle)',
                border: '1px solid var(--border-light)',
                borderRadius: '8px',
                fontSize: '0.8125rem',
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-body)',
                outline: 'none'
              }}
            />
          </div>

          {/* Right Topbar Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', position: 'relative' }}>
            
            {/* Currency Switcher */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              background: 'var(--bg-muted)',
              border: '1px solid var(--border-light)',
              borderRadius: '8px',
              padding: '2px',
              fontSize: '0.75rem',
              fontWeight: 600
            }}>
              <button
                onClick={() => setCurrency('INR')}
                style={{
                  padding: '4px 8px',
                  borderRadius: '6px',
                  border: 'none',
                  background: currency === 'INR' ? 'var(--bg-surface)' : 'transparent',
                  color: currency === 'INR' ? 'var(--text-primary)' : 'var(--text-muted)',
                  cursor: 'pointer',
                  fontWeight: 600
                }}
              >
                ₹ INR
              </button>
              <button
                onClick={() => setCurrency('USD')}
                style={{
                  padding: '4px 8px',
                  borderRadius: '6px',
                  border: 'none',
                  background: currency === 'USD' ? 'var(--bg-surface)' : 'transparent',
                  color: currency === 'USD' ? 'var(--text-primary)' : 'var(--text-muted)',
                  cursor: 'pointer',
                  fontWeight: 600
                }}
              >
                $ USD
              </button>
            </div>

            {/* Notifications Bell */}
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '8px',
                  border: '1px solid var(--border-light)',
                  background: 'var(--bg-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--text-secondary)',
                  cursor: 'pointer',
                  position: 'relative'
                }}
              >
                <Bell size={16} />
                {notifications.some(n => !n.read) && (
                  <span style={{
                    position: 'absolute',
                    top: '7px',
                    right: '7px',
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: 'var(--brand-primary)'
                  }} />
                )}
              </button>

              {/* Notification Dropdown Menu */}
              <AnimatePresence>
                {showNotifications && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="notification-dropdown-menu"
                  >
                    <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontWeight: 700, fontSize: '0.875rem' }}>Live Webhook Alerts</span>
                      <button
                        onClick={markAllNotificationsAsRead}
                        style={{ border: 'none', background: 'transparent', color: 'var(--brand-primary)', fontSize: '0.75rem', cursor: 'pointer', fontWeight: 600 }}
                      >
                        Mark all read
                      </button>
                    </div>

                    <div style={{ maxHeight: '280px', overflowY: 'auto' }}>
                      {notifications.map(n => (
                        <div key={n.id} style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-subtle)', background: n.read ? 'transparent' : 'var(--brand-soft)' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
                            <span style={{ fontWeight: 600, fontSize: '0.8125rem', color: 'var(--text-primary)' }}>{n.title}</span>
                            <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>{n.time}</span>
                          </div>
                          <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>{n.desc}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Dark/Light Theme Toggle */}
            <button
              onClick={() => {
                const next = theme === 'dark' ? 'light' : 'dark';
                setTheme(next);
                document.documentElement.setAttribute('data-theme', next);
                localStorage.setItem('fl_theme', next);
              }}
              aria-label="Toggle Theme"
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                border: '1px solid var(--border-light)',
                background: 'var(--bg-subtle)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-secondary)',
                cursor: 'pointer'
              }}
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            {/* Clerk User Profile Dropdown */}
            <UserButton afterSignOutUrl="/" />
          </div>
        </header>

        {/* Dashboard Main Content Body */}
        <main style={{ padding: '32px 24px 64px 24px', maxWidth: '1400px', width: '100%', margin: '0 auto' }}>
          
          {/* Welcome Header */}
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <h1 style={{ fontSize: '1.75rem', fontWeight: 800, letterSpacing: '-0.03em' }}>
                  {companyName} Console
                </h1>
                <span className="badge badge-verified" style={{ fontSize: '0.6875rem' }}>
                  <ShieldCheck size={12} />
                  <span>Triple-Lock Verified</span>
                </span>
              </div>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                Authenticated founder: <strong>{founderName}</strong> • MCA CIN: <code style={{ fontFamily: 'var(--font-mono)' }}>U72900KA2023PTC172819</code> • Ledger Hash: <strong style={{ color: 'var(--brand-primary)', fontFamily: 'var(--font-mono)' }}>FL-2026-KA-88A92F</strong>
              </p>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => setActiveTab('gateways')} className="btn btn-secondary btn-sm" style={{ gap: '6px' }}>
                <Activity size={14} />
                <span>Gateway Status</span>
              </button>
              <button onClick={() => setActiveTab('deals')} className="btn btn-primary btn-sm" style={{ gap: '6px' }}>
                <Lock size={14} />
                <span>NDA Deal Room</span>
              </button>
            </div>
          </div>

          {/* ==========================================================================
              4 Animated Metric Cards (MRR, ARR, Customers, Growth %)
              ========================================================================== */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '16px',
            marginBottom: '32px'
          }}>
            {/* 1. Monthly Recurring Revenue */}
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="glass-card" style={{ padding: '20px', background: 'var(--bg-surface)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                  Monthly Recurring Revenue (MRR)
                </span>
                <CreditCard size={16} style={{ color: 'var(--brand-primary)' }} />
              </div>
              <div style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)', marginBottom: '4px' }}>
                {formatCurrency(animatedMRR, currency)}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', color: 'var(--success-dark)', fontWeight: 600 }}>
                <TrendingUp size={13} />
                <span>+24.8% MoM Growth</span>
              </div>
            </motion.div>

            {/* 2. Annual Recurring Revenue */}
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="glass-card" style={{ padding: '20px', background: 'var(--bg-surface)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                  Annual Run Rate (ARR)
                </span>
                <ShieldCheck size={16} style={{ color: 'var(--brand-primary)' }} />
              </div>
              <div style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--brand-primary)', fontFamily: 'var(--font-mono)', marginBottom: '4px' }}>
                {formatCurrency(animatedARR, currency)}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                Audit Score: <strong style={{ color: 'var(--text-primary)' }}>100% Tax Match</strong>
              </div>
            </motion.div>

            {/* 3. Customers */}
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card" style={{ padding: '20px', background: 'var(--bg-surface)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                  Paying Customers
                </span>
                <Users size={16} style={{ color: 'var(--purple)' }} />
              </div>
              <div style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)', marginBottom: '4px' }}>
                {Math.round(animatedCustomers)}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                ARPU: <strong>₹7,450 / account</strong>
              </div>
            </motion.div>

            {/* 4. Monthly Growth % */}
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="glass-card" style={{ padding: '20px', background: 'var(--bg-surface)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                  Monthly Growth Rate
                </span>
                <TrendingUp size={16} style={{ color: 'var(--success-dark)' }} />
              </div>
              <div style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--success-dark)', fontFamily: 'var(--font-mono)', marginBottom: '4px' }}>
                +{animatedGrowth.toFixed(1)}%
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--brand-primary)', fontWeight: 600 }}>
                Top 10% in Indian B2B SaaS
              </div>
            </motion.div>
          </div>

          {/* ==========================================================================
              4 Recharts Visualizations Grid
              ========================================================================== */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(460px, 1fr))', gap: '24px', marginBottom: '32px' }}>
            
            {/* Chart 1: 12-Month MRR Area Chart */}
            <div className="glass-card" style={{ padding: '24px', background: 'var(--bg-surface)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
                <div>
                  <h3 style={{ fontSize: '1.05rem', marginBottom: '2px' }}>12-Month Audited MRR Trajectory</h3>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Razorpay + UPI AutoPay live settlement feed</p>
                </div>
                <div className="dashboard-tabs">
                  {['7D', '30D', '90D', '1Y'].map(r => (
                    <button
                      key={r}
                      onClick={() => setTimeRange(r)}
                      className={`dashboard-tab-btn ${timeRange === r ? 'active' : ''}`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ width: '100%', height: 260 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                    <defs>
                      <linearGradient id="dashMrrGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#2563EB" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#2563EB" stopOpacity={0.0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(226, 232, 240, 0.6)" />
                    <XAxis dataKey="month" stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={{ stroke: 'rgba(226, 232, 240, 0.8)' }} />
                    <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => currency === 'USD' ? `$${(v/83000).toFixed(0)}k` : `₹${(v/100000).toFixed(1)}L`} />
                    <Tooltip content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="recharts-custom-tooltip">
                            <div style={{ color: '#94A3B8', fontSize: '0.75rem', marginBottom: '4px' }}>{label}</div>
                            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#FFFFFF' }}>{formatCurrency(payload[0].value, currency)}</div>
                          </div>
                        );
                      }
                      return null;
                    }} />
                    <Area type="monotone" dataKey="mrr" stroke="#2563EB" strokeWidth={2.5} fillOpacity={1} fill="url(#dashMrrGrad)" activeDot={{ r: 6, fill: '#2563EB', stroke: '#FFF', strokeWidth: 2 }} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Chart 2: Revenue by Category Bar Chart */}
            <div className="glass-card" style={{ padding: '24px', background: 'var(--bg-surface)' }}>
              <div style={{ marginBottom: '16px' }}>
                <h3 style={{ fontSize: '1.05rem', marginBottom: '2px' }}>ARR Distribution by Sector</h3>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Comparative Indian startup revenue clusters</p>
              </div>

              <div style={{ width: '100%', height: 260 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={CATEGORY_REVENUE} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(226, 232, 240, 0.6)" />
                    <XAxis dataKey="category" stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={{ stroke: 'rgba(226, 232, 240, 0.8)' }} />
                    <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => currency === 'USD' ? `$${(v/8300000).toFixed(1)}M` : `₹${(v/10000000).toFixed(1)}Cr`} />
                    <Tooltip formatter={(val) => [formatCurrency(val, currency), 'Total ARR']} contentStyle={{ background: '#0F172A', borderRadius: '8px', border: 'none', color: '#FFF', fontSize: '0.75rem' }} />
                    <Bar dataKey="arr" radius={[6, 6, 0, 0]}>
                      {CATEGORY_REVENUE.map((entry, index) => (
                        <Cell key={`bar-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Chart 3: Customer Growth Area Chart */}
            <div className="glass-card" style={{ padding: '24px', background: 'var(--bg-surface)' }}>
              <div style={{ marginBottom: '16px' }}>
                <h3 style={{ fontSize: '1.05rem', marginBottom: '2px' }}>Paying Customer Trajectory</h3>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Net paying subscriber growth (85 &rarr; 248 accounts)</p>
              </div>

              <div style={{ width: '100%', height: 260 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={CUSTOMER_GROWTH} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                    <defs>
                      <linearGradient id="dashCustGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#7C3AED" stopOpacity={0.0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(226, 232, 240, 0.6)" />
                    <XAxis dataKey="month" stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={{ stroke: 'rgba(226, 232, 240, 0.8)' }} />
                    <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} />
                    <Tooltip contentStyle={{ background: '#0F172A', borderRadius: '8px', border: 'none', color: '#FFF', fontSize: '0.75rem' }} />
                    <Area type="monotone" dataKey="customers" stroke="#7C3AED" strokeWidth={2.5} fillOpacity={1} fill="url(#dashCustGrad)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Chart 4: ARR Gateway Distribution Donut Chart */}
            <div className="glass-card" style={{ padding: '24px', background: 'var(--bg-surface)' }}>
              <div style={{ marginBottom: '16px' }}>
                <h3 style={{ fontSize: '1.05rem', marginBottom: '2px' }}>Payment Gateway Mix</h3>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Revenue volume split across Indian payment tunnels</p>
              </div>

              <div style={{ width: '100%', height: 260, display: 'flex', alignItems: 'center' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={GATEWAY_DISTRIBUTION}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {GATEWAY_DISTRIBUTION.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(val) => [`${val}%`, 'Volume']} contentStyle={{ background: '#0F172A', borderRadius: '8px', border: 'none', color: '#FFF', fontSize: '0.75rem' }} />
                    <Legend verticalAlign="bottom" height={36} iconType="circle" formatter={(value) => <span style={{ color: 'var(--text-secondary)', fontSize: '0.75rem' }}>{value}</span>} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>

          {/* ==========================================================================
              Recent Transactions Data Table
              ========================================================================== */}
          <div className="glass-card" style={{ padding: '24px', background: 'var(--bg-surface)', marginBottom: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <h3 style={{ fontSize: '1.15rem', marginBottom: '2px' }}>Recent Verified Settlements</h3>
                <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                  Live incoming B2B subscription payments processed via Razorpay & UPI AutoPay.
                </p>
              </div>

              {/* Table Source Filter */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <select
                  value={filterSource}
                  onChange={(e) => setFilterSource(e.target.value)}
                  style={{
                    padding: '6px 12px',
                    background: 'var(--bg-subtle)',
                    border: '1px solid var(--border-light)',
                    borderRadius: '8px',
                    fontSize: '0.8125rem',
                    color: 'var(--text-primary)',
                    cursor: 'pointer',
                    outline: 'none'
                  }}
                >
                  <option value="all">All Payment Gateways</option>
                  <option value="razorpay">Razorpay Subscriptions</option>
                  <option value="upi">UPI AutoPay</option>
                  <option value="stripe">Stripe India</option>
                  <option value="bank">ICICI Bank Wire</option>
                </select>
              </div>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8125rem', textAlign: 'left' }}>
                <thead>
                  <tr style={{ background: 'var(--bg-subtle)', borderBottom: '1px solid var(--border-light)' }}>
                    <th style={{ padding: '12px 16px', fontWeight: 700, color: 'var(--text-muted)' }}>COMPANY</th>
                    <th style={{ padding: '12px 16px', fontWeight: 700, color: 'var(--text-muted)' }}>AMOUNT</th>
                    <th style={{ padding: '12px 16px', fontWeight: 700, color: 'var(--text-muted)' }}>STATUS</th>
                    <th style={{ padding: '12px 16px', fontWeight: 700, color: 'var(--text-muted)' }}>GATEWAY / SOURCE</th>
                    <th style={{ padding: '12px 16px', fontWeight: 700, color: 'var(--text-muted)' }}>DATE</th>
                    <th style={{ padding: '12px 16px', fontWeight: 700, color: 'var(--text-muted)', textAlign: 'right' }}>INVOICE</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTransactions.map(t => (
                    <tr key={t.id} style={{ borderBottom: '1px solid var(--border-subtle)', transition: 'background 0.15s' }}>
                      {/* Company Name with Initial Badge */}
                      <td style={{ padding: '12px 16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <div style={{
                            width: '28px',
                            height: '28px',
                            borderRadius: '6px',
                            background: 'var(--brand-primary)',
                            color: '#FFFFFF',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 700,
                            fontSize: '0.6875rem'
                          }}>
                            {t.logo}
                          </div>
                          <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{t.company}</span>
                        </div>
                      </td>

                      {/* Amount */}
                      <td style={{ padding: '12px 16px', fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>
                        +{formatCurrency(t.amount, currency)}
                      </td>

                      {/* Status */}
                      <td style={{ padding: '12px 16px' }}>
                        <span className="badge badge-verified" style={{ fontSize: '0.6875rem' }}>
                          <CheckCircle2 size={10} />
                          <span>{t.status}</span>
                        </span>
                      </td>

                      {/* Source */}
                      <td style={{ padding: '12px 16px', color: 'var(--text-secondary)' }}>
                        {t.source}
                      </td>

                      {/* Date */}
                      <td style={{ padding: '12px 16px', color: 'var(--text-muted)', fontSize: '0.75rem' }}>
                        {t.date}
                      </td>

                      {/* Invoice Link */}
                      <td style={{ padding: '12px 16px', textAlign: 'right', fontFamily: 'var(--font-mono)', color: 'var(--brand-primary)', fontWeight: 600 }}>
                        {t.invoice}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Table Footer */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              <div>Showing {filteredTransactions.length} of {INITIAL_TRANSACTIONS.length} processed settlement receipts</div>
              <div>HMAC SHA-256 Webhook Sync: <strong>Active</strong></div>
            </div>
          </div>

          {/* ==========================================================================
              Gateways & API Keys Settings Grid
              ========================================================================== */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
            
            {/* API Due-Diligence Key */}
            <div className="glass-card" style={{ padding: '24px', background: 'var(--bg-surface)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <h3 style={{ fontSize: '1.05rem' }}>Read-Only Due Diligence Token</h3>
                <Key size={16} style={{ color: 'var(--brand-primary)' }} />
              </div>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
                Share with VCs & prospective buyers to grant 1-click financial verification without granting dashboard write access.
              </p>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 14px',
                background: '#090D16',
                borderRadius: '8px',
                border: '1px solid #1E293B',
                color: '#93C5FD',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem'
              }}>
                <span>{apiKey}</span>
                <button
                  onClick={handleCopyKey}
                  style={{
                    border: 'none',
                    background: 'rgba(255, 255, 255, 0.1)',
                    color: '#FFFFFF',
                    padding: '4px 8px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '0.75rem'
                  }}
                >
                  {copiedKey ? <Check size={12} style={{ color: '#10B981' }} /> : <Copy size={12} />}
                  <span>{copiedKey ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>

            {/* Private Deal Room Settings */}
            <div className="glass-card" style={{ padding: '24px', background: 'var(--bg-surface)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <h3 style={{ fontSize: '1.05rem' }}>M&A Deal Room Status</h3>
                <span className="badge badge-brand" style={{ fontSize: '0.6875rem' }}>Escrow Ready</span>
              </div>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
                Allow verified institutional acquirers to request access to your audited GSTR-3B filings under standard NDA.
              </p>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 14px',
                background: 'var(--bg-subtle)',
                borderRadius: '8px',
                border: '1px solid var(--border-light)'
              }}>
                <span style={{ fontSize: '0.8125rem', fontWeight: 600 }}>Active on Marketplace</span>
                <button
                  onClick={() => setDataRoomActive(!dataRoomActive)}
                  className={`btn btn-sm ${dataRoomActive ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ padding: '3px 10px', fontSize: '0.75rem' }}
                >
                  {dataRoomActive ? 'Listed (Active)' : 'Hidden (Private)'}
                </button>
              </div>
            </div>

          </div>

        </main>
      </div>
    </div>
  );
}
