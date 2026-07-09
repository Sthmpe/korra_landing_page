'use client';

import { useEffect, useState } from 'react';

// Ported from the old App.jsx, which fetched this once and prop-drilled it
// into HomeLayout/MerchantsDirectory/MerchantProfile/CategoryPage. Each of
// those is now its own Next.js page, so this hook is called independently
// wherever the merchant list is needed instead of drilling props through a
// router that no longer exists.
export function useLiveMerchants() {
  const [merchantsList, setMerchantsList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMerchants = async () => {
      try {
        const res = await fetch('https://ltytmqjpektcgwajfzfm.supabase.co/functions/v1/merchants-api', {
          method: 'GET',
        });
        const data = await res.json();
        if (data.merchants) setMerchantsList(data.merchants);
      } catch (error) {
        console.error('Failed to load merchants:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchMerchants();
  }, []);

  return { merchantsList, loading };
}
