import Image from "next/image";

// Etapa 12: seção Cortes como página de campanha. Cada fotografia é um elemento independente (data-drop, observado por Reveal).
const i = (n: number) => ({ ["--i" as string]: n }) as React.CSSProperties;

export default function Cuts() {
  return (
    <section id="cortes" className="cuts on-blood" aria-labelledby="cortes-h">
      <h2 id="cortes-h" className="display cuts__h" data-reveal>
        <span className="cuts__line"><span>Nuca</span></span>
        <span className="cuts__line"><span>limpa.</span></span>
      </h2>

      <div className="cuts__copy">
        <p className="cuts__lede" data-reveal style={i(2)}>
          Cortes que respeitam<br />o seu estilo e a sua rotina.
        </p>
      </div>
      <p className="cuts__sign" data-reveal style={i(4)} aria-hidden="true">Brutalmente bem-feito.</p>

      <div className="cuts__prints">
        <figure className="print print--a print--tape" data-drop style={i(0)}>
          <Image src="/photos/fade-a.jpg" alt="Perfil de homem com degradê alto e um coração desenhado na lateral da cabeça" width={1600} height={1059} sizes="(min-width: 901px) 24vw, 58vw" />
        </figure>
        <figure className="print print--b" data-drop style={i(1)}>
          <Image src="/photos/fade-c.jpg" alt="Perfil de homem com degradê alto e um raio desenhado na lateral da cabeça" width={1002} height={1600} sizes="(min-width: 901px) 24vw, 52vw" />
        </figure>
        <figure className="print print--c" data-drop style={i(2)}>
          <Image src="/photos/barber-comb.jpg" alt="Nuca e degradê de um homem de costas, com o barbeiro passando pente e máquina" width={2400} height={1602} sizes="(min-width: 901px) 24vw, 56vw" />
        </figure>
        <figure className="print print--d print--tape" data-drop style={i(3)}>
          <Image src="/photos/fade-b.jpg" alt="Perfil de jovem com degradê baixo e cabelo com ondas" width={1600} height={1049} sizes="(min-width: 901px) 20vw, 52vw" />
        </figure>
        <figure className="print print--e" data-drop style={i(4)}>
          <Image src="/photos/barber-razor.jpg" alt="Barbeiro acertando a risca e a costeleta com navalha, em um cliente de degradê baixo" width={2400} height={3595} sizes="(min-width: 901px) 22vw, 56vw" />
        </figure>
      </div>
    </section>
  );
}
