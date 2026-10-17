// Porta de publicação: falha se algum dado legal de lib/site.config.ts ainda estiver pendente.
// Uso: npm run check:legal   (rode antes de publicar qualquer site criado a partir deste modelo)
import { readFileSync } from "node:fs";

const src = readFileSync(new URL("../lib/site.config.ts", import.meta.url), "utf8");
const block = src.slice(src.indexOf("legal: {"), src.indexOf("consent:"));
const pending = [...block.matchAll(/^\s*(\w+):\s*null\b/gm)].map((m) => m[1]);
if (/reviewed:\s*false/.test(block)) pending.push("reviewed (revisão jurídica)");

if (pending.length) {
  console.error("Dados legais pendentes em lib/site.config.ts:\n - " + pending.join("\n - "));
  console.error("\nPreencha e revise antes de publicar.");
  process.exit(1);
}
console.log("Dados legais completos e revisados.");
