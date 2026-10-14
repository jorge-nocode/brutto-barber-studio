# BRUTTO Barber Studio — Etapa 16: auditoria de pré-lançamento

Data: 14/10/2026. Escopo: somente diagnóstico. Nenhum arquivo do site foi alterado.
Alvo testado: `next start` em produção (porta 3100), build de 14/10 19:15. Nenhum arquivo-fonte é mais novo que o build, então o site servido corresponde ao código atual.
Navegador: Chromium do Playwright (headless).

## 1. Resumo executivo e veredito

**Veredito: aprovado para portfólio com 2 ressalvas; não pronto para entrega comercial.**

- **P0 (bloqueador): nenhum.**
- **P1: 2.** O preloader de ~3,7 s a cada carregamento completo, e a página de créditos que omite a imagem do Hero (gerada por IA).
- **P2: 8.**
- **P3: 11.**

O que funciona e foi medido:
- Sem erros nem avisos de console em 11 larguras (360 a 3440, mais 2 mobile horizontais).
- Sem rolagem horizontal em nenhuma largura.
- Todos os reveals disparam, inclusive com pulo direto ao rodapé.
- O agendamento acertou 100% das regras testadas.
- TypeScript, build e `npm audit` passam.
- O Impeccable não encontrou nada no código-fonte.
- O mapa carrega só ao rolar até ele.

O problema visual que você pediu para investigar foi **confirmado**. Em 3440 px não existe contêiner com largura máxima em nenhuma seção. O conteúdo vai de 32 px a (largura − 32 px). Isso afeta **Onde e Agendamento** de forma clara (item B-01).

## 2. Reconhecimento

| Item | Resultado |
|---|---|
| Stack | Next 15.5.27, React 19, Tailwind 4, TypeScript 5.9. 2 rotas: `/` e `/creditos`. |
| Componentes | Hero, Manifesto, Services, Cuts, Studio, Booking, Hours, Preloader, Reveal, Wordmark, LogoMark. |
| Git | Branch `main`, 3 commits. **`app/globals.css` está modificado e sem commit** (CSS do mapa da 15D). |
| Scripts | Só `dev`, `build` e `start`. **Não há script de teste nem de lint.** |
| Dependências | 0 vulnerabilidades (`npm audit`). Nada instalado. |

## 3. Resultados dos diagnósticos de código

| Diagnóstico | Resultado |
|---|---|
| TypeScript (`tsc --noEmit`) | OK, sem erros. |
| Build de produção | OK. Feito numa **cópia em pasta temporária**, para não derrubar o servidor da 3100. `/` = 13,4 kB, First Load JS 116 kB. Log: `logs/build.txt`. |
| ESLint | **Não executável**: não há ESLint instalado nem configuração (ver B-13). O passo "Linting" do `next build` é ignorado em silêncio. |
| Taste lint | 3 FAIL, 4 WARN (`logs/taste-lint.txt`). Detalhe em B-16. |
| Taste inspect (1440, 768, 390) | 13 FAIL, 5 WARN (`logs/taste-inspect.txt`, capturas em `.taste-skill/inspect/`). Quase tudo é escolha estética aprovada (ver B-16). |
| Impeccable detect (código-fonte) | 0 achados. |
| Erros de hidratação e console | Nenhum, nem `error` nem `warning`. |
| Credenciais expostas | Nenhuma no código. A chave `AIzaSy…` que aparece na rede é do **próprio Google**, dentro dos frames do mapa, não do projeto. |
| Código morto | Imports todos usados. Há **assets** sem uso (B-11). |

### Os 3 FAIL do Hero (Taste lint)

São a mesma regra, `numbering`: `Hero.tsx:92-94`, os índices "01 / 02 / 03".
- Não são bug. É uma navegação real, com nomes acessíveis em `sr-only`.
- Só aparece em telas ≥ 1100 px.
- Ela está em `app/page.tsx` e `Hero.tsx`, e o lint a trata como numeração decorativa.
- A recomendação está em B-16.

## 4. Auditoria visual (9 seções)

Sem defeito concreto em Hero, Manifesto, Serviços, Cortes, Estúdio, Agendamento, Contato, Mapa e Rodapé nas larguras ≤ 2560 px. Nenhuma escolha aprovada foi tocada.

