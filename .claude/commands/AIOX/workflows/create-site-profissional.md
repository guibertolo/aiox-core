# Criar Site Profissional

Workflow completo para criar sites de profissionais liberais (advogados, medicos, dentistas, contadores, psicologos, etc.) usando o pipeline validado no projeto site-gislaine.

## Documentos de Referencia

Antes de iniciar, leia estes 3 templates:

1. **Workflow (pipeline de 20 etapas):** `docs/workflow-template-sites-profissionais.md`
2. **Boilerplate tecnico (stack, componentes, paletas):** `docs/boilerplate-sites-profissionais.md`
3. **Story templates (17 stories em 6 epics):** `docs/story-templates-sites-profissionais.md`

## Dados necessarios do cliente

Antes de comecar, coletar:
- Nome completo + registro profissional (OAB, CRM, CRO, CRP, CRC)
- Endereco do consultorio/escritorio
- WhatsApp + email profissional
- Areas de atuacao / especialidades
- Instagram profissional
- Foto (pode ser depois)
- Logo (pode ser depois)

## Pipeline Resumido (20 etapas)

```
FASE 1 — PESQUISA (2-3h)
  @analyst → pesquisa de mercado + brainstorm do segmento

FASE 2 — PLANEJAMENTO (2-3h)
  @pm → PRD com requisitos
  @architect + @sm → arquitetura + stories (paralelo)
  @po → validacao das stories

FASE 3 — IMPLEMENTACAO (8-12h)
  @dev → Epic 1: setup + home
  @ux → guia visual (paralelo)
  @dev → Epic 2: paginas institucionais
  @dev → Epic 3: servicos/areas + Epic 4: blog

FASE 4 — QUALIDADE (3-4h)
  @qa → QA completo
  Cyber Chief → auditoria seguranca
  @dev → fixes
  @architect → auditoria SEO
  @dev → fixes SEO
  Lighthouse → medicao (meta: 95+/100/100/100)

FASE 5 — ADMIN + DEPLOY (2-3h)
  @dev → painel admin (/admin)
  @devops → deploy Vercel

FASE 6 — COMERCIAL (2-3h)
  @pm → apresentacao + precificacao + contrato
  Traffic Masters + Copy Chief → estrategia marketing + criativos
  @pm → apresentacao WhatsApp para o cliente
```

## Como executar

1. Pergunte ao usuario: nome, profissao, cidade, especialidades
2. Faca find/replace nos templates:
   - `{PROFISSAO}` → Advogado, Medico, Dentista, etc.
   - `{NOME}` → Dr. Fulano, Dra. Fulana
   - `{CIDADE}` → Sao Paulo, Campinas, etc.
   - `{CONSELHO}` → OAB, CRM, CRO, CRP, CRC
3. Siga o pipeline de 20 etapas na ordem
4. Use paralelismo onde indicado (Fases 2 e 3)
5. Lighthouse deve atingir 95+ em todas as categorias

## Precificacao Sugerida

| Tier | Escopo | Valor |
|------|--------|-------|
| Basico | Home + Sobre + Contato + 3 servicos | R$ 2.500 |
| Padrao | 25 pags + blog + SEO + seguranca | R$ 6.500 |
| Premium | Padrao + admin + marketing | R$ 9.000 |
| Premium + Admin | Tudo + painel admin + criativos | R$ 12.000 |

## Projeto Referencia

Site real validado com este workflow: https://site-gislaine.vercel.app
Codigo fonte: `apps/site-gislaine/`
Lighthouse: Performance 96, Accessibility 100, Best Practices 100, SEO 100
