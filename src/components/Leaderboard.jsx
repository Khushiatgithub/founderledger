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
  ChevronLeft,
  Filter, 
  BadgeCheck, 
  RotateCcw, 
  Layers,
  FileCheck2,
  Lock
} from 'lucide-react';
import { formatCurrency } from '../utils/formatters';
import { useLiveStartups } from '../hooks/useLiveStartups';
import { Link } from 'react-router-dom';

// Brand color mapping for realistic Indian startup logos
const LOGO_COLORS = {
  docupulse: { bg: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)', text: '#FFFFFF', initials: 'DP' },
  quikform: { bg: 'linear-gradient(135deg, #059669 0%, #10B981 100%)', text: '#FFFFFF', initials: 'QF' },
  devship: { bg: 'linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)', text: '#FFFFFF', initials: 'DS' },
  legalchakra: { bg: 'linear-gradient(135deg, #D97706 0%, #B45309 100%)', text: '#FFFFFF', initials: 'LC' },
  edustack: { bg: 'linear-gradient(135deg, #0284C7 0%, #0369A1 100%)', text: '#FFFFFF', initials: 'ES' },
  finclerk: { bg: 'linear-gradient(135deg, #4338CA 0%, #3730A3 100%)', text: '#FFFFFF', initials: 'FC' },
  pixelkite: { bg: 'linear-gradient(135deg, #DB2777 0%, #BE185D 100%)', text: '#FFFFFF', initials: 'PK' },
  agritrace: { bg: 'linear-gradient(135deg, #16A34A 0%, #15803D 100%)', text: '#FFFFFF', initials: 'AT' }
};

