"use client";

import { useRef, type ComponentPropsWithoutRef } from "react";

import { gsap, useGSAP } from "@/lib/gsap";
import { ease } from "@/lib/tokens";
import { useReducedMotion } from "@/lib/use-reduced-motion";

/**
 * Movimento da seção 09 · CTA final.
 *
 * - Foto: leve fade com zoom-out; título por linhas e parágrafo.
 * - Desktop: a Linha de Acesso nasce do nó central e se bifurca até os dois
 *   botões (prompt: "a linha se desenha da origem e se bifurca até os dois
 *   botões"); cada botão acende quando a linha chega nele, e a legenda vem
 *   em seguida.
 * - Abaixo de xl: botões e legendas entram em sequência, sem a linha.
 *
 * Com movimento reduzido: tudo no estado final (= referência).
 */
export function CtaMotion({ children, ...props }: ComponentPropsWithoutRef<"section">) {
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
          scrollTrigger: { trigger: section, start: "top 70%", toggleActions: "play none none reverse" },
        })
        .fromTo(q('[data-cta="photo"]'), { opacity: 0, scale: 1.04 }, { opacity: 1, scale: 1, duration: 1.6, ease: "power2.out" }, 0)
        .fromTo(q('[data-cta="line"]'), { opacity: 1, yPercent: 115 }, { yPercent: 0, stagger: 0.11 }, 0.15)
        .fromTo(q('[data-cta="lead"]'), { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1.1 }, 0.5);

      const mm = gsap.matchMedia();

      mm.add("(max-width: 79.999rem)", () => {
        gsap.fromTo(
          q('[data-cta="button"], [data-cta="caption"]'),
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.9,
            ease: ease.expo,
            scrollTrigger: { trigger: q('[data-cta="button"]')[0], start: "top 92%", toggleActions: "play none none reverse" },
          },
        );
      });

      // Desktop: origem → bifurcação → botões
      mm.add("(min-width: 80rem)", () => {
        const [left, right] = q('[data-cta="branch"]');
        const buttons = q('[data-cta="button"]');
        const captions = q('[data-cta="caption"]');
        gsap
          .timeline({
            defaults: { ease: ease.expo },
            scrollTrigger: { trigger: section, start: "top 45%", toggleActions: "play none none reverse" },
          })
          .fromTo(q('[data-cta="node"]'), { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(2.6)" }, 0)
          .fromTo([left, right], { strokeDashoffset: 1 }, { strokeDashoffset: 0, autoRound: false, duration: 1.1, ease: "power2.inOut" }, 0.25)
          .fromTo(buttons, { opacity: 0, y: 14, scale: 0.94 }, { opacity: 1, y: 0, scale: 1, duration: 0.9, stagger: 0.08 }, 1.05)
          .fromTo(captions, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.08 }, 1.3);
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
