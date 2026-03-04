# 🎬 Guia de Implementação - Hero Scrubbing Effect

## Visão Geral

Este guia explica como implementar o efeito de **scrubbing de frames** (avançar frames com o scroll) na landing page da Escola PAZ e BEM.

---

## 📁 Componentes Disponíveis

### 1. **HeroSequencer** (`components/hero/HeroSequencer.tsx`)
- **Melhor para:** Vídeos WebM ou animações curtas
- **Performance:** ⭐⭐⭐⭐
- **Facilidade:** ⭐⭐⭐⭐⭐

```tsx
<HeroSequencer
  totalFrames={60}
  videoUrl="https://seu-site.com/hero-animation.webm"
  imageUrl="https://seu-site.com/hero-poster.webp"
  title="Fundamentados na Palavra"
  subtitle="Preparados para o Reino"
  ctaText="Começar Agora"
  onCtaClick={() => router.push('/auth/register')}
/>
```

### 2. **FrameScrubber** (`components/hero/FrameScrubber.tsx`)
- **Melhor para:** Sequências de imagens individuais
- **Performance:** ⭐⭐⭐
- **Facilidade:** ⭐⭐⭐

```tsx
<FrameScrubber
  imageBaseUrl="/frames/hero-frame-"
  totalFrames={120}
  imageFormat="webp"
  numberPadding={3}
  sectionHeight={300}
>
  {/* Conteúdo sobreposto */}
</FrameScrubber>
```

### 3. **SpriteScrubber** (`components/hero/SpriteScrubber.tsx`) ⭐ RECOMENDADO
- **Melhor para:** Performance ótima com sprite sheet
- **Performance:** ⭐⭐⭐⭐⭐
- **Facilidade:** ⭐⭐⭐⭐

```tsx
<SpriteScrubber
  spriteUrl="/hero-sprite.webp"
  framesPerRow={10}
  totalFrames={60}
  sectionHeight={300}
  opacity={0.6}
>
  {/* Conteúdo sobreposto */}
</SpriteScrubber>
```

---

## 🎨 Como Criar os Assets

### Opção 1: Sprite Sheet (Recomendado)

#### Passo 1: Exportar Frames
1. No After Effects/Premiere, exporte sua animação como sequência PNG/WebP
2. Configure para exportar 60-120 frames (depende da duração)
3. Nomeie como: `frame-001.webp`, `frame-002.webp`, etc.

#### Passo 2: Criar Sprite Sheet
Use uma destas ferramentas:

