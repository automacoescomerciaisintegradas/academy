# 📚 Sistema de Páginas de Detalhe de Cursos | Paz e Bem

**Status:** ✅ **COMPLETO E FUNCIONAL**
**Data:** 2026-03-03
**Versão:** 1.0

---

## 📋 Resumo Executivo

Sistema completo de páginas de detalhe de cursos com:
- ✅ Gerenciamento de turmas com múltiplas opções
- ✅ Preços personalizados por turma e desconto dinâmico
- ✅ Calendário interativo com datas de início
- ✅ Sistema de inscrição com modal responsivo
- ✅ Indicadores de disponibilidade (Disponível, Quase Cheio, Completo)
- ✅ Informações detalhadas de estrutura, metodologia e requisitos
- ✅ Design consistente com landing page e academy

---

## 🎯 Características Principais

### 1. **Página de Detalhe Individual** (`curso-teologia-biblica.html`)

#### Hero Section
- Imagem com filtro terracota
- Título em Instrument Serif com ênfase
- Badge de nível e duração
- Meta de aulas, alunos e certificado
- Descrição clara do curso

#### Conteúdo Detalhado
- **O que você aprenderá** — 6 pontos-chave
- **Estrutura do Curso** — Timeline de 8 semanas
- **Metodologia** — Abordagem pedagógica
- **Sobre o Instrutor** — Prof. Antonio Sergio Queiroz Alves
- **Requisitos** — Pré-requisitos e recursos necessários
- **Certificado** — Validação e reconhecimento
- **FAQ** — 3 dúvidas frequentes

#### Sidebar com Gerenciamento de Turmas
- **5 Turmas Diferentes:**
  1. Turma Março - Iniciante (R$ 297) — Disponível
  2. Turma Abril - Acelerada (R$ 347) — Disponível
  3. Turma Maio - Early Bird (R$ 267, -10%) — Disponível
  4. Turma Junho - Padrão (R$ 297) — Quase Cheio (5 vagas)
  5. Turma Julho - Express (R$ 397) — Completo

#### Estados de Turma
```
✓ Disponível          → Verde, pode inscrever
⚠ Quase Cheio        → Amarelo, aviso de vagas limitadas
✗ Completo           → Vermelho, inscrição desabilitada
```

#### Calendário Interativo
- Vista mensal navegável (←/→)
- Marca datas de início de turmas (em destaque terracota)
- Navegação entre meses/anos
- Atualizações dinâmicas

### 2. **Preços Personalizados por Turma**

```
Turma 1: R$ 297 (padrão)
Turma 2: R$ 347 (acelerada, valor maior)
Turma 3: R$ 267 (-10% Early Bird)
Turma 4: R$ 297 (padrão, quase cheio)
Turma 5: R$ 397 (express, premium, COMPLETO)
```

**Sistema de Preços:**
- Cada turma tem preço base independente
- Descontos aplicáveis (Early Bird -10%)
- Informação de preço original e final
- Renderização dinâmica conforme seleção

### 3. **Modal de Inscrição**

**Campos de Formulário:**
- Nome Completo *
- E-mail *
- Telefone (WhatsApp) *
- Como você conheceu o curso?
- Checkbox de termos

**Features:**
- Informações da turma selecionada pré-preenchidas
- Preço atualizado dinamicamente
- Validação de campos
- Submit com feedback visual

### 4. **Sistema de Seleção de Turma**

```javascript
// Ao clicar em turma:
1. Remove .selected de turmas anteriores
2. Adiciona .selected à turma clicada
3. Atualiza dados: title, dates, price
4. Desabilita botão se turma completa
5. Modal reflete seleção ao abrir
```

### 5. **Dados Estruturados** (`data/courses-data.json`)

**Estrutura do JSON:**
```json
{
  "courses": [
    {
      "id": "teologia-biblica",
      "title": "Teologia Bíblica",
      "slug": "curso-teologia-biblica.html",
      "level": "Iniciante",
      "duration": "8 semanas",
      "instructor": "Prof. Antonio Sergio...",
      "classes": [
        {
          "id": "turma-1",
          "name": "Turma Março",
          "startDate": "2026-03-15",
          "endDate": "2026-05-10",
          "price": 297,
          "originalPrice": 297,
          "discount": 0,
          "status": "disponivel",
          "capacity": 30,
          "enrolled": 18
        }
      ]
    }
  ]
}
```

