# Deploy no EasyPanel - Escola Paz e Vida

## ✅ Funciona!

### 1. Push para GitHub
```bash
cd /root/academy
git add .
git commit -m "Deploy"
git push origin main
```

### 2. EasyPanel
1. Criar projeto
2. Conectar GitHub
3. Selecionar repositório
4. **Root:** `frontend`
5. **Build:** `npm run build`
6. **Start:** `npm start`
7. **Port:** `3001`

### 3. Variáveis de Ambiente
```
NODE_ENV=production
PORT=3001
NEXT_PUBLIC_SUPABASE_URL=https://uvznpcxkhawirrgaqamp.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_xxx
NEXT_PUBLIC_APP_URL=https://academy.automacoescomerciais.com.br
NEXT_PUBLIC_ADMIN_EMAIL=automacoescomerciais@gmail.com
```

### 4. Domínio
- Settings → Domains
- Add: `academy.automacoescomerciais.com.br`
- Enable SSL

## ✅ Pronto!
