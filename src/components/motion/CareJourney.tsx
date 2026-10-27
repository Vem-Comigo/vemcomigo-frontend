import { useEffect, useRef, useState } from "react";
import { Heart, MessageCircle, Users } from "lucide-react";

const steps = [
  { verb: "Acolher", text: "Fazer o colega se sentir parte. Criar um espaço de respeito, presença e pertencimento.", icon: Heart, note: "Você faz parte.", cue: "Um lugar para pertencer" },
  { verb: "Escutar", text: "Estar disponível para ouvir as dificuldades dos colegas com atenção e cuidado.", icon: MessageCircle, note: "Sua voz importa.", cue: "Tempo e presença para ouvir" },
  { verb: "Ajudar", text: "Comunicar situações aos professores tutores e aproximar o colega da rede de apoio.", icon: Users, note: "Estamos juntos.", cue: "Uma rede para caminhar junto" },
];

/** Cult UI Feature Sticky Section adapted to native anchors and React state.
 * No Next Image, Slot or controllable-state dependency. All panels stay readable.
 * MIT: public/licenses/cult-ui.txt. Only the illustration sticks on tall desktops.
 */
export function CareJourney() {
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const ratios = new Map<number, number>();
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) ratios.set(Number((entry.target as HTMLElement).dataset.index), entry.intersectionRatio);
      const best = [...ratios].filter(([, ratio]) => ratio > 0).sort((a, b) => b[1] - a[1])[0];
      if (best) setActive(best[0]);
    }, { rootMargin: "-25% 0px -25% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] });
    root.current?.querySelectorAll(".journey-step").forEach((panel) => observer.observe(panel));
    return () => observer.disconnect();
  }, []);
  return (
    <div className="care-journey" ref={root}>
      <div className="journey-aside">
        <div className={`journey-art journey-art-${active}`} aria-hidden="true">
          <svg className="journey-orbits" viewBox="0 0 400 320" fill="none" focusable="false">
            <ellipse cx="200" cy="160" rx="170" ry="110" />
            <ellipse cx="200" cy="160" rx="110" ry="145" transform="rotate(45 200 160)" />
          </svg>
          <div className="journey-symbols">
            {steps.map(({ icon: Icon, verb }, index) => <span key={verb} className={`journey-symbol ${active === index ? "is-current" : ""}`}><Icon size={42} strokeWidth={1.5} /></span>)}
          </div>
          <span className="journey-note" key={active}>{steps[active].note}</span>
          <span className="journey-counter">0{active + 1} / 03</span>
        </div>
        <nav className="journey-nav" aria-label="Etapas do cuidado">
          {steps.map(({ verb }, index) => <a key={verb} href={`#cuidado-${index}`} aria-current={active === index ? "step" : undefined} onClick={() => setActive(index)}><span aria-hidden="true">0{index + 1}</span>{verb}</a>)}
        </nav>
      </div>
      <div className="journey-panels">
        {steps.map(({ verb, text, icon: Icon, cue }, index) => (
          <article className={`journey-step journey-step-${index} ${active === index ? "is-current" : ""}`} id={`cuidado-${index}`} data-index={index} key={verb}>
            <span className="journey-step-number" aria-hidden="true">0{index + 1}</span>
            <span className="care-shape"><Icon size={36} strokeWidth={1.5} aria-hidden="true" /></span>
            <p className="eyebrow">{cue}</p>
            <h3>{verb}.</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
