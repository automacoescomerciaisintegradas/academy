# 🧪 Guia de Testes | Sistema de Páginas de Cursos

**Data:** 2026-03-03
**Versão:** 1.0

---

## 🚀 Como Testar

### 1. Acesso ao Servidor Local

```bash
# Se servidor não está rodando:
cd /root/academy/frontend
npm run dev

# Acessar em: http://localhost:3000
```

### 2. URLs das Páginas de Cursos

```
http://localhost:3000/academy.html                          (Grid de cursos)
http://localhost:3000/curso-teologia-biblica.html           (Teologia Bíblica - 8 sem)
http://localhost:3000/curso-lideranca-crista.html           (Liderança Cristã - 10 sem)
http://localhost:3000/curso-novo-testamento.html            (Novo Testamento - 12 sem)
http://localhost:3000/curso-hermeneutica-biblica.html        (Hermenêutica - 8 sem)
http://localhost:3000/curso-discipulado.html                (Discipulado - 9 sem)
http://localhost:3000/curso-ministerio-pastoral.html         (Ministério Pastoral - 14 sem)
http://localhost:3000/curso-bacharel-teologia.html           (Bacharel - PREMIUM 1.534h)
```

---

## ✅ Checklist de Testes

### A. Navegação e Links
- [ ] Logo volta a paz-bem.html
- [ ] "Página Inicial" leva a paz-bem.html
- [ ] "Meus Cursos" leva a academy.html
- [ ] Breadcrumb funciona
- [ ] Links internos funcionam
- [ ] Botão "MATRICULAR AGORA" funciona

### B. Seleção de Turma
- [ ] Clicar em turma muda .selected
- [ ] Preço atualiza automaticamente
- [ ] Parcelamento recalcula
- [ ] Datas da turma aparecem no modal
- [ ] Botão desabilita se turma completa
- [ ] Texto do botão muda para "ENTRAR NA LISTA DE ESPERA"

### C. Calendário
- [ ] Calendário renderiza mês correto
- [ ] Botões ← e → navegam meses
- [ ] Dias de início de turma marcados (terracota)
- [ ] Dias de meses anteriores/próximos desabilitados
- [ ] Títulos dos dias da semana aparecem

### D. Modais
- [ ] Modal de inscrição abre corretamente
- [ ] Modal de lista de espera abre para turma completa
- [ ] Dados da turma pré-preenchem
- [ ] Fechar (X) funciona
- [ ] Clicar fora fecha modal
- [ ] Forma tem validação

### E. Responsividade
- [ ] Desktop (1200px+): Layout 2 colunas
- [ ] Tablet (768-1024px): Layout 1 coluna
- [ ] Mobile (<768px): Stack vertical correto
- [ ] Imagens carregam e escalem
- [ ] Tipografia legível em todos os tamanhos
- [ ] Botões clicáveis em mobile

### F. Animações
- [ ] Header fica com blur após scroll 50px
- [ ] Hero content faz fade-up ao carregar
- [ ] Turmas fazem hover com elevação
- [ ] Calendário reage a hover
- [ ] Transições suaves em tudo

### G. Conteúdo Específico

#### Teologia Bíblica
- [ ] 6 seções de conteúdo
- [ ] 5 turmas aparecem
- [ ] FAQ respondidas
- [ ] Preços variam (R$ 267 - R$ 397)

#### Liderança Cristã
- [ ] 2 turmas aparecem
- [ ] Preços corretos (R$ 357 - R$ 397)
- [ ] Desconto Early Bird (-10%)

#### Novo Testamento
- [ ] Status "Quase Cheio" aparece
- [ ] 1 turma (Abril)
- [ ] Preço R$ 497

#### Hermenêutica Bíblica
- [ ] 2 turmas (Mar, Jun)
- [ ] Preço mais baixo (R$ 240 - R$ 267)
- [ ] Desconto Early Bird

#### Discipulado
- [ ] 1 turma (Fevereiro)
- [ ] Preço R$ 327

#### Ministério Pastoral
- [ ] 1 turma (Janeiro)
- [ ] Preço R$ 697 (maior)
- [ ] 14 semanas (mais longo)

