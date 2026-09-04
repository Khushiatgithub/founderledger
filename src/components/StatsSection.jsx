import React from 'react';
import { motion } from 'framer-motion';
import { PLATFORM_DATA } from '../data/startups';
import { formatCurrency } from '../utils/formatters';

export default function StatsSection({ currency }) {
  const stats = PLATFORM_DATA.stats;

  return (
    <section style={{ padding: '3.5rem 0', background: 'var(--bg-subtle)', borderBottom: '1px solid var(--border-light)' }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '2rem',
          textAlign: 'center'
        }}>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2.6rem', fontWeight: 900, color: 'var(--text-primary)', letterSpacing: '-0.04em' }}>
              {formatCurrency(stats.totalVerifiedARR, currency)}
            </div>
            <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
              Total Verified Startup ARR
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2.6rem', fontWeight: 900, color: 'var(--text-primary)', letterSpacing: '-0.04em' }}>
              {stats.totalStartups}+
            </div>
            <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
              Audited Indian Founders
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2.6rem', fontWeight: 900, color: 'var(--success-dark)', letterSpacing: '-0.04em' }}>
              {stats.reconciliationAccuracy}%
            </div>
            <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
              GST & Bank Reconciliation Match
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2.6rem', fontWeight: 900, color: 'var(--brand-primary)', letterSpacing: '-0.04em' }}>
              {formatCurrency(stats.totalEscrowVolume, currency)}
            </div>
            <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
              M&A Escrow Deals Transacted
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
