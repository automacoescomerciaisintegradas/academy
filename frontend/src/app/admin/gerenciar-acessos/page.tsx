'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const ManageAccessPage = () => {
  const router = useRouter();
  const [users, setUsers] = useState([
    { id: '1', name: 'João Silva', email: '****@gmail.com', role: 'Aluno', visible: false, status: 'Ativo' },
    { id: '2', name: 'Maria Oliveira', email: '****@outlook.com', role: 'Professor', visible: false, status: 'Ativo' },
    { id: '3', name: 'Pedro Santos', email: '****@hotmail.com', role: 'Administrador', visible: false, status: 'Inativo' },
    { id: '4', name: 'Ana Costa', email: '****@yahoo.com', role: 'Aluno', visible: false, status: 'Ativo' },
  ]);

  // Função para alternar visibilidade do email
  const toggleEmailVisibility = (id: string) => {
    setUsers(prev => 
      prev.map(user => 
        user.id === id 
          ? { ...user, visible: !user.visible, email: user.visible ? '****@***.com' : getUserEmailById(id) } 
          : user
      )
    );
  };

  // Função auxiliar para obter o email real
  const getUserEmailById = (id: string) => {
    const userEmails = {
      '1': 'joao.silva@gmail.com',
      '2': 'maria.oliveira@outlook.com',
      '3': 'pedro.santos@hotmail.com',
      '4': 'ana.costa@yahoo.com',
    };
    return userEmails[id as keyof typeof userEmails] || '****@***.com';
  };

  // Função para alterar status do usuário
  const toggleUserStatus = (id: string) => {
    setUsers(prev =>
      prev.map(user =>
        user.id === id
          ? { ...user, status: user.status === 'Ativo' ? 'Inativo' : 'Ativo' }
          : user
      )
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-6">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Gerenciar Acessos</h1>
          <button 
            onClick={() => router.back()}
            className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-md transition"
          >
            Voltar
          </button>
        </div>
        
        <div className="bg-gray-800 rounded-xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Lista de Usuários</h2>
            <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md transition">
              Adicionar Usuário
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">ID</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Nome</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Email</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Cargo</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {users.map((user) => (
                  <tr key={user.id}>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-300">{user.id}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-300">{user.name}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-300">{user.email}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-300">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        user.role === 'Administrador' ? 'bg-purple-900/50 text-purple-300' :
                        user.role === 'Professor' ? 'bg-blue-900/50 text-blue-300' :
                        'bg-green-900/50 text-green-300'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-300">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        user.status === 'Ativo' ? 'bg-green-900/50 text-green-300' : 'bg-red-900/50 text-red-300'
                      }`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm space-x-2">
                      <button
                        onClick={() => toggleEmailVisibility(user.id)}
                        className="text-blue-400 hover:text-blue-300"
                        title={user.visible ? "Ocultar email" : "Mostrar email"}
                      >
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          className="h-5 w-5" 
                          viewBox="0 0 20 20" 
                          fill="currentColor"
                        >
                          {user.visible ? (
                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                            ) : (
                            <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                          )}
                        </svg>
                      </button>
                      <button
                        onClick={() => toggleUserStatus(user.id)}
                        className="text-yellow-400 hover:text-yellow-300"
                        title={user.status === 'Ativo' ? "Desativar usuário" : "Ativar usuário"}
                      >
                        {user.status === 'Ativo' ? (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                          </svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10 2a5 5 0 00-5 5v2a2 2 0 00-2 2v5a2 2 0 002 2h10a2 2 0 002-2v-5a2 2 0 00-2-2H7V7a3 3 0 015.905-.75 1 1 0 001.937-.5A5.002 5.002 0 0010 2z" />
                          </svg>
                        )}
                      </button>
                      <button className="text-red-400 hover:text-red-300" title="Remover usuário">
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          className="h-5 w-5" 
                          viewBox="0 0 20 20" 
                          fill="currentColor"
                        >
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
      </div>
    </div>
  );
};

export default ManageAccessPage;