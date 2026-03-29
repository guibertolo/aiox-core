# Plataforma de Gestao para Cegonheiros - Product Requirements Document (PRD)

## Goals and Background Context

### Goals

- Digitalizar e centralizar toda a operacao de empresas de transporte de veiculos (cegonheiros) em uma unica plataforma web
- Eliminar controles manuais em planilhas e cadernos, reduzindo erros e retrabalho
- Fornecer visibilidade financeira em tempo real para donos de frota sobre custos, receitas e margens
- Automatizar fechamentos financeiros semanais/mensais por motorista, reduzindo tempo administrativo em ate 80%
- Habilitar manutencao preditiva baseada em dados reais do caminhao, reduzindo quebras inesperadas
- Oferecer precificacao inteligente baseada em media de gastos reais de combustivel por rota

### Background Context

O mercado de transporte de veiculos por caminhoes cegonha no Brasil opera predominantemente com controles manuais — planilhas Excel, cadernos fisicos e comunicacao via WhatsApp. Donos de frota com 2 a 50 caminhoes enfrentam dificuldade para rastrear gastos por viagem, controlar pagamentos de motoristas e prever custos de manutencao. O fechamento financeiro semanal de um motorista pode levar horas de trabalho manual, e erros de lancamento sao frequentes.

Nao existe uma solucao vertical dominante para este nicho no mercado brasileiro. As solucoes genericas de gestao de frota (como Prolog ou Trimble) sao voltadas para transportadoras de carga geral e tem custo elevado. Ha uma oportunidade clara para uma plataforma SaaS acessivel, focada especificamente nas necessidades dos cegonheiros — desde o cadastro de vinculos motorista-CNPJ-caminhao ate o fechamento financeiro automatizado.

### Change Log

| Date | Version | Description | Author |
|------|---------|-------------|--------|
| 2026-03-28 | 1.0 | Criacao inicial do PRD | Morgan (PM) |

---

## Requirements

### Functional

- **FR-001**: O sistema deve permitir cadastro de empresas com CNPJ, razao social, endereco, telefone e email
- **FR-002**: O sistema deve permitir cadastro de motoristas com CPF, CNH (categoria e validade), telefone e dados pessoais
- **FR-003**: O sistema deve permitir cadastro de caminhoes cegonha com placa, RENAVAM, ano, modelo, capacidade (vagas), quilometragem atual e data da ultima revisao
- **FR-004**: O sistema deve permitir vinculos N:N entre motoristas, CNPJs e caminhoes, com historico de vinculos (data inicio/fim)
- **FR-005**: O sistema deve permitir lancamento de gastos por categoria (pedagio, pneu, manutencao, combustivel, lavagem, seguro, multas, outros) com valor, data, descricao e upload de foto/comprovante
- **FR-006**: O sistema deve associar cada gasto a um motorista, caminhao e opcionalmente a uma viagem
- **FR-007**: O sistema deve permitir cadastro de links/URLs de rastreamento para cada caminhao, com nome do provedor e link direto
- **FR-008**: O sistema deve calcular a media de consumo de combustivel (km/l) por caminhao baseado nos lancamentos historicos
- **FR-009**: O sistema deve estimar o custo de uma viagem com base na distancia, media de consumo do caminhao, preco medio do diesel e pedagios conhecidos
- **FR-010**: O sistema deve permitir cadastro de viagens com origem, destino, distancia estimada, valor cobrado, data de saida e chegada prevista
- **FR-011**: O sistema deve permitir definir percentuais de pagamento por viagem (ex: 60% motorista, 40% empresa) e calcular automaticamente os valores
- **FR-012**: O sistema deve gerar fechamento financeiro por motorista para periodos semanais ou mensais, consolidando viagens, gastos e percentuais
- **FR-013**: O sistema deve permitir impressao/exportacao do fechamento financeiro em formato PDF
- **FR-014**: O sistema deve apresentar dashboard com visao geral da frota: total de caminhoes, motoristas ativos, viagens no periodo, receita total, gastos totais e margem
- **FR-015**: O sistema deve gerar alertas de manutencao preditiva baseados em quilometragem, tempo desde ultima revisao e tipo de componente (pneu, oleo, freio, etc.)
- **FR-016**: O sistema deve permitir exportacao de relatorios em formato PDF e Excel
- **FR-017**: O sistema deve suportar autenticacao com email/senha e controle de acesso baseado em papeis (dono, administrativo, motorista)
- **FR-018**: O sistema deve permitir que o motorista visualize seus proprios lancamentos e fechamentos via interface simplificada
- **FR-019**: O sistema deve manter log de auditoria de todas as operacoes criticas (lancamentos financeiros, alteracoes de vinculos)
- **FR-020**: O sistema deve permitir busca e filtragem em todas as listagens (motoristas, caminhoes, viagens, gastos)

### Non Functional

