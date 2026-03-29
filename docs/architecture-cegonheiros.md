# Arquitetura -- Plataforma de Gestao para Cegonheiros

**Autor:** Aria (Architect Agent)
**Data:** 2026-03-28
**Status:** Proposta Inicial -- Viabilidade Tecnica
**Classificacao:** Greenfield, MVP-first, Startup

---

## 1. Visao Geral

Plataforma web responsiva para gestao de frotas de cegonheiros (transporte de veiculos). O sistema atende donos de frotas pequenas/medias que precisam controlar motoristas, caminhoes, viagens, gastos e fechamento financeiro.

**Usuarios-alvo:**
- Dono da frota (admin): acesso completo via desktop/tablet
- Motorista: lancamento de gastos e consulta de viagens via celular
- Escritorio/financeiro: fechamento e conciliacao

---

## 2. Stack Tecnologica Recomendada

### Decisao: Next.js + Supabase + Vercel

| Camada | Tecnologia | Justificativa |
|--------|-----------|---------------|
| **Frontend** | Next.js 15+ (App Router) | SSR/SSG, responsivo, PWA-ready, ecossistema maduro |
| **Estilizacao** | Tailwind CSS + shadcn/ui | Prototipacao rapida, componentes acessiveis, responsivo nativo |
| **Estado** | Zustand + React Query (TanStack Query) | Zustand para estado local, React Query para cache de servidor |
| **Backend/API** | Supabase (PostgREST + Edge Functions) | Zero backend code para CRUD, Edge Functions para logica customizada |
| **Banco de Dados** | PostgreSQL (via Supabase) | Relacional, robusto, RLS nativo, full-text search |
| **Auth** | Supabase Auth | Magic link + email/senha, multi-tenant via RLS |
| **Storage** | Supabase Storage | Upload de fotos de comprovantes, 1GB free, buckets com RLS |
| **PDF** | @react-pdf/renderer ou jsPDF | Geracao client-side de notas/fechamentos |
| **Hospedagem** | Vercel (Free/Pro) | Deploy automatico, preview branches, edge network |
| **Monitoramento** | Sentry (free tier) | Error tracking, performance monitoring |

### Custo Estimado Mensal (MVP)

| Servico | Plano | Custo |
|---------|-------|-------|
| Vercel | Hobby (1 dev) / Pro ($20) | $0 - $20 |
| Supabase | Free (ate 500MB DB, 1GB storage) | $0 |
| Supabase | Pro (quando escalar) | $25/mes |
| Sentry | Free (5K events) | $0 |
| Dominio | .com.br | ~R$40/ano |
| **Total MVP** | | **$0 - $20/mes** |
| **Total Escala** | | **~$45/mes** |

### Trade-offs Considerados

| Opcao | Pros | Contras | Decisao |
|-------|------|---------|---------|
| Firebase vs Supabase | Firebase tem melhor offline | Supabase = PostgreSQL real, SQL, RLS nativo | **Supabase** |
| Prisma vs PostgREST | Prisma tem melhor DX com types | PostgREST elimina backend, Supabase gera types | **PostgREST + supabase gen types** |
| Vercel vs Railway | Railway permite backend custom | Vercel otimizado para Next.js, free tier generoso | **Vercel** |
| React Native vs PWA | RN tem acesso nativo (camera) | PWA suficiente para camera/fotos, sem app store | **PWA** (ver secao 5) |

---

## 3. Modelo de Dados (ERD Conceitual)

### Entidades Principais

