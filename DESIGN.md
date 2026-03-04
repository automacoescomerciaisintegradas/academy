# 🎨 Documento de Design Visual - Projeto Stitch "Escola PAZ e BEM"

## Análise do Projeto

**Projeto:** Stitch [ensino.academiadepregadores]  
**Tipo:** Plataforma de Educação Online (SaaS)  
**Stack:** Next.js 14 + TypeScript + Tailwind CSS  
**Tema:** Educação Bíblica com Identidade Nordestina  
**Inspiração Visual:** Academia de Pregadores (https://ensino.academiadepregadores.org/)

### Contexto
A plataforma serve como hub de aprendizado para cursos bíblicos especializados, combinando:
- Identidade nordestina autêntica (Lampião cangaceiro)
- Estética premium moderna (dark theme com efeitos espaciais)
- Funcionalidades SaaS profissionais (carroussel de usuários, notificações elite)
- UX focada em credibilidade e transformação espiritual

---

## 1. Identidade Visual Geral

### 1.1 Gradiente de Fundo (Estilo Moltbot Premium)

**Radicional CSS:**
```css
body {
  background: radial-gradient(1200px circle at 10% 10%, #1a0f1f 0%, #05070c 40%, #02030a 100%);
  color: #e5e7eb;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}
```

**Tailwind equivalente (recomendado):**
```html
<div class="min-h-screen bg-gradient-to-br from-[#1a0f1f] via-[#05070c] to-[#02030a] text-gray-200">
```

**Características:**
- Radial gradient partindo do canto superior esquerdo
- Cores dark extremas para contraste máximo
- Profundidade visual através dos stops de cor
- Perfeita para modo noturno e reduz fadiga ocular

### 1.2 Grid de Estrelas / Dots (Efeito Espacial)

**CSS Puro:**
```css
.bg-stars {
  background-image: radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px);
  background-size: 40px 40px;
  pointer-events: none;
}
```

**Aplicação em Tailwind:**
```html
<div class="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.05)_1px,_transparent_1px)] bg-[40px_40px] pointer-events-none"></div>
```

**Variações responsivas:**
```css
/* Mobile: dots mais espaçados */
@media (max-width: 640px) {
  .bg-stars {
    background-size: 50px 50px;
  }
}

/* Desktop: densidade aumentada */
@media (min-width: 1024px) {
  .bg-stars {
    background-size: 40px 40px;
  }
}
```

### 1.3 Efeito Glow nos Títulos

**Variante Básica:**
```css
.glow-title {
  text-shadow: 0 0 30px rgba(91, 124, 255, 0.25);
}
```

**Variante Azul Neon:**
```css
.glow-title-blue {
  text-shadow: 
    0 0 10px rgba(99, 102, 241, 0.5),
    0 0 20px rgba(99, 102, 241, 0.3),
    0 0 40px rgba(99, 102, 241, 0.2);
  color: #fff;
  font-weight: 700;
}
```

**Variante Roxo Místico:**
```css
.glow-title-purple {
  text-shadow: 
    0 0 10px rgba(139, 92, 246, 0.6),
    0 0 20px rgba(99, 102, 241, 0.4),
    0 0 30px rgba(59, 130, 246, 0.2);
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

**Tailwind com animação:**
```html
<h1 class="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 drop-shadow-[0_0_30px_rgba(99,102,241,0.3)]">
  Escola PAZ e BEM
</h1>
```

---

## 2. Liderança e Identidade Acadêmica

### 2.1 Liderança Ministerial

A escola é liderada pelo **Prof° Antonio Sergio Queiroz Alves (Bandeira)**, trazendo:
- **Solidez Bíblica**: Ensino fundamentado exclusivamente nas Escrituras.
- **Maturidade Espiritual**: Formação focada no caráter do obreiro.
- **Excelência Acadêmica**: Rigor teológico e pedagógico.
- **Compromisso Ministerial**: Visão prática para o serviço no Reino.

### 2.2 Elementos Visuais de Autoridade

**Identidade Acadêmica Premium:**
- Uso de iconografia solene (Livros, Bíblias, Simbolismo Teológico).
- Paleta de cores focada em Dourado e Bronze sobre fundo Dark.
- Tipografia serifada em títulos de destaque para evocar a tradição acadêmica.
- Espaçamento generoso para facilitar a leitura de conteúdos densos.

**Em cards de perfil:**
```tsx
<div className="w-20 h-20 rounded-full border-2 border-purple-500 p-1 bg-gradient-to-br from-purple-900/20 to-blue-900/20">
  <LampiaoAvatar />
</div>
```

---

## 3. Carrossel Premium CSS - "Quem Acabou de se Conectar"

### 3.1 Estrutura HTML

```html
<!--
  Carrossel elegante que mostra usuários recentemente conectados
  Substitui widgets genéricos por um componente SaaS premium
-->
<div class="premium-carousel" aria-label="Usuários conectados recentemente">
  <div class="carousel-header">
    <h3 class="carousel-title">
      <span class="status-indicator"></span>
      Conectados Agora
    </h3>
    <span class="user-count">12 online</span>
  </div>

  <div class="carousel-container">
    <div class="carousel-track">
      <!-- Item 1 -->
      <div class="carousel-item">
        <div class="avatar-wrapper">
          <img src="/avatars/user1.jpg" alt="João Silva" class="user-avatar">
          <span class="online-indicator"></span>
        </div>
        <div class="user-meta">
          <span class="username">João Silva</span>
          <span class="activity-time">Agora mesmo</span>
        </div>
      </div>

      <!-- Item 2 -->
      <div class="carousel-item">
        <div class="avatar-wrapper">
          <img src="/avatars/user2.jpg" alt="Maria Santos" class="user-avatar">
          <span class="online-indicator"></span>
        </div>
        <div class="user-meta">
          <span class="username">Maria Santos</span>
          <span class="activity-time">1 min atrás</span>
        </div>
      </div>

      <!-- Item 3+ animado -->
      <div class="carousel-item">
        <div class="avatar-wrapper">
          <img src="/avatars/user3.jpg" alt="Pedro Costa" class="user-avatar">
          <span class="online-indicator"></span>
        </div>
        <div class="user-meta">
          <span class="username">Pedro Costa</span>
          <span class="activity-time">2 min atrás</span>
        </div>
      </div>

      <!-- Mais usuários badge -->
      <div class="carousel-item more-users">
        <div class="more-count">+9</div>
        <span class="more-label">Mais usuários</span>
      </div>
    </div>
  </div>

  <!-- Setas navegação (opcional) -->
  <button class="carousel-nav carousel-nav-prev" aria-label="Anterior">
    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
      <path d="M12.5 3L5 10l7.5 7" stroke="white" fill="none" stroke-width="1.5"/>
    </svg>
  </button>
  <button class="carousel-nav carousel-nav-next" aria-label="Próximo">
    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
      <path d="M7.5 3L15 10l-7.5 7" stroke="white" fill="none" stroke-width="1.5"/>
    </svg>
  </button>
</div>
```

### 3.2 CSS Detalhado do Carrossel

```css
.premium-carousel {
  position: relative;
  background: linear-gradient(135deg, rgba(31, 41, 55, 0.95) 0%, rgba(17, 24, 39, 0.95) 100%);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(139, 92, 246, 0.2);
  border-radius: 20px;
  padding: 20px;
  margin: 24px 0;
  box-shadow: 
    0 20px 55px -10px rgba(0, 0, 0, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.premium-carousel:hover {
  background: linear-gradient(135deg, rgba(31, 41, 55, 1) 0%, rgba(17, 24, 39, 1) 100%);
  border-color: rgba(99, 102, 241, 0.3);
  box-shadow: 
    0 25px 65px -10px rgba(99, 102, 241, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.15);
}

/* Header do Carrossel */
.carousel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.carousel-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  font-weight: 600;
  color: #ffffff;
  margin: 0;
}

.status-indicator {
  width: 8px;
  height: 8px;
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  border-radius: 50%;
  box-shadow: 0 0 10px rgba(16, 185, 129, 0.5);
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.user-count {
  font-size: 12px;
  color: #9ca3af;
  background: rgba(99, 102, 241, 0.1);
  padding: 4px 12px;
  border-radius: 20px;
  font-weight: 500;
}

/* Container do carrossel (scrollável) */
.carousel-container {
  overflow-x: auto;
  overflow-y: hidden;
  scroll-behavior: smooth;
  scrollbar-width: thin;
  scrollbar-color: rgba(99, 102, 241, 0.3) transparent;
  padding-bottom: 6px;
}

.carousel-container::-webkit-scrollbar {
  height: 4px;
}

.carousel-container::-webkit-scrollbar-track {
  background: transparent;
}

.carousel-container::-webkit-scrollbar-thumb {
  background: rgba(99, 102, 241, 0.3);
  border-radius: 2px;
}

.carousel-container::-webkit-scrollbar-thumb:hover {
  background: rgba(99, 102, 241, 0.5);
}

/* Track (container do scroll) */
.carousel-track {
  display: flex;
  gap: 12px;
  white-space: nowrap;
  padding: 4px 0;
}

/* Item individual */
.carousel-item {
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
  gap: 10px;
  padding: 12px 16px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  transition: all 0.3s ease;
  cursor: pointer;
}

.carousel-item:hover {
  background: rgba(99, 102, 241, 0.15);
  border-color: rgba(99, 102, 241, 0.3);
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(99, 102, 241, 0.15);
}

.carousel-item.more-users {
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%);
  border-color: rgba(139, 92, 246, 0.2);
  justify-content: center;
  flex-direction: column;
  padding: 12px 20px;
  min-width: 100px;
}

.carousel-item.more-users:hover {
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(139, 92, 246, 0.2) 100%);
}

/* Avatar wrapper */
.avatar-wrapper {
  position: relative;
  flex-shrink: 0;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.2);
  object-fit: cover;
  transition: all 0.3s ease;
}