- **NFR-001**: O sistema deve responder a qualquer requisicao de listagem em menos de 2 segundos para ate 10.000 registros
- **NFR-002**: O sistema deve suportar upload de imagens de comprovantes ate 10MB por arquivo, com compressao automatica
- **NFR-003**: O sistema deve funcionar em navegadores modernos (Chrome, Firefox, Safari, Edge) nas ultimas 2 versoes
- **NFR-004**: O sistema deve ser responsivo, funcionando adequadamente em tablets e smartphones
- **NFR-005**: O sistema deve implementar autenticacao segura com hash de senhas (bcrypt) e tokens JWT com expiracao
- **NFR-006**: O sistema deve implementar Row Level Security (RLS) para garantir que cada empresa so acesse seus proprios dados
- **NFR-007**: O sistema deve ter disponibilidade minima de 99.5% (excluindo janelas de manutencao programadas)
- **NFR-008**: O sistema deve realizar backups automaticos diarios do banco de dados
- **NFR-009**: O sistema deve estar em conformidade com a LGPD para tratamento de dados pessoais de motoristas
- **NFR-010**: O sistema deve suportar ate 500 empresas simultaneas no MVP com escalabilidade horizontal planejada
- **NFR-011**: A geracao de PDF de fechamento financeiro deve completar em menos de 5 segundos

---

## Constraints

- **CON-001**: O MVP deve ser desenvolvido para web apenas (sem aplicativo mobile nativo)
- **CON-002**: O armazenamento de imagens deve usar object storage (ex: Supabase Storage ou S3) para evitar sobrecarga no banco
- **CON-003**: Todas as operacoes financeiras devem usar precisao decimal adequada (sem ponto flutuante para valores monetarios)
- **CON-004**: O sistema deve operar exclusivamente em Portugues Brasileiro no MVP
- **CON-005**: Nao ha integracao com sistemas externos (ERP, contabilidade) no MVP — apenas exportacao de dados
- **CON-006**: O calculo de distancia para precificacao sera baseado em input manual do usuario, sem integracao com APIs de mapa no MVP
- **CON-007**: O rastreamento e apenas cadastro de links externos — sem integracao direta com APIs de rastreadores

---

## User Interface Design Goals

### Overall UX Vision

Interface profissional e limpa, voltada para usuarios com baixa a media familiaridade tecnologica. O design deve priorizar clareza, velocidade de navegacao e reducao de cliques para tarefas frequentes (lancamento de gastos, consulta de fechamento). O tom visual deve transmitir confianca e organizacao — cores sobriedas, tipografia legivel, hierarquia visual clara.

### Key Interaction Paradigms

- **Dashboard-first**: Ao fazer login, o dono ve imediatamente os indicadores mais importantes da operacao
- **Lancamento rapido**: Gastos devem ser lancaveis em no maximo 3 cliques/taps a partir de qualquer tela
- **Navegacao por contexto**: Ao visualizar um motorista, ter acesso direto a seus gastos, viagens e fechamentos
- **Filtros persistentes**: Filtros de periodo e motorista persistem durante a sessao de navegacao

### Core Screens and Views

- **Login / Registro**: Autenticacao simples, opcao de "lembrar-me"
- **Dashboard Principal**: KPIs da frota, alertas de manutencao, viagens em andamento
- **Cadastros**: Empresas, Motoristas, Caminhoes — listagens com busca e CRUD completo
- **Lancamento de Gastos**: Formulario com selecao de categoria, upload de foto, vinculo automatico
- **Viagens**: Lista de viagens com status, criacao com calculo automatico de estimativa
- **Fechamento Financeiro**: Selecao de periodo/motorista, preview, impressao/exportacao
- **Relatorios**: Graficos de gastos por categoria, evolucao mensal, comparativo por caminhao
- **Perfil do Motorista**: Visao simplificada dos proprios dados (somente leitura + lancamentos basicos)

### Accessibility

WCAG AA — foco em contraste adequado, navegacao por teclado e labels acessiveis em formularios.

### Branding

Sem branding pre-definido. Recomendacao: paleta com azul escuro (confianca), branco (limpeza) e acentos em laranja (acao). Estilo moderno e corporativo sem ser austero.

### Target Device and Platforms

Web Responsive — otimizado para desktop (uso principal em escritorio) com suporte completo a tablets e smartphones (uso em campo por motoristas).

---

## Technical Assumptions

### Repository Structure

Monorepo — frontend e backend no mesmo repositorio para simplificar desenvolvimento e deploys no MVP.

### Service Architecture

Monolith modular — uma unica aplicacao com separacao clara de modulos por dominio (cadastros, financeiro, viagens, manutencao). Facilita o desenvolvimento rapido do MVP com possibilidade de extrair microsservicos no futuro se necessario.

### Testing Requirements

Unit + Integration — testes unitarios para logica de negocio (calculos financeiros, precificacao, alertas de manutencao) e testes de integracao para fluxos criticos (fechamento financeiro, CRUD com RLS). Testes e2e opcionais para fluxos criticos no V2.

