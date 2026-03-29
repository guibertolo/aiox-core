# Boilerplate Guide — Sites Profissionais

**Extraido de:** site-gislaine (Dra. Gislaine Rodrigues — Advocacia de Familia)
**Stack validada:** Next.js 16 + TypeScript + Tailwind CSS v4 + Vercel
**Lighthouse:** 97 Performance / 100 Accessibility / 100 Best Practices / 100 SEO
**Data:** 2026-03-29
**Autor:** Aria (AIOX Architect)

---

## Indice

1. [Estrutura de Pastas Padrao](#1-estrutura-de-pastas-padrao)
2. [Componentes Reutilizaveis](#2-componentes-reutilizaveis)
3. [Design Tokens por Profissao](#3-design-tokens-por-profissao)
4. [Schemas JSON-LD por Profissao](#4-schemas-json-ld-por-profissao)
5. [Seguranca Padrao](#5-seguranca-padrao)
6. [SEO Checklist Padrao](#6-seo-checklist-padrao)
7. [Como Clonar o Projeto](#7-como-clonar-o-projeto)

---

## 1. Estrutura de Pastas Padrao

Todo site profissional derivado deste template deve seguir exatamente esta estrutura. Ela foi projetada para escalar de 5 a 30 paginas sem refatoracao.

```
site-[cliente]/
├── src/
│   ├── app/                            # App Router (Next.js)
│   │   ├── layout.tsx                  # Root layout — Header, Footer, Widget, LGPD, Analytics
│   │   ├── page.tsx                    # Home /
│   │   ├── globals.css                 # Design system (Tailwind @theme + CSS custom properties)
│   │   ├── favicon.ico
│   │   ├── robots.ts                   # /robots.txt dinamico
│   │   ├── sitemap.ts                  # /sitemap.xml dinamico
│   │   ├── opengraph-image.tsx         # OG image automatica (Edge Runtime)
│   │   ├── sobre/
│   │   │   └── page.tsx                # /sobre — Bio, formacao, trajetoria
│   │   ├── servicos/                   # (ou "areas" para advogados)
│   │   │   ├── page.tsx                # /servicos — Listagem
│   │   │   └── [slug]/
│   │   │       └── page.tsx            # /servicos/[slug] — Pagina por servico (SSG)
│   │   ├── blog/
│   │   │   ├── page.tsx                # /blog — Lista de artigos
│   │   │   └── [slug]/
│   │   │       └── page.tsx            # /blog/[slug] — Artigo individual (SSG)
│   │   ├── contato/
│   │   │   └── page.tsx                # /contato — Formulario
│   │   ├── faq/
│   │   │   └── page.tsx                # /faq — FAQ accordion
│   │   ├── nao-atendo/                 # Pagina de exclusao de escopo (confianca)
│   │   │   └── page.tsx
│   │   ├── privacidade/
│   │   │   └── page.tsx                # /privacidade — Politica LGPD
│   │   └── api/
│   │       └── contato/
│   │           └── route.ts            # POST /api/contato — Email via Resend
│   │
│   ├── components/
│   │   ├── analytics/
│   │   │   └── GoogleAnalytics.tsx     # GA4 condicional ao consentimento
│   │   ├── [servicos]/                 # Substituir pelo dominio (areas, consultas, etc.)
│   │   │   ├── ServicoContent.tsx
│   │   │   └── FaqAccordion.tsx
│   │   ├── blog/
│   │   │   ├── BlogCard.tsx
│   │   │   ├── BlogContent.tsx
│   │   │   ├── BlogFilters.tsx
│   │   │   └── RelatedPosts.tsx
│   │   ├── contato/
│   │   │   └── ContatoContent.tsx      # Formulario + info cards clicaveis (Maps, WhatsApp, email, Instagram)
│   │   ├── faq/
│   │   │   └── FaqContent.tsx
│   │   ├── home/
│   │   │   ├── HeroSection.tsx         # Hero com CTA principal
│   │   │   ├── TrustBar.tsx            # Barra de credenciais (CRM, OAB, anos exp.)
│   │   │   ├── ServicosSection.tsx
│   │   │   ├── DiferenciaisSection.tsx
│   │   │   ├── DepoimentosSection.tsx
│   │   │   └── CtaFinalSection.tsx
│   │   ├── layout/
│   │   │   ├── Container.tsx           # Wrapper responsivo max-w-7xl
│   │   │   ├── Header.tsx              # Sticky, hamburger, focus trap
│   │   │   └── Footer.tsx              # 3 colunas, credencial, redes
│   │   ├── lgpd/
│   │   │   └── CookieBanner.tsx        # Aceitar/recusar, localStorage
│   │   ├── seo/
│   │   │   └── JsonLd.tsx              # Generico — aceita qualquer schema
│   │   ├── ui/
│   │   │   ├── Breadcrumb.tsx          # Visual + aria-current
│   │   │   ├── Button.tsx              # 4 variantes, 3 tamanhos
│   │   │   └── SectionHeader.tsx       # Badge + titulo + descricao
│   │   └── whatsapp/
│   │       └── WhatsAppWidget.tsx      # Flutuante, contextual por pathname
│   │
│   ├── data/
│   │   ├── site-config.ts              # FONTE UNICA DE VERDADE — todos os dados do cliente
│   │   ├── servicos.ts                 # Lista de servicos/especialidades
│   │   ├── servicos-content.ts         # Conteudo detalhado por servico
│   │   └── blog-posts.ts              # Posts do blog (estatico ou CMS)
│   │
│   ├── lib/                            # Utilitarios
│   └── types/                          # TypeScript types compartilhados
│
├── public/
│   ├── images/
│   │   ├── profissional/               # Foto, perfil
│   │   └── servicos/                   # Imagens por servico
│   └── fonts/                          # Fontes locais (se nao usar next/font)
│
├── scripts/
│   └── check-css-layers.js             # Pre-build: valida camadas CSS
│
├── next.config.ts                      # Headers de seguranca + config imagens
├── tsconfig.json                       # strict: true
├── package.json
└── .env.example                        # Variaveis necessarias documentadas
```

### Regras arquiteturais da estrutura

**site-config.ts e a unica fonte de verdade.** Nunca dispersar dados do cliente (nome, telefone, OAB/CRM) diretamente nos componentes. Todo componente busca de `siteConfig`.

**Rotas dinamicas [slug] sempre SSG.** Usar `generateStaticParams()` em todas as rotas dinamicas para garantir build estatico e performance maxima.

**API Route para formulario de contato.** Nunca chamar servicos de email diretamente do cliente. Sempre via `/api/contato` com rate limiting, sanitizacao e origin check.

**Cards de contato clicaveis.** Cada item de info (endereco, telefone, email, Instagram, horario) deve ser um card clicavel (`<a>`) com icone + texto, usando o padrao:
```tsx
<a href={link} className="flex gap-4 items-center p-3 rounded-xl hover:bg-[var(--color-stone-50)] transition-colors group">
  <div className="w-11 h-11 shrink-0 rounded-xl bg-[var(--color-navy-100)] flex items-center justify-center group-hover:bg-[var(--color-navy-200)]">
    {icone}
  </div>
  <div>
    <p className="text-sm font-semibold">{titulo}</p>
    <p className="text-sm text-stone-600">{valor}</p>
  </div>
</a>
```
Links: Endereco→Google Maps, Telefone→WhatsApp, Email→mailto, Instagram→perfil, Horario→sem link (usar `<div>` com mesmo padding). Todos com `items-center` para alinhar icone com o bloco de texto.

**globals.css e o design system.** Todos os tokens (cores, tipografia, sombras, radius) vivem no bloco `@theme` do Tailwind v4. Nunca hardcodar valores de cor fora desse arquivo.

---

## 2. Componentes Reutilizaveis

Os componentes abaixo foram extraidos do site-gislaine e podem ser copiados diretamente. Cada um e documentado com as decisoes arquiteturais e pontos de customizacao.

---

### 2.1 Header

**Arquivo:** `src/components/layout/Header.tsx`
**Tipo:** Client Component (`"use client"`)
**Dependencias:** `next/link`, `next/navigation`, `@/data/site-config`

**Funcionalidades implementadas:**
- Sticky com `position: fixed` e compensador de altura (`<div aria-hidden>`)
- Scroll detection: muda opacidade e sombra apos 10px de scroll
- Desktop: nav links + CTA WhatsApp
- Mobile: hamburger com slide-in overlay (w-72)
- Focus trap completo no menu mobile (TD-A11Y-02)
- Fecha ao resize >= 768px
- Fecha ao navegar (onClick nos links mobile)
- Icones SVG inline — zero dependencia externa
- `aria-expanded`, `aria-controls`, `aria-modal`, `aria-current`
- Fecha com Escape key

**Pontos de customizacao:**
```typescript
// Alterar navLinks[] para o menu do cliente
const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Sobre", href: "/sobre" },
  { label: "Servicos", href: "/servicos" },  // adaptar nome/rota
  { label: "Blog", href: "/blog" },
  { label: "Contato", href: "/contato" },
];

// Logo: substituir monograma pelo logo SVG ou imagem
// Credencial (OAB, CRM, etc): siteConfig.profissional.credencial
```

**Decisao de design:** O monograma de letras (ex: "GR") em fonte serif dourada e superior a logos bitmap — carrega instantaneamente, escala perfeitamente, sem requisicao de imagem.

---

### 2.2 Footer

**Arquivo:** `src/components/layout/Footer.tsx`
**Tipo:** Server Component
**Dependencias:** `next/link`, `@/data/site-config`, `@/data/servicos`

**Estrutura de 3 colunas:**
- Col 1: Logo + credencial (OAB/CRM) + endereco + mapa + horario + contatos + redes sociais
- Col 2: Links rapidos (todas as paginas do site)
- Col 3: Lista de servicos/especialidades com links

**Credencial profissional em destaque:** Sempre exibir o numero de registro (OAB, CRM, CRC, CRP) em cor de acento gold/destaque. E obrigatorio para todos os conselhos profissionais.

**Barra inferior:** Copyright + link para Politica de Privacidade + credencial.

**Pontos de customizacao:**
```typescript
// Alterar Col 3 de areas para servicos do cliente
// Alterar redes sociais (Instagram -> LinkedIn para contadores, etc.)
// Ajustar textos "Advocacia e Consultoria" para a profissao
```

---

### 2.3 Button

**Arquivo:** `src/components/ui/Button.tsx`
**Tipo:** Server Component (polimorfismo: `<button>` ou `<a>` ou `<Link>`)
**Dependencias:** `next/link`

**4 variantes:**
| Variante | Uso | Forma |
|----------|-----|-------|
| `primary` | CTA principal (azul/navy) | rounded-full |
| `secondary` | CTA secundario (acento/gold) | rounded-full |
| `ghost` | Acoes terciarias (outline) | rounded-lg |
| `whatsapp` | Botao WhatsApp (verde) | rounded-full |

**3 tamanhos:**
| Tamanho | Altura minima | Uso |
|---------|---------------|-----|
| `sm` | 44px | Acoes em cards, formularios |
| `md` | 48px | CTAs padrao |
| `lg` | 52px | CTAs hero |

**Importante:** Todos os tamanhos respeitam o minimo de 44px de area de toque (WCAG 2.5.5).

**Uso como link externo:**
```tsx
<Button href="https://wa.me/..." external variant="whatsapp" size="lg">
  Agendar consulta
</Button>
```

**Uso como link interno:**
```tsx
<Button href="/contato" variant="primary" size="md">
  Entre em contato
</Button>
```

---

### 2.4 SectionHeader

**Arquivo:** `src/components/ui/SectionHeader.tsx`
**Tipo:** Server Component

**Props:**
```typescript
interface SectionHeaderProps {
  badge?: string;      // ex: "Nossos Servicos" — uppercase com border
  title: string;       // h2 por padrao (alterar com titleAs)
  description?: string;
  align?: "center" | "left";  // default: center
  titleAs?: "h1" | "h2" | "h3";
  className?: string;
}
```

**Hierarquia semantica:** Em paginas onde o SectionHeader e o titulo principal (hero), usar `titleAs="h1"`. Em secoes internas, manter `h2`. Nunca pular niveis.

---

### 2.5 Container

**Arquivo:** `src/components/layout/Container.tsx`
**Tipo:** Server Component

**Comportamento:** `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`

**Uso com tag semantica:**
```tsx
<Container as="section" className="py-16">
  ...
</Container>
```

**Regra:** Todo conteudo de pagina DEVE estar dentro de um Container. Nunca usar padding direto nas paginas.

---

### 2.6 WhatsAppWidget

**Arquivo:** `src/components/whatsapp/WhatsAppWidget.tsx`
**Tipo:** Client Component
**Dependencias:** `next/navigation`, `@/data/site-config`

**Funcionalidades:**
- Botao flutuante `fixed bottom-6 right-6 z-40`
- Animacao pulse (anel transparente `animate-ping`)
- Mensagem contextual por pathname — muda automaticamente conforme a pagina
- Fallback para mensagem default

**Como definir mensagens contextuais:**
```typescript
// No componente, mapear slugs para mensagens
const messageMap: Record<string, string> = {
  "/servicos/consulta-online": siteConfig.whatsappMessages.consultaOnline,
  "/servicos/plano-de-saude": siteConfig.whatsappMessages.planoDeSaude,
  "/contato": "Ola, estou na pagina de contato e gostaria de agendar.",
};
```

**Cuidado de posicionamento:** O widget fica em `z-40`. O CookieBanner fica em `z-50`. Header fica em `z-50`. Nao conflitar z-index.

---

### 2.7 CookieBanner

**Arquivo:** `src/components/lgpd/CookieBanner.tsx`
**Tipo:** Client Component

**Implementacao LGPD:**
- Persiste consentimento em `localStorage` com chave `"cookie-consent"`
- Valores: `"accepted"` ou `"denied"`
- Evita flash de conteudo (SSR): `useState(false)` + `useEffect` + `setTimeout(fn, 0)`
- Dispara evento customizado `"cookie-consent-changed"` para GoogleAnalytics na mesma aba
- Aparece apenas se `localStorage` nao tiver valor definido

**Integracao com GoogleAnalytics:** O GA4 escuta o evento `"cookie-consent-changed"` e so inicializa apos aceite. Nunca carrega GA4 sem consentimento explicito.

**Customizacao:**
```typescript
// Ajustar texto para a profissao/servico
// Ajustar link para /politica-de-privacidade ou /privacidade
// Cor do botao "Aceitar" deve ser a cor de acento da paleta
```

---

### 2.8 JsonLd

**Arquivo:** `src/components/seo/JsonLd.tsx`
**Tipo:** Server Component

**Uso:**
```tsx
// Schema simples
<JsonLd data={{ "@context": "https://schema.org", "@type": "Dentist", ... }} />

// Array de schemas
<JsonLd data={[localBusinessSchema, faqSchema]} />
```

**Regra:** Sempre injetar schemas nas paginas via este componente, nao inline. Facilita auditoria e manutencao.

---

### 2.9 Breadcrumb

**Arquivo:** `src/components/ui/Breadcrumb.tsx`
**Tipo:** Server Component
**Dependencias:** `next/link`, `lucide-react` (ChevronRight)

**Uso:**
```tsx
<Breadcrumb items={[
  { label: "Home", href: "/" },
  { label: "Servicos", href: "/servicos" },
  { label: "Consulta Online" },  // ultimo item: sem href
]} />
```

**Acessibilidade:** Ultimo item recebe `aria-current="page"` automaticamente.

**Schema complementar (inserir no mesmo page.tsx):**
```typescript
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: `${siteConfig.url}` },
    { "@type": "ListItem", position: 2, name: "Servicos", item: `${siteConfig.url}/servicos` },
    { "@type": "ListItem", position: 3, name: "Consulta Online" },
  ],
};
```

---

### 2.10 GoogleAnalytics

**Arquivo:** `src/components/analytics/GoogleAnalytics.tsx`
**Tipo:** Client Component
**Dependencias:** `next/script`, `@/data/site-config`

**Comportamento:**
- Nao carrega nada se `localStorage["cookie-consent"] !== "accepted"`
- Escuta `StorageEvent` (outras abas) e evento customizado (mesma aba)
- Usa `strategy="afterInteractive"` para nao bloquear LCP
- `anonymize_ip: true` por padrao (LGPD)
- GA_ID vem de `NEXT_PUBLIC_GA_MEASUREMENT_ID` — nunca hardcoda

**Configuracao em `.env.local`:**
```
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

---

## 3. Design Tokens por Profissao

O design system usa Tailwind CSS v4 com o sistema `@theme` diretamente em `globals.css`. Para cada tipo de profissional, substituir a paleta no bloco `@theme`.

**Estrutura padrao do @theme (copiar e adaptar):**
```css
@theme {
  /* Cor principal — confianca/autoridade */
  --color-primary-50:  [shade mais claro];
  --color-primary-900: [shade mais escuro];
  --color-primary-950: [fundo escuro do footer];

  /* Cor de acento — chamadas, destaques, CTA */
  --color-accent-300: [hover claro];
  --color-accent-400: [texto/borda];
  --color-accent-500: [botao principal];
  --color-accent-600: [hover escuro];

  /* Neutros (manter stone — funciona com todas as paletas) */
  /* ... stone-50 a stone-900 ... */

  /* Tipografia */
  --font-heading: [fonte serif ou display], Georgia, serif;
  --font-body: [fonte sans], system-ui, sans-serif;
}
```

---

### 3.1 Advogado — Navy + Gold

Transmite: confianca, autoridade, seriedade, estabilidade.

```css
@theme {
  /* Azul marinho — autoridade juridica */
  --color-primary-50:  #f0f4f8;
  --color-primary-100: #d9e2ec;
  --color-primary-700: #334e68;
  --color-primary-800: #243b53;
  --color-primary-900: #102a43;
  --color-primary-950: #0a1929;

  /* Dourado terracota — elegancia sem ostentacao */
  --color-accent-300: #edaf44;
  --color-accent-400: #e6921e;
  --color-accent-500: #c97516;
  --color-accent-600: #a05c12;

  /* Tipografia: Lora (heading serif) + Inter (body) */
  --font-heading: var(--font-lora), Georgia, serif;
  --font-body: var(--font-inter), system-ui, sans-serif;
}
```

**Fontes:** Lora (heading) + Inter (body) — carregamento via `next/font/google`

**Personalidade visual:** Fundo branco/stone-50, cards com borda sutil, heading navy, acento gold apenas em CTAs e destaques. Nunca usar gold como fundo de secao inteira.

---

### 3.2 Medico — Blue + Green

Transmite: saude, tranquilidade, higiene, profissionalismo cientifico.

```css
@theme {
  /* Azul medico — ciencia, confianca */
  --color-primary-50:  #eff6ff;
  --color-primary-100: #dbeafe;
  --color-primary-700: #1d4ed8;
  --color-primary-800: #1e40af;
  --color-primary-900: #1e3a8a;
  --color-primary-950: #172554;

  /* Verde saude — vitalidade, cura */
  --color-accent-300: #86efac;
  --color-accent-400: #4ade80;
  --color-accent-500: #22c55e;
  --color-accent-600: #16a34a;

  /* Tipografia: Source Serif 4 (heading) + Inter (body) */
  --font-heading: var(--font-source-serif), Georgia, serif;
  --font-body: var(--font-inter), system-ui, sans-serif;
}
```

**Fontes recomendadas:** Source Serif 4 ou Merriweather (heading) + Inter (body)

**Diferencial:** Usar imagens de alta qualidade mostrando consultorio limpo e bem iluminado. Evitar stock photos genericas de saude.

---

### 3.3 Dentista — Teal + White

Transmite: limpeza, modernidade, precisao, estetica.

```css
@theme {
  /* Teal — limpeza, modernidade dental */
  --color-primary-50:  #f0fdfa;
  --color-primary-100: #ccfbf1;
  --color-primary-700: #0f766e;
  --color-primary-800: #115e59;
  --color-primary-900: #134e4a;
  --color-primary-950: #042f2e;

  /* Branco quente como acento — esterilidade positiva */
  --color-accent-300: #99f6e4;
  --color-accent-400: #2dd4bf;
  --color-accent-500: #14b8a6;
  --color-accent-600: #0d9488;

  /* Tipografia: Plus Jakarta Sans (heading) + Inter (body) */
  --font-heading: var(--font-plus-jakarta), system-ui, sans-serif;
  --font-body: var(--font-inter), system-ui, sans-serif;
}
```

**Fontes recomendadas:** Plus Jakarta Sans ou DM Sans (ambas heading+body — perfil mais moderno, sans-serif puro)

**Diferencial:** Dentistas com foco em estetica podem usar paleta mais vibrante. Dentistas pediatricos: laranja/amarelo suave. Implantes/reabilitacao: ouro + dark.

---

### 3.4 Contador — Dark Blue + Gray

Transmite: seriedade, precisao numerica, confiabilidade fiscal.

```css
@theme {
  /* Azul escuro — seriedade contabil */
  --color-primary-50:  #f8fafc;
  --color-primary-100: #f1f5f9;
  --color-primary-700: #1e3a5f;
  --color-primary-800: #162d4a;
  --color-primary-900: #0f2035;
  --color-primary-950: #080f1a;

  /* Cinza azulado como acento — precisao, dados */
  --color-accent-300: #94a3b8;
  --color-accent-400: #64748b;
  --color-accent-500: #475569;
  --color-accent-600: #334155;

  /* Tipografia: IBM Plex Sans (heading) + Inter (body) */
  --font-heading: var(--font-ibm-plex), system-ui, sans-serif;
  --font-body: var(--font-inter), system-ui, sans-serif;
}
```

**Fontes recomendadas:** IBM Plex Sans ou Roboto Slab (heading) + Inter (body)

**Nota:** Contadores com foco em startups/MEI podem usar paleta mais vibrante (indigo + cyan). Contadores tributaristas tradicionais: manter dark blue + gray.

---

### 3.5 Psicologo — Purple + Warm Tones

Transmite: acolhimento, escuta, empatia, seguranca emocional.

```css
@theme {
  /* Roxo suave — transcendencia, sabedoria, acolhimento */
  --color-primary-50:  #faf5ff;
  --color-primary-100: #f3e8ff;
  --color-primary-700: #7e22ce;
  --color-primary-800: #6b21a8;
  --color-primary-900: #581c87;
  --color-primary-950: #3b0764;

  /* Rosê quente — humanidade, emocao */
  --color-accent-300: #f9a8d4;
  --color-accent-400: #f472b6;
  --color-accent-500: #ec4899;
  --color-accent-600: #db2777;

  /* Tipografia: Cormorant Garamond (heading) + Nunito (body) */
  --font-heading: var(--font-cormorant), Georgia, serif;
  --font-body: var(--font-nunito), system-ui, sans-serif;
}
```

**Fontes recomendadas:** Cormorant Garamond (heading elegante) + Nunito ou Lato (body arredondado/amigavel)

**Nota importante:** Para psicologos, o tom visual deve ser mais suave e acolhedor. Evitar linhas duras, preferir bordas arredondadas maiores (`--radius-lg: 20px`), espacamento generoso.

---

### 3.6 Nutricionista — Green + Orange

Transmite: saude, vitalidade, energia, natureza, alimentacao consciente.

```css
@theme {
  /* Verde natural — saude, nutricao, natureza */
  --color-primary-50:  #f0fdf4;
  --color-primary-100: #dcfce7;
  --color-primary-700: #15803d;
  --color-primary-800: #166534;
  --color-primary-900: #14532d;
  --color-primary-950: #052e16;

  /* Laranja vibrante — energia, apetite, positividade */
  --color-accent-300: #fdba74;
  --color-accent-400: #fb923c;
  --color-accent-500: #f97316;
  --color-accent-600: #ea580c;

  /* Tipografia: Nunito (heading) + Inter (body) */
  --font-heading: var(--font-nunito), system-ui, sans-serif;
  --font-body: var(--font-inter), system-ui, sans-serif;
}
```

**Fontes recomendadas:** Nunito ou Poppins (heading arredondado, amigavel) + Inter (body)

**Diferencial:** Nutricionistas esportivos podem usar mais laranja/vermelho. Nutricionistas funcionais/integrativas: verde + terracota. Emagrecimento: verde + rosa.

---

## 4. Schemas JSON-LD por Profissao

Todos os schemas sao injetados via `<JsonLd data={...} />` no `page.tsx` de cada pagina relevante.

### 4.1 Advogado

**Pagina Home — schemas obrigatorios:**
```typescript
const legalServiceSchema = {
  "@context": "https://schema.org",
  "@type": ["LegalService", "LocalBusiness"],
  name: "Nome do Advogado Advocacia",
  description: "Advogado especializado em [area] em [cidade]",
  url: siteConfig.url,
  telephone: `+55${siteConfig.contato.whatsapp}`,
  email: siteConfig.contato.email,
  priceRange: "$$",  // indicador de faixa de preco
  address: {
    "@type": "PostalAddress",
    streetAddress: "...",
    addressLocality: "Sao Paulo",
    addressRegion: "SP",
    postalCode: "...",
    addressCountry: "BR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "-23.XXXX",
    longitude: "-46.XXXX",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
  ],
  areaServed: ["Sao Paulo", "ABC Paulista"],
  knowsAbout: ["Divorcio", "Guarda de Filhos", "Pensao Alimenticia"],
  hasCredential: {
    "@type": "EducationalOccupationalCredential",
    name: "OAB/SP 000.000",
  },
};
```

**Pagina FAQ:**
```typescript
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.pergunta,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.resposta,
    },
  })),
};
```

**Pagina Sobre:**
```typescript
const personSchema = {
  "@context": "https://schema.org",
  "@type": ["Person", "Attorney"],
  name: "Nome Completo do Advogado",
  jobTitle: "Advogado(a) especialista em [area]",
  url: siteConfig.url,
  alumniOf: { "@type": "CollegeOrUniversity", name: "Nome da Faculdade" },
  memberOf: { "@type": "Organization", name: "OAB/SP" },
  knowsAbout: ["Direito de Familia", "Divorcio"],
  sameAs: [siteConfig.contato.instagram, siteConfig.contato.linkedin],
};
```

**Paginas de Servico ([slug]):**
```typescript
const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: servico.titulo,
  description: servico.descricao,
  provider: { "@type": "LegalService", name: "...", url: siteConfig.url },
  serviceType: servico.tipo,
  areaServed: siteConfig.escritorio.cidade,
};
```

---

### 4.2 Medico

**Pagina Home:**
```typescript
const medicalSchema = {
  "@context": "https://schema.org",
  "@type": ["MedicalBusiness", "Physician"],
  name: "Dr(a). Nome Completo",
  medicalSpecialty: "https://schema.org/GeneralPractice",  // substituir pela especialidade
  telephone: "+55...",
  address: { "@type": "PostalAddress", ... },
  availableService: [
    { "@type": "MedicalTherapy", name: "Consulta presencial" },
    { "@type": "MedicalTherapy", name: "Teleconsulta" },
  ],
  hasCredential: {
    "@type": "EducationalOccupationalCredential",
    name: "CRM/SP 000000",
    recognizedBy: { "@type": "Organization", name: "Conselho Federal de Medicina" },
  },
};
```

**Especialidades medicas e seus schemas:**
| Especialidade | @type adicional |
|---------------|-----------------|
| Clinico Geral | `"GeneralPractitioner"` |
| Pediatra | `"Pediatric"` |
| Cardiologista | `"Cardiovascular"` |
| Dermato | `"Dermatologic"` |
| Ginecologista | `"Gynecologic"` |

---

### 4.3 Dentista

**Pagina Home:**
```typescript
const dentistSchema = {
  "@context": "https://schema.org",
  "@type": ["Dentist", "MedicalBusiness"],
  name: "Dr(a). Nome — Odontologia",
  medicalSpecialty: "https://schema.org/Dentistry",
  telephone: "+55...",
  address: { "@type": "PostalAddress", ... },
  availableService: [
    { "@type": "MedicalTherapy", name: "Implantes dentarios" },
    { "@type": "MedicalTherapy", name: "Clareamento dental" },
    { "@type": "MedicalTherapy", name: "Ortodontia" },
  ],
  hasCredential: {
    "@type": "EducationalOccupationalCredential",
    name: "CRO/SP 00000",
    recognizedBy: { "@type": "Organization", name: "Conselho Federal de Odontologia" },
  },
};
```

---

### 4.4 Contador

**Pagina Home:**
```typescript
const accountingSchema = {
  "@context": "https://schema.org",
  "@type": ["AccountingService", "ProfessionalService"],
  name: "Nome do Escritorio Contabil",
  description: "Servicos de contabilidade para empresas em [cidade]",
  telephone: "+55...",
  address: { "@type": "PostalAddress", ... },
  knowsAbout: ["Imposto de Renda", "Abertura de Empresa", "MEI", "Folha de Pagamento"],
  hasCredential: {
    "@type": "EducationalOccupationalCredential",
    name: "CRC/SP 0-000000/O-0",
    recognizedBy: { "@type": "Organization", name: "Conselho Federal de Contabilidade" },
  },
  serviceArea: { "@type": "City", name: "[cidade]" },
};
```

---

### 4.5 Psicologo

**Pagina Home:**
```typescript
const psychologistSchema = {
  "@context": "https://schema.org",
  "@type": ["MedicalBusiness", "ProfessionalService"],
  name: "Psi. Nome Completo — Psicologia",
  description: "Atendimento psicologico individual, de casal e familia em [cidade]",
  medicalSpecialty: "https://schema.org/PsychiatryOncology",  // aproximacao valida
  telephone: "+55...",
  address: { "@type": "PostalAddress", ... },
  availableService: [
    { "@type": "PsychologicalTreatment", name: "Psicoterapia individual" },
    { "@type": "PsychologicalTreatment", name: "Terapia de casal" },
  ],
  hasCredential: {
    "@type": "EducationalOccupationalCredential",
    name: "CRP 06/000000",
    recognizedBy: { "@type": "Organization", name: "Conselho Federal de Psicologia" },
  },
};
```

---

## 5. Seguranca Padrao

Todo site profissional DEVE implementar estes controles antes de ir para producao. Extraidos e validados pela auditoria de seguranca do site-gislaine.

### 5.1 Headers HTTP (next.config.ts)

Copiar exatamente este bloco — apenas ajustar as origens permitidas no CSP:

```typescript
// next.config.ts
import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],  // WebP/AVIF automatico
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // Impede clickjacking — OWASP A05
          { key: "X-Frame-Options", value: "DENY" },

          // Impede MIME-sniffing
          { key: "X-Content-Type-Options", value: "nosniff" },

          // Controla informacoes no Referer
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },

          // Desativa APIs sensiveis nao usadas
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },

          // HSTS — forca HTTPS, previne SSL stripping (LGPD Art. 46)
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },

          // CSP — restringe origens de scripts/estilos/frames
          // AJUSTAR: adicionar dominio do cliente e servicos usados
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              `script-src 'self' 'unsafe-inline' ${isDev ? "'unsafe-eval'" : ""} https://www.googletagmanager.com`,
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: https:",
              "font-src 'self'",
              "frame-src https://maps.google.com https://www.google.com",
              "connect-src 'self' https://www.google-analytics.com https://api.whatsapp.com",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
