# Story Templates — Sites Profissionais

**Versao:** 1.0
**Criado por:** River (SM)
**Data:** 2026-03-29
**Baseado em:** Site Dra. Gislaine Rodrigues (Direito de Familia — SBC/SP)

---

## Como usar este documento

Estes templates cobrem o ciclo completo de desenvolvimento de um site profissional para **advogados, medicos, dentistas, psicologos, contadores, fisioterapeutas** e qualquer outro profissional liberal.

### Placeholders a substituir antes de usar

| Placeholder | Exemplo Advogado | Exemplo Medico | Exemplo Dentista |
|---|---|---|---|
| `{PROFISSAO}` | Advogada | Médica | Dentista |
| `{PROFISSAO_PLURAL}` | Advogados | Médicos | Dentistas |
| `{NOME}` | Dra. Gislaine Rodrigues | Dr. Carlos Mendes | Dra. Ana Paula Lima |
| `{NOME_CURTO}` | Gislaine | Carlos | Ana Paula |
| `{CIDADE}` | São Bernardo do Campo | Campinas | Porto Alegre |
| `{ESTADO}` | SP | SP | RS |
| `{ESPECIALIDADE}` | Direito de Família | Ortopedia | Implantodontia |
| `{CONSELHO}` | OAB/SP | CRM/SP | CRO/RS |
| `{NUMERO_CONSELHO}` | 456.789 | 123.456 | 789.012 |
| `{AREA_1}` a `{AREA_N}` | Divórcio, Guarda, Inventário | Coluna, Joelho, Quadril | Implantes, Ortodontia, Clareamento |
| `{COR_PRIMARIA}` | Navy (#1a3a6b) | Verde escuro (#1a4a2b) | Azul claro (#1a6b8a) |
| `{COR_ACCENT}` | Dourado (#c8a96e) | Dourado (#c8a96e) | Prata (#8a9cb0) |
| `{FONTE_TITULO}` | Playfair Display | Merriweather | Raleway |
| `{ANOS_EXPERIENCIA}` | 10 | 15 | 8 |
| `{NUM_SERVICOS}` | 6 | 5 | 7 |
| `{WHATSAPP_HOME}` | Ola {NOME_CURTO}, encontrei seu site e gostaria de agendar uma consulta. | Ola Dr. {NOME_CURTO}, gostaria de agendar uma consulta. | Ola, gostaria de agendar uma avaliacao. |
| `{CONFORMIDADE_PROFISSIONAL}` | Resolucao OAB 94/2000 | CFM / CRM | CFO / CRO |

### Convencoes neste documento

- Complexidade: **P** (Pequena, ~1 dia), **M** (Media, ~2-3 dias), **G** (Grande, ~4-5 dias)
- Status inicial de todas as stories: **Draft**
- Executor padrao: @dev (Dex)
- Quality Gate: @qa (Quinn)
- Todos os CAs sao testáveis e rastreavéis ao PRD do projeto

---

## Indice de Templates

| Epic | Titulo | Stories |
|---|---|---|
| Epic 1 | Estrutura Base + Home | T.1, T.2, T.3, T.4 |
| Epic 2 | Paginas Institucionais | T.5, T.6, T.7, T.8 |
| Epic 3 | Servicos/Areas de Atuacao | T.9, T.10 |
| Epic 4 | Blog | T.11, T.12 |
| Epic 5 | SEO + Performance + Seguranca | T.13, T.14, T.15 |
| Epic 6 | Admin + Deploy | T.16, T.17 |

---

# EPIC TEMPLATE 1 — Estrutura Base + Home

**Objetivo:** Configurar o projeto do zero, criar o design system e implementar a Home Page completa com todas as secoes.

**Prioridade:** CRITICA
**Sprint:** 1

---

## Story T.1 — Setup do Projeto

**ID:** T.1
**Titulo:** Setup inicial do projeto Next.js com Tailwind, ESLint e estrutura de pastas para site de {PROFISSAO}
**Status:** Draft
**Complexidade:** M
**Executor:** @dev
**Quality Gate:** @qa

### User Story

**As a** desenvolvedor que vai implementar o site de {NOME},
**I want** ter o projeto Next.js configurado com Tailwind CSS, ESLint, TypeScript e estrutura de pastas padronizada,
**So that** eu possa iniciar o desenvolvimento das paginas com uma base solida, consistente e pronta para deploy na Vercel.

### Acceptance Criteria

- [ ] **AC1:** Projeto Next.js (App Router) criado com TypeScript habilitado, compilando sem erros com `npm run build`.
- [ ] **AC2:** Tailwind CSS configurado com design tokens profissionais no `globals.css` via `@theme`; fontes `{FONTE_TITULO}` + Inter carregadas via `next/font`.
- [ ] **AC3:** ESLint configurado com regras padrao do Next.js; `npm run lint` executa sem erros.
- [ ] **AC4:** Estrutura de pastas criada: `src/app/`, `src/components/`, `src/lib/`, `src/data/`, `src/content/`, `src/types/`, `public/images/`.
- [ ] **AC5:** Arquivo `.env.example` criado com variaveis `NEXT_PUBLIC_WHATSAPP_NUMBER`, `NEXT_PUBLIC_GA_MEASUREMENT_ID`, `RESEND_API_KEY`, `CONTACT_EMAIL`, `NEXT_PUBLIC_SITE_URL`.
- [ ] **AC6:** Deploy de teste na Vercel bem-sucedido — URL de preview gerada e pagina inicial carrega sem erros no console.

### Tasks

- [ ] **T1:** Inicializar projeto com `create-next-app@latest` — TypeScript, Tailwind CSS, ESLint, App Router, import alias `@/*` mapeado para `src/`.
- [ ] **T2:** Configurar design tokens profissionais via `@theme` no `globals.css` — paleta `{COR_PRIMARIA}` / `{COR_ACCENT}` / neutros + fontes `{FONTE_TITULO}` + Inter via `next/font`.
- [ ] **T3:** Criar estrutura de pastas: `src/app/`, `src/components/` (layout/ui/home/servicos/blog/contato/seo/whatsapp/lgpd), `src/lib/`, `src/data/`, `src/content/`, `src/types/`, `public/images/`.
- [ ] **T4:** Criar `src/app/layout.tsx` com metadata SEO completa (title template, og:image, viewport, metadata do {CONSELHO}), fontes via `next/font`.
- [ ] **T5:** Criar `.env.example` com todas as variaveis; garantir `.env*` no `.gitignore`.
- [ ] **T6:** Criar `src/data/site-config.ts` com dados centralizados: nome, {CONSELHO}, numero do conselho, contato, endereco, anos de experiencia, mensagens WhatsApp por pagina.
- [ ] **T7:** Configurar e fazer deploy na Vercel.

### Scope IN

- Criacao do projeto Next.js com App Router
- Configuracao Tailwind CSS + tokens de design
- Configuracao ESLint e TypeScript
- Estrutura de pastas padronizada
- Variaveis de ambiente documentadas
- Arquivo de configuracao centralizado `site-config.ts`
- Deploy inicial na Vercel

### Scope OUT

- Nenhum componente de UI (Story T.2)
- Nenhum conteudo real de paginas
- Configuracao de dominio customizado (Story T.17)
- Google Analytics (Story T.15)

### Dev Notes

**Paleta de cores para `@theme` no `globals.css`:**
```css
@theme {
  --color-primary-50: /* tom claro de {COR_PRIMARIA} */;
  --color-primary-500: {COR_PRIMARIA};
  --color-primary-900: /* tom escuro de {COR_PRIMARIA} */;
  --color-accent-500: {COR_ACCENT};
  --color-neutral-50: #fafafa;
  --color-neutral-900: #1a1a1a;
}
```

**Estrutura App Router esperada:**
```
app/
  layout.tsx
  page.tsx
  sobre/page.tsx
  contato/page.tsx
  faq/page.tsx
  servicos/
    [slug]/page.tsx
  blog/
    page.tsx
    [slug]/page.tsx
  privacidade/page.tsx
  api/
    contato/route.ts
```

**Conformidade profissional obrigatoria:**
Adicionar no `layout.tsx` metadata que identifique o profissional e numero do conselho (varia por profissao — consultar {CONFORMIDADE_PROFISSIONAL}).

### Testing

- Verificar `npm run build` sem erros
- Verificar `npm run lint` sem erros
- Verificar `npm run typecheck` sem erros
- Abrir `localhost:3000` e confirmar carregamento
- Confirmar URL de preview Vercel acessivel

### Dependencias

Nenhuma (story inicial).

---

## Story T.2 — Design System e Componentes Base

**ID:** T.2
**Titulo:** Criar design system e componentes de layout (Header, Footer, WhatsApp Widget, tokens visuais)
**Status:** Draft
**Complexidade:** M
**Executor:** @dev
**Quality Gate:** @qa

### User Story

**As a** visitante do site de {NOME} em qualquer pagina,
**I want** ver um cabecalho consistente com navegacao clara, um rodape profissional com informacoes de contato e um botao flutuante de WhatsApp sempre acessivel,
**So that** eu possa navegar pelo site com facilidade e entrar em contato com o(a) profissional com um unico toque, em qualquer dispositivo.

### Acceptance Criteria

- [ ] **AC1:** Header renderiza em todas as paginas com logo/nome de {NOME}, navegacao principal (Home, Sobre, Servicos, Blog, Contato) e CTA "Falar no WhatsApp" — responsivo com menu hamburguer funcional em mobile (< 768px).
- [ ] **AC2:** Footer renderiza com nome completo, numero {CONSELHO}, endereco ({CIDADE}/{ESTADO}), links de navegacao e aviso de conformidade profissional ({CONFORMIDADE_PROFISSIONAL}).
- [ ] **AC3:** WhatsApp Widget (botao flutuante) aparece em todas as paginas no canto inferior direito, abre `https://wa.me/55NUMERO?text=MENSAGEM` em nova aba ao clicar, com mensagem padrao pre-preenchida.
- [ ] **AC4:** Layout wrapper aplica padding/margin consistente, max-width centralizado (1280px) e garante que o conteudo nao colida com o WhatsApp Widget.
- [ ] **AC5:** Todos os componentes passam no teste de acessibilidade basico: navegacao por teclado funcional no Header, botao WhatsApp com `aria-label` descritivo, contraste minimo 4.5:1 (WCAG AA).

### Tasks

- [ ] **T1:** Criar `components/layout/Header.tsx` — logo + nav links + CTA WhatsApp + menu hamburguer mobile com estado aberto/fechado via `useState`.
- [ ] **T2:** Criar `components/layout/Footer.tsx` — informacoes legais obrigatorias (nome, {CONSELHO}, endereco), links, copyright, aviso de conformidade.
- [ ] **T3:** Criar `components/whatsapp/WhatsAppWidget.tsx` — botao flutuante com icone WhatsApp, `position: fixed`, z-index alto, `aria-label` descritivo, prop `message` para mensagem contextual por pagina.
- [ ] **T4:** Criar `components/layout/Layout.tsx` — wrapper com Header + `{children}` + Footer + WhatsAppWidget, com `padding-bottom` para nao sobrepor o widget.
- [ ] **T5:** Criar componentes UI base: `components/ui/Button.tsx` (variantes: primary, secondary, outline), `components/ui/Container.tsx` (max-width wrapper), `components/ui/Section.tsx` (section com padding padrao).
- [ ] **T6:** Integrar Layout no `app/layout.tsx` raiz; testar em mobile (375px), tablet (768px) e desktop (1280px).

### Scope IN

- Componentes Header, Footer, Layout, WhatsAppWidget
- Componentes UI base (Button, Container, Section)
- Responsividade mobile-first
- Acessibilidade basica (ARIA, contraste, teclado)
- Conformidade profissional no Footer

### Scope OUT

- Animacoes complexas ou transicoes avancadas
- Menu com sub-menus aninhados
- Componentes especificos de paginas (hero, cards — Stories T.3 e T.4)
- Testes automatizados (responsabilidade do @qa)

### Dev Notes

**Conformidade obrigatoria no Footer:**
```
{NOME} — {PROFISSAO}
{CONSELHO} {NUMERO_CONSELHO}
{CIDADE} — {ESTADO}
```

**WhatsApp Widget — mensagem contextual:**
```typescript
// Mensagem padrao (Home):
const DEFAULT_MESSAGE = "{WHATSAPP_HOME}"
// Numero vem de: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER
// URL format: https://wa.me/55{numero}?text={encodeURIComponent(message)}
```

**Breakpoints Tailwind:**
- `md`: 768px — menu hamburguer vira nav horizontal
- `xl`: 1280px — max-width container

**Acessibilidade minima:**
- `<nav>` com `aria-label="Navegação principal"`
- Menu hamburguer com `aria-expanded` e `aria-controls`
- WhatsApp button com `aria-label` descritivo
- Links com foco visivel (`focus:ring-2`)

### Testing

- Testar menu hamburguer em viewport 375px
- Testar navegacao por teclado: Tab percorre todos os links do Header
- Verificar botao WhatsApp abre URL correta em nova aba
- Verificar que Footer contem numero do conselho profissional
- Testar contraste com DevTools Accessibility panel

### Dependencias

**Requer:** T.1 — Setup do projeto.

---

## Story T.3 — Home Hero + CTA Principal + Trust Bar

**ID:** T.3
**Titulo:** Implementar Hero Section da Home Page com foto, headline de posicionamento, CTA WhatsApp e barra de confianca
**Status:** Draft
**Complexidade:** M
**Executor:** @dev
**Quality Gate:** @qa

### User Story

**As a** pessoa que chegou ao site buscando "{PROFISSAO} {ESPECIALIDADE} {CIDADE}",
**I want** ver imediatamente quem e o(a) profissional, qual e sua especialidade e como entrar em contato,
**So that** eu entenda em menos de 5 segundos se encontrei o(a) profissional certo(a) e possa iniciar o contato sem friccao.

### Acceptance Criteria

- [ ] **AC1:** Hero Section exibe foto profissional de {NOME} (placeholder funcional ate foto real), headline de posicionamento clara ("{PROFISSAO} Especializado(a) em {ESPECIALIDADE} em {CIDADE}"), subheadline de suporte e CTA primario "Falar no WhatsApp" com icone.
- [ ] **AC2:** CTA primario abre WhatsApp com mensagem pre-preenchida: `"{WHATSAPP_HOME}"`.
- [ ] **AC3:** Barra de confianca (Trust Bar) abaixo do hero exibe: numero {CONSELHO}, anos de experiencia ({ANOS_EXPERIENCIA}+), badge "Atendimento Online" e badge da especialidade principal — todos configuráveis via `site-config.ts`.
- [ ] **AC4:** Hero Section e completamente responsiva: em mobile foto e texto empilham verticalmente com CTA em largura total; em desktop ficam lado a lado.
- [ ] **AC5:** Placeholder da foto usa `div` estilizado com iniciais do(a) profissional + gradiente nas cores primarias — `next/image` sera usado quando foto real for fornecida. LCP otimizado.

### Tasks

- [ ] **T1:** Criar `components/home/HeroSection.tsx` — layout two-column (desktop) / stacked (mobile) com placeholder de foto, headline `h1` SEO-otimizado, subheadline, CTA primario WhatsApp e CTA secundario ancora para Servicos.
- [ ] **T2:** Placeholder profissional como `div` estilizado com iniciais e gradiente nas cores primarias.
- [ ] **T3:** Criar `components/home/TrustBar.tsx` — barra horizontal com badges configuráveis: numero do conselho, anos de experiencia, atendimento online, especialidade; dados de `data/site-config.ts`.
- [ ] **T4:** Integrar HeroSection e TrustBar no `app/page.tsx`.

### Scope IN

- Hero Section com foto/placeholder, headline, subheadline, CTA
- Barra de confianca com badges configuráveis
- Responsividade mobile/desktop
- Otimizacao de LCP com `next/image priority`

### Scope OUT

- Animacoes de entrada (fade-in, slide-in)
- Hero com video de fundo
- Secoes de servicos, diferenciais e depoimentos (Story T.4)
- A/B testing do headline

### Dev Notes

**Headline principal `h1` — OBRIGATORIO para SEO:**
```
{PROFISSAO} Especializado(a) em {ESPECIALIDADE}
em {CIDADE}
```
O `h1` deve conter a keyword principal com cidade para ranqueamento local.

**PROIBIDO no Hero (conformidade {CONFORMIDADE_PROFISSIONAL}):**
- Superlativos: "melhor", "o mais", "lider"
- Garantias: "garantimos", "100% de sucesso", "casos resolvidos"
- Captacao irregular: qualquer chamada que infrinja o codigo de etica da profissao

**LCP — otimizacao obrigatoria:**
- `<Image priority={true} />` na foto do hero
- Preload da fonte principal no `layout.tsx`
- Nao usar CSS `background-image` para a foto principal

### Testing

- Abrir site e verificar se headline contem cidade e especialidade
- Testar CTA WhatsApp — verificar mensagem pre-preenchida correta
- Verificar Trust Bar em mobile (375px) — badges empilhados ou scroll horizontal
- Testar LCP com Lighthouse — meta: < 2.5s

### Dependencias

**Requer:** T.2 — Design System.

---

## Story T.4 — Home Secoes (Servicos, Diferenciais, Depoimentos)

**ID:** T.4
**Titulo:** Implementar secoes de servicos, diferenciais e depoimentos na Home Page
**Status:** Draft
**Complexidade:** M
**Executor:** @dev
**Quality Gate:** @qa

### User Story

**As a** visitante que ja entendeu quem e {NOME} atraves do hero,
**I want** ver quais servicos sao oferecidos, por que escolher esse(a) profissional e o que outros clientes disseram,
**So that** eu tenha informacao suficiente para tomar a decisao de entrar em contato.

### Acceptance Criteria

- [ ] **AC1:** Secao "Servicos" exibe cards das {NUM_SERVICOS} areas de atuacao (icone, titulo, descricao curta, link para pagina dedicada) — layout grid responsivo (1 coluna mobile, 2-3 desktop).
- [ ] **AC2:** Secao "Diferenciais" exibe 3-5 diferenciais competitivos com icone e descricao — ex: "Atendimento Online", "Resposta em 24h", "{ANOS_EXPERIENCIA}+ anos de experiencia".
- [ ] **AC3:** Secao "Depoimentos" exibe 3+ depoimentos reais ou placeholders com nome, descricao do caso (anonimizado) e avaliacao visual — conformidade com etica profissional: sem nomes completos, sem garantias de resultado.
- [ ] **AC4:** Secao "CTA Final" no final da Home com chamada para acao clara e botao WhatsApp — garante que toda pagina tenha um ponto de conversao visivel.
- [ ] **AC5:** Todas as secoes sao responsivas, com dados provenientes de `src/data/` (nao hardcoded nos componentes).

### Tasks

- [ ] **T1:** Criar `src/data/servicos.ts` com array de servicos: slug, titulo, descricao curta, descricao longa, icone, keywords SEO.
- [ ] **T2:** Criar `components/home/ServicosSection.tsx` — grid de cards linkando para `/servicos/[slug]`.
- [ ] **T3:** Criar `src/data/diferenciais.ts` + `components/home/DiferenciaisSection.tsx` — lista de diferenciais com icone e texto.
- [ ] **T4:** Criar `src/data/depoimentos.ts` + `components/home/DepoimentosSection.tsx` — carrossel ou grid de depoimentos com conformidade etica.
- [ ] **T5:** Criar `components/home/CTASection.tsx` — bloco de CTA final com headline e botao WhatsApp.
- [ ] **T6:** Integrar todas as secoes no `app/page.tsx` na ordem: Hero > TrustBar > Servicos > Diferenciais > Depoimentos > CTA.

### Scope IN

- Secao de servicos com cards e links
- Secao de diferenciais
- Secao de depoimentos (etica: sem resultados prometidos)
- CTA final
- Dados externalizados em `src/data/`

### Scope OUT

- Paginas dedicadas por servico (Story T.9)
- Animacoes de scroll (parallax, fade on scroll)
- Videos depoimentos
- Formulario de contato na Home (Story T.6)

### Dev Notes

**Depoimentos — conformidade etica:**
- Usar apenas iniciais ou primeiro nome
- Descrever contexto geral sem revelar dados sigilosos
- NUNCA prometer resultados: "conseguimos divorcio rapido" = PROIBIDO
- Foco na experiencia do atendimento: "atencioso", "claro", "disponivel"

**Estrutura de dados sugerida para `servicos.ts`:**
```typescript
export const servicos = [
  {
    slug: '{area-1-slug}',
    titulo: '{AREA_1}',
    descricaoBreve: 'Uma linha sobre o servico.',
    descricaoLonga: 'Paragrafo para a pagina dedicada.',
    icone: 'Scale', // nome do icone Lucide React
    keywords: ['{AREA_1} {CIDADE}', '{AREA_1} {ESTADO}'],
  },
  // ...
] as const
```

### Testing

- Verificar que todos os cards de servicos linkam para rotas corretas
- Testar grid responsivo em 375px, 768px e 1280px
- Verificar que depoimentos nao contem linguagem que garanta resultados
- Verificar que dados nao estao hardcoded nos componentes

### Dependencias

**Requer:** T.3 — Home Hero.

---

# EPIC TEMPLATE 2 — Paginas Institucionais

**Objetivo:** Implementar as paginas que estabelecem autoridade e confianca do profissional: Sobre, Contato, FAQ e conformidade legal.

**Prioridade:** ALTA
**Sprint:** 1-2

---

## Story T.5 — Pagina Sobre

**ID:** T.5
**Titulo:** Implementar pagina Sobre com biografia, formacao academica e metodologia de {NOME}
**Status:** Draft
**Complexidade:** M
**Executor:** @dev
**Quality Gate:** @qa

### User Story

**As a** potencial cliente que quer saber mais sobre {NOME} antes de entrar em contato,
**I want** encontrar a historia profissional, formacao academica, numeros de destaque e metodologia de trabalho,
**So that** eu tenha confianca para iniciar o contato sabendo com quem estou falando.

### Acceptance Criteria

- [ ] **AC1:** Pagina `/sobre` renderiza com foto profissional (ou placeholder), headline de posicionamento, paragrafo de biografia e numero do {CONSELHO} visivelmente exibido.
- [ ] **AC2:** Secao de formacao exibe: graduacao, especializacoes, cursos relevantes — em lista ou cards estruturados.
- [ ] **AC3:** Secao de numeros de destaque exibe: {ANOS_EXPERIENCIA}+ anos de experiencia, numero de casos (se permitido pelo {CONFORMIDADE_PROFISSIONAL}), areas de atuacao — todos configuráveis via `site-config.ts`.
- [ ] **AC4:** Secao de metodologia descreve como e o processo de atendimento — passo a passo do primeiro contato ate a conclusao.
- [ ] **AC5:** CTA WhatsApp presente na pagina com mensagem contextual ("Ola {NOME_CURTO}, li sobre sua trajetoria e gostaria de agendar uma consulta.").
- [ ] **AC6:** Metadata SEO correta: `title`, `description` e `og:image` especificos para a pagina Sobre.

### Tasks

- [ ] **T1:** Criar `app/sobre/page.tsx` com metadata SEO propria e importacao dos componentes.
- [ ] **T2:** Criar `components/sobre/HeroSobre.tsx` — foto + bio + numero do conselho.
- [ ] **T3:** Criar `components/sobre/FormacaoSection.tsx` — lista/cards de formacao academica e especializacoes.
- [ ] **T4:** Criar `components/sobre/NumerosSection.tsx` — contador visual de anos, areas, etc (dados de `site-config.ts`).
- [ ] **T5:** Criar `components/sobre/MetodologiaSection.tsx` — passo a passo do atendimento.
- [ ] **T6:** Adicionar CTA WhatsApp com mensagem contextual para a pagina Sobre.

### Scope IN

- Pagina `/sobre` completa
- Foto, bio, formacao, numeros, metodologia
- CTA WhatsApp contextual
- Metadata SEO propria

### Scope OUT

- Galeria de fotos do escritorio
- Video de apresentacao
- Blog posts relacionados
- Timeline interativa

### Dev Notes

**Conformidade — numeros de destaque ({CONFORMIDADE_PROFISSIONAL}):**
- Verificar se a exibicao de "numero de casos" e permitida para a profissao
- Para advogados: nao exibir taxa de exito, apenas tempo de experiencia e areas
- Para medicos: nao exibir "pacientes atendidos" sem base verificavel

**Metadata SEO da pagina Sobre:**
```typescript
export const metadata: Metadata = {
  title: 'Sobre {NOME} — {PROFISSAO} em {CIDADE}',
  description: '{PROFISSAO} especializado(a) em {ESPECIALIDADE} em {CIDADE}. {ANOS_EXPERIENCIA}+ anos de experiencia. {CONSELHO} {NUMERO_CONSELHO}.',
}
```

### Testing

- Verificar numero do conselho visivel e correto
- Testar CTA WhatsApp com mensagem contextual correta
- Verificar metadata com DevTools (og:title, og:description)
- Checar responsividade em 375px

### Dependencias

**Requer:** T.2 — Design System.

---

## Story T.6 — Pagina Contato

**ID:** T.6
**Titulo:** Implementar pagina de Contato com formulario, mapa e informacoes de atendimento
**Status:** Draft
**Complexidade:** M
**Executor:** @dev
**Quality Gate:** @qa

### User Story

**As a** potencial cliente que deseja entrar em contato com {NOME},
**I want** encontrar um formulario simples, o endereco do escritorio/consultorio e outras formas de contato,
**So that** eu possa escolher o canal preferido e iniciar o atendimento sem friccao.

### Acceptance Criteria

- [ ] **AC1:** Formulario de contato com campos: Nome (obrigatorio), Email (obrigatorio, validacao formato), Telefone (opcional, mascara), Assunto (select com opcoes das areas de atuacao), Mensagem (textarea, min 20 chars) e campo honeypot oculto para anti-spam.
- [ ] **AC2:** Formulario envia via API Route `/api/contato` — resposta de sucesso exibe mensagem de confirmacao inline; erros exibem feedback especifico por campo.
- [ ] **AC3:** API Route envia email para `CONTACT_EMAIL` via Resend (ou similar); retorna 200 em sucesso, 400 em validacao invalida, 500 em erro de envio.
- [ ] **AC4:** Informacoes de contato como cards CLICAVEIS: cada item (Endereco→Maps, WhatsApp→link, Email→mailto, Instagram→perfil, Horario→informativo) e um `<a>` com icone + texto, alinhado com `items-center p-3 rounded-xl` e hover feedback (`hover:bg-stone-50 + group-hover` no icone). Todos os dados de `site-config.ts`.
- [ ] **AC5:** Mapa estatico (iframe Google Maps ou imagem estatica) com localizacao do escritorio/consultorio — ou secao "Atendimento Online" se sem endereco fisico.
- [ ] **AC6:** Metadata SEO correta: `title`, `description` especificos para a pagina Contato.

### Tasks

- [ ] **T1:** Criar `app/contato/page.tsx` com metadata SEO propria.
- [ ] **T2:** Criar `components/contato/ContatoForm.tsx` — formulario com react-hook-form + zod para validacao client-side.
- [ ] **T3:** Criar `app/api/contato/route.ts` — validacao server-side + envio de email via Resend + honeypot check.
- [ ] **T4:** Criar cards de contato clicaveis — icone (w-11 h-11 rounded-xl) + titulo + valor, cada um como `<a>` linkando para o servico correto (Maps, WhatsApp, mailto, Instagram). Horario como `<div>` com mesmo padding. Incluir Instagram com icone SVG.
- [ ] **T5:** Adicionar mapa: iframe Google Maps com `loading="lazy"` ou imagem estatica com link para Maps.
- [ ] **T6:** Testar envio de formulario em ambiente de preview Vercel.

### Scope IN

- Formulario com validacao client e server
- API Route para envio de email
- Informacoes de contato estruturadas
- Mapa de localizacao (ou secao online)
- Anti-spam com honeypot

### Scope OUT

- reCAPTCHA (honeypot e suficiente para MVP)
- Chat ao vivo
- Calendario de agendamento online (feature futura)
- Multiplos enderecos

### Dev Notes

**Honeypot anti-spam:**
```typescript
// Campo oculto — se preenchido, e bot
<input
  type="text"
  name="website"  // campo generico que bots preenchem
  className="hidden"
  tabIndex={-1}
  autoComplete="off"
/>
// No server: if (body.website) return 400
```

**Validacao com Zod:**
```typescript
const contatoSchema = z.object({
  nome: z.string().min(2),
  email: z.string().email(),
  telefone: z.string().optional(),
  assunto: z.enum(['{AREA_1}', '{AREA_2}', /* ... */]),
  mensagem: z.string().min(20),
  website: z.string().max(0), // honeypot
})
```

**Variaveis de ambiente necessarias:**
- `RESEND_API_KEY` — chave da API Resend
- `CONTACT_EMAIL` — email destino das mensagens

### Testing

- Testar submit com campos validos — verificar email recebido
- Testar submit com campos invalidos — verificar erros por campo
- Testar honeypot: preencher campo `website` — deve retornar erro
- Verificar mensagem de sucesso apos envio

### Dependencias

**Requer:** T.2 — Design System.

---

## Story T.7 — FAQ com Schema FAQPage

**ID:** T.7
**Titulo:** Implementar pagina FAQ com accordion e schema markup FAQPage para SEO
**Status:** Draft
**Complexidade:** P
**Executor:** @dev
**Quality Gate:** @qa

### User Story

**As a** potencial cliente com duvidas frequentes sobre {ESPECIALIDADE},
**I want** encontrar respostas claras e organizadas sem precisar entrar em contato imediatamente,
**So that** eu possa tirar minhas duvidas iniciais e chegar ao contato mais informado e seguro.

### Acceptance Criteria

- [ ] **AC1:** Pagina `/faq` renderiza lista de perguntas e respostas em componente accordion — ao clicar na pergunta, a resposta expande/recolhe com animacao suave.
- [ ] **AC2:** Minimo de 8 perguntas frequentes sobre {ESPECIALIDADE} — conteudo especifico do profissional, sem fabricar informacoes nao fornecidas.
- [ ] **AC3:** Schema markup `FAQPage` injetado via `<script type="application/ld+json">` com todas as perguntas/respostas — validavel no Rich Results Test do Google.
- [ ] **AC4:** CTA WhatsApp apos cada bloco de 3-4 perguntas ("Nao encontrou sua resposta? Fale conosco") e CTA final.
- [ ] **AC5:** Metadata SEO correta: `title` com keyword, `description` resumindo as perguntas principais.

### Tasks

- [ ] **T1:** Criar `src/data/faq.ts` com array de perguntas e respostas (`{ id, pergunta, resposta }[]`).
- [ ] **T2:** Criar `components/faq/FaqAccordion.tsx` — componente accordion com `useState` ou Radix UI Accordion; `aria-expanded` correto.
- [ ] **T3:** Criar `components/seo/FaqSchema.tsx` — componente que renderiza `<script type="application/ld+json">` com schema FAQPage.
- [ ] **T4:** Criar `app/faq/page.tsx` com metadata, FaqAccordion, FaqSchema e CTAs intercalados.

### Scope IN

- Pagina `/faq` com accordion
- Schema markup FAQPage
- CTAs intercalados
- Dados externalizados em `src/data/faq.ts`

### Scope OUT

- FAQ com busca/filtro
- FAQ categorizado por assunto (MVP)
- Chat bot de perguntas

### Dev Notes

**Schema FAQPage:**
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Pergunta 1?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Resposta 1."
      }
    }
  ]
}
```

**Acessibilidade no accordion:**
```tsx
<button
  aria-expanded={isOpen}
  aria-controls={`faq-${id}`}
