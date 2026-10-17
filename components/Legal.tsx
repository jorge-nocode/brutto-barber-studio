import type { ReactNode } from "react";
import { SITE } from "../lib/site.config";

// Campo legal ainda não confirmado: nunca inventado, sempre destacado até ser preenchido em lib/site.config.ts.
export function LegalField({ value }: { value: string | null }) {
  return value ? <>{value}</> : <mark className="legal__pending">A CONFIRMAR antes da publicação</mark>;
}

export function LegalShell({ title, children }: { title: string; children: ReactNode }) {
  return (
    <main className="credits legal on-ink">
      <a className="credits__back link" href="/">← Voltar ao site</a>
      <h1 className="display">{title}</h1>
      <p className="legal__meta">{SITE.companyName} · Última atualização: {SITE.legal.lastUpdated}</p>
      {!SITE.legal.reviewed && (
        <aside className="legal__draft" aria-label="Aviso sobre este texto">
          <b>Texto-base para revisão.</b> Este documento descreve o que o site faz hoje, mas não substitui a análise de um
          advogado. Campos marcados como <mark className="legal__pending">A CONFIRMAR</mark> dependem de dados do responsável
          legal e precisam ser preenchidos e revisados antes da publicação.
        </aside>
      )}
      {children}
    </main>
  );
}