```
┌─────────────┐       ┌─────────────┐       ┌─────────────┐
│   EMPRESA   │       │  MOTORISTA  │       │   CAMINHAO  │
│─────────────│       │─────────────│       │─────────────│
│ id (PK)     │       │ id (PK)     │       │ id (PK)     │
│ cnpj        │       │ nome        │       │ placa       │
│ razao_social│       │ cpf         │       │ modelo      │
│ nome_fantasia       │ cnh         │       │ ano         │
│ telefone    │       │ telefone    │       │ km_atual    │
│ email       │       │ status      │       │ capacidade  │
│ created_at  │       │ foto_url    │       │ tipo        │
│ user_id(FK) │       │ empresa_id  │       │ empresa_id  │
└──────┬──────┘       └──────┬──────┘       └──────┬──────┘
       │                     │                      │
       │              ┌──────┴──────────────────────┘
       │              │
       │    ┌─────────┴───────┐
       │    │ MOTORISTA_CAMINHAO│  (N:N junction)
       │    │─────────────────│
       │    │ motorista_id(FK)│
       │    │ caminhao_id(FK) │
       │    │ data_inicio     │
       │    │ data_fim        │
       │    │ ativo           │
       │    └─────────────────┘
       │
┌──────┴──────┐       ┌─────────────┐       ┌─────────────┐
│   VIAGEM    │       │    GASTO    │       │ FECHAMENTO  │
│─────────────│       │─────────────│       │─────────────│
│ id (PK)     │       │ id (PK)     │       │ id (PK)     │
│ empresa_id  │       │ viagem_id   │       │ empresa_id  │
│ motorista_id│       │ motorista_id│       │ motorista_id│
│ caminhao_id │       │ caminhao_id │       │ periodo_ini │
│ origem      │       │ categoria   │       │ periodo_fim │
│ destino     │       │ descricao   │       │ tipo (sem/mes)│
│ data_saida  │       │ valor       │       │ total_viagens│
│ data_chegada│       │ data        │       │ total_gastos│
│ valor_frete │       │ foto_url    │       │ total_liquido│
│ perc_motorista      │ created_at  │       │ status      │
│ custo_estimado      │ empresa_id  │       │ pdf_url     │
│ status      │       └─────────────┘       │ created_at  │
│ veiculos_qtd│                              └─────────────┘
│ notas       │
└─────────────┘
       │
┌──────┴──────────────┐       ┌─────────────────┐
│ VIAGEM_VEICULO      │       │   MANUTENCAO    │
│─────────────────────│       │─────────────────│
│ viagem_id (FK)      │       │ id (PK)         │
│ placa_veiculo       │       │ caminhao_id(FK) │
│ modelo              │       │ tipo            │
│ chassi              │       │ descricao       │
│ posicao_cegonha     │       │ km_realizada    │
│ status_entrega      │       │ data            │
│ foto_embarque_url   │       │ custo           │
│ foto_desembarque_url│       │ proxima_km      │
│ notas               │       │ proxima_data    │
└─────────────────────┘       │ alerta_ativo    │
                              │ empresa_id      │
┌─────────────────┐           └─────────────────┘
│   CATEGORIA     │
│─────────────────│       ┌─────────────────┐
│ id (PK)         │       │ RASTREAMENTO    │
│ nome            │       │─────────────────│
│ tipo (gasto/    │       │ id (PK)         │
│   manutencao)   │       │ caminhao_id(FK) │
│ icone           │       │ nome_servico    │
│ empresa_id      │       │ url_rastreio    │
│ ativa           │       │ login           │
└─────────────────┘       │ senha_hash      │
                          │ empresa_id      │
┌─────────────────┐       └─────────────────┘
│ COMBUSTIVEL_REF │
│─────────────────│
│ id (PK)         │
│ empresa_id      │
│ regiao          │
│ tipo_combustivel│
│ preco_litro     │
│ data_referencia │
│ fonte           │
└─────────────────┘
```

### Relacionamentos-chave

