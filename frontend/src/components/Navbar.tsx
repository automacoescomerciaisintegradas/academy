'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import useAuth from '@/hooks/useAuth';
import { supabase } from '@/lib/supabase/client';
import Logo from './brand/Logo';

const Navbar = () => {
  const router = useRouter();
  const { user, isAuthenticated, loading } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      router.push('/');
    } catch (error) {
      console.error('Erro ao sair:', error);
    }
  };

  return (
    <nav className="navbar">
      <div className="container mx-auto px-4 w-full">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex items-center hover:opacity-90 transition-opacity">
            <Logo size={42} />
          </Link>

          {/* Menu Desktop */}
          <div className="hidden lg:flex items-center gap-6">
            <div className="flex items-center gap-6">
              <Link href="/" className="text-gray-300 hover:text-gold-400 font-medium transition-colors">Página Inicial</Link>
              <Link href="/academy" className="text-gray-300 hover:text-gold-400 font-medium transition-colors">Meus Cursos</Link>
              <a href="#beneficios" className="text-gray-300 hover:text-gold-400 font-medium transition-colors">Benefícios</a>
              <a href="#planos" className="text-gray-300 hover:text-gold-400 font-medium transition-colors">Planos</a>
              <a href="#faq" className="text-gray-300 hover:text-gold-400 font-medium transition-colors">FAQ</a>
            </div>

            {isAuthenticated ? (
              <div className="flex items-center gap-4 pl-6 border-l border-white/10">
                <Link href="/dashboard" className="text-gray-300 hover:text-gold-400 font-medium transition-colors">Meu Perfil</Link>
                {user?.email === 'automacoescomerciais@gmail.com' && (
                  <Link href="/admin" className="text-indigo-400 hover:text-indigo-300 font-bold transition-colors">Admin</Link>
                )}
                <button
                  onClick={handleLogout}
                  className="btn-outline btn-sm"
                >
                  Sair
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3 pl-6 border-l border-white/10">
                <Link href="/auth/login" className="text-gray-300 hover:text-gold-400 font-medium transition-colors">Entrar</Link>
                <Link href="/auth/register">
                  <button className="btn-primary btn-sm font-bold">MATRICULAR AGORA</button>
                </Link>
              </div>
            )}
          </div>

          {/* Botão Mobile */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-gold-400 p-2">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Menu Mobile */}
        {isMenuOpen && (
          <div className="md:hidden pb-6 animate-fadeIn">
            <div className="flex flex-col space-y-4 pt-4 border-t border-white/5">
              <Link href="/" className="text-lg py-2 hover:text-gold-400" onClick={toggleMenu}>Home</Link>
              <Link href="/academy" className="text-lg py-2 hover:text-gold-400" onClick={toggleMenu}>Academy</Link>

              {isAuthenticated ? (
                <>
                  <Link href="/dashboard" className="text-lg py-2 hover:text-gold-400" onClick={toggleMenu}>Meus Cursos</Link>
                  {user?.email === 'automacoescomerciais@gmail.com' && (
                    <Link href="/admin" className="text-indigo-400 font-bold py-2" onClick={toggleMenu}>Painel Admin</Link>
                  )}
                  <button
                    onClick={() => { handleLogout(); toggleMenu(); }}
                    className="btn-outline w-full mt-4"
                  >
                    Sair da Conta
                  </button>
                </>
              ) : (
                <div className="flex flex-col gap-3 pt-4">
                  <Link href="/auth/login" className="btn-secondary w-full text-center" onClick={toggleMenu}>Entrar</Link>
                  <Link href="/auth" className="btn-primary w-full text-center" onClick={toggleMenu}>Criar Conta Gratuita</Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;