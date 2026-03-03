#!/bin/bash
cd /root/academy
npx -y create-next-app@latest src/paz-e-bem --typescript --eslint --tailwind --src-dir --app --import-alias "@/*" --use-npm --skip-git --no-turbopack
if [ $? -eq 0 ]; then
    echo "Next.js project created successfully"
    rm setup_paz_e_bem.sh
else
    echo "Failed to create Next.js project"
    exit 1
fi
