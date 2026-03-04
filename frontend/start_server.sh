#!/bin/bash
cd "$(dirname "$0")"
echo "Iniciando servidor Next.js na porta 3000..."
npm run dev -- -p 3000 > server.log 2>&1 &
echo "Servidor enviado para background. Verifique server.log para detalhes."
