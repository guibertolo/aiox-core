# UX Design Expert Agent Memory (Uma)

## Active Patterns
<!-- Current, verified patterns used by this agent -->

### Key Patterns
- CommonJS (`require`/`module.exports`), NOT ES Modules
- ES2022, Node.js 18+, 2-space indent, single quotes
- kebab-case for files, PascalCase for components

### Project Structure
- `.aiox-core/core/` — Core modules
- `docs/` — Documentation and design specs
- `packages/` — Shared packages

### Git Rules
- NEVER push — delegate to @devops
- Conventional commits: `docs:` for design specs, `feat:` for components

### Design Conventions
- Atomic Design principles (atoms → molecules → organisms → templates → pages)
- Design tokens for consistent theming
- WCAG 2.1 AA compliance target

### Effects & Animation Library — StringTune (Fiddle Digital)
**Local:** `docs/library/layouts/string-tune/`
**Pacote:** `@fiddle-digital/string-tune` v1.1.53 (CDN: unpkg)
**Filosofia:** CSS-First, JS-Light — animacoes performaticas com minimo JS
**Fonte:** https://string-tune.fiddle.digital/skill-hub/

**Efeitos disponiveis (usar PROATIVAMENTE quando relevante):**

| Efeito | Arquivo | Quando usar |
|--------|---------|-------------|
| Masonry Grid Orchestrated | `tutorial-02-masonry-orchestrated.html` | Lojas, marketplaces, portfolios, galerias |
| Reveal on Scroll | `tutorial-01-reveal-on-scroll.html` | Qualquer pagina com conteudo longo, landing pages |
| Parallax | `tutorial-02-parallax.html` | Hero sections, banners, storytelling visual |
| Glide | `tutorial-05-glide.html` | Transicoes suaves entre secoes |
| Kinetic Text | `tutorial-03-kinetic-text-1.html` | Headlines, titulos hero, branding |
| Text with Progress | `tutorial-01-text-w-progress-1.html` | Loading states, progresso de leitura |
| Progress Bar | `tutorial-03-progress.html` | Indicadores de progresso, steps |
| Footer Shifting | `tutorial-01-footer-shifting.html` | Footers com efeito parallax/revelacao |
| Sequence Animation | `tutorial-16-sequence.html` | Onboarding, apresentacoes, timelines |
| Form 1 | `tutorial-11-form-1.html` | Formularios estilizados com micro-interacoes |
| Form 2 | `tutorial-12-form-2.html` | Variante de formulario com efeitos diferentes |
| Xmas Tree | `tutorial-01-xmas-tree.html` | Decorativo/showcase (referencia tecnica) |

**Como integrar:**
1. Ler o HTML do efeito desejado em `docs/library/layouts/string-tune/`
2. Extrair CSS relevante (custom properties, animations, grid)
3. Adaptar ao projeto (cores via design tokens, fontes do projeto)
4. Incluir StringTune CDN se precisar do JS: `<script src="https://unpkg.com/@fiddle-digital/string-tune@1.1.53/dist/index.js"></script>`
5. CSS custom properties principais: `--progress`, `--spotlight-angle`, `--spotlight-distance`
6. Grid system: `--g-columns` (6 mobile / 14 desktop), `--g-gap`, `--g-margin`
7. Easing: `cubic-bezier(0.86, 0, 0.31, 1)` (principal), `cubic-bezier(0.35, 0.35, 0, 1)` (secundaria)

**REGRA:** Quando criando sites/lojas/portfolios, SEMPRE consultar esta biblioteca antes de implementar animacoes do zero. Reutilizar > Adaptar > Criar.

## Promotion Candidates
<!-- Patterns seen across 3+ agents — candidates for CLAUDE.md or .claude/rules/ -->
<!-- Format: - **{pattern}** | Source: {agent} | Detected: {YYYY-MM-DD} -->

## Archived
<!-- Patterns no longer relevant — kept for history -->
<!-- Format: - ~~{pattern}~~ | Archived: {YYYY-MM-DD} | Reason: {reason} -->
