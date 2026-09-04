import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldCheck, TrendingUp, CheckCircle2, Copy, ArrowRight, ExternalLink } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';

export default function StartupModal({ startup, onClose, onOpenDeal, currency }) {
  if (!startup) return null;

  // 12-Month Chart Generation
  const dataPoints = startup.monthlyHistory;
  const maxVal = Math.max(...dataPoints.map(d => d.revenue)) * 1.15;
  const minVal = Math.min(...dataPoints.map(d => d.revenue)) * 0.85;
  const width = 680;
  const height = 190;
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

  // Donut Generator for Gateway breakdown
  const size = 110;
  const strokeWidth = 16;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const segments = [
    { key: 'Razorpay', pct: startup.revenueBreakdown.razorpay || 0, color: '#2563EB' },
    { key: 'UPI AutoPay', pct: startup.revenueBreakdown.upiAutoPay || 0, color: '#10B981' },
    { key: 'Stripe', pct: startup.revenueBreakdown.stripe || 0, color: '#6366F1' },
    { key: 'Bank Wire', pct: startup.revenueBreakdown.bankWire || 0, color: '#F59E0B' }
  ].filter(s => s.pct > 0);

  let offset = 0;

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.25 }}
        onClick={(e) => e.stopPropagation()}
        className="modal-content-card modal-content-card-lg"
      >
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1.25rem 1.75rem',
          borderBottom: '1px solid var(--border-light)',
          position: 'sticky',
          top: 0,
          background: 'var(--bg-card-elevated)',
          zIndex: 10
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ShieldCheck size={20} color="var(--brand-primary)" strokeWidth={2.5} />
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800 }}>Verified Financial Audit Data Room</h3>
          </div>
          <button onClick={onClose} style={{ width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: '2rem' }}>
          {/* Identity Row */}
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1.5rem', flexWrap: 'wrap', marginBottom: '1.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '14px',
                background: 'var(--brand-gradient)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontSize: '1.35rem',
                fontWeight: 900
              }}>
                {startup.founder.avatar}
              </div>
              <div>
                <h2 style={{ fontSize: '1.7rem', fontWeight: 900, marginBottom: '2px' }}>{startup.name}</h2>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                  {startup.categoryLabel} • Founded {startup.founded} • {startup.location}
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <span className="badge-verified">
                <ShieldCheck size={14} strokeWidth={2.5} />
                {startup.tier} Verified
              </span>
              <span className={startup.dealStatus === 'open_acquisition' ? 'badge-deal-open' : 'badge-gold'} style={{ padding: '4px 12px', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 700 }}>
                {startup.dealLabel}
              </span>
            </div>
          </div>

          <p style={{ fontSize: '1.05rem', lineHeight: 1.6, color: 'var(--text-secondary)', marginBottom: '1.75rem' }}>
            {startup.tagline}
          </p>

          {/* 4 Financial Grid Metrics */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: '1rem',
            marginBottom: '2rem'
          }}>
            <div style={{ background: 'var(--bg-subtle)', padding: '1.1rem', borderRadius: '14px', border: '1px solid var(--border-light)' }}>
              <div style={{ fontSize: '0.725rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Verified ARR</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.4rem', fontWeight: 900, color: 'var(--brand-primary)' }}>{formatCurrency(startup.arr, currency)}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--success-dark)', fontWeight: 700 }}>+{startup.growthMoM}% MoM</div>
            </div>

            <div style={{ background: 'var(--bg-subtle)', padding: '1.1rem', borderRadius: '14px', border: '1px solid var(--border-light)' }}>
              <div style={{ fontSize: '0.725rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Monthly Run-rate</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.4rem', fontWeight: 900, color: 'var(--text-primary)' }}>{formatCurrency(startup.mrr, currency, true)}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Current Active</div>
            </div>

            <div style={{ background: 'var(--bg-subtle)', padding: '1.1rem', borderRadius: '14px', border: '1px solid var(--border-light)' }}>
              <div style={{ fontSize: '0.725rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Net Margin</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.4rem', fontWeight: 900, color: 'var(--success-dark)' }}>{startup.netMargin}%</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>After Taxes & Costs</div>
            </div>

            <div style={{ background: 'var(--bg-subtle)', padding: '1.1rem', borderRadius: '14px', border: '1px solid var(--border-light)' }}>
              <div style={{ fontSize: '0.725rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Monthly Churn</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.4rem', fontWeight: 900, color: 'var(--text-primary)' }}>{startup.churnRate}%</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--success-dark)', fontWeight: 700 }}>High Retention</div>
            </div>
          </div>

          {/* 12-Month Historical Trajectory Chart */}
          <div style={{ background: 'var(--bg-subtle)', border: '1px solid var(--border-light)', borderRadius: '18px', padding: '1.5rem', marginBottom: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 800, textTransform: 'uppercase' }}>12-Month Verified Revenue Trajectory</h4>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>Source: Razorpay Webhooks + GST Returns</span>
            </div>
            <div style={{ width: '100%', height: '190px' }}>
              <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', height: '100%', overflow: 'visible' }}>
                <defs>
                  <linearGradient id="modalGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2563EB" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#2563EB" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <line x1={padX} y1={padY} x2={width - padX} y2={padY} stroke="rgba(226, 232, 240, 0.4)" strokeDasharray="3 3" />
                <line x1={padX} y1={padY + chartH / 2} x2={width - padX} y2={padY + chartH / 2} stroke="rgba(226, 232, 240, 0.4)" strokeDasharray="3 3" />
                <line x1={padX} y1={height - padY} x2={width - padX} y2={height - padY} stroke="rgba(226, 232, 240, 0.6)" />
                <path d={areaD} fill="url(#modalGradient)" />
                <path d={pathD} fill="none" stroke="#2563EB" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                {points.map((p, i) => (
                  <g key={i}>
                    <circle cx={p.x} cy={p.y} r={3.5} fill="#2563EB" stroke="#FFFFFF" strokeWidth={2} />
                    {(i % 2 === 0 || i === points.length - 1) && (
                      <text x={p.x} y={height - 4} fontSize={9.5} fill="#94A3B8" fontFamily="'JetBrains Mono', monospace" textAnchor="middle">
                        {p.month}
                      </text>
                    )}
                  </g>
                ))}
              </svg>
            </div>
          </div>

          {/* Gateway Breakdown & Compliance Audit Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
            <div style={{ background: 'var(--bg-subtle)', border: '1px solid var(--border-light)', borderRadius: '18px', padding: '1.5rem' }}>
              <h4 style={{ fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '1rem' }}>Payment Gateway Breakdown</h4>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: 'rotate(-90deg)', flexShrink: 0 }}>
                  {segments.map((seg, i) => {
                    const dashLength = (seg.pct / 100) * circumference;
                    const strokeDasharray = `${dashLength} ${circumference - dashLength}`;
                    const strokeDashoffset = -offset;
                    offset += dashLength;
                    return (
                      <circle
                        key={i}
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        fill="none"
                        stroke={seg.color}
                        strokeWidth={strokeWidth}
                        strokeDasharray={strokeDasharray}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                      />
                    );
                  })}
                </svg>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', fontSize: '0.825rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><span style={{ width: '10px', height: '10px', background: '#2563EB', borderRadius: '2px' }}></span> Razorpay: <strong>{startup.revenueBreakdown.razorpay}%</strong></div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><span style={{ width: '10px', height: '10px', background: '#10B981', borderRadius: '2px' }}></span> UPI AutoPay: <strong>{startup.revenueBreakdown.upiAutoPay}%</strong></div>
                  {startup.revenueBreakdown.stripe > 0 && <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><span style={{ width: '10px', height: '10px', background: '#6366F1', borderRadius: '2px' }}></span> Stripe: <strong>{startup.revenueBreakdown.stripe}%</strong></div>}
                  {startup.revenueBreakdown.bankWire > 0 && <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><span style={{ width: '10px', height: '10px', background: '#F59E0B', borderRadius: '2px' }}></span> Bank NEFT: <strong>{startup.revenueBreakdown.bankWire}%</strong></div>}
                </div>
              </div>
            </div>

            <div style={{ background: 'var(--bg-subtle)', border: '1px solid var(--border-light)', borderRadius: '18px', padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <h4 style={{ fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.75rem' }}>Cryptographic Proof</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.825rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: 'var(--text-muted)' }}>GSTIN:</span> <strong style={{ fontFamily: 'var(--font-mono)' }}>{startup.gstin}</strong></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: 'var(--text-muted)' }}>MCA CIN:</span> <strong style={{ fontFamily: 'var(--font-mono)' }}>{startup.mcaCin}</strong></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: 'var(--text-muted)' }}>Ledger Hash:</span> <strong style={{ fontFamily: 'var(--font-mono)', color: 'var(--brand-primary)' }}>{startup.ledgerHash}</strong></div>
                </div>
              </div>
              <div style={{ marginTop: '1rem', paddingTop: '0.75rem', borderTop: '1px dashed var(--border-light)', fontSize: '0.75rem', color: 'var(--success-dark)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <CheckCircle2 size={14} />
                <span>Reconciled on Sahamati Account Aggregator Node #42</span>
              </div>
            </div>
          </div>

          {/* Founder Quote */}
          <div style={{ background: 'var(--brand-soft)', borderLeft: '4px solid var(--brand-primary)', padding: '1.25rem 1.5rem', borderRadius: '0 14px 14px 0', marginBottom: '2rem' }}>
            <p style={{ fontSize: '0.95rem', fontStyle: 'italic', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
              "{startup.founder.quote}"
            </p>
            <div style={{ fontSize: '0.825rem', fontWeight: 700, color: 'var(--brand-primary)' }}>
              {startup.founder.name} — {startup.founder.role} ({startup.founder.twitter})
            </div>
          </div>

          {/* Footer CTAs */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', borderTop: '1px solid var(--border-light)', paddingTop: '1.5rem', flexWrap: 'wrap' }}>
            <button
              onClick={() => {
                navigator.clipboard.writeText(`https://founderledger.in/v/${startup.slug}`);
                alert('Copied verified ledger URL to clipboard!');
              }}
              className="btn btn-secondary"
            >
              <Copy size={16} />
              <span>Share Ledger Profile</span>
            </button>

            {startup.dealStatus === 'open_acquisition' ? (
              <button
                onClick={() => {
                  onClose();
                  onOpenDeal(startup);
                }}
                className="btn btn-primary"
              >
                <span>Make Acquisition Offer ({formatCurrency(startup.askingPrice, currency)})</span>
                <ArrowRight size={16} />
              </button>
            ) : (
              <button
                onClick={() => alert(`Investor data room access request submitted for ${startup.name}!`)}
                className="btn btn-primary"
              >
                <span>Request Investor Data Room Access</span>
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
