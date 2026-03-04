# 🐳 Docker Setup - Escola Paz e Vida

Guia completo de configuração e uso do Docker para o projeto Escola Paz e Vida.

## 📋 Pré-requisitos

- **Docker** 20.10+
- **Docker Compose** 2.0+
- **Node.js** 20+ (para desenvolvimento local)

## 🚀 Início Rápido

### 1. Clonar e Configurar

```bash
# Copiar variáveis de ambiente
cp .env.example .env

# Editar .env com suas credenciais
nano .env
```

### 2. Iniciar com Script (Recomendado)

```bash
# Menu interativo
./docker.sh

# Ou comandos diretos
./docker.sh start    # Iniciar aplicação
./docker.sh stop     # Parar aplicação
./docker.sh status   # Ver status
./docker.sh logs     # Ver logs
```

### 3. Iniciar Manualmente

```bash
# Apenas a aplicação
docker-compose up -d app

# Todos os serviços
docker-compose up -d

# Com Nginx e PostgreSQL
docker-compose --profile with-nginx --profile with-db up -d
```

## 🏗️ Arquitetura

```
┌─────────────────────────────────────────┐
│           Nginx (Port 80/443)           │
│         (Reverse Proxy - Optional)       │
└─────────────────┬───────────────────────┘
                  │
┌─────────────────▼───────────────────────┐
│      Next.js App (Port 3000)            │
│         (Production Build)               │
└─────────────────┬───────────────────────┘
                  │
    ┌─────────────┼─────────────┐
    │             │             │
┌───▼───┐   ┌────▼────┐   ┌───▼───┐
│ Postgres│  │  Redis  │   │ Supabase│
│ (Opt)  │   │ (Opt)   │   │(Cloud)  │
└────────┘   └─────────┘   └─────────┘
```

## 📦 Serviços Disponíveis

### 1. **App (Next.js)** - Obrigatório
- **Porta:** 3000
- **Imagem:** node:20-alpine
- **Build:** Multi-stage (otimizado)

```bash
docker-compose up -d app
```

### 2. **Nginx** - Opcional (Produção)
- **Porta:** 80/443
- **Função:** Reverse proxy, SSL, cache

```bash
docker-compose --profile with-nginx up -d
```

### 3. **PostgreSQL** - Opcional (Dev Local)
- **Porta:** 5432
- **Função:** Banco de dados local

```bash
docker-compose --profile with-db up -d
```

### 4. **Redis** - Opcional (Cache)
- **Porta:** 6379
- **Função:** Cache, sessões, filas

```bash
docker-compose --profile with-cache up -d
```

## 🔧 Comandos Úteis

### Build

```bash
# Construir imagem
docker-compose build app

# Rebuild sem cache
docker-compose build --no-cache app
```

### Logs

```bash
# Ver logs em tempo real
docker-compose logs -f app

# Últimas 100 linhas
docker-compose logs --tail=100 app

# Logs de todos os serviços
docker-compose logs -f
```

### Status

```bash
# Ver status dos containers
docker-compose ps

# Ver recursos usados
docker stats
```

### Shell

```bash
# Acessar shell do container
docker-compose exec app sh

# Acessar como root
docker-compose exec -u root app sh
```

### Restart/Stop

```bash
# Reiniciar aplicação
docker-compose restart app

# Parar tudo
docker-compose down

# Parar e remover volumes
docker-compose down -v
```

## 🎣 Perfis Docker Compose

### Desenvolvimento
```bash
docker-compose up -d
```

### Produção com Nginx
```bash
docker-compose --profile with-nginx up -d
```

### Completo (Tudo)
```bash
docker-compose --profile with-nginx --profile with-db --profile with-cache up -d
```

## 🔐 SSL/HTTPS (Produção)

### 1. Gerar Certificado (Let's Encrypt)

```bash
docker run --rm -v ./nginx/ssl:/etc/letsencrypt \
  certbot/certbot certonly --webroot \
  --webroot-path=/var/www/html \
  -d pazeevida.com -d www.pazeevida.com
```

### 2. Habilitar HTTPS no Nginx

Edite `nginx/nginx.conf` e descomente a seção HTTPS.

### 3. Renew Certificado

```bash
docker run --rm -v ./nginx/ssl:/etc/letsencrypt \
  certbot/certbot renew
```

## 📊 Monitoramento

### Health Check

```bash
# Verificar saúde da aplicação
curl http://localhost:3000/health

# Via Docker
docker-compose exec app wget -q -O - http://localhost:3000/health
```

### Métricas

```bash
# Uso de recursos
docker stats paz-e-vida-app

# Logs de erro
docker-compose logs app | grep -i error
```

## 🗄️ Banco de Dados

### Backup PostgreSQL

```bash
# Criar backup
docker-compose exec postgres pg_dump -U pazebem pazebem > backup.sql

# Restaurar backup
docker-compose exec -T postgres psql -U pazebem pazebem < backup.sql
```

### Migrações

```bash
# Executar migrações
docker-compose exec app npm run db:migrate

# Seed inicial
docker-compose exec app npm run db:seed
```

## 🧹 Limpeza

```bash
# Remover containers parados
docker container prune

# Remover imagens não usadas
docker image prune

# Remover volumes não usados
docker volume prune

# Limpeza completa (CUIDADO!)
docker system prune -a --volumes
```

## 🐛 Troubleshooting

### Container não inicia

```bash
# Ver logs
docker-compose logs app

# Verificar se porta está em uso
netstat -tulpn | grep 3000

# Matar processo
kill -9 $(lsof -t -i:3000)
```

### Erro de build

```bash
# Limpar cache do Docker
docker builder prune -a

# Rebuild sem cache
docker-compose build --no-cache
```

### Permissão de arquivos

```bash
# Corrigir permissão
docker-compose exec app chown -R nextjs:nodejs /app
```

## 📝 Variáveis de Ambiente

| Variável | Descrição | Padrão |
|----------|-----------|--------|
| `NODE_ENV` | Ambiente | `production` |
| `NEXT_PUBLIC_SUPABASE_URL` | URL do Supabase | - |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Chave do Supabase | - |
| `RESEND_API_KEY` | API Key Resend | - |
| `SENDGRID_API_KEY` | API Key SendGrid | - |
| `NEXT_PUBLIC_APP_URL` | URL da aplicação | `http://localhost:3000` |
| `POSTGRES_USER` | Usuário do Postgres | `pazebem` |
| `POSTGRES_PASSWORD` | Senha do Postgres | `changeit` |
| `POSTGRES_DB` | Nome do banco | `pazebem` |

## 🚀 Deploy em Produção

### 1. Preparar Servidor

```bash
# Instalar Docker
curl -fsSL https://get.docker.com | sh

# Instalar Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

### 2. Clonar Projeto

```bash
git clone https://github.com/your-org/paz-e-vida.git
cd paz-e-vida
```

### 3. Configurar

```bash
cp .env.example .env
nano .env  # Editar credenciais
```

### 4. Deploy

```bash
# Build e start
docker-compose build
docker-compose --profile with-nginx up -d

# Ver status
docker-compose ps
```

### 5. Auto-Deploy (CI/CD)

```yaml
# .github/workflows/deploy.yml
name: Deploy
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to server
        run: |
          docker-compose build
          docker-compose --profile with-nginx up -d
```

## 📚 Recursos Adicionais

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Next.js Docker Guide](https://nextjs.org/docs/deployment#docker)
- [Nginx Configuration](https://nginx.org/en/docs/)

---

**Escola Paz e Vida** - Formando obreiros fundamentados na Palavra desde 2017 📚