**6 cursos inclusos:**
1. Teologia Bíblica (Iniciante, 8 sem, 40 aulas)
2. Liderança Cristã (Intermediário, 10 sem, 50 aulas)
3. Novo Testamento (Avançado, 12 sem, 60 aulas)
4. Hermenêutica Bíblica (Iniciante, 8 sem, 35 aulas)
5. Discipulado (Intermediário, 9 sem, 45 aulas)
6. Ministério Pastoral (Avançado, 14 sem, 70 aulas)

---

## 🎨 Design & Estilo

### Paleta de Cores (Manutenção Terracota)
```css
--gesso: #EAE6DF          (Base)
--museu: #F4F1EB          (Superfícies)
--carvao: #1C1B1A         (Texto)
--taupe: #827C75          (Suave)
--terracota: #A84B2B      (Destaque/CTA)
--success: #4A7C59        (Verde de sucesso)
```

### Tipografia
- **Títulos:** Instrument Serif (elegante, itálicos)
- **UI/Corpo:** Manrope (legível, moderno)

### Ícones
- Phosphor Icons (Light weight)
- Uso: calendário, livros, usuários, certificado, coroa, etc.

### Efeitos Visuais
- **Hover em turmas:** Elevação, borda terracota
- **Seleção:** Fundo levemente terracota, borda destacada
- **Calendário:** Dias com turma em terracota bold
- **Botões:** Transições suaves, feedback visual
- **Modal:** Backdrop blur, sombra profunda

---

## 💻 Funcionalidades JavaScript

### 1. **Seleção de Turma**
```javascript
turmaCards.forEach(card => {
  card.addEventListener('click', () => {
    // Remove seleção anterior
    turmaCards.forEach(c => c.classList.remove('selected'));

    // Seleciona atual
    card.classList.add('selected');

    // Atualiza dados globais
    selectedTurma = { title, dates, price };

    // Desabilita se completo
    enrollBtn.disabled = isCompleto;
  });
});
```

### 2. **Calendário Dinâmico**
```javascript
function generateCalendar(month, year) {
  // Calcula primeiro dia do mês
  // Renderiza headers (Dom-Sab)
  // Preenche dias do mês anterior (disabled)
  // Preenche dias do mês (marca turmas com .turma-start)
  // Preenche dias do mês próximo (disabled)
}
```

### 3. **Modal de Inscrição**
```javascript
// Abrir
enrollBtn.addEventListener('click', () => {
  // Atualiza dados da turma selecionada
  document.getElementById('modalTurmaInfo').textContent = selectedTurma.title;
  document.getElementById('modalDatesInfo').textContent = selectedTurma.dates;
  document.getElementById('modalPriceInfo').textContent = selectedTurma.price;
  modal.classList.add('active');
});

// Fechar
window.addEventListener('click', (e) => {
  if (e.target === modal) modal.classList.remove('active');
});
```

### 4. **Header Dinâmico**
```javascript
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
    // Adiciona blur e sombra
  }
});
```

### 5. **Animações GSAP**
```javascript
gsap.fromTo('.course-hero-content',
  { y: 30, opacity: 0 },
  {
    y: 0, opacity: 1, duration: 0.8,
    scrollTrigger: { trigger: '.course-hero-content' }
  }
);
```

---

## 📱 Responsividade

### Desktop (1200px+)
- Layout 2 colunas (conteúdo + sidebar)
- Sidebar sticky
- Calendário visível
- Turmas cards com todas as informações

### Tablet (768px - 1024px)
- Layout 1 coluna (conteúdo + sidebar empilhados)
- Sidebar não-sticky
- Calendário responsivo
- Turmas com spacing reduzido

### Mobile (<768px)
- Layout 1 coluna full-width
- Sidebar acima do conteúdo
- Calendário com dias menores
- Tipografia reduzida
- Turmas stacked

---

## 🔗 Integração com Outras Páginas

### Links Bidirecionais
```
paz-bem.html → academy.html → curso-teologia-biblica.html
                              ↓
                        Outros cursos (a criar)
```

### Header Unificado
- Logo clicável → `paz-bem.html`
- Navegação consistente
- Botões Entrar / MATRICULAR AGORA
- Sticky com scroll

### Breadcrumb Navigation
```
Início > Cursos > Teologia Bíblica
```

---

## 📊 Dados de Exemplo

