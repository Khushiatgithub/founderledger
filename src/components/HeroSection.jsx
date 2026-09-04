import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  ReferenceLine 
} from 'recharts';
import { 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  TrendingUp, 
  Sparkles, 
  Lock, 
  FileCheck2, 
  Zap, 
  BarChart3, 
  Activity, 
  Radio, 
  ExternalLink,
  ChevronRight,
  Clock,
  Layers
} from 'lucide-react';
import { PLATFORM_DATA } from '../data/startups';
import { formatCurrency } from '../utils/formatters';
import { useCountUp } from '../utils/useCountUp';

export default function HeroSection({ currency, onSelectStartup, onOpenVerify }) {
  const [selectedHeroIndex, setSelectedHeroIndex] = useState(0);
  const [timeRange, setTimeRange] = useState('1Y');
  const [activeMetricTab, setActiveMetricTab] = useState('revenue');
  const [livePings, setLivePings] = useState([
    { id: 1, type: 'razorpay.payment.authorized', amount: 14500, customer: 'Zepto Logistics', time: '2s ago' },
    { id: 2, type: 'gst.b2b.invoice_reconciled', amount: 84000, customer: 'Groww Capital', time: '14s ago' },
    { id: 3, type: 'upi.autopay.settled', amount: 4999, customer: 'DevStudio HQ', time: '29s ago' }
  ]);

  const activeStartup = PLATFORM_DATA.startups[selectedHeroIndex] || PLATFORM_DATA.startups[0];

  // Simulated live webhook ping animation
  useEffect(() => {
    const interval = setInterval(() => {
      const customers = ['Swiggy Instamart', 'Razorpay Labs', 'CRED Club', 'Ola Fleet', 'Meesho Store', 'Postman Dev', 'Unacademy Plus'];
      const eventTypes = ['razorpay.payment.authorized', 'upi.autopay.settled', 'gst.b2b.invoice_reconciled', 'subscription.charged'];
      const randomAmount = Math.floor(Math.random() * 45000) + 2500;
      const randomCust = customers[Math.floor(Math.random() * customers.length)];
      const randomType = eventTypes[Math.floor(Math.random() * eventTypes.length)];

      setLivePings(prev => [
        { id: Date.now(), type: randomType, amount: randomAmount, customer: randomCust, time: 'Just now' },
        ...prev.slice(0, 2)
      ]);
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  // Filter history data based on time range
  const rawData = activeStartup.monthlyHistory || [];
  let chartData = rawData;
  if (timeRange === '7D') {
    chartData = [
      { month: 'Mon', revenue: Math.round(activeStartup.mrr * 0.031) },
      { month: 'Tue', revenue: Math.round(activeStartup.mrr * 0.034) },
      { month: 'Wed', revenue: Math.round(activeStartup.mrr * 0.032) },
      { month: 'Thu', revenue: Math.round(activeStartup.mrr * 0.038) },
      { month: 'Fri', revenue: Math.round(activeStartup.mrr * 0.041) },
      { month: 'Sat', revenue: Math.round(activeStartup.mrr * 0.035) },
      { month: 'Sun', revenue: Math.round(activeStartup.mrr * 0.039) }
    ];
  } else if (timeRange === '30D') {
    chartData = [
      { month: 'W1', revenue: Math.round(activeStartup.mrr * 0.22) },
      { month: 'W2', revenue: Math.round(activeStartup.mrr * 0.24) },
      { month: 'W3', revenue: Math.round(activeStartup.mrr * 0.26) },
      { month: 'W4', revenue: Math.round(activeStartup.mrr * 0.28) }
    ];
  } else if (timeRange === '90D') {
    chartData = rawData.slice(-3);
  }

  // Animated counters
  const animatedMRR = useCountUp(activeStartup.mrr, 900);
  const animatedARR = useCountUp(activeStartup.arr, 900);

  // Custom Recharts Tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const val = payload[0].value;
      return (
        <div className="recharts-custom-tooltip">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', marginBottom: '6px' }}>
            <span style={{ fontWeight: 600, color: '#94A3B8' }}>{label}</span>
            <span className="badge badge-verified" style={{ fontSize: '0.65rem', padding: '2px 6px' }}>
              ✓ Verified Ledger
            </span>
          </div>
          <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.02em' }}>
            {formatCurrency(val, currency)}
          </div>
          <div style={{ marginTop: '8px', paddingTop: '8px', borderTop: '1px solid rgba(255, 255, 255, 0.1)', fontSize: '0.72rem', color: '#CBD5E1', display: 'flex', gap: '8px' }}>
            <span>Razorpay: <strong>{activeStartup.revenueBreakdown?.razorpay || 70}%</strong></span>
            <span>UPI: <strong>{activeStartup.revenueBreakdown?.upiAutoPay || 20}%</strong></span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <section className="hero-main" id="hero-section">
      <div className="container">
        
        {/* Top Trust Pill */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="hero-pill-badge"
        >
          <span style={{
            background: 'var(--brand-primary)',
            color: '#FFFFFF',
            fontSize: '0.6875rem',
            fontWeight: 700,
            padding: '2px 8px',
            borderRadius: '9999px',
            letterSpacing: '0.04em'
          }}>
            TRIPLE-LOCK
          </span>
          <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
            India's Verified Startup Revenue Platform (Razorpay + UPI + GST)
          </span>
          <ArrowRight size={14} style={{ color: 'var(--brand-primary)' }} />
        </motion.div>

        {/* Hero Title */}
        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="hero-headline"
        >
          Verify Once. Build Trust Forever.<br />
          <span className="text-gradient-stripe">The Ledger of Indian Startups.</span>
        </motion.h1>

        {/* Hero Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="hero-lead-text"
        >
          Connect your Razorpay, UPI QR, and GSTIN to prove authentic ARR, get discovered on India's premier verified founder leaderboard, or buy & sell profitable businesses with zero due-diligence friction.
        </motion.p>

        {/* Action CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            gap: '12px', 
            flexWrap: 'wrap', 
            marginBottom: '48px' 
          }}
        >
          <button onClick={onOpenVerify} className="btn btn-primary btn-lg">
            <ShieldCheck size={19} strokeWidth={2.4} />
            <span>Verify My Startup (Free)</span>
          </button>
          <a href="#leaderboard-section" className="btn btn-secondary btn-lg">
            <BarChart3 size={18} />
            <span>Explore 480+ Startups</span>
          </a>
          <a href="#valuation-section" className="btn btn-outline btn-lg">
            <Sparkles size={18} />
            <span>Valuation Calculator</span>
          </a>
        </motion.div>

        {/* ==========================================================================
            Realistic $50M SaaS Fintech Analytics Console (Recharts Powered)
            ========================================================================== */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="dashboard-console"
        >
          {/* Top Console Navigation Bar */}
          <div className="dashboard-header">
            {/* Startup Selector Switcher */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', overflowX: 'auto', paddingBottom: '4px', maxWidth: '100%' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginRight: '4px' }}>
                VERIFIED LEDGER:
              </span>
              {PLATFORM_DATA.startups.slice(0, 5).map((st, idx) => (
                <button
                  key={st.id}
                  onClick={() => setSelectedHeroIndex(idx)}
                  className={`btn btn-sm ${selectedHeroIndex === idx ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ fontSize: '0.8125rem', padding: '5px 12px', borderRadius: '8px' }}
                >
                  <span>{st.name}</span>
                  {selectedHeroIndex === idx && (
                    <span style={{ fontSize: '0.65rem', background: 'rgba(255,255,255,0.25)', padding: '1px 5px', borderRadius: '4px' }}>
                      {st.categoryLabel}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Time Range Selector */}
            <div className="dashboard-tabs">
              {['7D', '30D', '90D', '1Y'].map(range => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`dashboard-tab-btn ${timeRange === range ? 'active' : ''}`}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>

          {/* Console Main Body Grid */}
          <div className="dashboard-grid">
            
            {/* Left Sidebar: Live Settlement Feeds & Audit Status */}
            <div className="dashboard-sidebar">
              {/* Active Startup Identity Card */}
              <div style={{ background: 'var(--bg-surface)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-light)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)' }}>
                    {activeStartup.name}
                  </div>
                  <span className="badge badge-verified" style={{ fontSize: '0.7rem' }}>
                    <ShieldCheck size={12} />
                    <span>Triple-Lock</span>
                  </span>
                </div>
                <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', lineHeight: '1.4', marginBottom: '12px' }}>
                  {activeStartup.tagline}
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>GSTIN:</span>
                    <strong style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>{activeStartup.gstin}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Proof Hash:</span>
                    <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--brand-primary)', fontWeight: 600 }}>
                      {activeStartup.ledgerHash}
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Audit Date:</span>
                    <span style={{ color: 'var(--text-secondary)' }}>{activeStartup.auditDate}</span>
                  </div>
                </div>
              </div>

              {/* Live Webhook Incoming Stream */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    <span className="pulse-dot"></span>
                    <span>Live Webhook Feed</span>
                  </div>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Razorpay v2</span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <AnimatePresence>
                    {livePings.map(ping => (
                      <motion.div
                        key={ping.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        transition={{ duration: 0.25 }}
                        style={{
                          background: 'var(--bg-surface)',
                          border: '1px solid var(--border-light)',
                          borderRadius: '8px',
                          padding: '8px 10px',
                          fontSize: '0.75rem'
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2px' }}>
                          <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--brand-primary)', fontWeight: 600, fontSize: '0.7rem' }}>
                            {ping.type.split('.')[1]}
                          </span>
                          <span style={{ color: 'var(--text-muted)', fontSize: '0.65rem' }}>{ping.time}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>{ping.customer}</span>
                          <strong style={{ color: 'var(--text-primary)' }}>+₹{ping.amount.toLocaleString('en-IN')}</strong>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>

              <button 
                onClick={() => onSelectStartup(activeStartup)} 
                className="btn btn-outline btn-sm"
                style={{ width: '100%', marginTop: 'auto', gap: '6px' }}
              >
                <span>Full Ledger Inspection</span>
                <ExternalLink size={13} />
              </button>
            </div>

            {/* Right Panel: Metric Highlights & Interactive Recharts Graph */}
            <div className="dashboard-main-panel">
              
              {/* 4 Glassmorphism Metric Cards with Animated Counters */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px' }}>
                
                {/* Verified MRR */}
                <div style={{ background: 'var(--bg-subtle)', border: '1px solid var(--border-light)', borderRadius: '12px', padding: '12px 14px' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '4px' }}>
                    VERIFIED MRR
                  </div>
                  <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.03em' }}>
                    {formatCurrency(animatedMRR, currency)}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px', fontSize: '0.75rem', color: 'var(--success-dark)', fontWeight: 600 }}>
                    <TrendingUp size={13} />
                    <span>+{activeStartup.growthMoM}% MoM</span>
                  </div>
                </div>

                {/* Annual Run Rate */}
                <div style={{ background: 'var(--bg-subtle)', border: '1px solid var(--border-light)', borderRadius: '12px', padding: '12px 14px' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '4px' }}>
                    VERIFIED ARR
                  </div>
                  <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--brand-primary)', letterSpacing: '-0.03em' }}>
                    {formatCurrency(animatedARR, currency)}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                    Audit Score: <strong style={{ color: 'var(--text-primary)' }}>100% Match</strong>
                  </div>
                </div>

                {/* Net Margin */}
                <div style={{ background: 'var(--bg-subtle)', border: '1px solid var(--border-light)', borderRadius: '12px', padding: '12px 14px' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '4px' }}>
                    NET PROFIT MARGIN
                  </div>
                  <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.03em' }}>
                    {activeStartup.netMargin}%
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                    Churn: <strong style={{ color: 'var(--text-primary)' }}>{activeStartup.churnRate}% / mo</strong>
                  </div>
                </div>

                {/* Asking Price or Valuation */}
                <div style={{ background: 'var(--bg-subtle)', border: '1px solid var(--border-light)', borderRadius: '12px', padding: '12px 14px' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '4px' }}>
                    EST. VALUATION
                  </div>
                  <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.03em' }}>
                    {activeStartup.askingPrice ? formatCurrency(activeStartup.askingPrice, currency) : formatCurrency(activeStartup.arr * 4.2, currency)}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--brand-primary)', fontWeight: 600, marginTop: '4px' }}>
                    {activeStartup.multiple || '4.2x Multiple'}
                  </div>
                </div>
              </div>

              {/* Interactive Recharts Area Chart */}
              <div style={{ 
                background: 'var(--bg-subtle)', 
                border: '1px solid var(--border-light)', 
                borderRadius: '12px', 
                padding: '16px 12px 8px 12px',
                position: 'relative'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 8px 12px 8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Activity size={16} style={{ color: 'var(--brand-primary)' }} />
                    <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                      Audited Revenue Trajectory ({timeRange})
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#2563EB' }}></span>
                      Razorpay Settlement
                    </span>
                  </div>
                </div>

                <div style={{ width: '100%', height: 260 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                      <defs>
                        <linearGradient id="heroRevenueGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#2563EB" stopOpacity={0.28} />
                          <stop offset="95%" stopColor="#2563EB" stopOpacity={0.0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(226, 232, 240, 0.6)" />
                      <XAxis 
                        dataKey="month" 
                        stroke="#94A3B8" 
                        fontSize={11} 
                        tickLine={false} 
                        axisLine={{ stroke: 'rgba(226, 232, 240, 0.8)' }} 
                      />
                      <YAxis 
                        stroke="#94A3B8" 
                        fontSize={11} 
                        tickLine={false} 
                        axisLine={false}
                        tickFormatter={(v) => currency === 'USD' ? `$${(v/83000).toFixed(0)}k` : `₹${(v/100000).toFixed(1)}L`} 
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Area 
                        type="monotone" 
                        dataKey="revenue" 
                        stroke="#2563EB" 
                        strokeWidth={2.5} 
                        fillOpacity={1} 
                        fill="url(#heroRevenueGradient)" 
                        activeDot={{ r: 6, fill: '#2563EB', stroke: '#FFFFFF', strokeWidth: 2 }}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Bottom Security Compliance Bar */}
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between', 
                padding: '8px 12px', 
                background: 'var(--bg-subtle)', 
                borderRadius: '8px', 
                border: '1px solid var(--border-light)',
                fontSize: '0.75rem',
                color: 'var(--text-secondary)',
                flexWrap: 'wrap',
                gap: '8px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Lock size={13} style={{ color: 'var(--success-dark)' }} />
                  <span>256-bit Encrypted Read-Only API Tunnel</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span>GSTIN Check: <strong>Active</strong></span>
                  <span>MCA CIN: <strong>Validated</strong></span>
                  <span style={{ color: 'var(--success-dark)', fontWeight: 600 }}>● 99.99% Uptime</span>
                </div>
              </div>

            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
