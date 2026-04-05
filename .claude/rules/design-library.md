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

### Efeitos disponiveis (18 tutoriais + exemplos praticos)

**Layout & Scroll:**
- **Masonry Grid** — lojas, marketplaces, portfolios
- **Reveal on Scroll** — landing pages, conteudo longo
- **Parallax** — hero sections, banners
- **Glide** — transicoes suaves entre imagens
- **Progress** — indicadores, loading, scale/clip-path
- **Footer Shifting** — footers com parallax/revelacao
- **Lerp** — distorcao por velocidade de scroll

**Texto & Tipografia:**
- **Kinetic Text** — headlines, branding
- **Text with Progress** — revelacao palavra por palavra
- **Split** — poster tipografico, char/word animation

**Interacao & Cursor:**
- **Cursor** — cursor customizado com media ao hover
- **Magnetic** — cards que seguem cursor com rotacao 3D

**Formularios:**
- **Forms 1 & 2** — formularios com micro-interacoes

**Outros:**
- **Sequence** — onboarding, timelines, slideshow
- **Position Tracker** — visualizacao artistica de posicao

### Regra de uso

Seguir IDS: **REUSE > ADAPT > CREATE**
1. Consultar `docs/library/layouts/string-tune/` antes de criar do zero
2. Adaptar CSS (tokens, cores, fontes do projeto)
3. Criar novo apenas se nenhum efeito existente atende
