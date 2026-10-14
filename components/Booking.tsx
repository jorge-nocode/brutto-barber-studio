"use client";
import { useEffect, useMemo, useState } from "react";
import { ADDRESS, brl, services, whatsappUrl } from "../lib/data";

const times = ["09:00", "10:30", "12:00", "14:00", "15:30", "17:00", "18:30", "19:30"];

// Funcionamento (segunda a sexta 9h–20h, sábado 9h–18h). O serviço precisa terminar até o fechamento.
const CLOSE_WEEK = 20 * 60;
const CLOSE_SAT = 18 * 60;
const toMin = (hm: string) => Number(hm.slice(0, 2)) * 60 + Number(hm.slice(3, 5));
const fmtClose = (m: number) => `${m / 60}h`;

type Day = { key: string; short: string; wd: string; num: number; long: string; sat: boolean };

function nextDays(): Day[] {
  const out: Day[] = [];
  const wk = new Intl.DateTimeFormat("pt-BR", { weekday: "short" });
  const full = new Intl.DateTimeFormat("pt-BR", { weekday: "long", day: "numeric", month: "long" });
  const d = new Date();
  for (let i = 0; out.length < 6 && i < 10; i++) {
    const c = new Date(d.getFullYear(), d.getMonth(), d.getDate() + i);
    if (c.getDay() === 0) continue; // domingo fechado
    const wd = i === 0 ? "Hoje" : i === 1 ? "Amanhã" : wk.format(c).replace(".", "");
    out.push({ key: c.toISOString().slice(0, 10), short: i === 0 ? "Hoje" : i === 1 ? "Amanhã" : `${wd} ${c.getDate()}`, wd, num: c.getDate(), long: full.format(c), sat: c.getDay() === 6 });
  }
  return out;
}

const idx = (n: number) => ({ ["--i" as string]: n }) as React.CSSProperties;

