'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Course {
  id: string;
  title: string;
  description: string;
  image: string;
  hours: number;
  lessons: number;
  students: number;
  progress?: number;
  isFree?: boolean;
  badge?: string;
}

interface CourseCarouselProps {
  title: string;
  subtitle?: string;
  courses: Course[];
  viewAllLink?: string;
}

export const CourseCarousel: React.FC<CourseCarouselProps> = ({
  title,
  subtitle,
  courses,
  viewAllLink,
}) => {
  const router = useRouter();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      scrollRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="py-12 relative">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">{title}</h2>
            {subtitle && <p className="text-gray-400">{subtitle}</p>}
          </div>
          {viewAllLink && (
            <button
              onClick={() => router.push(viewAllLink)}
              className="text-gold-400 font-semibold hover:text-gold-300 transition-colors flex items-center gap-2"
            >
              Ver todos
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Left Arrow */}
          {showLeftArrow && (
            <button
              onClick={() => scroll('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-black/80 border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-gold-600 hover:border-gold-500 transition-all shadow-lg"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          {/* Courses Scroll */}
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex gap-6 overflow-x-auto scrollbar-thin scrollbar-thumb-gold-500/30 scrollbar-track-transparent pb-4"
            style={{ scrollbarWidth: 'thin' }}
          >
            {courses.map((course) => (
              <div
                key={course.id}
                className="flex-shrink-0 w-80 bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-xl overflow-hidden hover:border-gold-500/30 transition-all group cursor-pointer"
                onClick={() => router.push(`/academy/${course.id}`)}
              >
                {/* Thumbnail */}
                <div className="relative h-48 bg-gradient-to-br from-indigo-900/30 to-purple-900/20 overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center text-7xl group-hover:scale-110 transition-transform duration-300">
                    {course.image}
                  </div>
                  
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-gold-500/90 flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform">
                      <svg className="w-8 h-8 text-black ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>

                  {/* Badge */}
                  {course.badge && (
                    <div className="absolute top-3 left-3 px-3 py-1 bg-gold-500 text-black font-bold text-xs rounded-full">
                      {course.badge}
                    </div>
                  )}

                  {/* Free Badge */}
                  {course.isFree && (
                    <div className="absolute top-3 right-3 px-3 py-1 bg-green-500 text-white font-bold text-xs rounded-full">
                      GRÁTIS
                    </div>
                  )}

                  {/* Duration */}
                  <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/80 rounded text-xs text-white">
                    {course.hours}h
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-gold-300 transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-sm text-gray-400 mb-4 line-clamp-2">{course.description}</p>

                  {/* Stats */}
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                      {course.lessons} aulas
                    </span>
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                      {course.students}
                    </span>
                  </div>

                  {/* Progress Bar */}
                  {course.progress !== undefined && (
                    <div className="mb-3">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-400">Progresso</span>
                        <span className="text-gold-400 font-semibold">{course.progress}%</span>
                      </div>
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-gold-500 to-gold-600 rounded-full transition-all duration-500"
                          style={{ width: `${course.progress}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Watch Button */}
                  <button className="w-full py-3 bg-gradient-to-r from-gold-500 to-gold-600 text-black font-bold rounded-lg hover:shadow-[0_0_20px_rgba(212,154,33,0.4)] transition-all">
                    {course.progress !== undefined ? 'Continuar' : 'Assistir agora'}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          {showRightArrow && (
            <button
              onClick={() => scroll('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-black/80 border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-gold-600 hover:border-gold-500 transition-all shadow-lg"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default CourseCarousel;
