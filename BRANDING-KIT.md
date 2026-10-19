# BRUTTO Barber Studio: Branding Kit oficial

> Referência oficial para qualquer alteração visual ou técnica no BRUTTO.
> Versão 1.0, 18/10/2026. Base: código em `main` no commit `d3d97ed` (correção de escala), lido arquivo por arquivo, e medições feitas no navegador (Playwright, servidor local na porta 3100).
> **Status: rascunho aguardando aprovação do proprietário. Não é definitivo até ser aprovado.**

## Como ler este documento

Cada regra tem um selo:

| Selo | Significado |
|---|---|
| **[APROVADO]** | Decisão já aprovada pelo proprietário em alguma etapa e implementada. Não mudar sem nova aprovação. |
| **[ATUAL]** | É o comportamento implementado hoje, mas nunca foi aprovado como regra. Funciona, mas pode ser revisto. |
| **[EXCEÇÃO]** | Desvio consciente de uma regra geral, com justificativa. |
| **[PROPOSTA]** | Recomendação deste documento. **Não está implementada.** Depende de aprovação. |
| **[PENDENTE]** | Problema conhecido e ainda não corrigido. |

Os valores em px foram medidos a 1440 × 900, salvo indicação. `--u` é a unidade fluida do projeto (seção 4.3).

---

## 1. Identidade da marca

### 1.1 Conceito e posicionamento [APROVADO]
- **Nome:** BRUTTO, do italiano: bruto, áspero, sem verniz.
- **Frase-conceito:** "Bruto no nome, exato no corte." É o `og:description` atual.
- **Natureza:** site demonstrativo de portfólio da KLABEL DIGITAL. Nome, preços, horários, endereço e contatos são **dados de exemplo** (`lib/data.ts`, `lib/site.config.ts`), e o site está em `noindex`.
- **Posicionamento:** barbearia premium urbana, com hora marcada, ofício preciso e ambiente masculino editorial. Não é clube inglês clássico (ver `REFERENCIAS.md`).
- **Direção sorteada na Taste Skill:** `sentence-as-layout`. A frase é a composição.

### 1.2 Personalidade visual [APROVADO]
Brutalismo refinado, editorial masculino e fotografia cinematográfica:
- títulos monumentais em condensada pesada, em caixa alta e com entrelinha apertada;
- contraste forte entre preto, creme e vermelho;
- composição assimétrica, em que cada seção difere da vizinha;
- quinas vivas: botões sem raio, sem cartões em grade e sem ícones decorativos (salvo exceções do Hero, seção 9).

### 1.3 Tom de voz e copy [ATUAL]
- **Frases curtas, declarativas, terminadas em ponto.** O ponto final dos títulos monumentais vem em vermelho (`.book__dot`, `.where__dot`, `.footer__dot`): "Sua vez na cadeira.", "Chegue sem pressa.", "Quem chega, senta.", "Nuca limpa.".
- Segunda pessoa direta ("Escolha o serviço…", "Chegue na hora…").
- Concreto e de ofício: navalha, nuca, linha, cadeira, hora marcada. Evitar adjetivos vagos.
- Assinatura recorrente: "Brutalmente bem-feito." (em script).
- Português do Brasil. Nada de depoimento, número ou logo de cliente inventado.
- Dados fictícios ficam em `[colchetes]` ou centralizados em `lib/data.ts` / `lib/site.config.ts`.

**Divergência de tom [PENDENTE, decisão do proprietário]:** a copy do Hero ("O cuidado que faz a diferença.", "Seu estilo, em boas mãos.", "Ambiente exclusivo", "Cortes personalizados") é genérica e suave. Ela não tem a aspereza do resto do site nem a frase-conceito. Este documento **não** altera copy; só registra a divergência.

### 1.4 Elementos visuais característicos
| Elemento | Onde | Status |
|---|---|---|
| Logo BRUTTO em traço (SVG, `LogoMark.tsx`), com "BARBER STUDIO" na vertical | Cabeçalho, preloader, rodapé (largura total, cortado pela borda) | [APROVADO] |
| Título monumental Anton em máscara de linha | Serviços, Cortes, Estúdio, Agendar, Onde, Rodapé | [APROVADO] |
| Ponto final vermelho no título | Agendar, Onde, Rodapé | [ATUAL] |
| Pincelada vermelha atrás de uma palavra (`.svcs__mark`, `clip-path` irregular) | Serviços ("CUSTA") | [APROVADO] |
| Assinatura em script inclinada | Serviços e Cortes | [APROVADO], com repetição registrada na seção 9 |
| Etiqueta com filete (Barlow, caixa alta espaçada + traço de 1 px) | Manifesto, Serviços, Estúdio, Agendar, Onde | [ATUAL] |
| Fotos "impressas" com borda creme, rotação e fita adesiva | Cortes | [APROVADO] |
| Letreiro fino em loop | Entre Manifesto e Serviços | [APROVADO] |
| Canhoto de senha com picote e furos | Formulário de agendamento | [APROVADO] |

---

## 2. Identidade cromática

### 2.1 Paleta oficial (tokens em `:root`, `app/globals.css`)
| Token | Valor | Função | Status |
|---|---|---|---|
| `--ink` | `#101010` | Carvão. Fundo principal, texto sobre claro | [APROVADO] (briefing) |
| `--ink-2` | `#1b1b1a` | Superfície de passo (fundo da foto de Serviços enquanto carrega, cortina do shutter) | [APROVADO] |
| `--paper` | `#e7e3da` | Off-white. Texto padrão sobre escuro | [APROVADO] (briefing) |
| `--paper-2` | `#d9d4c8` | Superfície de passo clara | **Sem uso** |
| `--brick` | `#9b332b` | Vermelho queimado do briefing: botão "Agendar" do cabeçalho, filete do lede de Serviços, sublinhado do Manifesto, losangos do letreiro, seleção de texto | [APROVADO] (briefing) |
| `--brick-strong` | `#7f2a23` | Hover do `.button` | [ATUAL] |
| `--mineral` | `#73736e` | Cinza mineral: hoje só a barra de rolagem | [ATUAL] (subutilizado) |
| `--cream` | `#f2e8d5` | Creme quente: Hero, Cortes, Rodapé, logo | [ATUAL] |
| `--gold` | `#c9a25e` | Dourado: **só no Hero** | [EXCEÇÃO] (seção 2.4) |
| `--gold-soft` | `#d8b878` | Hover do botão dourado do Hero | [EXCEÇÃO] |

