"use client";
import { useEffect, useRef, type ReactNode } from "react";
import "./stack-reveal.css";

// Hero retido + Manifesto sobe por cima (ver stack-reveal.css). O JS só mede: se o Hero for mais alto que a tela,
// a retenção é pelo pé (top negativo), para a base dele aparecer inteira antes de ser coberta. Sem JS, o CSS usa o min-height.
export default function StackReveal({ children }: { children: ReactNode }) {
  const group = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const g = group.current;
    const hero = g?.querySelector<HTMLElement>(".hero");
    if (!g || !hero) return;
    const fit = () => g.style.setProperty("--stack-top", `${Math.min(0, window.innerHeight - hero.offsetHeight)}px`);
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(hero);
    window.addEventListener("resize", fit);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", fit);
      g.style.removeProperty("--stack-top");
    };
  }, []);

  return <div ref={group} className="stack-group">{children}</div>;
}
