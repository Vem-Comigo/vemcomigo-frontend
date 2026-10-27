import type { CSSProperties } from "react";

/** Cult UI Text Animate, adapted to words and the portal's native CSS motion.
 * Source and MIT notice: docs/cult-ui-motion.md / public/licenses/cult-ui.txt.
 * The complete text remains one accessible phrase; visual words are decorative.
 */
export function TextAnimate({ text }: { text: string }) {
  return (
    <span className="text-animate">
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {text.split(" ").map((word, index) => (
          <span key={`${index}-${word}`} className="animated-word" style={{ "--word": Math.min(index, 9) } as CSSProperties}>
            {word}{" "}
          </span>
        ))}
      </span>
    </span>
  );
}
