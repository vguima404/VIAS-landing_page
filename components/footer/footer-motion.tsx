"use client";

import { useRef, type ComponentPropsWithoutRef } from "react";

import { gsap, useGSAP } from "@/lib/gsap";
import { ease } from "@/lib/tokens";
import { useReducedMotion } from "@/lib/use-reduced-motion";

/**
 * Movimento do footer: o conteúdo entra em sequência (marca, links, fio que
 * se estende da esquerda, textos finos) e o "VIAS" gigante sobe da borda
 * inferior acompanhando o scroll, como assinatura final.
 *
 * Com movimento reduzido: tudo no estado final (= referência).
 */
export function FooterMotion({ children, ...props }: ComponentPropsWithoutRef<"footer">) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced) return;
      const q = gsap.utils.selector(ref);
      const footer = ref.current!;

      gsap
        .timeline({
          defaults: { ease: ease.expo, duration: 1 },
          scrollTrigger: { trigger: footer, start: "top 95%", toggleActions: "play none none reverse" },
        })
        .fromTo(q('[data-footer="brand"]'), { opacity: 0, y: 18 }, { opacity: 1, y: 0 }, 0)
        .fromTo(q('[data-footer="link"]'), { opacity: 0, y: 14 }, { opacity: 1, y: 0, stagger: 0.06, duration: 0.8 }, 0.1)
        .fromTo(q('[data-footer="rule"]'), { opacity: 1, scaleX: 0, transformOrigin: "0% 50%" }, { scaleX: 1, duration: 1.3 }, 0.2)
        .fromTo(q('[data-footer="fine"]'), { opacity: 0 }, { opacity: 1, duration: 0.8, stagger: 0.1 }, 0.55);

      // "VIAS" sobe da borda inferior até a posição final no fim da página
      gsap.fromTo(
        q('[data-footer="mark"]'),
        { opacity: 1, yPercent: 60 },
        {
          yPercent: 0,
          ease: "none",
          scrollTrigger: { trigger: footer, start: "top bottom", end: "bottom bottom", scrub: 0.6 },
        },
      );
    },
    { scope: ref, dependencies: [reduced] },
  );

  return (
    <footer ref={ref} {...props}>
      {children}
    </footer>
  );
}
