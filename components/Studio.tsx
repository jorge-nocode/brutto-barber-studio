import { ADDRESS, WHATSAPP_DISPLAY, whatsappUrl } from "../lib/data";

// Etapa 13: seção Estúdio como página editorial. Reveals são os do Reveal.tsx (data-reveal, data-shutter, data-drop).
// Fotografias: WebP gerados em public/estudio/ (originais em assets/estudio/), servidos por <picture>/srcSet como em Serviços.
const HELLO = "Olá, BRUTTO! Gostaria de mais informações.";
const i = (n: number) => ({ ["--i" as string]: n }) as React.CSSProperties;

type Shot = { name: string; widths: number[]; w: number; h: number };
const SHOTS = {
  panoramica: { name: "panoramica", widths: [800, 1200, 1672], w: 1672, h: 941 },
  detalhe: { name: "detalhe", widths: [560, 900], w: 1536, h: 1024 },
  janela: { name: "janela", widths: [540, 768, 1086], w: 1086, h: 1448 },
  meio: { name: "meio", widths: [540, 768, 1086], w: 1086, h: 1448 },
  fundo: { name: "fundo", widths: [540, 768, 1086], w: 1086, h: 1448 },
} satisfies Record<string, Shot>;

function Photo({ shot, alt, sizes, eager, style }: { shot: Shot; alt: string; sizes: string; eager?: boolean; style?: React.CSSProperties }) {
  const path = (w: number) => `/estudio/estudio-${shot.name}-${w}.webp`;
  const largest = shot.widths[shot.widths.length - 1];
  return (
    <img
      src={path(largest)}
      srcSet={shot.widths.map((w) => `${path(w)} ${w}w`).join(", ")}
      sizes={sizes}
      width={shot.w}
      height={shot.h}
      alt={alt}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      style={style}
    />
  );
}

const SEATS = [
  {
    n: "01", id: "janela", title: "Janela", chair: "Cadeira da janela", who: "Corte e degradê", // taste-skill-ignore: numeração pedida no briefing e presente no mockup
    note: "Luz natural, movimento da rua e um ângulo perfeito pra um corte preciso.",
    alt: "Cadeira de barbeiro de couro vinho e braços brancos ao lado da janela grande, com a rua ao fundo e a luz da tarde no assoalho de madeira",
  },
  {
    n: "02", id: "meio", title: "Meio", chair: "Cadeira do meio", who: "Barba e navalha", // taste-skill-ignore: numeração pedida no briefing e presente no mockup
    note: "Equilíbrio entre técnica e atenção nos detalhes.",
    alt: "Cadeira de barbeiro central, de couro vinho e metal cromado, diante do espelho e das prateleiras de produtos, sob um pendente aceso",
  },
  {
    n: "03", id: "fundo", title: "Fundo", chair: "Cadeira do fundo", who: "Risco, sobrancelha e acabamento", // taste-skill-ignore: numeração pedida no briefing e presente no mockup
    note: "Os últimos detalhes fazem toda a diferença.",
    alt: "Cadeira de barbeiro do fundo do salão, de couro vinho, com a bancada de madeira escura e as luminárias acesas atrás",
  },
] as const;

export default function Studio() {
  return (
    <section id="estudio" className="studio" aria-labelledby="estudio-h">
      <div className="studio__top">
        <div className="studio__intro">
          <p className="studio__tag" data-reveal>Estúdio</p>
          <h2 id="estudio-h" className="studio__h" data-reveal>
            <span className="studio__line"><span>O BRUTTO nasceu</span></span>
            <span className="studio__line"><span>de uma ideia simples:</span></span>
          </h2>
          <p className="studio__lead" data-reveal style={i(2)}>barbearia boa acerta a linha na primeira passada.</p>
          <p className="studio__more" data-reveal style={i(3)}>
            Três cadeiras, agenda fechada por hora. Ninguém espera de pé. O nome vem do italiano e quer dizer bruto, áspero, sem verniz.
            O trabalho é o contrário disso: medida, simetria e acabamento limpo, do degradê à nuca.
          </p>
          <dl className="studio__facts" data-reveal style={i(4)}>
            <div><dt>Agenda</dt><dd>Hora marcada, de segunda a sábado</dd></div>
            <div><dt>Onde</dt><dd>{ADDRESS.street}, {ADDRESS.area}</dd></div>
            <div>
              <dt>Contato</dt>
              <dd><a className="link" href={whatsappUrl(HELLO)} target="_blank" rel="noopener noreferrer">WhatsApp {WHATSAPP_DISPLAY}</a></dd>
            </div>
          </dl>
        </div>

        <div className="studio__stage">
          <figure className="studio__main" data-shutter>
            <Photo
              shot={SHOTS.panoramica}
              alt="Salão do BRUTTO: três cadeiras de barbeiro de couro vinho e cromo em fila, bancada com espelhos e produtos, poste listrado de barbeiro e a janela à esquerda"
              sizes="(min-width: 901px) 52vw, 100vw"
            />
          </figure>
          <figure className="studio__detail" data-drop>
            <Photo
              shot={SHOTS.detalhe}
              alt="Bancada de madeira com navalha, tesoura, pente, pincel de barba, tigela e toalhas escuras dobradas"
              sizes="(min-width: 901px) 15vw, 40vw"
            />
          </figure>
        </div>

        <p className="studio__aside" data-reveal style={i(5)}>
          Mais que cortes. Um espaço pra você.
        </p>
      </div>

      <ol className="seats">
        {SEATS.map((s, k) => (
          <li key={s.id} className={`seat seat--${s.id}`}>
            <figure className="seat__photo" data-shutter style={i(k)}>
              <Photo shot={SHOTS[s.id]} alt={s.alt} sizes="(min-width: 700px) 28vw, 84vw" />
            </figure>
            <div className="seat__head" data-reveal style={i(k + 1)}>
              <span className="seat__n" aria-hidden="true">{s.n}</span>
              <h3 className="seat__title">{s.title}</h3>
              <p className="seat__who"><b>{s.chair}</b><br />{s.who}</p>
            </div>
            <p className="seat__note" data-reveal style={i(k + 2)}>{s.note}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
