# Siga Bem - Redesign Specification

> Alinhamento das 4 variantes de logo ao padrao visual aprovado (Stacked/Marketing).

---

## Referencia Aprovada: `siga-bem-logo-full.svg`

**NAO MODIFICAR.** Este arquivo e a fonte da verdade.

### Anatomia da logo aprovada (viewBox 320x120)

| Elemento | Descricao | Coordenadas/Dimensoes | Cor |
|----------|-----------|----------------------|-----|
| Pin shape | Forma de pin grande com ponta inferior | path d="M50 6 C30 6 14 22 14 42 C14 66 50 110 50 110 C50 110 86 66 86 42 C86 22 70 6 50 6Z" (translate 40,2) | fill `#1B3A4B` |
| Anel verde | Circulo no interior do pin | cx=50 cy=38 r=26 | stroke `#2D6A4F` stroke-width=3 |
| Cegonha | Silhueta minimalista do caminhao cegonha | translate(30,26) dentro do pin group | stroke `#ffffff` |
| Corpo caminhao | Linha horizontal com cabine | stroke-width=2.5, stroke-linecap=round | `#ffffff` |
| Carros no topo | 2 retangulos verticais sobre o corpo | stroke-width=2 | `#ffffff` |
| Rodas | 2 circulos nas extremidades inferiores | r=3 | fill `#2D6A4F` |
| "Siga" | Texto empilhado, primeira linha | x=152 y=52, font-size=36, font-weight=800 | `#1B3A4B` |
| "Bem" | Texto empilhado, segunda linha | x=152 y=86, font-size=36, font-weight=800 | `#2D6A8F` |
| Ponto verde | Acento apos "Bem" | cx=247 cy=80 r=4 | fill `#2D6A4F` |
| Tagline | "SUA FROTA NO CONTROLE" | x=152 y=104, font-size=9, font-weight=600, letter-spacing=2 | `#4A6274` |

### Paleta de cores da marca

| Nome | Hex | Uso |
|------|-----|-----|
| Navy Dark | `#1B3A4B` | Pin fill, texto "Siga", backgrounds escuros |
| Green Brand | `#2D6A4F` | Anel, rodas, ponto de acento |
| Blue Medium | `#2D6A8F` | Texto "Bem", pin fill no dark mode |
| Gray Tagline | `#4A6274` | Tagline no modo claro |
| Gray Tagline Dark | `#8FAAB8` | Tagline no modo escuro |
| White | `#ffffff` | Cegonha, texto no dark mode |

### Tipografia

```
font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif
```

Sem `@import`. System font stack nativo.

### Principios de consistencia (aplicar em TODAS as variantes)

1. O **pin** e sempre o elemento central e mais reconhecivel
2. O **anel verde** aparece em todas as variantes (adaptado ao tamanho)
3. As **rodas verdes** sao o detalhe identitario (presentes onde couberem)
4. A **cegonha minimalista** e reconhecivel em todos os tamanhos
5. Todos os SVGs possuem `role="img"` e `<title>` com ID unico
6. Proporcoes da cegonha DENTRO do pin respeitam o padrao aprovado

---

## 1. `siga-bem-logo-horizontal.svg` (Header do site, 80px altura)

### Uso previsto
Header de aplicacao web/PWA. Altura maxima 80px, largura proporcional.

### Problemas atuais vs referencia

| Aspecto | Atual | Referencia (full) | Problema |
|---------|-------|-------------------|----------|
| Texto | Inline "Siga Bem" (mesma linha y=42) | Empilhado "Siga" sobre "Bem" | Texto nao e empilhado |
| Tamanho do pin | 56x72 (compacto) | 72x108 (grande) | Pin muito pequeno vs texto |
| Proporcao pin:texto | ~1:6 (pin e pequeno) | ~1:2 (pin domina) | Pin deveria ser mais proeminente |
| Cegonha | Menor, stroke-width 2/1.5 | Maior, stroke-width 2.5/2 | Cegonha menos visivel |
| Tagline | y=62 (junto ao texto) | Separada do texto | Tagline colada |

