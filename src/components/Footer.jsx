import React from 'react';
import { ShieldCheck } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{ background: 'var(--bg-canvas)', borderTop: '1px solid var(--border-light)', padding: '4.5rem 0 2.5rem 0' }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '3rem',
          marginBottom: '3.5rem'
        }}>
          <div style={{ gridColumn: 'span 2' }}>
            <a href="#" className="brand-link" style={{ marginBottom: '0.75rem' }}>
              <div className="brand-logo-icon">
                <ShieldCheck size={22} strokeWidth={2.5} />
              </div>
              <span>FounderLedger</span>
            </a>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', maxWidth: '340px', lineHeight: 1.6, marginTop: '0.5rem' }}>
              India's premier verified startup revenue infrastructure, transparent leaderboards, and trusted micro-acquisition marketplace. Built for the next generation of profitable Bharat tech companies.
            </p>
            <div style={{ marginTop: '1rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Compliance: RBI Account Aggregator Framework • GSTN Standard API • Indian Contract Act 1872
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '1.25rem' }}>Platform</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.875rem' }}>
              <li><a href="#leaderboard-section" className="nav-item-link" style={{ padding: 0 }}>Verified Leaderboard</a></li>
              <li><a href="#verify-section" className="nav-item-link" style={{ padding: 0 }}>Revenue Verification</a></li>
              <li><a href="#marketplace-section" className="nav-item-link" style={{ padding: 0 }}>M&A Marketplace</a></li>
              <li><a href="#valuation-section" className="nav-item-link" style={{ padding: 0 }}>Valuation Engine</a></li>
              <li><a href="#pricing-section" className="nav-item-link" style={{ padding: 0 }}>Pricing & Escrow</a></li>
            </ul>
          </div>

          <div>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '1.25rem' }}>Integrations</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.875rem' }}>
              <li><a href="#verify-section" className="nav-item-link" style={{ padding: 0 }}>Razorpay Webhooks</a></li>
              <li><a href="#verify-section" className="nav-item-link" style={{ padding: 0 }}>PhonePe Merchant</a></li>
              <li><a href="#verify-section" className="nav-item-link" style={{ padding: 0 }}>Cashfree AutoCollect</a></li>
              <li><a href="#verify-section" className="nav-item-link" style={{ padding: 0 }}>GST E-Invoicing API</a></li>
              <li><a href="#verify-section" className="nav-item-link" style={{ padding: 0 }}>Sahamati AA Banking</a></li>
            </ul>
          </div>

          <div>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '1.25rem' }}>Legal & Trust</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.875rem' }}>
              <li><a href="#why-us-section" className="nav-item-link" style={{ padding: 0 }}>Triple-Lock Security</a></li>
              <li><a href="#why-us-section" className="nav-item-link" style={{ padding: 0 }}>Standard M&A NDA</a></li>
              <li><a href="#why-us-section" className="nav-item-link" style={{ padding: 0 }}>ICICI Escrow Terms</a></li>
              <li><a href="#why-us-section" className="nav-item-link" style={{ padding: 0 }}>Privacy & Data Isolation</a></li>
              <li><a href="#why-us-section" className="nav-item-link" style={{ padding: 0 }}>Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: '2rem',
          borderTop: '1px solid var(--border-light)',
          fontSize: '0.825rem',
          color: 'var(--text-muted)',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div>
            © 2026 FounderLedger Technologies Pvt. Ltd. Made with precision for Indian Builders.
          </div>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <a href="#" style={{ color: 'var(--text-muted)' }}>Privacy</a>
            <a href="#" style={{ color: 'var(--text-muted)' }}>Security</a>
            <a href="#" style={{ color: 'var(--text-muted)' }}>API Status</a>
            <a href="#" style={{ color: 'var(--text-muted)' }}>Twitter / X</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
