'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redireciona para a landing page principal
    router.push('/paz-bem.html');
  }, [router]);

  return (
    <div className="min-h-screen bg-[#0a0b0f] flex items-center justify-center">
      <div className="text-white text-xl">Redirecionando...</div>
    </div>
  );
}
