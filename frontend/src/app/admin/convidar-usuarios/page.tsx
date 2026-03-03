'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const InviteUsersPage = () => {
  const router = useRouter();
  const [emails, setEmails] = useState([
    { id: '1', email: '****@gmail.com', visible: false },
    { id: '2', email: '****@outlook.com', visible: false },
    { id: '3', email: '****@hotmail.com', visible: false },
    { id: '4', email: '****@yahoo.com', visible: false },
  ]);
  const [newEmail, setNewEmail] = useState('');
  const [error, setError] = useState('');

  // Função para alternar visibilidade do email
  const toggleEmailVisibility = (id: string) => {
    setEmails(prev => 
      prev.map(email => 
        email.id === id 
          ? { ...email, visible: !email.visible, email: email.visible ? '****@***.com' : getEmailById(id) } 
          : email
      )
    );
  };

  // Função auxiliar para obter o email real
  const getEmailById = (id: string) => {
    const realEmails = {
      '1': 'joao.silva@gmail.com',
      '2': 'maria.oliveira@outlook.com',
      '3': 'pedro.santos@hotmail.com',
      '4': 'ana.costa@yahoo.com',
    };
    return realEmails[id as keyof typeof realEmails] || '****@***.com';
  };

  // Função para enviar convite
  const handleSendInvite = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newEmail)) {
      setError('Por favor, insira um email válido');
      return;
    }
    
    // Adiciona o novo email à lista
    setEmails(prev => [
      ...prev,
      { id: (prev.length + 1).toString(), email: '****@***.com', visible: false }
    ]);
    
    setNewEmail('');
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-6">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Convidar Usuários</h1>
          <button 
            onClick={() => router.back()}
            className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-md transition"
          >
            Voltar
          </button>
        </div>
        
        <div className="bg-gray-800 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Enviar Convite</h2>
          <form onSubmit={handleSendInvite}>
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                placeholder="Digite o email do usuário"
                className="flex-grow px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-md transition"
              >
                Enviar Convite
              </button>
            </div>
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </form>
        </div>
        
        <div className="bg-gray-800 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">Usuários Convidados</h2>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">ID</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Email</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {emails.map((item) => (
                  <tr key={item.id}>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-300">{item.id}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-300">{item.email}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm">
                      <button
                        onClick={() => toggleEmailVisibility(item.id)}
                        className="text-blue-400 hover:text-blue-300 mr-4"
                        title={item.visible ? "Ocultar email" : "Mostrar email"}
                      >
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          className="h-5 w-5" 
                          viewBox="0 0 20 20" 
                          fill="currentColor"
                        >
                          {item.visible ? (
                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                            ) : (
                            <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                          )}
                        </svg>
                      </button>
                      <button className="text-red-400 hover:text-red-300">
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

export default InviteUsersPage;