### Additional Technical Assumptions and Requests

- **Stack recomendada**: Next.js 16+ (App Router) + Supabase (PostgreSQL + Auth + Storage + RLS) — alinhado com o preset ativo do projeto
- **Estilizacao**: Tailwind CSS + shadcn/ui para produtividade e consistencia visual
- **State Management**: Zustand para estado global + React Query para cache de servidor
- **Geracao de PDF**: Biblioteca server-side (ex: @react-pdf/renderer ou puppeteer) para fechamentos
- **Upload de imagens**: Supabase Storage com politicas de bucket por empresa
- **Valores monetarios**: Armazenados como integer (centavos) no banco, formatados na apresentacao
- **Timezone**: Todos os timestamps em UTC no banco, convertidos para America/Sao_Paulo na UI

---

## Epic List

### Epic 1: Fundacao e Cadastros Base
Estabelecer a infraestrutura do projeto (Next.js, Supabase, Auth, CI/CD basico) e implementar os modulos de cadastro fundamentais: empresas, motoristas, caminhoes e seus vinculos. Ao final deste epic, a plataforma tera autenticacao funcionando e CRUD completo dos cadastros base.

### Epic 2: Gestao de Gastos e Upload
Implementar o modulo de lancamento de gastos por categoria com upload de comprovantes, associacao a motorista/caminhao/viagem e listagem com filtros. Este epic entrega o core operacional diario da plataforma.

### Epic 3: Viagens e Precificacao
Implementar o cadastro de viagens com origem/destino/valores, calculo de estimativa de custo baseado em media de consumo, e definicao de percentuais de pagamento motorista/empresa. Este epic fecha o ciclo operacional viagem-gasto-receita.

### Epic 4: Financeiro e Fechamento
Implementar o fechamento financeiro semanal/mensal por motorista, consolidando viagens e gastos. Inclui preview, aprovacao, geracao de PDF e exportacao. Este epic entrega o valor central da plataforma para o dono de frota.

### Epic 5: Dashboard, Relatorios e Exportacao
Implementar o dashboard principal com KPIs da frota, relatorios graficos (gastos por categoria, evolucao mensal, comparativos) e exportacao PDF/Excel. Este epic transforma dados operacionais em inteligencia de negocio.

### Epic 6: Manutencao Preditiva
Implementar alertas de manutencao baseados em quilometragem, tempo de uso e tipo de componente. Inclui configuracao de intervalos por tipo de manutencao e painel de alertas. Este epic adiciona valor preventivo a operacao.

### Epic 7: Rastreamento e Perfil do Motorista
Implementar o cadastro de links de rastreamento por caminhao e a interface simplificada para motoristas visualizarem seus dados e fechamentos. Este epic amplia o alcance da plataforma para o usuario final motorista.

---

## Epic 1: Fundacao e Cadastros Base

**Goal**: Criar a fundacao tecnica do projeto e implementar todos os cadastros base com CRUD completo, autenticacao e controle de acesso. Ao final, um dono de frota pode se registrar, fazer login e cadastrar seus motoristas, caminhoes e vinculos entre eles.

### Story 1.1: Setup do Projeto e Infraestrutura Base

As a dono de frota,
I want a plataforma acessivel via navegador,
so that eu possa comecar a usar o sistema.

**Acceptance Criteria:**
1. Projeto Next.js 16+ inicializado com TypeScript, Tailwind CSS e shadcn/ui
2. Supabase configurado com projeto criado, variaves de ambiente e client inicializado
3. Estrutura de pastas do monorepo definida conforme padroes do projeto
4. Layout base com header, sidebar de navegacao e area de conteudo principal
5. Pagina inicial (landing/login) renderizando corretamente
6. CI basico configurado (lint + typecheck no pre-commit)
7. README com instrucoes de setup local

### Story 1.2: Autenticacao e Controle de Acesso

As a usuario,
I want fazer login com email e senha,
so that meus dados estejam protegidos e eu acesse apenas minha empresa.

**Acceptance Criteria:**
1. Registro de novo usuario com email, senha, nome e CNPJ da empresa
2. Login com email/senha usando Supabase Auth
3. Logout funcional com limpeza de sessao
4. Middleware de protecao de rotas — paginas protegidas redirecionam para login
5. Tres papeis definidos: dono, administrativo, motorista
6. RLS habilitado no Supabase com politica base: usuario so acessa dados de sua empresa
7. Tabela de perfis (profiles) criada com vinculo ao auth.users

### Story 1.3: Cadastro de Empresas

As a dono de frota,
I want cadastrar minha empresa com CNPJ e razao social,
so that todos os dados da operacao fiquem vinculados a minha empresa.

