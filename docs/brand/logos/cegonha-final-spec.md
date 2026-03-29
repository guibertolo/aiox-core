# Cegonha Final Spec - Silhueta Lateral Definitiva

**Data:** 2026-03-28 (rev. 2)
**Autor:** Uma (UX Design Expert)
**Objetivo:** Silhueta lateral de carreta cegonha CARREGADA, perfeitamente centralizada no pin, imediatamente reconhecivel em todos os 4 tamanhos.

---

## 1. Decisao de Vista: Lateral Pura

**[AUTO-DECISION] Vista frontal vs lateral vs 3/4? -> LATERAL PURA (reason: a carreta cegonha e universalmente reconhecida pela silhueta lateral -- cabine em degrau + 2 andares de carros + rampa traseira. Vista frontal atual confunde com onibus ou elevador. Vista 3/4 colapsa em tamanhos pequenos.)**

A silhueta lateral e o formato que qualquer pessoa na estrada reconhece como "cegonha". O perfil assimetrico (cabine alta esquerda, corpo longo, rampa direita) nao existe em nenhum outro veiculo.

---

## 2. Anatomia da Silhueta (Vista Lateral)

Referencia: carreta cegonha real (cavalo mecanico + semi-reboque de 2 andares).

```
       _____
      |     |     ____[c]___[c]___[c]__/   <- Andar superior: 2-3 carros + rampa
      | CAB |____|________________________|  <- Divisoria de andares
      |     |    |____[c]___[c]___[c]____|  <- Andar inferior: 2-3 carros
      |_____|__________________________|
         O           O     O               <- Rodas verdes
```

**Elementos obrigatorios (hierarquia de reconhecibilidade):**

| Prioridade | Elemento | Por que |
|-----------|----------|---------|
| 1 (vital) | Cabine em degrau | Assinatura "caminhao" -- parte alta esquerda |
| 2 (vital) | Rampa traseira inclinada | Assinatura "cegonha" -- diagonal subindo |
| 3 (essencial) | 2 andares (divisoria) | Diferencia de caminhao comum |
| 4 (essencial) | Carros no andar superior | Confirma "carregada" |
| 5 (desejavel) | Carros no andar inferior | Reforco visual (omitido no favicon) |
| 6 (fixo) | Rodas verdes #2D6A4F | Identidade de marca |

---

## 3. Geometria dos Pins (Mapeamento dos 4 SVGs)

### 3.1 logo-full.svg (Pin Grande)

```
Grupo pai: translate(40, 2)
Pin path: M50 6 C30 6 14 22 14 42 C14 66 50 110 50 110 C50 110 86 66 86 42 C86 22 70 6 50 6Z
Anel verde: cx=50, cy=38, r=26, stroke-width=3
```

- Centro optico do anel: **(50, 38)** em coordenadas do grupo
- Raio interno: 26 - 1.5 (meio do stroke) = 24.5
- Raio util (com respiro): ~22
- **BBox da silhueta: 40 x 24** (proporcao 5:3, caminhao lateral)
- Transform: `translate(30, 26)` -- coloca centro da silhueta em (50, 38)
  - Verificacao: 30 + 40/2 = 50 (cx), 26 + 24/2 = 38 (cy)

### 3.2 logo-horizontal.svg (Pin Medio)

```
Grupo pai: translate(6, 2)
Pin path: M30 4 C18 4 8 14 8 26 C8 40 30 70 30 70 C30 70 52 40 52 26 C52 14 42 4 30 4Z
Anel verde: cx=30, cy=24, r=16, stroke-width=2.5
```

- Centro optico do anel: **(30, 24)** em coordenadas do grupo
- Raio interno: 16 - 1.25 = 14.75
- Raio util: ~13
- **BBox da silhueta: 22 x 14** (cabe no circulo r=13)
- Transform: `translate(19, 17)` -- coloca centro em (30, 24)
  - Verificacao: 19 + 22/2 = 30 (cx), 17 + 14/2 = 24 (cy)

### 3.3 logo-icon.svg (Pin em App Icon)

```
Grupo pai: translate(20, 6)
Pin path: M40 6 C24 6 12 18 12 34 C12 54 40 96 40 96 C40 96 68 54 68 34 C68 18 56 6 40 6Z
Anel verde: cx=40, cy=30, r=20, stroke-width=3
```

