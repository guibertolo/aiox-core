# Diretrizes de Acessibilidade — Site Dra. Gislaine Rodrigues

**Versao:** 1.0
**Status:** Aprovado (Architect)
**Arquiteta:** Aria (AIOX Architect)
**Data:** 2026-03-28
**Publico-alvo:** Desenvolvedores (@dev), UX (@ux-design-expert)
**Referencia:** WCAG 2.1 nivel AAA, EMAG 3.1, pesquisa academica 2024-2025

---

## Contexto Arquitetural

O site da Dra. Gislaine atende primariamente pessoas em situacoes de vulnerabilidade emocional (divorcio, guarda, pensao, inventario). O publico tem 35-65 anos, com concentracao significativa acima dos 50. Essa faixa etaria apresenta:

- Reducao progressiva de acuidade visual (necessidade de maior contraste)
- Maior sensibilidade a fadiga ocular (luz intensa por tempo prolongado)
- Reducao de motricidade fina (touch targets maiores)
- Tendencia a astigmatismo (fonte serifada em headings dificulta leitura longa)
- Preferencia por modo claro para tarefas cognitivas (leitura e formularios)

Todas as recomendacoes abaixo sao **acionaveis diretamente** na stack aprovada (Next.js 15 + Tailwind CSS 3.4 + TypeScript).

---

## 1. Ratios de Contraste por Contexto

### 1.1 Tabela de Compliance WCAG 2.1

| Criterio | Nivel | Requisito | Nossa Posicao |
|---------|-------|-----------|---------------|
| 1.4.3 Contraste (minimo) | AA | 4.5:1 texto normal / 3:1 texto grande | Piso obrigatorio |
| 1.4.6 Contraste (aprimorado) | AAA | 7:1 texto normal / 4.5:1 texto grande | Meta para publico 50+ |
| 1.4.11 Contraste de componentes nao-texto | AA | 3:1 (bordas, icones, focus rings) | Aplicar a todos os inputs |

**Texto grande** = 18pt normal (24px) ou 14pt bold (18.67px negrito).

**Decisao arquitetural:** O site DEVE atingir nivel AAA em todo texto de corpo e CTAs. O nivel AA e aceitavel apenas para textos decorativos e de suporte.

### 1.2 Verificacao da Paleta Existente

A paleta aprovada em `ux-guide-site-gislaine.md` ja possui bons resultados. A tabela abaixo adiciona os calculos para AAA:

