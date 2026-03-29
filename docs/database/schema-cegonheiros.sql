-- =============================================================================
-- SCHEMA: Plataforma de Gestao de Cegonheiros
-- Database: PostgreSQL (Supabase)
-- Version: 1.0.0
-- Author: Dara (AIOX Data Engineer)
-- Date: 2026-03-28
--
-- CONVENTIONS:
--   - All monetary values in centavos (INTEGER), NEVER float
--   - All timestamps as TIMESTAMPTZ
--   - UUIDs for primary keys
--   - snake_case for all identifiers
--   - Multi-tenant isolation via empresa_id + RLS
--   - Every table: id, created_at, updated_at
-- =============================================================================

-- ---------------------------------------------------------------------------
-- 0. EXTENSIONS
-- ---------------------------------------------------------------------------
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm"; -- for fuzzy text search on placa, nome, etc.

-- ---------------------------------------------------------------------------
-- 1. CUSTOM TYPES (ENUMS)
-- ---------------------------------------------------------------------------
CREATE TYPE plano_tipo AS ENUM ('free', 'essencial', 'profissional', 'enterprise');
CREATE TYPE usuario_role AS ENUM ('dono', 'motorista', 'admin');
CREATE TYPE motorista_status AS ENUM ('ativo', 'inativo');
CREATE TYPE cnh_categoria AS ENUM ('A', 'B', 'C', 'D', 'E', 'AB', 'AC', 'AD', 'AE');
CREATE TYPE tipo_cegonha AS ENUM ('aberta', 'fechada');
CREATE TYPE viagem_status AS ENUM ('planejada', 'em_andamento', 'concluida', 'cancelada');
CREATE TYPE fechamento_tipo AS ENUM ('semanal', 'mensal');
CREATE TYPE fechamento_status AS ENUM ('aberto', 'fechado', 'pago');
CREATE TYPE fechamento_item_tipo AS ENUM ('gasto', 'viagem');

-- ---------------------------------------------------------------------------
-- 2. HELPER FUNCTION: auto-update updated_at
-- ---------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION fn_set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ---------------------------------------------------------------------------
-- 3. TABLES
-- ---------------------------------------------------------------------------

-- ========================
-- 3.1 EMPRESA
-- ========================
CREATE TABLE empresa (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  cnpj       VARCHAR(18) NOT NULL UNIQUE,  -- formatted: 00.000.000/0000-00
  razao_social   TEXT NOT NULL,
  nome_fantasia  TEXT,
  endereco       TEXT,
  cidade         TEXT,
  estado         CHAR(2),
  cep            VARCHAR(9),
  telefone       VARCHAR(20),
  email          TEXT,
  plano          plano_tipo NOT NULL DEFAULT 'free',
  max_caminhoes  INTEGER NOT NULL DEFAULT 3,
  ativa          BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  CONSTRAINT ck_empresa_cnpj_format CHECK (cnpj ~ '^\d{2}\.\d{3}\.\d{3}/\d{4}-\d{2}$'),
  CONSTRAINT ck_empresa_max_caminhoes CHECK (max_caminhoes > 0),
  CONSTRAINT ck_empresa_estado CHECK (estado ~ '^[A-Z]{2}$')
);

COMMENT ON TABLE empresa IS 'Empresa cliente (tenant). Cada empresa opera isolada via RLS.';
COMMENT ON COLUMN empresa.max_caminhoes IS 'Limite de caminhoes conforme plano contratado.';
COMMENT ON COLUMN empresa.cnpj IS 'CNPJ formatado: 00.000.000/0000-00';

CREATE TRIGGER trg_empresa_updated_at
  BEFORE UPDATE ON empresa
  FOR EACH ROW EXECUTE FUNCTION fn_set_updated_at();