### 2.2 Cores escritas direto no CSS (sem token global)
| Valor | Ocorrências | Uso | Observação |
|---|---|---|---|
| `#8a1212` | 8 (mais 3 tokens locais `--st-red`, `--bk-red`, `--w-red`) | "Vermelho sangue": campo de Cortes (`.on-blood`), títulos do Estúdio, ficha, CTA do rodapé, botão do mapa, WhatsApp flutuante | **É o vermelho de ação de fato**, mas não tem token global |
| `#6f0e0e` | 4 | Hover do vermelho sangue | sem token |
| `#c23a2e` | 4 | Ponto final vermelho, quadradinho das etiquetas, borda das páginas legais | sem token |
| `#d2463b` | 2 | Índice ativo do Hero, número do painel de Serviços | sem token |
| `#a2301f` | 1 | Pincelada de "CUSTA" | sem token |
| `#f6efe4` | 1 | Título de Serviços | quarta variação de off-white |
| `#ece2d0` | 3 (mais `--st-paper`) | Papel do Estúdio e do Onde | sem token global |
| `#f4ecdc` | 1 | Borda das fotos impressas (Cortes) | |
| `#e8dcc3`, `#e1d6bf` | 1 + 2 | Creme de campo da ficha e fundo do mapa | |
| `#4d4a43` | 3 (`--st-soft`, `--bk-soft`, `--w-soft`) | Texto secundário sobre papel | mesmo valor em 3 tokens locais |
| `#66615a`, `#6a655b` | 1 + 1 | Opção indisponível e placeholder | |
| `#0d0805` | 4 | Fundo quente atrás das fotos (Hero, Estúdio) | |
| `#1a1109` | 1 | Texto do botão dourado | |
| `#e8c25a` | 1 | Marca-texto "A CONFIRMAR" nas páginas legais | |
| `#000`, `#fff` | 1 + 1 | Fundo do preloader e hover do botão claro | |
| `rgba(...)` | 45 | Véus, filetes e textos translúcidos, derivados de `#101010`, `#0a0603`, `#080605`, `#e7e3da` e `#f2e8d5` | |

### 2.3 Papéis cromáticos [ATUAL]
| Papel | Sobre escuro | Sobre papel |
|---|---|---|
| Fundo | `--ink`; `#8a1212` em Cortes | `#ece2d0` (Estúdio, Onde), `--cream` (ficha) |
| Texto principal | `--paper` ou `--cream` | `--ink` |
| Texto secundário | `rgba(242,232,213,.7–.84)` | `#4d4a43` |
| Bordas / filetes | `rgba(231,227,218,.16–.55)` | `rgba(16,16,16,.22)` |
| Botão primário | `#8a1212` + creme (CTA do rodapé, "Solicitar") ou `--brick` + paper (cabeçalho) | `#8a1212` + creme |
| Foco | contorno de 3 px `--paper` | contorno de 3 px `--ink` |

### 2.4 Exceções cromáticas do Hero [EXCEÇÃO, APROVADO]
O Hero tem paleta própria, quente e "de campanha", que não reaparece no resto do site:
- fundo `#0d0805`, texto `--cream`, subtítulo e botão primário em `--gold`, filetes dourados `rgba(201,162,94,.4)`;
- véu radial e lineares em `rgba(10,6,3,…)`;
- índice ativo em `#d2463b`.

O dourado só existe aqui. **Regra:** não levar o dourado para outras seções sem aprovação.

### 2.5 Contraste (WCAG, medido)
| Par | Razão | Resultado |
|---|---|---|
| `--paper` sobre `--ink` | 14,86 | AAA |
| `--cream` sobre `--ink` | 15,66 | AAA |
| `--paper` sobre `--brick` (botão do cabeçalho) | 5,65 | AA |
| `--cream` sobre `#8a1212` | 7,94 | AAA |
| `#1a1109` sobre `--gold` (botão do Hero) | 7,81 | AAA |
| `#4d4a43` sobre `#ece2d0` | 6,88 | AA |
| `#8a1212` sobre `#ece2d0` | 7,52 | AAA |
| `#66615a` sobre `--cream` (opção indisponível) | 5,05 | AA |
| `#d2463b` sobre `--ink` (índice "01", 22 px peso 500) | **4,24** | **Abaixo de 4,5 para texto normal** [PENDENTE] |
| `#c23a2e` sobre `--ink` (ponto final, Anton > 60 px) | 3,57 | AA só para texto grande (é o caso) |
| `--mineral` sobre `--ink` | 3,99 | Só para texto grande ou elementos não textuais |

Texto sobre fotografia (Hero, Manifesto, Serviços) depende do véu e não é medível por script; foi avaliado a olho nas capturas.

---

## 3. Tipografia

### 3.1 Famílias carregadas (`app/layout.tsx`, `next/font/google`, auto-hospedadas)
| Família | Variável | Pesos carregados | Função real | Usada? |
|---|---|---|---|---|
| **Anton** | `--font-anton` → `--font-display` | 400 | Títulos monumentais, preços, números, CTAs grandes, letreiro | Sim |
| **Work Sans** | `--font-work` → `--font-text` | 400, 500, 600 | Texto corrido, nomes de serviço, campos; **também** várias etiquetas (ver 3.6) | Sim |
| **Lora** | `--font-lora` → `--font-serif` | variável, normal e itálico | Frases editoriais; **também** o título do Hero e textos corridos (ver 3.6) | Sim |
| **Barlow Condensed** | `--font-barlow` → `--font-cond` | 500, 600 | Navegação, etiquetas de seção, rótulos do formulário e do Onde | Sim |
| **Mrs Saint Delafield** | `--font-script` | 400 | Assinatura "Brutalmente bem-feito." | Sim, 2 ocorrências |

Nenhuma fonte é carregada sem uso. São **cinco famílias**, uma a mais que a regra desejada pelo proprietário (seção 3.7).

Fallbacks: Anton → `"Anton Fallback"` → Arial Narrow; Work Sans → system-ui; Lora → Georgia; Barlow → Arial Narrow; script → cursive.

### 3.2 Fallback da Anton e correção de CLS [APROVADO, commit `3cb1e81`]
O `next/font` gerava um fallback com `size-adjust: 90,69%` (calculado pelo `xAvgCharWidth`), que deixava o texto em caixa alta ~28% mais largo que a Anton real. Por isso títulos quebravam em mais linhas antes da fonte carregar, e a troca causava CLS.
- `adjustFontFallback: false` na Anton (`layout.tsx`).
- `@font-face "Anton Fallback"` no fim do `globals.css`: `src: local("Arial")`, `size-adjust: 71%` (razão medida entre a largura da Anton e a da Arial nos textos do site), `ascent-override: 165.68%`, `descent-override: 46.35%`, `line-gap-override: 0%` (métricas da Anton divididas pelo `size-adjust`).
- **Regra:** não remover nem recalcular sem medir CLS de novo. Se a Anton for trocada, o fallback precisa ser recalculado.

### 3.3 Hierarquia de títulos monumentais (Anton, caixa alta, peso 400) [ATUAL]
Todos usam `.display` (`line-height: .88`, `letter-spacing: -.01em`, `text-wrap: balance`) ou regras equivalentes.

