import Image from "next/image";

// Manifesto: cena fotográfica. A cadeira vermelha é o fundo e a protagonista; a copy é uma coluna editorial única
// na parede escura à esquerda (eyebrow, headline, apoio e fecho agrupados), fora da cadeira.

const idx = (n: number) => ({ ["--i" as string]: n }) as React.CSSProperties;

export default function Manifesto() {
  return (
    <section className="manifesto" aria-labelledby="manifesto-h">
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
        <h2 id="manifesto-h" className="manifesto__lead" data-reveal style={idx(1)}>Algumas coisas nunca saem de cena.</h2>
        <p className="manifesto__support" data-reveal style={idx(2)}>
          Uma cadeira. Uma história. E a arte de fazer bem-feito.
        </p>
        <p className="manifesto__close" data-reveal style={idx(3)}>
          <span>O estilo muda.</span>
          <span><em>A essência fica.</em></span>
        </p>
      </div>
    </section>
  );
}
