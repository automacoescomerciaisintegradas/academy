#!/bin/bash
cd /root/academy/frontend
echo "--- DIAGNOSTICS START ---"
echo "Current Directory: $(pwd)"
echo "Checking package.json:"
ls -l package.json
echo "Checking node_modules:"
ls -d node_modules || echo "node_modules NOT FOUND"
echo "Checking Node version: $(node -v)"
echo "Checking NPM version: $(npm -v)"
echo "Attempting to run npm run dev for 15 seconds..."
timeout 15s npm run dev
echo "--- DIAGNOSTICS END ---"