- Centro optico do anel: **(40, 30)** em coordenadas do grupo
- Raio interno: 20 - 1.5 = 18.5
- Raio util: ~16.5
- **BBox da silhueta: 28 x 17** (cabe no circulo r=16.5)
- Transform: `translate(26, 21.5)` -- coloca centro em (40, 30)
  - Verificacao: 26 + 28/2 = 40 (cx), 21.5 + 17/2 = 30 (cy)

### 3.4 favicon.svg (Pin Minimo, 32x32)

```
Pin path (direto, sem grupo pai):
  M16 4 C11 4 7 8 7 13 C7 19 16 28 16 28 C16 28 25 19 25 13 C25 8 21 4 16 4Z
Anel verde: cx=16, cy=12, r=5.5, stroke-width=1.8
```

- Centro optico do anel: **(16, 12)** absoluto
- Raio interno: 5.5 - 0.9 = 4.6
- Raio util: ~4
- **BBox da silhueta: 7 x 4** (ultra-compacto)
- Transform: `translate(12.5, 10)` -- coloca centro em (16, 12)
  - Verificacao: 12.5 + 7/2 = 16 (cx), 10 + 4/2 = 12 (cy)

---

## 4. Versao FULL (logo-full.svg) -- Maximo Detalhe

### Espaco: 40 x 24 | Elementos: 8 primarios | Transform: `translate(30, 26)`

```xml
<!-- Carreta cegonha lateral - FULL (dentro do grupo translate(40,2) do pin) -->
<g transform="translate(30, 26)">
  <!-- 1. Cabine em degrau (assinatura "caminhao") -->
  <path d="M1 22 L1 9 L5 4 L12 4 L12 12"
        fill="none" stroke="#ffffff" stroke-width="2.2"
        stroke-linecap="round" stroke-linejoin="round"/>

  <!-- 2. Estrutura 2 andares com rampa traseira -->
  <path d="M12 12 L12 4 L36 4 L39 1 M12 12 L39 12 L39 1"
        fill="none" stroke="#ffffff" stroke-width="1.8"
        stroke-linecap="round" stroke-linejoin="round"/>

  <!-- 3. Divisoria de andares -->
  <line x1="12" y1="8" x2="39" y2="8"
        stroke="#ffffff" stroke-width="1.2" stroke-linecap="round" opacity="0.7"/>

  <!-- 4. Carros andar superior: 3 trapezios -->
  <path d="M14 7 L15.5 5.2 L20 5.2 L21 7"
        fill="none" stroke="#ffffff" stroke-width="1.3"
        stroke-linecap="round" stroke-linejoin="round" opacity="0.8"/>
  <path d="M23 7 L24.5 5.2 L29 5.2 L30 7"
        fill="none" stroke="#ffffff" stroke-width="1.3"
        stroke-linecap="round" stroke-linejoin="round" opacity="0.8"/>
  <path d="M32 6 L33 5 L37 5 L37.5 6"
        fill="none" stroke="#ffffff" stroke-width="1.2"
        stroke-linecap="round" stroke-linejoin="round" opacity="0.65"/>

  <!-- 5. Carros andar inferior: 2 retangulos -->
  <rect x="14" y="9" width="8" height="2.2" rx="0.8"
        fill="none" stroke="#ffffff" stroke-width="1.1" opacity="0.65"/>
  <rect x="25" y="9" width="8" height="2.2" rx="0.8"
        fill="none" stroke="#ffffff" stroke-width="1.1" opacity="0.65"/>

  <!-- 6. Chassi inferior -->
  <line x1="1" y1="16.5" x2="39" y2="16.5"
        stroke="#ffffff" stroke-width="1.8" stroke-linecap="round"/>

  <!-- 7. Roda dianteira (cavalo mecanico) -->
  <circle cx="8" cy="19.5" r="3" fill="#2D6A4F"/>
  <circle cx="8" cy="19.5" r="1" fill="#1B3A4B"/>

  <!-- 8. Rodas traseiras (tandem duplo do semi-reboque) -->
  <circle cx="29" cy="19.5" r="3" fill="#2D6A4F"/>
  <circle cx="29" cy="19.5" r="1" fill="#1B3A4B"/>
  <circle cx="36" cy="19.5" r="3" fill="#2D6A4F"/>
  <circle cx="36" cy="19.5" r="1" fill="#1B3A4B"/>
</g>
```

### Inventario de elementos

| # | Tipo | Funcao | Prioridade |
|---|------|--------|-----------|
| 1 | path | Cabine em degrau | Vital |
| 2 | path (M-path) | Estrutura 2 andares + rampa | Vital |
| 3 | line | Divisoria entre andares | Essencial |
| 4a | path | Carro superior esq | Essencial |
| 4b | path | Carro superior centro | Essencial |
| 4c | path | Carro superior dir (na rampa) | Desejavel |
| 5a | rect | Carro inferior esq | Desejavel |
| 5b | rect | Carro inferior dir | Desejavel |
| 6 | line | Chassi | Vital |
| 7 | 2x circle | Roda dianteira + cubo | Fixo |
| 8 | 4x circle | Rodas traseiras tandem + cubos | Fixo |
| **Total** | **16 SVG nodes** | 10 formas primarias + 6 circulos |

### Verificacao de centralidade

- Centro horizontal: 30 + 40/2 = 30 + 20 = **50** (= cx do anel)
- Centro vertical: 26 + 24/2 = 26 + 12 = **38** (= cy do anel)
- Margem ate o anel: raio 26, elemento mais extremo em ~20 do centro = **6px de respiro** (23%)

---

## 5. Versao HORIZONTAL (logo-horizontal.svg) -- Detalhe Moderado

### Espaco: 22 x 14 | Elementos: 8 | Transform: `translate(19, 17)`

```xml
<!-- Carreta cegonha lateral - HORIZONTAL (dentro do grupo translate(6,2) do pin) -->
<g transform="translate(19, 17)">
  <!-- 1. Cabine em degrau -->
  <path d="M1 12 L1 5 L3 3 L6.5 3 L6.5 7"
        fill="none" stroke="#ffffff" stroke-width="1.5"
        stroke-linecap="round" stroke-linejoin="round"/>

  <!-- 2. Estrutura 2 andares + rampa -->
  <path d="M6.5 7 L6.5 3 L19.5 3 L21 1 M6.5 7 L21 7 L21 1"
        fill="none" stroke="#ffffff" stroke-width="1.3"
        stroke-linecap="round" stroke-linejoin="round"/>

  <!-- 3. Divisoria de andares -->
  <line x1="6.5" y1="5" x2="21" y2="5"
        stroke="#ffffff" stroke-width="1" stroke-linecap="round" opacity="0.6"/>

  <!-- 4. Carros andar superior: 2 trapezios -->
  <path d="M8 4.2 L9.2 3.3 L13 3.3 L13.8 4.2"
        fill="none" stroke="#ffffff" stroke-width="1"
        stroke-linecap="round" stroke-linejoin="round" opacity="0.7"/>
  <path d="M15 4.2 L15.8 3.3 L19 3.3 L19.5 4.2"
        fill="none" stroke="#ffffff" stroke-width="1"
        stroke-linecap="round" stroke-linejoin="round" opacity="0.65"/>

  <!-- 5. Chassi -->
  <line x1="1" y1="9.5" x2="21" y2="9.5"
        stroke="#ffffff" stroke-width="1.3" stroke-linecap="round"/>

  <!-- 6. Roda dianteira -->
  <circle cx="4.5" cy="11.5" r="2" fill="#2D6A4F"/>

  <!-- 7. Roda traseira -->
  <circle cx="18" cy="11.5" r="2" fill="#2D6A4F"/>
</g>
```

### Inventario: 8 elementos primarios

| # | Tipo | Funcao |
|---|------|--------|
| 1 | path | Cabine em degrau |
| 2 | path | Estrutura + rampa |
| 3 | line | Divisoria andares |
| 4a | path | Carro superior esq |
| 4b | path | Carro superior dir |
| 5 | line | Chassi |
| 6 | circle | Roda dianteira |
| 7 | circle | Roda traseira |
| **Total** | **8** |

### Verificacao

