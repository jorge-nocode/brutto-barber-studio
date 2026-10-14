import type { Metadata } from "next";
import { LICENSES, credits } from "../../lib/data";

export const metadata: Metadata = {
  title: "Créditos das fotografias — BRUTTO Barber Studio",
  description: "Autoria, licença e origem das fotografias usadas no site.",
  robots: { index: false, follow: false },
};

export default function CreditsPage() {
  return (
    <main className="credits on-ink">
      <a className="credits__back link" href="/">← Voltar ao site</a>
      <h1 className="display">Créditos das fotografias</h1>
      <p className="credits__lead">
        As fotografias do site vêm do Wikimedia Commons e são usadas sob licenças Creative Commons. Para exibição, elas foram
        redimensionadas, recortadas (enquadramento) e tratadas em preto e branco com tom sépia, contraste e brilho ajustados. As
        versões adaptadas das fotos CC BY-SA são compartilhadas sob a mesma licença da foto original. Os autores não endossam
        este site.
      </p>
      <p className="credits__lead">
        Exceção: as fotografias da seção Serviços foram fornecidas pelo proprietário do site. Elas são exibidas sem tratamento de cor,
        apenas redimensionadas e enquadradas.
      </p>
      <ul className="credits__list">
        {credits.map((c) => (
          <li key={c.url}>
            <b>
              <a className="link" href={c.url} rel="noopener noreferrer">{c.title}</a>
            </b>
            <span>
              Autoria: {c.by} · Licença: <a className="link" href={LICENSES[c.lic]} rel="noopener noreferrer">{c.lic}</a> · Usada em: {c.where}
            </span>
          </li>
        ))}
      </ul>
    </main>
  );
}