>
  {pergunta}
</button>
<div id={`faq-${id}`} role="region" hidden={!isOpen}>
  {resposta}
</div>
```

### Testing

- Testar accordion: clicar abre, clicar novamente fecha
- Validar schema em: https://search.google.com/test/rich-results
- Testar navegacao por teclado: Enter/Space ativa accordion
- Verificar metadata com DevTools

### Dependencias

**Requer:** T.2 — Design System.

---

## Story T.8 — Politica de Privacidade + Conformidade LGPD

**ID:** T.8
**Titulo:** Implementar pagina de Politica de Privacidade e banner de consentimento de cookies (LGPD)
**Status:** Draft
**Complexidade:** P
**Executor:** @dev
**Quality Gate:** @qa

### User Story

**As a** visitante do site de {NOME} preocupado com minha privacidade,
**I want** encontrar facilmente a politica de privacidade e poder gerenciar meu consentimento de cookies,
**So that** eu saiba como meus dados sao tratados e tenha controle sobre eles conforme a LGPD.

### Acceptance Criteria

- [ ] **AC1:** Pagina `/privacidade` renderiza politica de privacidade completa em formato legivel: secoes com titulos claros, linguagem acessivel, identificacao do controlador de dados (nome e {CONSELHO} de {NOME}).
- [ ] **AC2:** Politica cobre obrigatoriamente: dados coletados, finalidade, base legal (LGPD art. 7), retencao, compartilhamento, direitos do titular, contato do DPO/controlador.
- [ ] **AC3:** Banner de consentimento de cookies aparece na primeira visita, com opcoes "Aceitar todos" e "Apenas necessarios" — preferencia salva em `localStorage`, banner nao reaparece apos escolha.
- [ ] **AC4:** Google Analytics (quando configurado) e carregado SOMENTE apos consentimento explicito — sem tracking antes da escolha do usuario.
- [ ] **AC5:** Link para `/privacidade` presente no Footer em todas as paginas.

### Tasks

- [ ] **T1:** Criar `src/content/privacidade.mdx` (ou `src/data/privacidade.ts`) com conteudo da politica — placeholder com secoes obrigatorias para o cliente preencher.
- [ ] **T2:** Criar `app/privacidade/page.tsx` renderizando o conteudo com formatacao adequada.
- [ ] **T3:** Criar `components/lgpd/CookieBanner.tsx` — banner bottom com botoes de aceitar/recusar, persistencia em `localStorage`.
- [ ] **T4:** Criar hook `hooks/useCookieConsent.ts` — le preferencia do localStorage, expoe `consent: boolean`, `accept()`, `reject()`.
- [ ] **T5:** Integrar `CookieBanner` no `app/layout.tsx`; condicionar carregamento do GA ao `consent === true`.
- [ ] **T6:** Adicionar link para `/privacidade` no Footer (verificar se ja existe em T.2, senao adicionar).

### Scope IN

- Pagina `/privacidade` com conteudo placeholder estruturado
- Banner LGPD com consentimento
- Hook de consentimento
- Carregamento condicional do Analytics

### Scope OUT

- Portal do titular (solicitacoes de exclusao de dados)
- Cookies de terceiros alem do GA
- Versao PDF da politica
- Versionamento automatico da politica

### Dev Notes

**Secoes obrigatorias da Politica de Privacidade (LGPD):**
1. Identificacao do Controlador ({NOME}, {CONSELHO}, email)
2. Dados Coletados (formulario de contato, cookies, analytics)
3. Finalidade e Base Legal (LGPD art. 7, incisos I e IX)
4. Retencao de Dados (prazo de guarda)
5. Compartilhamento (Resend/email, Google Analytics — se aplicavel)
6. Direitos do Titular (acesso, correcao, exclusao — contato via email)
7. Contato (email do controlador)

**Nota:** O conteudo real deve ser revisado por profissional juridico antes de publicar.

### Testing

- Verificar que banner aparece na primeira visita (limpar localStorage)
- Verificar que banner nao aparece apos aceitar (recarregar pagina)
- Verificar que GA nao e carregado antes de aceitar (Network tab)
- Verificar link `/privacidade` no Footer
- Checar todas as secoes obrigatorias presentes na pagina

### Dependencias

**Requer:** T.2 — Design System, T.1 — `.env.example` com `NEXT_PUBLIC_GA_MEASUREMENT_ID`.

---

# EPIC TEMPLATE 3 — Servicos / Areas de Atuacao

**Objetivo:** Criar paginas dedicadas para cada servico/area de atuacao com conteudo SEO especifico e keywords locais.

**Prioridade:** ALTA
**Sprint:** 2

---

## Story T.9 — Sub-paginas por Servico

**ID:** T.9
**Titulo:** Implementar sub-paginas dedicadas para cada area de atuacao de {NOME} ({NUM_SERVICOS} areas)
**Status:** Draft
**Complexidade:** G
**Executor:** @dev
**Quality Gate:** @qa

### User Story

**As a** pessoa com necessidade especifica em "{AREA_1} em {CIDADE}",
**I want** encontrar uma pagina dedicada sobre esse servico com informacoes detalhadas e como contratar,
**So that** eu confirme que {NOME} atende minha necessidade especifica e entre em contato com confianca.

### Acceptance Criteria

- [ ] **AC1:** Rota dinamica `/servicos/[slug]` renderiza pagina especifica para cada area — `generateStaticParams` exporta todos os slugs para geracao estatica (SSG).
- [ ] **AC2:** Cada pagina de servico contem: headline com keyword + cidade, descricao detalhada do servico, processo de atendimento (passo a passo), FAQ especifico (3-5 perguntas) e CTA WhatsApp com mensagem contextual para a area.
- [ ] **AC3:** Metadata dinamica por pagina: `title` = "{AREA} em {CIDADE} — {NOME}", `description` = descricao SEO unica por area, `og:image` especifico (ou padrao).
- [ ] **AC4:** Breadcrumb estruturado presente: Home > Servicos > {AREA} — com schema BreadcrumbList.
- [ ] **AC5:** Schema markup `Service` ou `MedicalSpecialty` (conforme profissao) injetado com dados da area e do profissional.
- [ ] **AC6:** Link "Ver todos os servicos" presente, linkando para a secao de servicos da Home ou pagina `/servicos`.

### Tasks

- [ ] **T1:** Validar/expandir `src/data/servicos.ts` com todos os campos necessarios para as paginas: `descricaoLonga`, `processo` (array de steps), `faqEspecifico`, `mensagemWhatsApp`, `keywords`.
- [ ] **T2:** Criar `app/servicos/[slug]/page.tsx` com `generateStaticParams` e `generateMetadata` dinamica.
- [ ] **T3:** Criar `components/servicos/ServicoHero.tsx` — headline + descricao + CTA.
- [ ] **T4:** Criar `components/servicos/ProcessoAtendimento.tsx` — passo a passo visual (numbered list ou stepper).
- [ ] **T5:** Criar `components/servicos/ServicoFaq.tsx` — FAQ especifico da area (reutilizar FaqAccordion de T.7).
- [ ] **T6:** Criar `components/seo/BreadcrumbSchema.tsx` — schema BreadcrumbList reutilizavel.
- [ ] **T7:** Criar `components/seo/ServiceSchema.tsx` — schema Service/MedicalSpecialty por area.

### Scope IN

- Rota dinamica `/servicos/[slug]`
- SSG com `generateStaticParams`
- Metadata dinamica por pagina
- Schema Breadcrumb e Service
- FAQ especifico por area
- CTA contextual por area

### Scope OUT

- Pagina de listagem `/servicos` com todos os servicos (pode ser feita como bonus ou Sprint 3)
- Comparacao entre servicos
- Calculadora de honorarios/custo online
- Reserva/agendamento online

### Dev Notes

**`generateStaticParams` para SSG:**
```typescript
export async function generateStaticParams() {
  return servicos.map((s) => ({ slug: s.slug }))
}
```

**`generateMetadata` dinamica:**
```typescript
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const servico = servicos.find((s) => s.slug === params.slug)
  return {
    title: `${servico.titulo} em {CIDADE} — {NOME}`,
    description: servico.descricaoSeo,
  }
}
```

### Testing

- Verificar que todas as {NUM_SERVICOS} rotas renderizam sem erro 404
- Verificar metadata unica em cada pagina (DevTools)
- Validar schema Breadcrumb no Rich Results Test
- Testar CTA WhatsApp com mensagem especifica da area

### Dependencias

**Requer:** T.4 — Home Secoes (data layer de servicos criada).

---

## Story T.10 — SEO por Servico (Keywords Locais)

**ID:** T.10
**Titulo:** Otimizacao de SEO on-page para keywords locais de cada area de atuacao em {CIDADE}
**Status:** Draft
**Complexidade:** P
**Executor:** @dev
**Quality Gate:** @qa

### User Story

**As a** equipe de marketing de {NOME},
**I want** que cada pagina de servico esteja otimizada para keywords locais ("{AREA} em {CIDADE}", "{AREA} {ESTADO}"),
**So that** o site ranqueie organicamente para buscas locais e atraia clientes da regiao.

### Acceptance Criteria

- [ ] **AC1:** Cada pagina de servico contem a keyword principal ("{AREA} em {CIDADE}") no `h1`, no `title`, na `description` e nos primeiros 150 palavras do conteudo.
- [ ] **AC2:** `sitemap.xml` dinamico inclui todas as paginas de servico com `lastModified` e `changeFrequency` corretos.
- [ ] **AC3:** `robots.txt` permite indexacao de todas as rotas publicas e bloqueia `/api/`.
- [ ] **AC4:** Imagens nas paginas de servico possuem `alt` text com keyword local (ex: `alt="{AREA} em {CIDADE} — {NOME}"`).
- [ ] **AC5:** Links internos entre paginas de servico relacionadas e da Home para cada pagina de servico.

### Tasks

- [ ] **T1:** Auditar todas as paginas de servico geradas em T.9 — verificar h1, title, description por keyword.
- [ ] **T2:** Validar/expandir `app/sitemap.ts` para incluir rotas de servicos dinamicas.
- [ ] **T3:** Revisar `app/robots.ts` — garantir que `/api/` esta bloqueado e demais rotas abertas.
- [ ] **T4:** Auditar `alt` text de todas as imagens nas paginas de servico.
- [ ] **T5:** Adicionar links internos relevantes entre paginas (ex: pagina de {AREA_1} menciona {AREA_2} relacionada).

### Scope IN

- Auditoria e correcao de on-page SEO
- Sitemap dinamico completo
- Robots.txt correto
- Alt text em imagens
- Links internos entre servicos

### Scope OUT

- Construcao de backlinks (off-page SEO)
- Google Search Console (monitoramento — pos-lancamento)
- Conteudo de blog para cada servico (Story T.12)

### Testing

- Validar sitemap em `/sitemap.xml` — verificar todas as URLs
- Verificar `robots.txt` em `/robots.txt`
- Testar com Lighthouse SEO — meta: score 90+

### Dependencias

**Requer:** T.9 — Sub-paginas por servico.

---

# EPIC TEMPLATE 4 — Blog

**Objetivo:** Criar infraestrutura de blog e publicar conteudo inicial para SEO de longo prazo.

**Prioridade:** MEDIA
**Sprint:** 2-3

---

## Story T.11 — Sistema de Blog

**ID:** T.11
**Titulo:** Implementar infraestrutura de blog com MDX, listagem e paginas de artigos
**Status:** Draft
**Complexidade:** M
**Executor:** @dev
**Quality Gate:** @qa

### User Story

**As a** {NOME} que quer publicar artigos educativos sobre {ESPECIALIDADE},
**I want** ter um blog funcional onde posso publicar conteudo em MDX sem precisar de desenvolvedor,
**So that** o site ganhe autoridade em SEO e eu atraia visitantes organicos com duvidas sobre {ESPECIALIDADE}.

### Acceptance Criteria

- [ ] **AC1:** Pagina `/blog` lista todos os artigos publicados em ordem cronologica reversa — card com: titulo, data, tempo de leitura estimado, resumo e link para o artigo.
- [ ] **AC2:** Rota dinamica `/blog/[slug]` renderiza o artigo MDX completo com: headline `h1`, data de publicacao, tempo de leitura, conteudo formatado (h2, h3, listas, bold) e CTA WhatsApp ao final.
- [ ] **AC3:** Sistema MDX configurado com frontmatter: `title`, `date`, `description`, `slug`, `readingTime`, `published` (booleano) — artigos com `published: false` nao aparecem na listagem.
- [ ] **AC4:** Metadata dinamica por artigo: `title` = "{titulo do artigo} — {NOME}", `description` do frontmatter, `og:image` do artigo (ou padrao).
- [ ] **AC5:** Schema markup `Article` injetado com autor ({NOME}), data de publicacao e descricao.

### Tasks

- [ ] **T1:** Instalar e configurar dependencias MDX (`@next/mdx`, `gray-matter`, `reading-time` ou equivalente).
- [ ] **T2:** Criar `src/lib/mdx.ts` — funcoes `getAllPosts()`, `getPostBySlug(slug)` que leen arquivos `.mdx` de `src/content/blog/`.
- [ ] **T3:** Criar `app/blog/page.tsx` — listagem com `getAllPosts()`, ordenado por data, filtrado por `published: true`.
- [ ] **T4:** Criar `app/blog/[slug]/page.tsx` com `generateStaticParams`, `generateMetadata` e renderizacao do conteudo MDX.
- [ ] **T5:** Criar `components/blog/ArticleCard.tsx` — card de preview do artigo para a listagem.
- [ ] **T6:** Criar `components/blog/ArticleContent.tsx` — wrapper do conteudo MDX com estilos tipograficos (prose).
- [ ] **T7:** Criar `components/seo/ArticleSchema.tsx` — schema markup Article.

### Scope IN

- Infraestrutura MDX
- Pagina de listagem `/blog`
- Pagina de artigo `/blog/[slug]`
- Frontmatter com controle de publicacao
- Schema Article
- CTA WhatsApp no final de cada artigo

### Scope OUT

- Sistema de categorias/tags
- Busca de artigos
- Sistema de comentarios
- Newsletter
- Artigos relacionados (sugestoes ao final)

### Dev Notes

**Frontmatter padrao para artigos MDX:**
```mdx
---
title: "Titulo do Artigo"
date: "2026-03-29"
description: "Resumo do artigo para SEO e card de listagem."
slug: "titulo-do-artigo"
readingTime: 5
published: true
---

