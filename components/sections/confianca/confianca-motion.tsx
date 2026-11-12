"use client";

import { useRef, type ComponentPropsWithoutRef } from "react";

import { gsap, useGSAP } from "@/lib/gsap";
import { ease } from "@/lib/tokens";
import { useReducedMotion } from "@/lib/use-reduced-motion";

/**
 * Movimento da seção 08 · Confiança e privacidade.
 *
 * - Foto: leve fade com zoom-out; título por linhas e parágrafo.
 * - Cartão: sobe e assenta; os itens aparecem em ordem (fonte, aviso,
 *   localização).
 * - Desktop: com o scroll, os três fios se desenham um a um, do item do cartão
 *   até a anotação; o nó acende e a anotação entra em seguida (prompt: "as
 *   linhas das anotações são desenhadas no scroll, uma a uma").
 * - Abaixo de xl: anotações entram em sequência, sem fios.
 *
 * Com movimento reduzido: tudo no estado final (= referência).
 */
export function ConfiancaMotion({ children, ...props }: ComponentPropsWithoutRef<"section">) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced) return;
      const q = gsap.utils.selector(ref);
      const section = ref.current!;

      gsap
        .timeline({
          defaults: { ease: ease.expo, duration: 1.2 },
          scrollTrigger: { trigger: section, start: "top 65%", toggleActions: "play none none reverse" },
        })
        .fromTo(q('[data-trust="photo"]'), { opacity: 0, scale: 1.04 }, { opacity: 1, scale: 1, duration: 1.6, ease: "power2.out" }, 0)
        .fromTo(q('[data-trust="line"]'), { opacity: 1, yPercent: 115 }, { yPercent: 0, stagger: 0.11 }, 0.15)
        .fromTo(q('[data-trust="lead"]'), { opacity: 0, y: 36 }, { opacity: 1, y: 0, duration: 1.1 }, 0.55);

      // Cartão e seus itens
      gsap
        .timeline({
          defaults: { ease: ease.expo },
          scrollTrigger: { trigger: section, start: "top 50%", toggleActions: "play none none reverse" },
        })
        .fromTo(q('[data-trust="card"]'), { opacity: 0, y: 70, rotate: 1.5 }, { opacity: 1, y: 0, rotate: 0, duration: 1.3 }, 0)
        .fromTo(q('[data-trust="row"]'), { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.18 }, 0.4);

      const mm = gsap.matchMedia();

      mm.add("(max-width: 79.999rem)", () => {
        gsap.fromTo(
          q('[data-trust="note"]'),
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.12,
            duration: 0.9,
            ease: ease.expo,
            scrollTrigger: { trigger: q('[data-trust="note"]')[0], start: "top 90%", toggleActions: "play none none reverse" },
          },
        );
      });

      // Desktop: fios desenhados pelo scroll, um a um
      mm.add("(min-width: 80rem)", () => {
        const wires = q('[data-trust="wire"]');
        const nodes = q('[data-trust="node"]');
        const notes = q('[data-trust="note"]');
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: { trigger: section, start: "top 62%", end: "top 8%", scrub: 0.6 },
        });
        wires.forEach((w, i) => {
          const at = i * 1.1;
          tl.fromTo(nodes[i], { scale: 0 }, { scale: 1, duration: 0.25, ease: "back.out(2.5)" }, at)
            .fromTo(w, { strokeDashoffset: 1 }, { strokeDashoffset: 0, autoRound: false, duration: 0.6 }, at + 0.15)
            .fromTo(notes[i], { opacity: 0, x: 24 }, { opacity: 1, x: 0, duration: 0.45, ease: "power2.out" }, at + 0.6);
        });
      });
    },
    { scope: ref, dependencies: [reduced] },
  );

  return (
    <section ref={ref} {...props}>
      {children}
    </section>
  );
}
