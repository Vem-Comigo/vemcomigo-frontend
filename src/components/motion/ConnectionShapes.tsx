/** Cult UI SVG Shapes Animated / Squiggle Arrow adaptations.
 * MIT notice and source links: public/licenses/cult-ui.txt, docs/cult-ui-motion.md.
 * Final strokes are visible by default; CSS only adds a finite draw on entry.
 */
export function ConnectionShapes() {
  return (
    <svg className="connection-shapes" viewBox="0 0 560 500" fill="none" aria-hidden="true" focusable="false">
      <circle className="draw-line" pathLength="1" cx="278" cy="248" r="210" />
      <path className="draw-line" pathLength="1" d="M35 385 Q110 445 170 410 M425 70 Q495 100 515 165" />
      <circle cx="88" cy="335" r="12" className="connection-dot" />
      <circle cx="455" cy="130" r="8" className="connection-dot" />
    </svg>
  );
}

export function SquiggleArrow() {
  return (
    <svg className="squiggle-arrow" width="135" height="60" viewBox="-10 -10 220 120" fill="none" aria-hidden="true" focusable="false">
      <g stroke="currentColor" strokeWidth="3" strokeLinecap="round">
        <path className="draw-line" pathLength="1" d="M 15 50 Q 45 32, 65 50 Q 85 68, 105 50 Q 125 32, 145 50 Q 152 54, 158 50" />
        <path d="M 158 50 Q 149 45, 145 43 M 158 50 Q 150 56, 146 59" />
      </g>
    </svg>
  );
}
