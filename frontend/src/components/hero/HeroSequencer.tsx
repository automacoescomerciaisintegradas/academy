'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { ChevronDown, Play, ArrowRight } from 'lucide-react';

/**
 * Interface para opções de configuração do Hero Sequencer
 */
interface HeroSequencerProps {
  totalFrames?: number;
  videoUrl?: string;
  imageUrl?: string;
  title?: string;
  subtitle?: string;
  ctaText?: string;
  onCtaClick?: () => void;
}

/**
 * HeroSequencer - Componente de Hero com efeito de scrubbing de frames
 * 
 * Como funciona:
 * - Usa o scroll da página para controlar qual frame é exibido
 * - Cada frame é uma imagem/WebP que representa um momento da animação
 * - O efeito é similar ao usado pela Apple em páginas de produto
 * 
 * Para usar:
 * 1. Substitua a URL do WebP pela sua sequência de frames
 * 2. Ajuste o totalFrames para o número total de imagens na sequência
 * 3. Opcional: Use sprite sheet ou imagens individuais
 */
export const HeroSequencer: React.FC<HeroSequencerProps> = ({
  totalFrames = 60,
  videoUrl = 'https://assets.codepen.io/1462889/internal/videos/hero/hero-video.webm',
  imageUrl = 'https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2',
  title = 'Fundamentados na Palavra',
  subtitle = 'Preparados para o Reino',
  ctaText = 'Começar Agora',
  onCtaClick,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentFrame, setCurrentFrame] = useState(1);
  const [isLoaded, setIsLoaded] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Hook de scroll da Framer Motion
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Transforma o progresso do scroll em número de frames
  const frame = useTransform(scrollYProgress, [0, 1], [1, totalFrames]);

  // Suaviza a transição entre frames
  const smoothFrame = useSpring(frame, {
    stiffness: 100,
    damping: 30,
    mass: 0.5,
  });

  // Atualiza o frame atual baseado no scroll
  useEffect(() => {
    const unsubscribe = smoothFrame.on('change', (latest) => {
      setCurrentFrame(Math.round(latest));
    });

    return () => unsubscribe();
  }, [smoothFrame]);

  // Carrega a imagem e pega dimensões
  useEffect(() => {
    const img = new Image();
    img.src = imageUrl;
    img.onload = () => {
      setDimensions({
        width: img.naturalWidth,
        height: img.naturalHeight,
      });
      setIsLoaded(true);
    };
  }, [imageUrl]);

  // Calcula o progresso em porcentagem
  const progressPercent = useTransform(scrollYProgress, (value) => 
    Math.round(value * 100)
  );

  return (
    <div 
      ref={containerRef} 
      className="relative h-[300vh] bg-[#0a0b0f]"
      style={{ minHeight: '300vh' }}
    >
      {/* Hero Sticky Container */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Background com Scrubbing */}
        <div className="absolute inset-0 flex items-center justify-center">
          {/* 
            OPÇÃO 1: Usando vídeo WebM (mais performático)
            Se tiver o vídeo, use esta abordagem
          */}
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-60"
            style={{
              clipPath: `inset(0 ${100 - (currentFrame / totalFrames) * 100}% 0 0)`,
            }}
          >
            <source src={videoUrl} type="video/webm" />
          </video>

          {/* 
            OPÇÃO 2: Usando sequência de imagens/WebP
            Para usar frames individuais, substitua por:
          */}
          {!isLoaded && (
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 to-purple-900/20 animate-pulse" />
          )}
          
          <motion.div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${imageUrl})`,
              opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 0.8, 0.4]),
              scale: useTransform(scrollYProgress, [0, 1], [1, 1.1]),
            }}
          />

          {/* Overlay Gradiente */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0b0f]/50 via-[#0a0b0f]/20 to-[#0a0b0f]" />
          
          {/* Radial Gradient */}
          <div 
            className="absolute inset-0 opacity-30"
            style={{
              background: `radial-gradient(1200px circle at 10% 10%, rgba(212,154,33,0.15) 0%, transparent 50%)`,
            }}
          />
        </div>

        {/* Conteúdo do Hero */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-4">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gold-600/20 border border-gold-500/30 rounded-full mb-8 backdrop-blur-sm"
          >
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm font-semibold text-gold-300">
              🎓 +2.500 Alunos Formados
            </span>
          </motion.div>

          {/* Título Principal */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-center mb-6"
          >
            <span className="block text-white">{title}</span>
            <span 
              className="block bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 bg-clip-text text-transparent"
              style={{
                filter: 'drop-shadow(0 0 30px rgba(212, 154, 33, 0.3))',
              }}
            >
              {subtitle}
            </span>
          </motion.h1>

          {/* Descrição */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg md:text-xl text-gray-300 text-center max-w-2xl mb-10"
          >
            Capacite-se com solidez bíblica e maturidade espiritual. 
            Una-se a milhares de alunos em nossa plataforma.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <button
              onClick={onCtaClick}
              className="group px-8 py-4 bg-gradient-to-r from-gold-500 to-gold-600 text-black font-bold text-lg rounded-full 
                         hover:shadow-[0_0_40px_rgba(212,154,33,0.5)] transition-all duration-300 hover:scale-105
                         flex items-center gap-3"
            >
              {ctaText}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <span className="text-xs text-gray-500 uppercase tracking-widest">Role para explorar</span>
            <ChevronDown className="w-6 h-6 text-gray-400 animate-bounce" />
          </motion.div>
        </div>

        {/* Progress Bar */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-1 bg-white/10"
        >
          <motion.div
            className="h-full bg-gradient-to-r from-gold-500 to-gold-600"
            style={{
              width: useTransform(scrollYProgress, [0, 1], ['0%', '100%']),
            }}
          />
        </motion.div>

        {/* Frame Counter (opcional, para debug) */}
        <div className="absolute top-6 right-6 text-xs text-gray-500 font-mono">
          Frame: {currentFrame} / {totalFrames}
        </div>
      </div>
    </div>
  );
};

export default HeroSequencer;