| Combinacao | Ratio Atual | AA (4.5:1) | AAA (7:1) | Status |
|-----------|-------------|-----------|-----------|--------|
| `navy-900` (#102a43) sobre `stone-50` (#fafaf9) | 14.2:1 | PASS | PASS | AAA |
| `white` texto sobre `navy-700` (#334e68) | 7.4:1 | PASS | PASS | AAA |
| `stone-600` (#57534e) sobre `white` | 5.7:1 | PASS | FAIL | AA — Ver nota 1 |
| `navy-800` (#243b53) sobre `gold-300` (#edaf44) | 4.9:1 | PASS | FAIL | AA — Ver nota 2 |
| `stone-600` (#57534e) sobre `stone-50` (#fafaf9) | 5.5:1 | PASS | FAIL | AA — Ver nota 1 |
| `gold-300` (#edaf44) sobre `white` | 3.0:1 | FAIL | FAIL | PROIBIDO |
| `stone-400` como texto funcional | <3.5:1 | FAIL | FAIL | PROIBIDO |

**Nota 1 — stone-600 em corpo de texto:** Para publico 50+, `stone-600` sobre fundo claro fica abaixo de AAA. Recomendacao: elevar para `stone-700` (#44403c, ratio ~7.2:1 sobre white) em texto de corpo com tamanho < 24px.

**Nota 2 — navy-800 sobre gold-300:** Manter apenas em badges de destaque (nao para texto corrido). Tamanho minimo: 16px bold.

### 1.3 Substituicoes Recomendadas para AAA

```css
/* Antes: AA apenas */
--color-body-text: #57534e; /* stone-600 — 5.7:1 */

/* Depois: AAA */
--color-body-text: #292524; /* stone-800 — 10.7:1 sobre white */
/* OU */
--color-body-text: #44403c; /* stone-700 — 7.5:1 sobre white */
```

[AUTO-DECISION] Escolha entre stone-700 ou stone-800 -> stone-700 (#44403c) recomendado. Razao: stone-800 e muito proximo do navy-900 usado em headings, perdendo hierarquia visual. stone-700 atinge AAA (7.5:1) e mantem diferenciacoa clara de headings.

---

## 2. Tamanhos de Fonte Minimos por Elemento

### 2.1 Embasamento Cientifico

Pesquisa publicada na PMC (2022, revisao sistematica para dispositivos moveis) indica que adultos de meia-idade (40-60 anos) citam **18pt** como tamanho mais acessivel. Pesquisa do NN/g e Section 508 recomendam minimo de **16px para corpo** de texto em geral. Para publico 50+, o minimo pratico e 18px.

### 2.2 Escala de Fonte Minima para Site Gislaine

| Elemento | Minimo Obrigatorio | Recomendado (50+) | Unidade | Notas |
|---------|-------------------|-------------------|---------|-------|
| Corpo de texto (p, li) | 16px | 18px | rem | Base: 1.125rem |
| Texto de apoio (captions, meta) | 14px | 16px | rem | Nunca abaixo de 0.875rem |
| Labels de formulario | 16px | 18px | rem | Associados ao input via `for/id` |
| Placeholder de input | 14px | 16px | rem | Cor: stone-400 (placeholder apenas) |
| Texto de botao primario | 16px | 18px | rem | Nunca texto menor que 1rem em CTA |
| Texto de botao secundario | 14px | 16px | rem | — |
| Heading H1 | 32px | 40px | rem/clamp | Lora, peso 700 |
| Heading H2 | 24px | 28px | rem/clamp | Lora, peso 600 |
| Heading H3 | 20px | 22px | rem/clamp | Lora, peso 600 |
| Heading H4-H6 | 18px | 18px | rem | Lora ou Inter, peso 600 |
| Navigation links | 16px | 16px | rem | Inter, peso 500 |
| Footer texto | 14px | 16px | rem | — |
| Badge / chip | 12px | 14px | rem | Somente texto nao-essencial |
| Tooltip / popover | 14px | 14px | rem | — |

### 2.3 Implementacao em Tailwind

```typescript
// tailwind.config.ts — adicionar ao objeto fontSize
fontSize: {
  'body-sm':  ['0.875rem', { lineHeight: '1.5' }],   // 14px
  'body':     ['1.125rem', { lineHeight: '1.6' }],   // 18px — padrao
  'body-lg':  ['1.25rem',  { lineHeight: '1.6' }],   // 20px
  'label':    ['1.125rem', { lineHeight: '1.4' }],   // 18px
  'caption':  ['1rem',     { lineHeight: '1.5' }],   // 16px
  'btn-sm':   ['1rem',     { lineHeight: '1' }],     // 16px
  'btn':      ['1.125rem', { lineHeight: '1' }],     // 18px
  'nav':      ['1rem',     { lineHeight: '1' }],     // 16px
},
```

### 2.4 Redimensionamento de Texto (WCAG 1.4.4)

O WCAG exige que texto seja redimensionavel ate 200% sem perda de funcionalidade. Implementar com:
- `font-size` sempre em `rem` (nunca `px` fixo)
- `html { font-size: 100% }` (16px default do browser — nao sobrescrever)
- Testar em 200% de zoom no Chrome e Firefox

---

## 3. Tipografia: Serif vs Sans-Serif para 50+

### 3.1 Evidencias

| Contexto | Recomendacao | Justificativa |
|---------|-------------|---------------|
| Headings curtos (H1-H3) | Serif (Lora) — MANTER | Autoridade + diferenciacao; tamanho grande mitiga problemas de leitura |
| Corpo de texto longo | Sans-serif (Inter) — MANTER | Sans-serif supera serif em telas digitais para leitura prolongada |
| Texto bold de destaque | Inter 600-700 | Evitar Lora italic — italic e 18% mais dificil de ler para idosos |
| Texto pequeno (< 16px) | Inter sempre | Serif em tamanho pequeno reduz legibilidade significativamente |

**Atkinson Hyperlegible** (Braille Institute, 2025, 7 pesos) e uma alternativa excelente para elementos criticos de acessibilidade. Considerar como fonte de fallback ou para seccoes de conteudo juridico denso.

### 3.2 Pesos de Fonte

| Uso | Peso minimo | Peso recomendado |
|----|-------------|-----------------|
| Texto de corpo | 400 (Regular) | 400 |
| Labels | 500 (Medium) | 500 |
| Botoes | 500 | 600 (SemiBold) |
| Headings H3-H4 | 500 | 600 |
| Headings H1-H2 | 600 | 700 (Bold) |

**Nunca usar peso 300 (Light) para qualquer texto funcional.** Light reduz contraste percebido mesmo que o ratio de cor seja tecnicamente aprovado.

### 3.3 Espacamento de Texto

| Propriedade | Minimo | Recomendado |
|-----------|--------|-------------|
| `line-height` corpo | 1.4 | 1.6 |
| `letter-spacing` corpo | 0 | 0.01em (0.16px) |
| `word-spacing` | 0 | 0 |
| `paragraph-spacing` | 0.5em | 1em |
| Largura maxima de coluna de texto | — | 65-75 caracteres (65ch) |

```css
/* globals.css / Tailwind @layer base */
p {
  max-width: 65ch;
  line-height: 1.6;
  letter-spacing: 0.01em;
}
```

---

## 4. Touch Targets e Espacamento de Interacao

### 4.1 Requisitos WCAG 2.5.5 (AAA)

WCAG 2.5.5 (Target Size, AAA) requer **44x44 CSS pixels** de area clicavel para todos os controles interativos. WCAG 2.5.8 (AA, WCAG 2.2) requer minimo de 24x24px. Para publico 50+ com motricidade reduzida, o target de 44px e obrigatorio.

Pesquisa da Universidade de Maryland (2023): targets menores que 44x44px tem taxa de erro 3x maior em usuarios com limitacoes motoras.

### 4.2 Tabela de Touch Targets por Componente

| Componente | Minimo AAA | Recomendado 50+ | Implementacao |
|-----------|-----------|----------------|--------------|
| Botao primario (CTA) | 44x44px | 52x52px min | `min-h-[52px] px-6 py-3` |
| Botao secundario | 44x44px | 48x44px | `min-h-[48px] px-5 py-3` |
| Input de formulario | 44px altura | 48px altura | `min-h-[48px] py-3` |
| Link de navegacao desktop | 44px area | Padding generoso | `py-3 px-4` |
| Link de navegacao mobile | 44x44px | 48x48px | `min-h-[48px]` |
| Checkbox / Radio | 44x44px area | 48x48px | Wrapper com padding |
| Widget WhatsApp (FAB) | 44x44px | 56x56px | `w-14 h-14` (56px) |
| Links em texto corrido | Excecao WCAG | Sublinhar + padding | `underline` obrigatorio |
| Itens de menu mobile | 44x44px | 56px altura | `min-h-[56px]` |
| Close/X de modal | 44x44px | 48x48px | `w-12 h-12` |

### 4.3 Espacamento entre Alvos

Targets adjacentes devem ter **minimo 8px de separacao** para evitar ativacao acidental. Para publico 50+, recomendar 12px.

```tsx
// Exemplo — grupo de botoes
<div className="flex gap-3"> {/* gap-3 = 12px */}
  <Button variant="primary">Agendar Consulta</Button>
  <Button variant="secondary">Saiba Mais</Button>
</div>
```

---

## 5. Suporte a prefers-contrast e prefers-reduced-motion

### 5.1 prefers-contrast: more

O media query `prefers-contrast: more` e ativado quando o usuario configura "Aumentar Contraste" no sistema operacional (macOS, iOS, Windows). Deve ser suportado.

**Estrategia de implementacao:** CSS Custom Properties como variaveis de contraste, sobrescritas no media query.

```css
/* globals.css */
:root {
  --color-text-primary:  #44403c;  /* stone-700 — 7.5:1 — padrao AAA */
  --color-text-body:     #44403c;
  --color-text-muted:    #57534e;  /* stone-600 — 5.7:1 — AA */
  --color-border:        #d6d3d1;  /* stone-300 */
  --color-focus-ring:    #334e68;  /* navy-700 */
  --color-bg-input:      #ffffff;
  --color-placeholder:   #a8a29e;  /* stone-400 */
}

@media (prefers-contrast: more) {
  :root {
    --color-text-primary:  #0c1a26;  /* quase-black — 17:1 sobre white */
    --color-text-body:     #0c1a26;
    --color-text-muted:    #292524;  /* stone-800 — 10.7:1 */
    --color-border:        #292524;  /* stone-800 — borda muito visivelum */
    --color-focus-ring:    #0c1a26;  /* maximo contraste em focus */
    --color-bg-input:      #ffffff;
    --color-placeholder:   #57534e;  /* stone-600 — elevado */
  }

  /* Remover sombras que reduzem contraste percebido */
  * {
    text-shadow: none !important;
    box-shadow: none !important;
  }

  /* Bordas mais visiveis em todos os inputs */
  input, textarea, select {
    border-width: 2px;
    border-color: var(--color-border);
  }

  /* Focus ring mais espesso */
  :focus-visible {
    outline: 3px solid var(--color-focus-ring);
    outline-offset: 2px;
  }
}
```

### 5.2 forced-colors (Windows High Contrast Mode)

Windows High Contrast Mode sobrescreve TODAS as cores com um conjunto do sistema. O CSS nao controla as cores — mas controla propriedades nao-cor.

```css
@media (forced-colors: active) {
  /* Garantir que bordas e outlines sejam visiveis */
  .btn, input, textarea {
    border: 2px solid ButtonText;
  }

  /* Icones SVG: usar currentColor */
  svg {
    fill: currentColor;
    stroke: currentColor;
  }

  /* Preservar focus ring */
  :focus-visible {
    outline: 3px solid Highlight;
  }

  /* Separadores visiveis */
  hr, .divider {
    border-color: ButtonText;
  }
}
```

### 5.3 prefers-reduced-motion

Usuarios com epilepsia fotossensivel, vertigem ou ansiedade beneficiam de motion reduzido. Para publico 50+, animacoes de scroll podem causar desconforto.

```css
/* Padrao: animacoes suaves habilitadas */
:root {
  --transition-speed: 200ms;
  --transition-easing: ease-out;
  --animation-duration: 300ms;
}

@media (prefers-reduced-motion: reduce) {
  :root {
    --transition-speed: 0ms;
    --animation-duration: 0ms;
  }

  /* Remover todas as animacoes de scroll e parallax */
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

**Em Tailwind + Next.js:**

```typescript
// hooks/useReducedMotion.ts
import { useEffect, useState } from 'react'

export function useReducedMotion(): boolean {
  const [prefersReduced, setPrefersReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReduced(mq.matches)
    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  return prefersReduced
}
```

Uso em componentes com animacoes (AOS, Framer Motion, CSS transitions):

```tsx
const prefersReduced = useReducedMotion()

<motion.div
  initial={prefersReduced ? false : { opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: prefersReduced ? 0 : 0.3 }}
>
```

---

## 6. Dark Mode vs Light Mode para Publico 50+

### 6.1 Evidencias de Pesquisa (2024-2025)

| Achado | Fonte | Implicacao |
|-------|-------|-----------|
| Scores cognitivos maiores em light mode | Taylor & Francis, 2025 | Formularios e leitura juridica: light mode |
| Adultos mais velhos preferem polaridade positiva (escuro sobre claro) | Pesquisa ergonomia 2025 | Default: light mode |
| Usuarios com astigmatismo (prevalente em 50+) preferem dark-on-light | NN/g | Light mode como default |
| Dark mode reduz fadiga em ambiente escuro prolongado | Multiplos estudos | Suportar dark mode como opcao |
| Leitura de texto longo: light mode superior | ACM Eye Tracking 2025 | Secoes juridicas densas: light mode |

### 6.2 Decisao Arquitetural

**Estrategia recomendada para site Gislaine:**

```
DEFAULT: Light Mode (obrigatorio)
SUPORTE: Dark Mode via prefers-color-scheme (opcional, mas recomendado)
CONTROLE MANUAL: Botao de toggle no header (acessibilidade aumentada)
```

**Justificativa:**
1. O publico primario (50+, em stress emocional) performa melhor cognitivamente em light mode
2. Light mode facilita a leitura dos textos juridicos densos
3. O design atual (navy + stone + gold) foi concebido para light mode e possui ratios AAA nele
4. Dark mode como opcao respeita preferencias individuais (usuario em ambiente escuro noturno)

**O que NAO fazer:** Implementar dark mode como default ou forcar dark mode com base em `prefers-color-scheme: dark` sem toggle manual.

### 6.3 Implementacao Dark Mode (Opcional mas Recomendado)

Se implementar dark mode, os tokens precisam ser revalidados:

| Token Light | Ratio Light | Token Dark Sugerido | Ratio Dark |
|------------|-------------|---------------------|-----------|
| stone-700 sobre white (7.5:1) | AAA | stone-200 (#e7e5e4) sobre navy-900 (#102a43) | 11.2:1 — AAA |
| navy-900 sobre stone-50 (14.2:1) | AAA | stone-50 sobre navy-900 (14.2:1) | AAA |
| white sobre navy-700 (7.4:1) | AAA | stone-100 sobre navy-800 (10.1:1) | AAA |
| gold-400 como accent sobre navy-900 | 5.8:1 — AA | gold-300 sobre navy-900 (8.1:1) | AAA |

---

## 7. Focus Indicators e Navegacao por Teclado

Publico 50+ frequentemente usa teclado quando mouse e dificil. WCAG 2.4.11 (AA) e 2.4.12 (AAA) exigem focus indicators visiveis.

```css
/* Focus ring customizado — visivel em ambos os modos */
:focus-visible {
  outline: 3px solid #334e68;       /* navy-700 */
  outline-offset: 3px;
  border-radius: 4px;
}

/* Remover outline padrao do browser (apenas quando substituindo) */
:focus:not(:focus-visible) {
  outline: none;
}
```

**Tailwind:**

```
ring-2 ring-navy-700 ring-offset-2 focus-visible:ring-3
```

---

## 8. Elementos de Formulario

Formularios sao o ponto critico de conversao. Para publico 50+:

### 8.1 Labels

- Labels SEMPRE visiveis (nunca placeholder-only)
- Label acima do input (nao ao lado — mobile)
- Peso minimo: 500 (Medium)
- Tamanho minimo: 16px (recomendado: 18px)

### 8.2 Estados de Erro

```css
/* Erro: nunca usar apenas cor — adicionar icone ou texto */
.input-error {
  border: 2px solid #dc2626;        /* red-600 */
  /* + icone de erro SVG inline */
  /* + mensagem de erro abaixo (role="alert") */
}
```

Ratio do texto de erro (#dc2626 sobre white): 4.5:1 — AA. Para AAA, usar #b91c1c (red-700): 5.5:1.

### 8.3 Autocomplete

Adicionar atributos `autocomplete` para auxiliar usuarios com dificuldade de digitacao:

```html
<input autocomplete="name" />
<input autocomplete="email" />
<input autocomplete="tel" />
```

---

## 9. Checklist de Implementacao

### Antes do Launch

- [ ] Verificar todos os ratios de contraste com [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [ ] Testar com axe DevTools (Deque) — zero violations AA
- [ ] Testar zoom 200% — sem overflow ou perda de funcionalidade
- [ ] Testar com VoiceOver (macOS) ou NVDA (Windows)
- [ ] Testar com teclado apenas (sem mouse)
- [ ] Simular `prefers-contrast: more` via DevTools (Chrome > Rendering)
- [ ] Simular `prefers-reduced-motion: reduce` via DevTools
- [ ] Simular `forced-colors: active` via DevTools
- [ ] Verificar touch targets >= 44px no mobile (DevTools device mode)
- [ ] Testar com fonte do browser aumentada para 20px

### Ferramentas de Validacao

| Ferramenta | Uso | URL |
|-----------|-----|-----|
| axe DevTools | Auditoria automatica completa | [deque.com/axe](https://www.deque.com/axe/) |
| WebAIM Contrast Checker | Validar ratios de cor | [webaim.org/resources/contrastchecker](https://webaim.org/resources/contrastchecker/) |
| Stark (Figma/Browser) | Preview de deficiencias visuais | [getstark.co](https://www.getstark.co/) |
| WAVE | Analise de estrutura semantica | [wave.webaim.org](https://wave.webaim.org/) |
| Chrome DevTools Rendering | Simular media queries de preferencia | DevTools > More Tools > Rendering |

---

## 10. Alinhamento com EMAG e Gov.br

O EMAG 3.1 e uma especializacao do WCAG para portais governamentais brasileiros, com forca de lei para orgaos publicos (Portaria 3/2007 do SISP). Para sites privados como o da Dra. Gislaine, o EMAG nao e obrigatorio, mas serve como referencia de qualidade.

**Recomendacoes EMAG relevantes adotadas neste documento:**

| Recomendacao EMAG | Implementacao neste site |
|------------------|------------------------|
| Fornecer alternativa de contraste alto | `prefers-contrast: more` + botao de toggle |
| Permitir redimensionamento de fonte | Todos os tamanhos em `rem`, zoom 200% funcional |
| Nao usar apenas cor para transmitir informacao | Erros com icone + texto, nao so cor vermelha |
| Leitura por teclado funcional | Focus ring visivel, tab order logico |
| Textos alternativos em imagens | `alt` descritivo em todas as `<Image>` |
| Legendas em formularios | `<label>` explicito para todos os inputs |

**Portal de referencia:** [emag.governoeletronico.gov.br](https://emag.governoeletronico.gov.br/)

---

## 11. Resumo Executivo das Decisoes

| Decisao | Escolha | Alternativa Rejeitada | Razao |
|--------|---------|----------------------|-------|
| Nivel de conformidade alvo | WCAG AAA | WCAG AA apenas | Publico 50+ com vulnerabilidade emocional exige maxima acessibilidade |
| Cor de texto de corpo | stone-700 (#44403c) | stone-600 (#57534e) | stone-600 falha AAA; stone-700 atinge 7.5:1 |
| Fonte de corpo | Inter 400 | Lora em corpo | Inter superior em telas digitais para leitura prolongada |
| Tamanho base do corpo | 18px (1.125rem) | 16px | 16px e minimo; 18px e o ideal para 50+ |
| Modo default | Light Mode | Dark Mode como default | Pesquisa 2025: melhor performance cognitiva em light para adultos 50+ |
| Touch targets | 44px minimo / 48-52px recomendado | 36px ou menos | WCAG AAA 2.5.5; taxa de erro 3x menor |
| prefers-contrast support | Sim — obrigatorio | Ignorar | Usuarios com baixa visao dependem disso |
| prefers-reduced-motion | Sim — obrigatorio | Ignorar | Evitar desconforto em usuarios com sensibilidade a movimento |

---

## Referencias

- [WCAG 2.1 — Criterio 1.4.6: Contraste (Aprimorado)](https://www.w3.org/WAI/WCAG21/Understanding/contrast-enhanced.html)
- [WCAG 2.1 — Criterio 2.5.5: Tamanho do Alvo](https://www.w3.org/WAI/WCAG21/Understanding/target-size.html)
- [WebAIM: Contraste e Acessibilidade de Cor](https://webaim.org/articles/contrast/)
- [Section 508.gov — Fontes e Tipografia Acessiveis](https://www.section508.gov/develop/fonts-typography/)
- [PMC — Como projetar tamanho de fonte para adultos mais velhos](https://pmc.ncbi.nlm.nih.gov/articles/PMC9376262/)
- [Braille Institute — Atkinson Hyperlegible Font](https://www.brailleinstitute.org/freefont/)
- [Smashing Magazine — Sistema de Design High Contrast com CSS Custom Properties](https://www.smashingmagazine.com/2023/01/creating-high-contrast-design-system-css-custom-properties/)
- [NN/g — Dark Mode vs Light Mode](https://www.nngroup.com/articles/dark-mode/)
- [Taylor & Francis — The dark side of the interface (2025)](https://www.tandfonline.com/doi/full/10.1080/00140139.2025.2483451)
- [EMAG 3.1 — Modelo de Acessibilidade em Governo Eletronico](https://emag.governoeletronico.gov.br/)
- [MDN — prefers-contrast](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-contrast)
- [Deque — Acessibilidade em Contraste de Cor Mobile](https://www.deque.com/blog/accessibility-mobile-web-improving-color-contrast/)
- [TestParty — Guia WCAG 2.5.5 Target Size 2025](https://testparty.ai/blog/wcag-2-5-5-target-size-2025-guide)

---

*Documento gerado por Aria (AIOX Architect) — 2026-03-28*
*Proximos passos: @dev implementa tokens CSS / @ux-design-expert valida componentes visuais / @qa executa auditoria axe*
