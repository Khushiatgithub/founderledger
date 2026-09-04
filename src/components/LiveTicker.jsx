import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PLATFORM_DATA } from '../data/startups';

export default function LiveTicker() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % PLATFORM_DATA.tickerEvents.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const currentEvent = PLATFORM_DATA.tickerEvents[index];

  return (
    <aside className="top-live-ticker" aria-label="Platform Live Ledger Stream">
      <div className="ticker-pulse-tag">
        <span className="pulse-dot-green"></span>
        <span>LIVE LEDGER FEED</span>
      </div>
      <div style={{ minWidth: 320, textAlign: 'center', height: 20, overflow: 'hidden', position: 'relative' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--text-secondary)' }}
          >
            {currentEvent.text} • <span style={{ color: 'var(--text-tertiary)' }}>{currentEvent.time}</span>
          </motion.div>
        </AnimatePresence>
      </div>
    </aside>
  );
}