**Acceptance Criteria:**
1. Tabela `companies` criada com campos: id, cnpj (unico), razao_social, endereco, telefone, email, created_at
2. Formulario de cadastro com validacao de CNPJ (formato e digitos verificadores)
3. Listagem de empresas com busca por nome/CNPJ
4. Edicao e exclusao logica de empresa
5. RLS: usuario so ve empresas vinculadas ao seu perfil
6. Mascara de CNPJ no input (XX.XXX.XXX/XXXX-XX)

### Story 1.4: Cadastro de Motoristas

As a dono de frota,
I want cadastrar motoristas com seus dados pessoais e CNH,
so that eu possa gerenciar quem dirige meus caminhoes.

**Acceptance Criteria:**
1. Tabela `drivers` criada com campos: id, company_id (FK), nome, cpf (unico por empresa), cnh_numero, cnh_categoria, cnh_validade, telefone, email, status (ativo/inativo), created_at
2. Formulario de cadastro com validacao de CPF
3. Listagem com busca por nome/CPF e filtro por status
4. Edicao e inativacao de motorista (exclusao logica)
5. Alerta visual quando CNH esta vencida ou proxima do vencimento (30 dias)
6. RLS: motoristas filtrados por company_id do usuario logado

### Story 1.5: Cadastro de Caminhoes Cegonha

As a dono de frota,
I want cadastrar meus caminhoes com placa, modelo e quilometragem,
so that eu tenha controle sobre minha frota.

**Acceptance Criteria:**
1. Tabela `trucks` criada com campos: id, company_id (FK), placa (unica), renavam, ano, modelo, capacidade_vagas, km_atual, data_ultima_revisao, status (ativo/inativo), created_at
2. Formulario de cadastro com validacao de placa (formato Mercosul e antigo)
3. Listagem com busca por placa/modelo e filtro por status
4. Edicao e inativacao de caminhao
5. Exibicao da quilometragem formatada (ex: 125.430 km)
6. RLS: caminhoes filtrados por company_id

### Story 1.6: Vinculos Motorista-CNPJ-Caminhao

As a dono de frota,
I want vincular motoristas a caminhoes e CNPJs,
so that eu saiba quem esta dirigindo qual caminhao e para qual empresa.

**Acceptance Criteria:**
1. Tabela `driver_truck_links` criada com campos: id, driver_id (FK), truck_id (FK), company_id (FK), data_inicio, data_fim (nullable), ativo, created_at
2. Interface para criar vinculo selecionando motorista e caminhao
3. Suporte a vinculos N:N — um motorista pode ter vinculos com multiplos caminhoes (em periodos diferentes)
4. Historico de vinculos visivel na ficha do motorista e do caminhao
5. Vinculo ativo destacado visualmente; vinculos encerrados em cinza
6. Ao encerrar vinculo, data_fim e preenchida automaticamente
7. RLS: vinculos filtrados por company_id

---

## Epic 2: Gestao de Gastos e Upload

**Goal**: Permitir o lancamento completo de gastos operacionais por categoria, com upload de comprovantes fotograficos e associacao a motorista, caminhao e viagem. Ao final, o dono de frota pode registrar todos os gastos da operacao com rastreabilidade completa.

### Story 2.1: Modelo de Dados e Categorias de Gastos

As a dono de frota,
I want ter categorias padrao de gastos,
so that meus lancamentos fiquem organizados e classificados.

**Acceptance Criteria:**
1. Tabela `expenses` criada com campos: id, company_id, driver_id (FK nullable), truck_id (FK nullable), trip_id (FK nullable), categoria, valor (integer em centavos), data, descricao, comprovante_url (nullable), created_at, created_by
2. Categorias padrao definidas como enum: pedagio, pneu, manutencao, combustivel, lavagem, seguro, multa, outros
3. Valor armazenado como integer (centavos) — constraint CHECK valor > 0
4. Indices criados em company_id, driver_id, truck_id, data, categoria
5. RLS: gastos filtrados por company_id

### Story 2.2: Lancamento de Gastos com Upload

As a dono de frota ou administrativo,
I want lancar um gasto com foto do comprovante,
so that eu tenha registro digital de todas as despesas.

**Acceptance Criteria:**
1. Formulario de lancamento com: categoria (select), valor (input monetario com mascara R$), data, descricao, motorista (select opcional), caminhao (select opcional)
2. Upload de foto/comprovante com preview antes de salvar (aceitar JPG, PNG, PDF ate 10MB)
3. Compressao automatica de imagem no client-side antes do upload (max 1MB apos compressao)
4. Armazenamento no Supabase Storage com path: `{company_id}/expenses/{expense_id}/{filename}`
5. Bucket com politica de acesso: somente usuarios da mesma empresa podem visualizar
6. Feedback visual de progresso durante upload
7. Validacao: categoria e valor sao obrigatorios, data default = hoje

### Story 2.3: Listagem e Filtros de Gastos

