import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, ArrowRight, CheckCircle2, Copy, RefreshCw, Terminal, Check, Zap, CreditCard, FileText } from 'lucide-react';

export default function VerificationSimulator({ currency }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedGateway, setSelectedGateway] = useState('razorpay');
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState([]);
  const [copied, setCopied] = useState(false);
  const [hash, setHash] = useState('FL-2026-IN-99B4');

  const startReconciliation = () => {
    setCurrentStep(2);
    setProgress(0);
    setLogs([]);

    const simulationLogs = [
      { text: "Connecting to Razorpay Webhook OAuth 2.0 endpoint...", time: "0.2s", pct: 20 },
      { text: "Ingesting 1,240 subscription invoice receipts across 12 months...", time: "0.8s", pct: 40 },
      { text: "Scrubbing test mode transactions, chargebacks, and refund entries...", time: "1.4s", pct: 60 },
      { text: "Validating GSTR-1 GSTIN electronic filing match (Reconciliation: 100%)...", time: "2.1s", pct: 85 },
      { text: "Generating SHA-256 Ledger Block #FL-2026-IN-99B4...", time: "2.8s", pct: 100 },
      { text: "SUCCESS: Triple-Lock Verification Complete. Certified ARR: ₹18.5 Lakhs/mo", time: "3.2s", pct: 100 }
    ];

    simulationLogs.forEach((log, index) => {
      setTimeout(() => {
        setLogs((prev) => [...prev, log]);
        setProgress(log.pct);

        if (index === simulationLogs.length - 1) {
          setTimeout(() => {
            const randomHash = `FL-2026-IN-${Math.floor(1000 + Math.random() * 9000).toString(16).toUpperCase()}`;
            setHash(randomHash);
            setCurrentStep(3);
          }, 800);
        }
      }, (index + 1) * 600);
    });
  };

  const embedCode = `<a href="https://founderledger.in/verify/${hash}" target="_blank">\n  <img src="https://img.founderledger.in/badge/${hash}.svg" alt="FounderLedger Verified Revenue" width="180" />\n</a>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(embedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section style={{ padding: '5.5rem 0', background: 'linear-gradient(180deg, var(--bg-canvas) 0%, var(--bg-subtle) 100%)', borderTop: '1px solid var(--border-light)', borderBottom: '1px solid var(--border-light)' }} id="verify-section">
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 3rem auto' }}>
          <span style={{
            display: 'inline-block',
            fontSize: '0.75rem',
            fontWeight: 800,
            color: 'var(--brand-primary)',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            background: 'var(--brand-soft)',
            padding: '4px 14px',
            borderRadius: '9999px',
            marginBottom: '0.85rem'
          }}>
            INTERACTIVE VERIFICATION ENGINE
          </span>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '1rem', letterSpacing: '-0.03em' }}>
            How Verification Works in 3 Simple Steps
          </h2>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)' }}>
            Experience our automated Triple-Lock audit engine right now in interactive sandbox mode.
          </p>
        </div>

        {/* Wizard Card Container */}
        <div className="glass-card-elevated" style={{ maxWidth: '920px', margin: '0 auto', overflow: 'hidden' }}>
          {/* Wizard Step Tabs */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', background: 'var(--bg-subtle)', borderBottom: '1px solid var(--border-light)' }}>
            {[
              { num: 1, title: 'Connect Gateways' },
              { num: 2, title: 'Triple-Lock Audit' },
              { num: 3, title: 'Claim Verified Seal' }
            ].map(step => (
              <div
                key={step.num}
                style={{
                  padding: '1.25rem 1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  borderBottom: currentStep === step.num ? '2px solid var(--brand-primary)' : '2px solid transparent',
                  background: currentStep === step.num ? 'var(--bg-card)' : 'transparent',
                  color: currentStep === step.num ? 'var(--brand-primary)' : currentStep > step.num ? 'var(--success-dark)' : 'var(--text-muted)',
                  fontWeight: 700,
                  fontSize: '0.85rem'
                }}
              >
                <span style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.75rem',
                  background: currentStep === step.num ? 'var(--brand-primary)' : currentStep > step.num ? 'var(--success)' : 'var(--border-light)',
                  color: currentStep >= step.num ? '#FFFFFF' : 'var(--text-secondary)'
                }}>
                  {currentStep > step.num ? '✓' : step.num}
                </span>
                <span>{step.title}</span>
              </div>
            ))}
          </div>

          {/* Wizard Body */}
          <div style={{ padding: '2.5rem' }}>
            {/* Step 1: Selection */}
            {currentStep === 1 && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '0.5rem' }}>
                  Step 1: Choose Your Primary Payment Source
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                  We only request read-only permissions to audit settled transactions and cross-verify with GSTN.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                  <div
                    onClick={() => setSelectedGateway('razorpay')}
                    style={{
                      padding: '1.25rem',
                      borderRadius: '16px',
                      background: selectedGateway === 'razorpay' ? 'var(--bg-card)' : 'var(--bg-subtle)',
                      border: selectedGateway === 'razorpay' ? '2px solid var(--brand-primary)' : '1px solid var(--border-light)',
                      boxShadow: selectedGateway === 'razorpay' ? 'var(--shadow-md)' : 'none',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#0C2340', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, marginBottom: '0.75rem' }}>
                      <CreditCard size={20} />
                    </div>
                    <strong style={{ display: 'block', fontSize: '1rem', marginBottom: '4px' }}>Razorpay Subscriptions</strong>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Read-only OAuth connection. Auto-detects active plans and refunds.</span>
                  </div>

                  <div
                    onClick={() => setSelectedGateway('phonepe')}
                    style={{
                      padding: '1.25rem',
                      borderRadius: '16px',
                      background: selectedGateway === 'phonepe' ? 'var(--bg-card)' : 'var(--bg-subtle)',
                      border: selectedGateway === 'phonepe' ? '2px solid var(--brand-primary)' : '1px solid var(--border-light)',
                      boxShadow: selectedGateway === 'phonepe' ? 'var(--shadow-md)' : 'none',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#5F259F', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, marginBottom: '0.75rem' }}>
                      <Zap size={20} />
                    </div>
                    <strong style={{ display: 'block', fontSize: '1rem', marginBottom: '4px' }}>PhonePe & UPI QR</strong>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Direct merchant terminal feed for UPI AutoPay and QR settlements.</span>
                  </div>

                  <div
                    onClick={() => setSelectedGateway('gst')}
                    style={{
                      padding: '1.25rem',
                      borderRadius: '16px',
                      background: selectedGateway === 'gst' ? 'var(--bg-card)' : 'var(--bg-subtle)',
                      border: selectedGateway === 'gst' ? '2px solid var(--brand-primary)' : '1px solid var(--border-light)',
                      boxShadow: selectedGateway === 'gst' ? 'var(--shadow-md)' : 'none',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#059669', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, marginBottom: '0.75rem' }}>
                      <FileText size={20} />
                    </div>
                    <strong style={{ display: 'block', fontSize: '1rem', marginBottom: '4px' }}>GSTIN E-Invoice JSON</strong>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Upload filed GSTR-1 returns or connect direct GSTN sandbox API.</span>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <button onClick={startReconciliation} className="btn btn-primary btn-lg">
                    <span>Run Sandbox Triple-Lock Audit</span>
                    <ArrowRight size={18} />
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 2: Live Engine Console */}
            {currentStep === 2 && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <Terminal size={20} color="var(--brand-primary)" />
                  <h3 style={{ fontSize: '1.35rem', fontWeight: 800 }}>Reconciliation Engine Running...</h3>
                </div>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                  Scrubbing test mode transactions, validating GST invoices, and hashing verified metrics.
                </p>

                {/* Progress Bar */}
                <div style={{ width: '100%', height: '8px', background: 'var(--border-light)', borderRadius: '9999px', overflow: 'hidden', marginBottom: '1.25rem' }}>
                  <div style={{ width: `${progress}%`, height: '100%', background: 'var(--brand-primary)', transition: 'width 0.3s ease' }} />
                </div>

                {/* Terminal Console */}
                <div style={{
                  background: '#090E1A',
                  borderRadius: '16px',
                  padding: '1.25rem',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.825rem',
                  color: '#10B981',
                  minHeight: '180px',
                  maxHeight: '240px',
                  overflowY: 'auto',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem'
                }}>
                  {logs.map((l, i) => (
                    <div key={i} style={{ display: 'flex', gap: '0.75rem' }}>
                      <span style={{ color: '#64748B' }}>[+{l.time}]</span>
                      <span>{l.text}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 3: Verified Badge Output */}
            {currentStep === 3 && (
              <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: 'center' }}>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  background: '#0F172A',
                  color: '#FFFFFF',
                  padding: '0.85rem 1.75rem',
                  borderRadius: '9999px',
                  border: '2px solid #3B82F6',
                  boxShadow: '0 12px 30px rgba(37, 99, 235, 0.35)',
                  marginBottom: '1.75rem'
                }}>
                  <ShieldCheck size={26} color="#10B981" strokeWidth={2.5} />
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontSize: '0.65rem', color: '#94A3B8', textTransform: 'uppercase', fontWeight: 800, letterSpacing: '0.05em' }}>
                      FOUNDERLEDGER AUDITED
                    </div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.1rem', fontWeight: 800 }}>
                      ₹18.5L/mo VERIFIED ARR
                    </div>
                  </div>
                </div>

                <h3 style={{ fontSize: '1.5rem', fontWeight: 900, marginBottom: '0.5rem' }}>
                  Congratulations! Your Startup Revenue is Certified.
                </h3>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', maxWidth: '560px', margin: '0 auto 1.75rem auto' }}>
                  Your cryptographic audit hash <strong>{hash}</strong> is recorded on the Bharat Founder Ledger. Embed this badge on your site to increase buyer & investor trust.
                </p>

                {/* Embed Code Box */}
                <div style={{ maxWidth: '640px', margin: '0 auto 1.5rem auto', textAlign: 'left' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '6px' }}>
                    <span>EMBEDDABLE HTML CODE:</span>
                    <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--brand-primary)' }}>{hash}</span>
                  </div>
                  <div style={{ position: 'relative' }}>
                    <textarea
                      readOnly
                      value={embedCode}
                      rows={3}
                      style={{
                        width: '100%',
                        padding: '0.85rem',
                        background: 'var(--bg-subtle)',
                        border: '1px solid var(--border-light)',
                        borderRadius: '12px',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.8rem',
                        color: 'var(--text-primary)',
                        resize: 'none'
                      }}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                  <button onClick={handleCopy} className="btn btn-primary">
                    {copied ? <Check size={16} /> : <Copy size={16} />}
                    <span>{copied ? 'Copied to Clipboard!' : 'Copy Embed Code'}</span>
                  </button>
                  <button onClick={() => setCurrentStep(1)} className="btn btn-secondary">
                    <RefreshCw size={16} />
                    <span>Test Another Integration</span>
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