- Centro: 19 + 11 = **30** (cx), 17 + 7 = **24** (cy)
- Sem carros no andar inferior (escala insuficiente para renderizar sem virar ruido)
- 2 carros no andar superior (suficiente para comunicar "carregada")

---

## 6. Versao ICON (logo-icon.svg) -- Detalhe Alto

### Espaco: 28 x 17 | Elementos: 8 primarios | Transform: `translate(26, 21.5)`

```xml
<!-- Carreta cegonha lateral - ICON (dentro do grupo translate(20,6) do pin) -->
<g transform="translate(26, 21.5)">
  <!-- 1. Cabine em degrau -->
  <path d="M1 15 L1 6 L3.5 3 L8 3 L8 8.5"
        fill="none" stroke="#ffffff" stroke-width="1.8"
        stroke-linecap="round" stroke-linejoin="round"/>

  <!-- 2. Estrutura 2 andares + rampa -->
  <path d="M8 8.5 L8 3 L25 3 L27 1 M8 8.5 L27 8.5 L27 1"
        fill="none" stroke="#ffffff" stroke-width="1.5"
        stroke-linecap="round" stroke-linejoin="round"/>

  <!-- 3. Divisoria andares -->
  <line x1="8" y1="5.8" x2="27" y2="5.8"
        stroke="#ffffff" stroke-width="1" stroke-linecap="round" opacity="0.6"/>

  <!-- 4. Carros andar superior: 3 trapezios -->
  <path d="M10 5 L11.2 3.8 L15 3.8 L15.8 5"
        fill="none" stroke="#ffffff" stroke-width="1.1"
        stroke-linecap="round" stroke-linejoin="round" opacity="0.75"/>
  <path d="M17 5 L18.2 3.8 L22 3.8 L22.8 5"
        fill="none" stroke="#ffffff" stroke-width="1.1"
        stroke-linecap="round" stroke-linejoin="round" opacity="0.75"/>
  <path d="M24 4.5 L24.5 3.8 L26.5 3.8 L26.8 4.5"
        fill="none" stroke="#ffffff" stroke-width="1"
        stroke-linecap="round" stroke-linejoin="round" opacity="0.6"/>

  <!-- 5. Carro andar inferior: 1 retangulo -->
  <rect x="10" y="6.3" width="8" height="1.8" rx="0.6"
        fill="none" stroke="#ffffff" stroke-width="1" opacity="0.6"/>

  <!-- 6. Chassi -->
  <line x1="1" y1="11.5" x2="27" y2="11.5"
        stroke="#ffffff" stroke-width="1.5" stroke-linecap="round"/>

  <!-- 7. Roda dianteira -->
  <circle cx="5.5" cy="14" r="2.5" fill="#2D6A4F"/>
  <circle cx="5.5" cy="14" r="0.8" fill="#1B3A4B"/>

  <!-- 8. Rodas traseiras tandem -->
  <circle cx="20" cy="14" r="2.5" fill="#2D6A4F"/>
  <circle cx="20" cy="14" r="0.8" fill="#1B3A4B"/>
  <circle cx="25.5" cy="14" r="2.5" fill="#2D6A4F"/>
  <circle cx="25.5" cy="14" r="0.8" fill="#1B3A4B"/>
</g>
```

### Inventario: 8 formas primarias + 6 circulos de rodas = 14 total

| # | Tipo | Funcao |
|---|------|--------|
| 1 | path | Cabine em degrau |
| 2 | path | Estrutura + rampa |
| 3 | line | Divisoria andares |
| 4a-c | 3x path | 3 carros no andar superior |
| 5 | rect | 1 carro no andar inferior |
| 6 | line | Chassi |
| 7-8 | 6x circle | 3 rodas + 3 cubos |
| **Total** | **14** (8 primarios) |

### Verificacao

- Centro: 26 + 14 = **40** (cx), 21.5 + 8.5 = **30** (cy)
- 3 carros no andar superior (2 completos + 1 na rampa)
- 1 carro no andar inferior
- Tandem traseiro (2 rodas) como na versao full

---

## 7. Versao FAVICON (favicon.svg) -- Ultra-Simplificado

### Espaco: 7 x 4 | Elementos: 4 | Transform: `translate(12.5, 10)`

