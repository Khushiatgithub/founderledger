import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Download, CheckCircle2, Calculator, TrendingUp, DollarSign, Activity } from 'lucide-react';
import { formatCurrency } from '../utils/formatters';

export default function ValuationCalculator({ currency }) {
  const [arr, setArr] = useState(24000000); // ₹2.4 Cr
  const [growth, setGrowth] = useState(20); // 20% MoM
  const [margin, setMargin] = useState(65); // 65% Net Margin
  const [churn, setChurn] = useState(1.5); // 1.5% Churn
  const [categoryMultiplier, setCategoryMultiplier] = useState(4.5);

  const { multiple, midValuation, lowValuation, highValuation, estProfit } = useMemo(() => {
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

    return { multiple: m, midValuation: mid, lowValuation: low, highValuation: high, estProfit: profit };
  }, [arr, growth, margin, churn, categoryMultiplier]);

  return (
    <section className="section-wrapper" style={{ background: 'var(--bg-subtle)', borderTop: '1px solid var(--border-light)', borderBottom: '1px solid var(--border-light)' }} id="valuation-section">
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <span className="badge badge-brand" style={{ marginBottom: '12px' }}>
            <Calculator size={13} />
            <span>VALUATION ENGINE</span>
          </span>
          <h2 style={{ marginBottom: '12px' }}>
            Instant Indian Startup Valuation Engine
          </h2>
          <p className="lead-text">
            Benchmark your startup's market valuation using real-time Indian tech comps, growth velocity, and retention multiples.
          </p>
        </div>

        {/* Calculator Main Grid */}
        <div className="glass-card-elevated" style={{
          maxWidth: '1080px',
          margin: '0 auto',
          padding: '32px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '32px'
        }}>
          
          {/* Left Column: Interactive Range Sliders */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* Sector Selector */}
            <div>
              <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '8px' }}>
                Business Category / Sector
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                {[
                  { name: 'B2B SaaS', mult: 5.0 },
                  { name: 'AI & DevTools', mult: 5.5 },
                  { name: 'Fintech & UPI', mult: 4.2 }
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
                <span style={{ color: 'var(--brand-primary)', fontWeight: 800, fontSize: '0.9375rem' }}>{formatCurrency(arr, currency)}</span>
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
                <span>MoM Growth Velocity</span>
                <span style={{ color: 'var(--success-dark)', fontWeight: 800, fontSize: '0.9375rem' }}>+{growth}% MoM</span>
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
                <span style={{ color: 'var(--text-primary)', fontWeight: 800, fontSize: '0.9375rem' }}>{margin}%</span>
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

          </div>

          {/* Right Column: Estimated Valuation Card & Multiples */}
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
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
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
              <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginBottom: '20px' }}>
                Range: <strong>{formatCurrency(lowValuation, currency)}</strong> – <strong>{formatCurrency(highValuation, currency)}</strong>
              </div>

              {/* Breakdown Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '24px' }}>
                <div style={{ background: 'var(--bg-surface)', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--border-light)' }}>
                  <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>Est. Annual Profit</div>
                  <div style={{ fontWeight: 700, fontSize: '0.9375rem', color: 'var(--success-dark)' }}>{formatCurrency(estProfit, currency)}</div>
                </div>
                <div style={{ background: 'var(--bg-surface)', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--border-light)' }}>
                  <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>Multiple Score</div>
                  <div style={{ fontWeight: 700, fontSize: '0.9375rem', color: 'var(--brand-primary)' }}>Top 15% in India</div>
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