.carousel-item:hover .user-avatar {
  border-color: rgba(99, 102, 241, 0.5);
  box-shadow: 0 0 15px rgba(99, 102, 241, 0.2);
}

.online-indicator {
  position: absolute;
  width: 12px;
  height: 12px;
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  border: 2px solid #1f2937;
  border-radius: 50%;
  bottom: 0;
  right: 0;
  box-shadow: 0 0 8px rgba(16, 185, 129, 0.6);
}

/* Informações do usuário */
.user-meta {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 100px;
}

.username {
  font-size: 14px;
  font-weight: 600;
  color: #ffffff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.activity-time {
  font-size: 12px;
  color: #9ca3af;
}

/* Badge "Mais usuários" */
.more-count {
  font-size: 20px;
  font-weight: 700;
  color: #6366f1;
}

.more-label {
  font-size: 11px;
  color: #9ca3af;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Botões navegação */
.carousel-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 36px;
  height: 36px;
  background: rgba(99, 102, 241, 0.15);
  border: 1px solid rgba(99, 102, 241, 0.3);
  border-radius: 50%;
  color: #ffffff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  z-index: 10;
}

.carousel-nav:hover {
  background: rgba(99, 102, 241, 0.3);
  border-color: rgba(99, 102, 241, 0.5);
}

