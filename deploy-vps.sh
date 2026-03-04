#!/bin/bash

# ============================================
# Quick Deploy Script - VPS 144.91.118.78
# Domain: academy.automacoescomerciais.com.br
# ============================================

set -e

echo "╔════════════════════════════════════════════╗"
echo "║  Quick Deploy - Escola Paz e Vida         ║"
echo "║  Domain: academy.automacoescomerciais.com.br"
echo "╚════════════════════════════════════════════╝"
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# Find available port
find_port() {
    for port in $(seq 3001 3100); do
        if ! ss -tulpn | grep -q ":$port "; then
            echo $port
            return 0
        fi
    done
    echo "3001"
}

PORT=$(find_port)

echo -e "${YELLOW}ℹ Porta encontrada: $PORT${NC}"
echo ""

# Create .env if not exists
if [ ! -f ".env" ]; then
    echo -e "${YELLOW}ℹ Criando .env...${NC}"
    cat > .env << EOF
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
PORT=$PORT
HOSTNAME=0.0.0.0

# Supabase - PREENCHA AQUI
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Email (opcional)
RESEND_API_KEY=
SENDGRID_API_KEY=
EMAIL_FROM="Escola Paz e Vida <convites@pazeevida.com>"

# Application
NEXT_PUBLIC_APP_URL=https://academy.automacoescomerciais.com.br
NEXT_PUBLIC_ADMIN_EMAIL=automacoescomerciais@gmail.com
ADMIN_EMAIL=automacoescomerciais@gmail.com

# Database
POSTGRES_USER=pazebem
POSTGRES_PASSWORD=$(openssl rand -base64 32)
POSTGRES_DB=pazebem
REDIS_URL=redis://redis:6379
EOF
    echo -e "${GREEN}✓ .env criado${NC}"
else
    echo -e "${GREEN}✓ .env já existe${NC}"
    # Update PORT in .env
    sed -i "s/^PORT=.*/PORT=$PORT/" .env
fi

echo ""
echo -e "${YELLOW}⚠ IMPORTANTE: Edite o .env e preencha as credenciais do Supabase!${NC}"
echo ""
read -p "Pressione Enter para continuar ou Ctrl+C para cancelar..."

# Build Docker image
echo -e "${YELLOW}ℹ Construindo imagem Docker...${NC}"
docker-compose build app || {
    echo -e "${RED}✗ Erro no build${NC}"
    exit 1
}
echo -e "${GREEN}✓ Build concluído${NC}"
echo ""

# Start application
echo -e "${YELLOW}ℹ Iniciando aplicação...${NC}"
docker-compose up -d app || {
    echo -e "${RED}✗ Erro ao iniciar${NC}"
    exit 1
}
echo -e "${GREEN}✓ Aplicação iniciada${NC}"
echo ""

# Wait for app
echo -e "${YELLOW}ℹ Aguardando aplicação (30s)...${NC}"
sleep 30

# Health check
if curl -f "http://localhost:$PORT/health" > /dev/null 2>&1; then
    echo -e "${GREEN}✓ Aplicação saudável!${NC}"
else
    echo -e "${YELLOW}⚠ Health check falhou (pode estar iniciando)${NC}"
fi

echo ""
echo "╔════════════════════════════════════════════╗"
echo "║  ✓ Deploy Concluído!                      ║"
echo "╚════════════════════════════════════════════╝"
echo ""
echo -e "${GREEN}Domínio:${NC} https://academy.automacoescomerciais.com.br"
echo -e "${GREEN}Porta:${NC} $PORT"
echo -e "${GREEN}Health:${NC} http://144.91.118.78:$PORT/health"
echo ""
echo -e "${YELLOW}Próximos passos:${NC}"
echo "  1. Edite .env: nano .env"
echo "  2. Preencha Supabase"
echo "  3. Restart: docker-compose restart app"
echo ""