```xml
<!-- Carreta cegonha lateral - FAVICON (coordenadas absolutas no viewBox 32x32) -->
<g transform="translate(12.5, 10)">
  <!-- 1. Silhueta completa: cabine + corpo + rampa (path unico) -->
  <path d="M0.5 3.5 L0.5 1.5 L1.2 0.8 L2.2 0.8 L2.2 1.8 L6 1.8 L6.5 0.5 L6.5 3.5"
        fill="none" stroke="#ffffff" stroke-width="0.8"
        stroke-linecap="round" stroke-linejoin="round"/>

  <!-- 2. Hint de 2 andares (linha sutil) -->
  <line x1="2.2" y1="1.3" x2="6.5" y2="1.3"
        stroke="#ffffff" stroke-width="0.5" opacity="0.5"/>

  <!-- 3. Roda esquerda -->
  <circle cx="1.5" cy="4" r="0.8" fill="#2D6A4F"/>

  <!-- 4. Roda direita -->
  <circle cx="5.5" cy="4" r="0.8" fill="#2D6A4F"/>
</g>
```

### Inventario: 4 elementos (meta atingida)

| # | Tipo | Funcao |
|---|------|--------|
| 1 | path | Silhueta inteira (cabine+corpo+rampa) |
| 2 | line | Hint de 2 andares |
| 3 | circle | Roda esquerda |
| 4 | circle | Roda direita |

### Verificacao

- Centro: 12.5 + 3.5 = **16** (cx), 10 + 2 = **12** (cy)
- Nesta escala (7x4 px uteis), carros individuais NAO sao renderizaveis
- A silhueta em degrau + rampa + divisoria e suficiente para "cegonha"
- O path unico garante coesao visual mesmo em 16x16

---

## 8. Tabela de Centralizacao Consolidada

| Variante | SVG | Anel (cx,cy,r) | BBox | Transform | Centro Calculado |
|----------|-----|----------------|------|-----------|-----------------|
| **Full** | logo-full.svg | 50, 38, r=26 | 40x24 | `translate(30, 26)` | 30+20=**50**, 26+12=**38** |
| **Horizontal** | logo-horizontal.svg | 30, 24, r=16 | 22x14 | `translate(19, 17)` | 19+11=**30**, 17+7=**24** |
| **Dark** | logo-dark.svg | 30, 24, r=16 | 22x14 | `translate(19, 17)` | 19+11=**30**, 17+7=**24** |
| **Icon** | logo-icon.svg | 40, 30, r=20 | 28x17 | `translate(26, 21.5)` | 26+14=**40**, 21.5+8.5=**30** |
| **Favicon** | favicon.svg | 16, 12, r=5.5 | 7x4 | `translate(12.5, 10)` | 12.5+3.5=**16**, 10+2=**12** |

---

## 9. Progressao de Detalhe por Tamanho

| Elemento | Full (40x24) | Icon (28x17) | Horizontal (22x14) | Favicon (7x4) |
|----------|:---:|:---:|:---:|:---:|
| Cabine em degrau | stroke 2.2 | stroke 1.8 | stroke 1.5 | stroke 0.8 |
| Estrutura 2 andares | stroke 1.8 | stroke 1.5 | stroke 1.3 | path unico |
| Rampa traseira | presente | presente | presente | presente |
| Divisoria andares | stroke 1.2 | stroke 1.0 | stroke 1.0 | stroke 0.5 |
| Carros andar superior | **3** trapezios | **3** trapezios | **2** trapezios | nenhum |
| Carros andar inferior | **2** retangulos | **1** retangulo | nenhum | nenhum |
| Chassi | stroke 1.8 | stroke 1.5 | stroke 1.3 | integrado |
| Rodas | 3 (tandem) + cubos | 3 (tandem) + cubos | 2 simples | 2 simples |
| **Total elementos** | **16** | **14** | **8** | **4** |

---

## 10. Paleta de Cores

| Elemento | Hex | Uso |
|----------|-----|-----|
| Silhueta/estrutura | `#ffffff` | Branco sobre fundo navy |
| Elementos secundarios | `#ffffff` com opacity 0.6-0.8 | Carros, divisoria |
| Rodas (preenchimento) | `#2D6A4F` | Verde identitario da marca |
| Centro das rodas (cubo) | `#1B3A4B` | Navy = fundo do pin (cria "furo") |
| Fundo do pin | `#1B3A4B` | Navy escuro |

