# Workflow Template — Sites Profissionais para Liberais

**Derivado do projeto:** Site Dra. Gislaine Rodrigues (Advocacia de Familia, SBC/SP)
**Producao:** 2026-03-29
**Versao:** 1.0
**Status:** Template replicavel — validado em producao

Publico-alvo: advogados, medicos, dentistas, contadores, psicologos, engenheiros, arquitetos e qualquer profissional liberal que precise de presenca digital premium.

---

## PARTE 1 — PIPELINE COMPLETO

As 20 etapas na ordem exata em que foram executadas no projeto de referencia.

> Convencao de tempo: considera-se que o agente trabalha em modo YOLO com sessoes de 2 a 4 horas. "Paralelo" indica etapas que podem rodar simultaneamente em agentes separados.

---

### Etapa 1 — Pesquisa de Mercado + Brainstorm

| Campo | Detalhe |
|-------|---------|
| Agente | `@analyst` |
| Comando | `*research` ou prompt livre descrevendo o profissional e a cidade |
| Input do cliente | Nome completo, profissao, especialidade, cidade, telefone, email, redes sociais, areas de atuacao |
| Output | `docs/pesquisa-mercado-{cliente}.md` — benchmarks de concorrentes, faixas de preco, diferenciais de mercado |
| Tempo estimado | 1 a 2 horas |
| Paralelo com | Nenhuma (etapa fundacional) |

**Notas:** O analyst pesquisa concorrentes locais, verifica o que agencias cobram na regiao, identifica lacunas no mercado digital do segmento. Esse documento alimenta diretamente o PRD.

---

### Etapa 2 — PRD (Product Requirements Document)

| Campo | Detalhe |
|-------|---------|
| Agente | `@pm` |
| Comando | `*create-prd` |
| Input | Pesquisa de mercado (Etapa 1) + dados do cliente + briefing preenchido |
| Output | `docs/prd-site-{cliente}.md` — requisitos funcionais, nao-funcionais, restricoes regulatorias, escopo de paginas |
| Tempo estimado | 1 a 2 horas |
| Paralelo com | Nenhuma |

**Notas:** Para profissionais regulamentados, o PRD deve incluir uma secao de restricoes regulatorias. Exemplos: OAB (advogados), CFM/CRM (medicos), CFO/CRO (dentistas), CFC/CRC (contadores). Essas restricoes impactam copy, imagens, schema markup e formularios.

---

### Etapa 3A — Arquitetura Tecnica

| Campo | Detalhe |
|-------|---------|
| Agente | `@architect` |
| Comando | `*task architecture-review` ou prompt de criacao de arquitetura |
| Input | PRD aprovado |
| Output | `docs/architecture-site-{cliente}.md` — stack validada, estrutura de rotas, decisoes tecnicas, ADRs |
| Tempo estimado | 1 a 2 horas |
| Paralelo com | Etapa 3B |

---

### Etapa 3B — Criacao das Stories

| Campo | Detalhe |
|-------|---------|
| Agente | `@sm` seguido de `@po` |
| Comando | `@sm *create-story` (para cada epic) + `@po *validate-story-draft` |
| Input | PRD aprovado |
| Output | Stories em `docs/stories/active/` — um arquivo por story, organizados em epics |
| Tempo estimado | 2 a 3 horas |
| Paralelo com | Etapa 3A |

**Notas:** Para sites profissionais tipicos, o projeto se organiza em 4 epics principais:
- Epic 1: Setup + Home (fundacao, componentes globais, pagina inicial)
- Epic 2: Paginas institucionais (Sobre, Contato, FAQ, Privacidade, Nao Atendo)
- Epic 3: Paginas de especialidade (uma sub-pagina por area de atuacao)
- Epic 4: Blog (listagem, artigos, imagens, schema BlogPosting)

---

### Etapa 4 — Validacao das Stories

| Campo | Detalhe |
|-------|---------|
| Agente | `@po` |
| Comando | `*validate-story-draft` para cada story |
| Input | Stories criadas na Etapa 3B |
| Output | Stories aprovadas com status `Ready` (ou devolvidas para revisao) |
| Tempo estimado | 30 min a 1 hora |
| Paralelo com | Nenhuma (gate obrigatorio antes do dev) |

---

### Etapa 5 — Epic 1: Setup + Home

| Campo | Detalhe |
|-------|---------|
| Agente | `@dev` |
| Comando | `*develop [Story 1.x]` para cada story |
| Input | Stories validadas do Epic 1, arquitetura aprovada |
| Output | Repositorio Next.js inicializado, componentes globais (Header, Footer, WhatsApp widget), pagina Home completa |
| Tempo estimado | 3 a 5 horas |
| Paralelo com | Etapa 6 (guia visual pode comecar em paralelo) |

---

### Etapa 6 — Guia Visual + Wireframes