| Relacao | Tipo | Descricao |
|---------|------|-----------|
| Empresa -> Motorista | 1:N | Uma empresa tem varios motoristas |
| Empresa -> Caminhao | 1:N | Uma empresa tem varios caminhoes |
| Motorista <-> Caminhao | N:N | Via tabela junction com historico |
| Viagem -> Gasto | 1:N | Cada viagem pode ter varios gastos |
| Viagem -> Viagem_Veiculo | 1:N | Veiculos transportados na cegonha |
| Caminhao -> Manutencao | 1:N | Historico de manutencoes |
| Motorista -> Fechamento | 1:N por periodo | Fechamento financeiro por motorista |

### Multi-tenancy

A estrategia de multi-tenancy e por **empresa_id + RLS (Row Level Security)** no Supabase. Cada tabela tem `empresa_id` e uma policy RLS que filtra automaticamente:

```sql
CREATE POLICY "empresa_isolation" ON viagem
  USING (empresa_id = (SELECT empresa_id FROM usuario WHERE auth.uid() = usuario.user_id));
```

Isso elimina a necessidade de filtros manuais no codigo -- o banco garante isolamento.

---

## 4. Arquitetura de Alto Nivel

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENTE (Browser/PWA)                     │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌───────────────┐  │
│  │ Dashboard │  │ Viagens  │  │ Gastos   │  │  Financeiro   │  │
│  │  (Admin)  │  │  CRUD    │  │  CRUD    │  │  Fechamento   │  │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └───────┬───────┘  │
│       │              │              │                │           │
│  ┌────┴──────────────┴──────────────┴────────────────┴───────┐  │
│  │              Next.js App Router (SSR/CSR)                  │  │
│  │  - Server Components para leitura                         │  │
│  │  - Client Components para interacao                       │  │
│  │  - React Query para cache/sync                            │  │
│  └────────────────────────┬──────────────────────────────────┘  │
│                           │                                      │
│  ┌────────────────────────┴──────────────────────────────────┐  │
│  │              Supabase Client SDK (@supabase/ssr)           │  │
│  └────────────────────────┬──────────────────────────────────┘  │
└───────────────────────────┼──────────────────────────────────────┘
                            │ HTTPS
┌───────────────────────────┼──────────────────────────────────────┐
│                      SUPABASE CLOUD                              │
│  ┌────────────────────────┴──────────────────────────────────┐  │
│  │                   PostgREST (Auto-API)                     │  │
│  │              CRUD automatico sobre PostgreSQL               │  │
│  └────────────────────────┬──────────────────────────────────┘  │
│                           │                                      │
│  ┌────────────┐  ┌───────┴───────┐  ┌─────────────┐            │
│  │  Supabase  │  │  PostgreSQL   │  │  Supabase   │            │
│  │   Auth     │  │  + RLS        │  │  Storage    │            │
│  │            │  │  + Functions  │  │  (fotos)    │            │
│  └────────────┘  └───────────────┘  └─────────────┘            │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │              Edge Functions (Deno)                         │   │
│  │  - Calculo de precificacao                                │   │
│  │  - Geracao de fechamento                                  │   │
│  │  - Alertas de manutencao (cron)                           │   │
│  │  - Webhooks                                               │   │
│  └──────────────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────────────┘
                            │
┌───────────────────────────┼──────────────────────────────────────┐
│                      VERCEL                                      │
│  ┌────────────────────────┴──────────────────────────────────┐  │
│  │              Next.js Deployment                             │  │
│  │  - SSR via Serverless Functions                            │  │
│  │  - Static assets via Edge CDN                              │  │
│  │  - Preview deployments por branch                          │  │
│  └──────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────────┘
```

### Fluxo de Dados Principal

```
Motorista abre PWA no celular
  -> Next.js serve pagina (SSR ou cached)
  -> Supabase Auth valida sessao
  -> React Query busca dados via Supabase Client
  -> PostgREST retorna dados filtrados por RLS
  -> Motorista lanca gasto + foto
  -> Supabase Storage recebe imagem
  -> Insert via PostgREST com empresa_id automatico
  -> React Query invalida cache, UI atualiza
