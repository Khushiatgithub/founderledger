import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, 
  Cpu, 
  Database, 
  Landmark, 
  CheckCircle2, 
  XCircle, 
  Code, 
  Terminal, 
  FileCheck2, 
  Lock, 
  ArrowRight,
  Layers,
  Sparkles,
  Zap,
  Check
} from 'lucide-react';

export default function ArchitectureSection() {
  const [activeTab, setActiveTab] = useState('api'); // 'api', 'gst', 'escrow'

  return (
    <section className="section-wrapper" id="why-us-section" style={{ background: 'var(--bg-canvas)' }}>
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <span className="badge badge-brand" style={{ marginBottom: '12px' }}>
            <Layers size={13} />
            <span>FINTECH INFRASTRUCTURE & ARCHITECTURE</span>
          </span>
          <h2 style={{ marginBottom: '12px' }}>
            Why Top Indian Founders Build on Verified Ledgers
          </h2>
          <p className="lead-text">
            Traditional pitch decks and Twitter screenshots are easily edited. FounderLedger establishes a cryptographic single source of truth across payment gateways, GST filings, and bank escrow.
          </p>

          {/* Interactive Feature Mockup Tabs */}
          <div style={{ display: 'inline-flex', alignItems: 'center', background: 'var(--bg-muted)', padding: '4px', borderRadius: '12px', border: '1px solid var(--border-light)', marginTop: '24px' }}>
            {[
              { id: 'api', label: '1. Gateway API Webhook Engine', icon: <Code size={14} /> },
              { id: 'gst', label: '2. GSTR-3B Electronic Tax Match', icon: <FileCheck2 size={14} /> },
              { id: 'escrow', label: '3. Institutional Escrow Vault', icon: <Lock size={14} /> }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 16px',
                  borderRadius: '8px',
                  border: 'none',
                  background: activeTab === tab.id ? 'var(--bg-surface)' : 'transparent',
                  color: activeTab === tab.id ? 'var(--brand-primary)' : 'var(--text-secondary)',
                  fontWeight: 600,
                  fontSize: '0.8125rem',
                  cursor: 'pointer',
                  boxShadow: activeTab === tab.id ? 'var(--shadow-xs)' : 'none',
                  transition: 'all 0.15s ease'
                }}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ==========================================================================
            Realistic Product Mockup Console
            ========================================================================== */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="dashboard-console"
          style={{ maxWidth: '1080px', margin: '0 auto 48px auto' }}
        >
          {/* Mockup Header */}
          <div className="dashboard-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="pulse-dot"></span>
              <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>
                {activeTab === 'api' && 'founderledger.audit.engine / api_tunnel / rzp_live_webhook.json'}
                {activeTab === 'gst' && 'gstn.e_invoicing.gov.in / gstr3b_reconciliation_matrix.csv'}
                {activeTab === 'escrow' && 'icici_bank.escrow.trust / smart_deal_room / vault_balance'}
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.75rem' }}>
              <span className="badge badge-verified" style={{ fontSize: '0.6875rem' }}>
                <Check size={11} />
                <span>HMAC SHA-256 Verified</span>
              </span>
              <span style={{ color: 'var(--text-muted)' }}>Latency: <strong>14ms</strong></span>
            </div>
          </div>

          {/* Mockup Body Content */}
          <div style={{ padding: '24px', background: 'var(--bg-surface)' }}>
            
            {/* Tab 1: Realistic API Webhook Mockup */}
            {activeTab === 'api' && (
              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '20px' }}>
                <div style={{
                  background: '#090D16',
                  borderRadius: '12px',
                  padding: '16px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  color: '#93C5FD',
                  border: '1px solid #1E293B',
                  overflowX: 'auto',
                  lineHeight: '1.6'
                }}>
                  <div style={{ color: '#64748B', marginBottom: '8px' }}>// Incoming Webhook Payload from Razorpay API</div>
                  <div>&#123;</div>
                  <div style={{ paddingLeft: '16px' }}><span style={{ color: '#F472B6' }}>"event"</span>: <span style={{ color: '#34D399' }}>"subscription.charged"</span>,</div>
                  <div style={{ paddingLeft: '16px' }}><span style={{ color: '#F472B6' }}>"payload"</span>: &#123;</div>
                  <div style={{ paddingLeft: '32px' }}><span style={{ color: '#F472B6' }}>"entity"</span>: <span style={{ color: '#34D399' }}>"inv_2026_9881A"</span>,</div>
                  <div style={{ paddingLeft: '32px' }}><span style={{ color: '#F472B6' }}>"amount_paisa"</span>: <span style={{ color: '#FBBF24' }}>185000000</span>, <span style={{ color: '#64748B' }}>// ₹18.5 Lakhs</span></div>
                  <div style={{ paddingLeft: '32px' }}><span style={{ color: '#F472B6' }}>"currency"</span>: <span style={{ color: '#34D399' }}>"INR"</span>,</div>
                  <div style={{ paddingLeft: '32px' }}><span style={{ color: '#F472B6' }}>"status"</span>: <span style={{ color: '#34D399' }}>"captured"</span>,</div>
                  <div style={{ paddingLeft: '32px' }}><span style={{ color: '#F472B6' }}>"gstin"</span>: <span style={{ color: '#34D399' }}>"29AAACD4982R1Z8"</span></div>
                  <div style={{ paddingLeft: '16px' }}>&#125;,</div>
                  <div style={{ paddingLeft: '16px' }}><span style={{ color: '#F472B6' }}>"signature_sha256"</span>: <span style={{ color: '#34D399' }}>"0x98f4a21...bb89"</span></div>
                  <div>&#125;</div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ background: 'var(--bg-subtle)', padding: '14px', borderRadius: '10px', border: '1px solid var(--border-light)' }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--brand-primary)', textTransform: 'uppercase', marginBottom: '4px' }}>
                      Automated Revenue Auditing
                    </div>
                    <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                      Direct read-only webhook tunnels capture true recurring MRR, refunds, chargebacks, and net settlement batches without human intervention.
                    </p>
                  </div>

                  <div style={{ background: 'var(--bg-subtle)', padding: '14px', borderRadius: '10px', border: '1px solid var(--border-light)' }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--success-dark)', textTransform: 'uppercase', marginBottom: '4px' }}>
                      Zero Data Room Fraud
                    </div>
                    <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                      Each webhook signature is cryptographically checked against Razorpay's public RSA key. Pitch deck manipulation is mathematically impossible.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: GST 3B Reconciliation Matrix Mockup */}
            {activeTab === 'gst' && (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8125rem', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ background: 'var(--bg-subtle)', borderBottom: '1px solid var(--border-light)' }}>
                      <th style={{ padding: '10px 14px', fontWeight: 700, color: 'var(--text-muted)' }}>TAX PERIOD</th>
                      <th style={{ padding: '10px 14px', fontWeight: 700, color: 'var(--text-muted)' }}>GATEWAY SETTLEMENT</th>
                      <th style={{ padding: '10px 14px', fontWeight: 700, color: 'var(--text-muted)' }}>FILED GSTR-3B TAXABLE</th>
                      <th style={{ padding: '10px 14px', fontWeight: 700, color: 'var(--text-muted)' }}>18% GST DEPOSITED</th>
                      <th style={{ padding: '10px 14px', fontWeight: 700, color: 'var(--text-muted)' }}>RECONCILIATION MATCH</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { period: 'March 2026', gateway: '₹18,50,000', gst: '₹18,50,000', tax: '₹3,33,000', status: '100% Match (ARN Verified)' },
                      { period: 'February 2026', gateway: '₹18,10,000', gst: '₹18,10,000', tax: '₹3,25,800', status: '100% Match (ARN Verified)' },
                      { period: 'January 2026', gateway: '₹17,40,000', gst: '₹17,40,000', tax: '₹3,13,200', status: '100% Match (ARN Verified)' }
                    ].map((row, i) => (
                      <tr key={i} style={{ borderBottom: '1px solid var(--border-light)' }}>
                        <td style={{ padding: '10px 14px', fontWeight: 700, color: 'var(--text-primary)' }}>{row.period}</td>
                        <td style={{ padding: '10px 14px', fontFamily: 'var(--font-mono)', color: 'var(--brand-primary)', fontWeight: 600 }}>{row.gateway}</td>
                        <td style={{ padding: '10px 14px', fontFamily: 'var(--font-mono)' }}>{row.gst}</td>
                        <td style={{ padding: '10px 14px', fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>{row.tax}</td>
                        <td style={{ padding: '10px 14px' }}>
                          <span className="badge badge-verified" style={{ fontSize: '0.6875rem' }}>
                            <CheckCircle2 size={10} />
                            <span>{row.status}</span>
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Tab 3: Institutional Escrow Vault Mockup */}
            {activeTab === 'escrow' && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
                <div style={{ background: 'var(--bg-subtle)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-light)' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '6px' }}>
                    ICICI REGULATED ESCROW VAULT
                  </div>
                  <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--brand-primary)', letterSpacing: '-0.03em', marginBottom: '8px' }}>
                    ₹8,88,00,000
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                    Acquisition of <strong>DocuPulse AI</strong> • 4.0x ARR
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {[
                    { step: 'Milestone 1: SPA Execution & KYC Approval', done: true, time: 'Completed' },
                    { step: 'Milestone 2: GitHub Code & Domain IP Escrow Handover', done: true, time: 'Completed' },
                    { step: 'Milestone 3: MCA 21 Director Transfer & Final Payout', done: false, time: 'In Escrow Release' }
                  ].map((m, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px', background: 'var(--bg-subtle)', borderRadius: '8px', border: '1px solid var(--border-light)', fontSize: '0.8125rem' }}>
                      <span style={{ color: m.done ? 'var(--text-primary)' : 'var(--brand-primary)', fontWeight: 600 }}>{m.step}</span>
                      <span className={m.done ? 'badge badge-verified' : 'badge badge-brand'} style={{ fontSize: '0.6875rem' }}>
                        {m.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </motion.div>

        {/* 3 Pillars Summary Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '24px'
        }}>
          <div className="glass-card" style={{ padding: '24px', background: 'var(--bg-surface)' }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              background: 'var(--brand-soft)',
              color: 'var(--brand-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '16px'
            }}>
              <Cpu size={22} strokeWidth={2.4} />
            </div>
            <h3 style={{ fontSize: '1.15rem', marginBottom: '6px' }}>1. Automated Webhook Tunnels</h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              Direct OAuth webhooks with Razorpay, PhonePe, and Cashfree ingest recurring revenue, net refunds, and churn automatically.
            </p>
          </div>

          <div className="glass-card" style={{ padding: '24px', background: 'var(--bg-surface)' }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              background: 'var(--brand-soft)',
              color: 'var(--brand-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '16px'
            }}>
              <Database size={22} strokeWidth={2.4} />
            </div>
            <h3 style={{ fontSize: '1.15rem', marginBottom: '6px' }}>2. GSTR-3B Tax Reconciliation</h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              Every rupee is cross-referenced with filed GST e-invoices and MCA CIN filings, eliminating fake traction and ghost contracts.
            </p>
          </div>

          <div className="glass-card" style={{ padding: '24px', background: 'var(--bg-surface)' }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              background: 'var(--brand-soft)',
              color: 'var(--brand-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '16px'
            }}>
              <Landmark size={22} strokeWidth={2.4} />
            </div>
            <h3 style={{ fontSize: '1.15rem', marginBottom: '6px' }}>3. Institutional Escrow Security</h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              Acquisitions close via RBI-regulated ICICI bank escrow vaults under standardized Indian tech share purchase agreements.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
