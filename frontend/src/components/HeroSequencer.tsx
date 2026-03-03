
"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { ChevronDown, Play, ArrowRight, Instagram, Twitter, Youtube } from "lucide-react";

/**
 * Interface para opções de configuração do Hero
 */
interface HeroProps {
    imageCount?: number; // Total de frames na sequência
    imagePrefix?: string; // Prefixo da URL (ex: "/images/hero/frame_")
    imageSuffix?: string; // Sufixo da URL (ex: ".webp")
    startColor?: string; // Cor inicial do fundo (se não houver imagens)
    endColor?: string; // Cor final do fundo
}

export default function HeroSequencer({
    imageCount = 60, // Default para demonstração
    imagePrefix = "/images/sequence/frame_",
    imageSuffix = ".webp",
    startColor = "#0f172a", // Slate 900
    endColor = "#000000" // Black
}: HeroProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const [currentFrame, setCurrentFrame] = useState(0);

    // Scroll Progress (0 a 1)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Smooth Scroll
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // Mapear progresso para índice de frame
    const frameIndex = useTransform(smoothProgress, [0, 1], [0, imageCount - 1]);

    // Efeitos visuais baseados no scroll
    const textOpacity = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [1, 0, 0, 1]);
    const textY = useTransform(smoothProgress, [0, 0.2], [0, -50]);
    const heroScale = useTransform(smoothProgress, [0, 1], [1, 1.1]);
    const overlayOpacity = useTransform(smoothProgress, [0, 0.5], [0.3, 0.7]);

    // Atualizar frame atual para renderização
    useEffect(() => {
        const unsubscribe = frameIndex.on("change", (latest) => {
            setCurrentFrame(Math.round(latest));
        });
        return () => unsubscribe();
    }, [frameIndex]);

    // Simular carregamento de imagens (Placeholder logic)
    useEffect(() => {
        // Em produção, aqui você pré-carregaria as imagens reais
        const timer = setTimeout(() => setImagesLoaded(true), 1500);
        return () => clearTimeout(timer);
    }, []);

    // Placeholder para imagens (Gradiente dinâmico se não houver imagens reais)
    // Na implementação real, isso seria substituído pela tag <img src="..." />
    const renderFrame = () => {
        // Calcular cor baseada no frame atual para demonstrar a mudança
        // Isso é apenas visualização placeholder
        const progress = currentFrame / imageCount;
        // Interpolação simples de cor para demo
        const r = Math.round(15 + (0 - 15) * progress); // Slate-900 R to Black R
        const g = Math.round(23 + (0 - 23) * progress); // Slate-900 G to Black G
        const b = Math.round(42 + (0 - 42) * progress); // Slate-900 B to Black B

        return {
            backgroundColor: `rgb(${r}, ${g}, ${b})`,
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(99, 102, 241, ${0.1 * (1 - progress)}) 0%, transparent 50%)`
        };
    };

    return (
        <div
            ref={containerRef}
            className="relative h-[400vh] bg-slate-950" // Altura expandida para permitir scroll longo
        >
            {/* Sticky Container - Onde a mágica acontece */}
            <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">

                {/* Background Layer (Parallax/Sequencer) */}
                <motion.div
                    className="absolute inset-0 w-full h-full z-0"
                    style={{
                        ...renderFrame(),
                        scale: heroScale
                    }}
                >
                    {/* Se houver imagens reais, descomentar e usar lógica abaixo: */}
                    {/* 
            <img 
              src={`${imagePrefix}${currentFrame.toString().padStart(3, '0')}${imageSuffix}`}
              alt="Hero Sequence"
              className="w-full h-full object-cover"
            />
          */}

                    {/* Overlay de Vinheta Cinemática */}
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-950/20 via-transparent to-slate-950/80 pointer-events-none" />
                    <motion.div
                        className="absolute inset-0 bg-black pointer-events-none"
                        style={{ opacity: overlayOpacity }}
                    />
                </motion.div>

                {/* Content Layer */}
                <div className="relative z-10 container mx-auto px-6 h-full flex flex-col justify-center">

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 h-full items-center">

                        {/* Left Content Block */}
                        <motion.div
                            className="md:col-span-5 lg:col-span-4"
                            style={{ opacity: textOpacity, y: textY }}
                        >
                            <div className="backdrop-blur-xl bg-slate-900/40 p-8 rounded-2xl border border-white/10 shadow-2xl shadow-indigo-500/10">
                                {/* Intro Line */}
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="flex items-center gap-2 mb-4"
                                >
                                    <span className="h-px w-8 bg-indigo-500"></span>
                                    <span className="text-indigo-400 font-semibold text-sm uppercase tracking-wider">
                                        Bem-vindo ao Futuro
                                    </span>
                                </motion.div>

                                {/* Main Headline */}
                                <motion.h1
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
                                >
                                    Experiência <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Cinematográfica</span><br />
                                    Imersiva
                                </motion.h1>

                                {/* Subtitle */}
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.4 }}
                                    className="text-slate-300 text-lg mb-8 leading-relaxed"
                                >
                                    Descubra uma nova dimensão de interação web. Role para controlar o tempo e explorar cada detalhe com precisão milimétrica.
                                </motion.p>

                                {/* CTA Buttons */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 }}
                                    className="flex flex-wrap gap-4"
                                >
                                    <button className="group relative px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg overflow-hidden transition-all duration-300 shadow-lg shadow-indigo-600/25">
                                        <span className="relative z-10 flex items-center gap-2">
                                            Começar Agora <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                        </span>
                                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    </button>

                                    <button className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-lg backdrop-blur-sm transition-all duration-300 flex items-center gap-2 group">
                                        <Play size={18} className="fill-current text-indigo-400 group-hover:text-white transition-colors" />
                                        <span>Ver Demo</span>
                                    </button>
                                </motion.div>
                            </div>
                        </motion.div>

                        {/* Right Side / Spacer (Keeps focus on background) */}
                        <div className="md:col-span-7 lg:col-span-8"></div>

                    </div>

                    {/* Bottom Elements */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8, duration: 0.8 }}
                        className="absolute bottom-8 left-0 w-full"
                    >
                        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-end md:items-center gap-6">

                            {/* Scroll Indicator */}
                            <div className="flex flex-col items-center gap-2 text-slate-400">
                                <span className="text-xs uppercase tracking-widest opacity-70">Scroll para Explorar</span>
                                <motion.div
                                    animate={{ y: [0, 8, 0] }}
                                    transition={{ repeat: Infinity, duration: 1.5 }}
                                    className="p-2 border border-white/10 rounded-full bg-white/5 backdrop-blur-sm"
                                >
                                    <ChevronDown size={20} className="text-indigo-400" />
                                </motion.div>
                            </div>

                            {/* Social Links */}
                            <div className="flex items-center gap-6">
                                <SocialLink icon={<Youtube size={20} />} href="#" label="YouTube" />
                                <SocialLink icon={<Instagram size={20} />} href="#" label="Instagram" />
                                <SocialLink icon={<Twitter size={20} />} href="#" label="X (Twitter)" />
                            </div>

                        </div>
                    </motion.div>

                </div>
            </div>

            {/* Content Section After Scroll (Demonstração de continuação) */}
            <div className="relative z-20 bg-black min-h-screen border-t border-white/10">
                <div className="container mx-auto px-6 py-24">
                    <h2 className="text-4xl font-bold text-white mb-8">Continuação do Conteúdo</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="p-8 bg-slate-900/50 rounded-2xl border border-white/5">
                                <div className="w-12 h-12 bg-indigo-500/20 rounded-lg mb-4 flex items-center justify-center text-indigo-400 font-bold text-xl">
                                    {i}
                                </div>
                                <h3 className="text-xl font-semibold text-white mb-2">Feature {i}</h3>
                                <p className="text-slate-400">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

// Componente Auxiliar para Links Sociais
function SocialLink({ icon, href, label }: { icon: React.ReactNode, href: string, label: string }) {
    return (
        <a
            href={href}
            className="text-slate-500 hover:text-white transition-colors duration-300 relative group p-2"
            aria-label={label}
        >
            <span className="relative z-10">{icon}</span>
            <span className="absolute inset-0 bg-white/5 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300" />
        </a>
    );
}
