'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useAuth from '@/hooks/useAuth';
import LampiaoAvatar from '@/components/avatars/LampiaoAvatar';
import PremiumCarousel from '@/components/carousel/PremiumCarousel';
import PremiumButton from '@/components/ui/PremiumButton';
import PremiumCard from '@/components/ui/PremiumCard';
import { NotificationAPI } from '@/components/notifications/NotificationManager';

interface ConnectedUser {
  id: string;
  name: string;
  avatar: string;
  lastSeen: string;
  isOnline: boolean;
}

interface Course {
  id: string;
  title: string;
  description: string;
  students: number;
  level: string;
  image: string;
}

const HomePage = () => {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const [isMounted, setIsMounted] = useState(false);

  const [connectedUsers] = useState<ConnectedUser[]>([
    {
      id: '1',
      name: 'João Silva',
      avatar: 'https://i.pravatar.cc/150?img=1',
      lastSeen: 'Agora mesmo',
      isOnline: true,
    },
    {
      id: '2',
      name: 'Maria Santos',
      avatar: 'https://i.pravatar.cc/150?img=2',
      lastSeen: '1 min atrás',
      isOnline: true,
    },
    {
      id: '3',
      name: 'Pedro Costa',
      avatar: 'https://i.pravatar.cc/150?img=3',
      lastSeen: '2 min atrás',
      isOnline: true,
    },
    {
      id: '4',
      name: 'Ana Oliveira',
      avatar: 'https://i.pravatar.cc/150?img=4',
      lastSeen: '5 min atrás',
      isOnline: true,
    },
    {
      id: '5',
      name: 'Carlos Souza',
      avatar: 'https://i.pravatar.cc/150?img=5',
      lastSeen: '10 min atrás',
      isOnline: false,
    },
    {
      id: '6',
      name: 'Julia Ferreira',
      avatar: 'https://i.pravatar.cc/150?img=6',
      lastSeen: '15 min atrás',
      isOnline: true,
    },
  ]);

  const [featuredCourses] = useState<Course[]>([
    {
      id: '1',
      title: 'Fundamentos da Bíblia',
      description: 'Aprenda os conceitos fundamentais das escrituras sagradas com profundidade teológica.',
      students: 1234,
      level: 'Iniciante',
      image: '📖',
    },
    {
      id: '2',
      title: 'Ministério Pastoral',
      description: 'Capacitação completa para liderança espiritual e pastoral em comunidades de fé.',
      students: 856,
      level: 'Avançado',
      image: '⛪',
    },
    {
      id: '3',
      title: 'Teologia Sistemática',
      description: 'Estude a teologia de forma organizada e aprofundada para fortalecer sua fé.',
      students: 612,
      level: 'Intermediário',
      image: '✝️',
    },
  ]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
        <div className="text-white">Carregando...</div>
      </div>
    );
  }

  const handleUserClick = (user: ConnectedUser) => {
    NotificationAPI.info('Usuário Online', `${user.name} está ${user.isOnline ? 'online' : 'offline'}`);
  };

  return (
    <div className="min-h-screen text-white">
      {/* ===== HERO SECTION ===== */}
      <section className="relative overflow-hidden py-16 md:py-32 border-b border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(1200px_circle_at_10%_10%,#1a0f1f_0%,#05070c_40%,#02030a_100%)]"></div>
        <div className="absolute inset-0 bg-stars bg-[radial-gradient(rgba(255,255,255,0.05)_1px,_transparent_1px)] bg-[40px_40px]"></div>

        <div className="relative container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="z-10">
              <div className="inline-block px-4 py-2 bg-indigo-600/20 border border-indigo-500/30 rounded-full mb-6">
                <span className="text-sm font-semibold text-indigo-300">Bem-vindo à Escola PAZ e BEM</span>
              </div>

              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Transforme <span className="glow-title-purple">Vidas</span> com Conhecimento Bíblico
              </h1>

              <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-xl leading-relaxed">
                Educação teológica de excelência, enraizada na tradição nordestina e moderna na entrega. Capacite-se para ministério com nossos cursos especializados.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                {isAuthenticated ? (
                  <PremiumButton
                    variant="primary"
                    size="lg"
                    onClick={() => router.push('/dashboard')}
                  >
                    Ir para o Painel
                  </PremiumButton>
                ) : (
                  <PremiumButton
                    variant="primary"
                    size="lg"
                    onClick={() => router.push('/auth/login')}
                  >
                    Entrar na Plataforma
                  </PremiumButton>
                )}
                <PremiumButton
                  variant="outline"
                  size="lg"
                  onClick={() => router.push('/academy')}
                >
                  Explore Cursos
                </PremiumButton>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-white/10">
                <div>
                  <div className="text-3xl font-bold text-indigo-400">2,847</div>
                  <p className="text-sm text-gray-400">Alunos Ativos</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-400">124</div>
                  <p className="text-sm text-gray-400">Cursos Disponíveis</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-400">98%</div>
                  <p className="text-sm text-gray-400">Taxa de Satisfação</p>
                </div>
              </div>
            </div>

            {/* Right Avatar */}
            <div className="flex justify-center lg:justify-end relative z-10">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/30 to-purple-600/30 blur-3xl rounded-full -z-10"></div>
                <LampiaoAvatar size="xl" animated={true} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FEATURED COURSES ===== */}
      <section className="py-20 relative z-10 border-b border-white/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Cursos em Destaque</h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              Escolha entre nossos programas mais populares e inicie sua jornada de aprendizado
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredCourses.map((course) => (
              <PremiumCard key={course.id}>
                <PremiumCard.Body>
                  <div className="text-6xl mb-4">{course.image}</div>
                  <h3 className="text-2xl font-bold mb-3">{course.title}</h3>
                  <p className="text-gray-300 mb-6 leading-relaxed">{course.description}</p>

                  <div className="flex items-center justify-between text-sm text-gray-400 mb-6">
                    <span>👥 {course.students} alunos</span>
                    <span className="px-2 py-1 bg-indigo-600/20 text-indigo-300 rounded">{course.level}</span>
                  </div>

                  <PremiumButton
                    variant="secondary"
                    size="lg"
                    onClick={() => router.push(`/academy?course=${course.id}`)}
                  >
                    Ver Detalhes
                  </PremiumButton>
                </PremiumCard.Body>
              </PremiumCard>
            ))}
          </div>

          <div className="text-center mt-12">
            <PremiumButton
              variant="outline"
              onClick={() => router.push('/academy')}
            >
              Ver Todos os Cursos →
            </PremiumButton>
          </div>
        </div>
      </section>

      {/* ===== WHY CHOOSE US ===== */}
      <section className="py-20 relative z-10 border-b border-white/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Por que Escolher a Escola PAZ e BEM?</h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              Oferecemos educação teológica de qualidade com abordagem moderna e personalizada
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '🎓', title: 'Professores Qualificados', desc: 'Mestrado e doutorado em teologia' },
              { icon: '⏱️', title: 'Flexibilidade Horária', desc: 'Estude no seu próprio ritmo' },
              { icon: '🌐', title: 'Acesso Global', desc: '24/7 na plataforma online' },
              { icon: '💬', title: 'Suporte Dedicado', desc: 'Comunidade e atendimento ativo' },
              { icon: '📚', title: 'Material Completo', desc: 'Apostilas, vídeos e exercícios' },
              { icon: '🏆', title: 'Certificação', desc: 'Diplomas reconhecidos' },
              { icon: '🤝', title: 'Rede de Contatos', desc: 'Conecte com ministros' },
              { icon: '📈', title: 'Crescimento Pessoal', desc: 'Desenvolvimento espiritual' },
            ].map((feature, idx) => (
              <div key={idx} className="p-6 bg-white/5 border border-white/10 rounded-xl hover:border-indigo-500/30 transition-all">
                <div className="text-4xl mb-3">{feature.icon}</div>
                <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== COMMUNITY SECTION ===== */}
      <section className="py-20 relative z-10 border-b border-white/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Nossa Comunidade em Ação</h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              Veja quem está aprendendo conosco neste momento
            </p>
          </div>

          <PremiumCarousel users={connectedUsers} onUserClick={handleUserClick} />

          <div className="text-center mt-12">
            <p className="text-gray-400 mb-4">Faça parte de nossa crescente comunidade de ministros e estudantes</p>
            <PremiumButton
              variant="secondary"
              onClick={() => router.push('/academy')}
            >
              Junte-se Agora
            </PremiumButton>
          </div>
        </div>
      </section>

      {/* ===== CTA FINAL ===== */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-indigo-900/30 via-purple-900/20 to-blue-900/30 border border-indigo-500/20 rounded-2xl p-12 md:p-20 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Pronto para Transformar Sua Fé?</h2>
            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
              Comece hoje mesmo sua jornada de crescimento espiritual e ministerial. Acesso instantâneo a todos os recursos.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {isAuthenticated ? (
                <PremiumButton
                  variant="primary"
                  size="lg"
                  onClick={() => router.push('/academy')}
                >
                  Explorar Programas de Estudo
                </PremiumButton>
              ) : (
                <>
                  <PremiumButton
                    variant="primary"
                    size="lg"
                    onClick={() => router.push('/auth/login')}
                  >
                    Entrar Agora
                  </PremiumButton>
                  <PremiumButton
                    variant="outline"
                    size="lg"
                    onClick={() => router.push('/auth')}
                  >
                    Criar Conta Gratuita
                  </PremiumButton>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;