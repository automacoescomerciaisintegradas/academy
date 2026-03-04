'use client';

import React, { useRef, useState, useEffect } from 'react';

interface ConnectedUser {
  id: string;
  name: string;
  avatar: string;
  lastSeen: string;
  isOnline: boolean;
}

interface PremiumCarouselProps {
  users: ConnectedUser[];
  title?: string;
  onUserClick?: (user: ConnectedUser) => void;
}

export const PremiumCarousel: React.FC<PremiumCarouselProps> = ({
  users,
  title = 'Conectados Agora',
  onUserClick,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const handleScroll = () => {
    if (containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    handleScroll();
  }, [users]);

  const scroll = (direction: 'left' | 'right') => {
    if (containerRef.current) {
      const scrollAmount = 200;
      containerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const onlineCount = users.filter((u) => u.isOnline).length;

  return (
    <div className="relative bg-gradient-to-br from-gray-800/95 to-gray-900/95 backdrop-blur-2xl border border-purple-500/20 rounded-3xl p-5 transition-all duration-300 hover:border-indigo-500/30 hover:shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/5">
        <h3 className="flex items-center gap-2 font-semibold text-white">
          <span
            className="w-2 h-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"
            style={{
              boxShadow: '0 0 10px rgba(16, 185, 129, 0.5)',
              animation: 'pulse 2s ease-in-out infinite',
            }}
          />
          {title}
        </h3>
        <span className="text-xs font-medium text-gray-300 bg-indigo-600/10 px-3 py-1 rounded-full border border-indigo-500/20">
          {onlineCount} online
        </span>
      </div>

      {/* Carousel Container */}
      <div
        className="overflow-x-auto overflow-y-hidden scroll-smooth pb-2"
        ref={containerRef}
        onScroll={handleScroll}
        style={{ scrollbarWidth: 'none' }}
      >
        <div className="flex gap-3 whitespace-nowrap pb-1">
          {/* User Items */}
          {users.map((user) => (
            <button
              key={user.id}
              onClick={() => onUserClick?.(user)}
              className="inline-flex items-center gap-2.5 flex-shrink-0 px-4 py-3 bg-white/4 border border-white/8 rounded-xl hover:bg-indigo-600/15 hover:border-indigo-500/30 transition-all duration-200 hover:-translate-y-0.5 group cursor-pointer"
            >
              {/* Avatar */}
              <div className="relative flex-shrink-0">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-10 h-10 rounded-full object-cover border border-white/20 group-hover:border-indigo-500/50"
                />
                {user.isOnline && (
                  <span
                    className="absolute bottom-0 right-0 w-3 h-3 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full border border-gray-900"
                    style={{
                      boxShadow: '0 0 8px rgba(16, 185, 129, 0.6)',
                    }}
                  />
                )}
              </div>

              {/* User Info */}
              <div className="text-left">
                <p className="text-sm font-medium text-white truncate">{user.name}</p>
                <p className="text-xs text-gray-400">{user.lastSeen}</p>
              </div>
            </button>
          ))}

          {/* More Users Badge */}
          {users.length > 10 && (
            <div className="inline-flex items-center justify-center flex-shrink-0 px-4 py-3 min-w-[100px] bg-gradient-to-br from-indigo-600/10 to-purple-600/10 border border-purple-500/20 rounded-xl hover:from-indigo-600/20 hover:to-purple-600/20 group cursor-pointer">
              <div className="text-center">
                <p className="text-lg font-bold text-indigo-400">+{users.length - 10}</p>
                <p className="text-xs text-gray-400 uppercase tracking-wider">Mais</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Arrows */}
      {canScrollLeft && (
        <button
          onClick={() => scroll('left')}
          className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-indigo-600/20 border border-indigo-500/30 text-white hover:bg-indigo-600/40 transition-all z-10 flex items-center justify-center"
          aria-label="Anterior"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M15 19l-7-7 7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}

      {canScrollRight && (
        <button
          onClick={() => scroll('right')}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-indigo-600/20 border border-indigo-500/30 text-white hover:bg-indigo-600/40 transition-all z-10 flex items-center justify-center"
          aria-label="Próximo"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M9 5l7 7-7 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default PremiumCarousel;
