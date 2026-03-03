'use client';

import { useState, useEffect, useRef } from 'react';

const ServicesPage = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Efeito de partículas flutuantes
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Define o tamanho do canvas
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Configuração das partículas
    const particles: Particle[] = [];
    const particleCount = 100;
    
    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        this.color = `rgba(${Math.floor(Math.random() * 100 + 155)}, ${Math.floor(Math.random() * 100 + 155)}, 255, ${Math.random() * 0.5 + 0.2})`;
      }
      
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        if (this.x > canvas.width || this.x < 0) this.speedX = -this.speedX;
        if (this.y > canvas.height || this.y < 0) this.speedY = -this.speedY;
      }
      
      draw() {
        if (!ctx) return;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    
    // Cria as partículas
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
    
    // Função de animação
    const animate = () => {
      if (!ctx) return;
      ctx.fillStyle = 'rgba(10, 10, 20, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
        
        // Conecta partículas próximas
        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(100, 100, 255, ${1 - distance / 100})`;
            ctx.lineWidth = 0.2;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);
  
  // Componente da mão robótica de IA
  const RoboticHand = () => (
    <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1/3 h-3/4 flex items-center justify-center">
      <div className="relative w-64 h-64">
        {/* Mão robótica com partículas e linhas de conexão */}
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Elementos da mão robótica */}
          <div className="relative w-48 h-48">
            {/* Palma da mão */}
            <div className="absolute w-24 h-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full opacity-80 blur-sm"></div>
            <div className="absolute w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-pulse"></div>
              </div>
            </div>
            
            {/* Dedos robóticos */}
            {[...Array(5)].map((_, i) => (
              <div 
                key={i}
                className="absolute w-4 h-16 bg-gradient-to-b from-blue-500 to-purple-600 rounded-t-full"
                style={{
                  top: `${i % 2 === 0 ? 20 : 30}px`,
                  left: `${40 + (i * 15)}px`,
                  transform: `rotate(${i % 2 === 0 ? -15 : 15}deg)`
                }}
              >
                <div className="absolute -bottom-2 w-6 h-6 bg-blue-400 rounded-full animate-pulse"></div>
              </div>
            ))}
            
            {/* Partículas giratórias ao redor da mão */}
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="absolute w-3 h-3 bg-blue-400 rounded-full animate-spin"
                style={{
                  top: '50%',
                  left: '50%',
                  transform: `translate(-50%, -50%) rotate(${i * 30}deg) translate(80px) rotate(-${i * 30}deg)`,
                  animationDuration: `${15 + i * 5}s`,
                  animationIterationCount: 'infinite',
                  animationTimingFunction: 'linear'
                }}
              ></div>
            ))}
            
            {/* Linhas de conexão pulsantes */}
            <div className="absolute top-0 left-0 w-full h-full">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute bg-gradient-to-r from-transparent via-blue-400 to-transparent h-0.5"
                  style={{
                    top: '50%',
                    left: '50%',
                    width: '100px',
                    transformOrigin: 'left center',
                    transform: `translate(-50%, -50%) rotate(${i * 45}deg)`,
                    boxShadow: '0 0 10px 1px rgba(96, 165, 250, 0.7)'
                  }}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white">
      {/* Canvas para partículas flutuantes */}
      <canvas 
        ref={canvasRef} 
        className="absolute top-0 left-0 w-full h-full"
      ></canvas>
      
      {/* Fundo com gradiente neon futurista */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900/20 to-purple-900/20"></div>
      
      {/* Conteúdo da página */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-2/3 mb-12 lg:mb-0">
            <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              Nossos Serviços
            </h1>
            <p className="text-xl text-gray-300 mb-10 max-w-2xl">
              Descubra como a Escola PAZ e BEM combina sabedoria bíblica com tecnologia de ponta para oferecer experiências educacionais transformadoras.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-800/50 backdrop-blur-sm border border-blue-500/30 rounded-xl p-6 hover:border-purple-500/50 transition-all duration-300 hover:scale-[1.02]">
                <h3 className="text-2xl font-bold mb-3 text-blue-400">Cursos Online</h3>
                <p className="text-gray-300">
                  Programas educacionais abrangentes projetados para aprofundar seu conhecimento bíblico com métodos modernos de ensino.
                </p>
              </div>
              
              <div className="bg-gray-800/50 backdrop-blur-sm border border-purple-500/30 rounded-xl p-6 hover:border-blue-500/50 transition-all duration-300 hover:scale-[1.02]">
                <h3 className="text-2xl font-bold mb-3 text-purple-400">Mentorias Personalizadas</h3>
                <p className="text-gray-300">
                  Orientação individualizada com especialistas para acelerar seu crescimento espiritual e ministerial.
                </p>
              </div>
              
              <div className="bg-gray-800/50 backdrop-blur-sm border border-green-500/30 rounded-xl p-6 hover:border-yellow-500/50 transition-all duration-300 hover:scale-[1.02]">
                <h3 className="text-2xl font-bold mb-3 text-green-400">Workshops Práticos</h3>
                <p className="text-gray-300">
                  Experiências hands-on para desenvolver habilidades práticas de liderança e ministério.
                </p>
              </div>
              
              <div className="bg-gray-800/50 backdrop-blur-sm border border-yellow-500/30 rounded-xl p-6 hover:border-green-500/50 transition-all duration-300 hover:scale-[1.02]">
                <h3 className="text-2xl font-bold mb-3 text-yellow-400">Recursos Digitais</h3>
                <p className="text-gray-300">
                  Biblioteca completa de materiais complementares, vídeos e ferramentas interativas para seu aprendizado.
                </p>
              </div>
            </div>
          </div>
          
          {/* Mão robótica de IA */}
          <RoboticHand />
        </div>
        
        {/* Seção de diferenciais */}
        <div className="mt-24">
          <h2 className="text-4xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            Por que Escolher a PAZ e BEM?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group">
              <div className="bg-gradient-to-br from-blue-900/30 to-transparent border border-blue-500/30 rounded-xl p-6 h-full transition-all duration-300 group-hover:shadow-[0_0_25px_-5px_rgba(59,130,246,0.5)]">
                <div className="text-4xl mb-4 text-blue-400">🎓</div>
                <h3 className="text-xl font-bold mb-3">Qualidade Acadêmica</h3>
                <p className="text-gray-400">
                  Cursos desenvolvidos por especialistas com sólida base teológica e metodologia moderna de ensino.
                </p>
              </div>
            </div>
            
            <div className="group">
              <div className="bg-gradient-to-br from-purple-900/30 to-transparent border border-purple-500/30 rounded-xl p-6 h-full transition-all duration-300 group-hover:shadow-[0_0_25px_-5px_rgba(139,92,246,0.5)]">
                <div className="text-4xl mb-4 text-purple-400">💡</div>
                <h3 className="text-xl font-bold mb-3">Inovação Tecnológica</h3>
                <p className="text-gray-400">
                  Plataforma de última geração com recursos interativos para um aprendizado imersivo.
                </p>
              </div>
            </div>
            
            <div className="group">
              <div className="bg-gradient-to-br from-green-900/30 to-transparent border border-green-500/30 rounded-xl p-6 h-full transition-all duration-300 group-hover:shadow-[0_0_25px_-5px_rgba(74,222,128,0.5)]">
                <div className="text-4xl mb-4 text-green-400">🤝</div>
                <h3 className="text-xl font-bold mb-3">Comunidade Ativa</h3>
                <p className="text-gray-400">
                  Conecte-se com outros alunos e ministros para troca de experiências e crescimento mútuo.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;