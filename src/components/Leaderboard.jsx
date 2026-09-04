import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  ShieldCheck, 
  ArrowRight, 
  TrendingUp, 
  SlidersHorizontal, 
  Building2, 
  CheckCircle2, 
  Sparkles,
  ExternalLink,
  ChevronRight,
  Filter,
  BadgeCheck
} from 'lucide-react';
import { PLATFORM_DATA } from '../data/startups';
import { formatCurrency } from '../utils/formatters';

// Helper component to render mini SVG sparkline
function Sparkline({ data = [] }) {
  if (!data || data.length < 2) return null;
  const revenues = data.map(d => d.revenue);
  const min = Math.min(...revenues) * 0.9;
  const max = Math.max(...revenues) * 1.1;
  const width = 100;
  const height = 32;

  const points = revenues.map((val, idx) => {
    const x = (idx / (revenues.length - 1)) * width;
    const y = height - ((val - min) / (max - min)) * height;
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg width={width} height={height} style={{ overflow: 'visible' }}>
      <polyline
        fill="none"
        stroke="#2563EB"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points}
      />
    </svg>
  );
}

export default function Leaderboard({ currency, onSelectStartup }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [dealFilter, setDealFilter] = useState('all');
  const [sortBy, setSortBy] = useState('arr_desc');

  const filteredStartups = useMemo(() => {
    let list = [...PLATFORM_DATA.startups];

    if (activeCategory !== 'all') {
      list = list.filter(s => s.category === activeCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(s =>
        s.name.toLowerCase().includes(q) ||
        s.tagline.toLowerCase().includes(q) ||
        s.location.toLowerCase().includes(q) ||
        s.founder?.name?.toLowerCase().includes(q) ||
        (s.techStack && s.techStack.some(t => t.toLowerCase().includes(q)))
      );
    }

    if (dealFilter !== 'all') {
      list = list.filter(s => s.dealStatus === dealFilter);
    }

    if (sortBy === 'arr_desc') list.sort((a, b) => b.arr - a.arr);
    else if (sortBy === 'arr_asc') list.sort((a, b) => a.arr - b.arr);
    else if (sortBy === 'growth_desc') list.sort((a, b) => b.growthMoM - a.growthMoM);
    else if (sortBy === 'margin_desc') list.sort((a, b) => b.netMargin - a.netMargin);

    return list;
  }, [activeCategory, searchQuery, dealFilter, sortBy]);

  return (
    <section className="section-wrapper" id="leaderboard-section">
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <span className="badge badge-brand" style={{ marginBottom: '12px' }}>
            <BadgeCheck size={13} />
            <span>LIVE AUDITED DIRECTORY</span>
          </span>
          <h2 style={{ marginBottom: '12px' }}>
            India's Most Transparent Startup Leaderboard
          </h2>
          <p className="lead-text">
            Every rupee verified through automated read-only gateway API tunnels and filed GSTR-3B tax receipts. Zero pitch deck puffery.
          </p>
        </div>

        {/* Directory Search & Filter Controls */}
        <div className="glass-card" style={{ padding: '16px', marginBottom: '24px', background: 'var(--bg-surface)' }}>
          {/* Row 1: Search & Sort */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', marginBottom: '16px' }}>
            <div style={{ position: 'relative', flex: 1, minWidth: '260px' }}>
              <Search size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by company, tech stack, founder, or location..."
                style={{
                  width: '100%',
                  padding: '10px 14px 10px 40px',
                  background: 'var(--bg-subtle)',
                  border: '1px solid var(--border-light)',
                  borderRadius: '10px',
                  fontSize: '0.875rem',
                  color: 'var(--text-primary)',
                  fontFamily: 'var(--font-body)',
                  outline: 'none'
                }}
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{
                  padding: '10px 14px',
                  background: 'var(--bg-subtle)',
                  border: '1px solid var(--border-light)',
                  borderRadius: '10px',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  color: 'var(--text-primary)',
                  fontFamily: 'var(--font-body)',
                  cursor: 'pointer',
                  outline: 'none'
                }}
              >
                <option value="arr_desc">Highest Verified ARR</option>
                <option value="growth_desc">Highest Growth Rate (%)</option>
                <option value="margin_desc">Highest Profit Margin</option>
                <option value="arr_asc">Lowest ARR First</option>
              </select>

              <select
                value={dealFilter}
                onChange={(e) => setDealFilter(e.target.value)}
                style={{
                  padding: '10px 14px',
                  background: 'var(--bg-subtle)',
                  border: '1px solid var(--border-light)',
                  borderRadius: '10px',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  color: 'var(--text-primary)',
                  fontFamily: 'var(--font-body)',
                  cursor: 'pointer',
                  outline: 'none'
                }}
              >
                <option value="all">All Deals</option>
                <option value="open_acquisition">Acquisition Listings</option>
                <option value="not_for_sale">Verified Proofs Only</option>
              </select>
            </div>
          </div>

          {/* Row 2: Category Filter Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
            {PLATFORM_DATA.categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`btn btn-sm ${activeCategory === cat.id ? 'btn-primary' : 'btn-secondary'}`}
                style={{ fontSize: '0.8125rem', padding: '6px 14px', borderRadius: '8px' }}
              >
                <span>{cat.label}</span>
                <span style={{ 
                  fontSize: '0.7rem', 
                  opacity: activeCategory === cat.id ? 0.9 : 0.6,
                  marginLeft: '4px'
                }}>
                  ({cat.count})
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* ==========================================================================
            Leaderboard Table Grid
            ========================================================================== */}
        <div className="leaderboard-table-container">
          
          {/* Table Header Row */}
          <div className="leaderboard-row leaderboard-header-row">
            <div>#</div>
            <div>STARTUP / DOMAIN</div>
            <div>VERIFIED MRR</div>
            <div className="hide-on-tablet">YOY GROWTH</div>
            <div className="hide-on-tablet">REVENUE TREND</div>
            <div className="hide-on-mobile">VALUATION</div>
            <div style={{ textAlign: 'right' }}>ACTION</div>
          </div>

          {/* Startups Rows */}
          {filteredStartups.length > 0 ? (
            filteredStartups.map((startup, idx) => (
              <motion.div
                key={startup.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2, delay: idx * 0.03 }}
                onClick={() => onSelectStartup(startup)}
                className="leaderboard-row"
              >
                {/* Rank */}
                <div style={{ fontWeight: 700, fontSize: '0.875rem', color: idx < 3 ? 'var(--brand-primary)' : 'var(--text-muted)' }}>
                  #{idx + 1}
                </div>

                {/* Company Avatar & Details */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '10px',
                    background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    fontSize: '0.875rem',
                    flexShrink: 0,
                    boxShadow: '0 2px 6px rgba(37, 99, 235, 0.2)'
                  }}>
                    {startup.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ fontWeight: 700, fontSize: '0.9375rem', color: 'var(--text-primary)' }}>
                        {startup.name}
                      </span>
                      <span className="badge badge-verified" style={{ fontSize: '0.625rem', padding: '2px 6px' }}>
                        <ShieldCheck size={10} />
                        <span>Razorpay</span>
                      </span>
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '280px' }}>
                      {startup.tagline}
                    </div>
                  </div>
                </div>

                {/* Verified MRR / ARR */}
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.9375rem', color: 'var(--text-primary)' }}>
                    {formatCurrency(startup.mrr, currency)}
                    <span style={{ fontSize: '0.7rem', fontWeight: 500, color: 'var(--text-muted)' }}>/mo</span>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                    ARR: {formatCurrency(startup.arr, currency)}
                  </div>
                </div>

                {/* YoY Growth */}
                <div className="hide-on-tablet">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 700, fontSize: '0.875rem', color: 'var(--success-dark)' }}>
                    <TrendingUp size={14} />
                    <span>+{startup.growthMoM}%</span>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    Margin: {startup.netMargin}%
                  </div>
                </div>

                {/* 12-Month Sparkline Curve */}
                <div className="hide-on-tablet">
                  <Sparkline data={startup.monthlyHistory} />
                </div>

                {/* Valuation / Multiple */}
                <div className="hide-on-mobile">
                  <div style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--text-primary)' }}>
                    {startup.askingPrice ? formatCurrency(startup.askingPrice, currency) : formatCurrency(startup.arr * 4.2, currency)}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--brand-primary)', fontWeight: 600 }}>
                    {startup.multiple || '4.2x Multiple'}
                  </div>
                </div>

                {/* Action CTA */}
                <div style={{ textAlign: 'right' }}>
                  <button className="btn btn-secondary btn-sm" style={{ padding: '5px 10px', fontSize: '0.75rem' }}>
                    <span>Audit Ledger</span>
                    <ChevronRight size={13} />
                  </button>
                </div>
              </motion.div>
            ))
          ) : (
            <div style={{ padding: '48px', textAlign: 'center', color: 'var(--text-muted)' }}>
              No verified startups found matching your filter criteria.
            </div>
          )}

        </div>

        {/* Leaderboard Footer Trust Stamp */}
        <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', flexWrap: 'wrap', gap: '8px' }}>
          <div>Showing <strong>{filteredStartups.length}</strong> audited Indian startups</div>
          <div>Last GST Reconciliation Sync: <strong>March 2026 Batch #842</strong></div>
        </div>

      </div>
    </section>
  );
}
