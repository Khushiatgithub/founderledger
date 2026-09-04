import React from 'react';
import { SignUp } from '@clerk/clerk-react';
import { ShieldCheck, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function SignUpPage() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--bg-canvas)',
      padding: '24px',
      position: 'relative'
    }}>
      {/* Background Ambience */}
      <div className="bg-grid-ambient" aria-hidden="true" />
      <div className="ambient-blue-glow" aria-hidden="true" />

      {/* Top Header */}
      <div style={{ marginBottom: '24px', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none', marginBottom: '16px' }}>
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
          <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.25rem', color: 'var(--text-primary)', letterSpacing: '-0.03em' }}>
            FounderLedger
          </span>
        </Link>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
          Create your verified founder profile and connect your revenue stack.
        </p>
      </div>

      {/* Clerk Sign Up Component */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <SignUp 
          routing="path" 
          path="/sign-up" 
          signInUrl="/sign-in" 
          forceRedirectUrl="/dashboard"
        />
      </div>

      {/* Back to Home Link */}
      <div style={{ marginTop: '24px', position: 'relative', zIndex: 1 }}>
        <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.8125rem', color: 'var(--text-muted)', textDecoration: 'none', fontWeight: 500 }}>
          <ArrowLeft size={14} />
          <span>Back to FounderLedger Home</span>
        </Link>
      </div>
    </div>
  );
}
