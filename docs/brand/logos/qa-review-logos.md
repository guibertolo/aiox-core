# QA Review -- Logos SVG "Siga Bem"

> **Reviewer:** Quinn (QA Agent)
> **Data:** 2026-03-28
> **Documentos de referencia:** `docs/brand/siga-bem-brand-identity.md`, `docs/ux-guide-cegonheiros.md`
> **Veredicto global:** **NEEDS_WORK** -- 14 issues encontradas (3 FAIL, 5 CONCERNS, 6 observacoes)

---

## Resumo Executivo

| Logo | Veredicto | Issues Criticas | Issues Moderadas |
|------|-----------|-----------------|------------------|
| `siga-bem-logo-horizontal.svg` | **CONCERNS** | 0 | 3 |
| `siga-bem-logo-full.svg` | **FAIL** | 2 | 2 |
| `siga-bem-logo-dark.svg` | **CONCERNS** | 0 | 2 |
| `siga-bem-logo-icon.svg` | **CONCERNS** | 0 | 2 |
| `siga-bem-favicon.svg` | **FAIL** | 1 | 1 |
| `preview.html` | **PASS** | 0 | 1 |

---

## 1. siga-bem-logo-horizontal.svg -- CONCERNS

### 1.1 Tecnico SVG

| Check | Status | Detalhe |
|-------|--------|---------|
| ViewBox | OK | `0 0 500 80` -- proporcional, adequado para uso horizontal |
| Codigo limpo | OK | Sem metadata de editores, sem camadas desnecessarias |
| Escalabilidade | OK | Formas simples, escala bem |
| Cores hex | OK | `#1B3A4B` (primary), `#2D6A8F` (secondary), `#6B8A9E` (muted) |
| Elementos redundantes | OK | Estrutura enxuta |

### 1.2 Acessibilidade

| Check | Status | Detalhe |
|-------|--------|---------|
| Contraste texto principal | OK | `#1B3A4B` sobre branco = 10.2:1 (WCAG AAA) |
| Contraste "Bem" | OK | `#2D6A8F` sobre branco = 4.8:1 (WCAG AA para texto grande) |
| Contraste tagline | **CONCERN** | `#6B8A9E` sobre branco = ~3.7:1 -- FALHA WCAG AA para texto pequeno (11px). Ratio minimo necessario: 4.5:1 |
| aria-label / title | **CONCERN** | Ausente. SVG nao possui `<title>` nem `role="img"` com `aria-label` |
| Daltonismo | OK | Nao depende exclusivamente de cor para comunicar informacao |

### 1.3 Brand Alignment

| Check | Status | Detalhe |
|-------|--------|---------|
| Conceito C (pin + cegonha) | **CONCERN** | O icone usa um **quadrado arredondado** com caminhao, NAO o pin de localizacao recomendado pelo Conceito C. O brand identity especifica: "Contorno externo em formato de pin de mapa/localizacao". O icone atual se assemelha mais ao Conceito B (badge/escudo) |
| Paleta | OK | `#1B3A4B` e `#2D6A8F` corretos |
| Tipografia | OK | Inter font-weight 800 para "Siga" (spec pede Bold/700 mas 800 e aceitavel como ExtraBold) |
| Tagline | OK | "GESTAO DE FROTAS DE CEGONHA" -- alinhado com opcao alternativa 1 do brand identity |
| Acento verde | **AUSENTE** | Conceito C especifica `#2D6A4F` (success/verde) como acento na base do pin. Ausente em todas as versoes |
| Peso tipografico | NOTA | Brand identity especifica "Siga" em **Inter Bold** e "Bem" em **Inter Medium**. Ambos usam weight 800 (ExtraBold). "Bem" deveria ter peso menor para criar o ritmo visual descrito |

### 1.4 Correcoes Necessarias

1. **[MEDIA]** Adicionar `<title>Siga Bem - Gestao de Frotas de Cegonha</title>` como primeiro filho do `<svg>` e `role="img"` no elemento raiz
2. **[MEDIA]** Aumentar contraste da tagline: mudar `#6B8A9E` para `#5A7A8E` (~4.5:1) ou aumentar font-size para 12px+ (tratado como texto grande)
3. **[ALTA]** Redesenhar icone como pin de localizacao conforme Conceito C, em vez de quadrado arredondado
4. **[BAIXA]** Considerar diferenciar peso de "Siga" (700) vs "Bem" (500) conforme brand spec
5. **[MEDIA]** Adicionar acento verde `#2D6A4F` na base do pin conforme Conceito C

---

## 2. siga-bem-logo-full.svg -- FAIL

### 2.1 Tecnico SVG

