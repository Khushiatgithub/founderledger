import { useState, useEffect, useCallback } from 'react';
import {
  syncClerkUserToSupabase,
  fetchDashboardData,
  createTransaction,
  DEFAULT_STARTUP_STATS,
  DEFAULT_MRR_HISTORY,
  DEFAULT_CATEGORY_REVENUE,
  DEFAULT_CUSTOMER_GROWTH,
  DEFAULT_GATEWAY_DISTRIBUTION,
  DEFAULT_TRANSACTIONS
} from '../services/supabaseService';
import { isSupabaseConfigured } from '../lib/supabase';

export function useSupabaseData(user) {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [isLiveSupabase, setIsLiveSupabase] = useState(isSupabaseConfigured);
  
  const [stats, setStats] = useState(DEFAULT_STARTUP_STATS);
  const [mrrHistory, setMrrHistory] = useState(DEFAULT_MRR_HISTORY);
  const [categoryRevenue, setCategoryRevenue] = useState(DEFAULT_CATEGORY_REVENUE);
  const [customerGrowth, setCustomerGrowth] = useState(DEFAULT_CUSTOMER_GROWTH);
  const [gatewayDistribution, setGatewayDistribution] = useState(DEFAULT_GATEWAY_DISTRIBUTION);
  const [transactions, setTransactions] = useState(DEFAULT_TRANSACTIONS);

  const loadData = useCallback(async (isManualRefresh = false) => {
    if (isManualRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }
    setError(null);

    try {
      // 1. Sync Clerk user to Supabase profiles table if user is authenticated
      if (user) {
        await syncClerkUserToSupabase(user);
      }

      // 2. Fetch live dashboard metrics, revenue records, and transactions
      const res = await fetchDashboardData(user?.id);

      if (res.error) {
        setError(res.error);
      }

      setIsLiveSupabase(res.isLiveSupabase);
      setStats(res.stats || DEFAULT_STARTUP_STATS);
      setMrrHistory(res.mrrHistory || DEFAULT_MRR_HISTORY);
      setCategoryRevenue(res.categoryRevenue || DEFAULT_CATEGORY_REVENUE);
      setCustomerGrowth(res.customerGrowth || DEFAULT_CUSTOMER_GROWTH);
      setGatewayDistribution(res.gatewayDistribution || DEFAULT_GATEWAY_DISTRIBUTION);
      setTransactions(res.transactions || DEFAULT_TRANSACTIONS);
    } catch (err) {
      console.error('[useSupabaseData] Error loading data:', err);
      setError(err.message || 'Failed to load ledger data');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [user]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleAddTransaction = async (newTxn) => {
    // Optimistic UI update
    setTransactions(prev => [newTxn, ...prev]);

    if (isSupabaseConfigured) {
      const result = await createTransaction(newTxn);
      if (!result.success) {
        console.warn('Could not persist transaction to Supabase, retained in local session.');
      }
    }
  };

  return {
    loading,
    refreshing,
    error,
    isLiveSupabase,
    isConfigured: isSupabaseConfigured,
    stats,
    mrrHistory,
    categoryRevenue,
    customerGrowth,
    gatewayDistribution,
    transactions,
    refetch: () => loadData(true),
    addTransaction: handleAddTransaction
  };
}
