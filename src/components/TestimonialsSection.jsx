import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Quote } from 'lucide-react';

export default function TestimonialsSection() {
  const testimonials = [
    {
      quote: "Listing our verified Razorpay ARR on FounderLedger eliminated 3 weeks of due diligence friction with institutional buyers. Closed our ₹8.8 Cr acquisition in record time.",
      author: "Arjun Venkatesh",
      role: "Solo Founder, DocuPulse AI (Bengaluru)",
      avatar: "AV"
    },
    {
      quote: "Our verified ledger link is in our investor deck. VCs don't even ask for raw Excel data rooms anymore. It's the gold standard for Indian fintech transparency.",
      author: "Vikram Reddy",
      role: "CEO, VaultKit APIs (Hyderabad)",
      avatar: "VR"
    },
    {
      quote: "We run completely on UPI AutoPay. FounderLedger proved every single rupee with zero manual paperwork. Having the verified badge boosted enterprise conversions by 40%.",
      author: "Ananya Mehta",
      role: "Solo Founder, InvoiceWali (Jaipur)",
      avatar: "AM"
    }
  ];

  return (
    <section style={{ padding: '5.5rem 0', background: 'var(--bg-subtle)' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 3.5rem auto' }}>
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
            WALL OF PROOF
          </span>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '1rem', letterSpacing: '-0.03em' }}>
            Built for Bharat's Most Ambitious Founders
          </h2>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)' }}>
            See how transparent verification accelerates fundraising, builds enterprise buyer trust, and closes profitable acquisitions.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2rem'
        }}>
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="glass-card"
              style={{
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <p style={{ fontSize: '1rem', fontStyle: 'italic', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.75rem' }}>
                "{t.quote}"
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                <div style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  background: 'var(--brand-gradient)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  fontWeight: 800,
                  fontSize: '0.95rem'
                }}>
                  {t.avatar}
                </div>
                <div>
                  <h4 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '2px' }}>{t.author}</h4>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{t.role}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