| Campo | Detalhe |
|-------|---------|
| Agente | `@ux-design-expert` |
| Comando | Prompt livre de criacao de guia visual |
| Input | PRD + dados do cliente (paleta de cores se houver, foto profissional, logo) |
| Output | `docs/ux-guide-{cliente}.md` — paleta de cores, tipografia, espacamentos, componentes-chave, tom de voz, wireframes de paginas criticas |
| Tempo estimado | 1 a 2 horas |
| Paralelo com | Etapa 5 |

**Notas:** O guia visual deve incluir subsecoes especificas para acessibilidade (contrastes WCAG AA/AAA) e mobile-first. Para profissionais liberais, tons de azul/verde transmitem confianca e saude; vermelho e laranja agressivo devem ser evitados.

---

### Etapa 7 — Epic 2: Paginas Institucionais

| Campo | Detalhe |
|-------|---------|
| Agente | `@dev` |
| Comando | `*develop [Story 2.x]` para cada story |
| Input | Stories Epic 2 + guia visual (Etapa 6) |
| Output | Paginas Sobre, Contato (formulario + mapa + cards clicaveis: Maps/WhatsApp/email/Instagram com hover), FAQ, Privacidade, Nao Atendo (ou equivalente por segmento) |
| Tempo estimado | 3 a 5 horas |
| Paralelo com | Nenhuma |

---

### Etapa 8 — Epic 3 + Epic 4: Especialidades + Blog

| Campo | Detalhe |
|-------|---------|
| Agente | `@dev` |
| Comando | `*develop [Story 3.x]` e `*develop [Story 4.x]` |
| Input | Stories Epic 3 e 4, conteudo de cada especialidade fornecido pelo cliente (ou gerado pelo @analyst) |
| Output | Sub-paginas de especialidade com fotos HD, blog com artigos iniciais, schema markup por pagina |
| Tempo estimado | 4 a 6 horas |
| Paralelo com | Nenhuma |

**Notas:** O conteudo das paginas de especialidade pode ser gerado pelo `@analyst` caso o cliente nao forneça textos. E necessario revisar conformidade com o conselho profissional (OAB, CFM, CFC, etc.) antes de publicar.

---

### Etapa 9 — QA Completo

| Campo | Detalhe |
|-------|---------|
| Agente | `@qa` |
| Comando | `*qa-gate` para cada story + relatorio consolidado |
| Input | Site completo (Epics 1-4 implementados) |
| Output | `docs/qa/qa-full-test-report.md` — checklist de todos os criterios de aceitacao, bugs encontrados, decisao PASS/FAIL |
| Tempo estimado | 2 a 3 horas |
| Paralelo com | Nenhuma |

**Checklist minimo de QA para sites profissionais:**
- Todos os links internos funcionando (sem 404)
- Formulario de contato envia email de teste
- WhatsApp abre com mensagem pre-preenchida correta
- Meta descriptions presentes em todas as paginas
- Imagens com alt text descritivo
- Site responsivo em mobile (375px), tablet (768px) e desktop (1280px)
- Cookie banner aparece e funciona (aceitar/recusar)
- Politica de privacidade acessivel no footer
- Numero de registro profissional visivel (OAB, CRM, CRO, CRC)
- Schema markup valido (testar com Google Rich Results Test)

---

### Etapa 10 — Auditoria de Seguranca

| Campo | Detalhe |
|-------|---------|
| Agente | `@architect` com papel de "Security Chief" (ou agente especializado se disponivel) |
| Comando | Prompt de auditoria de seguranca referenciando o checklist OWASP para Next.js |
| Input | Codigo-fonte completo |
| Output | `docs/security/security-audit-report.md` — vulnerabilidades encontradas classificadas por severidade |
| Tempo estimado | 1 a 2 horas |
| Paralelo com | Nenhuma |

**Checklist minimo de seguranca:**
- Headers HTTP: HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy
- Content Security Policy (CSP) configurado sem `unsafe-eval`
- Rate limiting nos endpoints de formulario e login admin (se houver)
- Validacao server-side de todos os inputs
- Sanitizacao de HTML (DOMPurify ou equivalente)
- Protecao CSRF em formularios
- `/admin` bloqueado no robots.txt (se houver painel admin)
- Variaveis de ambiente nao expostas no client bundle
- Nenhuma chave de API no repositorio publico

---

### Etapa 11 — Correcoes de Seguranca

| Campo | Detalhe |
|-------|---------|
| Agente | `@dev` |
| Comando | Implementacao direta dos itens criticos do relatorio de seguranca |
| Input | `security-audit-report.md` |
| Output | Codigo corrigido + `docs/security/security-retest-report.md` |
| Tempo estimado | 1 a 3 horas (varia conforme numero de issues) |
| Paralelo com | Nenhuma |

---

### Etapa 12 — Auditoria de SEO

