import { useEffect } from "react";

export function useSectionReveal() {
  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>(
      "main .section, main .values-strip, main .approach-item, main .journey-step",
    );
    if (!("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -4% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);
}