-- ========================
-- 3.2 USUARIO
-- ========================
CREATE TABLE usuario (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  auth_id    UUID NOT NULL UNIQUE,  -- references auth.users(id)
  empresa_id UUID NOT NULL REFERENCES empresa(id) ON DELETE RESTRICT,
  nome       TEXT NOT NULL,
  email      TEXT NOT NULL,
  telefone   VARCHAR(20),
  role       usuario_role NOT NULL DEFAULT 'motorista',
  ativo      BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE usuario IS 'Usuario da plataforma, vinculado ao Supabase Auth via auth_id.';
COMMENT ON COLUMN usuario.auth_id IS 'FK para auth.users(id) do Supabase Auth.';

CREATE TRIGGER trg_usuario_updated_at
  BEFORE UPDATE ON usuario
  FOR EACH ROW EXECUTE FUNCTION fn_set_updated_at();

-- ========================
-- 3.3 MOTORISTA
-- ========================
CREATE TABLE motorista (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  empresa_id      UUID NOT NULL REFERENCES empresa(id) ON DELETE RESTRICT,
  usuario_id      UUID REFERENCES usuario(id) ON DELETE SET NULL,  -- nullable: motorista may not have app access
  nome            TEXT NOT NULL,
  cpf             VARCHAR(14) NOT NULL,  -- formatted: 000.000.000-00
  cnh_numero      VARCHAR(20) NOT NULL,
  cnh_categoria   cnh_categoria NOT NULL DEFAULT 'E',
  cnh_validade    DATE NOT NULL,
  telefone        VARCHAR(20),
  status          motorista_status NOT NULL DEFAULT 'ativo',
  observacao      TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  CONSTRAINT ck_motorista_cpf_format CHECK (cpf ~ '^\d{3}\.\d{3}\.\d{3}-\d{2}$'),
  CONSTRAINT uq_motorista_cpf_empresa UNIQUE (empresa_id, cpf)
);

COMMENT ON TABLE motorista IS 'Motorista de cegonheiro. CPF unico por empresa.';
COMMENT ON COLUMN motorista.usuario_id IS 'Vinculo opcional com usuario da plataforma (para login via app).';

CREATE TRIGGER trg_motorista_updated_at
  BEFORE UPDATE ON motorista
  FOR EACH ROW EXECUTE FUNCTION fn_set_updated_at();

-- ========================
-- 3.4 CAMINHAO
-- ========================
CREATE TABLE caminhao (
  id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  empresa_id          UUID NOT NULL REFERENCES empresa(id) ON DELETE RESTRICT,
  placa               VARCHAR(8) NOT NULL,  -- ABC-1234 or ABC1D23 (Mercosul)
  modelo              TEXT NOT NULL,
  marca               TEXT,
  ano                 INTEGER,
  renavam             VARCHAR(20),
  tipo_cegonha        tipo_cegonha NOT NULL DEFAULT 'aberta',
  capacidade_veiculos INTEGER NOT NULL DEFAULT 11,
  km_atual            INTEGER NOT NULL DEFAULT 0,
  ativo               BOOLEAN NOT NULL DEFAULT true,
  observacao          TEXT,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  CONSTRAINT ck_caminhao_capacidade CHECK (capacidade_veiculos > 0 AND capacidade_veiculos <= 15),
  CONSTRAINT ck_caminhao_km CHECK (km_atual >= 0),
  CONSTRAINT ck_caminhao_ano CHECK (ano IS NULL OR (ano >= 1970 AND ano <= 2100)),
  CONSTRAINT uq_caminhao_placa_empresa UNIQUE (empresa_id, placa)
);

COMMENT ON TABLE caminhao IS 'Caminhao cegonheiro. Placa unica por empresa.';
COMMENT ON COLUMN caminhao.km_atual IS 'Quilometragem atual do caminhao em km.';
COMMENT ON COLUMN caminhao.capacidade_veiculos IS 'Quantidade maxima de veiculos que a cegonha transporta.';

CREATE TRIGGER trg_caminhao_updated_at
  BEFORE UPDATE ON caminhao
  FOR EACH ROW EXECUTE FUNCTION fn_set_updated_at();

-- ========================
-- 3.5 MOTORISTA_CAMINHAO (Junction N:N com historico)
-- ========================
CREATE TABLE motorista_caminhao (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  empresa_id   UUID NOT NULL REFERENCES empresa(id) ON DELETE RESTRICT,
  motorista_id UUID NOT NULL REFERENCES motorista(id) ON DELETE RESTRICT,
  caminhao_id  UUID NOT NULL REFERENCES caminhao(id) ON DELETE RESTRICT,
  data_inicio  DATE NOT NULL DEFAULT CURRENT_DATE,
  data_fim     DATE,
  ativo        BOOLEAN NOT NULL DEFAULT true,
  observacao   TEXT,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  CONSTRAINT ck_mc_data_fim CHECK (data_fim IS NULL OR data_fim >= data_inicio)
);

COMMENT ON TABLE motorista_caminhao IS 'Historico de associacao motorista-caminhao. Apenas um ativo por caminhao.';

CREATE TRIGGER trg_motorista_caminhao_updated_at
  BEFORE UPDATE ON motorista_caminhao
  FOR EACH ROW EXECUTE FUNCTION fn_set_updated_at();

-- Partial unique index: only one active assignment per truck
CREATE UNIQUE INDEX uq_caminhao_motorista_ativo
  ON motorista_caminhao (caminhao_id)
  WHERE ativo = true;

-- ========================
-- 3.6 CATEGORIA_GASTO
-- ========================
CREATE TABLE categoria_gasto (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  empresa_id UUID REFERENCES empresa(id) ON DELETE RESTRICT,  -- NULL = global/default
  nome       TEXT NOT NULL,
  icone      TEXT,        -- icon identifier (e.g., 'fuel', 'toll', 'tire')
  cor        VARCHAR(7),  -- hex color e.g. '#FF5733'
  ativa      BOOLEAN NOT NULL DEFAULT true,
  ordem      INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE categoria_gasto IS 'Categorias de gasto. empresa_id NULL = categorias padrao do sistema.';
COMMENT ON COLUMN categoria_gasto.empresa_id IS 'NULL para categorias globais (seed). Preenchido para categorias customizadas da empresa.';

CREATE TRIGGER trg_categoria_gasto_updated_at
  BEFORE UPDATE ON categoria_gasto
  FOR EACH ROW EXECUTE FUNCTION fn_set_updated_at();

-- ========================
-- 3.7 VIAGEM
-- ========================
CREATE TABLE viagem (
  id                    UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  empresa_id            UUID NOT NULL REFERENCES empresa(id) ON DELETE RESTRICT,
  motorista_id          UUID NOT NULL REFERENCES motorista(id) ON DELETE RESTRICT,
  caminhao_id           UUID NOT NULL REFERENCES caminhao(id) ON DELETE RESTRICT,
  origem                TEXT NOT NULL,
  destino               TEXT NOT NULL,
  data_saida            TIMESTAMPTZ NOT NULL,
  data_chegada_prevista TIMESTAMPTZ,
  data_chegada_real     TIMESTAMPTZ,
  valor_total           INTEGER NOT NULL DEFAULT 0,  -- centavos
  percentual_pagamento  NUMERIC(5,2) NOT NULL DEFAULT 0,  -- e.g. 25.50 means 25.5%
  status                viagem_status NOT NULL DEFAULT 'planejada',
  km_saida              INTEGER,
  km_chegada            INTEGER,
  observacao            TEXT,
  created_by            UUID REFERENCES usuario(id) ON DELETE SET NULL,
  created_at            TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at            TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  CONSTRAINT ck_viagem_valor CHECK (valor_total >= 0),
  CONSTRAINT ck_viagem_percentual CHECK (percentual_pagamento >= 0 AND percentual_pagamento <= 100),
  CONSTRAINT ck_viagem_chegada CHECK (data_chegada_real IS NULL OR data_chegada_real >= data_saida),
  CONSTRAINT ck_viagem_km CHECK (km_chegada IS NULL OR km_saida IS NULL OR km_chegada >= km_saida)
);

COMMENT ON TABLE viagem IS 'Viagem de transporte de veiculos. Valores monetarios em centavos.';
COMMENT ON COLUMN viagem.valor_total IS 'Valor total da viagem em centavos (R$ 1.500,00 = 150000).';
COMMENT ON COLUMN viagem.percentual_pagamento IS 'Percentual de pagamento ao motorista. Ex: 25.50 = 25,5%.';

CREATE TRIGGER trg_viagem_updated_at
  BEFORE UPDATE ON viagem
  FOR EACH ROW EXECUTE FUNCTION fn_set_updated_at();

-- ========================
-- 3.8 VIAGEM_VEICULO (veiculos transportados na cegonha)
-- ========================
CREATE TABLE viagem_veiculo (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  empresa_id UUID NOT NULL REFERENCES empresa(id) ON DELETE RESTRICT,
  viagem_id  UUID NOT NULL REFERENCES viagem(id) ON DELETE CASCADE,
  marca      TEXT,
  modelo     TEXT NOT NULL,
  placa      VARCHAR(8),
  chassi     VARCHAR(20),
  cor        TEXT,
  observacao TEXT,
  posicao    INTEGER,  -- position on the carrier (1-15)
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  CONSTRAINT ck_vv_posicao CHECK (posicao IS NULL OR (posicao > 0 AND posicao <= 15))
);

COMMENT ON TABLE viagem_veiculo IS 'Veiculos sendo transportados em uma viagem de cegonha.';
COMMENT ON COLUMN viagem_veiculo.posicao IS 'Posicao do veiculo na cegonha (1-15).';

CREATE TRIGGER trg_viagem_veiculo_updated_at
  BEFORE UPDATE ON viagem_veiculo
  FOR EACH ROW EXECUTE FUNCTION fn_set_updated_at();

-- ========================
-- 3.9 GASTO
-- ========================
CREATE TABLE gasto (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  empresa_id    UUID NOT NULL REFERENCES empresa(id) ON DELETE RESTRICT,
  categoria_id  UUID NOT NULL REFERENCES categoria_gasto(id) ON DELETE RESTRICT,
  motorista_id  UUID NOT NULL REFERENCES motorista(id) ON DELETE RESTRICT,
  caminhao_id   UUID REFERENCES caminhao(id) ON DELETE SET NULL,
  viagem_id     UUID REFERENCES viagem(id) ON DELETE SET NULL,
  valor         INTEGER NOT NULL,  -- centavos
  data          DATE NOT NULL DEFAULT CURRENT_DATE,
  descricao     TEXT,
  foto_url      TEXT,  -- URL do comprovante principal no Supabase Storage
  km_registro   INTEGER,  -- km no momento do gasto
  created_by    UUID REFERENCES usuario(id) ON DELETE SET NULL,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  CONSTRAINT ck_gasto_valor CHECK (valor > 0)
);

COMMENT ON TABLE gasto IS 'Registro de gasto/despesa. Valores em centavos. Vinculado a motorista e opcionalmente a viagem.';
COMMENT ON COLUMN gasto.valor IS 'Valor do gasto em centavos (R$ 150,00 = 15000).';

CREATE TRIGGER trg_gasto_updated_at
  BEFORE UPDATE ON gasto
  FOR EACH ROW EXECUTE FUNCTION fn_set_updated_at();

-- ========================
-- 3.10 FOTO_COMPROVANTE
-- ========================
CREATE TABLE foto_comprovante (
  id             UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  empresa_id     UUID NOT NULL REFERENCES empresa(id) ON DELETE RESTRICT,
  gasto_id       UUID NOT NULL REFERENCES gasto(id) ON DELETE CASCADE,
  storage_path   TEXT NOT NULL,  -- path in Supabase Storage bucket
  thumbnail_path TEXT,
  content_type   VARCHAR(50),   -- e.g. 'image/jpeg'
  size_bytes     INTEGER,
  uploaded_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  CONSTRAINT ck_foto_size CHECK (size_bytes IS NULL OR size_bytes > 0)
);

COMMENT ON TABLE foto_comprovante IS 'Fotos de comprovantes de gastos armazenadas no Supabase Storage.';

-- ========================
-- 3.11 FECHAMENTO
-- ========================
CREATE TABLE fechamento (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  empresa_id      UUID NOT NULL REFERENCES empresa(id) ON DELETE RESTRICT,
  motorista_id    UUID NOT NULL REFERENCES motorista(id) ON DELETE RESTRICT,
  periodo_inicio  DATE NOT NULL,
  periodo_fim     DATE NOT NULL,
  tipo            fechamento_tipo NOT NULL DEFAULT 'mensal',
  total_gastos    INTEGER NOT NULL DEFAULT 0,    -- centavos
  total_viagens   INTEGER NOT NULL DEFAULT 0,    -- centavos
  saldo           INTEGER NOT NULL DEFAULT 0,    -- centavos (viagens - gastos)
  status          fechamento_status NOT NULL DEFAULT 'aberto',
  observacao      TEXT,
  fechado_por     UUID REFERENCES usuario(id) ON DELETE SET NULL,
  fechado_em      TIMESTAMPTZ,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  CONSTRAINT ck_fechamento_periodo CHECK (periodo_fim >= periodo_inicio),
  CONSTRAINT ck_fechamento_totais CHECK (total_gastos >= 0 AND total_viagens >= 0),
  CONSTRAINT uq_fechamento_motorista_periodo UNIQUE (empresa_id, motorista_id, periodo_inicio, periodo_fim)
);

COMMENT ON TABLE fechamento IS 'Fechamento financeiro por motorista e periodo. Valores em centavos.';
COMMENT ON COLUMN fechamento.saldo IS 'Saldo = total_viagens - total_gastos. Pode ser negativo (centavos).';

CREATE TRIGGER trg_fechamento_updated_at
  BEFORE UPDATE ON fechamento
  FOR EACH ROW EXECUTE FUNCTION fn_set_updated_at();

-- ========================
-- 3.12 FECHAMENTO_ITEM
-- ========================
CREATE TABLE fechamento_item (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  empresa_id    UUID NOT NULL REFERENCES empresa(id) ON DELETE RESTRICT,
  fechamento_id UUID NOT NULL REFERENCES fechamento(id) ON DELETE CASCADE,
  tipo          fechamento_item_tipo NOT NULL,
  referencia_id UUID NOT NULL,  -- gasto.id or viagem.id
  valor         INTEGER NOT NULL,  -- centavos
  descricao     TEXT,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  CONSTRAINT ck_fi_valor CHECK (valor != 0)
);

COMMENT ON TABLE fechamento_item IS 'Itens detalhados de um fechamento. referencia_id aponta para gasto ou viagem.';

-- ---------------------------------------------------------------------------
-- 4. INDEXES
-- ---------------------------------------------------------------------------

-- == empresa ==
CREATE INDEX idx_empresa_cnpj ON empresa (cnpj);
CREATE INDEX idx_empresa_plano ON empresa (plano) WHERE ativa = true;

-- == usuario ==
CREATE INDEX idx_usuario_empresa ON usuario (empresa_id);
CREATE INDEX idx_usuario_auth ON usuario (auth_id);
CREATE INDEX idx_usuario_email ON usuario (email);
CREATE INDEX idx_usuario_role ON usuario (empresa_id, role);

-- == motorista ==
CREATE INDEX idx_motorista_empresa ON motorista (empresa_id);
CREATE INDEX idx_motorista_cpf ON motorista (cpf);
CREATE INDEX idx_motorista_status ON motorista (empresa_id, status);
CREATE INDEX idx_motorista_cnh_validade ON motorista (cnh_validade) WHERE status = 'ativo';
CREATE INDEX idx_motorista_usuario ON motorista (usuario_id) WHERE usuario_id IS NOT NULL;

-- == caminhao ==
CREATE INDEX idx_caminhao_empresa ON caminhao (empresa_id);
CREATE INDEX idx_caminhao_placa ON caminhao (placa);
CREATE INDEX idx_caminhao_tipo ON caminhao (empresa_id, tipo_cegonha);

-- == motorista_caminhao ==
CREATE INDEX idx_mc_empresa ON motorista_caminhao (empresa_id);
CREATE INDEX idx_mc_motorista ON motorista_caminhao (motorista_id);
CREATE INDEX idx_mc_caminhao ON motorista_caminhao (caminhao_id);
CREATE INDEX idx_mc_ativo ON motorista_caminhao (empresa_id, ativo) WHERE ativo = true;

-- == categoria_gasto ==
CREATE INDEX idx_catgasto_empresa ON categoria_gasto (empresa_id);

-- == viagem ==
CREATE INDEX idx_viagem_empresa ON viagem (empresa_id);
CREATE INDEX idx_viagem_motorista ON viagem (motorista_id);
CREATE INDEX idx_viagem_caminhao ON viagem (caminhao_id);
CREATE INDEX idx_viagem_status ON viagem (empresa_id, status);
CREATE INDEX idx_viagem_data_saida ON viagem (data_saida DESC);
CREATE INDEX idx_viagem_empresa_data ON viagem (empresa_id, data_saida DESC);
CREATE INDEX idx_viagem_motorista_data ON viagem (motorista_id, data_saida DESC);

-- == viagem_veiculo ==
CREATE INDEX idx_vv_empresa ON viagem_veiculo (empresa_id);
CREATE INDEX idx_vv_viagem ON viagem_veiculo (viagem_id);
CREATE INDEX idx_vv_placa ON viagem_veiculo (placa) WHERE placa IS NOT NULL;

-- == gasto ==
CREATE INDEX idx_gasto_empresa ON gasto (empresa_id);
CREATE INDEX idx_gasto_motorista ON gasto (motorista_id);
CREATE INDEX idx_gasto_caminhao ON gasto (caminhao_id) WHERE caminhao_id IS NOT NULL;
CREATE INDEX idx_gasto_viagem ON gasto (viagem_id) WHERE viagem_id IS NOT NULL;
CREATE INDEX idx_gasto_categoria ON gasto (categoria_id);
CREATE INDEX idx_gasto_data ON gasto (data DESC);
CREATE INDEX idx_gasto_empresa_data ON gasto (empresa_id, data DESC);
CREATE INDEX idx_gasto_motorista_data ON gasto (motorista_id, data DESC);

-- == foto_comprovante ==
CREATE INDEX idx_foto_empresa ON foto_comprovante (empresa_id);
CREATE INDEX idx_foto_gasto ON foto_comprovante (gasto_id);

-- == fechamento ==
CREATE INDEX idx_fechamento_empresa ON fechamento (empresa_id);
CREATE INDEX idx_fechamento_motorista ON fechamento (motorista_id);
CREATE INDEX idx_fechamento_status ON fechamento (empresa_id, status);
CREATE INDEX idx_fechamento_periodo ON fechamento (empresa_id, periodo_inicio, periodo_fim);

-- == fechamento_item ==
CREATE INDEX idx_fi_empresa ON fechamento_item (empresa_id);
CREATE INDEX idx_fi_fechamento ON fechamento_item (fechamento_id);
CREATE INDEX idx_fi_referencia ON fechamento_item (tipo, referencia_id);

-- ---------------------------------------------------------------------------
-- 5. VIEWS
-- ---------------------------------------------------------------------------

-- View: Gastos por motorista/mes (para fechamento)
CREATE OR REPLACE VIEW view_gastos_por_motorista_mes AS
SELECT
  g.empresa_id,
  g.motorista_id,
  m.nome AS motorista_nome,
  DATE_TRUNC('month', g.data) AS mes,
  cg.nome AS categoria,
  COUNT(*) AS qtd_gastos,
  SUM(g.valor) AS total_centavos
FROM gasto g
  JOIN motorista m ON m.id = g.motorista_id
  JOIN categoria_gasto cg ON cg.id = g.categoria_id
GROUP BY g.empresa_id, g.motorista_id, m.nome, DATE_TRUNC('month', g.data), cg.nome;

COMMENT ON VIEW view_gastos_por_motorista_mes IS 'Agregacao de gastos por motorista, mes e categoria. Valores em centavos.';

-- View: Viagens ativas (em andamento)
CREATE OR REPLACE VIEW view_viagens_ativas AS
SELECT
  v.id,
  v.empresa_id,
  v.origem,
  v.destino,
  v.data_saida,
  v.data_chegada_prevista,
  v.valor_total,
  v.percentual_pagamento,
  v.status,
  m.id AS motorista_id,
  m.nome AS motorista_nome,
  m.telefone AS motorista_telefone,
  c.id AS caminhao_id,
  c.placa AS caminhao_placa,
  c.modelo AS caminhao_modelo,
  (SELECT COUNT(*) FROM viagem_veiculo vv WHERE vv.viagem_id = v.id) AS qtd_veiculos
FROM viagem v
  JOIN motorista m ON m.id = v.motorista_id
  JOIN caminhao c ON c.id = v.caminhao_id
WHERE v.status = 'em_andamento';

COMMENT ON VIEW view_viagens_ativas IS 'Viagens atualmente em andamento com dados de motorista e caminhao.';

-- View: Caminhoes com motorista atual
CREATE OR REPLACE VIEW view_caminhoes_com_motorista AS
SELECT
  c.id AS caminhao_id,
  c.empresa_id,
  c.placa,
  c.modelo,
  c.marca,
  c.ano,
  c.tipo_cegonha,
  c.capacidade_veiculos,
  c.km_atual,
  c.ativo AS caminhao_ativo,
  mc.id AS associacao_id,
  mc.data_inicio AS associacao_inicio,
  m.id AS motorista_id,
  m.nome AS motorista_nome,
  m.telefone AS motorista_telefone,
  m.status AS motorista_status
FROM caminhao c
  LEFT JOIN motorista_caminhao mc ON mc.caminhao_id = c.id AND mc.ativo = true
  LEFT JOIN motorista m ON m.id = mc.motorista_id;

COMMENT ON VIEW view_caminhoes_com_motorista IS 'Caminhoes com seu motorista atualmente atribuido (se houver).';

-- View: Resumo financeiro por motorista (para dashboard)
CREATE OR REPLACE VIEW view_resumo_financeiro_motorista AS
SELECT
  m.id AS motorista_id,
  m.empresa_id,
  m.nome AS motorista_nome,
  COALESCE(g_agg.total_gastos, 0) AS total_gastos_centavos,
  COALESCE(g_agg.qtd_gastos, 0) AS qtd_gastos,
  COALESCE(v_agg.total_viagens, 0) AS total_viagens_centavos,
  COALESCE(v_agg.qtd_viagens, 0) AS qtd_viagens,
  COALESCE(v_agg.total_viagens, 0) - COALESCE(g_agg.total_gastos, 0) AS saldo_centavos
FROM motorista m
LEFT JOIN (
  SELECT motorista_id, SUM(valor) AS total_gastos, COUNT(*) AS qtd_gastos
  FROM gasto
  WHERE data >= DATE_TRUNC('month', CURRENT_DATE)
  GROUP BY motorista_id
) g_agg ON g_agg.motorista_id = m.id
LEFT JOIN (
  SELECT motorista_id,
    SUM(valor_total * percentual_pagamento / 100) AS total_viagens,
    COUNT(*) AS qtd_viagens
  FROM viagem
  WHERE data_saida >= DATE_TRUNC('month', CURRENT_DATE)
    AND status IN ('concluida', 'em_andamento')
  GROUP BY motorista_id
) v_agg ON v_agg.motorista_id = m.id
WHERE m.status = 'ativo';

COMMENT ON VIEW view_resumo_financeiro_motorista IS 'Resumo financeiro do mes corrente por motorista ativo. Valores em centavos.';

-- ---------------------------------------------------------------------------
-- 6. FUNCTIONS
-- ---------------------------------------------------------------------------

-- Function: Calcular fechamento para um motorista e periodo
CREATE OR REPLACE FUNCTION fn_calcular_fechamento(
  p_empresa_id    UUID,
  p_motorista_id  UUID,
  p_periodo_inicio DATE,
  p_periodo_fim   DATE
)
RETURNS TABLE (
  total_gastos    INTEGER,
  total_viagens   INTEGER,
  saldo           INTEGER,
  qtd_gastos      BIGINT,
  qtd_viagens     BIGINT
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  SELECT
    COALESCE((
      SELECT SUM(g.valor)::INTEGER
      FROM gasto g
      WHERE g.empresa_id = p_empresa_id
        AND g.motorista_id = p_motorista_id
        AND g.data BETWEEN p_periodo_inicio AND p_periodo_fim
    ), 0) AS total_gastos,
    COALESCE((
      SELECT SUM((v.valor_total * v.percentual_pagamento / 100)::INTEGER)::INTEGER
      FROM viagem v
      WHERE v.empresa_id = p_empresa_id
        AND v.motorista_id = p_motorista_id
        AND v.data_saida::DATE BETWEEN p_periodo_inicio AND p_periodo_fim
        AND v.status IN ('concluida', 'em_andamento')
    ), 0) AS total_viagens,
    COALESCE((
      SELECT SUM((v2.valor_total * v2.percentual_pagamento / 100)::INTEGER)::INTEGER
      FROM viagem v2
      WHERE v2.empresa_id = p_empresa_id
        AND v2.motorista_id = p_motorista_id
        AND v2.data_saida::DATE BETWEEN p_periodo_inicio AND p_periodo_fim
        AND v2.status IN ('concluida', 'em_andamento')
    ), 0) - COALESCE((
      SELECT SUM(g2.valor)::INTEGER
      FROM gasto g2
      WHERE g2.empresa_id = p_empresa_id
        AND g2.motorista_id = p_motorista_id
        AND g2.data BETWEEN p_periodo_inicio AND p_periodo_fim
    ), 0) AS saldo,
    (
      SELECT COUNT(*)
      FROM gasto g3
      WHERE g3.empresa_id = p_empresa_id
        AND g3.motorista_id = p_motorista_id
        AND g3.data BETWEEN p_periodo_inicio AND p_periodo_fim
    ) AS qtd_gastos,
    (
      SELECT COUNT(*)
      FROM viagem v3
      WHERE v3.empresa_id = p_empresa_id
        AND v3.motorista_id = p_motorista_id
        AND v3.data_saida::DATE BETWEEN p_periodo_inicio AND p_periodo_fim
        AND v3.status IN ('concluida', 'em_andamento')
    ) AS qtd_viagens;
END;
$$;

COMMENT ON FUNCTION fn_calcular_fechamento IS 'Calcula totais de gastos, viagens e saldo para um motorista em um periodo. Valores em centavos.';

-- Function: Verificar limite de caminhoes conforme plano
CREATE OR REPLACE FUNCTION fn_verificar_limite_caminhoes(p_empresa_id UUID)
RETURNS TABLE (
  max_permitido  INTEGER,
  total_atual    BIGINT,
  pode_adicionar BOOLEAN,
  vagas_restantes BIGINT
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_max INTEGER;
  v_atual BIGINT;
BEGIN
  SELECT e.max_caminhoes INTO v_max
  FROM empresa e
  WHERE e.id = p_empresa_id;

  IF v_max IS NULL THEN
    RAISE EXCEPTION 'Empresa nao encontrada: %', p_empresa_id;
  END IF;

  SELECT COUNT(*) INTO v_atual
  FROM caminhao c
  WHERE c.empresa_id = p_empresa_id
    AND c.ativo = true;

  RETURN QUERY
  SELECT
    v_max,
    v_atual,
    (v_atual < v_max),
    (v_max - v_atual);
END;
$$;

COMMENT ON FUNCTION fn_verificar_limite_caminhoes IS 'Verifica se a empresa pode adicionar mais caminhoes conforme seu plano.';

-- Function: Helper to get empresa_id for current authenticated user
CREATE OR REPLACE FUNCTION fn_get_empresa_id()
RETURNS UUID
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT empresa_id FROM usuario WHERE auth_id = auth.uid() LIMIT 1;
$$;

COMMENT ON FUNCTION fn_get_empresa_id IS 'Retorna empresa_id do usuario autenticado via Supabase Auth.';

-- Function: Helper to get user role
CREATE OR REPLACE FUNCTION fn_get_user_role()
RETURNS usuario_role
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT role FROM usuario WHERE auth_id = auth.uid() LIMIT 1;
$$;

COMMENT ON FUNCTION fn_get_user_role IS 'Retorna role do usuario autenticado (dono/admin/motorista).';

-- Function: Helper to get motorista_id for current user (if motorista)
CREATE OR REPLACE FUNCTION fn_get_motorista_id()
RETURNS UUID
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT m.id FROM motorista m
  JOIN usuario u ON u.id = m.usuario_id
  WHERE u.auth_id = auth.uid()
  LIMIT 1;
$$;

COMMENT ON FUNCTION fn_get_motorista_id IS 'Retorna motorista_id do usuario autenticado (se vinculado a motorista).';

-- ---------------------------------------------------------------------------
-- 7. ROW LEVEL SECURITY (RLS)
-- ---------------------------------------------------------------------------

-- Enable RLS on ALL tables
ALTER TABLE empresa ENABLE ROW LEVEL SECURITY;
ALTER TABLE usuario ENABLE ROW LEVEL SECURITY;
ALTER TABLE motorista ENABLE ROW LEVEL SECURITY;
ALTER TABLE caminhao ENABLE ROW LEVEL SECURITY;
ALTER TABLE motorista_caminhao ENABLE ROW LEVEL SECURITY;
ALTER TABLE categoria_gasto ENABLE ROW LEVEL SECURITY;
ALTER TABLE viagem ENABLE ROW LEVEL SECURITY;
ALTER TABLE viagem_veiculo ENABLE ROW LEVEL SECURITY;
ALTER TABLE gasto ENABLE ROW LEVEL SECURITY;
ALTER TABLE foto_comprovante ENABLE ROW LEVEL SECURITY;
ALTER TABLE fechamento ENABLE ROW LEVEL SECURITY;
ALTER TABLE fechamento_item ENABLE ROW LEVEL SECURITY;

-- ========================
-- 7.1 EMPRESA policies
-- ========================
-- Users can only see their own empresa
CREATE POLICY empresa_select ON empresa
  FOR SELECT USING (id = fn_get_empresa_id());

-- Only dono can update empresa
CREATE POLICY empresa_update ON empresa
  FOR UPDATE USING (
    id = fn_get_empresa_id()
    AND fn_get_user_role() = 'dono'
  );

-- ========================
-- 7.2 USUARIO policies
-- ========================
-- Users see all users in their empresa
CREATE POLICY usuario_select ON usuario
  FOR SELECT USING (empresa_id = fn_get_empresa_id());

-- Dono/admin can insert users
CREATE POLICY usuario_insert ON usuario
  FOR INSERT WITH CHECK (
    empresa_id = fn_get_empresa_id()
    AND fn_get_user_role() IN ('dono', 'admin')
  );

-- Dono/admin can update users; motorista can update own profile
CREATE POLICY usuario_update ON usuario
  FOR UPDATE USING (
    empresa_id = fn_get_empresa_id()
    AND (
      fn_get_user_role() IN ('dono', 'admin')
      OR auth_id = auth.uid()
    )
  );

-- ========================
-- 7.3 MOTORISTA policies
-- ========================
-- Dono/admin see all motoristas; motorista sees own
CREATE POLICY motorista_select ON motorista
  FOR SELECT USING (
    empresa_id = fn_get_empresa_id()
    AND (
      fn_get_user_role() IN ('dono', 'admin')
      OR id = fn_get_motorista_id()
    )
  );

-- Dono/admin can insert/update motoristas
CREATE POLICY motorista_insert ON motorista
  FOR INSERT WITH CHECK (
    empresa_id = fn_get_empresa_id()
    AND fn_get_user_role() IN ('dono', 'admin')
  );

CREATE POLICY motorista_update ON motorista
  FOR UPDATE USING (
    empresa_id = fn_get_empresa_id()
    AND fn_get_user_role() IN ('dono', 'admin')
  );

-- ========================
-- 7.4 CAMINHAO policies
-- ========================
-- All users of empresa can see caminhoes
CREATE POLICY caminhao_select ON caminhao
  FOR SELECT USING (empresa_id = fn_get_empresa_id());

-- Dono/admin manage caminhoes
CREATE POLICY caminhao_insert ON caminhao
  FOR INSERT WITH CHECK (
    empresa_id = fn_get_empresa_id()
    AND fn_get_user_role() IN ('dono', 'admin')
  );

CREATE POLICY caminhao_update ON caminhao
  FOR UPDATE USING (
    empresa_id = fn_get_empresa_id()
    AND fn_get_user_role() IN ('dono', 'admin')
  );

-- ========================
-- 7.5 MOTORISTA_CAMINHAO policies
-- ========================
CREATE POLICY mc_select ON motorista_caminhao
  FOR SELECT USING (empresa_id = fn_get_empresa_id());

CREATE POLICY mc_insert ON motorista_caminhao
  FOR INSERT WITH CHECK (
    empresa_id = fn_get_empresa_id()
    AND fn_get_user_role() IN ('dono', 'admin')
  );

CREATE POLICY mc_update ON motorista_caminhao
  FOR UPDATE USING (
    empresa_id = fn_get_empresa_id()
    AND fn_get_user_role() IN ('dono', 'admin')
  );

-- ========================
-- 7.6 CATEGORIA_GASTO policies
-- ========================
-- See global (empresa_id IS NULL) + own empresa categories
CREATE POLICY catgasto_select ON categoria_gasto
  FOR SELECT USING (
    empresa_id IS NULL
    OR empresa_id = fn_get_empresa_id()
  );

-- Dono/admin manage custom categories
CREATE POLICY catgasto_insert ON categoria_gasto
  FOR INSERT WITH CHECK (
    empresa_id = fn_get_empresa_id()
    AND fn_get_user_role() IN ('dono', 'admin')
  );

CREATE POLICY catgasto_update ON categoria_gasto
  FOR UPDATE USING (
    empresa_id = fn_get_empresa_id()
    AND fn_get_user_role() IN ('dono', 'admin')
  );

-- ========================
-- 7.7 VIAGEM policies
-- ========================
-- Dono/admin see all; motorista sees own viagens
CREATE POLICY viagem_select ON viagem
  FOR SELECT USING (
    empresa_id = fn_get_empresa_id()
    AND (
      fn_get_user_role() IN ('dono', 'admin')
      OR motorista_id = fn_get_motorista_id()
    )
  );

-- Dono/admin can create viagens
CREATE POLICY viagem_insert ON viagem
  FOR INSERT WITH CHECK (
    empresa_id = fn_get_empresa_id()
    AND fn_get_user_role() IN ('dono', 'admin')
  );

-- Dono/admin can update; motorista can update status of own viagens
CREATE POLICY viagem_update ON viagem
  FOR UPDATE USING (
    empresa_id = fn_get_empresa_id()
    AND (
      fn_get_user_role() IN ('dono', 'admin')
      OR motorista_id = fn_get_motorista_id()
    )
  );

-- ========================
-- 7.8 VIAGEM_VEICULO policies
-- ========================
CREATE POLICY vv_select ON viagem_veiculo
  FOR SELECT USING (empresa_id = fn_get_empresa_id());

CREATE POLICY vv_insert ON viagem_veiculo
  FOR INSERT WITH CHECK (
    empresa_id = fn_get_empresa_id()
    AND fn_get_user_role() IN ('dono', 'admin')
  );

CREATE POLICY vv_update ON viagem_veiculo
  FOR UPDATE USING (
    empresa_id = fn_get_empresa_id()
    AND fn_get_user_role() IN ('dono', 'admin')
  );

CREATE POLICY vv_delete ON viagem_veiculo
  FOR DELETE USING (
    empresa_id = fn_get_empresa_id()
    AND fn_get_user_role() IN ('dono', 'admin')
  );

-- ========================
-- 7.9 GASTO policies
-- ========================
-- Dono/admin see all; motorista sees own gastos
CREATE POLICY gasto_select ON gasto
  FOR SELECT USING (
    empresa_id = fn_get_empresa_id()
    AND (
      fn_get_user_role() IN ('dono', 'admin')
      OR motorista_id = fn_get_motorista_id()
    )
  );

-- Both motorista and dono/admin can create gastos (motorista registers on the road)
CREATE POLICY gasto_insert ON gasto
  FOR INSERT WITH CHECK (
    empresa_id = fn_get_empresa_id()
    AND (
      fn_get_user_role() IN ('dono', 'admin')
      OR motorista_id = fn_get_motorista_id()
    )
  );

-- Motorista can update own gastos; dono/admin can update any
CREATE POLICY gasto_update ON gasto
  FOR UPDATE USING (
    empresa_id = fn_get_empresa_id()
    AND (
      fn_get_user_role() IN ('dono', 'admin')
      OR motorista_id = fn_get_motorista_id()
    )
  );

-- ========================
-- 7.10 FOTO_COMPROVANTE policies
-- ========================
CREATE POLICY foto_select ON foto_comprovante
  FOR SELECT USING (empresa_id = fn_get_empresa_id());

CREATE POLICY foto_insert ON foto_comprovante
  FOR INSERT WITH CHECK (empresa_id = fn_get_empresa_id());

-- ========================
-- 7.11 FECHAMENTO policies
-- ========================
-- Dono/admin see all; motorista sees own
CREATE POLICY fechamento_select ON fechamento
  FOR SELECT USING (
    empresa_id = fn_get_empresa_id()
    AND (
      fn_get_user_role() IN ('dono', 'admin')
      OR motorista_id = fn_get_motorista_id()
    )
  );

-- Only dono/admin can create/update fechamentos
CREATE POLICY fechamento_insert ON fechamento
  FOR INSERT WITH CHECK (
    empresa_id = fn_get_empresa_id()
    AND fn_get_user_role() IN ('dono', 'admin')
  );

CREATE POLICY fechamento_update ON fechamento
  FOR UPDATE USING (
    empresa_id = fn_get_empresa_id()
    AND fn_get_user_role() IN ('dono', 'admin')
  );

-- ========================
-- 7.12 FECHAMENTO_ITEM policies
-- ========================
CREATE POLICY fi_select ON fechamento_item
  FOR SELECT USING (empresa_id = fn_get_empresa_id());

CREATE POLICY fi_insert ON fechamento_item
  FOR INSERT WITH CHECK (
    empresa_id = fn_get_empresa_id()
    AND fn_get_user_role() IN ('dono', 'admin')
  );

-- ---------------------------------------------------------------------------
-- 8. SEED DATA
-- ---------------------------------------------------------------------------

-- Default expense categories (global, empresa_id = NULL)
INSERT INTO categoria_gasto (id, empresa_id, nome, icone, cor, ordem) VALUES
  (uuid_generate_v4(), NULL, 'Pedagio',       'toll',         '#EF4444', 1),
  (uuid_generate_v4(), NULL, 'Combustivel',    'fuel',         '#F59E0B', 2),
  (uuid_generate_v4(), NULL, 'Pneu',           'tire',         '#6B7280', 3),
  (uuid_generate_v4(), NULL, 'Manutencao',     'wrench',       '#8B5CF6', 4),
  (uuid_generate_v4(), NULL, 'Lavagem',        'water',        '#3B82F6', 5),
  (uuid_generate_v4(), NULL, 'Estacionamento', 'parking',      '#10B981', 6),
  (uuid_generate_v4(), NULL, 'Alimentacao',    'food',         '#F97316', 7),
  (uuid_generate_v4(), NULL, 'Hospedagem',     'hotel',        '#6366F1', 8),
  (uuid_generate_v4(), NULL, 'Seguro',         'shield',       '#14B8A6', 9),
  (uuid_generate_v4(), NULL, 'Multa',          'alert',        '#DC2626', 10),
  (uuid_generate_v4(), NULL, 'Outros',         'more',         '#9CA3AF', 99)
ON CONFLICT DO NOTHING;

-- ---------------------------------------------------------------------------
-- 9. V2+ TABLES (Rastreamento e Manutencao Preditiva) - Scaffolded
-- ---------------------------------------------------------------------------

-- ========================
-- 9.1 RASTREADOR
-- ========================
CREATE TABLE rastreador (
  id               UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  empresa_id       UUID NOT NULL REFERENCES empresa(id) ON DELETE RESTRICT,
  caminhao_id      UUID NOT NULL REFERENCES caminhao(id) ON DELETE RESTRICT,
  provedor         TEXT NOT NULL,
  url_rastreamento TEXT,
  login            TEXT,
  observacao       TEXT,
  ativo            BOOLEAN NOT NULL DEFAULT true,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE rastreador IS '[V2+] Dados de rastreador GPS vinculado ao caminhao.';

ALTER TABLE rastreador ENABLE ROW LEVEL SECURITY;

CREATE POLICY rastreador_select ON rastreador
  FOR SELECT USING (empresa_id = fn_get_empresa_id());

CREATE POLICY rastreador_insert ON rastreador
  FOR INSERT WITH CHECK (
    empresa_id = fn_get_empresa_id()
    AND fn_get_user_role() IN ('dono', 'admin')
  );

CREATE POLICY rastreador_update ON rastreador
  FOR UPDATE USING (
    empresa_id = fn_get_empresa_id()
    AND fn_get_user_role() IN ('dono', 'admin')
  );

CREATE INDEX idx_rastreador_empresa ON rastreador (empresa_id);
CREATE INDEX idx_rastreador_caminhao ON rastreador (caminhao_id);

CREATE TRIGGER trg_rastreador_updated_at
  BEFORE UPDATE ON rastreador
  FOR EACH ROW EXECUTE FUNCTION fn_set_updated_at();

-- ========================
-- 9.2 MANUTENCAO_PROGRAMADA
-- ========================
CREATE TYPE manutencao_tipo AS ENUM ('troca_oleo', 'pneu', 'revisao', 'freio', 'correia', 'filtro', 'bateria', 'outro');
CREATE TYPE manutencao_status AS ENUM ('pendente', 'realizada', 'atrasada');

CREATE TABLE manutencao_programada (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  empresa_id    UUID NOT NULL REFERENCES empresa(id) ON DELETE RESTRICT,
  caminhao_id   UUID NOT NULL REFERENCES caminhao(id) ON DELETE RESTRICT,
  tipo          manutencao_tipo NOT NULL,
  descricao     TEXT,
  km_proxima    INTEGER,
  data_proxima  DATE,
  km_intervalo  INTEGER,
  dias_intervalo INTEGER,
  status        manutencao_status NOT NULL DEFAULT 'pendente',
  observacao    TEXT,
  realizada_em  TIMESTAMPTZ,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  CONSTRAINT ck_manut_km CHECK (km_proxima IS NULL OR km_proxima > 0),
  CONSTRAINT ck_manut_intervalo_km CHECK (km_intervalo IS NULL OR km_intervalo > 0),
  CONSTRAINT ck_manut_intervalo_dias CHECK (dias_intervalo IS NULL OR dias_intervalo > 0),
  CONSTRAINT ck_manut_trigger CHECK (km_proxima IS NOT NULL OR data_proxima IS NOT NULL)
);

COMMENT ON TABLE manutencao_programada IS '[V2+] Manutencao preditiva baseada em km ou tempo.';

ALTER TABLE manutencao_programada ENABLE ROW LEVEL SECURITY;

CREATE POLICY manut_select ON manutencao_programada
  FOR SELECT USING (empresa_id = fn_get_empresa_id());

CREATE POLICY manut_insert ON manutencao_programada
  FOR INSERT WITH CHECK (
    empresa_id = fn_get_empresa_id()
    AND fn_get_user_role() IN ('dono', 'admin')
  );

CREATE POLICY manut_update ON manutencao_programada
  FOR UPDATE USING (
    empresa_id = fn_get_empresa_id()
    AND fn_get_user_role() IN ('dono', 'admin')
  );

CREATE INDEX idx_manut_empresa ON manutencao_programada (empresa_id);
CREATE INDEX idx_manut_caminhao ON manutencao_programada (caminhao_id);
CREATE INDEX idx_manut_status ON manutencao_programada (empresa_id, status);
CREATE INDEX idx_manut_data ON manutencao_programada (data_proxima) WHERE status = 'pendente';
CREATE INDEX idx_manut_km ON manutencao_programada (km_proxima) WHERE status = 'pendente';

CREATE TRIGGER trg_manutencao_updated_at
  BEFORE UPDATE ON manutencao_programada
  FOR EACH ROW EXECUTE FUNCTION fn_set_updated_at();

-- ---------------------------------------------------------------------------
-- 10. STORAGE BUCKET SETUP (via Supabase dashboard or CLI)
-- ---------------------------------------------------------------------------
-- NOTE: Run via Supabase CLI or dashboard:
--   supabase storage create comprovantes --public=false --file-size-limit=10MB --allowed-mime-types='image/jpeg,image/png,image/webp,application/pdf'
--
-- Storage RLS policies should be configured to:
--   - INSERT: authenticated users can upload to their empresa folder
--   - SELECT: users can only read files from their empresa folder
--   - DELETE: dono/admin only
--   - Path pattern: {empresa_id}/{gasto_id}/{filename}

-- ---------------------------------------------------------------------------
-- END OF SCHEMA
-- ---------------------------------------------------------------------------