| Campo | Detalhe |
|-------|---------|
| Agente | `@architect` (com foco em SEO tecnico) ou `@analyst` |
| Comando | Prompt de auditoria SEO completa |
| Input | Site completo com seguranca corrigida |
| Output | `docs/seo-audit-complete.md` — checklist SEO tecnico, schema markup, meta tags, performance de imagens, estrutura de heading, links internos |
| Tempo estimado | 1 a 2 horas |
| Paralelo com | Nenhuma |

**Checklist minimo de SEO para profissionais liberais:**
- Schema LocalBusiness + schema especifico da profissao (LegalService, MedicalOrganization, Dentist, Accountant)
- Schema Person ou Attorney/Physician para o profissional
- Schema FAQPage na pagina de FAQ
- Schema BlogPosting em cada artigo
- Schema BreadcrumbList em sub-paginas
- H1 unico por pagina contendo keyword principal + cidade
- Meta description com CTA em todas as paginas
- Sitemap.xml automatico e atualizado
- robots.txt configurado corretamente
- Imagens com alt text contendo keywords locais
- Links internos entre blog e paginas de especialidade
- Geo meta tags (ICBM, geo.position, geo.placename)
- NAP (Nome, Endereco, Telefone) consistente em todas as paginas

---

### Etapa 13 — Correcoes de SEO

| Campo | Detalhe |
|-------|---------|
| Agente | `@dev` |
| Comando | Implementacao dos itens do relatorio de SEO |
| Input | `seo-audit-complete.md` |
| Output | Codigo corrigido + `docs/seo-re-audit.md` |
| Tempo estimado | 1 a 2 horas |
| Paralelo com | Nenhuma |

---

### Etapa 14 — Medicao Lighthouse

| Campo | Detalhe |
|-------|---------|
| Agente | `@qa` ou `@dev` |
| Comando | Rodar Lighthouse CLI ou via DevTools; documentar scores |
| Input | Site em ambiente de producao (Vercel ou similar) |
| Output | Scores documentados: Performance / Accessibility / Best Practices / SEO — meta: 90+/100/100/95+ |
| Tempo estimado | 30 minutos |
| Paralelo com | Nenhuma |

---

### Etapa 15 — Otimizacao de Performance

| Campo | Detalhe |
|-------|---------|
| Agente | `@dev` |
| Comando | Implementacao das recomendacoes do Lighthouse (se Performance < 90) |
| Input | Relatorio Lighthouse |
| Output | Imagens otimizadas, fontes com `font-display: swap`, CLS corrigido, LCP otimizado |
| Tempo estimado | 1 a 3 horas (varia conforme score inicial) |
| Paralelo com | Nenhuma |

**Notas:** Se o site ja estiver acima de 90 em Performance, esta etapa pode ser reduzida ou pulada.

---

### Etapa 16 — Brownfield Discovery (10 fases)

| Campo | Detalhe |
|-------|---------|
| Agente | `@architect` + `@ux-design-expert` + `@data-engineer` + `@qa` + `@analyst` + `@pm` |
| Comando | Workflow completo de Brownfield Discovery conforme `.aiox-core/development/workflows/brownfield-enhancement.yaml` |
| Input | Site completo e funcionando |
| Output | `docs/architecture/system-architecture.md`, `docs/architecture/frontend-spec.md`, `docs/architecture/technical-debt-assessment.md`, `docs/architecture/TECHNICAL-DEBT-REPORT.md` — e um novo conjunto de epics e stories para melhorias |
| Tempo estimado | 4 a 6 horas |
| Paralelo com | Etapas 17-20 dependem deste output |

**Notas:** Esta etapa e opcional para sites simples (menos de 10 paginas, sem painel admin). E obrigatoria quando o cliente solicitar painel de gestao de conteudo, integracao com sistemas externos ou quando o site tiver escopo acima de 15 paginas.

**As 10 fases do Brownfield Discovery:**
1. `@architect` — levantamento de arquitetura existente
2. `@data-engineer` — auditoria de schema e banco de dados (se houver)
3. `@ux-design-expert` — especificacao do frontend atual
4. `@architect` — rascunho de divida tecnica
5. `@data-engineer` — revisao especializada de banco
6. `@ux-design-expert` — revisao especializada de UX
7. `@qa` — gate de qualidade (APPROVED / NEEDS WORK)
8. `@architect` — documento final de divida tecnica
9. `@analyst` — relatorio executivo
10. `@pm` — novos epics e stories prontos para desenvolvimento

---

### Etapa 17 — Implementacao do Painel Admin

| Campo | Detalhe |
|-------|---------|
| Agente | `@dev` |
| Comando | `*develop [Story 7.x / 8.x / 9.x / 10.x]` (epics gerados no Brownfield) |
| Input | Stories do Brownfield Discovery, estudo de CMS feito pelo `@analyst` |
| Output | Painel admin com login JWT, CRUD de conteudo, integracao com repositorio (GitHub API + Vercel rebuild) |
| Tempo estimado | 4 a 8 horas |
| Paralelo com | Nenhuma |

