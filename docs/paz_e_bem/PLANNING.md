# Planejamento do Projeto: Landing Page para Curso Online da Escola PAZ e BEM

## 1. Visão Geral e Objetivos
O objetivo principal é construir uma landing page de altíssima conversão para a Escola PAZ e BEM, focada em transformar visitantes em alunos. Utilizaremos a página da "Academia de Pregadores" como benchmark de estrutura e estratégia de copywriting visual, mas o design e o conteúdo serão originais. O sucesso do projeto será medido pela taxa de conversão de cliques no botão de inscrição.

## 2. Escopo do Projeto

### O que está incluído (In-Scope):
* O desenvolvimento frontend de uma landing page de página única (`single-page`).
* Implementação de todas as seções definidas no PRD (Hero, Prova Social, Conteúdo do Curso, Sobre o Instrutor, Depoimentos, FAQ, Oferta).
* Otimização de performance e responsividade.
* Configuração para integração com ferramentas de analytics.

### O que NÃO está incluído (Out-of-Scope):
* O desenvolvimento do painel do aluno ou qualquer sistema de login (LMS - Learning Management System).
* A criação do conteúdo (textos, vídeos, imagens). O conteúdo será fornecido.
* O backend para processamento de pagamentos (a página irá apenas direcionar para um link de checkout externo, como Hotmart, Eduzz, etc.).
* Criação de campanhas de tráfego pago para a página.

## 3. Arquitetura e Tecnologia (Tech Stack)

* **Framework:** Next.js (ou Astro)
  * **Vantagem:** Oferece renderização otimizada (SSG - Static Site Generation), melhorando a performance e o SEO. Facilita a componentização, tornando o código mais organizado e reutilizável.

* **Estilização:** Tailwind CSS
  * **Vantagem:** Desenvolvimento rápido e consistente, com utilitários prontos para criar um design responsivo sem sair do HTML.

* **Hospedagem:** Vercel ou Netlify
  * **Vantagem:** Integração contínua (CI/CD), performance global e fácil configuração de domínios.

* **Análise e Rastreamento:** Google Tag Manager
  * **Função:** Gerenciar os scripts de rastreamento (Google Analytics, Meta Pixel, etc.) sem modificar o código diretamente.

## 4. Estrutura da Página

A landing page será composta pelas seguintes seções, na ordem:

1. **Header:** Navegação fixa com logo e links para seções principais
2. **Hero:** Seção principal com vídeo promocional, título impactante e botão de CTA
3. **Prova Social:** Logos de instituições parceiras ou reconhecimentos
4. **Conteúdo do Curso:** Detalhamento dos módulos, aulas e benefícios
5. **Sobre o Instrutor:** Apresentação do Prof° Antonio Sergio Queiroz Alves (Bandeira)
6. **Depoimentos:** Exibição de depoimentos de alunos em vídeo e texto
7. **FAQ:** Perguntas frequentes com funcionalidade de acordeão
8. **Oferta:** Seção final com informações sobre preço, bônus e condições especiais
9. **Footer:** Informações de contato, links úteis e direitos autorais

## 5. Riscos e Mitigações

* **Risco:** Performance ruim em dispositivos móveis devido a imagens e vídeos pesados.
  * **Mitigação:** Implementar uma estratégia de otimização de ativos: compressão de imagens, uso de formatos modernos (WebP/AVIF) e `lazy loading` para todos os ativos abaixo da primeira dobra.

* **Risco:** A mensagem (copywriting) não conectar com o público e gerar poucas conversões.
  * **Mitigação:** Embora a criação do copy esteja fora do escopo de desenvolvimento, a estrutura da página será flexível para permitir testes A/B de títulos e CTAs.

* **Risco:** A página não ser exibida corretamente em algum navegador importante.
  * **Mitigação:** Realizar testes cross-browser durante e após o desenvolvimento.

* **Risco:** Dificuldade na integração com a plataforma de checkout externa.
  * **Mitigação:** Planejar previamente a integração, documentando os requisitos necessários e testando o fluxo completo antes da entrega final.

## 6. Entregáveis

1. O código-fonte do projeto em um repositório Git.
2. O link da landing page publicada e funcional.
3. Um guia básico de como atualizar os scripts de rastreamento via Google Tag Manager.
4. Documentação técnica para futuras manutenções e atualizações.

## 7. Cronograma Estimado

* **Fase 1 (Planejamento e Setup):** 2 dias
* **Fase 2 (Desenvolvimento dos Componentes):** 8 dias
* **Fase 3 (Integração e Otimização):** 3 dias
* **Fase 4 (Testes e Ajustes):** 2 dias
* **Fase 5 (Deploy e Entrega Final):** 1 dia

**Total estimado:** 16 dias úteis
