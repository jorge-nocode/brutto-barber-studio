import type { Metadata } from "next";
import { LegalField, LegalShell } from "../../components/Legal";
import { SITE } from "../../lib/site.config";

export const metadata: Metadata = {
  title: `Termos de Uso — ${SITE.companyName}`,
  description: "Regras de uso deste site e do pedido de agendamento.",
  robots: { index: false, follow: false },
};

export default function TermsPage() {
  const L = SITE.legal;
  return (
    <LegalShell title="Termos de Uso">
      <section>
        <h2>1. Sobre o site</h2>
        <p>
          Este site apresenta os serviços, os horários e a localização de {SITE.companyName} e permite montar uma mensagem de
          pedido de agendamento. Responsável: razão social <LegalField value={L.legalName} />, CNPJ <LegalField value={L.cnpj} />.
          Ao usar o site, você concorda com estes termos. Se não concordar, não use.
        </p>
      </section>

      <section>
        <h2>2. Pedido de agendamento</h2>
        <p>
          O formulário gera uma mensagem de WhatsApp. <b>Ele é um pedido, não uma reserva.</b> O horário só está garantido
          depois que {SITE.companyName} confirmar por mensagem. A disponibilidade não é consultada em tempo real: os horários
          exibidos são sugestões e podem não estar livres.
        </p>
      </section>

      <section>
        <h2>3. Preços, serviços e horários</h2>
        <p>
          Preços, durações e horários de funcionamento são informativos e podem mudar sem aviso. Prevalece o que for
          confirmado no atendimento.
        </p>
      </section>

      <section>
        <h2>4. Uso adequado</h2>
        <p>
          Você se compromete a usar o site de boa-fé: não tentar interferir no funcionamento, não usar o botão de WhatsApp
          para enviar mensagens ofensivas, falsas ou em massa e não se passar por outra pessoa.
        </p>
      </section>

      <section>
        <h2>5. Conteúdo e propriedade intelectual</h2>
        <p>
          Marca, textos, layout e identidade visual pertencem a {SITE.companyName} ou a quem lhe cedeu o direito de uso. As
          fotografias de terceiros seguem as licenças indicadas na página de{" "}
          <a className="link" href="/creditos">Créditos das fotografias</a>. Não é permitido copiar o site ou seu conteúdo
          sem autorização, salvo nos limites da lei e das licenças citadas.
        </p>
      </section>

      <section>
        <h2>6. Links e serviços de terceiros</h2>
        <p>
          O site contém links para WhatsApp, Instagram e Google Maps, e pode incorporar um mapa do Google, mas só depois que você clicar em “Carregar mapa”. Esses serviços têm
          termos e políticas próprios, e {SITE.companyName} não controla seu funcionamento nem sua disponibilidade.
        </p>
      </section>

      <section>
        <h2>7. Limitação de responsabilidade</h2>
        <p>
          O site é oferecido como está. Nos limites da lei, {SITE.companyName} não responde por indisponibilidade temporária,
          por falhas de serviços de terceiros ou por decisões tomadas apenas com base em informações do site que não tenham
          sido confirmadas no atendimento. Isto não afasta direitos que o Código de Defesa do Consumidor garante a você.
        </p>
      </section>

      <section>
        <h2>8. Privacidade</h2>
        <p>
          O tratamento de dados está descrito na <a className="link" href="/politica-de-privacidade">Política de Privacidade</a>.
        </p>
      </section>

      <section>
        <h2>9. Alterações, lei aplicável e foro</h2>
        <p>
          Estes termos podem ser atualizados; vale a versão publicada nesta página, com a data no topo. Aplica-se a lei
          brasileira. Foro: <LegalField value={L.forum} />, sem prejuízo do foro do domicílio do consumidor.
        </p>
      </section>
    </LegalShell>
  );
}