### Especificacao do redesign

**viewBox:** `0 0 360 80` (reduzir largura, manter altura)

**Layout horizontal adaptado:**

```
[  PIN (68x76)  ] [ 12px gap ] [ "Siga" ]
                                [ "Bem". ]
                                [ tagline ]
```

**Elemento por elemento:**

#### Pin (translate 4, 2)
- **Escalar** o pin do full para caber em 68x76
- Path: `M34 4 C20 4 8 16 8 32 C8 50 34 74 34 74 C34 74 60 50 60 32 C60 16 48 4 34 4Z`
- Fill: `#1B3A4B`

#### Anel verde
- `cx=34 cy=29 r=18`
- stroke: `#2D6A4F` stroke-width=`2.5`

#### Cegonha (translate 20, 20 dentro do pin group)
- Corpo: `M2 10 L6 10 L6 4 L24 4 L24 10 L28 10`
- Carros: `M8 4 L8 0 L14 0 L14 4 M16 4 L16 0 L22 0 L22 4`
- Rodas: cx=8 cy=12 r=2, cx=22 cy=12 r=2
- **SEM MUDANCA** na cegonha em si (ja esta ok)
- Stroke widths: corpo 2, carros 1.5, rodas fill `#2D6A4F`

#### Texto empilhado (x=84)
- "Siga": x=84 y=32, font-size=28, font-weight=800, fill=`#1B3A4B`, letter-spacing=-0.5
- "Bem": x=84 y=58, font-size=28, font-weight=800, fill=`#2D6A8F`, letter-spacing=-0.5
- Ponto verde: cx=165 cy=53 r=3, fill=`#2D6A4F`
- Tagline: x=84 y=73, font-size=8, font-weight=600, fill=`#4A6274`, letter-spacing=2

### O que MUDA

1. Texto passa de inline ("Siga Bem" na mesma linha) para **empilhado** ("Siga" sobre "Bem")
2. Font-size reduz de 38 para 28 (proporcional a altura 80px)
3. Ponto verde de acento adicionado apos "Bem"
4. Proporcao pin:texto melhora (~1:3 ao inves de 1:6)
5. viewBox reduz de 480 para 360 (mais compacto)

### O que MANTEM

1. Pin shape, anel, cegonha, rodas (mesma estrutura)
2. Tagline "SUA FROTA NO CONTROLE"
3. Todas as cores da paleta
4. Font stack system
5. role="img" + title

---

## 2. `siga-bem-logo-dark.svg` (Versao dark/splash)

### Uso previsto
Splash screen PWA, fundos escuros, loading screens, modo escuro.

### Problemas atuais vs referencia

| Aspecto | Atual | Referencia (full) | Problema |
|---------|-------|-------------------|----------|
| Texto | Inline (mesma linha) | Empilhado | Mesmo problema da horizontal |
| Pin fill | `#2D6A8F` (blue medium) | `#1B3A4B` (navy) | Pin nao contrasta no fundo escuro |
| "Bem" | `#2D6A8F` (baixo contraste) | `#2D6A8F` | Quase invisivel no fundo `#1B3A4B` |

### Especificacao do redesign

**viewBox:** `0 0 360 80` (mesma proporcao da horizontal)

**Fundo:** `#1B3A4B` (Navy Dark) - rect full width/height

**Layout:** Identico a horizontal redesenhada, com inversao de cores.

**Elemento por elemento:**

#### Background
- `<rect width="360" height="80" fill="#1B3A4B"/>`

#### Pin (translate 4, 2)
- **Path identica** a horizontal redesenhada
- Fill: `#2D6A8F` (Blue Medium — contrasta com o fundo navy)

#### Anel verde
- Identico a horizontal: cx=34 cy=29 r=18, stroke `#2D6A4F` stroke-width=2.5

