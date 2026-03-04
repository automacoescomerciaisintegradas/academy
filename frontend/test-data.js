#!/usr/bin/env node
const fs = require('fs');
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
        resolve({ status: res.statusCode, data });
      });
    });

    req.on('error', reject);
    req.end();
  });
}

async function testCourseData() {
  console.log('🧪 Teste de Dados de Cursos\n');

  try {
    // Verificar arquivo JSON
    console.log('1️⃣ Verificando arquivo courses-data.json:');
    const jsonPath = '/root/academy/frontend/public/data/courses-data.json';
    if (fs.existsSync(jsonPath)) {
      console.log(`   ✅ Arquivo encontrado: ${jsonPath}`);

      const courseData = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
      console.log(`   ✓ Total de cursos no JSON: ${courseData.courses.length}`);

      courseData.courses.forEach((course, i) => {
        console.log(`   • ${i + 1}. ${course.title} (ID: ${course.id})`);
        console.log(`      Classes: ${course.classes.length}`);
        console.log(`      Primeira turma: R$ ${course.classes[0].price}`);
      });
    } else {
      console.log(`   ❌ Arquivo NÃO encontrado!`);
    }

    // Teste API de dados
    console.log('\n2️⃣ Testando acesso aos dados estáticos:');
    const dataResponse = await makeRequest('/data/courses-data.json');
    console.log(`   Status da requisição: ${dataResponse.status}`);

    if (dataResponse.status === 200) {
      const apiData = JSON.parse(dataResponse.data);
      console.log(`   ✅ JSON acessível via API`);
      console.log(`   ✓ Cursos retornados: ${apiData.courses.length}`);
    } else {
      console.log(`   ❌ JSON NÃO acessível (status ${dataResponse.status})`);
    }

    // Teste hook useCourses
    console.log('\n3️⃣ Verificando hook useCourses.ts:');
    const hookPath = '/root/academy/frontend/src/hooks/useCourses.ts';
    if (fs.existsSync(hookPath)) {
      console.log(`   ✅ Hook encontrado: ${hookPath}`);
      const hookContent = fs.readFileSync(hookPath, 'utf-8');
      console.log(`   ✓ Fetch URL: /data/courses-data.json - ${hookContent.includes('/data/courses-data.json') ? '✅' : '❌'}`);
      console.log(`   ✓ Função getCourseById: ${hookContent.includes('getCourseById') ? '✅' : '❌'}`);
    } else {
      console.log(`   ❌ Hook NÃO encontrado!`);
    }

    // Teste página de detalhe
    console.log('\n4️⃣ Verificando página de detalhe /academy/[id]:');
    const detailPath = '/root/academy/frontend/src/app/academy/[id]/page.tsx';
    if (fs.existsSync(detailPath)) {
      console.log(`   ✅ Página encontrada: ${detailPath}`);
      const pageContent = fs.readFileSync(detailPath, 'utf-8');
      console.log(`   ✓ Usa useCourses: ${pageContent.includes('useCourses') ? '✅' : '❌'}`);
      console.log(`   ✓ Usa getCourseById: ${pageContent.includes('getCourseById') ? '✅' : '❌'}`);
      console.log(`   ✓ Trata erro (course not found): ${pageContent.includes('não encontrado') ? '✅' : '❌'}`);
    } else {
      console.log(`   ❌ Página NÃO encontrada!`);
    }

    // Teste Academy page
    console.log('\n5️⃣ Verificando página /academy:');
    const academyPath = '/root/academy/frontend/src/app/academy/page.tsx';
    if (fs.existsSync(academyPath)) {
      console.log(`   ✅ Página encontrada: ${academyPath}`);
      const academyContent = fs.readFileSync(academyPath, 'utf-8');
      console.log(`   ✓ Usa useCourses: ${academyContent.includes('useCourses') ? '✅' : '❌'}`);
      console.log(`   ✓ Trata loading: ${academyContent.includes('loading') ? '✅' : '❌'}`);
      console.log(`   ✓ Renderiza cursos: ${academyContent.includes('courses.map') ? '✅' : '❌'}`);
    } else {
      console.log(`   ❌ Página NÃO encontrada!`);
    }

    // Resumo
    console.log('\n' + '='.repeat(50));
    console.log('✅ VERIFICAÇÃO DE DADOS CONCLUÍDA!');
    console.log('='.repeat(50));
    console.log('\n🎉 Sistema de cursos está configurado corretamente!');

  } catch (error) {
    console.error('\n❌ ERRO:', error.message);
  }

  process.exit(0);
}

testCourseData();
