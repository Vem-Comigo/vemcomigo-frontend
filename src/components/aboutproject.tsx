import { ArrowUpRight } from "lucide-react";

export function AboutProject() {
  return (
    <section
      id="projeto"
      className="section container about-grid"
      aria-labelledby="titulo-projeto"
    >
      <div className="purpose-art" aria-hidden="true">
        <div className="orbit orbit-one" />
        <div className="orbit orbit-two" />
        <span className="purpose-word">eu</span>
        <span className="purpose-plus">+</span>
        <span className="purpose-word purpose-you">você</span>
        <span className="purpose-together">a gente.</span>
        <span className="purpose-star">✳</span>
        <span className="purpose-caption">
          É assim que começa uma comunidade.
        </span>
      </div>
      <div className="section-copy">
        <p className="eyebrow">NOSSA RAZÃO DE SER</p>
        <h2 id="titulo-projeto">Conviver também se aprende.</h2>
        <p>
          Uma escola é feita de relações. E cuidar dessas relações é parte
          essencial de aprender e ensinar.
        </p>
        <p>
          O Vem Comigo nasceu da mobilização de professores após um episódio
          grave de violência entre estudantes. Da vontade de compreender e agir,
          surgiu um grupo de estudo e a construção de estratégias de cuidado.
        </p>
        <p>
          Hoje, o projeto prepara professores tutores para fortalecer o diálogo,
          a participação e o pertencimento, prevenindo e enfrentando a violência
          escolar, especialmente o bullying.
        </p>
        <a className="text-link" href="#atuacao">
          Do propósito à prática <ArrowUpRight size={18} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
