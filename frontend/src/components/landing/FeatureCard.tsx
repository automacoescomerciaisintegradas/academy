'use client';

import React from 'react';

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="group p-6 bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-xl hover:border-gold-500/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,154,33,0.15)]">
      <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">{icon}</div>
      <h3 className="font-bold text-lg mb-2 text-white group-hover:text-gold-300 transition-colors">{title}</h3>
      <p className="text-sm text-gray-400 leading-relaxed">{description}</p>
    </div>
  );
};

export default FeatureCard;
