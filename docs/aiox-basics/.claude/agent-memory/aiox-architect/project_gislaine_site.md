---
name: Site Dra. Gislaine Rodrigues — Contexto de Arquitetura
description: Arquitetura tecnica completa para site profissional de advogada de familia; stack, rotas, design tokens e SEO definidos
type: project
---

Stack aprovada: Next.js 15 (App Router) + TypeScript 5 + Tailwind 3.4 + MDX nativo (gray-matter + next-mdx-remote) + Vercel.

**Why:** PRD pedia "Next.js 16" (inexistente) e Contentlayer (deprecado); ajustes feitos para garantir estabilidade.

**How to apply:** Toda implementacao deve seguir a arquitetura em `C:\Users\guiro\OneDrive\Documentos\Claude\docs\architecture-site-gislaine.md`. Nao usar Contentlayer, next-seo ou Google Fonts.

Decisoes chave:
- SSG para todas as paginas publicas (Vercel Edge CDN)
- Fontes auto-hospedadas em /public/fonts/ (conformidade LGPD)
- GA4 condicional ao consentimento do cookie banner (LGPD Art. 7)
- Schema markup JSON-LD: LocalBusiness + Attorney + FAQPage + Article
- Honeypot anti-spam (sem CAPTCHA — UX mobile)
- Numero OAB "456.789" e provisorio — confirmar antes do launch

Arquivos de referencia:
- PRD: `C:\Users\guiro\OneDrive\Documentos\Claude\docs\prd-site-gislaine-rodrigues.md`
- Arquitetura: `C:\Users\guiro\OneDrive\Documentos\Claude\docs\architecture-site-gislaine.md`
