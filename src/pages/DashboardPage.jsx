import React, { useState } from 'react';
import { useUser, UserButton, SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  ArrowLeft, 
  TrendingUp, 
  Activity, 
  CreditCard, 
  FileCheck2, 
  Key, 
  Lock, 
  ExternalLink, 
  Copy, 
  Check, 
  Plus, 
  RefreshCw,
  Zap,
  Building2,
  AlertCircle
} from 'lucide-react';
import { formatCurrency } from '../utils/formatters';

export default function DashboardPage() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [currency, setCurrency] = useState('INR');
  const [copiedKey, setCopiedKey] = useState(false);
  const [dataRoomActive, setDataRoomActive] = useState(true);

  if (!isLoaded) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-canvas)' }}>
        <div className="skeleton-shimmer" style={{ width: '200px', height: '40px', borderRadius: '10px' }} />
      </div>
    );
  }

  if (!isSignedIn) {
    return <RedirectToSignIn />;
  }

  const founderName = user.fullName || user.firstName || user.primaryEmailAddress?.emailAddress?.split('@')[0] || 'Founder';
  const companyName = user.publicMetadata?.companyName || 'DocuPulse AI';
  const apiKey = 'fl_live_key_98a7fbc210084ad99';

  const handleCopyKey = () => {
    navigator.clipboard.writeText(apiKey);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-canvas)', color: 'var(--text-primary)', position: 'relative' }}>
      {/* Background Ambience */}
      <div className="bg-grid-ambient" aria-hidden="true" />
      <div className="ambient-blue-glow" aria-hidden="true" />

      {/* Dashboard Top Navigation */}
      <header className="navbar-fixed" style={{ position: 'sticky', top: 0 }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
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
            </Link>

            <span className="badge badge-brand hide-on-mobile" style={{ fontSize: '0.6875rem' }}>
              FOUNDER CONSOLE
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {/* Currency Switcher */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              background: 'var(--bg-muted)',
              border: '1px solid var(--border-light)',
              borderRadius: '8px',
              padding: '2px',
              fontSize: '0.75rem',
              fontWeight: 600
            }}>
              <button
                onClick={() => setCurrency('INR')}
                style={{
                  padding: '4px 8px',
                  borderRadius: '6px',
                  border: 'none',
                  background: currency === 'INR' ? 'var(--bg-surface)' : 'transparent',
                  color: currency === 'INR' ? 'var(--text-primary)' : 'var(--text-muted)',
                  cursor: 'pointer',
                  fontWeight: 600
                }}
              >
                ₹ INR
              </button>
              <button
                onClick={() => setCurrency('USD')}
                style={{
                  padding: '4px 8px',
                  borderRadius: '6px',
                  border: 'none',
                  background: currency === 'USD' ? 'var(--bg-surface)' : 'transparent',
                  color: currency === 'USD' ? 'var(--text-primary)' : 'var(--text-muted)',
                  cursor: 'pointer',
                  fontWeight: 600
                }}
              >
                $ USD
              </button>
            </div>

            <Link to="/" className="btn btn-secondary btn-sm hide-on-mobile" style={{ gap: '6px' }}>
              <ArrowLeft size={13} />
              <span>Public Index</span>
            </Link>

            {/* Clerk User Button Profile Dropdown */}
            <UserButton afterSignOutUrl="/" />
          </div>

        </div>
      </header>

      {/* Main Dashboard Container */}
      <main className="container" style={{ padding: '32px 16px 64px 16px', position: 'relative', zIndex: 1 }}>
        
        {/* Welcome Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <h1 style={{ fontSize: '1.75rem', fontWeight: 800, letterSpacing: '-0.03em' }}>
                Welcome back, {founderName} 👋
              </h1>
              <span className="badge badge-verified" style={{ fontSize: '0.7rem' }}>
                <ShieldCheck size={12} />
                <span>Triple-Lock Verified</span>
              </span>
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
              Managing <strong>{companyName}</strong> (MCA CIN: U72900KA2023PTC172819) • Ledger Hash: <code style={{ color: 'var(--brand-primary)', fontWeight: 600 }}>FL-2026-KA-88A92F</code>
            </p>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <a href="#gateways" className="btn btn-primary btn-sm" style={{ gap: '6px' }}>
              <Zap size={14} />
              <span>Sync New Webhook</span>
            </a>
          </div>
        </div>

        {/* 4 Metric Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '16px',
          marginBottom: '32px'
        }}>
          {/* MRR Card */}
          <div className="glass-card" style={{ padding: '20px', background: 'var(--bg-surface)' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '6px' }}>
              VERIFIED MRR (MARCH 2026)
            </div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)', marginBottom: '4px' }}>
              {formatCurrency(1850000, currency)}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', color: 'var(--success-dark)', fontWeight: 600 }}>
              <TrendingUp size={13} />
              <span>+24.8% MoM Growth</span>
            </div>
          </div>

          {/* ARR Card */}
          <div className="glass-card" style={{ padding: '20px', background: 'var(--bg-surface)' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '6px' }}>
              ANNUAL RUN RATE (ARR)
            </div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--brand-primary)', fontFamily: 'var(--font-mono)', marginBottom: '4px' }}>
              {formatCurrency(22200000, currency)}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
              100% Gateway Audited
            </div>
          </div>

          {/* GST Reconciliation Card */}
          <div className="glass-card" style={{ padding: '20px', background: 'var(--bg-surface)' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '6px' }}>
              GSTR-3B TAX MATCH
            </div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--success-dark)', fontFamily: 'var(--font-mono)', marginBottom: '4px' }}>
              100.0%
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
              Filed ARN: AA290326098172
            </div>
          </div>

          {/* Valuation Comps Card */}
          <div className="glass-card" style={{ padding: '20px', background: 'var(--bg-surface)' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '6px' }}>
              EST. VALUATION (4.0x MULTIPLE)
            </div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)', marginBottom: '4px' }}>
              {formatCurrency(88800000, currency)}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--brand-primary)', fontWeight: 600 }}>
              Top 10% in Indian B2B SaaS
            </div>
          </div>
        </div>

        {/* Dashboard Main 2-Column Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '24px', alignItems: 'start' }}>
          
          {/* Left Column: Connected Gateways & Webhook Tunnel */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* Connected Gateways */}
            <div className="glass-card" id="gateways" style={{ padding: '24px', background: 'var(--bg-surface)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                <div>
                  <h3 style={{ fontSize: '1.15rem', marginBottom: '2px' }}>Connected Revenue Gateways</h3>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                    Live read-only API connectors tracking daily settlements.
                  </p>
                </div>
                <span className="badge badge-verified" style={{ fontSize: '0.6875rem' }}>
                  <Activity size={12} />
                  <span>3 Active Tunnels</span>
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[
                  { name: 'Razorpay Subscriptions (Live API)', status: 'Connected', volume: '68% of ARR', date: 'Synced 2m ago', active: true },
                  { name: 'GSTN E-Invoicing & GSTR-3B API', status: 'Connected', volume: '100% Tax Match', date: 'Synced 1h ago', active: true },
                  { name: 'Stripe India Subscriptions', status: 'Connected', volume: '10% of ARR', date: 'Synced 12m ago', active: true },
                  { name: 'PhonePe Merchant QR / AutoPay', status: 'Available', volume: 'Connect for UPI', date: 'Not Connected', active: false }
                ].map((gw, idx) => (
                  <div key={idx} style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 16px',
                    background: 'var(--bg-subtle)',
                    borderRadius: '10px',
                    border: '1px solid var(--border-light)'
                  }}>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--text-primary)' }}>{gw.name}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{gw.volume} • {gw.date}</div>
                    </div>
                    <div>
                      {gw.active ? (
                        <span className="badge badge-verified" style={{ fontSize: '0.6875rem' }}>✓ Active</span>
                      ) : (
                        <button className="btn btn-secondary btn-sm" style={{ padding: '3px 8px', fontSize: '0.75rem' }}>
                          + Connect
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Read-Only Investor API Key */}
            <div className="glass-card" style={{ padding: '24px', background: 'var(--bg-surface)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <div>
                  <h3 style={{ fontSize: '1.15rem', marginBottom: '2px' }}>Read-Only Due-Diligence API Token</h3>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                    Share this key with audited VCs & buyers for 1-click financial verification.
                  </p>
                </div>
                <Key size={18} style={{ color: 'var(--brand-primary)' }} />
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 14px',
                background: '#090D16',
                borderRadius: '8px',
                border: '1px solid #1E293B',
                color: '#93C5FD',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8125rem'
              }}>
                <span>{apiKey}</span>
                <button
                  onClick={handleCopyKey}
                  style={{
                    border: 'none',
                    background: 'rgba(255, 255, 255, 0.1)',
                    color: '#FFFFFF',
                    padding: '4px 8px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '0.75rem'
                  }}
                >
                  {copiedKey ? <Check size={12} style={{ color: '#10B981' }} /> : <Copy size={12} />}
                  <span>{copiedKey ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>

          </div>

          {/* Right Column: Investor Data Room & Escrow Settings */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* Private Deal Room Toggle */}
            <div className="glass-card" style={{ padding: '24px', background: 'var(--bg-surface)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                <h3 style={{ fontSize: '1.15rem' }}>Confidential NDA Deal Room</h3>
                <span className="badge badge-brand" style={{ fontSize: '0.6875rem' }}>M&A Ready</span>
              </div>

              <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '16px' }}>
                Allow verified institutional acquirers and angel syndicates to request access to your audited GSTR-3B filings under standard NDA.
              </p>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 14px',
                background: 'var(--bg-subtle)',
                borderRadius: '10px',
                border: '1px solid var(--border-light)',
                marginBottom: '16px'
              }}>
                <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>Deal Room Status</span>
                <button
                  onClick={() => setDataRoomActive(!dataRoomActive)}
                  className={`btn btn-sm ${dataRoomActive ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ padding: '4px 10px', fontSize: '0.75rem' }}
                >
                  {dataRoomActive ? 'Active (Listed)' : 'Private (Hidden)'}
                </button>
              </div>

              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Asking Price: <strong>₹8.88 Cr (4.0x ARR)</strong> • Escrow Partner: <strong>ICICI Bank</strong>
              </div>
            </div>

            {/* Public Verified Badge Preview */}
            <div className="glass-card" style={{ padding: '24px', background: 'var(--bg-surface)' }}>
              <h3 style={{ fontSize: '1.15rem', marginBottom: '6px' }}>Public Verification Badge</h3>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
                Embed on your landing page footer to boost enterprise customer conversions.
              </p>

              <div style={{
                padding: '16px',
                background: 'var(--bg-subtle)',
                borderRadius: '12px',
                border: '1px solid var(--border-light)',
                textAlign: 'center',
                marginBottom: '16px'
              }}>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 14px',
                  background: '#FFFFFF',
                  borderRadius: '10px',
                  border: '1.5px solid var(--brand-primary)',
                  boxShadow: '0 2px 8px rgba(37, 99, 235, 0.15)'
                }}>
                  <ShieldCheck size={20} style={{ color: 'var(--brand-primary)' }} />
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontSize: '0.625rem', fontWeight: 800, color: '#64748B' }}>FOUNDERLEDGER VERIFIED</div>
                    <div style={{ fontSize: '0.9375rem', fontWeight: 900, color: '#090E1A' }}>₹2.22 Cr ARR</div>
                  </div>
                </div>
              </div>

              <Link to="/#verify-section" className="btn btn-secondary btn-sm" style={{ width: '100%', justifyContent: 'center' }}>
                <span>Get HTML Embed Snippet</span>
              </Link>
            </div>

          </div>

        </div>

      </main>
    </div>
  );
}
