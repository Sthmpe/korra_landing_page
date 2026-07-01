import './index.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Import Pages
import { HomeLayout } from './pages/HomeLayout';
import { MerchantsDirectory } from './pages/MerchantsDirectory';
import { MerchantProfile } from './pages/MerchantProfile';
import { CategoryPage } from './pages/CategoryPage';
import { AdminPortal } from './pages/AdminPortal';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { ScrollToTop } from './components/SiteChrome';

export default function App() {
  const [isAdminRoute] = useState(() => typeof window !== 'undefined' && window.location.search.includes('admin=true'));
  const [merchantsList, setMerchantsList] = useState([]);
  const [loadingMerchants, setLoadingMerchants] = useState(true);

  useEffect(() => {
    const fetchMerchants = async () => {
      try {
        const res = await fetch('https://ltytmqjpektcgwajfzfm.supabase.co/functions/v1/merchants-api', { method: 'GET' });
        const data = await res.json();
        if (data.merchants) setMerchantsList(data.merchants);
      } catch (error) {
        console.error("Failed to load merchants:", error);
      } finally {
        setLoadingMerchants(false);
      }
    };
    fetchMerchants();
  }, []);

  if (isAdminRoute) {
     return <BrowserRouter><AdminPortal liveMerchants={merchantsList} /></BrowserRouter>;
  }

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomeLayout liveMerchants={merchantsList} />} />
        <Route path="/merchants" element={<MerchantsDirectory liveMerchants={merchantsList} loading={loadingMerchants} />} />
        <Route path="/merchant/:slug" element={<MerchantProfile liveMerchants={merchantsList} loading={loadingMerchants} />} />
        <Route path="/admin" element={<AdminPortal liveMerchants={merchantsList} />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/:categorySlug" element={<CategoryPage liveMerchants={merchantsList} loading={loadingMerchants} />} />
      </Routes>
    </BrowserRouter>
  );
}