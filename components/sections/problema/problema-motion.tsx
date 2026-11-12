"use client";

import { useRef, type ComponentPropsWithoutRef } from "react";

import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { duration, ease, stagger } from "@/lib/tokens";
import { useReducedMotion } from "@/lib/use-reduced-motion";

/**
 * Movimento da seção 03 · O problema (por cima do layout da referência).
 *
 * - Título por linhas (máscara + translateY) e parágrafo, ao entrar.
 * - Foto: revela com leve zoom-out; no desktop desce mais devagar (parallax).
 * - Perguntas: surgem uma a uma, da direita, como dúvidas se acumulando.
 * - Minimapa: a rota se desenha com o scroll (AccessLine) e o pin aparece.
 */
export function ProblemaMotion({ children, ...props }: ComponentPropsWithoutRef<"section">) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced) return;
      const q = gsap.utils.selector(ref);
      const show = { opacity: 1, y: 0 };

      gsap
        .timeline({
          defaults: { ease: ease.expo, duration: duration.slow },
          scrollTrigger: { trigger: ref.current, start: "top 70%", once: true },
        })
        .fromTo(q('[data-problema="photo"]'), { opacity: 0, scale: 1.08 }, { opacity: 1, scale: 1, duration: 1.6, ease: "power2.out" }, 0)
        .fromTo(q('[data-problema="line"]'), { opacity: 1, yPercent: 110 }, { yPercent: 0, stagger: stagger.base, duration: 1.1 }, 0.1)
        .fromTo(q('[data-problema="lead"]'), { opacity: 0, y: 16 }, show, 0.5)
        .fromTo(q('[data-problema="streets"]'), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1.4, ease: "power2.out" }, 0.4);

      // Perguntas, uma a uma
      gsap.fromTo(
        q('[data-problema="question"]'),
        { opacity: 0, x: 40, scale: 0.96 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: duration.base + 0.2,
          ease: ease.out,
          stagger: 0.22,
          scrollTrigger: { trigger: q('[data-problema="questions"]')[0], start: "top 80%", once: true },
        },
      );

      // Pin do minimapa
      gsap.fromTo(
        q('[data-problema="pin"]'),
        { opacity: 0, scale: 0.5 },
        {
          opacity: 1,
          scale: 1,
          transformOrigin: "50% 100%",
          duration: 0.7,
          ease: "back.out(2)",
          scrollTrigger: { trigger: ref.current, start: "60% 80%", once: true },
        },
      );

      // Parallax da foto (desktop). Deslocamento zero com a seção alinhada ao
      // topo da tela (= referência); a faixa que se abre fica sempre fora da tela
      const mm = gsap.matchMedia();
      mm.add("(min-width: 80rem)", () => {
        const section = ref.current!;
        const plane = q('[data-problema="photo-plane"]')[0] as HTMLElement;
        const setY = gsap.quickSetter(plane, "yPercent");
        ScrollTrigger.create({
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          onUpdate: () => {
            const top = section.getBoundingClientRect().top;
            // entrando: −6% → 0 (topo da seção do fim ao topo da tela);
            // saindo: 0 → +6% (seção subindo até sair)
            const y = top > 0 ? -6 * Math.min(1, top / window.innerHeight) : 6 * Math.min(1, -top / section.offsetHeight);
            setY(y);
          },
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
