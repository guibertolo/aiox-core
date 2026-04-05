---
paths:
  - "docs/library/**"
  - "*.html"
  - "*.css"
  - "*.tsx"
  - "*.jsx"
  - "apps/**/components/**"
  - "packages/**/components/**"
---

# Design & Effects Library

## StringTune Effects (Fiddle Digital)

**Local:** `docs/library/layouts/string-tune/` (12 efeitos prontos)
**Pacote:** `@fiddle-digital/string-tune` v1.1.53

Antes de implementar animacoes, efeitos de scroll, layouts masonry, parallax ou formularios estilizados, SEMPRE consultar a biblioteca local primeiro.

### Efeitos disponiveis

- **Masonry Grid** — lojas, marketplaces, portfolios
- **Reveal on Scroll** — landing pages, conteudo longo
- **Parallax** — hero sections, banners
- **Glide** — transicoes suaves
- **Kinetic Text** — headlines, branding
- **Progress** — indicadores, loading
- **Footer Shifting** — footers com parallax
- **Sequence** — onboarding, timelines
- **Forms 1 & 2** — formularios com micro-interacoes

### Regra de uso

Seguir IDS: **REUSE > ADAPT > CREATE**
1. Consultar `docs/library/layouts/string-tune/` antes de criar do zero
2. Adaptar CSS (tokens, cores, fontes do projeto)
3. Criar novo apenas se nenhum efeito existente atende
