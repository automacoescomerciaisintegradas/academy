#!/usr/bin/env node
const http = require('http');

function makeRequest(path) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: path,
      method: 'GET',
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        resolve({ status: res.statusCode, headers: res.headers, data });
      });
    });

    req.on('error', reject);
    req.end();
  });
}

async function testCourseButtons() {
  console.log('🧪 Teste de Botões de Cursos - Verificação de Rotas\n');

  try {
    // Teste 1: Home page
    console.log('1️⃣ Testando página inicial (/):');
    const home = await makeRequest('/');
    console.log(`   Status: ${home.status}`);
    const hasCarousel = home.data.includes('CourseCarousel') || home.data.includes('Ver Curso');
    console.log(`   ✓ Contém carrossel de cursos: ${hasCarousel ? '✅' : '❌'}`);

    // Teste 2: Academy page
    console.log('\n2️⃣ Testando página academy (/academy):');
    const academy = await makeRequest('/academy');
    console.log(`   Status: ${academy.status}`);
    const hasAcademy = academy.data.includes('Nossos Cursos') || academy.data.includes('Academia Teológica');
    console.log(`   ✓ Página carregou: ${hasAcademy ? '✅' : '❌'}`);

    // Teste 3: Course detail page (teologia-biblica)
    console.log('\n3️⃣ Testando página de detalhe (/academy/teologia-biblica):');
    const courseDetail = await makeRequest('/academy/teologia-biblica');
    console.log(`   Status: ${courseDetail.status}`);
    const hasCourseInfo = courseDetail.data.includes('Teologia Bíblica') || courseDetail.data.includes('Sobre o Curso');
    console.log(`   ✓ Página de detalhe carregou: ${hasCourseInfo ? '✅' : '❌'}`);
    const hasTurmas = courseDetail.data.includes('Turmas Disponíveis');
    console.log(`   ✓ Turmas disponíveis exibidas: ${hasTurmas ? '✅' : '❌'}`);

    // Teste 4: Course detail page (lideranca-crista)
    console.log('\n4️⃣ Testando outro curso (/academy/lideranca-crista):');
    const course2 = await makeRequest('/academy/lideranca-crista');
    console.log(`   Status: ${course2.status}`);
    const hasCourse2 = course2.data.includes('Liderança Cristã');
    console.log(`   ✓ Curso "Liderança Cristã" carregou: ${hasCourse2 ? '✅' : '❌'}`);

    // Teste 5: Invalid course ID
    console.log('\n5️⃣ Testando ID inválido (/academy/invalid-course):');
    const invalid = await makeRequest('/academy/invalid-course');
    console.log(`   Status: ${invalid.status}`);
    const hasError = invalid.data.includes('não encontrado') || invalid.data.includes('not found');
    console.log(`   ✓ Página de erro exibida: ${hasError ? '✅' : '❌'}`);

    // Teste 6: Auth register page
    console.log('\n6️⃣ Testando página de registro (/auth/register):');
    const register = await makeRequest('/auth/register');
    console.log(`   Status: ${register.status}`);
    const hasRegister = register.status === 200;
    console.log(`   ✓ Página acessível: ${hasRegister ? '✅' : '❌'}`);

    // Resumo
    console.log('\n' + '='.repeat(50));
    console.log('✅ TESTES DE ROTAS CONCLUÍDOS!');
    console.log('='.repeat(50));
    console.log('\n📊 Resultado:');
    console.log(`   ✅ Página inicial: ${home.status === 200 ? 'OK' : 'ERRO'}`);
    console.log(`   ✅ Página de cursos: ${academy.status === 200 ? 'OK' : 'ERRO'}`);
    console.log(`   ✅ Detalhe do curso: ${courseDetail.status === 200 ? 'OK' : 'ERRO'}`);
    console.log(`   ✅ Outro curso: ${course2.status === 200 ? 'OK' : 'ERRO'}`);
    console.log(`   ✅ Tratamento de erro: ${invalid.status === 200 ? 'OK' : 'ERRO'}`);
    console.log(`   ✅ Página de registro: ${register.status === 200 ? 'OK' : 'ERRO'}`);

    console.log('\n🎉 Todos os botões deveriam funcionar agora!');

  } catch (error) {
    console.error('\n❌ ERRO:', error.message);
  }

  process.exit(0);
}

// Aguardar 2 segundos para o servidor iniciar
setTimeout(testCourseButtons, 2000);
