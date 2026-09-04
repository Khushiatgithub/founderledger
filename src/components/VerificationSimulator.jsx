import React, { useState, useEffect } from 'react';
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
  Loader2,
  TrendingUp,
  Users,
  Eye,
  EyeOff,
  Building2,
  Share2,
  RotateCcw
} from 'lucide-react';
import { formatCurrency } from '../utils/formatters';

const SAMPLE_TXN_FEED = [
  { company: 'Zepto Logistics', amount: 45000, source: 'Razorpay Subscriptions', status: 'Captured', vpa: 'zepto@icici' },
  { company: 'Swiggy Instamart', amount: 124000, source: 'ICICI Bank Wire', status: 'Settled', vpa: 'swiggy@hdfcbank' },
  { company: 'CRED Club', amount: 18500, source: 'UPI AutoPay', status: 'Reconciled', vpa: 'cred@axisbank' },
  { company: 'Groww Capital', amount: 84000, source: 'Razorpay Subscriptions', status: 'Captured', vpa: 'groww@kotak' },
  { company: 'Postman Dev', amount: 29999, source: 'Stripe India', status: 'Settled', vpa: 'postman@stripe' },
  { company: 'Meesho Store', amount: 62500, source: 'UPI AutoPay', status: 'Reconciled', vpa: 'meesho@ybl' },
  { company: 'Unacademy Plus', amount: 48000, source: 'UPI AutoPay', status: 'Captured', vpa: 'unacademy@okaxis' },
  { company: 'Razorpay Labs', amount: 95000, source: 'Razorpay Subscriptions', status: 'Settled', vpa: 'rzplabs@icici' }
];

