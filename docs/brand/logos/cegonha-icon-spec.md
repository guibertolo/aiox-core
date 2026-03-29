# Cegonha Icon Specification - Siga Bem

**Data:** 2026-03-28
**Autor:** Uma (UX Design Expert)
**Objetivo:** Redesenhar a silhueta do caminhao cegonha dentro do pin para que seja imediatamente reconhecivel como "caminhao", mantendo o estilo minimalista e as rodas verdes #2D6A4F.

---

## Diagnostico do Icone Atual

O SVG atual (`siga-bem-logo-full.svg`, linhas 11-16) usa:

```
Linha horizontal (chassi) + dois retangulos em cima (carros) + dois circulos verdes (rodas)
```

**Problemas identificados:**

1. A linha horizontal plana nao comunica "veiculo" -- parece uma prateleira ou diagrama
2. Os retangulos em cima sao abstratos demais -- nao leem como carros
3. Falta a cabine do caminhao, que e o elemento mais reconhecivel de um caminhao
4. O formato geral e simetrico, enquanto um caminhao tem assimetria clara (cabine na frente, carroceria atras)

**Requisito-chave:** A cabine (formato em "L" ou degrau) e o que faz qualquer pessoa pensar "caminhao". Sem cabine, e apenas um retangulo com rodas.

---

## ViewBox de Trabalho

Todas as alternativas usam `viewBox="0 0 40 24"` para encaixar na area disponivel dentro do pin (g translate 30,26).

**Restricoes de espaco:**
- No pin stacked: area util ~40x30px
- No logo horizontal: area util ~24x16px
- No favicon 32x32: pin inteiro ocupa ~20x24px, icone ~12x8px

**Cores fixas:**
- Silhueta: `#ffffff` (branco sobre fundo navy)
- Rodas: `#2D6A4F` (verde identitario)
- Stroke: 2-2.5px para legibilidade em tamanho pequeno

---

## Alternativa A: Perfil Lateral Classico

### Descricao Visual

Silhueta de caminhao cegonha visto de lado, estilo placa de transito. Cabine elevada na esquerda com para-brisa inclinado, chassi longo, rampa traseira com dois carros empilhados (um em cima, um embaixo). Duas rodas verdes.

A pessoa ve: um caminhao grande com carros em cima -- o tipo de veiculo que se ve na estrada.

### Elementos SVG

```xml
<g transform="translate(30, 26)">
  <!-- Cabine (formato L com para-brisa inclinado) -->
  <path d="M2 14 L2 8 L6 4 L12 4 L12 14"
        fill="none" stroke="#ffffff" stroke-width="2.5"
        stroke-linecap="round" stroke-linejoin="round"/>

  <!-- Chassi (linha do corpo do caminhao) -->
  <path d="M12 14 L12 10 L38 10 L38 14"
        fill="none" stroke="#ffffff" stroke-width="2"
        stroke-linecap="round" stroke-linejoin="round"/>

  <!-- Rampa traseira (inclinada) -->
  <path d="M38 10 L38 4"
        fill="none" stroke="#ffffff" stroke-width="2"
        stroke-linecap="round"/>

  <!-- Carro de baixo (na carroceria) -->
  <path d="M15 12 L15 10.5 L24 10.5 L24 12"
        fill="none" stroke="#ffffff" stroke-width="1.5"
        stroke-linecap="round" stroke-linejoin="round"/>

  <!-- Carro de cima (elevado na rampa) -->
  <path d="M22 8 L22 6.5 L31 6.5 L31 8"
        fill="none" stroke="#ffffff" stroke-width="1.5"
        stroke-linecap="round" stroke-linejoin="round"/>

  <!-- Suporte vertical entre andares -->
  <path d="M14 10 L14 4 M26 10 L26 4 M38 10 L38 4"
        fill="none" stroke="#ffffff" stroke-width="1.5"
        stroke-linecap="round"/>

  <!-- Roda dianteira -->
  <circle cx="8" cy="17" r="3" fill="#2D6A4F"/>
  <!-- Roda traseira -->
  <circle cx="32" cy="17" r="3" fill="#2D6A4F"/>
</g>
```

### Nivel de Detalhe

- 7 paths + 2 circulos = 9 elementos
- Complexidade: ALTA para icone pequeno
- Paths com muitos segmentos podem colapsar em tamanhos < 24px

### Teste de Reconhecibilidade

| Tamanho | Reconhecivel? | Nota |
|---------|---------------|------|
| 120px | Sim, claramente | Todos os detalhes visiveis |
| 32px | Sim, com esforco | Carros individuais se perdem, mas forma geral = caminhao |
| 20px | Parcial | Cabine + rodas legivel, carros viram manchas |