**Notas:** Esta etapa e opcional. E recomendada apenas quando o cliente precisar gerir conteudo sem acesso ao codigo. Para clientes sem perfil tecnico, considere uma interface mais simples (ex.: Google Sheets + webhook).

---

### Etapa 18 — Apresentacao + Precificacao + Contrato

| Campo | Detalhe |
|-------|---------|
| Agente | `@pm` + `@analyst` |
| Comando | Prompt livre: "Gere apresentacao, precificacao e contrato para o projeto {cliente}" |
| Input | Todos os documentos do projeto, pesquisa de mercado (Etapa 1) |
| Output | `docs/apresentacao-{cliente}.md` (ou .html), `docs/precificacao-{cliente}.md`, `docs/contrato-servico-{cliente}.md` |
| Tempo estimado | 2 a 3 horas |
| Paralelo com | Pode rodar em paralelo com Etapa 17 |

**Documentos gerados:**
- **Apresentacao:** Resumo executivo do projeto para o cliente (o que foi construido, tecnologia, diferenciais)
- **Precificacao:** Analise de mercado com 3 faixas (Conservador / Recomendado / Premium), ROI estimado, argumentos de venda
- **Contrato:** Minuta completa com objeto, escopo, valores, prazos, responsabilidades, garantia, suporte e clausulas especificas do segmento

---

### Etapa 19 — Estrategia de Marketing + Criativos

| Campo | Detalhe |
|-------|---------|
| Agente | `@analyst` (com papel de Traffic Masters / Copy Chief) |
| Comando | Prompt especializado em marketing digital para o segmento |
| Input | Site completo, dados do cliente, restricoes do conselho profissional |
| Output | `docs/estrategia-trafego-pago-{cliente}.md` (Google Ads + Meta Ads), `docs/criativos-textos-{cliente}.md` (copies para ads, posts, WhatsApp), `docs/estrategia-depoimentos-{cliente}.md` |
| Tempo estimado | 2 a 3 horas |
| Paralelo com | Etapa 17 ou 18 |

**Notas:** A estrategia de marketing deve ser 100% aderente ao codigo de etica do conselho profissional. Para advogados: Provimento OAB 205/2021. Para medicos: CFM 1974/2011. Para dentistas: CFO 196/2019. Para contadores: CFC NBC PG 100.

---

### Etapa 20 — Deploy em Producao

| Campo | Detalhe |
|-------|---------|
| Agente | `@devops` |
| Comando | `git push` para branch main + verificacao do deploy na Vercel |
| Input | Repositorio com todos os fixes aplicados + variaveis de ambiente configuradas |
| Output | Site em ar no dominio definitivo (ou subdominio provisorio), URL de producao documentada |
| Tempo estimado | 30 minutos a 1 hora |
| Paralelo com | Nenhuma |

**Checklist pre-deploy:**
- Variaveis de ambiente configuradas na Vercel (ADMIN_PASSWORD, JWT_SECRET, API keys, etc.)
- Dominio personalizado apontado (DNS TTL verificado)
- HTTPS ativo (certificado SSL da Vercel automatico)
- Google Analytics configurado e testado
- Sitemap submetido ao Google Search Console
- Google Meu Negocio criado ou atualizado com URL do site

---

## PARTE 2 — CHECKLIST DE INICIO DE PROJETO

### 2.1 Perguntas para a Primeira Conversa

Use esta lista na reuniao de discovery com o cliente:

**Sobre o profissional:**
1. Qual seu nome completo e numero de registro no conselho (OAB, CRM, CRO, CRC)?
2. Qual sua especialidade principal? Ha sub-especialidades?
3. Em qual cidade e bairro voce atende?
4. Ha quanto tempo exerce a profissao?
5. Atende presencialmente, online ou ambos?

**Sobre o negocio:**
6. Qual o publico-alvo principal? (ex.: familias de renda media, empresas, gestantes)
7. Quais sao os 3 servicos que mais quer atrair pelo site?
8. Voce tem concorrentes que admira o site? Pode me mostrar exemplos?
9. Ja tem site? Se sim, o que nao gosta nele?
10. Tem Google Meu Negocio? Com avaliacao?

**Sobre identidade visual:**
11. Tem logo? Se sim, pode enviar em vetor (SVG ou AI)?
12. Tem paleta de cores definida? Ou esta aberto a sugestoes?
13. Tem foto profissional de qualidade? (minimo 800x800px, fundo neutro)
14. Tem preferencia de estilo: mais classico/sober ou mais moderno/colorido?

**Sobre conteudo:**
15. Tem textos prontos das suas areas de atuacao? Ou quer que eu gere?
16. Quer blog? Se sim, tem disponibilidade para revisar artigos mensalmente?
17. Tem depoimentos de clientes? (com autorizacao expressa)

