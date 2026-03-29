# Layout Prompt — Dark Premium Landing Page

> Prompt replicavel para criar landing pages com estetica dark, premium, Apple-inspired com efeito "liquid glass" morphism. Extraido do projeto AIOX Squad Creator Pro.

---

## STACK

React + Vite + TypeScript + Tailwind CSS v4 (`@tailwindcss/vite`). Sem shadcn. Dependencia extra: `hls.js` para video backgrounds HLS.

```bash
npm create vite@latest project-name -- --template react-ts
cd project-name
npm install
npm install -D tailwindcss @tailwindcss/vite hls.js
```

**vite.config.ts:**
```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({ plugins: [react(), tailwindcss()] })
```

---

## FONTS

Google Fonts: **Instrument Serif** (italic only) para headings, **Barlow** (300, 400, 500, 600) para body.

```html
<link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@1&family=Barlow:wght@300;400;500;600&display=swap" rel="stylesheet">
```

**CSS Variables:**
```css
@theme {
  --font-heading: 'Instrument Serif', serif;
  --font-body: 'Barlow', sans-serif;
  --color-accent: #7c6aef;
  --color-accent-glow: rgba(124,106,239,0.15);
}
```

**Regras de uso:**
- Todos os headings: `font-[var(--font-heading)] italic text-white tracking-tight leading-[0.9]`
- Todo body text: `font-[var(--font-body)] font-light text-white/60 text-sm`
- Todos os botoes: `font-[var(--font-body)]` com `rounded-full`
- Labels/meta: `font-[var(--font-body)] font-medium text-white/40 text-xs uppercase tracking-widest`

---

## CORES