export default function Booking() {
  const [serviceId, setServiceId] = useState(services[0].id);
  const [days, setDays] = useState<Day[]>([]);
  const [dayKey, setDayKey] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [name, setName] = useState("");
  const [nowHM, setNowHM] = useState("00:00");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    const n = new Date();
    setNowHM(`${String(n.getHours()).padStart(2, "0")}:${String(n.getMinutes()).padStart(2, "0")}`);
    const d = nextDays();
    setDays(d);
    setDayKey(d[0]?.key ?? "");
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest<HTMLElement>("[data-service]");
      const id = a?.dataset.service;
      if (id && services.some((s) => s.id === id)) setServiceId(id);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  const service = services.find((s) => s.id === serviceId)!;
  const day = days.find((d) => d.key === dayKey);
  const isToday = !!day && day.key === days[0]?.key && days[0].short === "Hoje";
  const close = day?.sat ? CLOSE_SAT : CLOSE_WEEK;
  // Um horário só é selecionável se já não passou (hoje) e se o serviço, com a duração real, termina até o fechamento.
  // Não existe dado de agenda: nenhum horário é apresentado como "ocupado".
  const reasonOf = (t: string): "" | "past" | "late" => (isToday && t <= nowHM ? "past" : toMin(t) + service.minutes > close ? "late" : "");
  const slots = times.filter((t) => reasonOf(t) === "");
  const slotKey = slots.join();
  const picked = time && slots.includes(time) ? time : "";
  const hasPast = times.some((t) => reasonOf(t) === "past");
  const hasLate = times.some((t) => reasonOf(t) === "late");

  // Se a escolha deixou de valer (outro serviço ou outro dia), a seleção é limpa e o aviso é anunciado.
  useEffect(() => {
    if (time && !slotKey.split(",").includes(time)) {
      setTime("");
      setNotice(`O horário ${time} não está disponível para este serviço e dia. Escolha outro.`);
    }
  }, [slotKey, time]);

  const href = useMemo(() => {
    const parts = [
      `Olá, BRUTTO! Gostaria de solicitar um agendamento: ${service.name} (${brl(service.price)}, ${service.minutes} min).`,
      day ? `Dia desejado: ${day.long}.` : "",
      picked ? `Horário desejado: ${picked}.` : "Pode me passar os horários livres?",
      name.trim() ? `Meu nome: ${name.trim()}.` : "",
      "Aguardo a confirmação de vocês.",
    ].filter(Boolean);
    return whatsappUrl(parts.join(" "));
  }, [service, day, picked, name]);

  return (
    <form className="ficha" onSubmit={(e) => e.preventDefault()} aria-labelledby="ficha-t">
      <header className="ficha__head" data-reveal>
        <h3 id="ficha-t" className="ficha__title">Solicitação de agendamento</h3>
        <p className="ficha__no" aria-hidden="true">BRUTTO · {ADDRESS.street}</p>
      </header>

      <div className="step" data-reveal style={idx(1)}>
        <label htmlFor="servico" className="step__label"><i>01</i>{/* taste-skill-ignore */}Serviço</label>
        <div className="select">
          <select id="servico" name="service" value={serviceId} onChange={(e) => setServiceId(e.target.value)}>
            {services.map((s) => (
              <option key={s.id} value={s.id}>
                {brl(s.price)} · {s.name}
              </option>
            ))}
          </select>
          <svg viewBox="0 0 14 8" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 1l6 6 6-6" /></svg>
        </div>
        <p className="svc-read" aria-hidden="true">
          <span key={service.id} className="swap">{service.minutes} min · {brl(service.price)}</span>
          <small>{services.length} serviços, de {brl(Math.min(...services.map((s) => s.price)))} a {brl(Math.max(...services.map((s) => s.price)))}</small>
        </p>
      </div>

      <fieldset className="step" data-reveal style={idx(2)}>
        <legend className="step__label"><i>02</i>{/* taste-skill-ignore */}Dia</legend>
        <div className="opts opts--days">
          {days.length === 0 && <p className="step__note">Carregando os próximos dias…</p>}
          {days.map((d) => (
            <label className="opt" key={d.key}>
              <input type="radio" name="day" value={d.key} checked={dayKey === d.key} onChange={() => setDayKey(d.key)} />
              <span className="opt__day">
                <small>{d.wd}</small>{" "}
                <b>{d.num}</b>
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="step" data-reveal style={idx(3)}>
        <legend className="step__label"><i>03</i>{/* taste-skill-ignore */}Horário desejado</legend>
        <div className="opts opts--times">
          {times.map((t) => {
            const ok = slots.includes(t);
            const why = reasonOf(t);
            return (
              <label className={ok ? "opt" : `opt is-off is-${why || "off"}`} key={t}>
                <input type="radio" name="time" value={t} checked={picked === t} disabled={!ok} onChange={() => { setTime(t); setNotice(""); }} />
                <span>
                  {t}
                  {why && <span className="sr-only"> ({why === "past" ? "já passou" : "o serviço terminaria depois do fechamento"})</span>}
                </span>
              </label>
            );
          })}
        </div>
        {slots.length === 0 && <p className="step__note">Não há horários disponíveis neste dia para este serviço. Escolha outro dia.</p>}
        {slots.length > 0 && (hasPast || hasLate) && (
          <p className="step__note step__note--quiet">
            {hasPast && "Riscado: o horário já passou. "}
            {hasLate && `Tracejado: o serviço (${service.minutes} min) terminaria depois do fechamento, às ${fmtClose(close)}. `}
          </p>
        )}
        <p role="status" className={notice ? "step__note" : "sr-only"}>{notice}</p>
      </fieldset>

      <div className="step" data-reveal style={idx(4)}>
        <label htmlFor="nome" className="step__label"><i>04</i>{/* taste-skill-ignore */}Seu nome <em>(opcional)</em></label>
        <input id="nome" type="text" autoComplete="given-name" placeholder="Como você quer ser chamado" value={name} onChange={(e) => setName(e.target.value)} />
      </div>

      <div className="ficha__foot" data-reveal style={idx(5)}>
        <dl className="sum" aria-live="polite">
          <div><dt>Serviço</dt><dd>{service.name}</dd></div>
          <div><dt>Duração</dt><dd>{service.minutes} min</dd></div>
          <div><dt>Dia</dt><dd><span key={dayKey} className="swap">{day ? day.long : "—"}</span></dd></div>
          <div><dt>Horário</dt><dd><span key={picked} className="swap">{picked || "a confirmar"}</span></dd></div>
        </dl>
        <p className="total">
          <span>Total</span>
          <b key={service.id} className="swap">{brl(service.price)}</b>
        </p>
        <a className="send" href={href} target="_blank" rel="noopener noreferrer">
          <span>Solicitar pelo WhatsApp</span>
          <svg viewBox="0 0 20 12" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2"><path d="M0 6h17M12 1l5 5-5 5" /></svg>
        </a>
        <p className="ficha__fine">Isto é um pedido, não uma reserva. A barbearia confirma o horário pelo WhatsApp.</p>
      </div>
    </form>
  );
}