Conteudo do artigo...
```

**Configuracao Tailwind Typography para conteudo MDX:**
```tsx
// Instalar: @tailwindcss/typography
<div className="prose prose-lg max-w-none">
  <MDXContent />
</div>
```

### Testing

- Verificar que artigos com `published: false` nao aparecem na listagem
- Verificar metadata dinamica de cada artigo
- Validar schema Article no Rich Results Test
- Testar que `npm run build` gera todas as rotas do blog estaticamente

### Dependencias

**Requer:** T.2 — Design System.

---

## Story T.12 — 5 Artigos Iniciais

**ID:** T.12
**Titulo:** Publicar 5 artigos iniciais sobre {ESPECIALIDADE} para SEO e autoridade de {NOME}
**Status:** Draft
**Complexidade:** M
**Executor:** @dev
**Quality Gate:** @qa

### User Story

**As a** potencial cliente buscando informacoes sobre {ESPECIALIDADE},
**I want** encontrar artigos educativos e confiaveis escritos por {NOME},
**So that** eu aprenda sobre o assunto, confie na expertise do(a) profissional e entre em contato quando precisar do servico.

### Acceptance Criteria

- [ ] **AC1:** 5 artigos publicados em `src/content/blog/` no formato MDX com frontmatter completo — todos com `published: true`.
- [ ] **AC2:** Cada artigo tem minimo de 600 palavras, conteudo original sobre {ESPECIALIDADE}, sem garantias de resultado e sem conteudo que viole {CONFORMIDADE_PROFISSIONAL}.
- [ ] **AC3:** Cada artigo e otimizado para uma keyword diferente relacionada a {ESPECIALIDADE} e {CIDADE} — keyword presente no `h1`, no `title` e nos primeiros paragrafos.
- [ ] **AC4:** Cada artigo termina com CTA contextual relacionado ao topico do artigo e link para WhatsApp.
- [ ] **AC5:** Todos os 5 artigos aparecem na listagem `/blog` e suas rotas individuais funcionam sem erro.

### Tasks

- [ ] **T1:** Definir 5 topicos e keywords-alvo (um por artigo) com base nas perguntas mais frequentes sobre {ESPECIALIDADE} em {CIDADE}.
- [ ] **T2:** Criar `src/content/blog/artigo-1.mdx` ate `artigo-5.mdx` com conteudo completo e frontmatter.
- [ ] **T3:** Revisar cada artigo para conformidade com {CONFORMIDADE_PROFISSIONAL} — sem linguagem que infrinja o codigo de etica.
- [ ] **T4:** Verificar que todos os artigos aparecem em `/blog` e sao acessiveis via URL.

### Scope IN

- 5 artigos MDX completos
- Keywords locais por artigo
- CTA ao final de cada artigo
- Conformidade etica revisada

### Scope OUT

- Artigos com imagens ou infograficos (fase 2)
- Videos embeds nos artigos
- Traducao para outros idiomas

### Dev Notes

**Sugestao de topicos para {ESPECIALIDADE}:**
- "O que e {AREA_1} e quando devo contratar um(a) {PROFISSAO}?"
- "Passo a passo do processo de {AREA_1} em {CIDADE}"
- "Direitos do cidadao em caso de {AREA_2} em {ESTADO}"
- "Quanto custa contratar um(a) {PROFISSAO} em {CIDADE}?" (se permitido por {CONFORMIDADE_PROFISSIONAL})
- "Perguntas frequentes sobre {AREA_3}"

**Conformidade no conteudo:**
- Usar "em geral", "normalmente", "depende do caso" — nunca afirmacoes absolutas
- Nunca prometer prazos ou resultados especificos
- Sempre recomendar consulta personalizada no CTA

### Testing

- Verificar contagem de palavras de cada artigo (min 600)
- Verificar que keyword-alvo aparece no `h1` e nos primeiros 150 palavras
- Testar todas as 5 URLs de artigo
- Revisar linguagem de conformidade em cada artigo

### Dependencias

**Requer:** T.11 — Sistema de blog.

---

# EPIC TEMPLATE 5 — SEO + Performance + Seguranca

**Objetivo:** Garantir pontuacao Lighthouse 95+ em todas as dimensoes e conformidade de seguranca.

**Prioridade:** ALTA
**Sprint:** 3

---

## Story T.13 — Schema Markup Completo

**ID:** T.13
**Titulo:** Implementar schema markup completo (LocalBusiness/Professional, Person, Breadcrumb) em todas as paginas
**Status:** Draft
**Complexidade:** P
**Executor:** @dev
**Quality Gate:** @qa

### User Story

**As a** equipe de SEO de {NOME},
**I want** que todas as paginas do site tenham schema markup correto e completo,
**So that** o Google entenda a estrutura do site, exiba rich snippets nos resultados de busca e melhore o ranqueamento local.

### Acceptance Criteria

- [ ] **AC1:** Schema `LocalBusiness` (ou `LegalService`, `MedicalBusiness`, `Dentist` — conforme profissao) na Home com: nome, endereco ({CIDADE}/{ESTADO}), telefone, email, horario de funcionamento, url, {CONSELHO} no campo `identifier`.
- [ ] **AC2:** Schema `Person` para {NOME} na pagina Sobre com: nome, jobTitle ({PROFISSAO}), hasCredential ({CONSELHO} {NUMERO_CONSELHO}), alumniOf (instituicao de formacao).
- [ ] **AC3:** Schema `BreadcrumbList` em todas as paginas internas (Sobre, Contato, FAQ, Servicos, Blog).
- [ ] **AC4:** Schema `FAQPage` na pagina FAQ (se ainda nao implementado em T.7) e nas paginas de servico com FAQ especifico.
- [ ] **AC5:** Todos os schemas validam sem erros no Rich Results Test: https://search.google.com/test/rich-results

### Tasks

- [ ] **T1:** Criar `components/seo/LocalBusinessSchema.tsx` — schema LocalBusiness/profissional especifico, dados de `site-config.ts`.
- [ ] **T2:** Criar `components/seo/PersonSchema.tsx` — schema Person para o(a) profissional, dados de `site-config.ts`.
- [ ] **T3:** Auditar BreadcrumbSchema criado em T.9 — garantir que esta em todas as paginas internas.
- [ ] **T4:** Integrar LocalBusinessSchema e PersonSchema no `app/layout.tsx` (presentes em todas as paginas).
- [ ] **T5:** Validar todos os schemas no Rich Results Test e corrigir erros.

### Scope IN

- Schema LocalBusiness/profissional
- Schema Person
- Schema Breadcrumb em todas as paginas internas
- Validacao no Rich Results Test

### Scope OUT

- Schema de avaliacao/review (dependente de plataforma terceira)
- Schema de eventos
- Schema de video

### Dev Notes

**Tipo de schema por profissao:**
| Profissao | Schema Recomendado |
|---|---|
| Advogado | `LegalService` + `Attorney` |
| Medico | `MedicalBusiness` + `Physician` |
| Dentista | `Dentist` |
| Psicologo | `MedicalBusiness` + `Person` |
| Contador | `LocalBusiness` + `AccountingService` |

**Exemplo schema LegalService:**
```json
{
  "@context": "https://schema.org",
  "@type": "LegalService",
  "name": "{NOME}",
  "description": "{PROFISSAO} especializado(a) em {ESPECIALIDADE} em {CIDADE}.",
  "url": "https://{dominio}",
  "telephone": "+55{NUMERO_WHATSAPP}",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "{CIDADE}",
    "addressRegion": "{ESTADO}",
    "addressCountry": "BR"
  },
  "identifier": "{CONSELHO} {NUMERO_CONSELHO}"
}
```

### Testing

- Validar LocalBusiness no Rich Results Test
- Validar Person schema
- Verificar Breadcrumb em 3 paginas distintas
- Executar Lighthouse SEO — meta: 95+

### Dependencias

**Requer:** T.9 — Sub-paginas (para BreadcrumbSchema em servicos), T.7 — FAQ.

---

## Story T.14 — Headers de Seguranca + Conformidade LGPD Final

**ID:** T.14
**Titulo:** Configurar headers HTTP de seguranca no Next.js e auditoria final de conformidade LGPD
**Status:** Draft
**Complexidade:** P
**Executor:** @dev
**Quality Gate:** @qa

### User Story

**As a** responsavel pela seguranca do site de {NOME},
**I want** que o servidor envie headers de seguranca corretos e que a implementacao LGPD esteja completa,
**So that** o site proteja os visitantes contra ataques comuns e esteja em conformidade com a lei.

### Acceptance Criteria

- [ ] **AC1:** Headers de seguranca configurados no `next.config.ts`: `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy` restritivo.
- [ ] **AC2:** `Content-Security-Policy` (CSP) configurado para permitir apenas recursos necessarios — sem `unsafe-inline` para scripts de producao; Google Analytics/Fonts whitelistados.
- [ ] **AC3:** Score de seguranca A+ no securityheaders.com apos deploy.
- [ ] **AC4:** Auditoria LGPD completa: cookie banner funcional (T.8), politica de privacidade publicada (T.8), formulario de contato com aviso de coleta de dados, GA carregado so apos consentimento.
- [ ] **AC5:** Formulario de contato (T.6) exibe texto "Seus dados sao tratados conforme nossa Politica de Privacidade" com link para `/privacidade`.

### Tasks

- [ ] **T1:** Expandir `next.config.ts` com bloco `headers()` — adicionar todos os security headers listados nos ACs.
- [ ] **T2:** Configurar CSP baseado nos recursos reais usados (Google Fonts, GA, WhatsApp, etc).
- [ ] **T3:** Testar em https://securityheaders.com apos deploy — corrigir ate A+.
- [ ] **T4:** Auditoria LGPD: checar checklist de 5 pontos (banner, politica, aviso no form, GA condicional, link no footer).
- [ ] **T5:** Adicionar aviso de privacidade no formulario de contato (T.6) se ainda nao presente.

### Scope IN

- Security headers no `next.config.ts`
- CSP configurado
- Auditoria LGPD final
- Aviso de privacidade no formulario

### Scope OUT

- WAF (Web Application Firewall) — infra de rede, fora do escopo Next.js
- Pentest formal
- Auditoria de acessibilidade (separar em story propria se necessario)

### Dev Notes

**Headers obrigatorios no `next.config.ts`:**
```javascript
async headers() {
  return [{
    source: '/(.*)',
    headers: [
      { key: 'X-Frame-Options', value: 'DENY' },
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
    ],
  }]
}
```

**CSP — whitelist minima para sites profissionais:**
- `default-src 'self'`
- `script-src 'self' https://www.googletagmanager.com` (se GA)
- `style-src 'self' 'unsafe-inline' https://fonts.googleapis.com`
- `font-src 'self' https://fonts.gstatic.com`
- `img-src 'self' data: https:` (imagens externas do blog/depoimentos)
- `connect-src 'self' https://www.google-analytics.com` (se GA)

