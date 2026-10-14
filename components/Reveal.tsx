"use client";
import { useEffect } from "react";

/**
 * Marca [data-reveal], [data-shutter] e [data-drop] com .is-in uma única vez, quando entram na tela.
 * Elementos recortados por clip-path (shutter) são observados pelo pai, porque o recorte zera a área visível.
 */
export default function Reveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal],[data-shutter],[data-drop]"));
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-in"));
      return;
    }
    const targets = new Map<Element, HTMLElement[]>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const group = targets.get(e.target);
          if (!group) continue;
          group.forEach((el, k) => {
            const go = () => {
              el.classList.add("is-in");
              if (el.hasAttribute("data-drop")) setTimeout(() => el.classList.add("settled"), 1200);
            };
            k === 0 ? go() : setTimeout(go, k * 120);
          });
          io.unobserve(e.target);
          targets.delete(e.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0 },
    );
    for (const el of els) {
      const t = el.hasAttribute("data-shutter") && el.parentElement ? el.parentElement : el;
      const g = targets.get(t);
      if (g) g.push(el);
      else {
        targets.set(t, [el]);
        io.observe(t);
      }
    }
    return () => io.disconnect();
  }, []);
  return null;
}