#### Cegonha
- Identica (stroke `#ffffff`)
- Rodas: fill `#2D6A4F`

#### Texto empilhado (x=84)
- "Siga": x=84 y=32, font-size=28, font-weight=800, fill=`#ffffff`, letter-spacing=-0.5
- "Bem": x=84 y=58, font-size=28, font-weight=800, fill=`#52B788`, letter-spacing=-0.5
  - **MUDANCA:** Usar `#52B788` (verde claro) ao inves de `#2D6A8F` que e invisivel no fundo navy
  - Ratio de contraste `#52B788` sobre `#1B3A4B` = 4.8:1 (passa WCAG AA)
- Ponto verde: cx=165 cy=53 r=3, fill=`#52B788`
- Tagline: x=84 y=73, font-size=8, font-weight=600, fill=`#8FAAB8`, letter-spacing=2
  - Ratio `#8FAAB8` sobre `#1B3A4B` = 4.5:1 (passa WCAG AA para texto grande, marginal para pequeno)

### O que MUDA

1. Texto passa para empilhado (como a horizontal redesenhada)
2. "Bem" muda de `#2D6A8F` para `#52B788` (verde claro para contraste)
3. Ponto verde muda para `#52B788` (acompanha "Bem")
4. viewBox reduz de 480 para 360
5. Font-size reduz de 38 para 28

### O que MANTEM

1. Fundo `#1B3A4B`
2. Pin fill `#2D6A8F` (ja correto para dark)
3. Anel verde `#2D6A4F`
4. Cegonha branca
5. Rodas verdes
6. Tagline cor `#8FAAB8`
7. role="img" + title

### Nota sobre cor `#52B788`

Esta cor faz parte da paleta verde expandida (green-400 do sistema). Ela e a versao clara de `#2D6A4F` e mantém a identidade da marca sem sacrificar legibilidade. Se preferir manter estritamente a paleta documentada, usar `#40916C` (green-500) com ratio 3.5:1 — passa WCAG AA apenas para texto grande (>=18px bold).

[AUTO-DECISION] Cor do "Bem" no dark mode -> `#52B788` (razao: `#2D6A8F` tem ratio 1.8:1 contra `#1B3A4B`, completamente ilegivel. Verde claro mantém identidade da marca com contraste adequado.)

---

## 3. `siga-bem-logo-icon.svg` (App icon PWA, 120x120)

### Uso previsto
Icone de app PWA, home screen, app stores, 120x120px com cantos arredondados.

### Problemas atuais vs referencia

| Aspecto | Atual | Referencia (full) | Problema |
|---------|-------|-------------------|----------|
| Pin | stroke outline branco | Fill solido `#1B3A4B` | Pin e outline, deveria ser preenchido |
| "SB" no rodape | Presente, 18px | Nao existe na full | Texto desnecessario, conflita com pin |
| Pin posicao | Centralizado com espaco para "SB" | Centralizado total | Pin deveria dominar o espaco |

### Especificacao do redesign

**viewBox:** `0 0 120 120`

**Layout:**

```
+-------------------+
|   rx=24 rounded   |
|                   |
|     [  PIN  ]     |
|     [ anel  ]     |
|     [cegonha]     |
|     [       ]     |
|                   |
+-------------------+
```

**Elemento por elemento:**

#### Background
- `<rect width="120" height="120" rx="24" fill="#1B3A4B"/>`

#### Pin (translate 24, 6)
- **Fill solido** ao inves de stroke outline
- Path: `M36 8 C22 8 12 20 12 34 C12 54 36 80 36 80 C36 80 60 54 60 34 C60 20 50 8 36 8Z`
- Fill: `#243F50` (um tom ligeiramente mais claro que o fundo para o pin ser visivel sem outline)
  - Alternativa: manter `#1B3A4B` para fill e adicionar stroke `#2D6A4F` stroke-width=1.5 no pin (o anel ja da a forma)
