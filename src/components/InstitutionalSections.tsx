import {
  ArrowRight,
  BookOpen,
  Heart,
  MessageCircle,
  Users,
  Check,
  Plus,
} from "lucide-react";
import {
  approaches,
  questions,
  testimonials,
} from "../content/institutional";
import { CareJourney } from "./motion/CareJourney";
import { ContactCta } from "./motion/ContactCta";
import { SquiggleArrow } from "./motion/ConnectionShapes";
import { TextAnimate } from "./motion/TextAnimate";

const icons = {
  book: BookOpen,
  chat: MessageCircle,
  users: Users,
  heart: Heart,
};

export function Approach() {
  return (
    <section
      id="atuacao"
      className="section approach-section"
      aria-labelledby="titulo-atuacao"
    >
      <div className="container">
        <div className="section-heading">
          <div>
            <p className="eyebrow">DO DIÁLOGO À AÇÃO</p>
            <h2 id="titulo-atuacao">
              <TextAnimate text="Pequenos encontros." />
              <br />
              Novas possibilidades.
            </h2>
          </div>
          <p>
            Espaços para ouvir, participar e construir uma convivência mais
            respeitosa, todos os dias.
          </p>
        </div>
        <div className="approach-grid">
          {approaches.map((item, index) => {
            const Icon = icons[item.icon];
            return (
              <article
                className={`approach-item approach-${index}`}
                key={item.title}
              >
                <span className="approach-icon">
                  <Icon size={30} strokeWidth={1.6} aria-hidden="true" />
                </span>
                <p className="item-label">{item.label}</p>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function TeacherTraining() {
  return (
    <section
      id="formacao"
      className="section container"
      aria-labelledby="titulo-formacao"
    >
      <div className="training-panel">
        <div className="section-copy">
          <p className="eyebrow">QUEM CUIDA TAMBÉM SE PREPARA</p>
          <h2 id="titulo-formacao">
            Professores que escutam.
            <br />
            Escolas que acolhem.
          </h2>
          <p>
            A formação de professores tutores está no centro do Vem Comigo. É
            com preparo e acompanhamento que os espaços de diálogo ganham
            sentido na rotina escolar.
          </p>
          <a className="button" href="#contato">
            Converse sobre a formação{" "}
            <ArrowRight size={18} aria-hidden="true" />
          </a>
        </div>
        <div className="training-details">
          <span className="training-symbol" aria-hidden="true">
            ✳
          </span>
          <h3>Preparar para estar junto.</h3>
          <ul>
            {[
              "Mediar rodas de conversa temáticas.",
              "Facilitar a participação nas assembleias escolares.",
              "Acompanhar e orientar os estudantes das CCAs.",
              "Articular o cuidado com os adultos responsáveis.",
            ].map((text) => (
              <li key={text}>
                <Check size={19} aria-hidden="true" />
                <span>{text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function Communities() {
  return (
    <section
      id="ccas"
      className="section communities-section"
      aria-labelledby="titulo-ccas"
    >
      <div className="container">
        <div className="communities-heading">
          <p className="eyebrow">COMUNIDADES DE CUIDADO E APOIO</p>
          <h2 id="titulo-ccas">
            Uma rede de apoio.
            <br />
            Muitos jeitos de estar perto.
          </h2>
          <p>
            As CCAs são redes de apoio entre estudantes, construídas com
            confiança e acompanhadas por professores tutores.
          </p>
        </div>
        <CareJourney />
        <div className="care-responsibility">
          <p>
            <strong>Escolhidos pelos colegas. Preparados para cuidar.</strong>
            <br />
            Os integrantes são escolhidos por confiança, compromisso e
            responsabilidade, e recebem formação para participar das CCAs.
          </p>
          <p>
            <strong>Com estudantes, sempre com adultos.</strong>
            <br />
            Os professores tutores acompanham a rede. Os adultos responsáveis
            articulam o apoio e os encaminhamentos necessários. Estudantes não
            são terapeutas nem precisam resolver situações graves sozinhos.
          </p>
        </div>
      </div>
    </section>
  );
}

export function ProjectRecords() {
  if (!testimonials.length) return null;
  return (
    <section
      className="section container"
      aria-label="Registros do projeto"
    >
      {testimonials.length > 0 && (
        <>
          <h2>Relatos e transformações</h2>
          {testimonials.map((item) => (
            <figure key={item.source}>
              <blockquote>{item.quote}</blockquote>
              <figcaption>
                {item.attribution} · {item.source}
              </figcaption>
            </figure>
          ))}
        </>
      )}
    </section>
  );
}

export function SchoolInvitation() {
  return (
    <>
      <ProjectRecords />
      <section
        id="sua-escola"
        className="section container"
        aria-labelledby="titulo-escola"
      >
        <div className="invitation-panel">
          <div>
            <p className="eyebrow">VAMOS CONSTRUIR ESSE CAMINHO?</p>
            <h2 id="titulo-escola">
              O próximo diálogo pode
              <br />
              começar na sua escola.
            </h2>
            <p>
              Conte um pouco sobre sua comunidade escolar. Uma conversa é o
              primeiro passo para conhecer o contexto e verificar as
              possibilidades de participação.
            </p>
            <div className="invitation-action">
              <ContactCta href="#contato">Tenho interesse</ContactCta>
              <SquiggleArrow />
            </div>
          </div>
          <div className="invitation-art" aria-hidden="true">
            <MessageCircle />
            <Heart />
            <span>
              Vamos
              <br />
              juntos?
            </span>
          </div>
        </div>
      </section>
    </>
  );
}

export function FrequentlyAsked() {
  return (
    <section
      id="perguntas"
      className="section container faq-grid"
      aria-labelledby="titulo-perguntas"
    >
      <div>
        <p className="eyebrow">PARA ENTENDER MELHOR</p>
        <h2 id="titulo-perguntas">
          Antes de
          <br />
          começar.
        </h2>
        <p>
          Algumas respostas para
          <br />
          seguir a conversa.
        </p>
      </div>
      <div className="faq-list">
        {questions.map((item) => (
          <details key={item.question}>
            <summary>
              {item.question}
              <Plus size={20} aria-hidden="true" />
            </summary>
            <p>{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
