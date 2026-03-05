#!/bin/bash
cd /root/academy
cd frontend
# Removendo pastas pesadas se existirem no zip
rm -rf node_modules .next
cd ..
zip -r academy-deploy.zip . -x "*.git*" -x "*/node_modules/*" -x "*/.next/*" -x "academy-deploy.zip"