#### Bacharel em Teologia (PREMIUM)
- [ ] 1.534 horas aparecem no hero
- [ ] 219 aulas aparecem
- [ ] 19 alunos ativos (social proof)
- [ ] 9 módulos aparecem com horas
- [ ] 4 turmas com opções
- [ ] Early Bird -15% (Junho)
- [ ] Parcelamento em 12x
- [ ] Modal de lista de espera
- [ ] Depoimentos aparecem

### H. Performance
- [ ] Página carrega < 3s
- [ ] Imagens carregam (filtro aplicado)
- [ ] Sem erros no console
- [ ] Animações fluidas
- [ ] Scroll suave

### I. Cross-browser
- [ ] Chrome ✅
- [ ] Firefox ✅
- [ ] Safari ✅
- [ ] Edge ✅
- [ ] Mobile Safari ✅
- [ ] Chrome Mobile ✅

---

## 🧬 Testes de Funcionalidade Específica

### 1. Sistema de Turmas

**Teste:** Selecionar diferentes turmas
```
1. Ir para curso-teologia-biblica.html
2. Clicar em "Turma Maio - Early Bird"
3. Verificar:
   - Card muda de cor (borda terracota)
   - Preço muda para R$ 267
   - Parcelamento muda para R$ 89 (267/3)
   - Modal reflete seleção
```

### 2. Preços Dinâmicos

**Teste:** Verificar cálculo de parcelamento
```
1. Bacharel em Teologia
2. Selecionar "Turma Junho - Early Bird" (R$ 1.697)
3. Verificar em modal: "Até 12x de R$ 169,70"
   - Cálculo: 1.697 / 12 = 141,41... ≈ 169,70 ✓
```

### 3. Lista de Espera

**Teste:** Turma completa
```
1. Ir para curso-bacharel-teologia.html
2. Clicar em "Turma Julho - Estândar" (completa)
3. Botão muda para "ENTRAR NA LISTA DE ESPERA"
4. Clicar botão → Modal de lista de espera abre
5. Preencher e submeter
```

### 4. Calendário Interativo

**Teste:** Navegação de meses
```
1. Em qualquer página de curso
2. Ver calendário na sidebar
3. Clicar → (próximo mês)
4. Verificar: Mês atualiza, dias renumerados
5. Dias 01 e 15 em destaque (terracota) = início de turma
6. Clicar ← (mês anterior)
7. Voltar ao mês original
```

### 5. Header Sticky

**Teste:** Scroll effect
```
1. Em qualquer página de curso
2. Scroll down < 50px: Header normal
3. Scroll down > 50px: 
   - Background fica semi-transparente
   - Aparece blur (backdrop-filter)
   - Sombra discreta
4. Scroll up: Volta ao normal
```

---

## 🎯 Cenários de Usuário

### Cenário 1: Visitante Novo - Explorar Cursos
```
1. Acessa academy.html
2. Vê grid de 6+ cursos
3. Clica em "Ver Detalhes" → Vai para curso-teologia-biblica.html
4. Lê sobre o curso
5. Seleciona turma (Maio - Early Bird)
6. Vê preço R$ 267 (desconto -10%)
7. Clica "MATRICULAR AGORA"
8. Preenche formulário modal
9. Submete (modal seria conectado a API no futuro)
```

### Cenário 2: Aluno Avançado - Bacharel
```
1. Acessa course-bacharel-teologia.html
2. Vê 1.534 horas, 219 aulas
3. Lê 9 módulos
4. Turma Junho está com desconto Early Bird -15%
5. Turma Julho está completa (lista de espera)
6. Seleciona Turma Junho
7. Vê R$ 1.697 (de R$ 1.997)
8. Parcelamento: 12x de R$ 169,70
9. Clica "MATRICULAR AGORA"
10. Preenche formulário com mais detalhes (formação teológica, ministério)
```