**Sobre prazo e investimento:**
18. Qual a data ideal de lancamento?
19. Qual a faixa de investimento que esta considerando?
20. Vai querer suporte apos o lancamento (manutencao mensal)?

---

### 2.2 Dados Minimos Necessarios para Comecar

Antes de iniciar o desenvolvimento, o cliente deve fornecer:

| Dado | Formato | Onde Usar |
|------|---------|-----------|
| Nome completo | Texto | Header, footer, todas as paginas |
| Numero de registro profissional | Texto (ex.: OAB/SP 123.456) | Trust bar, footer, schema markup |
| Especialidade(s) | Lista | Paginas de servico, meta descriptions |
| Endereco completo | Texto + CEP | Pagina contato, schema LocalBusiness, Google Maps |
| Telefone / WhatsApp | Formato (11) 9XXXX-XXXX | Widget WhatsApp, contato, schema |
| Email profissional | email@dominio.com | Formulario, contato |
| Redes sociais | URLs completas | Footer, links Open Graph |
| Foto profissional | JPG/PNG minimo 800x800px | Hero, pagina Sobre, Open Graph |
| Logo | SVG preferencial | Header, favicon, footer |

**Dados que podem ser coletados depois (nao bloqueiam o inicio):**
- Dominio definitivo (.com.br, .adv.br, .med.br, etc.)
- Google Analytics Measurement ID
- Foto de escritorio / ambiente de trabalho
- Depoimentos de clientes
- Artigos para o blog

---

### 2.3 Template de Briefing

```
BRIEFING — SITE PROFISSIONAL
=============================
Data: [DATA]
Cliente: [NOME]
Segmento: [ ] Advocacia  [ ] Medicina  [ ] Odontologia  [ ] Contabilidade  [ ] Outro: ___

1. DADOS PROFISSIONAIS
   Nome completo: ___
   Especialidade: ___
   Registro no conselho: ___
   Anos de experiencia: ___

2. LOCALIZACAO
   Endereco de atendimento: ___
   Cidade/Bairro: ___
   Atendimento online: [ ] Sim  [ ] Nao

3. CONTATO
   WhatsApp: ___
   Email: ___
   Instagram: ___
   LinkedIn: ___

4. SERVICOS (listar os 5 principais):
   1. ___
   2. ___
   3. ___
   4. ___
   5. ___

5. PUBLICO-ALVO
   Descricao: ___
   Faixa de renda: ___
   Principal dor/problema que voce resolve: ___

6. IDENTIDADE VISUAL
   Tem logo: [ ] Sim (formato: ___) [ ] Nao
   Tem paleta de cores: [ ] Sim (quais: ___) [ ] Nao
   Estilo: [ ] Classico/sober  [ ] Moderno  [ ] Colorido  [ ] Minimalista
   Referencia de site que gosta: ___

7. CONTEUDO
   Tem textos proprios: [ ] Sim  [ ] Nao (geraremos)
   Quer blog: [ ] Sim  [ ] Nao
   Tem depoimentos com autorizacao: [ ] Sim (quantos: ___)  [ ] Nao

8. PRAZOS E INVESTIMENTO
   Data ideal de lancamento: ___
   Faixa de investimento considerada: R$ ___
   Quer manutencao mensal: [ ] Sim  [ ] Nao

9. OBSERVACOES ADICIONAIS
   ___
```

---

## PARTE 3 — DOCUMENTOS GERADOS POR PROJETO

Lista completa. Todos devem ser criados, exceto os marcados como opcionais.

