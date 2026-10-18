"use client";
import { useEffect, useRef } from "react";
import LogoMark from "./LogoMark";
import "./preloader.css";

// Preloader inspirado no hagisbarbering.com (sequência medida na referência):
//   0,0 s  tela preta, o logotipo é desenhado traço a traço (1,5 s, power1.in)
//   1,0 s  saída: a borda inferior da cortina sobe (2,5 s, expo.inOut)
//   3,5 s  cortina removida
// Etapa 10: no lugar de subir -50vh e sumir, o logo VOA até o logo real do cabeçalho (FLIP): a camada em voo
// é posicionada exatamente sobre o retângulo medido do logo do header e só recebe um transform (translate+scale)
// do centro da tela até a identidade. No fim a camada é removida e o logo real é revelado no mesmo quadro.
// Rolagem travada até 75% da saída. A entrada original do Hero fica em espera (html.pl) e é liberada em HERO_AT.

const DRAW_MS = 1500;
const EXIT_AT = 1000;
const EXIT_MS = 2500;
const HERO_AT = 800; // depois do início da saída
const UNLOCK_AT = EXIT_MS * 0.75;
const IMG_WAIT_MAX = 3000;
const EXPO_IN_OUT = "cubic-bezier(0.87, 0, 0.13, 1)";

export default function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const fly = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const html = document.documentElement;
    const el = root.current;
    const flyEl = fly.current;
    if (!html.classList.contains("pl") || !el || !flyEl) return;

    const timers: number[] = [];
    let raf = 0;
    let finished = false;
    const at = (fn: () => void, ms: number) => { timers.push(window.setTimeout(fn, ms)); };

    const ps = Array.from(flyEl.querySelectorAll<SVGPathElement>(".lm-p"));
    const sub = flyEl.querySelector<SVGGElement>(".lm-sub");
    const lens = ps.map((p) => p.getTotalLength());
    const total = lens.reduce((a, b) => a + b, 0);
    const easeIn = (t: number) => t * t; // power1.in

    // FLIP: caixa final = retângulo real do logo do cabeçalho; estado inicial = logo centralizado na tela.
    let from = "";
    const place = () => {
      const target = document.querySelector<SVGSVGElement>(".wordmark .lm");
      if (!target) return false;
      const T = target.getBoundingClientRect();
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const W0 = vw <= 760 ? vw * 0.56 : Math.max(220, vw * 0.25);
      const s = W0 / T.width;
      const H0 = T.height * s;
      flyEl.style.cssText = `left:${T.left}px;top:${T.top}px;width:${T.width}px;height:${T.height}px;transform-origin:0 0;`;
      from = `translate(${(vw - W0) / 2 - T.left}px, ${(vh - H0) / 2 - T.top}px) scale(${s})`;
      flyEl.style.transform = from;
      flyEl.style.visibility = "visible";
      return true;
    };
    const placed = place();
    if (!placed) { html.classList.remove("pl", "pl-lock"); html.classList.add("pl-go"); return; }

    const draw = (p: number) => {
      let drawn = p * total;
      ps.forEach((path, k) => {
        const part = Math.min(lens[k], Math.max(0, drawn));
        drawn -= lens[k];
        path.style.strokeDasharray = `${lens[k]}`;
        path.style.strokeDashoffset = `${lens[k] - part}`;
        path.style.opacity = part > 0 ? "1" : "0";
      });
      const s = Math.min(1, Math.max(0, (p - 0.55) / 0.45));
      if (sub) sub.style.clipPath = `inset(${100 - s * 100}% 0 0 0)`;
    };
    draw(0);

    const t0 = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - t0) / DRAW_MS);
      draw(easeIn(t));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const finish = () => {
      if (finished) return;
      finished = true;
      timers.forEach(clearTimeout);
      cancelAnimationFrame(raf);
      // mesmo quadro: logo real passa a existir (html.pl sai) e a camada em voo desaparece
      html.classList.add("pl-go");
      html.classList.remove("pl-lock", "pl");
      el.style.display = "none";
      flyEl.style.display = "none";
    };

    const exit = () => {
      cancelAnimationFrame(raf);
      draw(1);
      place(); // reposiciona se a janela mudou durante o desenho
      const opts = { duration: EXIT_MS, easing: EXPO_IN_OUT, fill: "forwards" as const };
      const curtain = el.animate([{ clipPath: "inset(0 0 0% 0)" }, { clipPath: "inset(0 0 100% 0)" }], opts);
      const flight = flyEl.animate([{ transform: from }, { transform: "translate(0px, 0px) scale(1)" }], opts);
      at(() => html.classList.add("pl-go"), HERO_AT);
      at(() => { html.classList.remove("pl-lock"); el.style.pointerEvents = "none"; }, UNLOCK_AT);
      // o swap acontece só quando as duas animações terminaram de fato (logo em voo = logo real, mesmo quadro)
      Promise.all([curtain.finished, flight.finished]).then(finish, finish);
      at(finish, EXIT_MS + 600); // reserva
    };

    // a saída espera o fundo do Hero estar decodificado (evita abrir sobre quadro vazio), com teto de segurança
    const img = document.querySelector<HTMLImageElement>(".hero__img");
    const ready = img && !img.complete
      ? Promise.race([img.decode().catch(() => undefined), new Promise((r) => setTimeout(r, IMG_WAIT_MAX))])
      : Promise.resolve();
    const minWait = new Promise((r) => setTimeout(r, EXIT_AT));
    Promise.all([ready, minWait]).then(exit);

    return () => { timers.forEach(clearTimeout); cancelAnimationFrame(raf); };
  }, []);

  return (
    <>
      <div ref={root} className="preloader" role="status" aria-label="Carregando BRUTTO Barber Studio" />
      <div ref={fly} className="preloader__fly" aria-hidden="true">
        <LogoMark />
      </div>
    </>
  );
}
