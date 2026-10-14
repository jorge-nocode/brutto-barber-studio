import { useId } from "react";
import "./logo.css";

// Logo BRUTTO: o mesmo markup no cabeçalho e no preloader (o FLIP é só translate + scale entre duas caixas idênticas).
// Letras altas e condensadas, traço pesado (13/76), pontas retas e quinas vivas. O "BARBER STUDIO" fica na vertical,
// à direita, em dois eixos com a altura das letras. Largura das letras: 36 (centro do traço a 6,5 da borda).

const LETTERS = [
  "M6.5 76V6.5H19Q29.5 6.5 29.5 17.5V23.5Q29.5 36 19 36H6.5M19 36Q31 36 31 49V57.5Q31 69.5 19 69.5H6.5", // B
  "M6.5 76V6.5H19Q29.5 6.5 29.5 17.5V25Q29.5 36 19 36H6.5M17 36L30 84", // R (perna cortada rente à base pelo clip)
  "M6.5 0V52Q6.5 69.5 18 69.5Q29.5 69.5 29.5 52V0", // U
  "M0 6.5H36M18 6.5V76", // T
  "M0 6.5H36M18 6.5V76", // T
  "M18 6.5Q29.5 6.5 29.5 18V58Q29.5 69.5 18 69.5Q6.5 69.5 6.5 58V18Q6.5 6.5 18 6.5Z", // O
];
export const LOGO_ADVANCE = 43;
export const LOGO_LETTERS_W = 5 * LOGO_ADVANCE + 36; // 251
export const LOGO_VIEW_H = 92; // 76 de letra + 8 de folga em cima e embaixo (hover)

export default function LogoMark({ className = "" }: { className?: string }) {
  const clip = `lm-${useId().replace(/:/g, "")}`;
  return (
    <span className={`lm ${className}`} aria-hidden="true">
      <svg className="lm-letters" viewBox={`0 -8 ${LOGO_LETTERS_W} ${LOGO_VIEW_H}`} preserveAspectRatio="none" fill="none" focusable="false">
        <defs>
          <clipPath id={clip}>
            <rect x="-4" y="-14" width="44" height="90" />
          </clipPath>
        </defs>
        {LETTERS.map((d, k) => (
          <g key={k} transform={`translate(${k * LOGO_ADVANCE} 0)`} clipPath={`url(#${clip})`}>
            <g className="lm-l">
              <path className="lm-p" d={d} />
            </g>
          </g>
        ))}
      </svg>
      <svg className="lm-side" viewBox={`0 -8 50 ${LOGO_VIEW_H}`} preserveAspectRatio="none" focusable="false">
        <g className="lm-sub">
          <text transform="translate(20 76) rotate(-90)" textLength="76" lengthAdjust="spacing">BARBER</text>
          <text transform="translate(45 76) rotate(-90)" textLength="76" lengthAdjust="spacing">STUDIO</text>
        </g>
      </svg>
    </span>
  );
}