As a dono de frota,
I want visualizar e filtrar todos os gastos,
so that eu consiga acompanhar onde esta sendo gasto o dinheiro.

**Acceptance Criteria:**
1. Listagem paginada de gastos com colunas: data, categoria, valor, motorista, caminhao, descricao, comprovante (icone)
2. Filtros por: periodo (data inicio/fim), categoria, motorista, caminhao
3. Totalizador visivel no topo mostrando soma dos gastos filtrados
4. Clique no icone de comprovante abre modal com visualizacao da imagem
5. Ordenacao por data (desc por padrao), valor ou categoria
6. Exportacao da listagem filtrada em CSV
7. Performance: listagem responde em < 2s para ate 5.000 registros

---

## Epic 3: Viagens e Precificacao

**Goal**: Implementar o cadastro de viagens com calculo de estimativa de custo e definicao de percentuais de pagamento. Ao final, o dono de frota pode registrar viagens, estimar custos antes de aceitar um frete, e definir como sera a divisao de valores com o motorista.

### Story 3.1: Cadastro de Viagens

As a dono de frota,
I want cadastrar viagens com origem, destino e valores,
so that eu tenha controle de todos os fretes realizados.

**Acceptance Criteria:**
1. Tabela `trips` criada com campos: id, company_id, driver_id (FK), truck_id (FK), origem, destino, distancia_km, valor_frete (centavos), percentual_motorista, percentual_empresa, data_saida, data_chegada_prevista, data_chegada_real (nullable), status (planejada, em_andamento, concluida, cancelada), observacoes, created_at
2. Formulario de criacao com todos os campos, selecao de motorista e caminhao ativos
3. Calculo automatico: valor_motorista = valor_frete * percentual_motorista / 100
4. Validacao: percentual_motorista + percentual_empresa = 100
5. Listagem com filtros por status, motorista, periodo
6. Transicao de status: planejada -> em_andamento -> concluida (ou cancelada)
7. RLS: viagens filtradas por company_id

### Story 3.2: Estimativa de Custo por Viagem

As a dono de frota,
I want estimar o custo de uma viagem antes de aceita-la,
so that eu saiba se o frete e lucrativo.

**Acceptance Criteria:**
1. Calculo de media de consumo (km/l) por caminhao baseado nos ultimos 10 abastecimentos registrados em gastos (categoria = combustivel)
2. Input de preco medio do diesel (editavel, com valor default da ultima viagem)
3. Estimativa de custo de combustivel: distancia_km / media_consumo * preco_diesel
4. Campo para adicionar estimativa de pedagio (input manual)
5. Resumo visual: custo estimado total vs valor do frete, margem estimada em R$ e %
6. Estimativa exibida no formulario de criacao de viagem e na tela de detalhes
7. Se caminhao nao tem historico de consumo suficiente, exibir media geral da frota com aviso

### Story 3.3: Vinculo de Gastos a Viagens

As a dono de frota,
I want associar gastos a viagens especificas,
so that eu saiba o custo real de cada viagem.

**Acceptance Criteria:**
1. No formulario de gasto, campo opcional para selecionar viagem ativa (status = em_andamento)
2. Na tela de detalhes da viagem, aba/secao mostrando todos os gastos vinculados
3. Totalizador de gastos reais da viagem vs estimativa
4. Possibilidade de vincular/desvincular gasto de viagem apos o lancamento
5. Comparativo: custo estimado vs custo real (quando viagem concluida)

---

## Epic 4: Financeiro e Fechamento

**Goal**: Implementar o fechamento financeiro por motorista, consolidando viagens realizadas e gastos no periodo. Ao final, o dono de frota pode gerar, revisar e imprimir o fechamento semanal ou mensal de cada motorista com um clique.

### Story 4.1: Consolidacao Financeira por Motorista

As a dono de frota,
I want ver o resumo financeiro de um motorista em um periodo,
so that eu saiba quanto devo pagar e quanto foi gasto.

**Acceptance Criteria:**
1. Tabela `settlements` criada com campos: id, company_id, driver_id, periodo_inicio, periodo_fim, total_fretes (centavos), total_percentual_motorista (centavos), total_gastos_motorista (centavos), valor_liquido (centavos), status (rascunho, aprovado, pago), created_at, approved_at, approved_by
2. Tela de selecao: escolher motorista + periodo (semanal ou mensal, com date pickers)
3. Calculo automatico consolidando: viagens concluidas no periodo, percentual do motorista, gastos vinculados ao motorista
4. Preview detalhado antes de salvar: lista de viagens, lista de gastos, totalizadores
5. Formula: valor_liquido = total_percentual_motorista - total_gastos_motorista
6. Possibilidade de salvar como rascunho e aprovar depois

### Story 4.2: Geracao de PDF do Fechamento

As a dono de frota,
I want imprimir o fechamento financeiro do motorista,
so that eu tenha um comprovante fisico para assinatura.

