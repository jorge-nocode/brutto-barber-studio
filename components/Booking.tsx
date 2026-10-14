"use client";
import { useEffect, useMemo, useState } from "react";
import { brl, services, whatsappUrl } from "../lib/data";

const times = ["09:00", "10:30", "12:00", "14:00", "15:30", "17:00", "18:30", "19:30"];

type Day = { key: string; short: string; long: string; sat: boolean };

function nextDays(): Day[] {
  const out: Day[] = [];
  const wk = new Intl.DateTimeFormat("pt-BR", { weekday: "short" });
  const full = new Intl.DateTimeFormat("pt-BR", { weekday: "long", day: "numeric", month: "long" });
  const d = new Date();
  for (let i = 0; out.length < 6 && i < 10; i++) {
    const c = new Date(d.getFullYear(), d.getMonth(), d.getDate() + i);
    if (c.getDay() === 0) continue; // domingo fechado
    const short = i === 0 ? "Hoje" : i === 1 ? "Amanhã" : `${wk.format(c).replace(".", "")} ${c.getDate()}`;
    out.push({ key: c.toISOString().slice(0, 10), short, long: full.format(c), sat: c.getDay() === 6 });
  }
  return out;
}

export default function Booking() {
  const [serviceId, setServiceId] = useState(services[0].id);
  const [days, setDays] = useState<Day[]>([]);
  const [dayKey, setDayKey] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [name, setName] = useState("");
  const [nowHM, setNowHM] = useState("00:00");

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
  const slots = times.filter((t) => (day?.sat ? t < "18:00" : true) && (!isToday || t > nowHM));
  const dropped = !!time && !slots.includes(time);
  const picked = time && slots.includes(time) ? time : "";

  const href = useMemo(() => {
    const parts = [
      `Olá, BRUTTO! Quero marcar: ${service.name} (${brl(service.price)}, ${service.minutes} min).`,
      day ? `Dia: ${day.long}.` : "",
      picked ? `Horário: ${picked}.` : "Pode me passar os horários livres?",
      name.trim() ? `Meu nome: ${name.trim()}.` : "",
    ].filter(Boolean);
    return whatsappUrl(parts.join(" "));
  }, [service, day, picked, name]);

  return (
    <div className="book__ticket">
      <div className="stub" aria-live="polite">
        <p className="display stub__day">
          <span key={`${dayKey}-${picked}`} className="swap">
            {day ? day.short : "Hoje"} {picked || <span className="stub__dash">—</span>}
          </span>
        </p>
        <p className="stub__meta">
          <span>{service.name}</span>
          <span>{brl(service.price)}</span>
        </p>
      </div>

      <form className="slip" onSubmit={(e) => e.preventDefault()}>
        <div className="field">
          <label htmlFor="servico" className="field__label">Serviço</label>
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
          <small className="field__hint">{services.length} serviços, de {brl(Math.min(...services.map((s) => s.price)))} a {brl(Math.max(...services.map((s) => s.price)))}</small>
        </div>

        <fieldset>
          <legend>Dia</legend>
          <div className="opts">
            {days.length === 0 && <p className="slip__note">Carregando os próximos dias…</p>}
            {days.map((d) => (
              <label className="opt" key={d.key}>
                <input type="radio" name="day" value={d.key} checked={dayKey === d.key} onChange={() => setDayKey(d.key)} />
                <span>{d.short}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend>Horário</legend>
          <div className="opts opts--times">
            {slots.length === 0 && <p className="slip__note">Hoje não há mais horários. Escolha outro dia.</p>}
            {slots.map((t) => (
              <label className="opt" key={t}>
                <input type="radio" name="time" value={t} checked={picked === t} onChange={() => setTime(t)} />
                <span>{t}</span>
              </label>
            ))}
          </div>
          {dropped && (
            <p className="slip__note" role="status">
              O horário {time} não está disponível nesse dia. Escolha outro.
            </p>
          )}
        </fieldset>

        <div className="field">
          <label htmlFor="nome" className="field__label">Seu nome (opcional)</label>
          <input id="nome" type="text" autoComplete="given-name" placeholder="Como você quer ser chamado" value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        <div className="slip__foot">
          <p className="slip__total">
            Total
            <b>{brl(service.price)}</b>
          </p>
          <a className="button" href={href} target="_blank" rel="noopener noreferrer">
            Enviar pelo WhatsApp
          </a>
        </div>
      </form>
    </div>
  );
}
