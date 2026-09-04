import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';
import { ShieldCheck, Search, Moon, Sun, Menu, X, ArrowRight, Zap, LayoutDashboard, User } from 'lucide-react';

export default function Navbar({ currency, setCurrency, theme, setTheme, onOpenCmd, onOpenVerify }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="navbar-fixed">
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
        
        {/* Brand Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }} aria-label="FounderLedger Home">
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            background: 'var(--brand-primary)',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(37, 99, 235, 0.35)'
          }}>
            <ShieldCheck size={20} strokeWidth={2.4} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.15rem', color: 'var(--text-primary)', letterSpacing: '-0.03em' }}>
              FounderLedger
            </span>
            <span style={{
              fontSize: '0.625rem',
              fontWeight: 800,
              background: 'var(--brand-soft)',
              color: 'var(--brand-primary)',
              padding: '2px 6px',
              borderRadius: '9999px',
              border: '1px solid var(--brand-border)',
              letterSpacing: '0.04em'
            }}>
              BHARAT
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '4px' }} className="hide-on-tablet">
          <Link to="/leaderboard" className="nav-link">Leaderboard</Link>
          <a href="/#verify-section" className="nav-link">Verification</a>
          <a href="/#marketplace-section" className="nav-link">M&A Deals</a>
          <a href="/#valuation-section" className="nav-link">Valuation</a>
          <a href="/#pricing-section" className="nav-link">Pricing</a>
          <SignedIn>
            <Link to="/dashboard" className="nav-link" style={{ color: 'var(--brand-primary)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
              <LayoutDashboard size={14} />
              <span>Dashboard</span>
            </Link>
          </SignedIn>
        </nav>

        {/* Nav Right Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          
          {/* Currency Toggle (₹ INR / $ USD) */}
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
                boxShadow: currency === 'INR' ? 'var(--shadow-xs)' : 'none',
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
                boxShadow: currency === 'USD' ? 'var(--shadow-xs)' : 'none',
                cursor: 'pointer',
                fontWeight: 600
              }}
            >
              $ USD
            </button>
          </div>

          {/* Command Palette Trigger */}
          <button
            onClick={onOpenCmd}
            className="hide-on-mobile"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 10px',
              background: 'var(--bg-muted)',
              border: '1px solid var(--border-light)',
              borderRadius: '8px',
              color: 'var(--text-muted)',
              fontSize: '0.75rem',
              cursor: 'pointer'
            }}
          >
            <Search size={13} />
            <span>Search</span>
            <kbd style={{ 
              background: 'var(--bg-surface)', 
              padding: '1px 5px', 
              borderRadius: '4px', 
              border: '1px solid var(--border-light)', 
              fontSize: '0.6875rem',
              fontWeight: 600
            }}>
              ⌘K
            </kbd>
          </button>

          {/* Dark/Light Theme Toggle */}
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label="Toggle Dark Mode"
            style={{
              width: '34px',
              height: '34px',
              borderRadius: '8px',
              border: '1px solid var(--border-light)',
              background: 'var(--bg-muted)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-secondary)',
              cursor: 'pointer'
            }}
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          {/* Authentication Actions */}
          <SignedOut>
            <Link to="/sign-in" className="btn btn-secondary btn-sm hide-on-mobile">
              <span>Sign In</span>
            </Link>
            <Link to="/sign-up" className="btn btn-primary btn-sm hide-on-mobile">
              <Zap size={14} />
              <span>Verify ARR</span>
            </Link>
          </SignedOut>

          <SignedIn>
            <Link to="/dashboard" className="btn btn-secondary btn-sm hide-on-mobile" style={{ gap: '6px' }}>
              <LayoutDashboard size={14} />
              <span>Console</span>
            </Link>
            {/* Clerk Profile Dropdown */}
            <UserButton afterSignOutUrl="/" />
          </SignedIn>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="hide-on-desktop"
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              border: '1px solid var(--border-light)',
              background: 'var(--bg-muted)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-primary)',
              cursor: 'pointer'
            }}
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{
              position: 'absolute',
              top: '72px',
              left: 0,
              right: 0,
              background: 'var(--bg-surface)',
              borderBottom: '1px solid var(--border-light)',
              padding: '16px 24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              boxShadow: 'var(--shadow-lg)'
            }}
          >
            <Link to="/leaderboard" onClick={() => setMobileMenuOpen(false)} className="nav-link">Leaderboard</Link>
            <a href="/#verify-section" onClick={() => setMobileMenuOpen(false)} className="nav-link">Verification</a>
            <a href="/#marketplace-section" onClick={() => setMobileMenuOpen(false)} className="nav-link">M&A Deals</a>
            <a href="/#valuation-section" onClick={() => setMobileMenuOpen(false)} className="nav-link">Valuation</a>
            <a href="/#pricing-section" onClick={() => setMobileMenuOpen(false)} className="nav-link">Pricing</a>
            
            <SignedIn>
              <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)} className="btn btn-primary" style={{ width: '100%' }}>
                <LayoutDashboard size={16} />
                <span>Founder Console</span>
              </Link>
            </SignedIn>

            <SignedOut>
              <Link to="/sign-in" onClick={() => setMobileMenuOpen(false)} className="btn btn-secondary" style={{ width: '100%' }}>
                <span>Sign In</span>
              </Link>
              <Link to="/sign-up" onClick={() => setMobileMenuOpen(false)} className="btn btn-primary" style={{ width: '100%' }}>
                <ShieldCheck size={16} />
                <span>Verify My Startup</span>
              </Link>
            </SignedOut>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
