import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, ArrowRight, CheckCircle2, TrendingUp, Sparkles, Lock, FileCheck2, Zap, BarChart3 } from 'lucide-react';
import { PLATFORM_DATA } from '../data/startups';
import { formatCurrency } from '../utils/formatters';

export default function HeroSection({ currency, onSelectStartup, onOpenVerify }) {
  const [selectedHeroIndex, setSelectedHeroIndex] = useState(0);
  const activeStartup = PLATFORM_DATA.startups[selectedHeroIndex] || PLATFORM_DATA.startups[0];

  // Generate SVG curve
  const dataPoints = activeStartup.monthlyHistory;
  const maxVal = Math.max(...dataPoints.map(d => d.revenue)) * 1.15;
  const minVal = Math.min(...dataPoints.map(d => d.revenue)) * 0.85;
  const width = 640;
  const height = 180;
  const padX = 30;
  const padY = 20;
  const chartW = width - padX * 2;
  const chartH = height - padY * 2;

  const points = dataPoints.map((d, i) => {
    const x = padX + (i / (dataPoints.length - 1)) * chartW;
    const y = height - padY - ((d.revenue - minVal) / (maxVal - minVal)) * chartH;
    return { x, y, ...d };
  });

  let pathD = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i];
    const p1 = points[i + 1];
    const cpX = (p0.x + p1.x) / 2;
    pathD += ` C ${cpX} ${p0.y}, ${cpX} ${p1.y}, ${p1.x} ${p1.y}`;
  }

  const areaD = `${pathD} L ${points[points.length - 1].x} ${height - padY} L ${points[0].x} ${height - padY} Z`;

  return (
    <section className="hero-main" id="hero-section">
      <div className="container">
        {/* Animated Badge */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="hero-pill-badge"
        >
          <span style={{
            background: 'var(--brand-primary)',
            color: '#FFFFFF',
            fontSize: '0.7rem',
            fontWeight: 800,
            padding: '2px 8px',
            borderRadius: '9999px',
            textTransform: 'uppercase'
          }}>
            TRIPLE-LOCK
          </span>
          <span>Verified Startup Revenue Engine (Razorpay + UPI + GST)</span>
          <ArrowRight size={14} />
        </motion.div>

        {/* Hero Title */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="hero-headline"
        >
          Verify Once. Build Trust Forever.<br />
          <span className="text-gradient-stripe">The Ledger of Indian Startups.</span>
        </motion.h1>

        {/* Hero Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="hero-lead-text"
        >
          Connect your Razorpay, UPI QR, and GSTIN to prove authentic ARR, get listed on India's #1 transparent founder leaderboard, or buy & sell profitable businesses with zero escrow friction.
        </motion.p>

        {/* Hero Action CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '3.5rem' }}
        >
          <button onClick={onOpenVerify} className="btn btn-primary btn-lg">
            <ShieldCheck size={20} strokeWidth={2.5} />
            <span>Verify My Startup (Free)</span>
          </button>
          <a href="#leaderboard-section" className="btn btn-secondary btn-lg">
            <BarChart3 size={18} />
            <span>Explore 450+ Verified Startups</span>
          </a>
          <a href="#valuation-section" className="btn btn-outline btn-lg">
            <Sparkles size={18} />
            <span>Valuation Calculator</span>
          </a>
        </motion.div>

        {/* Interactive Live Revenue Dashboard (Stripe / Linear precision) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="glass-card-elevated"
          style={{
            maxWidth: '1040px',
            margin: '0 auto',
            textAlign: 'left',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-xl), var(--shadow-glow)'
          }}
        >
          {/* Visualizer Window Header */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '1rem 1.5rem',
            background: 'var(--bg-subtle)',
            borderBottom: '1px solid var(--border-light)',
            flexWrap: 'wrap',
            gap: '0.75rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#EF4444' }}></span>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#F59E0B' }}></span>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10B981' }}></span>
            </div>

            {/* Switch between demo startups */}
            <div style={{
              display: 'inline-flex',
              background: 'var(--bg-card)',
              border: '1px solid var(--border-light)',
              borderRadius: '9999px',
              padding: '2px',
              gap: '2px'
            }}>
              {PLATFORM_DATA.startups.slice(0, 3).map((st, idx) => (
                <button
                  key={st.id}
                  onClick={() => setSelectedHeroIndex(idx)}
                  style={{
                    padding: '4px 12px',
                    borderRadius: '9999px',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    background: selectedHeroIndex === idx ? 'var(--brand-primary)' : 'transparent',
                    color: selectedHeroIndex === idx ? '#FFFFFF' : 'var(--text-muted)',
                    transition: 'all 0.2s'
                  }}
                >
                  {st.name}
                </button>
              ))}
            </div>

            <div className="badge-verified">
              <ShieldCheck size={14} strokeWidth={2.5} />
              <span>Triple-Lock Certified</span>
            </div>
          </div>

          {/* Visualizer Body Grid */}
          <div style={{
            padding: '1.75rem',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.75rem'
          }}>
            {/* Left Chart Section */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                  <div style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '12px',
                    background: 'var(--brand-gradient)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    fontWeight: 800,
                    fontSize: '1.1rem'
                  }}>
                    {activeStartup.founder.avatar}
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '2px' }}>{activeStartup.name}</h3>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      {activeStartup.categoryLabel} • {activeStartup.location} • Founded {activeStartup.founded}
                    </div>
                  </div>
                </div>

                <span className={activeStartup.dealStatus === 'open_acquisition' ? 'badge-deal-open' : 'badge-gold'} style={{ padding: '3px 10px', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 700 }}>
                  {activeStartup.dealLabel}
                </span>
              </div>

              {/* 3 Metric Cards */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '0.75rem',
                background: 'var(--bg-subtle)',
                padding: '1rem',
                borderRadius: '16px',
                border: '1px solid var(--border-subtle)'
              }}>
                <div>
                  <div style={{ fontSize: '0.7rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Verified Run-rate</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.3rem', fontWeight: 800 }}>{formatCurrency(activeStartup.mrr, currency, true)}</div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--success-dark)', display: 'flex', alignItems: 'center', gap: '2px' }}>
                    <TrendingUp size={12} /> +{activeStartup.growthMoM}% MoM
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '0.7rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Annual ARR</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.3rem', fontWeight: 800, color: 'var(--brand-primary)' }}>{formatCurrency(activeStartup.arr, currency)}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>100% Audited</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.7rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Net Margin</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.3rem', fontWeight: 800, color: 'var(--success-dark)' }}>{activeStartup.netMargin}%</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>After GST & Costs</div>
                </div>
              </div>

              {/* Dynamic SVG Revenue Curve */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                    12-Month Reconciled Revenue Trajectory
                  </span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--brand-primary)' }}>
                    Audited {activeStartup.auditDate}
                  </span>
                </div>
                <div style={{ width: '100%', height: '170px' }}>
                  <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', height: '100%', overflow: 'visible' }}>
                    <defs>
                      <linearGradient id="heroGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#2563EB" stopOpacity="0.28" />
                        <stop offset="100%" stopColor="#2563EB" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    <line x1={padX} y1={padY} x2={width - padX} y2={padY} stroke="rgba(226, 232, 240, 0.4)" strokeDasharray="3 3" />
                    <line x1={padX} y1={padY + chartH / 2} x2={width - padX} y2={padY + chartH / 2} stroke="rgba(226, 232, 240, 0.4)" strokeDasharray="3 3" />
                    <line x1={padX} y1={height - padY} x2={width - padX} y2={height - padY} stroke="rgba(226, 232, 240, 0.6)" />
                    
                    <path d={areaD} fill="url(#heroGradient)" />
                    <path d={pathD} fill="none" stroke="#2563EB" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    
                    {points.map((p, i) => (
                      <g key={i}>
                        <circle cx={p.x} cy={p.y} r={3.5} fill="#2563EB" stroke="#FFFFFF" strokeWidth={2} />
                        {(i % 3 === 0 || i === points.length - 1) && (
                          <text x={p.x} y={height - 4} fontSize={9.5} fill="#94A3B8" fontFamily="'JetBrains Mono', monospace" textAnchor="middle">
                            {p.month}
                          </text>
                        )}
                      </g>
                    ))}
                  </svg>
                </div>
              </div>
            </div>

            {/* Right Verification Sidebar */}
            <div style={{
              background: 'var(--bg-subtle)',
              border: '1px solid var(--border-light)',
              borderRadius: '20px',
              padding: '1.25rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '1rem'
            }}>
              <div>
                <div style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.75rem' }}>
                  <ShieldCheck size={16} strokeWidth={2.5} color="var(--brand-primary)" />
                  <span>Triple-Lock Audit Log</span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', padding: '0.65rem', background: 'var(--bg-card)', border: '1px solid var(--border-light)', borderRadius: '10px' }}>
                    <CheckCircle2 size={16} color="var(--success)" style={{ marginTop: '2px', flexShrink: 0 }} />
                    <div style={{ fontSize: '0.8rem' }}>
                      <strong style={{ display: 'block', color: 'var(--text-primary)' }}>Razorpay Webhook Live</strong>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Read-only OAuth token matched</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', padding: '0.65rem', background: 'var(--bg-card)', border: '1px solid var(--border-light)', borderRadius: '10px' }}>
                    <CheckCircle2 size={16} color="var(--success)" style={{ marginTop: '2px', flexShrink: 0 }} />
                    <div style={{ fontSize: '0.8rem' }}>
                      <strong style={{ display: 'block', color: 'var(--text-primary)' }}>UPI AutoPay Mandates</strong>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Recurring subscription mandates</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', padding: '0.65rem', background: 'var(--bg-card)', border: '1px solid var(--border-light)', borderRadius: '10px' }}>
                    <CheckCircle2 size={16} color="var(--success)" style={{ marginTop: '2px', flexShrink: 0 }} />
                    <div style={{ fontSize: '0.8rem' }}>
                      <strong style={{ display: 'block', color: 'var(--text-primary)' }}>GSTIN E-Invoice Reconciled</strong>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{activeStartup.gstin} (100% Match)</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div style={{ fontSize: '0.7rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>
                  SHA-256 Ledger Audit Hash
                </div>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  background: 'var(--bg-card)',
                  padding: '6px 10px',
                  borderRadius: '8px',
                  border: '1px dashed var(--border-focus)',
                  color: 'var(--brand-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <span>{activeStartup.ledgerHash}</span>
                  <FileCheck2 size={14} color="var(--success)" />
                </div>
              </div>

              <button
                onClick={() => onSelectStartup(activeStartup)}
                className="btn btn-secondary btn-sm w-full"
                style={{ marginTop: '0.25rem' }}
              >
                <span>View Full Audit Data Room</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
