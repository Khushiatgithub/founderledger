import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ShieldCheck,
  ArrowLeft,
  Globe,
  Calendar,
  Building2,
  TrendingUp,
  CreditCard,
  Users,
  CheckCircle2,
  FileCheck2,
  Lock,
  Share2,
  ExternalLink,
  Copy,
  Check,
  Zap,
  DollarSign,
  Sparkles,
  Sun,
  Moon
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import { fetchStartupBySlug } from '../services/supabaseService';
import { formatCurrency } from '../utils/formatters';

export default function StartupProfilePage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [startup, setStartup] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copiedHash, setCopiedHash] = useState(false);
  const [currency, setCurrency] = useState('INR');
  const [theme, setTheme] = useState(() => localStorage.getItem('fl_theme') || 'light');

  useEffect(() => {
    async function loadStartup() {
      setLoading(true);
      try {
        const data = await fetchStartupBySlug(slug);
        setStartup(data);
      } catch (err) {
        console.error('Error loading startup profile:', err);
      } finally {
        setLoading(false);
      }
    }
    loadStartup();
  }, [slug]);

  const handleCopyHash = () => {
    if (startup?.ledgerHash) {
      navigator.clipboard.writeText(startup.ledgerHash);
      setCopiedHash(true);
      setTimeout(() => setCopiedHash(false), 2000);
    }
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-canvas)' }}>
        <div className="skeleton-shimmer" style={{ width: '280px', height: '60px', borderRadius: '14px' }} />
      </div>
    );
  }

  if (!startup) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px', background: 'var(--bg-canvas)' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '8px' }}>Startup Not Found</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>The requested verified ledger profile does not exist.</p>
        <Link to="/dashboard" className="btn btn-primary btn-sm">
          Return to Dashboard
        </Link>
      </div>
    );
  }

  const gatewayDistribution = [
    { name: 'Razorpay Subscriptions', value: startup.revenueBreakdown?.razorpay || 68, color: '#2563EB' },
    { name: 'UPI AutoPay', value: startup.revenueBreakdown?.upiAutoPay || 22, color: '#10B981' },
    { name: 'Stripe Global', value: startup.revenueBreakdown?.stripe || 10, color: '#6366F1' }
  ];

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-canvas)', color: 'var(--text-primary)', position: 'relative' }}>
      {/* Background Ambience */}
      <div className="bg-grid-ambient" aria-hidden="true" />

      {/* Top Profile Navigation Bar */}
      <header style={{
        height: '64px',
        borderBottom: '1px solid var(--border-light)',
        background: 'var(--bg-glass)',
        backdropFilter: 'blur(16px)',
        position: 'sticky',
        top: 0,
        zIndex: 90,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Link
            to="/dashboard"
            className="btn btn-secondary btn-sm"
            style={{ padding: '6px 12px', fontSize: '0.75rem', gap: '6px' }}
          >
            <ArrowLeft size={14} />
            <span>Dashboard</span>
          </Link>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
            <div style={{
              width: '28px',
              height: '28px',
              borderRadius: '6px',
              background: 'var(--brand-primary)',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <ShieldCheck size={16} strokeWidth={2.4} />
            </div>
            <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '0.95rem', color: 'var(--text-primary)' }}>
              FounderLedger Index
            </span>
          </Link>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
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

          {/* Theme Toggle */}
          <button
            onClick={() => {
              const next = theme === 'dark' ? 'light' : 'dark';
              setTheme(next);
              document.documentElement.setAttribute('data-theme', next);
              localStorage.setItem('fl_theme', next);
            }}
            aria-label="Toggle Theme"
            style={{
              width: '34px',
              height: '34px',
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
            {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
          </button>
        </div>
      </header>

      {/* Main Profile Container */}
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '36px 24px 80px 24px' }}>
        
        {/* Startup Header Banner Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card"
          style={{ padding: '32px', background: 'var(--bg-surface)', marginBottom: '28px' }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
            
            {/* Left: Logo & Core Metadata */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
              {startup.logo ? (
                <img
                  src={startup.logo}
                  alt={startup.name}
                  style={{ width: '72px', height: '72px', borderRadius: '16px', objectFit: 'cover', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-sm)' }}
                />
              ) : (
                <div style={{
                  width: '72px',
                  height: '72px',
                  borderRadius: '16px',
                  background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem',
                  fontWeight: 800,
                  boxShadow: 'var(--shadow-sm)'
                }}>
                  {startup.logoInitials || startup.name?.substring(0, 2).toUpperCase() || 'FL'}
                </div>
              )}

              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '6px' }}>
                  <h1 style={{ fontSize: '1.85rem', fontWeight: 900, letterSpacing: '-0.03em' }}>
                    {startup.name}
                  </h1>
                  <span className="badge badge-verified" style={{ fontSize: '0.75rem' }}>
                    <ShieldCheck size={13} />
                    <span>{startup.badgeText || 'Triple-Lock Verified'}</span>
                  </span>
                  <span className="badge badge-brand" style={{ fontSize: '0.75rem' }}>
                    {startup.categoryLabel || 'B2B SaaS'}
                  </span>
                </div>

                <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', maxWidth: '680px', lineHeight: 1.5, marginBottom: '10px' }}>
                  {startup.tagline}
                </p>

                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '0.8125rem', color: 'var(--text-muted)', flexWrap: 'wrap' }}>
                  {startup.website && (
                    <a
                      href={startup.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--brand-primary)', textDecoration: 'none', fontWeight: 600 }}
                    >
                      <Globe size={14} />
                      <span>{startup.website.replace(/^https?:\/\//, '')}</span>
                      <ExternalLink size={12} />
                    </a>
                  )}
                  <span>•</span>
                  <span>Founded in <strong>{startup.founded || '2024'}</strong></span>
                  <span>•</span>
                  <span>{startup.location || 'Bengaluru, KA'}</span>
                </div>
              </div>
            </div>

            {/* Right: CTA & Deal Badge */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '10px' }}>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Asking Valuation</span>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--brand-primary)', fontFamily: 'var(--font-mono)' }}>
                  {formatCurrency(startup.askingPrice || (startup.arr * 4), currency)}
                </div>
                <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>Multiple: <strong>{startup.multiple || '4.0x ARR'}</strong></span>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button onClick={handleCopyHash} className="btn btn-secondary btn-sm" style={{ gap: '6px' }}>
                  {copiedHash ? <Check size={14} color="#10B981" /> : <Copy size={14} />}
                  <span>{copiedHash ? 'Hash Copied' : 'Share Audit'}</span>
                </button>
                <Link to="/dashboard" className="btn btn-primary btn-sm" style={{ gap: '6px' }}>
                  <Lock size={14} />
                  <span>Request NDA Access</span>
                </Link>
              </div>
            </div>

          </div>
        </motion.div>

        {/* 4 Animated Metric Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '16px',
          marginBottom: '28px'
        }}>
          {/* Card 1: Verified MRR */}
          <div className="glass-card" style={{ padding: '20px', background: 'var(--bg-surface)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                Monthly Recurring Revenue
              </span>
              <CreditCard size={16} color="var(--brand-primary)" />
            </div>
            <div style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)', marginBottom: '4px' }}>
              {formatCurrency(startup.mrr, currency)}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', color: 'var(--success-dark)', fontWeight: 600 }}>
              <TrendingUp size={13} />
              <span>+{startup.growthMoM || 24.8}% MoM Growth</span>
            </div>
          </div>

          {/* Card 2: Annual Run Rate */}
          <div className="glass-card" style={{ padding: '20px', background: 'var(--bg-surface)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                Annualized Run Rate (ARR)
              </span>
              <ShieldCheck size={16} color="var(--brand-primary)" />
            </div>
            <div style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--brand-primary)', fontFamily: 'var(--font-mono)', marginBottom: '4px' }}>
              {formatCurrency(startup.arr, currency)}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
              Audit Match: <strong>{startup.gstStatus || '100% Tax Match'}</strong>
            </div>
          </div>

          {/* Card 3: Paying Customers */}
          <div className="glass-card" style={{ padding: '20px', background: 'var(--bg-surface)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                Paying Customers
              </span>
              <Users size={16} color="var(--purple)" />
            </div>
            <div style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)', marginBottom: '4px' }}>
              {startup.customerCount || 45} accounts
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
              Net Churn: <strong>{startup.churnRate || 1.4}% / mo</strong>
            </div>
          </div>

          {/* Card 4: Verification Tier */}
          <div className="glass-card" style={{ padding: '20px', background: 'var(--bg-surface)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                Ledger Verification
              </span>
              <FileCheck2 size={16} color="var(--success-dark)" />
            </div>
            <div style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--success-dark)', fontFamily: 'var(--font-heading)', marginBottom: '4px' }}>
              {startup.tier || 'Platinum'}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
              Audited: <strong>{startup.auditDate || 'March 2026'}</strong>
            </div>
          </div>
        </div>

        {/* 12-Month Audited MRR Trajectory Chart */}
        <div className="glass-card" style={{ padding: '28px', background: 'var(--bg-surface)', marginBottom: '28px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <h2 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '2px' }}>
                12-Month Audited MRR Curve
              </h2>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                Reconciled from live Razorpay, UPI AutoPay, and Stripe gateway webhooks.
              </p>
            </div>
            <div className="badge badge-verified" style={{ fontSize: '0.75rem' }}>
              <CheckCircle2 size={12} />
              <span>GSTR-3B Reconciled</span>
            </div>
          </div>

          <div style={{ width: '100%', height: 280 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={startup.monthlyHistory || []} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                <defs>
                  <linearGradient id="profileMrrGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563EB" stopOpacity={0.35} />
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
                <Area type="monotone" dataKey="revenue" stroke="#2563EB" strokeWidth={3} fillOpacity={1} fill="url(#profileMrrGrad)" activeDot={{ r: 6, fill: '#2563EB', stroke: '#FFF', strokeWidth: 2 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bottom Grid: Statutory Trust & Payment Mix */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '24px' }}>
          
          {/* Statutory Verification Details Card */}
          <div className="glass-card" style={{ padding: '24px', background: 'var(--bg-surface)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <ShieldCheck size={18} color="var(--brand-primary)" />
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800 }}>Statutory Financial Audit Details</h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 12px', background: 'var(--bg-subtle)', borderRadius: '8px', fontSize: '0.8125rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>MCA Corporate CIN:</span>
                <strong style={{ fontFamily: 'var(--font-mono)' }}>{startup.mcaCin || 'U72900KA2024PTC188219'}</strong>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 12px', background: 'var(--bg-subtle)', borderRadius: '8px', fontSize: '0.8125rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>GSTIN Identifier:</span>
                <strong style={{ fontFamily: 'var(--font-mono)' }}>{startup.gstin || '29AAACD4982R1Z8'}</strong>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 12px', background: 'var(--bg-subtle)', borderRadius: '8px', fontSize: '0.8125rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Ledger Cryptographic Hash:</span>
                <strong style={{ fontFamily: 'var(--font-mono)', color: 'var(--brand-primary)' }}>{startup.ledgerHash || 'FL-2026-KA-88A92F'}</strong>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 12px', background: 'var(--bg-subtle)', borderRadius: '8px', fontSize: '0.8125rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Tax Reconciliation:</span>
                <span className="badge badge-verified" style={{ fontSize: '0.6875rem' }}>
                  <CheckCircle2 size={10} />
                  <span>100% GSTR-3B Match</span>
                </span>
              </div>
            </div>
          </div>

          {/* Payment Gateway Distribution Donut */}
          <div className="glass-card" style={{ padding: '24px', background: 'var(--bg-surface)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <Zap size={18} color="var(--brand-primary)" />
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800 }}>Payment Gateway Volume Split</h3>
            </div>

            <div style={{ width: '100%', height: 200, display: 'flex', alignItems: 'center' }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={gatewayDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={75}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {gatewayDistribution.map((entry, index) => (
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

      </main>
    </div>
  );
}
