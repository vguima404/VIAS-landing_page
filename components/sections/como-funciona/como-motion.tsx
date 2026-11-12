"use client";

import { useRef, type ComponentPropsWithoutRef } from "react";

import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { duration, ease } from "@/lib/tokens";
import { useReducedMotion } from "@/lib/use-reduced-motion";

import { useComoStep } from "./como-step";

/**
 * Movimento da seção 04 · Como funciona (por cima do layout da referência).
 *
 * Entrada: título por linhas e parágrafo, como nas seções anteriores.
 *
 * Desktop (xl): momento sticky curto. A seção fica presa enquanto a linha se
 * desenha de nó em nó; cada nó acende a sua etapa (numeral, rótulo, frase e
 * cartão) e o iPhone troca de tela: UI-01 → UI-02 → prévia do percurso.
 * No fim, o quadro é exatamente o da referência.
 *
 * Abaixo de xl e com movimento reduzido: sem pin, tudo no estado final.
 */
export function ComoMotion({ children, ...props }: ComponentPropsWithoutRef<"section">) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { setStep } = useComoStep();

  useGSAP(
    () => {
      if (reduced) return;
      const q = gsap.utils.selector(ref);
      const section = ref.current!;

      // Entrada do título e do parágrafo
      gsap
        .timeline({
          defaults: { ease: ease.expo, duration: 1.2 },
          scrollTrigger: { trigger: section, start: "top 60%", toggleActions: "play none none reverse" },
        })
        .fromTo(q('[data-como="line"]'), { opacity: 1, yPercent: 115 }, { yPercent: 0, stagger: 0.12 }, 0)
        .fromTo(q('[data-como="lead"]'), { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1.1 }, 0.35);

      const mm = gsap.matchMedia();

      mm.add("(min-width: 80rem)", () => {
        const step = (i: number) => [
          ...q(`[data-como="numeral-${i}"]`),
          ...q(`[data-como="title-${i}"]`),
          ...q(`[data-como="text-${i}"]`),
        ];
        const rule = (i: number) => q(`[data-como="rule-${i}"]`);
        const nodes = q('[data-como="node"]');
        const card = (i: number) => q(`[data-como="visual-${i}"] > *`);
        const draw = (sel: string) => q(`[data-como="${sel}"]`);
        const DIM = 0.22;
        // As linhas usam pathLength=1: o dashoffset vai de 1 a 0 em frações.
        // autoRound: false impede o GSAP de arredondar o valor (em px) para
        // 0 ou 1, o que fazia a linha aparecer inteira de uma vez

        // Etapa 01 entra com a seção (antes do pin)
        gsap
          .timeline({
            defaults: { ease: ease.expo, duration: duration.slow * 1.3 },
            scrollTrigger: { trigger: section, start: "top 45%", toggleActions: "play none none reverse" },
          })
          .fromTo(step(0), { opacity: 0, y: 30 }, { opacity: 1, y: 0, stagger: 0.08 }, 0)
          .fromTo(rule(0), { scaleX: 0 }, { scaleX: 1, transformOrigin: "left center" }, 0.2)
          .fromTo(card(0), { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 1.3 }, 0.25);

        // Momento sticky: a linha une as três etapas
        let current = 0;
        setStep(0);
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=160%",
            pin: true,
            scrub: 0.6,
            anticipatePin: 1,
          },
          onUpdate: () => {
            const t = tl.time();
            const next = t < 2.9 ? 0 : t < 5.3 ? 1 : 2;
            if (next !== current) {
              current = next;
              setStep(next);
            }
          },
        });

        tl.fromTo(draw("line-a1"), { strokeDashoffset: 1 }, { strokeDashoffset: 0, autoRound: false, duration: 1.2 }, 0)
          .fromTo(nodes[0], { scale: 0 }, { scale: 1, duration: 0.4, ease: "back.out(2.5)" }, 1.15)
          .fromTo(draw("line-a2"), { strokeDashoffset: 1 }, { strokeDashoffset: 0, autoRound: false, duration: 1.6 }, 1.4)
          .fromTo(nodes[1], { scale: 0 }, { scale: 1, duration: 0.4, ease: "back.out(2.5)" }, 2.95)
          // Etapa 02 acende
          .fromTo(step(1), { opacity: DIM }, { opacity: 1, duration: 0.6, ease: "power2.out" }, 2.8)
          .fromTo(rule(1), { scaleX: 0 }, { scaleX: 1, transformOrigin: "left center", duration: 0.6, ease: "power2.out" }, 2.9)
          .fromTo(card(1), { opacity: 0, y: 70 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out" }, 2.7)
          .fromTo(draw("line-b"), { strokeDashoffset: 1 }, { strokeDashoffset: 0, autoRound: false, duration: 1.6 }, 3.8)
          .fromTo(draw("line-b-glow"), { strokeDashoffset: 1 }, { strokeDashoffset: 0, autoRound: false, duration: 1.6 }, 3.8)
          .fromTo(nodes[2], { scale: 0 }, { scale: 1, duration: 0.4, ease: "back.out(2.5)" }, 5.35)
          // Etapa 03 acende
          .fromTo(step(2), { opacity: DIM }, { opacity: 1, duration: 0.6, ease: "power2.out" }, 5.2)
          .fromTo(rule(2), { scaleX: 0 }, { scaleX: 1, transformOrigin: "left center", duration: 0.6, ease: "power2.out" }, 5.3)
          // Respiro no estado final (= referência) antes de soltar
          .to({}, { duration: 1 });

        // Gatilhos criados antes (navbar, linha de progresso) precisam contar o
        // espaço do pin: reordena por posição e recalcula
        ScrollTrigger.sort();
        ScrollTrigger.refresh();

        return () => setStep(2);
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