| # | Documento | Gerado por | Path sugerido | Obrigatorio? |
|---|-----------|-----------|--------------|-------------|
| 1 | Pesquisa de mercado | `@analyst` | `docs/pesquisa-mercado-{cliente}.md` | Sim |
| 2 | PRD | `@pm` | `docs/prd-site-{cliente}.md` | Sim |
| 3 | Arquitetura tecnica | `@architect` | `docs/architecture-site-{cliente}.md` | Sim |
| 4 | Guia de UX / Design | `@ux-design-expert` | `docs/ux-guide-site-{cliente}.md` | Sim |
| 5 | Guia de criativos e design | `@ux-design-expert` | `docs/ux-criativos-design-{cliente}.md` | Sim |
| 6 | Stories (Epics 1-4) | `@sm` + `@po` | `docs/stories/active/{epic}.{story}.story.md` | Sim |
| 7 | Relatorio de QA completo | `@qa` | `docs/qa/qa-full-test-report.md` | Sim |
| 8 | Relatorio de QA final | `@qa` | `docs/qa/qa-final-report.md` | Sim |
| 9 | Auditoria de seguranca | `@architect` | `docs/security/security-audit-report.md` | Sim |
| 10 | Relatorio de reteste de seguranca | `@architect` | `docs/security/security-retest-report.md` | Sim |
| 11 | Relatorio de seguranca final | `@architect` | `docs/security/security-final-report.md` | Sim |
| 12 | Auditoria SEO completa | `@analyst` | `docs/seo-audit-complete.md` | Sim |
| 13 | Relatorio de re-auditoria SEO | `@analyst` | `docs/seo-re-audit.md` | Sim |
| 14 | Arquitetura do sistema (Brownfield) | `@architect` | `docs/architecture/system-architecture.md` | Quando escopo > 15 pags |
| 15 | Especificacao de frontend (Brownfield) | `@ux-design-expert` | `docs/architecture/frontend-spec.md` | Quando escopo > 15 pags |
| 16 | Avaliacao de divida tecnica (Brownfield) | `@architect` | `docs/architecture/technical-debt-assessment.md` | Quando escopo > 15 pags |
| 17 | Relatorio executivo de divida (Brownfield) | `@analyst` | `docs/architecture/TECHNICAL-DEBT-REPORT.md` | Quando escopo > 15 pags |
| 18 | Estudo de painel admin / CMS | `@analyst` | `docs/estudo-painel-admin-{cliente}.md` | Quando cliente pede admin |
| 19 | Guia de imagens para blog | `@ux-design-expert` | `docs/ux-blog-image-guide.md` | Se tiver blog |
| 20 | Estrategia de depoimentos | `@analyst` / `@pm` | `docs/estrategia-depoimentos-{cliente}.md` | Sim |
| 21 | Estrategia de trafego pago | `@analyst` | `docs/estrategia-trafego-pago-{cliente}.md` | Sim |
| 22 | Criativos e textos | `@analyst` | `docs/criativos-textos-{cliente}.md` | Sim |
| 23 | Apresentacao do projeto | `@pm` | `docs/apresentacao-projeto-{cliente}.md` | Sim |
| 24 | Precificacao com analise de mercado | `@analyst` + `@pm` | `docs/precificacao-site-{cliente}.md` | Sim |
| 25 | Contrato de prestacao de servicos | `@pm` | `docs/contrato-servico-site-{cliente}.md` | Sim |
| 26 | Guia de acessibilidade | `@architect` | `docs/architect-accessibility-guidelines.md` | Sim |
| 27 | Correcoes de contraste UX | `@ux-design-expert` | `docs/ux-contrast-fixes.md` | Se necessario |
| 28 | Correcoes mobile de legibilidade | `@ux-design-expert` | `docs/ux-mobile-readability-fix.md` | Se necessario |

---

## PARTE 4 — ESTIMATIVA PADRAO

### 4.1 Tempo Total por Tipo de Projeto

| Tipo de Site | Paginas | Epics | Tempo Total Estimado | Inclui Brownfield? |
|-------------|---------|-------|---------------------|-------------------|
| **Site Basico** | 8-10 | 2 | 15 a 25 horas | Nao |
| **Site Padrao** | 15-20 | 3-4 | 30 a 45 horas | Opcional |
| **Site Premium** | 20-30 | 4-6 | 50 a 80 horas | Sim |
| **Site Premium + Admin** | 25-35 | 6-10 | 70 a 100 horas | Sim |

> O projeto Gislaine Rodrigues se enquadrou no tier **Site Premium + Admin** com ~80 horas de trabalho efetivo distribuidas ao longo de 2 dias de sessoes intensivas com AIOX.

---

### 4.2 Precificacao Sugerida por Tier

Baseado na pesquisa de mercado do segmento juridico (marco 2026), extrapolada para outros profissionais liberais:

| Tier | Criacao (unico) | Manutencao Mensal | Conteudo Mensal (2 artigos) |
|------|----------------|------------------|----------------------------|
| **Basico** | R$ 2.000 a R$ 3.500 | R$ 150 a R$ 200 | R$ 350 a R$ 450 |
| **Padrao** | R$ 3.500 a R$ 5.500 | R$ 200 a R$ 300 | R$ 450 a R$ 650 |
| **Premium** | R$ 5.500 a R$ 8.000 | R$ 300 a R$ 450 | R$ 650 a R$ 850 |
| **Premium + Admin** | R$ 7.500 a R$ 12.000 | R$ 400 a R$ 600 | R$ 750 a R$ 1.200 |

**Regra de ouro:** Um unico cliente captado pelo site ja paga o investimento inicial. Para advogados, medicos e dentistas, o ticket medio por cliente e de R$ 3.000 a R$ 20.000+. O site se paga no primeiro mes.

**Modelo de pagamento recomendado:** 50% na assinatura do contrato + 50% na entrega do site em producao.

---

### 4.3 O Que Incluir vs. Nao Incluir

#### Incluido por padrao (todos os tiers):

