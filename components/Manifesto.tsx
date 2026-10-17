import Image from "next/image";
import WordsLight from "./WordsLight";

// Manifesto: cena fotográfica. A cadeira vermelha é o fundo e a protagonista; a copy é uma coluna editorial única
// na parede escura à esquerda (eyebrow, headline, apoio e fecho agrupados), fora da cadeira.

const idx = (n: number) => ({ ["--i" as string]: n }) as React.CSSProperties;

// Palavras acesas pelo scroll (WordsLight + words-light.css): cada palavra vira um span com seu índice. O texto continua
// um só no DOM (leitores de tela leem a frase normal); os espaços ficam como texto entre os spans.
const LINES = [
  ["Algumas coisas nunca saem de cena."],
  ["Uma cadeira. Uma história. E a arte de fazer bem-feito."],
  ["O estilo muda."],
  ["A essência fica."],
].map((l) => l[0].split(" "));
const TOTAL = LINES.flat().length;
const OFFSET = [0, LINES[0].length, LINES[0].length + LINES[1].length, LINES[0].length + LINES[1].length + LINES[2].length];

function Words({ line }: { line: number }) {
  const words = LINES[line];
  return words.map((w, k) => {
    const last = k === words.length - 1;
    return (
      <span key={k}>
        <span className="mf-w" style={idx(OFFSET[line] + k)}>{w}</span>
        {last ? "" : " "}
      </span>
    );
  });
}

export default function Manifesto() {
  return (
    <section className="manifesto" aria-labelledby="manifesto-h" style={{ ["--n" as string]: TOTAL, ["--soft" as string]: 4 } as React.CSSProperties}>
      <WordsLight />
      <div className="manifesto__bg" data-reveal>
        <Image
          className="manifesto__img"
          src="/photos/chair-solo.jpg"
          alt="Cadeira de barbeiro vermelha sob um facho de luz, num cômodo de paredes descascadas"
          width={1920}
          height={1282}
          sizes="(max-width: 600px) 380vw, (max-width: 900px) 200vw, 112vw"
          quality={85}
        />
      </div>
      <span className="manifesto__veil" aria-hidden="true" />

      <div className="manifesto__text">
        <p className="manifesto__tag" data-reveal>BRUTTO / Manifesto</p>
        <h2 id="manifesto-h" className="manifesto__lead" data-reveal style={idx(1)}><Words line={0} /></h2>
        <p className="manifesto__support" data-reveal style={idx(2)}>
          <Words line={1} />
        </p>
        <p className="manifesto__close" data-reveal style={idx(3)}>
          <span><Words line={2} /></span>
          <span><em><Words line={3} /></em></span>
        </p>
      </div>
    </section>
  );
}