| Nível | Elemento | Fórmula | 1440×900 | 1920×1080 | 1366×768 | 390 |
|---|---|---|---|---|---|---|
| XL | `.cuts__h` "NUCA LIMPA." | `clamp(3rem, --cu·14.6, 19rem)`, lh .84 | 184 | 221 | 157 | 121 (31vw) |
| L | `.footer__h` | `min(--u·10.4, 11.5rem)` | 150 | 184 | 136 | 66 |
| L | `.svcs__title`, `.where__h` | `--u·9.4` (Serviços com `clamp` 3.5–10.5rem) | 135 | 168 | 123 | 84 / 70 |
| M | `.book__h` | `clamp(3rem, --u·7.4, 8.75rem)` | 107 | 136 | 97 | 60 |
| M | `.seat__title` (vermelho) | `clamp(3.2rem, --u·6.4, 8rem)`, lh .86 | 92 | 118 | 84 | 74 |
| S | `.studio__h` | `clamp(2.5rem, --u·3.8, 4.9rem)`, lh .92 | 55 | 70 | 50 | 44 |
| Utilitário | `.svc__price` | `clamp(2.1rem, --u·2.9, 3.1rem)` | 42 | 50 | 38 | 42 |
| Utilitário | `.send`, `.footer__cta`, `.mapgate__btn` | 1.5rem / 1.25rem, ls .04em | 24 | 24 | 24 | 20–24 |
| Utilitário | `.svc__n`, `.opt__day b`, `.total b`, `.ficha__title`, `.where__sub` | 1.5–4.25rem | — | — | — | — |
| Letreiro | `.letreiro__item` | 15 px (12 px ≤ 760), ls .3em, opacidade .65 | 15 | 15 | 15 | 12 |

**Regras para títulos monumentais [APROVADO]:**
1. Anton 400, caixa alta, entrelinha entre 0,84 e 0,92 e tracking negativo leve (-0,01 a -0,012em).
2. Uma linha por `<span>` (máscara de linha). Quebras são decididas na copy, não pelo navegador (`white-space: nowrap` nas linhas de Agendar, Onde, Rodapé e Estúdio no desktop).
3. Tamanho no desktop sempre em `--u` (ou `--cu` em Cortes), nunca só em `vw`, para não crescer demais em telas baixas.
4. Teto em `rem` (`clamp`/`min`) para ultralargos.
5. Mobile em `vw` próprio, com composição própria.
6. Se a linha tiver acento em caixa alta (o "É" de Serviços), abrir espaço (`padding-top: .07em`) para o acento não colidir com a linha de cima.

### 3.4 Frases editoriais (Lora) [ATUAL]
| Elemento | Peso | 1440 | Uso |
|---|---|---|---|
| `.manifesto__lead` | 500 | 68 px (`--u·4.7`), lh 1.04, ls -.02em | Título do Manifesto (h2) |
| `.hero__h1` | 400 | 43,5 px, lh 1.12 | **Título principal da página (h1)** |
| `.manifesto__close` | 500 | 35 px | Fecho do Manifesto |
| `.hero__sub` | 400 itálico, dourado | 34 px | Subtítulo do Hero |
| `.studio__lead`, `.book__lead`, `.where__lead` | 400 | 27 px (`clamp(1.3rem, .9rem+.9vw, 1.9rem)`) | Lead editorial abaixo de título Anton |
| `.hero__lead`, `.studio__more` | 400 | 17 px, lh 1.7 | **Texto corrido em Lora** |
| `.seat__note` | 400 | 15 px | **Nota em Lora** |

### 3.5 Texto corrido, etiquetas e botões
| Função | Família | Valores | Elementos |
|---|---|---|---|
| Corpo padrão | Work Sans 400 | 17 px (`--fs-body`), lh 1.5 | `body` |
| Apoio editorial | Work Sans 400 | 18–21 px | `.manifesto__support`, `.svcs__lede`, `.cuts__lede` |
| Nome de item | Work Sans 500 | 22 px (19 no mobile) | `.svc__name` |
| Etiqueta de seção | Barlow 600 | 15 px, ls .22em, caixa alta, filete | `.manifesto__tag`, `.svcs__tag`, `.studio__tag`, `.book__tag`, `.where__tag` |
| Rótulo utilitário | Barlow 600 | 15–20 px, ls .1–.2em | `.step__label`, `.sum dt`, `.total span`, `.lines dt`, `.hours dt`, `.footer__label`, `.ficha__no`, `.where__mapbar` |
| Navegação | Barlow 500/600 | 18 px | `.nav`, `.hero__index` (22 px) |
| Micro-etiqueta | **Work Sans** 500/600 | **11 px**, ls .2–.34em, caixa alta | `.hero__eyebrow` (12 px), `.hero__facts`, `.svcs__label`, `.svc__min`, `.svc__cur`, `.svcs__readout span`, `.studio__aside`, `.studio__facts dt`, `.seat__n` |
| Botão do cabeçalho | Barlow 600 18 px | — | `.nav .button--small` |
| Botões do Hero | **Work Sans 600 12 px**, ls .16em | — | `.hero__btn` |
| CTA principal | Anton 24 px, ls .04em | — | `.send`, `.footer__cta`, `.mapgate__btn` |
| Assinatura | Mrs Saint Delafield 400 | 55 px (Serviços), `--cu·3.6` (Cortes), rotação -6° / -7° | `.svcs__sign`, `.cuts__sign` |

### 3.6 Auditoria tipográfica: Hero, Manifesto e Serviços (pedido do proprietário)

**Pergunta:** as três primeiras dobras falam a mesma língua tipográfica?
**Resposta: não.** A correção de escala (`d3d97ed`) **não resolveu isso** e nem poderia: ela mudou tamanhos (passou o dimensionamento para `--u`), não famílias nem papéis. O Hero nem usa `--u`.

Evidências (capturas atuais, `_tipografia/`, pasta de trabalho fora do Git):
- `1440x900-1-hero.png`, `1440x900-2-manifesto.png`, `1440x900-3-servicos.png`
- as mesmas três em `1920x1080-*`, `1366x768-*` e `390x844-*`

#### Medições reais (1440 × 900)
| Papel | Hero | Manifesto | Serviços |
|---|---|---|---|
| **Voz principal** | Lora 400, **43,5 px**, caixa baixa, centralizado | Lora 500, **68 px**, caixa baixa, à esquerda | **Anton 400, 135 px**, caixa alta, à esquerda |
| Etiqueta / sobretítulo | **Work Sans 500 12 px**, ls .34em, filetes dourados | Barlow 600 15 px, ls .22em, filete creme | Barlow 600 15 px, ls .22em, filete creme |
| Frase secundária | Lora itálico 34 px, dourado | Lora 500 35 px + sublinhado vermelho | Script 55 px ("Brutalmente bem-feito.") |
| Texto corrido | **Lora 17 px** | Work Sans 21 px | Work Sans 19 px |
| Botões / rótulos | **Work Sans 600 12 px** caixa alta; fatos em Work Sans 11 px | — | rótulos de grupo e minutos em **Work Sans 11 px** caixa alta; preços e números em Anton |
| Cor de destaque | Dourado `#c9a25e` | `--brick` (sublinhado) | `#a2301f` (pincelada) |
| Alinhamento | Centro | Esquerda | Esquerda |

