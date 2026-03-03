#!/usr/bin/env node

/**
 * Paz e Bem Landing Page Optimizer
 * Versão 1.0 | 2026-03-03
 *
 * Execução: node execution/paz-bem-optimizer.js [command] [options]
 *
 * Comandos disponíveis:
 * - validate      : Validar HTML/CSS/JS para qualidade
 * - optimize      : Otimizar imagens e assets
 * - lighthouse    : Rodar Lighthouse audit
 * - generate-sitemap : Gerar sitemap.xml
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const PATHS = {
    htmlFile: path.join(__dirname, '../frontend/public/paz-bem.html'),
    directive: path.join(__dirname, '../directives/paz-bem-landing-page.md'),
    logsDir: path.join(__dirname, '../.tmp/paz-bem-logs')
};

// Garantir que o diretório de logs existe
if (!fs.existsSync(PATHS.logsDir)) {
    fs.mkdirSync(PATHS.logsDir, { recursive: true });
}

console.log('🎨 Paz e Bem Landing Page Optimizer v1.0\n');

// === VALIDADORES ===

function validateHTML() {
    console.log('📋 Validando HTML...');

    const html = fs.readFileSync(PATHS.htmlFile, 'utf-8');

    const checks = {
        htmlValid: html.includes('<!DOCTYPE html>'),
        headValid: html.includes('<head>'),
        googleFonts: html.includes('Instrument Serif') && html.includes('Manrope'),
        phosphorIcons: html.includes('@phosphor-icons/web'),
        gsap: html.includes('gsap.min.js'),
        scrollTrigger: html.includes('ScrollTrigger'),
        cssCustom: html.includes('<style>') || html.includes('tailwindcss'),
        colorPalette: html.includes('#EAE6DF') && html.includes('#A84B2B'),
        colorsCorrected: !html.includes('#00FF00') && !html.includes('#0000FF') && !html.includes('#FF00FF'),
        cursorImplemented: html.includes('custom-cursor'),
        gridLayout: html.includes('grid-template-columns') || html.includes('grid:'),
        responsiveMeta: html.includes('viewport'),
        darkMode: html.includes('--carvao'),
        animationsPresent: html.includes('@keyframes'),
    };

    const passed = Object.values(checks).filter(v => v).length;
    const total = Object.keys(checks).length;

    console.log('\n✅ Checks de validação:');
    Object.entries(checks).forEach(([check, result]) => {
        const icon = result ? '✓' : '✗';
        console.log(`  ${icon} ${check}: ${result ? 'OK' : 'FALHOU'}`);
    });

    console.log(`\n📊 Score: ${passed}/${total} (${Math.round(passed/total * 100)}%)\n`);

    return passed === total;
}

function validateColors() {
    console.log('🎨 Validando paleta de cores...');

    const html = fs.readFileSync(PATHS.htmlFile, 'utf-8');

    const forbiddenColors = [
        { hex: '#FF00FF', name: 'Magenta (roxo)' },
        { hex: '#00FF00', name: 'Verde' },
        { hex: '#0000FF', name: 'Azul' },
        { hex: '#7B61FF', name: 'Plasma (neon roxo)' },
        { hex: '#FF007F', name: 'Neon rosa' },
    ];

    const foundForbidden = forbiddenColors.filter(color =>
        html.includes(color.hex) || html.includes(color.hex.toLowerCase())
    );

    if (foundForbidden.length > 0) {
        console.log(`\n⚠️  Cores proibidas encontradas:`);
        foundForbidden.forEach(color => {
            console.log(`  - ${color.name} (${color.hex})`);
        });
        return false;
    }

    console.log('✅ Nenhuma cor proibida encontrada\n');
    return true;
}

function validateTypography() {
    console.log('🔤 Validando tipografia...');

    const html = fs.readFileSync(PATHS.htmlFile, 'utf-8');

    // Remove comentários para validação mais precisa
    const htmlNoComments = html.replace(/<!--[\s\S]*?-->/g, '');

    const checks = {
        hasInstrumentSerif: htmlNoComments.includes('Instrument Serif'),
        hasManrope: htmlNoComments.includes('Manrope'),
        noRoboto: !htmlNoComments.includes('Roboto'),
        noInter: !htmlNoComments.includes("font-family: 'Inter'") && !htmlNoComments.includes('"Inter"'),
        noOpenSans: !htmlNoComments.includes('Open Sans'),
    };

    console.log('\n✅ Verificações tipográficas:');
    Object.entries(checks).forEach(([check, result]) => {
        const icon = result ? '✓' : '✗';
        console.log(`  ${icon} ${check}: ${result ? 'OK' : 'FALHOU'}`);
    });

    const passed = Object.values(checks).filter(v => v).length === Object.keys(checks).length;
    console.log(passed ? '\n✅ Tipografia válida\n' : '\n⚠️  Problemas de tipografia\n');

    return passed;
}

function validateIcons() {
    console.log('🎯 Validando ícones...');

    const html = fs.readFileSync(PATHS.htmlFile, 'utf-8');

    const checks = {
        hasPhosphor: html.includes('phosphor-icons'),
        noLucide: !html.includes('lucide-react'),
        noFontAwesome: !html.includes('font-awesome'),
    };

    console.log('\n✅ Verificações de ícones:');
    Object.entries(checks).forEach(([check, result]) => {
        const icon = result ? '✓' : '✗';
        console.log(`  ${icon} ${check}: ${result ? 'OK' : 'FALHOU'}`);
    });

    const passed = Object.values(checks).filter(v => v).length === Object.keys(checks).length;
    console.log(passed ? '\n✅ Ícones corretos\n' : '\n⚠️  Problemas com ícones\n');

    return passed;
}

function validateAnimations() {
    console.log('🎬 Validando animações GSAP...');

    const html = fs.readFileSync(PATHS.htmlFile, 'utf-8');

    const checks = {
        gsapMain: html.includes('gsap.min.js'),
        scrollTrigger: html.includes('ScrollTrigger'),
        splitType: html.includes('SplitType'),
        gsapRegistered: html.includes('gsap.registerPlugin'),
        customCursor: html.includes('gsap.to(cursor'),
        scrollAnimations: html.includes('scrollTrigger:'),
        keyframes: html.includes('@keyframes'),
    };

    console.log('\n✅ Verificações de animação:');
    Object.entries(checks).forEach(([check, result]) => {
        const icon = result ? '✓' : '✗';
        console.log(`  ${icon} ${check}: ${result ? 'OK' : 'FALHOU'}`);
    });

    const passed = Object.values(checks).filter(v => v).length === Object.keys(checks).length;
    console.log(passed ? '\n✅ Animações implementadas\n' : '\n⚠️  Problemas com animações\n');

    return passed;
}

function validateResponsive() {
    console.log('📱 Validando responsividade...');

    const html = fs.readFileSync(PATHS.htmlFile, 'utf-8');

    const checks = {
        viewportMeta: html.includes('viewport'),
        mediaQueryDesktop: html.includes('max-width: 1024px'),
        mediaQueryTablet: html.includes('max-width: 768px'),
        flexLayout: html.includes('flex'),
        gridLayout: html.includes('grid-template-columns'),
        touchDetection: html.includes('hover: none'),
    };

    console.log('\n✅ Verificações de responsividade:');
    Object.entries(checks).forEach(([check, result]) => {
        const icon = result ? '✓' : '✗';
        console.log(`  ${icon} ${check}: ${result ? 'OK' : 'FALHOU'}`);
    });

    const passed = Object.values(checks).filter(v => v).length === Object.keys(checks).length;
    console.log(passed ? '\n✅ Responsividade OK\n' : '\n⚠️  Problemas de responsividade\n');

    return passed;
}

// === MAIN ===

function main() {
    const command = process.argv[2] || 'validate';

    switch (command) {
        case 'validate':
            console.log('🔍 Executando validação completa...\n');
            const htmlValid = validateHTML();
            const colorsValid = validateColors();
            const typoValid = validateTypography();
            const iconsValid = validateIcons();
            const animValid = validateAnimations();
            const respValid = validateResponsive();

            const allValid = htmlValid && colorsValid && typoValid && iconsValid && animValid && respValid;

            if (allValid) {
                console.log('🎉 ===== TUDO PASSOU! ===== 🎉\n');
            } else {
                console.log('⚠️  ===== ALGUNS PROBLEMAS ENCONTRADOS ===== ⚠️\n');
            }

            // Log para arquivo
            const logContent = `
[${new Date().toISOString()}]
Validação Completa - Paz e Bem Landing Page

HTML: ${htmlValid ? 'PASSOU' : 'FALHOU'}
Cores: ${colorsValid ? 'PASSOU' : 'FALHOU'}
Tipografia: ${typoValid ? 'PASSOU' : 'FALHOU'}
Ícones: ${iconsValid ? 'PASSOU' : 'FALHOU'}
Animações: ${animValid ? 'PASSOU' : 'FALHOU'}
Responsividade: ${respValid ? 'PASSOU' : 'FALHOU'}

Status Geral: ${allValid ? 'VÁLIDO ✅' : 'INVÁLIDO ⚠️'}
`;

            fs.appendFileSync(
                path.join(PATHS.logsDir, 'validation.log'),
                logContent + '\n'
            );

            process.exit(allValid ? 0 : 1);
            break;

        case 'optimize':
            console.log('⚡ Otimizando assets...');
            console.log('(Feature não implementada ainda)\n');
            break;

        case 'lighthouse':
            console.log('🔦 Rodando Lighthouse...');
            console.log('(Instale: npm install -g @lhci/cli@*)\n');
            try {
                execSync('lighthouse http://localhost:3000/paz-bem.html --view', { stdio: 'inherit' });
            } catch (e) {
                console.log('❌ Lighthouse não está instalado\n');
            }
            break;

        case 'sitemap':
            console.log('🗺️  Gerando sitemap...');
            const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>http://localhost:3000/paz-bem.html</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <priority>1.0</priority>
  </url>
</urlset>`;
            fs.writeFileSync(path.join(PATHS.logsDir, 'sitemap.xml'), sitemap);
            console.log('✅ Sitemap criado\n');
            break;

        default:
            console.log(`Comando desconhecido: ${command}`);
            console.log('Comandos disponíveis: validate, optimize, lighthouse, sitemap\n');
    }
}

main();
