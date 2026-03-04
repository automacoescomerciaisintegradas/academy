'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

const AcceptInvitePage = () => {
  const params = useParams();
  const router = useRouter();
  const inviteToken = params.token as string;
  
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [inviteData, setInviteData] = useState<any>(null);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  useEffect(() => {
    const checkInvite = async () => {
      try {
        const response = await fetch(`/api/invites/accept?token=${inviteToken}`);
        const data = await response.json();

        if (response.ok && data.valid) {
          setInviteData(data);
          setFormData(prev => ({ ...prev, email: data.email }));
        } else {
          setError(data.error || 'Convite inválido ou expirado');
        }
      } catch (error) {
        console.error('Erro ao verificar convite:', error);
        setError('Erro de conexão. Tente novamente.');
      } finally {
        setLoading(false);
      }
    };

    if (inviteToken) {
      checkInvite();
    }
  }, [inviteToken]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.name.trim()) {
      setError('Por favor, informe seu nome');
      return;
    }

    if (formData.password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('As senhas não coincidem');
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch('/api/invites/accept', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          inviteToken,
          userData: {
            name: formData.name,
            password: formData.password
          }
        })
      });

      const data = await response.json();

      if (response.ok) {
        router.push('/login?invite_accepted=true');
      } else {
        setError(data.error || 'Erro ao aceitar convite');
      }
    } catch (error) {
      console.error('Erro ao aceitar convite:', error);
      setError('Erro de conexão. Tente novamente.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#EAE6DF] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#A84B2B] mx-auto mb-4"></div>
          <p className="text-[#1C1B1A] text-lg font-['Manrope',sans-serif]">Verificando convite...</p>
        </div>
      </div>
    );
  }

  if (error && !inviteData) {
    return (
      <div className="min-h-screen bg-[#EAE6DF] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-[#F4F1EB] rounded-2xl p-8 border border-[rgba(28,27,26,0.12)] text-center">
          <div className="text-6xl mb-4">❌</div>
          <h2 className="font-['Instrument_Serif',serif] text-3xl mb-4 text-[#1C1B1A]">Convite Inválido</h2>
          <p className="text-[#827C75] mb-6 leading-relaxed">{error}</p>
          <button
            onClick={() => router.push('/')}
            className="bg-[#A84B2B] hover:bg-[#c45a3a] px-8 py-3 rounded-xl transition text-[#F4F1EB] font-semibold"
          >
            Voltar ao Início
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#EAE6DF] flex items-center justify-center p-4">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-[url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2070')] opacity-10 mix-blend-multiply pointer-events-none"></div>
      
      <div className="max-w-md w-full relative z-10">
        {/* Card de Convite */}
        <div className="bg-[#F4F1EB] rounded-2xl p-8 border border-[rgba(28,27,26,0.12)] mb-6">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="font-['Instrument_Serif',serif] text-3xl mb-2 text-[#1C1B1A]">
              📚 Escola Paz e Vida
            </div>
            <p className="text-[#827C75]">Convite para Curso</p>
          </div>

          {/* Info do Convite */}
          <div className="bg-[#EAE6DF] rounded-xl p-5 mb-6 border-l-4 border-[#A84B2B]">
            <div className="text-sm text-[#827C75] mb-2 uppercase tracking-wider">Convite para:</div>
            <div className="text-[#1C1B1A] font-semibold text-lg mb-3">{inviteData?.email}</div>
            <div className="text-sm text-[#827C75]">
              <span className="font-medium">Expira em:</span> {new Date(inviteData?.expiresAt).toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: 'long',
                year: 'numeric'
              })}
            </div>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-700 rounded-xl text-red-800 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-[#1C1B1A] mb-2">
                  Nome Completo
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-5 py-3.5 bg-[#EAE6DF] text-[#1C1B1A] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#A84B2B] border border-[rgba(28,27,26,0.12)] placeholder-[#827C75]"
                  placeholder="Seu nome"
                  disabled={submitting}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1C1B1A] mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  disabled
                  className="w-full px-5 py-3.5 bg-[#EAE6DF]/50 text-[#827C75] rounded-xl border border-[rgba(28,27,26,0.12)] cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1C1B1A] mb-2">
                  Senha
                </label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                  className="w-full px-5 py-3.5 bg-[#EAE6DF] text-[#1C1B1A] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#A84B2B] border border-[rgba(28,27,26,0.12)] placeholder-[#827C75]"
                  placeholder="Mínimo 6 caracteres"
                  disabled={submitting}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1C1B1A] mb-2">
                  Confirmar Senha
                </label>
                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                  className="w-full px-5 py-3.5 bg-[#EAE6DF] text-[#1C1B1A] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#A84B2B] border border-[rgba(28,27,26,0.12)] placeholder-[#827C75]"
                  placeholder="Repita a senha"
                  disabled={submitting}
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-[#A84B2B] hover:bg-[#c45a3a] disabled:bg-[#827C75] disabled:cursor-not-allowed py-4 rounded-xl transition text-[#F4F1EB] font-semibold"
              >
                {submitting ? 'Criando Conta...' : 'Aceitar Convite e Criar Conta'}
              </button>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="text-center text-[#827C75] text-sm">
          <p className="mb-2">Formando obreiros fundamentados na Palavra desde 2017</p>
          <p>© 2026 Escola Paz e Vida</p>
        </div>
      </div>
    </div>
  );
};

export default AcceptInvitePage;
