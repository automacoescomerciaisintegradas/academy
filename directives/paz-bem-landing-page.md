# Paz e Bem | Landing Page Premium

**Versão:** 1.0 | **Data:** 2026-03-03 | **Status:** Produção

---

## Objetivo

Criar uma landing page **pixel-perfect** para o curso online "Paz e Bem" seguindo a arquitetura de 3 camadas:
- **Camada 1 (Diretiva):** Este documento
- **Camada 2 (Orquestração):** Claude Code coordena decisões
- **Camada 3 (Execução):** HTML/CSS/JS em `/root/academy/frontend/public/paz-bem.html`

---

## Especificações de Design

### Paleta de Cores (OBRIGATÓRIA)
```
Base de fundo:     #EAE6DF (Gesso Quente)
Superfície/Cards:  #F4F1EB (Branco Sujo de Museu)
Texto principal:   #1C1B1A (Carvão Escuro)
Texto suave:       #827C75 (Taupe Quente)
Destaque:          #A84B2B (Terracota Suave)
Bordas:            rgba(28, 27, 26, 0.12)
```

### Tipografia
- **Títulos/Headlines:** `Instrument Serif` (via Google Fonts) — elegância, palavras em itálico
- **UI/Corpo:** `Manrope` (via Google Fonts) — legibilidade, precisão
- ❌ Proibido: Inter, Roboto, ou sans-serif genéricas

### Ícones
- **Biblioteca:** Phosphor Icons (CDN `@phosphor-icons/web`)
- **Versões:** Light (padrão) e Fill (hover)
- ❌ Proibido: Lucide React, Font Awesome

### Tratamento de Imagem
**Filtro CSS Global (CRÍTICO):**
```css
filter: grayscale(80%) sepia(15%) hue-rotate(345deg) contrast(1.1) brightness(0.9);
transition: filter 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
```

**Ao Hover:**
```css
filter: grayscale(40%) sepia(25%) hue-rotate(345deg) contrast(1.2) brightness(0.95);
```

---

## Componentes Obrigatórios

### 1. Efeitos Globais de Fundo
- ✅ **Ruído Fractal SVG:** Opacidade 0.35, eventos-pointer nenhum
- ✅ **Imagem Textura Multiplicada:** Unsplash, `mix-blend-mode: multiply`, opacidade 0.12
- ✅ **Grade CSS:** Gradientes lineares, mascara radial desaparece nas bordas
- ✅ **5 Linhas Verticais:** 1px, animadas com ScrollTrigger, escala Y ao rolar
- ✅ **Tipografia Gigante:** "ATELIER", 25vw, centralizada, 2% opacidade, parallax no scroll
- ✅ **Marcadores (+, *):** Posicionados absolutamente, um girando 20s

### 2. Custom Cursor
- ✅ **Ponto:** 12px, terracota `#A84B2B`
- ✅ **Anel:** 40px (60px expanded), borda 1px terracota, transição suave
- ✅ **Rastreamento:** GSAP `quickTo` sem atraso
- ✅ **Hover Interativo:** Expande, blur background, "VISUALIZAR" em texto
- ✅ **Imagens:** Anel cinza-escuro, ponto escondido, revela "VISUALIZAR"

### 3. Layout Assimétrico (12 colunas)

#### Componente A: "Editorial Alto"
- Grid: `span 5 / span 4`
- Altura: `aspect-ratio: 3/5`
- Borda: `border-radius: 200px 2px 2px 2px`
- **Content Box sobreposta:** Canto inferior direito, `#F4F1EB`, bordas 1px, meta + título

#### Componente B: "Bloco Abstrato Escuro"
- Grid: `span 4 / span 3`
- Fundo: `#1C1B1A` (carvão)
- Linhas topográficas: `repeating-radial-gradient`
- **Botão Magnético:** "Descubra", move-se para o cursor (JS math com `clientX/Y`)

#### Componente C: "Sobreposição de Detalhes"
- Grid: `span 3 / span 2`
- Posição: Sobrepõe o Editorial Alto
- Conteúdo: Selo circular SVG com `<textPath>` giratório ("• ARTESANATO SOB MEDIDA •")
- Centro: Ícone Phosphor brilho

#### Componente D: "Lista Interativa"
- Grid: `span 12` (largura total)
- 2 colunas: Título itálico esquerda | 3 itens direita
- **Efeito Hover:** Texto move direita + terracota, ícone gira, imagem flutuante aparece
- **Imagem Flutuante:** Posicionamento absoluto, `gsap.quickTo` acompanha cursor