.carousel-nav-prev { left: 12px; }
.carousel-nav-next { right: 12px; }

/* Responsive */
@media (max-width: 768px) {
  .premium-carousel {
    padding: 16px;
  }

  .carousel-nav {
    display: none;
  }

  .carousel-item {
    padding: 10px 12px;
  }
}
```

### 3.3 Componente React (TypeScript)

```tsx
'use client';

import { useRef, useState } from 'react';

interface ConnectedUser {
  id: string;
  name: string;
  avatar: string;
  lastSeen: string;
  isOnline: boolean;
}

interface PremiumCarouselProps {
  users: ConnectedUser[];
  title?: string;
}

export const PremiumCarousel: React.FC<PremiumCarouselProps> = ({ 
  users, 
  title = "Conectados Agora" 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const handleScroll = () => {
    if (containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (containerRef.current) {
      const scrollAmount = 200;
      containerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const onlineCount = users.filter(u => u.isOnline).length;

  return (
    <div className="premium-carousel">
      <div className="carousel-header">
        <h3 className="carousel-title">
          <span className="status-indicator"></span>
          {title}
        </h3>
        <span className="user-count">{onlineCount} online</span>
      </div>

      <div className="carousel-container" ref={containerRef} onScroll={handleScroll}>
        <div className="carousel-track">
          {users.map((user) => (
            <div key={user.id} className="carousel-item">
              <div className="avatar-wrapper">
                <img 
                  src={user.avatar} 
                  alt={user.name} 
                  className="user-avatar"
                />
                {user.isOnline && <span className="online-indicator"></span>}
              </div>
              <div className="user-meta">
                <span className="username">{user.name}</span>
                <span className="activity-time">{user.lastSeen}</span>
              </div>
            </div>
          ))}

          {/* Badge "Mais usuários" se houver mais de 10 */}
          {users.length > 10 && (
            <div className="carousel-item more-users">
              <div className="more-count">+{users.length - 10}</div>
              <span className="more-label">Mais</span>
            </div>
          )}
        </div>
      </div>

      {/* Botões navegação */}
      {canScrollLeft && (
        <button 
          className="carousel-nav carousel-nav-prev"
          onClick={() => scroll('left')}
          aria-label="Anterior"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor">
            <path d="M12.5 3L5 10l7.5 7" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>
      )}

      {canScrollRight && (
        <button 
          className="carousel-nav carousel-nav-next"
          onClick={() => scroll('right')}
          aria-label="Próximo"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor">
            <path d="M7.5 3L15 10l-7.5 7" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>
      )}
    </div>
  );
};
```


---

## 4. Notificações Elite (SaaS Premium)

### 4.1 Substituição do Toastr Genérico

**Antes (Toastr genérico):**
```javascript
// Feia, genérica, sem personalidade
toast.success("Operação bem-sucedida!");
```

**Depois (Elite Notification):**
- Animações suaves (glassmorphism)
- ícones customizados por tipo
- Barra de progresso animada
- Suporte a ações primárias/secundárias
- Temas alinhados à identidade visual

### 4.2 HTML da Notificação Elite

```html
<div class="elite-notification elite-notification-success" role="alert">
  <!-- Header com ícone e fechar -->
  <div class="notification-header">
    <div class="notification-icon">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M10 16.17L5.83 12l-1.42 1.41L10 19 19 10l-1.41-1.41L10 16.17z"/>
      </svg>
    </div>
    <h3 class="notification-title">Sucesso!</h3>
    <button class="notification-close" aria-label="Fechar">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/>
      </svg>
    </button>
  </div>

  <!-- Conteúdo da notificação -->
  <div class="notification-body">
    <p class="notification-message">Seu curso foi publicado com sucesso!</p>
  </div>

  <!-- Actions (opcional) -->
  <div class="notification-actions">
    <button class="notification-action-primary">Ver Curso</button>
  </div>

  <!-- Barra de progresso -->
  <div class="notification-progress"></div>
</div>
```

### 4.3 CSS Completo das Notificações Elite

```css
/* Container para notificações */
.notification-container {
  position: fixed;
  top: 24px;
  right: 24px;
  z-index: 9999;
  pointer-events: none;
}

.notification-container > * {
  pointer-events: auto;
  margin-bottom: 12px;
}

/* Notificação Elite Base */
.elite-notification {
  position: relative;
  min-width: 360px;
  max-width: 420px;
  background: linear-gradient(135deg, rgba(31, 41, 55, 0.95) 0%, rgba(17, 24, 39, 0.95) 100%);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 16px;
  box-shadow: 
    0 25px 50px -12px rgba(0, 0, 0, 0.5),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  
  animation: notificationSlideIn 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  transition: all 0.3s ease;
}

@keyframes notificationSlideIn {
  from {
    transform: translateX(450px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.elite-notification.exit {
  animation: notificationSlideOut 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

@keyframes notificationSlideOut {
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(450px);
    opacity: 0;
  }
}

/* Header da notificação */
.notification-header {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 8px;
}

/* Ícone com fundo colorido */
.notification-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
  font-size: 20px;
}

.elite-notification-success .notification-icon {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  box-shadow: 0 0 20px rgba(16, 185, 129, 0.3);
}

.elite-notification-error .notification-icon {
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
  box-shadow: 0 0 20px rgba(239, 68, 68, 0.3);
}

.elite-notification-warning .notification-icon {
  background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
  box-shadow: 0 0 20px rgba(245, 158, 11, 0.3);
}

.elite-notification-info .notification-icon {
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  box-shadow: 0 0 20px rgba(99, 102, 241, 0.3);
}

.notification-icon svg {
  width: 20px;
  height: 20px;
}

/* Título da notificação */
.notification-title {
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  color: #ffffff;
  flex-grow: 1;
}

/* Botão fechar */
.notification-close {
  background: none;
  border: none;
  color: #9ca3af;
  cursor: pointer;
  padding: 4px;
  border-radius: 6px;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  flex-shrink: 0;
}

.notification-close:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #ffffff;
}

.notification-close svg {
  width: 16px;
  height: 16px;
}

/* Corpo da notificação */
.notification-body {
  margin-bottom: 12px;
}

.notification-message {
  margin: 0;
  font-size: 14px;
  color: #d1d5db;
  line-height: 1.5;
}

/* Actions */
.notification-actions {
  display: flex;
  gap: 8px;
  margin-bottom: 8px;
}

.notification-action-primary,
.notification-action-secondary {
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
}

.notification-action-primary {
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  color: white;
}

.notification-action-primary:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 15px rgba(99, 102, 241, 0.3);
}

.notification-action-secondary {
  background: rgba(255, 255, 255, 0.05);
  color: #d1d5db;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.notification-action-secondary:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #ffffff;
}

/* Barra de progresso */
.notification-progress {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3px;
  background: linear-gradient(to right, #6366f1, #8b5cf6);
  border-radius: 0 0 16px 16px;
  animation: notificationCountdown 5s linear;
}

@keyframes notificationCountdown {
  from { width: 100%; }
  to { width: 0%; }
}

/* Responsive */
@media (max-width: 480px) {
  .notification-container {
    top: 12px;
    right: 12px;
    left: 12px;
  }

  .elite-notification {
    min-width: auto;
    max-width: none;
  }
}
```

### 4.4 Componente React (TypeScript)

```tsx
'use client';

import { useEffect, useState } from 'react';

type NotificationType = 'success' | 'error' | 'warning' | 'info';

interface NotificationAction {
  label: string;
  onClick: () => void;
}

interface EliteNotificationProps {
  type: NotificationType;
  title: string;
  message: string;
  autoClose?: number; // ms (default: 5000)
  action?: NotificationAction;
  onClose: () => void;
}

export const EliteNotification: React.FC<EliteNotificationProps> = ({
  type,
  title,
  message,
  autoClose = 5000,
  action,
  onClose,
}) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(onClose, 300);
    }, autoClose);

    return () => clearTimeout(timer);
  }, [autoClose, onClose]);

  const iconMap = {
    success: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M10 16.17L5.83 12l-1.42 1.41L10 19 19 10l-1.41-1.41L10 16.17z" />
      </svg>
    ),
    error: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
      </svg>
    ),
    warning: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
      </svg>
    ),
    info: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
      </svg>
    ),
  };

  return (
    <div className={`elite-notification elite-notification-${type} ${isExiting ? 'exit' : ''}`} role="alert">
      <div className="notification-header">
        <div className="notification-icon">{iconMap[type]}</div>
        <h3 className="notification-title">{title}</h3>
        <button
          className="notification-close"
          onClick={() => {
            setIsExiting(true);
            setTimeout(onClose, 300);
          }}
          aria-label="Fechar"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
          </svg>
        </button>
      </div>

      <div className="notification-body">
        <p className="notification-message">{message}</p>
      </div>

      {action && (
        <div className="notification-actions">
          <button
            className="notification-action-primary"
            onClick={() => {
              action.onClick();
              setIsExiting(true);
              setTimeout(onClose, 300);
            }}
          >
            {action.label}
          </button>
        </div>
      )}

      <div className="notification-progress"></div>
    </div>
  );
};
```

---

## 5. Sistema de Cores (Paleta Completa)

### 5.1 Cores Primárias (Identidade)

| Cor | Hex | RGB | Uso |
|-----|-----|-----|-----|
| **Gradiente Primário** | `#6366f1` → `#8b5cf6` | Indigo → Violeta | Botões principais, destaques, gradientes |
| **Background Dark** | `#05070c` | 5, 7, 12 | Fundo principal |
| **Background Médio** | `#1a0f1f` | 26, 15, 31 | Cards, containers |
| **Text Primário** | `#e5e7eb` | 229, 231, 235 | Texto principal |
| **Text Secundário** | `#9ca3af` | 156, 163, 175 | Labels, descrições |

