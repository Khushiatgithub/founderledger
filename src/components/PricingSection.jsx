import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, ShieldCheck, Zap, Sparkles, HelpCircle } from 'lucide-react';
import { formatCurrency } from '../utils/formatters';

export default function PricingSection({ currency, onOpenVerify }) {
  const [billingCycle, setBillingCycle] = useState('annual'); // 'monthly' or 'annual'

  return (
    <section className="section-wrapper" id="pricing-section">
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <span className="badge badge-brand" style={{ marginBottom: '12px' }}>
            <Sparkles size={13} />
            <span>TRANSPARENT PRICING</span>
          </span>
          <h2 style={{ marginBottom: '12px' }}>
            Predictable Pricing for Builders & Acquirers
          </h2>
          <p className="lead-text">
            Free forever for bootstrapped founders to verify revenue and join the national leaderboard. Upgrade for enterprise data rooms and M&A escrow.
          </p>

          {/* Billing Cycle Switcher */}
          <div style={{ display: 'inline-flex', alignItems: 'center', background: 'var(--bg-muted)', padding: '4px', borderRadius: '12px', border: '1px solid var(--border-light)', marginTop: '24px' }}>
            <button
              onClick={() => setBillingCycle('monthly')}
              style={{
                padding: '6px 16px',
                borderRadius: '8px',
                border: 'none',
                background: billingCycle === 'monthly' ? 'var(--bg-surface)' : 'transparent',
                color: billingCycle === 'monthly' ? 'var(--text-primary)' : 'var(--text-muted)',
                fontWeight: 600,
                fontSize: '0.8125rem',
                cursor: 'pointer',
                boxShadow: billingCycle === 'monthly' ? 'var(--shadow-xs)' : 'none',
                transition: 'all 0.15s ease'
              }}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              style={{
                padding: '6px 16px',
                borderRadius: '8px',
                border: 'none',
                background: billingCycle === 'annual' ? 'var(--bg-surface)' : 'transparent',
                color: billingCycle === 'annual' ? 'var(--text-primary)' : 'var(--text-muted)',
                fontWeight: 600,
                fontSize: '0.8125rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                boxShadow: billingCycle === 'annual' ? 'var(--shadow-xs)' : 'none',
                transition: 'all 0.15s ease'
              }}
            >
              <span>Annual Billing</span>
              <span style={{ fontSize: '0.6875rem', background: 'var(--success-soft)', color: 'var(--success-dark)', padding: '2px 6px', borderRadius: '9999px', fontWeight: 700 }}>
                SAVE 20%
              </span>
            </button>
          </div>
        </div>

        {/* 3 Pricing Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '24px',
          maxWidth: '1140px',
          margin: '0 auto',
          alignItems: 'stretch'
        }}>
          
          {/* 1. Starter Free */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card"
            style={{
              padding: '32px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              background: 'var(--bg-surface)'
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <h3 style={{ fontSize: '1.25rem' }}>Founder Starter</h3>
                <span className="badge badge-neutral">Free Forever</span>
              </div>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginBottom: '24px' }}>
                For solo founders & early micro-SaaS builders
              </p>

              <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.04em', marginBottom: '24px', lineHeight: '1' }}>
                ₹0 <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)', fontWeight: 500 }}>/ month</span>
              </div>

              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
                {[
                  '1 Payment Gateway Connection (Razorpay)',
                  'Public Verified FounderLedger Profile URL',
                  'Embeddable Live Verified SVG Badge',
                  'National Startup Leaderboard Listing',
                  'Community Slack & Founder Forum Access'
                ].map((item, i) => (
                  <li key={i} style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Check size={16} style={{ color: 'var(--success-dark)', flexShrink: 0 }} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button onClick={onOpenVerify} className="btn btn-secondary" style={{ width: '100%' }}>
              Claim Free Profile
            </button>
          </motion.div>

          {/* 2. Founder Pro (Highlighted with Royal Blue Subtle Glow) */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="glass-card pricing-pro-glow"
            style={{
              padding: '32px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              background: 'var(--bg-surface)'
            }}
          >
            <div className="pricing-pro-badge">
              MOST POPULAR
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--brand-primary)' }}>Founder Pro</h3>
                <span className="badge badge-brand">Audit Pro</span>
              </div>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginBottom: '24px' }}>
                For fast-scaling B2B, DevTools & Micro-SaaS
              </p>

              <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.04em', marginBottom: '24px', lineHeight: '1' }}>
                {billingCycle === 'annual' ? (currency === 'USD' ? '$24' : '₹1,999') : (currency === 'USD' ? '$29' : '₹2,499')}
                <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)', fontWeight: 500 }}> / month</span>
              </div>

              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
                {[
                  'Unlimited Gateways (Razorpay + Stripe + Cashfree)',
                  'Automated GSTR-1 & 3B GSTIN Reconciliation',
                  'Encrypted Password-Protected Investor Deal Room',
                  'Real-Time Webhook Reconciliation & Live Pings',
                  'Certified Valuation Multiples & Diligence Report',
                  'Priority Verification within 2 Hours'
                ].map((item, i) => (
                  <li key={i} style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Check size={16} style={{ color: 'var(--brand-primary)', flexShrink: 0 }} />
                    <span style={{ fontWeight: i === 2 || i === 4 ? 600 : 400, color: i === 2 || i === 4 ? 'var(--text-primary)' : 'inherit' }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button onClick={onOpenVerify} className="btn btn-primary" style={{ width: '100%' }}>
              Start 14-Day Free Trial
            </button>
          </motion.div>

          {/* 3. M&A Dealmaker */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="glass-card"
            style={{
              padding: '32px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              background: 'var(--bg-surface)'
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <h3 style={{ fontSize: '1.25rem' }}>M&A Dealmaker</h3>
                <span className="badge badge-neutral">Institutional</span>
              </div>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginBottom: '24px' }}>
                For angel syndicates, micro-PEs & strategic acquirers
              </p>

              <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.04em', marginBottom: '24px', lineHeight: '1' }}>
                1.5% <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)', fontWeight: 500 }}>/ closed transaction</span>
              </div>

              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
                {[
                  'Regulated Escrow Account Holding',
                  'Standardized Indian SaaS SPA Agreements',
                  'MCA 21 Director & Equity Share Transfer Ops',
                  'GitHub Repo, AWS & Domain IP Escrow Handover',
                  'Dedicated M&A Legal & Tax Advisor'
                ].map((item, i) => (
                  <li key={i} style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Check size={16} style={{ color: 'var(--success-dark)', flexShrink: 0 }} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <a href="#marketplace-section" className="btn btn-secondary" style={{ width: '100%' }}>
              Browse Marketplace
            </a>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
