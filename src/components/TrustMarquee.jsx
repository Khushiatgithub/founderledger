import React from 'react';
import { CreditCard, Zap, Building2, ShieldCheck, FileCheck, CircleDollarSign } from 'lucide-react';

export default function TrustMarquee() {
  const integrations = [
    { name: 'Razorpay Subscriptions', icon: <CreditCard size={18} style={{ color: 'var(--brand-primary)' }} /> },
    { name: 'PhonePe Merchant UPI', icon: <Zap size={18} style={{ color: '#5F259F' }} /> },
    { name: 'Cashfree AutoCollect', icon: <CircleDollarSign size={18} style={{ color: '#059669' }} /> },
    { name: 'GSTN E-Invoicing API', icon: <FileCheck size={18} style={{ color: 'var(--brand-primary)' }} /> },
    { name: 'Sahamati AA Banking', icon: <Building2 size={18} style={{ color: '#4F46E5' }} /> },
    { name: 'ICICI Escrow Services', icon: <ShieldCheck size={18} style={{ color: 'var(--success-dark)' }} /> }
  ];

  return (
    <section style={{ padding: '32px 0 48px 0', borderBottom: '1px solid var(--border-light)', background: 'var(--bg-subtle)' }}>
      <div className="container">
        <p style={{
          textAlign: 'center',
          fontSize: '0.75rem',
          fontWeight: 700,
          color: 'var(--text-muted)',
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
          marginBottom: '24px'
        }}>
          Reconciled Directly With India's Core Fintech & Regulatory Infrastructure
        </p>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '32px',
          flexWrap: 'wrap'
        }}>
          {integrations.map((item, idx) => (
            <div 
              key={idx} 
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px', 
                fontWeight: 600, 
                fontSize: '0.9375rem', 
                color: 'var(--text-primary)',
                background: 'var(--bg-surface)',
                padding: '8px 16px',
                borderRadius: '8px',
                border: '1px solid var(--border-light)',
                boxShadow: 'var(--shadow-xs)'
              }}
            >
              {item.icon}
              <span>{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