### 5.2 Cores Funcionais

| Estado | Cor | Hex | Uso |
|--------|-----|-----|-----|
| ✅ **Sucesso** | Verde | `#10b981` | Confirmações, status online |
| ❌ **Erro** | Vermelho | `#ef4444` | Alertas críticos, validações |
| ⚠️ **Aviso** | Âmbar | `#f59e0b` | Informações importantes, avisos |
| ℹ️ **Info** | Azul | `#3b82f6` | Informações gerais, dicas |

### 5.3 Cores Nordestinas (Acentos)

| Nome | Hex | Uso |
|------|-----|-----|
| Terra Escura | `#8b6f47` | Detalhes, bordas, sombras |
| Terra Clara | `#d4a574` | Acentos, highlights |
| Queimado | `#3e2723` | Profundidade, sombras |
| Dourado | `#d4af37` | Luxo, prêmios, destaque |

---

## 6. Tipografia

### 6.1 Fonte Primária
- **Font Stack:** `Inter, Roboto, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`
- **Peso:** 400 (regular), 500 (médio), 600 (semibold), 700 (bold)
- **Tamanhos Base:**
  - H1: 48px (3rem) - Desktop, 36px Mobile
  - H2: 36px (2.25rem) - Desktop, 28px Mobile
  - H3: 28px (1.75rem)
  - Body: 16px (1rem)
  - Small: 14px (0.875rem)
  - Tiny: 12px (0.75rem)