```

**Atencao para CMS:** Se usar Sanity ou Contentful, adicionar os dominios deles no CSP (`img-src`, `connect-src`).

---

### 5.2 Rate Limiting na API de Contato

Implementacao in-memory, sem dependencias externas. Limite: 3 envios por IP a cada 15 minutos.

```typescript
// src/app/api/contato/route.ts — trecho de rate limiting

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 3;
const WINDOW_MS = 15 * 60 * 1000; // 15 minutos

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }

  if (entry.count >= RATE_LIMIT) return false;
  entry.count++;
  return true;
}

// Limpeza horaria — evita memory leak em producao
setInterval(() => {
  const now = Date.now();
  for (const [ip, entry] of rateLimitMap) {
    if (now > entry.resetAt) rateLimitMap.delete(ip);
  }
}, 60 * 60 * 1000);
```

**Nota:** Em Vercel (serverless), o Map e resetado a cada cold start. Para rate limiting persistente em producao de alto volume, usar Upstash Redis. Para sites profissionais com baixo volume (< 100 contatos/dia), o in-memory e suficiente.

---

### 5.3 Origin Check (protecao CSRF basica)

```typescript
// Origens permitidas para verificacao CSRF
const ALLOWED_ORIGINS = [
  "https://dominio-producao.com.br",
  "https://site-cliente.vercel.app",
  ...(process.env.NODE_ENV === "development"
    ? ["http://localhost:3000"]
    : []),
];

