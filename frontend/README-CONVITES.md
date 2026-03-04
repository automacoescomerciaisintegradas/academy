# 📧 Sistema de Convites - Escola Paz e Vida

Sistema completo de envio e gerenciamento de convites para cursos.

## 🚀 Funcionalidades

- ✅ **Envio de convites por email**
- ✅ **Gestão de convites (pendentes, aceitos, expirados)**
- ✅ **Aceite de convite com criação de conta**
- ✅ **Integração com Resend/SendGrid para emails**
- ✅ **Dashboard administrativo com estatísticas**
- ✅ **Tokens únicos e seguros**
- ✅ **Validade de 7 dias por convite**

## 📁 Estrutura de Arquivos

```
frontend/src/
├── app/
│   ├── api/
│   │   └── invites/
│   │       ├── send/
│   │       │   └── route.ts          # API de envio de convites
│   │       ├── accept/
│   │       │   └── route.ts          # API de aceitar convite
│   │       └── route.ts              # API de listagem/cancelamento
│   ├── admin/
│   │   └── convidar-usuarios/
│   │       └── page.tsx              # Dashboard de convites
│   └── aceitar-convite/
│       └── [token]/
│           └── page.tsx              # Página de aceite
└── ...

supabase/
└── invites_schema.sql                 # Schema do banco
```

## 🔧 Configuração

### 1. Instalar dependências (se necessário)

```bash
npm install
```

### 2. Configurar variáveis de ambiente

```bash
cp .env.example .env.local
```

Edite `.env.local` com suas credenciais:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxx

# Email (escolha um)
RESEND_API_KEY=re_xxx
# OU
SENDGRID_API_KEY=SG.xxx

NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Executar schema no Supabase

1. Acesse o dashboard do Supabase
2. Vá em **SQL Editor**
3. Copie e cole o conteúdo de `supabase/invites_schema.sql`
4. Execute

## 📖 Como Usar

### 1. Enviar Convite

1. Acesse `/admin/convidar-usuarios`
2. Digite o email do usuário
3. (Opcional) Selecione um curso específico
4. Clique em **Enviar**

O sistema irá:
- ✅ Validar o email
- ✅ Verificar se já existe usuário
- ✅ Gerar token único
- ✅ Criar registro no banco
- ✅ Enviar email com link de aceite

### 2. Aceitar Convite

1. Usuário recebe email com link: `https://pazeevida.com/aceitar-convite/{token}`
2. Clica no link
3. Preenche nome e senha
4. Conta é criada automaticamente
5. Se houver curso associado, matrícula é realizada

### 3. Gerenciar Convites

No dashboard `/admin/convidar-usuarios`:

- **Filtros:** Todos, Pendentes, Aceitos
- **Ações:**
  - 📋 Copiar link do convite
  - ❌ Cancelar convite
  - 📊 Ver estatísticas

## 🎨 Email Template

O email enviado segue o design da marca:

- **Cores:** Terracota (#A84B2B), Gesso (#EAE6DF)
- **Fontes:** Instrument Serif, Manrope
- **Logo:** Escola Paz e Vida
- **Botão:** Verde WhatsApp ou Terracota
- **Footer:** Informações da escola

## 🔒 Segurança

- ✅ **RLS (Row Level Security)** no Supabase
- ✅ **Tokens únicos** (UUID)
- ✅ **Validade de 7 dias**
- ✅ **Verificação de email** duplicado
- ✅ **Apenas admin** pode criar convites
- ✅ **HTTPS** obrigatório em produção

## 📊 API Endpoints

### POST /api/invites/send

Envia um novo convite.

**Body:**
```json
{
  "email": "usuario@email.com",
  "courseId": "xxx",
  "invitedBy": "Administrador"
}
```

**Respostas:**
- `201` - Convite criado com sucesso
- `200` - Convite já existe (reenvio)
- `400` - Email inválido
- `409` - Email já cadastrado
- `500` - Erro no servidor

### GET /api/invites

Lista todos os convites.

**Query Params:**
- `status` - Filtrar por status (pending, accepted, expired)
- `email` - Filtrar por email

**Resposta:**
```json
{
  "invites": [
    {
      "id": "uuid",
      "email": "usuario@email.com",
      "status": "pending",
      "expires_at": "2026-03-10T00:00:00Z",
      ...
    }
  ]
}
```

### DELETE /api/invites

Cancela um convite.

**Body:**
```json
{
  "inviteId": "uuid"
}
```

### GET /api/invites/accept?token=xxx

Verifica validade do convite.

**Resposta:**
```json
{
  "valid": true,
  "expired": false,
  "used": false,
  "email": "usuario@email.com",
  "expiresAt": "2026-03-10T00:00:00Z"
}
```

### POST /api/invites/accept

Aceita o convite e cria conta.

**Body:**
```json
{
  "inviteToken": "uuid",
  "userData": {
    "name": "Nome do Usuário",
    "password": "senha123"
  }
}
```

## 🧪 Testes

### Testar envio de email (desenvolvimento)

Os emails são simulados no console:

```bash
npm run dev
```

No terminal, você verá:

```
=== EMAIL SIMULADO ===
Para: usuario@email.com
Assunto: Convite para Escola Paz e Vida
Token: xxx-xxx-xxx
=====================
```

### Testar fluxo completo

1. Crie convite em `/admin/convidar-usuarios`
2. Copie o link do console ou dashboard
3. Acesse o link em nova aba
4. Preencha formulário
5. Verifique redirecionamento

## 🛠️ Produção

### Configurar Resend

1. Acesse https://resend.com
2. Crie conta e verifique domínio
3. Gere API key
4. Adicione em `.env.local`

### Configurar SendGrid (alternativa)

1. Acesse https://sendgrid.com
2. Crie conta e verifique email
3. Gere API key
4. Adicione em `.env.local`

### Emails em Produção

- Configure domínio verificado
- Use email corporativo (convites@pazeevida.com)
- Monitore taxa de entrega
- Configure DKIM/SPF

## 📝 Próximos Passos

- [ ] Integração com WhatsApp
- [ ] Templates personalizados por curso
- [ ] Lembrete automático (3 dias antes de expirar)
- [ ] Relatórios de conversão
- [ ] Convites em lote (CSV)
- [ ] Personalização de mensagem

## 🆘 Suporte

Dúvidas ou problemas?

- Email: suporte@pazeevida.com
- Documentação: /docs

---

**Escola Paz e Vida** - Formando obreiros fundamentados na Palavra desde 2017
