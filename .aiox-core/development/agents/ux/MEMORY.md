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
| Lerp (Scroll Speed) | `tutorial-04-lerp.html` | Distorcao de imagem por velocidade de scroll, clip-path dinamico |
| Cursor Interativo | `tutorial-06-cursor.html` | Menu com cursor customizado que mostra media ao hover |
| Magnetic | `tutorial-07-magnetic.html` | Cards/imagens que seguem o cursor com rotacao 3D, portfolios |
| Split Text | `tutorial-10-split.html` | Poster tipografico, split por char/word, animacao de letras |
| Position Tracker | `tutorial-15-position-tracker.html` | Visualizacao artistica de posicao, SVG + tracking |
| Xmas Tree | `tutorial-01-xmas-tree.html` | Decorativo/showcase (referencia tecnica) |

**Como a lib funciona (conhecimento tecnico):**
- Ativacao via atributos HTML, ZERO JS manual: `string="modulo"` no elemento
- Modulos: `StringLazy`, `StringMasonry`, `StringParallax`, `StringInput`
- Init: `const st = StringTune.StringTune.getInstance(); st.use(StringTune.StringModulo); st.start(0);`
- `--progress` (0→1): CSS custom property injetada automaticamente conforme scroll
- CSS faz TODA a animacao (clip-path, scale, translate, opacity) — JS so injeta `--progress`
- Eventos JS: `stringTune.on('masonry:shuffle:start', callback)` para hooks

**Atributos HTML por modulo:**
- Lazy: `string="lazy" string-lazy="url"` — carrega imagens on-demand
- Masonry: `string="masonry" string-masonry-cols="2|768:3|1024:4" string-masonry-mode="auto|manual"`
- Masonry items: `string-masonry-position-time="1200" string-masonry-size-easing="cubic-bezier(0.69,0,0,1)"`
- Parallax: `string="parallax" string-parallax="0.75"` (0=fixo, 1=normal, negativo=contra)
- Reveal: `string string-repeat` no `<figure>` — classe `-inview` adicionada auto
- Input/Form: `string-input="group:nome"` para validacao inline com estados `-error`/`-valid`
- Lerp: `string="lerp"` — injeta `--lerp` (velocidade scroll), usar em clip-path/scale CSS
- Cursor: `string="cursor" string-cursor="media" string-cursor-media="url"` — cursor mostra imagem
- Magnetic: `string="magnetic" string-radius="800" string-strength="0.1"` — injeta `--magnetic-x/y`
- Split: `string="split" string-split="char|word"` — divide texto em chars/words animaveis
- Position Tracker: `StringPositionTracker` — tracker visual de posicao com SVG
- Glide: `string="glide" string-glide="0.0-1.0"` — deslize de imagem ao scroll

**Padroes CSS reutilizaveis (extrair dos arquivos):**
- Reveal: `clip-path: polygon(50% 50%,...) → polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)`
- Progress scale: `scale: calc(0.5 + var(--progress) * 0.5)`
- Footer shift: `opacity: calc(1 - var(--progress))` + `translate3d(0, calc(-50% + 50% * var(--progress)), 0)`
- Word reveal: `--word-progress: clamp(0, (progress - word_turn) / word_step, 1)`
- Sequence: estados `.-entering` (clip small) → `.-active` (full) → `.-leaving` (fade)

**Grid base (presente em TODOS os arquivos):**
- Mobile: 6 colunas, `--g-margin: calc(--g-gap * 2)`
- Desktop (1024px+): 14 colunas, `--g-margin: calc(--g-gap * 4)`
- Escala tipografica modular (ratio 1.25): `--mm` → `--m` → `--p` → `--h6..h0` → `--large`
- Easing principal: `cubic-bezier(0.86, 0, 0.31, 1)`, secundaria: `cubic-bezier(0.35, 0.35, 0, 1)`

**Como integrar num projeto:**
1. Ler o HTML do efeito em `docs/library/layouts/string-tune/`
2. Copiar o CSS relevante (custom properties, animacoes, grid positioning)
3. Adaptar cores/fontes ao design system do projeto
4. Incluir CDN: `<script src="https://unpkg.com/@fiddle-digital/string-tune@1.1.53/dist/index.js"></script>`
5. Adicionar atributos `string="modulo"` nos elementos HTML
6. Init JS minimo: `getInstance() → use(Modulo) → start(0)`

**REGRA:** Quando criando sites/lojas/portfolios, SEMPRE consultar esta biblioteca antes de implementar animacoes do zero. Reutilizar > Adaptar > Criar.

## Promotion Candidates
<!-- Patterns seen across 3+ agents — candidates for CLAUDE.md or .claude/rules/ -->
<!-- Format: - **{pattern}** | Source: {agent} | Detected: {YYYY-MM-DD} -->

## Archived
<!-- Patterns no longer relevant — kept for history -->
<!-- Format: - ~~{pattern}~~ | Archived: {YYYY-MM-DD} | Reason: {reason} -->