// Dentro do handler POST:
const origin = request.headers.get("origin") ?? "";
if (!ALLOWED_ORIGINS.some((o) => origin.startsWith(o))) {
  return NextResponse.json({ error: "Forbidden" }, { status: 403 });
}
```

---

### 5.4 Sanitizacao de Inputs

```typescript
// Remove tags HTML — previne XSS via formulario
function stripHtml(value: string): string {
  return value.replace(/<[^>]*>/g, "").trim();
}

// Validar campo por campo com limites de comprimento
function validarCampos(body: Record<string, unknown>) {
  const { nome, telefone, mensagem } = body;

  if (typeof nome !== "string") return { valido: false };

  const nomeLimpo = stripHtml(nome);
  if (nomeLimpo.length < 2 || nomeLimpo.length > 100) return { valido: false };

  // Telefone: apenas digitos, espacos, hifens, parenteses
  const telefoneLimpo = stripHtml(String(telefone));
  if (!/^[\d\s\-()]+$/.test(telefoneLimpo)) return { valido: false };

  // Mensagem: limitar comprimento maximo
  const mensagemLimpa = stripHtml(String(mensagem));
  if (mensagemLimpa.length < 10 || mensagemLimpa.length > 2000) return { valido: false };

  return { valido: true, dados: { nomeLimpo, telefoneLimpo, mensagemLimpa } };
}
```

---

### 5.5 Honeypot Anti-Spam

Campo invisivel no formulario que bots preenchem mas humanos nao:

```tsx
// No formulario (ContatoContent.tsx) — campo oculto
<input
  type="text"
  name="website"
  tabIndex={-1}
  autoComplete="off"
  aria-hidden="true"
  className="hidden"
