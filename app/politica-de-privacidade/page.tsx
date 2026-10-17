import type { Metadata } from "next";
import { LegalField, LegalShell } from "../../components/Legal";
import { SITE } from "../../lib/site.config";
import { ADDRESS, INSTAGRAM_HANDLE } from "../../lib/data";

export const metadata: Metadata = {
  title: `Política de Privacidade — ${SITE.companyName}`,
  description: "Quais dados este site trata, para quê, e como falar com o responsável.",
  robots: { index: false, follow: false },
};

export default function PrivacyPage() {
  const L = SITE.legal;
  const optional = SITE.consent.optionalTechnologies;
  return (
    <LegalShell title="Política de Privacidade">
      <section>
        <h2>1. Quem é o responsável</h2>
        <p>
          O responsável pelo tratamento dos dados descritos aqui é {SITE.companyName}. Razão social: <LegalField value={L.legalName} />.
          CNPJ: <LegalField value={L.cnpj} />. Endereço do responsável: <LegalField value={L.address} />. Contato para
          assuntos de privacidade: <LegalField value={L.controllerContact} />.
        </p>
      </section>

      <section>
        <h2>2. O que este site faz com seus dados</h2>
        <p>
          O site é uma página informativa com um formulário de pedido de agendamento. Hoje ele <b>não tem cadastro, login,
          banco de dados nem servidor próprio que receba o que você digita</b>.
        </p>
        <ul>
          <li>
            <b>Formulário “Solicitação de agendamento”.</b> Serviço, dia, horário e nome (opcional) ficam apenas no seu navegador
            enquanto você preenche. Nada é enviado ao site nem armazenado por ele.
          </li>
          <li>
            <b>Mensagem pelo WhatsApp.</b> Ao clicar em “Solicitar pelo WhatsApp”, ou no botão flutuante, ou nos links de
            WhatsApp, o site abre o WhatsApp com uma mensagem pronta. A mensagem só é enviada se você apertar enviar no
            aplicativo. A partir daí, o tratamento do que você enviar (inclusive nome e número de telefone) acontece no
            WhatsApp, sob os termos e a política de privacidade do próprio serviço, e na conversa com {SITE.companyName}.
          </li>
          <li>
            <b>Mapa (só com o seu clique).</b> A seção “Onde” mostra uma prévia do endereço ({ADDRESS.street}, {ADDRESS.area}) sem
            contatar o Google. O mapa do Google Maps só é carregado se você clicar em “Carregar mapa”. A partir desse clique, o
            Google pode receber dados técnicos da sua visita, como endereço IP e informações do navegador, e pode usar
            cookies próprios, conforme a política de privacidade do Google. Se você não clicar, nada é enviado ao Google. O
            link “Abrir no Google Maps” também só leva ao Google se você clicar.
          </li>
          <li>
            <b>Instagram.</b> O link para {INSTAGRAM_HANDLE} apenas leva você ao Instagram quando você clica. O site não incorpora
            conteúdo do Instagram.
          </li>
          <li>
            <b>Registros do servidor.</b> Como em qualquer site, o provedor de hospedagem pode registrar dados técnicos de
            acesso (endereço IP, data e hora, páginas acessadas, navegador). Provedor de hospedagem: <LegalField value={L.hostingProvider} />.
          </li>
        </ul>
      </section>

      <section>
        <h2>3. Cookies e tecnologias de rastreamento</h2>
        <p>
          O site <b>não define cookies próprios, não usa armazenamento local do navegador, não usa ferramentas de análise
          (analytics) nem pixels de publicidade</b>. As fontes são servidas pelo próprio site. Por isso não há banner de
          cookies: nada opcional é carregado automaticamente. O mapa do Google só é carregado depois que você clica em
          “Carregar mapa”, e essa escolha é feita a cada visita, sem ser gravada no seu navegador.
        </p>
        {optional.length > 0 && (
          <p>Tecnologias opcionais em uso, condicionadas ao seu consentimento: {optional.join(", ")}.</p>
        )}
      </section>

      <section>
        <h2>4. Bases legais e finalidades</h2>
        <p>
          O contato por WhatsApp é iniciado por você e serve para responder dúvidas e combinar o atendimento (execução de
          procedimentos preliminares a um serviço que você pediu, Lei nº 13.709/2018, LGPD, art. 7º, V). Os dados técnicos de
          acesso são tratados para o funcionamento e a segurança do site (legítimo interesse, art. 7º, IX).{" "}
          {!L.reviewed && <mark className="legal__pending">Base legal a revisar por advogado antes da publicação.</mark>}
        </p>
      </section>

      <section>
        <h2>5. Compartilhamento e retenção</h2>
        <p>
          O site não vende nem repassa dados a terceiros para publicidade. Os terceiros que podem tratar dados em razão do uso
          do site são o WhatsApp (Meta), o Google (mapa) e o provedor de hospedagem. Conversas de WhatsApp ficam pelo tempo
          necessário ao atendimento; prazo de guarda: <LegalField value={L.retentionPeriod} />.
        </p>
      </section>

      <section>
        <h2>6. Seus direitos</h2>
        <p>
          Nos termos da LGPD, você pode pedir confirmação de tratamento, acesso, correção, anonimização, eliminação,
          portabilidade, informação sobre compartilhamento e revogação de consentimento, quando aplicável. Para exercer
          esses direitos, escreva para: <LegalField value={L.controllerContact} />. Você também pode reclamar à Autoridade
          Nacional de Proteção de Dados (ANPD).
        </p>
      </section>

      <section>
        <h2>7. Crianças e adolescentes</h2>
        <p>
          O site oferece corte infantil, mas o contato deve ser feito por um responsável. O site não coleta dados de crianças
          de forma direta.
        </p>
      </section>

      <section>
        <h2>8. Mudanças nesta política</h2>
        <p>
          Se o site passar a usar cookies, analytics, formulários com envio a servidor ou outras tecnologias, esta política
          será atualizada antes disso. A data da última revisão está no topo da página.
        </p>
      </section>
    </LegalShell>
  );
}