### 6.2 Escala Tipográfica

```css
:root {
  /* Títulos com glow */
  --heading-1: 3rem;
  --heading-2: 2.25rem;
  --heading-3: 1.875rem;
  --heading-4: 1.5rem;
  
  /* Body */
  --text-lg: 1.125rem;
  --text-base: 1rem;
  --text-sm: 0.875rem;
  --text-xs: 0.75rem;
  
  /* Line heights */
  --line-tight: 1.25;
  --line-normal: 1.5;
  --line-relaxed: 1.75;
  
  /* Letter spacing */
  --tracking-tight: -0.02em;
  --tracking-normal: 0;
  --tracking-wide: 0.02em;
}
```

---

## 7. Componentes Interativos

### 7.1 Botões Premium

**4 variações:**

```tsx
// Primary (Principal)
<button className="btn btn-primary">
  Entrar na Plataforma
</button>

// Secondary (Secundário)
<button className="btn btn-secondary">
  Ver Cursos
</button>

// Tertiary (Terciário)
<button className="btn btn-tertiary">
  Saiba Mais
</button>

// Outline (Contorno)
<button className="btn btn-outline">
  Cancelar
</button>
```

**CSS:**
```css
.btn {
  padding: 12px 24px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  position: relative;
  overflow: hidden;
  white-space: nowrap;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.btn-primary {
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  color: white;
  box-shadow: 0 4px 15px rgba(99, 102, 241, 0.3);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 25px rgba(99, 102, 241, 0.4);
}

.btn-primary:active {
  transform: translateY(0);
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.15);
  border-color: rgba(255, 255, 255, 0.3);
}

.btn-tertiary {
  background: transparent;
  color: #6366f1;
  text-decoration: underline;
}

.btn-tertiary:hover {
  color: #8b5cf6;
}

.btn-outline {
  background: transparent;
  border: 2px solid #6366f1;
  color: #6366f1;
}

.btn-outline:hover {
  background: rgba(99, 102, 241, 0.1);
  border-color: #8b5cf6;
  color: #8b5cf6;
}

/* Tamanhos */
.btn-sm {
  padding: 8px 16px;
  font-size: 14px;
}

.btn-lg {
  padding: 16px 32px;
  font-size: 18px;
}

/* Estado desabilitado */
.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none !important;
}
```