### Testing

- Testar em https://securityheaders.com — meta: A+
- Verificar que GA nao carrega antes de consentimento LGPD (Network tab)
- Verificar aviso de privacidade no formulario de contato

### Dependencias

**Requer:** T.8 — LGPD, T.6 — Formulario de Contato.

---

## Story T.15 — Otimizacao Lighthouse 95+

**ID:** T.15
**Titulo:** Otimizacao de performance para score Lighthouse 95+ em Performance, SEO, Acessibilidade e Best Practices
**Status:** Draft
**Complexidade:** M
**Executor:** @dev
**Quality Gate:** @qa

### User Story

**As a** visitante do site de {NOME} em qualquer dispositivo e conexao,
**I want** que o site carregue rapido e funcione perfeitamente,
**So that** eu tenha uma experiencia fluida sem frustracao e perceba o site como profissional e confiavel.

### Acceptance Criteria

- [ ] **AC1:** Score Lighthouse (mobile) >= 95 em: Performance, SEO, Acessibilidade e Best Practices — medido na pagina Home e em uma pagina de servico.
- [ ] **AC2:** LCP (Largest Contentful Paint) < 2.5s em mobile 4G simulado.
- [ ] **AC3:** CLS (Cumulative Layout Shift) < 0.1 em todas as paginas auditadas.
- [ ] **AC4:** Todas as imagens usam `next/image` com `width`, `height`, `alt` e formato WebP — sem imagens acima de 200KB apos otimizacao.
- [ ] **AC5:** Acessibilidade: todos os elementos interativos com label ARIA correto, ordem de heading logica (h1 > h2 > h3), foco visivel em todos os elementos interativos.

