'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

const ModuleLessonsPage = () => {
  const params = useParams();
  const router = useRouter();
  const courseId = params.courseId as string;
  const moduleId = params.moduleId as string;
  
  // Simulação de dados
  const [course, setCourse] = useState<any>(null);
  const [module, setModule] = useState<any>(null);
  const [lessons, setLessons] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingLesson, setEditingLesson] = useState<any>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    duration: '',
    order: 1,
    type: 'video' // video, text, quiz
  });

  // Simulação de carregamento de dados
  useEffect(() => {
    // Simulando carregamento de dados
    setCourse({
      id: courseId,
      title: `Curso ${courseId}`,
      instructor: 'Professor(a) Simulado',
      students: Math.floor(Math.random() * 300),
      status: 'Ativo'
    });
    
    setModule({
      id: moduleId,
      title: `Módulo ${moduleId}`,
      description: 'Descrição do módulo simulado',
      order: parseInt(moduleId),
      lessons: 5
    });
    
    setLessons([
      { id: '1', title: 'Introdução ao Tema', description: 'Visão geral do conteúdo', duration: '15:30', order: 1, type: 'video', status: 'publicado' },
      { id: '2', title: 'Conceitos Fundamentais', description: 'Explicação dos principais conceitos', duration: '22:45', order: 2, type: 'video', status: 'publicado' },
      { id: '3', title: 'Exercícios Práticos', description: 'Aplicação dos conceitos aprendidos', duration: '10:15', order: 3, type: 'quiz', status: 'rascunho' },
      { id: '4', title: 'Estudos de Caso', description: 'Análise de situações reais', duration: '28:10', order: 4, type: 'video', status: 'publicado' },
      { id: '5', title: 'Resumo e Conclusão', description: 'Recapitulação e encerramento', duration: '12:20', order: 5, type: 'text', status: 'publicado' },
    ]);
  }, [courseId, moduleId]);

  // Função para abrir modal de criação
  const openCreateModal = () => {
    setEditingLesson(null);
    setFormData({ 
      title: '', 
      description: '', 
      duration: '', 
      order: lessons.length + 1,
      type: 'video'
    });
    setShowModal(true);
  };

  // Função para abrir modal de edição
  const openEditModal = (lesson: any) => {
    setEditingLesson(lesson);
    setFormData({
      title: lesson.title,
      description: lesson.description,
      duration: lesson.duration,
      order: lesson.order,
      type: lesson.type
    });
    setShowModal(true);
  };

  // Função para fechar modal
  const closeModal = () => {
    setShowModal(false);
    setEditingLesson(null);
  };

  // Função para salvar aula
  const saveLesson = () => {
    if (editingLesson) {
      // Editar aula existente
      setLessons(lessons.map(l => 
        l.id === editingLesson.id 
          ? { ...l, ...formData } 
          : l
      ));
    } else {
      // Criar nova aula
      const newLesson = {
        id: (lessons.length + 1).toString(),
        ...formData,
        status: 'rascunho'
      };
      setLessons([...lessons, newLesson]);
    }
    closeModal();
  };

  // Função para excluir aula
  const deleteLesson = (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir esta aula?')) {
      setLessons(lessons.filter(l => l.id !== id));
    }
  };

  // Função para alternar status da aula
  const toggleLessonStatus = (id: string) => {
    setLessons(lessons.map(lesson => 
      lesson.id === id 
        ? { ...lesson, status: lesson.status === 'publicado' ? 'rascunho' : 'publicado' } 
        : lesson
    ));
  };

  // Função para reordenar aulas
  const moveLesson = (index: number, direction: 'up' | 'down') => {
    if ((direction === 'up' && index === 0) || (direction === 'down' && index === lessons.length - 1)) {
      return;
    }

    const newLessons = [...lessons];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    [newLessons[index], newLessons[targetIndex]] = [newLessons[targetIndex], newLessons[index]];
    
    // Atualizar ordem
    newLessons.forEach((lesson, idx) => {
      lesson.order = idx + 1;
    });
    
    setLessons(newLessons);
  };

  if (!course || !module) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white flex items-center justify-center">
        <p>Carregando...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-6">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">{module.title}</h1>
            <p className="text-gray-400">Gerenciar Aulas</p>
          </div>
          <button 
            onClick={() => router.back()}
            className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-md transition"
          >
            Voltar
          </button>
        </div>
        
        <div className="bg-gray-800 rounded-xl p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h2 className="text-xl font-semibold">{course.title}</h2>
              <p className="text-gray-400">Curso #{course.id}</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold">{module.title}</h2>
              <p className="text-gray-400">Módulo #{module.id}</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold">{lessons.length} Aulas</h2>
              <p className="text-gray-400">Total de aulas</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Aulas do Módulo</h2>
            <button 
              onClick={openCreateModal}
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md transition flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Nova Aula
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Ordem</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Título</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Tipo</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Duração</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {lessons.map((lesson, index) => (
                  <tr key={lesson.id}>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-300">{lesson.order}</td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-300">{lesson.title}</div>
                        <div className="text-sm text-gray-500">{lesson.description}</div>
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-300">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        lesson.type === 'video' ? 'bg-purple-900/50 text-purple-300' :
                        lesson.type === 'text' ? 'bg-blue-900/50 text-blue-300' :
                        'bg-yellow-900/50 text-yellow-300'
                      }`}>
                        {lesson.type === 'video' ? 'Vídeo' : lesson.type === 'text' ? 'Texto' : 'Quiz'}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-300">{lesson.duration}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm">
                      <span 
                        onClick={() => toggleLessonStatus(lesson.id)}
                        className={`px-2 py-1 rounded-full text-xs cursor-pointer ${
                          lesson.status === 'publicado' 
                            ? 'bg-green-900/50 text-green-300' 
                            : 'bg-gray-700 text-gray-300'
                        }`}
                        title="Clique para alterar status"
                      >
                        {lesson.status === 'publicado' ? 'Publicado' : 'Rascunho'}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm space-x-2">
                      <button 
                        onClick={() => moveLesson(index, 'up')}
                        disabled={index === 0}
                        className={`p-1 rounded ${
                          index === 0 ? 'text-gray-500 cursor-not-allowed' : 'text-blue-400 hover:text-blue-300'
                        }`}
                        title="Mover para cima"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                      
                      <button 
                        onClick={() => moveLesson(index, 'down')}
                        disabled={index === lessons.length - 1}
                        className={`p-1 rounded ${
                          index === lessons.length - 1 ? 'text-gray-500 cursor-not-allowed' : 'text-blue-400 hover:text-blue-300'
                        }`}
                        title="Mover para baixo"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                      
                      <button 
                        onClick={() => openEditModal(lesson)}
                        className="text-blue-400 hover:text-blue-300"
                        title="Editar aula"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                      </button>
                      
                      <button 
                        onClick={() => deleteLesson(lesson.id)}
                        className="text-red-400 hover:text-red-300"
                        title="Excluir aula"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Modal para criar/editar aula */}
        {showModal && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 rounded-xl p-6 w-full max-w-md">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">
                  {editingLesson ? 'Editar Aula' : 'Nova Aula'}
                </h3>
                <button 
                  onClick={closeModal}
                  className="text-gray-400 hover:text-white"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Título da Aula</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="w-full px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Digite o título da aula"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Descrição</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="w-full px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Descrição da aula"
                    rows={3}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Tipo</label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({...formData, type: e.target.value})}
                      className="w-full px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="video">Vídeo</option>
                      <option value="text">Texto</option>
                      <option value="quiz">Quiz</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Duração</label>
                    <input
                      type="text"
                      value={formData.duration}
                      onChange={(e) => setFormData({...formData, duration: e.target.value})}
                      className="w-full px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="00:00"
                      title="Formato: MM:SS ou HH:MM:SS"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Ordem</label>
                  <input
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData({...formData, order: parseInt(e.target.value) || 1})}
                    className="w-full px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min="1"
                  />
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <button 
                  onClick={closeModal}
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md transition"
                >
                  Cancelar
                </button>
                <button 
                  onClick={saveLesson}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md transition"
                >
                  {editingLesson ? 'Salvar' : 'Criar Aula'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModuleLessonsPage;