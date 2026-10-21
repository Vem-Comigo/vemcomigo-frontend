import { ArrowRight, ArrowDown, Heart } from "lucide-react";
import { CommunityArt } from "./CommunityArt";

export default function Hero() {
  return (
    <section className="hero" id="inicio" aria-labelledby="titulo-principal">
      <div className="container hero-grid">
        <div className="hero-copy enter">
          <p className="eyebrow">
            <span className="little-sun" /> JUNTOS PELA CONVIVÊNCIA ESCOLAR
          </p>
          <h1 id="titulo-principal">Uma escola melhor começa com escuta.</h1>
          <p className="hero-description">
            Formamos professores e fortalecemos redes de cuidado para
            transformar a convivência na escola.
          </p>
          <div className="actions">
            <a className="button" href="#contato">
              Leve para sua escola <ArrowRight size={18} aria-hidden="true" />
            </a>
            <a className="text-link" href="#projeto">
              Conheça o projeto <ArrowDown size={17} aria-hidden="true" />
            </a>
          </div>
          <p className="hero-note">
            <Heart size={16} aria-hidden="true" /> Mais diálogo. Mais
            pertencimento. Mais cuidado.
          </p>
        </div>
        <div className="hero-visual enter">
          <span className="art-note">
            Toda voz merece
            <br />
            um lugar.
          </span>
          <CommunityArt />
          <span className="art-caption">
            <span className="caption-dot" /> O cuidado se constrói em conjunto.
          </span>
        </div>
      </div>
      <div className="values-strip" role="group" aria-label="Princípios do projeto">
        <span>Escutar</span>
        <span aria-hidden="true">✳</span>
        <span>Acolher</span>
        <span aria-hidden="true">✳</span>
        <span>Dialogar</span>
        <span aria-hidden="true">✳</span>
        <span>Pertencer</span>
        <span aria-hidden="true">✳</span>
        <span>Cuidar</span>
      </div>
    </section>
  );
}