#### O que isso significa
1. **O Hero não tem letra garrafal.** A primeira dobra é a única parte do site cujo título principal (o h1) não é Anton monumental, e usa o menor título-voz das três (43 px contra 68 e 135). O visitante vê "campanha de luxo delicada" no Hero, "editorial literário" no Manifesto e "pôster brutalista" em Serviços. São três linguagens.
2. **O Hero não usa Barlow para etiquetas.** O sobretítulo, os botões e os três fatos usam Work Sans espaçada, enquanto Manifesto e Serviços usam Barlow 600 15 px. É a diferença mais visível depois do título.
3. **Lora é usada como texto corrido no Hero** (o parágrafo de apoio). No Manifesto o apoio é Work Sans.
4. **Serviços repete o problema das micro-etiquetas:** `.svcs__label`, `.svc__min` e `.svc__cur` são Work Sans 11 px caixa alta, e não Barlow. Ficam a centímetros da etiqueta "SERVIÇOS", que é Barlow.
5. **Três destaques cromáticos em três dobras:** dourado, brick e `#a2301f`.
6. **O Manifesto está coerente com a regra desejada.** Lora como frase editorial é exatamente o papel previsto, e o Manifesto foi aprovado e congelado sem Anton (Etapas 06–08). Ele funciona como a pausa editorial entre duas dobras monumentais. A única ressalva é o peso: 500 aqui, 400 no Hero, Estúdio, Agendar e Onde.

#### Correção recomendada [PROPOSTA, não implementada]
Objetivo: uma gramática única em todas as dobras, **com cada dobra tendo uma só voz principal**:

> **Barlow** (etiqueta) → **voz principal** (Anton monumental *ou* Lora editorial, nunca as duas como título) → **Work Sans** (texto) → **Barlow** (ação / rótulo)

Para o Hero:
| Elemento | Hoje | Proposta |
|---|---|---|
| `.hero__eyebrow` | Work Sans 500 12 px, ls .34em | Barlow 600 15 px (`.9375rem`), ls .22em, igual às outras etiquetas; mantém os filetes dourados |
| `.hero__h1` | Lora 400 43 px | **Anton 400 caixa alta**, `font-size: clamp(3.25rem, calc(var(--u) * 7), 8rem)`, lh .88, ls -.01em, `max-width: 17ch` (2 linhas no desktop); mobile `clamp(3rem, 14.5vw, 5rem)` (3 linhas). Mantém a máscara por palavra |
| `.hero__sub` | Lora itálico dourado | **Mantém** (é a frase editorial da dobra) |
| `.hero__lead` | Lora 17 px | Work Sans 400 17 px, lh 1.55 |
| `.hero__btn` | Work Sans 600 12 px, ls .16em | Barlow 600 17 px (`1.0625rem`), ls .12em, igual ao "Agendar" do cabeçalho |
| `.hero__facts li` | Work Sans 500 11 px | Barlow 600 13 px, ls .16em (12 px, ls .1em no mobile) |

**Prova visual sem alterar o site:** essa proposta foi injetada só na sessão do navegador (CSS temporário via Playwright, nenhum arquivo tocado). Capturas: `_tipografia/PROPOSTA-1440x900-1-hero.png`, `PROPOSTA-1366x768-…`, `PROPOSTA-1920x1080-…`, `PROPOSTA-1024x768-…`, `PROPOSTA-768x1024-…`, `PROPOSTA-390x844-…`.
- Sem rolagem horizontal em nenhuma das seis.
- O título fica em 2 linhas em todas as larguras desktop e tablet: 101 px a 1440, 91 px a 1366×768, 128 px a 1920, 72 px a 1024.
- A 1366×768 o sobretítulo fica 42 px abaixo do cabeçalho. Uma primeira tentativa a `--u·8` encostava no cabeçalho e foi descartada.
- **Ressalva mobile:** a 390 px o Hero passa de 844 para 908 px de altura e os fatos caem abaixo da dobra. A implementação precisa reduzir o `padding-top` de `.hero__main` (hoje 22rem) ou o tamanho mobile do título. Isso não foi resolvido na prova.

Para Serviços: `.svcs__label`, `.svc__min` e `.svc__cur` em Barlow 600 a partir de 13 px, mantendo caixa alta e tracking. Isso também resolve parte do B-04 (texto < 12 px).

Para o Manifesto: nada estrutural. Opcional: decidir um único peso de Lora para frase de destaque (proposta: 500 acima de 2,5rem e 400 abaixo).

**Decisões que só o proprietário pode tomar:**
- (a) aprovar a troca do h1 do Hero para Anton. O Hero atual foi aprovado como referência de campanha, então isso reverte parte daquela aprovação;
- (b) manter ou retirar o dourado do Hero;
- (c) manter a script como quinta família (ver 3.7);
- (d) revisar a copy do Hero (1.3), que pesa tanto quanto a fonte na sensação de "outro site".

### 3.7 Regra tipográfica desejada e conformidade
Regra pedida pelo proprietário: **Anton** = títulos monumentais · **Lora** = frases editoriais · **Work Sans** = texto corrido · **Barlow Condensed** = etiquetas e utilitários.

| Regra | Conformidade hoje | Desvios |
|---|---|---|
| Anton para títulos monumentais | Quase total | Hero (h1 em Lora). `.studio__h` é Anton a 55 px, mais "título" que "monumental": aceitável |
| Lora para frases editoriais | Sim | Mas também usada como texto corrido (`.hero__lead`, `.studio__more`, `.seat__note`) e como h1 (Hero) |
| Work Sans para texto corrido | Sim | Mas também usada em ~10 micro-etiquetas caixa alta e nos botões do Hero |
| Barlow para etiquetas | Parcial | Etiquetas de seção e formulário sim; micro-etiquetas do Hero, Serviços e Estúdio não |
| Só quatro famílias | **Não** | Mrs Saint Delafield (assinatura, 2 usos). Recomendação: registrar como **[EXCEÇÃO] de assinatura**, no máximo uma por seção, só para a frase "Brutalmente bem-feito.", e decidir se continua em Serviços **e** Cortes |
| Anton em CTAs grandes | — | `.send`, `.footer__cta` e `.mapgate__btn` em Anton 24 px. Recomendação: aceitar como regra ("CTA de conversão = Anton; ação secundária = Barlow") |

Outros achados tipográficos:
- O texto vertical "BARBER STUDIO" do logo pede **Work Sans 700**, mas só 400, 500 e 600 são carregados. O navegador usa o 600 [PENDENTE, baixo impacto visual].
- `--fs-xl`, `--fs-statement` e a classe `.section-head` não são usados. A "escala de cinco tamanhos" de `DIRECAO.md` não existe mais.
- `--fs-small` = `--fs-body` = 17 px: o token "small" não é menor.

---

## 4. Layout e responsividade

### 4.1 Grid, containers e margens [ATUAL]
- **Margem lateral:** `--margin: clamp(1rem, 2.2vw, 2rem)` (16–32 px).
- **Grid de 12 colunas** (`.grid12`, gap `clamp(.75rem, 1.6vw, 1.5rem)`): só no Agendamento (intro 1–5, ficha 7–12).
- Demais seções têm grid próprio: Serviços 53,5/46,5; Estúdio 36/55/9; Onde e Rodapé 7/5.
- **Sem contêiner com largura máxima** (`.wrap` só tem padding). Apenas o mapa é limitado a 1600 px. Ver B-01 na seção 9.