- **DECISAO:** Usar o anel verde como definicao visual do pin. O fill do pin pode ser `#1B3A4B` (mesmo que o fundo) porque o anel verde e suficiente para definir a forma.

[AUTO-DECISION] Pin fill no icon -> `#1B3A4B` com stroke sutil `#ffffff` opacity=0.15 stroke-width=1.5 (razao: cria separacao sutil do fundo sem introduzir nova cor, e o anel verde define o circulo interno claramente.)

#### Pin outline sutil
- Mesmo path do pin
- fill=`#1B3A4B`, stroke=`#ffffff`, stroke-width=1.5, opacity=0.15

#### Anel verde
- cx=60 cy=40 r=20
- stroke: `#2D6A4F` stroke-width=3
- **MAIOR** que o atual (r=14 -> r=20) para melhor visibilidade

#### Cegonha (translate 40, 30)
- Corpo: `M2 12 L6 12 L6 4 L32 4 L32 12 L36 12` (escalada para preencher melhor o anel)
- Carros: `M9 4 L9 0 L16 0 L16 4 M20 4 L20 0 L27 0 L27 4`
- Corpo stroke-width: 2.5
- Carros stroke-width: 2
- Rodas: cx=10 cy=15 r=2.5, cx=28 cy=15 r=2.5
- Rodas fill: `#2D6A4F`

#### "SB" — REMOVER

O texto "SB" no rodape e **removido**. Razoes:
- A cegonha dentro do pin JA e o elemento de reconhecimento
- Em 120px, o texto compete visualmente com o icone
- A referencia aprovada usa pin+cegonha como identidade, nao iniciais
- App icons modernos sao puramente graficos

### O que MUDA

1. Pin passa de stroke-outline para fill com stroke sutil (opacity 0.15)
2. **"SB" removido** — pin centralizado ocupa todo o espaco
3. Anel verde aumenta de r=14 para r=20
4. Cegonha escalada proporcionalmente para preencher o anel maior
5. Pin reposicionado para centro vertical total (translate 24,6 ao inves de 28,8)

### O que MANTEM

1. Background `#1B3A4B` com rx=24
2. Forma do pin (path similar)
3. Anel verde `#2D6A4F`
4. Cegonha branca minimalista
5. Rodas verdes
6. Proporcoes internas (cegonha dentro do anel)
7. role="img" + title

---

## 4. `siga-bem-favicon.svg` (32x32)

### Uso previsto
Favicon do navegador, tabs, bookmarks. 32x32px — maximo de simplificacao.

### Problemas atuais vs referencia

| Aspecto | Atual | Referencia (full) | Avaliacao |
|---------|-------|-------------------|-----------|
| Pin outline | stroke `#ffffff` 1.5px | Fill solido | OK para 32px — outline e mais legivel |
| Anel verde | r=5.5 | r=26 (proporcional) | OK — ja adaptado |
| Cegonha | Ultra-simplificada (1 carro) | 2 carros | OK para 32px |
| Rodas | 2 pontos r=1 | r=3 | OK — ja adaptado |

### Analise: o favicon ATUAL ja esta bem

O favicon atual ja e uma simplificacao inteligente da marca. Os elementos estao todos presentes e proporcionais a 32px. As decisoes de simplificacao sao corretas:
- 1 carro ao inves de 2 (espaco insuficiente)
- Stroke mais fino (1.2 ao inves de 2.5)
- Rodas menores (r=1)

### Especificacao do redesign (ajustes finos)

**viewBox:** `0 0 32 32` (sem mudanca)

**Mudancas necessarias (minimas):**

#### 1. Pin outline — adicionar fill sutil
- Atual: apenas stroke branco
- Redesign: Adicionar fill=`#243F50` (tom intermediario) para que o pin tenha "corpo" dentro do background
- Manter stroke=`#ffffff` stroke-width=1.5
- Isso cria uma separacao visual sutil entre pin e fundo, consistente com como o pin aparece na referencia (preenchido)

