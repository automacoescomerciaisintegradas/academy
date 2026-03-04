'use client';

import { useState, useEffect, useRef } from 'react';
import { useScroll, useTransform } from 'framer-motion';

/**
 * Interface para configuração do Frame Scrubber
 */
interface FrameScrubberProps {
  /** URL base das imagens (ex: '/frames/frame-') */
  imageBaseUrl: string;
  /** Formato do arquivo (ex: 'webp', 'jpg', 'png') */
  imageFormat?: string;
  /** Número total de frames na sequência */
  totalFrames: number;
  /** Padding dos números (ex: 3 = 001, 002, 003) */
  numberPadding?: number;
  /** Altura da seção em vh */
  sectionHeight?: number;
  /** Children para sobrepor ao vídeo */
  children?: React.ReactNode;
}

/**
 * FrameScrubber - Controle granular de frames com scroll
 * 
 * Como funciona:
 * - Carrega uma sequência de imagens numeradas
 * - Controla qual frame é exibido baseado no scroll
 * - Usa canvas para melhor performance
 * 
 * Exemplo de uso:
 * <FrameScrubber
 *   imageBaseUrl="/frames/hero-frame-"
 *   totalFrames={120}
 *   imageFormat="webp"
 *   numberPadding={3}
 * />
 * 
 * Estrutura de arquivos esperada:
 * /public/frames/hero-frame-001.webp
 * /public/frames/hero-frame-002.webp
 * ...
 * /public/frames/hero-frame-120.webp
 */
export const FrameScrubber: React.FC<FrameScrubberProps> = ({
  imageBaseUrl,
  imageFormat = 'webp',
  totalFrames,
  numberPadding = 3,
  sectionHeight = 300,
  children,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentFrame, setCurrentFrame] = useState(1);
  const [progress, setProgress] = useState(0);
  
  // Cache de imagens pré-carregadas
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const loadedImagesRef = useRef<number>(0);

  // Hook de scroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Transforma scroll em frame atual
  const frame = useTransform(scrollYProgress, [0, 1], [1, totalFrames]);

  // Atualiza frame atual
  useEffect(() => {
    const unsubscribe = frame.on('change', (latest) => {
      const newFrame = Math.min(Math.round(latest), totalFrames);
      setCurrentFrame(newFrame);
      setProgress((newFrame / totalFrames) * 100);
    });

    return () => unsubscribe();
  }, [frame, totalFrames]);

  // Pré-carrega todas as imagens
  useEffect(() => {
    let loaded = 0;
    const images: HTMLImageElement[] = [];

    for (let i = 1; i <= totalFrames; i++) {
      const img = new Image();
      const frameNumber = String(i).padStart(numberPadding, '0');
      img.src = `${imageBaseUrl}${frameNumber}.${imageFormat}`;
      
      img.onload = () => {
        loaded++;
        loadedImagesRef.current = loaded;
        
        if (loaded === totalFrames) {
          setIsLoaded(true);
        }
      };
      
      images.push(img);
    }

    imagesRef.current = images;

    return () => {
      // Limpa cache
      imagesRef.current = [];
    };
  }, [imageBaseUrl, imageFormat, totalFrames, numberPadding]);

  // Renderiza frame no canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !imagesRef.current[currentFrame - 1]) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = imagesRef.current[currentFrame - 1];
    
    // Ajusta canvas para proporção da imagem
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Desenha imagem centralizada e com cover
    const canvasAspect = canvas.width / canvas.height;
    const imgAspect = img.naturalWidth / img.naturalHeight;
    
    let renderWidth: number;
    let renderHeight: number;
    let offsetX = 0;
    let offsetY = 0;

    if (canvasAspect > imgAspect) {
      renderHeight = canvas.height;
      renderWidth = img.naturalWidth * (canvas.height / img.naturalHeight);
      offsetX = (canvas.width - renderWidth) / 2;
    } else {
      renderWidth = canvas.width;
      renderHeight = img.naturalHeight * (canvas.width / img.naturalWidth);
      offsetY = (canvas.height - renderHeight) / 2;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, offsetX, offsetY, renderWidth, renderHeight);
  }, [currentFrame]);

  return (
    <div
      ref={containerRef}
      className="relative"
      style={{ height: `${sectionHeight}vh` }}
    >
      {/* Sticky Container */}
      <div className="sticky top-0 h-screen overflow-hidden bg-[#0a0b0f]">
        {/* Canvas para renderização dos frames */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{
            objectFit: 'cover',
            opacity: isLoaded ? 1 : 0,
            transition: 'opacity 0.5s ease',
          }}
        />

        {/* Loading State */}
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-gold-500/30 border-t-gold-500 rounded-full animate-spin mx-auto mb-4" />
              <p className="text-gray-400">
                Carregando frames ({loadedImagesRef.current}/{totalFrames})
              </p>
            </div>
          </div>
        )}

        {/* Overlay Gradiente */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0b0f]/50 via-transparent to-[#0a0b0f]" />
        
        {/* Radial Gradient */}
        <div 
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{
            background: `radial-gradient(800px circle at 50% 50%, rgba(212,154,33,0.1) 0%, transparent 70%)`,
          }}
        />

        {/* Conteúdo sobreposto */}
        {children && <div className="relative z-10 h-full">{children}</div>}

        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
          <div
            className="h-full bg-gradient-to-r from-gold-500 to-gold-600 transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Frame Counter */}
        <div className="absolute top-6 right-6 text-xs text-gray-500 font-mono bg-black/50 px-3 py-1 rounded-full backdrop-blur-sm">
          Frame {currentFrame} / {totalFrames} ({progress.toFixed(0)}%)
        </div>
      </div>
    </div>
  );
};

export default FrameScrubber;
