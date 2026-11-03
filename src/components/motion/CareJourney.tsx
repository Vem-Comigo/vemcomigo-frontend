import { useEffect, useRef, useState } from "react";
import { Heart, MessageCircle, Users } from "lucide-react";

const steps = [
  { verb: "Acolher", text: "Fazer o colega se sentir parte. Criar um espaço de respeito, presença e pertencimento.", icon: Heart, note: "Você faz parte.", cue: "Um lugar para pertencer" },
  { verb: "Escutar", text: "Estar disponível para ouvir as dificuldades dos colegas com atenção e cuidado.", icon: MessageCircle, note: "Sua voz importa.", cue: "Tempo e presença para ouvir" },
  { verb: "Ajudar", text: "Comunicar situações aos professores tutores e aproximar o colega da rede de apoio.", icon: Users, note: "Estamos juntos.", cue: "Uma rede para caminhar junto" },
];

// Time constant of the scroll follower; smaller values track input more closely.
const SCROLL_SMOOTHING_MS = 65;

/** Native scroll adaptation of Cult UI Feature Sticky Section.
 * MIT: public/licenses/cult-ui.txt. Content stays in the document flow.
 */
export function CareJourney() {
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const aside = element.querySelector<HTMLElement>(".journey-aside")!;
    const art = element.querySelector<HTMLElement>(".journey-art")!;
    const panels = [...element.querySelectorAll<HTMLElement>(".journey-step")];
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const animations: Animation[] = [];
    // Paused native animations interpolate compatible CSS geometry, not SVG paths.
    const animate = (target: Element, frames: Keyframe[]) => {
      const animation = target.animate(frames, { duration: 1000, fill: "both" });
      animation.pause();
      animations.push(animation);
    };
    animate(art, [
      { backgroundColor: "#e1d2ef", borderRadius: "40% 40% 8% 8%", easing: "ease-in-out" },
      { backgroundColor: "#f8df83", borderRadius: "8% 45% 8% 45%", easing: "ease-in-out" },
      { backgroundColor: "#f3d5c4", borderRadius: "45% 8% 45% 8%" },
    ]);
    element.querySelectorAll(".journey-symbol").forEach((symbol, index) => {
      animate(symbol, steps.map((_, step) => ({
        transform: step === index ? "scale(1.1) rotate(7deg)" : "scale(.75) rotate(-12deg)",
        backgroundColor: step === index ? "#66388c" : "#fffcf7",
        color: step === index ? "#ffffff" : "#66388c",
        easing: "ease-in-out",
      })));
    });
    element.querySelectorAll(".journey-note, .journey-counter").forEach((note, index) => {
      const stepIndex = index % steps.length;
      // Fade out before the next sentence fades in, so text never overlaps.
      const visibility = [
        [[0, 1], [.18, 1], [.25, 0], [1, 0]],
        [[0, 0], [.25, 0], [.32, 1], [.68, 1], [.75, 0], [1, 0]],
        [[0, 0], [.75, 0], [.82, 1], [1, 1]],
      ][stepIndex];
      animate(note, visibility.map(([offset, opacity]) => ({ offset, opacity })));
    });

    let frame = 0;
    let measureFrame = 0;
    let start = 0;
    let distance = 1;
    let progress = 0;
    let previousTime = 0;
    let currentStep = 0;
    let enabled = false;
    const clamp = (value: number) => Math.max(0, Math.min(1, value));
    const render = () => {
      animations.forEach(animation => { animation.currentTime = progress * 1000; });
      const nextStep = Math.round(progress * (steps.length - 1));
      // React only updates at a step boundary, never on every scroll frame.
      if (nextStep !== currentStep) {
        currentStep = nextStep;
        setActive(nextStep);
      }
    };
    const tick = (time: number) => {
      frame = 0;
      const target = enabled ? clamp((window.scrollY - start) / distance) : 0;
      const delta = previousTime ? Math.min(time - previousTime, 64) : 16;
      previousTime = time;
      progress += (target - progress) * (1 - Math.exp(-delta / SCROLL_SMOOTHING_MS));
      if (Math.abs(target - progress) < 0.0001) progress = target;
      render();
      if (progress !== target) frame = requestAnimationFrame(tick);
      else previousTime = 0;
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(tick);
    };
    const measure = () => {
      measureFrame = 0;
      // Clear fallback before measuring natural sizes (zoom/text can grow the aside).
      delete element.dataset.static;
      const top = parseFloat(getComputedStyle(aside).top) || 0;
      const asideHeight = aside.getBoundingClientRect().height;
      enabled = !reduced.matches && window.innerHeight >= 560 && asideHeight + top + 32 < window.innerHeight;
      element.dataset.static = String(!enabled);
      const rect = element.getBoundingClientRect();
      start = rect.top + window.scrollY - top;
      distance = Math.max(1, rect.height - asideHeight);
      progress = enabled ? clamp((window.scrollY - start) / distance) : 0;
      render();
      schedule();
    };
    const scheduleMeasure = () => {
      if (!measureFrame) measureFrame = requestAnimationFrame(measure);
    };
    const observer = new ResizeObserver(scheduleMeasure);
    observer.observe(element);
    observer.observe(aside);
    if (element.parentElement) observer.observe(element.parentElement);
    panels.forEach(panel => observer.observe(panel));
    const header = document.querySelector("header");
    if (header) observer.observe(header);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", scheduleMeasure);
    reduced.addEventListener("change", scheduleMeasure);
    measure();
    return () => {
      cancelAnimationFrame(frame);
      cancelAnimationFrame(measureFrame);
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", scheduleMeasure);
      reduced.removeEventListener("change", scheduleMeasure);
      animations.forEach(animation => animation.cancel());
      delete element.dataset.static;
    };
  }, []);
  return (
    <div className="care-journey" ref={root}>
      <div className="journey-aside">
        <div className="journey-art" aria-hidden="true">
          <svg className="journey-orbits" viewBox="0 0 400 320" fill="none" focusable="false">
            <ellipse cx="200" cy="160" rx="170" ry="110" />
            <ellipse cx="200" cy="160" rx="110" ry="145" transform="rotate(45 200 160)" />
          </svg>
          <div className="journey-symbols">
            {steps.map(({ icon: Icon, verb }, index) => <span key={verb} className={`journey-symbol ${active === index ? "is-current" : ""}`}><Icon size={42} strokeWidth={1.5} /></span>)}
          </div>
          <div className="journey-notes">{steps.map(({ verb, note }) => <span className="journey-note" key={verb}>{note}</span>)}</div>
          <div className="journey-counters">{steps.map(({ verb }, index) => <span className="journey-counter" key={verb}>0{index + 1} / 03</span>)}</div>
        </div>
        <nav className="journey-nav" aria-label="Etapas do cuidado">
          {steps.map(({ verb }, index) => <a key={verb} href={`#cuidado-${index}`} aria-current={active === index ? "step" : undefined}><span aria-hidden="true">0{index + 1}</span>{verb}</a>)}
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
