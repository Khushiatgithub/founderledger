export function formatCurrency(amountInINR, currency = 'INR', isPerMonth = false, usdRate = 83.5) {
  if (!amountInINR && amountInINR !== 0) return '—';

  if (currency === 'USD') {
    const usdAmount = amountInINR / usdRate;
    if (usdAmount >= 1000000) {
      return `$${(usdAmount / 1000000).toFixed(2)}M${isPerMonth ? '/mo' : ''}`;
    } else if (usdAmount >= 1000) {
      return `$${(usdAmount / 1000).toFixed(1)}k${isPerMonth ? '/mo' : ''}`;
    }
    return `$${Math.round(usdAmount).toLocaleString()}${isPerMonth ? '/mo' : ''}`;
  }

  // Default INR (Lakhs and Crores)
  if (amountInINR >= 10000000) {
    const cr = (amountInINR / 10000000).toFixed(2);
    return `₹${cr} Cr${isPerMonth ? '/mo' : ''}`;
  } else if (amountInINR >= 100000) {
    const lakh = (amountInINR / 100000).toFixed(1);
    return `₹${lakh}L${isPerMonth ? '/mo' : ''}`;
  } else if (amountInINR >= 1000) {
    return `₹${(amountInINR / 1000).toFixed(0)}k${isPerMonth ? '/mo' : ''}`;
  }
  return `₹${amountInINR.toLocaleString('en-IN')}${isPerMonth ? '/mo' : ''}`;
}

export function formatExactCurrency(amountInINR, currency = 'INR', usdRate = 83.5) {
  if (currency === 'USD') {
    const usd = Math.round(amountInINR / usdRate);
    return `$${usd.toLocaleString('en-US')}`;
  }
  return `₹${amountInINR.toLocaleString('en-IN')}`;
}
