"use client";

import { useRef, type ComponentPropsWithoutRef } from "react";

import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { duration, ease } from "@/lib/tokens";
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

      // Entrada principal: dispara com a seção já à vista (topo a 55% da tela),
      // para o movimento ser percebido; reverte ao voltar e repete ao descer
      gsap
        .timeline({
          defaults: { ease: ease.expo, duration: duration.slow },
          scrollTrigger: { trigger: ref.current, start: "top 55%", toggleActions: "play none none reverse" },
        })
        // Foto: efeito sutil, só um leve fade com zoom-out discreto
        .fromTo(q('[data-problema="photo"]'), { opacity: 0, scale: 1.03 }, { opacity: 1, scale: 1, duration: 1.4, ease: "power2.out" }, 0)
        .fromTo(q('[data-problema="line"]'), { opacity: 1, yPercent: 115 }, { yPercent: 0, stagger: 0.12, duration: 1.2 }, 0.15)
        .fromTo(q('[data-problema="lead"]'), { opacity: 0, y: 48 }, { ...show, duration: 1.1 }, 0.6)
        .fromTo(q('[data-problema="streets"]'), { opacity: 0, y: 70 }, { opacity: 1, y: 0, duration: 1.6, ease: "power3.out" }, 0.5);

      // Perguntas, uma a uma, entrando pela direita quando as próprias pílulas
      // chegam à tela (o gatilho é a 1ª pílula: a <ul> começa no topo da seção).
      // Ao voltar para cima, saem; ao descer de novo, entram outra vez.
      const questions = q('[data-problema="question"]');
      gsap.fromTo(
        questions,
        { opacity: 0, x: 240, scale: 0.85, rotate: 4 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          rotate: 0,
          duration: 1.2,
          ease: ease.expo,
          stagger: 0.18,
          scrollTrigger: { trigger: questions[0], start: "top 88%", toggleActions: "play none none reverse" },
        },
      );

      // Pin do minimapa
      gsap.fromTo(
        q('[data-problema="pin"]'),
        { opacity: 0, y: -90, scale: 0.6 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          transformOrigin: "50% 100%",
          duration: 1,
          ease: "bounce.out",
          scrollTrigger: { trigger: ref.current, start: "top 30%", toggleActions: "play none none reverse" },
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
