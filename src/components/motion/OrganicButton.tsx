import type { AnchorHTMLAttributes } from "react";
import { ArrowUpRight } from "lucide-react";

/** Adapted from Cult UI Organic Button. MIT: public/licenses/cult-ui.txt.
 * Fixed geometry and reserved icon space avoid shifting surrounding content.
 * A native anchor replaces Slot/CVA; labels can wrap at high text zoom.
 */
export function OrganicButton({ children, className = "", ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a className={`button organic-button ${className}`} {...props}>
      <span className="organic-label">{children}</span>
      <span className="organic-end" aria-hidden="true">
        <svg className="organic-wall" viewBox="0 0 18 40" focusable="false">
          <path d="M7.101 40H18V0H16C13.594 0 11.4403 1.49249 10.5955 3.74532L0.546698 30.5421C-1.1694 35.1184 2.21356 40 7.101 40Z" />
        </svg>
        <ArrowUpRight size={20} />
      </span>
    </a>
  );
}
