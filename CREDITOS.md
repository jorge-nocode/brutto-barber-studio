# Créditos das imagens

Todas obtidas pela busca em acervos abertos (Wikimedia Commons / Openverse) com licença que permite uso comercial. Fotos de acervo: não são do estúdio. **Etapa 04:** os avisos de demonstração saíram da interface; o crédito público passou para a página `/creditos` (link "Créditos das fotografias" no rodapé), gerada de `lib/data.ts` (`credits`). Este arquivo continua sendo o registro interno completo.

- assets/razor-shave.jpg: "Shaving with a Wacker straight razor" by Frank Schulenburg, CC0, via Wikimedia Commons. https://commons.wikimedia.org/w/index.php?curid=32725078 (no credit required)
- assets/chairs-row.jpg: "Phoenix Old Spaghetti Factory restaurant barber chairs" by Tomwsulcer, CC0, via Wikimedia Commons. https://commons.wikimedia.org/w/index.php?curid=39125209 (no credit required)
- assets/red-chairs.jpg: "DSCF1083 Vintage red barber chairs in a rustic wooden shop waiting for the next customer" by PattayaPatrol, CC BY-SA 4.0, via Wikimedia Commons. https://commons.wikimedia.org/w/index.php?curid=194511634
- assets/chair-solo.jpg: "Barber's Chair (17334469536)" by Danny Fowler from Washington, DC, USA, CC BY-SA 2.0, via Wikimedia Commons. https://commons.wikimedia.org/w/index.php?curid=46994952
- assets/razors-set.jpg: "Set of seven cutthroat razors, London, England, 1801-1900", CC BY 4.0, via Wikimedia Commons. https://commons.wikimedia.org/wiki/File:Set_of_seven_cutthroat_razors,_London,_England,_1801-1900_Wellcome_L0058118.jpg
- assets/razor-brush.jpg: "Wacker Jungmeister Rasiermesser mit Pinsel und Schale" by Frank Schulenburg, CC BY-SA 3.0, via Wikimedia Commons. https://commons.wikimedia.org/w/index.php?curid=32760214
- assets/fade-a.jpg: "Mid-fade 01" by Classic Barbers, CC0, via Wikimedia Commons. https://commons.wikimedia.org/w/index.php?curid=147457018 (no credit required)
- assets/fade-b.jpg: "Mid-fade 07" by Classic Barbers, CC0, via Wikimedia Commons. https://commons.wikimedia.org/w/index.php?curid=147457024 (no credit required)
- assets/fade-c.jpg: "Mid-fade 06" by Classic Barbers, CC0, via Wikimedia Commons. https://commons.wikimedia.org/w/index.php?curid=147457022 (no credit required)

## Observações de licença
- CC BY-SA (cadeiras, pincel e navalha): usadas sem edição do arquivo, apenas recortadas por CSS (`object-fit`); crédito visível. Em produção, prefira fotos do próprio cliente ou as CC0/CC BY.
- Pessoas fotografadas (cortes e barbeado): fotos em acervo aberto; não representam clientes nem profissionais do BRUTTO.

## Hero (campanha editorial)
### Fundo principal em uso (desktop e mobile)
- public/photos/barber-razor.jpg: "Barber brings a haircut and beard to his client" by Shixart1985, CC BY 2.0, via Wikimedia Commons. https://commons.wikimedia.org/w/index.php?curid=195948209 (reduzida para 2400 px; alterações: recorte por CSS e conversão tonal sépia/P&B em CSS). Original em assets/barber-razor-original.jpg.

### Recortes fotográficos secundários
- public/photos/barber-comb.jpg: "Barber cutting hair with comb. Back view of man in barber shop" by Nenad Stojkovic, CC BY 2.0, via Wikimedia Commons. https://commons.wikimedia.org/w/index.php?curid=116285951 (reduzida para 2400 px; recorte e conversão tonal em CSS).
- fade-a, fade-b e fade-c (CC0, Classic Barbers), listadas acima.

### Fundos alternativos guardados, hoje SEM USO (imagens geradas por IA, fornecidas pelo proprietário)
- public/hero/hero-bg-desktop-*.webp e hero-bg-mobile-*.webp (originais PNG em public/hero/ e assets/hero-originais/): "Corte clássico em barbearia sombria.png" (1672 x 941) e "Corte Sombrio no Barbeiro.png" (941 x 1672). Sem fonte externa; direitos conforme o proprietário. Se forem ativados, declarar no rodapé que são imagens geradas por IA.

