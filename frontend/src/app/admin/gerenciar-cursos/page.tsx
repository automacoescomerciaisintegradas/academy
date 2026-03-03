'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const ManageCoursesPage = () => {
  const router = useRouter();
  const [courses, setCourses] = useState([
    { id: '1', title: 'Fundamentos Bíblicos', instructor: 'Prof. João Silva', students: 120, status: 'Ativo' },
    { id: '2', title: 'Teologia Sistemática', instructor: 'Prof. Maria Oliveira', students: 85, status: 'Ativo' },
    { id: '3', title: 'Liderança Ministerial', instructor: 'Prof. Pedro Santos', students: 65, status: 'Inativo' },
    { id: '4', title: 'Discipulado Eficiente', instructor: 'Prof. Ana Costa', students: 210, status: 'Ativo' },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState<any>(null);
  const [formData, setFormData] = useState({
    title: '',
    instructor: '',
    description: ''
  });

  // Função para abrir modal de criação
  const openCreateModal = () => {
    setEditingCourse(null);
    setFormData({ title: '', instructor: '', description: '' });
    setShowModal(true);
  };

  // Função para abrir modal de edição
  const openEditModal = (course: any) => {
    setEditingCourse(course);
    setFormData({
      title: course.title,
      instructor: course.instructor,
      description: course.description || 'Descrição do curso...'
    });
    setShowModal(true);
  };

  // Função para fechar modal
  const closeModal = () => {
    setShowModal(false);
    setEditingCourse(null);
  };

  // Função para salvar curso
  const saveCourse = () => {
    if (editingCourse) {
      // Editar curso existente
      setCourses(courses.map(course => 
        course.id === editingCourse.id 
          ? { ...course, ...formData } 
          : course
      ));
    } else {
      // Criar novo curso
      const newCourse = {
        id: (courses.length + 1).toString(),
        ...formData,
        students: 0,
        status: 'Ativo'
      };
      setCourses([...courses, newCourse]);
    }
    closeModal();
  };

  // Função para excluir curso
  const deleteCourse = (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este curso?')) {
      setCourses(courses.filter(course => course.id !== id));
    }
  };

  // Função para alternar status do curso
  const toggleCourseStatus = (id: string) => {
    setCourses(courses.map(course => 
      course.id === id 
        ? { ...course, status: course.status === 'Ativo' ? 'Inativo' : 'Ativo' } 
        : course
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-6">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Gerenciar Cursos</h1>
          <button 
            onClick={() => router.back()}
            className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-md transition"
          >
            Voltar
          </button>
        </div>
        
        <div className="bg-gray-800 rounded-xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Lista de Cursos</h2>
            <button 
              onClick={openCreateModal}
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md transition flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Novo Curso
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div 
                key={course.id} 
                className="bg-gray-700/50 backdrop-blur-sm rounded-xl p-6 border border-gray-600 hover:border-blue-500 transition cursor-pointer"
                onClick={() => router.push(`/admin/gerenciar-cursos/${course.id}`)}
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-bold truncate">{course.title}</h3>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleCourseStatus(course.id);
                    }}
                    className={`ml-2 px-2 py-1 rounded-full text-xs ${
                      course.status === 'Ativo' 
                        ? 'bg-green-900/50 text-green-300' 
                        : 'bg-red-900/50 text-red-300'
                    }`}
                  >
                    {course.status}
                  </button>
                </div>
                
                <p className="text-gray-400 text-sm mb-4 truncate">Instrutor: {course.instructor}</p>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">{course.students} alunos</span>
                  
                  <div className="flex space-x-2">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        openEditModal(course);
                      }}
                      className="text-blue-400 hover:text-blue-300"
                      title="Editar curso"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                      </svg>
                    </button>
                    
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteCourse(course.id);
                      }}
                      className="text-red-400 hover:text-red-300"
                      title="Excluir curso"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Modal para criar/editar curso */}
        {showModal && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 rounded-xl p-6 w-full max-w-md">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">
                  {editingCourse ? 'Editar Curso' : 'Novo Curso'}
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
                  <label className="block text-sm font-medium text-gray-300 mb-1">Título do Curso</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="w-full px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Digite o título do curso"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Instrutor</label>
                  <input
                    type="text"
                    value={formData.instructor}
                    onChange={(e) => setFormData({...formData, instructor: e.target.value})}
                    className="w-full px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Nome do instrutor"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Descrição</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="w-full px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Descrição do curso"
                    rows={3}
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
                  onClick={saveCourse}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md transition"
                >
                  {editingCourse ? 'Salvar' : 'Criar Curso'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageCoursesPage;