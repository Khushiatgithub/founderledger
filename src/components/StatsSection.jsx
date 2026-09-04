import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, TrendingUp, Layers, CheckCircle2, Award, Building2 } from 'lucide-react';
import { PLATFORM_DATA } from '../data/startups';
import { formatCurrency } from '../utils/formatters';
import { useCountUp } from '../utils/useCountUp';

export default function StatsSection({ currency }) {
  const stats = PLATFORM_DATA.stats;

  const animatedARR = useCountUp(stats.totalVerifiedARR, 1400);
  const animatedEscrow = useCountUp(stats.totalEscrowVolume, 1400);
  const animatedStartups = useCountUp(stats.totalStartups, 1000);

  const items = [
    {
      label: 'Total Verified ARR',
      value: formatCurrency(animatedARR, currency),
      badge: 'Live Audited',
      icon: <ShieldCheck size={18} style={{ color: 'var(--brand-primary)' }} />,
      subtext: 'Across 480+ Indian tech entities'
    },
    {
      label: 'Reconciliation Accuracy',
      value: `${stats.reconciliationAccuracy}%`,
      badge: 'Zero Discrepancy',
      icon: <CheckCircle2 size={18} style={{ color: 'var(--success-dark)' }} />,
      subtext: 'Razorpay + 3B GSTR Reconciliation'
    },
    {
      label: 'Verified Startups',
      value: `${Math.round(animatedStartups)}+`,
      badge: 'Active Leaders',
      icon: <Building2 size={18} style={{ color: 'var(--purple)' }} />,
      subtext: 'B2B SaaS, DevTools & Fintech'
    },
    {
      label: 'M&A Deal Volume',
      value: formatCurrency(animatedEscrow, currency),
      badge: 'Escrow Protected',
      icon: <Award size={18} style={{ color: 'var(--brand-primary)' }} />,
      subtext: '38 successful acquisitions completed'
    }
  ];

  return (
    <section className="section-wrapper" style={{ background: 'var(--bg-subtle)', borderTop: '1px solid var(--border-light)', borderBottom: '1px solid var(--border-light)', padding: '48px 0' }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '20px'
        }}>
          {items.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="glass-card"
              style={{ padding: '24px', background: 'var(--bg-surface)' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <div style={{ 
                  width: '36px', 
                  height: '36px', 
                  borderRadius: '10px', 
                  background: 'var(--bg-muted)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  border: '1px solid var(--border-light)'
                }}>
                  {item.icon}
                </div>
                <span className="badge badge-neutral" style={{ fontSize: '0.6875rem' }}>
                  {item.badge}
                </span>
              </div>

              <div style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.03em', lineHeight: '1.1', marginBottom: '6px' }}>
                {item.value}
              </div>

              <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '4px' }}>
                {item.label}
              </div>

              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                {item.subtext}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
