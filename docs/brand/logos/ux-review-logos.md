# UX Review -- Logos "Siga Bem"

**Revisora:** Uma (UX Design Expert)
**Data:** 2026-03-28
**Versao:** 1.0
**Documentos de referencia:**
- `docs/brand/siga-bem-brand-identity.md` (Conceito C recomendado)
- `docs/ux-guide-cegonheiros.md` (Design System)
- `docs/brand/siga-bem-logo-prompts.md` (Prompts originais)

---

## Resumo Executivo

As 5 logos SVG atuais **NAO seguem o Conceito C recomendado** (pin de localizacao + silhueta de cegonha minimalista + acento verde success). Em vez disso, todas usam um caminhao cegonha literal/detalhado como icone, sem o elemento pin de localizacao e sem o acento verde `#2D6A4F`. A revisao a seguir avalia cada logo nos seus proprios meritos e no alinhamento com a identidade visual aprovada.

---

## 1. siga-bem-logo-horizontal.svg

**Tipo:** Logo horizontal principal (icone rounded-square + wordmark + tagline)
**ViewBox:** 500 x 80

### 1.1 Design Quality: 6/10

**O que esta bom:**
- Separacao de cores entre "Siga" (#1B3A4B) e "Bem" (#2D6A8F) cria ritmo visual
- Tagline em letra-espacada comunica profissionalismo
- Icone em rounded-square tem boa presenca

**Problemas identificados:**
- O icone do caminhao cegonha dentro do rounded-square tem detalhes excessivos para o tamanho (72x72px): cabine, carroceria, para-brisa, 2 carros, 3 rodas com aro interno -- sao 11 elementos em 72px
- Os carros sobre o caminhao (#2D6A8F sobre #1B3A4B via fundo branco) criam confusao visual em tamanho real
- O para-brisa com opacity 0.5 e um detalhe desnecessario que nao escala
- A fonte usa `@import url()` para Google Fonts dentro do SVG -- isso cria dependencia de rede e FOUC (flash of unstyled content); se offline, o fallback e Arial
- O font-weight="800" (Extra Bold) e mais pesado que o especificado na brand identity (Inter Bold = 700)
- O espaco entre icone e texto (x="95" apos icone que termina em ~76) e de apenas 19px -- pouco respiro

**Correcoes sugeridas:**
1. Converter texto para paths (eliminar dependencia de Google Fonts)
2. Simplificar icone do caminhao: remover detalhes de aro interno das rodas, remover para-brisa, simplificar carros para formas mais abstratas
3. Aumentar espaco entre icone e texto de 19px para 28px (proporcao 1:0.4 da largura do icone)
4. Ajustar font-weight para 700 (conforme brand identity)

### 1.2 Reconhecibilidade: 5/10

- O caminhao cegonha e reconhecivel em tela cheia, mas os detalhes se perdem abaixo de 200px de largura total
- Em 100px de largura, o icone de 72px proporcional vira ~14px -- impossivel distinguir o caminhao
- Nao se destaca entre outros logos de apps por ser uma forma convencional (rounded-square + truck)

### 1.3 Consistencia com Brand Identity: 3/10

- **Cores:** Parcialmente corretas (#1B3A4B e #2D6A8F presentes), mas falta o acento verde #2D6A4F
- **Conceito C:** NAO segue. Sem pin de localizacao, sem silhueta minimalista de cegonha formada por linhas geometricas, sem acento verde
- **Tom:** Mais literal/ilustrativo do que o "moderno + minimalista" do Conceito C
- **Tipografia:** Font-weight incorreto (800 vs 700 especificado)

### 1.4 Usabilidade em Produto

| Contexto | Funciona? | Notas |
|----------|-----------|-------|
| Header desktop | Parcial | Tagline legivel, mas icone pequeno demais no header padrao (~40px altura) |
| Bottom nav mobile | Nao | Formato horizontal nao cabe; precisa de variante icon-only |
| PWA home screen | Nao | Formato errado (500x80 e horizontal, PWA precisa quadrado) |
| Favicon | Nao | Nao e a variante correta (este e horizontal) |
| Impressao (NF) | Parcial | Dependencia de web font impede renderizacao correta em PDF |

### 1.5 Score Total: 4.8/10

---

## 2. siga-bem-logo-full.svg

**Tipo:** Logo full com icone de estrada + caminhao no topo + wordmark
**ViewBox:** 400 x 100

### 2.1 Design Quality: 5/10

**O que esta bom:**
- A ideia da estrada em perspectiva com tracejado central tem potencial narrativo
- Separacao clara entre icone e texto
- Tracejados da estrada em #2D6A8F criam contraste sutil

**Problemas identificados:**
- O caminhao no topo da estrada e extremamente pequeno (~18x15px no SVG): 11 elementos graficos em uma area minuscula
- Os carros sobre o caminhao tem opacity 0.7 -- detalhe invisivel em uso real
- A estrada em perspectiva nao se conecta visualmente com o caminhao -- parecem dois icones separados
- O icone total (estrada + caminhao) ocupa ~52x82px no viewBox, criando desbalanco com o texto que comeca em x=70
- As rodas do caminhao (2.5px raio) viram pontos indistinguiveis em qualquer reducao
- Tagline "GESTAO DE FROTAS" esta incompleta (brand identity diz "GESTAO DE FROTAS DE CEGONHA" ou variantes)
- Mesmo problema de @import de Google Fonts

**Correcoes sugeridas:**
1. Remover o caminhao do topo da estrada (conceito visual confuso) e substituir pelo pin de localizacao do Conceito C
2. Se manter a estrada, simplificar para 2 linhas + 2 tracejados maximos
3. Converter fontes para paths
4. Corrigir tagline para versao completa ou adotar "Sua frota no controle"
5. Rebalancear proporcao icone:texto -- atualmente o icone e desproporcional

### 2.2 Reconhecibilidade: 4/10

- A estrada em perspectiva e reconhecivel, mas nao e unica (muitas marcas de transporte usam esse motivo)
- O caminhao no topo e praticamente invisivel em qualquer reducao
- Nao comunica "cegonha" especificamente -- poderia ser qualquer transportadora

### 2.3 Consistencia com Brand Identity: 3/10

- **Conceito C:** NAO segue. Usa estrada em perspectiva (mais proximo do Conceito A "Rota Digital")
- **Acento verde:** Ausente
- **Pin de localizacao:** Ausente
- **Tom:** A estrada perspectivada e mais "tech/abstracto" que o hibrido recomendado

### 2.4 Usabilidade em Produto

| Contexto | Funciona? | Notas |
|----------|-----------|-------|
| Header desktop | Parcial | 400x100 e largo demais para a maioria dos headers |
| Bottom nav mobile | Nao | Formato horizontal |
| PWA home screen | Nao | Formato errado |
| Favicon | Nao | Variante errada |
| Impressao (NF) | Parcial | Mesma dependencia de web font |

### 2.5 Score Total: 4.0/10

---

## 3. siga-bem-logo-dark.svg

**Tipo:** Versao dark/negativa da logo horizontal
**ViewBox:** 500 x 80

### 3.1 Design Quality: 6/10

**O que esta bom:**
- Fundo escuro (#0F1F2A) cria boa moldura para o icone
- Inversao de cores no icone (fundo #2D6A8F, detalhes #1B3A4B) funciona
- "Bem" em #5BA3D9 (azul mais claro) tem bom contraste sobre fundo escuro

**Problemas identificados:**
- A cor #5BA3D9 para "Bem" NAO faz parte da paleta oficial. A brand identity especifica #2D6A8F como secondary e nao define #5BA3D9 em nenhum lugar. Isso quebra consistencia
- O windshield opacity caiu de 0.5 (horizontal) para 0.4 -- inconsistencia entre variantes
- O fundo #0F1F2A nao esta na paleta oficial. A brand identity sugere #0D1B2A para fundo escuro
- Mesmos problemas estruturais do icone que a versao horizontal (complexidade excessiva)
- Mesma dependencia de Google Fonts

**Correcoes sugeridas:**
1. Substituir #5BA3D9 por uma cor da paleta oficial (#2D6A8F ou derivada documentada)
2. Substituir #0F1F2A por #0D1B2A (cor escura oficial da brand identity)
3. Manter opacity do windshield consistente entre variantes (ou melhor: remover o detalhe)
4. Todas as correcoes estruturais da versao horizontal se aplicam aqui

### 3.2 Reconhecibilidade: 5/10

- Mesma avaliacao da horizontal, com bonus leve pelo contraste do fundo escuro que destaca o icone

### 3.3 Consistencia com Brand Identity: 3/10

- Mesmos problemas da horizontal + cores fora da paleta (#5BA3D9, #0F1F2A)
- A brand identity especifica que a versao negativa deve ser "branco sobre fundo #1B3A4B ou #0D1B2A" -- o fundo usado (#0F1F2A) nao e nenhum desses

### 3.4 Usabilidade em Produto

| Contexto | Funciona? | Notas |
|----------|-----------|-------|
| Header desktop (dark mode) | Sim | Melhor variante para dark mode |
| Bottom nav mobile | Nao | Formato horizontal |
| PWA home screen | Nao | Formato errado |
| Favicon | Nao | Variante errada |
| Impressao (NF) | Parcial | Fundo escuro consome tinta; preferir versao clara para print |

### 3.5 Score Total: 4.5/10

---

## 4. siga-bem-logo-icon.svg

**Tipo:** Icone standalone (circulo com caminhao + estrada + iniciais "SB")
**ViewBox:** 120 x 120

### 4.1 Design Quality: 5/10

**O que esta bom:**
- Formato circular funciona para avatares e icones de app
- A estrada em perspectiva no fundo adiciona profundidade visual
- Iniciais "SB" na parte inferior fornecem identificacao textual minima

**Problemas identificados:**
- Tenta fazer demais em um espaco pequeno: circulo + estrada perspectivada + caminhao completo (com cabine, carroceria, para-brisa, 2 carros, 3 rodas) + iniciais "SB" -- sao 4 camadas de informacao
- As linhas da estrada com opacity 0.3 e 0.4 sao praticamente invisiveis sobre #1B3A4B
- O caminhao dentro do circulo tem os mesmos 11 elementos da versao horizontal, mas em espaco menor
- "SB" em font-size 22 com letter-spacing 2 compete com o caminhao por atencao -- hierarquia confusa
- Em 48px (tamanho de app icon real), o caminhao e as iniciais viram borroes indistinguiveis
- Novamente, @import de Google Fonts

**Correcoes sugeridas:**
1. Escolher UMA narrativa: ou caminhao, ou iniciais "SB" -- nao ambos
2. Remover a estrada em perspectiva (adiciona ruido sem valor em tamanho pequeno)
3. Se manter o caminhao: simplificar para 3-4 formas maximo (cabine + carroceria + 2 rodas)
4. Para uso como app icon, preferir o formato do Conceito C: pin com silhueta minimalista
5. Converter "SB" para path

### 4.2 Reconhecibilidade: 4/10

- Em tamanho real de app icon (48-64px), o conteudo e irreconhecivel
- As camadas sobrepostas (estrada + caminhao + texto) criam confusao visual
- Em 32px (home screen icon reduzido), vira um circulo escuro sem informacao legivel

### 4.3 Consistencia com Brand Identity: 2/10

- **Conceito C:** NAO segue em nada. Usa circulo (nao pin), usa estrada perspectivada, adiciona iniciais "SB" (nao previsto)
- **Acento verde:** Ausente
- **Pin de localizacao:** Ausente
- A brand identity especifica que o icone solo deve ser "pin com caminhao simplificado" -- este e "circulo com tudo dentro"

### 4.4 Usabilidade em Produto

| Contexto | Funciona? | Notas |
|----------|-----------|-------|
| Header desktop | Nao | Icon-only sem wordmark perde identificacao |
| Bottom nav mobile | Parcial | Formato quadrado correto, mas conteudo ilegivel em 24px |
| PWA home screen | Parcial | Formato correto (quadrado/circulo), conteudo complexo demais |
| Favicon | Nao | 120x120 viewBox nao otimizado para 16-32px |
| Impressao (NF) | Nao | Detalhes se perdem |

### 4.5 Score Total: 3.5/10

---

## 5. siga-bem-favicon.svg

**Tipo:** Favicon ultra-simplificado
**ViewBox:** 32 x 32

### 5.1 Design Quality: 7/10

**O que esta bom:**
- Dimensao correta para favicon (32x32)
- Rounded-square com rx="6" tem boa aparencia em abas de browser
- Simplificacao do caminhao e razoavel: corpo + cabine + 2 carros + 3 rodas = 7 elementos (vs 11 nos outros)
- Rodas sem aro interno (simplificacao correta para o tamanho)
- Fundo #1B3A4B fornece boa ancora visual

**Problemas identificados:**
- Ainda complexo demais para 16x16px (favicon.ico real): 7 elementos em 24x16px de area util
- Os carros sobre o caminhao (5x3px cada) sao praticamente retangulos indistinguiveis
- Sem nenhum acento de cor -- e monotonamente azul escuro + branco + azul medio
- O caminhao nao comunica "cegonha" especificamente neste tamanho; poderia ser qualquer caminhao
- Nao segue o Conceito C (deveria ser pin com preenchimento solido para 16px, ou pin com retangulo simplificado para 32px)

**Correcoes sugeridas:**
1. Para alinhamento com Conceito C: substituir caminhao por silhueta de pin de localizacao
2. Adicionar ponto verde (#2D6A4F) como acento de "ativo/online" conforme brand identity
3. Reduzir para 5 elementos maximo: fundo rounded-square + pin shape + ponto verde
4. Testar renderizacao real em 16x16px no browser (provavelmente os carros sao invisiveis)

### 5.2 Reconhecibilidade: 6/10

- Em 32px real, o rounded-square azul com forma branca interna e reconhecivel como "algum icone de app"
- Nao comunica "Siga Bem" especificamente -- poderia ser qualquer app de transporte
- Melhor que o icon.svg por ser genuinamente simplificado

### 5.3 Consistencia com Brand Identity: 3/10

- **Conceito C em 32px:** Deveria ser "pin + caminhao simplificado" conforme brand identity; em 16px deveria ser "silhueta do pin com preenchimento solido"
- **Acento verde:** Ausente (brand identity diz "todas as versoes mantem o ponto verde de acento")
- Cores basicas corretas (#1B3A4B, #2D6A8F)

### 5.4 Usabilidade em Produto

| Contexto | Funciona? | Notas |
|----------|-----------|-------|
| Header desktop | Nao | Favicon nao e para header |
| Bottom nav mobile | Parcial | Poderia funcionar, mas sem identificacao da marca |
| PWA home screen | Parcial | Muito simplificado para 192px, bom para 32-48px |
| Favicon | Sim | Dimensao correta, funcional |
| Impressao (NF) | Nao | Muito pequeno |

### 5.5 Score Total: 5.0/10

---

## Quadro Comparativo

### Scores por Criterio

| Criterio | Horizontal | Full | Dark | Icon | Favicon |
|----------|-----------|------|------|------|---------|
| Design Quality | 6 | 5 | 6 | 5 | 7 |
| Reconhecibilidade | 5 | 4 | 5 | 4 | 6 |
| Brand Identity | 3 | 3 | 3 | 2 | 3 |
| **Media** | **4.7** | **4.0** | **4.7** | **3.7** | **5.3** |

### Ranking

| Posicao | Logo | Score | Veredicto |
|---------|------|-------|-----------|
| 1 | **siga-bem-favicon.svg** | 5.3/10 | Melhor simplificacao, mas precisa alinhar com Conceito C |
| 2 | **siga-bem-logo-horizontal.svg** | 4.7/10 | Estrutura utilizavel, icone precisa ser refeito |
| 2 | **siga-bem-logo-dark.svg** | 4.7/10 | Mesma estrutura, cores fora da paleta |
| 4 | **siga-bem-logo-full.svg** | 4.0/10 | Conceito confuso (estrada + caminhao), refazer |
| 5 | **siga-bem-logo-icon.svg** | 3.7/10 | Tenta fazer demais, hierarquia quebrada, refazer |

---

## Problemas Globais (todas as logos)

### P1: Nenhuma logo segue o Conceito C aprovado
**Severidade:** CRITICA

O documento de brand identity recomenda e aprova o Conceito C "Caminho Digital" com score 30/35:
- Pin de localizacao como forma externa
- Silhueta minimalista de cegonha dentro do pin (3-4 linhas geometricas)
- Acento verde #2D6A4F na base do pin
- Tipografia: "Siga" em Inter Bold (700), "Bem" em Inter Medium (500)

**Nenhuma das 5 logos implementa esses elementos.** Todas usam caminhao cegonha literal/detalhado em vez de silhueta minimalista dentro de pin.

### P2: Dependencia de Google Fonts via @import no SVG
**Severidade:** ALTA

Todos os SVGs com texto usam `@import url('https://fonts.googleapis.com/css2?family=Inter...')`. Isso causa:
- Falha de renderizacao offline (motoristas frequentemente sem conexao)
- FOUC (flash of unstyled content) durante carregamento
- Dependencia externa para um asset critico de marca

**Correcao:** Converter todo texto para `<path>` (outline). SVGs de marca nunca devem depender de fontes externas.

### P3: Complexidade excessiva do icone
**Severidade:** ALTA

O caminhao cegonha em todas as variantes tem 7-11 elementos graficos (cabine, carroceria, para-brisa, carros, rodas com aros). O Conceito C especifica "3-4 linhas geometricas simples". Isso impacta:
- Escalabilidade (ilegivel abaixo de 48px)
- Performance de renderizacao
- Reproducao em impressao

### P4: Acento verde ausente
**Severidade:** MEDIA

A brand identity especifica #2D6A4F (success/verde) como acento obrigatorio em todas as versoes, comunicando "tudo certo, siga bem" e servindo como indicador de "ativo/online". Nenhuma logo inclui essa cor.

### P5: Cores fora da paleta (versao dark)
**Severidade:** MEDIA

- `#5BA3D9` (cor de "Bem" na versao dark) nao existe na paleta
- `#0F1F2A` (fundo da versao dark) nao e o `#0D1B2A` especificado

---

## Alinhamento com Conceito C -- Gap Analysis

| Elemento do Conceito C | Status Atual | Gap |
|------------------------|-------------|-----|
| Pin de localizacao como forma externa | Ausente | TOTAL -- nenhuma logo usa pin |
| Silhueta minimalista de cegonha (3-4 linhas) | Substituida por caminhao literal (7-11 elementos) | TOTAL |
| Cegonha "aponta" para a direita | Cegonha aponta para a esquerda (cabine a esquerda) | INVERTIDO |
| Base do pin vira seta | Nao existe pin | TOTAL |
| Acento verde #2D6A4F | Ausente | TOTAL |
| "Siga" Inter Bold (700) | Font-weight 800 | PARCIAL |
| "Bem" Inter Medium (500) | Font-weight 800 (horizontal) ou 800 com cor diferente | PARCIAL |
| Proporcao icone:texto 1:2.5 | Nao mensuravel (icone e caminhao, nao pin) | N/A |
| Versao simplificada < 24px (pin + retangulo) | Nao existe | TOTAL |
| Pin solido em 16px | Nao existe | TOTAL |
| Ponto verde em todas as versoes | Nao existe | TOTAL |

**Conclusao:** As logos atuais representam uma implementacao completamente diferente do conceito aprovado. Sao mais proximas do Conceito B (Estrada Segura / rodoviario literal) ou de uma abordagem propria nao documentada.

---

## Recomendacao Final

### Variantes a MANTER (com correcoes):

1. **siga-bem-logo-horizontal.svg** -- Manter a estrutura geral (icone + wordmark + tagline), mas SUBSTITUIR o icone por pin + cegonha minimalista conforme Conceito C
2. **siga-bem-logo-dark.svg** -- Manter como variante negativa, aplicar mesma substituicao de icone + corrigir cores para paleta oficial
3. **siga-bem-favicon.svg** -- Manter a abordagem de simplificacao, mas redesenhar com silhueta de pin

### Variantes a REFAZER completamente:

4. **siga-bem-logo-full.svg** -- Conceito visual confuso (estrada + caminhao), substituir por versao vertical empilhada do Conceito C (pin acima + "Siga Bem" abaixo)
5. **siga-bem-logo-icon.svg** -- Complexidade excessiva para icon-only, refazer como pin com cegonha minimalista sem texto "SB"

### Lista de Correcoes Prioritarias (ordenada por impacto)

| Prioridade | Correcao | Logos Afetadas | Esforco |
|------------|----------|----------------|---------|
| P0 | Redesenhar icone como pin + cegonha minimalista (Conceito C) | TODAS | Alto |
| P0 | Converter texto para paths (remover @import de fonts) | Horizontal, Full, Dark, Icon | Medio |
| P1 | Adicionar acento verde #2D6A4F em todas as variantes | TODAS | Baixo |
| P1 | Corrigir font-weight: "Siga" Bold 700, "Bem" Medium 500 | Horizontal, Full, Dark | Baixo |
| P2 | Corrigir cores da versao dark (#0D1B2A fundo, remover #5BA3D9) | Dark | Baixo |
| P2 | Criar versao simplificada progressiva (32px, 24px, 16px) | Favicon, Icon | Medio |
| P3 | Inverter direcao da cegonha (apontar para a direita = progresso) | TODAS | Baixo |
| P3 | Renomear logo-full para logo-stacked (reflete melhor o layout vertical) | Full | Trivial |

### Variantes faltando (necessarias segundo brand identity)

| Variante | Descricao | Prioridade |
|----------|-----------|------------|
| Monocromatica | Tudo em #1B3A4B, sem acento verde | P2 |
| Versao vertical/empilhada | Pin acima + "Siga Bem" abaixo | P1 |
| Versao ultra-simplificada 16px | Silhueta de pin preenchido solido | P1 |
| Marca d'agua | Versao com opacidade reduzida para sobreposicao | P3 |

---

## Proximos Passos

1. Validar este review com o time de design (@design-chief)
2. Criar novos SVGs seguindo o Conceito C aprovado
3. Testar renderizacao em tamanhos reais (16px, 32px, 48px, 192px)
4. Validar acessibilidade de contraste em todos os fundos previstos
5. Converter todos os textos para paths antes de publicar

---

*-- Uma, desenhando com empatia*