---

## 11. Regras de Stroke por Variante

| Variante | Principal | Secundario | Detalhe |
|----------|----------|-----------|---------|
| Full | 2.2px | 1.8px | 1.1-1.3px |
| Icon | 1.8px | 1.5px | 1.0-1.1px |
| Horizontal | 1.5px | 1.3px | 0.8-1.0px |
| Favicon | 0.8px | 0.5px | n/a |

Todos com `stroke-linecap="round"` e `stroke-linejoin="round"`.

---

## 12. Implementacao: Substituicoes nos SVGs

### 12.1 siga-bem-logo-full.svg

**Remover:** Todo o bloco `<g transform="translate(30, 22)">` ate `</g>` (icone frontal atual, linhas 11-46)
**Inserir:** SVG da Secao 4 no lugar

### 12.2 siga-bem-logo-horizontal.svg

**Remover:** Todo o bloco `<g transform="translate(18, 14)">` ate `</g>` (linhas 10-34)
**Inserir:** SVG da Secao 5 no lugar

### 12.3 siga-bem-logo-dark.svg

**Remover:** Todo o bloco `<g transform="translate(18, 14)">` ate `</g>`
**Inserir:** SVG da Secao 5 (mesmo que horizontal) no lugar

### 12.4 siga-bem-logo-icon.svg

**Remover:** Todo o bloco `<g transform="translate(24, 16)">` ate `</g>` (linhas 12-37)
**Inserir:** SVG da Secao 6 no lugar

### 12.5 siga-bem-favicon.svg

**Remover:** Todo o bloco `<g transform="translate(12, 8)">` ate `</g>` (linhas 11-26)
**Inserir:** SVG da Secao 7 no lugar

---

## 13. Checklist de Validacao

- [ ] Cabine em degrau (parte alta esquerda) reconhecivel como caminhao em todas as 4 versoes
- [ ] Vista lateral pura (cabine a esquerda, rampa a direita) consistente
- [ ] 2 andares visiveis nas versoes Full, Icon e Horizontal (divisoria horizontal)
- [ ] 3 carros no andar superior nas versoes Full e Icon
- [ ] 2 carros no andar superior na versao Horizontal
- [ ] Rampa traseira diagonal presente em todas as versoes
- [ ] Rodas verdes #2D6A4F presentes em todas as versoes
- [ ] Silhueta centralizada: centro geometrico = centro do anel (cx, cy)
- [ ] Nenhum elemento toca o anel verde (respiro minimo 15%)
- [ ] Favicon com apenas 4 elementos, legivel em 16x16
- [ ] Todos os paths usam stroke-linecap="round" e stroke-linejoin="round"
- [ ] Sem paths sobrepostos (z-order limpo, elementos atras primeiro)
- [ ] Funciona em fundo navy (#1B3A4B) e fundo dark

---

## 14. Comparativo: Antes vs Depois

### Antes (vista frontal)

- Cabine vista de frente com carrier frame vertical
- 15+ elementos SVG no pin grande
- Parece elevador/prateleira, nao comunica "veiculo em movimento"
- Carros como retangulos genericos vistos de frente

### Depois (vista lateral cegonha carregada)

- Silhueta lateral com cabine em degrau caracteristica
- 2 andares com carros (trapezios = perfil de carro)
- Rampa traseira inclinada (assinatura cegonha)
- 3 rodas (tandem traseiro realista) nas versoes maiores
- 4-16 elementos escalando por variante
- Imediatamente reconhecivel como carreta cegonha da estrada

### Ganho de reconhecibilidade

| Tamanho | Antes (frontal) | Depois (lateral) |
|---------|-----------------|------------------|
| 120px (full) | "Algum tipo de caminhao" | "Carreta cegonha com carros em cima" |
| 64px (icon) | "Veiculo? Predio?" | "Carreta cegonha" |
| 32px (horizontal) | "Icone abstrato" | "Caminhao (silhueta degrau)" |
| 16px (favicon) | "Manchas" | "Veiculo (degrau + rodas verdes)" |

---

*Especificacao definitiva rev.2 -- Uma (UX Design Expert) -- Siga Bem Cegonheiros*