**Acceptance Criteria:**
1. Botao "Gerar PDF" na tela de fechamento aprovado
2. PDF gerado server-side com layout profissional contendo: dados da empresa, dados do motorista, periodo, lista de viagens com valores, lista de gastos, totalizadores, valor liquido
3. PDF inclui campo para assinatura do motorista e do responsavel
4. Geracao completa em menos de 5 segundos (NFR-011)
5. PDF disponivel para download e para impressao direta
6. Historico de fechamentos acessivel por motorista com links para PDFs

### Story 4.3: Listagem e Gestao de Fechamentos

As a dono de frota,
I want visualizar todos os fechamentos realizados,
so that eu tenha controle historico dos pagamentos.

**Acceptance Criteria:**
1. Listagem de fechamentos com colunas: motorista, periodo, valor liquido, status, data de aprovacao
2. Filtros por: motorista, periodo, status (rascunho/aprovado/pago)
3. Transicao de status: rascunho -> aprovado -> pago
4. Ao marcar como pago, registrar data do pagamento
5. Impedimento: nao permitir editar fechamento ja aprovado (apenas criar novo)
6. Totalizador: soma dos valores liquidos no periodo filtrado

---

## Epic 5: Dashboard, Relatorios e Exportacao

**Goal**: Transformar os dados operacionais em informacao visual e exportavel. Dashboard com KPIs em tempo real e relatorios analiticos para tomada de decisao.

### Story 5.1: Dashboard Principal

As a dono de frota,
I want ver um painel com os principais indicadores ao fazer login,
so that eu tenha visao rapida da saude da minha operacao.

**Acceptance Criteria:**
1. Dashboard como pagina inicial apos login para papel dono/administrativo
2. KPI cards: total de caminhoes ativos, motoristas ativos, viagens no mes, receita total do mes, gastos totais do mes, margem do mes
3. Grafico de barras: gastos por categoria no mes atual
4. Lista: ultimas 5 viagens com status
5. Alertas: CNH vencendo em 30 dias, manutencoes pendentes (se Epic 6 implementado)
6. Filtro de periodo no topo do dashboard
7. Dados carregam em menos de 3 segundos

### Story 5.2: Relatorios Analiticos

As a dono de frota,
I want relatorios detalhados de gastos e receitas,
so that eu consiga analisar tendencias e tomar decisoes.

**Acceptance Criteria:**
1. Relatorio de gastos por categoria com grafico de pizza/donut e tabela detalhada
2. Relatorio de evolucao mensal: receitas vs gastos em grafico de linhas (ultimos 12 meses)
3. Relatorio comparativo por caminhao: gastos totais, receita gerada, margem
4. Relatorio comparativo por motorista: viagens realizadas, gastos, fechamentos
5. Todos os relatorios com filtro de periodo personalizavel
6. Exportacao de cada relatorio em PDF e Excel

### Story 5.3: Exportacao de Dados

As a dono de frota,
I want exportar dados em PDF e Excel,
so that eu possa compartilhar com meu contador ou tomar decisoes offline.

**Acceptance Criteria:**
1. Botao de exportacao presente em todas as listagens (gastos, viagens, fechamentos, relatorios)
2. Exportacao Excel (.xlsx) com formatacao adequada (cabecalhos, larguras de coluna)
3. Exportacao PDF com logo da empresa (se cadastrado) e formatacao profissional
4. Exportacao respeita os filtros aplicados na listagem
5. Limite de 10.000 registros por exportacao com aviso ao usuario

---

## Epic 6: Manutencao Preditiva

**Goal**: Implementar sistema de alertas de manutencao baseados em quilometragem, tempo de uso e tipo de componente, ajudando donos de frota a prevenir quebras e reduzir custos com manutencao corretiva.

### Story 6.1: Configuracao de Intervalos de Manutencao

As a dono de frota,
I want definir intervalos de manutencao por tipo de componente,
so that o sistema me avise quando esta na hora de fazer revisao.

**Acceptance Criteria:**
1. Tabela `maintenance_rules` com campos: id, company_id, componente (oleo, pneu, freio, correia, filtro_ar, filtro_combustivel, outros), intervalo_km, intervalo_dias, created_at
2. Regras padrao pre-carregadas (ex: oleo a cada 15.000km ou 6 meses, pneu a cada 40.000km)
3. Interface para customizar intervalos por empresa
4. Cada regra pode ser baseada em km, tempo ou ambos (o que ocorrer primeiro)

### Story 6.2: Motor de Alertas de Manutencao

As a dono de frota,
I want receber alertas quando um caminhao precisa de manutencao,
so that eu possa agendar a revisao antes de uma quebra.

