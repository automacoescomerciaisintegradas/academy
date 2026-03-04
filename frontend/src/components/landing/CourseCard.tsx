'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

interface CourseCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  price: number;
  originalPrice?: number;
  lessons: number;
  students: number;
  rating: number;
  level: string;
  instructor: string;
  badge?: string;
}

export const CourseCard: React.FC<CourseCardProps> = ({
  id,
  title,
  description,
  image,
  price,
  originalPrice,
  lessons,
  students,
  rating,
  level,
  instructor,
  badge,
}) => {
  const router = useRouter();

  return (
    <div className="group bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-2xl overflow-hidden hover:border-gold-500/30 transition-all duration-300 hover:shadow-[0_0_40px_rgba(212,154,33,0.15)] hover:-translate-y-2">
      {/* Card Header */}
      <div className="relative h-48 bg-gradient-to-br from-indigo-900/30 to-purple-900/20 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(1200px_circle_at_10%_10%,rgba(212,154,33,0.1)_0%,transparent_50%)]"></div>
        <div className="text-7xl group-hover:scale-110 transition-transform duration-300 z-10">{image}</div>
        
        {badge && (
          <div className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-gold-500 to-gold-600 text-black font-bold text-xs rounded-full">
            {badge}
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="px-2 py-1 bg-indigo-600/20 text-indigo-300 text-xs font-semibold rounded">
            {level}
          </span>
          <div className="flex items-center gap-1 text-yellow-400 text-sm">
            <span>★</span>
            <span className="font-semibold">{rating}</span>
            <span className="text-gray-500">({students})</span>
          </div>
        </div>

        <h3 className="text-xl font-bold text-white mb-2 line-clamp-2 group-hover:text-gold-300 transition-colors">
          {title}
        </h3>
        <p className="text-gray-400 text-sm mb-4 line-clamp-2 leading-relaxed">
          {description}
        </p>

        <div className="flex items-center gap-2 mb-4 text-sm text-gray-500">
          <span>👨‍🏫</span>
          <span>{instructor}</span>
        </div>

        <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/10">
          <div className="text-center">
            <div className="text-2xl font-bold text-gold-400">{lessons}</div>
            <div className="text-xs text-gray-500">Aulas</div>
          </div>
          <div className="w-px h-10 bg-white/10"></div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-400">{students}</div>
            <div className="text-xs text-gray-500">Alunos</div>
          </div>
          <div className="w-px h-10 bg-white/10"></div>
          <div className="text-center">
            <div className="text-2xl font-bold text-indigo-400">{rating}</div>
            <div className="text-xs text-gray-500">Avaliação</div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            {originalPrice && (
              <div className="text-sm text-gray-500 line-through">
                R$ {originalPrice.toFixed(2)}
              </div>
            )}
            <div className="text-3xl font-bold text-white">
              R$ <span className="text-gold-400">{price.toFixed(2)}</span>
            </div>
          </div>
          <button
            onClick={() => router.push(`/academy/${id}`)}
            className="px-6 py-3 bg-gradient-to-r from-gold-500 to-gold-600 text-black font-bold rounded-xl hover:shadow-[0_0_25px_rgba(212,154,33,0.4)] transition-all duration-300 hover:scale-105"
          >
            Ver Curso
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