```

---

## 5. Decisoes Tecnicas

### 5.1. PWA vs App Nativo vs Web Responsivo

**Decisao: PWA (Progressive Web App)**

| Criterio | PWA | App Nativo | Web Simples |
|----------|-----|-----------|-------------|
| Custo de dev | Baixo | Alto (2 plataformas) | Baixo |
| Camera/fotos | Sim (API nativa) | Sim | Sim |
| Offline | Parcial (cache) | Completo | Nao |
| Instalavel | Sim (Add to Home) | Sim (App Store) | Nao |
| Atualizacao | Instantanea | Review da store | Instantanea |
| Notificacoes | Push (Web Push API) | Push nativo | Nao |
| GPS | Sim (Geolocation API) | Sim | Sim |

**Justificativa:** O caso de uso principal do motorista (lancar gastos, tirar foto do comprovante, consultar viagens) e 100% atendido por PWA. Nao ha necessidade de funcionalidades nativas exclusivas (Bluetooth, NFC, sensores). O custo de manter 2 apps nativos e proibitivo para uma startup. Next.js 15+ tem suporte nativo a PWA via manifest e service worker.

**Implementacao:**
- `next.config.js` com PWA config (manifest, icons, service worker)
- Cache-first para assets estaticos
- Network-first para dados de API
- IndexedDB para rascunhos offline (gastos nao enviados)

### 5.2. Monolito vs Microservicos

**Decisao: Monolito Modular**

**Justificativa:** Startup com 1-3 devs nao tem capacidade operacional para microservicos. O Supabase ja fornece separacao natural:
- PostgREST = API layer
- Edge Functions = logica de negocio customizada
- Storage = servico de arquivos
- Auth = servico de autenticacao

Tudo gerenciado como "monolito" do ponto de vista do codigo Next.js, mas com servicos separados no Supabase.

**Estrutura do monolito modular:**
```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/             # Rotas autenticadas
│   │   ├── dashboard/
│   │   ├── viagens/
│   │   ├── gastos/
│   │   ├── financeiro/
│   │   ├── caminhoes/
│   │   ├── motoristas/
│   │   ├── manutencao/
│   │   └── configuracoes/
│   ├── (public)/           # Rotas publicas
│   │   ├── login/
│   │   └── cadastro/
│   └── api/                # Route Handlers (quando Edge Function nao serve)
├── components/
│   ├── ui/                 # shadcn/ui base
│   ├── forms/              # Formularios reutilizaveis
│   ├── tables/             # Tabelas de dados
│   └── charts/             # Graficos do dashboard
├── lib/
│   ├── supabase/           # Client e server configs
│   ├── utils/              # Helpers
│   └── validations/        # Schemas Zod
├── hooks/                  # Custom hooks
├── stores/                 # Zustand stores
└── types/                  # TypeScript types (gerados por supabase gen types)
```

### 5.3. Autenticacao

**Decisao: Supabase Auth com email/senha + Magic Link**

| Opcao | Custo | Complexidade | Decisao |
|-------|-------|-------------|---------|
| Supabase Auth | Incluso | Baixa | **Escolhido** |
| Auth.js (NextAuth) | Gratis | Media | Alternativa |
| Clerk | $25/mes (apos 10K MAU) | Baixa | Descartado (custo) |
| Custom JWT | Gratis | Alta | Descartado (risco) |

**Fluxo de auth:**
1. Dono da empresa cadastra conta (email/senha)
2. Convida motoristas por email (Magic Link)
3. Motorista clica no link, acessa o PWA
4. RLS garante que motorista so ve dados da sua empresa
5. Roles: `admin` (dono), `motorista`, `financeiro`

**Implementacao de roles:**
```sql
-- Tabela de perfis com role
CREATE TABLE usuario (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  empresa_id UUID REFERENCES empresa(id),
  role TEXT CHECK (role IN ('admin', 'motorista', 'financeiro')),
  nome TEXT NOT NULL
);

