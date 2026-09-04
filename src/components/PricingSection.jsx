import React from 'react';
import { motion } from 'framer-motion';
import { Check, ShieldCheck, Zap, Sparkles } from 'lucide-react';
import { formatCurrency } from '../utils/formatters';

export default function PricingSection({ currency, onOpenVerify }) {
  return (
    <section style={{ padding: '5.5rem 0' }} id="pricing-section">
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 3.5rem auto' }}>
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
            TRANSPARENT PRICING
          </span>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '1rem', letterSpacing: '-0.03em' }}>
            Simple Plans for Builders & Acquirers
          </h2>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)' }}>
            Free forever for founders who want to verify their revenue and join the national startup ledger.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2rem',
          maxWidth: '1140px',
          margin: '0 auto'
        }}>
          {/* Free Plan */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card"
            style={{
              padding: '2.5rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '0.35rem' }}>Founder Basic</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                For bootstrapped solo founders starting out
              </p>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2.8rem', fontWeight: 900, marginBottom: '1.75rem' }}>
                ₹0 <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 500 }}>/ forever</span>
              </div>

              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '2rem' }}>
                <li style={{ fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <Check size={16} color="var(--success)" strokeWidth={2.5} />
                  <span>1 Gateway Connection (Razorpay/PhonePe)</span>
                </li>
                <li style={{ fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <Check size={16} color="var(--success)" strokeWidth={2.5} />
                  <span>Public FounderLedger Profile URL</span>
                </li>
                <li style={{ fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <Check size={16} color="var(--success)" strokeWidth={2.5} />
                  <span>Embeddable Verified SVG Seal Badge</span>
                </li>
                <li style={{ fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <Check size={16} color="var(--success)" strokeWidth={2.5} />
                  <span>Bharat Startup Leaderboard Listing</span>
                </li>
              </ul>
            </div>

            <button onClick={onOpenVerify} className="btn btn-secondary w-full">
              Claim Free Profile
            </button>
          </motion.div>

          {/* Pro Plan (Featured) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="glass-card"
            style={{
              padding: '2.5rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              borderColor: 'var(--brand-primary)',
              boxShadow: 'var(--shadow-xl), var(--shadow-glow)',
              position: 'relative',
              transform: 'scale(1.02)'
            }}
          >
            <div style={{
              position: 'absolute',
              top: '-12px',
              left: '50%',
              transform: 'translateX(-50%)',
              background: 'var(--brand-gradient)',
              color: '#FFFFFF',
              fontSize: '0.75rem',
              fontWeight: 800,
              letterSpacing: '0.05em',
              padding: '4px 14px',
              borderRadius: '9999px',
              textTransform: 'uppercase'
            }}>
              MOST POPULAR
            </div>

            <div>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '0.35rem' }}>Founder Pro</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                For fast-growing B2B & micro-SaaS teams
              </p>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2.8rem', fontWeight: 900, marginBottom: '1.75rem' }}>
                {currency === 'USD' ? '$29' : '₹2,499'} <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 500 }}>/ month</span>
              </div>

              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '2rem' }}>
                <li style={{ fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <Check size={16} color="var(--success)" strokeWidth={2.5} />
                  <span>Unlimited Gateways + UPI AutoPay + Cashfree</span>
                </li>
                <li style={{ fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <Check size={16} color="var(--success)" strokeWidth={2.5} />
                  <span>Automated GSTR-1 GSTIN Reconciliation</span>
                </li>
                <li style={{ fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <Check size={16} color="var(--success)" strokeWidth={2.5} />
                  <span>Password-Protected Investor Data Room</span>
                </li>
                <li style={{ fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <Check size={16} color="var(--success)" strokeWidth={2.5} />
                  <span>Real-time Webhook API Sync</span>
                </li>
                <li style={{ fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <Check size={16} color="var(--success)" strokeWidth={2.5} />
                  <span>Certified Valuation Summary Report</span>
                </li>
              </ul>
            </div>

            <button onClick={onOpenVerify} className="btn btn-primary w-full">
              Start 14-Day Free Trial
            </button>
          </motion.div>

          {/* M&A Escrow Plan */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="glass-card"
            style={{
              padding: '2.5rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '0.35rem' }}>Acquisition Escrow</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                For buyers & sellers closing M&A deals
              </p>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2.8rem', fontWeight: 900, marginBottom: '1.75rem' }}>
                1.5% <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 500 }}>/ closing fee</span>
              </div>

              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '2rem' }}>
                <li style={{ fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <Check size={16} color="var(--success)" strokeWidth={2.5} />
                  <span>ICICI / Axis Bank Regulated Escrow Account</span>
                </li>
                <li style={{ fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <Check size={16} color="var(--success)" strokeWidth={2.5} />
                  <span>Standardized Indian Tech SPA Agreements</span>
                </li>
                <li style={{ fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <Check size={16} color="var(--success)" strokeWidth={2.5} />
                  <span>MCA 21 Director & Share Transfer Assistance</span>
                </li>
                <li style={{ fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <Check size={16} color="var(--success)" strokeWidth={2.5} />
                  <span>IP Asset, Domain, & Repository Handover Verification</span>
                </li>
              </ul>
            </div>

            <a href="#marketplace-section" className="btn btn-secondary w-full">
              Browse M&A Deals
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
