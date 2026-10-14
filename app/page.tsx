import Image from "next/image";
import Hero from "../components/Hero";
import Booking from "../components/Booking";
import Services from "../components/Services";
import Manifesto from "../components/Manifesto";
import Cuts from "../components/Cuts";
import Reveal from "../components/Reveal";
import Preloader from "../components/Preloader";
import Wordmark from "../components/Wordmark";
import { ADDRESS, INSTAGRAM_HANDLE, INSTAGRAM_URL, WHATSAPP_DISPLAY, whatsappUrl } from "../lib/data";

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
        <section id="estudio" className="studio on-paper" aria-label="O estúdio">
          <div className="wrap">
            <div className="grid12">
              <dl className="studio__facts" data-reveal>
                <div><dt>Onde</dt><dd>{ADDRESS.street}<br />{ADDRESS.area}</dd></div>
                <div><dt>Agenda</dt><dd>Hora marcada, de segunda a sábado</dd></div>
                <div><dt>Contato</dt><dd><a className="link" href={whatsappUrl(HELLO)} target="_blank" rel="noopener noreferrer" style={{ whiteSpace: "nowrap" }}>{WHATSAPP_DISPLAY}</a></dd></div>
              </dl>
              <div className="studio__text">
                <p className="studio__lead" data-reveal>
                  <Image src="/photos/razor-brush.jpg" alt="Navalha de cabo claro sobre a tigela de louça, ao lado do pincel de barbear" width={400} height={400} sizes="120px" style={{ objectPosition: "38% 45%" }} />
                  <b>O BRUTTO nasceu de uma ideia simples:</b> barbearia boa acerta a linha na primeira passada. Três
                  cadeiras, agenda fechada por hora.
                </p>
                <p className="studio__more" data-reveal style={idx(1)}>
                  Ninguém espera de pé. O nome vem do italiano e quer dizer bruto, áspero, sem verniz. O trabalho é o contrário disso: medida,
                  simetria e acabamento limpo, do degradê à nuca.
                </p>
              </div>

            <ul className="chairs" data-reveal>
              <li><b>Janela</b><span>Cadeira da janela</span><span className="chair__who">Corte e degradê</span></li>
              <li><b>Meio</b><span>Cadeira do meio</span><span className="chair__who">Barba e navalha</span></li>
              <li><b>Fundo</b><span>Cadeira do fundo</span><span className="chair__who">Risco, sobrancelha e acabamento</span></li>
            </ul>
            </div>

            <div className="grid12 studio__seats">
              <figure data-shutter>
                <Image src="/photos/chairs-row.jpg" alt="Fileira de cadeiras de barbeiro antigas, de couro preto e braços brancos, entre postes listrados" width={1920} height={1440} sizes="(min-width: 900px) 62vw, 100vw" />
              </figure>
              <figure data-shutter>
                <Image src="/photos/red-chairs.jpg" alt="Cadeira de barbeiro de couro vermelho num salão de madeira" width={1920} height={1280} sizes="(min-width: 900px) 28vw, 70vw" style={{ aspectRatio: "3 / 4", objectFit: "cover", objectPosition: "82% 50%" }} />
              </figure>
            </div>
          </div>
        </section>

        {/* Agendar */}
        <section id="agendar" className="book on-ink" aria-labelledby="agendar-h">
          <div className="wrap">
            <div className="grid12">
              <div className="book__intro">
                <h2 id="agendar-h" className="display section-head" data-reveal>
                  <span>Sua vez</span>
                  <span>na cadeira</span>
                </h2>
                <p data-reveal style={idx(1)}>
                  Escolha o serviço, o dia e o horário. A mensagem sai pronta no WhatsApp.
                </p>
                <small data-reveal style={idx(2)}>Domingo fechado. Sábado até 18h.</small>
              </div>
              <Booking />
            </div>
          </div>
        </section>

        {/* Onde */}
        <section id="onde" className="where on-paper" aria-labelledby="onde-h">
          <div className="wrap">
            <h2 id="onde-h" className="sr-only">Endereço, horário e contato</h2>
            <div className="grid12 where__row">
              <p className="where__lead" data-reveal>
                Chegue na hora e sem pressa. Dúvida de serviço, preço ou encaixe, a gente responde pelo WhatsApp.
              </p>
              <div className="where__photo" data-shutter>
                <Image src="/photos/razors-set.jpg" alt="Estojo antigo aberto com várias navalhas de cabo de marfim" width={600} height={600} sizes="160px" style={{ objectPosition: "62% 50%" }} />
              </div>
              <div className="where__links" data-reveal style={idx(1)}>
                <p>Fale com a gente</p>
                <p><a className="link" href={whatsappUrl(HELLO)} target="_blank" rel="noopener noreferrer">WhatsApp {WHATSAPP_DISPLAY}</a></p>
                <p><a className="link" href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">Instagram {INSTAGRAM_HANDLE}</a></p>
                <p>{ADDRESS.street}<br />{ADDRESS.area}</p>
              </div>
            </div>

            <div className="hours" data-reveal>
              <h3>Horário de funcionamento</h3>
              <dl>
                <div><dt>Segunda a sexta</dt><dd>9h às 20h</dd></div>
                <div><dt>Sábado</dt><dd>9h às 18h</dd></div>
                <div><dt>Domingo</dt><dd>Fechado</dd></div>
              </dl>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer on-ink">
        <div className="footer__top">
          <div className="footer__invite" data-reveal>
            <h2 className="display">
              <span>Quem chega,</span>
              <span>senta.</span>
            </h2>
            <a className="button" href="#agendar">Agendar horário</a>
          </div>
          <nav className="footer__links" aria-label="Contato" data-reveal style={idx(1)}>
            <a className="link" href={whatsappUrl(HELLO)} target="_blank" rel="noopener noreferrer">WhatsApp</a>
            <a className="link" href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">Instagram</a>
            <a className="link" href="#onde">Como chegar</a>
          </nav>
        </div>

        <div className="footer__legal">
          <p>© BRUTTO Barber Studio</p>
          <p className="footer__credits">
            <a className="link" href="/creditos">Créditos das fotografias</a>
          </p>
        </div>
        <div className="display footer__mark" aria-hidden="true">Brutto</div>
      </footer>
    </>
  );
}