### Tasks

- [ ] **T1:** Rodar Lighthouse em modo mobile na Home e em uma pagina de servico — documentar scores iniciais.
- [ ] **T2:** Corrigir issues de Performance: lazy loading de imagens below-the-fold, preload de fontes, eliminacao de render-blocking resources.
- [ ] **T3:** Corrigir issues de Acessibilidade: aria-labels faltando, contraste insuficiente, heading order incorreta.
- [ ] **T4:** Corrigir issues de Best Practices: console errors, deprecated APIs, HTTPS.
- [ ] **T5:** Validar CLS: identificar e corrigir elementos que causam layout shift (fontes, imagens sem dimensoes, iframes).
- [ ] **T6:** Rodar Lighthouse novamente — confirmar 95+ em todas as 4 categorias.

### Scope IN

- Auditoria e correcao Lighthouse
- Otimizacao de imagens com `next/image`
- Correcao de acessibilidade
- LCP e CLS dentro das metas Core Web Vitals

### Scope OUT

- Implementacao de CDN personalizado (Vercel Edge ja cobre)
- Cache de API (sem dados dinamicos frequentes)
- Service Worker / PWA

### Dev Notes

**Core Web Vitals — metas:**
| Metrica | Meta | Bom | Precisa de Melhoria |
|---|---|---|---|
| LCP | < 2.5s | < 2.5s | 2.5s - 4s |
| FID/INP | < 200ms | < 200ms | 200ms - 500ms |
| CLS | < 0.1 | < 0.1 | 0.1 - 0.25 |