### 4.2 Breakpoints reais
| Largura | Uso principal |
|---|---|
| ≤ 380 / 400 | Ajustes finos (tabela de Serviços, select, botão de envio, Hero) |
| ≤ 479 / 480 | Logo sem o selo vertical (`--lh-ar: 224/92`), cabeçalho 68 px, linhas do Onde |
| ≤ 600 / ≥ 601 | Manifesto mobile, dias em 3 colunas, respiro de Serviços |
| ≤ 699 / ≥ 700 | Cadeiras do Estúdio em coluna única |
| ≤ 720 | Navegação mostra só Serviços e Cortes |
| ≤ 760 / ≥ 761 | Hero mobile (foto vertical), letreiro, preloader, WhatsApp |
| **≤ 900 / ≥ 901** | **Principal corte desktop/mobile** (11 regras): Serviços, Cortes, Estúdio, Agendar, Onde, Rodapé ganham composição vertical própria |
| ≤ 1023 | Altura do mapa |
| ≤ 1099 / 1100 | Índice do Hero some; logo 50 px |

Há pares inconsistentes (479/480, 1099/1100, 760/761, 900/901). Funcionam, mas o ideal é um conjunto único (seção 9).

### 4.3 Estratégia de escala por largura **e** altura [APROVADO, commit `d3d97ed`]
- `--u: min(1vw, 1.7svh)`. Em telas "altas" (16:10, 4:3) vale 1vw; em telas baixas ou largas (16:9, ultrawide) vale 1,7svh. Assim títulos e ritmos não crescem com a largura quando a altura não acompanha.
- `--cu: min(1vw, 1.4svh)`, local de Cortes: a pilha de fotos nunca passa de ~1 tela.
- `--pad-sec: clamp(3.5rem, min(7vw, 10svh), 7rem)`: ritmo vertical de Agendar, Onde e Rodapé.
- Paddings de topo de seção: `clamp(5.5rem, min(9vw, 12svh), 8.5rem)` (Serviços, Agendar), `min(12vw, 16svh)` (Manifesto).
- `svh` em alturas de seção (`100svh` no Hero, `58svh` nas cadeiras, `44svh` no mapa), para não sofrer com a barra do navegador mobile.
- `vw` puro só no mobile (≤ 900) e em posições horizontais (fotos de Cortes).
- `clamp()` com teto em `rem` em todo tamanho fluido.
- **Exceção:** o Hero não usa `--u`. É `100svh` com título em `clamp` por `vw`.

Alturas medidas das três dobras: Hero 900 / Manifesto 900 / Serviços 914 a 1440×900; 768 / 768 / 839 a 1366×768; 1080 / 1024 / 1080 a 1920×1080. Nenhuma dobra passa de ~1,1 tela no desktop.

### 4.4 Regras para preservar a identidade sem gigantismo
1. Todo tamanho desktop novo passa por `--u` (ou por uma unidade local do mesmo tipo).
2. Toda seção desktop deve caber em ~1 a 1,2 tela a 1366×768 e 1440×900, salvo conteúdo de lista longa.
3. Título monumental tem teto em `rem`.
4. Mobile é composto, não empilhado: cada seção tem bloco `@media (max-width: 900px)` próprio.
5. Nada de `vw` sozinho para altura no desktop.

### 4.5 Exceções justificadas
- **Formulário de agendamento:** a ficha não escala por `--u` (campos de 48–64 px, texto 15–17 px). Formulário precisa de alvos de toque e legibilidade fixos. Só `.total b` usa `--u`.
- **Manifesto mobile:** `max(100svh, 250vw)` de altura, para a cadeira inteira caber abaixo do texto (Etapa 08, congelado).
- **Serviços mobile:** `.svcs` tem ~2074 px de altura a 390 (8 linhas de preço + foto vertical). É conteúdo, não excesso.

---

## 5. Componentes

### 5.1 Cabeçalho e navegação [APROVADO]
- `sticky`, altura 76 px (68 px ≤ 479), transparente no topo (`.is-top`, scroll < 24 px) e `--ink` sólido depois (transição de 220 ms).
- Logo SVG vivo (`Wordmark.tsx`): no hover com mouse, tilt 3D (±13° / ±9°, perspectiva 520 px) e letra sob o ponteiro sobe 4 un. e cresce 8%. Suavização de ~300 ms em rAF. Desligado no toque e em movimento reduzido.
- Links em Barlow 500 18 px, sublinhado no hover; "Agendar" é `.button--small` (Barlow 600, `--brick`, 44 px).
- ≤ 720 px: só Serviços, Cortes e Agendar (sem menu hambúrguer, decisão de design).

### 5.2 Botões e CTAs [ATUAL]
| Tipo | Classe | Visual | Hover / ativo |
|---|---|---|---|
| Base | `.button` | `--brick`, paper, 48 px, quina viva | `--brick-strong`; `scale(.97)` |
| Cabeçalho | `.button--small` | 44 px, Barlow 600 18 | idem |
| Hero primário | `.hero__btn--gold` | dourado, Work Sans 12 caixa alta, ícone | `--gold-soft` |
| Hero secundário | `.hero__btn--line` | contorno creme 1 px | fundo creme 10%, seta +4 px |
| Conversão | `.send`, `.footer__cta` | `#8a1212`, Anton 24, 64 px, seta | `#6f0e0e`, seta +5 px; `scale(.985/.97)` |
| Mapa | `.mapgate__btn` | `#8a1212`, Anton 20, 48 px | `#6f0e0e` |
| Link de texto | `.link` | sublinhado a 45% | 100% |

Todos os hovers ficam dentro de `@media (hover: hover) and (pointer: fine)`.

### 5.3 Cards e elementos editoriais
- **Linha de serviço** (`.svc`): número Anton, nome Work Sans, minutos, preço Anton, seta. No hover/foco: barra vermelha de 3 px cresce (`scaleX`), número desloca 6 px, corpo 14 px, demais linhas a 50%. O painel `.svcs__readout` sobre a foto mostra a linha ativa. Clique leva a `#agendar` com o serviço pré-selecionado.
- **Fotos impressas** (Cortes): borda creme, rotação de -2,5° a 3°, sombra, fita em duas. Hover: endireita e `scale(1.045)`.
- **Cadeiras** (Estúdio): retrato com cabeçalho e nota "recortados" no papel.
- **Linhas de dados** (`.lines`, `.hours`, `.sum`): rótulo Barlow + valor Work Sans 600, filetes de 1 px. "Hoje" em vermelho.

### 5.4 Formulário (ficha / senha de balcão) [APROVADO]
- Papel `--cream` com borda superior vermelha de 4 px; picote tracejado e dois furos circulares no rodapé da ficha.
- Passos com rótulo Barlow 600 17 px numerado em vermelho; `fieldset`/`legend`.
- Select nativo estilizado (56 px); dias (68–72 px) e horários (48 px) em radio; selecionado = fundo `--ink` com filete inferior vermelho; indisponível = tracejado; passado = riscado.
- Nome em campo de linha (borda inferior de 2 px, vermelha no foco).
- Resumo e total (Anton vermelho) e botão "Solicitar" (Anton, abre o WhatsApp com a mensagem montada).
- Troca de valor anima com `.swap` (220 ms).