Em **3440 px**:
- **Onde** e **Agendamento**: lacuna excessiva (B-01). Evidência: `evidencias/3440-onde.png` e `3440-agendar.jpg`.
- **Serviços, Estúdio e Cortes**: o conteúdo se espalha, mas a composição é de imagem + lista e se sustenta. Não considero defeito. É preferência.
- **Hero, Manifesto e Rodapé**: sem problema.

## 5. Responsividade

| Largura | Rolagem horizontal | Observação |
|---|---|---|
| 360 / 390 / 430 | Não | Menu mostra só Serviços, Cortes e Agendar (sem hambúrguer; B-15). |
| 768 / 1024 | Não | `.svcs__mark` sai 3 px da tela à esquerda; está contido por um pai com overflow, sem efeito visível. |
| 1440 / 1920 / 2560 | Não | — |
| 3440 | Não | Ver B-01. |
| 844×390 e 640×360 (horizontal) | Não | O Hero é mais alto que a tela (640 px contra 390 px). A rolagem é necessária e esperada. Sem sobreposição. |
| Zoom 200% (720×450 a 2×) | Não | Sem sobreposição medida entre título, botões e fatos do Hero. |
| 1440×500 (altura baixa) | Não | Idem. |

A medição "nav 134..353" a 360 px é artefato: o Chromium headless reserva 15 px de barra de rolagem que celulares reais não têm.

## 6. Funcionalidades

### Agendamento (relógio simulado com `page.clock`)

| Teste | Resultado |
|---|---|
| 8 serviços: duração, preço, total | **Todos corretos** (min, R$ e total conferidos). |
| Janelas de horário por serviço, em dia útil e sábado | Idênticas ao cálculo esperado (fecha às 20h e às 18h no sábado). Combo (90 min) no sábado: 5 horários. |
| Horários passados hoje (14h) | Só 15:30, 17:00 e 18:30 habilitados. |
| Sem horário (hoje 19:45 e sábado 17:30) | Estado vazio com mensagem correta. Ver B-08. |
| Domingo | Nunca é oferecido. Se hoje é domingo, "Amanhã" é segunda. |
| Troca de serviço ou dia com horário escolhido | A seleção é limpa e o aviso aparece em `role=status` (2 casos). |
| Mensagem do WhatsApp | Correta. Acentos, aspas e `&` do nome ficam codificados. `target=_blank` com `rel=noopener noreferrer`. Com e sem horário e nome funciona. |
| Clique numa linha de Serviços | Seleciona o serviço no formulário e rola para `#agendar`. |

Nenhuma mensagem real foi enviada.

### Âncoras e links

- Todas as âncoras `#...` existem.
- Nas âncoras, o título da seção fica abaixo do cabeçalho fixo (72 px de offset), em 1440 e 390.
- Links externos: WhatsApp, Instagram e Maps, todos com `noopener noreferrer`.

### Google Maps

| Teste | Resultado |
|---|---|
| Carregamento real | OK. |
| Lazy | **0 requisições ao Google antes de rolar até o mapa**; 38 depois. |
| Largura | Limitado a 1600 px e centralizado. |
| Teclado | Tab entra no iframe e sai para "Abrir no Google Maps"; o link externo funciona. |
| Fallback | Não funciona na prática (B-02). |

## 7. Animações

| Item | Resultado |
|---|---|
| Reveals durante a rolagem | OK. Em todos os testes, 0 elementos ficaram invisíveis no viewport. |
| Pulo direto ao fim da página | OK (`evidencias/pulo-direto-rodape.jpg`). |
| Parallax | CSS puro com `animation-timeline: scroll()`, só `translate`/`transform`. Sem travamento medido. |
| Reduced-motion | Preloader pulado, 0 animações rodando, nada oculto. |
| Sem JavaScript | Nada fica invisível (0 de 65 elementos de reveal ocultos). O preloader não aparece. O Agendamento fica inerte (B-07). |
| Recarregar no meio da página | O preloader roda de novo por ~3,7 s com a rolagem travada. A posição é restaurada com 19 px de deriva (3852 para 3833). Ver A-01. |
| Hover | Só `background-color`, `color` e `transform`. |
| Travamentos | `longtasks`: 1 (desktop sem preloader) a 6 (mobile com CPU 4×). Ver tabela de desempenho. |

