'use client';

import React from 'react';

interface LogoProps {
    size?: number;
    className?: string;
    showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
    size = 40,
    className = '',
    showText = true
}) => {
    return (
        <div className={`flex items-center gap-3 ${className}`}>
            <svg
                width={size}
                height={size}
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="drop-shadow-glow"
            >
                <defs>
                    <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{ stopColor: '#D4AF37', stopOpacity: 1 }} />
                        <stop offset="100%" style={{ stopColor: '#8B6914', stopOpacity: 1 }} />
                    </linearGradient>
                    <linearGradient id="lightRay" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" style={{ stopColor: '#FFFACD', stopOpacity: 0.8 }} />
                        <stop offset="100%" style={{ stopColor: '#FFFACD', stopOpacity: 0 }} />
                    </linearGradient>
                </defs>

                {/* Bíblia Aberta (Fundamento) */}
                <path
                    d="M10 70C10 70 30 65 50 70C70 65 90 70 90 70V30C90 30 70 25 50 30C30 25 10 30 10 30V70Z"
                    fill="#F5F5F5"
                    stroke="#333"
                    strokeWidth="1"
                />
                <path
                    d="M50 30V70"
                    stroke="#DDD"
                    strokeWidth="1"
                />

                {/* Cruz Sutil Integrada */}
                <path
                    d="M50 38V62M42 46H58"
                    stroke="url(#goldGradient)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    opacity="0.8"
                />

                {/* Raio de Luz Descendente (Revelação) */}
                <path
                    d="M50 5L50 25M35 10L45 22M65 10L55 22"
                    stroke="url(#lightRay)"
                    strokeWidth="2"
                    strokeLinecap="round"
                />

                {/* Elemento Discreto Espírito (Pomba Minimalista) */}
                <path
                    d="M45 40C45 40 47 38 50 38C53 38 55 40 55 40"
                    stroke="#ADD8E6"
                    strokeWidth="1"
                    opacity="0.5"
                />
            </svg>

            {showText && (
                <div className="flex flex-col leading-tight">
                    <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gold-400">
                        PAZ e BEM
                    </span>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-gold-500 font-semibold">
                        Escola Teológica
                    </span>
                </div>
            )}
        </div>
    );
};

export default Logo;
