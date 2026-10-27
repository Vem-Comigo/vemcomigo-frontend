import type { AnchorHTMLAttributes } from "react";
import { ArrowRight } from "lucide-react";

/** Native contact link. Design references: docs/cult-ui-motion.md. */
export function ContactCta({
  children,
  className = "",
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a className={`button contact-cta ${className}`} {...props}>
      <span className="contact-cta-label">{children}</span>
      <ArrowRight className="contact-cta-arrow" size={20} aria-hidden="true" />
    </a>
  );
}
