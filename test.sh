#!/bin/bash

# ============================================
# Test Script - Verificar Problemas
# ============================================

echo "╔════════════════════════════════════════════╗"
echo "║  Teste de Diagnóstico                     ║"
echo "╚════════════════════════════════════════════╝"
echo ""

# 1. Check Node.js
echo "1. Node.js:"
node --version 2>&1 || echo "Node não instalado"
echo ""

# 2. Check npm
echo "2. npm:"
npm --version 2>&1 || echo "npm não instalado"
echo ""

# 3. Check Docker
echo "3. Docker:"
docker --version 2>&1 || echo "Docker não instalado"
echo ""

# 4. Check ports
echo "4. Portas em uso (3000-3100):"
ss -tulpn 2>/dev/null | grep -E ":(3000|3001|3002|3003)" || echo "Nenhuma porta 3000-3003 em uso"
echo ""

# 5. Check frontend directory
echo "5. Frontend directory:"
ls -la /root/academy/frontend/package.json 2>&1 || echo "package.json não encontrado"
echo ""

# 6. Check Next.js config
echo "6. Next.js config:"
head -20 /root/academy/frontend/next.config.ts 2>&1 || echo "next.config.ts não encontrado"
echo ""

# 7. Test npm install
echo "7. Testando npm install (rápido)..."
cd /root/academy/frontend
timeout 30 npm install --prefer-offline 2>&1 | tail -5 || echo "Timeout ou erro no npm install"
echo ""

echo "╔════════════════════════════════════════════╗"
echo "║  Diagnóstico concluído                    ║"
echo "╚════════════════════════════════════════════╝"
