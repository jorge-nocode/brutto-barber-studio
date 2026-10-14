"use client";
import { useEffect, useRef } from "react";
import LogoMark from "./LogoMark";

// Hover do logo. Referência (freshcut-barbershop.com, medido): o logo é uma imagem com "motion effects" que inclina o
// conjunto em 3D seguindo o mouse (perspectiva 1200px, ±15,6° / ±17° nos cantos, ~300ms de suavização, volta a 0 ao sair).
// Aqui: o mesmo tilt 3D do conjunto, em escala de cabeçalho, mais uma reação por letra (adaptação pedida; não existe na
// referência): a letra sob o ponteiro sobe e cresce um pouco, com queda suave nas vizinhas.

const TILT_Y = 13; // graus, ponteiro na borda lateral do logo
const TILT_X = 9;
const LIFT = 4; // unidades do SVG
const GROW = 0.08;
const SMOOTH = 0.17; // fração por quadro (~300ms até assentar)

export default function Wordmark() {
  const link = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const a = link.current;
    const svg = a?.querySelector<HTMLElement>(".lm");
    const lettersSvg = a?.querySelector<SVGSVGElement>(".lm-letters");
    if (!a || !svg || !lettersSvg) return;
    if (!matchMedia("(hover: hover) and (pointer: fine)").matches || matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const letters = Array.from(svg.querySelectorAll<SVGGElement>(".lm-l"));
    const cur = { rx: 0, ry: 0, lift: letters.map(() => 0), grow: letters.map(() => 0) };
    const tgt = { rx: 0, ry: 0, lift: letters.map(() => 0), grow: letters.map(() => 0) };
    let raf = 0;
    let centers: number[] = [];
    let box = a.getBoundingClientRect();
    let pitch = 1;

    const measure = () => {
      box = a.getBoundingClientRect();
      const r = lettersSvg.getBoundingClientRect();
      centers = letters.map((l) => { const b = l.getBoundingClientRect(); return b.left + b.width / 2; });
      pitch = Math.max(1, (r.width / 251) * 43); // passo de uma letra em px
    };

    const apply = () => {
      svg.style.transform = `perspective(520px) rotateX(${cur.rx}deg) rotateY(${cur.ry}deg)`;
      letters.forEach((l, k) => { l.style.transform = `translateY(${-cur.lift[k]}px) scale(${1 + cur.grow[k]})`; });
    };

    const loop = () => {
      let moving = false;
      const step = (c: number, t: number) => { const d = t - c; if (Math.abs(d) < 0.005) return t; moving = true; return c + d * SMOOTH; };
      cur.rx = step(cur.rx, tgt.rx);
      cur.ry = step(cur.ry, tgt.ry);
      letters.forEach((_, k) => { cur.lift[k] = step(cur.lift[k], tgt.lift[k]); cur.grow[k] = step(cur.grow[k], tgt.grow[k]); });
      apply();
      raf = moving ? requestAnimationFrame(loop) : 0;
    };
    const kick = () => { if (!raf) raf = requestAnimationFrame(loop); };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const nx = Math.max(-1, Math.min(1, (e.clientX - (box.left + box.width / 2)) / (box.width / 2)));
      const ny = Math.max(-1, Math.min(1, (e.clientY - (box.top + box.height / 2)) / (box.height / 2)));
      tgt.ry = nx * TILT_Y;
      tgt.rx = -ny * TILT_X;
      letters.forEach((_, k) => {
        const d = (e.clientX - centers[k]) / pitch;
        const w = Math.exp(-d * d * 0.9);
        tgt.lift[k] = w * LIFT;
        tgt.grow[k] = w * GROW;
      });
      kick();
    };
    const onEnter = () => { measure(); };
    const onLeave = () => {
      tgt.rx = 0; tgt.ry = 0;
      tgt.lift.fill(0); tgt.grow.fill(0);
      kick();
    };

    measure();
    a.addEventListener("pointerenter", onEnter);
    a.addEventListener("pointermove", onMove);
    a.addEventListener("pointerleave", onLeave);
    window.addEventListener("resize", measure);
    return () => {
      cancelAnimationFrame(raf);
      a.removeEventListener("pointerenter", onEnter);
      a.removeEventListener("pointermove", onMove);
      a.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("resize", measure);
      svg.style.transform = "";
      letters.forEach((l) => { l.style.transform = ""; });
    };
  }, []);

  return (
    <a ref={link} className="wordmark" href="#topo" aria-label="BRUTTO Barber Studio, início">
      <LogoMark />
    </a>
  );
}
