# Workflow Execution — Detailed Rules

## Task-First Principle

**Workflows são compostos por tasks conectadas, não por agentes conectados.** Cada task define seus inputs, outputs, pre/post-conditions e execution modes. Os agentes listados abaixo são os **executores padrão** de cada task — mas a sequência, as regras e as dependências vêm das definições de tasks em `.aiox-core/development/tasks/`.

Uma task validada é lei: deve ser executada conforme configurada, com todas as suas dependências respeitadas, independente de quem a executa (agent, worker, clone ou humano).

---

## Pipeline Idea-to-Done (MASTER WORKFLOW)

**O workflow completo de 29 steps + 7 gates que governa todo o ciclo de vida.**
**Definicao YAML:** `.aiox-core/development/workflows/idea-to-done-pipeline.yaml`

```
FASE 0: RESEARCH (paralelo)         → 3 steps + GATE-0
  step-01 Market Research     (@analyst)
  step-02 Technical Research  (@analyst)    ── GATE-0 (3 categorias)
  step-03 Competitive Research(@analyst)
                                        │
FASE 1: PRODUCT BRIEF (sequencial)  → 5 steps + GATE-1
  step-04 Understand Intent   (@pm)
  step-05 Contextual Discovery(@pm)     ← consome research reports
  step-06 Guided Elicitation  (@pm)
  step-07 Draft Brief         (@pm)
  step-08 Brief Review        (@pm)
  GATE-1 (5 categorias: intent, discovery, elicitation, draft, review)
                                        │
FASE 2: SPEC PIPELINE (complexity-routed) → ate 8 steps + GATE-2
  step-09 Gather Requirements (@pm)
  step-10 Assess Complexity   (@architect) → SIMPLE/STANDARD/COMPLEX
  step-11 Research Dependencies(@analyst)  ← 2o round de research
  step-12 Write Spec          (@pm)        Art. IV: No Invention
  step-13 Critique Spec       (@qa)        5-dim gate
  step-14 Revise Spec         (@pm)        [COMPLEX only]
  step-15 Final Critique      (@qa)        [COMPLEX only]
  step-16 Implementation Plan (@architect)
  GATE-2 (8 categorias, skip rules por complexidade)
                                        │
FASE 3: EPIC + STORIES              → 3 steps + GATE-3
  step-17 Create Epic         (@pm)
  step-18 Create Stories      (@sm)
  step-19 Validate Stories    (@po)        10-point checklist
  GATE-3 (3 categorias: epic, stories, validation)
                                        │
FASE 4: IMPLEMENTACAO (por story)    → 4 steps + GATE-4
  step-20 Setup Environment   (@dev)
  step-21 Implement ACs       (@dev)
  step-22 Self-Verify         (@dev)       lint+typecheck+tests+build
  step-23 Dev Complete        (@dev)
  GATE-4 (4 categorias) ═══ FORK POINT
                                        │
FASE 5: QUALITY PARALELA             → 3 steps paralelos + GATE-5
  step-24 QA Review           (@qa)        worktree qa/{story}
  step-25 Docs                (@tech-writer) worktree docs/{story}  ── GATE-5
  step-26 E2E Tests           (@qa)        worktree e2e/{story}
                                        │
FASE 6: CLOSE                        → 3 steps + GATE-6
  step-27 Merge & Push        (@devops)
  step-28 Release             (@devops)
  step-29 Close Story         (@devops)
  GATE-6 (3 categorias: merge, release, closure)
```

### Workflow Selection: Entrada no Pipeline

| Situacao | Entra na Fase | Steps executados |
|----------|---------------|-----------------|
| Ideia nova do zero | Fase 0 | Todos (29 steps) |
| Requisitos ja claros | Fase 2 | Steps 9-29 (21 steps) |
| Epic ja existe | Fase 3 | Steps 17-29 (13 steps) |
| Stories ja validadas | Fase 4 | Steps 20-29 (10 steps) |
| Bug fix simples (YOLO) | Fase 4 | Steps 20-23 + 27 (5 steps) |
| QA encontrou issues | QA Loop | Iterativo dentro da Fase 5 |

---

## 4 Component Workflows

Os workflows abaixo sao componentes do Pipeline Idea-to-Done. Podem ser executados isoladamente quando a entrada no pipeline nao e pela Fase 0.

### 1. Story Development Cycle (SDC) — PRIMARY

**Full 4-phase workflow for all development work.**

#### Phase 1: Create (@sm)
- **Task:** `create-next-story.md`
- **Inputs:** PRD sharded, epic context
- **Output:** `{epicNum}.{storyNum}.story.md`
- **Status:** Draft