**Causas comuns de LCP alto:**
- Imagem hero sem `priority={true}`
- Fonte sem preload no `<head>`
- Muitos scripts de terceiros no head

**Causas comuns de CLS:**
- Imagens sem `width` e `height` definidos
- Fontes causando FOUT (Flash of Unstyled Text)
- Ads ou embeds sem dimensao reservada

### Testing

- Rodar Lighthouse em modo mobile (importante: nao desktop)
- Testar em PageSpeed Insights: https://pagespeed.web.dev
- Verificar Core Web Vitals no Google Search Console (pos-indexacao)

### Dependencias

**Requer:** Todas as stories anteriores concluidas (T.1 a T.14) — esta e a story de polimento final antes do deploy.

---

# EPIC TEMPLATE 6 — Admin + Deploy

**Objetivo:** Criar painel de administracao simples para atualizacoes de conteudo e finalizar o deploy com dominio customizado.

**Prioridade:** MEDIA
**Sprint:** 3

---

## Story T.16 — Painel Admin

**ID:** T.16
**Titulo:** Implementar painel de administracao para {NOME} gerenciar conteudo sem desenvolvimento
**Status:** Draft
**Complexidade:** G
**Executor:** @dev
**Quality Gate:** @qa

### User Story

**As a** {NOME} que nao tem conhecimento tecnico de programacao,
**I want** ter um painel simples onde eu possa atualizar depoimentos, informacoes de contato e publicar novos artigos,
**So that** eu mantenha o site atualizado sem depender do desenvolvedor para cada pequena mudanca.

