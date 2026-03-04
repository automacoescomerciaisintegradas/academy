'use client';

import React from 'react';

interface PricingCardProps {
  name: string;
  price: number;
  originalPrice?: number;
  period: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  ctaText: string;
  onCtaClick: () => void;
}

export const PricingCard: React.FC<PricingCardProps> = ({
  name,
  price,
  originalPrice,
  period,
  description,
  features,
  isPopular = false,
  ctaText,
  onCtaClick,
}) => {
  return (
    <div
      className={`relative p-8 rounded-2xl border transition-all duration-300 ${
        isPopular
          ? 'bg-gradient-to-br from-gold-600/20 via-gold-600/10 to-transparent border-gold-500/40 shadow-[0_0_40px_rgba(212,154,33,0.2)]'
          : 'bg-gradient-to-br from-white/5 to-white/[0.02] border-white/10 hover:border-gold-500/20'
      }`}
    >
      {isPopular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-gold-500 to-gold-600 text-black font-bold text-sm rounded-full">
          ⭐ MAIS POPULAR
        </div>
      )}

      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-white mb-2">{name}</h3>
        <p className="text-gray-400 text-sm mb-4">{description}</p>
        <div className="flex items-center justify-center gap-3">
          {originalPrice && (
            <span className="text-gray-500 line-through text-lg">
              R$ {originalPrice.toFixed(2)}
            </span>
          )}
          <div className="flex items-baseline">
            <span className="text-5xl font-bold text-white">R$</span>
            <span className="text-6xl font-bold text-gold-400 ml-2">{price.toFixed(2)}</span>
          </div>
        </div>
        <p className="text-gray-500 text-sm mt-2">/{period}</p>
      </div>

      <ul className="space-y-4 mb-8">
        {features.map((feature, idx) => (
          <li key={idx} className="flex items-start gap-3">
            <span className="text-gold-400 mt-0.5">✓</span>
            <span className="text-gray-300 text-sm">{feature}</span>
          </li>
        ))}
      </ul>

      <button
        onClick={onCtaClick}
        className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
          isPopular
            ? 'bg-gradient-to-r from-gold-500 to-gold-600 text-black hover:shadow-[0_0_30px_rgba(212,154,33,0.4)] hover:scale-[1.02]'
            : 'bg-white/10 text-white hover:bg-white/15 border border-white/20'
        }`}
      >
        {ctaText}
      </button>
    </div>
  );
};

export default PricingCard;
