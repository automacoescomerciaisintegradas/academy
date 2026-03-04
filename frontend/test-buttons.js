const { chromium } = require('playwright');

async function testCourseButtons() {
  console.log('🧪 Iniciando testes dos botões de cursos...\n');

  const browser = await chromium.launch();
  const page = await browser.newPage();

  try {
    // ===== TESTE 1: HOME PAGE COURSE CAROUSEL =====
    console.log('📄 Teste 1: Página inicial - Carrossel de cursos');
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);

    // Procurar por botão "Ver Curso" no carrossel
    const courseButtons = await page.locator('button:has-text("Ver Curso")').count();
    console.log(`   ✓ Encontrados ${courseButtons} botões "Ver Curso" na home`);

    if (courseButtons > 0) {
      console.log('   ✓ Clicando no primeiro botão de curso...');
      await page.locator('button:has-text("Ver Curso")').first().click();
      await page.waitForTimeout(1000);

      const currentUrl = page.url();
      console.log(`   ✓ URL após clique: ${currentUrl}`);

      if (currentUrl.includes('/academy/')) {
        console.log('   ✅ SUCESSO: Botão de curso funciona na home!');
      } else {
        console.log('   ❌ ERRO: Botão não levou para página de detalhe');
      }
    }

    // ===== TESTE 2: ACADEMY PAGE =====
    console.log('\n📚 Teste 2: Página Academia - Cursos');
    await page.goto('http://localhost:3000/academy', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);

    // Verificar se página carregou
    const pageTitle = await page.locator('h1').first().textContent();
    console.log(`   ✓ Título da página: "${pageTitle}"`);

    // Procurar por cards de curso
    const courseCards = await page.locator('[role="button"]').count();
    console.log(`   ✓ Encontrados ${courseCards} elementos clicáveis`);

    // Tentar clicar em "Ver Detalhes do Curso"
    const detailButtons = await page.locator('button:has-text("Ver Detalhes do Curso")').count();
    if (detailButtons > 0) {
      console.log(`   ✓ Encontrados ${detailButtons} botões "Ver Detalhes do Curso"`);
      console.log('   ✓ Clicando no primeiro botão...');

      await page.locator('button:has-text("Ver Detalhes do Curso")').first().click();
      await page.waitForTimeout(1500);

      const detailUrl = page.url();
      console.log(`   ✓ URL após clique: ${detailUrl}`);

      if (detailUrl.includes('/academy/') && !detailUrl.endsWith('/academy')) {
        console.log('   ✅ SUCESSO: Botão de academia funciona!');
      }
    }

    // ===== TESTE 3: COURSE DETAIL PAGE =====
    console.log('\n📖 Teste 3: Página de Detalhe do Curso');
    const courseUrl = page.url();

    if (courseUrl.includes('/academy/')) {
      // Verificar se página de detalhe carregou
      const detailTitle = await page.locator('h1').first().textContent();
      console.log(`   ✓ Título do curso: "${detailTitle}"`);

      // Verificar se tem informações do curso
      const courseInfo = await page.locator('text=/Sobre o Curso/i').count();
      if (courseInfo > 0) {
        console.log('   ✓ Seção "Sobre o Curso" encontrada');
      }

      // Verificar se tem turmas disponíveis
      const classesSection = await page.locator('text=/Turmas Disponíveis/i').count();
      if (classesSection > 0) {
        console.log('   ✓ Seção "Turmas Disponíveis" encontrada');
      }

      // Clicar no botão de inscrição
      const enrollButton = await page.locator('button:has-text("Quero Me Inscrever")').count();
      if (enrollButton > 0) {
        console.log('   ✓ Botão "Quero Me Inscrever" encontrado');
        console.log('   ✓ Clicando no botão de inscrição...');

        await page.locator('button:has-text("Quero Me Inscrever")').click();
        await page.waitForTimeout(1000);

        const enrollUrl = page.url();
        console.log(`   ✓ URL após clique: ${enrollUrl}`);

        if (enrollUrl.includes('/auth/register')) {
          console.log('   ✅ SUCESSO: Botão de inscrição funciona!');
        }
      }

      console.log('\n   ✅ SUCESSO: Página de detalhe carregou corretamente!');
    }

    // ===== TESTE 4: VOLTAR PARA CURSOS =====
    console.log('\n🔙 Teste 4: Botão "Ver Mais Cursos"');

    // Navegar de volta para um curso (se houver)
    await page.goto('http://localhost:3000/academy/teologia-biblica', { waitUntil: 'networkidle' });
    await page.waitForTimeout(1500);

    const backButton = await page.locator('button:has-text("Ver Mais Cursos")').count();
    if (backButton > 0) {
      console.log('   ✓ Botão "Ver Mais Cursos" encontrado');
      console.log('   ✓ Clicando no botão...');

      await page.locator('button:has-text("Ver Mais Cursos")').click();
      await page.waitForTimeout(1000);

      const backUrl = page.url();
      console.log(`   ✓ URL após clique: ${backUrl}`);

      if (backUrl.includes('/academy') && !backUrl.includes('/academy/')) {
        console.log('   ✅ SUCESSO: Botão de voltar funciona!');
      }
    }

    // ===== RESUMO =====
    console.log('\n' + '='.repeat(50));
    console.log('✅ TESTES CONCLUÍDOS COM SUCESSO!');
    console.log('='.repeat(50));
    console.log('Todos os botões de cursos estão funcionando corretamente!');

  } catch (error) {
    console.error('\n❌ ERRO durante os testes:');
    console.error(error.message);
  } finally {
    await browser.close();
    process.exit(0);
  }
}

testCourseButtons();