### 5.5 WhatsApp flutuante [APROVADO]
- 56 px, círculo `#8a1212`, ícone creme, borda creme a 35%, sombra. Canto inferior direito (16 px; 24 px ≥ 761), respeitando `safe-area`.
- Escondido durante o preloader, ao ver o logo do rodapé (IntersectionObserver) e **enquanto estaria sobre um CTA principal** (`.send`, `.footer__cta`, `.hero__btn`), com detecção de oclusão real por `elementsFromPoint` (commit `f218141`).
- Saída: opacidade 220 ms, depois `visibility: hidden`. Pressão: `scale(.94)`.
- Número e mensagem em `lib/site.config.ts`.
- [EXCEÇÃO] Círculo e sombra contrariam "sem raio, sem sombras": é convenção reconhecível do WhatsApp.

### 5.6 Rodapé [APROVADO]
Título "QUEM CHEGA, SENTA." com ponto vermelho, CTA de conversão, duas colunas de navegação (Barlow nos rótulos), legal, e o **logo em largura total** (`container-type: inline-size`, altura `100cqw / 3.295`), cortado pela borda.

### 5.7 Estados de foco e interação
- `:focus-visible` global: contorno de 3 px, offset 3 px, cor ajustada ao fundo (paper sobre escuro, ink sobre papel e ficha, cream sobre sangue).
- Linhas de serviço: offset -3 px e mesma resposta do hover.
- Alvos de toque: botões ≥ 44 px; opções ≥ 48 px; links do rodapé e do Onde ≥ 44 px. Exceção [PENDENTE]: índice do Hero (19×24 px) e links do cabeçalho (42 px de largura).

---

## 6. Motion Design

### 6.1 Princípios [APROVADO]
- Só `transform`, `translate`, `scale`, `opacity` e `clip-path` (o `clip-path` é usado em cortinas, shutter e letreiro).
- Curvas: `--ease-out` = `cubic-bezier(.23, 1, .32, 1)`; `--ease-in-out` = `cubic-bezier(.77, 0, .175, 1)`; preloader `cubic-bezier(.87, 0, .13, 1)` (expo.inOut).
- Durações: pressão 140 ms (`--t-press`), hover 180 ms (`--t-hover`), revelações de 700 a 1100 ms, fotos de 1100 a 1500 ms.
- Animações ligadas ao scroll usam `animation-timeline` (CSS) com fallback temporizado.

### 6.2 Inventário
| Animação | Arquivo | O que faz | Valores |
|---|---|---|---|
| **Preloader + voo da logo** | `Preloader.tsx`, `preloader.css` | Tela preta; logo desenhado traço a traço; cortina sobe; o logo **voa** (FLIP) até o logo do cabeçalho e troca no mesmo quadro | desenho 1500 ms (power1.in), saída após ≥ 1000 ms e após decodificar a foto do Hero (teto 3 s), saída 2500 ms expo.inOut; Hero liberado 800 ms após início da saída; rolagem destravada a 75%; reserva de 12 s no `<head>`. `?preloader=off` desliga. Camada em voo invisível até ser posicionada (CLS, commit `c5a4e29`) |
| **Entrada do Hero** | `globals.css` (Movimento) | Cortina do centro, zoom da foto, palavras sobem por máscara, filetes do sobretítulo, *rise* do resto, índice com fade, cue do mouse em loop | cortina 1300 in-out; zoom 1,1→1 em 2000; palavras 900 com 90 ms de escalonamento a partir de 650; *rise* 900 (14 px); cue 2400 infinito |
| **Parallax de saída do Hero** | idem, `scroll(root)` | Foto desce 6%, copy sobe 36 px e vai a .15 de opacidade | 0–100vh / 0–70vh |
| **StackReveal** | `StackReveal.tsx`, `stack-reveal.css` | Hero fica retido (`sticky`, pelo pé quando é mais alto que a tela) e o Manifesto sobe por cima; sombra de profundidade na borda | sombra só em opacidade, `view-timeline`, entry 0–35% |
| **Entrada do Manifesto** | `globals.css` | Foto: fade 1400 ms + `scale` 1,06→1 em 2600 ms; texto em cascata (140 ms + 250) | deriva `translate ±2,2%` por `view()` (desligada ≤ 600) |
| **WordsLight** | `WordsLight.tsx`, `words-light.css` | Palavras do Manifesto acendem com o scroll (opacidade .3 → 1), 4 palavras em transição | `--p` 0→1 escrito em rAF com suavização por tempo (τ 90 ms); faixa de 88% a 12% da tela |
| **Letreiro** | `Letreiro.tsx`, `letreiro.css` | Faixa de 36 px (30 ≤ 760) abre da esquerda (`clip-path` 1200 ms) e corre a **20 px/s constantes** em rAF; pausa fora da tela | 6 cópias, `translate3d` |
| **Transição de Serviços** | `globals.css` (Etapa 04) | Cortina da cor de fundo encolhe por `scaleY` guiada pelo scroll; foto assenta 1,07→1; etiqueta e título sobem com o scroll | `view-timeline: --svc-shot`, entry 0–60% / 0–100% / 0–85%; fallback = shutter temporizado |
| **Linha de serviço** | idem | Barra vermelha `scaleX` 320 ms, deslocamentos 220 ms, painel `swap` 220 ms | — |
| **Revelações genéricas** | `Reveal.tsx` | `[data-reveal]` sobe 24 px e aparece (700/900 ms, 70 ms de escalonamento); `[data-shutter]` abre de cima para baixo (1100 ms) com a foto 1,12→1 (1500 ms); `[data-drop]` cai com rotação | IntersectionObserver, -8% inferior, uma vez só |
| **Máscara de linha** | Cortes, Estúdio, Agendar, Onde, Rodapé | Cada linha sobe 108% → 0 (1100 ms, segunda linha +130 ms) | — |
| **Fotos de Cortes** | idem | Caem (46 px, rotação ×2,2, `scale` .95) em cascata de 130 ms; depois parallax individual por `view()` | — |
| **Estúdio** | idem | Shutter de 1400 ms na principal, cadeiras escalonadas em 160 ms, detalhe com entrada própria e parallax ±1,1vw; hover `scale(1.035)` | — |
| **Logo do rodapé** | idem | Sobe 28 px em 1200 ms | — |
| **Logo do cabeçalho** | `Wordmark.tsx` | Tilt 3D + letra sob o ponteiro (5.1) | — |
| **WhatsApp** | `WhatsAppFloat.tsx` | Some e reaparece por opacidade (5.5) | 220 ms |

### 6.3 `prefers-reduced-motion` [APROVADO]
- Preloader não roda (script do `<head>`).
- Toda animação de entrada está dentro de `@media (prefers-reduced-motion: no-preference)` e/ou atrás de `.js`: sem movimento ou sem JS, o conteúdo aparece no estado final.
- StackReveal: fluxo normal, sem retenção.
- WordsLight: não liga (texto na cor final) e reage a mudança da preferência em tempo real.
- Letreiro: estático, quebrando em linhas, sem cópias visuais.
- Logo do cabeçalho: sem tilt. Transições de hover de Serviços e WhatsApp: desligadas.
- Há um bloco `@media (prefers-reduced-motion: reduce) {}` **vazio** no `globals.css` (resto de limpeza, sem efeito).

---

## 7. Diretrizes de imagens

