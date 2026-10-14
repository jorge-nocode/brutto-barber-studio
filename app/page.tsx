import Hero from "../components/Hero";
import Booking from "../components/Booking";
import Services from "../components/Services";
import Manifesto from "../components/Manifesto";
import Cuts from "../components/Cuts";
import Studio from "../components/Studio";
import Reveal from "../components/Reveal";
import Preloader from "../components/Preloader";
import Wordmark from "../components/Wordmark";
import LogoMark from "../components/LogoMark";
import Hours from "../components/Hours";
import { ADDRESS, INSTAGRAM_HANDLE, MAPS_EMBED_URL, MAPS_URL, INSTAGRAM_URL, WHATSAPP_DISPLAY, whatsappUrl } from "../lib/data";

const HELLO = "Olá, BRUTTO! Gostaria de mais informações.";
const idx = (n: number) => ({ ["--i" as string]: n }) as React.CSSProperties;

export default function Page() {
  return (
    <>
      <Reveal />
      <Preloader />

      <header className="header is-top">
        <Wordmark />
        <nav className="nav" aria-label="Principal">
          <a href="#servicos">Serviços</a>
          <a href="#cortes">Cortes</a>
          <a href="#estudio">Estúdio</a>
          <a href="#onde">Onde</a>
          <a className="button button--small" href="#agendar">Agendar</a>
        </nav>
      </header>

      <main id="topo">
        <Hero />

        <Manifesto />

        {/* Serviços */}
        <section id="servicos" className="services on-ink" aria-labelledby="servicos-h">
          <Services />
        </section>

        {/* Cortes */}
        <Cuts />

        {/* Estúdio */}
        <Studio />

        {/* Agendar */}
        <section id="agendar" className="book on-ink" aria-labelledby="agendar-h">
          <div className="wrap">
            <div className="grid12">
              <div className="book__intro">
                <p className="book__tag" data-reveal>Agendamento</p>
                <h2 id="agendar-h" className="display book__h" data-reveal>
                  <span className="book__line"><span>Sua vez</span></span>
                  <span className="book__line"><span>na cadeira<b className="book__dot">.</b></span></span>
                </h2>
                <p className="book__lead" data-reveal style={idx(1)}>
                  Escolha o serviço, o dia e o horário. A mensagem sai pronta no WhatsApp.
                </p>
                <small className="book__hours" data-reveal style={idx(2)}>Domingo fechado. Sábado até 18h.</small>
              </div>
              <Booking />
            </div>
          </div>
        </section>

        {/* Onde */}
        <section id="onde" className="where" aria-labelledby="onde-h">
          <div className="where__grid">
            <div className="where__intro">
              <p className="where__tag" data-reveal>Onde</p>
              <h2 id="onde-h" className="display where__h" data-reveal>
                <span className="where__line"><span>Chegue</span></span>
                <span className="where__line"><span>sem pressa<b className="where__dot">.</b></span></span>
              </h2>
              <p className="where__lead" data-reveal style={idx(1)}>
                Chegue na hora e sem pressa. Dúvida de serviço, preço ou encaixe, a gente responde pelo WhatsApp.
              </p>
            </div>

            <div className="where__info" data-reveal style={idx(1)}>
              <dl className="lines">
                <div><dt>Endereço</dt><dd>{ADDRESS.street}<br />{ADDRESS.area}</dd></div>
                <div><dt>WhatsApp</dt><dd><a className="link" href={whatsappUrl(HELLO)} target="_blank" rel="noopener noreferrer">{WHATSAPP_DISPLAY}</a></dd></div>
                <div><dt>Instagram</dt><dd><a className="link" href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">{INSTAGRAM_HANDLE}</a></dd></div>
              </dl>
              <h3 className="where__sub">Horário de funcionamento</h3>
              <Hours />
            </div>
          </div>

          <div className="where__map" data-reveal>
            <div className="where__frame">
              <p className="where__fallback">O mapa não carregou. Use o link abaixo para abrir o endereço no Google Maps.</p>
              <iframe
                title={`Mapa do Google Maps: ${ADDRESS.street}, ${ADDRESS.area}`}
                src={MAPS_EMBED_URL}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
            <div className="where__mapbar">
              <p>Localização ilustrativa</p>
              <a className="where__maplink" href={MAPS_URL} target="_blank" rel="noopener noreferrer">
                <span>Abrir no Google Maps</span>
                <svg viewBox="0 0 12 12" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M2 10L10 2M4 2h6v6" /></svg>
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer on-ink">
        <div className="footer__top">
          <div className="footer__invite">
            <h2 className="display footer__h" data-reveal>
              <span className="footer__line"><span>Quem chega,</span></span>
              <span className="footer__line"><span>senta<b className="footer__dot">.</b></span></span>
            </h2>
            <a className="footer__cta" href="#agendar" data-reveal style={idx(1)}>
              <span>Agendar horário</span>
              <svg viewBox="0 0 20 12" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2"><path d="M0 6h17M12 1l5 5-5 5" /></svg>
            </a>
          </div>
          <div className="footer__nav" data-reveal style={idx(2)}>
            <nav aria-label="Seções do site">
              <p className="footer__label">Navegar</p>
              <a href="#servicos">Serviços</a>
              <a href="#cortes">Cortes</a>
              <a href="#estudio">Estúdio</a>
              <a href="#onde">Onde</a>
              <a href="#agendar">Agendar</a>
            </nav>
            <nav aria-label="Contato e créditos">
              <p className="footer__label">Contato</p>
              <a href={whatsappUrl(HELLO)} target="_blank" rel="noopener noreferrer">WhatsApp</a>
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">Instagram</a>
              <a href="/creditos">Créditos das fotografias</a>
            </nav>
          </div>
        </div>

        <p className="footer__legal">© BRUTTO Barber Studio</p>
        <div className="footer__brand" role="img" aria-label="BRUTTO Barber Studio" data-reveal>
          <LogoMark />
        </div>
      </footer>
    </>
  );
}
