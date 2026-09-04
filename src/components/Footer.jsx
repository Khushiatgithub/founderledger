import React from 'react';
import { ShieldCheck, Lock, CheckCircle2, ArrowRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{ background: 'var(--bg-canvas)', borderTop: '1px solid var(--border-light)', padding: '64px 0 32px 0' }}>
      <div className="container">
        
        {/* Main Footer Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '40px',
          marginBottom: '48px'
        }}>
          
          {/* Brand Column */}
          <div style={{ gridColumn: 'span 2' }}>
            <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', marginBottom: '16px' }} aria-label="FounderLedger Home">
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: 'var(--brand-primary)',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <ShieldCheck size={18} strokeWidth={2.4} />
              </div>
              <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.1rem', color: 'var(--text-primary)', letterSpacing: '-0.03em' }}>
                FounderLedger
              </span>
            </a>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', maxWidth: '360px', lineHeight: 1.6, marginBottom: '16px' }}>
              India's premier verified startup revenue infrastructure, transparent founder leaderboards, and trusted micro-acquisition marketplace.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              <Lock size={13} style={{ color: 'var(--success-dark)' }} />
              <span>SOC2 Type II • ISO 27001 Certified • RBI Account Aggregator Framework</span>
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h4 style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '16px' }}>
              Platform
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.875rem' }}>
              <li><a href="#leaderboard-section" className="nav-link" style={{ padding: 0 }}>Startup Leaderboard</a></li>
              <li><a href="#verify-section" className="nav-link" style={{ padding: 0 }}>Revenue Verification</a></li>
              <li><a href="#marketplace-section" className="nav-link" style={{ padding: 0 }}>M&A Marketplace</a></li>
              <li><a href="#valuation-section" className="nav-link" style={{ padding: 0 }}>Valuation Engine</a></li>
              <li><a href="#pricing-section" className="nav-link" style={{ padding: 0 }}>Pricing & Escrow</a></li>
            </ul>
          </div>

          {/* Integrations */}
          <div>
            <h4 style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '16px' }}>
              Integrations
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.875rem' }}>
              <li><a href="#verify-section" className="nav-link" style={{ padding: 0 }}>Razorpay Webhooks</a></li>
              <li><a href="#verify-section" className="nav-link" style={{ padding: 0 }}>Stripe India Subscriptions</a></li>
              <li><a href="#verify-section" className="nav-link" style={{ padding: 0 }}>Cashfree AutoCollect</a></li>
              <li><a href="#verify-section" className="nav-link" style={{ padding: 0 }}>GST E-Invoicing API</a></li>
              <li><a href="#verify-section" className="nav-link" style={{ padding: 0 }}>Sahamati AA Banking</a></li>
            </ul>
          </div>

          {/* Legal & Trust */}
          <div>
            <h4 style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '16px' }}>
              Trust & Legal
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.875rem' }}>
              <li><a href="#" className="nav-link" style={{ padding: 0 }}>Triple-Lock Security</a></li>
              <li><a href="#" className="nav-link" style={{ padding: 0 }}>Standard M&A NDA</a></li>
              <li><a href="#" className="nav-link" style={{ padding: 0 }}>ICICI Escrow Terms</a></li>
              <li><a href="#" className="nav-link" style={{ padding: 0 }}>Privacy Policy</a></li>
              <li><a href="#" className="nav-link" style={{ padding: 0 }}>Terms of Service</a></li>
            </ul>
          </div>

        </div>

        {/* Subfooter */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: '24px',
          borderTop: '1px solid var(--border-light)',
          fontSize: '0.8125rem',
          color: 'var(--text-muted)',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          <div>
            © 2026 FounderLedger Technologies Pvt. Ltd. Crafted with precision for Indian builders.
          </div>
          <div style={{ display: 'flex', gap: '20px' }}>
            <a href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Privacy</a>
            <a href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Security</a>
            <a href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>API Status (99.99%)</a>
            <a href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Twitter / X</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