/>
```

```typescript
// Na API route — se preenchido, e bot
if (body.website) {
  // Retorna 200 para nao revelar a deteccao ao bot
  return NextResponse.json({ success: true });
}
```

---

### 5.6 LGPD — Cookie Banner + Politica de Privacidade

**Obrigacoes legais para todo site profissional:**

1. Banner de cookies com opcoes aceitar/recusar antes de carregar trackers
2. Pagina `/privacidade` com politica completa incluindo:
   - Dados coletados e finalidade
   - Tempo de retencao
   - Direitos do titular (acesso, correcao, exclusao)
   - Dados de contato do responsavel (DPO ou profissional)
   - Terceiros que recebem dados (Google Analytics, Resend)
3. GA4 so carrega apos consentimento explicito
4. Logs de formulario sem dados pessoais (LGPD Art. 46):
   ```typescript
   // CORRETO — log anonimizado
   console.log("[CONTATO]", new Date().toISOString(), "area:", area);
   // ERRADO — nao logar nome, telefone, email
   ```

---

### 5.7 robots.ts — Proteger rotas sensiveis

```typescript
// src/app/robots.ts
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/admin", "/admin/"],  // nunca indexar rotas de API
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
```

---

## 6. SEO Checklist Padrao

Todo site profissional deve passar por esta checklist antes do go-live.

### 6.1 Metadata Base

- [ ] `metadataBase` definido com URL de producao em `layout.tsx`
- [ ] `title.template` configurado: `"%s | Nome do Profissional — Especialidade"`
- [ ] `description` entre 120-160 caracteres com cidade e especialidade
- [ ] `keywords` incluindo variacoes de cidade (ex: "SBC", "Sao Bernardo", "ABC Paulista")
- [ ] `authors` apontando para o profissional
- [ ] `robots.index: true, follow: true`

### 6.2 Open Graph

- [ ] `og:type = "website"` na home
- [ ] `og:locale = "pt_BR"`
- [ ] `og:image` com dimensoes 1200x630
- [ ] OG image gerada via `opengraph-image.tsx` (Edge Runtime) ou imagem estatica em `/public`
- [ ] `twitter:card = "summary_large_image"`

### 6.3 Local SEO

- [ ] Geo meta tags: `geo.region`, `geo.placename`, `geo.position`, `ICBM`
- [ ] Schema `LocalBusiness` com `address`, `geo`, `telephone`, `openingHours`
- [ ] `areaServed` listando cidade + regiao + municipios vizinhos atendidos
- [ ] Google My Business: URL do site vinculada ao perfil
- [ ] NAP (Nome, Endereco, Telefone) identico no site e no GMB

### 6.4 Sitemap e Robots

- [ ] `sitemap.ts` incluindo todas as paginas estaticas e dinamicas
- [ ] Prioridades corretas: home=1.0, servicos=0.9, blog=0.7-0.8, privacidade=0.3
- [ ] `robots.ts` bloqueando `/api/`, `/admin` e `/admin/`
- [ ] Sitemap verificado no Google Search Console apos deploy

### 6.4.1 Painel Admin — Notas de Implementacao

**IMPORTANTE:** No painel admin (`/admin`), usar **inline styles** para cores de botoes em vez de classes Tailwind. O Tailwind v4 com `@theme` nao renderiza classes customizadas (ex: `bg-navy-900`) em paginas que usam layout separado do admin. Usar:
```tsx
style={{ backgroundColor: '#1a2744', color: '#ffffff', border: '2px solid #2d4163' }}
onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#243b53'; }}
onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#1a2744'; }}
```
Isso garante que botoes funcionam independente da configuracao do Tailwind. Aplicar em todos os botoes do admin: login, publicar, remover, sair.

### 6.5 Schema Markup

- [ ] `LegalService` / `MedicalBusiness` / `ProfessionalService` na home
- [ ] `Person` + credencial profissional (OAB/CRM) na pagina /sobre
- [ ] `FAQPage` na pagina /faq e nas paginas de servico (se tiverem FAQ)
- [ ] `BreadcrumbList` em todas as paginas filhas
- [ ] `BlogPosting` ou `Article` em cada post do blog
- [ ] Validar todos os schemas em: https://validator.schema.org

### 6.6 Performance (Core Web Vitals)

- [ ] Fontes via `next/font/google` (GDPR-friendly, sem requisicao externa em prod)
- [ ] Imagens via `next/image` com `width`, `height` e `alt` descritivo
- [ ] Imagens hero com `priority` prop (precarga LCP)
- [ ] Imagens abaixo da dobra com `loading="lazy"` (padrao do next/image)
- [ ] `formats: ["image/avif", "image/webp"]` no `next.config.ts`
- [ ] Lighthouse Performance >= 90 antes do go-live

### 6.7 Acessibilidade

- [ ] Skip link "Pular para o conteudo principal" como primeiro elemento do body
- [ ] Todos os `<img>` com `alt` descritivo (imagens decorativas: `alt=""`)
- [ ] Focus trap no menu mobile
- [ ] Contraste minimo 4.5:1 para texto normal (WCAG AA)
- [ ] Tamanho minimo de area de toque: 44x44px para todos os elementos interativos
- [ ] `lang="pt-BR"` no `<html>`
- [ ] `aria-label` em CTAs que so tem icone
- [ ] Testar com leitor de tela (NVDA ou VoiceOver)

### 6.8 Credencial Profissional

- [ ] OAB/CRM/CRC/CRP visivel no header ou logo
- [ ] Credencial no footer em destaque (cor de acento)
- [ ] Credencial nos metadados (`other: { "lawyer:oab": "..." }`)
- [ ] Schema `hasCredential` no `LegalService`/`MedicalBusiness`
- [ ] Numero correto e atualizado (verificar no site do conselho)

### 6.9 Pagina de Privacidade (LGPD)

- [ ] URL `/privacidade` ou `/politica-de-privacidade`
- [ ] Link no footer (sempre visivel)
- [ ] Link no CookieBanner
- [ ] Conteudo atualizado com dados reais do responsavel

---

## 7. Como Clonar o Projeto

Passo a passo para criar um novo site profissional a partir do site-gislaine como template.

### Passo 1 — Copiar o projeto

```bash
# Copiar a pasta do site-gislaine para o novo projeto
cp -r "C:\Users\guiro\OneDrive\Documentos\Claude\apps\site-gislaine" \
      "C:\Users\guiro\OneDrive\Documentos\Claude\apps\site-[cliente]"

