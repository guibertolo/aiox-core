# Dev Agent Memory (Dex)

## Active Patterns
<!-- Current, verified patterns used by this agent -->

### Key Patterns
- CommonJS (`require`/`module.exports`), NOT ES Modules
- ES2022, Node.js 18+, 2-space indent, single quotes
- Absolute imports always (never relative `../`)
- kebab-case for files, PascalCase for components
- Jest 30.2.0 for testing, `npm test` to run

### Project Structure
- `.aiox-core/core/` — Core modules (synapse, session, code-intel, orchestration)
- `.aiox-core/development/` — Agents, tasks, templates, scripts
- `.aiox-core/infrastructure/` — CI/CD, git detection, project-status
- `tests/` — Test suites (mirrors source structure)
- `docs/stories/` — Story files (active development)

### Git Rules
- NEVER push — delegate to @devops
- Conventional commits: `feat:`, `fix:`, `docs:`, `test:`, `chore:`, `refactor:`
- Reference story: `feat: implement feature [Story NOG-18]`

### Design/Effects Library — StringTune
- 18 efeitos em `docs/library/layouts/string-tune/` + exemplos praticos (exemplo-*.html)
- Modulos: Masonry, Parallax, Reveal, Glide, Lerp, Cursor, Magnetic, Split, Progress, Form, Sequence, PositionTracker
- CSS-First: animacoes via CSS custom properties (`--progress`, `--lerp`, `--magnetic-x/y`) — JS so injeta
- Ativacao via atributos HTML: `string="modulo"` + atributos especificos, zero config JS
- Init: `StringTune.StringTune.getInstance() → .use(StringTune.StringModulo) → .start(0)`
- CDN: `https://unpkg.com/@fiddle-digital/string-tune@1.1.53/dist/index.js`
- Grid base: 6 col mobile / 14 col desktop, easing `cubic-bezier(0.86, 0, 0.31, 1)`
- Consultar @ux para decisoes de design, @dev pode integrar diretamente

### Common Gotchas
- Windows paths: use forward slashes in code, bash shell not cmd
- `fs.existsSync` for sync checks, `fs.promises` for async
- atomicWriteSync from `.aiox-core/core/synapse/utils/atomic-write` for safe file writes
- CodeRabbit runs in WSL, not Windows directly

### Story Workflow
- Read task → Implement → Write tests → Validate → Mark checkbox [x]
- ONLY update: checkboxes, Debug Log, Completion Notes, Change Log, File List
- NEVER modify: Status, Story, AC, Dev Notes, Testing sections

## Promotion Candidates
<!-- Patterns seen across 3+ agents — candidates for CLAUDE.md or .claude/rules/ -->
<!-- Format: - **{pattern}** | Source: {agent} | Detected: {YYYY-MM-DD} -->
- **NEVER push — delegate to @devops** | Source: dev, analyst, sm, data-engineer, ux, qa (6 agents) | Detected: 2026-02-22 | Status: Already elevated to `.claude/rules/agent-authority.md`
- **CommonJS module system (require/module.exports)** | Source: dev, analyst, sm, data-engineer, ux, architect (6 agents) | Detected: 2026-02-22 | Status: Already in CLAUDE.md (Padroes de Codigo)
- **Conventional commits format** | Source: dev, devops, analyst, sm, data-engineer, ux (6 agents) | Detected: 2026-02-22 | Status: Already in CLAUDE.md (Convencoes Git)
- **kebab-case for files** | Source: dev, analyst, sm, data-engineer, ux (5 agents) | Detected: 2026-02-22 | Status: Already in CLAUDE.md (Padroes de Codigo)

## Archived
<!-- Patterns no longer relevant — kept for history -->
<!-- Format: - ~~{pattern}~~ | Archived: {YYYY-MM-DD} | Reason: {reason} -->
