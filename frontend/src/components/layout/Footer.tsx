'use client';

import Link from 'next/link';
import Logo from '../brand/Logo';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-16 border-t border-white/5">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Sobre */}
          <div>
            <Link href="/" className="inline-block mb-6">
              <Logo size={48} />
            </Link>
            <p className="text-gray-400 leading-relaxed mb-6">
              Formando obreiros, líderes e discípulos fundamentados na Palavra, 
              preparados para o serviço no Reino de Deus.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://instagram.com/escolapazebem"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-gold-400 hover:border-gold-500/30 transition-all"
                aria-label="Instagram"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>

              <a
                href="https://youtube.com/escolapazebem"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-gold-400 hover:border-gold-500/30 transition-all"
                aria-label="YouTube"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                </svg>
              </a>

              <a
                href="https://wa.me/5511999999999"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-gold-400 hover:border-gold-500/30 transition-all"
                aria-label="WhatsApp"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.297-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.485 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Links Rápidos */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-gold-400">Links Rápidos</h3>
            <ul className="space-y-3">
              <li><Link href="/" className="text-gray-400 hover:text-white transition-colors">🏠 Início</Link></li>
              <li><Link href="/academy" className="text-gray-400 hover:text-white transition-colors">📚 Cursos</Link></li>
              <li><a href="#beneficios" className="text-gray-400 hover:text-white transition-colors">✨ Benefícios</a></li>
              <li><a href="#depoimentos" className="text-gray-400 hover:text-white transition-colors">💬 Depoimentos</a></li>
              <li><a href="#planos" className="text-gray-400 hover:text-white transition-colors">💎 Planos</a></li>
              <li><a href="#faq" className="text-gray-400 hover:text-white transition-colors">❓ FAQ</a></li>
            </ul>
          </div>

          {/* Cursos */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-gold-400">Nossos Cursos</h3>
            <ul className="space-y-3">
              <li><Link href="/academy?category=biblicos" className="text-gray-400 hover:text-white transition-colors">📖 Estudos Bíblicos</Link></li>
              <li><Link href="/academy?category=teologia" className="text-gray-400 hover:text-white transition-colors">✝️ Teologia Sistemática</Link></li>
              <li><Link href="/academy?category=pastoral" className="text-gray-400 hover:text-white transition-colors">⛪ Ministério Pastoral</Link></li>
              <li><Link href="/academy?category=pregacao" className="text-gray-400 hover:text-white transition-colors">🎤 Pregação e Homilética</Link></li>
              <li><Link href="/academy?category=lideranca" className="text-gray-400 hover:text-white transition-colors">👑 Liderança Cristã</Link></li>
              <li><Link href="/academy?category=conselhos" className="text-gray-400 hover:text-white transition-colors">🤝 Aconselhamento Pastoral</Link></li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-gold-400">Fale Conosco</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="text-gold-400 text-xl">📧</span>
                <div>
                  <div className="text-sm text-gray-500">Email</div>
                  <a href="mailto:contato@escolapazebem.com" className="text-gray-400 hover:text-white transition-colors">
                    contato@escolapazebem.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-gold-400 text-xl">📱</span>
                <div>
                  <div className="text-sm text-gray-500">WhatsApp</div>
                  <a href="https://wa.me/5511999999999" className="text-gray-400 hover:text-white transition-colors">
                    (11) 99999-9999
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-gold-400 text-xl">⏰</span>
                <div>
                  <div className="text-sm text-gray-500">Horário de Atendimento</div>
                  <div className="text-gray-400">Seg - Sex: 8h às 18h</div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Stats */}
        <div className="border-t border-white/10 py-8 mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-gold-400 mb-1">2.500+</div>
              <div className="text-sm text-gray-500">Alunos Formados</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gold-400 mb-1">20+</div>
              <div className="text-sm text-gray-500">Anos de Experiência</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gold-400 mb-1">50+</div>
              <div className="text-sm text-gray-500">Cursos Disponíveis</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gold-400 mb-1">100%</div>
              <div className="text-sm text-gray-500">Online</div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left text-gray-500 text-sm">
              <p>&copy; {new Date().getFullYear()} Escola PAZ e BEM. Todos os direitos reservados.</p>
              <p className="mt-1">CNPJ: 00.000.000/0001-00</p>
            </div>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <Link href="/privacy-policy" className="text-gray-400 hover:text-white transition-colors">Política de Privacidade</Link>
              <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">Termos de Uso</Link>
              <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">Contato</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
