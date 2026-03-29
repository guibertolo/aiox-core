# Brownfield Discovery

Execute o workflow de Brownfield Discovery para avaliar um projeto existente.

## Instrucoes

1. Leia o workflow completo: `.aiox-core/development/workflows/brownfield-discovery.yaml`
2. Leia a task principal: `.aiox-core/development/tasks/analyze-brownfield.md`
3. Siga a sequencia de 10 fases do workflow

## Workflow: 10 Fases

### Coleta de Dados (Fases 1-3) — podem rodar em paralelo
- **Fase 1** `@architect` → Documenta arquitetura do sistema (`docs/architecture/system-architecture.md`)
- **Fase 2** `@data-engineer` → Audita banco de dados (`SCHEMA.md` + `DB-AUDIT.md`)
- **Fase 3** `@ux-design-expert` → Documenta frontend (`frontend-spec.md`)

### Draft e Validacao (Fases 4-7)
- **Fase 4** `@architect` → Analisa divida tecnica draft (`technical-debt-DRAFT.md`)
- **Fase 5** `@data-engineer` → Review especialista DB (`db-specialist-review.md`)
- **Fase 6** `@ux-design-expert` → Review especialista UX (`ux-specialist-review.md`)
- **Fase 7** `@qa` → QA Gate: APPROVED | NEEDS WORK

### Finalizacao (Fases 8-10)
- **Fase 8** `@architect` → Assessment final (`technical-debt-assessment.md`)
- **Fase 9** `@analyst` → Relatorio executivo (`TECHNICAL-DEBT-REPORT.md`)
- **Fase 10** `@pm` → Epic + stories prontas para desenvolvimento

## Como executar

Ative o `@aiox-master` (Orion) e execute:
```
@aiox-master
*run-workflow brownfield-discovery
```

Ou execute fase por fase ativando cada agente individualmente.

## Pre-requisitos

- Projeto existente com codigo fonte acessivel
- Acesso ao banco de dados (se houver)
- Documentacao existente (se houver)

## Quando usar

- Entrando num projeto que voce nao criou
- Avaliando divida tecnica de um projeto legado
- Migrando de Lovable, v0.dev ou outra plataforma
- Auditoria completa antes de refatoracao major