### 7.1 Linguagem fotográfica [ATUAL]
Luz baixa e dirigida, sombras profundas, tons quentes (âmbar, madeira, couro), objetos de ofício (navalha, máquina, cadeira) e mãos em ação. Pessoas só como prova de corte, nunca como "equipe" ou "cliente" do BRUTTO.

| Seção | Imagem | Origem |
|---|---|---|
| Hero | Bancada com produtos BRUTTO (desktop 1672×941, mobile 941×1672) | Gerada por IA, fornecida pelo proprietário |
| Manifesto | Cadeira vermelha num cômodo desgastado (`chair-solo.jpg`), cores naturais | CC BY-SA 2.0 |
| Serviços | Barbeiro com navalha (horizontal e vertical) | IA (ChatGPT/OpenAI) |
| Cortes | 5 fotos de cortes e nuca | CC0 e CC BY 2.0 |
| Estúdio | Salão, 3 cadeiras e detalhe da bancada | IA (ChatGPT/OpenAI) |

### 7.2 Enquadramento e proporções
- Hero: tela cheia (`cover`, 50% 50%; mobile 62% 0%), `<picture>` com fonte própria ≤ 760 px.
- Manifesto: fundo da seção (66,7vw ≈ proporção da foto, máx. 100svh; mobile 250vw), cadeira no terço direito e texto na parede esquerda.
- Serviços: sangra até a borda esquerda e cobre a coluna (desktop); retrato 2:3 entre título e texto (≤ 900).
- Cortes: proporções de .82 a 1 e larguras em `--cu`.
- Estúdio: principal 16:9 (4:3 mobile), cadeiras 3:4 limitadas a 58svh, detalhe 3:2 sobreposto.

### 7.3 Tratamento
- **Sem filtro de cor em CSS hoje.** Nenhum `filter`, `grayscale` ou `sepia` no código. O `CREDITOS.md` ainda menciona "P&B/sépia por CSS" em etapas antigas, o que está desatualizado.
- Legibilidade por **véu localizado** (gradientes radiais/lineares só onde há texto), nunca véu chapado.
- Sem grão, sem duotone.
- Formatos: WebP/AVIF via `next/image` ou `<picture>` com `srcset` e `sizes` reais, e dimensões declaradas.

### 7.4 Composição e sobreposições
- Texto sobre foto só com véu dirigido e em área calma da imagem (parede, sombra).
- Sobreposições intencionais: detalhe do Estúdio sobre a principal; cabeçalhos das cadeiras e prints de Cortes sobre o campo vermelho.
- Fita adesiva só em 2 de 5 prints.

### 7.5 Desktop × mobile
Toda imagem principal tem enquadramento mobile próprio (fonte vertical ou `object-position` específico). Imagem nova precisa de versão mobile ou de `object-position` testado a 390.

### 7.6 Licença
Regras de `CLAUDE.md` e `CREDITOS.md`: só imagem com licença verificada, registrada em `CREDITOS.md` e na página `/creditos`.

---

## 8. Regras de manutenção

### 8.1 O que deve permanecer consistente
Paleta-base (ink, paper, brick, vermelho de ação), Anton monumental com máscara de linha, gramática Barlow → voz → Work Sans, quinas vivas, véu dirigido, `--u` no desktop, composição mobile própria, revelações só em `transform`/`opacity`/`clip-path`, respeito a `prefers-reduced-motion`, fallback calibrado da Anton.

### 8.2 O que pode ser adaptado
Copy (respeitando 1.3), fotos (respeitando a seção 7), número de linhas de serviço, horários e dados, ordem de seções intermediárias, tamanho do título dentro da faixa da tabela 3.3.

### 8.3 Como adicionar uma seção nova
1. Escolher **uma** voz principal (Anton *ou* Lora) e uma composição diferente da vizinha.
2. Etiqueta Barlow 600 15 px, ls .22em, com filete.
3. Título Anton com fórmula em `--u` e teto em `rem`, na faixa L ou M da tabela 3.3.
4. Texto em Work Sans; rótulos em Barlow; nada de Work Sans caixa alta 11 px.
5. Cores só da paleta (2.1 e 2.2); nenhum vermelho novo.
6. Bloco `@media (max-width: 900px)` próprio.
7. Entradas com `data-reveal` / `data-shutter` / máscara de linha existentes; nada de animação nova sem função.
8. Ritmo vertical com `--pad-sec`.

### 8.4 Como validar alterações visuais
1. `npx tsc --noEmit` e build isolado: `NEXT_DIST_DIR=.next-check npm run build`. Não derruba o servidor da 3100.
2. Playwright em **1440×900, 1366×768, 1920×1080, 1024, 768 e 390**: screenshot, rolagem horizontal, texto cortado, foco por teclado, console e `prefers-reduced-motion`.
3. Taste: `lint.mjs` no código e `inspect.mjs` na página, corrigindo FAIL e justificando WARN.
4. Comparar com as capturas de referência mais recentes (`_tipografia/`, `_escala/final/`).

### 8.5 Como evitar regressões
- **CLS:** não mexer no fallback da Anton nem no `visibility` do logo em voo sem medir CLS (com e sem preloader); toda imagem com `width`/`height`; títulos com `nowrap` por linha.
- **Overflow:** `html`/`body` com `overflow-x: clip` escondem o sintoma, não a causa. Testar com `scrollWidth > innerWidth` e verificar elementos com `vw` + margem negativa (Serviços, Cortes, Estúdio).
- **Animação:** nada de animar `width`, `height`, `top` ou `filter`; manter `will-change` só na cortina de Serviços e no letreiro; testar o fallback sem `animation-timeline` (Firefox e Safari antigos); conferir que nada fica invisível sem JS.
- **Build:** o build isolado altera o `tsconfig.json` (`.next-check/types`). **Não commitar** essa alteração.

### 8.6 Decisões que exigem aprovação do proprietário
Qualquer mudança em: Manifesto (congelado), Hero (composição, paleta, copy, fonte do título), logo, paleta-base, família tipográfica, preloader (duração e política), StackReveal, letreiro, copy de títulos, imagens principais, remoção de seção, e qualquer item marcado **[APROVADO]** ou **[PROPOSTA]**.

---

## 9. Exceções e pendências

### 9.1 Exceções existentes (conscientes)
| Exceção | Justificativa | Status |
|---|---|---|
| Paleta dourada e copy centralizada do Hero | Referência de campanha aprovada | [APROVADO], mas em revisão pela auditoria 3.6 |
| Ícones nos fatos e botões do Hero | Parte da referência aprovada | [APROVADO], contraria a regra de "sem ícones decorativos" |
| Índice 01/02/03 do Hero | Navegação real, `sr-only` | [APROVADO] (`taste-skill-ignore`) |
| Gradientes (véus) e sombras (prints, detalhe, WhatsApp) | Legibilidade e profundidade | [ATUAL]. `DIRECAO.md` diz "sem gradientes, sem sombras" |
| Script Mrs Saint Delafield | Assinatura | [APROVADO], quinta família |
| Manifesto sem Anton | Pausa editorial | [APROVADO], congelado (Etapa 08) |
| Formulário fora da escala `--u` | Usabilidade | [ATUAL] |
| WhatsApp circular | Convenção | [ATUAL] |

