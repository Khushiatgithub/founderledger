import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  AreaChart,
  Area,
  XAxis, 
  YAxis, 
  Tooltip, 
  Cell,
  CartesianGrid,
  Legend
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
  Layers,
  Award,
  Lock,
  PieChart as PieIcon,
  Percent,
  TrendingDown
} from 'lucide-react';
import { formatCurrency } from '../utils/formatters';

export default function ValuationCalculator({ currency = 'INR' }) {
  // Inputs: Monthly MRR, Growth rate, Churn, Revenue multiple
  const [mrr, setMrr] = useState(1850000); // ₹18.5 Lakhs/mo
  const [growthRate, setGrowthRate] = useState(24.8); // 24.8% MoM
  const [churnRate, setChurnRate] = useState(1.4); // 1.4% Churn / mo
  const [multiple, setMultiple] = useState(5.5); // 5.5x ARR multiple
  const [activeChartTab, setActiveChartTab] = useState('sensitivity'); // 'sensitivity' or 'projection'

  // Computed Outputs
  const {
    arr,
    valuation,
    attractivenessScore,
    scoreTier,
    scoreColor,
    sensitivityData,
    projectionData
  } = useMemo(() => {
    const calculatedArr = mrr * 12;
    const calculatedValuation = calculatedArr * multiple;

    // Acquisition Attractiveness Score calculation (0 - 100)
    // Factors: Growth (+), Low Churn (+), Multiple vs Market (+)
    let score = 50;
    score += (growthRate * 1.2); // Growth boost
    score += (3.0 - churnRate) * 6; // Churn bonus/penalty
    if (multiple >= 4.0 && multiple <= 7.0) score += 8; // Healthy valuation sweetspot
    else if (multiple > 9.0) score -= 6; // Aggressive multiple discount

    score = Math.min(98, Math.max(15, Math.round(score)));

    let tier = 'Standard Acquisition Target';
    let color = '#3B82F6';
    if (score >= 88) {
      tier = 'Tier-1 Elite (High Buyer Inbound)';
      color = '#10B981';
    } else if (score >= 75) {
      tier = 'High-Demand Growth Asset';
      color = '#2563EB';
    } else if (score >= 60) {
      tier = 'Strong Cash-Flow Business';
      color = '#8B5CF6';
    } else {
      tier = 'Value / Turnaround Opportunity';
      color = '#F59E0B';
    }

    // Chart 1: Valuation Sensitivity Data across Multiples
    const sensitivity = [
      { label: '2.5x (Floor)', multipleVal: 2.5, val: calculatedArr * 2.5, isCurrent: Math.abs(multiple - 2.5) < 0.2 },
      { label: '3.8x (Median)', multipleVal: 3.8, val: calculatedArr * 3.8, isCurrent: Math.abs(multiple - 3.8) < 0.2 },
      { label: `${multiple.toFixed(1)}x (Active)`, multipleVal: multiple, val: calculatedValuation, isCurrent: true },
      { label: '6.5x (Top 10%)', multipleVal: 6.5, val: calculatedArr * 6.5, isCurrent: Math.abs(multiple - 6.5) < 0.2 },
      { label: '8.5x (YC Elite)', multipleVal: 8.5, val: calculatedArr * 8.5, isCurrent: Math.abs(multiple - 8.5) < 0.2 }
    ];

    // Chart 2: 3-Year Forward ARR & Valuation Projection
    const projection = [];
    let projMrr = mrr;
    const monthlyCompounding = 1 + (growthRate / 100) * 0.7; // discount long term

    for (let month = 0; month <= 36; month += 6) {
      const yearLabel = month === 0 ? 'Today' : `M+${month}`;
      const currentProjArr = projMrr * 12;
      const currentProjVal = currentProjArr * multiple;
      projection.push({
        period: yearLabel,
        arr: Math.round(currentProjArr),
        valuation: Math.round(currentProjVal)
      });
      projMrr = projMrr * Math.pow(monthlyCompounding, 6);
    }

    return {
      arr: calculatedArr,
      valuation: calculatedValuation,
      attractivenessScore: score,
      scoreTier: tier,
      scoreColor: color,
      sensitivityData: sensitivity,
      projectionData: projection
    };
  }, [mrr, growthRate, churnRate, multiple]);

  return (
    <section className="section-wrapper" id="valuation-section" style={{ background: 'var(--bg-subtle)', borderTop: '1px solid var(--border-light)', borderBottom: '1px solid var(--border-light)' }}>
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <span className="badge badge-brand" style={{ marginBottom: '12px' }}>
            <Calculator size={13} />
            <span>INSTANT VALUATION ENGINE</span>
          </span>
          <h2 style={{ marginBottom: '12px' }}>
            Interactive Startup Valuation Calculator
          </h2>
          <p className="lead-text">
            Benchmark your startup's enterprise valuation in real time using verified Indian tech deal multiples, ARR trajectory, and acquisition attractiveness scoring.
          </p>
        </div>

        {/* Calculator Main Grid */}
        <div className="glass-card" style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '36px',
          background: 'var(--bg-surface)',
          borderRadius: '24px',
          boxShadow: 'var(--shadow-xl)',
          border: '1px solid var(--border-light)'
        }}>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
            gap: '36px',
            alignItems: 'start'
          }}>

            {/* Left Column: Interactive Inputs */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Valuation Inputs</h3>
                <span className="badge badge-verified" style={{ fontSize: '0.75rem' }}>
                  <Zap size={12} />
                  <span>Real-Time Reactive</span>
                </span>
              </div>

              {/* Input 1: Monthly MRR */}
              <div style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <label style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    Monthly Recurring Revenue (MRR)
                  </label>
                  <span style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--brand-primary)', fontFamily: 'var(--font-mono)' }}>
                    {formatCurrency(mrr, currency)}
                  </span>
                </div>
                <input
                  type="range"
                  min="50000"
                  max="10000000"
                  step="50000"
                  value={mrr}
                  onChange={(e) => setMrr(Number(e.target.value))}
                  style={{ width: '100%', accentColor: 'var(--brand-primary)', cursor: 'pointer' }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                  <span>₹50K / mo</span>
                  <span>₹50 Lakhs</span>
                  <span>₹1.00 Crore / mo</span>
                </div>
              </div>

              {/* Input 2: Growth Rate */}
              <div style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <label style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    Monthly Growth Rate (MoM %)
                  </label>
                  <span style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--success-dark)', fontFamily: 'var(--font-mono)' }}>
                    +{growthRate.toFixed(1)}%
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="50"
                  step="0.5"
                  value={growthRate}
                  onChange={(e) => setGrowthRate(Number(e.target.value))}
                  style={{ width: '100%', accentColor: '#10B981', cursor: 'pointer' }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                  <span>0% (Flat)</span>
                  <span>25% MoM (High Growth)</span>
                  <span>50% (Hyper Growth)</span>
                </div>
              </div>

              {/* Input 3: Churn Rate */}
              <div style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <label style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    Monthly Logo Churn (%)
                  </label>
                  <span style={{ fontSize: '1.15rem', fontWeight: 800, color: churnRate <= 2 ? 'var(--brand-primary)' : 'var(--warning)', fontFamily: 'var(--font-mono)' }}>
                    {churnRate.toFixed(1)}% / mo
                  </span>
                </div>
                <input
                  type="range"
                  min="0.2"
                  max="8.0"
                  step="0.1"
                  value={churnRate}
                  onChange={(e) => setChurnRate(Number(e.target.value))}
                  style={{ width: '100%', accentColor: '#8B5CF6', cursor: 'pointer' }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                  <span>0.2% (Elite Retention)</span>
                  <span>2.0% (SaaS Benchmark)</span>
                  <span>8.0% (High Churn)</span>
                </div>
              </div>

              {/* Input 4: Revenue Multiple */}
              <div style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <label style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    Revenue Multiple (ARR Multiple)
                  </label>
                  <span style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--brand-primary)', fontFamily: 'var(--font-mono)' }}>
                    {multiple.toFixed(1)}x ARR
                  </span>
                </div>
                <input
                  type="range"
                  min="2.0"
                  max="12.0"
                  step="0.5"
                  value={multiple}
                  onChange={(e) => setMultiple(Number(e.target.value))}
                  style={{ width: '100%', accentColor: 'var(--brand-primary)', cursor: 'pointer' }}
                />
                
                {/* Quick Multiple Presets */}
                <div style={{ display: 'flex', gap: '6px', marginTop: '8px', flexWrap: 'wrap' }}>
                  {[3.0, 4.0, 5.5, 7.0, 10.0].map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setMultiple(preset)}
                      className={`btn btn-sm ${multiple === preset ? 'btn-primary' : 'btn-secondary'}`}
                      style={{ padding: '4px 10px', fontSize: '0.75rem' }}
                    >
                      {preset.toFixed(1)}x
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Column: Calculated Outputs & Attractiveness Gauge */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Valuation & Audit Score</h3>
                <span className="badge badge-brand" style={{ fontSize: '0.75rem' }}>
                  <ShieldCheck size={12} />
                  <span>YC Benchmark Comps</span>
                </span>
              </div>

              {/* Primary Output Cards */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '20px' }}>
                
                {/* Output 1: Annual Run Rate (ARR) */}
                <div style={{ padding: '20px', background: 'var(--bg-subtle)', borderRadius: '16px', border: '1px solid var(--border-light)' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                    Annual Run Rate (ARR)
                  </span>
                  <div style={{ fontSize: '1.75rem', fontWeight: 900, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)', margin: '4px 0' }}>
                    {formatCurrency(arr, currency)}
                  </div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                    {formatCurrency(mrr, currency)}/mo × 12
                  </span>
                </div>

                {/* Output 2: Estimated Valuation */}
                <div style={{ padding: '20px', background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.08) 0%, rgba(29, 78, 216, 0.02) 100%)', borderRadius: '16px', border: '1px solid var(--brand-border)' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--brand-primary)', textTransform: 'uppercase' }}>
                    Estimated Valuation
                  </span>
                  <div style={{ fontSize: '1.75rem', fontWeight: 900, color: 'var(--brand-primary)', fontFamily: 'var(--font-mono)', margin: '4px 0' }}>
                    {formatCurrency(valuation, currency)}
                  </div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                    At <strong>{multiple.toFixed(1)}x</strong> Revenue Multiple
                  </span>
                </div>

              </div>

              {/* Acquisition Attractiveness Score Card */}
              <div style={{
                padding: '24px',
                background: 'var(--bg-card)',
                borderRadius: '16px',
                border: '1px solid var(--border-light)',
                marginBottom: '24px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Award size={20} color={scoreColor} />
                    <span style={{ fontWeight: 800, fontSize: '0.9375rem' }}>Acquisition Attractiveness Score</span>
                  </div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 900, color: scoreColor, fontFamily: 'var(--font-mono)' }}>
                    {attractivenessScore} <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>/ 100</span>
                  </div>
                </div>

                {/* Visual Attractiveness Score Progress Bar */}
                <div style={{ height: '8px', width: '100%', background: 'var(--bg-muted)', borderRadius: '4px', overflow: 'hidden', marginBottom: '12px' }}>
                  <motion.div
                    style={{ height: '100%', background: scoreColor }}
                    animate={{ width: `${attractivenessScore}%` }}
                    transition={{ ease: 'easeOut', duration: 0.2 }}
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8125rem' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Buyer Readiness Tier:</span>
                  <strong style={{ color: scoreColor }}>{scoreTier}</strong>
                </div>
              </div>

              {/* CTA button */}
              <div style={{ display: 'flex', gap: '10px' }}>
                <a href="/#marketplace-section" className="btn btn-secondary btn-sm" style={{ flex: 1, justifyContent: 'center' }}>
                  <span>View M&A Deal Comps</span>
                </a>
                <a href="/dashboard" className="btn btn-primary btn-sm" style={{ flex: 1, justifyContent: 'center', gap: '6px' }}>
                  <Sparkles size={14} />
                  <span>List in Deal Room</span>
                </a>
              </div>

            </div>

          </div>

          {/* ====================================================================
              Interactive Recharts Visualization Section
              ==================================================================== */}
          <div style={{ marginTop: '36px', borderTop: '1px solid var(--border-light)', paddingTop: '28px' }}>
            
            {/* Chart Switcher Tabs */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 800 }}>Interactive Valuation Analytics</h4>
                <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                  Dynamic sensitivity curve and 3-year compounding forward projections.
                </p>
              </div>

              <div style={{ display: 'inline-flex', background: 'var(--bg-muted)', padding: '3px', borderRadius: '8px', border: '1px solid var(--border-light)' }}>
                <button
                  onClick={() => setActiveChartTab('sensitivity')}
                  style={{
                    padding: '6px 14px',
                    borderRadius: '6px',
                    border: 'none',
                    background: activeChartTab === 'sensitivity' ? 'var(--bg-surface)' : 'transparent',
                    color: activeChartTab === 'sensitivity' ? 'var(--text-primary)' : 'var(--text-muted)',
                    fontWeight: 600,
                    fontSize: '0.8125rem',
                    cursor: 'pointer'
                  }}
                >
                  Multiple Sensitivity
                </button>
                <button
                  onClick={() => setActiveChartTab('projection')}
                  style={{
                    padding: '6px 14px',
                    borderRadius: '6px',
                    border: 'none',
                    background: activeChartTab === 'projection' ? 'var(--bg-surface)' : 'transparent',
                    color: activeChartTab === 'projection' ? 'var(--text-primary)' : 'var(--text-muted)',
                    fontWeight: 600,
                    fontSize: '0.8125rem',
                    cursor: 'pointer'
                  }}
                >
                  3-Year Projection
                </button>
              </div>
            </div>

            {/* Chart Container */}
            <div style={{ width: '100%', height: 290, background: 'var(--bg-subtle)', borderRadius: '16px', padding: '16px', border: '1px solid var(--border-light)' }}>
              <ResponsiveContainer width="100%" height="100%">
                {activeChartTab === 'sensitivity' ? (
                  <BarChart data={sensitivityData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(226, 232, 240, 0.6)" />
                    <XAxis dataKey="label" stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={{ stroke: 'rgba(226, 232, 240, 0.8)' }} />
                    <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => currency === 'USD' ? `$${(v/8300000).toFixed(1)}M` : `₹${(v/10000000).toFixed(1)}Cr`} />
                    <Tooltip
                      formatter={(val) => [formatCurrency(val, currency), 'Estimated Valuation']}
                      contentStyle={{ background: '#0F172A', borderRadius: '8px', border: 'none', color: '#FFF', fontSize: '0.75rem' }}
                    />
                    <Bar dataKey="val" radius={[6, 6, 0, 0]}>
                      {sensitivityData.map((entry, index) => (
                        <Cell key={`bar-${index}`} fill={entry.isCurrent ? '#2563EB' : '#94A3B8'} opacity={entry.isCurrent ? 1 : 0.45} />
                      ))}
                    </Bar>
                  </BarChart>
                ) : (
                  <AreaChart data={projectionData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="valProjGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#2563EB" stopOpacity={0.35} />
                        <stop offset="95%" stopColor="#2563EB" stopOpacity={0.0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(226, 232, 240, 0.6)" />
                    <XAxis dataKey="period" stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={{ stroke: 'rgba(226, 232, 240, 0.8)' }} />
                    <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => currency === 'USD' ? `$${(v/8300000).toFixed(1)}M` : `₹${(v/10000000).toFixed(1)}Cr`} />
                    <Tooltip
                      formatter={(val) => [formatCurrency(val, currency), 'Valuation']}
                      contentStyle={{ background: '#0F172A', borderRadius: '8px', border: 'none', color: '#FFF', fontSize: '0.75rem' }}
                    />
                    <Area type="monotone" dataKey="valuation" stroke="#2563EB" strokeWidth={3} fillOpacity={1} fill="url(#valProjGrad)" activeDot={{ r: 6, fill: '#2563EB', stroke: '#FFF', strokeWidth: 2 }} />
                  </AreaChart>
                )}
              </ResponsiveContainer>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
