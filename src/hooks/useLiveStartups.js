import { useState, useEffect, useCallback } from 'react';
import { fetchAllStartups } from '../services/supabaseService';
import { PLATFORM_DATA } from '../data/startups';

export function useLiveStartups() {
  const [startups, setStartups] = useState(PLATFORM_DATA.startups);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadStartups = useCallback(async () => {
    try {
      const list = await fetchAllStartups();
      setStartups(list);
    } catch (err) {
      console.warn('[useLiveStartups] Failed to load startups:', err);
      setError(err.message || 'Failed to load live startups');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadStartups();

    // Auto-update listener when new startup is added via AddStartupModal
    const handleNewStartup = (e) => {
      loadStartups();
    };

    window.addEventListener('founderledger:startup_created', handleNewStartup);
    window.addEventListener('storage', handleNewStartup);

    return () => {
      window.removeEventListener('founderledger:startup_created', handleNewStartup);
      window.removeEventListener('storage', handleNewStartup);
    };
  }, [loadStartups]);

  // Dynamically compute category counts
  const categories = [
    { id: 'all', label: 'All Categories', count: startups.length },
    { id: 'b2b_saas', label: 'B2B SaaS', count: startups.filter(s => s.category === 'b2b_saas').length },
    { id: 'ai_devtools', label: 'AI & DevTools', count: startups.filter(s => s.category === 'ai_devtools').length },
    { id: 'fintech', label: 'FinTech & Payments', count: startups.filter(s => s.category === 'fintech').length },
    { id: 'd2c_ecommerce', label: 'D2C & Commerce', count: startups.filter(s => s.category === 'd2c_ecommerce').length },
    { id: 'edtech_hr', label: 'EdTech & HR Tech', count: startups.filter(s => s.category === 'edtech_hr').length }
  ];

  return {
    startups,
    categories,
    loading,
    error,
    refetch: loadStartups
  };
}
