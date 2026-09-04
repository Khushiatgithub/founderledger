import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, CheckCircle2, ArrowRight, Lock, Check } from 'lucide-react';
import { PLATFORM_DATA } from '../data/startups';
import { formatCurrency } from '../utils/formatters';

export default function MarketplaceSection({ currency, onOpenDealRoom }) {
  return (
    <section style={{ padding: '5.5rem 0' }} id="marketplace-section">
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
            M&A DEALS & ESCROW
          </span>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '1rem', letterSpacing: '-0.03em' }}>
            Buy & Sell Profitable Indian Startups
          </h2>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)' }}>
            Acquire verified high-margin Indian micro-SaaS and digital businesses with institutional-grade ICICI escrow, standardized SPAs, and zero diligence surprises.
          </p>
        </div>

        {/* Deals Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(460px, 1fr))',
          gap: '2rem'
        }}>
          {PLATFORM_DATA.marketplaceListings.map((deal, idx) => (
            <motion.div
              key={deal.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="glass-card"
              style={{
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem', marginBottom: '1.25rem' }}>
                  <div>
                    <h3 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '4px' }}>{deal.title}</h3>
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--brand-primary)' }}>
                      {deal.category} • {deal.location}
                    </span>
                  </div>
                  <span className="badge-success" style={{ padding: '4px 10px', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 700 }}>
                    Escrow Ready
                  </span>
                </div>

                {/* Financials Highlight Box */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '0.75rem',
                  padding: '1rem',
                  background: 'var(--bg-subtle)',
                  borderRadius: '16px',
                  marginBottom: '1.25rem'
                }}>
                  <div>
                    <div style={{ fontSize: '0.7rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>TTM Revenue</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.25rem', fontWeight: 800 }}>{formatCurrency(deal.ttmRevenue, currency)}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.7rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Net Profit</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.25rem', fontWeight: 800, color: 'var(--success-dark)' }}>{formatCurrency(deal.ttmProfit, currency)}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.7rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Asking Price</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.25rem', fontWeight: 800, color: 'var(--brand-primary)' }}>{formatCurrency(deal.askingPrice, currency)}</div>
                  </div>
                </div>

                <div style={{ fontSize: '0.825rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
                  <strong>Multiple:</strong> {deal.multiple} • <strong>Subscribers:</strong> {deal.subscribers} paying • <strong>Churn:</strong> {deal.churnRate}%
                </div>

                {/* Highlights */}
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.75rem' }}>
                  {deal.highlights.map((h, i) => (
                    <li key={i} style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                      <Check size={16} color="var(--success)" style={{ marginTop: '3px', flexShrink: 0 }} />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: '1.25rem',
                borderTop: '1px solid var(--border-light)',
                flexWrap: 'wrap',
                gap: '0.75rem'
              }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  Audit Hash: {deal.verifiedHash}
                </div>
                <button onClick={() => onOpenDealRoom(deal)} className="btn btn-primary btn-sm">
                  <Lock size={14} />
                  <span>Enter Private Deal Room</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
