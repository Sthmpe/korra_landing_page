import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export const CategoryPage = () => {
  const { categorySlug } = useParams();
  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="bg-white shadow-sm p-4">
        <Link to="/"><ArrowLeft size={24} /></Link>
      </nav>
      <div className="p-8">
        <h1 className="text-3xl font-bold capitalize text-slate-800">{categorySlug}</h1>
      </div>
    </div>
  );
};
