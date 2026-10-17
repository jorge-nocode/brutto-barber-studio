"use client";
import { useEffect, useRef } from "react";
import "./letreiro.css";

// Letreiro entre Manifesto e Serviços. Adaptado do MOT-010 + MOT-009 da KLABEL (rAF puro, sem libs):
// abre da esquerda por clip-path, depois corre continuamente; a velocidade sobe um pouco com a rolagem e decai.
// A copy é a que já existe no site (eyebrow do Hero "Barba · Cabelo · Atitude" e "Hora marcada").
const WORDS = ["Barba", "Cabelo", "Atitude", "Hora marcada"];

const BASE_MIN = 28; // px/s
const BASE_MAX = 46;
const BOOST_MAX = 60; // acréscimo máximo por rolagem, px/s (limita a intensidade)
const BOOST_PER_PX = 0.04; // px/s extra por (px/s de rolagem)
const EASE_MS = 450; // constante de tempo da suavização da velocidade

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
    let speed = 0;
    let boost = 0;
    let lastY = window.scrollY;
    let lastScrollT = performance.now();
    let prev = 0;
    let raf = 0;

    const measure = () => {
      loop = (tr.firstElementChild as HTMLElement | null)?.getBoundingClientRect().width ?? 0;
    };
    const ro = new ResizeObserver(measure);
    ro.observe(tr);
    document.fonts?.ready.then(measure);
    measure();

    const onScroll = () => {
      const now = performance.now();
      const dt = Math.max(now - lastScrollT, 1);
      const v = Math.abs(window.scrollY - lastY) / dt * 1000; // px/s
      lastY = window.scrollY;
      lastScrollT = now;
      boost = Math.min(v * BOOST_PER_PX, BOOST_MAX);
    };

    const frame = (now: number) => {
      raf = 0;
      if (!visible) return;
      const dt = Math.min(now - prev, 64);
      prev = now;
      // Sem rolagem recente o impulso decai sozinho.
      if (now - lastScrollT > 90) boost *= Math.exp(-dt / 300);
      const base = Math.min(BASE_MAX, Math.max(BASE_MIN, window.innerWidth * 0.028));
      speed += (base + boost - speed) * (1 - Math.exp(-dt / EASE_MS));
      if (loop > 0) {
        x = (x + (speed * dt) / 1000) % loop;
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
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
      tr.style.transform = "";
      el.classList.remove("is-in");
    };
  }, []);

  const items = WORDS.map((w, i) => (
    <li key={i} className="letreiro__item">{w}</li>
  ));

  return (
    <section ref={root} className="letreiro on-brick" aria-label="Lema da casa">
      <div ref={track} className="letreiro__track">
        {/* Cópia lida pelos leitores de tela */}
        <ul className="letreiro__copy">{items}</ul>
        {/* Cópia só visual, para o loop sem emendas */}
        <ul className="letreiro__copy" aria-hidden="true">{items}</ul>
      </div>
    </section>
  );
}
