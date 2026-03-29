# Guia de UX -- Plataforma de Gestao para Cegonheiros

**Autora:** Uma (UX Design Expert Agent)
**Data:** 2026-03-28
**Status:** Completo -- Pronto para Implementacao
**Stack:** Next.js 15+ / Tailwind CSS / shadcn/ui / Supabase / PWA

---

## Indice

1. [Design System Foundation](#1-design-system-foundation)
2. [Arquitetura de Informacao](#2-arquitetura-de-informacao)
3. [Wireframes dos Fluxos Principais](#3-wireframes-dos-fluxos-principais)
4. [UX Patterns Especificos](#4-ux-patterns-especificos)
5. [Acessibilidade (WCAG AA)](#5-acessibilidade-wcag-aa)
6. [Decisoes de Design](#6-decisoes-de-design)

---

## 1. Design System Foundation

### 1.1 Paleta de Cores

[AUTO-DECISION] Paleta otimizada para uso outdoor com sol forte -> Alto contraste com cores saturadas e fundos claros. Razao: motoristas usam o app na estrada, frequentemente sob luz solar direta.

#### Cores Primarias

| Token | Hex | Uso | Contraste (sobre branco) |
|-------|-----|-----|--------------------------|
| `--color-primary-900` | `#1B3A4B` | Texto principal, headers | 10.2:1 |
| `--color-primary-700` | `#2C5F7C` | Botoes primarios, links | 5.8:1 |
| `--color-primary-500` | `#3D8EB9` | Icones ativos, destaques | 3.5:1 (apenas decorativo) |
| `--color-primary-100` | `#E3F2FD` | Backgrounds claros, cards | N/A (fundo) |

#### Cores Semanticas

| Token | Hex | Uso | Contraste |
|-------|-----|-----|-----------|
| `--color-success` | `#1B7A3D` | Confirmacoes, status ok | 5.4:1 |
| `--color-warning` | `#B45309` | Alertas, pendencias | 5.1:1 |
| `--color-danger` | `#B91C1C` | Erros, exclusoes | 5.7:1 |
| `--color-info` | `#1E5A8A` | Informacoes neutras | 6.2:1 |

#### Cores de Superficie

| Token | Hex | Uso |
|-------|-----|-----|
| `--surface-background` | `#F8FAFC` | Fundo da pagina |
| `--surface-card` | `#FFFFFF` | Cards e containers |
| `--surface-muted` | `#F1F5F9` | Areas secundarias |
| `--surface-border` | `#CBD5E1` | Bordas e divisores |

#### Cores para Status de Viagem

| Token | Hex | Uso |
|-------|-----|-----|
| `--status-planejada` | `#3B82F6` | Viagem planejada |
| `--status-em-andamento` | `#F59E0B` | Viagem em andamento |
| `--status-concluida` | `#10B981` | Viagem concluida |
| `--status-cancelada` | `#EF4444` | Viagem cancelada |

**Regra critica:** Todo texto funcional deve ter ratio minimo de 4.5:1 sobre seu fundo. Textos grandes (24px+) aceitam 3:1.

### 1.2 Tipografia

[AUTO-DECISION] Fonte -> Inter. Razao: excelente legibilidade em telas pequenas, pesos variados disponiveis no Google Fonts, boa renderizacao em Android de baixo custo.

| Nivel | Tamanho Mobile | Tamanho Desktop | Peso | Line Height | Uso |
|-------|---------------|-----------------|------|-------------|-----|
| Display | 28px | 36px | 700 (Bold) | 1.2 | Titulos de pagina |
| H1 | 24px | 30px | 700 | 1.25 | Secoes principais |
| H2 | 20px | 24px | 600 (SemiBold) | 1.3 | Sub-secoes |
| H3 | 18px | 20px | 600 | 1.3 | Cards, grupos |
| Body | 16px | 16px | 400 (Regular) | 1.5 | Texto corrido |
| Body Small | 14px | 14px | 400 | 1.5 | Labels, metadata |
| Caption | 12px | 12px | 500 (Medium) | 1.4 | Datas, tags, dicas |

**Regra critica:** Tamanho minimo de texto funcional = 14px. Nunca usar menor que 12px em nenhuma circunstancia.

**Numeros financeiros:** Usar `font-variant-numeric: tabular-nums` para alinhamento em colunas de valores monetarios.

### 1.3 Espacamento e Grid

| Token | Valor | Uso |
|-------|-------|-----|
| `--space-xs` | 4px | Gaps minimos |
| `--space-sm` | 8px | Padding interno de tags |
| `--space-md` | 16px | Padding de cards |
| `--space-lg` | 24px | Gaps entre secoes |
| `--space-xl` | 32px | Margens de pagina |
| `--space-2xl` | 48px | Espacamento entre blocos |

**Grid:**
- Mobile: 1 coluna, margens de 16px
- Tablet (768px+): 2 colunas, gap de 24px
- Desktop (1024px+): 3 colunas com sidebar de 280px
- Max-width do conteudo: 1200px

### 1.4 Componentes Base

#### Botoes

```
HIERARCHY:
  Primary   -> Acoes principais (Salvar, Confirmar, Lancar)
  Secondary -> Acoes secundarias (Filtrar, Cancelar)
  Ghost     -> Acoes terciarias (Editar inline, links)
  Danger    -> Acoes destrutivas (Excluir, Cancelar viagem)

TAMANHOS:
  sm  -> 36px altura, padding 12px 16px (acoes inline)
  md  -> 44px altura, padding 14px 20px (padrao desktop)
  lg  -> 52px altura, padding 16px 24px (CTAs mobile - PADRAO MOBILE)

REGRA: No mobile, TODOS os botoes de acao principal devem usar tamanho lg (52px).
       Isso garante touch target >= 48px (WCAG 2.5.5).

ESTADOS:
  default  -> cor base
  hover    -> 10% mais escuro (desktop only)
  active   -> 15% mais escuro + scale(0.98)
  disabled -> opacity 0.5, cursor not-allowed
  loading  -> spinner inline, texto "Salvando..."
```

#### Inputs

```
TAMANHO: 48px altura minima (touch-friendly)
LABEL:   Sempre visivel acima do input (nunca apenas placeholder)
ESTADOS:
  default  -> borda --surface-border
  focus    -> borda --color-primary-700, ring 2px --color-primary-100
  error    -> borda --color-danger, mensagem abaixo em vermelho
  disabled -> background --surface-muted, opacity 0.7

TIPOS ESPECIFICOS:
  Monetario  -> Prefixo "R$", mascara numerica, alinhamento a direita
  Placa      -> Mascara ABC-1D23 ou ABC-1234, uppercase automatico
  CNPJ       -> Mascara 00.000.000/0000-00
  CPF        -> Mascara 000.000.000-00
  Telefone   -> Mascara (00) 00000-0000
  Km         -> Apenas numeros, sufixo "km"
```

#### Cards

```
ESTRUTURA:
  ┌─────────────────────────────────┐
  │ [Icone] Titulo        [Status] │  <- Header: 56px min
  │─────────────────────────────────│
  │                                 │
  │  Conteudo principal             │  <- Body: padding 16px
  │  com informacoes-chave          │
  │                                 │
  │─────────────────────────────────│
  │ [Acao Secundaria]  [Acao Prim.] │  <- Footer: 48px min
  └─────────────────────────────────┘

ESTILOS:
  Elevation: shadow-sm (4px blur)
  Border: 1px solid --surface-border
  Border-radius: 12px
  Background: --surface-card
  Padding: 16px

VARIANTES:
  Card Resumo   -> Numeros grandes, cor de destaque (dashboard)
  Card Listagem -> Compacto, clicavel, chevron a direita
  Card Detalhe  -> Expandido, multiplas secoes
```

#### Modais

```
REGRA: Em mobile, modais DEVEM ser bottom-sheets (surgem de baixo).
       Em desktop, modais centralizados tradicionais.

ESTRUTURA BOTTOM-SHEET:
  ┌──────────────────────────┐
  │        ━━━━━              │  <- Handle de arraste (40px)
  │  Titulo do Modal          │
  │──────────────────────────│
  │                           │
  │  Conteudo                 │
  │                           │
  │──────────────────────────│
  │  [Cancelar]  [Confirmar]  │  <- Botoes com safe-area-inset
  └──────────────────────────┘

MAX-HEIGHT: 85vh (mobile), 90vh (desktop)
BACKDROP: rgba(0,0,0,0.5) com click-to-dismiss
ANIMACAO: slide-up 200ms ease-out (mobile)
```

### 1.5 Iconografia

[AUTO-DECISION] Biblioteca -> Lucide Icons (ja inclusa no shadcn/ui). Razao: consistencia com stack, icones simples e intuitivos, tamanho de bundle otimizado com tree-shaking.

| Contexto | Icone | Nome Lucide |
|----------|-------|-------------|
| Caminhao | Caminhao estilizado | `Truck` |
| Motorista | Pessoa com capacete | `UserCircle` |
| Gasto | Cifrao | `DollarSign` |
| Viagem | Rota/mapa | `Route` |
| Combustivel | Gota | `Droplet` |
| Pedagio | Placa | `SquareArrowRight` |
| Pneu | Circulo | `Circle` |
| Manutencao | Chave inglesa | `Wrench` |
| Foto | Camera | `Camera` |
| Filtro | Funil | `Filter` |
| Relatorio | Grafico | `BarChart3` |
| Fechamento | Calendario check | `CalendarCheck` |
| Dashboard | Grid | `LayoutDashboard` |
| Configuracoes | Engrenagem | `Settings` |
| Sair/Logout | Porta | `LogOut` |
| Adicionar | Mais | `Plus` |
| Editar | Lapis | `Pencil` |
| Excluir | Lixeira | `Trash2` |
| Voltar | Seta esquerda | `ArrowLeft` |
| Menu | Hamburger | `Menu` |
| Offline | Nuvem cortada | `CloudOff` |
| Sincronizando | Setas girando | `RefreshCw` |
| Sucesso | Check circulo | `CheckCircle` |
| Erro | X circulo | `XCircle` |
| Empresa | Predio | `Building2` |
| Vincular | Corrente | `Link` |

**Tamanhos padrao:**
- Navegacao: 24px
- Inline com texto: 20px
- Cards de resumo: 32px
- Empty states: 48px

---

## 2. Arquitetura de Informacao

### 2.1 Sitemap Completo

```
/                              -> Redirect para /login ou /dashboard
├── /login                     -> Magic link (email)
├── /onboarding                -> Wizard primeiro acesso (3 passos)
│   ├── /onboarding/empresa    -> Cadastro da empresa
│   ├── /onboarding/caminhao   -> Primeiro caminhao
│   └── /onboarding/motorista  -> Primeiro motorista
│
├── /dashboard                 -> Visao geral (adaptado por role)
│
├── /cadastros
│   ├── /cadastros/empresa     -> Dados da empresa
│   ├── /cadastros/motoristas  -> Lista de motoristas
│   │   ├── /cadastros/motoristas/novo
│   │   └── /cadastros/motoristas/[id]
│   ├── /cadastros/caminhoes   -> Lista de caminhoes
│   │   ├── /cadastros/caminhoes/novo
│   │   └── /cadastros/caminhoes/[id]
│   └── /cadastros/vinculos    -> Vinculos motorista <-> caminhao
│
├── /gastos
│   ├── /gastos                -> Lista de gastos (filtros)
│   ├── /gastos/novo           -> Lancamento de gasto
│   └── /gastos/[id]           -> Detalhe do gasto
│
├── /viagens
│   ├── /viagens               -> Lista de viagens
│   ├── /viagens/nova          -> Cadastro de viagem
│   └── /viagens/[id]          -> Detalhe da viagem
│
├── /financeiro
│   ├── /financeiro            -> Visao geral financeira
│   ├── /financeiro/fechamento -> Fechamento por periodo
│   └── /financeiro/relatorio  -> Relatorios e impressao
│
└── /configuracoes             -> Configuracoes da conta
```

### 2.2 Navegacao Principal

#### Mobile (Bottom Navigation -- 5 itens max)

```
┌─────────────────────────────────────────────┐
│                                             │
│            [Conteudo da pagina]              │
│                                             │
├─────────────────────────────────────────────┤
│  🏠        🚛        ➕        📊       ☰  │
│ Inicio   Viagens   Lancar   Financ.  Mais  │
└─────────────────────────────────────────────┘

O botao central "Lancar" (➕) e o FAB (Floating Action Button):
- Maior que os demais (56px circular, elevado)
- Cor primaria, destaque visual
- Abre bottom-sheet com opcoes:
  - Lancar Gasto
  - Nova Viagem
  - Novo Cadastro

"Mais" abre drawer lateral com:
  - Cadastros (submenu)
  - Configuracoes
  - Sair
```

#### Desktop (Sidebar Fixa)

```
┌──────────┬──────────────────────────────────┐
│          │                                  │
│ LOGO     │     [Breadcrumb]                 │
│          │                                  │
│ ─────── │──────────────────────────────────│
│          │                                  │
│ Dashboard│     [Conteudo da pagina]         │
│          │                                  │
│ Cadastros│                                  │
│  > Empresa                                  │
│  > Motoristas                               │
│  > Caminhoes                                │
│  > Vinculos                                 │
│          │                                  │
│ Gastos   │                                  │
│          │                                  │
│ Viagens  │                                  │
│          │                                  │
│ Financeiro                                  │
│  > Fechamento                               │
│  > Relatorios                               │
│          │                                  │
│ ─────── │                                  │
│ Config.  │                                  │
│ Sair     │                                  │
└──────────┴──────────────────────────────────┘

Sidebar: 280px, collapsavel para 64px (apenas icones)
```

### 2.3 Fluxo por Persona

#### Carlos (Dono da Frota) -- Desktop + Mobile

```
ENTRADA: Magic link por email -> Dashboard
FLUXO TIPICO:
  1. Ve dashboard com resumo financeiro semanal
  2. Verifica gastos pendentes de aprovacao
  3. Confere viagens em andamento
  4. Acessa fechamento mensal
  5. Gera relatorio para contador

FREQUENCIA: Diario (consulta), semanal (fechamento)
ACOES CRITICAS: Aprovar gastos, fechar periodo, gerar relatorio
```

#### Roberto (Motorista) -- Mobile Only

```
ENTRADA: Magic link por SMS/WhatsApp -> Dashboard simplificado
FLUXO TIPICO:
  1. Abre app (PWA no celular)
  2. Toca em "Lancar Gasto" (FAB central)
  3. Seleciona categoria (pedagio, combustivel, etc.)
  4. Digita valor
  5. Tira foto do comprovante
  6. Salva (com ou sem internet)

FREQUENCIA: Multiplas vezes ao dia
ACOES CRITICAS: Lancar gasto com foto, ver viagem atual
RESTRICOES: Conexao instavel, mao suja/com luva, sol no display
```

#### Ana (Administrativa) -- Desktop

```
ENTRADA: Magic link por email -> Dashboard
FLUXO TIPICO:
  1. Cadastra nova viagem com origem/destino/valores
  2. Vincula motorista e caminhao a viagem
  3. Revisa gastos lancados pelos motoristas
  4. Faz fechamento semanal/mensal
  5. Gera PDF para impressao
  6. Cadastra novos motoristas/caminhoes

FREQUENCIA: Diario
ACOES CRITICAS: Cadastro de viagens, fechamento, impressao
```

---

## 3. Wireframes dos Fluxos Principais

### 3.1 Login / Magic Link

```
MOBILE (360px)
┌──────────────────────────────┐
│                              │
│         [Logo]               │
│    Gestao de Cegonheiros     │
│                              │
│  ─────────────────────────── │
│                              │
│  Acesse sua conta            │
│                              │
│  Email ou telefone           │
│  ┌──────────────────────┐    │
│  │ seu@email.com        │    │
│  └──────────────────────┘    │
│                              │
│  ┌──────────────────────┐    │
│  │   ENVIAR LINK DE     │    │
│  │      ACESSO          │    │
│  └──────────────────────┘    │
│                              │
│  Voce recebera um link       │
│  no seu email para entrar.   │
│  Sem senha necessaria.       │
│                              │
│                              │
│  ─────────────────────────── │
│  Primeira vez?               │
│  [Criar conta da empresa]    │
│                              │
└──────────────────────────────┘

ESTADOS:
  - Apos envio: "Link enviado! Verifique seu email."
    com botao "Reenviar" (habilitado apos 60s countdown)
  - Erro: "Email nao encontrado. Verifique ou crie uma conta."

DECISAO: Magic link ao inves de senha.
  Razao: publico com baixa maturidade digital esquece senhas.
  Magic link = fluxo mais simples, sem recuperacao de senha.
```

### 3.2 Onboarding (Primeiro Acesso -- 3 Passos)

```
PASSO 1/3 -- EMPRESA
┌──────────────────────────────┐
│  [<-]  Configurar Empresa    │
│                              │
│  ● ─── ○ ─── ○              │
│  Empresa  Caminhao Motorista │
│                              │
│  CNPJ                        │
│  ┌──────────────────────┐    │
│  │ 00.000.000/0000-00   │    │  <- Auto-busca dados na ReceitaWS
│  └──────────────────────┘    │
│                              │
│  Razao Social (preenchido)   │
│  ┌──────────────────────┐    │
│  │ Transportes Silva    │    │
│  └──────────────────────┘    │
│                              │
│  Nome Fantasia               │
│  ┌──────────────────────┐    │
│  │ Cegonhas Silva       │    │
│  └──────────────────────┘    │
│                              │
│  Telefone                    │
│  ┌──────────────────────┐    │
│  │ (11) 99999-9999      │    │
│  └──────────────────────┘    │
│                              │
│  ┌──────────────────────┐    │
│  │      PROXIMO >>      │    │
│  └──────────────────────┘    │
│                              │
│  Pular por enquanto          │
└──────────────────────────────┘

PASSO 2/3 -- PRIMEIRO CAMINHAO
┌──────────────────────────────┐
│  [<-]  Cadastrar Caminhao    │
│                              │
│  ○ ─── ● ─── ○              │
│                              │
│  Placa                       │
│  ┌──────────────────────┐    │
│  │ ABC-1D23             │    │
│  └──────────────────────┘    │
│                              │
│  Modelo                      │
│  ┌──────────────────────┐    │
│  │ Scania R450           │   │
│  └──────────────────────┘    │
│                              │
│  Ano      Capacidade         │
│  ┌────┐   ┌─────────────┐   │
│  │2022│   │ 11 veiculos  │   │
│  └────┘   └─────────────┘   │
│                              │
│  Km Atual                    │
│  ┌──────────────────────┐    │
│  │ 150.000 km           │    │
│  └──────────────────────┘    │
│                              │
│  ┌──────────────────────┐    │
│  │      PROXIMO >>      │    │
│  └──────────────────────┘    │
│                              │
│  Pular por enquanto          │
└──────────────────────────────┘

PASSO 3/3 -- PRIMEIRO MOTORISTA
┌──────────────────────────────┐
│  [<-]  Cadastrar Motorista   │
│                              │
│  ○ ─── ○ ─── ●              │
│                              │
│  Nome Completo               │
│  ┌──────────────────────┐    │
│  │ Roberto da Silva     │    │
│  └──────────────────────┘    │
│                              │
│  CPF                         │
│  ┌──────────────────────┐    │
│  │ 000.000.000-00       │    │
│  └──────────────────────┘    │
│                              │
│  Telefone (WhatsApp)         │
│  ┌──────────────────────┐    │
│  │ (11) 98888-7777      │    │
│  └──────────────────────┘    │
│                              │
│  CNH                         │
│  ┌──────────────────────┐    │
│  │ 00000000000          │    │
│  └──────────────────────┘    │
│                              │
│  Vincular ao caminhao:       │
│  ┌──────────────────────┐    │
│  │ ABC-1D23 - Scania    │ v  │
│  └──────────────────────┘    │
│                              │
│  ┌──────────────────────┐    │
│  │   CONCLUIR SETUP     │    │
│  └──────────────────────┘    │
└──────────────────────────────┘
```

### 3.3 Dashboard do Dono (Carlos)

```
DESKTOP (1200px)
┌──────────┬──────────────────────────────────────────────────┐
│          │  Dashboard              Bem-vindo, Carlos        │
│ SIDEBAR  │                                                  │
│          │  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐   │
│          │  │ R$     │ │ R$     │ │        │ │        │   │
│          │  │45.200  │ │12.340  │ │ 3      │ │ 2      │   │
│          │  │Faturado│ │Gastos  │ │Viagens │ │Caminhoes│   │
│          │  │semana  │ │semana  │ │ativas  │ │parados │   │
│          │  └────────┘ └────────┘ └────────┘ └────────┘   │
│          │                                                  │
│          │  ┌─────────────────────────────────────────────┐ │
│          │  │  GASTOS POR CATEGORIA (grafico barras)      │ │
│          │  │  ██████████████ Combustivel   R$ 6.200      │ │
│          │  │  ████████████   Pedagio       R$ 3.100      │ │
│          │  │  ██████         Manutencao    R$ 1.800      │ │
│          │  │  ████           Pneus         R$ 1.240      │ │
│          │  └─────────────────────────────────────────────┘ │
│          │                                                  │
│          │  ULTIMOS LANCAMENTOS                             │
│          │  ┌─────────────────────────────────────────────┐ │
│          │  │ 🔵 Roberto  Combustivel  R$ 450   hoje     │ │
│          │  │ 🟢 Jose     Pedagio      R$ 120   ontem    │ │
│          │  │ 🟡 Roberto  Manutencao   R$ 890   25/03    │ │
│          │  │ 🔵 Marcos   Combustivel  R$ 380   25/03    │ │
│          │  └─────────────────────────────────────────────┘ │
│          │                                                  │
│          │  VIAGENS EM ANDAMENTO                            │
│          │  ┌─────────────────────────────────────────────┐ │
│          │  │ 🚛 Roberto | SP -> RJ | 60% concluida     │ │
│          │  │ 🚛 Jose    | MG -> BA | 30% concluida     │ │
│          │  └─────────────────────────────────────────────┘ │
└──────────┴──────────────────────────────────────────────────┘

MOBILE (360px) -- Mesmos dados, empilhados verticalmente
┌──────────────────────────────┐
│  Dashboard         [Avatar]  │
│                              │
│  ┌────────┐  ┌────────┐     │
│  │R$45.200│  │R$12.340│     │
│  │Faturado│  │ Gastos │     │
│  └────────┘  └────────┘     │
│  ┌────────┐  ┌────────┐     │
│  │3 Viag. │  │2 Parado│     │
│  │ativas  │  │  s     │     │
│  └────────┘  └────────┘     │
│                              │
│  Ultimos Lancamentos  [Ver+] │
│  ┌──────────────────────┐    │
│  │ Roberto  Comb. R$450 │    │
│  │ Jose     Ped.  R$120 │    │
│  └──────────────────────┘    │
│                              │
│  Viagens Ativas       [Ver+] │
│  ┌──────────────────────┐    │
│  │ 🚛 Roberto SP->RJ   │    │
│  │    ██████████░░  60% │    │
│  └──────────────────────┘    │
│                              │
├──────────────────────────────┤
│  🏠    🚛    [+]   📊   ☰  │
└──────────────────────────────┘
```

### 3.4 Cadastro de Caminhao

```
MOBILE
┌──────────────────────────────┐
│  [<-]  Novo Caminhao         │
│                              │
│  Placa *                     │
│  ┌──────────────────────┐    │
│  │ ABC-1D23             │    │
│  └──────────────────────┘    │
│                              │
│  Modelo *                    │
│  ┌──────────────────────┐    │
│  │ Scania R450          │    │
│  └──────────────────────┘    │
│                              │
│  Ano         Capacidade      │
│  ┌─────┐     ┌───────────┐   │
│  │ 2022│     │ 11 veic.  │   │
│  └─────┘     └───────────┘   │
│                              │
│  Tipo                        │
│  ┌──────────────────────┐    │
│  │ Cegonha aberta    v  │    │
│  └──────────────────────┘    │
│  Opcoes: Cegonha aberta,    │
│  Cegonha fechada, Guincho    │
│                              │
│  Km Atual                    │
│  ┌──────────────────────┐    │
│  │ 150.000 km           │    │
│  └──────────────────────┘    │
│                              │
│  Observacoes (opcional)      │
│  ┌──────────────────────┐    │
│  │                      │    │
│  │                      │    │
│  └──────────────────────┘    │
│                              │
│  ┌──────────────────────┐    │
│  │       SALVAR         │    │
│  └──────────────────────┘    │
│                              │
└──────────────────────────────┘

VALIDACOES:
  - Placa: formato AAA-0A00 ou AAA-0000 (Mercosul + antigo)
  - Placa duplicada: "Ja existe um caminhao com esta placa"
  - Ano: entre 1990 e ano atual+1
  - Capacidade: 1-15 veiculos
```

### 3.5 Cadastro de Motorista

```
MOBILE
┌──────────────────────────────┐
│  [<-]  Novo Motorista        │
│                              │
│  Nome Completo *             │
│  ┌──────────────────────┐    │
│  │                      │    │
│  └──────────────────────┘    │
│                              │
│  CPF *                       │
│  ┌──────────────────────┐    │
│  │ 000.000.000-00       │    │
│  └──────────────────────┘    │
│                              │
│  Telefone (WhatsApp) *       │
│  ┌──────────────────────┐    │
│  │ (00) 00000-0000      │    │
│  └──────────────────────┘    │
│  Sera usado para enviar o    │
│  link de acesso ao app.      │
│                              │
│  Numero da CNH               │
│  ┌──────────────────────┐    │
│  │                      │    │
│  └──────────────────────┘    │
│                              │
│  Categoria CNH               │
│  ┌──────────────────────┐    │
│  │ E                 v  │    │
│  └──────────────────────┘    │
│                              │
│  Validade CNH                │
│  ┌──────────────────────┐    │
│  │ DD/MM/AAAA           │    │
│  └──────────────────────┘    │
│                              │
│  Foto (opcional)             │
│  ┌──────────────────────┐    │
│  │   [Camera] [Galeria] │    │
│  └──────────────────────┘    │
│                              │
│  ┌──────────────────────┐    │
│  │   SALVAR MOTORISTA   │    │
│  └──────────────────────┘    │
│                              │
└──────────────────────────────┘

VALIDACOES:
  - CPF: digitos verificadores
  - CPF duplicado: "Ja existe um motorista com este CPF"
  - Telefone: obrigatorio (para magic link)
  - CNH vencida: warning (nao bloqueia, mas mostra alerta)
```

### 3.6 Vincular Motorista <-> Caminhao

```
DESKTOP
┌──────────────────────────────────────────────────────┐
│  Vinculos Motorista / Caminhao                       │
│                                                      │
│  ┌────────────────────────┐  ┌──────────────────┐   │
│  │ Selecione o motorista: │  │ Vincular a:      │   │
│  │ ┌──────────────────┐   │  │ ┌──────────────┐ │   │
│  │ │ 🔍 Buscar...     │   │  │ │ 🔍 Buscar.. │ │   │
│  │ └──────────────────┘   │  │ └──────────────┘ │   │
│  │                        │  │                  │   │
│  │ ○ Roberto da Silva     │  │ ☑ ABC-1D23      │   │
│  │ ● Jose Santos          │  │   Scania R450   │   │
│  │ ○ Marcos Oliveira      │  │                  │   │
│  │                        │  │ ☐ DEF-5G67      │   │
│  │                        │  │   Volvo FH540   │   │
│  │                        │  │                  │   │
│  │                        │  │ ☐ GHI-8J90      │   │
│  │                        │  │   MB Actros     │   │
│  └────────────────────────┘  └──────────────────┘   │
│                                                      │
│  Vinculos Atuais:                                    │
│  ┌──────────────────────────────────────────────┐   │
│  │ Jose Santos     <->  ABC-1D23 (Scania)       │   │
│  │                      Desde: 15/01/2026  [X]  │   │
│  ├──────────────────────────────────────────────┤   │
│  │ Roberto Silva   <->  DEF-5G67 (Volvo)        │   │
│  │                      Desde: 01/02/2026  [X]  │   │
│  └──────────────────────────────────────────────┘   │
│                                                      │
│  [Cancelar]                       [Salvar Vinculos]  │
└──────────────────────────────────────────────────────┘

REGRAS DE NEGOCIO (refletidas na UI):
  - 1 motorista pode dirigir N caminhoes (ao longo do tempo)
  - 1 caminhao pode ter N motoristas (ao longo do tempo)
  - Vinculo ativo: apenas 1 motorista por caminhao simultaneamente
  - Ao vincular, se caminhao ja tem motorista ativo, mostrar:
    "Este caminhao esta vinculado a [nome]. Deseja transferir?"

MOBILE: Fluxo em 2 passos (seleciona motorista -> seleciona caminhoes)
```

### 3.7 Lancamento de Gasto (Fluxo Mobile -- CRITICO)

```
ESTE E O FLUXO MAIS IMPORTANTE DA PLATAFORMA.
Usado dezenas de vezes por dia pelo motorista, frequentemente:
  - Com uma mao (outra segurando recibo)
  - Sob sol forte
  - Com conexao instavel
  - Com pressa

PASSO 1 -- CATEGORIA (bottom-sheet)
┌──────────────────────────────┐
│         ━━━━━                │
│  Que tipo de gasto?          │
│                              │
│  ┌──────┐  ┌──────┐         │
│  │ ⛽   │  │ 🛣️  │         │
│  │Combus│  │Pedag.│         │
│  │tivel │  │      │         │
│  └──────┘  └──────┘         │
│  ┌──────┐  ┌──────┐         │
│  │ 🔧   │  │ ⭕   │         │
│  │Manut.│  │Pneu  │         │
│  └──────┘  └──────┘         │
│  ┌──────┐  ┌──────┐         │
│  │ 🍽️  │  │ 📦   │         │
│  │Alimen│  │Outro │         │
│  │tacao │  │      │         │
│  └──────┘  └──────┘         │
│                              │
└──────────────────────────────┘

Botoes grandes: 80x80px cada (facil de tocar)
Grid 2x3, icones de 32px, labels de 14px

PASSO 2 -- VALOR E DETALHES
┌──────────────────────────────┐
│  [<-]  Combustivel           │
│                              │
│         R$                   │
│      ┌────────────┐          │
│      │   450,00   │          │  <- Input gigante (32px font)
│      └────────────┘          │     Foco automatico, teclado
│                              │     numerico aberto
│  Caminhao                    │
│  ┌──────────────────────┐    │
│  │ ABC-1D23 (Scania) v  │    │  <- Pre-selecionado se
│  └──────────────────────┘    │     motorista tem 1 caminhao
│                              │
│  Descricao (opcional)        │
│  ┌──────────────────────┐    │
│  │ Posto Shell BR-101   │    │
│  └──────────────────────┘    │
│                              │
│  Km atual (opcional)         │
│  ┌──────────────────────┐    │
│  │ 152.340 km           │    │
│  └──────────────────────┘    │
│                              │
│  ──────── COMPROVANTE ────── │
│                              │
│  ┌──────────────────────┐    │
│  │                      │    │
│  │   [Camera]           │    │  <- Abre camera direto
│  │   Tirar foto do      │    │
│  │   comprovante        │    │
│  │                      │    │
│  └──────────────────────┘    │
│                              │
│  ┌──────────────────────┐    │
│  │     LANCAR GASTO     │    │  <- Botao 52px, cor primaria
│  └──────────────────────┘    │
│                              │
└──────────────────────────────┘

APOS SALVAR:
┌──────────────────────────────┐
│                              │
│        ✅                    │
│                              │
│  Gasto lancado!              │
│  R$ 450,00 - Combustivel     │
│                              │
│  [Lancar outro]  [Voltar]    │
│                              │
│  ⚡ Salvo localmente.        │  <- Se offline
│  Sera sincronizado quando    │
│  houver internet.            │
│                              │
└──────────────────────────────┘
```

### 3.8 Lista de Gastos (com Filtros)

```
DESKTOP
┌──────────┬──────────────────────────────────────────────┐
│          │  Gastos                        [+ Novo Gasto]│
│ SIDEBAR  │                                              │
│          │  FILTROS (inline, colapsavel)                 │
│          │  ┌────────┐ ┌──────────┐ ┌───────────┐      │
│          │  │Periodo │ │Motorista │ │Caminhao   │      │
│          │  │Mar 2026│ │ Todos  v │ │ Todos   v │      │
│          │  └────────┘ └──────────┘ └───────────┘      │
│          │  ┌──────────┐ ┌─────────────────────┐       │
│          │  │Categoria │ │ Buscar...           │       │
│          │  │ Todos  v │ │                     │       │
│          │  └──────────┘ └─────────────────────┘       │
│          │                                              │
│          │  TOTAL FILTRADO: R$ 12.340,00  (47 lanc.)   │
│          │                                              │
│          │  ┌──────────────────────────────────────┐   │
│          │  │ Data     Motorista  Categ.  Valor    │   │
│          │  │──────────────────────────────────────│   │
│          │  │ 28/03   Roberto    Comb.   R$ 450   │   │
│          │  │ 28/03   Jose       Pedag.  R$ 120   │   │
│          │  │ 27/03   Roberto    Manut.  R$ 890   │   │
│          │  │ 27/03   Marcos     Comb.   R$ 380   │   │
│          │  │ 26/03   Roberto    Pneu    R$1.240  │   │
│          │  │ ...                                  │   │
│          │  └──────────────────────────────────────┘   │
│          │                                              │
│          │  [< Anterior]  Pag 1 de 5  [Proximo >]     │
└──────────┴──────────────────────────────────────────────┘

MOBILE -- Lista compacta com swipe actions
┌──────────────────────────────┐
│  Gastos              [Filtro]│
│                              │
│  Marco 2026  R$ 12.340      │
│                              │
│  HOJE                        │
│  ┌──────────────────────┐    │
│  │ ⛽ Roberto   R$ 450  │    │
│  │    Combustivel  10:30│    │
│  ├──────────────────────┤    │
│  │ 🛣️ Jose      R$ 120  │    │
│  │    Pedagio     09:15 │    │
│  └──────────────────────┘    │
│                              │
│  ONTEM                       │
│  ┌──────────────────────┐    │
│  │ 🔧 Roberto   R$ 890  │    │
│  │    Manutencao  14:20 │    │
│  ├──────────────────────┤    │
│  │ ⛽ Marcos     R$ 380  │    │
│  │    Combustivel  11:00│    │
│  └──────────────────────┘    │
│                              │
│  [Carregar mais]             │
│                              │
├──────────────────────────────┤
│  🏠    🚛    [+]   📊   ☰  │
└──────────────────────────────┘

Swipe esquerda no card: Editar / Excluir
Toque no card: abre detalhe com foto do comprovante
```

### 3.9 Cadastro de Viagem

```
DESKTOP (formulario completo)
┌──────────┬──────────────────────────────────────────────┐
│          │  Nova Viagem                                  │
│ SIDEBAR  │                                              │
│          │  ROTA                                        │
│          │  ┌─────────────────┐  ┌─────────────────┐   │
│          │  │ Origem *        │  │ Destino *       │   │
│          │  │ Sao Paulo - SP  │  │ Rio de Janeiro  │   │
│          │  └─────────────────┘  └─────────────────┘   │
│          │                                              │
│          │  ATRIBUICAO                                  │
│          │  ┌─────────────────┐  ┌─────────────────┐   │
│          │  │ Motorista *     │  │ Caminhao *      │   │
│          │  │ Roberto Silva v │  │ ABC-1D23 (Scan) │   │
│          │  └─────────────────┘  └─────────────────┘   │
│          │                                              │
│          │  VALORES                                     │
│          │  ┌─────────────────┐  ┌─────────────────┐   │
│          │  │ Valor Total *   │  │ % Motorista     │   │
│          │  │ R$ 15.000,00    │  │ 30%             │   │
│          │  └─────────────────┘  └─────────────────┘   │
│          │                                              │
│          │  Pagamento ao motorista: R$ 4.500,00         │
│          │  Receita liquida:        R$ 10.500,00        │
│          │                                              │
│          │  CUSTOS ESTIMADOS                            │
│          │  ┌─────────────────┐  ┌─────────────────┐   │
│          │  │ Combustivel est.│  │ Pedagio est.    │   │
│          │  │ R$ 2.800,00     │  │ R$ 450,00       │   │
│          │  └─────────────────┘  └─────────────────┘   │
│          │                                              │
│          │  Lucro estimado: R$ 7.250,00                 │
│          │                                              │
│          │  DATAS                                       │
│          │  ┌─────────────────┐  ┌─────────────────┐   │
│          │  │ Saida prevista  │  │ Chegada prev.   │   │
│          │  │ 29/03/2026      │  │ 31/03/2026      │   │
│          │  └─────────────────┘  └─────────────────┘   │
│          │                                              │
│          │  Observacoes                                 │
│          │  ┌───────────────────────────────────────┐   │
│          │  │ Carga de 8 veiculos para concession. │   │
│          │  └───────────────────────────────────────┘   │
│          │                                              │
│          │  [Cancelar]              [Salvar Viagem]     │
└──────────┴──────────────────────────────────────────────┘

CALCULO AUTOMATICO:
  Ao digitar valor total e % motorista, calcula e exibe em tempo real:
  - Pagamento ao motorista = total * %
  - Se custos estimados preenchidos:
    Lucro = total - pagamento - combustivel_est - pedagio_est
```

### 3.10 Fechamento Mensal

```
DESKTOP
┌──────────┬──────────────────────────────────────────────────┐
│          │  Fechamento Financeiro                            │
│ SIDEBAR  │                                                  │
│          │  Periodo: [Marco 2026 v]  Motorista: [Todos v]  │
│          │                                                  │
│          │  RESUMO GERAL                                    │
│          │  ┌──────────┐ ┌──────────┐ ┌──────────┐        │
│          │  │R$67.500  │ │R$20.250  │ │R$15.890  │        │
│          │  │Faturament│ │Pagamento │ │ Gastos   │        │
│          │  │  total   │ │motoristas│ │  total   │        │
│          │  └──────────┘ └──────────┘ └──────────┘        │
│          │  ┌──────────┐                                    │
│          │  │R$31.360  │                                    │
│          │  │ Lucro    │                                    │
│          │  │ liquido  │                                    │
│          │  └──────────┘                                    │
│          │                                                  │
│          │  POR MOTORISTA                                   │
│          │  ┌──────────────────────────────────────────┐   │
│          │  │ Motorista    Viagens  Gastos   Pagamento │   │
│          │  │──────────────────────────────────────────│   │
│          │  │ Roberto      3       R$4.200  R$8.100   │   │
│          │  │ Jose         2       R$3.450  R$6.000   │   │
│          │  │ Marcos       2       R$2.890  R$6.150   │   │
│          │  │──────────────────────────────────────────│   │
│          │  │ TOTAL        7       R$10.540 R$20.250  │   │
│          │  └──────────────────────────────────────────┘   │
│          │                                                  │
│          │  DETALHAMENTO -- Roberto da Silva                │
│          │  ┌──────────────────────────────────────────┐   │
│          │  │ Viagem SP->RJ  R$ 15.000  30% = R$4.500 │   │
│          │  │ Viagem RJ->MG  R$ 12.000  30% = R$3.600 │   │
│          │  │ Gastos:                                  │   │
│          │  │   Combustivel x5         R$ 2.100        │   │
│          │  │   Pedagio x8             R$ 960          │   │
│          │  │   Manutencao x1          R$ 890          │   │
│          │  │   Alimentacao x3         R$ 250          │   │
│          │  │ Total gastos:            R$ 4.200        │   │
│          │  │                                          │   │
│          │  │ Saldo motorista: R$ 8.100 - R$ 4.200    │   │
│          │  │                = R$ 3.900 a receber      │   │
│          │  └──────────────────────────────────────────┘   │
│          │                                                  │
│          │  [Fechar Periodo]        [Gerar PDF / Imprimir] │
└──────────┴──────────────────────────────────────────────────┘
```

### 3.11 Relatorio / Impressao

```
LAYOUT DE IMPRESSAO (A4, @media print)
┌─────────────────────────────────────────────────┐
│  TRANSPORTES SILVA LTDA                         │
│  CNPJ: 00.000.000/0000-00                       │
│  ──────────────────────────────────────────────  │
│                                                  │
│  NOTA DE FECHAMENTO                              │
│  Periodo: 01/03/2026 a 31/03/2026               │
│  Motorista: Roberto da Silva                     │
│  CPF: 000.000.000-00                             │
│  ──────────────────────────────────────────────  │
│                                                  │
│  VIAGENS REALIZADAS                              │
│  ┌────────────────────────────────────────────┐  │
│  │ Data     Rota       Valor   % Mot. Pgto   │  │
│  │ 05/03   SP->RJ    15.000  30%   4.500    │  │
│  │ 15/03   RJ->MG    12.000  30%   3.600    │  │
│  │                                           │  │
│  │ TOTAL              27.000        8.100    │  │
│  └────────────────────────────────────────────┘  │
│                                                  │
│  GASTOS                                          │
│  ┌────────────────────────────────────────────┐  │
│  │ Data     Descricao          Valor          │  │
│  │ 05/03   Combustivel         450,00         │  │
│  │ 06/03   Pedagio BR-101      120,00         │  │
│  │ ...                                        │  │
│  │ TOTAL                     4.200,00         │  │
│  └────────────────────────────────────────────┘  │
│                                                  │
│  RESUMO                                          │
│  Pagamento de viagens:    R$ 8.100,00            │
│  (-) Gastos lancados:     R$ 4.200,00            │
│  ─────────────────────────────────────           │
│  SALDO A PAGAR:           R$ 3.900,00            │
│                                                  │
│  ──────────────────────────────────────────────  │
│  Assinatura empresa: ________________________    │
│  Assinatura motorista: ______________________    │
│  Data: ___/___/______                            │
│                                                  │
│  Gerado em: 28/03/2026 as 14:30                  │
└─────────────────────────────────────────────────┘

IMPLEMENTACAO:
  - Usar @react-pdf/renderer para gerar PDF client-side
  - Botao "Imprimir" usa window.print() com @media print
  - Botao "Baixar PDF" gera arquivo .pdf para download
  - Layout otimizado para A4 (210mm x 297mm)
```

---

## 4. UX Patterns Especificos

### 4.1 Offline-First: Lancamentos sem Internet

[AUTO-DECISION] Estrategia offline -> Queue local com sync automatico. Razao: motoristas passam por tuneis, areas rurais e trechos sem cobertura. Impedir lancamento = perda de dados = usuario desiste do app.

```
ARQUITETURA OFFLINE:

1. LANCAMENTO OFFLINE
   Usuario lanca gasto normalmente
   -> Dados salvos no IndexedDB/localStorage
   -> Badge "Salvo localmente" aparece
   -> Fila de sync: pending_uploads[]

2. DETECCAO DE CONEXAO
   navigator.onLine + fetch healthcheck periodico
   -> Online: tenta sync automatico a cada 30s
   -> Offline: para de tentar, mostra indicador

3. SINCRONIZACAO
   Quando online retorna:
   -> Envia fila em ordem cronologica
   -> Upload de fotos em background (comprimidas)
   -> Atualiza status: "Sincronizado ✓"
   -> Se conflito: server wins (ultimo write), notifica user

4. INDICADOR VISUAL (sempre visivel)
   ┌──────────────────────────────┐
   │ [CloudOff] Offline           │  <- Banner sutil no topo
   │ 3 lancamentos pendentes      │
   └──────────────────────────────┘

   OU

   ┌──────────────────────────────┐
   │ [RefreshCw] Sincronizando... │  <- Animacao de rotacao
   │ 2 de 3 enviados              │
   └──────────────────────────────┘

   OU

   ┌──────────────────────────────┐
   │ [CheckCircle] Tudo sincron.  │  <- Desaparece apos 3s
   └──────────────────────────────┘

5. DADOS DISPONIVEIS OFFLINE
   - Lista de caminhoes do motorista (cache)
   - Lista de categorias de gasto (cache)
   - Ultimos 50 lancamentos (cache)
   - Viagem ativa (cache)

6. DADOS QUE PRECISAM DE INTERNET
   - Dashboard completo (exibe cache + banner "dados de X min atras")
   - Fechamento financeiro
   - Cadastros novos (exceto gastos)
```

**Service Worker Strategy:**

```
CACHING:
  - App shell: cache-first (HTML, CSS, JS, icones)
  - API data: network-first com fallback para cache
  - Imagens de comprovantes: cache-first apos upload
  - Fontes: cache-first (Inter via Google Fonts)

MANIFEST (PWA):
  name: "Gestao Cegonheiros"
  short_name: "Cegonha"
  display: "standalone"
  orientation: "portrait"
  theme_color: "#1B3A4B"
  background_color: "#F8FAFC"
```

### 4.2 Foto Upload: UX do Comprovante

```
FLUXO DE CAPTURA:

1. Usuario toca em "Tirar foto do comprovante"
   -> Abre camera nativa do dispositivo (input type="file" accept="image/*" capture="environment")
   -> Camera traseira por padrao (comprovante na mao)

2. Foto capturada
   -> Preview imediato no app
   -> Compressao client-side automatica:
      - Redimensionar para max 1200px no lado maior
      - Qualidade JPEG 70%
      - Resultado final: < 200KB
   -> Indicador de tamanho: "Foto: 142KB ✓"

3. Opcoes apos captura:
   ┌──────────────────────────────┐
   │ ┌────────────────────────┐   │
   │ │                        │   │
   │ │   [Preview da foto]    │   │
   │ │                        │   │
   │ └────────────────────────┘   │
   │                              │
   │  142KB ✓                     │
   │                              │
   │  [Tirar outra]  [Usar esta]  │
   └──────────────────────────────┘

4. Offline: foto armazenada em base64 no IndexedDB
   -> Upload real ocorre quando online
   -> Indicador: "Foto salva. Upload pendente."

COMPRESSAO (browser-image-compression):
  maxSizeMB: 0.2 (200KB)
  maxWidthOrHeight: 1200
  useWebWorker: true
  fileType: 'image/jpeg'

FALLBACK: Se camera nao disponivel (desktop),
  mostrar botao "Enviar arquivo" (galeria/explorador)
```

### 4.3 Onboarding: Primeiro Acesso

```
PRINCIPIO: Reduzir atrito maximo. 3 passos ou menos.
           Cada passo tem "Pular por enquanto".

FLUXO:
  1. Login por magic link -> (email recebido via comercial/WhatsApp)
  2. Wizard 3 passos (empresa -> caminhao -> motorista)
  3. Dashboard com checklist de setup

CHECKLIST POS-ONBOARDING (no dashboard):
  ┌──────────────────────────────┐
  │  Comece por aqui!            │
  │                              │
  │  ☑ Dados da empresa          │
  │  ☑ Primeiro caminhao         │
  │  ☐ Primeiro motorista        │
  │  ☐ Primeira viagem           │
  │  ☐ Primeiro lancamento       │
  │                              │
  │  3 de 5 completos            │
  │  ████████████░░░░░░  60%     │
  │                              │
  │  [Continuar: Cadastrar       │
  │   Motorista ->]              │
  └──────────────────────────────┘

  Ao completar 100%: checklist desaparece com animacao de confetti.
  Card de "Dica do dia" substitui (ex: "Sabia que voce pode lancar
  gastos offline?")

CONVITE DE MOTORISTAS:
  Apos cadastrar motorista com telefone:
  -> Botao "Enviar link de acesso por WhatsApp"
  -> Gera link: https://app.exemplo.com/invite/{token}
  -> Motorista abre link -> instala PWA -> ja logado
  -> Permissoes: apenas gastos + viagem ativa
```

### 4.4 Empty States

```
PRINCIPIO: Nunca mostrar tela vazia. Sempre guiar o proximo passo.

LISTA DE MOTORISTAS (vazia):
┌──────────────────────────────┐
│                              │
│       [UserCircle 48px]      │
│                              │
│  Nenhum motorista cadastrado │
│                              │
│  Cadastre seu primeiro       │
│  motorista para comecar a    │
│  gerenciar a frota.          │
│                              │
│  [+ Cadastrar Motorista]     │
│                              │
└──────────────────────────────┘

LISTA DE GASTOS (vazia):
┌──────────────────────────────┐
│                              │
│       [DollarSign 48px]      │
│                              │
│  Nenhum gasto neste periodo  │
│                              │
│  Os lancamentos dos seus     │
│  motoristas aparecerao aqui. │
│                              │
│  [Lancar Gasto]              │
│                              │
└──────────────────────────────┘

LISTA DE VIAGENS (vazia):
┌──────────────────────────────┐
│                              │
│       [Route 48px]           │
│                              │
│  Nenhuma viagem cadastrada   │
│                              │
│  Cadastre uma viagem para    │
│  acompanhar rota, custos e   │
│  pagamentos.                 │
│                              │
│  [+ Nova Viagem]             │
│                              │
└──────────────────────────────┘

DASHBOARD (sem dados):
┌──────────────────────────────┐
│                              │
│  Bem-vindo ao Gestao         │
│  Cegonheiros!                │
│                              │
│  Seu painel ficara completo  │
│  quando voce tiver viagens e │
│  lancamentos cadastrados.    │
│                              │
│  Comece por aqui:            │
│  [Checklist de onboarding]   │
│                              │
└──────────────────────────────┘

FILTRO SEM RESULTADOS:
┌──────────────────────────────┐
│                              │
│       [Filter 48px]          │
│                              │
│  Nenhum resultado encontrado │
│                              │
│  Tente ajustar os filtros    │
│  ou o periodo de busca.      │
│                              │
│  [Limpar Filtros]            │
│                              │
└──────────────────────────────┘
```

### 4.5 Feedback e Confirmacoes

```
TOAST NOTIFICATIONS (canto superior direito desktop / topo mobile):
  Sucesso: fundo --color-success, icone CheckCircle, 3s auto-dismiss
  Erro:    fundo --color-danger, icone XCircle, persistente (requer dismiss)
  Warning: fundo --color-warning, icone AlertTriangle, 5s auto-dismiss
  Info:    fundo --color-info, icone Info, 3s auto-dismiss

CONFIRMACAO DE EXCLUSAO (sempre modal):
┌──────────────────────────────┐
│                              │
│  Excluir motorista?          │
│                              │
│  Roberto da Silva sera       │
│  removido permanentemente.   │
│  Gastos e viagens vinculados │
│  serao mantidos no historico.│
│                              │
│  [Cancelar]     [Excluir]    │
│                  (vermelho)   │
└──────────────────────────────┘

CONFIRMACAO DE FECHAMENTO:
┌──────────────────────────────┐
│                              │
│  Fechar periodo?             │
│                              │
│  Marco 2026 sera fechado.    │
│  Apos o fechamento, gastos   │
│  e viagens deste periodo     │
│  nao poderao ser editados.   │
│                              │
│  [Cancelar]  [Fechar Periodo]│
└──────────────────────────────┘

LOADING STATES:
  - Skeleton screens para listas (nao spinners)
  - Botoes: texto muda para "Salvando..." + spinner inline
  - Tabelas: linhas placeholder com shimmer animation
  - Upload de foto: progress bar dentro do thumbnail
```

### 4.6 Busca e Filtros

```
BUSCA GLOBAL (desktop header):
  - Campo de busca com atalho Ctrl+K
  - Busca em: motoristas (nome, CPF), caminhoes (placa), viagens (rota)
  - Resultados agrupados por tipo
  - Max 5 resultados por tipo no dropdown

FILTROS EM LISTAS:
  - Desktop: filtros inline acima da tabela, sempre visiveis
  - Mobile: botao "Filtro" no header abre bottom-sheet
  - Filtros ativos mostram badge com contagem
  - "Limpar filtros" sempre visivel quando ha filtro ativo

  Mobile bottom-sheet de filtros:
  ┌──────────────────────────────┐
  │         ━━━━━                │
  │  Filtros          [Limpar]  │
  │                              │
  │  Periodo                     │
  │  [01/03/2026] a [31/03/2026]│
  │                              │
  │  Motorista                   │
  │  [Todos                  v]  │
  │                              │
  │  Caminhao                    │
  │  [Todos                  v]  │
  │                              │
  │  Categoria                   │
  │  [☑ Combustivel] [☑ Pedag.] │
  │  [☑ Manutencao] [☑ Pneu  ] │
  │  [☑ Alimentacao][☑ Outros ] │
  │                              │
  │  ┌──────────────────────┐    │
  │  │   APLICAR FILTROS    │    │
  │  └──────────────────────┘    │
  └──────────────────────────────┘
```

---

## 5. Acessibilidade (WCAG AA)

### 5.1 Checklist de Conformidade

| Criterio | Nivel | Status | Implementacao |
|----------|-------|--------|---------------|
| 1.1.1 Texto alternativo | A | Planejado | `alt` em todas as imagens, `aria-label` em icones |
| 1.3.1 Info e relacoes | A | Planejado | Headings hierarquicos, `fieldset`/`legend` em forms |
| 1.4.3 Contraste minimo | AA | Planejado | Ratio 4.5:1 texto, 3:1 texto grande |
| 1.4.4 Redimensionamento | AA | Planejado | Layout responsivo, sem perda ate 200% zoom |
| 1.4.11 Contraste nao-texto | AA | Planejado | Bordas de input 3:1, icones funcionais 3:1 |
| 2.1.1 Teclado | A | Planejado | Todos os interativos acessiveis por teclado |
| 2.4.3 Ordem de foco | A | Planejado | Tab order logico, focus trap em modais |
| 2.4.7 Foco visivel | AA | Planejado | Ring 2px --color-primary-700 em todos os focusable |
| 2.5.5 Tamanho do alvo | AAA (adotado) | Planejado | Min 48px touch target em todos os interativos |
| 3.3.1 Identificacao de erro | A | Planejado | Mensagem textual, cor + icone (nao so cor) |
| 3.3.2 Labels e instrucoes | A | Planejado | Labels visiveis, hints em campos complexos |
| 4.1.2 Nome, funcao, valor | A | Planejado | `aria-label`, `role`, `aria-expanded` |

### 5.2 Touch Targets

```
REGRA ABSOLUTA: Nenhum elemento interativo pode ter area de toque menor que 48x48px.

Componentes e seus tamanhos minimos:
  - Botoes: 52px altura (lg) no mobile
  - Links em lista: 48px altura de linha
  - Checkboxes: 24px visual + 48px touch area (padding)
  - Selects/dropdowns: 48px altura
  - Tab bar items: 48px largura minima
  - Bottom sheet handle: 48px area de toque
  - Close buttons (X): 48px area de toque (visual pode ser 24px)

ESPACAMENTO ENTRE ALVOS:
  - Min 8px entre elementos clicaveis adjacentes
  - Previne toques acidentais
```

### 5.3 Contraste para Uso Externo

```
CONTEXTO: Motoristas usam o app sob sol forte.
          Telas de celular em ambientes brilhantes perdem ~60% do contraste percebido.

ESTRATEGIA:
  1. Fundos claros (--surface-background: #F8FAFC)
     -> Mais legivel sob sol do que fundos escuros
  2. Texto principal escuro (#1B3A4B) sobre fundo claro
     -> Ratio 10.2:1 (muito acima do minimo 4.5:1)
  3. Textos secundarios (#475569) sobre fundo claro
     -> Ratio 6.4:1 (acima do minimo)
  4. Botoes primarios com fundo escuro e texto branco
     -> Ratio 7.1:1
  5. Nenhuma informacao transmitida apenas por cor
     -> Sempre icone + texto + cor
  6. Status com label textual obrigatorio
     -> "Em andamento" (nao apenas bolinha amarela)

PROIBIDO:
  - Texto cinza claro sobre fundo branco
  - Placeholders como unica indicacao de campo
  - Icones sem label em contextos criticos
  - Diferenciar estados apenas por matiz de cor
```

### 5.4 Navegacao por Teclado (Desktop)

```
ATALHOS GLOBAIS:
  Ctrl+K       -> Busca global
  Ctrl+N       -> Novo lancamento
  Escape       -> Fechar modal / voltar
  Tab          -> Proximo elemento
  Shift+Tab    -> Elemento anterior
  Enter        -> Ativar botao/link focado
  Space        -> Toggle checkbox focado

FOCUS MANAGEMENT:
  - Modal aberto: focus trap (Tab nao sai do modal)
  - Modal fechado: foco retorna ao elemento que abriu
  - Pagina carregada: foco no H1 ou primeiro campo
  - Erro em formulario: foco no primeiro campo com erro
  - Toast: nao rouba foco (aria-live="polite")

SKIP LINK:
  - Primeiro elemento Tab na pagina
  - "Ir para conteudo principal"
  - Visivel apenas com foco de teclado
```

### 5.5 Formularios Acessiveis

```
PADRAO PARA TODOS OS CAMPOS:

<label for="campo-id">Label visivel</label>
<input
  id="campo-id"
  aria-describedby="campo-hint campo-error"
  aria-invalid="true|false"
  aria-required="true"
/>
<span id="campo-hint">Texto de ajuda</span>
<span id="campo-error" role="alert">Mensagem de erro</span>

ERROS:
  - Mostrar lista de erros no topo do formulario
  - Cada item da lista eh link para o campo com erro
  - Campo com erro: borda vermelha + icone + texto
  - Anunciar erros via aria-live="assertive"

VALIDACAO:
  - Inline (on blur) para feedback imediato
  - On submit como fallback
  - Desabilitar botao submit enquanto ha erros criticos
```

---

## 6. Decisoes de Design

### 6.1 Registro de Decisoes

| ID | Decisao | Alternativas Consideradas | Razao |
|----|---------|---------------------------|-------|
| D1 | Magic link (sem senha) | Email+senha, SMS code | Publico com baixa maturidade digital. Magic link = zero fricao de senha esquecida |
| D2 | Bottom navigation (mobile) | Hamburger menu, tab bar | Thumb zone favoravel, acesso direto as 4 funcoes principais + FAB |
| D3 | FAB central "Lancar" | Botao no header, item de menu | Lancamento de gasto e a acao mais frequente. FAB garante acesso em 1 toque |
| D4 | Offline-first com queue | Online-only, cache simples | Motoristas em areas sem cobertura. Impedir uso = abandono |
| D5 | Bottom-sheet para modais mobile | Modal centralizado, pagina nova | Bottom-sheet e mais ergonomico para uso com uma mao |
| D6 | Skeleton screens | Spinners, loading text | Skeleton reduz percepcao de espera, melhora CLS |
| D7 | Categorias com icone grande | Lista textual, dropdown | Toque rapido sob condicoes adversas (sol, luvas, pressa) |
| D8 | Calculo automatico em viagens | Calculo manual pelo usuario | Reduz erro humano, feedback imediato sobre lucratividade |
| D9 | Compressao client-side de fotos | Upload original + server resize | Economia de banda (3G), economia de storage, experiencia mais rapida |
| D10 | PWA ao inves de app nativo | React Native, Flutter | Sem app store = deploy instantaneo, sem review Apple/Google, URL compartilhavel |
| D11 | Inter como fonte principal | System font, Roboto | Legibilidade superior em telas pequenas, pesos variados, Google Fonts gratuita |
| D12 | Paleta de alto contraste | Material Design padrao | Uso outdoor sob sol forte exige contraste acima do minimo WCAG |

### 6.2 Metricas de Sucesso UX

| Metrica | Alvo | Como Medir |
|---------|------|------------|
| Tempo para lancar gasto | < 30 segundos | Analytics: timestamp abrir tela -> submit |
| Taxa de completude do onboarding | > 80% | Analytics: % que completa 3/3 passos |
| Erro em formularios | < 10% de submits | Analytics: submits com erro / total |
| Sync offline bem-sucedido | > 99% | Logs: sync success / total attempts |
| Adocao do PWA (install) | > 60% dos motoristas | Analytics: beforeinstallprompt accept |
| Tempo no fechamento mensal | < 5 minutos | Analytics: timestamp abrir -> gerar PDF |

### 6.3 Proximos Passos para Implementacao

1. **Configurar Tailwind** com os tokens de cor e tipografia definidos neste guia
2. **Instalar shadcn/ui** com os componentes base: Button, Input, Select, Card, Dialog, Sheet, Toast, Skeleton
3. **Configurar PWA** com next-pwa: manifest, service worker, offline fallback
4. **Implementar layout base**: PageLayout com sidebar (desktop) e bottom nav (mobile)
5. **Criar fluxo de login/onboarding** como primeiro milestone visual
6. **Implementar lancamento de gasto** (mobile-first) como segundo milestone
7. **Implementar compressao de foto** com browser-image-compression
8. **Configurar offline queue** com IndexedDB wrapper (idb ou dexie)
9. **Implementar dashboard** com cards de resumo
10. **Implementar fechamento e PDF** com @react-pdf/renderer

---

*Documento gerado por Uma (UX Design Expert) -- Synkra AIOX*
*Metodologia: Atomic Design + User-Centered Design*
*Conformidade: WCAG 2.1 AA*
