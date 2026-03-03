'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import PremiumButton from '@/components/ui/PremiumButton';
import PremiumCard from '@/components/ui/PremiumCard';

interface Course {
  id: string;
  title: string;
  description: string;
  image: string;
  price: number;
  lessons: number;
  students: number;
  rating: number;
  level: 'Iniciante' | 'Intermediário' | 'Avançado';
  instructor: string;
}

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

  const courses: Course[] = [
    {
      id: '1',
      title: 'Fundamentos Bíblicos Avançados',
      description: 'Aprofunde seus conhecimentos nas escrituras sagradas com análise teológica completa.',
      image: '📖',
      price: 197.00,
      lessons: 24,
      students: 1234,
      rating: 4.9,
      level: 'Avançado',
      instructor: 'Dr. João Silva',
    },
    {
      id: '2',
      title: 'Ministério Pastoral Prático',
      description: 'Capacitação completa para liderança espiritual eficaz em diferentes contextos.',
      image: '⛪',
      price: 247.00,
      lessons: 32,
      students: 856,
      rating: 4.8,
      level: 'Avançado',
      instructor: 'Pastora Maria Santos',
    },
    {
      id: '3',
      title: 'Teologia Sistemática',
      description: 'Estude a teologia de forma organizada e aprofundada para fortalecer sua fé.',
      image: '✝️',
      price: 297.00,
      lessons: 40,
      students: 612,
      rating: 4.9,
      level: 'Intermediário',
      instructor: 'Prof. Pedro Costa',
    },
    {
      id: '4',
      title: 'Homilética e Pregação',
      description: 'Desenvolva habilidades excelentes em pregação bíblica com técnicas modernas.',
      image: '🎤',
      price: 177.00,
      lessons: 16,
      students: 945,
      rating: 4.7,
      level: 'Intermediário',
      instructor: 'Ev. Carlos Oliveira',
    },
  ];

  const teachers: Teacher[] = [
    {
      id: '1',
      name: 'Dr. João Silva',
      title: 'Doutor em Teologia Sistemática',
      bio: 'Com mais de 20 anos de experiência em educação teológica, Dr. Silva é especialista em hermenêutica bíblica e teologia reformada.',
      image: '👨‍🏫',
      specialization: 'Teologia Sistemática e Hermenêutica',
      experience: '20+ anos',
    },
    {
      id: '2',
      name: 'Pastora Maria Santos',
      title: 'Mestra em Liderança Ministerial',
      bio: 'Pastora com experiência em múltiplos contextos de ministério, especializada em desenvolvimento de lideranças dinâmicas.',
      image: '👩‍🏫',
      specialization: 'Liderança Pastoral e Ministério Comunitário',
      experience: '18+ anos',
    },
    {
      id: '3',
      name: 'Prof. Pedro Costa',
      title: 'Doutor em Teologia Prática',
      bio: 'Professor dedicado ao ensino prático da teologia com foco em aplicação contemporânea das escrituras.',
      image: '👨‍🎓',
      specialization: 'Teologia Prática e Aplicação Ministerial',
      experience: '15+ anos',
    },
  ];

  const offers = [
    {
      title: 'Oferta Especial - Pacote Completo',
      description: 'Acesso a todos os 4 cursos principais com desconto de 40%',
      originalPrice: 918.00,
      discountedPrice: 549.00,
      savings: 369.00,
      validUntil: '28 de Fevereiro, 2026',
      benefits: [
        '✓ 4 cursos completos com certificados',
        '✓ Acesso vitalício ao conteúdo',
        '✓ Comunidade exclusiva de alunos',
        '✓ Suporte direto com instrutores',
        '✓ Materiais em PDF e vídeos',
      ],
    },
    {
      title: 'Oferta Flash - Trial de 7 Dias',
      description: 'Teste qualquer curso por apenas R$ 9,90',
      originalPrice: 0,
      discountedPrice: 9.9,
      savings: 0,
      validUntil: 'Válido esta semana',
      benefits: [
        '✓ Acesso completo por 7 dias',
        '✓ Sem compromisso - cancele quando quiser',
        '✓ Material completo incluído',
        '✓ Chat com instructor',
      ],
    },
  ];

  return (
    <div className="min-h-screen text-white">
      {/* ===== HEADER ===== */}
      <section className="relative overflow-hidden py-12 border-b border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(1200px_circle_at_10%_10%,#1a0f1f_0%,#05070c_40%,#02030a_100%)]"></div>

        <div className="relative container mx-auto px-4">
          <div className="max-w-3xl">
            <div className="inline-block px-4 py-2 bg-indigo-600/20 border border-indigo-500/30 rounded-full mb-4">
              <span className="text-sm font-semibold text-indigo-300">Academia PAZ e BEM</span>
            </div>
            <h1 className="text-5xl font-bold mb-3">Programas de Educação Teológica</h1>
            <p className="text-xl text-gray-300">
              Escolha entre nossos programas de desenvolvimento espiritual e ministerial
            </p>
          </div>
        </div>
      </section>

      {/* ===== TAB NAVIGATION ===== */}
      <section className="sticky top-0 z-40 bg-black/80 backdrop-blur border-b border-white/5">
        <div className="container mx-auto px-4">
          <div className="flex gap-8">
            <button
              onClick={() => setActiveTab('courses')}
              className={`py-4 px-1 font-semibold border-b-2 transition-all ${
                activeTab === 'courses'
                  ? 'border-indigo-500 text-white'
                  : 'border-transparent text-gray-400 hover:text-white'
              }`}
            >
              📚 Cursos
            </button>
            <button
              onClick={() => setActiveTab('teachers')}
              className={`py-4 px-1 font-semibold border-b-2 transition-all ${
                activeTab === 'teachers'
                  ? 'border-indigo-500 text-white'
                  : 'border-transparent text-gray-400 hover:text-white'
              }`}
            >
              👨‍🏫 Professores
            </button>
            <button
              onClick={() => setActiveTab('offers')}
              className={`py-4 px-1 font-semibold border-b-2 transition-all ${
                activeTab === 'offers'
                  ? 'border-indigo-500 text-white'
                  : 'border-transparent text-gray-400 hover:text-white'
              }`}
            >
              🎉 Ofertas Especiais
            </button>
          </div>
        </div>
      </section>

      {/* ===== COURSES TAB ===== */}
      {activeTab === 'courses' && (
        <section className="py-20 relative z-10">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Nossos Cursos</h2>
              <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                Programas de alta qualidade ministrados por professores doutores e mestres em teologia
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {courses.map((course) => (
                <PremiumCard key={course.id}>
                  <PremiumCard.Body>
                    <div className="flex justify-between items-start mb-4">
                      <div className="text-6xl">{course.image}</div>
                      <span className="px-3 py-1 bg-indigo-600/20 text-indigo-300 text-sm font-semibold rounded-full">
                        {course.level}
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold mb-2">{course.title}</h3>
                    <p className="text-gray-300 mb-4 text-sm leading-relaxed">{course.description}</p>

                    <div className="border-t border-white/10 py-4">
                      <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
                        <div>
                          <div className="text-gray-400">Lições</div>
                          <div className="text-xl font-bold text-indigo-400">{course.lessons}</div>
                        </div>
                        <div>
                          <div className="text-gray-400">Alunos</div>
                          <div className="text-xl font-bold text-purple-400">{course.students}</div>
                        </div>
                        <div>
                          <div className="text-gray-400">Avaliação</div>
                          <div className="text-xl font-bold text-yellow-400">⭐ {course.rating}</div>
                        </div>
                      </div>
                    </div>

                    <p className="text-sm text-gray-400 mb-4">
                      Instrutor: <span className="text-white font-semibold">{course.instructor}</span>
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="text-3xl font-bold">
                        R$ <span className="text-indigo-400">{course.price.toFixed(2)}</span>
                      </div>
                      <PremiumButton 
                        variant="primary"
                        onClick={() => router.push(`/academy/${course.id}`)}
                      >
                        Enroll Agora
                      </PremiumButton>
                    </div>
                  </PremiumCard.Body>
                </PremiumCard>
              ))}
            </div>
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {teachers.map((teacher) => (
                <PremiumCard key={teacher.id}>
                  <PremiumCard.Body>
                    <div className="text-center mb-6">
                      <div className="text-7xl mb-4">{teacher.image}</div>
                      <h3 className="text-2xl font-bold mb-1">{teacher.name}</h3>
                      <p className="text-indigo-400 font-semibold text-sm">{teacher.title}</p>
                    </div>

                    <p className="text-gray-300 mb-6 text-sm leading-relaxed">{teacher.bio}</p>

                    <div className="bg-white/5 rounded-lg p-4 mb-4">
                      <p className="text-xs text-gray-400 mb-1">Especialização</p>
                      <p className="text-white font-semibold text-sm">{teacher.specialization}</p>
                    </div>

                    <div className="bg-white/5 rounded-lg p-4">
                      <p className="text-xs text-gray-400 mb-1">Experiência</p>
                      <p className="text-white font-semibold text-sm">{teacher.experience}</p>
                    </div>

                    <PremiumButton 
                      variant="secondary" 
                      className="w-full mt-6"
                      onClick={() => router.push(`/academy?instructor=${teacher.name}`)}
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
                        <span className="mr-3">{benefit.split(' ')[0]}</span>
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