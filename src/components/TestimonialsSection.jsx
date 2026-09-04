import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Quote, CheckCircle2 } from 'lucide-react';

export default function TestimonialsSection() {
  const testimonials = [
    {
      quote: "Listing our verified Razorpay ARR on FounderLedger eliminated 3 weeks of due diligence friction with institutional buyers. Closed our ₹8.8 Cr acquisition in record time.",
      author: "Arjun Venkatesh",
      role: "Solo Founder, DocuPulse AI (Bengaluru)",
      avatar: "AV",
      stat: "₹8.8 Cr Deal Closed"
    },
    {
      quote: "Our verified ledger link is in our investor deck. VCs don't even ask for raw Excel data rooms anymore. It's the gold standard for Indian SaaS transparency.",
      author: "Vikram Reddy",
      role: "CEO, VaultKit APIs (Hyderabad)",
      avatar: "VR",
      stat: "₹4.8 Cr ARR Audited"
    },
    {
      quote: "We run completely on UPI AutoPay. FounderLedger proved every single rupee with zero manual paperwork. Having the verified badge boosted enterprise conversions by 40%.",
      author: "Ananya Mehta",
      role: "Founder, InvoiceWali (Jaipur)",
      avatar: "AM",
      stat: "100% Tax Match"
    }
  ];

  return (
    <section className="section-wrapper" style={{ background: 'var(--bg-canvas)' }}>
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <span className="badge badge-brand" style={{ marginBottom: '12px' }}>
            <Quote size={13} />
            <span>WALL OF PROOF</span>
          </span>
          <h2 style={{ marginBottom: '12px' }}>
            Trusted by India's Top Solo Founders
          </h2>
          <p className="lead-text">
            See how transparent verification accelerates fundraising, builds enterprise buyer trust, and closes profitable acquisitions.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '24px'
        }}>
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.1 }}
              className="glass-card"
              style={{
                padding: '28px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                background: 'var(--bg-surface)'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <span className="badge badge-verified" style={{ fontSize: '0.6875rem' }}>
                    <CheckCircle2 size={11} />
                    <span>{t.stat}</span>
                  </span>
                  <div style={{ display: 'flex', gap: '2px', color: '#F59E0B', fontSize: '0.8125rem' }}>
                    ★★★★★
                  </div>
                </div>

                <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '24px' }}>
                  "{t.quote}"
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  background: 'var(--brand-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF',
                  fontWeight: 800,
                  fontSize: '0.875rem'
                }}>
                  {t.avatar}
                </div>
                <div>
                  <div style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--text-primary)' }}>{t.author}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
