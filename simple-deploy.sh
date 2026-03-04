#!/bin/bash

# ============================================
# Simple Deploy Script - NO Docker Compose
# Escola Paz e Vida
# ============================================

set -e

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${YELLOW}╔════════════════════════════════════════════╗${NC}"
echo -e "${YELLOW}║  Simple Deploy - Escola Paz e Vida        ║${NC}"
echo -e "${YELLOW}╚════════════════════════════════════════════╝${NC}"
echo ""

# Find available port
PORT=3001
for p in $(seq 3001 3100); do
    if ! ss -tulpn 2>/dev/null | grep -q ":$p "; then
        PORT=$p
        break
    fi
done

echo -e "${GREEN}✓ Porta: $PORT${NC}"

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo -e "${RED}✗ Docker não está instalado!${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Docker instalado${NC}"

# Create .env
cat > .env << EOF
NODE_ENV=production
PORT=$PORT
NEXT_PUBLIC_APP_URL=https://academy.automacoescomerciais.com.br
NEXT_PUBLIC_ADMIN_EMAIL=automacoescomerciais@gmail.com
ADMIN_EMAIL=automacoescomerciais@gmail.com
EOF

echo -e "${GREEN}✓ .env criado${NC}"

# Stop old container
echo -e "${YELLOW}ℹ Parando container antigo...${NC}"
docker stop paz-e-vida-app 2>/dev/null || true
docker rm paz-e-vida-app 2>/dev/null || true

# Build image
echo -e "${YELLOW}ℹ Construindo imagem...${NC}"
cd /root/academy/frontend
docker build -t paz-e-vida-app . || {
    echo -e "${RED}✗ Erro no build!${NC}"
    exit 1
}

echo -e "${GREEN}✓ Imagem construída${NC}"

# Run container
echo -e "${YELLOW}ℹ Iniciando container...${NC}"
docker run -d \
    --name paz-e-vida-app \
    --restart unless-stopped \
    -p $PORT:$PORT \
    -e NODE_ENV=production \
    -e PORT=$PORT \
    -e NEXT_PUBLIC_APP_URL=https://academy.automacoescomerciais.com.br \
    -e NEXT_PUBLIC_ADMIN_EMAIL=automacoescomerciais@gmail.com \
    -e ADMIN_EMAIL=automacoescomerciais@gmail.com \
    paz-e-vida-app

# Wait
echo -e "${YELLOW}ℹ Aguardando inicialização (20s)...${NC}"
sleep 20

# Health check
if curl -f "http://localhost:$PORT/health" > /dev/null 2>&1; then
    echo -e "${GREEN}✓ Aplicação rodando!${NC}"
else
    echo -e "${YELLOW}⚠ Saúde não verificada (pode estar iniciando)${NC}"
fi

echo ""
echo -e "${GREEN}╔════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║  ✓ Deploy Concluído!                     ║${NC}"
echo -e "${GREEN}╚════════════════════════════════════════════╝${NC}"
echo ""
echo -e "Domínio: https://academy.automacoescomerciais.com.br"
echo -e "Porta: $PORT"
echo -e "Health: http://144.91.118.78:$PORT/health"
echo ""
echo -e "${YELLOW}Comandos úteis:${NC}"
echo "  • Logs:    docker logs -f paz-e-vida-app"
echo "  • Stop:    docker stop paz-e-vida-app"
echo "  • Restart: docker restart paz-e-vida-app"
echo ""
