"use client";
import { useEffect, useRef } from "react";

// Primeira dobra cinematográfica: fotografia protagonista, copy centralizada e delicada.
// As animações do Hero anterior foram adaptadas (máscara de linha, cortina da foto, zoom, traço, rise, parallax).

const i = (n: number) => ({ ["--i" as string]: n }) as React.CSSProperties;

const HEADLINE = "O cuidado que faz a diferença.".split(" ");

function Icon({ name }: { name: "scissors" | "calendar" | "medal" | "arrow" | "mouse" }) {
  const p = { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.4, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true } as const;
  switch (name) {
    case "scissors":
      return (
        <svg {...p}>
          <circle cx="6" cy="18" r="3" />
          <circle cx="18" cy="18" r="3" />
          <path d="M8.2 15.8 18 3M15.8 15.8 6 3" />
        </svg>
      );
    case "calendar":
      return (
        <svg {...p}>
          <rect x="3.5" y="5" width="17" height="15.5" rx="1.5" />
          <path d="M3.5 10h17M8 3v4M16 3v4M8 14h2M14 14h2M8 17h2" />
        </svg>
      );
    case "medal":
      return (
        <svg {...p}>
          <circle cx="12" cy="9.5" r="6" />
          <path d="m12 6.8 1 2 2.2.3-1.6 1.6.4 2.2-2-1.1-2 1.1.4-2.2L8.8 9.1 11 8.8zM8.5 14.5 7 21l5-2.6 5 2.6-1.5-6.5" />
        </svg>
      );
    case "arrow":
      return (
        <svg {...p} strokeWidth={1.6}>
          <path d="M3 12h17M14 6l6 6-6 6" />
        </svg>
      );
    default:
      return (
        <svg {...p} viewBox="0 0 24 40" strokeWidth={1.2}>
          <rect x="5" y="2" width="14" height="24" rx="7" />
          <path d="M12 8v5" />
          <path d="M12 31v7M9 35l3 3 3-3" />
        </svg>
      );
  }
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);

  // Cabeçalho: transparente no topo, sólido depois. Mantido do Hero anterior.
  useEffect(() => {
    let raf = 0;
    const header = document.querySelector<HTMLElement>(".header");
    const update = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => header?.classList.toggle("is-top", window.scrollY < 24));
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", update);
    };
  }, []);

  const goNext = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const next = ref.current?.nextElementSibling;
    if (!next) return;
    e.preventDefault();
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    next.scrollIntoView({ behavior: calm ? "auto" : "smooth", block: "start" });
  };

  return (
    <section ref={ref} className="hero" aria-labelledby="hero-title">
      <div className="hero__bg" aria-hidden="true">
        <picture>
          <source media="(max-width: 760px)" srcSet="/hero/brutto-hero-mobile-640.webp 640w, /hero/brutto-hero-mobile-941.webp 941w" sizes="100vw" />
          <source srcSet="/hero/brutto-hero-desktop-1200.webp 1200w, /hero/brutto-hero-desktop-1672.webp 1672w" sizes="100vw" />
          <img className="hero__img" src="/hero/brutto-hero-desktop-1672.webp" alt="" width={1672} height={941} fetchPriority="high" decoding="async" />
        </picture>
        <div className="hero__veil" />
      </div>

      <nav className="hero__index" aria-label="Seções">
        <a className="is-on" href="#topo" aria-current="true">01<span className="sr-only"> Início</span></a>
        <a href="#servicos">02<span className="sr-only"> Serviços</span></a>
        <a href="#agendar">03<span className="sr-only"> Agendar</span></a>
      </nav>

      <div className="hero__main">
        <p className="hero__eyebrow" data-in style={i(0)}>Barba · Cabelo · Atitude</p>

        <h1 id="hero-title" className="hero__h1">
          <span className="sr-only">O cuidado que faz a diferença.</span>
          <span aria-hidden="true">
            {HEADLINE.map((w, k) => (
              <span key={k} className="hero__word"><span style={i(k)}>{w}</span></span>
            ))}
          </span>
        </h1>
        <p className="hero__sub"><span style={i(0)}>Seu estilo, em boas mãos.</span></p>

        <p className="hero__lead" data-in style={i(4)}>
          Um espaço para cuidar de você, com atenção aos detalhes, bons profissionais e horário marcado.
        </p>

        <div className="hero__actions" data-in style={i(5)}>
          <a className="hero__btn hero__btn--gold" href="#agendar">
            <Icon name="calendar" />
            Agendar horário
          </a>
          <a className="hero__btn hero__btn--line" href="#servicos">
            Conhecer serviços
            <Icon name="arrow" />
          </a>
        </div>
      </div>

      <ul className="hero__facts" data-in style={i(7)}>
        <li><Icon name="scissors" /><span>Cortes<br />personalizados</span></li>
        <li><Icon name="calendar" /><span>Atendimento<br />com hora marcada</span></li>
        <li><Icon name="medal" /><span>Ambiente<br />exclusivo</span></li>
      </ul>

      <a className="hero__scroll" href="#manifesto-h" onClick={goNext} aria-label="Rolar para a próxima seção" data-in style={i(8)}>
        <Icon name="mouse" />
      </a>
    </section>
  );
}
