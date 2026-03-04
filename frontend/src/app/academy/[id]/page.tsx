'use client';

import { useParams, useRouter } from 'next/navigation';
import { useCourses } from '@/hooks/useCourses';
import PremiumButton from '@/components/ui/PremiumButton';
import { useEffect, useState } from 'react';

export default function CourseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const courseId = params?.id as string;
  const { courses, loading, error, getCourseById } = useCourses();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500 mx-auto mb-4"></div>
          <p>Carregando curso...</p>
        </div>
      </div>
    );
  }

  if (error || !courseId) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-white text-3xl font-bold mb-4">Curso não encontrado</h1>
          <p className="text-gray-400 mb-6">Desculpe, o curso que você procura não existe.</p>
          <PremiumButton onClick={() => router.push('/academy')} variant="primary">
            Voltar para Cursos
          </PremiumButton>
        </div>
      </div>
    );
  }

  const course = getCourseById(courseId);

  if (!course) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-white text-3xl font-bold mb-4">Curso não encontrado</h1>
          <p className="text-gray-400 mb-6">Desculpe, o curso que você procura não existe.</p>
          <PremiumButton onClick={() => router.push('/academy')} variant="primary">
            Voltar para Cursos
          </PremiumButton>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 text-white">
      {/* Hero Section */}
      <div className="relative h-96 bg-gradient-to-r from-amber-600 to-amber-700 overflow-hidden">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative h-full flex items-center justify-center text-center px-4">
          <div className="max-w-2xl">
            <h1 className="text-5xl font-bold mb-4">{course.title}</h1>
            <p className="text-xl text-amber-100">{course.description}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Course Info */}
            <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
              <h2 className="text-2xl font-bold mb-4">Sobre o Curso</h2>
              <p className="text-gray-300 mb-6">{course.description}</p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-slate-700/50 p-4 rounded">
                  <p className="text-sm text-gray-400">Nível</p>
                  <p className="text-lg font-semibold">{course.level}</p>
                </div>
                <div className="bg-slate-700/50 p-4 rounded">
                  <p className="text-sm text-gray-400">Duração</p>
                  <p className="text-lg font-semibold">{course.duration}</p>
                </div>
                <div className="bg-slate-700/50 p-4 rounded">
                  <p className="text-sm text-gray-400">Aulas</p>
                  <p className="text-lg font-semibold">{course.lessons}</p>
                </div>
                <div className="bg-slate-700/50 p-4 rounded">
                  <p className="text-sm text-gray-400">Alunos</p>
                  <p className="text-lg font-semibold">{course.students}</p>
                </div>
              </div>

              <div className="bg-slate-700/50 p-4 rounded">
                <p className="text-sm text-gray-400 mb-2">Instrutor</p>
                <p className="text-lg font-semibold">{course.instructor}</p>
              </div>
            </div>

            {/* Classes */}
            {course.classes && course.classes.length > 0 && (
              <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
                <h2 className="text-2xl font-bold mb-4">Turmas Disponíveis</h2>
                <div className="space-y-4">
                  {course.classes.map((cls) => (
                    <div key={cls.id} className="bg-slate-700/50 p-4 rounded border border-slate-600 hover:border-amber-500 transition">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-lg font-semibold">{cls.name}</h3>
                          <p className="text-sm text-gray-400">Início: {new Date(cls.startDate).toLocaleDateString('pt-BR')}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-amber-500">R$ {cls.price}</p>
                          <p className="text-xs text-gray-400 capitalize">{cls.status}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-4 bg-gradient-to-b from-amber-600 to-amber-700 rounded-lg p-6 space-y-4">
              <div>
                <p className="text-sm text-amber-100 mb-2">Preço a partir de</p>
                <p className="text-3xl font-bold">R$ {course.classes?.[0]?.price || 'Sob consulta'}</p>
              </div>

              <PremiumButton
                variant="primary"
                className="w-full bg-white text-amber-600 hover:bg-gray-100"
                onClick={() => router.push('/auth/register')}
              >
                Quero Me Inscrever
              </PremiumButton>

              <PremiumButton
                variant="outline"
                className="w-full text-white border-white hover:bg-white/10"
                onClick={() => router.push('/academy')}
              >
                Ver Mais Cursos
              </PremiumButton>

              <div className="bg-black/20 p-4 rounded text-sm">
                <p className="mb-2">✓ Certificado ao final</p>
                <p className="mb-2">✓ Acesso vitalício</p>
                <p>✓ Suporte dedicado</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