**Acceptance Criteria:**
1. Tabela `maintenance_alerts` com campos: id, truck_id, company_id, rule_id, tipo_alerta (preventivo, urgente, vencido), km_prevista, data_prevista, status (pendente, agendada, realizada, ignorada), created_at
2. Calculo de alertas baseado em: km_atual do caminhao vs ultima manutencao daquele tipo + intervalo_km
3. Tres niveis: preventivo (faltam 10% do intervalo), urgente (faltam 5%), vencido (passou do intervalo)
4. Painel de alertas no dashboard com indicadores visuais por nivel
5. Ao registrar um gasto de manutencao, opcao de marcar o alerta como realizado e atualizar referencia

### Story 6.3: Historico de Manutencao por Caminhao

As a dono de frota,
I want ver o historico de manutencoes de cada caminhao,
so that eu tenha rastreabilidade completa das revisoes.

**Acceptance Criteria:**
1. Na ficha do caminhao, aba de historico de manutencao
2. Timeline visual com: data, tipo de manutencao, km no momento, custo (vinculado ao gasto), provedor
3. Filtro por tipo de componente
4. Indicador de saude geral do caminhao baseado em alertas pendentes

---

## Epic 7: Rastreamento e Perfil do Motorista

**Goal**: Implementar o cadastro de links de rastreamento por caminhao e a interface simplificada para motoristas, ampliando o alcance da plataforma.

### Story 7.1: Cadastro de Links de Rastreamento

As a dono de frota,
I want cadastrar os links de rastreamento dos meus caminhoes,
so that eu possa acessar a localizacao de cada um rapidamente.

**Acceptance Criteria:**
1. Tabela `tracking_links` com campos: id, truck_id, company_id, provedor_nome, url, ativo, created_at
2. Na ficha do caminhao, secao para adicionar/remover links de rastreamento
3. Botao que abre o link em nova aba
4. Suporte a multiplos links por caminhao (diferentes provedores)
5. RLS: links filtrados por company_id

### Story 7.2: Interface do Motorista

As a motorista,
I want acessar meus dados e fechamentos pelo celular,
so that eu possa acompanhar meus ganhos e gastos.

**Acceptance Criteria:**
1. Layout simplificado para papel motorista — apenas menus relevantes
2. Dashboard do motorista: viagens ativas, ultimo fechamento, gastos recentes
3. Visualizacao de fechamentos aprovados com link para PDF
4. Possibilidade de lancar gastos basicos (combustivel, pedagio) com upload de foto
5. Visualizacao somente leitura de viagens atribuidas
6. Interface otimizada para smartphone (touch-friendly, fontes maiores)

---

## MVP vs V2 vs V3 Roadmap

### MVP (Epics 1-4) — Lancamento Inicial

| Epic | Conteudo | Valor |
|------|----------|-------|
| Epic 1 | Fundacao, Auth, Cadastros Base, Vinculos | Infraestrutura + gestao basica da frota |
| Epic 2 | Lancamento de gastos, upload, listagem | Core operacional diario |
| Epic 3 | Viagens, precificacao, vinculo gastos-viagem | Ciclo operacional completo |
| Epic 4 | Fechamento financeiro, PDF, historico | Valor central para o dono de frota |

**Criterio de sucesso do MVP**: Um dono de frota consegue cadastrar sua operacao, lancar gastos diarios, registrar viagens e gerar o fechamento semanal do motorista em PDF — substituindo completamente a planilha Excel.

### V2 (Epics 5-6) — Inteligencia e Prevencao

| Epic | Conteudo | Valor |
|------|----------|-------|
| Epic 5 | Dashboard, relatorios, exportacao | Inteligencia de negocio |
| Epic 6 | Manutencao preditiva | Prevencao de custos |

### V3 (Epic 7 + Futuro) — Expansao

| Epic | Conteudo | Valor |
|------|----------|-------|
| Epic 7 | Rastreamento, perfil motorista | Ampliacao de usuarios |
| Futuro | App mobile nativo, integracao ERP, API de mapas, notificacoes push, multi-idioma | Escalabilidade |

---

## Success Metrics

### Metricas de Produto

| Metrica | Meta MVP | Meta V2 |
|---------|----------|---------|
| Empresas cadastradas (3 meses) | 20 | 100 |
| Motoristas ativos na plataforma | 50 | 300 |
| Lancamentos de gastos/mes | 500 | 5.000 |
| Fechamentos gerados/mes | 80 | 500 |
| Retencao mensal (empresa) | 70% | 85% |

### Metricas de Negocio

| Metrica | Meta |
|---------|------|
| Tempo para fazer fechamento | De 2h manual para < 5min na plataforma |
| Reducao de erros em lancamentos | 90% vs processo manual |
| NPS (Net Promoter Score) | >= 40 no MVP, >= 60 no V2 |
| Churn mensal | < 10% no MVP |

### Metricas Tecnicas

| Metrica | Meta |
|---------|------|
| Uptime | >= 99.5% |
| Tempo de resposta p95 | < 2s para listagens |
| Geracao de PDF p95 | < 5s |
| Cobertura de testes | >= 70% logica de negocio |

---

## Risk Assessment