## 8. Métricas de desempenho

**Lighthouse não está instalado e a instalação é proibida nesta etapa. Não há nota Lighthouse.**

Medi LCP, FCP, CLS e tarefas longas com `PerformanceObserver` no Chromium do Playwright, cache desabilitado:
- **Mobile**: 412×823, 2×, 4G lento (150 ms de latência, 1,6 Mbps), CPU 4× mais lenta.
- **Desktop**: 1350×940, sem throttling.

Cada cenário foi medido **uma vez**. Variação de laboratório é esperada.

| Cenário | FCP | LCP | CLS | TBT (aprox.) |
|---|---|---|---|---|
| Desktop, **com preloader** (padrão) | 0,76 s | **4,69 s** (palavra do título do Hero) | 0,039 | 41 ms |
| Desktop, `?preloader=off` | 0,61 s | **0,76 s** (imagem do Hero) | 0,0001 | 4 ms |
| Mobile, com preloader | 1,87 s | 1,87 s (botão "Agendar" do cabeçalho; ver nota) | **0,099** (`preloader__fly`) | 522 ms |
| Mobile, `?preloader=off` | 1,29 s | **3,89 s** (imagem do Hero, 146 KB) | 0,002 | 600 ms |

Notas:
- **TBT aproximado** = soma de (tarefa longa − 50 ms), sem janela FCP→TTI. Não é o TBT do Lighthouse.
- **LCP mobile com preloader**: o cenário mede o botão porque a cortina preta cobre o Hero. O LCP real do conteúdo vem depois e não foi capturado nesse cenário. Não use esse 1,87 s como bom.
- **INP**: não medido. Não há dados reais de interação suficientes.

Peso transferido (1440 px, rolando a página inteira, 76 requisições):

| Recurso | Quantidade | Peso |
|---|---|---|
| Imagens AVIF | 12 | ~470 KB |
| Imagens WebP | 19 | ~730 KB |
| Fontes (5 famílias, woff2) | 8 | ~226 KB |
| JS do site (First Load) | — | 116 kB (build) |
| JS total na rede | 14 | ~442 KB, em grande parte **do Google Maps** |

- Maior imagem: `chair-solo.jpg` via `next/image` em 1920 px, 204 KB.
- Hero: 147 KB.
- Recursos externos: só Google (mapa, tiles, `fonts.googleapis.com` e `fonts.gstatic.com` dentro do frame). **Nenhum recurso externo é carregado antes de rolar até o mapa.**
- Fontes do site vêm de `next/font`, ou seja, são hospedadas por você (sem chamada ao Google Fonts).
- Impacto do mapa: ~38 requisições e ~0,4 MB de JS, **somente depois** que ele entra na tela.

**Reprodutível:** o custo do preloader no LCP desktop (0,76 s para 4,69 s) e o CLS de 0,099 do `preloader__fly` no mobile apareceram em duas rodadas de medição.
**Variação de laboratório:** os 3,89 s de LCP mobile e o TBT de 522 a 600 ms dependem da emulação de CPU 4× e não devem ser lidos como medida de aparelho real.

## 9. SEO e acessibilidade

| Item | Resultado |
|---|---|
| Título, descrição, `lang="pt-BR"`, `theme-color` | OK. |
| `robots` | `noindex, nofollow` na home e em `/creditos`. Correto para projeto demonstrativo. |
| Favicon | `icon.svg` OK. |
| Open Graph | Título, descrição, tipo e locale. **Sem `og:image`** (B-12). |
| Canonical, `robots.txt`, `sitemap.xml` | Ausentes (`robots.txt` e `sitemap` dão 404). Coerente com site não indexável. |
| Headings | 1 h1, h2 por seção, h3 coerentes. Hierarquia correta. |
| Alt | 0 imagens sem `alt`. A única vazia é decorativa (`hero__img`). |
| Landmarks | header, nav (3, com rótulos), main, footer. Seções rotuladas. |
| Foco visível | Sim, em todos os 45 passos de Tab testados (contorno de 3 px, cor ajustada ao fundo). O iframe do mapa não mostra contorno (esperado, o foco vai para o conteúdo do Google). |
| Skip link | **Não existe** (B-03). |
| Labels do formulário | Select e nome com `<label>`, dias e horários em `fieldset/legend`, avisos em `role=status`. |
| Contraste | Textos sobre fundo chapado: 1 caso marginal (índice "01" do Hero, 4,44:1 contra 4,5:1). **Texto sobre foto (Hero) não é medível por script**, então não afirmo que passa nem que falha. |
| Reduced-motion | Respeitado. |

