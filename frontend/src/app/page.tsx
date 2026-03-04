'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useAuth from '@/hooks/useAuth';
import PremiumButton from '@/components/ui/PremiumButton';
import CourseCarousel from '@/components/landing/CourseCarousel';
import VideoEmbed from '@/components/landing/VideoEmbed';
import FeatureCard from '@/components/landing/FeatureCard';
import PricingCard from '@/components/landing/PricingCard';
import FAQSection from '@/components/landing/FAQSection';
import WhatsAppButton from '@/components/landing/WhatsAppButton';
import { NotificationAPI } from '@/components/notifications/NotificationManager';
import HeroSequencer from '@/components/hero/HeroSequencer';
import SpriteScrubber from '@/components/hero/SpriteScrubber';

const HomePage = () => {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const [isMounted, setIsMounted] = useState(false);

  // Cursos em Destaque (Carrossel Principal)
  const featuredCourses = [
    {
      id: '1',
      title: 'Bacharel em Teologia',
      description: 'Formação completa em teologia bíblica e sistemática',
      image: '📖',
      hours: 1534,
      lessons: 219,
      students: 1234,
      progress: 0,
      badge: 'MAIS PROCURADO',
    },
    {
      id: '2',
      title: 'Curso de Pregação',
      description: 'Aprenda a pregar com poder e unção',
      image: '🎤',
      hours: 45,
      lessons: 32,
      students: 856,
      progress: 0,
      badge: 'RECOMENDADO',
    },
    {
      id: '3',
      title: 'Liderança Cristã',
      description: 'Formação de líderes para o reino',
      image: '👑',
      hours: 28,
      lessons: 24,
      students: 612,
      progress: 0,
    },
    {
      id: '4',
      title: 'Conselhos Pastorais',
      description: 'Aconselhamento bíblico eficaz',
      image: '🤝',
      hours: 20,
      lessons: 16,
      students: 523,
      progress: 0,
    },
    {
      id: '5',
      title: 'Teologia Sistemática',
      description: 'Estudo organizado das doutrinas',
      image: '✝️',
      hours: 67,
      lessons: 48,
      students: 789,
      progress: 0,
    },
  ];

  // Cursos Gratuitos
  const freeCourses = [
    {
      id: '101',
      title: 'Introdução à Bíblia',
      description: 'Conheça os fundamentos das escrituras',
      image: '📜',
      hours: 8,
      lessons: 12,
      students: 2345,
      isFree: true,
      badge: 'GRÁTIS',
    },
    {
      id: '102',
      title: 'Como Estudar a Bíblia',
      description: 'Métodos eficazes de estudo bíblico',
      image: '📚',
      hours: 6,
      lessons: 8,
      students: 1876,
      isFree: true,
    },
    {
      id: '103',
      title: 'Primeiros Passos na Fé',
      description: 'Para novos convertidos',
      image: '🌱',
      hours: 4,
      lessons: 6,
      students: 3421,
      isFree: true,
    },
    {
      id: '104',
      title: 'Oração Eficaz',
      description: 'Aprenda a orar com poder',
      image: '🙏',
      hours: 5,
      lessons: 7,
      students: 2156,
      isFree: true,
    },
  ];

  // Cursos Básicos
  const basicCourses = [
    {
      id: '201',
      title: 'Panorama Bíblico - Antigo Testamento',
      description: 'Visão geral de todos os livros',
      image: '📖',
      hours: 24,
      lessons: 30,
      students: 1543,
    },
    {
      id: '202',
      title: 'Panorama Bíblico - Novo Testamento',
      description: 'Do nascimento de Cristo à Igreja Primitiva',
      image: '✝️',
      hours: 20,
      lessons: 26,
      students: 1234,
    },
    {
      id: '203',
      title: 'Doutrinas Fundamentais',
      description: 'Os pilares da fé cristã',
      image: '🏛️',
      hours: 18,
      lessons: 22,
      students: 987,
    },
    {
      id: '204',
      title: 'História de Israel',
      description: 'Da criação ao exílio',
      image: '🗺️',
      hours: 16,
      lessons: 20,
      students: 765,
    },
  ];

  // Cursos Médios
  const mediumCourses = [
    {
      id: '301',
      title: 'Hermenêutica Bíblica',
      description: 'Ciência da interpretação bíblica',
      image: '🔍',
      hours: 32,
      lessons: 28,
      students: 654,
    },
    {
      id: '302',
      title: 'Homilética - Arte de Pregar',
      description: 'Técnicas de pregação expositiva',
      image: '🎤',
      hours: 28,
      lessons: 24,
      students: 876,
    },
    {
      id: '303',
      title: 'Teologia Paulina',
      description: 'Estudo das cartas de Paulo',
      image: '📜',
      hours: 36,
      lessons: 32,
      students: 543,
    },
  ];

  // Cursos de Liderança
  const leadershipCourses = [
    {
      id: '401',
      title: 'Gestão de Ministério',
      description: 'Administração de igrejas e ministérios',
      image: '📊',
      hours: 24,
      lessons: 20,
      students: 432,
    },
    {
      id: '402',
      title: 'Liderança de Equipes',
      description: 'Como liderar pessoas com excelência',
      image: '👥',
      hours: 20,
      lessons: 18,
      students: 567,
    },
    {
      id: '403',
      title: 'Aconselhamento Pastoral',
      description: 'Cuidando de vidas com sabedoria',
      image: '💙',
      hours: 28,
      lessons: 24,
      students: 398,
    },
  ];

  // Features/Benefícios
  const features = [
    { icon: '🎓', title: 'Professores Qualificados', description: 'Mestres e doutores com experiência ministerial' },
    { icon: '⏱️', title: 'Estude no Seu Ritmo', description: 'Acesso 24/7 de qualquer lugar' },
    { icon: '📱', title: 'Multi-Plataforma', description: 'Assista no celular, tablet ou PC' },
    { icon: '📜', title: 'Certificado Incluso', description: 'Diploma reconhecido pelo MEC' },
    { icon: '💬', title: 'Suporte Dedicado', description: 'Equipe pronta para te ajudar' },
    { icon: '🤝', title: 'Comunidade Ativa', description: 'Networking com outros alunos' },
    { icon: '📚', title: 'Material Completo', description: 'PDFs, vídeos e exercícios' },
    { icon: '🔄', title: 'Acesso Vitalício', description: 'Estude quando e quanto quiser' },
  ];

  // FAQs
  const faqs = [
    {
      question: 'Como funciona o acesso aos cursos?',
      answer: 'Após a matrícula, você recebe acesso imediato à plataforma online, onde pode assistir às aulas quando e onde quiser, pelo tempo que durar seu plano.',
    },
    {
      question: 'O certificado é reconhecido?',
      answer: 'Sim! Nossos certificados são reconhecidos pelo MEC e válidos em todo território nacional, atendendo às exigências do Ministério da Educação.',
    },
    {
      question: 'Posso cancelar a qualquer momento?',
      answer: 'Sim! Você pode cancelar sua assinatura quando quiser, sem multas ou taxas adicionais. Acreditamos na liberdade e transparência.',
    },
    {
      question: 'Há suporte para dúvidas?',
      answer: 'Com certeza! Temos uma equipe de suporte dedicada e você também pode interagir com os professores através do fórum de cada curso.',
    },
    {
      question: 'Quais as formas de pagamento?',
      answer: 'Aceitamos cartão de crédito, PIX, boleto bancário e transferência. Oferecemos condições especiais para pagamento anual.',
    },
    {
      question: 'Preciso ter conhecimento prévio?',
      answer: 'Não! Nossos cursos são estruturados para atender desde iniciantes até estudantes avançados, com trilhas de aprendizado personalizadas.',
    },
  ];

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="min-h-screen bg-[#0a0b0f] flex items-center justify-center">
        <div className="text-white text-xl">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0b0f] text-white">
      {/* ===== HERO COM SPRITE SCRUBBER ===== */}
      {/* 
        OPÇÃO 1: Usando HeroSequencer com vídeo WebM
        <HeroSequencer
          totalFrames={60}
          videoUrl="https://seu-site.com/hero-animation.webm"
          imageUrl="https://seu-site.com/hero-poster.webp"
          title="Fundamentados na Palavra"
          subtitle="Preparados para o Reino"
          ctaText="Começar Agora"
          onCtaClick={() => router.push('/auth/register')}
        />

        OPÇÃO 2: Usando SpriteScrubber com sprite sheet (mais performático)
        <SpriteScrubber
          spriteUrl="/hero-sprite.webp"
          framesPerRow={10}
          totalFrames={60}
          sectionHeight={300}
          opacity={0.6}
        >
          {/* Conteúdo sobreposto ao sprite *}/}
            <div className="relative z-10 h-full flex items-center justify-center px-4">
              <div className="text-center max-w-4xl">
                <div className="inline-block px-4 py-2 bg-gold-600/20 border border-gold-500/30 rounded-full mb-6">
                  <span className="text-sm font-semibold text-gold-300">🎓 +2.500 Alunos Formados</span>
                </div>
                <h1 className="text-5xl md:text-7xl font-bold mb-6">
                  <span className="block text-white">Bacharel em</span>
                  <span className="block bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 bg-clip-text text-transparent">Teologia</span>
                </h1>
                <p className="text-xl text-gray-300 mb-8">
                  Capacite-se com solidez bíblica e maturidade espiritual
                </p>
                <PremiumButton
                  variant="primary"
                  size="lg"
                  onClick={() => router.push('/auth/register')}
                >
                  🎯 MATRICULAR AGORA
                </PremiumButton>
              </div>
            </div>
          {/* */}
        {/* </SpriteScrubber> */}

        {/* ===== HERO SIMPLIFICADO (enquanto não tem os frames) ===== */}
        <section className="relative h-screen overflow-hidden flex items-center justify-center">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/30 via-purple-900/20 to-[#0a0b0f]">
            <div className="absolute inset-0 bg-[radial-gradient(1200px_circle_at_10%_10%,rgba(212,154,33,0.15)_0%,transparent_50%)]"></div>
          </div>

          {/* Conteúdo */}
          <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
            <div className="inline-block px-6 py-3 bg-gold-600/20 border border-gold-500/30 rounded-full mb-8 backdrop-blur-sm">
              <span className="text-sm font-semibold text-gold-300">🎓 +2.500 Alunos Formados</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6">
              <span className="block text-white">Fundamentados na</span>
              <span className="block glow-title-purple">Palavra</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto">
              Preparados para o Reino. Capacite-se com solidez bíblica e maturidade espiritual.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <PremiumButton
                variant="primary"
                size="lg"
                onClick={() => router.push('/auth/register')}
              >
                🎯 MATRICULAR AGORA
              </PremiumButton>
              <PremiumButton
                variant="outline"
                size="lg"
                onClick={() => router.push('/academy')}
              >
                Conhecer Cursos
              </PremiumButton>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
            <span className="text-xs text-gray-500 uppercase tracking-widest">Role para explorar</span>
            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </section>

      {/* ===== CURSOS GRATUITOS ===== */}
      <section className="py-12 border-b border-white/5 bg-white/[0.01]">
        <div className="container mx-auto px-4">
          <CourseCarousel
            title="🎁 Cursos Grátis"
            subtitle="Comece sem pagar nada"
            courses={freeCourses}
            viewAllLink="/academy?category=free"
          />
        </div>
      </section>

      {/* ===== VÍDEO DE APRESENTAÇÃO ===== */}
      <section className="py-16 border-b border-white/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Conheça a Escola PAZ e BEM</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Veja como nossa plataforma pode transformar seu ministério
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <VideoEmbed
              videoId="dQw4w9WgXcQ"
              title="Conheça a Escola PAZ e BEM"
              duration="3:24"
            />
          </div>
        </div>
      </section>

      {/* ===== CURSO BÁSICO ===== */}
      <section className="py-12 border-b border-white/5">
        <div className="container mx-auto px-4">
          <CourseCarousel
            title="📚 Curso Básico em Teologia"
            subtitle="Fundamentos para começar"
            courses={basicCourses}
            viewAllLink="/academy?level=basic"
          />
        </div>
      </section>

      {/* ===== CURSO MÉDIO ===== */}
      <section className="py-12 border-b border-white/5 bg-white/[0.01]">
        <div className="container mx-auto px-4">
          <CourseCarousel
            title="📖 Curso Médio em Teologia"
            subtitle="Aprofunde seus conhecimentos"
            courses={mediumCourses}
            viewAllLink="/academy?level=medium"
          />
        </div>
      </section>

      {/* ===== LIDERANÇA ===== */}
      <section className="py-12 border-b border-white/5">
        <div className="container mx-auto px-4">
          <CourseCarousel
            title="👑 Liderança Cristã"
            subtitle="Formação de líderes"
            courses={leadershipCourses}
            viewAllLink="/academy?category=leadership"
          />
        </div>
      </section>

      {/* ===== BENEFÍCIOS ===== */}
      <section id="beneficios" className="py-16 border-b border-white/5 bg-gradient-to-b from-transparent via-gold-600/[0.03] to-transparent">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Por que Escolher a Escola PAZ e BEM?</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Tudo o que você precisa para seu crescimento espiritual e ministerial
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, idx) => (
              <FeatureCard key={idx} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== PLANOS ===== */}
      <section id="planos" className="py-16 border-b border-white/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Escolha Seu Plano</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Invista em sua formação com condições especiais
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <PricingCard
              name="Básico"
              price={49.90}
              period="mês"
              description="Ideal para quem está começando"
              features={[
                'Acesso a 1 curso por vez',
                'Material em PDF incluso',
                'Certificado de conclusão',
                'Suporte por email',
                'Acesso por 12 meses',
              ]}
              ctaText="Começar Agora"
              onCtaClick={() => router.push('/auth/register')}
            />
            <PricingCard
              name="Premium"
              price={97.90}
              originalPrice={147.90}
              period="mês"
              description="O mais popular entre os alunos"
              isPopular={true}
              features={[
                'Acesso ilimitado a todos os cursos',
                'Material completo (PDF + Vídeo)',
                'Certificados reconhecidos pelo MEC',
                'Suporte prioritário WhatsApp',
                'Comunidade exclusiva de alunos',
                'Acesso vitalício',
              ]}
              ctaText="Assinar Premium"
              onCtaClick={() => router.push('/auth/register')}
            />
            <PricingCard
              name="Anual"
              price={79.90}
              period="mês (cobrado anual)"
              description="Melhor custo-benefício"
              features={[
                'Todos os benefícios do Premium',
                'Economia de 40%',
                'Mentoria em grupo mensal',
                'Biblioteca virtual completa',
                'Desconto em eventos presenciais',
                'Acesso vitalício',
              ]}
              ctaText="Assinar Anual"
              onCtaClick={() => router.push('/auth/register')}
            />
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section id="faq" className="py-16 border-b border-white/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Dúvidas Frequentes</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Tire suas dúvidas sobre nossos cursos e plataforma
            </p>
          </div>

          <FAQSection faqs={faqs} />
        </div>
      </section>

      {/* ===== CTA FINAL ===== */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="relative bg-gradient-to-r from-gold-600/20 via-purple-900/20 to-indigo-900/20 border border-gold-500/30 rounded-3xl p-12 md:p-20 text-center overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(600px_circle_at_50%_50%,rgba(212,154,33,0.1)_0%,transparent_70%)]"></div>
            
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Pronto para Transformar Sua Fé?</h2>
              <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
                Comece hoje mesmo sua jornada de crescimento espiritual e ministerial.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                {isAuthenticated ? (
                  <PremiumButton
                    variant="primary"
                    size="lg"
                    onClick={() => router.push('/academy')}
                  >
                    📖 Explorar Cursos
                  </PremiumButton>
                ) : (
                  <>
                    <PremiumButton
                      variant="primary"
                      size="lg"
                      onClick={() => router.push('/auth/register')}
                    >
                      🎯 Criar Conta Grátis
                    </PremiumButton>
                    <PremiumButton
                      variant="outline"
                      size="lg"
                      onClick={() => router.push('/auth/login')}
                    >
                      Já Tenho Conta
                    </PremiumButton>
                  </>
                )}
              </div>

              <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>7 dias grátis</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Sem fidelidade</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Cancele quando quiser</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== WHATSAPP BUTTON ===== */}
      <WhatsAppButton />
    </div>
  );
};

export default HomePage;
