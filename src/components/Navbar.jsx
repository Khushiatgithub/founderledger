import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Search, Moon, Sun, Menu, X, ArrowRight, Zap } from 'lucide-react';

export default function Navbar({ currency, setCurrency, theme, setTheme, onOpenCmd, onOpenVerify }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="site-header-fixed">
      <div className="container nav-row">
        {/* Brand Logo */}
        <a href="#" className="brand-link" aria-label="FounderLedger Home">
          <div className="brand-logo-icon">
            <ShieldCheck size={22} strokeWidth={2.5} />
          </div>
          <span>FounderLedger</span>
          <span style={{
            fontSize: '0.65rem',
            fontWeight: 800,
            background: 'var(--success-soft)',
            color: 'var(--success-dark)',
            padding: '2px 8px',
            borderRadius: '9999px',
            border: '1px solid var(--success-border)',
            letterSpacing: '0.04em',
            textTransform: 'uppercase'
          }}>
            BHARAT
          </span>
        </a>

        {/* Desktop Nav Links */}
        <nav className="desktop-nav" style={{ display: 'none' }} id="desktop-nav">
          <ul className="nav-menu-list">
            <li><a href="#leaderboard-section" className="nav-item-link">Leaderboard</a></li>
            <li><a href="#verify-section" className="nav-item-link">Verify Revenue</a></li>
            <li><a href="#marketplace-section" className="nav-item-link">Marketplace</a></li>
            <li><a href="#valuation-section" className="nav-item-link">Valuation Engine</a></li>
            <li><a href="#why-us-section" className="nav-item-link">Trust Engine</a></li>
            <li><a href="#pricing-section" className="nav-item-link">Pricing</a></li>
          </ul>
        </nav>

        {/* Nav Controls & Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {/* Currency Switcher */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            background: 'var(--bg-subtle)',
            border: '1px solid var(--border-light)',
            borderRadius: '9999px',
            padding: '2px',
            fontSize: '0.8rem',
            fontWeight: 600
          }}>
            <button
              onClick={() => setCurrency('INR')}
              style={{
                padding: '4px 10px',
                borderRadius: '9999px',
                background: currency === 'INR' ? 'var(--bg-card)' : 'transparent',
                color: currency === 'INR' ? 'var(--text-primary)' : 'var(--text-muted)',
                boxShadow: currency === 'INR' ? 'var(--shadow-xs)' : 'none',
                transition: 'all 0.2s'
              }}
            >
              ₹ INR
            </button>
            <button
              onClick={() => setCurrency('USD')}
              style={{
                padding: '4px 10px',
                borderRadius: '9999px',
                background: currency === 'USD' ? 'var(--bg-card)' : 'transparent',
                color: currency === 'USD' ? 'var(--text-primary)' : 'var(--text-muted)',
                boxShadow: currency === 'USD' ? 'var(--shadow-xs)' : 'none',
                transition: 'all 0.2s'
              }}
            >
              $ USD
            </button>
          </div>

          {/* Command Palette Trigger */}
          <button
            onClick={onOpenCmd}
            className="cmd-btn"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.45rem 0.85rem',
              background: 'var(--bg-subtle)',
              border: '1px solid var(--border-light)',
              borderRadius: '10px',
              color: 'var(--text-muted)',
              fontSize: '0.85rem',
              transition: 'all 0.2s'
            }}
          >
            <Search size={14} />
            <span className="cmd-text-label" style={{ display: 'none' }}>Search</span>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.7rem',
              background: 'var(--bg-card)',
              border: '1px solid var(--border-light)',
              padding: '1px 5px',
              borderRadius: '4px'
            }}>
              ⌘K
            </span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            aria-label="Toggle Theme"
            style={{
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '10px',
              border: '1px solid var(--border-light)',
              background: 'var(--bg-card)',
              color: 'var(--text-secondary)'
            }}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Primary CTA */}
          <button
            onClick={onOpenVerify}
            className="btn btn-primary btn-sm"
            style={{ display: 'none' }}
            id="nav-verify-btn"
          >
            <ShieldCheck size={16} strokeWidth={2.5} />
            <span>Verify Startup</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-menu-btn"
            style={{
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '10px',
              border: '1px solid var(--border-light)',
              background: 'var(--bg-card)'
            }}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{
              background: 'var(--bg-card-elevated)',
              borderBottom: '1px solid var(--border-light)',
              overflow: 'hidden'
            }}
          >
            <div className="container" style={{ padding: '1.5rem 1rem' }}>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <li><a href="#leaderboard-section" onClick={() => setMobileMenuOpen(false)} className="nav-item-link" style={{ display: 'block', padding: '0.5rem 0' }}>Leaderboard</a></li>
                <li><a href="#verify-section" onClick={() => setMobileMenuOpen(false)} className="nav-item-link" style={{ display: 'block', padding: '0.5rem 0' }}>Verify Revenue</a></li>
                <li><a href="#marketplace-section" onClick={() => setMobileMenuOpen(false)} className="nav-item-link" style={{ display: 'block', padding: '0.5rem 0' }}>Marketplace</a></li>
                <li><a href="#valuation-section" onClick={() => setMobileMenuOpen(false)} className="nav-item-link" style={{ display: 'block', padding: '0.5rem 0' }}>Valuation Engine</a></li>
                <li><a href="#why-us-section" onClick={() => setMobileMenuOpen(false)} className="nav-item-link" style={{ display: 'block', padding: '0.5rem 0' }}>Trust Engine</a></li>
                <li><a href="#pricing-section" onClick={() => setMobileMenuOpen(false)} className="nav-item-link" style={{ display: 'block', padding: '0.5rem 0' }}>Pricing</a></li>
              </ul>
              <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--border-light)' }}>
                <button
                  onClick={() => { setMobileMenuOpen(false); onOpenVerify(); }}
                  className="btn btn-primary w-full"
                >
                  <ShieldCheck size={18} strokeWidth={2.5} />
                  <span>Verify My Startup (Free)</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (min-width: 900px) {
          #desktop-nav { display: block !important; }
          #nav-verify-btn { display: inline-flex !important; }
          .cmd-text-label { display: inline !important; }
          .mobile-menu-btn { display: none !important; }
        }
      `}</style>
    </header>
  );
}