Marca fictícia: nada recomenda indexação, e o site não se apresenta como estabelecimento real. O comentário em `lib/data.ts` declara os dados como exemplo.

## 10. Lista priorizada de problemas

### P1 — Importante

**A-01 · Preloader a cada carregamento completo (Geral)**
- **Arquivo:** `app/layout.tsx:35`, `components/Preloader.tsx:17-22`, `components/preloader.css`.
- **Evidência:** `html.pl-lock` fica ativo por ~3,7 s (`pl` removido entre 3,7 e 4,2 s). LCP desktop 0,76 s → 4,69 s. No mobile, CLS 0,099 vindo de `preloader__fly`, no limite do "bom" (0,1).
- **Como reproduzir:** abrir `http://localhost:3100/`, comparar com `/?preloader=off`. Recarregar no meio da página: o preloader roda de novo e trava a rolagem por ~3,7 s.
- **Impacto:** toda visita completa e todo reload esperam ~4 s. Se o JS falhar, o fallback é de 12 s (`layout.tsx:35`). Não há botão de pular.
- **Correção sugerida (decisão sua):** tocar só na primeira visita da sessão, ou encurtar para ~1,5 s, ou só no desktop. Corrigir o deslocamento do `preloader__fly`.
- **Risco de regressão:** médio, porque a coreografia FLIP do logo depende dos tempos.

**A-02 · Página de créditos omite a imagem do Hero (Rodapé, `/creditos`)**
- **Arquivo:** `app/creditos/page.tsx:15-31`, `lib/data.ts:49-52`.
- **Evidência:** a página declara IA só para Serviços e Estúdio. O Hero usa `public/hero/brutto-hero-*.webp`. O próprio `CREDITOS.md:28` diz que "se forem ativados, declarar no rodapé que são imagens geradas por IA".
- **Como reproduzir:** abrir `/creditos` e comparar com as imagens em uso.
- **Impacto:** transparência incompleta sobre a origem da imagem principal do site. Também há textos desatualizados: `lib/data.ts:49-50` diz que `barber-razor` e `barber-comb` são usadas em "Início e Cortes", mas hoje só aparecem em Cortes.
- **Correção sugerida:** acrescentar parágrafo do Hero na página de créditos e corrigir os campos "Usada em".
- **Risco de regressão:** nenhum (texto).

### P2 — Moderado

**B-01 · Ultralargos: lacuna excessiva em Onde e Agendamento**
- **Arquivo:** `app/globals.css:73` (`.wrap` sem `max-width`), `:74` (`.grid12`), `:631` (`.where__grid`), `:458` (`.studio__top`), `:681` (`.footer__top`); `:656` limita só o mapa a 1600 px.
- **Evidência:** a partir de 1920 px todas as seções vão de x=32 a x=largura−32. Em 3440 px: coluna de Onde com 1895 px e informações começando em x=2039 (~1200 px vazios entre a headline e as informações). Em Agendamento a headline fica à esquerda e o formulário só começa em ~x=1730. O mapa (1600 px, centralizado) não alinha com a grade de 3361 px. Medido também em 1920 e 2560 (mesmo padrão, menos extremo).
- **Como reproduzir:** viewport 3440×1440, rolar até `#onde` e `#agendar`. Capturas: `evidencias/3440-onde.png`, `3440-agendar.jpg`.
- **Impacto:** leitura espalhada e composição quebrada em monitores ultralargos.
- **Correção sugerida:** um contêiner central com `max-width` (~1600 a 1800 px) para as seções de conteúdo (Onde, Agendamento, Rodapé), mantendo imagens de sangria total em Hero e Serviços. Alinhar o mapa à mesma largura.
- **Risco de regressão:** médio. Mexe em várias seções aprovadas, então precisa de teste em 1440 e 1920 para garantir que nada mude abaixo do limite.