-- RLS baseado em role
CREATE POLICY "admin_full_access" ON viagem
  USING (empresa_id = get_user_empresa_id())
  WITH CHECK (empresa_id = get_user_empresa_id());

CREATE POLICY "motorista_own_trips" ON viagem
  USING (
    empresa_id = get_user_empresa_id()
    AND (
      get_user_role() = 'admin'
      OR motorista_id = get_user_motorista_id()
    )
  );
```

### 5.4. Upload de Fotos

**Decisao: Supabase Storage com compressao client-side**

**Fluxo:**
1. Motorista tira foto (camera API do browser) ou seleciona do galeria
2. Client-side: comprime para max 800px, qualidade 70% (browser-image-compression)
3. Upload para Supabase Storage bucket `comprovantes/`
4. Storage retorna URL publica (ou signed URL para privado)
5. URL salva no registro de gasto

**Configuracao do bucket:**
```sql
-- Bucket com RLS
INSERT INTO storage.buckets (id, name, public) VALUES ('comprovantes', 'comprovantes', false);

-- Policy: usuario so acessa fotos da sua empresa
CREATE POLICY "empresa_storage" ON storage.objects
  USING (bucket_id = 'comprovantes' AND (storage.foldername(name))[1] = get_user_empresa_id()::text);
```

**Limites no free tier:** 1GB total. Para MVP com ~50 fotos/semana comprimidas (~200KB cada), da para ~100 semanas (~2 anos). Apos isso, Pro tier ($25/mes) da 100GB.

### 5.5. Geracao de PDF

**Decisao: @react-pdf/renderer (client-side)**

| Opcao | Onde roda | Pros | Contras |
|-------|-----------|------|---------|
| @react-pdf/renderer | Client | Componentes React, zero custo server | Bundle size |
| jsPDF | Client | Leve | API imperativa |
| Puppeteer/Playwright | Server | HTML->PDF perfeito | Precisa de servidor |
| Edge Function + pdf-lib | Edge | Serverless | Complexidade |

**Justificativa:** Para notas de fechamento e relatorios simples, `@react-pdf/renderer` permite usar componentes React para definir o layout do PDF. Roda no browser, zero custo de infraestrutura. Se precisar de PDFs mais complexos no futuro, migrar para Edge Function com `pdf-lib`.

### 5.6. Rastreamento

**Decisao: Links cadastraveis (iframe/redirect) -- nao integracao via API**

Os sites de rastreio de cegonheiros (Sascar, Autotrac, Onixsat) nao possuem APIs publicas padronizadas. A abordagem pragmatica e:
1. Cadastrar URL + credenciais por caminhao
2. Abrir em nova aba ou iframe (se permitido pelo site)
3. **Fase futura:** web scraping para extrair posicao (complexo, fragil)

### 5.7. Manutencao Preditiva

**Decisao: Alertas baseados em regras simples (km + tempo)**

Nao e machine learning -- sao regras configuradas:
```
SE (km_atual - km_ultima_troca_oleo) > 15.000 ENTAO alerta("Troca de oleo")
SE (dias_desde_ultima_revisao) > 180 ENTAO alerta("Revisao semestral")
SE (km_atual - km_ultimo_pneu) > 80.000 ENTAO alerta("Verificar pneus")
```

Implementado como Supabase Edge Function com pg_cron (roda diariamente), verifica regras e insere notificacoes.

---

## 6. Estimativa de Complexidade por Modulo

| # | Modulo | Complexidade | Estimativa (dev solo) | Justificativa |
|---|--------|--------------|-----------------------|---------------|
| 1 | Cadastro (Empresas, Motoristas, Caminhoes) | **Simples** | 1-2 semanas | CRUD padrao, relacao N:N com junction table |
| 2 | Gestao de Gastos | **Medio** | 2-3 semanas | CRUD + upload de fotos + categorias + filtros |
| 3 | Viagens | **Medio** | 2-3 semanas | CRUD + calculo de % + veiculos transportados + status |
| 4 | Financeiro (Fechamento) | **Complexo** | 3-4 semanas | Conciliacao, agrupamento por periodo, geracao de PDF, regras de negocio |
| 5 | Rastreamento | **Simples** | 0.5-1 semana | Apenas CRUD de links + abertura em nova aba |
| 6 | Manutencao Preditiva | **Medio** | 2 semanas | Regras configuradas + cron job + notificacoes |
| 7 | Precificacao | **Medio** | 1-2 semanas | Formulas de custo medio + estimativa por viagem |
| 8 | Dashboard | **Medio** | 2-3 semanas | Agregacoes SQL, graficos (recharts/nivo), filtros |

### Resumo

| Complexidade | Modulos | Total Estimado |
|-------------|---------|----------------|
| Simples | 2 | 1.5-3 semanas |
| Medio | 5 | 9-13 semanas |
| Complexo | 1 | 3-4 semanas |
| **Total** | **8** | **13.5-20 semanas** (~3.5-5 meses, 1 dev) |

### Sugestao de Faseamento (MVP-first)

**Fase 1 -- MVP (6-8 semanas):**
- Cadastro (empresas, motoristas, caminhoes)
- Gestao de Gastos (com upload de fotos)
- Viagens (CRUD basico)
- Auth e multi-tenancy

**Fase 2 -- Financeiro (4-5 semanas):**
- Fechamento semanal/mensal
- Geracao de PDF
- Conciliacao por motorista

**Fase 3 -- Inteligencia (3-4 semanas):**
- Dashboard consolidado
- Precificacao e custo medio
- Manutencao preditiva

**Fase 4 -- Extras (1-2 semanas):**
- Rastreamento (links)
- PWA offline mode
- Notificacoes push

---

## 7. Riscos Tecnicos

| # | Risco | Probabilidade | Impacto | Mitigacao |
|---|-------|--------------|---------|-----------|
| 1 | **Supabase free tier estourar** (DB 500MB ou Storage 1GB) | Media | Alto | Monitorar uso, migrar para Pro ($25/mes) quando atingir 70% |
| 2 | **RLS mal configurado** -- vazamento de dados entre empresas | Baixa | Critico | Testes automatizados de RLS por empresa; nunca confiar apenas no frontend |
| 3 | **Upload de fotos pesadas** em 3G/4G ruim | Alta | Medio | Compressao client-side obrigatoria (max 200KB); retry com exponential backoff |
| 4 | **Complexidade do fechamento financeiro** -- regras de negocio nao claras | Alta | Alto | Definir regras com o dono do negocio ANTES de implementar; usar Feature Flag para iterar |
| 5 | **PWA limitacoes no iOS** -- Safari restringe service workers | Media | Medio | Testar em Safari iOS desde o inicio; fallback para web simples se PWA falhar |
| 6 | **Vendor lock-in Supabase** | Baixa | Medio | Supabase e open-source; pode ser self-hosted; PostgreSQL standard facilita migracao |
| 7 | **Integracao com rastreio** -- sites bloqueiam iframe/scraping | Alta | Baixo | MVP: apenas links; integracao real so se houver API disponivel |
| 8 | **Performance de queries de fechamento** -- muitos JOINs | Media | Medio | Views materializadas para agregacoes; indice em (empresa_id, data) em todas as tabelas |
| 9 | **Offline mode instavel** -- conflitos de sync | Media | Medio | MVP sem offline; Fase 4 com estrategia last-write-wins para gastos |
| 10 | **Calculo de precificacao impreciso** | Media | Baixo | Dados de combustivel manuais inicialmente; integracao com API da ANP como evolucao |

### Riscos de Seguranca Especificos

| Risco | Mitigacao |
|-------|-----------|
| Credenciais de rastreio armazenadas | Criptografia em repouso (Supabase Vault) ou field-level encryption |
| Fotos de documentos sensiveis no storage | Bucket privado, signed URLs com expiracao curta (1h) |
| Sessoes de motorista em celulares compartilhados | Auto-logout apos 30min de inatividade |
| CNPJ/CPF expostos | Mascarar em listagens, mostrar completo apenas com permissao |

---

## 8. Recomendacoes de Implementacao

### 8.1. Comece pelo banco de dados
1. Criar todas as tabelas e RLS policies PRIMEIRO
2. Testar isolamento multi-tenant com dados de teste
3. Gerar types com `supabase gen types typescript`
4. So entao comecar o frontend

### 8.2. Use Supabase CLI para migrations
```bash
supabase migration new create_empresas
supabase migration new create_motoristas
supabase db push
```
Todas as mudancas de schema via migration files -- nunca via dashboard manual.

### 8.3. Validacao em duas camadas
- **Frontend:** Zod schemas para validacao de formularios
- **Backend:** CHECK constraints + RLS no PostgreSQL
- Nunca confiar apenas na validacao do frontend.

### 8.4. Testes prioritarios
1. **RLS policies** -- testar que empresa A nao ve dados da empresa B
2. **Calculo de fechamento** -- unit tests para formulas financeiras
3. **Upload flow** -- testar compressao + upload + URL retrieval
4. **Roles** -- testar que motorista nao acessa funcoes de admin

---

## 9. Diagramas de Referencia

### Fluxo de Lancamento de Gasto (Motorista)

```
[Motorista abre PWA]
       │
       v
