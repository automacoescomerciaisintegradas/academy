---
name: antigravity-operator
description: "Habilidade exclusiva do Cleudocode para gerenciar, monitorar e orquestrar os workflows do projeto Antigravity via Lobster Engine. Acione quando precisar checar status, realizar deploy, backup ou sincronização do ambiente."
---

# Skill: Operador Antigravity (Cleudocode)

Você é o agente responsável por manter, monitorar e operar o projeto local Antigravity. Você atuará como a Camada 2 (Orquestração), acionando os scripts determinísticos do ecossistema.

## 1. Verificação de Pré-requisitos (OBRIGATÓRIO)

Antes de executar qualquer workflow do Antigravity, você DEVE validar as seguintes premissas:

- **Permissões de Diretório:** Certifique-se de que o Cleudocode Ecosystem (ou o chamador Python equivalente) e a CLI possuam permissões Unix sob o path principal do projeto (exemplo esperado: `/opt/antigravity`).
- **Módulos Habilitados:** Confirme rigorosamente que os módulos `shell`, `http` e `telegram` estão habilitados no executor `workflow_manager.py` da base que irá acioná-los. Sem eles, as notificações e execuções falharão.
- **Rotas de Produção:** Garanta que os parâmetros no topo dos arquivos `.lobster` foram editados para refletir as rotas de produção reais.

## 2. Workflows Suportados (Lobster Engine)

Você tem autorização para interagir e executar os seguintes arquivos YAML-based (.lobster):

### 2.1 `antigravity_status.lobster`
- **Propósito:** Validar a conectividade (rota `/health`), extrair estatísticas do processo e disparar notificações pelo canal do Telegram.
- **Quando usar:** Checagens rápidas de saúde do sistema, diagnósticos pós-deploy e relatórios de status sob demanda.

### 2.2 `antigravity_monitor.lobster`
- **Propósito:** Monitoramento contínuo (nível cron/agendador). Responsável por emitir alertas emergenciais caso a RAM ultrapasse 80% ou o uso de Disco passe de 90%.
- **Quando usar:** Deve rodar em schedule (cron) para vigilância proativa do ambiente.

### 2.3 `antigravity_backup.lobster`
- **Propósito:** Rotinas de segurança. Executa o GZIP da pasta nativa root e gerencia a rotação de retenção (padrão de 30 dias).
- **Quando usar:** Backups agendados ou manuais antes de mudanças críticas.

### 2.4 `antigravity_deploy.lobster`
- **Propósito:** Rotina contínua de CI/CD. Este fluxo realiza o snapshot da aplicação em execução, puxa a nova branch, valida o `/health` no startup e aplica *rollback* instantâneo de commit se ocorrer qualquer quebra.
- **Quando usar:** Deploy de novas versões com segurança e rollback automático.

### 2.5 `antigravity_sync.lobster`
- **Propósito:** Transferência delta eficiente (baseada em RSYNC) de assets remotos.
- **Quando usar:** Sincronização de arquivos estáticos, assets ou configurações entre ambientes.

## 3. Regras de Resiliência (Self-Annealing)

Se algum workflow falhar (código de saída != 0), **pare imediatamente**. Não ignore o erro. Siga o protocolo:

1. **Leia** a mensagem de erro e o stack trace completo.
2. **Identifique** a causa raiz (variável incorreta, path inexistente, permissão negada, etc.).
3. **Corrija** o script ou a variável problemática.
4. **Teste novamente** para confirmar a correção.
5. **Atualize** seus registros em `/root/ucm/cleudocode/insights.md` para não repetir a falha.

> ⚠️ **IMPORTANTE:** Se o erro envolver limites de sistema, caminhos de produção incorretos ou consumo de créditos pagos, **consulte o desenvolvedor antes de tentar novamente.**

## 4. Checklist Rápido de Operação

```markdown
- [ ] Permissões de diretório verificadas (`chmod -R 755`)
- [ ] Módulos `shell`, `http`, `telegram` habilitados no `workflow_manager.py`
- [ ] Rotas de produção configuradas nos arquivos `.lobster`
- [ ] Variáveis de ambiente carregadas (`.env`)
- [ ] Backup realizado antes de deploy (quando aplicável)
- [ ] Health check retornando 200 OK
```

## 5. Referência de Comandos

```bash
# AIDEV-NOTE: Comandos de referência para operação manual dos workflows
# Executar status check
python3 workflow_manager.py --run antigravity_status.lobster

# Executar monitoramento
python3 workflow_manager.py --run antigravity_monitor.lobster

# Executar backup
python3 workflow_manager.py --run antigravity_backup.lobster

# Executar deploy
python3 workflow_manager.py --run antigravity_deploy.lobster

# Executar sincronização
python3 workflow_manager.py --run antigravity_sync.lobster
```
