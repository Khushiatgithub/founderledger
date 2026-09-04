import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Copy, 
  RefreshCw, 
  Terminal, 
  Check, 
  Zap, 
  CreditCard, 
  FileText,
  Key,
  Database,
  Lock,
  ExternalLink,
  Code,
  Download,
  Sparkles,
  Loader2
} from 'lucide-react';

export default function VerificationSimulator({ currency }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedGateway, setSelectedGateway] = useState('razorpay');
  const [gstinInput, setGstinInput] = useState('29AAACD4982R1Z8');
  const [apiKeyInput, setApiKeyInput] = useState('rzp_live_9x8kL2n0a1Pq');
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState([]);
  const [copied, setCopied] = useState(false);
  const [badgeTheme, setBadgeTheme] = useState('light');
  const [hash, setHash] = useState('FL-2026-KA-88A92F');

  const autofillSample = () => {
    setSelectedGateway('razorpay');
    setApiKeyInput('rzp_live_sub_8829f00192a');
    setGstinInput('29AAACD4982R1Z8');
  };

  const startReconciliation = () => {
    setCurrentStep(2);
    setProgress(0);
    setLogs([]);

    const simulationLogs = [
      { text: "Establishing read-only OAuth 2.0 tunnel to Razorpay API (rzp_live)...", time: "0.2s", pct: 15 },
      { text: "Fetching active subscription plans, AutoPay VPAs, and settlement batches...", time: "0.6s", pct: 35 },
      { text: "Scrubbing test tokens, refunds, chargebacks, and gateway transaction fees...", time: "1.1s", pct: 55 },
      { text: "Validating GSTR-3B filed returns against MCA CIN (29AAACD4982R1Z8)...", time: "1.7s", pct: 75 },
      { text: "Cross-reconciling ICICI merchant bank settlements (100% Zero Discrepancy)...", time: "2.3s", pct: 90 },
      { text: "SUCCESS: SHA-256 Ledger Block Minted. Certified ARR: ₹2.22 Cr ARR", time: "2.8s", pct: 100 }
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
          }, 600);
        }
      }, (index + 1) * 500);
    });
  };

  const embedCode = `<a href="https://founderledger.in/verify/${hash}" target="_blank" rel="noopener">\n  <img src="https://img.founderledger.in/badge/${hash}-${badgeTheme}.svg" alt="FounderLedger Triple-Lock Verified Revenue" width="210" height="56" />\n</a>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(embedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section className="section-wrapper" style={{ background: 'var(--bg-subtle)', borderTop: '1px solid var(--border-light)', borderBottom: '1px solid var(--border-light)' }} id="verify-section">
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <span className="badge badge-brand" style={{ marginBottom: '12px' }}>
            <Zap size={13} />
            <span>INTERACTIVE VERIFICATION ENGINE</span>
          </span>
          <h2 style={{ marginBottom: '12px' }}>
            How Verification Works in 3 Simple Steps
          </h2>
          <p className="lead-text">
            Experience our automated Triple-Lock verification pipeline in interactive sandbox mode. Test with simulated Razorpay credentials.
          </p>
        </div>

        {/* 3-Step Pipeline Visual Connector */}
        <div className="verification-pipeline" style={{ maxWidth: '960px', margin: '0 auto 32px auto' }}>
          {[
            { step: 1, title: 'Connect Gateways & GSTIN', desc: 'Secure read-only API connection to Razorpay, Cashfree or Stripe.' },
            { step: 2, title: 'AI Automated Audit', desc: 'Auto-reconciles 10,000+ invoices against filed GSTR-3B tax returns.' },
            { step: 3, title: 'Mint Proof of Revenue', desc: 'Receive your cryptographic seal and public ledger verification URL.' }
          ].map(item => (
            <div 
              key={item.step} 
              className={`pipeline-step-card ${currentStep === item.step ? 'active-step' : ''}`}
            >
              <div className={`step-number-badge ${currentStep >= item.step ? 'active' : ''}`}>
                {currentStep > item.step ? <Check size={18} /> : item.step}
              </div>
              <div style={{ fontWeight: 700, fontSize: '0.9375rem', color: 'var(--text-primary)', marginBottom: '4px' }}>
                {item.title}
              </div>
              <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                {item.desc}
              </div>
            </div>
          ))}
        </div>

        {/* Wizard Interactive Body */}
        <div className="glass-card-elevated" style={{ maxWidth: '960px', margin: '0 auto', overflow: 'hidden' }}>
          
          <div style={{ padding: '32px' }}>
            {/* STEP 1: Connect Gateway & GSTIN */}
            {currentStep === 1 && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
                  <div>
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '4px' }}>Step 1: Connect Your Revenue Stack</h3>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                      Select your primary Indian payment gateway and provide your business GSTIN for cross-verification.
                    </p>
                  </div>
                  <button
                    onClick={autofillSample}
                    className="btn btn-secondary btn-sm"
                    style={{ gap: '6px' }}
                  >
                    <Sparkles size={13} style={{ color: 'var(--brand-primary)' }} />
                    <span>Autofill Sample Test Credentials</span>
                  </button>
                </div>

                {/* Gateway Selector Cards */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', marginBottom: '24px' }}>
                  {[
                    { id: 'razorpay', name: 'Razorpay', label: 'Primary Gateway (Recommended)' },
                    { id: 'cashfree', name: 'Cashfree Payments', label: 'Payouts & AutoPay' },
                    { id: 'stripe', name: 'Stripe India', label: 'Global Subscriptions' }
                  ].map(gw => (
                    <div
                      key={gw.id}
                      onClick={() => setSelectedGateway(gw.id)}
                      style={{
                        padding: '16px',
                        borderRadius: '12px',
                        border: selectedGateway === gw.id ? '2px solid var(--brand-primary)' : '1px solid var(--border-light)',
                        background: selectedGateway === gw.id ? 'var(--brand-soft)' : 'var(--bg-subtle)',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <div style={{ fontWeight: 700, fontSize: '0.9375rem', color: 'var(--text-primary)', marginBottom: '4px' }}>
                        {gw.name}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        {gw.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Credentials Input Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '6px' }}>
                      Razorpay API Key ID (Read-Only)
                    </label>
                    <input
                      type="text"
                      value={apiKeyInput}
                      onChange={(e) => setApiKeyInput(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        background: 'var(--bg-subtle)',
                        border: '1px solid var(--border-light)',
                        borderRadius: '8px',
                        fontSize: '0.875rem',
                        fontFamily: 'var(--font-mono)',
                        color: 'var(--text-primary)',
                        outline: 'none'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '6px' }}>
                      Business GSTIN (Govt. Registered)
                    </label>
                    <input
                      type="text"
                      value={gstinInput}
                      onChange={(e) => setGstinInput(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        background: 'var(--bg-subtle)',
                        border: '1px solid var(--border-light)',
                        borderRadius: '8px',
                        fontSize: '0.875rem',
                        fontFamily: 'var(--font-mono)',
                        color: 'var(--text-primary)',
                        outline: 'none'
                      }}
                    />
                  </div>
                </div>

                {/* Privacy Guarantee */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 16px', background: 'var(--bg-subtle)', borderRadius: '10px', border: '1px solid var(--border-light)', marginBottom: '24px' }}>
                  <Lock size={16} style={{ color: 'var(--success-dark)', flexShrink: 0 }} />
                  <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                    <strong>Zero-Trust Guarantee:</strong> FounderLedger only requests read-only subscription and invoice permissions. We never store bank passwords or raw customer card numbers.
                  </span>
                </div>

                <button onClick={startReconciliation} className="btn btn-primary btn-lg" style={{ width: '100%' }}>
                  <Zap size={18} />
                  <span>Run Automated Triple-Lock Audit</span>
                </button>
              </motion.div>
            )}

            {/* STEP 2: Live AI Reconciliation Logs */}
            {currentStep === 2 && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div style={{ marginBottom: '20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Loader2 size={16} className="animate-spin" style={{ color: 'var(--brand-primary)' }} />
                      <h3 style={{ fontSize: '1.25rem' }}>Step 2: AI Reconciliation in Progress</h3>
                    </div>
                    <span style={{ fontWeight: 700, color: 'var(--brand-primary)', fontFamily: 'var(--font-mono)' }}>{progress}% Complete</span>
                  </div>
                  {/* Progress Bar */}
                  <div style={{ width: '100%', height: '8px', background: 'var(--bg-muted)', borderRadius: '9999px', overflow: 'hidden' }}>
                    <div 
                      style={{ 
                        width: `${progress}%`, 
                        height: '100%', 
                        background: 'var(--brand-primary)', 
                        borderRadius: '9999px', 
                        transition: 'width 0.4s ease' 
                      }} 
                    />
                  </div>
                </div>

                {/* Terminal Log Console */}
                <div style={{
                  background: '#090D16',
                  color: '#10B981',
                  borderRadius: '12px',
                  padding: '18px 20px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.8125rem',
                  minHeight: '220px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                  boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.4)',
                  border: '1px solid #1E293B'
                }}>
                  <div style={{ color: '#64748B', display: 'flex', alignItems: 'center', gap: '6px', borderBottom: '1px solid #1E293B', paddingBottom: '8px', marginBottom: '4px' }}>
                    <Terminal size={14} />
                    <span>FounderLedger Triple-Lock Audit Engine v2.4 (Live Sandbox)</span>
                  </div>
                  {logs.map((log, index) => (
                    <div key={index} style={{ display: 'flex', gap: '10px' }}>
                      <span style={{ color: '#64748B' }}>[{log.time}]</span>
                      <span style={{ color: index === logs.length - 1 ? '#FFFFFF' : '#93C5FD' }}>{log.text}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* STEP 3: Minted Seal & Embed Snippet */}
            {currentStep === 3 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35 }}
              >
                <div style={{ textAlign: 'center', marginBottom: '28px' }}>
                  <div style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    background: 'var(--success-soft)',
                    color: 'var(--success-dark)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 16px auto',
                    border: '1px solid var(--success-border)'
                  }}>
                    <ShieldCheck size={36} />
                  </div>
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '6px' }}>
                    Triple-Lock Verification Complete!
                  </h3>
                  <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)' }}>
                    Your cryptographic revenue seal is live and indexed on the public ledger.
                  </p>
                </div>

                {/* Badge Preview Card */}
                <div style={{
                  background: 'var(--bg-subtle)',
                  border: '1px solid var(--border-light)',
                  borderRadius: '16px',
                  padding: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '16px',
                  marginBottom: '24px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div style={{
                      padding: '12px 18px',
                      background: badgeTheme === 'dark' ? '#090D16' : '#FFFFFF',
                      color: badgeTheme === 'dark' ? '#FFFFFF' : '#090E1A',
                      border: '1.5px solid var(--brand-primary)',
                      borderRadius: '12px',
                      boxShadow: '0 4px 14px rgba(37, 99, 235, 0.18)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px'
                    }}>
                      <ShieldCheck size={24} style={{ color: 'var(--brand-primary)' }} />
                      <div>
                        <div style={{ fontSize: '0.6875rem', fontWeight: 800, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                          FOUNDERLEDGER VERIFIED
                        </div>
                        <div style={{ fontSize: '1.1rem', fontWeight: 900 }}>
                          ₹2.22 Cr ARR
                        </div>
                      </div>
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.9375rem', color: 'var(--text-primary)' }}>
                        Proof Block ID
                      </div>
                      <div style={{ fontSize: '0.8125rem', fontFamily: 'var(--font-mono)', color: 'var(--brand-primary)' }}>
                        #{hash}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {/* Badge Theme Switcher */}
                    <button
                      onClick={() => setBadgeTheme(badgeTheme === 'light' ? 'dark' : 'light')}
                      className="btn btn-secondary btn-sm"
                    >
                      <span>{badgeTheme === 'light' ? 'Switch to Dark Badge' : 'Switch to Light Badge'}</span>
                    </button>
                    <button 
                      onClick={() => { setCurrentStep(1); setLogs([]); setProgress(0); }}
                      className="btn btn-outline btn-sm"
                    >
                      <RefreshCw size={13} />
                      <span>Re-Run Test</span>
                    </button>
                  </div>
                </div>

                {/* Embed Code Snippet */}
                <div style={{ marginBottom: '24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                      Embed Badge on Your Website / Footer
                    </span>
                    <button 
                      onClick={handleCopy} 
                      className="btn btn-secondary btn-sm"
                      style={{ padding: '4px 10px', fontSize: '0.75rem' }}
                    >
                      {copied ? <Check size={13} style={{ color: 'var(--success-dark)' }} /> : <Copy size={13} />}
                      <span>{copied ? 'Copied to Clipboard' : 'Copy HTML Snippet'}</span>
                    </button>
                  </div>
                  <pre style={{
                    background: '#090D16',
                    color: '#93C5FD',
                    padding: '14px',
                    borderRadius: '8px',
                    fontSize: '0.75rem',
                    fontFamily: 'var(--font-mono)',
                    overflowX: 'auto',
                    border: '1px solid #1E293B'
                  }}>
                    <code>{embedCode}</code>
                  </pre>
                </div>

              </motion.div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