## Manifesto (campanha editorial)
Saiu desta seção: public/photos/chair-solo.jpg (Danny Fowler, CC BY-SA 2.0), cadeira abandonada. O arquivo continua na pasta, sem uso; a menção ainda consta na lista de créditos do rodapé (ver pendência).
Todas as fotos abaixo já estavam verificadas no projeto; nenhuma foto nova foi baixada. Tratamento: recorte por CSS e conversão tonal P&B/sépia em CSS (arquivos não editados).
- Foto principal: public/photos/barber-comb.jpg, "Barber cutting hair with comb. Back view of man in barber shop" by Nenad Stojkovic, CC BY 2.0. https://commons.wikimedia.org/w/index.php?curid=116285951
- Recorte 01: public/photos/barber-razor.jpg, "Barber brings a haircut and beard to his client" by Shixart1985, CC BY 2.0. https://commons.wikimedia.org/w/index.php?curid=195948209
- Recorte 02: public/photos/razor-brush.jpg, "Wacker Jungmeister Rasiermesser mit Pinsel und Schale" by Frank Schulenburg, CC BY-SA 3.0. https://commons.wikimedia.org/w/index.php?curid=32760214
- Recorte 03: public/photos/razors-set.jpg, "Set of seven cutthroat razors, London, England, 1801-1900", Wellcome Collection, CC BY 4.0. https://commons.wikimedia.org/wiki/File:Set_of_seven_cutthroat_razors,_London,_England,_1801-1900_Wellcome_L0058118.jpg
Legenda visível na própria seção cita os dois primeiros autores. As pessoas fotografadas não são profissionais nem clientes do BRUTTO.

## Etapa 04 — auditoria de licenças e mudanças
- **Nova foto (Manifesto, recorte inferior esquerdo, substitui a repetição do Hero):** public/photos/hair-clipper.jpg (cópia em assets/hair-clipper.jpg). "Trimming clippers - Macedonian barber craft" (Museum of the Old Skopje Bazaar) by Orce Wiki, CC BY-SA 4.0, via Wikimedia Commons. https://commons.wikimedia.org/wiki/File:Trimming_clippers_-_Macedonian_barber_craft.jpg (reduzida para 2000 px de largura; recorte/ampliação e tom P&B/sépia por CSS). Máquina de corte manual antiga em museu; sem pessoas.
- **Fotos em uso e licença:** CC BY 2.0 (barber-razor, barber-comb: autor, licença, link; alterações = recorte, redução, P&B/sépia); CC BY 4.0 (razors-set, Wellcome Collection); CC BY-SA 3.0 (razor-brush); CC BY-SA 4.0 (red-chairs, hair-clipper); CC0 (fade-a/b/c, razor-shave, chairs-row; crédito opcional, mantido por cortesia).
- **Fora de uso e fora da página pública:** chair-solo.jpg (CC BY-SA 2.0, Danny Fowler), saiu do Manifesto na etapa anterior e foi removida da lista pública. Arquivos continuam em public/ e assets/ (nada apagado).
- **Solução de atribuição:** página `/creditos` com título (link para a origem), autoria, licença (link para o texto da licença), onde é usada e um aviso geral de alterações (redimensionada, recortada, P&B/sépia) e de compartilhamento das versões adaptadas CC BY-SA sob a mesma licença. Ela cumpre os elementos exigidos (autoria, licença, link, alterações); atribuição em página de créditos ligada do rodapé é prática razoável para galerias, mas não é parecer jurídico. Se o cliente quiser risco zero, trocar as fotos CC BY/CC BY-SA por CC0 ou fotos próprias antes do lançamento.
- Pendência de licença: as fotografias CC BY-SA são exibidas com tratamento (adaptação). Isso vale só para as imagens; o código e o texto do site não são afetados.

## Manifesto recuperado (composição original, fundo claro)
Substitui a versão escura da Etapa 04. A versão escura foi guardada em `_backup-manifesto-escuro/` (Manifesto.tsx e globals.css daquela etapa), sem apagar nada.
Fotos efetivamente usadas no Manifesto agora (sem legenda visível; crédito na página /creditos):
- Miniatura inline 1: public/photos/razor-brush.jpg (Frank Schulenburg, CC BY-SA 3.0).
- Miniatura inline 2: public/photos/red-chairs.jpg (PattayaPatrol, CC BY-SA 4.0).
- Miniatura inline 3: public/photos/razors-set.jpg (Wellcome Collection, CC BY 4.0).
- Foto grande: public/photos/chair-solo.jpg, "Barber's Chair (17334469536)" by Danny Fowler, CC BY-SA 2.0, https://commons.wikimedia.org/w/index.php?curid=46994952 (recorte por CSS; arquivo não editado). Volta à lista pública em /creditos.
Sem uso agora: public/photos/hair-clipper.jpg (Orce Wiki, CC BY-SA 4.0), saiu da lista pública; barber-comb e barber-razor seguem só no Hero.

## Etapa 07 — Manifesto cinematográfico
Fotografia única da seção (fundo, largura total, cores naturais, sem legenda visível): public/photos/chair-solo.jpg, "Barber's Chair (17334469536)" by Danny Fowler, CC BY-SA 2.0, https://commons.wikimedia.org/w/index.php?curid=46994952. Alterações: recorte por CSS (object-fit/object-position, com leve ampliação), gradiente localizado de leitura e deriva sutil na rolagem; arquivo original não editado. Atribuição pública em /creditos (lista inalterada).
Miniaturas removidas do Manifesto (razor-brush, red-chairs, razors-set): arquivos mantidos; continuam em uso em Estúdio (razor-brush, red-chairs) e Onde (razors-set), então seguem na lista pública.

