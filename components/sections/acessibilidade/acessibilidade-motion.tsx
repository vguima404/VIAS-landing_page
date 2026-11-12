"use client";

import { useRef, type ComponentPropsWithoutRef } from "react";

import { gsap, useGSAP } from "@/lib/gsap";
import { duration, ease } from "@/lib/tokens";
import { useReducedMotion } from "@/lib/use-reduced-motion";

/**
 * Movimento da seção 05 · Acessibilidade (por cima do layout da referência).
 *
 * - Foto: leve fade com zoom-out; título por linhas; parágrafo.
 * - Lista: o trilho desce, o nó lima acende e os itens entram um a um.
 * - Cartão: sobe e assenta; os estados aparecem em sequência (ícone, texto,
 *   cor), terminando no alerta "em análise", e então o botão.
 * - Rota do mapa: desenha-se com o scroll até o destino e o pin cai no nó.
 *
 * Com movimento reduzido: tudo no estado final (= referência).
 */
export function AcessibilidadeMotion({ children, ...props }: ComponentPropsWithoutRef<"section">) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced) return;
      const q = gsap.utils.selector(ref);
      const section = ref.current!;

      gsap
        .timeline({
          defaults: { ease: ease.expo, duration: duration.slow },
          scrollTrigger: { trigger: section, start: "top 60%", toggleActions: "play none none reverse" },
        })
        .fromTo(q('[data-acess="photo"]'), { opacity: 0, scale: 1.03 }, { opacity: 1, scale: 1, duration: 1.4, ease: "power2.out" }, 0)
        .fromTo(q('[data-acess="line"]'), { opacity: 1, yPercent: 115 }, { yPercent: 0, stagger: 0.1, duration: 1.2 }, 0.1)
        .fromTo(q('[data-acess="lead"]'), { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1.1 }, 0.5);

      // Lista: trilho, nó e itens
      const features = q('[data-acess="feature"]');
      gsap
        .timeline({
          defaults: { ease: ease.expo },
          scrollTrigger: { trigger: features[0], start: "top 90%", toggleActions: "play none none reverse" },
        })
        .fromTo(q('[data-acess="rail"]'), { opacity: 1, scaleY: 0 }, { scaleY: 1, duration: 1.2, ease: "power2.inOut" }, 0)
        .fromTo(q('[data-acess="rail-node"]'), { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(2.5)" }, 0.25)
        .fromTo(features, { opacity: 0, x: -24 }, { opacity: 1, x: 0, duration: 0.9, stagger: 0.12 }, 0.2);

      // Cartão e estados
      const card = q('[data-acess="card"]');
      gsap
        .timeline({
          defaults: { ease: ease.expo },
          scrollTrigger: { trigger: section, start: "top 40%", toggleActions: "play none none reverse" },
        })
        .fromTo(card, { opacity: 0, y: 80 }, { opacity: 1, y: 0, duration: 1.3 }, 0)
        .fromTo(q('[data-acess="card-item"]'), { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.22 }, 0.45)
        .fromTo(q('[data-acess="card-button"]'), { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.7 }, 1.35);

      // Rota do minimapa (desktop): desenha com o scroll; o pin cai no destino.
      // pathLength=1: autoRound desligado para o traço acompanhar o scroll
      const mm = gsap.matchMedia();
      mm.add("(min-width: 80rem)", () => {
        gsap
          .timeline({
            defaults: { ease: "none" },
            scrollTrigger: { trigger: section, start: "top 55%", end: "top top", scrub: 0.6 },
          })
          .fromTo(q('[data-acess="route-node"]')[0], { scale: 0 }, { scale: 1, duration: 0.15, ease: "back.out(2.5)" }, 0)
          .fromTo(q('[data-acess="route-0"]'), { strokeDashoffset: 1 }, { strokeDashoffset: 0, autoRound: false, duration: 0.6 }, 0.1)
          .fromTo(q('[data-acess="route-node"]')[1], { scale: 0 }, { scale: 1, duration: 0.12, ease: "back.out(2.5)" }, 0.68)
          .fromTo(q('[data-acess="pin"]'), { opacity: 0, y: -60, scale: 0.6 }, { opacity: 1, y: 0, scale: 1, duration: 0.2, ease: "power2.out" }, 0.7)
          .fromTo(q('[data-acess="route-1"]'), { strokeDashoffset: 1 }, { strokeDashoffset: 0, autoRound: false, duration: 0.2 }, 0.8);
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
