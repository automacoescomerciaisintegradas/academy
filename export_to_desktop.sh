#!/bin/bash
cd /root/academy
# Remove pastas pesadas
rm -rf frontend/node_modules frontend/.next node_modules .next

# Cria o arquivo ZIP
zip -r academy-deploy.zip . -x "*.git*" -x "*/node_modules/*" -x "*/.next/*" -x "*.zip" -x "*.tar.gz"

# Copia para a Área de Trabalho do Windows (Desktop)
cp academy-deploy.zip /mnt/c/Users/autom/Desktop/academy-deploy.zip
echo "Arquivo academy-deploy.zip copiado para a Área de Trabalho com sucesso!"