## Etapa 11 / 11B — seção Serviços
- **razor-shave.jpg saiu de uso.** "Shaving with a Wacker straight razor" (Frank Schulenburg, CC0) foi a foto de Serviços até a Etapa 10; desde a Etapa 11 nenhum componente a referencia. O arquivo continua em `public/photos/` e `assets/` (nada apagado) e a entrada foi retirada da lista pública em `/creditos` (`lib/data.ts`). As menções acima a "Serviços" nesse arquivo são históricas.
- **Imagens novas em uso (Serviços), geradas com IA e fornecidas pelo proprietário na Etapa 11:**
  - Desktop, horizontal 1536 x 1024: original em `assets/servicos/servicos-foto-desktop-original.png`; versões web `public/servicos/servicos-desktop-1536.webp` e `-1100.webp`.
  - Mobile e tablet (até 900 px), vertical 1024 x 1536: original em `assets/servicos/servicos-foto-mobile-original.png`; versões web `public/servicos/servicos-mobile-1024.webp`, `-768.webp` e `-512.webp`.
  - Tratamento: só redimensionamento e conversão para WebP, mais recorte por CSS (`object-fit`). Sem filtro de cor.
  - Mockup de referência (não é publicado no site): `assets/servicos/servicos-mockup-referencia.png`.
  - Na página pública `/creditos` consta: "Imagens conceituais geradas com inteligência artificial por meio do ChatGPT (OpenAI), para o projeto demonstrativo BRUTTO Barber Studio." (não são fotografias reais nem de acervo; sem autoria de fotógrafo nem licença de terceiros).
- **Procedência (confirmada pelo proprietário após a Etapa 11B):** as duas imagens foram geradas com inteligência artificial pelo ChatGPT (OpenAI), especificamente para o projeto demonstrativo BRUTTO Barber Studio. Texto de crédito adotado: "Imagens conceituais geradas com inteligência artificial por meio do ChatGPT (OpenAI), para o projeto demonstrativo BRUTTO Barber Studio." Não há fotógrafo, banco de imagens nem licença de terceiros a atribuir. A pendência de procedência aberta na Etapa 11B está encerrada. Observação: os termos de uso de conteúdo gerado seguem os da OpenAI; se o site deixar de ser demonstrativo, revisar a adequação de imagens de IA (inclusive a marca BRUTTO que aparece nelas) ao uso comercial do cliente final.

## Etapa 13 — seção Estúdio (remodelagem editorial)
- **Cinco fotografias novas em uso, geradas com inteligência artificial por meio do ChatGPT (OpenAI), especificamente para o projeto demonstrativo BRUTTO Barber Studio** (fornecidas pelo proprietário). Não há fotógrafo, banco de imagens nem licença de terceiros a atribuir.
  - Panorâmica do salão (1672 x 941): original `assets/estudio/estudio-panoramica-original.png`; web `public/estudio/estudio-panoramica-{800,1200,1672}.webp`.
  - Cadeira da janela, do meio e do fundo (1086 x 1448): originais `assets/estudio/estudio-{janela,meio,fundo}-original.png`; web `public/estudio/estudio-{janela,meio,fundo}-{540,768,1086}.webp`.
  - Detalhe da bancada (1536 x 1024): original `assets/estudio/estudio-detalhe-original.png`; web `public/estudio/estudio-detalhe-{560,900}.webp`.
  - Tratamento: só redimensionamento e conversão para WebP (qualidade 82) e enquadramento por CSS. Sem filtro de cor. Mockup de referência (não publicado): `assets/estudio/estudio-mockup-referencia.png`.
  - Crédito público em `/creditos` (parágrafo "Estúdio").
- **Saíram de uso no Estúdio e da lista pública em `/creditos`:** `chairs-row.jpg` (Tomwsulcer, CC0), `red-chairs.jpg` (PattayaPatrol, CC BY-SA 4.0) e `razor-brush.jpg` (Frank Schulenburg, CC BY-SA 3.0). Arquivos mantidos em `public/photos/` e `assets/` (nada apagado). A entrada de `razors-set.jpg` passou a constar só em "Onde".

## Etapa 15 — Contato/Onde e Rodapé
- **razors-set.jpg saiu de uso.** "Set of seven cutthroat razors, London, England, 1801-1900" (Wellcome Collection, CC BY 4.0) estava só na seção Onde (a foto de 160 px). A seção foi refeita sem fotografia, então nenhum componente referencia o arquivo. O arquivo continua em `public/photos/` e `assets/` (nada apagado) e o registro correspondente foi retirado da lista pública em `/creditos` (`credits` em `lib/data.ts`). As menções históricas acima (Etapas anteriores) ficam como registro.
- Créditos das demais fotografias em uso: inalterados.