- Desenvolvimento Next.js com App Router (SSG)
- TypeScript + Tailwind CSS
- Paginas: Home, Sobre, Contato, FAQ, Privacidade
- Formulario de contato com protecao anti-spam (honeypot)
- Widget WhatsApp com mensagem pre-configurada
- Banner de cookies e conformidade LGPD basica
- SEO tecnico: meta tags, Open Graph, sitemap.xml, robots.txt
- Schema markup basico (LocalBusiness + profissional especifico)
- Google Analytics 4
- Deploy e configuracao na Vercel
- HTTPS via Vercel (automatico)
- Responsividade mobile-first
- 90 dias de garantia contra bugs
- Entrega do repositorio ao cliente

#### Incluido nos tiers Padrao e acima:

- Blog com sistema de arquivos MDX (sem CMS externo)
- Artigos iniciais para o blog (minimo 3)
- Paginas de especialidade (uma por area de atuacao)
- Fotos de banco de imagem para areas e blog (Unsplash, sem credito visivel)
- Schema markup avancado (FAQPage, BlogPosting, BreadcrumbList, Service)
- Auditoria de seguranca com report
- Auditoria de SEO com report
- Medicao Lighthouse com meta 90+/100/100/95+

#### Incluido apenas no tier Premium:

- Conformidade regulatoria especifica (OAB, CFM, CFC, CFO)
- Auditoria de acessibilidade WCAG AA/AAA
- Rate limiting nos endpoints de API
- Headers de seguranca avancados (HSTS, CSP sem unsafe-eval)
- Geo meta tags para SEO local
- Schema markup completo (SearchAction, ContactPage)
- Estrategia de depoimentos (template de coleta, pagina dedicada)
- Apresentacao do projeto para o cliente
- Precificacao com analise de mercado e ROI
- Minuta de contrato de prestacao de servicos

#### Incluido apenas no tier Premium + Admin:

- Painel administrativo (/admin) com login JWT
- CRUD de conteudo (depoimentos, artigos, etc.)
- Integracao GitHub API para commit automatico → Vercel rebuild
- Brownfield Discovery completo (10 fases, 20+ documentos)
- Stories adicionais de melhorias identificadas
- Estudo de CMS e recomendacao tecnica

#### Nao incluido (cobrar a parte ou como extra):

- Registro e renovacao de dominio personalizado (responsabilidade do cliente)
- Foto profissional (cliente deve contratar fotografo ou fornecer)
- Logo vetorial (cliente deve fornecer ou contratar designer)
- Google Meu Negocio (configuracao orientada, execucao pelo cliente)
- Google Search Console (setup orientado, acesso pelo cliente)
- Resend API key para formulario de email (conta no nome do cliente)
- Campanhas de Google Ads ou Meta Ads (estrategia inclusa, execucao cobrada a parte)
- Artigos mensais apos entrega (pacote de conteudo mensal separado)
- Integracao com sistemas externos (CRM, agendamento, etc.)

---

## PARTE 5 — STACK PADRAO

### 5.1 Stack Recomendada para Sites Profissionais

Esta e a stack validada em producao com Lighthouse 96/100/100/100.

| Camada | Tecnologia | Versao | Justificativa |
|--------|-----------|--------|--------------|
| Framework | Next.js (App Router, SSG) | 15.x+ | SEO nativo, performance superior, sem custo de servidor |
| Linguagem | TypeScript | 5.x | Manutencao de longo prazo, menos bugs |
| Estilo | Tailwind CSS | 3.4.x ou 4.x | Desenvolvimento rapido, design system embutido |
| Conteudo/Blog | MDX + sistema de arquivos | — | Sem dependencia de CMS externo, zero custo |
| Hosting | Vercel (plano Hobby) | — | Gratuito para trafego moderado, SSL automatico, deploy em 1 click |
| Analytics | Google Analytics 4 | — | Padrao de mercado, gratuito |
| Email | Resend | — | API moderna, plano gratuito ate 3.000 emails/mes |
| WhatsApp | Widget customizado (zero deps) | — | Sem SDK externo, leve, contextual por pagina |
| Mapas | Google Maps Embed (iframe) | — | Sem API key necessaria para embed basico |
| Imagens | next/image (WebP automatico) | — | Otimizacao automatica, lazy loading |
| Seguranca | jose (JWT) + rate limiting customizado | — | Para painel admin quando necessario |
| Sanitizacao | isomorphic-dompurify | — | Protecao contra XSS em inputs |
| Schema | JSON-LD em componente React | — | Schema markup sem lib externa |

**Custo mensal de infraestrutura em producao:** R$ 0 (Vercel Hobby) a R$ 100 (Vercel Pro para trafego alto).

---

### 5.2 Alternativas por Perfil de Cliente

#### Cliente com orcamento limitado (Tier Basico)

| Camada | Alternativa | Tradeoff |
|--------|-----------|---------|
| Hosting | Netlify (gratuito) | Sem edge functions, deploy um pouco mais lento |
| Analytics | Plausible (open source) | Mais privado, mas menos recursos |
| Email | FormSubmit.co | Zero config, menos controle |
| Blog | Sem blog | Menos conteudo, SEO mais lento |

---