### 9.2 Comportamento atual que diverge da documentação anterior
`DIRECAO.md` está desatualizado nos pontos abaixo. Este Kit passa a valer sobre ele:
- Tipografia: "Anton e Work Sans, cinco tamanhos". Hoje são 5 famílias e cerca de 20 tamanhos.
- Hero: descreve título de 3 linhas, recorte inline, pincelada, selo e reel. Nada disso existe no Hero atual.
- Cor: "vermelho queimado na ação" e "cinza mineral no painel de horários". A ação hoje é `#8a1212`, e o mineral só aparece na barra de rolagem.
- Movimento: "reel fixado dentro da frase" não existe mais.
- Etapas 11 a 16 e Etapas 02 a 04 de motion (StackReveal, WordsLight, Letreiro, Serviços) não constam.
- `CREDITOS.md`: menções a tratamento P&B/sépia por CSS estão desatualizadas.

---

## 10. Auditoria de consistência (documento × tokens × CSS × componentes)

Só registro. **Nada foi alterado.**

| # | Divergência | Onde | Recomendação | Prioridade |
|---|---|---|---|---|
| C-01 | Hero sem Anton e com linguagem própria (3.6) | `.hero__*` | Proposta 3.6, com aprovação | **Alta** |
| C-02 | Micro-etiquetas em Work Sans caixa alta 11 px em vez de Barlow | `.hero__eyebrow`, `.hero__facts`, `.hero__btn`, `.svcs__label`, `.svc__min`, `.svc__cur`, `.svcs__readout span`, `.studio__aside`, `.studio__facts dt`, `.seat__n` | Barlow 600 ≥ 13 px (resolve parte do B-04) | **Alta** |
| C-03 | Vermelho de ação `#8a1212` sem token, repetido em 8 lugares + 3 tokens locais iguais | Cortes, Estúdio, Agendar, Onde, Rodapé, WhatsApp | Criar `--blood` / `--blood-strong` em `:root` e trocar valores idênticos (sem mudança visual) | Média |
| C-04 | Cinco vermelhos (`#9b332b`, `#8a1212`, `#a2301f`, `#c23a2e`, `#d2463b`) + 2 hovers | geral | Decidir 2 vermelhos oficiais (campo/ação e destaque sobre escuro) | Média (decisão) |
| C-05 | Quatro off-whites para texto sobre escuro (`#e7e3da`, `#f2e8d5`, `#f6efe4`, translúcidos) | Manifesto paper, Serviços `#f6efe4`, Cortes cream | Unificar `.svcs__title` em `--cream` ou `--paper` | Baixa |
| C-06 | `#4d4a43` em 3 tokens locais (`--st-soft`, `--bk-soft`, `--w-soft`); `#ece2d0` em `--st-paper` e literal | Estúdio, Agendar, Onde | Promover a `:root` | Baixa |
| C-07 | Tokens e classes mortos: `--paper-2`, `--fs-xl`, `--fs-statement`, `.section-head`, `.on-paper`, `.on-brick`, `.on-mineral`, `.statement` (só no seletor de `text-wrap`), bloco reduced-motion vazio | `globals.css` | Remover numa limpeza dedicada | Baixa |
| C-08 | `--fs-small` igual a `--fs-body` | `:root` | Renomear ou dar valor real | Baixa |
| C-09 | Lora como texto corrido | `.hero__lead`, `.studio__more`, `.seat__note` | Work Sans (Hero na proposta; Estúdio exige aprovação) | Média |
| C-10 | Pesos de Lora 400 × 500 em frases de destaque | Manifesto × demais | Regra única (3.6) | Baixa |
| C-11 | Logo pede Work Sans 700, não carregado | `logo.css` | Carregar 700 ou declarar 600 | Baixa |
| C-12 | Script repetida em Serviços e Cortes com a mesma frase | `.svcs__sign`, `.cuts__sign` | Manter em uma só | Baixa (decisão) |
| C-13 | Breakpoints em pares (479/480, 760/761, 900/901, 1099/1100) | geral | Padronizar em 480 / 600 / 760 / 900 / 1100 | Baixa |
| C-14 | `DIRECAO.md` e `CREDITOS.md` desatualizados (9.2) | docs | Apontar para este Kit e atualizar | Média |
| C-15 | Copy do Hero e mensagem do WhatsApp ("solicitar um orçamento") fora do tom | `Hero.tsx`, `site.config.ts` | Revisão de copy com o proprietário | Média (decisão) |
| C-16 | Título de Serviços: "O QUE SE FAZ **É** QUANTO CUSTA". `DIRECAO.md` diz "o que se faz **e** quanto custa" | `Services.tsx` | Confirmar se o "É" (verbo) é intencional | Média (decisão) |
| C-17 | WhatsApp em duas fontes: `lib/data.ts` (`WHATSAPP_*`) e `lib/site.config.ts` | lib | Unificar | Baixa |

---

## 11. Pendências reais, por prioridade

### Alta
1. **C-01 / C-02:** coerência tipográfica Hero → Manifesto → Serviços (proposta 3.6), com ajuste mobile do Hero.
2. **A-01 (auditoria Etapa 16):** preloader de ~3,7 s em todo carregamento completo (LCP desktop 0,76 s → 4,69 s). Decisão de política pendente.
3. **A-02:** `/creditos` não declara a imagem do Hero como gerada por IA, e o campo "Usada em: Início e Cortes" está errado para `barber-razor`, `barber-comb` e `fade-*` (`lib/data.ts:51-54`).

### Média
4. **B-01:** sem contêiner de largura máxima. Onde e Agendamento se espalham em 2560–3440 px.
5. **B-03:** sem link "Pular para o conteúdo".
6. **B-04:** 26 blocos de texto com 11 px (parte resolvida por C-02).
7. **B-08:** "Hoje" fica selecionado mesmo sem horários.
8. **Contraste:** índice "01" do Hero a 4,24:1.
9. **B-13:** ESLint ausente.
10. **C-03 / C-04 / C-09 / C-14 / C-15 / C-16.**

### Baixa
11. B-06 (alvos do índice e do cabeçalho), B-07, B-09, B-10, B-12, B-14, B-15, B-17, B-18 (ver `AUDITORIA-FINAL-ETAPA-16/RELATORIO.md`).
12. C-05 a C-08, C-10 a C-13, C-17.

### Já resolvidos desde a auditoria da Etapa 16
- **B-02** (fallback do mapa): o iframe agora só existe depois do clique em "Carregar mapa" (`MapEmbed.tsx`).
- **B-11** (assets sem uso em `public/`): `public/photos` e `public/hero` só têm arquivos em uso.
- **CLS do preloader no mobile** (`c5a4e29`) e **fallback da Anton** (`3cb1e81`).
- **Escala por altura de viewport** (`d3d97ed`).

---

## Registro

- Este documento foi escrito sem alterar nenhum arquivo do site. As provas visuais da seção 3.6 usaram CSS injetado só na sessão do navegador.
- Capturas desta auditoria: `_tipografia/` (pasta de trabalho, não versionada).
- Próximo passo: aprovação do proprietário. Depois, as correções viram lotes pequenos, cada um com a validação 8.4.
