import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ShieldCheck } from 'lucide-react';

export default function Toasts() {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    const events = [
      { id: 1, name: "DevPulse AI", amount: "₹18.5L", gateway: "Razorpay" },
      { id: 2, name: "HireStack India", amount: "₹14.2L", gateway: "Cashfree" },
      { id: 3, name: "InvoiceWali", amount: "₹7.5L", gateway: "PhonePe UPI" },
      { id: 4, name: "CodeBharat IDE", amount: "₹9.2L", gateway: "Stripe India" },
      { id: 5, name: "LeadChakra", amount: "₹26.0L", gateway: "Razorpay" }
    ];

    let current = 0;
    const interval = setInterval(() => {
      const ev = events[current % events.length];
      const toastId = Date.now();
      setToasts((prev) => [...prev.slice(-2), { ...ev, toastId }]);

      setTimeout(() => {
        setToasts((prev) => prev.filter(t => t.toastId !== toastId));
      }, 4000);

      current++;
    }, 14000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      position: 'fixed',
      bottom: '24px',
      left: '24px',
      zIndex: 300,
      display: 'flex',
      flexDirection: 'column',
      gap: '0.75rem',
      pointerEvents: 'none'
    }}>
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.toastId}
            initial={{ opacity: 0, x: -30, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -30, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            style={{
              background: 'var(--bg-card-elevated)',
              border: '1px solid var(--border-light)',
              borderLeft: '4px solid var(--success)',
              boxShadow: 'var(--shadow-lg)',
              padding: '0.85rem 1.25rem',
              borderRadius: '14px',
              fontSize: '0.825rem',
              color: 'var(--text-primary)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              maxWidth: '360px',
              pointerEvents: 'auto'
            }}
          >
            <div style={{
              width: '30px',
              height: '30px',
              borderRadius: '50%',
              background: 'var(--success-soft)',
              color: 'var(--success-dark)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <CheckCircle2 size={16} strokeWidth={2.5} />
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: '0.85rem' }}>{t.name} Verified</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                {t.amount} MRR reconciled via {t.gateway} • Just now
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
