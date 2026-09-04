import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Lock, CheckCircle2, ShieldCheck } from 'lucide-react';
import { formatCurrency, formatExactCurrency } from '../../utils/formatters';

export default function DealRoomModal({ deal, startup, onClose, currency }) {
  const [submitted, setSubmitted] = useState(false);
  const [buyerName, setBuyerName] = useState('');
  const [workEmail, setWorkEmail] = useState('');
  const [agreed, setAgreed] = useState(false);

  if (!deal && !startup) return null;
  const s = startup || {};
  const d = deal || {};

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.25 }}
        onClick={(e) => e.stopPropagation()}
        className="modal-content-card"
        style={{ maxWidth: '640px' }}
      >
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1.25rem 1.75rem',
          borderBottom: '1px solid var(--border-light)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Lock size={18} color="var(--success-dark)" strokeWidth={2.5} />
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800 }}>Acquisition Deal Room (Mutual NDA)</h3>
          </div>
          <button onClick={onClose} style={{ width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
            <X size={20} />
          </button>
        </div>

        <div style={{ padding: '1.75rem' }}>
          {!submitted ? (
            <>
              <div style={{ marginBottom: '1.5rem' }}>
                <span className="badge-verified" style={{ marginBottom: '0.5rem' }}>
                  <ShieldCheck size={12} strokeWidth={2.5} />
                  ICICI Escrow Protected Deal Room
                </span>
                <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.25rem' }}>
                  Acquisition Room: {s.name || d.title}
                </h2>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                  Sign the mutual NDA to access audited GST e-invoices, AWS cost breakdown, code repository audit, and submit a binding Letter of Intent (LOI).
                </p>
              </div>

              <div style={{
                background: 'var(--bg-subtle)',
                borderRadius: '16px',
                padding: '1.25rem',
                marginBottom: '1.5rem',
                border: '1px solid var(--border-light)'
              }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
                  <div>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Asking Price:</span>
                    <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--brand-primary)', fontFamily: 'var(--font-mono)' }}>
                      {formatCurrency(s.askingPrice || d.askingPrice, currency)}
                    </div>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>TTM Revenue:</span>
                    <div style={{ fontSize: '1.15rem', fontWeight: 800, fontFamily: 'var(--font-mono)' }}>
                      {formatCurrency(d.ttmRevenue || s.arr, currency)}
                    </div>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Escrow Fee:</span>
                    <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--success-dark)' }}>
                      1.5% Closing
                    </div>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '4px' }}>Buyer Name / Entity</label>
                  <input
                    type="text"
                    required
                    value={buyerName}
                    onChange={(e) => setBuyerName(e.target.value)}
                    placeholder="e.g. Acme Capital Ventures / Solo Operator"
                    style={{ width: '100%', padding: '0.75rem 1rem', border: '1px solid var(--border-light)', borderRadius: '10px', background: 'var(--bg-card)', color: 'var(--text-primary)', fontSize: '0.9rem' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '4px' }}>Work Email</label>
                  <input
                    type="email"
                    required
                    value={workEmail}
                    onChange={(e) => setWorkEmail(e.target.value)}
                    placeholder="buyer@fund.in"
                    style={{ width: '100%', padding: '0.75rem 1rem', border: '1px solid var(--border-light)', borderRadius: '10px', background: 'var(--bg-card)', color: 'var(--text-primary)', fontSize: '0.9rem' }}
                  />
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', fontSize: '0.8rem', color: 'var(--text-muted)', margin: '0.5rem 0' }}>
                  <input
                    type="checkbox"
                    required
                    id="nda-checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    style={{ marginTop: '3px', cursor: 'pointer' }}
                  />
                  <label htmlFor="nda-checkbox" style={{ cursor: 'pointer' }}>
                    I agree to the Standard Indian Tech M&A Non-Disclosure Agreement (NDA) and understand all financial metrics are verified under the Indian Contract Act 1872.
                  </label>
                </div>

                <button type="submit" className="btn btn-primary w-full btn-lg">
                  <Lock size={16} />
                  <span>Sign NDA & Unlock Private Data Room</span>
                </button>
              </form>
            </>
          ) : (
            <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'var(--success-soft)', color: 'var(--success-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem auto' }}>
                <CheckCircle2 size={32} strokeWidth={2.5} />
              </div>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 900, marginBottom: '0.5rem' }}>Mutual NDA Signed!</h3>
              <p style={{ fontSize: '0.925rem', color: 'var(--text-secondary)', marginBottom: '1.75rem', lineHeight: 1.6 }}>
                Your private access token for <strong>{s.name || d.title}</strong> has been dispatched to <strong>{workEmail}</strong>. A FounderLedger Escrow representative will initiate the formal introduction on WhatsApp & Email within 2 business hours.
              </p>
              <button onClick={onClose} className="btn btn-secondary">
                Return to Marketplace
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
