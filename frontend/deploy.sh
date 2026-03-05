#!/bin/bash

# Script de Deploy para EasyPanel com Traefik
# Uso: ./deploy.sh

set -e

echo "🚀 Iniciando deploy no EasyPanel..."

# 1. Build da imagem Docker
echo "📦 Build da imagem Docker..."
docker build -t easypanel/app/academy:latest .

# 2. Carregar variáveis de ambiente (se existir .env)
if [ -f .env ]; then
    echo "📋 Carregando variáveis de ambiente..."
    export $(cat .env | grep -v '^#' | xargs)
fi

# 3. Deploy com docker-compose
echo "🐳 Subindo serviço com docker-compose..."
docker-compose up -d

# 4. Logs
echo "📊 Logs do serviço (Ctrl+C para sair)..."
docker-compose logs -f academy

echo "✅ Deploy concluído!"
echo "🌐 Acesse: http://${DOMAIN:-academy.automacoescomerciais.com.br}"