### 4. Animações GSAP

#### Entrada (Timeline)
```javascript
- Eyebrow: fade + translateY(30px)
- Título: fade + translateY(50px)
- Descrição: fade + translateY(30px)
- CTA: fade + translateY(20px)
```

#### Scroll
- **Fade-up:** Elementos `.fade-up` reveal ao rolar
- **Clip-path:** Imagens reveal `inset(100% 0 0 0)` → `inset(0)`
- **Parallax:** Tipografia bg, linhas verticais, imagens fundo
- **ScrollTrigger:** Integrado em todos

---

## Proibições (CRÍTICAS)

❌ **Cores proibidas:** Roxo, Azul, Verde, Neon
❌ **Designs proibidos:** Grids SaaS, temas tech/hacker, natureza
❌ **Tipografia:** Inter, Roboto
❌ **Ícones:** Lucide, Font Awesome
❌ **Elementos genéricos:** Cards simétricas, layouts corporativos

---

## Responsividade

### Desktop (1200px+)
- Grid 12 colunas completa
- Cursor customizado ativo
- Animações GSAP todas ativas
- Imagem flutuante na lista

### Tablet (768px - 1024px)
- Grid 6 colunas
- Cursor customizado desabilitado
- Imagem flutuante oculta

### Mobile (< 768px)
- Grid 1 coluna
- Backgrounds (ruído, textura, grade) ocultos
- Cursor customizado oculto
- Touch events detectados, sem hover

---

## Checklist de Qualidade

- [x] Paleta terracota aplicada globalmente
- [x] Tipografia Instrument Serif + Manrope
- [x] Ícones Phosphor (Light/Fill)
- [x] Filtro imagem terracota-sepia
- [x] Efeitos background (ruído, grade, linhas, tipografia)
- [x] Custom cursor com GSAP `quickTo`
- [x] Botão magnético com math cursor
- [x] Layout assimétrico 4 componentes
- [x] Lista interativa com hover
- [x] Imagem flutuante no cursor
- [x] Animações entrada GSAP
- [x] ScrollTrigger parallax
- [x] Responsivo 3 breakpoints
- [x] Sem cores proibidas
- [x] Sem design genérico
- [x] Sem ícones proibidos

---

## URLs & Acessos

**Ambiente Local:** http://localhost:3000/paz-bem.html

**Variáveis de Ambiente:** Nenhuma necessária (HTML puro + CDN)

**CDNs Utilizadas:**
- Google Fonts (Instrument Serif, Manrope)
- Phosphor Icons
- Tailwind CSS
- GSAP 3.12.5 + ScrollTrigger + SplitType
- Unsplash (imagens)

---

## Edge Cases & Observações

### 1. Renderização de Imagem Flutuante
Se o usuário mover o mouse muito rápido fora da área da lista, a imagem pode ficar "presa".
**Solução:** Event listeners em `mouseleave` desabilitam a imagem e removem `active` class.

### 2. Performance em Mobile
As animações GSAP são caras em mobile.
**Solução:** Detectar `(hover: none)` media query e desabilitar cursor/animations.

### 3. Rendering de SVG textPath
Alguns navegadores antigos não renderizam `<textPath>` corretamente.
**Fallback:** Texto estático alternativo renderizado normalmente.

### 4. Z-index Stacking
Múltiplos elementos com altos z-index (cursor 9999, nav 50, detail 20).
**Ordem:** cursor > ring > nav > detail > content

---

## Self-Anneal Log

**Versão 1.0 (2026-03-03):**
- ✅ Landing page criada
- ✅ Todos os componentes assimétricos implementados
- ✅ GSAP animations wired
- ✅ Custom cursor com magnética button
- ✅ Responsivo testado
- ✅ Imagens com filtro terracota
- ✅ ScrollTrigger parallax ativo

---

## Próximos Passos (Futuro)

1. Adicionar página de cursos detalhados
2. Integrar formulário de email (newsletter)
3. Analytics com Mixpanel/GA4
4. Otimização de imagens (WebP, lazy loading)
5. A/B testing no CTA "Comece Aula Gratuita"
6. Integração com plataforma de pagamento (Stripe)

---

**Mantido por:** Claude Code
**Última atualização:** 2026-03-03