### Acceptance Criteria

- [ ] **AC1:** Rota `/admin` protegida por autenticacao — acesso via email/senha ou magic link; sem cadastro publico aberto.
- [ ] **AC2:** Painel exibe secoes de gerenciamento: Depoimentos (CRUD), Dados do Site (nome, contato, horario), e link para criar novo artigo de blog via arquivo MDX.
- [ ] **AC3:** CRUD de Depoimentos: listar, adicionar, editar e remover depoimentos — salvos em banco de dados ou arquivo JSON (conforme decisao de arquitetura).
- [ ] **AC4:** Edicao de dados do site (nome de contato, whatsapp, email, horario) com salvar e aplicar — reflete no site apos rebuild ou via ISR.
- [ ] **AC5:** Interface simples, funcional e sem erros — nao precisa ser sofisticada, precisa ser confiavel.

### Tasks

- [ ] **T1:** Decidir solucao de admin: Payload CMS, Tina CMS, Sanity (headless) ou painel custom com NextAuth + SQLite/Supabase — documentar decisao em ADR.
- [ ] **T2:** Configurar autenticacao para rota `/admin` (NextAuth.js com provider de email ou credentials).
- [ ] **T3:** Implementar listagem e CRUD de depoimentos.
- [ ] **T4:** Implementar edicao de dados basicos do site (dados de contato, horario).
- [ ] **T5:** Documentar para o cliente como publicar um novo artigo de blog (guia simples em `/admin/ajuda`).
- [ ] **T6:** Testar fluxo completo: login > editar depoimento > salvar > verificar no site.