**Background base:** `#030305` (off-black com toque azulado, NUNCA preto puro #000)

**Paleta de texto (branco com opacidade):**
| Token | Valor | Uso |
|-------|-------|-----|
| `text-white` | 100% | Headings, destaque maximo |
| `text-white/90` | 90% | Links de navegacao |
| `text-white/60` | 60% | Body text, descricoes |
| `text-white/40` | 40% | Labels, captions, metadata |
| `text-white/30` | 30% | Info terciaria |

**Paleta de cores semanticas:**
| Cor | Hex | Uso |
|-----|-----|-----|
| Purple | `#7c6aef` | Accent primario, CTAs |
| Blue | `#4a7dff` | Links, info |
| Cyan | `#06b6d4` | Dados, Voice DNA |
| Green | `#22c55e` | Sucesso, aprovacao |
| Amber | `#f59e0b` | Aviso, intermediario |
| Pink | `#ec4899` | Destaque, Tier 3 |
| Red | `#ef4444` | Bloqueante, erro, veto |

---

## LIQUID GLASS CSS

Dois niveis de intensidade. Ambos usam a tecnica de mask gradient para criar bordas.

### Variante Standard (`.liquid-glass`)
```css
.liquid-glass {
  background: rgba(255, 255, 255, 0.02);
  background-blend-mode: luminosity;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.06);
  box-shadow:
    inset 0 1px 1px rgba(255, 255, 255, 0.08),
    inset 0 -1px 1px rgba(255, 255, 255, 0.02),
    0 0 0 0.5px rgba(255, 255, 255, 0.04);
  position: relative;
  overflow: hidden;
}
```

**::before (Gradient Border Mask):**
```css
.liquid-glass::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 1px;
  background: linear-gradient(180deg,
    rgba(255,255,255,0.20) 0%, rgba(255,255,255,0.06) 25%,
    rgba(255,255,255,0.0) 45%, rgba(255,255,255,0.0) 55%,
    rgba(255,255,255,0.06) 75%, rgba(255,255,255,0.15) 100%);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
}
```

**::after (Top Highlight Edge):**
```css
.liquid-glass::after {
  content: '';
  position: absolute;
  top: 0; left: 10%; right: 10%;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
  pointer-events: none;
}
```

**Hover:**
```css
.liquid-glass:hover {
  border-color: rgba(255, 255, 255, 0.10);
  background: rgba(255, 255, 255, 0.03);
}
```

### Variante Strong (`.liquid-glass-strong`)
Mesma estrutura, valores mais altos:
- `background: rgba(255, 255, 255, 0.04)`
- `backdrop-filter: blur(50px)`
- `border: 1px solid rgba(255, 255, 255, 0.08)`
- `box-shadow: 4px 4px 16px rgba(0,0,0,0.15), inset 0 1px 1px rgba(255,255,255,0.12), inset 0 -1px 1px rgba(255,255,255,0.03), 0 0 0 0.5px rgba(255,255,255,0.06)`
- ::before gradient: 0.30/0.08/0.08/0.25 (mais forte)
- ::after highlight: left 8%, rgba 0.25 (mais brilhante)
- Hover: border 0.14, background 0.05

---

## BACKGROUND PATTERNS

Nunca deixar secoes com fundo totalmente flat. Cada secao usa 6 camadas sobrepostas:

### Camada 1 — Base Tinted Gradient
```css
radial-gradient(ellipse 80% 60% at 50% 40%, {tint}, transparent 80%)
```
Tint por variante: hero `rgba(124,106,239,0.06)`, purple `0.04`, blue `rgba(74,125,255,0.04)`, green `rgba(34,197,94,0.03)`, warm `rgba(245,158,11,0.03)`, red `rgba(239,68,68,0.03)`, cyan `rgba(6,182,212,0.035)`, neutral `rgba(255,255,255,0.015)`

### Camada 2 — Ambient Fill
```css
linear-gradient(180deg, rgba(255,255,255,0.008) 0%, transparent 30%, transparent 70%, rgba(255,255,255,0.008) 100%)
```

### Camada 3 — Pattern (alternar entre secoes)

**Dot Grid:**
```css
.bg-dot-grid {
  background-image: radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px);
  background-size: 28px 28px;
}
```

**Line Grid:**
```css
.bg-line-grid {
  background-image:
    linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
  background-size: 56px 56px;
}
```

### Camada 4 — Noise Texture
```css
.bg-noise::after {
  content: '';
  position: absolute; inset: 0;
  opacity: 0.03;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  background-size: 256px 256px;
  pointer-events: none; z-index: 0;
}
```

### Camada 5 — Orbs (3 por secao)
Circulos grandes com blur alto e opacity baixa, usando animacao `drift` (25s) com delays negativos diferentes para movimento assincrono.

**Exemplo (variante hero):**
| # | Cor | Tamanho | Posicao | Blur | Opacity | Delay |
|---|-----|---------|---------|------|---------|-------|
| 1 | `#7c6aef` | 800px | top:-250px left:40% | 160px | 0.14 | 0s |
| 2 | `#ec4899` | 500px | bottom:5% right:-100px | 140px | 0.08 | -8s |
| 3 | `#4a7dff` | 400px | top:55% left:-80px | 120px | 0.07 | -15s |

**Regras para orbs:**
- 3 orbs por secao, sempre
- Orb principal: 500-800px, blur 140-160px, opacity 0.08-0.14
- Orb secundario: 350-500px, blur 120-140px, opacity 0.05-0.08
- Orb terciario: 200-300px, blur 100px, opacity 0.03-0.04
- Delays negativos diferentes (-5s a -18s) para dessincronizar
- Cores devem harmonizar com o tema da secao

### Camada 6 — Vignette
```css
radial-gradient(ellipse at center, transparent 50%, rgba(3,3,5,0.5) 100%)
```

### Animacao Drift (para orbs)
```css
@keyframes drift {
  0%, 100% { transform: translate(0, 0); }
  25% { transform: translate(30px, -20px); }
  50% { transform: translate(-20px, 30px); }
  75% { transform: translate(-30px, -10px); }
}
```

---

## ANIMATED BORDER (Conic Gradient Rotation)

Borda colorida que gira continuamente usando `@property` CSS.

```css
@property --border-angle {
  syntax: "<angle>";
  initial-value: 0deg;
  inherits: false;
}
@keyframes border-rotate { to { --border-angle: 360deg; } }
```

**Componente React `AnimatedBorder`:**
- Props: `colors` (array de cores), `width` (px), `duration` (s), `radius` (px), `hoverOnly` (boolean)
- Injeta CSS vars: `--border-width`, `--border-radius`, `--border-gradient`, `--border-duration`
- `::before` = borda rotativa (z-index 1)
- `::after` = glow externo com `filter: blur(6px)` e `opacity: 0.4` (z-index 0)
- `hoverOnly`: opacity 0 por padrao, 1 no hover com `transition: opacity 0.4s ease`

**Onde aplicar:**
| Elemento | Radius | Duration | Hover? | Cores |
|----------|--------|----------|--------|-------|
| Nav pill | 9999px | 6s | Nao | `[accent/0.6, blue/0.3, transparent, transparent, accent/0.6]` |
| Hero CTA | 9999px | 3s | Nao | `[#7c6aef, #4a7dff, #06b6d4, #22c55e, #7c6aef]` |
| Cards de agente | 24px | 4-7s | Sim | Cor unica do agente + transparent |
| Cards de destaque | 24px | 5s | Sim | Cores do tema da secao |
| Pricing destacado | 20px | 4s | Nao | `[#7c6aef, #4a7dff, #06b6d4, #ec4899, #7c6aef]` |

---

## ANIMACOES

### Pulse Ring (timeline dots)
```css
@keyframes pulse-ring-anim {
  0% { transform: scale(1); opacity: 0.5; }
  70% { transform: scale(1.6); opacity: 0; }
  100% { transform: scale(1.6); opacity: 0; }
}
.pulse-ring {
  position: absolute; inset: 0;
  border-radius: inherit;
  border: 1.5px solid var(--ring-color);
  animation: pulse-ring-anim 2.5s ease-out infinite;
}
```

### Shimmer Text (badges)
```css
@keyframes shimmer {
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
}
.shimmer-text {
  background: linear-gradient(90deg,
    rgba(255,255,255,0.6) 0%, rgba(255,255,255,1) 25%,
    rgba(255,255,255,0.6) 50%, rgba(124,106,239,1) 75%,
    rgba(255,255,255,0.6) 100%);
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shimmer 4s linear infinite;
}
```

### Glow Breathe (numeros/icones)
```css
@keyframes glow-breathe {
  0%, 100% { filter: drop-shadow(0 0 4px var(--glow-color, rgba(124,106,239,0.3))); }
  50% { filter: drop-shadow(0 0 12px var(--glow-color, rgba(124,106,239,0.6))); }
}
.glow-breathe { animation: glow-breathe 3s ease-in-out infinite; }
```

### Scroll Reveal (IntersectionObserver)
```
threshold: 0.1, rootMargin: '0px 0px -40px 0px'
Hidden: opacity-0 translate-y-10 blur-sm
Visible: opacity-100 translate-y-0 blur-0
Transition: duration-700 ease-out
```

### CountUp (numeros animados)
- 40 steps ao longo de 1.5s
- Trigger: IntersectionObserver com threshold 0.3
- Mostra `Math.floor(current)` durante animacao

### Pulse Glow (dot do badge)
```css
@keyframes pulse-glow {
  0%, 100% { box-shadow: 0 0 20px var(--color-accent-glow); }
  50% { box-shadow: 0 0 40px var(--color-accent-glow), 0 0 80px rgba(124,106,239,0.08); }
}
```

---

## SECTION DIVIDER

Substitui linhas simples `h-px` por gradiente que desvanece nas pontas + glow sutil.

```css
.section-divider {
  height: 1px;
  background: linear-gradient(90deg,
    transparent 0%, rgba(255,255,255,0.08) 20%,
    rgba(255,255,255,0.12) 50%, rgba(255,255,255,0.08) 80%,
    transparent 100%);
  position: relative;
}
.section-divider::before {
  content: '';
  position: absolute;
  top: -20px; left: 0; right: 0; height: 40px;
  background: radial-gradient(ellipse at center, rgba(124,106,239,0.06) 0%, transparent 70%);
}
```

---

## VIDEO BACKGROUNDS (HLS)

Usar `hls.js` com fallback Safari:
```ts
if (Hls.isSupported()) {
  const hls = new Hls({ enableWorker: false })
  hls.loadSource(src)
  hls.attachMedia(video)
} else if (video.canPlayType('application/vnd.apple.mpegurl')) {
  video.src = src
}
```

**Estrutura VideoSection:**
```
<section> [relative overflow-hidden, minHeight: min(700px, 90vh)]
  <video> [absolute inset-0 w-full h-full object-cover z-0]
  <div> [top fade: h-[120px] sm:h-[200px] bg-gradient-to-b from-[#030305] to-transparent z-1]
  <div> [bottom fade: mesma coisa invertida, bg-gradient-to-t]
  <div> [content: relative z-10 flex flex-col items-center justify-center]
```

Para video MP4 no hero: `opacity-40` + overlay `bg-black/60` + bottom gradient `h-[300px]`.

Para desaturar (stats): `style={{ filter: 'saturate(0)' }}`.

---

## RESPONSIVIDADE

### Breakpoints (mobile-first)
| Breakpoint | Min-width | Uso principal |
|-----------|-----------|---------------|
| default | 0px | Mobile (320px+) |
| `sm:` | 640px | Landscape / tablet pequeno |
| `md:` | 768px | Tablet / desktop |
| `lg:` | 1024px | Desktop grande |

### Padroes de escala

**Tipografia:**
- h1: `text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem]`
- h2: `text-3xl sm:text-4xl md:text-5xl`
- body: `text-base sm:text-lg` (hero), `text-sm` (geral)

**Spacing:**
- Section padding: `py-16 sm:py-28`
- Section px: `px-4 sm:px-6`
- Card padding: `p-5 sm:p-8`
- Card radius: `rounded-2xl sm:rounded-3xl`
- Gaps: `gap-4 sm:gap-8 md:gap-12` (contexto), `gap-6 sm:gap-12` (stats)

**Grid:**
- 3 colunas: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
- 2 colunas: `grid-cols-1 lg:grid-cols-2`
- 4 colunas: `grid-cols-2 lg:grid-cols-4`

**Nav:**
- Desktop (`hidden md:flex`): 6 links completos
- Mobile (`flex md:hidden`): 3-4 links reduzidos
- Altura fixa: `h-7` mobile, `sm:h-8` desktop (alinha tudo)
- CTA: `text-[0.72rem] sm:text-sm`

**Tabela -> Cards:**
- Desktop: `hidden sm:block` (tabela)
- Mobile: `grid grid-cols-1 gap-2 sm:hidden` (cards empilhados)

### iOS / Android
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
<meta name="theme-color" content="#030305" />
```

```css
html { padding: env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left); }
body { overflow-x: hidden; }
@media (pointer: coarse) { a, button { min-height: 44px; min-width: 44px; } }
.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
```

---

## ANATOMIA DE SECAO

Cada secao segue esta estrutura:
```
<section> [py-16 sm:py-28 px-4 sm:px-6 relative overflow-hidden]
  <SectionBg variant="TEMA" pattern="dots|lines" />
  <div className="relative z-10 max-w-[1200px] mx-auto">
    <RevealWrapper>
      <Badge>TAG DA SECAO</Badge>
      <h2>TITULO</h2>
      <p>DESCRICAO</p>
    </RevealWrapper>
    <!-- CONTEUDO -->
  </div>