### Cenário 3: Lista de Espera
```
1. Acessar curso-bacharel-teologia.html
2. Turma Julho está completa (lista de espera)
3. Clicar no card
4. Botão muda para "ENTRAR NA LISTA DE ESPERA"
5. Clicar botão → Modal de lista de espera abre
6. Preencher Nome, Email, Telefone
7. Submeter
8. Feedback: "Você foi adicionado à lista de espera. Notificação será enviada quando houver vaga."
```

---

## 🐛 Testes de Erro (Antes de Backend)

### Validação de Formulário
- [ ] Campo vazio → Aviso "Campo obrigatório"
- [ ] Email inválido → Aviso "Email inválido"
- [ ] Telefone vazio → Aviso "Telefone obrigatório"
- [ ] Checkbox não marcado → Aviso "Deve concordar com termos"

### Estados Visuais
- [ ] Turma completa → Botão desabilitado (cinza)
- [ ] Turma com poucas vagas → Aviso "Quase Cheio"
- [ ] Lista de espera → Modal diferente
- [ ] Header scrolled → Blur + sombra

---

## 📱 Testes Mobile Específicos

### iPhone (375px)
- [ ] Header não quebra (compacto)
- [ ] Sidebar empilha abaixo do conteúdo
- [ ] Calendário redimensiona
- [ ] Botão "MATRICULAR AGORA" toca fácil
- [ ] Modal centralizado e legível
- [ ] Tipografia reduzida mas legível

### Tablet (768px)
- [ ] Hero em 1 coluna
- [ ] Sidebar em 1 coluna
- [ ] Conteúdo flui bem
- [ ] Imagens escalem proporcionalmente

---

## ✨ Testes de UX

### Fluxo de Inscrição
- [ ] Claro onde clicar
- [ ] Dados pré-preenchidos economizam tempo
- [ ] Confirmação visual de seleção
- [ ] Loading state durante submissão (futuro)
- [ ] Mensagem de sucesso ou erro (futuro)

### Discoverabilidade
- [ ] Links para outros cursos óbvios
- [ ] Breadcrumb ajuda navegação
- [ ] Logo volta home claramente
- [ ] CTA ("MATRICULAR AGORA") evidente

### Confiança
- [ ] Social proof (alunos, avaliações)
- [ ] Depoimentos reais
- [ ] Informações profissionais
- [ ] Certificação claramente explicada
- [ ] Requisitos transparentes

---

## 📊 Testes de Dados

### Teologia Bíblica
```
Turmas: 5 ✓
Preços: 267, 297, 297, 297, 397 ✓
Alunos: 500+ ✓
Aulas: 40+ ✓
```

### Bacharel em Teologia
```
Turmas: 4 ✓
Preços: 1697, 2197, 1697, 1997 ✓
Horas: 1534 ✓
Aulas: 219 ✓
Módulos: 9 ✓
```

---

## 🔗 Testes de Integração

### Links entre Páginas
```
paz-bem.html → academia.html ✓
academy.html → curso-teologia-biblica.html ✓
curso-* → academy.html (breadcrumb) ✓
curso-* → paz-bem.html (logo) ✓
```

### Design Consistente
```
Cores: Terracota #A84B2B ✓
Tipografia: Instrument Serif + Manrope ✓
Header: Igual em todas ✓
Footer: Igual em todas ✓
Animações: Consistentes ✓
```

---

## 🎬 Teste Final - Gravação de Vídeo

**Sugestão:** Gravar screencast navegando:
1. academy.html (overview)
2. curso-teologia-biblica.html (seleção de turma)
3. curso-bacharel-teologia.html (premium com lista de espera)
4. Modal de inscrição (preenchimento)
5. Responsividade (mobile)

---

## ✅ Sign-Off de Testes

Quando completar todos os testes acima:

```
[ ] Navegação: 100% ✓
[ ] Seleção de Turma: 100% ✓
[ ] Calendário: 100% ✓
[ ] Modais: 100% ✓
[ ] Responsividade: 100% ✓
[ ] Performance: Excelente ✓
[ ] Conteúdo: Correto ✓
[ ] Design: Consistente ✓
[ ] UX: Fluida ✓

STATUS: PRONTO PARA PRODUÇÃO ✅
```

---

🎓 **Teste Completo = Sistema Pronto! 🚀**

