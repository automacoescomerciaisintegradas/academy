'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useAuth from '@/hooks/useAuth';
import PremiumCard from '@/components/ui/PremiumCard';
import PremiumButton from '@/components/ui/PremiumButton';
import { supabase } from '@/lib/supabase/client';

interface Enrollment {
  id: string;
  courseId: string;
  courseTitle: string;
  enrollmentDate: any;
  status: 'active' | 'completed' | 'paused';
  progressPercent: number;
  created_at?: string;
}

const DashboardPage = () => {
  const router = useRouter();
  const { user, loading, isAuthenticated } = useAuth();
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [fetchingData, setFetchingData] = useState(true);

  // Verifica autenticação
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/auth/login');
    }
  }, [loading, isAuthenticated, router]);

  // Busca matrículas reais do Firestore (Prompt 5)
  useEffect(() => {
    const fetchEnrollments = async () => {
      if (isAuthenticated && user?.id) {
        try {
          const { data: enrollmentData } = await supabase
            .from('enrollments')
            .select('*')
            .eq('user_id', user.id);

          if (enrollmentData) {
            setEnrollments(enrollmentData as Enrollment[]);
          }
        } catch (error) {
          console.error("Erro ao buscar matrículas:", error);
        } finally {
          setFetchingData(false);
        }
      }
    };

    fetchEnrollments();
  }, [isAuthenticated, user]);

  if (loading || fetchingData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-4 md:p-8">
      <div className="container mx-auto max-w-7xl">

        {/* Header Seção */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
              Olá, {user?.user_metadata?.full_name || user?.user_metadata?.displayName || 'Estudante'}
            </h1>
            <p className="text-gray-400 mt-1">Bem-vindo de volta à sua jornada de conhecimento.</p>
          </div>
          <PremiumButton variant="primary" onClick={() => router.push('/academy')}>
            Explorar Novos Cursos
          </PremiumButton>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

          {/* Sidebar de Perfil */}
          <div className="lg:col-span-1 space-y-6">
            <PremiumCard className="border-indigo-500/20">
              <PremiumCard.Body>
                <div className="flex flex-col items-center text-center">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-3xl font-bold mb-4 shadow-lg shadow-indigo-500/20">
                    {user?.user_metadata?.full_name?.[0] || user?.email?.[0]?.toUpperCase()}
                  </div>
                  <h2 className="text-xl font-bold">{user?.user_metadata?.full_name || user?.user_metadata?.displayName || 'Usuário'}</h2>
                  <p className="text-gray-400 text-sm mb-4">{user?.email}</p>
                  <div className="w-full pt-4 border-t border-white/5 space-y-3 text-left">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Cursos Ativos</span>
                      <span className="font-semibold">{enrollments.filter(e => e.status === 'active').length}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Cursos Concluídos</span>
                      <span className="font-semibold">{enrollments.filter(e => e.status === 'completed').length}</span>
                    </div>
                  </div>
                </div>
              </PremiumCard.Body>
            </PremiumCard>

            <PremiumCard className="bg-blue-900/10 border-blue-500/20">
              <PremiumCard.Header title="Meu Progresso Geral" />
              <PremiumCard.Body>
                <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden mb-2">
                  <div className="bg-blue-500 h-full w-[45%]" />
                </div>
                <p className="text-xs text-center text-gray-400">Você concluiu 45% do seu plano atual</p>
              </PremiumCard.Body>
            </PremiumCard>
          </div>

          {/* Matrículas e Cursos */}
          <div className="lg:col-span-3">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <span className="text-blue-500">●</span> Meus Cursos
            </h2>

            {enrollments.length === 0 ? (
              <div className="bg-gray-800/50 border border-dashed border-gray-700 rounded-2xl p-12 text-center">
                <div className="text-5xl mb-4">📚</div>
                <h3 className="text-xl font-bold mb-2">Nenhum curso encontrado</h3>
                <p className="text-gray-400 mb-6">Você ainda não está matriculado em nenhum curso.</p>
                <PremiumButton variant="secondary" onClick={() => router.push('/academy')}>
                  Ver Catálogo de Cursos
                </PremiumButton>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {enrollments.map((course) => (
                  <PremiumCard key={course.id} className="hover:border-blue-500/40 transition-all group">
                    <PremiumCard.Body>
                      <div className="flex justify-between items-start mb-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${course.status === 'active' ? 'bg-green-500/10 text-green-500' : 'bg-blue-500/10 text-blue-500'
                          }`}>
                          {course.status === 'active' ? 'EM ANDAMENTO' : 'CONCLUÍDO'}
                        </span>
                        <span className="text-xs text-gray-500">
                          Desde: {new Date(course.enrollmentDate || course.created_at).toLocaleDateString()}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors">
                        {course.courseTitle}
                      </h3>

                      <div className="mt-6 mb-4">
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-gray-400">Progresso</span>
                          <span className="text-white font-bold">{course.progressPercent}%</span>
                        </div>
                        <div className="w-full bg-gray-900 h-2 rounded-full overflow-hidden">
                          <div
                            className="bg-gradient-to-r from-blue-600 to-indigo-600 h-full transition-all duration-500"
                            style={{ width: `${course.progressPercent}%` }}
                          />
                        </div>
                      </div>

                      <PremiumButton
                        variant="secondary"
                        className="w-full mt-2"
                        onClick={() => router.push(`/academy/course/${course.courseId}`)}
                      >
                        Continuar Aprendendo
                      </PremiumButton>
                    </PremiumCard.Body>
                  </PremiumCard>
                ))}
              </div>
            )}

            {/* Seção Extra: Certificados (Prompt 5) */}
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <span className="text-yellow-500">●</span> Meus Certificados
              </h2>
              <PremiumCard className="bg-yellow-500/5 border-yellow-500/10">
                <PremiumCard.Body className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="text-4xl text-yellow-500">🏆</div>
                    <div>
                      <h4 className="font-bold">Certificações em Breve</h4>
                      <p className="text-sm text-gray-400">Conclua seus cursos para desbloquear certificados exclusivos.</p>
                    </div>
                  </div>
                  <PremiumButton variant="outline" size="sm" disabled>
                    Nenhum disponível
                  </PremiumButton>
                </PremiumCard.Body>
              </PremiumCard>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;