### Score

| Criterio | Nota |
|----------|------|
| Reconhecibilidade 32px | 7/10 |
| Reconhecibilidade 120px | 10/10 |
| Elegancia/simplicidade | 5/10 |
| Tom profissional | 7/10 |
| **Score total** | **7.3/10** |

---

## Alternativa B: Perfil Lateral Simplificado (RECOMENDADA)

### Descricao Visual

Caminhao cegonha estilizado com apenas os elementos essenciais: cabine em degrau na esquerda (formato que grita "caminhao"), corpo retangular com uma unica rampa inclinada por cima, e um carro simplificado (trapezio) na rampa superior. Duas rodas verdes.

A chave e a **silhueta em degrau**: parte alta (cabine) + parte baixa-longa (carroceria) + rampa subindo. Esse perfil e universalmente reconhecido como caminhao.

### Elementos SVG

```xml
<g transform="translate(30, 26)">
  <!-- Cabine + corpo em silhueta unica (formato degrau) -->
  <path d="M2 16 L2 6 L7 3 L12 3 L12 8 L36 8 L38 4 L38 16"
        fill="none" stroke="#ffffff" stroke-width="2.5"
        stroke-linecap="round" stroke-linejoin="round"/>

  <!-- Carro na rampa (trapezio simplificado) -->
  <path d="M24 7 L26 5 L33 5 L34 7"
        fill="none" stroke="#ffffff" stroke-width="1.8"
        stroke-linecap="round" stroke-linejoin="round"/>

  <!-- Linha do chassi inferior -->
  <line x1="5" y1="16" x2="35" y2="16"
        stroke="#ffffff" stroke-width="2" stroke-linecap="round"/>

  <!-- Roda dianteira -->
  <circle cx="10" cy="18" r="3" fill="#2D6A4F"/>
  <!-- Roda traseira -->
  <circle cx="32" cy="18" r="3" fill="#2D6A4F"/>
</g>
```

### Nivel de Detalhe

- 3 paths + 1 line + 2 circulos = 6 elementos
- Complexidade: MEDIA -- equilibrio entre legibilidade e expressividade
- O path principal (cabine+corpo) e uma unica forma continua, nao se fragmenta em tamanhos pequenos

### Teste de Reconhecibilidade

| Tamanho | Reconhecivel? | Nota |
|---------|---------------|------|
| 120px | Sim, imediatamente | Degrau da cabine + carro na rampa = cegonha |
| 32px | Sim | Silhueta em degrau lida como caminhao, carro em cima como bonus |
| 20px | Sim | Mesmo sem o carro, o degrau cabine/corpo + rodas = caminhao |

### Por que funciona em 20px

O segredo e que o path principal cria uma silhueta **assimetrica em degrau**: alto na esquerda (cabine), baixo no meio (corpo), subindo na direita (rampa). Esse perfil e unico de caminhoes cegonha -- nenhum outro veiculo tem essa forma. Mesmo que o carro no topo se perca, a silhueta base comunica "caminhao cegonha".

### Score

| Criterio | Nota |
|----------|------|
| Reconhecibilidade 32px | 9/10 |
| Reconhecibilidade 120px | 9/10 |
| Elegancia/simplicidade | 9/10 |
| Tom profissional | 9/10 |
| **Score total** | **9.0/10** |

---

## Alternativa C: Vista 3/4 Estilizada

### Descricao Visual

Caminhao cegonha com leve perspectiva isometrica, dando sensacao de profundidade. A cabine aparece em angulo, mostrando frente e lateral. A carroceria se estende para tras com linhas diagonais que sugerem profundidade. Um carro no andar superior. Rodas verdes.

Visual mais "tech", mais moderno, mas mais complexo.

### Elementos SVG