**B-02 · Fallback do mapa não funciona e pode confundir leitores de tela**
- **Arquivo:** `app/page.tsx:97`, `app/globals.css:658-659`.
- **Evidência:** o iframe é opaco e cobre o `<p class="where__fallback">`. Com o Google bloqueado, aparece a página de erro do Chromium (carinha triste), não a mensagem. A mensagem fica sempre na árvore de acessibilidade, sem `aria-hidden`.
- **Como reproduzir:** bloquear `*.google.com`, ir ao mapa (`evidencias/mapa-bloqueado-390.jpg`). Com leitor de tela, o texto "O mapa não carregou" é lido mesmo com o mapa funcionando.
- **Impacto:** anúncio falso para usuários de leitor de tela; para os demais, fallback inexistente (resta o link "Abrir no Google Maps", que funciona).
- **Correção sugerida:** esconder a mensagem por padrão e mostrá-la só quando o `load` do iframe falhar. Ou remover a mensagem e manter o link como fallback.
- **Risco de regressão:** baixo.

**B-03 · Sem link "Pular para o conteúdo"**
- **Arquivo:** `app/page.tsx:23-32`.
- **Evidência:** no Tab, 6 links do cabeçalho e 3 índices do Hero antes do primeiro conteúdo.
- **Impacto:** usuário de teclado atravessa a navegação a cada página.
- **Correção sugerida:** skip link visível no foco, apontando para `#topo`.
- **Risco de regressão:** baixo.

**B-04 · Texto abaixo de 12 px**
- **Arquivo:** `app/globals.css:172, 194, 200, 316, 329, 331, 476, 503` (`0.6875rem` = 11 px).
- **Evidência:** 26 blocos de texto com 11 px (duração dos serviços, "R$", fatos do Hero, nota do Estúdio). O Taste marca 8 blocos abaixo de 13 px.
- **Impacto:** legibilidade em telas pequenas e para quem tem baixa visão.
- **Correção sugerida:** subir para 12 a 13 px, mantendo o caráter editorial.
- **Risco de regressão:** médio, porque pode quebrar linhas em Serviços e no Hero.

**B-08 · "Hoje" fica selecionado mesmo sem horários disponíveis**
- **Arquivo:** `components/Booking.tsx:45` (`setDayKey(d[0]?.key)`).
- **Evidência:** às 19:45 de uma quarta ou às 17:30 de um sábado, todos os horários de hoje ficam indisponíveis. O dia padrão continua sendo "Hoje", e o visitante cai direto no estado vazio. Captura em `evidencias/3440-agendar.jpg` mostra exatamente isso.
- **Como reproduzir:** relógio em 14/10/2026 22:45 UTC (19:45 em São Paulo), abrir `#agendar`.
- **Impacto:** primeira impressão do formulário é "não há horários", e ele aparenta estar quebrado.
- **Correção sugerida:** escolher por padrão o primeiro dia que tenha pelo menos um horário livre.
- **Risco de regressão:** baixo.

**B-11 · Assets não usados e públicos na pasta `public/`**
- **Arquivo:** `public/photos/` (`chairs-row.jpg`, `hair-clipper.jpg` 2,1 MB, `razor-brush.jpg`, `razor-shave.jpg`, `razors-set.jpg`, `red-chairs.jpg`), `public/hero/hero-bg-*` (inclui 2 PNG originais de 2,3 e 2,5 MB).
- **Evidência:** nenhum desses arquivos é referenciado no código. Tudo em `public/` é publicado no deploy.
- **Impacto:** download público de arquivos sem uso e sem registro na página de créditos (`hair-clipper.jpg` é CC BY-SA 4.0 e saiu da lista pública). Peso inútil no deploy.
- **Correção sugerida:** mover para fora de `public/` (por exemplo `assets/`, que já existe e já está no `.gitignore`).
- **Risco de regressão:** baixo, após conferir que nada os referencia.

**B-13 · ESLint ausente**
- **Arquivo:** `package.json` (sem `eslint` nem `eslint-config-next`, sem script `lint`).
- **Evidência:** a etapa "Linting" do `next build` é ignorada; não existe diagnóstico de lint a executar.
- **Impacto:** nenhuma checagem automática de React/hooks/acessibilidade estática.
- **Correção sugerida:** adicionar `eslint` + `eslint-config-next` e um script `lint` (instalação só na etapa de correções, com sua aprovação).
- **Risco de regressão:** baixo.

### P3 — Opcional

- **B-05 · Texto do Hero sobre foto movimentada.** `evidencias/hero-1440.jpg`: o parágrafo e "Ambiente exclusivo" ficam sobre rótulos e ilustrações do produto. Legível a olho em todas as capturas, mas o contraste não é verificável por script. Rever com olhar humano. Não é estético: só vale a pena se alguém tiver dificuldade de leitura.
- **B-06 · Alvos de toque pequenos.** Índice do Hero (19×24 px, só ≥ 1100 px) e links do cabeçalho (42×51 e 32×51 px). Atendem ao mínimo de 24 px do WCAG 2.2 AA só na altura. `app/globals.css:180`. Abaixo dos 44 px que o projeto adota como meta.
- **B-07 · Sem JS, o Agendamento fica com "Carregando os próximos dias…" para sempre.** `components/Booking.tsx:115`. O restante do site funciona. O link do WhatsApp sai com a mensagem padrão. Mostrar aviso mais claro ou esconder o formulário sem JS.
- **B-09 · Fuso horário.** `Booking.tsx:42` usa o relógio do visitante para "horário já passou", enquanto `Hours.tsx:15` usa `America/Sao_Paulo`. `Booking.tsx:24` gera a chave do dia com `toISOString()`, o que pode duplicar chaves de dia em fusos a leste de UTC. Sem impacto para público no Brasil.
- **B-10 · "Agora" não é atualizado.** `Booking.tsx:41-42` calcula uma vez. Com a aba aberta por horas, horários passados continuam disponíveis até recarregar.
- **B-12 · Pré-visualização de compartilhamento.** Sem `og:image`, `twitter:card=summary` sem imagem, `og:description` diferente da `description`. Sem canonical. Só importa se o link for compartilhado.
- **B-14 · Cabeçalhos de segurança e privacidade.** Sem CSP, X-Frame-Options, Referrer-Policy nem HSTS (a hospedagem pode adicionar). O iframe do Google carrega ao rolar, sem aviso de consentimento (LGPD, caso vire site real).
- **B-15 · Sem menu mobile.** Em ≤ 720 px a navegação mostra só Serviços, Cortes e Agendar (`app/globals.css:113`). Estúdio e Onde ficam acessíveis pelo rolar e pelo rodapé. Decisão de design, não defeito.
- **B-16 · Achados do Taste (inspect/lint).** Ver tabela abaixo. Quase todos são decisões visuais aprovadas.
- **B-17 · Navegação para `/creditos` e volta recarregam a página** (usam `<a>`, `app/page.tsx:142` e `creditos/page.tsx:13`), o que reinicia o preloader (ver A-01).
- **B-18 · Imagem de Serviços ampliada no desktop.** A fonte de 1100×733 aparece num quadro de ~762×1027 px (`object-fit: cover`, escala ~1,4×) em 1440 px. Possível suavidade. Não verificado visualmente em detalhe.
- **B-19 · Estado do Git.** `app/globals.css` modificado sem commit; mensagens de commit curtas ("c", "C"). Informativo.

### B-16 · Achados do Taste, classificação

| Achado | Classificação |
|---|---|
| `numbering` (Hero 92-94 e outros) | Navegação real. Sugestão: manter e justificar com `taste-skill-ignore`, como o projeto já faz em outros pontos. |
| `headline-lines`, `eyebrow`, `micro-label`, `font-count` (5 famílias), `mixed-font-headline`, `hairline`, `dashed`, `shadow`, `gradient`, `size-count`, `palette-cream`, `no-footage` | Escolhas estéticas aprovadas. Não tratadas como defeito. |
| `small-text` (< 13 px) | Procedente, ver B-04. |
| `covered-text` (palavras do Hero 100% cobertas na tela 1) | **Não reproduzido.** As capturas sem preloader mostram o título inteiro visível. Provável efeito da cortina do preloader durante a medição do inspetor. |
| `outlined-box` e `numbering` (`padStart`) no lint | Uso funcional (campos do formulário e relógio). Sem ação. |

## 11. Pontos fortes

- O agendamento é rigoroso: duração real contra o fechamento, horários passados, limpeza de seleção com aviso acessível, mensagem de WhatsApp bem montada.
- Zero erros de console e zero rolagem horizontal em 11 larguras.
- Mapa com carregamento lazy de verdade (0 requisições antes de rolar), link externo e título acessível.
- Respeito ao `prefers-reduced-motion` e nada oculto sem JS.
- Animações só em `transform`/`opacity`/`translate`, com parallax em CSS puro.
- Imagens bem servidas: AVIF/WebP, `srcset`, `sizes`, dimensões declaradas (CLS próximo de 0 sem preloader).
- Semântica sólida: headings corretos, landmarks rotulados, foco visível em todos os passos testados.
- Fontes autohospedadas via `next/font`. `noindex` coerente com projeto demonstrativo. Página de créditos existente. 0 vulnerabilidades.

## 12. Pendências para uso como portfólio

1. A-02: completar a página de créditos (Hero por IA) e corrigir "Usada em".
2. A-01: decidir a política do preloader (afeta LCP e recarga).
3. B-01: corrigir a composição em 2560 e 3440 px, se o portfólio será visto em monitor grande.
4. B-02, B-03 e B-08: pequenos ajustes de acessibilidade e de primeira impressão do formulário.
5. B-11: remover assets não usados do deploy.

## 13. Pendências para futura entrega comercial

- Substituir dados fictícios: endereço, telefone, Instagram (hoje é o da KLABEL) e horários.
- Agenda real: hoje o pedido é só uma mensagem de WhatsApp, sem confirmação nem disponibilidade real.
- Trocar as imagens geradas por IA (Hero, Serviços, Estúdio) por fotos do estabelecimento, ou manter a declaração pública.
- Remover `noindex`. Adicionar canonical, `sitemap.xml`, `robots.txt`, `og:image` e dados estruturados (`LocalBusiness`).
- Hospedagem com cabeçalhos de segurança. Política de privacidade e consentimento para o Google Maps (LGPD).
- Revisão jurídica das licenças CC BY / CC BY-SA e da atribuição.
- Lighthouse e testes em aparelhos reais (iOS Safari, Android), Firefox, e leitor de tela real.
- ESLint e testes automatizados no projeto (B-13).

## 14. Plano de correções em lotes pequenos (aguarda sua aprovação)

| Lote | Conteúdo | Itens | Risco |
|---|---|---|---|
| 1 | Créditos e higiene de assets | A-02, B-11, B-19 | Baixo |
| 2 | Acessibilidade rápida | B-02, B-03, B-06 | Baixo |
| 3 | Formulário | B-08, B-10, B-09, B-07 | Baixo |
| 4 | Ultralargos | B-01 | Médio |
| 5 | Preloader | A-01, B-17 | Médio |
| 6 | Tipografia pequena | B-04, B-05 | Médio |
| 7 | Metadados e ferramentas | B-12, B-13, B-14 | Baixo |

Sugestão de ordem: 1, 2, 3, 4, 5, 6, 7. Cada lote deve ter nova verificação visual (1440, 1024, 768, 390 e 3440 px) antes de seguir para o próximo.

## 15. O que **não** foi testado

- Lighthouse (não instalado, instalação proibida nesta etapa).
- INP, aparelhos reais, Safari, Firefox e leitores de tela.
- Clique real no WhatsApp (nenhuma mensagem foi enviada).
- Cálculo de contraste de texto sobre fotografia.
- Efeito exato de zoom do navegador a 200%: foi simulado com viewport de 720×450 a 2×.
- Todas as medições de desempenho foram uma rodada só por cenário.

## Evidências

Pasta `evidencias/`: capturas em 3440 px (todas as seções), Hero em 5 viewports, mapa bloqueado e carregado em 390 px, recarga no meio da página, pulo ao rodapé e sem JavaScript.
Pasta `logs/`: `build.txt`, `taste-lint.txt`, `taste-inspect.txt`.
Pasta `.taste-skill/inspect/`: capturas do inspetor e `report.json`.
