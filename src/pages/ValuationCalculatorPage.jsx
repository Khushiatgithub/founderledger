import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, ArrowLeft, LayoutDashboard, Sun, Moon } from 'lucide-react';
import ValuationCalculator from '../components/ValuationCalculator';
import LiveTicker from '../components/LiveTicker';
import Footer from '../components/Footer';

export default function ValuationCalculatorPage() {
  const [currency, setCurrency] = useState('INR');
  const [theme, setTheme] = useState(() => localStorage.getItem('fl_theme') || 'light');

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-canvas)', color: 'var(--text-primary)', position: 'relative' }}>
      {/* Background Grids */}
      <div className="bg-grid-ambient" aria-hidden="true" />

      {/* Top Live Ticker */}
      <LiveTicker />

      {/* Navigation Topbar */}
      <header style={{
        height: '64px',
        borderBottom: '1px solid var(--border-light)',
        background: 'var(--bg-glass)',
        backdropFilter: 'blur(16px)',
        position: 'sticky',
        top: 0,
        zIndex: 90,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px'
      }}>
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
            <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.05rem', color: 'var(--text-primary)', letterSpacing: '-0.03em' }}>
              FounderLedger
            </span>
          </Link>
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

          {/* Theme Toggle */}
          <button
            onClick={() => {
              const next = theme === 'dark' ? 'light' : 'dark';
              setTheme(next);
              document.documentElement.setAttribute('data-theme', next);
              localStorage.setItem('fl_theme', next);
            }}
            aria-label="Toggle Theme"
            style={{
              width: '34px',
              height: '34px',
              borderRadius: '8px',
              border: '1px solid var(--border-light)',
              background: 'var(--bg-subtle)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-secondary)',
              cursor: 'pointer'
            }}
          >
            {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
          </button>

          <Link to="/dashboard" className="btn btn-primary btn-sm" style={{ gap: '6px' }}>
            <LayoutDashboard size={14} />
            <span>Dashboard</span>
          </Link>
        </div>
      </header>

      {/* Main Calculator Content */}
      <main style={{ padding: '24px 0 64px 0' }}>
        <ValuationCalculator currency={currency} />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
