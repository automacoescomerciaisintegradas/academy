'use client';

import React from 'react';

interface LampiaoAvatarProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const sizeMap = {
  sm: '80px',
  md: '120px',
  lg: '160px',
  xl: '200px',
};

export const LampiaoAvatar: React.FC<LampiaoAvatarProps> = ({ 
  size = 'lg', 
  className = '' 
}) => {
  const dimension = sizeMap[size];

  return (
    <svg
      viewBox="0 0 256 256"
      xmlns="http://www.w3.org/2000/svg"
      width={dimension}
      height={dimension}
      className={`avatar-lampiao ${className}`}
      style={{
        filter: 'drop-shadow(0 0 30px rgba(99, 102, 241, 0.2))',
        animation: 'avatarSubtle 4s ease-in-out infinite',
        transition: 'all 0.3s ease',
      }}
    >
      <defs>
        {/* Gradientes */}
        <linearGradient id="skinGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#b8860b', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#8b6914', stopOpacity: 1 }} />
        </linearGradient>

        <linearGradient id="hatGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#5c4033', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#3e2723', stopOpacity: 1 }} />
        </linearGradient>

        <radialGradient id="faceGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" style={{ stopColor: '#d4a574', stopOpacity: 0.8 }} />
          <stop offset="100%" style={{ stopColor: '#a0826d', stopOpacity: 1 }} />
        </radialGradient>

        <linearGradient id="mysticalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#6366f1', stopOpacity: 0.5 }} />
          <stop offset="100%" style={{ stopColor: '#8b5cf6', stopOpacity: 0.5 }} />
        </linearGradient>
      </defs>

      {/* Presença mística - glow ao fundo */}
      <circle cx="128" cy="128" r="120" fill="none" stroke="rgba(139,92,246,0.1)" strokeWidth="8" />
      <circle cx="128" cy="128" r="100" fill="none" stroke="rgba(99,102,241,0.05)" strokeWidth="4" />

      {/* Cabeça/Rosto */}
      <circle cx="128" cy="100" r="45" fill="url(#faceGlow)" stroke="#6b5344" strokeWidth="2" />

      {/* Cabelos (longos, cangaceiro) */}
      <path
        d="M 100 85 Q 85 70 90 50 Q 95 40 128 35 Q 161 40 166 50 Q 171 70 156 85"
        fill="#2c1810"
        stroke="#1a0f08"
        strokeWidth="1.5"
      />

      {/* Chapéu de Vaqueiro */}
      <g id="hat">
        {/* Base do chapéu */}
        <ellipse cx="128" cy="55" rx="55" ry="15" fill="url(#hatGradient)" stroke="#3e2723" strokeWidth="2" />
        {/* Abas */}
        <path
          d="M 70 65 Q 65 50 75 45 Q 128 30 181 45 Q 191 50 186 65"
          fill="#8b6f47"
          stroke="#6b5344"
          strokeWidth="2"
        />
        {/* Fita dourada */}
        <ellipse cx="128" cy="68" rx="52" ry="8" fill="none" stroke="#d4a574" strokeWidth="2" opacity="0.7" />
      </g>

      {/* Bandoleira de couro */}
      <path
        d="M 110 110 Q 100 130 105 160"
        fill="none"
        stroke="#8b6f47"
        strokeWidth="8"
        strokeLinecap="round"
        opacity="0.8"
      />
      <circle cx="107" cy="120" r="3" fill="#d4a574" />
      <circle cx="108" cy="140" r="3" fill="#d4a574" />
      <circle cx="110" cy="160" r="3" fill="#d4a574" />

      {/* Olhos (intensos, destemidos) */}
      <circle cx="120" cy="95" r="4" fill="#1a1a1a" stroke="#8b6f47" strokeWidth="0.5" />
      <circle cx="136" cy="95" r="4" fill="#1a1a1a" stroke="#8b6f47" strokeWidth="0.5" />
      {/* Brilho nos olhos */}
      <circle cx="121" cy="94" r="1.5" fill="#ffffff" opacity="0.8" />
      <circle cx="137" cy="94" r="1.5" fill="#ffffff" opacity="0.8" />

      {/* Nariz */}
      <path
        d="M 128 95 L 128 108"
        fill="none"
        stroke="#8b6f47"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* Boca (séria, resoluta) */}
      <path
        d="M 118 115 Q 128 118 138 115"
        fill="none"
        stroke="#6b5344"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.6"
      />

      {/* Cicatriz (característica) */}
      <path
        d="M 115 105 L 118 110"
        fill="none"
        stroke="#8b6f47"
        strokeWidth="1.5"
        opacity="0.6"
        strokeLinecap="round"
      />

      {/* Ombros/Tronco */}
      <ellipse cx="128" cy="150" rx="40" ry="35" fill="#6b5344" opacity="0.3" stroke="#5c4033" strokeWidth="1.5" />

      {/* Aura mística */}
      <circle
        cx="128"
        cy="128"
        r="125"
        fill="none"
        stroke="url(#mysticalGradient)"
        strokeWidth="2"
        opacity="0.3"
      />
    </svg>
  );
};

export default LampiaoAvatar;
