#!/bin/bash
exec > /root/academy/frontend/debug.log 2>&1
echo "Script iniciado em: $(date)"
echo "Diretório atual: $(pwd)"
echo "Usuário: $(whoami)"
echo "Tentando npm run dev..."
npm run dev -- -p 3000 &
echo "Processo enviado para background: $!"
