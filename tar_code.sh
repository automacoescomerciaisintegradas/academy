#!/bin/bash
cd /root/academy
# Removes heavy folders first
rm -rf frontend/node_modules frontend/.next node_modules .next

# Creates a standard .tar.gz archive which EasyPanel loves
tar -czvf academy-deploy.tar.gz \
  --exclude='.git' \
  --exclude='node_modules' \
  --exclude='.next' \
  --exclude='academy-deploy.zip' \
  --exclude='academy-deploy.tar.gz' \
  .
