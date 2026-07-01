import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export const MerchantProfile = ({ liveMerchants = [], loading }) => {
  const { slug } = useParams();
  const merchant = liveMerchants.find(m => m.name.toLowerCase().replace(/\s+/g, '-') === slug);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!merchant) return <div className="min-h-screen flex items-center justify-center">Not found.</div>;

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <nav className="bg-white sticky top-0 z-50 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center">
          <Link to="/merchants"><ArrowLeft size={24} /></Link>
          <span className="ml-4 font-bold">{merchant.name}</span>
        </div>
      </nav>
      <div className="max-w-4xl mx-auto px-4 pt-8">
        <div className="bg-white rounded-3xl overflow-hidden shadow-sm">
          <div className="h-48 md:h-80 w-full">
            <img src={merchant.imageUrl} alt="" className="w-full h-full object-cover" />
          </div>
          <div className="p-6 md:p-12">
            <h1 className="text-2xl font-extrabold mb-2">{merchant.name}</h1>
            <p className="text-slate-500 mb-6">{merchant.location}</p>
            <p className="text-slate-600 mb-8">{merchant.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
