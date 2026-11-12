"use client";

import { useRef, type ComponentPropsWithoutRef } from "react";

import { gsap, useGSAP } from "@/lib/gsap";
import { duration, ease, stagger } from "@/lib/tokens";
import { useReducedMotion } from "@/lib/use-reduced-motion";

/**
 * Movimento do Hero, aplicado POR CIMA do layout estático da referência.
 *
 * Entrada (ao carregar): fundo com leve zoom-out, título por linhas
 * (máscara + translateY), textos e destaques em sequência; o iPhone entra
 * pelo HeroPhone.
 *
 * Parallax (desktop, ao rolar): o fundo desce mais devagar que a página e as
 * folhagens de primeiro plano saem para os lados; a tipografia fica estável.
 *
 * Os elementos com data-hero nascem ocultos só quando o <html> tem
 * .motion-ready (script inline no layout, ausente com movimento reduzido).
 */
export function HeroMotion({ children, ...props }: ComponentPropsWithoutRef<"section">) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      (window as unknown as { __motionStarted?: boolean }).__motionStarted = true;
      if (reduced) {
        document.documentElement.classList.remove("motion-ready");
        return;
      }

      const q = gsap.utils.selector(ref);
      const show = { opacity: 1, y: 0 };

      gsap
        .timeline({ defaults: { ease: ease.expo, duration: duration.slow } })
        .fromTo(
          q('[data-hero="city"]'),
          { opacity: 0, scale: 1.05 },
          { opacity: 1, scale: 1, duration: 1.8, ease: "power2.out", transformOrigin: "75% 60%" },
          0,
        )
        .fromTo(q('[data-hero="foliage"]'), { opacity: 0, yPercent: 8 }, { opacity: 1, yPercent: 0, duration: 1.6, ease: "power3.out" }, 0.25)
        .fromTo(q('[data-hero="eyebrow"]'), { opacity: 0, y: 10 }, show, 0.1)
        .fromTo(q('[data-hero="rule"]'), { opacity: 1, scaleX: 0 }, { scaleX: 1, transformOrigin: "left center", duration: 1.1 }, 0.35)
        .fromTo(q('[data-hero="line"]'), { opacity: 1, yPercent: 110 }, { yPercent: 0, stagger: stagger.base, duration: 1.1 }, 0.15)
        .fromTo(q('[data-hero="lead"]'), { opacity: 0, y: 16 }, show, 0.55)
        .fromTo(q('[data-hero="cta"]'), { opacity: 0, y: 16 }, { ...show, stagger: stagger.base }, 0.7)
        .fromTo(q('[data-hero="highlight"]'), { opacity: 0, y: 14 }, { ...show, stagger: stagger.base }, 0.85);

      // Parallax de profundidade só no desktop
      const mm = gsap.matchMedia();
      mm.add("(min-width: 80rem)", () => {
        const scrub = { trigger: ref.current, start: "top top", end: "bottom top", scrub: true };
        // O fundo desce mais devagar que a página (a faixa que se abre fica
        // sempre acima da viewport, então nada aparece por trás)
        gsap.to(q('[data-hero="plane"]'), { yPercent: 10, ease: "none", scrollTrigger: scrub });

        // Folhagens de primeiro plano saem ao rolar: afastam-se para os lados,
        // descem e somem (mais rápidas que o fundo, reforçando a profundidade)
        const exit = { trigger: ref.current, start: "top top", end: "65% top", scrub: 0.4 };
        gsap.to(q('[data-hero="foliage-exit-left"]'), { xPercent: -14, yPercent: 16, opacity: 0, ease: "power1.in", scrollTrigger: exit });
        gsap.to(q('[data-hero="foliage-exit-right"]'), { xPercent: 14, yPercent: 16, opacity: 0, ease: "power1.in", scrollTrigger: exit });
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
