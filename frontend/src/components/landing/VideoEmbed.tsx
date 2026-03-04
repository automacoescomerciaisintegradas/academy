'use client';

import { useState } from 'react';

interface VideoEmbedProps {
  videoId: string;
  title: string;
  thumbnail?: string;
  duration?: string;
}

export const VideoEmbed: React.FC<VideoEmbedProps> = ({
  videoId,
  title,
  thumbnail,
  duration,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="relative aspect-video bg-black rounded-xl overflow-hidden group">
      {!isPlaying ? (
        <>
          {/* Thumbnail */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(https://img.youtube.com/vi/${videoId}/maxresdefault.jpg)` }}
          >
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors"></div>
          </div>

          {/* Play Button */}
          <button
            onClick={() => setIsPlaying(true)}
            className="absolute inset-0 flex items-center justify-center z-10"
          >
            <div className="w-20 h-20 rounded-full bg-gold-500/90 flex items-center justify-center transform group-hover:scale-110 transition-all shadow-[0_0_30px_rgba(212,154,33,0.5)]">
              <svg className="w-10 h-10 text-black ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </button>

          {/* Duration Badge */}
          {duration && (
            <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/80 rounded text-xs text-white font-semibold">
              {duration}
            </div>
          )}

          {/* Title Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
            <h3 className="text-white font-semibold text-sm line-clamp-2">{title}</h3>
          </div>
        </>
      ) : (
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
          title={title}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      )}
    </div>
  );
};

export default VideoEmbed;