# Entrar na pasta
cd "C:\Users\guiro\OneDrive\Documentos\Claude\apps\site-[cliente]"

# Limpar node_modules e lock files
rm -rf node_modules package-lock.json

# Instalar dependencias
npm install
```

### Passo 2 — Configurar variaveis de ambiente

```bash
# Copiar o arquivo de exemplo
cp .env.example .env.local
```

Editar `.env.local`:
```bash
# URL de producao (obrigatorio para sitemap e metadata)
NEXT_PUBLIC_SITE_URL=https://[dominio-do-cliente].com.br

# Google Analytics 4 (opcional — deixar vazio para desabilitar)
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Resend — servico de email para formulario de contato
RESEND_API_KEY=re_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

### Passo 3 — Atualizar site-config.ts

Este e o arquivo mais importante. Substituir TODOS os dados do cliente:

```typescript
// src/data/site-config.ts

export const siteConfig = {
  profissional: {
    // Para advogado:
    nome: "Dr(a). [Nome Completo]",
    credencial: "OAB/SP [000.000]",
    especialidade: "[Especialidade]",

    // Para medico:
    // credencial: "CRM/SP [000000]",

    // Para dentista:
    // credencial: "CRO/SP [00000]",

    // Para contador:
    // credencial: "CRC/SP 0-[000000]/O-0",

    // Para psicologo:
    // credencial: "CRP 06/[000000]",
  },

  escritorio: {
    nome: "[Nome do Escritorio/Clinica]",
    cidade: "[Cidade]",
    estado: "SP",
    regiao: "[Regiao — ex: ABC Paulista, Zona Sul SP]",
    endereco: {
      logradouro: "[Rua/Av]",
      numero: "[Numero]",
      complemento: "[Andar/Sala]",
      bairro: "[Bairro]",
      cidade: "[Cidade]",
      estado: "SP",
      cep: "[CEP]",
    },
    horario: {
      semana: "Segunda a Sexta, 9h as 18h",
      sabado: "Sabados mediante agendamento",
      observacao: "Atendimento remoto disponivel",
    },
  },

  contato: {
    whatsapp: "55[DDD][NUMERO]",  // ex: "5511999999999"
    whatsappExibicao: "([DDD]) [NUMERO]",
    email: "[email@dominio.com.br]",
    instagram: "https://www.instagram.com/[handle]/",
  },

  url: "https://[dominio].com.br",

  whatsappMessages: {
    default: "Ola [Nome], encontrei seu site e gostaria de agendar uma consulta.",
    // Adicionar mensagens contextuais por servico
  },

  analytics: {
    ga4MeasurementId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "",
  },
} as const;
```