### Scope IN

- Autenticacao protegida
- CRUD de depoimentos
- Edicao de dados basicos
- Documentacao de uso para o cliente

### Scope OUT

- Editor visual de paginas (drag-and-drop)
- Gerenciamento de imagens (upload direto no admin)
- Multi-usuario / permissoes por role
- Analytics no painel admin

### Dev Notes

**[AUTO-DECISION] Recomendacao de solucao para MVP:**
Para um site de profissional liberal com um unico administrador e conteudo simples, a solucao mais pragmatica e:
- **NextAuth.js** (credentials ou email magic link) para autenticacao
- **JSON files** em `src/data/` para depoimentos (editados via formulario no admin, salvos em disco)
- **Revalidation on-demand** (`revalidatePath`) para aplicar mudancas sem rebuild completo

Se o cliente precisar de mais funcionalidades no futuro, migrar para Payload CMS ou Sanity.

### Testing

- Testar login com credenciais incorretas — deve negar acesso
- Testar adicionar, editar e remover depoimento
- Verificar que depoimento editado aparece no site apos salvar
- Testar em mobile — painel deve ser usavel em tablet/celular

### Dependencias

**Requer:** T.4 — Home Secoes (depoimentos), T.1 — Setup (variaveis de ambiente para auth).

---

## Story T.17 — Deploy Vercel + Dominio Customizado

**ID:** T.17
**Titulo:** Finalizar deploy em producao na Vercel com dominio customizado e SSL
**Status:** Draft
**Complexidade:** P
**Executor:** @dev + @devops
**Quality Gate:** @qa

### User Story

**As a** {NOME} que quer ter o site no ar com meu dominio profissional,
**I want** que o site esteja acessivel via `{dominio}.com.br` com HTTPS, redirecionamento de www e email profissional configurado,
**So that** eu possa compartilhar o link do site com clientes e o Google possa indexar o site com o dominio correto.

### Acceptance Criteria

- [ ] **AC1:** Site acessivel em `https://{dominio}.com.br` e `https://www.{dominio}.com.br` — ambos com SSL valido (certificado automatico Vercel).
- [ ] **AC2:** Redirecionamento configurado: `www.{dominio}.com.br` redireciona para `{dominio}.com.br` (ou vice-versa — consistente com `NEXT_PUBLIC_SITE_URL`).
- [ ] **AC3:** Variaveis de ambiente de producao configuradas na Vercel: todas as variaveis do `.env.example` preenchidas com valores reais.
- [ ] **AC4:** `NEXT_PUBLIC_SITE_URL` configurado com o dominio final — `sitemap.xml` e `og:image` usam o dominio correto.
- [ ] **AC5:** Site indexavel: `robots.txt` permite indexacao, Google Search Console configurado e propriedade verificada.
- [ ] **AC6:** Score Lighthouse em producao >= 95 (confirmar que o ambiente de prod nao degradou a performance do preview).

### Tasks

- [ ] **T1:** Configurar dominio customizado no painel Vercel — adicionar records DNS no registrador do dominio (A record ou CNAME).
- [ ] **T2:** Configurar todas as variaveis de ambiente de producao no painel Vercel (Settings > Environment Variables).
- [ ] **T3:** Configurar redirecionamento www <> apex no `next.config.ts` ou no painel Vercel.
- [ ] **T4:** Verificar `NEXT_PUBLIC_SITE_URL` apontando para o dominio final — checar sitemap.xml e og:image.
- [ ] **T5:** Adicionar site no Google Search Console — verificar via DNS TXT ou arquivo HTML.
- [ ] **T6:** Rodar Lighthouse em producao (`https://{dominio}.com.br`) — confirmar 95+.
- [ ] **T7:** Fazer teste de fumo: navegar todas as paginas principais, testar formulario de contato, testar WhatsApp widget.

### Scope IN

- Dominio customizado na Vercel
- SSL automatico
- Variaveis de ambiente de producao
- Google Search Console
- Lighthouse em producao

### Scope OUT

- Email profissional (@{dominio}) — requer servico separado (Google Workspace, Zoho Mail)
- CDN adicional (Vercel ja inclui)
- Configuracao de backup automatico

### Dev Notes

**DNS Records necessarios (tipico Vercel):**
```
Tipo    Nome    Valor
A       @       76.76.21.21  (IP Vercel — confirmar no painel)
CNAME   www     cname.vercel-dns.com
TXT     @       vercel=... (verificacao de dominio)
```

**Checklist pre-lancamento:**
- [ ] Foto real do(a) profissional substituiu o placeholder
- [ ] Todos os dados (OAB, endereco, horario) sao reais e verificados
- [ ] Conteudo dos artigos revisado pelo(a) profissional
- [ ] Depoimentos autorizados pelos clientes
- [ ] Politica de privacidade revisada por advogado (mesmo que seja um site de advogado)
- [ ] WhatsApp testado — numero correto, mensagem correta
- [ ] Formulario de contato testado — email chegando corretamente

**Nota sobre push e PR:** Esta story requer operacoes de git push e configuracao de CI/CD — delegar ao @devops para as operacoes de repositorio remoto.

### Testing

- Acessar `https://{dominio}.com.br` — certificar HTTPS verde
- Acessar `http://www.{dominio}.com.br` — verificar redirecionamento
- Testar formulario de contato em producao
- Testar WhatsApp widget em producao
- Rodar Lighthouse em producao

### Dependencias

**Requer:** Todas as stories anteriores (T.1 a T.16) — esta e a story final de lancamento.

---

## Resumo: Ordem de Implementacao Recomendada

```
Sprint 1 (Semana 1-2):
  T.1 Setup → T.2 Design System → T.3 Hero → T.4 Home Secoes

Sprint 2 (Semana 2-3):
  T.5 Sobre → T.6 Contato → T.7 FAQ → T.8 LGPD
  T.9 Sub-paginas Servicos → T.10 SEO Servicos

Sprint 3 (Semana 3-4):
  T.11 Blog → T.12 Artigos
  T.13 Schema → T.14 Seguranca → T.15 Lighthouse
  T.16 Admin → T.17 Deploy
```

**Dependencias criticas:**
- T.1 e prerequisito de TODAS as outras stories
- T.2 e prerequisito de T.3, T.4, T.5, T.6, T.7, T.8, T.11
- T.4 cria o data layer de servicos usado por T.9
- T.15 (Lighthouse) so deve rodar apos todas as paginas prontas
- T.17 (Deploy) e sempre a ultima story

---

*Criado por River (SM) — AIOX Scrum Master*
*Baseado no projeto: Site Dra. Gislaine Rodrigues — Direito de Familia (SBC/SP)*
*Reutilizavel para: advogados, medicos, dentistas, psicologos, fisioterapeutas, contadores e demais profissionais liberais*