### 7.2 Cards Premium

```css
.card {
  background: linear-gradient(135deg, rgba(31, 41, 55, 0.8) 0%, rgba(17, 24, 39, 0.8) 100%);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 24px;
  transition: all 0.3s ease;
  box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.3);
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.4);
  border-color: rgba(99, 102, 241, 0.3);
}

.card-header {
  margin-bottom: 16px;
}

.card-title {
  font-size: 20px;
  font-weight: 700;
  margin: 0 0 8px 0;
  color: white;
}

.card-description {
  color: #9ca3af;
  font-size: 14px;
  margin: 0;
}

.card-body {
  margin-bottom: 16px;
}

.card-footer {
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  padding-top: 16px;
  display: flex;
  gap: 12px;
}
```

### 7.3 Inputs & Forms

```css
.input {
  width: 100%;
  padding: 12px 16px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  color: #e5e7eb;
  font-size: 16px;
  transition: all 0.3s ease;
  font-family: inherit;
}

.input:focus {
  outline: none;
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(99, 102, 241, 0.5);
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}

.input::placeholder {
  color: #6b7280;
}

.input:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background: rgba(255, 255, 255, 0.02);
}

/* Textarea */
.textarea {
  resize: vertical;
  min-height: 120px;
}

/* Select */
.select {
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%239ca3af' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 20px;
  padding-right: 40px;
}

/* Checkbox & Radio */
.checkbox,
.radio {
  width: 20px;
  height: 20px;
  accent-color: #6366f1;
  cursor: pointer;
}
```

