#!/bin/bash
cd /root/academy/frontend
echo "Instalando Firebase na pasta: $(pwd)"
npm install firebase --no-fund --no-audit
echo "Status da instalação: $?"