#### Cliente que ja tem equipe de marketing com CMS

| Camada | Alternativa | Tradeoff |
|--------|-----------|---------|
| Conteudo | Keystatic (git-based CMS) | Interface visual para editar conteudo sem codigo |
| Conteudo | Sanity.io (plano gratuito) | CMS headless com studio visual, ideal para times |
| Conteudo | Google Sheets + API | Mais simples, apenas para dados estruturados (depoimentos, FAQ) |

---

#### Cliente com volume alto (clinica, escritorio com varios advogados)

| Camada | Alternativa | Tradeoff |
|--------|-----------|---------|
| Hosting | Vercel Pro (R$ 100/mes) | Suporte, analytics avancado, mais largura de banda |
| Banco de dados | Supabase (plano gratuito) | Para formularios com historico, agendamentos |
| Autenticacao | Supabase Auth | Para areas exclusivas de clientes |
| Email marketing | Resend + React Email | Sequencias automatizadas de follow-up |

---

#### Cliente que prefere WordPress (nao recomendado, mas possivel)

| Camada | Alternativa | Tradeoff |
|--------|-----------|---------|
| Framework | WordPress | Maior custo de manutencao, seguranca inferior, performance 3-10x pior |
| Hosting | Hostinger ou LocalWeb | R$ 25-80/mes com servidor dedicado |
| Tema | Divi ou Elementor | Custo de licenca anual, atualizacoes constantes |
| Seguranca | Wordfence + Sucuri | Custo adicional, atualizacoes frequentes |

> Nota: WordPress para profissionais liberais e adequado para clientes que querem autonomia total de edicao e aceitam performance inferior. Para qualquer cliente que priorize SEO local e velocidade, Next.js na Vercel e tecnicamente superior e, com AIOX, entregue em tempo comparavel.

---

### 5.3 Estrutura de Rotas Padrao

```
/                       → Home
/sobre                  → Sobre o profissional
/areas                  → Listagem de areas de atuacao
/areas/{especialidade}  → Pagina individual por area
/blog                   → Listagem de artigos
/blog/{slug}            → Artigo individual
/contato                → Formulario + mapa
/faq                    → Perguntas frequentes
/privacidade            → Politica de privacidade
/sitemap.xml            → Sitemap automatico (rota Next.js)
/robots.txt             → Arquivo robots (rota Next.js)
/opengraph-image        → Imagem OG dinamica (Edge runtime)
/admin                  → Painel administrativo (opcional, protegido)
```

---

## APENDICE — Variacoes por Segmento

### Advocacia

- **Schema especifico:** `LegalService`, `Attorney`
- **Restricao principal:** Provimento OAB 205/2021 — sem promessas de resultado, sem "melhor advogado", sem captacao agressiva
- **Areas tipicas:** Familia, Trabalhista, Civil, Previdenciario, Criminal, Empresarial
- **Diferencial de conversao:** WhatsApp contextual por area de atuacao com mensagem pre-redigida
- **Pagina extra recomendada:** Nao Atendo (delimita areas, reduz consultas fora do escopo)

### Medicina

- **Schema especifico:** `MedicalOrganization`, `Physician`, `MedicalSpecialty`
- **Restricao principal:** CFM 1974/2011 — sem propaganda enganosa, sem promessa de cura, sem preco de consulta
- **Areas tipicas:** Clinico Geral, Dermato, Ortopedia, Pediatria, Ginecologia, Cardiologia
- **Diferencial de conversao:** Agendamento online integrado (Doctoralia, Calendly) ou link direto WhatsApp
- **Pagina extra recomendada:** Convenios aceitos, Como e a consulta

### Odontologia

- **Schema especifico:** `Dentist`, `MedicalOrganization`
- **Restricao principal:** CFO 196/2019 — sem fotos de antes/depois sem autorizacao, sem promessa de resultado estetico
- **Areas tipicas:** Clinico Geral, Ortodontia, Implantes, Estetica, Endodontia
- **Diferencial de conversao:** Galeria de casos (com TCLE do paciente), depoimentos com foto
- **Pagina extra recomendada:** Tecnologias utilizadas, Primeiras consulta

### Contabilidade

- **Schema especifico:** `Accountant`, `FinancialService`
- **Restricao principal:** CFC NBC PG 100 — sem propaganda comparativa, sem valores de servicos em publicidade
- **Areas tipicas:** Contabilidade empresarial, Declaracao IR, MEI, Abertura de empresa, Folha de pagamento
- **Diferencial de conversao:** Calculadora de economia tributaria (componente interativo), depoimentos de empresas
- **Pagina extra recomendada:** Para quem e nosso servico (filtra perfil do cliente), Casos de sucesso

---

*Documento gerado por Bob (AIOX PM) em 2026-03-29.*
*Derivado integralmente do projeto site-gislaine — workflow validado em producao.*
*Versao 1.0 — replicavel para qualquer profissional liberal.*
