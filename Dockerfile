FROM node:20-alpine

WORKDIR /app

# Copia os arquivos de configuração do frontend
COPY frontend/package*.json ./

# Instala as dependências
RUN npm ci

# Copia o resto do código do frontend
COPY frontend/ ./

# Compila o projeto Next.js
RUN npm run build

# Variáveis de ambiente
ENV NODE_ENV=production
ENV PORT=3001

EXPOSE 3001

# Inicia o servidor Next.js
CMD ["npm", "start"]