**Online (Grátis):**
- [EZGIF Sprite Maker](https://www.ezgif.com/sprite-maker)
- [Toptal Sprite Generator](https://www.toptal.com/developers/css/sprite-generator/)

**Desktop:**
- **TexturePacker** (https://www.codeandweb.com/texturepacker)
  - Formato: WebP
  - Layout: Horizontal ou Grid
  - Quality: 80-90%

**Configuração Recomendada:**
```
Formato: WebP
Qualidade: 85%
Layout: 10 frames por linha
Padding: 0px
Trim: Não
```

#### Passo 3: Calcular Dimensões
```
Se cada frame é 1920x1080:
- 10 frames por linha = 19200px de largura
- 6 linhas (60 frames) = 6480px de altura
- Sprite final: 19200x6480px
```

#### Passo 4: Otimizar
```bash
# Usando cwebp para compressão
cwebp -q 85 sprite-original.png -o hero-sprite.webp

# Ou usando ffmpeg para extrair frames de vídeo
ffmpeg -i video.mp4 -vf fps=10 frame-%03d.webp
```

---

### Opção 2: Vídeo WebM

#### Passo 1: Exportar Vídeo
```
Formato: WebM (VP9 codec)
Resolução: 1920x1080
Frame Rate: 30fps
Duração: 2-4 segundos
Bitrate: 5-10 Mbps
```

#### Passo 2: Otimizar
```bash
# Usando ffmpeg
ffmpeg -i input.mp4 -c:v libvpx-vp9 -b:v 5M -an hero-animation.webm

# Compressores online:
- https://cloudconvert.com/mp4-to-webm
- https://www.freeconvert.com/webm-compressor
```

---

## 📊 Comparação de Performance

| Método | Tamanho | Requests | RAM | CPU | Recomendação |
|--------|---------|----------|-----|-----|--------------|
| **Sprite Sheet** | ~500KB | 1 | Baixa | Baixa | ⭐⭐⭐⭐⭐ |
| **WebM Video** | ~2MB | 1 | Média | Média | ⭐⭐⭐⭐ |
| **Frames Individuais** | ~10MB | 60-120 | Alta | Alta | ⭐⭐ |

---

## 🔧 Configuração na Landing Page

### 1. Adicione o Import
```tsx
import SpriteScrubber from '@/components/hero/SpriteScrubber';
// ou
import HeroSequencer from '@/components/hero/HeroSequencer';
```

### 2. Substitua o Hero Atual
No arquivo `frontend/src/app/page.tsx`, substitua a seção HERO:

```tsx
{/* ===== HERO COM SPRITE SCRUBBER ===== */}
<SpriteScrubber
  spriteUrl="/hero-sprite.webp"
  framesPerRow={10}
  totalFrames={60}
  sectionHeight={300}
  opacity={0.6}
>
  <div className="relative z-10 h-full flex items-center justify-center px-4">
    <div className="text-center max-w-4xl">
      <div className="inline-block px-4 py-2 bg-gold-600/20 border border-gold-500/30 rounded-full mb-6">
        <span className="text-sm font-semibold text-gold-300">🎓 +2.500 Alunos Formados</span>
      </div>
      <h1 className="text-5xl md:text-7xl font-bold mb-6">
        <span className="block text-white">Bacharel em</span>
        <span className="block bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 bg-clip-text text-transparent">Teologia</span>
      </h1>
      <p className="text-xl text-gray-300 mb-8">
        Capacite-se com solidez bíblica e maturidade espiritual
      </p>
      <PremiumButton
        variant="primary"
        size="lg"
        onClick={() => router.push('/auth/register')}
      >
        🎯 MATRICULAR AGORA
      </PremiumButton>
    </div>
  </div>
</SpriteScrubber>
```

---

## 📁 Onde Colocar os Arquivos

### Estrutura de Pastas
```
frontend/
├── public/
│   ├── hero-sprite.webp          ← Sprite sheet
│   └── frames/
│       ├── hero-frame-001.webp   ← Frames individuais (se usar)
│       ├── hero-frame-002.webp
│       └── ...
└── src/
    └── components/
        └── hero/
            ├── SpriteScrubber.tsx
            ├── FrameScrubber.tsx
            └── HeroSequencer.tsx
```

---

## 🎯 Dicas de Otimização

### 1. Lazy Loading
```tsx
// Carregue o sprite sheet apenas quando necessário
const [spriteLoaded, setSpriteLoaded] = useState(false);

useEffect(() => {
  const img = new Image();
  img.src = '/hero-sprite.webp';
  img.onload = () => setSpriteLoaded(true);
}, []);
```

### 2. Preload no HTML
```html
<!-- Adicione no layout.tsx -->
<link 
  rel="preload" 
  as="image" 
  href="/hero-sprite.webp" 
  type="image/webp"
/>
```

### 3. Responsive Loading
```tsx
// Carregue sprite menor em mobile
const spriteUrl = isMobile 
  ? '/hero-sprite-mobile.webp' 
  : '/hero-sprite.webp';
```

### 4. Fallback
```tsx
// Se WebP não for suportado
<picture>
  <source srcSet="/hero-sprite.webp" type="image/webp" />
  <img src="/hero-sprite.jpg" alt="Hero" />
</picture>
```

---

## 🐛 Troubleshooting

### Problema: Frames não aparecem
**Solução:**
1. Verifique o caminho do arquivo (`spriteUrl` ou `imageBaseUrl`)
2. Confira se os arquivos existem em `/public/`
3. Verifique o console por erros 404

### Problema: Scroll muito rápido/lento
**Solução:**
```tsx
// Ajuste a altura da seção
sectionHeight={400} // Mais alto = scroll mais lento
sectionHeight={200} // Mais baixo = scroll mais rápido
```

### Problema: Performance ruim
**Solução:**
1. Use SpriteScrubber em vez de FrameScrubber
2. Reduza totalFrames para 30-60
3. Otimize o WebP (qualidade 80-85%)
4. Reduza resolução para mobile

---

## 📱 Responsividade

### Breakpoints Recomendados
```tsx
// No componente
<sectionHeight={isMobile ? 200 : 300}>

// Ou use CSS
<div className="h-[200vh] md:h-[300vh]">
```

### Mobile Optimizations
```tsx
// Reduza frames em mobile
totalFrames={isMobile ? 30 : 60}

// Sprite sheet separado para mobile
spriteUrl={isMobile ? '/hero-sprite-mobile.webp' : '/hero-sprite.webp'}
```

---

## 🎓 Exemplo Completo

```tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import SpriteScrubber from '@/components/hero/SpriteScrubber';
import PremiumButton from '@/components/ui/PremiumButton';

const HomePage = () => {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="min-h-screen">
      <SpriteScrubber
        spriteUrl={isMobile ? '/hero-sprite-mobile.webp' : '/hero-sprite.webp'}
        framesPerRow={10}
        totalFrames={60}
        sectionHeight={isMobile ? 200 : 300}
        opacity={0.6}
      >
        <div className="relative z-10 h-full flex items-center justify-center px-4">
          <div className="text-center max-w-4xl">
            <h1 className="text-4xl md:text-7xl font-bold text-white mb-6">
              Bacharel em <span className="text-gold-400">Teologia</span>
            </h1>
            <PremiumButton
              variant="primary"
              size="lg"
              onClick={() => router.push('/auth/register')}
            >
              MATRICULAR AGORA
            </PremiumButton>
          </div>
        </div>
      </SpriteScrubber>
      
      {/* Resto da página... */}
    </div>
  );
};

export default HomePage;
```

---

## 🔗 Recursos Úteis

- **Framer Motion Docs:** https://www.framer.com/motion/
- **WebP Compression:** https://squoosh.app/
- **TexturePacker:** https://www.codeandweb.com/texturepacker
- **EZGIF Sprite Maker:** https://www.ezgif.com/sprite-maker

---

## ✅ Checklist de Implementação

- [ ] Criar/exportar animação (2-4 segundos)
- [ ] Exportar como sequência de frames ou WebM
- [ ] Criar sprite sheet (se usar SpriteScrubber)
- [ ] Otimizar arquivos (compressão WebP)
- [ ] Colocar arquivos em `/public/`
- [ ] Importar componente no `page.tsx`
- [ ] Configurar props (totalFrames, spriteUrl, etc.)
- [ ] Adicionar conteúdo sobreposto
- [ ] Testar em desktop e mobile
- [ ] Otimizar performance se necessário

---

**Dúvidas?** Consulte a documentação do Framer Motion ou entre em contato com a equipe de desenvolvimento.