### Passo 4 — Adaptar o design system

Editar `src/app/globals.css` — bloco `@theme`:

1. Substituir a paleta navy + gold pela paleta da profissao (ver secao 3)
2. Substituir as fontes se necessario (ver fontes recomendadas por profissao)
3. Ajustar `--radius-*` se o estilo visual pede formas mais/menos arredondadas

**Tambem atualizar as fontes no `layout.tsx`:**
```typescript
// Para psicologos — exemplo com Cormorant + Nunito
import { Cormorant_Garamond, Nunito } from "next/font/google";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
});
```

### Passo 5 — Adaptar o conteudo de servicos

1. Renomear a pasta `src/app/areas/` para `src/app/servicos/` (ou o nome da profissao)
2. Editar `src/data/areas.ts` (renomear para `servicos.ts`)
3. Editar `src/data/areas-content.ts` com o conteudo real
4. Atualizar os `navLinks` no Header
5. Atualizar os links no Footer

### Passo 6 — Adaptar o monograma

No `Header.tsx` e `Footer.tsx`, substituir as iniciais e o link do logo:

```tsx
// Header.tsx — linha ~143
<span className="font-heading font-bold text-2xl ...">
  {siteConfig.profissional.iniciais}  {/* ex: "DR", "MC", "AB" */}
</span>
```