[Seleciona "Novo Gasto"]
       │
       v
[Preenche: categoria, valor, descricao]
       │
       v
[Tira foto do comprovante] ──> [browser-image-compression] ──> [max 200KB]
       │
       v
[Supabase Storage upload] ──> [retorna foto_url]
       │
       v
[INSERT gasto com foto_url] ──> [PostgREST + RLS valida empresa_id]
       │
       v
[React Query invalida cache] ──> [Lista de gastos atualizada]
```

### Fluxo de Fechamento Financeiro

```
[Admin seleciona periodo + motorista]
       │
       v
[Edge Function: calcula_fechamento()]
       │
       v
[Query: SUM(viagens.valor * perc_motorista) - SUM(gastos.valor)]
       │
       v
[Retorna: total_viagens, total_gastos, liquido, detalhamento]
       │
       v
[Admin revisa e confirma]
       │
       v
[INSERT fechamento + status = 'confirmado']
       │
       v
[Gera PDF via @react-pdf/renderer]
       │
       v
[Upload PDF para Storage] ──> [URL salva no fechamento]
       │
       v
[Disponivel para impressao/download]
```

---

## 10. Conclusao de Viabilidade

**Viabilidade: ALTA**

| Criterio | Avaliacao |
|----------|-----------|
| Complexidade tecnica | Moderada -- CRUD-heavy com logica financeira |
| Stack maturidade | Alta -- Next.js, Supabase, Vercel sao battle-tested |
| Custo de infraestrutura | Minimo -- $0 no MVP, $45/mes em escala |
| Time-to-market (MVP) | 6-8 semanas (1 dev full-time) |
| Escalabilidade | Boa -- Supabase escala verticalmente ate ~10K usuarios |
| Risco principal | Regras de negocio do financeiro (resolver com discovery) |

**Proximos passos recomendados:**
1. Validar o modelo de dados com o dono do negocio (principalmente fechamento)
2. Criar o projeto Supabase e as migrations iniciais
3. Prototipar a tela de lancamento de gastos (fluxo mais critico para motorista)
4. Setup Next.js + Supabase + Vercel + PWA manifest

---

*Documento gerado por Aria (Architect Agent) -- AIOX Framework*
*Revisao tecnica recomendada antes da implementacao*
