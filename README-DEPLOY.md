# 🚀 Deploy via GitHub - EasyPanel

## ✅ Configuração Correta

### 1. Push para GitHub

```bash
# No seu computador
git add .
git commit -m "feat: Configuração para deploy no EasyPanel"
git push origin main
```

### 2. No EasyPanel

1. **Criar novo projeto** ou selecionar existente
2. **Source:** GitHub
3. **Repository:** Selecione `paz-e-vida` ou `academy`
4. **Branch:** `main`

### 3. Variáveis de Ambiente (No EasyPanel)

Adicione estas variáveis:

```env
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
PORT=3001

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://uvznpcxkhawirrgaqamp.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_xxx
SUPABASE_SERVICE_ROLE_KEY=xxx

# Application
NEXT_PUBLIC_APP_URL=https://academy.automacoescomerciais.com.br
NEXT_PUBLIC_ADMIN_EMAIL=automacoescomerciais@gmail.com
ADMIN_EMAIL=automacoescomerciais@gmail.com

# Email (opcional)
RESEND_API_KEY=re_xxx
```

### 4. Build Settings

**Build Command:**
```bash
npm run build
```

**Start Command:**
```bash
node server.js
```

**Root Directory:**
```
frontend
```

### 5. Domínio

1. Vá em **Settings** → **Domains**
2. Adicione: `academy.automacoescomerciais.com.br`
3. Ative **SSL Automático**

---

## 🔧 Problema Corrigido

### Erro Anterior:
```dockerfile
RUN next dev  # ❌ Errado - next não está instalado
```

### Solução:
```dockerfile
RUN npm ci           # ✅ Instala dependências
RUN npm run build    # ✅ Build da aplicação
CMD ["node", "server.js"]  # ✅ Start correto
```

---

## 📁 Arquivos de Configuração

### `Dockerfile` (Corrigido)
- ✅ Multi-stage build
- ✅ `npm ci` para instalar dependências
- ✅ `npm run build` para build
- ✅ Standalone output
- ✅ Produção otimizada

### `nixpacks.toml`
- ✅ Configuração para EasyPanel
- ✅ Node.js 20
- ✅ Build e start corretos

### `.dockerignore`
- ✅ Exclui node_modules
- ✅ Exclui .next
- ✅ Otimiza build

---

## 🚨 Erros Comuns

### 1. "next: command not found"
**Causa:** Dependências não instaladas

**Solução:**
```dockerfile
RUN npm ci
RUN npm run build
```

### 2. "Port 3000 already in use"
**Causa:** Porta 3000 em uso

**Solução:**
```env
PORT=3001
```

### 3. Build falha no EasyPanel
**Causa:** Root directory incorreto

**Solução:**
- Root Directory: `frontend`
- Ou mova package.json para a raiz

---

## ✅ Checklist de Deploy

- [ ] Push para GitHub
- [ ] Projeto criado no EasyPanel
- [ ] Variáveis de ambiente configuradas
- [ ] Domínio adicionado
- [ ] SSL ativado
- [ ] Build completou com sucesso
- [ ] Aplicação está acessível

---

## 🔍 Debug

### Ver logs no EasyPanel:
```
Logs → Real-time logs
```

### Verificar build:
```bash
# Localmente
docker build -t paz-e-vida-app .
docker run -p 3001:3001 paz-e-vida-app
```

### Testar health check:
```bash
curl http://localhost:3001/health
```

---

**Escola Paz e Vida** - academy.automacoescomerciais.com.br 📚