| Check | Status | Detalhe |
|-------|--------|---------|
| ViewBox | OK | `0 0 400 100` -- proporcional |
| Codigo limpo | OK | Sem metadata |
| Escalabilidade | **CONCERN** | Detalhes do caminhao no topo da estrada sao muito pequenos; em escala reduzida ficam indeciframeis |
| Cores hex | OK | Paleta correta |

### 2.2 Acessibilidade

| Check | Status | Detalhe |
|-------|--------|---------|
| Contraste texto | OK | `#1B3A4B` e `#2D6A8F` sobre branco -- adequados |
| Contraste tagline | **CONCERN** | Mesmo problema: `#6B8A9E` em 12px -- ratio ~3.7:1, falha AA para texto pequeno |
| aria-label / title | **FAIL** | Ausente |
| Daltonismo | OK | |

### 2.3 Brand Alignment

| Check | Status | Detalhe |
|-------|--------|---------|
| Conceito C | **FAIL** | Usa estrada em perspectiva com caminhao no topo -- este e o Conceito B ("Estrada Segura"), NAO o Conceito C recomendado. Falta completamente o pin de localizacao |
| Tagline | **FAIL** | Usa "GESTAO DE FROTAS" (incompleto). A tagline principal recomendada e "Sua frota no controle" ou alternativa "Gestao de cegonha do jeito certo". Se usar formato descritivo, deve ser "GESTAO DE FROTAS DE CEGONHA" (completo) |
| Paleta | OK | Cores corretas |
| Acento verde | AUSENTE | Nao ha `#2D6A4F` |

### 2.4 Correcoes Necessarias

1. **[CRITICA]** Redesenhar para usar pin de localizacao (Conceito C) em vez de estrada em perspectiva (Conceito B)
2. **[CRITICA]** Corrigir tagline para "GESTAO DE FROTAS DE CEGONHA" ou usar tagline oficial "Sua frota no controle"
3. **[MEDIA]** Adicionar `<title>` e `role="img"`
4. **[MEDIA]** Corrigir contraste da tagline

---

## 3. siga-bem-logo-dark.svg -- CONCERNS

### 3.1 Tecnico SVG

| Check | Status | Detalhe |
|-------|--------|---------|
| ViewBox | OK | `0 0 500 80` -- consistente com horizontal |
| Codigo limpo | OK | |
| Background | OK | `#0F1F2A` adequado para versao dark |
| Escalabilidade | OK | |

### 3.2 Acessibilidade

| Check | Status | Detalhe |
|-------|--------|---------|
| Contraste "Siga" | OK | `#FFFFFF` sobre `#0F1F2A` = ~16.5:1 (excelente) |
| Contraste "Bem" | OK | `#5BA3D9` sobre `#0F1F2A` = ~5.8:1 (WCAG AA) |
| Contraste tagline | **CONCERN** | `#6B8A9E` sobre `#0F1F2A` = ~3.9:1 -- FALHA WCAG AA para texto 11px |
| aria-label / title | **CONCERN** | Ausente |
| Daltonismo | OK | |

### 3.3 Brand Alignment

| Check | Status | Detalhe |
|-------|--------|---------|
| Conceito C | CONCERN | Mesmo problema -- quadrado arredondado em vez de pin |
| Cores | OK | `#5BA3D9` como accent e razoavel para modo escuro (variacao clara do secondary) |
| Icone invertido | OK | Background do icone `#2D6A8F` com elementos internos corretos |
| Tagline | OK | "GESTAO DE FROTAS DE CEGONHA" completo |
| Cor do background | OK | `#0F1F2A` e mais escuro que `#1B3A4B`, adequado. Brand spec sugere `#1B3A4B` ou `#0D1B2A`; `#0F1F2A` e aceitavel |

### 3.4 Correcoes Necessarias

1. **[MEDIA]** Adicionar `<title>` e `role="img"`
2. **[MEDIA]** Aumentar contraste da tagline: usar `#7D9CB0` ou similar (~4.5:1 sobre `#0F1F2A`)
3. **[ALTA]** Alinhar icone com Conceito C (pin de localizacao)

---

## 4. siga-bem-logo-icon.svg -- CONCERNS

### 4.1 Tecnico SVG

| Check | Status | Detalhe |
|-------|--------|---------|
| ViewBox | OK | `0 0 120 120` -- quadrado, adequado para app icon |
| Codigo limpo | OK | |
| Escalabilidade | **CONCERN** | Em 32x32, o caminhao dentro do circulo com estrada tersa muitos detalhes. A brand spec indica que abaixo de 24px deve simplificar para pin com retangulo interno |
| Forma base | NOTA | Usa circulo (`<circle>`), brand identity nao especifica circulo para app icon -- especifica fundo `#1B3A4B` com pin branco. Mas circulo e aceitavel para app icons (Android/iOS arredondam automaticamente) |