---

## 8. Espaçamento e Layout

### 8.1 Sistema de Grid (8px)

```css
:root {
  --space-0: 0px;
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;
  --space-10: 40px;
  --space-12: 48px;
  --space-16: 64px;
  --space-20: 80px;
}
```

### 8.2 Breakpoints Responsivos

```css
/* Mobile First */
/* sm: 640px */
/* md: 768px */
/* lg: 1024px */
/* xl: 1280px */
/* 2xl: 1536px */
```

---

## 9. Efeitos e Animações

### 9.1 Transições Padrão

```css
:root {
  --transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-normal: 300ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-slow: 500ms cubic-bezier(0.4, 0, 0.2, 1);
}
```

### 9.2 Sombras Estratégicas

```css
/* Sombra elevada (cards hover) */
.shadow-lg {
  box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.4);
}

/* Sombra interna (efeito profundidade) */
.shadow-inner {
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.3);
}

/* Sombra de glow neon */
.shadow-glow-indigo {
  box-shadow: 0 0 30px rgba(99, 102, 241, 0.3);
}

.shadow-glow-purple {
  box-shadow: 0 0 30px rgba(139, 92, 246, 0.3);
}
```

---

## 10. Guia de Implementação

### 10.1 Setup Inicial

1. **Instale Tailwind CSS:**
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