Ou substituir por uma tag `<Image>` com o logo do cliente.

### Passo 7 — Substituir o schema JSON-LD

No `src/app/page.tsx`, substituir o schema `LegalService` pelo schema correto para a profissao (ver secao 4).

### Passo 8 — Configurar origens no CORS da API

Editar `src/app/api/contato/route.ts`:

```typescript
const ALLOWED_ORIGINS = [
  "https://[dominio-producao].com.br",
  "https://site-[cliente].vercel.app",
  ...(process.env.NODE_ENV === "development"
    ? ["http://localhost:3000"]
    : []),
];
```

### Passo 9 — Atualizar a Politica de Privacidade

Editar `src/app/privacidade/page.tsx` com os dados reais:
- Nome completo do responsavel pelo tratamento de dados
- E-mail de contato para requisicoes de titulares de dados
- Lista atualizada de ferramentas (Google Analytics, Resend, etc.)
- Data de vigencia da politica

### Passo 10 — Deploy na Vercel

```bash
# Instalar Vercel CLI (se nao tiver)
npm install -g vercel

# Dentro da pasta do projeto
vercel

# Seguir o wizard:
# - Linked to existing project? No
# - Project name: site-[cliente]
# - Root directory: ./
# - Override settings? No

# Configurar variaveis de ambiente na dashboard Vercel:
# Settings > Environment Variables
# NEXT_PUBLIC_GA_MEASUREMENT_ID (se usar GA4)
# RESEND_API_KEY (para o formulario de contato)
```