### 4.2 Acessibilidade

| Check | Status | Detalhe |
|-------|--------|---------|
| Contraste | OK | Branco sobre `#1B3A4B` = 10.2:1 |
| aria-label / title | **CONCERN** | Ausente |

### 4.3 Brand Alignment

| Check | Status | Detalhe |
|-------|--------|---------|
| Conceito C | **CONCERN** | Icon usa circulo com estrada em perspectiva + caminhao + texto "SB". Brand spec indica: "Usar icone solo (pin com caminhao)" e "Fundo #1B3A4B, icone branco, acento #2D6A4F (ponto verde)". O design atual nao segue a spec |
| Acento verde | AUSENTE | Deveria ter ponto verde `#2D6A4F` |
| Texto "SB" | NOTA | Nao especificado na brand spec para app icon. Spec diz "icone solo (pin com caminhao)", sem texto |

### 4.4 Correcoes Necessarias

1. **[ALTA]** Redesenhar como pin de localizacao com caminhao simplificado, sem texto "SB", conforme brand spec
2. **[MEDIA]** Adicionar acento verde `#2D6A4F`
3. **[MEDIA]** Adicionar `<title>`
4. **[BAIXA]** Remover estrada em perspectiva (nao faz parte do Conceito C para icon)

---

## 5. siga-bem-favicon.svg -- FAIL

### 5.1 Tecnico SVG

| Check | Status | Detalhe |
|-------|--------|---------|
| ViewBox | OK | `0 0 32 32` -- adequado para favicon |
| Codigo limpo | OK | |
| Tamanho | OK | SVG para navegadores modernos |

### 5.2 Acessibilidade

| Check | Status | Detalhe |
|-------|--------|---------|
| Contraste | OK | Branco sobre `#1B3A4B` |
| Legibilidade 16x16 | **FAIL** | O favicon tem caminhao com 6 elementos (body, cabin, 2 cars, 3 wheels) no viewBox 32x32. A brand spec diz explicitamente: "16x16: Pin preenchido solido branco sobre #1B3A4B". Renderizado a 16x16 os detalhes viram ruido visual |
| aria-label | N/A | Favicons nao precisam de aria-label |

### 5.3 Brand Alignment

| Check | Status | Detalhe |
|-------|--------|---------|
| Conceito C | **FAIL** | Usa quadrado arredondado com caminhao detalhado. Brand spec para favicon 32x32: "Pin com retangulo interno, fundo #1B3A4B". Deveria ser formato de pin, nao quadrado |
| Simplificacao | **FAIL** | Excessivamente detalhado para 32x32. A spec pede simplificacao progressiva |
| Acento verde | AUSENTE | |

### 5.4 Correcoes Necessarias

1. **[CRITICA]** Redesenhar como pin de localizacao (nao quadrado arredondado)
2. **[CRITICA]** Simplificar drasticamente: para 32x32 deve ter "pin com retangulo interno" apenas
3. **[MEDIA]** Fornecer versao 16x16 adicional com pin preenchido solido

---

## 6. preview.html -- PASS

### 6.1 Tecnico

| Check | Status | Detalhe |
|-------|--------|---------|
| Estrutura HTML | OK | Semantico, `lang="pt-BR"`, meta viewport presente |
| Responsividade | NOTA | Grid 2 colunas fixo, nao adapta a mobile. Aceitavel para preview interno |
| Font loading | OK | Google Fonts Inter carregado |
| Paths das imagens | OK | Caminhos relativos corretos |

### 6.2 Paleta de Cores

| Check | Status | Detalhe |
|-------|--------|---------|
| Primary #1B3A4B | OK | Presente e correto |
| Secondary #2D6A8F | OK | Presente e correto |
| Accent #5BA3D9 | OK | Presente |
| Muted #6B8A9E | OK | Presente |
| Dark BG #0F1F2A | OK | Presente |
| Branco #FFFFFF | OK | Presente |

### 6.3 Observacao

- **[BAIXA]** Preview nao mostra o logo em tamanhos muito pequenos (ex: favicon a 16x16 real). Adicionar preview de favicon em tamanho nativo ajudaria a validar legibilidade.

---

## Analise de Consistencia entre Variacoes

### Coerencia Visual