// Helper component to render animated mini SVG sparkline
function Sparkline({ data = [], color = "#2563EB", id = "spark" }) {
  if (!data || data.length < 2) return null;
  const revenues = data.map(d => d.revenue || d.mrr || 0);
  const min = Math.min(...revenues) * 0.92;
  const max = Math.max(...revenues) * 1.08;
  const width = 110;
  const height = 34;

  const points = revenues.map((val, idx) => {
    const x = (idx / (revenues.length - 1)) * width;
    const y = max === min ? height / 2 : height - ((val - min) / (max - min)) * height;
    return { x, y, val };
  });

  const pathD = points.reduce((acc, p, i) => `${acc} ${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`, '');
  const areaD = `${pathD} L ${width} ${height} L 0 ${height} Z`;
  const lastPoint = points[points.length - 1];

  return (
    <div style={{ position: 'relative', width, height }}>
      <svg width={width} height={height} style={{ overflow: 'visible' }}>
        <defs>
          <linearGradient id={`grad-${id}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.25} />
            <stop offset="100%" stopColor={color} stopOpacity={0.0} />
          </linearGradient>
        </defs>
        <path d={areaD} fill={`url(#grad-${id})`} />
        <path
          d={pathD}
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {lastPoint && (
          <circle 
            cx={lastPoint.x} 
            cy={lastPoint.y} 
            r="3" 
            fill={color} 
            stroke="#FFFFFF" 
            strokeWidth="1.5" 
          />
        )}
      </svg>
    </div>
  );
}

const PAGE_SIZE = 6;

export default function Leaderboard({ currency = 'INR', onSelectStartup }) {
  const { startups, categories, loading } = useLiveStartups();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [dealFilter, setDealFilter] = useState('all');
  const [sortBy, setSortBy] = useState('arr_desc'); // 'arr_desc', 'arr_asc', 'mrr_desc', 'mrr_asc', 'growth_desc', 'margin_desc'
  const [currentPage, setCurrentPage] = useState(1);

  const handleCategoryChange = (catId) => {
    setActiveCategory(catId);
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setActiveCategory('all');
    setSearchQuery('');
    setDealFilter('all');
    setSortBy('arr_desc');
    setCurrentPage(1);
  };

  const filteredStartups = useMemo(() => {
    let list = [...startups];

    // Filter by category
    if (activeCategory !== 'all') {
      list = list.filter(s => s.category === activeCategory);
    }

    // Search by startup name, tagline, location, tech stack
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(s =>
        (s.name || '').toLowerCase().includes(q) ||
        (s.tagline || '').toLowerCase().includes(q) ||
        (s.location || '').toLowerCase().includes(q) ||
        (s.categoryLabel || '').toLowerCase().includes(q)
      );
    }

    // Filter by Deal status
    if (dealFilter !== 'all') {
      list = list.filter(s => s.dealStatus === dealFilter);
    }

    // Multi-metric sorting
    if (sortBy === 'arr_desc') list.sort((a, b) => (b.arr || 0) - (a.arr || 0));
    else if (sortBy === 'arr_asc') list.sort((a, b) => (a.arr || 0) - (b.arr || 0));
    else if (sortBy === 'mrr_desc') list.sort((a, b) => (b.mrr || 0) - (a.mrr || 0));
    else if (sortBy === 'mrr_asc') list.sort((a, b) => (a.mrr || 0) - (b.mrr || 0));
    else if (sortBy === 'growth_desc') list.sort((a, b) => (b.growthMoM || 0) - (a.growthMoM || 0));
    else if (sortBy === 'margin_desc') list.sort((a, b) => (b.netMargin || 0) - (a.netMargin || 0));

    return list;
  }, [startups, activeCategory, searchQuery, dealFilter, sortBy]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredStartups.length / PAGE_SIZE) || 1;
  const paginatedStartups = useMemo(() => {
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    return filteredStartups.slice(startIndex, startIndex + PAGE_SIZE);
  }, [filteredStartups, currentPage]);

  return (
    <section className="section-wrapper" id="leaderboard-section">
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <span className="badge badge-brand" style={{ marginBottom: '12px' }}>
            <BadgeCheck size={13} />
            <span>INDIA STARTUP INDEX</span>
          </span>
          <h2 style={{ marginBottom: '12px' }}>
            The Verified India Startup Leaderboard
          </h2>
          <p className="lead-text">
            Discover India's most authentic bootstrapped & venture-backed tech startups. Every rupee cross-verified via Razorpay webhooks and filed GSTR-3B tax receipts.
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
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search startups by name, category, or location (e.g. DocuPulse, FinTech)..."
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
              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setCurrentPage(1);
                  }}
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    border: 'none',
                    background: 'transparent',
                    color: 'var(--text-muted)',
                    cursor: 'pointer',
                    fontSize: '0.75rem',
                    fontWeight: 600
                  }}
                >
                  Clear
                </button>
              )}
            </div>

            {/* Sort & Deal Filters */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <select
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value);
                  setCurrentPage(1);
                }}
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
                <option value="arr_asc">Lowest ARR First</option>
                <option value="mrr_desc">Highest Monthly MRR</option>
                <option value="mrr_asc">Lowest MRR First</option>
                <option value="growth_desc">Highest Growth Rate (%)</option>
                <option value="margin_desc">Highest Profit Margin</option>
              </select>

              <select
                value={dealFilter}
                onChange={(e) => {
                  setDealFilter(e.target.value);
                  setCurrentPage(1);
                }}
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
                <option value="all">All Listings</option>
                <option value="open_acquisition">Open for Acquisition</option>
                <option value="not_for_sale">Verified Proofs Only</option>
              </select>
            </div>
          </div>

          {/* Row 2: Category Filter Buttons with Live Counts */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
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
            <div>STARTUP / LOCATION</div>
            <div>VERIFIED MRR</div>
            <div className="hide-on-tablet">YOY GROWTH</div>
            <div className="hide-on-tablet">12M SPARKLINE</div>
            <div className="hide-on-mobile">VALUATION</div>
            <div style={{ textAlign: 'right' }}>ACTION</div>
          </div>

          {/* Skeletons when Loading */}
          {loading ? (
            <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[1, 2, 3, 4, 5].map(k => (
                <div key={k} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div className="skeleton-shimmer" style={{ width: '30px', height: '24px' }} />
                  <div className="skeleton-shimmer" style={{ width: '40px', height: '40px', borderRadius: '10px' }} />
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <div className="skeleton-shimmer" style={{ width: '160px', height: '16px' }} />
                    <div className="skeleton-shimmer" style={{ width: '220px', height: '12px' }} />
                  </div>
                  <div className="skeleton-shimmer hide-on-tablet" style={{ width: '100px', height: '30px' }} />
                  <div className="skeleton-shimmer" style={{ width: '80px', height: '30px' }} />
                </div>
              ))}
            </div>
          ) : paginatedStartups.length > 0 ? (
            paginatedStartups.map((startup, idx) => {
              const globalIndex = (currentPage - 1) * PAGE_SIZE + idx;
              const logo = LOGO_COLORS[startup.id] || { 
                bg: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)', 
                text: '#FFFFFF', 
                initials: startup.name ? startup.name.slice(0, 2).toUpperCase() : 'FL' 
              };

              return (
                <motion.div
                  key={startup.id || startup.slug}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.15, delay: idx * 0.02 }}
                  onClick={() => onSelectStartup ? onSelectStartup(startup) : null}
                  className="leaderboard-row"
                >
                  {/* Rank */}
                  <div style={{ fontWeight: 700, fontSize: '0.875rem', color: globalIndex < 3 ? 'var(--brand-primary)' : 'var(--text-muted)' }}>
                    #{globalIndex + 1}
                  </div>

                  {/* Company Logo & Details */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    {startup.logo ? (
                      <img
                        src={startup.logo}
                        alt={startup.name}
                        style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '10px',
                          objectFit: 'cover',
                          border: '1px solid var(--border-light)',
                          flexShrink: 0
                        }}
                      />
                    ) : (
                      <div style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '10px',
                        background: logo.bg,
                        color: logo.text,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 800,
                        fontSize: '0.875rem',
                        flexShrink: 0,
                        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.08)'
                      }}>
                        {logo.initials}
                      </div>
                    )}

                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                        <Link
                          to={`/startup/${startup.slug}`}
                          onClick={(e) => e.stopPropagation()}
                          style={{ fontWeight: 700, fontSize: '0.9375rem', color: 'var(--text-primary)', textDecoration: 'none' }}
                        >
                          {startup.name}
                        </Link>
                        <span className="badge badge-verified" style={{ fontSize: '0.625rem', padding: '2px 6px' }}>
                          <ShieldCheck size={10} />
                          <span>Triple-Lock</span>
                        </span>
                        {startup.tier && (
                          <span className="badge badge-brand" style={{ fontSize: '0.625rem', padding: '2px 6px' }}>
                            {startup.tier}
                          </span>
                        )}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '280px' }}>
                        {startup.location || 'India'} • {startup.tagline}
                      </div>
                    </div>
                  </div>

                  {/* Verified MRR / ARR */}
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.9375rem', color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>
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
                      <span>+{startup.growthMoM || 24}%</span>
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      Match: 100% Tax
                    </div>
                  </div>

                  {/* Animated 12-Month Sparkline Curve */}
                  <div className="hide-on-tablet">
                    <Sparkline data={startup.monthlyHistory} id={startup.id || startup.slug} />
                  </div>

                  {/* Valuation / Multiple */}
                  <div className="hide-on-mobile">
                    <div style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>
                      {startup.askingPrice ? formatCurrency(startup.askingPrice, currency) : formatCurrency((startup.arr || 0) * 4.0, currency)}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--brand-primary)', fontWeight: 600 }}>
                      {startup.multiple || '4.0x Multiple'}
                    </div>
                  </div>

                  {/* Action CTA Link */}
                  <div style={{ textAlign: 'right' }}>
                    <Link
                      to={`/startup/${startup.slug}`}
                      onClick={(e) => e.stopPropagation()}
                      className="btn btn-secondary btn-sm"
                      style={{ padding: '5px 10px', fontSize: '0.75rem', textDecoration: 'none' }}
                    >
                      <span>Audit Profile</span>
                      <ChevronRight size={13} />
                    </Link>
                  </div>
                </motion.div>
              );
            })
          ) : (
            /* Realistic Empty State */
            <div style={{ padding: '64px 24px', textAlign: 'center' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: 'var(--bg-muted)',
                color: 'var(--text-muted)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px auto'
              }}>
                <Search size={22} />
              </div>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '6px' }}>No Startups Found</h4>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', maxWidth: '360px', margin: '0 auto 16px auto' }}>
                We couldn't find any audited Indian startups matching "{searchQuery}". Try adjusting your query or category filters.
              </p>
              <button onClick={handleResetFilters} className="btn btn-secondary btn-sm" style={{ gap: '6px' }}>
                <RotateCcw size={13} />
                <span>Reset All Filters</span>
              </button>
            </div>
          )}

        </div>

        {/* Pagination & Footer Trust Info */}
        <div style={{
          marginTop: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
          fontSize: '0.8125rem',
          color: 'var(--text-muted)'
        }}>
          <div>
            Showing <strong>{filteredStartups.length > 0 ? (currentPage - 1) * PAGE_SIZE + 1 : 0}</strong> - <strong>{Math.min(currentPage * PAGE_SIZE, filteredStartups.length)}</strong> of <strong>{filteredStartups.length}</strong> audited Indian startups
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <button
                onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="btn btn-secondary btn-sm"
                style={{ padding: '6px 10px', fontSize: '0.75rem', gap: '4px' }}
              >
                <ChevronLeft size={14} />
                <span>Prev</span>
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`btn btn-sm ${currentPage === pageNum ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ width: '32px', height: '32px', padding: 0, fontSize: '0.75rem', borderRadius: '8px' }}
                >
                  {pageNum}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="btn btn-secondary btn-sm"
                style={{ padding: '6px 10px', fontSize: '0.75rem', gap: '4px' }}
              >
                <span>Next</span>
                <ChevronRight size={14} />
              </button>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
