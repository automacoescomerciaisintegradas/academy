'use client';

import { useState, useEffect, useRef } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';

/**
 * Interface para Sprite Sheet Scrubber
 */
interface SpriteScrubberProps {
  /** URL da sprite sheet (imagem única com todos os frames) */
  spriteUrl: string;
  /** Número de frames na horizontal */
  framesPerRow: number;
  /** Número total de frames */
  totalFrames: number;
  /** Altura da seção em vh */
  sectionHeight?: number;
  /** Children para sobrepor */
  children?: React.ReactNode;
  /** Opacidade do vídeo (0-1) */
  opacity?: number;
}

/**
 * SpriteScrubber - Versão otimizada usando sprite sheet
 * 
 * Vantagens:
 * - Apenas 1 requisição HTTP (todas as imagens em 1 arquivo)
 * - Melhor performance que carregar 60-120 imagens separadas
 * - Menos uso de memória
 * 
 * Como criar sprite sheet:
 * 1. Exporte todos os frames como imagens individuais
 * 2. Use ferramentas como:
 *    - TexturePacker (https://www.codeandweb.com/texturepacker)
 *    - Shoebox (http://renderhjs.net/shoebox/)
 *    - Online: https://www.ezgif.com/sprite-maker
 * 3. Organize em grid (ex: 10 frames por linha)
 * 
 * Exemplo de uso:
 * <SpriteScrubber
 *   spriteUrl="/hero-sprite.webp"
 *   framesPerRow={10}
 *   totalFrames={60}
 *   sectionHeight={300}
 * />
 */
export const SpriteScrubber: React.FC<SpriteScrubberProps> = ({
  spriteUrl,
  framesPerRow,
  totalFrames,
  sectionHeight = 300,
  opacity = 0.6,
  children,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [spriteImage, setSpriteImage] = useState<HTMLImageElement | null>(null);

  // Hook de scroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Transforma scroll em frame atual (0 a totalFrames-1)
  const frame = useTransform(scrollYProgress, [0, 1], [0, totalFrames - 1]);

  // Atualiza frame atual
  useEffect(() => {
    const unsubscribe = frame.on('change', (latest) => {
      setCurrentFrame(Math.round(latest));
    });

    return () => unsubscribe();
  }, [frame]);

  // Carrega sprite sheet
  useEffect(() => {
    const img = new Image();
    img.src = spriteUrl;
    
    img.onload = () => {
      setSpriteImage(img);
      setIsLoaded(true);
    };

    img.onerror = () => {
      console.error('Erro ao carregar sprite sheet:', spriteUrl);
    };
  }, [spriteUrl]);

  // Renderiza frame atual no canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !spriteImage) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Configura canvas
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Calcula dimensões do frame na sprite sheet
    const spriteWidth = spriteImage.naturalWidth;
    const spriteHeight = spriteImage.naturalHeight;
    const frameWidth = spriteWidth / framesPerRow;
    const frameHeight = spriteHeight / Math.ceil(totalFrames / framesPerRow);

    // Calcula posição do frame atual na sprite sheet
    const row = Math.floor(currentFrame / framesPerRow);
    const col = currentFrame % framesPerRow;
    const sourceX = col * frameWidth;
    const sourceY = row * frameHeight;

    // Limpa canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Desenha frame atual com efeito de cover
    const canvasAspect = canvas.width / canvas.height;
    const frameAspect = frameWidth / frameHeight;

    let renderWidth: number;
    let renderHeight: number;
    let offsetX = 0;
    let offsetY = 0;

    if (canvasAspect > frameAspect) {
      renderHeight = canvas.height;
      renderWidth = frameWidth * (canvas.height / frameHeight);
      offsetX = (canvas.width - renderWidth) / 2;
    } else {
      renderWidth = canvas.width;
      renderHeight = frameHeight * (canvas.width / frameWidth);
      offsetY = (canvas.height - renderHeight) / 2;
    }

    ctx.globalAlpha = opacity;
    ctx.drawImage(
      spriteImage,
      sourceX, sourceY, frameWidth, frameHeight, // Source (frame na sprite)
      offsetX, offsetY, renderWidth, renderHeight // Destination (canvas)
    );
    ctx.globalAlpha = 1;
  }, [currentFrame, spriteImage, framesPerRow, totalFrames, opacity]);

  // Calcula progresso em porcentagem
  const progressPercent = useTransform(scrollYProgress, (value) => 
    Math.round(value * 100)
  );

  return (
    <div
      ref={containerRef}
      className="relative"
      style={{ height: `${sectionHeight}vh` }}
    >
      {/* Sticky Container */}
      <div className="sticky top-0 h-screen overflow-hidden bg-[#0a0b0f]">
        {/* Canvas para renderização */}
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
              <motion.div
                className="w-16 h-16 border-4 border-gold-500/30 border-t-gold-500 rounded-full mx-auto mb-4"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              />
              <p className="text-gray-400">Carregando sprite sheet...</p>
            </div>
          </div>
        )}

        {/* Overlay Gradiente */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0b0f]/50 via-transparent to-[#0a0b0f]" />
        
        {/* Radial Gradient Dourado */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(1000px circle at 10% 10%, rgba(212,154,33,0.15) 0%, transparent 60%)`,
          }}
        />

        {/* Conteúdo sobreposto */}
        {children && <div className="relative z-10 h-full">{children}</div>}

        {/* Progress Bar Inferior */}
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

        {/* Frame Counter */}
        <div className="absolute top-6 right-6 text-xs text-gray-500 font-mono bg-black/50 px-3 py-1 rounded-full backdrop-blur-sm border border-white/10">
          <span className="text-gold-400">{currentFrame + 1}</span> / {totalFrames}
        </div>
      </div>
    </div>
  );
};

export default SpriteScrubber;