| Aspecto | Status | Detalhe |
|---------|--------|---------|
| Caminhao cegonha | **OK** | Todas as versoes usam o mesmo design de caminhao (cabine + trailer + 2 carros + rodas) |
| Paleta de cores | **OK** | Consistente em todas as versoes |
| Tipografia | **OK** | Inter em todas as versoes |
| Forma do icone | **INCONSISTENTE** | Horizontal/Dark usam quadrado arredondado; Full usa estrada; Icon usa circulo; Favicon usa quadrado arredondado. Deveriam TODAS usar pin de localizacao |
| Tagline | **INCONSISTENTE** | Horizontal/Dark: "GESTAO DE FROTAS DE CEGONHA" (OK); Full: "GESTAO DE FROTAS" (incompleto) |

### Reconhecibilidade em Tamanhos Pequenos

| Tamanho | Logo | Status |
|---------|------|--------|
| 120x120 | Icon | OK -- reconhecivel |
| 64x64 | Icon | CONCERN -- muitos detalhes |
| 32x32 | Favicon | FAIL -- detalhes viram ruido |
| 16x16 | Favicon | FAIL -- completamente ilegivel conforme spec |

---

## Issues Criticas (Bloqueiam Aprovacao)

### ISSUE-1: Icone nao segue Conceito C recomendado

**Impacto:** TODAS as 5 logos
**Problema:** Nenhuma logo usa o pin de localizacao com cegonha interna conforme Conceito C ("Caminho Digital") aprovado no brand identity. Os designs atuais misturam elementos dos Conceitos A e B.
**Correcao:** Redesenhar o icone base como pin de localizacao com silhueta minimalista de caminhao cegonha interna, conforme descrito nas linhas 234-241 do brand identity.

### ISSUE-2: Ausencia do acento verde (#2D6A4F)

**Impacto:** TODAS as 5 logos
**Problema:** O Conceito C especifica acento `#2D6A4F` (success/verde) na base do pin, comunicando "tudo certo, siga bem". Nenhuma logo inclui esse elemento.
**Correcao:** Adicionar ponto ou elemento verde `#2D6A4F` conforme spec.

### ISSUE-3: Tagline inconsistente no logo-full

**Impacto:** `siga-bem-logo-full.svg`
**Problema:** Usa "GESTAO DE FROTAS" em vez de "GESTAO DE FROTAS DE CEGONHA". Inconsistente com as outras versoes e incompleto.
**Correcao:** Alterar para "GESTAO DE FROTAS DE CEGONHA" ou usar tagline oficial "Sua frota no controle".

---

## Issues de Acessibilidade (Padrao WCAG AA)

### ISSUE-4: Tagline com contraste insuficiente

**Impacto:** horizontal, full, dark
**Problema:** Cor `#6B8A9E` em font-size 11-12px tem ratio ~3.7:1 (fundo claro) e ~3.9:1 (fundo escuro). WCAG AA exige 4.5:1 para texto de tamanho normal.
**Correcao fundo claro:** Usar `#567A8E` ou mais escuro (ratio >= 4.5:1)
**Correcao fundo escuro:** Usar `#7D9CB2` ou mais claro (ratio >= 4.5:1 sobre `#0F1F2A`)

### ISSUE-5: SVGs sem title/role para screen readers

**Impacto:** TODAS as 5 logos (exceto favicon onde nao se aplica)
**Problema:** Nenhum SVG inclui `<title>` ou `role="img"` com `aria-label`. Screen readers nao conseguem identificar o conteudo.
**Correcao:** Adicionar ao elemento `<svg>`: `role="img" aria-labelledby="title"` e como primeiro filho: `<title id="title">Siga Bem - Gestao de Frotas de Cegonha</title>`

---

## Veredicto Final

**NEEDS_WORK**

Os logos demonstram boa qualidade tecnica SVG (codigo limpo, cores corretas, estrutura adequada) e o design do caminhao cegonha e coerente entre variantes. Porem, ha um desvio fundamental: **nenhuma das logos implementa o Conceito C aprovado** (pin de localizacao + cegonha). Os designs atuais usam formas variadas (quadrado arredondado, circulo, estrada em perspectiva) que nao correspondem a especificacao aprovada.

**Para aprovacao, sao necessarios:**

1. Redesenho do icone base usando formato pin de localizacao (Conceito C)
2. Adicao do acento verde `#2D6A4F`
3. Correcao da tagline no logo-full
4. Ajuste de contraste nas taglines
5. Adicao de `<title>` e `role="img"` nos SVGs

**Prioridade de correcao:**
- P0 (Bloqueante): Issues 1, 2, 3
- P1 (Alta): Issues 4, 5
- P2 (Media): Simplificacao do favicon, diferenciacao de peso tipografico

---

*Quinn (Guardian) -- QA Review*
*Conformidade: WCAG 2.1 AA | Brand Identity v1.0 (Conceito C)*
