"use client";
import { useState } from "react";
import { services } from "../lib/data";

const groups: { label: string; from: number; to: number }[] = [
  { label: "Cabelo", from: 0, to: 4 },
  { label: "Barba e acabamento", from: 4, to: 7 },
  { label: "Os dois", from: 7, to: 8 },
];

// taste-skill-ignore: numeração 01-08 pedida no briefing
const num = (i: number) => String(i + 1).padStart(2, "0"); // taste-skill-ignore

const PHOTO_ALT = "Barbeiro de avental de couro e luvas pretas passando a navalha na barba de um cliente deitado, com o rosto coberto de espuma";

/**
 * Serviços: coluna editorial (foto + headline monumental) e tabela de preços.
 * Cada linha é um único link para #agendar com data-service, que o Booking escuta no document:
 * a seleção do serviço segue funcionando. O painel sobre a foto acompanha a linha em foco
 * (mouse ou teclado) e é escondido no toque.
 *
 * Fotografia: <picture> escolhe a horizontal (desktop) ou a vertical (até 900px, inclusive tablet),
 * então só uma das duas é baixada.
 */
export default function Services() {
  const [active, setActive] = useState<number | null>(null);
  const s = active === null ? null : services[active];
  const idx = (n: number) => ({ ["--i" as string]: n }) as React.CSSProperties;

  return (
    <div className="svcs" style={{ ["--a" as string]: active ?? 0 } as React.CSSProperties}>
      <div className="svcs__lead">
        <div className="svcs__shot">
          <figure className="svcs__photo" data-shutter>
            <picture>
              <source
                media="(max-width: 900px)"
                type="image/webp"
                srcSet="/servicos/servicos-mobile-512.webp 512w, /servicos/servicos-mobile-768.webp 768w, /servicos/servicos-mobile-1024.webp 1024w"
                sizes="calc(100vw - 2rem)"
                width={1024}
                height={1536}
              />
              <source
                type="image/webp"
                srcSet="/servicos/servicos-desktop-1100.webp 1100w, /servicos/servicos-desktop-1536.webp 1536w"
                sizes="(min-width: 1536px) 1536px, 54vw"
                width={1536}
                height={1024}
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/servicos/servicos-desktop-1536.webp" width={1536} height={1024} alt={PHOTO_ALT} loading="lazy" decoding="async" />
            </picture>
            <figcaption className="svcs__readout" aria-hidden="true">
              {s && (
                <span key={s.id} className="svcs__readout-in">
                  <b className="display">{num(active!)}</b>
                  <span>{s.name}</span>
                  <span>{s.minutes} min</span>
                </span>
              )}
            </figcaption>
          </figure>
        </div>

        <div className="svcs__head">
          <p className="svcs__tag" data-reveal>Serviços</p>
          <h2 id="servicos-h" className="display svcs__title" data-reveal>
            <span>O que</span>
            <span>se faz</span>
            <span>é quanto</span>
            <span><mark className="svcs__mark">custa</mark></span>
          </h2>
        </div>

        <div className="svcs__copy">
          <p className="svcs__lede" data-reveal style={idx(1)}>
            Técnica, tempo e atenção.<br />
            Cada serviço tem um propósito<br />
            e um valor à altura.
          </p>
          <p className="svcs__sign" data-reveal style={idx(2)}>Brutalmente bem-feito.</p>
        </div>
      </div>

      <div className="svcs__list">
        {groups.map((g) => (
          <section key={g.label} className="svcs__group" aria-label={g.label}>
            <h3 className="svcs__label" data-reveal>
              <span>{g.label}</span>
              <span aria-hidden="true">{num(g.from)}{g.to - g.from > 1 ? ` — ${num(g.to - 1)}` : ""}</span>
            </h3>
            <ul>
              {services.slice(g.from, g.to).map((sv, k) => {
                const i = g.from + k;
                return (
                  <li key={sv.id} data-reveal style={idx(k)}>
                    <a
                      className="svc"
                      href="#agendar"
                      data-service={sv.id}
                      onPointerEnter={(e) => e.pointerType === "mouse" && setActive(i)}
                      onPointerLeave={(e) => e.pointerType === "mouse" && setActive(null)}
                      onFocus={(e) => e.currentTarget.matches(":focus-visible") && setActive(i)}
                      onBlur={() => setActive(null)}
                    >
                      <span className="svc__n" aria-hidden="true">{num(i)}</span>
                      <span className="svc__body">
                        <span className="svc__name">{sv.name}</span>
                        <span className="svc__min">{sv.minutes} minutos</span>
                      </span>
                      <span className="svc__price">
                        <span className="svc__cur">R$</span> {sv.price}
                      </span>
                      <svg className="svc__arrow" viewBox="0 0 28 14" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.6">
                        <path d="M0 7h26M20 1l6 6-6 6" />
                      </svg>
                      <span className="sr-only">. Agendar este serviço</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
