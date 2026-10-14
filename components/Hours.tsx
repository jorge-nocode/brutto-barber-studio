"use client";
import { useEffect, useState } from "react";

// Funcionamento (mesmos horários que o Agendamento usa para validar os horários).
const rows = [
  { key: "week", day: "Segunda a sexta", hours: "9h às 20h" },
  { key: "sat", day: "Sábado", hours: "9h às 18h" },
  { key: "sun", day: "Domingo", hours: "Fechado" },
] as const;

type Key = (typeof rows)[number]["key"];

// Dia da semana em America/Sao_Paulo, independente do fuso do visitante.
function todayKey(): Key {
  const wd = new Intl.DateTimeFormat("en-US", { weekday: "short", timeZone: "America/Sao_Paulo" }).format(new Date());
  return wd === "Sun" ? "sun" : wd === "Sat" ? "sat" : "week";
}

/**
 * Tabela estática no servidor e no primeiro render do cliente (sem divergência de hidratação);
 * o destaque do dia atual entra depois da montagem. Só marca o dia: não afirma que a barbearia está aberta agora.
 */
export default function Hours() {
  const [today, setToday] = useState<Key | null>(null);
  useEffect(() => setToday(todayKey()), []);

  return (
    <dl className="hours">
      {rows.map((r) => {
        const on = today === r.key;
        return (
          <div key={r.key} className={on ? "hours__row is-today" : "hours__row"} aria-current={on ? "date" : undefined}>
            <dt>
              {r.day}
              {on && <span className="hours__tag"> · hoje</span>}
            </dt>
            <dd>{r.hours}</dd>
          </div>
        );
      })}
    </dl>
  );
}
