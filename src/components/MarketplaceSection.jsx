import React from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Lock, 
  Check, 
  TrendingUp, 
  Building2, 
  DollarSign, 
  Sparkles,
  Award
} from 'lucide-react';
import { PLATFORM_DATA } from '../data/startups';
import { formatCurrency } from '../utils/formatters';

export default function MarketplaceSection({ currency, onOpenDealRoom }) {
  return (
    <section className="section-wrapper" id="marketplace-section">
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <span className="badge badge-brand" style={{ marginBottom: '12px' }}>
            <Award size={13} />
            <span>M&A MARKETPLACE & ESCROW</span>
          </span>
          <h2 style={{ marginBottom: '12px' }}>
            Buy & Sell Profitable Indian Startups
          </h2>
          <p className="lead-text">
            Acquire verified high-margin Indian micro-SaaS and digital businesses with institutional-grade escrow, standardized SPAs, and zero diligence surprises.
          </p>
        </div>

        {/* Deals Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
          gap: '24px'
        }}>
          {PLATFORM_DATA.marketplaceListings.map((deal, idx) => (
            <motion.div
              key={deal.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: idx * 0.1 }}
              className="glass-card"
              style={{
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                background: 'var(--bg-surface)'
              }}
            >
              <div>
                {/* Header: Title + Escrow Badge */}
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px', marginBottom: '16px' }}>
                  <div>
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '4px' }}>{deal.title}</h3>
                    <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--brand-primary)' }}>
                      {deal.category} • {deal.location}
                    </div>
                  </div>
                  <span className="badge badge-verified" style={{ fontSize: '0.6875rem' }}>
                    <ShieldCheck size={11} />
                    <span>Escrow Ready</span>
                  </span>
                </div>

                {/* Financial Metrics Strip */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '8px',
                  padding: '12px',
                  background: 'var(--bg-subtle)',
                  borderRadius: '12px',
                  border: '1px solid var(--border-light)',
                  marginBottom: '16px'
                }}>
                  <div>
                    <div style={{ fontSize: '0.6875rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>TTM Revenue</div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)' }}>{formatCurrency(deal.ttmRevenue, currency)}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.6875rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Net Profit</div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--success-dark)' }}>{formatCurrency(deal.ttmProfit, currency)}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.6875rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Asking Price</div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--brand-primary)' }}>{formatCurrency(deal.askingPrice, currency)}</div>
                  </div>
                </div>

                {/* Multiples & Churn Info */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.8125rem', color: 'var(--text-secondary)', marginBottom: '16px', flexWrap: 'wrap' }}>
                  <span>Multiple: <strong style={{ color: 'var(--text-primary)' }}>{deal.multiple}</strong></span>
                  <span>•</span>
                  <span>Customers: <strong style={{ color: 'var(--text-primary)' }}>{deal.subscribers} paying</strong></span>
                  <span>•</span>
                  <span>Churn: <strong style={{ color: 'var(--text-primary)' }}>{deal.churnRate}%</strong></span>
                </div>

                {/* Feature Bullet Points */}
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
                  {deal.highlights.map((h, i) => (
                    <li key={i} style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                      <Check size={15} style={{ color: 'var(--success-dark)', marginTop: '3px', flexShrink: 0 }} />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom Card Footer & Deal Room Button */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: '16px',
                borderTop: '1px solid var(--border-light)',
                flexWrap: 'wrap',
                gap: '12px'
              }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  Audit: <strong style={{ color: 'var(--brand-primary)' }}>{deal.verifiedHash}</strong>
                </div>
                <button onClick={() => onOpenDealRoom(deal)} className="btn btn-primary btn-sm">
                  <Lock size={13} />
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