</section>
<div className="section-divider" />
```

Alternar `pattern="dots"` e `pattern="lines"` entre secoes adjacentes.

---

## CATALOGO DE COMPONENTES (Tailwind classes exatas)

### Badge
```
liquid-glass-strong rounded-full px-5 py-2 text-xs font-medium inline-flex items-center gap-2.5 mb-6
  + dot: w-1.5 h-1.5 rounded-full bg-accent (pulse-glow 2s infinite)
  + text: shimmer-text
```

### Glass Card
```
liquid-glass rounded-2xl p-7 hover:-translate-y-1 transition-all
  + icon: liquid-glass-strong rounded-full w-11 h-11 flex items-center justify-center mb-4
  + h3: font-heading italic text-white text-lg mb-2
  + p: font-body font-light text-white/60 text-sm
```

### Agent Card (dentro de AnimatedBorder hoverOnly)
```
liquid-glass rounded-2xl sm:rounded-3xl p-5 sm:p-8
  + avatar: w-13 h-13 rounded-2xl (gradient background)
  + name: font-heading italic text-white text-xl
  + role: text-white/40 text-xs font-body
  + quote: italic text-white/40 text-sm border-l-2 border-white/20 pl-4 my-4
  + cmd: liquid-glass rounded-full px-3 py-1 text-accent text-[0.7rem] font-mono
