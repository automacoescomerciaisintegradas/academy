# 🚀 Instalação no EasyPanel - Escola Paz e Vida

Guia rápido para deploy da aplicação no EasyPanel.

## ⚡ Instalação Rápida (1 Comando)

```bash
# Baixar e executar script de instalação
curl -o install.sh https://raw.githubusercontent.com/your-org/paz-e-vida/main/install-easypanel.sh && chmod +x install.sh && sudo ./install.sh install
```

## 📋 Passo a Passo

### 1. Acessar Servidor

```bash
ssh root@144.91.118.78
```

### 2. Navegar até o diretório

```bash
cd /root/academy
```

### 3. Executar Instalação

```bash
# Menu interativo
sudo ./install-easypanel.sh

# OU instalação automática
sudo ./install-easypanel.sh install
```

### 4. Configurar Variáveis

O script irá criar automaticamente o `.env` com:
- ✅ Porta automática (3001-3100, já que 3000 está em uso)
- ✅ Configurações de produção
- ✅ URLs corretas

**Edite o `.env` com suas credenciais do Supabase:**

```bash
nano .env
```

Preencha:
```env
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxx
SUPABASE_SERVICE_ROLE_KEY=xxx
```

### 5. Build e Deploy

```bash
# Construir imagem
docker-compose build app

# Iniciar aplicação
docker-compose up -d app
```

### 6. Verificar Status

```bash
# Ver logs
docker-compose logs -f app

# Ver status
docker-compose ps

# Testar health check
curl http://144.91.118.78:PORT/health
```

## 🔧 Comandos Úteis

### Script de Instalação

```bash
# Menu completo
./install-easypanel.sh

# Instalação automática
./install-easypanel.sh install

# Apenas configurar
./install-easypanel.sh config

# Apenas build
./install-easypanel.sh build

# Apenas start
./install-easypanel.sh start

# Atualizar
./install-easypanel.sh update

# Desinstalar
./install-easypanel.sh uninstall
```

### Docker Compose

```bash
# Iniciar
docker-compose up -d

# Parar
docker-compose down

# Ver logs
docker-compose logs -f app

# Reiniciar
docker-compose restart app

# Ver status
docker-compose ps

# Rebuild
docker-compose build --no-cache app
```

## 🌐 Acessando a Aplicação

Após instalação, acesse:

```
http://144.91.118.78:PORT
```

**Onde `PORT` é a porta automática (3001-3100)**

### URLs Importantes

| Serviço | URL |
|---------|-----|
| Home | `http://144.91.118.78:PORT` |
| API | `http://144.91.118.78:PORT/api` |
| Health | `http://144.91.118.78:PORT/health` |
| Admin | `http://144.91.118.78:PORT/admin` |

## 🔐 SSL/HTTPS (Opcional)

Se quiser usar HTTPS com domínio próprio:

### 1. Configurar Domínio no EasyPanel

No painel do EasyPanel:
1. Vá em **Settings** → **Domains**
2. Adicione seu domínio: `pazeevida.com`
3. Ative **SSL Automático**

### 2. Atualizar URL

Edite `.env`:
```env
NEXT_PUBLIC_APP_URL=https://pazeevida.com
```

### 3. Restart

```bash
docker-compose restart app
```

## 📊 Monitoramento

### Logs em Tempo Real

```bash
docker-compose logs -f app
```

### Uso de Recursos

```bash
docker stats paz-e-vida-app
```

### Health Check

```bash
curl http://144.91.118.78:PORT/health
```

## 🗄️ Banco de Dados

### Usando Supabase (Recomendado)

A aplicação já está configurada para usar Supabase cloud.

### Usando PostgreSQL Local (Opcional)

```bash
# Iniciar PostgreSQL
docker-compose --profile with-db up -d postgres

# Acessar banco
docker-compose exec postgres psql -U pazebem pazebem

# Backup
docker-compose exec postgres pg_dump -U pazebem pazebem > backup.sql

# Restaurar
docker-compose exec -T postgres psql -U pazebem pazebem < backup.sql
```

## 🔄 Atualização

### Atualizar Código

```bash
# Se usar Git
git pull origin main

# Rebuild e restart
docker-compose build app
docker-compose restart app
```

### Atualizar com Script

```bash
./install-easypanel.sh update
```

## 🐛 Troubleshooting

### Porta 3000 já em uso

O script automaticamente encontra uma porta livre entre 3001-3100.

### Container não inicia

```bash
# Ver logs
docker-compose logs app

# Verificar porta
netstat -tulpn | grep PORT

# Matar processo
kill -9 $(lsof -t -i:PORT)
```

### Erro de build

```bash
# Limpar cache
docker builder prune -a

# Rebuild sem cache
docker-compose build --no-cache app
```

### Permissão de arquivos

```bash
# Corrigir permissão
docker-compose exec app chown -R nextjs:nodejs /app
```

## 📝 Variáveis de Ambiente

| Variável | Descrição | Obrigatória |
|----------|-----------|-------------|
| `PORT` | Porta da aplicação | Auto |
| `NEXT_PUBLIC_SUPABASE_URL` | URL do Supabase | ✅ |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Chave anônima | ✅ |
| `SUPABASE_SERVICE_ROLE_KEY` | Chave service role | ✅ |
| `RESEND_API_KEY` | API Resend | ❌ |
| `SENDGRID_API_KEY` | API SendGrid | ❌ |
| `NEXT_PUBLIC_APP_URL` | URL pública | Auto |
| `ADMIN_EMAIL` | Email admin | ✅ |

## 🆘 Suporte

### Verificar Status do Sistema

```bash
# Docker
docker --version
docker-compose --version

# Espaço em disco
df -h

# Memória
free -h

# CPU
top -bn1 | head -5
```

### Logs de Erro

```bash
# Últimas 100 linhas
docker-compose logs --tail=100 app

# Filtrar erros
docker-compose logs app | grep -i error
```

### Reiniciar Tudo

```bash
# Parar tudo
docker-compose down

# Iniciar tudo
docker-compose up -d
```

## 📚 Recursos Adicionais

- **Documentação Docker:** `README-DOCKER.md`
- **Script de Deploy:** `deploy.sh`
- **Script Docker:** `docker.sh`

---

**Escola Paz e Vida** - Formando obreiros fundamentados na Palavra desde 2017 📚

**URL:** http://144.91.118.78:PORT
