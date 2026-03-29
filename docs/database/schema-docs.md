# Schema Documentation: Plataforma de Gestao de Cegonheiros

**Version:** 1.0.0
**Database:** PostgreSQL (Supabase)
**Author:** Dara (AIOX Data Engineer)
**Date:** 2026-03-28

---

## Table of Contents

1. [Architecture Overview](#1-architecture-overview)
2. [Entity Relationship](#2-entity-relationship)
3. [Tables Reference](#3-tables-reference)
4. [Enums](#4-enums)
5. [RLS Policies](#5-rls-policies)
6. [Views](#6-views)
7. [Functions](#7-functions)
8. [Indexes](#8-indexes)
9. [Seed Data](#9-seed-data)
10. [V2+ Tables](#10-v2-tables)
11. [Conventions](#11-conventions)
12. [Rollback Plan](#12-rollback-plan)

---

## 1. Architecture Overview

### Multi-Tenant Model

The system uses **tenant isolation via `empresa_id`** on every table. Row Level Security (RLS) policies enforce that no user can access data outside their empresa.

```
empresa (tenant root)
  |-- usuario (linked to Supabase Auth)
  |-- motorista
  |-- caminhao
  |-- motorista_caminhao (N:N junction)
  |-- categoria_gasto (custom per empresa + global defaults)
  |-- viagem
  |     |-- viagem_veiculo (vehicles transported)
  |-- gasto
  |     |-- foto_comprovante
  |-- fechamento
  |     |-- fechamento_item
  |-- rastreador (V2+)
  |-- manutencao_programada (V2+)
```

### Auth Flow

1. User signs in via Supabase Auth (magic link)
2. `auth.uid()` identifies the Supabase Auth user
3. `usuario.auth_id` maps the Auth user to the application user
4. `fn_get_empresa_id()` resolves the empresa for RLS
5. `fn_get_user_role()` determines permission level

### Monetary Values

**ALL monetary values are stored as INTEGER in centavos (cents).**

| Display Value | Stored Value | Column Type |
|--------------|-------------|-------------|
| R$ 1.500,00 | 150000 | INTEGER |
| R$ 0,50 | 50 | INTEGER |
| R$ 10.250,75 | 1025075 | INTEGER |

This eliminates floating-point precision issues entirely.

---

## 2. Entity Relationship

```
empresa 1──N usuario
empresa 1──N motorista
empresa 1──N caminhao
empresa 1──N categoria_gasto (custom)
empresa 1──N viagem
empresa 1──N gasto
empresa 1──N fechamento

motorista N──N caminhao (via motorista_caminhao, with history)

motorista 1──N gasto
motorista 1──N viagem
motorista 1──N fechamento

caminhao 1──N viagem
caminhao 1──N gasto (optional)

viagem 1──N viagem_veiculo
viagem 1──N gasto (optional link)

gasto 1──N foto_comprovante
gasto N──1 categoria_gasto

fechamento 1──N fechamento_item
fechamento_item --> gasto | viagem (polymorphic via tipo + referencia_id)
```

---

## 3. Tables Reference

### 3.1 empresa

Tenant root. Each empresa operates in complete isolation.

| Column | Type | Nullable | Default | Notes |
|--------|------|----------|---------|-------|
| id | UUID | NO | uuid_generate_v4() | PK |
| cnpj | VARCHAR(18) | NO | - | Unique, formatted 00.000.000/0000-00 |
| razao_social | TEXT | NO | - | Legal name |
| nome_fantasia | TEXT | YES | - | Trade name |
| endereco | TEXT | YES | - | |
| cidade | TEXT | YES | - | |
| estado | CHAR(2) | YES | - | UF (SP, RJ, etc.) |
| cep | VARCHAR(9) | YES | - | |
| telefone | VARCHAR(20) | YES | - | |
| email | TEXT | YES | - | |
| plano | plano_tipo | NO | 'free' | Subscription plan |
| max_caminhoes | INTEGER | NO | 3 | Limit by plan |
| ativa | BOOLEAN | NO | true | Soft-disable |
| created_at | TIMESTAMPTZ | NO | NOW() | |
| updated_at | TIMESTAMPTZ | NO | NOW() | Auto-updated |

**Constraints:** CNPJ format regex, max_caminhoes > 0, estado 2-letter uppercase.

### 3.2 usuario

Application user, linked to Supabase Auth.

| Column | Type | Nullable | Default | Notes |
|--------|------|----------|---------|-------|
| id | UUID | NO | uuid_generate_v4() | PK |
| auth_id | UUID | NO | - | Unique, maps to auth.users(id) |
| empresa_id | UUID | NO | - | FK -> empresa |
| nome | TEXT | NO | - | |
| email | TEXT | NO | - | |
| telefone | VARCHAR(20) | YES | - | |
| role | usuario_role | NO | 'motorista' | dono/motorista/admin |
| ativo | BOOLEAN | NO | true | |
| created_at | TIMESTAMPTZ | NO | NOW() | |
| updated_at | TIMESTAMPTZ | NO | NOW() | Auto-updated |

### 3.3 motorista

Driver. May or may not have app access (usuario_id is optional).

| Column | Type | Nullable | Default | Notes |
|--------|------|----------|---------|-------|
| id | UUID | NO | uuid_generate_v4() | PK |
| empresa_id | UUID | NO | - | FK -> empresa |
| usuario_id | UUID | YES | - | FK -> usuario (optional) |
| nome | TEXT | NO | - | |
| cpf | VARCHAR(14) | NO | - | Formatted 000.000.000-00 |
| cnh_numero | VARCHAR(20) | NO | - | |
| cnh_categoria | cnh_categoria | NO | 'E' | |
| cnh_validade | DATE | NO | - | |
| telefone | VARCHAR(20) | YES | - | |
| status | motorista_status | NO | 'ativo' | |
| observacao | TEXT | YES | - | |
| created_at | TIMESTAMPTZ | NO | NOW() | |
| updated_at | TIMESTAMPTZ | NO | NOW() | Auto-updated |

**Constraints:** CPF format regex, unique (empresa_id, cpf).

### 3.4 caminhao

Cegonheiro truck.

| Column | Type | Nullable | Default | Notes |
|--------|------|----------|---------|-------|
| id | UUID | NO | uuid_generate_v4() | PK |
| empresa_id | UUID | NO | - | FK -> empresa |
| placa | VARCHAR(8) | NO | - | ABC-1234 or ABC1D23 |
| modelo | TEXT | NO | - | |
| marca | TEXT | YES | - | |
| ano | INTEGER | YES | - | 1970-2100 |
| renavam | VARCHAR(20) | YES | - | |
| tipo_cegonha | tipo_cegonha | NO | 'aberta' | aberta/fechada |
| capacidade_veiculos | INTEGER | NO | 11 | 1-15 |
| km_atual | INTEGER | NO | 0 | >= 0 |
| ativo | BOOLEAN | NO | true | |
| observacao | TEXT | YES | - | |
| created_at | TIMESTAMPTZ | NO | NOW() | |
| updated_at | TIMESTAMPTZ | NO | NOW() | Auto-updated |

**Constraints:** capacidade 1-15, km >= 0, unique (empresa_id, placa).

### 3.5 motorista_caminhao

Junction table with history. Tracks which driver operates which truck over time.

| Column | Type | Nullable | Default | Notes |
|--------|------|----------|---------|-------|
| id | UUID | NO | uuid_generate_v4() | PK |
| empresa_id | UUID | NO | - | FK -> empresa |
| motorista_id | UUID | NO | - | FK -> motorista |
| caminhao_id | UUID | NO | - | FK -> caminhao |
| data_inicio | DATE | NO | CURRENT_DATE | |
| data_fim | DATE | YES | - | NULL = current |
| ativo | BOOLEAN | NO | true | |
| observacao | TEXT | YES | - | |
| created_at | TIMESTAMPTZ | NO | NOW() | |
| updated_at | TIMESTAMPTZ | NO | NOW() | Auto-updated |

**Constraints:** data_fim >= data_inicio if set. Partial unique index ensures only one active driver per truck.

### 3.6 categoria_gasto

Expense categories. Global defaults (empresa_id = NULL) + custom per empresa.

| Column | Type | Nullable | Default | Notes |
|--------|------|----------|---------|-------|
| id | UUID | NO | uuid_generate_v4() | PK |
| empresa_id | UUID | YES | - | NULL = global default |
| nome | TEXT | NO | - | |
| icone | TEXT | YES | - | Icon identifier |
| cor | VARCHAR(7) | YES | - | Hex color |
| ativa | BOOLEAN | NO | true | |
| ordem | INTEGER | NO | 0 | Display order |
| created_at | TIMESTAMPTZ | NO | NOW() | |
| updated_at | TIMESTAMPTZ | NO | NOW() | Auto-updated |

### 3.7 viagem

Trip/route for transporting vehicles.

| Column | Type | Nullable | Default | Notes |
|--------|------|----------|---------|-------|
| id | UUID | NO | uuid_generate_v4() | PK |
| empresa_id | UUID | NO | - | FK -> empresa |
| motorista_id | UUID | NO | - | FK -> motorista |
| caminhao_id | UUID | NO | - | FK -> caminhao |
| origem | TEXT | NO | - | |
| destino | TEXT | NO | - | |
| data_saida | TIMESTAMPTZ | NO | - | |
| data_chegada_prevista | TIMESTAMPTZ | YES | - | |
| data_chegada_real | TIMESTAMPTZ | YES | - | |
| valor_total | INTEGER | NO | 0 | Centavos |
| percentual_pagamento | NUMERIC(5,2) | NO | 0 | % paid to driver |
| status | viagem_status | NO | 'planejada' | |
| km_saida | INTEGER | YES | - | Odometer at departure |
| km_chegada | INTEGER | YES | - | Odometer at arrival |
| observacao | TEXT | YES | - | |
| created_by | UUID | YES | - | FK -> usuario |
| created_at | TIMESTAMPTZ | NO | NOW() | |
| updated_at | TIMESTAMPTZ | NO | NOW() | Auto-updated |

**Constraints:** valor >= 0, percentual 0-100, chegada >= saida, km_chegada >= km_saida.

### 3.8 viagem_veiculo

Vehicles being transported on the carrier.

| Column | Type | Nullable | Default | Notes |
|--------|------|----------|---------|-------|
| id | UUID | NO | uuid_generate_v4() | PK |
| empresa_id | UUID | NO | - | FK -> empresa |
| viagem_id | UUID | NO | - | FK -> viagem (CASCADE) |
| marca | TEXT | YES | - | |
| modelo | TEXT | NO | - | |
| placa | VARCHAR(8) | YES | - | |
| chassi | VARCHAR(20) | YES | - | |
| cor | TEXT | YES | - | |
| observacao | TEXT | YES | - | |
| posicao | INTEGER | YES | - | Position on carrier (1-15) |
| created_at | TIMESTAMPTZ | NO | NOW() | |
| updated_at | TIMESTAMPTZ | NO | NOW() | Auto-updated |

### 3.9 gasto

Expense record.

| Column | Type | Nullable | Default | Notes |
|--------|------|----------|---------|-------|
| id | UUID | NO | uuid_generate_v4() | PK |
| empresa_id | UUID | NO | - | FK -> empresa |
| categoria_id | UUID | NO | - | FK -> categoria_gasto |
| motorista_id | UUID | NO | - | FK -> motorista |
| caminhao_id | UUID | YES | - | FK -> caminhao |
| viagem_id | UUID | YES | - | FK -> viagem |
| valor | INTEGER | NO | - | Centavos, > 0 |
| data | DATE | NO | CURRENT_DATE | |
| descricao | TEXT | YES | - | |
| foto_url | TEXT | YES | - | Primary receipt photo |
| km_registro | INTEGER | YES | - | Odometer at expense |
| created_by | UUID | YES | - | FK -> usuario |
| created_at | TIMESTAMPTZ | NO | NOW() | |
| updated_at | TIMESTAMPTZ | NO | NOW() | Auto-updated |

### 3.10 foto_comprovante

Receipt photos stored in Supabase Storage.

| Column | Type | Nullable | Default | Notes |
|--------|------|----------|---------|-------|
| id | UUID | NO | uuid_generate_v4() | PK |
| empresa_id | UUID | NO | - | FK -> empresa |
| gasto_id | UUID | NO | - | FK -> gasto (CASCADE) |
| storage_path | TEXT | NO | - | Supabase Storage path |
| thumbnail_path | TEXT | YES | - | |
| content_type | VARCHAR(50) | YES | - | MIME type |
| size_bytes | INTEGER | YES | - | > 0 |
| uploaded_at | TIMESTAMPTZ | NO | NOW() | |
| created_at | TIMESTAMPTZ | NO | NOW() | |

### 3.11 fechamento

Financial settlement for a driver over a period.

| Column | Type | Nullable | Default | Notes |
|--------|------|----------|---------|-------|
| id | UUID | NO | uuid_generate_v4() | PK |
| empresa_id | UUID | NO | - | FK -> empresa |
| motorista_id | UUID | NO | - | FK -> motorista |
| periodo_inicio | DATE | NO | - | |
| periodo_fim | DATE | NO | - | |
| tipo | fechamento_tipo | NO | 'mensal' | semanal/mensal |
| total_gastos | INTEGER | NO | 0 | Centavos |
| total_viagens | INTEGER | NO | 0 | Centavos |
| saldo | INTEGER | NO | 0 | viagens - gastos (can be negative) |
| status | fechamento_status | NO | 'aberto' | |
| observacao | TEXT | YES | - | |
| fechado_por | UUID | YES | - | FK -> usuario |
| fechado_em | TIMESTAMPTZ | YES | - | |
| created_at | TIMESTAMPTZ | NO | NOW() | |
| updated_at | TIMESTAMPTZ | NO | NOW() | Auto-updated |

**Constraints:** periodo_fim >= periodo_inicio, totais >= 0, unique (empresa, motorista, periodo).

### 3.12 fechamento_item

Line items within a settlement.

| Column | Type | Nullable | Default | Notes |
|--------|------|----------|---------|-------|
| id | UUID | NO | uuid_generate_v4() | PK |
| empresa_id | UUID | NO | - | FK -> empresa |
| fechamento_id | UUID | NO | - | FK -> fechamento (CASCADE) |
| tipo | fechamento_item_tipo | NO | - | 'gasto' or 'viagem' |
| referencia_id | UUID | NO | - | Points to gasto.id or viagem.id |
| valor | INTEGER | NO | - | Centavos, non-zero |
| descricao | TEXT | YES | - | |
| created_at | TIMESTAMPTZ | NO | NOW() | |

---

## 4. Enums

| Enum | Values |
|------|--------|
| plano_tipo | free, essencial, profissional, enterprise |
| usuario_role | dono, motorista, admin |
| motorista_status | ativo, inativo |
| cnh_categoria | A, B, C, D, E, AB, AC, AD, AE |
| tipo_cegonha | aberta, fechada |
| viagem_status | planejada, em_andamento, concluida, cancelada |
| fechamento_tipo | semanal, mensal |
| fechamento_status | aberto, fechado, pago |
| fechamento_item_tipo | gasto, viagem |
| manutencao_tipo | troca_oleo, pneu, revisao, freio, correia, filtro, bateria, outro |
| manutencao_status | pendente, realizada, atrasada |

---

## 5. RLS Policies

### Permission Matrix

| Table | SELECT | INSERT | UPDATE | DELETE |
|-------|--------|--------|--------|--------|
| empresa | own empresa | - | dono only | - |
| usuario | same empresa | dono/admin | dono/admin + own profile | - |
| motorista | dono/admin: all; motorista: own | dono/admin | dono/admin | - |
| caminhao | same empresa | dono/admin | dono/admin | - |
| motorista_caminhao | same empresa | dono/admin | dono/admin | - |
| categoria_gasto | global + own empresa | dono/admin (custom only) | dono/admin | - |
| viagem | dono/admin: all; motorista: own | dono/admin | dono/admin + motorista (own) | - |
| viagem_veiculo | same empresa | dono/admin | dono/admin | dono/admin |
| gasto | dono/admin: all; motorista: own | dono/admin + motorista (own) | dono/admin + motorista (own) | - |
| foto_comprovante | same empresa | same empresa | - | - |
| fechamento | dono/admin: all; motorista: own | dono/admin | dono/admin | - |
| fechamento_item | same empresa | dono/admin | - | - |
| rastreador | same empresa | dono/admin | dono/admin | - |
| manutencao_programada | same empresa | dono/admin | dono/admin | - |

### Key Security Rules

1. **Tenant isolation is absolute** -- `fn_get_empresa_id()` is called in every policy
2. **Motorista can register expenses** -- important for on-the-road usage
3. **Motorista can update viagem status** -- to mark arrival
4. **Global categories are visible to all** -- empresa_id IS NULL
5. **No DELETE policies on critical tables** -- use soft-delete (ativo = false) or admin-only
6. **SECURITY DEFINER on helper functions** -- ensures they run with full access to resolve empresa_id

---

## 6. Views

### view_gastos_por_motorista_mes

Aggregated expenses by driver, month, and category. Used for settlement calculations.

**Columns:** empresa_id, motorista_id, motorista_nome, mes, categoria, qtd_gastos, total_centavos

### view_viagens_ativas

Currently active trips with driver and truck info.

**Columns:** id, empresa_id, origem, destino, data_saida, data_chegada_prevista, valor_total, percentual_pagamento, status, motorista_id, motorista_nome, motorista_telefone, caminhao_id, caminhao_placa, caminhao_modelo, qtd_veiculos

### view_caminhoes_com_motorista

All trucks with their currently assigned driver (if any).

**Columns:** caminhao_id, empresa_id, placa, modelo, marca, ano, tipo_cegonha, capacidade_veiculos, km_atual, caminhao_ativo, associacao_id, associacao_inicio, motorista_id, motorista_nome, motorista_telefone, motorista_status

### view_resumo_financeiro_motorista

Current month financial summary per active driver.

**Columns:** motorista_id, empresa_id, motorista_nome, total_gastos_centavos, qtd_gastos, total_viagens_centavos, qtd_viagens, saldo_centavos

---

## 7. Functions

### fn_calcular_fechamento(empresa_id, motorista_id, periodo_inicio, periodo_fim)

Calculates settlement totals for a driver over a period.

**Returns:** total_gastos, total_viagens, saldo, qtd_gastos, qtd_viagens (all in centavos)

**Usage:**
```sql
SELECT * FROM fn_calcular_fechamento(
  'empresa-uuid',
  'motorista-uuid',
  '2026-03-01',
  '2026-03-31'
);
```

### fn_verificar_limite_caminhoes(empresa_id)

Checks if empresa can add more trucks based on plan limits.

**Returns:** max_permitido, total_atual, pode_adicionar (boolean), vagas_restantes

**Usage:**
```sql
SELECT * FROM fn_verificar_limite_caminhoes('empresa-uuid');
```

### fn_get_empresa_id()

Returns empresa_id for the current authenticated user. Used in all RLS policies.

### fn_get_user_role()

Returns role (dono/admin/motorista) for the current authenticated user.

### fn_get_motorista_id()

Returns motorista_id for the current authenticated user, if linked to a motorista record.

---

## 8. Indexes

### Strategy

Indexes are designed for the most common access patterns:

| Pattern | Index |
|---------|-------|
| Tenant filtering (every query) | `idx_{table}_empresa` on every table |
| Date range filtering | `idx_{table}_data`, `idx_{table}_empresa_data` |
| Driver lookup | `idx_{table}_motorista`, `idx_{table}_motorista_data` |
| Truck lookup | `idx_{table}_caminhao` |
| Document lookup (CNPJ, CPF, placa) | Dedicated indexes |
| Active records filtering | Partial indexes with `WHERE ativo = true` or `WHERE status = 'ativo'` |

### Total Index Count

- 12 MVP tables: ~45 indexes
- 2 V2+ tables: ~7 indexes
- Partial unique indexes: 1 (one active driver per truck)

---

## 9. Seed Data

### Default Expense Categories

| Name | Icon | Color | Order |
|------|------|-------|-------|
| Pedagio | toll | #EF4444 | 1 |
| Combustivel | fuel | #F59E0B | 2 |
| Pneu | tire | #6B7280 | 3 |
| Manutencao | wrench | #8B5CF6 | 4 |
| Lavagem | water | #3B82F6 | 5 |
| Estacionamento | parking | #10B981 | 6 |
| Alimentacao | food | #F97316 | 7 |
| Hospedagem | hotel | #6366F1 | 8 |
| Seguro | shield | #14B8A6 | 9 |
| Multa | alert | #DC2626 | 10 |
| Outros | more | #9CA3AF | 99 |

These are inserted with `empresa_id = NULL` (global). Visible to all empresas via RLS policy.

---

## 10. V2+ Tables

### rastreador

GPS tracker linked to a truck. Stores provider credentials and tracking URL.

### manutencao_programada

Predictive maintenance based on km or time intervals. Tracks scheduled maintenance items per truck.

**Trigger logic:** At least one of `km_proxima` or `data_proxima` must be set (CHECK constraint).

---

## 11. Conventions

| Convention | Rule |
|-----------|------|
| Primary Keys | UUID v4, column name `id` |
| Timestamps | TIMESTAMPTZ, columns `created_at` and `updated_at` |
| Auto-update | `fn_set_updated_at()` trigger on all tables with `updated_at` |
| Money | INTEGER in centavos, NEVER float |
| Soft delete | `ativo` BOOLEAN or `status` enum (no physical deletes) |
| Tenant column | `empresa_id` on every table (except empresa itself) |
| Foreign keys | ON DELETE RESTRICT (default), CASCADE only for child detail tables |
| Naming | snake_case, Portuguese domain terms |
| Enums | PostgreSQL CREATE TYPE, not CHECK constraints on TEXT |
| Comments | COMMENT ON for all tables and non-obvious columns |

---

## 12. Rollback Plan

To rollback this entire schema:

```sql
-- ROLLBACK: Drop in reverse dependency order
DROP TABLE IF EXISTS fechamento_item CASCADE;
DROP TABLE IF EXISTS fechamento CASCADE;
DROP TABLE IF EXISTS foto_comprovante CASCADE;
DROP TABLE IF EXISTS gasto CASCADE;
DROP TABLE IF EXISTS viagem_veiculo CASCADE;
DROP TABLE IF EXISTS viagem CASCADE;
DROP TABLE IF EXISTS categoria_gasto CASCADE;
DROP TABLE IF EXISTS motorista_caminhao CASCADE;
DROP TABLE IF EXISTS manutencao_programada CASCADE;
DROP TABLE IF EXISTS rastreador CASCADE;
DROP TABLE IF EXISTS caminhao CASCADE;
DROP TABLE IF EXISTS motorista CASCADE;
DROP TABLE IF EXISTS usuario CASCADE;
DROP TABLE IF EXISTS empresa CASCADE;

-- Drop functions
DROP FUNCTION IF EXISTS fn_calcular_fechamento CASCADE;
DROP FUNCTION IF EXISTS fn_verificar_limite_caminhoes CASCADE;
DROP FUNCTION IF EXISTS fn_get_empresa_id CASCADE;
DROP FUNCTION IF EXISTS fn_get_user_role CASCADE;
DROP FUNCTION IF EXISTS fn_get_motorista_id CASCADE;
DROP FUNCTION IF EXISTS fn_set_updated_at CASCADE;

-- Drop views
DROP VIEW IF EXISTS view_gastos_por_motorista_mes;
DROP VIEW IF EXISTS view_viagens_ativas;
DROP VIEW IF EXISTS view_caminhoes_com_motorista;
DROP VIEW IF EXISTS view_resumo_financeiro_motorista;

-- Drop enums
DROP TYPE IF EXISTS manutencao_status;
DROP TYPE IF EXISTS manutencao_tipo;
DROP TYPE IF EXISTS fechamento_item_tipo;
DROP TYPE IF EXISTS fechamento_status;
DROP TYPE IF EXISTS fechamento_tipo;
DROP TYPE IF EXISTS viagem_status;
DROP TYPE IF EXISTS tipo_cegonha;
DROP TYPE IF EXISTS cnh_categoria;
DROP TYPE IF EXISTS motorista_status;
DROP TYPE IF EXISTS usuario_role;
DROP TYPE IF EXISTS plano_tipo;

-- Drop extensions (careful -- may affect other schemas)
-- DROP EXTENSION IF EXISTS pg_trgm;
-- DROP EXTENSION IF EXISTS "uuid-ossp";
```

**IMPORTANT:** Always create a snapshot/backup before applying this schema to a production database.
