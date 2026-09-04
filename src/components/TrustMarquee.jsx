import React from 'react';
import { CreditCard, Zap, Building2, ShieldCheck, FileCheck, CircleDollarSign } from 'lucide-react';

export default function TrustMarquee() {
  return (
    <section style={{ padding: '2.5rem 0 3.5rem 0', borderBottom: '1px solid var(--border-light)' }}>
      <div className="container">
        <p style={{
          textAlign: 'center',
          fontSize: '0.8rem',
          fontWeight: 700,
          color: 'var(--text-muted)',
          textTransform: 'uppercase',
          letterSpacing: '0.07em',
          marginBottom: '1.75rem'
        }}>
          Reconciled Directly With India's Core Fintech & Regulatory Infrastructure
        </p>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '2.5rem',
          flexWrap: 'wrap',
          opacity: 0.85
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 800, fontSize: '1.05rem', color: 'var(--text-secondary)' }}>
            <CreditCard size={20} color="var(--brand-primary)" />
            <span>Razorpay Subscriptions</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 800, fontSize: '1.05rem', color: 'var(--text-secondary)' }}>
            <Zap size={20} color="#5F259F" />
            <span>PhonePe Merchant UPI</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 800, fontSize: '1.05rem', color: 'var(--text-secondary)' }}>
            <CircleDollarSign size={20} color="#059669" />
            <span>Cashfree AutoCollect</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 800, fontSize: '1.05rem', color: 'var(--text-secondary)' }}>
            <FileCheck size={20} color="var(--brand-primary)" />
            <span>GSTN E-Invoicing Portal</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 800, fontSize: '1.05rem', color: 'var(--text-secondary)' }}>
            <Building2 size={20} color="#4F46E5" />
            <span>Sahamati Account Aggregator</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 800, fontSize: '1.05rem', color: 'var(--text-secondary)' }}>
            <ShieldCheck size={20} color="var(--success)" />
            <span>ICICI Escrow Services</span>
          </div>
        </div>
      </div>
    </section>
  );
}