export default function VerificationSimulator({ currency = 'INR' }) {
  const [step, setStep] = useState(1); // 1: Connect, 2: Sync 247, 3: Calculate MRR, 4: Show ARR, 5: Badge Issued
  const [apiKeyInput, setApiKeyInput] = useState('rzp_live_sub_8829f00192a');
  const [secretInput, setSecretInput] = useState('sec_live_9x8kL2n0a1Pq88z');
  const [showSecret, setShowSecret] = useState(false);
  const [gstinInput, setGstinInput] = useState('29AAACD4982R1Z8');
  const [companyName, setCompanyName] = useState('DocuPulse AI');

  // Step 2 Sync state
  const [syncedCount, setSyncedCount] = useState(0);
  const [syncProgress, setSyncProgress] = useState(0);
  const [activeTxnIndex, setActiveTxnIndex] = useState(0);
  const [isSyncing, setIsSyncing] = useState(false);

  // Step 3 MRR calculation state
  const [calcMrr, setCalcMrr] = useState(0);
  const [mrrCalculating, setMrrCalculating] = useState(false);

  // Step 4 ARR calculation state
  const [calcArr, setCalcArr] = useState(0);
  const [arrCalculating, setArrCalculating] = useState(false);

  // Step 5 Badge state
  const [badgeTheme, setBadgeTheme] = useState('light');
  const [hash, setHash] = useState('FL-2026-IN-88A92F');
  const [copied, setCopied] = useState(false);

  const autofillSample = () => {
    setApiKeyInput('rzp_live_sub_8829f00192a');
    setSecretInput('sec_live_9x8kL2n0a1Pq88z');
    setGstinInput('29AAACD4982R1Z8');
    setCompanyName('DocuPulse AI');
  };

  // Step 1 -> Step 2: Start Transaction Sync
  const handleStartSync = () => {
    setStep(2);
    setSyncedCount(0);
    setSyncProgress(0);
    setIsSyncing(true);

    const totalTarget = 247;
    let current = 0;

    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 18) + 8;
      if (current >= totalTarget) {
        current = totalTarget;
        setSyncedCount(totalTarget);
        setSyncProgress(100);
        setIsSyncing(false);
        clearInterval(interval);
      } else {
        setSyncedCount(current);
        setSyncProgress(Math.round((current / totalTarget) * 100));
        setActiveTxnIndex((prev) => (prev + 1) % SAMPLE_TXN_FEED.length);
      }
    }, 120);
  };

  // Step 2 -> Step 3: Calculate Monthly MRR
  const handleCalculateMrr = () => {
    setStep(3);
    setCalcMrr(0);
    setMrrCalculating(true);

    const targetMrr = 1850000;
    const duration = 1200;
    const startTime = performance.now();

    const animateMrr = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCalcMrr(Math.round(targetMrr * easeOut));

      if (progress < 1) {
        requestAnimationFrame(animateMrr);
      } else {
        setMrrCalculating(false);
      }
    };
    requestAnimationFrame(animateMrr);
  };

  // Step 3 -> Step 4: Calculate ARR
  const handleCalculateArr = () => {
    setStep(4);
    setCalcArr(0);
    setArrCalculating(true);

    const targetArr = 22200000;
    const duration = 1200;
    const startTime = performance.now();

    const animateArr = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCalcArr(Math.round(targetArr * easeOut));

      if (progress < 1) {
        requestAnimationFrame(animateArr);
      } else {
        setArrCalculating(false);
      }
    };
    requestAnimationFrame(animateArr);
  };

  // Step 4 -> Step 5: Issue Verified Badge
  const handleIssueBadge = () => {
    const randomHash = `FL-2026-IN-${Math.floor(1000 + Math.random() * 9000).toString(16).toUpperCase()}`;
    setHash(randomHash);
    setStep(5);
  };

  const handleReset = () => {
    setStep(1);
    setSyncedCount(0);
    setSyncProgress(0);
    setCalcMrr(0);
    setCalcArr(0);
  };

  const embedCode = `<a href="https://founderledger.in/verify/${hash}" target="_blank" rel="noopener">\n  <img src="https://img.founderledger.in/badge/${hash}-${badgeTheme}.svg" alt="FounderLedger Triple-Lock Verified Revenue" width="220" height="60" />\n</a>`;

  const handleCopyEmbed = () => {
    navigator.clipboard.writeText(embedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="section-wrapper" id="verify-section" style={{ background: 'var(--bg-subtle)', borderTop: '1px solid var(--border-light)', borderBottom: '1px solid var(--border-light)' }}>
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <span className="badge badge-brand" style={{ marginBottom: '12px' }}>
            <Zap size={13} />
            <span>RAZORPAY VERIFICATION SANDBOX</span>
          </span>
          <h2 style={{ marginBottom: '12px' }}>
            Test the Verification Sandbox in 5 Steps
          </h2>
          <p className="lead-text">
            Experience our automated Triple-Lock verification pipeline in interactive sandbox mode. Test with simulated Razorpay credentials without connecting real API keys.
          </p>
        </div>

        {/* 5-Step Pipeline Progress Bar */}
        <div style={{ maxWidth: '960px', margin: '0 auto 36px auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: '8px',
            background: 'var(--bg-surface)',
            padding: '8px',
            borderRadius: '14px',
            border: '1px solid var(--border-light)',
            boxShadow: 'var(--shadow-sm)'
          }}>
            {[
              { id: 1, label: '1. Connect' },
              { id: 2, label: '2. Sync 247 Txns' },
              { id: 3, label: '3. Calc MRR' },
              { id: 4, label: '4. Project ARR' },
              { id: 5, label: '5. Issue Badge' }
            ].map((s) => {
              const isActive = step === s.id;
              const isDone = step > s.id;

              return (
                <button
                  key={s.id}
                  onClick={() => setStep(s.id)}
                  style={{
                    padding: '10px 6px',
                    borderRadius: '8px',
                    border: 'none',
                    background: isActive ? 'var(--brand-primary)' : isDone ? 'var(--brand-soft)' : 'transparent',
                    color: isActive ? '#FFFFFF' : isDone ? 'var(--brand-primary)' : 'var(--text-muted)',
                    fontWeight: isActive || isDone ? 700 : 500,
                    fontSize: '0.75rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    transition: 'all 0.2s',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {isDone ? <Check size={12} strokeWidth={3} /> : null}
                  <span>{s.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Sandbox Content Card Container */}
        <div style={{ maxWidth: '860px', margin: '0 auto' }}>
          <AnimatePresence mode="wait">
            
            {/* ====================================================================
                STEP 1: CONNECT RAZORPAY (DEMO MODE)
                ==================================================================== */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.2 }}
                className="glass-card"
                style={{ padding: '36px', background: 'var(--bg-surface)' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '12px',
                      background: 'var(--brand-soft)',
                      color: 'var(--brand-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <CreditCard size={22} />
                    </div>
                    <div>
                      <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>1. Connect Razorpay Subscriptions</h3>
                      <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                        Read-only OAuth2 API handshake for recurring subscription settlements.
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={autofillSample}
                    className="btn btn-secondary btn-sm"
                    style={{ fontSize: '0.75rem', gap: '6px' }}
                  >
                    <Sparkles size={13} color="var(--brand-primary)" />
                    <span>Autofill Demo Credentials</span>
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '28px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '6px', color: 'var(--text-primary)' }}>
                        Startup / Company Name
                      </label>
                      <div style={{ position: 'relative' }}>
                        <Building2 size={15} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                        <input
                          type="text"
                          value={companyName}
                          onChange={(e) => setCompanyName(e.target.value)}
                          style={{
                            width: '100%',
                            padding: '10px 12px 10px 36px',
                            background: 'var(--bg-subtle)',
                            border: '1px solid var(--border-light)',
                            borderRadius: '8px',
                            fontSize: '0.875rem',
                            color: 'var(--text-primary)',
                            outline: 'none'
                          }}
                        />
                      </div>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '6px', color: 'var(--text-primary)' }}>
                        GSTIN Registration Number
                      </label>
                      <div style={{ position: 'relative' }}>
                        <FileText size={15} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                        <input
                          type="text"
                          value={gstinInput}
                          onChange={(e) => setGstinInput(e.target.value)}
                          style={{
                            width: '100%',
                            padding: '10px 12px 10px 36px',
                            background: 'var(--bg-subtle)',
                            border: '1px solid var(--border-light)',
                            borderRadius: '8px',
                            fontSize: '0.875rem',
                            color: 'var(--text-primary)',
                            fontFamily: 'var(--font-mono)',
                            outline: 'none'
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '6px', color: 'var(--text-primary)' }}>
                        Razorpay Key ID (Read-Only)
                      </label>
                      <div style={{ position: 'relative' }}>
                        <Key size={15} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                        <input
                          type="text"
                          value={apiKeyInput}
                          onChange={(e) => setApiKeyInput(e.target.value)}
                          style={{
                            width: '100%',
                            padding: '10px 12px 10px 36px',
                            background: 'var(--bg-subtle)',
                            border: '1px solid var(--border-light)',
                            borderRadius: '8px',
                            fontSize: '0.875rem',
                            color: 'var(--text-primary)',
                            fontFamily: 'var(--font-mono)',
                            outline: 'none'
                          }}
                        />
                      </div>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '6px', color: 'var(--text-primary)' }}>
                        Razorpay Key Secret (Masked)
                      </label>
                      <div style={{ position: 'relative' }}>
                        <Lock size={15} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                        <input
                          type={showSecret ? 'text' : 'password'}
                          value={secretInput}
                          onChange={(e) => setSecretInput(e.target.value)}
                          style={{
                            width: '100%',
                            padding: '10px 36px 10px 36px',
                            background: 'var(--bg-subtle)',
                            border: '1px solid var(--border-light)',
                            borderRadius: '8px',
                            fontSize: '0.875rem',
                            color: 'var(--text-primary)',
                            fontFamily: 'var(--font-mono)',
                            outline: 'none'
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => setShowSecret(!showSecret)}
                          style={{
                            position: 'absolute',
                            right: '10px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            border: 'none',
                            background: 'transparent',
                            color: 'var(--text-muted)',
                            cursor: 'pointer'
                          }}
                        >
                          {showSecret ? <EyeOff size={15} /> : <Eye size={15} />}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-light)', paddingTop: '20px', flexWrap: 'wrap', gap: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    <ShieldCheck size={15} color="#10B981" />
                    <span>256-Bit SSL Encrypted Handshake • Read-Only Sandbox Mode</span>
                  </div>

                  <button
                    onClick={handleStartSync}
                    className="btn btn-primary"
                    style={{ gap: '8px', padding: '10px 24px' }}
                  >
                    <span>Connect & Sync 247 Txns</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </motion.div>
            )}

            {/* ====================================================================
                STEP 2: SYNC 247 SAMPLE TRANSACTIONS
                ==================================================================== */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.2 }}
                className="glass-card"
                style={{ padding: '36px', background: 'var(--bg-surface)' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>2. Syncing Sample Transactions</h3>
                      <span className="badge badge-verified" style={{ fontSize: '0.6875rem' }}>
                        {isSyncing ? <RefreshCw size={11} className="animate-spin" /> : <Check size={11} />}
                        <span>{isSyncing ? 'Live Stream Active' : 'Sync Complete'}</span>
                      </span>
                    </div>
                    <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                      Streaming sample B2B subscription payments from ICICI & Razorpay merchant nodes.
                    </p>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '1.75rem', fontWeight: 900, fontFamily: 'var(--font-mono)', color: 'var(--brand-primary)' }}>
                      {syncedCount} <span style={{ fontSize: '1rem', color: 'var(--text-muted)', fontWeight: 500 }}>/ 247</span>
                    </div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Transactions Verified</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div style={{ height: '8px', width: '100%', background: 'var(--bg-muted)', borderRadius: '4px', overflow: 'hidden', marginBottom: '24px' }}>
                  <motion.div
                    style={{ height: '100%', background: 'var(--brand-primary)' }}
                    animate={{ width: `${syncProgress}%` }}
                    transition={{ ease: 'easeOut', duration: 0.1 }}
                  />
                </div>

                {/* Live Streaming Transaction Feed Table */}
                <div style={{
                  background: '#090D16',
                  borderRadius: '12px',
                  border: '1px solid #1E293B',
                  padding: '16px',
                  marginBottom: '24px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.8125rem',
                  color: '#93C5FD',
                  maxHeight: '220px',
                  overflowY: 'hidden'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748B', fontSize: '0.75rem', paddingBottom: '8px', borderBottom: '1px solid #1E293B', marginBottom: '8px' }}>
                    <span>CLIENT COMPANY</span>
                    <span>AMOUNT</span>
                    <span>GATEWAY ROUTE</span>
                    <span>STATUS</span>
                  </div>

                  {SAMPLE_TXN_FEED.map((txn, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        padding: '6px 0',
                        opacity: idx <= activeTxnIndex ? 1 : 0.25,
                        transition: 'opacity 0.2s',
                        borderBottom: '1px solid rgba(255, 255, 255, 0.04)'
                      }}
                    >
                      <span style={{ color: '#FFFFFF', fontWeight: 600 }}>{txn.company}</span>
                      <span style={{ color: '#10B981' }}>+{formatCurrency(txn.amount, currency)}</span>
                      <span style={{ color: '#94A3B8' }}>{txn.source}</span>
                      <span style={{ color: '#60A5FA' }}>✓ {txn.status}</span>
                    </div>
                  ))}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-light)', paddingTop: '20px' }}>
                  <button onClick={handleReset} className="btn btn-secondary btn-sm">
                    Back to Credentials
                  </button>

                  <button
                    onClick={handleCalculateMrr}
                    disabled={isSyncing}
                    className="btn btn-primary"
                    style={{ gap: '8px' }}
                  >
                    <span>Next: Calculate Monthly MRR</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </motion.div>
            )}

            {/* ====================================================================
                STEP 3: CALCULATE MONTHLY MRR
                ==================================================================== */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.2 }}
                className="glass-card"
                style={{ padding: '36px', background: 'var(--bg-surface)' }}
              >
                <div style={{ marginBottom: '24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>3. Calculated Monthly MRR</h3>
                    <span className="badge badge-verified" style={{ fontSize: '0.6875rem' }}>
                      <ShieldCheck size={11} />
                      <span>Zero Discrepancy</span>
                    </span>
                  </div>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                    Aggregated recurring subscriptions cross-checked across 247 verified merchant receipts.
                  </p>
                </div>

                {/* Big Animated MRR Counter Card */}
                <div style={{
                  background: 'var(--bg-subtle)',
                  borderRadius: '16px',
                  border: '1px solid var(--border-light)',
                  padding: '28px',
                  textAlign: 'center',
                  marginBottom: '24px'
                }}>
                  <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    Verified Monthly Recurring Revenue (MRR)
                  </span>
                  <div style={{ fontSize: '2.75rem', fontWeight: 900, color: 'var(--brand-primary)', fontFamily: 'var(--font-mono)', margin: '8px 0' }}>
                    {formatCurrency(calcMrr, currency)} <span style={{ fontSize: '1.1rem', color: 'var(--text-muted)' }}>/ mo</span>
                  </div>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.8125rem', color: 'var(--success-dark)', fontWeight: 700 }}>
                    <TrendingUp size={14} />
                    <span>+24.8% MoM Growth Rate (Top 10% in Indian SaaS)</span>
                  </div>
                </div>

                {/* 3 Gateway Breakdown Pills */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', marginBottom: '24px' }}>
                  <div style={{ padding: '14px', borderRadius: '10px', background: 'var(--bg-card)', border: '1px solid var(--border-light)' }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Razorpay Subscriptions (68%)</div>
                    <div style={{ fontWeight: 800, fontSize: '1.05rem', fontFamily: 'var(--font-mono)' }}>{formatCurrency(1258000, currency)}</div>
                    <div style={{ fontSize: '0.6875rem', color: 'var(--text-secondary)' }}>168 Enterprise accounts</div>
                  </div>

                  <div style={{ padding: '14px', borderRadius: '10px', background: 'var(--bg-card)', border: '1px solid var(--border-light)' }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '4px' }}>UPI AutoPay Mandates (22%)</div>
                    <div style={{ fontWeight: 800, fontSize: '1.05rem', fontFamily: 'var(--font-mono)' }}>{formatCurrency(407000, currency)}</div>
                    <div style={{ fontSize: '0.6875rem', color: 'var(--text-secondary)' }}>54 Direct debit VPAs</div>
                  </div>

                  <div style={{ padding: '14px', borderRadius: '10px', background: 'var(--bg-card)', border: '1px solid var(--border-light)' }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Stripe India SaaS (10%)</div>
                    <div style={{ fontWeight: 800, fontSize: '1.05rem', fontFamily: 'var(--font-mono)' }}>{formatCurrency(185000, currency)}</div>
                    <div style={{ fontSize: '0.6875rem', color: 'var(--text-secondary)' }}>25 Global USD accounts</div>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-light)', paddingTop: '20px' }}>
                  <button onClick={() => setStep(2)} className="btn btn-secondary btn-sm">
                    Back to Transactions
                  </button>

                  <button
                    onClick={handleCalculateArr}
                    className="btn btn-primary"
                    style={{ gap: '8px' }}
                  >
                    <span>Next: Project Audited ARR</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </motion.div>
            )}

            {/* ====================================================================
                STEP 4: SHOW AUDITED ARR & GSTR-3B MATCH
                ==================================================================== */}
            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.2 }}
                className="glass-card"
                style={{ padding: '36px', background: 'var(--bg-surface)' }}
              >
                <div style={{ marginBottom: '24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>4. Certified Annual Run Rate (ARR)</h3>
                    <span className="badge badge-brand" style={{ fontSize: '0.6875rem' }}>
                      <FileCheck2 size={11} />
                      <span>100% GSTR-3B Tax Match</span>
                    </span>
                  </div>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                    Annualized Run Rate based on audited monthly subscription run-rate.
                  </p>
                </div>

                {/* Big ARR Hero Display */}
                <div style={{
                  background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.08) 0%, rgba(29, 78, 216, 0.03) 100%)',
                  borderRadius: '16px',
                  border: '1px solid var(--brand-border)',
                  padding: '32px',
                  textAlign: 'center',
                  marginBottom: '24px'
                }}>
                  <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--brand-primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Certified Annual Recurring Revenue
                  </div>
                  <div style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--brand-primary)', fontFamily: 'var(--font-mono)', margin: '8px 0' }}>
                    {formatCurrency(calcArr, currency)}
                  </div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                    Calculated as: <strong>{formatCurrency(1850000, currency)}/mo × 12 months</strong>
                  </div>
                </div>

                {/* Statutory Check List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', background: 'var(--bg-subtle)', borderRadius: '8px', fontSize: '0.8125rem' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Razorpay Webhook Hash (HMAC SHA-256):</span>
                    <strong style={{ fontFamily: 'var(--font-mono)', color: 'var(--brand-primary)' }}>rzp_sig_8829f00192a_ok</strong>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', background: 'var(--bg-subtle)', borderRadius: '8px', fontSize: '0.8125rem' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>GSTIN Portal Match (GSTR-3B ARN):</span>
                    <span className="badge badge-verified" style={{ fontSize: '0.6875rem' }}>
                      <CheckCircle2 size={10} />
                      <span>100% Tax Match Confirmed</span>
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', background: 'var(--bg-subtle)', borderRadius: '8px', fontSize: '0.8125rem' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Ministry of Corporate Affairs (MCA CIN):</span>
                    <strong style={{ fontFamily: 'var(--font-mono)' }}>U72900KA2023PTC172819</strong>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-light)', paddingTop: '20px' }}>
                  <button onClick={() => setStep(3)} className="btn btn-secondary btn-sm">
                    Back to MRR
                  </button>

                  <button
                    onClick={handleIssueBadge}
                    className="btn btn-primary"
                    style={{ gap: '8px', padding: '10px 24px' }}
                  >
                    <Sparkles size={16} />
                    <span>Issue Verified Badge</span>
                  </button>
                </div>
              </motion.div>
            )}

            {/* ====================================================================
                STEP 5: ISSUE FOUNDERLEDGER VERIFIED BADGE (CELEBRATION)
                ==================================================================== */}
            {step === 5 && (
              <motion.div
                key="step5"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3 }}
                className="glass-card"
                style={{ padding: '36px', background: 'var(--bg-surface)', textAlign: 'center' }}
              >
                {/* Celebration Header */}
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  background: 'var(--success-soft)',
                  color: 'var(--success-dark)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px auto',
                  border: '1px solid var(--success-border)',
                  boxShadow: '0 0 20px rgba(16, 185, 129, 0.3)'
                }}>
                  <CheckCircle2 size={32} />
                </div>

                <h3 style={{ fontSize: '1.6rem', fontWeight: 900, letterSpacing: '-0.02em', marginBottom: '6px' }}>
                  FounderLedger Verified Badge Issued!
                </h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', maxWidth: '480px', margin: '0 auto 28px auto' }}>
                  Your startup revenue has been cryptographically certified under Ledger Block <strong>{hash}</strong>.
                </p>

                {/* Animated Verified Badge Component Preview */}
                <div style={{
                  background: badgeTheme === 'dark' ? '#090D16' : '#FFFFFF',
                  border: '1px solid var(--border-light)',
                  borderRadius: '16px',
                  padding: '24px',
                  maxWidth: '380px',
                  margin: '0 auto 24px auto',
                  boxShadow: 'var(--shadow-lg)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '16px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '10px',
                      background: 'var(--brand-primary)',
                      color: '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <ShieldCheck size={22} strokeWidth={2.5} />
                    </div>

                    <div style={{ textAlign: 'left' }}>
                      <div style={{ fontSize: '0.6875rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                        Verified Revenue
                      </div>
                      <div style={{ fontSize: '1.2rem', fontWeight: 900, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>
                        {formatCurrency(22200000, currency)} <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>ARR</span>
                      </div>
                      <div style={{ fontSize: '0.6875rem', color: 'var(--brand-primary)', fontWeight: 600 }}>
                        {hash}
                      </div>
                    </div>
                  </div>

                  <div className="badge badge-verified" style={{ fontSize: '0.625rem', padding: '3px 8px' }}>
                    <span>TRIPLE-LOCK</span>
                  </div>
                </div>

                {/* Badge Embed Code Box */}
                <div style={{ maxWidth: '540px', margin: '0 auto 28px auto', textAlign: 'left' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                      Embed Code for Website / Investor Deck
                    </span>

                    <div style={{ display: 'inline-flex', gap: '4px', background: 'var(--bg-muted)', padding: '2px', borderRadius: '6px' }}>
                      <button
                        onClick={() => setBadgeTheme('light')}
                        style={{
                          padding: '2px 8px',
                          border: 'none',
                          borderRadius: '4px',
                          fontSize: '0.6875rem',
                          background: badgeTheme === 'light' ? 'var(--bg-surface)' : 'transparent',
                          color: badgeTheme === 'light' ? 'var(--text-primary)' : 'var(--text-muted)',
                          cursor: 'pointer',
                          fontWeight: 600
                        }}
                      >
                        Light
                      </button>
                      <button
                        onClick={() => setBadgeTheme('dark')}
                        style={{
                          padding: '2px 8px',
                          border: 'none',
                          borderRadius: '4px',
                          fontSize: '0.6875rem',
                          background: badgeTheme === 'dark' ? 'var(--bg-surface)' : 'transparent',
                          color: badgeTheme === 'dark' ? 'var(--text-primary)' : 'var(--text-muted)',
                          cursor: 'pointer',
                          fontWeight: 600
                        }}
                      >
                        Dark
                      </button>
                    </div>
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
                    fontSize: '0.75rem'
                  }}>
                    <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '400px' }}>
                      {embedCode}
                    </span>
                    <button
                      onClick={handleCopyEmbed}
                      style={{
                        border: 'none',
                        background: 'rgba(255, 255, 255, 0.12)',
                        color: '#FFFFFF',
                        padding: '4px 10px',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        fontSize: '0.75rem',
                        flexShrink: 0
                      }}
                    >
                      {copied ? <Check size={12} style={{ color: '#10B981' }} /> : <Copy size={12} />}
                      <span>{copied ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
                  <button onClick={handleReset} className="btn btn-secondary btn-sm" style={{ gap: '6px' }}>
                    <RotateCcw size={14} />
                    <span>Test Sandbox Again</span>
                  </button>

                  <a href="/dashboard" className="btn btn-primary btn-sm" style={{ gap: '6px' }}>
                    <Zap size={14} />
                    <span>Go to Founder Console</span>
                  </a>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
