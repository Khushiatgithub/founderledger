import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShieldCheck, ArrowRight, TrendingUp, SlidersHorizontal, Building, CheckCircle2 } from 'lucide-react';
import { PLATFORM_DATA } from '../data/startups';
import { formatCurrency } from '../utils/formatters';

export default function Leaderboard({ currency, onSelectStartup }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [dealFilter, setDealFilter] = useState('all');
  const [mrrFilter, setMrrFilter] = useState('all');
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
        s.founder.name.toLowerCase().includes(q) ||
        s.techStack.some(t => t.toLowerCase().includes(q))
      );
    }

    if (dealFilter !== 'all') {
      list = list.filter(s => s.dealStatus === dealFilter);
    }

    if (mrrFilter === 'under_10l') {
      list = list.filter(s => s.mrr < 1000000);
    } else if (mrrFilter === '10l_25l') {
      list = list.filter(s => s.mrr >= 1000000 && s.mrr <= 2500000);
    } else if (mrrFilter === 'above_25l') {
      list = list.filter(s => s.mrr > 2500000);
    }

    if (sortBy === 'arr_desc') list.sort((a, b) => b.arr - a.arr);
    else if (sortBy === 'arr_asc') list.sort((a, b) => a.arr - b.arr);
    else if (sortBy === 'growth_desc') list.sort((a, b) => b.growthMoM - a.growthMoM);
    else if (sortBy === 'margin_desc') list.sort((a, b) => b.netMargin - a.netMargin);

    return list;
  }, [activeCategory, searchQuery, dealFilter, mrrFilter, sortBy]);

  return (
    <section style={{ padding: '5.5rem 0' }} id="leaderboard-section">
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
            LIVE VERIFIED DIRECTORY
          </span>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '1rem', letterSpacing: '-0.03em' }}>
            Discover India's Most Transparent Startups
          </h2>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)' }}>
            Every single rupee verified through read-only API connections and filed GST returns. Zero vanity pitch deck numbers.
          </p>
        </div>

        {/* Directory Controls Bar */}
        <div className="glass-card" style={{ padding: '1.25rem', marginBottom: '2rem' }}>
          {/* Row 1: Search & Category Pills */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
            <div style={{ position: 'relative', flex: 1, minWidth: '260px' }}>
              <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search startup name, keywords, founders, tech stack..."
                style={{
                  width: '100%',
                  padding: '0.65rem 1rem 0.65rem 2.6rem',
                  background: 'var(--bg-subtle)',
                  border: '1px solid var(--border-light)',
                  borderRadius: '12px',
                  fontSize: '0.9rem',
                  color: 'var(--text-primary)'
                }}
              />
            </div>

            {/* Category Pills */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', overflowX: 'auto', paddingBottom: '4px' }}>
              {PLATFORM_DATA.categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  style={{
                    position: 'relative',
                    padding: '6px 14px',
                    borderRadius: '9999px',
                    fontSize: '0.825rem',
                    fontWeight: 600,
                    color: activeCategory === cat.id ? '#FFFFFF' : 'var(--text-secondary)',
                    background: activeCategory === cat.id ? 'var(--brand-primary)' : 'var(--bg-subtle)',
                    border: '1px solid var(--border-light)',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.2s',
                    boxShadow: activeCategory === cat.id ? '0 2px 8px rgba(37, 99, 235, 0.25)' : 'none'
                  }}
                >
                  {cat.label} ({cat.count})
                </button>
              ))}
            </div>
          </div>

          {/* Row 2: Secondary Filters */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            flexWrap: 'wrap',
            fontSize: '0.85rem',
            color: 'var(--text-secondary)',
            borderTop: '1px solid var(--border-subtle)',
            paddingTop: '0.85rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <SlidersHorizontal size={14} />
                <span>Deal Status:</span>
              </label>
              <select
                value={dealFilter}
                onChange={(e) => setDealFilter(e.target.value)}
                style={{ padding: '5px 10px', borderRadius: '8px', background: 'var(--bg-subtle)', border: '1px solid var(--border-light)', color: 'var(--text-primary)', fontSize: '0.85rem' }}
              >
                <option value="all">All Statuses</option>
                <option value="open_acquisition">Open for Acquisition</option>
                <option value="fundraising">Fundraising Series A/Seed</option>
                <option value="not_for_sale">Verified Proof Only</option>
              </select>

              <label style={{ marginLeft: '0.5rem' }}>Monthly Revenue:</label>
              <select
                value={mrrFilter}
                onChange={(e) => setMrrFilter(e.target.value)}
                style={{ padding: '5px 10px', borderRadius: '8px', background: 'var(--bg-subtle)', border: '1px solid var(--border-light)', color: 'var(--text-primary)', fontSize: '0.85rem' }}
              >
                <option value="all">All MRR Tiers</option>
                <option value="under_10l">Under ₹10 Lakhs/mo</option>
                <option value="10l_25l">₹10L – ₹25 Lakhs/mo</option>
                <option value="above_25l">₹25 Lakhs+/mo</option>
              </select>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span style={{ fontWeight: 600, color: 'var(--text-muted)' }}>
                Showing {filteredStartups.length} verified startup{filteredStartups.length === 1 ? '' : 's'}
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{ padding: '5px 10px', borderRadius: '8px', background: 'var(--bg-subtle)', border: '1px solid var(--border-light)', color: 'var(--text-primary)', fontSize: '0.85rem', fontWeight: 600 }}
              >
                <option value="arr_desc">Highest ARR First</option>
                <option value="arr_asc">Lowest ARR First</option>
                <option value="growth_desc">Highest MoM Growth</option>
                <option value="margin_desc">Highest Net Margin</option>
              </select>
            </div>
          </div>
        </div>

        {/* Startups 20px Rounded Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
          gap: '1.5rem'
        }}>
          {filteredStartups.map((s, index) => {
            const isAcquisition = s.dealStatus === 'open_acquisition';
            const isFundraising = s.dealStatus === 'fundraising';

            return (
              <motion.div
                key={s.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: index * 0.04 }}
                onClick={() => onSelectStartup(s)}
                className="glass-card"
                style={{
                  padding: '1.65rem',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.75rem', marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div style={{
                        width: '44px',
                        height: '44px',
                        borderRadius: '12px',
                        background: 'var(--brand-gradient)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#fff',
                        fontWeight: 800,
                        fontSize: '1rem',
                        flexShrink: 0
                      }}>
                        {s.founder.avatar}
                      </div>
                      <div>
                        <h3 style={{ fontSize: '1.15rem', marginBottom: '2px' }}>{s.name}</h3>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                          {s.categoryLabel} • {s.location}
                        </div>
                      </div>
                    </div>

                    <span className={isAcquisition ? 'badge-deal-open' : isFundraising ? 'badge-deal-fundraising' : 'badge-gold'} style={{ padding: '3px 9px', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 700 }}>
                      {s.dealLabel}
                    </span>
                  </div>

                  <p style={{
                    fontSize: '0.875rem',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.5,
                    marginBottom: '1.25rem',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}>
                    {s.tagline}
                  </p>

                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '0.75rem',
                    padding: '0.85rem',
                    background: 'var(--bg-subtle)',
                    borderRadius: '14px',
                    marginBottom: '1rem'
                  }}>
                    <div>
                      <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', fontWeight: 600, color: 'var(--text-muted)' }}>Verified ARR</div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.2rem', fontWeight: 800, color: 'var(--brand-primary)' }}>{formatCurrency(s.arr, currency)}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', fontWeight: 600, color: 'var(--text-muted)' }}>MoM Growth</div>
                      <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--success-dark)', display: 'flex', alignItems: 'center', gap: '3px' }}>
                        <TrendingUp size={14} /> +{s.growthMoM}%
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginBottom: '1.25rem', fontSize: '0.8rem' }}>
                    <div>
                      <span style={{ color: 'var(--text-muted)' }}>MRR Run-rate: </span>
                      <strong style={{ fontFamily: 'var(--font-mono)' }}>{formatCurrency(s.mrr, currency, true)}</strong>
                    </div>
                    <div>
                      <span style={{ color: 'var(--text-muted)' }}>Net Margin: </span>
                      <strong style={{ color: 'var(--success-dark)' }}>{s.netMargin}%</strong>
                    </div>
                  </div>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingTop: '0.85rem',
                  borderTop: '1px solid var(--border-subtle)',
                  fontSize: '0.775rem'
                }}>
                  <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <ShieldCheck size={14} color="var(--success)" />
                    {s.ledgerHash}
                  </span>
                  <span style={{ fontWeight: 700, color: 'var(--brand-primary)', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                    Audit Data Room <ArrowRight size={13} />
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
