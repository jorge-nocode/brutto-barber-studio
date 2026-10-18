"use client";
import { useEffect, useRef } from "react";
import "./letreiro.css";

// Letreiro entre Manifesto e Serviços. Adaptado do MOT-010 + MOT-009 da KLABEL (rAF puro, sem libs), sem ligação com a rolagem:
// abre da esquerda por clip-path, depois corre continuamente em velocidade constante.
// A copy é a que já existe no site (eyebrow do Hero "Barba · Cabelo · Atitude" e "Hora marcada").
const WORDS = ["Barba", "Cabelo", "Atitude", "Hora marcada"];

const FILL = 5; // cópias visuais extras: cobrem telas largas (período ≥ ~600 px)
const SPEED = 20; // px/s, constante: quase imperceptível, mas contínuo

export default function Letreiro() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    const tr = track.current;
    if (!el || !tr) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) return; // texto estático, sem reveal nem loop (ver letreiro.css)

    let visible = false;
    let x = 0;
    let loop = 0; // largura de uma cópia (inclui o espaço final), em px
    let prev = 0;
    let raf = 0;

    const measure = () => {
      loop = (tr.firstElementChild as HTMLElement | null)?.getBoundingClientRect().width ?? 0;
    };
    const ro = new ResizeObserver(measure);
    ro.observe(tr);
    document.fonts?.ready.then(measure);
    measure();

    const frame = (now: number) => {
      raf = 0;
      if (!visible) return;
      const dt = Math.min(now - prev, 64);
      prev = now;
      if (loop > 0) {
        x = (x + (SPEED * dt) / 1000) % loop;
        tr.style.transform = `translate3d(${-x.toFixed(2)}px,0,0)`;
      }
      raf = requestAnimationFrame(frame);
    };
    const start = () => {
      if (!raf) { prev = performance.now(); raf = requestAnimationFrame(frame); }
    };

    const io = new IntersectionObserver(
      ([e]) => {
        visible = e.isIntersecting;
        if (visible) { el.classList.add("is-in"); start(); }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(el);

    return () => {
      io.disconnect();
      ro.disconnect();
      if (raf) cancelAnimationFrame(raf);
      tr.style.transform = "";
      el.classList.remove("is-in");
    };
  }, []);

  const items = WORDS.map((w, i) => (
    <li key={i} className="letreiro__item">{w}</li>
  ));

  return (
    <section ref={root} className="letreiro" aria-label="Lema da casa">
      <div ref={track} className="letreiro__track">
        {/* Cópia lida pelos leitores de tela; a largura dela é o período do loop */}
        <ul className="letreiro__copy">{items}</ul>
        {/* Cópias só visuais: preenchem a esteira (faixa fina precisa de várias) e fecham o loop sem emenda */}
        {Array.from({ length: FILL }, (_, k) => (
          <ul key={k} className="letreiro__copy" aria-hidden="true">{items}</ul>
        ))}
      </div>
    </section>
  );
}