```

### Flow Step
```
flex gap-5
  + rail: relative w-11 h-11
    + PulseRing(color, size=44)
    + dot: liquid-glass-strong absolute inset-0 rounded-[14px] flex items-center justify-center font-heading italic text-lg z-10
  + connector: w-px h-7 bg-white/10
  + body: pb-7 pt-1.5
    + h4: font-heading italic text-white text-lg
    + p: font-body font-light text-white/60 text-sm
    + tag: font-mono text-[0.68rem] px-2.5 py-0.5 rounded-full bg-accent/10 text-accent
```

### Gate Row
```
liquid-glass rounded-2xl flex items-center gap-4 px-5 py-4 hover:bg-white/[0.02] transition-all
  + num: w-9 h-9 rounded-[10px] font-heading italic text-sm glow-breathe
  + title: font-heading italic text-white text-sm
  + desc: font-body font-light text-white/60 text-xs
  + tag: text-[0.65rem] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full
```

### Veto Card
```
liquid-glass rounded-2xl p-5 border-l-2 border-red-500
  + h4: font-heading italic text-white text-sm mb-1
  + p: font-body font-light text-white/60 text-xs
```

### Tier Row
```
liquid-glass rounded-2xl flex items-center gap-4 px-6 py-4 text-left hover:bg-white/[0.02]
  + label: font-mono text-[0.68rem] font-bold uppercase tracking-wider px-3 py-1 rounded-full
  + title: font-heading italic text-white text-sm
  + desc: font-body font-light text-white/60 text-xs
