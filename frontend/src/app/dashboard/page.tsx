'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useAuth from '@/hooks/useAuth';

interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

const DashboardPage = () => {
  const router = useRouter();
  const { user, loading, isAuthenticated } = useAuth();
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteContent, setNewNoteContent] = useState('');
  const [showForm, setShowForm] = useState(false);

  // Verifica autenticação
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/auth/login');
    }
  }, [loading, isAuthenticated, router]);

  // Simula carregamento de notas do usuário
  useEffect(() => {
    if (isAuthenticated && user) {
      // Em uma aplicação real, isso viria de uma API
      const sampleNotes = [
        {
          id: '1',
          title: 'Minhas Anotações Iniciais',
          content: 'Esta é uma nota de exemplo criada para demonstrar a funcionalidade.',
          createdAt: '2023-01-15T10:30:00Z',
          updatedAt: '2023-01-15T10:30:00Z'
        },
        {
          id: '2',
          title: 'Aprendizados Importantes',
          content: 'Outra nota de exemplo mostrando como o sistema organiza as anotações.',
          createdAt: '2023-01-16T14:22:00Z',
          updatedAt: '2023-01-16T14:22:00Z'
        },
        {
          id: '3',
          title: 'Próximos Passos',
          content: 'Terceira nota de exemplo com mais informações sobre os próximos passos no curso.',
          createdAt: '2023-01-17T09:15:00Z',
          updatedAt: '2023-01-17T09:15:00Z'
        }
      ];
      setNotes(sampleNotes);
    }
  }, [isAuthenticated, user]);

  // Função para adicionar nova nota
  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newNoteTitle.trim()) {
      alert('Por favor, adicione um título para a nota');
      return;
    }
    
    const newNote: Note = {
      id: Date.now().toString(),
      title: newNoteTitle,
      content: newNoteContent,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    setNotes([newNote, ...notes]);
    setNewNoteTitle('');
    setNewNoteContent('');
    setShowForm(false);
  };

  // Função para excluir nota
  const handleDeleteNote = (id: string) => {
    if (confirm('Tem certeza que deseja excluir esta nota?')) {
      setNotes(notes.filter(note => note.id !== id));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-4">
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-3xl font-bold mb-6">Painel do Aluno - {user?.name}</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Coluna esquerda - Informações do usuário */}
          <div className="lg:col-span-1 bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Informações do Perfil</h2>
            <div className="space-y-4">
              <div>
                <p className="text-gray-400">Nome</p>
                <p>{user?.name}</p>
              </div>
              <div>
                <p className="text-gray-400">Email</p>
                <p>{user?.email}</p>
              </div>
              <div>
                <p className="text-gray-400">Provedor de Login</p>
                <p>{user?.provider === 'google' ? 'Google' : 'GitHub'}</p>
              </div>
              <div>
                <p className="text-gray-400">ID do Usuário</p>
                <p>{user?.id}</p>
              </div>
            </div>
          </div>
          
          {/* Coluna central - Lista de notas */}
          <div className="lg:col-span-2">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Suas Anotações</h2>
              <button
                onClick={() => setShowForm(!showForm)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition"
              >
                {showForm ? 'Cancelar' : '+ Nova Nota'}
              </button>
            </div>
            
            {/* Formulário para nova nota */}
            {showForm && (
              <div className="bg-gray-800 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-semibold mb-4">Criar Nova Nota</h3>
                <form onSubmit={handleAddNote}>
                  <div className="mb-4">
                    <input
                      type="text"
                      value={newNoteTitle}
                      onChange={(e) => setNewNoteTitle(e.target.value)}
                      placeholder="Título da nota"
                      className="w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <textarea
                      value={newNoteContent}
                      onChange={(e) => setNewNoteContent(e.target.value)}
                      placeholder="Conteúdo da nota"
                      rows={4}
                      className="w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition"
                  >
                    Salvar Nota
                  </button>
                </form>
              </div>
            )}
            
            {/* Lista de notas */}
            <div className="space-y-4">
              {notes.length === 0 ? (
                <div className="bg-gray-800 rounded-lg p-6 text-center">
                  <p className="text-gray-400">Você ainda não tem nenhuma anotação.</p>
                  <button
                    onClick={() => setShowForm(true)}
                    className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition"
                  >
                    Criar sua primeira nota
                  </button>
                </div>
              ) : (
                notes.map((note) => (
                  <div key={note.id} className="bg-gray-800 rounded-lg p-6 hover:bg-gray-750 transition">
                    <div className="flex justify-between items-start">
                      <h3 className="text-xl font-semibold">{note.title}</h3>
                      <button
                        onClick={() => handleDeleteNote(note.id)}
                        className="text-red-500 hover:text-red-400"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                    <p className="text-gray-300 mt-2 mb-4">{note.content}</p>
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>Criado em: {new Date(note.createdAt).toLocaleDateString()}</span>
                      <span>Atualizado em: {new Date(note.updatedAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;