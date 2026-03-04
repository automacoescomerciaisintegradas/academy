'use client';

import React from 'react';

interface TestimonialCardProps {
  name: string;
  role: string;
  avatar: string;
  content: string;
  rating: number;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({
  name,
  role,
  avatar,
  content,
  rating,
}) => {
  return (
    <div className="p-6 bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-xl hover:border-gold-500/20 transition-all duration-300">
      <div className="flex items-center gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <span key={i} className={i < rating ? 'text-yellow-400' : 'text-gray-600'}>
            ★
          </span>
        ))}
      </div>
      <p className="text-gray-300 mb-6 leading-relaxed italic">"{content}"</p>
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold-500/20 to-gold-600/10 border border-gold-500/30 flex items-center justify-center text-xl">
          {avatar}
        </div>
        <div>
          <p className="text-white font-bold">{name}</p>
          <p className="text-xs text-gold-400 uppercase tracking-widest">{role}</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
