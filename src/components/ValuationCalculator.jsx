import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Cell 
} from 'recharts';
import { 
  Sparkles, 
  ArrowRight, 
  Download, 
  CheckCircle2, 
  Calculator, 
  TrendingUp, 
  DollarSign, 
  Activity,
  ShieldCheck,
  Zap,
  Layers
} from 'lucide-react';
import { formatCurrency } from '../utils/formatters';

export default function ValuationCalculator({ currency }) {
  const [arr, setArr] = useState(24000000); // ₹2.4 Cr
  const [growth, setGrowth] = useState(20); // 20% MoM
  const [margin, setMargin] = useState(65); // 65% Net Margin
  const [churn, setChurn] = useState(1.5); // 1.5% Churn
  const [categoryMultiplier, setCategoryMultiplier] = useState(5.0);

  const { multiple, midValuation, lowValuation, highValuation, estProfit, ruleOf40, sensitivityData } = useMemo(() => {
    let m = categoryMultiplier;

    if (growth >= 25) m += 1.5;
    else if (growth >= 15) m += 0.8;
    else if (growth < 5) m -= 0.5;

    if (margin >= 70) m += 0.6;
    else if (margin < 40) m -= 0.6;

    if (churn > 3) m -= 0.7;
    else if (churn <= 1.5) m += 0.4;

    m = Math.max(1.8, Math.round(m * 10) / 10);

    const mid = arr * m;
    const low = mid * 0.85;
    const high = mid * 1.2;
    const profit = arr * (margin / 100);
    const r40 = growth + margin;

    // Valuation sensitivity data for Recharts
    const sensitivity = [
      { multipleLabel: '3.0x (Floor)', val: arr * 3.0, isCurrent: false },
      { multipleLabel: '4.0x (Median)', val: arr * 4.0, isCurrent: false },
      { multipleLabel: `${m.toFixed(1)}x (Your Comps)`, val: mid, isCurrent: true },
      { multipleLabel: '6.0x (Top 10%)', val: arr * 6.0, isCurrent: false },
      { multipleLabel: '8.0x (YC Elite)', val: arr * 8.0, isCurrent: false }
    ];

    return { 
      multiple: m, 
      midValuation: mid, 
      lowValuation: low, 
      highValuation: high, 
      estProfit: profit, 
      ruleOf40: r40,
      sensitivityData: sensitivity
    };
  }, [arr, growth, margin, churn, categoryMultiplier]);

  return (
    <section className="section-wrapper" style={{ background: 'var(--bg-subtle)', borderTop: '1px solid var(--border-light)', borderBottom: '1px solid var(--border-light)' }} id="valuation-section">
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <span className="badge badge-brand" style={{ marginBottom: '12px' }}>
            <Calculator size={13} />
            <span>INSTANT VALUATION ENGINE</span>
          </span>
          <h2 style={{ marginBottom: '12px' }}>
            Benchmark Your Valuation Like a Top YC SaaS
          </h2>
          <p className="lead-text">
            Dynamic valuation modeling using verified Indian tech deal comps, growth velocity, and gross retention multipliers.
          </p>
        </div>

        {/* Calculator Main Grid */}
        <div className="glass-card-elevated" style={{
          maxWidth: '1120px',
          margin: '0 auto',
          padding: '32px',
          display: 'grid',
          gridTemplateColumns: '1.1fr 1fr',
          gap: '32px'
        }}>
          
          {/* Left Column: Interactive Range Sliders */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* Sector Selector */}
            <div>
              <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '8px' }}>
                Business Category & Tech Stack
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                {[
                  { name: 'B2B SaaS', mult: 5.0 },
                  { name: 'AI & DevTools', mult: 5.5 },
                  { name: 'Fintech & UPI', mult: 4.5 }
                ].map(cat => (
                  <button
                    key={cat.name}
                    type="button"
                    onClick={() => setCategoryMultiplier(cat.mult)}
                    style={{
                      padding: '8px 12px',
                      borderRadius: '8px',
                      border: categoryMultiplier === cat.mult ? '2px solid var(--brand-primary)' : '1px solid var(--border-light)',
                      background: categoryMultiplier === cat.mult ? 'var(--brand-soft)' : 'var(--bg-subtle)',
                      color: categoryMultiplier === cat.mult ? 'var(--brand-primary)' : 'var(--text-secondary)',
                      fontWeight: 600,
                      fontSize: '0.8125rem',
                      cursor: 'pointer'
                    }}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* ARR Slider */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '8px' }}>
                <span>Annual Recurring Revenue (ARR)</span>
                <span style={{ color: 'var(--brand-primary)', fontWeight: 800, fontSize: '0.9375rem', fontFamily: 'var(--font-mono)' }}>
                  {formatCurrency(arr, currency)}
                </span>
              </div>
              <input
                type="range"
                min="1000000"
                max="100000000"
                step="500000"
                value={arr}
                onChange={(e) => setArr(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--brand-primary)', cursor: 'pointer' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.6875rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                <span>₹10 Lakhs</span>
                <span>₹5 Crores</span>
                <span>₹10 Crores</span>
              </div>
            </div>

            {/* Growth Slider */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '8px' }}>
                <span>Month-over-Month (MoM) Growth</span>
                <span style={{ color: 'var(--success-dark)', fontWeight: 800, fontSize: '0.9375rem', fontFamily: 'var(--font-mono)' }}>
                  +{growth}% MoM
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="50"
                step="1"
                value={growth}
                onChange={(e) => setGrowth(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--brand-primary)', cursor: 'pointer' }}
              />
            </div>

            {/* Profit Margin Slider */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '8px' }}>
                <span>Net Profit Margin (%)</span>
                <span style={{ color: 'var(--text-primary)', fontWeight: 800, fontSize: '0.9375rem', fontFamily: 'var(--font-mono)' }}>
                  {margin}%
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="90"
                step="1"
                value={margin}
                onChange={(e) => setMargin(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--brand-primary)', cursor: 'pointer' }}
              />
            </div>

            {/* Rule of 40 Benchmark Pill */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '12px 16px',
              background: 'var(--bg-surface)',
              borderRadius: '10px',
              border: '1px solid var(--border-light)'
            }}>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>RULE OF 40 SCORE (Growth + Margin)</div>
                <div style={{ fontWeight: 800, fontSize: '1.05rem', color: ruleOf40 >= 40 ? 'var(--success-dark)' : 'var(--text-primary)' }}>
                  {ruleOf40}% {ruleOf40 >= 40 ? '★ Top Tier' : '• Healthy'}
                </div>
              </div>
              <span className="badge badge-verified" style={{ fontSize: '0.7rem' }}>
                <ShieldCheck size={12} />
                <span>Razorpay Audited</span>
              </span>
            </div>

          </div>

          {/* Right Column: Estimated Valuation Card & Multiples Graph */}
          <div style={{
            background: 'var(--bg-subtle)',
            borderRadius: '16px',
            border: '1px solid var(--border-light)',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  2026 ESTIMATED VALUATION
                </span>
                <span className="badge badge-brand" style={{ fontSize: '0.75rem' }}>
                  {multiple}x ARR Multiple
                </span>
              </div>

              {/* Main Number */}
              <div style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--text-primary)', letterSpacing: '-0.04em', lineHeight: '1.1', marginBottom: '8px' }}>
                {formatCurrency(midValuation, currency)}
              </div>

              {/* Valuation Band */}
              <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
                Comps Range: <strong>{formatCurrency(lowValuation, currency)}</strong> – <strong>{formatCurrency(highValuation, currency)}</strong>
              </div>

              {/* Recharts Sensitivity Multiples Bar Chart */}
              <div style={{ marginBottom: '16px', height: 140 }}>
                <div style={{ fontSize: '0.6875rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>
                  Multiples Sensitivity Benchmark
                </div>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={sensitivityData} margin={{ top: 5, right: 0, left: -25, bottom: 0 }}>
                    <XAxis dataKey="multipleLabel" stroke="#94A3B8" fontSize={9} tickLine={false} axisLine={false} />
                    <YAxis stroke="#94A3B8" fontSize={9} tickLine={false} axisLine={false} tickFormatter={(v) => currency === 'USD' ? `$${(v/8300000).toFixed(1)}M` : `₹${(v/10000000).toFixed(1)}Cr`} />
                    <Tooltip formatter={(val) => [formatCurrency(val, currency), 'Valuation']} contentStyle={{ background: '#0F172A', borderRadius: '8px', border: 'none', color: '#FFF', fontSize: '0.75rem' }} />
                    <Bar dataKey="val" radius={[4, 4, 0, 0]}>
                      {sensitivityData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.isCurrent ? '#2563EB' : 'rgba(148, 163, 184, 0.4)'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Breakdown Details */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '20px' }}>
                <div style={{ background: 'var(--bg-surface)', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--border-light)' }}>
                  <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>Est. Annual Profit</div>
                  <div style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--success-dark)' }}>{formatCurrency(estProfit, currency)}</div>
                </div>
                <div style={{ background: 'var(--bg-surface)', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--border-light)' }}>
                  <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>Multiple Benchmark</div>
                  <div style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--brand-primary)' }}>Top 12% in India</div>
                </div>
              </div>
            </div>

            <a href="#verify-section" className="btn btn-primary" style={{ width: '100%' }}>
              <Sparkles size={16} />
              <span>Verify Revenue to Lock Valuation</span>
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}
