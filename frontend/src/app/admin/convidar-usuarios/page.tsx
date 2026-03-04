'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Invite {
  id: string;
  email: string;
  course_id: string | null;
  invited_by: string | null;
  invite_token: string;
  status: 'pending' | 'accepted' | 'expired' | 'cancelled';
  expires_at: string;
  created_at: string;
  accepted_at?: string;
}

const InviteUsersPage = () => {
  const router = useRouter();
  const [emails, setEmails] = useState<Invite[]>([]);
  const [newEmail, setNewEmail] = useState('');
  const [courseId, setCourseId] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<'all' | 'pending' | 'accepted'>('all');
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    accepted: 0,
    expired: 0
  });

  // Carrega convites ao montar a página
  useEffect(() => {
    loadInvites();
  }, [filter]);

  const loadInvites = async () => {
    try {
      const params = new URLSearchParams();
      if (filter !== 'all') {
        params.set('status', filter);
      }

      const response = await fetch(`/api/invites?${params.toString()}`);
      const data = await response.json();

      if (response.ok) {
        setEmails(data.invites);
        calculateStats(data.invites);
      }
    } catch (error) {
      console.error('Erro ao carregar convites:', error);
    }
  };

  const calculateStats = (invites: Invite[]) => {
    const total = invites.length;
    const pending = invites.filter(i => i.status === 'pending').length;
    const accepted = invites.filter(i => i.status === 'accepted').length;
    const expired = invites.filter(i => 
      new Date(i.expires_at) < new Date() && i.status !== 'accepted'
    ).length;

    setStats({ total, pending, accepted, expired });
  };

  // Enviar convite
  const handleSendInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newEmail)) {
      setError('Por favor, insira um email válido');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/invites/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: newEmail,
          courseId: courseId || null,
          invitedBy: 'Administrador'
        })
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(data.message || 'Convite enviado com sucesso!');
        setNewEmail('');
        setCourseId('');
        loadInvites();
      } else if (response.status === 409) {
        setError('Este email já está cadastrado na plataforma');
      } else {
        setError(data.error || 'Erro ao enviar convite');
      }
    } catch (error) {
      console.error('Erro ao enviar convite:', error);
      setError('Erro de conexão. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  // Cancelar convite
  const handleCancelInvite = async (inviteId: string) => {
    if (!confirm('Tem certeza que deseja cancelar este convite?')) return;

    try {
      const response = await fetch('/api/invites', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ inviteId })
      });

      if (response.ok) {
        setSuccess('Convite cancelado com sucesso');
        loadInvites();
      } else {
        setError('Erro ao cancelar convite');
      }
    } catch (error) {
      console.error('Erro ao cancelar convite:', error);
      setError('Erro de conexão. Tente novamente.');
    }
  };

  // Copiar link do convite
  const handleCopyLink = (inviteToken: string) => {
    const inviteUrl = `${window.location.origin}/aceitar-convite/${inviteToken}`;
    navigator.clipboard.writeText(inviteUrl);
    setSuccess('Link copiado para a área de transferência!');
    setTimeout(() => setSuccess(''), 3000);
  };

  // Formatar data
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-[#A84B2B]';
      case 'accepted': return 'bg-green-600';
      case 'expired': return 'bg-red-700';
      case 'cancelled': return 'bg-gray-600';
      default: return 'bg-gray-600';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending': return 'Pendente';
      case 'accepted': return 'Aceito';
      case 'expired': return 'Expirado';
      case 'cancelled': return 'Cancelado';
      default: return status;
    }
  };

  return (
    <div className="min-h-screen bg-[#EAE6DF] text-[#1C1B1A] font-sans">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-[url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2070')] opacity-10 mix-blend-multiply pointer-events-none"></div>
      
      {/* Grid Background */}
      <div 
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(90deg, rgba(28, 27, 26, 0.12) 1px, transparent 1px),
            linear-gradient(0deg, rgba(28, 27, 26, 0.12) 1px, transparent 1px)
          `,
          backgroundSize: '20vw 20vh',
          maskImage: 'radial-gradient(circle at center, black 0%, transparent 70%)'
        }}
      ></div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 h-20 bg-[#EAE6DF]/95 backdrop-blur-md border-b border-[rgba(28,27,26,0.12)] z-50">
        <div className="max-w-7xl mx-auto px-8 h-full flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-[#1C1B1A] hover:text-[#A84B2B] transition font-medium"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Voltar
            </button>
          </div>
          
          <div className="font-['Instrument_Serif',serif] text-2xl font-semibold tracking-wider">
            PAZ E VIDA
          </div>
          
          <div className="w-24"></div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-32 pb-20 px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Title */}
          <div className="text-center mb-12">
            <h1 className="font-['Instrument_Serif',serif] text-5xl mb-4 text-[#1C1B1A]">
              Convidar <span className="italic text-[#A84B2B]">Usuários</span>
            </h1>
            <p className="text-lg text-[#827C75] max-w-600 mx-auto leading-relaxed">
              Envie convites por email para novos usuários se juntarem à Escola Paz e Vida
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <div className="bg-[#F4F1EB] rounded-2xl p-6 border border-[rgba(28,27,26,0.12)]">
              <div className="text-sm text-[#827C75] mb-2 uppercase tracking-wider">Total</div>
              <div className="font-['Instrument_Serif',serif] text-4xl text-[#1C1B1A]">{stats.total}</div>
            </div>
            <div className="bg-[#F4F1EB] rounded-2xl p-6 border border-[rgba(28,27,26,0.12)]">
              <div className="text-sm text-[#827C75] mb-2 uppercase tracking-wider">Pendentes</div>
              <div className="font-['Instrument_Serif',serif] text-4xl text-[#A84B2B]">{stats.pending}</div>
            </div>
            <div className="bg-[#F4F1EB] rounded-2xl p-6 border border-[rgba(28,27,26,0.12)]">
              <div className="text-sm text-[#827C75] mb-2 uppercase tracking-wider">Aceitos</div>
              <div className="font-['Instrument_Serif',serif] text-4xl text-green-700">{stats.accepted}</div>
            </div>
            <div className="bg-[#F4F1EB] rounded-2xl p-6 border border-[rgba(28,27,26,0.12)]">
              <div className="text-sm text-[#827C75] mb-2 uppercase tracking-wider">Expirados</div>
              <div className="font-['Instrument_Serif',serif] text-4xl text-red-700">{stats.expired}</div>
            </div>
          </div>

          {/* Form de Envio */}
          <div className="bg-[#F4F1EB] rounded-2xl p-8 mb-8 border border-[rgba(28,27,26,0.12)]">
            <h2 className="font-['Instrument_Serif',serif] text-2xl mb-6 text-[#1C1B1A]">Enviar Novo Convite</h2>
            <form onSubmit={handleSendInvite}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <input
                    type="email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    placeholder="Digite o email do usuário"
                    className="w-full px-5 py-3.5 bg-[#EAE6DF] text-[#1C1B1A] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#A84B2B] border border-[rgba(28,27,26,0.12)] placeholder-[#827C75]"
                    disabled={loading}
                  />
                </div>
                <div className="flex gap-3">
                  <select
                    value={courseId}
                    onChange={(e) => setCourseId(e.target.value)}
                    className="flex-grow px-5 py-3.5 bg-[#EAE6DF] text-[#1C1B1A] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#A84B2B] border border-[rgba(28,27,26,0.12)]"
                    disabled={loading}
                  >
                    <option value="">Todos os cursos</option>
                    <option value="curso-1">Teologia Bíblica</option>
                    <option value="curso-2">Ministério Pastoral</option>
                    <option value="curso-3">Liderança Cristã</option>
                    <option value="curso-4">Bacharel em Teologia</option>
                  </select>
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-[#A84B2B] hover:bg-[#c45a3a] disabled:bg-[#827C75] disabled:cursor-not-allowed px-8 py-3.5 rounded-xl transition text-[#F4F1EB] font-semibold font-['Manrope',sans-serif]"
                  >
                    {loading ? 'Enviando...' : 'Enviar'}
                  </button>
                </div>
              </div>
              
              {error && (
                <div className="mt-4 p-4 bg-red-50 border-l-4 border-red-700 rounded-xl text-red-800 text-sm">
                  {error}
                </div>
              )}
              {success && (
                <div className="mt-4 p-4 bg-green-50 border-l-4 border-green-700 rounded-xl text-green-800 text-sm">
                  {success}
                </div>
              )}
            </form>
          </div>

          {/* Filtros */}
          <div className="flex gap-3 mb-6">
            <button
              onClick={() => setFilter('all')}
              className={`px-6 py-2.5 rounded-full transition font-medium ${
                filter === 'all' 
                  ? 'bg-[#A84B2B] text-[#F4F1EB]' 
                  : 'bg-[#EAE6DF] text-[#1C1B1A] hover:bg-[#A84B2B]/20'
              }`}
            >
              Todos
            </button>
            <button
              onClick={() => setFilter('pending')}
              className={`px-6 py-2.5 rounded-full transition font-medium ${
                filter === 'pending' 
                  ? 'bg-[#A84B2B] text-[#F4F1EB]' 
                  : 'bg-[#EAE6DF] text-[#1C1B1A] hover:bg-[#A84B2B]/20'
              }`}
            >
              Pendentes
            </button>
            <button
              onClick={() => setFilter('accepted')}
              className={`px-6 py-2.5 rounded-full transition font-medium ${
                filter === 'accepted' 
                  ? 'bg-green-700 text-[#F4F1EB]' 
                  : 'bg-[#EAE6DF] text-[#1C1B1A] hover:bg-green-700/20'
              }`}
            >
              Aceitos
            </button>
          </div>

          {/* Lista de Convites */}
          <div className="bg-[#F4F1EB] rounded-2xl border border-[rgba(28,27,26,0.12)] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-[#EAE6DF]">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-[#827C75] uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-[#827C75] uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-[#827C75] uppercase tracking-wider">
                      Curso
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-[#827C75] uppercase tracking-wider">
                      Enviado Em
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-[#827C75] uppercase tracking-wider">
                      Expira Em
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-[#827C75] uppercase tracking-wider">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[rgba(28,27,26,0.12)]">
                  {emails.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-12 text-center text-[#827C75]">
                        Nenhum convite encontrado
                      </td>
                    </tr>
                  ) : (
                    emails.map((invite) => (
                      <tr key={invite.id} className="hover:bg-[#EAE6DF]/50 transition">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-[#1C1B1A]">
                          {invite.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium text-[#F4F1EB] ${getStatusColor(invite.status)}`}>
                            {getStatusLabel(invite.status)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-[#1C1B1A]">
                          {invite.course_id ? 'Curso Específico' : 'Geral'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-[#827C75]">
                          {formatDate(invite.created_at)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-[#827C75]">
                          {formatDate(invite.expires_at)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <div className="flex gap-3">
                            {invite.status === 'pending' && (
                              <>
                                <button
                                  onClick={() => handleCopyLink(invite.invite_token)}
                                  className="text-[#A84B2B] hover:text-[#c45a3a] transition"
                                  title="Copiar link"
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                                    <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                                  </svg>
                                </button>
                                <button
                                  onClick={() => handleCancelInvite(invite.id)}
                                  className="text-red-700 hover:text-red-900 transition"
                                  title="Cancelar convite"
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                  </svg>
                                </button>
                              </>
                            )}
                            {invite.status === 'accepted' && (
                              <span className="text-green-700 text-xs">
                                Aceito em {formatDate(invite.accepted_at!)}
                              </span>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#F4F1EB] border-t border-[rgba(28,27,26,0.12)] py-8 px-8 relative z-10">
        <div className="max-w-6xl mx-auto text-center text-[#827C75] text-sm">
          <p>© 2026 Escola Paz e Vida. Formando obreiros fundamentados na Palavra desde 2017.</p>
        </div>
      </footer>
    </div>
  );
};

export default InviteUsersPage;
