# Academy - AI Agents Platform

## Project Context
Este projeto é uma plataforma para desenvolvimento, orquestração e execução de Agentes de IA seguindo uma arquitetura robusta de 3 camadas. O objetivo é criar sistemas confiáveis onde a IA atua como orquestrador de scripts determinísticos.

## Architecture
O sistema segue a **Arquitetura de 3 Camadas**:
1.  **Diretiva (Directives)**: SOPs em Markdown definindo O QUE fazer.
2.  **Orquestração (Orchestration)**: O Agente de IA (você) que lê diretivas e decide COMO executar.
3.  **Execução (Execution)**: Scripts Python determinísticos que FAZEM o trabalho.

## Conventions
-   **Scripts**: Python 3.x, localizados em `execution/`. Devem ser modulares, bem documentados e idempotentes quando possível.
-   **Diretivas**: Markdown, localizados em `directives/`. Devem ser claros, passo-a-passo.
-   **Temporários**: Tudo que for arquivo transitório deve ir para `.tmp/`.
-   **Logs/Saída**: Scripts devem imprimir logs claros para stdout/stderr que o agente possa ler.

## Glossary
-   **SOP**: Standard Operating Procedure (Procedimento Operacional Padrão).
-   **Determinístico**: Código que sempre produz o mesmo resultado para a mesma entrada (sem alucinação).

## Integrations
-   Modelos de IA (via API).
-   Ferramentas locais de sistema de arquivos.

## Forbidden Patterns
-   ❌ **Lógica de Negócio na IA**: Não confie na IA para calcular ou processar dados complexos manualmente. Use scripts.
-   ❌ **Credenciais Hardcoded**: NUNCA coloque senhas ou chaves de API no código. Use `.env`.
-   ❌ **Arquivos Persistentes na Raiz**: Mantenha a raiz limpa. Use pastas apropriadas.
