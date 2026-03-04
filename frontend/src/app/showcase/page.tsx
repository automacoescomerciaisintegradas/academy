'use client';

import { useState } from 'react';
// import LampiaoAvatar from '@/components/avatars/LampiaoAvatar';
import PremiumButton from '@/components/ui/PremiumButton';
import PremiumCard from '@/components/ui/PremiumCard';
import PremiumCarousel from '@/components/carousel/PremiumCarousel';
import { useNotification } from '@/hooks/useNotification';

interface User {
  id: string;
  name: string;
  avatar: string;
  lastSeen: string;
  isOnline: boolean;
}

export default function ComponentShowcase() {
  const notify = useNotification();
  const [isLoading, setIsLoading] = useState(false);

  const demoUsers: User[] = [
    {
      id: '1',
      name: 'João Silva',
      avatar: 'https://i.pravatar.cc/150?img=1',
      lastSeen: 'Agora',
      isOnline: true,
    },
    {
      id: '2',
      name: 'Maria Santos',
      avatar: 'https://i.pravatar.cc/150?img=2',
      lastSeen: '2 min',
      isOnline: true,
    },
    {
      id: '3',
      name: 'Pedro Costa',
      avatar: 'https://i.pravatar.cc/150?img=3',
      lastSeen: '5 min',
      isOnline: true,
    },
    {
      id: '4',
      name: 'Ana Oliveira',
      avatar: 'https://i.pravatar.cc/150?img=4',
      lastSeen: '10 min',
      isOnline: true,
    },
    {
      id: '5',
      name: 'Carlos Souza',
      avatar: 'https://i.pravatar.cc/150?img=5',
      lastSeen: '15 min',
      isOnline: false,
    },
    {
      id: '6',
      name: 'Julia Ferreira',
      avatar: 'https://i.pravatar.cc/150?img=6',
      lastSeen: '20 min',
      isOnline: true,
    },
  ];

  const handleSimulateAction = async () => {
    setIsLoading(true);
    setTimeout(() => {
      notify.success('Sucesso!', 'Ação concluída com êxito', {
        action: {
          label: 'Ver Detalhes',
          onClick: () => console.log('Clicked!'),
        },
      });
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen py-12 space-y-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4 glow-title-purple">
            Showcase de Componentes
          </h1>
          <p className="text-xl text-gray-400">
            Visualize todos os componentes visuais da Escola PAZ e BEM
          </p>
        </div>

        {/* Branding Section */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold glow-title">Identidade Visual</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <PremiumCard>
              <PremiumCard.Body className="flex flex-col items-center justify-center p-12">
                <div className="text-6xl mb-6">👨‍🏫</div>
                <h3 className="text-xl font-bold text-white mb-2">Liderança do Prof. Bandeira</h3>
                <p className="text-sm text-gray-400 text-center">
                  Antonio Sergio Queiroz Alves (Bandeira)
                </p>
              </PremiumCard.Body>
            </PremiumCard>

            <PremiumCard>
              <PremiumCard.Body className="flex flex-col items-center justify-center p-12">
                <div className="text-6xl mb-6">📖</div>
                <h3 className="text-xl font-bold text-white mb-2">Fundamento Bíblico</h3>
                <p className="text-sm text-gray-400 text-center">
                  Excelência Teológica e Compromisso Ministerial
                </p>
              </PremiumCard.Body>
            </PremiumCard>
          </div>
        </section>

        {/* Buttons Section */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold glow-title">Botões Premium</h2>
          <PremiumCard>
            <PremiumCard.Body className="space-y-6">
              <div>
                <h4 className="text-sm font-semibold text-gray-300 mb-3">Variantesa</h4>
                <div className="flex flex-wrap gap-4">
                  <PremiumButton variant="primary" onClick={() => notify.success('Clicado', 'Botão Primary')}>
                    Primary
                  </PremiumButton>
                  <PremiumButton variant="secondary" onClick={() => notify.info('Info', 'Botão Secondary')}>
                    Secondary
                  </PremiumButton>
                  <PremiumButton variant="outline" onClick={() => notify.warning('Aviso', 'Botão Outline')}>
                    Outline
                  </PremiumButton>
                  <PremiumButton variant="tertiary" onClick={() => notify.info('Info', 'Botão Tertiary')}>
                    Tertiary
                  </PremiumButton>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-gray-300 mb-3">Tamanhos</h4>
                <div className="flex flex-wrap gap-4">
                  <PremiumButton size="sm">Small</PremiumButton>
                  <PremiumButton size="md">Medium</PremiumButton>
                  <PremiumButton size="lg">Large</PremiumButton>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-gray-300 mb-3">Estados</h4>
                <div className="flex flex-wrap gap-4">
                  <PremiumButton disabled>Disabled</PremiumButton>
                  <PremiumButton isLoading>Loading...</PremiumButton>
                  <PremiumButton onClick={handleSimulateAction}>
                    Simular Ação (com notif)
                  </PremiumButton>
                </div>
              </div>
            </PremiumCard.Body>
          </PremiumCard>
        </section>

        {/* Cards Section */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold glow-title">Cards Premium</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <PremiumCard>
              <PremiumCard.Header title="Card Com Header" description="Descrição do card" />
              <PremiumCard.Body>
                <p className="text-gray-300">Conteúdo do card com texto descriptivo</p>
              </PremiumCard.Body>
              <PremiumCard.Footer>
                <PremiumButton size="sm" variant="secondary" className="w-full">
                  Ação
                </PremiumButton>
              </PremiumCard.Footer>
            </PremiumCard>

            <PremiumCard>
              <PremiumCard.Body>
                <div className="text-4xl mb-4">🎓</div>
                <h3 className="text-xl font-bold text-white mb-2">Feature Card</h3>
                <p className="text-gray-400 text-sm">Card com emoji e texto descritivo</p>
              </PremiumCard.Body>
            </PremiumCard>

            <PremiumCard onClick={() => notify.info('Clicado', 'Card clicável')}>
              <PremiumCard.Body className="text-center cursor-pointer">
                <div className="text-5xl mb-4">✨</div>
                <p className="text-gray-300">Click-me!</p>
              </PremiumCard.Body>
            </PremiumCard>
          </div>
        </section>

        {/* Carousel Section */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold glow-title">Carrossel Premium</h2>
          <PremiumCarousel
            users={demoUsers}
            title="Quem está Online"
            onUserClick={(user) => {
              notify.info(user.name, `${user.isOnline ? 'Online' : 'Offline'}`);
            }}
          />
        </section>

        {/* Notifications Section */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold glow-title">Sistema de Notificações</h2>
          <PremiumCard>
            <PremiumCard.Body className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <PremiumButton
                  variant="primary"
                  size="sm"
                  onClick={() => notify.success('Sucesso!', 'Operação realizada com êxito')}
                >
                  Success
                </PremiumButton>
                <PremiumButton
                  variant="secondary"
                  size="sm"
                  onClick={() => notify.error('Erro!', 'Algo deu errado no processo')}
                >
                  Error
                </PremiumButton>
                <PremiumButton
                  size="sm"
                  onClick={() => notify.warning('Aviso!', 'Verifique antes de continuar')}
                  className="bg-amber-600/20 hover:bg-amber-600/30 border border-amber-500/20"
                >
                  Warning
                </PremiumButton>
                <PremiumButton
                  size="sm"
                  onClick={() => notify.info('Informação', 'Nova versão disponível')}
                  className="bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/20"
                >
                  Info
                </PremiumButton>
              </div>
              <p className="text-sm text-gray-400">
                Clique nos botões acima para ver as notificações em ação
              </p>
            </PremiumCard.Body>
          </PremiumCard>
        </section>

        {/* Colors Section */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold glow-title">Paleta de Cores</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'Indigo', hex: '#6366f1', class: 'bg-indigo-600' },
              { name: 'Purple', hex: '#8b5cf6', class: 'bg-purple-600' },
              { name: 'Green', hex: '#10b981', class: 'bg-green-600' },
              { name: 'Red', hex: '#ef4444', class: 'bg-red-500' },
              { name: 'Amber', hex: '#f59e0b', class: 'bg-amber-500' },
              { name: 'Blue', hex: '#3b82f6', class: 'bg-blue-500' },
              { name: 'Dark', hex: '#05070c', class: 'bg-gray-950' },
              { name: 'Light', hex: '#e5e7eb', class: 'bg-gray-200' },
            ].map((color) => (
              <div key={color.hex} className="text-center">
                <div className={`${color.class} h-24 rounded-lg mb-2`}></div>
                <p className="font-semibold text-white">{color.name}</p>
                <p className="text-sm text-gray-400">{color.hex}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
