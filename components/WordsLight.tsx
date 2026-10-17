"use client";
import { useEffect } from "react";
import "./words-light.css";

// Palavras acesas pelo scroll (adaptado do MOT-014 da KLABEL, sem GSAP). Não renderiza nada: liga o efeito na seção
// pai (data-words="on") e escreve uma única custom property (--p, 0→1) nela. O CSS faz o resto; o React não re-renderiza.
// Sem JS ou com movimento reduzido o atributo nunca é posto e o texto fica na cor final.
export default function WordsLight() {
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const marker = document.querySelector<HTMLElement>("[data-words-root]");
    const section = marker?.closest<HTMLElement>("section");
    const block = section?.querySelector<HTMLElement>(".manifesto__text");
    const first = block?.querySelector<HTMLElement>(".manifesto__tag");
    const last = block?.querySelector<HTMLElement>(".manifesto__close");
    if (!section || !block || !first || !last) return;

    let target = 0;
    let shown = -1;
    let raf = 0;
    let near = true;

    // O progresso usa a geometria do bloco de texto, que não é afetada pelos reveals (transform/opacity).
    const measure = () => {
      const vh = window.innerHeight;
      const top = section.getBoundingClientRect().top + block.offsetTop + first.offsetTop;
      const h = last.offsetTop + last.offsetHeight - first.offsetTop; // altura do texto (o .manifesto__text ocupa a seção toda)
      const start = vh * 0.88; // texto começa a entrar de fato
      const end = Math.max(vh * 0.12, vh * 0.88 - h); // texto todo à vista: a leitura termina
      target = Math.min(1, Math.max(0, (start - top) / (start - end)));
    };
    let prev = 0;
    const tick = (now: number) => {
      raf = 0;
      // Suavização por tempo (não por quadro): mesma sensação em 60 e 120 Hz.
      const k = 1 - Math.exp(-Math.min(now - prev, 100) / 90);
      prev = now;
      shown = Math.abs(target - shown) < 0.0005 || shown < 0 ? target : shown + (target - shown) * k;
      section.style.setProperty("--p", shown.toFixed(4));
      if (shown !== target) raf = requestAnimationFrame(tick);
    };
    const onScroll = () => {
      if (!near) return;
      measure();
      if (!raf) { prev = performance.now(); raf = requestAnimationFrame(tick); }
    };

    const enable = () => {
      section.dataset.words = "on";
      measure();
      shown = target; // sem animar de 0 ao chegar por âncora ou recarregar no meio da página
      section.style.setProperty("--p", shown.toFixed(4));
    };
    const disable = () => {
      delete section.dataset.words;
      section.style.removeProperty("--p");
    };
    const onMotion = () => (mq.matches ? disable() : enable());

    const io = new IntersectionObserver(([e]) => { near = e.isIntersecting; if (near) onScroll(); }, { rootMargin: "20% 0px 20% 0px" });
    io.observe(section);
    mq.addEventListener("change", onMotion);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    if (!mq.matches) enable();

    return () => {
      io.disconnect();
      mq.removeEventListener("change", onMotion);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
      disable();
    };
  }, []);

  return <span data-words-root hidden />;
}
