import type { Metadata, Viewport } from "next";
import { Anton, Barlow_Condensed, Lora, Mrs_Saint_Delafield, Work_Sans } from "next/font/google";
import "./globals.css";
import WhatsAppFloat from "../components/WhatsAppFloat";

const lora = Lora({ subsets: ["latin"], style: ["normal", "italic"], variable: "--font-lora", display: "swap" });
const barlow = Barlow_Condensed({ weight: ["500", "600"], subsets: ["latin"], variable: "--font-barlow", display: "swap" });

const script = Mrs_Saint_Delafield({ weight: "400", subsets: ["latin"], variable: "--font-script", display: "swap" });
const anton = Anton({ weight: "400", subsets: ["latin"], variable: "--font-anton", display: "swap", adjustFontFallback: false });
const work = Work_Sans({ weight: ["400", "500", "600"], subsets: ["latin"], variable: "--font-work", display: "swap" });

export const metadata: Metadata = {
  title: "BRUTTO Barber Studio — corte, barba e navalha por hora marcada",
  description:
    "Corte, barba e navalha com hora marcada. Veja os serviços e monte seu agendamento pelo WhatsApp.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "BRUTTO Barber Studio",
    description: "Bruto no nome, exato no corte.",
    type: "website",
    locale: "pt_BR",
  },
};

export const viewport: Viewport = { themeColor: "#101010", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${anton.variable} ${work.variable} ${lora.variable} ${barlow.variable} ${script.variable}`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            // 'pl' = preloader ativo em todo carregamento completo (sem storage). ?preloader=off desliga; reduced-motion pula.
            __html:
              "(function(d){d.classList.add('js');try{var m=(location.search.match(/[?&]preloader=(\\w+)/)||[])[1];if(location.pathname!=='/'||m==='off'||matchMedia('(prefers-reduced-motion: reduce)').matches)return;d.classList.add('pl','pl-lock');setTimeout(function(){d.classList.remove('pl','pl-lock');d.classList.add('pl-go')},12000)}catch(e){}})(document.documentElement)",
          }}
        />
      </head>
      <body>
        {children}
        <WhatsAppFloat />
      </body>
    </html>
  );
}