```

### Pricing Card
```
liquid-glass (normal) ou liquid-glass-strong (destaque) rounded-2xl p-7 text-center
  + h3: font-heading italic text-white text-2xl
  + sub: font-body text-white/40 text-xs mb-5
  + li: font-body font-light text-white/60 text-sm flex items-center gap-2
  + check icon: text-accent
  (destaque: envolver em AnimatedBorder radius=20 duration=4)
```

### Source Tier Card
```
liquid-glass rounded-2xl p-5 text-center
  + label: text-[0.68rem] font-bold uppercase tracking-wider mb-2 (cor dinamica)
  + p: font-body font-light text-white/60 text-xs
```

---

## SCROLLBAR
```css
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.2); border-radius: 3px; }
```

---

## FOOTER
```
<footer> [relative overflow-hidden py-16 px-6 text-center]
  + gradient: bg-gradient-to-t from-[#030305] via-[#06060c] to-[#030305]
  + dot grid overlay
  + section-divider no topo
  + conteudo z-10
```

---

## CHECKLIST DE QUALIDADE

Antes de entregar, verificar:

- [ ] Nenhuma secao com background totalmente flat/preto
- [ ] Todas as secoes tem SectionBg com orbs + pattern + noise + vignette
- [ ] Dot grid e line grid alternando entre secoes adjacentes
- [ ] Liquid glass tem border visivel (1px solid rgba 0.06-0.08)
- [ ] Liquid glass tem ::after highlight no topo
- [ ] Hover muda border-color e background nos cards
- [ ] AnimatedBorder no nav, hero CTA, e card destacado (sempre ativo)
- [ ] AnimatedBorder hoverOnly nos cards interativos
- [ ] Section dividers com gradient (nao h-px simples)
- [ ] Scroll reveal em todos os blocos de conteudo
- [ ] CountUp nos numeros/stats
- [ ] Shimmer text nos badges
- [ ] Glow breathe nos numeros de gates/steps
- [ ] PulseRing nos dots de timeline
- [ ] Nav responsivo com links reduzidos no mobile
- [ ] Tabelas viram cards no mobile
- [ ] iOS safe areas e viewport-fit=cover
- [ ] Touch targets minimos de 44px
- [ ] Video backgrounds com fades top/bottom (120px mobile, 200px desktop)
- [ ] Font heading sempre italic
- [ ] Nenhum emoji - apenas icones SVG inline
