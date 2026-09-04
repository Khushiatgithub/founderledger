import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { PLATFORM_DATA } from '../data/startups';

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section style={{ padding: '5.5rem 0', background: 'var(--bg-subtle)' }} id="faq-section">
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
            FREQUENTLY ASKED QUESTIONS
          </span>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '1rem', letterSpacing: '-0.03em' }}>
            Everything You Need to Know
          </h2>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)' }}>
            Clear, honest answers about privacy, tax compliance, gateway integrations, and acquisition escrow.
          </p>
        </div>

        {/* Accordion List */}
        <div style={{ maxWidth: '820px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {PLATFORM_DATA.faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className="glass-card"
                style={{
                  overflow: 'hidden',
                  borderColor: isOpen ? 'var(--border-focus)' : 'var(--border-light)',
                  transition: 'border-color 0.2s'
                }}
              >
                <button
                  onClick={() => toggle(i)}
                  style={{
                    width: '100%',
                    padding: '1.25rem 1.75rem',
                    textAlign: 'left',
                    fontWeight: 700,
                    fontSize: '1.05rem',
                    color: 'var(--text-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1rem'
                  }}
                >
                  <span>{faq.question}</span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown size={18} color="var(--text-muted)" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div style={{
                        padding: '0 1.75rem 1.5rem 1.75rem',
                        fontSize: '0.925rem',
                        color: 'var(--text-secondary)',
                        lineHeight: 1.65
                      }}>
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
