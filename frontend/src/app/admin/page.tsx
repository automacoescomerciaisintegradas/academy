'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/admin/Sidebar';

const AdminDashboard = () => {
  const router = useRouter();
  const [stats, setStats] = useState({
    totalCourses: 12,
    totalStudents: 1242,
    activeUsers: 89,
    pendingInvites: 5
  });

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
      title: 'Gerenciar Usuários',
      description: 'Convide ou gerencie acessos de usuários',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      onClick: () => router.push('/admin/gerenciar-acessos')
    },
    {
      title: 'Relatórios',
      description: 'Visualize relatórios e métricas',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      onClick: () => {}
    },
    {
      title: 'Configurações',
      description: 'Gerencie configurações do sistema',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      onClick: () => {}
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      <div className="flex">
        <Sidebar />
        
        <main className="flex-1 p-6">
          <div className="md:hidden mb-6">
            <h1 className="text-2xl font-bold">Administração</h1>
            <p className="text-gray-400">Painel de controle</p>
          </div>
          
          <div className="mb-8">
            <h1 className="text-3xl font-bold hidden md:block">Dashboard Administrativo</h1>
            <p className="text-gray-400">Bem-vindo ao painel de administração da plataforma</p>
          </div>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="flex items-center">
                <div className="p-3 rounded-lg bg-blue-900/30 text-blue-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-2xl font-bold">{stats.totalCourses}</h3>
                  <p className="text-gray-400">Cursos</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="flex items-center">
                <div className="p-3 rounded-lg bg-green-900/30 text-green-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-2xl font-bold">{stats.totalStudents}</h3>
                  <p className="text-gray-400">Estudantes</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="flex items-center">
                <div className="p-3 rounded-lg bg-purple-900/30 text-purple-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.636 18.364a9 9 0 010-12.728m12.728 0a9 9 0 010 12.728m-9.9-2.829a5 5 0 010-7.07m7.072 0a5 5 0 010 7.07M13 12a1 1 0 11-2 0 1 1 0 012 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-2xl font-bold">{stats.activeUsers}</h3>
                  <p className="text-gray-400">Ativos Hoje</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="flex items-center">
                <div className="p-3 rounded-lg bg-yellow-900/30 text-yellow-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-2xl font-bold">{stats.pendingInvites}</h3>
                  <p className="text-gray-400">Convites Pendentes</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Quick Actions */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Ações Rápidas</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {quickActions.map((action, index) => (
                <div 
                  key={index}
                  onClick={action.onClick}
                  className="bg-gray-800 rounded-xl p-6 border border-gray-700 cursor-pointer hover:border-blue-500 transition-all hover:bg-gray-750"
                >
                  <div className="flex items-center mb-4">
                    <div className="text-blue-400">
                      {action.icon}
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold mb-1">{action.title}</h3>
                  <p className="text-gray-400 text-sm">{action.description}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Recent Activity */}
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h2 className="text-xl font-semibold mb-4">Atividade Recente</h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="mr-4">
                  <div className="w-10 h-10 rounded-full bg-blue-900/30 flex items-center justify-center">
                    <span className="text-blue-400">JS</span>
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">João Silva</h4>
                  <p className="text-gray-400 text-sm">Matriculou-se no curso "Fundamentos Bíblicos"</p>
                  <p className="text-gray-500 text-xs mt-1">Há 2 horas</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="mr-4">
                  <div className="w-10 h-10 rounded-full bg-green-900/30 flex items-center justify-center">
                    <span className="text-green-400">MO</span>
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">Maria Oliveira</h4>
                  <p className="text-gray-400 text-sm">Completou o módulo 3 do curso "Teologia Sistemática"</p>
                  <p className="text-gray-500 text-xs mt-1">Há 4 horas</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="mr-4">
                  <div className="w-10 h-10 rounded-full bg-purple-900/30 flex items-center justify-center">
                    <span className="text-purple-400">PS</span>
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">Pedro Santos</h4>
                  <p className="text-gray-400 text-sm">Enviou uma dúvida sobre a lição "Natureza de Jesus"</p>
                  <p className="text-gray-500 text-xs mt-1">Há 6 horas</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;