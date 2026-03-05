'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/admin/Sidebar';
import useAuth from '@/hooks/useAuth';
import { supabase } from '@/lib/supabase/client';
import PremiumCard from '@/components/ui/PremiumCard';

const AdminDashboard = () => {
  const router = useRouter();
  const { user, isAuthenticated, loading } = useAuth();
  const [stats, setStats] = useState({
    totalCourses: 0,
    totalStudents: 0,
    totalRevenue: 0,
    newOrders: 0
  });
  const [recentSales, setRecentSales] = useState<any[]>([]);
  const [isVerifying, setIsVerifying] = useState(true);

  // AIDEV-SECURITY: Verificação de Role Admin (Prompt 6 + B)
  // O mestre definiu automacoescomerciais@gmail.com como admin master nas regras
  const ADMIN_EMAIL = 'automacoescomerciais@gmail.com';

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated || user?.email !== ADMIN_EMAIL) {
        router.push('/dashboard'); // Redireciona estudantes para seu próprio painel
      } else {
        setIsVerifying(false);
      }
    }
  }, [loading, isAuthenticated, user, router]);

  // Busca métricas dinâmicas (Prompt 6)
  useEffect(() => {
    const fetchAdminData = async () => {
      if (!isVerifying && user?.email === ADMIN_EMAIL) {
        try {
          // 1. Total Coourses
          const { count: totalCourses } = await supabase.from('courses').select('*', { count: 'exact', head: true });

          // 2. Total Students (Unique users with role student)
          const { count: totalStudents } = await supabase.from('users').select('*', { count: 'exact', head: true }).eq('role', 'student');

          // 3. Orders & Revenue
          const { data: ordersSnap } = await supabase.from('orders').select('*');
          let revenue = 0;
          let todayOrders = 0;
          const today = new Date().setHours(0, 0, 0, 0);

          const sales: any[] = [];
          if (ordersSnap) {
            ordersSnap.forEach((data: any) => {
              if (data.paymentStatus === 'paid') {
                revenue += data.amount || 0;
              }
              const createdAt = new Date(data.createdAt || data.created_at).getTime();
              if (createdAt > today) {
                todayOrders++;
              }
              sales.push({ id: data.id, ...data });
            });
          }

          setStats({
            totalCourses: totalCourses || 0,
            totalStudents: totalStudents || 0,
            totalRevenue: revenue,
            newOrders: todayOrders
          });

          // Últimas 5 vendas
          setRecentSales(sales.sort((a, b) => {
            const timeB = new Date(b.createdAt || b.created_at).getTime();
            const timeA = new Date(a.createdAt || a.created_at).getTime();
            return timeB - timeA;
          }).slice(0, 5));

        } catch (error) {
          console.error("Erro ao carregar dados administrativos:", error);
        }
      }
    };

    fetchAdminData();
  }, [isVerifying, user]);

  if (loading || isVerifying) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  const quickActions = [
    {
      title: 'Criar Novo Curso',
      description: 'Adicione um novo curso ao catálogo',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      ),
      onClick: () => router.push('/admin/gerenciar-cursos')
    },
    {
      title: 'Diretório de Alunos',
      description: 'Gerencie acessos e perfis',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      onClick: () => router.push('/admin/gerenciar-acessos')
    },
    {
      title: 'Blog CMS',
      description: 'Publicar novidades e artigos',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
        </svg>
      ),
      onClick: () => { }
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      <div className="flex">
        <Sidebar />

        <main className="flex-1 p-8">
          <div className="mb-10">
            <h1 className="text-4xl font-bold">Dashboard do Fundador</h1>
            <p className="text-gray-400">Gerencie a Cleudocode Academy em tempo real.</p>
          </div>

          {/* Stats Cards (Prompt 6) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            <PremiumCard className="border-blue-500/20">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-3xl font-bold">{stats.totalCourses}</h3>
                  <p className="text-gray-500 text-sm">Cursos Ativos</p>
                </div>
              </div>
            </PremiumCard>

            <PremiumCard className="border-green-500/20">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-green-500/10 text-green-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-3xl font-bold">{stats.totalStudents}</h3>
                  <p className="text-gray-500 text-sm">Total de Alunos</p>
                </div>
              </div>
            </PremiumCard>

            <PremiumCard className="border-yellow-500/20">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-yellow-500/10 text-yellow-400">
                  <span className="text-2xl font-bold">R$</span>
                </div>
                <div>
                  <h3 className="text-3xl font-bold">{(stats.totalRevenue).toLocaleString('pt-BR')}</h3>
                  <p className="text-gray-500 text-sm">Receita Total</p>
                </div>
              </div>
            </PremiumCard>

            <PremiumCard className="border-purple-500/20">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-3xl font-bold">{stats.newOrders}</h3>
                  <p className="text-gray-500 text-sm">Pedidos Hoje</p>
                </div>
              </div>
            </PremiumCard>
          </div>

          {/* Quick Actions */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold mb-6">Controles Rápidos</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {quickActions.map((action, index) => (
                <PremiumCard
                  key={index}
                  onClick={action.onClick}
                  className="cursor-pointer hover:scale-[1.02] transition-transform"
                >
                  <div className="flex items-center gap-4">
                    <div className="text-purple-400 p-2 bg-purple-500/5 rounded-lg">
                      {action.icon}
                    </div>
                    <div>
                      <h3 className="font-bold">{action.title}</h3>
                      <p className="text-gray-500 text-xs">{action.description}</p>
                    </div>
                  </div>
                </PremiumCard>
              ))}
            </div>
          </div>

          {/* Recent Sales (Prompt 6) */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Vendas Recentes</h2>
            <PremiumCard>
              <div className="space-y-5">
                {recentSales.length === 0 ? (
                  <p className="text-center text-gray-500 py-10">Nenhuma venda registrada ainda.</p>
                ) : (
                  recentSales.map((sale) => (
                    <div key={sale.id} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center font-bold text-indigo-400">
                          {sale.courseTitle?.[0]}
                        </div>
                        <div>
                          <h4 className="font-bold">{sale.courseTitle}</h4>
                          <p className="text-gray-500 text-xs">ID: {sale.id.slice(0, 8)}...</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-green-400 font-bold">R$ {sale.amount}</p>
                        <p className="text-gray-500 text-xs">Pago via {sale.paymentMethod || 'Sistema'}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </PremiumCard>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;