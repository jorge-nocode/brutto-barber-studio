// Dados de exemplo do BRUTTO (projeto fictício usado pela KLABEL DIGITAL como vitrine). Tudo que é contato,
// endereço, preço e horário fica aqui. Autorizado pelo proprietário; não são dados de uma empresa real.
import { SITE, whatsappLink } from "./site.config";

export const BRAND = SITE.companyName;
export const WHATSAPP_NUMBER = SITE.whatsapp.number; // configurado em lib/site.config.ts
export const WHATSAPP_DISPLAY = SITE.whatsapp.display;
export const whatsappUrl = whatsappLink;
export const INSTAGRAM_URL = "https://www.instagram.com/klabeldigital/";
export const INSTAGRAM_HANDLE = "@klabeldigital";
export const ADDRESS = { street: "Avenida Paulista, 1200", area: "Bela Vista, São Paulo/SP" }; // endereço ilustrativo
// Google Maps a partir do mesmo endereço: embed por endereço (sem API key) e link para abrir no Maps.
const MAPS_QUERY = encodeURIComponent(`${ADDRESS.street}, ${ADDRESS.area}`);
export const MAPS_EMBED_URL = `https://www.google.com/maps?q=${MAPS_QUERY}&output=embed&hl=pt-BR`;
export const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${MAPS_QUERY}`;

export type Service = { id: string; name: string; minutes: number; price: number };

export const services: Service[] = [
  { id: "corte", name: "Corte na tesoura ou máquina", minutes: 45, price: 70 },
  { id: "degrade", name: "Degradê na navalha", minutes: 60, price: 85 },
  { id: "risco", name: "Risco e desenho", minutes: 20, price: 25 },
  { id: "infantil", name: "Corte infantil", minutes: 40, price: 55 },
  { id: "barba", name: "Barba com toalha quente", minutes: 40, price: 60 },
  { id: "sobrancelha", name: "Sobrancelha na navalha", minutes: 15, price: 25 },
  { id: "pezinho", name: "Pezinho e acabamento", minutes: 15, price: 30 },
  { id: "combo", name: "Corte e barba", minutes: 90, price: 120 },
];

export const brl = (n: number) => `R$ ${n}`;

export const cuts = [
  { src: "/photos/barber-comb.jpg", name: "Pente e máquina", pos: "58% 45%", w: 2400, h: 1602 },
  { src: "/photos/fade-c.jpg", name: "Risco na lateral", pos: "45% 32%", w: 1002, h: 1600 },
  { src: "/photos/fade-b.jpg", name: "Degradê baixo com ondas", pos: "62% 45%", w: 1600, h: 1049 },
];

// Registro público de licenças das fotografias em uso (página /creditos). Registro interno completo: CREDITOS.md.
export const LICENSES = {
  "CC0": "https://creativecommons.org/publicdomain/zero/1.0/",
  "CC BY 2.0": "https://creativecommons.org/licenses/by/2.0/",
  "CC BY 4.0": "https://creativecommons.org/licenses/by/4.0/",
  "CC BY-SA 3.0": "https://creativecommons.org/licenses/by-sa/3.0/",
  "CC BY-SA 4.0": "https://creativecommons.org/licenses/by-sa/4.0/",
  "CC BY-SA 2.0": "https://creativecommons.org/licenses/by-sa/2.0/",
} as const;

export type Credit ={ title: string; by: string; lic: keyof typeof LICENSES; url: string; file: string; where: string };

export const credits: Credit[] = [
  { title: "Barber brings a haircut and beard to his client", by: "Shixart1985", lic: "CC BY 2.0", url: "https://commons.wikimedia.org/w/index.php?curid=195948209", file: "barber-razor.jpg", where: "Início e Cortes" },
  { title: "Barber cutting hair with comb. Back view of man in barber shop", by: "Nenad Stojkovic", lic: "CC BY 2.0", url: "https://commons.wikimedia.org/w/index.php?curid=116285951", file: "barber-comb.jpg", where: "Início e Cortes" },
  { title: "Barber's Chair (17334469536)", by: "Danny Fowler", lic: "CC BY-SA 2.0", url: "https://commons.wikimedia.org/w/index.php?curid=46994952", file: "chair-solo.jpg", where: "Manifesto" },
  { title: "Mid-fade 01, 06 e 07", by: "Classic Barbers", lic: "CC0", url: "https://commons.wikimedia.org/w/index.php?curid=147457018", file: "fade-a.jpg, fade-b.jpg, fade-c.jpg", where: "Início e Cortes" },
];