#### 2. Anel verde — aumentar visibilidade
- Atual: stroke-width=1.5
- Redesign: stroke-width=`1.8` (sutil aumento)
- Manter r=5.5

#### 3. Cegonha — manter simplificada
- **SEM MUDANCA** na cegonha
- 1 carro e a decisao correta para 32px
- Stroke widths ja estao no minimo legivel

#### 4. Rodas — manter
- **SEM MUDANCA** — r=1 ja e o minimo visivel

### Elemento por elemento (final)

```xml
<!-- Background -->
<rect width="32" height="32" rx="6" fill="#1B3A4B"/>

<!-- Pin shape com fill -->
<path d="M16 4 C11 4 7 8 7 13 C7 19 16 28 16 28 C16 28 25 19 25 13 C25 8 21 4 16 4Z"
      fill="#243F50" stroke="#ffffff" stroke-width="1.5"/>

<!-- Green ring (levemente mais grosso) -->
<circle cx="16" cy="12" r="5.5" fill="none" stroke="#2D6A4F" stroke-width="1.8"/>

<!-- Cegonha ultra-minimal (sem mudanca) -->
<g transform="translate(11, 9)">
  <path d="M1 4 L2 4 L2 1.5 L8 1.5 L8 4 L9 4"
        fill="none" stroke="#ffffff" stroke-width="1.2"
        stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M3 1.5 L3 0 L7 0 L7 1.5"
        fill="none" stroke="#ffffff" stroke-width="1"
        stroke-linecap="round"/>
  <circle cx="3" cy="5.5" r="1" fill="#2D6A4F"/>
  <circle cx="7" cy="5.5" r="1" fill="#2D6A4F"/>
</g>
```

### O que MUDA

1. Pin ganha `fill="#243F50"` (tom intermediario) para ter "corpo" visual
2. Anel verde stroke-width aumenta de 1.5 para 1.8

### O que MANTEM

1. Todas as dimensoes e posicoes
2. Cegonha simplificada (1 carro)
3. Rodas verdes r=1
4. Background rx=6
5. Todos os stroke-widths da cegonha
6. role="img" + title

---

## Resumo de mudancas por arquivo

| Arquivo | Severidade | Mudancas principais |
|---------|------------|---------------------|
| `siga-bem-logo-horizontal.svg` | **ALTA** | Texto empilhado, viewBox menor, proporcoes |
| `siga-bem-logo-dark.svg` | **ALTA** | Texto empilhado, cor "Bem" para `#52B788`, viewBox menor |
| `siga-bem-logo-icon.svg` | **MEDIA** | Remover "SB", pin fill solido, anel maior, cegonha escalada |
| `siga-bem-favicon.svg` | **BAIXA** | Fill sutil no pin, anel levemente mais grosso |

## Cores introduzidas (novas vs paleta existente)

| Cor | Hex | Onde | Justificativa |
|-----|-----|------|---------------|
| Green Light | `#52B788` | Dark mode "Bem" + ponto | Contraste AA sobre `#1B3A4B` |
| Navy Mid | `#243F50` | Favicon pin fill, Icon pin stroke | Separacao sutil pin/fundo |

Ambas sao extensoes naturais da paleta existente (variacoes de luminosidade dos mesmos matizes).

## Checklist de consistencia

Apos implementacao, verificar em TODOS os 5 SVGs:

- [ ] `role="img"` presente
- [ ] `<title>` com id unico presente
- [ ] Font stack: `Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif`
- [ ] Nenhum `@import` ou `@font-face`
- [ ] Pin com fill (nao apenas outline) — exceto favicon que usa fill sutil
- [ ] Anel verde `#2D6A4F` presente
- [ ] Rodas verdes `#2D6A4F` presentes
- [ ] Cegonha minimalista branca `#ffffff` presente
- [ ] Texto empilhado "Siga" sobre "Bem" (horizontal e dark apenas)
- [ ] Ponto verde de acento (horizontal, dark, e full apenas)
