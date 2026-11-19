"use client";

import { useRef, type ReactNode } from "react";

import { gsap, useGSAP } from "@/lib/gsap";
import { ease } from "@/lib/tokens";
import { useReducedMotion } from "@/lib/use-reduced-motion";

/**
 * Entrada das páginas do painel (ao abrir e ao trocar de página):
 * título palavra a palavra, selo, subtítulo e traço; cartões em cascata;
 * números contando do zero; anel e rosca se desenhando; grade do gráfico
 * se estendendo e barras subindo da base, uma a uma.
 *
 * Marcadores (data-pm): title-word, badge, sub, accent, card, icon, info,
 * ring, grid, bar, bar-value, hbar, slice, legend, warn, row, note, clip,
 * pin-drop (e data-map no mapa); data-count nos
 * números. Com movimento reduzido: tudo já no estado final.
 */
export function PainelMotion({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      (window as unknown as { __motionStarted?: boolean }).__motionStarted = true;
      if (reduced) return;
      const q = gsap.utils.selector(ref);
      const tl = gsap.timeline({ defaults: { ease: ease.expo, duration: 1 } });

      // Cabeçalho
      tl.fromTo(q('[data-pm="title-word"]'), { opacity: 1, yPercent: 110 }, { yPercent: 0, stagger: 0.07, duration: 1.1 }, 0.1)
        .fromTo(q('[data-pm="badge"]'), { opacity: 0, scale: 0.7, x: -10 }, { opacity: 1, scale: 1, x: 0, ease: "back.out(2)", duration: 0.8 }, 0.45)
        .fromTo(q('[data-pm="sub"]'), { opacity: 0, y: 12 }, { opacity: 1, y: 0 }, 0.3)
        .fromTo(q('[data-pm="accent"]'), { opacity: 1, scaleX: 0, transformOrigin: "0% 50%" }, { scaleX: 1, duration: 1.2 }, 0.5);

      // Cartões em cascata
      tl.fromTo(
        q('[data-pm="card"]'),
        { opacity: 0, y: 28, scale: 0.985 },
        { opacity: 1, y: 0, scale: 1, stagger: 0.08, duration: 1.1, clearProps: "transform" },
        0.35,
      )
        .fromTo(q('[data-pm="info"]'), { opacity: 0, y: -8 }, { opacity: 1, y: 0, duration: 0.8 }, 0.8)
        .fromTo(q('[data-pm="icon"]'), { scale: 0.4, rotate: -12 }, { scale: 1, rotate: 0, ease: "back.out(2.4)", duration: 0.9, stagger: 0.08 }, 0.55)
        .fromTo(q('[data-pm="warn"]'), { scale: 0.3, rotate: -20 }, { scale: 1, rotate: 0, ease: "back.out(3)", duration: 0.9 }, 1.05)
        .fromTo(q('[data-pm="row"]'), { opacity: 0, x: -14 }, { opacity: 1, x: 0, stagger: 0.04, duration: 0.8 }, 0.9);

      // Números contando do zero
      q("[data-count]").forEach((el, i) => {
        const end = Number(el.getAttribute("data-count"));
        const counter = { v: 0 };
        el.textContent = "0";
        tl.to(
          counter,
          {
            v: end,
            duration: 1.6,
            ease: "power3.out",
            onUpdate: () => {
              el.textContent = Math.round(counter.v).toLocaleString("pt-BR");
            },
          },
          0.55 + Math.min(i, 6) * 0.05,
        );
      });

      // Anel do SUS: desenha até a porcentagem
      q('[data-pm="ring"]').forEach((el) => {
        const share = Number(el.getAttribute("data-ring"));
        tl.fromTo(el, { strokeDasharray: "0 100" }, { strokeDasharray: `${share - 0.8} 100`, duration: 1.6, ease: "power3.inOut" }, 0.6);
      });

      // Gráfico de barras
      tl.fromTo(q('[data-pm="grid"]'), { scaleX: 0 }, { scaleX: 1, stagger: 0.04, duration: 1.2 }, 0.75)
        .fromTo(q('[data-pm="bar"]'), { scaleY: 0 }, { scaleY: 1, stagger: 0.1, duration: 1.3, ease: "power4.out" }, 0.95)
        .fromTo(q('[data-pm="bar-value"]'), { opacity: 0, y: 10 }, { opacity: 1, y: 0, stagger: 0.1, duration: 0.8 }, 1.2)
        .fromTo(q('[data-pm="hbar"]'), { scaleX: 0 }, { scaleX: 1, stagger: 0.08, duration: 1.3, ease: "power4.out" }, 1);

      // Rosca: cada fatia se desenha a partir do seu início
      q('[data-pm="slice"]').forEach((el, i) => {
        const share = Number(el.getAttribute("data-share"));
        tl.fromTo(el, { strokeDasharray: "0 100" }, { strokeDasharray: `${share} 100`, duration: 1.3, ease: "power3.inOut" }, 0.85 + i * 0.55);
      });
      // Serviços e bairros: aviso, prancheta, mapa e pin
      tl.fromTo(q('[data-pm="note"]'), { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 1 }, 1.1)
        .fromTo(q('[data-pm="clip"]'), { opacity: 0, scale: 0.8, rotate: -6 }, { opacity: 1, scale: 1, rotate: 0, ease: "back.out(1.8)", duration: 1.1 }, 0.9)
        .fromTo(q('[data-map="shape"]'), { opacity: 0, scale: 0.85, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 1.2 }, 0.9)
        .fromTo(q('[data-map="lines"] path'), { drawSVG: "0%" }, { drawSVG: "100%", duration: 1.4, stagger: 0.05, ease: "power2.inOut" }, 1.1)
        .fromTo(q('[data-pm="pin-drop"]'), { opacity: 0, y: -40 }, { opacity: 1, y: 0, ease: "bounce.out", duration: 1.1 }, 1.5);
      gsap.to(q('[data-clip="lens"]'), { rotate: 7, svgOrigin: "80 104", duration: 2.4, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 2 });

      tl.fromTo(q('[data-pm="legend"]'), { opacity: 0, x: 12 }, { opacity: 1, x: 0, stagger: 0.12, duration: 0.8 }, 1.3);
    },
    { scope: ref, dependencies: [reduced] },
  );

  return (
    <div ref={ref} className="pb-10 xl:contents">
      {children}
    </div>
  );
}
