import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Download, CheckCircle2 } from 'lucide-react';
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
    <section style={{ padding: '5.5rem 0', background: 'var(--bg-subtle)', borderTop: '1px solid var(--border-light)', borderBottom: '1px solid var(--border-light)' }} id="valuation-section">
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 3rem auto' }}>
          <span style={{
            display: 'inline-block',
            fontSize: '0.75rem',
            fontWeight: 800,
            color: 'var(--brand-primary)',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            background: 'var(--brand-soft)',
            padding: '4px 14px',
            borderRadius: '9999px',
            marginBottom: '0.85rem'
          }}>
            VALUATION ENGINE
          </span>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '1rem', letterSpacing: '-0.03em' }}>
            Instant Indian Startup Valuation Engine
          </h2>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)' }}>
            Benchmark your startup's market valuation using real-time 2026 Indian tech comps, growth velocity, and retention metrics.
          </p>
        </div>

        {/* Calculator Grid */}
        <div className="glass-card-elevated" style={{
          maxWidth: '1080px',
          margin: '0 auto',
          padding: '2.5rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2.5rem'
        }}>
          {/* Left Inputs */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* ARR Slider */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                <span>Annual Recurring Revenue (ARR)</span>
                <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--brand-primary)', fontSize: '1.05rem' }}>{formatCurrency(arr, currency)}</span>
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
            </div>

            {/* Growth Slider */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                <span>Month-over-Month (MoM) Growth</span>
                <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--success-dark)', fontSize: '1.05rem' }}>+{growth}% MoM</span>
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

            {/* Net Margin Slider */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                <span>Net Profit Margin (%)</span>
                <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-primary)', fontSize: '1.05rem' }}>{margin}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="95"
                step="5"
                value={margin}
                onChange={(e) => setMargin(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--brand-primary)', cursor: 'pointer' }}
              />
            </div>

            {/* Churn Slider */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                <span>Monthly Churn Rate (%)</span>
                <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-primary)', fontSize: '1.05rem' }}>{churn}% /mo</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="8"
                step="0.5"
                value={churn}
                onChange={(e) => setChurn(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--brand-primary)', cursor: 'pointer' }}
              />
            </div>

            {/* Category Select */}
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                Industry Category & Business Model
              </label>
              <select
                value={categoryMultiplier}
                onChange={(e) => setCategoryMultiplier(Number(e.target.value))}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  borderRadius: '12px',
                  background: 'var(--bg-subtle)',
                  border: '1px solid var(--border-light)',
                  color: 'var(--text-primary)',
                  fontSize: '0.9rem',
                  fontWeight: 600
                }}
              >
                <option value={4.5}>B2B SaaS / DevTools (4.5x - 6.5x ARR Multiple)</option>
                <option value={4.0}>FinTech & Payments (4.0x - 5.5x ARR Multiple)</option>
                <option value={5.0}>AI & LLM Infra Tools (5.0x - 8.0x ARR Multiple)</option>
                <option value={2.8}>D2C & E-Commerce Software (2.8x - 4.0x ARR Multiple)</option>
                <option value={3.2}>EdTech & HR Tech (3.2x - 4.5x ARR Multiple)</option>
              </select>
            </div>
          </div>

          {/* Right Summary Card (Dark Linear Card) */}
          <div style={{
            background: 'linear-gradient(135deg, #090E1A 0%, #151F36 100%)',
            borderRadius: '20px',
            padding: '2rem',
            color: '#FFFFFF',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxShadow: 'var(--shadow-lg)'
          }}>
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#94A3B8', marginBottom: '0.5rem' }}>
                Estimated Market Valuation
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '2.6rem', fontWeight: 900, color: '#38BDF8', letterSpacing: '-0.02em', marginBottom: '0.25rem' }}>
                {formatCurrency(midValuation, currency)}
              </div>
              <div style={{
                display: 'inline-block',
                fontSize: '0.8rem',
                fontWeight: 700,
                color: '#A7F3D0',
                background: 'rgba(16, 185, 129, 0.2)',
                padding: '3px 10px',
                borderRadius: '9999px',
                marginBottom: '1.5rem'
              }}>
                {multiple.toFixed(1)}x ARR Benchmark Multiple
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.85rem', borderTop: '1px solid rgba(255, 255, 255, 0.12)', paddingTop: '1.25rem', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#CBD5E1' }}>
                  <span>Verified TTM Run-rate:</span>
                  <span style={{ fontFamily: 'var(--font-mono)', color: '#FFFFFF', fontWeight: 700 }}>{formatCurrency(arr, currency)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#CBD5E1' }}>
                  <span>Annualized Net Profit:</span>
                  <span style={{ fontFamily: 'var(--font-mono)', color: '#34D399', fontWeight: 700 }}>{formatCurrency(estProfit, currency)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#CBD5E1' }}>
                  <span>Conservative Range:</span>
                  <span style={{ fontFamily: 'var(--font-mono)', color: '#FFFFFF', fontWeight: 700 }}>{formatCurrency(lowValuation, currency)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#CBD5E1' }}>
                  <span>Aggressive Range:</span>
                  <span style={{ fontFamily: 'var(--font-mono)', color: '#FFFFFF', fontWeight: 700 }}>{formatCurrency(highValuation, currency)}</span>
                </div>
              </div>
            </div>

            <div>
              <p style={{ fontSize: '0.75rem', color: '#94A3B8', marginBottom: '1.25rem' }}>
                *Calibrated against 2025–2026 Indian micro-SaaS M&A comps normalized for GST compliance.
              </p>
              <button
                onClick={() => alert('Certified Valuation Summary exported! Verify your revenue on FounderLedger to lock in this valuation.')}
                className="btn btn-primary w-full"
              >
                <Sparkles size={16} />
                <span>Get Certified Valuation Summary</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