| Risco | Probabilidade | Impacto | Mitigacao |
|-------|--------------|---------|-----------|
| Adocao lenta por resistencia a tecnologia | Alta | Alto | UX extremamente simples, onboarding guiado, suporte WhatsApp |
| Dados incorretos por lancamento manual | Media | Medio | Validacoes rigorosas, campos obrigatorios, confirmacoes visuais |
| Performance com volume de dados | Baixa | Alto | Indices adequados, paginacao, queries otimizadas desde o MVP |
| Seguranca de dados financeiros | Baixa | Critico | RLS, auditoria, backups diarios, LGPD compliance |
| Concorrencia de solucoes genericas | Media | Medio | Foco vertical no nicho cegonheiro, features especificas do setor |
| Calculo financeiro incorreto | Baixa | Critico | Valores em centavos (integer), testes unitarios extensivos para calculos |

---

## Personas

### Persona 1: Carlos — Dono de Frota

- **Idade**: 45 anos
- **Frota**: 8 caminhoes cegonha, 10 motoristas
- **Perfil tecnico**: Baixo — usa smartphone basico e computador no escritorio
- **Dor principal**: Gasta 4h por semana fazendo fechamento financeiro em planilha Excel
- **Motivacao**: Quer saber em tempo real quanto cada caminhao e motorista esta dando de lucro ou prejuizo
- **Frase**: "Preciso parar de depender do caderninho do motorista pra saber quanto gastou"

### Persona 2: Roberto — Motorista

- **Idade**: 38 anos
- **Perfil tecnico**: Medio — usa smartphone Android diariamente
- **Dor principal**: Nunca sabe exatamente quanto vai receber no final da semana
- **Motivacao**: Quer transparencia nos calculos e facilidade para enviar comprovantes
- **Frase**: "Se eu pudesse tirar foto do pedagio e ja ficar registrado, seria perfeito"

### Persona 3: Ana — Assistente Administrativa

- **Idade**: 28 anos
- **Perfil tecnico**: Medio-alto — trabalha com computador o dia todo
- **Dor principal**: Recebe comprovantes por WhatsApp, organiza em pastas, digita em planilha
- **Motivacao**: Quer um sistema unico onde tudo ja esteja organizado
- **Frase**: "Eu passo o dia inteiro organizando papelzinho. Preciso de algo digital"

---

## Checklist Results Report

### Category Statuses

| Category | Status | Critical Issues |
|----------|--------|-----------------|
| 1. Problem Definition and Context | PASS | Nenhum |
| 2. MVP Scope Definition | PASS | Nenhum |
| 3. User Experience Requirements | PASS | Nenhum |
| 4. Functional Requirements | PASS | Nenhum |
| 5. Non-Functional Requirements | PASS | Nenhum |
| 6. Epic and Story Structure | PASS | Nenhum |
| 7. Technical Guidance | PASS | Nenhum |
| 8. Cross-Functional Requirements | PARTIAL | Integracao com APIs externas adiada para V3 |
| 9. Clarity and Communication | PASS | Nenhum |

**Overall: 95% (8.5/9)**

### Critical Deficiencies

Nenhuma deficiencia critica identificada. O PRD cobre todos os requisitos fornecidos com escopo MVP claramente definido.

### Recommendations

1. **Validar precificacao com usuarios reais** antes de implementar — o modelo de estimativa por media de consumo precisa de feedback do mercado
2. **Considerar integracao com API de CNPJ** (ReceitaWS ou similar) no V2 para auto-preenchimento de dados da empresa
3. **Planejar estrategia de onboarding** — dado o perfil de baixo letramento digital dos donos de frota, um fluxo guiado de primeiro uso sera critico
4. **Definir estrategia de backup de comprovantes** — imagens em Supabase Storage precisam de politica de retencao

### Final Decision

**READY FOR ARCHITECT** — O PRD esta abrangente, com epics bem definidos, stories com acceptance criteria testveis e escopo MVP pragmatico. Pronto para a fase de arquitetura.

---

## Next Steps

### UX Expert Prompt

> @ux-design-expert Revise o PRD em `docs/prd-cegonheiros.md` e crie o guia de UX/UI. Foque na experiencia do dono de frota com baixo letramento digital e no motorista usando smartphone em campo. Priorize: fluxo de lancamento rapido de gastos (3 cliques), dashboard com KPIs claros, e interface simplificada do motorista. Paleta sugerida: azul escuro + branco + laranja.

### Architect Prompt

> @architect Leia o PRD em `docs/prd-cegonheiros.md` e crie a arquitetura tecnica. Stack recomendada: Next.js 16+ (App Router) + Supabase (Auth + DB + Storage + RLS). Foque no MVP (Epics 1-4). Pontos de atencao: valores monetarios em centavos (integer), RLS por company_id, upload de comprovantes com compressao, geracao de PDF server-side. Monolith modular com separacao por dominio.
