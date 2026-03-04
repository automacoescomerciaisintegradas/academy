# 🚀 Deploy na VPS - 144.91.118.78

## 📋 Acesso SSH

```bash
# Acessar VPS
ssh root@144.91.118.78

# Com chave SSH
ssh -i ~/.ssh/sua-chave root@144.91.118.78
```

## ⚡ Deploy Rápido (1 Comando)

```bash
# Na VPS:
cd /root/academy
./deploy-vps.sh
```

## 📝 Passo a Passo Completo

### 1. Acessar VPS

```bash
ssh root@144.91.118.78
```

### 2. Navegar até diretório

```bash
cd /root/academy
```

### 3. Executar Script de Deploy

```bash
# Opção 1: Script rápido
./deploy-vps.sh

# Opção 2: Script completo (menu)
./install-easypanel.sh

# Opção 3: Manual
docker-compose build app
docker-compose up -d app
```

### 4. Configurar .env

```bash
# Editar .env
nano .env

# Preencher Supabase:
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxx
SUPABASE_SERVICE_ROLE_KEY=xxx

# Salvar: Ctrl+O, Enter, Ctrl+X
```

### 5. Restart

```bash
docker-compose restart app
```

## 🌐 Domínio e SSL

### Domínio Configurado
```
https://academy.automacoescomerciais.com.br
```

### SSL no EasyPanel

1. Acesse EasyPanel
2. Vá em **Settings** → **Domains**
3. Adicione: `academy.automacoescomerciais.com.br`
4. Ative **SSL Automático**

## 🔧 Comandos Úteis

### Ver Logs
```bash
# Em tempo real
docker-compose logs -f app

# Últimas 100 linhas
docker-compose logs --tail=100 app
```

### Status
```bash
# Containers
docker-compose ps

# Recursos
docker stats

# Porta em uso
ss -tulpn | grep 300
```

### Restart/Stop
```bash
# Reiniciar
docker-compose restart app

# Parar
docker-compose down

# Parar e remover
docker-compose down -v
```

### Atualizar
```bash
# Git pull
git pull origin main

# Rebuild
docker-compose build app

# Restart
docker-compose restart app
```

## 📊 Informações do Servidor

| Info | Valor |
|------|-------|
| **IP** | 144.91.118.78 |
| **Domínio** | academy.automacoescomerciais.com.br |
| **Porta** | 3001-3100 (auto) |
| **Usuário** | root |
| **SSH** | ssh root@144.91.118.78 |

## 🔍 Verificações

### Health Check
```bash
curl http://localhost:PORT/health
```

### Testar API
```bash
curl http://localhost:PORT/api/health
```

### Verificar Docker
```bash
docker --version
docker-compose --version
docker ps
```

### Verificar Espaço
```bash
df -h
free -h
```

## 🐛 Troubleshooting

### Porta 3000 em uso
O script automaticamente usa porta 3001-3100.

### Container não inicia
```bash
# Ver logs
docker-compose logs app

# Ver porta
ss -tulpn | grep PORT

# Matar processo
kill -9 $(lsof -t -i:PORT)
```

### Erro de build
```bash
# Limpar cache
docker builder prune -a

# Rebuild
docker-compose build --no-cache app
```

### Permissão
```bash
# Corrigir
docker-compose exec app chown -R nextjs:nodejs /app
```

## 📁 Estrutura de Arquivos

```
/root/academy/
├── deploy-vps.sh          # Script rápido
├── install-easypanel.sh   # Script completo
├── docker-compose.yml     # Config Docker
├── Dockerfile             # Build Docker
├── .env                   # Variáveis (criar)
├── .env.example           # Exemplo
└── frontend/              # Código Next.js
```

## 🔐 Segurança

### Firewall (UFW)
```bash
# Habilitar
ufw allow 22/tcp    # SSH
ufw allow 3001/tcp  # App
ufw enable
```

### Atualizações
```bash
# Sistema
apt update && apt upgrade -y

# Docker
docker --version
```

## 📞 Suporte

### Logs de Erro
```bash
docker-compose logs app | grep -i error
```

### Reiniciar Tudo
```bash
docker-compose down
docker-compose up -d
```

### Backup .env
```bash
cp .env .env.backup.$(date +%Y%m%d)
```

---

**Escola Paz e Vida** - academy.automacoescomerciais.com.br 📚