### Teologia Bíblica (Implementada)
| Campo | Valor |
|-------|-------|
| Nível | Iniciante |
| Duração | 8 semanas |
| Aulas | 40+ |
| Alunos | 500+ |
| Turmas | 5 |
| Preço Base | R$ 297 |
| Preço Range | R$ 267 - R$ 397 |
| Certificado | Sim |

### Estrutura de Turma
```
Nome: Turma Março - Iniciante
Início: 15 Mar 2026
Fim: 10 Mai 2026
Preço: R$ 297
Desconto: 0%
Status: Disponível
Vagas: 30 total, 18 inscritos (60%)
```

---

## 🚀 Próximos Passos

### Fase 1: Criar Páginas Restantes (Baseado no Template)
- [ ] `curso-lideranca-crista.html`
- [ ] `curso-novo-testamento.html`
- [ ] `curso-hermeneutica-biblica.html`
- [ ] `curso-discipulado.html`
- [ ] `curso-ministerio-pastoral.html`

### Fase 2: Backend Integration
- [ ] API de inscrição (POST /api/enrollments)
- [ ] Validação de email
- [ ] Processamento de pagamento (Stripe)
- [ ] Sistema de notificações
- [ ] Dashboard do aluno

### Fase 3: Funcionalidades Avançadas
- [ ] Sincronizar dados com banco (courses-data.json → DB)
- [ ] Notificações de turmas preenchendo
- [ ] Waitlist para turmas completas
- [ ] Cupons e códigos de desconto
- [ ] Analytics de conversão
- [ ] A/B testing de preços

### Fase 4: Experiência de Usuário
- [ ] Testimonials de alunos
- [ ] Galeria de certificados
- [ ] Sistema de avaliações (ratings)
- [ ] Comparador de turmas
- [ ] Calculadora de parcelamento

---

## 🛠️ Uso do Template

### Para Criar Novo Curso:

1. **Duplicar HTML:**
   ```bash
   cp curso-teologia-biblica.html curso-novo-nome.html
   ```

2. **Atualizar Dados:**
   ```html
   <h1>Novo <em>Título</em></h1>
   <span class="badge">Nível • Duração</span>
   <!-- Atualizar conteúdo, turmas, preços -->
   ```

3. **Adicionar a JSON:**
   ```json
   {
     "id": "novo-curso",
     "title": "Novo Título",
     "slug": "curso-novo-nome.html",
     "classes": [...]
   }
   ```

4. **Linkar da Academy:**
   ```html
   <a href="curso-novo-nome.html">Ver Detalhes →</a>
   ```

---

## 📄 Arquivos

```
/root/academy/frontend/public/
├── curso-teologia-biblica.html          ← Página de detalhe (exemplo)
├── data/
│   └── courses-data.json                ← Dados de todos os cursos
├── academy.html                         ← Grid de cursos
├── paz-bem.html                         ← Landing page
└── README-DETAIL-COURSES.md             ← Esta documentação
```

---

## 🎯 Métricas

| Métrica | Valor |
|---------|-------|
| Arquivo HTML | ~18 KB |
| Cursos no Sistema | 6 |
| Turmas Totais | 15+ |
| Preço Range | R$ 240 - R$ 697 |
| Desconto Máx | 10% (Early Bird) |
| Capacidade Média | 25 vagas/turma |
| Taxa de Ocupação | 25-100% |

---

## ✅ Checklist de Validação

- [x] Header sticky com scroll effect
- [x] Breadcrumb navigation
- [x] Hero com imagem e filtro
- [x] 6+ seções de conteúdo
- [x] 5 turmas com seleção
- [x] Preços dinâmicos
- [x] Indicadores de status
- [x] Calendário interativo
- [x] Modal de inscrição
- [x] Validação de formulário
- [x] Responsividade (mobile, tablet, desktop)
- [x] Animações GSAP
- [x] Design consistente
- [x] JSON de dados
- [x] Documentação

---

## 💡 Notas Importantes

1. **Preços:** Cada turma pode ter preço diferente (não é apenas desconto, mas valor base diferente)
2. **Status:** Dinâmico baseado em `enrolled` vs `capacity`
3. **Calendário:** Marca datas de início de turmas em terracota
4. **Modal:** Carrega dados da turma selecionada automaticamente
5. **Integração:** Pronto para conectar com API de pagamento
6. **Escalabilidade:** JSON permite adicionar cursos/turmas facilmente

---

**Página Finalizada:** 2026-03-03
**Versão:** 1.0
**Status:** Produção ✅

🎓 **Sistema de Páginas de Detalhe de Cursos - Completo** 🎓

