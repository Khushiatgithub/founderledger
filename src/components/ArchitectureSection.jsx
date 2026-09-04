import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Cpu, Database, Landmark, CheckCircle2, XCircle } from 'lucide-react';

export default function ArchitectureSection() {
  return (
    <section style={{ padding: '5.5rem 0' }} id="why-us-section">
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
            FINTECH ARCHITECTURE
          </span>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '1rem', letterSpacing: '-0.03em' }}>
            Why Indian Tech Needs a Single Source of Truth
          </h2>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)' }}>
            Traditional pitch decks and Twitter revenue screenshots are easily forged. FounderLedger creates cryptographic proof of financial health.
          </p>
        </div>

        {/* 3 Pillars */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2rem',
          marginBottom: '4rem'
        }}>
          <div className="glass-card" style={{ padding: '2rem' }}>
            <div style={{
              width: '50px',
              height: '50px',
              borderRadius: '14px',
              background: 'var(--brand-soft)',
              color: 'var(--brand-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1.25rem'
            }}>
              <Cpu size={24} strokeWidth={2.5} />
            </div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '0.75rem' }}>1. Gateway API Triple-Check</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              Direct automated OAuth webhooks with Razorpay, PhonePe, and Cashfree. We capture recurring billing, gross volume, net refunds, and churn automatically.
            </p>
          </div>

          <div className="glass-card" style={{ padding: '2rem' }}>
            <div style={{
              width: '50px',
              height: '50px',
              borderRadius: '14px',
              background: 'var(--brand-soft)',
              color: 'var(--brand-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1.25rem'
            }}>
              <Database size={24} strokeWidth={2.5} />
            </div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '0.75rem' }}>2. GSTIN & E-Invoice Audit</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              Every rupee claimed is reconciled against filed GSTR-1 and GSTR-3B tax returns. This eliminates inflated numbers and ghost enterprise contracts.
            </p>
          </div>

          <div className="glass-card" style={{ padding: '2rem' }}>
            <div style={{
              width: '50px',
              height: '50px',
              borderRadius: '14px',
              background: 'var(--brand-soft)',
              color: 'var(--brand-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1.25rem'
            }}>
              <Landmark size={24} strokeWidth={2.5} />
            </div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '0.75rem' }}>3. ICICI & Axis Escrow Security</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              Acquisitions are transacted through RBI-regulated escrow bank accounts under standardized Indian share purchase agreements (SPA) with zero risk.
            </p>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="glass-card-elevated" style={{ overflow: 'hidden' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ background: 'var(--bg-subtle)', borderBottom: '1px solid var(--border-light)' }}>
                  <th style={{ padding: '1.25rem 1.5rem', fontWeight: 800 }}>Feature / Diligence Parameter</th>
                  <th style={{ padding: '1.25rem 1.5rem', fontWeight: 800, color: 'var(--text-muted)' }}>Unverified Pitch Decks / Social Media</th>
                  <th style={{ padding: '1.25rem 1.5rem', fontWeight: 800, color: 'var(--brand-primary)', background: 'var(--brand-soft)' }}>FounderLedger Triple-Lock Proof</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
                  <td style={{ padding: '1.25rem 1.5rem', fontWeight: 700 }}>Revenue Verification</td>
                  <td style={{ padding: '1.25rem 1.5rem', color: 'var(--text-muted)' }}>Self-reported Excel sheets & easily edited screenshots</td>
                  <td style={{ padding: '1.25rem 1.5rem', fontWeight: 700, color: 'var(--brand-primary)', background: 'var(--brand-soft)' }}>
                    Direct Gateway API + GST Portal Electronic Match
                  </td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
                  <td style={{ padding: '1.25rem 1.5rem', fontWeight: 700 }}>UPI AutoPay & Wire Tracking</td>
                  <td style={{ padding: '1.25rem 1.5rem', color: 'var(--text-muted)' }}>Manual bank PDF statements prone to manipulation</td>
                  <td style={{ padding: '1.25rem 1.5rem', fontWeight: 700, color: 'var(--brand-primary)', background: 'var(--brand-soft)' }}>
                    RBI Sahamati Account Aggregator Live Feed
                  </td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
                  <td style={{ padding: '1.25rem 1.5rem', fontWeight: 700 }}>M&A Diligence Speed</td>
                  <td style={{ padding: '1.25rem 1.5rem', color: 'var(--text-muted)' }}>3 to 6 months of grueling CA & legal audits</td>
                  <td style={{ padding: '1.25rem 1.5rem', fontWeight: 700, color: 'var(--brand-primary)', background: 'var(--brand-soft)' }}>
                    Under 7 Days with pre-verified financial hash
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: '1.25rem 1.5rem', fontWeight: 700 }}>Legal & Escrow Protection</td>
                  <td style={{ padding: '1.25rem 1.5rem', color: 'var(--text-muted)' }}>Expensive M&A legal retainers (5% - 10% fee)</td>
                  <td style={{ padding: '1.25rem 1.5rem', fontWeight: 700, color: 'var(--brand-primary)', background: 'var(--brand-soft)' }}>
                    Flat 1.5% Escrow Success Fee + Standardized SPAs
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
