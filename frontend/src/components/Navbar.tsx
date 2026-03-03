'use client';

import Link from 'next/link';
import { useState } from 'react';
import useAuth from '@/hooks/useAuth';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-gray-800 text-white p-4 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link href="/" className="text-xl font-bold">
            Escola PAZ e BEM
          </Link>
          
          {/* Menu Desktop */}
          <div className="hidden md:flex space-x-6">
            <Link href="/" className="hover:text-blue-300 transition">Home</Link>
            <Link href="/services" className="hover:text-blue-300 transition">Serviços</Link>
            <Link href="/academy" className="hover:text-blue-300 transition">Academy</Link>
            
            {isAuthenticated ? (
              <>
                <Link href="/dashboard" className="hover:text-blue-300 transition">Painel</Link>
                <Link href="/admin" className="hover:text-blue-300 transition">Admin</Link>
              </>
            ) : (
              <Link href="/auth/login" className="hover:text-blue-300 transition">Entrar</Link>
            )}
          </div>
        </div>

        <div className="hidden md:flex items-center space-x-4">
          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              <span className="text-sm">Olá, {user?.name}</span>
              <button 
                onClick={logout}
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md transition"
              >
                Sair
              </button>
            </div>
          ) : (
            <Link href="/auth/login">
              <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md transition">
                Entrar
              </button>
            </Link>
          )}
        </div>

        {/* Menu Mobile */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
        <div className="md:hidden mt-4">
          <div className="flex flex-col space-y-3">
            <Link href="/" className="block hover:text-blue-300 transition">Home</Link>
            <Link href="/services" className="block hover:text-blue-300 transition">Serviços</Link>
            <Link href="/academy" className="block hover:text-blue-300 transition">Academy</Link>
            
            {isAuthenticated ? (
              <>
                <Link href="/dashboard" className="block hover:text-blue-300 transition">Painel</Link>
                <Link href="/admin" className="block hover:text-blue-300 transition">Admin</Link>
                <div className="flex flex-col space-y-2 pt-2 border-t border-gray-700">
                  <span className="text-sm">Olá, {user?.name}</span>
                  <button 
                    onClick={logout}
                    className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md transition w-full text-left"
                  >
                    Sair
                  </button>
                </div>
              </>
            ) : (
              <Link href="/auth/login" className="block hover:text-blue-300 transition">
                <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md transition w-full">
                  Entrar
                </button>
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;