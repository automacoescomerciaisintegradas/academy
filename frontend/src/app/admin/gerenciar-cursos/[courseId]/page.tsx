'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

const CourseModulesPage = () => {
  const params = useParams();
  const router = useRouter();
  const courseId = params.courseId as string;
  
  // Simulação de dados do curso
  const [course, setCourse] = useState<any>(null);
  const [modules, setModules] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingModule, setEditingModule] = useState<any>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    order: 1
  });

  // Simulação de carregamento de dados
  useEffect(() => {
    // Simulando carregamento de dados do curso
    setCourse({
      id: courseId,
      title: `Curso ${courseId}`,
      instructor: 'Professor(a) Simulado',
      students: Math.floor(Math.random() * 300),
      status: 'Ativo'
    });
    
    // Simulando carregamento de módulos
    setModules([
      { id: '1', title: 'Introdução ao Curso', description: 'Primeiros passos e conceitos básicos', order: 1, lessons: 5 },
      { id: '2', title: 'Fundamentos Teóricos', description: 'Base teórica do conteúdo', order: 2, lessons: 8 },
      { id: '3', title: 'Aplicações Práticas', description: 'Como aplicar os conceitos na prática', order: 3, lessons: 7 },
    ]);
  }, [courseId]);

  // Função para abrir modal de criação
  const openCreateModal = () => {
    setEditingModule(null);
    setFormData({ 
      title: '', 
      description: '', 
      order: modules.length + 1 
    });
    setShowModal(true);
  };

  // Função para abrir modal de edição
  const openEditModal = (module: any) => {
    setEditingModule(module);
    setFormData({
      title: module.title,
      description: module.description,
      order: module.order
    });
    setShowModal(true);
  };

  // Função para fechar modal
  const closeModal = () => {
    setShowModal(false);
    setEditingModule(null);
  };

  // Função para salvar módulo
  const saveModule = () => {
    if (editingModule) {
      // Editar módulo existente
      setModules(modules.map(m => 
        m.id === editingModule.id 
          ? { ...m, ...formData } 
          : m
      ));
    } else {
      // Criar novo módulo
      const newModule = {
        id: (modules.length + 1).toString(),
        ...formData,
        lessons: 0
      };
      setModules([...modules, newModule]);
    }
    closeModal();
  };

  // Função para excluir módulo
  const deleteModule = (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este módulo? Esta ação também excluirá todas as aulas associadas.')) {
      setModules(modules.filter(m => m.id !== id));
    }
  };

  // Função para reordenar módulos
  const moveModule = (index: number, direction: 'up' | 'down') => {
    if ((direction === 'up' && index === 0) || (direction === 'down' && index === modules.length - 1)) {
      return;
    }

    const newModules = [...modules];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    [newModules[index], newModules[targetIndex]] = [newModules[targetIndex], newModules[index]];
    
    // Atualizar ordem
    newModules.forEach((mod, idx) => {
      mod.order = idx + 1;
    });
    
    setModules(newModules);
  };

  if (!course) {
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
            <h1 className="text-3xl font-bold">{course.title}</h1>
            <p className="text-gray-400">Gerenciar Módulos</p>
          </div>
          <button 
            onClick={() => router.back()}
            className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-md transition"
          >
            Voltar
          </button>
        </div>
        
        <div className="bg-gray-800 rounded-xl p-6 mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold">{course.title}</h2>
              <p className="text-gray-400">Instrutor: {course.instructor} • {course.students} alunos</p>
            </div>
            <span className={`px-3 py-1 rounded-full ${
              course.status === 'Ativo' 
                ? 'bg-green-900/50 text-green-300' 
                : 'bg-red-900/50 text-red-300'
            }`}>
              {course.status}
            </span>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Módulos do Curso</h2>
            <button 
              onClick={openCreateModal}
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md transition flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Novo Módulo
            </button>
          </div>
          
          <div className="space-y-4">
            {modules.map((module, index) => (
              <div 
                key={module.id} 
                className="bg-gray-700/50 backdrop-blur-sm rounded-xl p-6 border border-gray-600"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-bold">{module.title}</h3>
                    <p className="text-gray-400 text-sm">{module.description}</p>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => moveModule(index, 'up')}
                      disabled={index === 0}
                      className={`p-1 rounded ${
                        index === 0 ? 'text-gray-500 cursor-not-allowed' : 'text-blue-400 hover:text-blue-300'
                      }`}
                      title="Mover para cima"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                    
                    <button 
                      onClick={() => moveModule(index, 'down')}
                      disabled={index === modules.length - 1}
                      className={`p-1 rounded ${
                        index === modules.length - 1 ? 'text-gray-500 cursor-not-allowed' : 'text-blue-400 hover:text-blue-300'
                      }`}
                      title="Mover para baixo"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                    
                    <button 
                      onClick={() => openEditModal(module)}
                      className="text-blue-400 hover:text-blue-300"
                      title="Editar módulo"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                      </svg>
                    </button>
                    
                    <button 
                      onClick={() => deleteModule(module.id)}
                      className="text-red-400 hover:text-red-300"
                      title="Excluir módulo"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </button>
                    
                    <button 
                      onClick={() => router.push(`/admin/gerenciar-cursos/${courseId}/${module.id}`)}
                      className="text-green-400 hover:text-green-300"
                      title="Gerenciar aulas"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
                
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>Ordem: {module.order}</span>
                  <span>{module.lessons} aulas</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Modal para criar/editar módulo */}
        {showModal && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 rounded-xl p-6 w-full max-w-md">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">
                  {editingModule ? 'Editar Módulo' : 'Novo Módulo'}
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
                  <label className="block text-sm font-medium text-gray-300 mb-1">Título do Módulo</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="w-full px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Digite o título do módulo"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Descrição</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="w-full px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Descrição do módulo"
                    rows={3}
                  />
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
                  onClick={saveModule}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md transition"
                >
                  {editingModule ? 'Salvar' : 'Criar Módulo'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseModulesPage;