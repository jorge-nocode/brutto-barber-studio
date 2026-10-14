# BRUTTO Barber Studio — direção visual

Site demonstrativo da KLABEL DIGITAL. Nome, textos, preços, horários e contatos são fictícios ou placeholders.

## Leitura do briefing
Barbearia premium para portfólio. Editorial masculino, brutalismo refinado, fotografia cinematográfica. Paleta fixa do briefing (carvão `#101010`, off-white `#E7E3DA`, vermelho queimado `#9B332B`, cinza mineral `#73736E`), por isso o sorteio usou `--keep palette`.

## Sorteio (Taste Skill, `draw.mjs`)
Setor `other`, tom `editorial`, seções `intro,list,gallery,about,contact,footer`. Três direções sorteadas: `page-is-the-object`, `type-only-statement`, `sentence-as-layout`.
**Escolhida: `sentence-as-layout`** (seed 1885900452). Motivo: o nome BRUTTO (italiano, "bruto, áspero") vira a própria frase, e a última palavra da frase é mostrada, não dita.
Redraws: nenhum. Ajustes por regra da casa (as regras da casa vencem o blueprint): tipografia Anton/Work Sans mantida; fotos do set "Mountain" dispensadas (não combinam com o assunto) em favor de acervos abertos reais, que a própria skill põe como primeira escolha.

## A ideia
> Nesta página, **o nome "Brutto" (italiano: bruto, áspero, sem verniz)** vira **uma frase de pôster cuja última palavra é a foto do corte**: "Brutto no nome, exato no [corte]".

Teste do concorrente: outra barbearia não tem esse nome nem essa frase; a ideia não funciona para elas.

## A coisa viva
O agendamento é uma **senha de balcão**: serviço, dia e horário escolhidos montam, em tempo real, um canhoto grande ("Amanhã 15:30") e a mensagem pronta do WhatsApp. Funciona com o polegar, tem link simples sem script, e leva o clique de "→" da tabela de preços direto ao serviço escolhido.

## Argumento da página (uma linha por seção)
1. Hero: o corte fala pela barbearia (frase + reel de três cortes fixado na rolagem).
2. Manifesto: precisão, hora marcada, ninguém espera (statement com miniaturas inline e fotografia em tela cheia).
3. Serviços: o que se faz e quanto custa, tudo à vista (8 linhas, preços demonstrativos).
4. Cortes: prova visual (prints inclinados sobre campo vermelho). Fotos ilustrativas de acervo aberto.
5. Estúdio: pessoas e espaço (placeholders explícitos; nada de equipe inventada).
6. Agendar: a senha.
7. Onde: endereço, horário e contatos com placeholders.
8. Rodapé: convite e o nome cortado pela borda.

## Sistema
- **Cor**: carvão como chão, off-white como tinta, vermelho queimado em campos inteiros (Cortes) e na ação; cinza mineral só em campo de texto grande (painel de horários, 36px, contraste ≥3:1). Superfície de passo `#1B1B1A`/`#D9D4C8`. Sem gradientes, sem sombras.
- **Tipografia**: Anton (display, caixa alta, entrelinha 0,88) e Work Sans (texto). Cinco tamanhos: 17 / 35 / 121 / 210 px (valores a 1440) e o letreiro do rodapé.
- **Composição**: assimetria; cada seção usa uma composição diferente da vizinha; nenhum cartão em grade.
- **Movimento**: sinal principal = reel fixado dentro da frase. Entradas por seção (linha mascarada no hero, shutter nas fotos, linhas de tabela em cascata, prints que caem e assentam), feedback em botões/linhas/opções, deriva lenta na foto cheia, letreiro do rodapé subindo. Só `transform`, `opacity`, `clip-path`. `prefers-reduced-motion`: conteúdo final, sem deslocamento.
- **Imagens**: acervos abertos (ver `CREDITOS.md`). Nenhuma é apresentada como foto do estúdio; legendas dizem "foto ilustrativa". Sem vídeo: nenhum clipe verificável sem expor terceiros identificáveis; a deriva da foto e o reel cumprem o papel de imagem em movimento.

## Substituir antes de lançar
Todos os `[colchetes]`; `WHATSAPP_NUMBER` em `lib/data.ts`; preços, horários e textos; fotos do estúdio e da equipe (as atuais são ilustrativas); nome e identidade, se o cliente tiver os seus.

## Revisão do Hero (referência aprovada pelo proprietário)
O Hero foi refeito para reproduzir a campanha editorial aprovada: foto principal em tela cheia (P&B/sépia, grão), título de 3 linhas sobre a foto com recorte inline na última palavra, pincelada vermelha, selo circular, dois recortes laterais, índice 01/02/03, legenda "Corte em cena" e faixa inferior.
Exceções conscientes às regras da casa da Taste Skill, pedidas pela referência (a referência aprovada vence): título em 3 linhas, índice numerado, rótulos em caixa-alta espaçada, filetes finos e véu escuro neutro sobre a foto. Registradas no inspetor com `--allow headline-lines,numbering,micro-label,hairline` e no lint com `taste-skill-ignore`.
O aviso "site demonstrativo" saiu da faixa superior e vive na faixa inferior do Hero (e no rodapé).

### Fundos do Hero (assets aprovados do proprietário)
O fundo do Hero usa duas imagens geradas por IA fornecidas e aprovadas pelo proprietário: horizontal (1672 x 941) no desktop e vertical (941 x 1672) no mobile (até 900 px), via `<picture>` com WebP (`public/hero/`). A foto real anterior deixou de ser fundo. Sem grão nem véu pesado por cima: a arte já traz textura e contraste; só um véu neutro leve garante a leitura do cabeçalho e da faixa inferior.

## Etapa 04 (refinamento)
- Avisos de demonstração removidos da interface pública (Hero, Serviços, Cortes, Estúdio, Onde, Agendamento, Manifesto, rodapé, metadados). O site continua usando DADOS DE EXEMPLO: preços, horários, número de WhatsApp (`WHATSAPP_NUMBER` em `lib/data.ts` = placeholder), textos entre [colchetes], equipe e endereço. Substituir antes de qualquer uso real. Nada disso foi inventado como real.
- Manifesto: headline mobile em 3 linhas (MAIS / QUE CORTE, / É DISCIPLINA.) a 17,6vw; recorte inferior esquerdo agora é uma máquina de corte antiga (hair-clipper.jpg), não repete a foto do Hero.
- Agendamento: serviço escolhido num `<select>` nativo estilizado (fonte única: `services` em `lib/data.ts`; o clique em Serviços continua via `data-service`).
- Créditos públicos em `/creditos`.

## Etapa 05 (dados comerciais)
- Dados de exemplo autorizados pelo proprietário, centralizados em `lib/data.ts`: nome BRUTTO Barber Studio; endereço ilustrativo Avenida Paulista, 1200 — Bela Vista, São Paulo/SP; Instagram https://www.instagram.com/klabeldigital/; WhatsApp 5511998703836. O projeto é fictício (vitrine da KLABEL DIGITAL); nada disso representa uma empresa real nesse endereço.
- JSON-LD (BarberShop) removido de `app/layout.tsx` para não declarar o BRUTTO como empresa real; `robots: noindex` mantido. Sem mapa (rodapé com minimapa fica para a próxima fase). Sem Perfil da Empresa no Google.
- Estúdio: sem nomes de profissionais, sem ano de fundação; cadeiras descrevem especialidades derivadas dos serviços.
- Agendamento mobile: não havia defeito de layout. O espaço preto era o respiro padrão de seção (7rem) somado ao canhoto sticky (≤900px) em captura de elemento. Único ajuste: `.book { scroll-margin-top: -0.5rem }`, que remove a faixa clara da seção anterior ao chegar por #agendar.

## Correção de direção: Manifesto (recuperado)
Hero e Manifesto escuros se repetiam. O Manifesto voltou à composição original: fundo creme (`on-paper`), frase editorial em preto com três miniaturas inline (navalha e pincel, cadeira vermelha, estojo de navalhas) e a foto grande da cadeira vermelha num cômodo desgastado, em largura total, com deriva lenta na rolagem. Recuperado do cache de build local (`.next/cache/webpack`): markup e CSS exatos; sem legenda visível. Versão escura arquivada em `_backup-manifesto-escuro/`.

## Etapa 06: refinamento editorial do Manifesto
Mantidos: fundo creme, copy, três miniaturas inline, foto `chair-solo.jpg` em largura total (sem overlay, cores originais). Novo: identificador "BRUTTO / MANIFESTO"; "Corte não é conversa." como abertura em Work Sans 600; declaração com quebras intencionais; fecho "Quem chega [miniatura] sai inteiro." com "sai inteiro." em vermelho; filete de transição com "PRECISÃO NÃO É ACASO." e "O RITUAL ↓". Entrada por `data-reveal` (opacity/transform), foto com `data-shutter` e deriva lenta; reduced-motion respeitado. Sem selo, índice, pincelada nem Anton gigante. Versão anterior em `_backup-manifesto-escuro/Manifesto.recuperado.tsx`.

## Etapa 07: Manifesto cinematográfico
Substitui o Manifesto creme editorial da Etapa 06 (arquivado em `_backup-manifesto-escuro/Manifesto.etapa06.tsx` e `globals.css.etapa06`). A cadeira vermelha (`chair-solo.jpg`) é o fundo da seção, em cores naturais, altura ≈ proporção da foto (66,7vw no desktop). Copy na parede esquerda, fora da cadeira: tag BRUTTO / MANIFESTO, "Corte não é conversa." (Work Sans 600), apoio, e "Quem chega, sai inteiro." no canto inferior esquerdo, com sublinhado vermelho só em "sai inteiro.". Gradiente radial apenas à esquerda. Mobile (≤600 px): seção alta (max(100svh, 235vw)), texto no topo sobre a parede e a cadeira ocupando a metade inferior; 601-900 px: enquadramento próprio. Movimento: fade da foto + scale 1.06→1, texto em cascata (opacity/transform), deriva `translate` por view-timeline; reduced-motion sem animação. Sem miniaturas, pincel, selo, índice ou Anton gigante.

## Etapa 08: ajuste final mobile do Manifesto — APROVADO E CONGELADO
O Manifesto cinematográfico (Etapa 07) está aprovado e congelado, sujeito apenas à aprovação final das capturas mobile desta etapa (`APROVACAO-MANIFESTO-MOBILE-FINAL/`). Não alterar sem pedido explícito do proprietário.
- Enquadramento mobile (≤600 px): altura `max(100svh, 250vw)`; a imagem cobre exatamente a seção (sem sobra de 110% nem deriva), então a base da cadeira ganha ~40 px de respiro (antes encostava na borda). Desktop e tablet inalterados.
- Qualidade da imagem: a suavidade vinha da resolução servida. `sizes="100vw"` fazia o Next entregar 640 px para uma imagem exibida com ~1400 px de largura (cover recorta lateralmente). Corrigido com `sizes` que reflete a largura real e `quality={85}`; agora o navegador baixa a versão de 1920 px (o máximo do arquivo original; em telas 3x, o original). Sem sharpening, filtro ou troca de imagem.
