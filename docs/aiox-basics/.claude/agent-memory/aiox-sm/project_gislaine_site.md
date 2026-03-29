---
name: projeto-site-gislaine-rodrigues
description: Contexto do projeto site da Dra. Gislaine Rodrigues — stories criadas, stack, restricoes OAB/LGPD
type: project
---

Site profissional da Dra. Gislaine Rodrigues, advogada especializada em Direito de Familia em Sao Bernardo do Campo/SP.

**PRD:** `C:\Users\guiro\OneDrive\Documentos\Claude\docs\prd-site-gislaine-rodrigues.md`
**Stories:** `C:\Users\guiro\OneDrive\Documentos\Claude\docs\stories\active\epics-1-2-stories.md`

**Stack:** Next.js 16 (App Router) + Tailwind CSS + MDX + Vercel

**Epics e stories criadas (2026-03-28):**
- Epic 1: Stories 1.1 (Setup), 1.2 (Design System), 1.3 (Hero Home), 1.4 (Secoes Home) — todas Draft
- Epic 2: Stories 2.1 (Sobre), 2.2 (Contato), 2.3 (FAQ), 2.4 (Nao Atendo + LGPD) — todas Draft

**Restricoes criticas (CON-01 OAB Provimento 205/2021):**
- PROIBIDO: tabela de preco, promessas de resultado, "casos ganhos", superlativos comparativos
- PERMITIDO: site informativo, blog, depoimentos focados em atendimento (nao resultado), WhatsApp Business

**LGPD (CON-02):** Banner cookies + checkbox no formulario + pagina de politica de privacidade obrigatorios.

**Por que:** Projeto externo (nao AIOX framework), sem .aiox-core instalado. CodeRabbit N/A — quality gates via Lighthouse + lint/typecheck.

**How to apply:** Ao criar stories dos Epics 3-6, manter consistencia com as convencoes ja definidas (lib/config/site.ts, lib/data/, componentes em components/sections/ e components/ui/). Sempre verificar conformidade OAB antes de aprovar conteudo.
