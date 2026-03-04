'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import PremiumButton from '@/components/ui/PremiumButton';
import PremiumCard from '@/components/ui/PremiumCard';
import { useCourses } from '@/hooks/useCourses';

interface Teacher {
  id: string;
  name: string;
  title: string;
  bio: string;
  image: string;
  specialization: string;
  experience: string;
}

const AcademyPage = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'courses' | 'teachers' | 'offers'>('courses');
  const [isMounted, setIsMounted] = useState(false);
  const { courses, loading } = useCourses();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const teachers: Teacher[] = [
    {
      id: '1',
      name: 'Prof. Antonio Sergio Queiroz Alves',
      title: 'Doutor em Teologia',
      bio: 'Com mais de 20 anos de experiência em educação teológica, especialista em hermenêutica bíblica e teologia sistemática.',
      image: '👨‍🏫',
      specialization: 'Teologia Sistemática e Hermenêutica',
      experience: '20+ anos',
    },
  ];

  const offers = [
    {
      title: 'Combo Iniciante',
      description: 'Todos os 3 cursos para iniciantes em um único pacote',
      originalPrice: 891,
      discountedPrice: 534.60,
      savings: 356.40,
      benefits: ['✓ Teologia Bíblica', '✓ Hermenêutica Bíblica', '✓ 3 aulas de mentoria'],
      validUntil: '31/03/2026',
    },
    {
      title: 'Caminho Completo',
      description: 'Cursos progressivos do iniciante ao avançado',
      originalPrice: 2000,
      discountedPrice: 1400,
      savings: 600,
      benefits: ['✓ Todos os 6 cursos', '✓ Certificados inclusos', '✓ Suporte ilimitado'],
      validUntil: '15/03/2026',
    },
  ];

  if (!isMounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Hero Section */}
      <div className="relative overflow-hidden pt-20 pb-12">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/20 to-purple-900/20"></div>
        <div className="relative container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Academia Teológica
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Formação de excelência em teologia bíblica e liderança cristã
          </p>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="container mx-auto px-4 mb-12">
        <div className="flex gap-4 justify-center flex-wrap">
          <button
            onClick={() => setActiveTab('courses')}
            className={`px-8 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'courses'
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                : 'bg-slate-800 text-gray-300 hover:bg-slate-700'
            }`}
          >
            Cursos
          </button>
          <button
            onClick={() => setActiveTab('teachers')}
            className={`px-8 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'teachers'
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                : 'bg-slate-800 text-gray-300 hover:bg-slate-700'
            }`}
          >
            Professores
          </button>
          <button
            onClick={() => setActiveTab('offers')}
            className={`px-8 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'offers'
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                : 'bg-slate-800 text-gray-300 hover:bg-slate-700'
            }`}
          >
            Ofertas Especiais
          </button>
        </div>
      </div>

      {/* ===== COURSES TAB ===== */}
      {activeTab === 'courses' && (
        <section className="py-20 relative z-10">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Nossos Cursos</h2>
              <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                Programas de alta qualidade desenvolvidos por especialistas em teologia
              </p>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto mb-4"></div>
                <p className="text-gray-400">Carregando cursos...</p>
              </div>
            ) : courses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {courses.map((course) => (
                  <PremiumCard
                    key={course.id}
                    onClick={() => router.push(`/academy/${course.id}`)}
                  >
                    <PremiumCard.Body>
                      <div className="mb-4">
                        <span className="px-3 py-1 bg-indigo-600/20 text-indigo-300 text-xs font-semibold rounded-full">
                          {course.level}
                        </span>
                      </div>

                      <h3 className="text-2xl font-bold mb-3 text-white hover:text-indigo-300 transition-colors">
                        {course.title}
                      </h3>
                      <p className="text-gray-300 mb-4 line-clamp-3">
                        {course.description}
                      </p>

                      <div className="bg-slate-700/50 rounded-lg p-4 mb-4">
                        <p className="text-sm text-gray-400 mb-2">Informações</p>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <p className="text-gray-400">Aulas</p>
                            <p className="font-bold text-white">{course.lessons}</p>
                          </div>
                          <div>
                            <p className="text-gray-400">Alunos</p>
                            <p className="font-bold text-white">{course.students}</p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-slate-700/50 rounded-lg p-4 mb-4">
                        <p className="text-sm text-gray-400">Professor</p>
                        <p className="font-semibold text-white">{course.instructor}</p>
                      </div>

                      <div className="mb-4">
                        {course.classes && course.classes.length > 0 && (
                          <div>
                            <p className="text-sm text-gray-400 mb-2">A partir de</p>
                            <p className="text-2xl font-bold text-indigo-400">
                              R$ {course.classes[0].price}
                            </p>
                          </div>
                        )}
                      </div>

                      <PremiumButton
                        variant="primary"
                        className="w-full"
                        onClick={() => router.push(`/academy/${course.id}`)}
                      >
                        Ver Detalhes do Curso
                      </PremiumButton>
                    </PremiumCard.Body>
                  </PremiumCard>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-400">Nenhum curso disponível no momento.</p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ===== TEACHERS TAB ===== */}
      {activeTab === 'teachers' && (
        <section className="py-20 relative z-10">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Nossos Professores</h2>
              <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                Mestres e doutores em teologia com décadas de experiência ministerial
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teachers.map((teacher) => (
                <PremiumCard key={teacher.id}>
                  <PremiumCard.Body>
                    <div className="text-center mb-6">
                      <div className="text-7xl mb-4">{teacher.image}</div>
                      <h3 className="text-2xl font-bold mb-1">{teacher.name}</h3>
                      <p className="text-indigo-400 font-semibold text-sm">{teacher.title}</p>
                    </div>

                    <p className="text-gray-300 mb-6 text-sm leading-relaxed">{teacher.bio}</p>

                    <div className="bg-slate-700/50 rounded-lg p-4 mb-4">
                      <p className="text-xs text-gray-400 mb-1">Especialização</p>
                      <p className="text-white font-semibold text-sm">{teacher.specialization}</p>
                    </div>

                    <div className="bg-slate-700/50 rounded-lg p-4 mb-4">
                      <p className="text-xs text-gray-400 mb-1">Experiência</p>
                      <p className="text-white font-semibold text-sm">{teacher.experience}</p>
                    </div>

                    <PremiumButton
                      variant="primary"
                      className="w-full"
                      onClick={() => setActiveTab('courses')}
                    >
                      Ver Cursos
                    </PremiumButton>
                  </PremiumCard.Body>
                </PremiumCard>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== OFFERS TAB ===== */}
      {activeTab === 'offers' && (
        <section className="py-20 relative z-10">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Ofertas Especiais</h2>
              <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                Aproveite nossas promoções limitadas e comece sua jornada com desconto
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {offers.map((offer, idx) => (
                <div
                  key={idx}
                  className="relative rounded-2xl overflow-hidden border border-indigo-500/30 bg-gradient-to-br from-indigo-900/20 to-purple-900/10 p-8"
                >
                  {idx === 0 && (
                    <div className="absolute top-4 right-4 px-4 py-2 bg-red-600 text-white font-bold text-sm rounded-full">
                      -40% OFF
                    </div>
                  )}

                  <h3 className="text-3xl font-bold mb-2">{offer.title}</h3>
                  <p className="text-gray-300 mb-6">{offer.description}</p>

                  <div className="mb-6">
                    <div className="flex items-baseline gap-4 mb-2">
                      <div className="text-5xl font-bold text-indigo-400">
                        R$ {offer.discountedPrice.toFixed(2)}
                      </div>
                      {offer.originalPrice > 0 && (
                        <div className="text-2xl text-gray-400 line-through">
                          R$ {offer.originalPrice.toFixed(2)}
                        </div>
                      )}
                    </div>
                    {offer.savings > 0 && (
                      <p className="text-emerald-400 font-semibold">
                        Economize R$ {offer.savings.toFixed(2)}
                      </p>
                    )}
                  </div>

                  <ul className="space-y-3 mb-8">
                    {offer.benefits.map((benefit, bidx) => (
                      <li key={bidx} className="text-gray-300 flex items-start">
                        <span className="mr-3 text-indigo-400">{benefit.split(' ')[0]}</span>
                        <span>{benefit.substring(2)}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="border-t border-white/10 pt-4">
                    <p className="text-xs text-gray-400 mb-4">
                      Válido até: <span className="text-white font-semibold">{offer.validUntil}</span>
                    </p>
                    <PremiumButton
                      variant="primary"
                      className="w-full"
                      onClick={() => router.push('/auth/register')}
                    >
                      Aproveitar Oferta Agora
                    </PremiumButton>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default AcademyPage;