#### Phase 2: Validate (@po)
- **Task:** `validate-next-story.md`
- **10-point checklist** (see `story-lifecycle.md`)
- **Decision:** GO (>=7) or NO-GO (required fixes listed)

#### Phase 3: Implement (@dev)
- **Task:** `dev-develop-story.md`
- **Modes:** Interactive / YOLO / Pre-Flight
- **CodeRabbit:** Self-healing max 2 iterations
- **Status:** Ready → InProgress

#### Phase 4: QA Gate (@qa)
- **Task:** `qa-gate.md`
- **7 quality checks** (see `story-lifecycle.md`)
- **Decision:** PASS / CONCERNS / FAIL / WAIVED
- **Status:** InProgress → InReview → Done

---

### 2. QA Loop — ITERATIVE REVIEW

**Automated review-fix cycle after initial QA gate.**

```
@qa review → verdict → @dev fixes → re-review (max 5)
```

**Commands:**
- `*qa-loop {storyId}` — Start loop
- `*qa-loop-review` — Resume from review
- `*qa-loop-fix` — Resume from fix
- `*stop-qa-loop` — Pause, save state
- `*resume-qa-loop` — Resume from state
- `*escalate-qa-loop` — Force escalation

**Config:**
- Max iterations: 5 (`autoClaude.qaLoop.maxIterations`)
- Status file: `qa/loop-status.json`

**Verdicts:**
- APPROVE → Complete, mark Done
- REJECT → @dev fixes, re-review
- BLOCKED → Escalate immediately

**Escalation triggers:**
- `max_iterations_reached`
- `verdict_blocked`
- `fix_failure`
- `manual_escalate`

---

### 3. Spec Pipeline — PRE-IMPLEMENTATION

**Transform informal requirements into executable spec.**

| Phase | Agent | Output | Skip If |
|-------|-------|--------|---------|
| 1. Gather | @pm | `requirements.json` | Never |
| 2. Assess | @architect | `complexity.json` | source=simple |
| 3. Research | @analyst | `research.json` | SIMPLE class |
| 4. Write Spec | @pm | `spec.md` | Never |
| 5. Critique | @qa | `critique.json` | Never |
| 6. Plan | @architect | `implementation.yaml` | If APPROVED |

**Complexity Classes:**

| Score | Class | Phases |
|-------|-------|--------|
| <= 8 | SIMPLE | gather → spec → critique (3) |
| 9-15 | STANDARD | All 6 phases |
| >= 16 | COMPLEX | 6 phases + revision cycle |

**5 Complexity Dimensions (scored 1-5):**
- **Scope:** Files affected
- **Integration:** External APIs
- **Infrastructure:** Changes needed
- **Knowledge:** Team familiarity
- **Risk:** Criticality level

**Critique Verdicts:**

| Verdict | Average Score | Next Step |
|---------|--------------|-----------|
| APPROVED | >= 4.0 | Plan (Phase 6) |
| NEEDS_REVISION | 3.0-3.9 | Revise (Phase 5b) |
| BLOCKED | < 3.0 | Escalate to @architect |

**Constitutional Gate (Article IV — No Invention):**
Every statement in spec.md MUST trace to FR-*, NFR-*, CON-*, or research finding. NO invented features.

---

### 4. Brownfield Discovery — LEGACY ASSESSMENT

**10-phase technical debt assessment for existing codebases.**

**Data Collection (Phases 1-3):**
- Phase 1: @architect → `system-architecture.md`
- Phase 2: @data-engineer → `SCHEMA.md` + `DB-AUDIT.md` (if DB exists)
- Phase 3: @ux-design-expert → `frontend-spec.md`

**Draft & Validation (Phases 4-7):**
- Phase 4: @architect → `technical-debt-DRAFT.md`
- Phase 5: @data-engineer → `db-specialist-review.md`
- Phase 6: @ux-design-expert → `ux-specialist-review.md`
- Phase 7: @qa → `qa-review.md` (QA Gate: APPROVED | NEEDS WORK)

**Finalization (Phases 8-10):**
- Phase 8: @architect → `technical-debt-assessment.md` (final)
- Phase 9: @analyst → `TECHNICAL-DEBT-REPORT.md` (executive)
- Phase 10: @pm → Epic + stories ready for development

**QA Gate (Phase 7):**
- **APPROVED:** All debits validated, no critical gaps, dependencies mapped
- **NEEDS WORK:** Gaps not addressed, return to Phase 4

---

## Workflow Selection Guide

| Situation | Workflow |
|-----------|---------|
| New story from epic | Story Development Cycle |
| QA found issues, need iteration | QA Loop |
| Complex feature needs spec | Spec Pipeline → then SDC |
| Joining existing project | Brownfield Discovery |
| Simple bug fix | SDC only (YOLO mode) |