2. **Configure `tailwind.config.ts`:**
```typescript
import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#6366f1",
        secondary: "#8b5cf6",
        dark: {
          950: "#02030a",
          900: "#05070c",
          800: "#1a0f1f",
        },
      },
      backgroundImage: {
        gradient: "radial-gradient(1200px circle at 10% 10%, #1a0f1f 0%, #05070c 40%, #02030a 100%)",
        stars: "radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)",
      },
      backdropBlur: {
        premium: "20px",
      },
    },
  },
  plugins: [],
}

export default config
```

### 10.2 Aplicar Gradiente Global

**Em `globals.css`:**
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

html {
  scroll-behavior: smooth;
}

body {
  @apply bg-gradient text-gray-200 antialiased;
  background: radial-gradient(1200px circle at 10% 10%, #1a0f1f 0%, #05070c 40%, #02030a 100%);
  color: #e5e7eb;
}

/* Grid de estrelas */
body::before {
  content: "";
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px);
  background-size: 40px 40px;
  pointer-events: none;
  z-index: 0;
}

main {
  position: relative;
  z-index: 1;
}
```

### 10.3 Importar Componentes

```tsx
// layout.tsx
import { EliteNotification } from '@/components/notifications/EliteNotification';
import { PremiumCarousel } from '@/components/carousel/PremiumCarousel';
import LampiaoAvatar from '@/components/avatars/LampiaoAvatar';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        {children}
        {/* Container para notificações (colocar no topo da DOM) */}
        <div id="notification-container" className="notification-container"></div>
      </body>
    </html>
  );
}
```

---

## 11. Checklist de Implementação

- [ ] Gradiente de fundo aplicado em `globals.css`
- [ ] Grid de estrelas/dots implementado
- [ ] Avatar Lampião SVG criado e estilizado
- [ ] Carrossel Premium CSS e componente React integrados
- [ ] Sistema de notificações Elite funcional
- [ ] Paleta de cores documentada em `tailwind.config.ts`
- [ ] Tipografia e scale configurada
- [ ] Componentes de botões e cards estilizados
- [ ] Responsividade testada (mobile, tablet, desktop)
- [ ] Acessibilidade verificada (ARIA labels, contraste)
- [ ] Performance otimizada (lazy loading, code splitting)

---

## 12. Referências e Inspiração

- **Projeto Base:** https://ensino.academiadepregadores.org/
- **Stitch by Google:** https://stitch.withgoogle.com/
- **Design System:** Tailwind CSS 3.x + Custom Utilities
- **Ícones:** SVG customizados (sem iconify, para reduzir bundle)
- **Animações:** CSS puras (performance)

---

## 13. Notas Finais

Este documento de design estabelece a **identidade visual premium e autêntica** da Escola PAZ e BEM. Cada elemento foi pensado para:

✅ **Credibilidade:** Dark theme profissional mostra expertise  
✅ **Autenticidade:** Identidade nordestina (Lampião) diferencia  
✅ **Premium:** Glassmorphism, glows, e animações elegantes  
✅ **Performance:** CSS puro, sem libs pesadas  
✅ **Acessibilidade:** Contraste adequado, navegação clara  
✅ **SaaS Modern:** Componentes que parecem plataformas B2B elite