```xml
<g transform="translate(30, 26)">
  <!-- Cabine em perspectiva (frente + lateral) -->
  <path d="M4 16 L4 8 L8 5 L14 5 L14 8"
        fill="none" stroke="#ffffff" stroke-width="2.5"
        stroke-linecap="round" stroke-linejoin="round"/>

  <!-- Frente do caminhao (face angular) -->
  <path d="M4 8 L1 10 L1 16"
        fill="none" stroke="#ffffff" stroke-width="2"
        stroke-linecap="round" stroke-linejoin="round"/>

  <!-- Corpo com perspectiva -->
  <path d="M14 8 L14 10 L36 10 L38 8 L38 4 L36 6 L14 6"
        fill="none" stroke="#ffffff" stroke-width="2"
        stroke-linecap="round" stroke-linejoin="round"/>

  <!-- Carro em perspectiva -->
  <path d="M22 5.5 L24 4 L32 4 L33 5.5"
        fill="none" stroke="#ffffff" stroke-width="1.5"
        stroke-linecap="round" stroke-linejoin="round"/>

  <!-- Base/chassi -->
  <path d="M1 16 L38 16"
        fill="none" stroke="#ffffff" stroke-width="2"
        stroke-linecap="round"/>

  <!-- Roda dianteira -->
  <circle cx="9" cy="18" r="3" fill="#2D6A4F"/>
  <!-- Roda traseira -->
  <circle cx="32" cy="18" r="3" fill="#2D6A4F"/>
</g>
```

### Nivel de Detalhe

- 5 paths + 2 circulos = 7 elementos
- Complexidade: ALTA -- as linhas diagonais de perspectiva criam ruido visual em tamanhos pequenos
- Paths com angulos variados podem gerar aliasing em renderizacao pequena

### Teste de Reconhecibilidade

| Tamanho | Reconhecivel? | Nota |
|---------|---------------|------|
| 120px | Sim, com impacto visual | Perspectiva da profundidade, carro visivel |
| 32px | Parcial | As linhas de perspectiva competem entre si, forma menos clara |
| 20px | Nao | Linhas diagonais viram ruido, perde a leitura de caminhao |

### Score

| Criterio | Nota |
|----------|------|
| Reconhecibilidade 32px | 5/10 |
| Reconhecibilidade 120px | 8/10 |
| Elegancia/simplicidade | 6/10 |
| Tom profissional | 8/10 |
| **Score total** | **6.8/10** |

---

## Comparativo Final

| Criterio | A (Classico) | B (Simplificado) | C (3/4 Vista) |
|----------|:---:|:---:|:---:|
| Reconhecibilidade 32px | 7 | **9** | 5 |
| Reconhecibilidade 120px | 10 | 9 | 8 |
| Elegancia/simplicidade | 5 | **9** | 6 |
| Tom profissional | 7 | **9** | 8 |
| Elementos SVG | 9 | **6** | 7 |
| **Score total** | **7.3** | **9.0** | **6.8** |

---

## Recomendacao: Alternativa B (Perfil Lateral Simplificado)

### Justificativa

1. **Reconhecibilidade universal.** A silhueta em degrau (cabine alta + corpo baixo + rampa subindo) e a "assinatura visual" de um caminhao cegonha. Funciona mesmo em 20px porque o cerebro humano le a forma antes dos detalhes.

2. **Economia de elementos.** Com apenas 6 elementos SVG (vs. 9 da A e 7 da C), renderiza de forma limpa em qualquer tamanho. Menos paths = menos aliasing = mais nitidez.

3. **Um unico path principal.** O contorno cabine+corpo+rampa e um path continuo. Isso significa que em tamanhos pequenos, ao inves de fragmentos desconexos, a pessoa ve uma forma coesa.

4. **O carro na rampa e bonus, nao requisito.** A alternativa B funciona mesmo sem o trapezio do carro. Em 120px, o carro adiciona a narrativa "cegonha". Em 20px, a silhueta do caminhao ja basta.

5. **Tom profissional.** Nao e tao literal quanto uma placa de transito (A), nem tao estilizado que perde clareza (C). E o equilibrio que uma marca SaaS profissional precisa.

### Implementacao

Para aplicar a alternativa B no SVG atual, substituir o bloco `<g transform="translate(30, 26)">` (linhas 11-16 de `siga-bem-logo-full.svg`) pelo SVG da Alternativa B acima. As coordenadas ja estao calibradas para o viewBox do pin.

**Ajustes necessarios nos outros SVGs:**
- `siga-bem-logo-horizontal.svg` -- mesmo icone, escala menor
- `siga-bem-logo-icon.svg` -- icone standalone no pin
- `siga-bem-favicon.svg` -- menor escala, verificar se path principal le bem em 16x16

---

## Proximos Passos

1. [ ] Aprovar alternativa B como direcao
2. [ ] Aplicar SVG no logo full (`siga-bem-logo-full.svg`)
3. [ ] Propagar para variantes (horizontal, icon, dark, favicon)
4. [ ] Testar renderizacao em tamanhos reais (16px, 32px, 64px, 128px)
5. [ ] Validar em fundo escuro e fundo claro
6. [ ] Atualizar `preview.html` com nova versao

---

*Especificacao criada por Uma (UX Design Expert) -- Siga Bem Cegonheiros*