### Passo 11 — Verificar SEO pos-deploy

1. Abrir `https://[dominio-staging].vercel.app/sitemap.xml` — deve listar todas as paginas
2. Abrir `https://[dominio-staging].vercel.app/robots.txt` — deve bloquear `/api/`
3. Testar Open Graph: https://www.opengraph.xyz/
4. Testar schemas: https://validator.schema.org/
5. Rodar Lighthouse no Chrome DevTools — alvo: 90+ em todas as categorias
6. Adicionar dominio ao Google Search Console e submeter sitemap

---

## Variaveis de Ambiente Necessarias

```bash
# .env.example — copiar para .env.local e preencher

# URL publica do site (sem barra final)
NEXT_PUBLIC_SITE_URL=https://[dominio].com.br

# Google Analytics 4 — deixar vazio para desabilitar
NEXT_PUBLIC_GA_MEASUREMENT_ID=

# Resend — email transacional para formulario de contato
# Obter em: https://resend.com
RESEND_API_KEY=
```

---

## Dependencias do Projeto

```json
{
  "dependencies": {
    "next": "^16.2.1",
    "react": "^19.2.4",
    "react-dom": "^19.2.4",
    "resend": "^4.x",
    "lucide-react": "^0.x"
  },
  "devDependencies": {
    "typescript": "^5",
    "@types/node": "^22",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "tailwindcss": "^4",
    "@tailwindcss/postcss": "^4",
    "eslint": "^9",
    "eslint-config-next": "^16"
  }
}
```

**Nota sobre Tailwind v4:** Esta versao usa `@theme` diretamente no CSS. Nao existe `tailwind.config.js`. O `postcss.config.mjs` usa `@tailwindcss/postcss`. Esta e uma mudanca arquitetural significativa em relacao ao Tailwind v3.

---

## Checklist de Entrega ao Cliente

Antes de entregar o site ao cliente, verificar:

### Conteudo
- [ ] Todos os dados de `site-config.ts` preenchidos corretamente
- [ ] Numero da credencial profissional verificado no site do conselho
- [ ] Foto do profissional com boa resolucao e sem distorcao
- [ ] Textos revisados para erros gramaticais
- [ ] Todos os links internos funcionando

### Funcionalidade
- [ ] Formulario de contato enviando email para o profissional
- [ ] WhatsApp abrindo na mensagem correta
- [ ] Menu mobile funcionando em iOS e Android
- [ ] Cookie Banner aparecendo na primeira visita
- [ ] GA4 so iniciando apos aceite de cookies

### SEO e Seguranca
- [ ] Lighthouse >= 90 em Performance, 100 em Accessibility
- [ ] Sitemap submetido ao Google Search Console
- [ ] Headers de seguranca verificados via: https://securityheaders.com
- [ ] Schema markup validado sem erros

### Apos Go-Live
- [ ] Dominio proprio configurado na Vercel
- [ ] SSL ativo (automatico na Vercel)
- [ ] Google My Business atualizado com URL do novo site
- [ ] Primeiro post do blog publicado (para indexar o blog)
- [ ] Cliente treinado para adicionar posts/depoimentos

---

*Boilerplate Guide extraido do projeto site-gislaine*
*Proximo review recomendado: quando houver novo site concluido que adicione padroes novos*
