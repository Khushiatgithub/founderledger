import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, ShieldCheck, ArrowRight } from 'lucide-react';
import { PLATFORM_DATA } from '../../data/startups';
import { formatCurrency } from '../../utils/formatters';

export default function CommandPalette({ isOpen, onClose, onSelectStartup, currency }) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        // handled in parent or toggle
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filtered = PLATFORM_DATA.startups.filter(s =>
    s.name.toLowerCase().includes(query.toLowerCase()) ||
    s.categoryLabel.toLowerCase().includes(query.toLowerCase()) ||
    s.founder.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: -20 }}
        transition={{ duration: 0.2 }}
        onClick={(e) => e.stopPropagation()}
        className="modal-content-card"
        style={{ maxWidth: '580px', padding: 0, overflow: 'hidden' }}
      >
        <div style={{ position: 'relative', borderBottom: '1px solid var(--border-light)' }}>
          <Search size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search startups, tools, categories, or founders... (Esc to exit)"
            style={{
              width: '100%',
              padding: '1.25rem 1.25rem 1.25rem 3.2rem',
              fontSize: '1rem',
              color: 'var(--text-primary)',
              background: 'var(--bg-card-elevated)',
              outline: 'none'
            }}
          />
        </div>

        <div style={{ maxHeight: '340px', overflowY: 'auto', padding: '0.65rem' }}>
          {filtered.length === 0 ? (
            <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              No matching verified startups found.
            </div>
          ) : (
            filtered.map(s => (
              <div
                key={s.id}
                onClick={() => {
                  onSelectStartup(s);
                  onClose();
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.75rem 1rem',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  transition: 'background-color 0.15s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--brand-soft)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    background: 'var(--brand-gradient)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    fontSize: '0.8rem',
                    fontWeight: 800
                  }}>
                    {s.founder.avatar}
                  </div>
                  <div>
                    <strong style={{ fontSize: '0.925rem', color: 'var(--text-primary)' }}>{s.name}</strong>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginLeft: '8px' }}>{s.categoryLabel}</span>
                  </div>
                </div>

                <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, fontSize: '0.9rem', color: 'var(--brand-primary)' }}>
                  {formatCurrency(s.arr, currency)}
                </div>
              </div>
            ))
          )}
        </div>

        <div style={{
          padding: '0.75rem 1.25rem',
          background: 'var(--bg-subtle)',
          borderTop: '1px solid var(--border-light)',
          fontSize: '0.75rem',
          color: 'var(--text-muted)',
          display: 'flex',
          justifyContent: 'space-between'
        }}>
          <span>Press <strong>Esc</strong> to close</span>
          <span>FounderLedger Quick Search</span>
        </div>
      </motion.div>
    </div>
  );
}
