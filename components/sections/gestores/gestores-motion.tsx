"use client";

import { useRef, type ComponentPropsWithoutRef } from "react";

import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { ease } from "@/lib/tokens";
import { useReducedMotion } from "@/lib/use-reduced-motion";

import { DEST, PINS } from "./map-fx";

/**
 * Movimento da seção 07 · Para gestores (por cima do layout da referência).
 *
 * 1. Texto: rótulo com o fio se estendendo, título por linhas, parágrafo e o
 *    destaque com o pin caindo; os fios dos painéis se desenham.
 * 2. Território (desktop): o destino acende e isócronas se espalham pelo mapa;
 *    as unidades de saúde acendem da mais próxima à mais distante; um pulso
 *    de luz percorre a rota até o destino e as linhas do canto inferior.
 * 3. Painéis: entram em sequência saindo da profundidade (inclinação, desfoque
 *    e escala); a barra de cobertura se preenche faixa a faixa, a legenda
 *    aparece e a linha de tendência se desenha com os pontos.
 * 4. Depois, em ciclo discreto e só com a seção na tela: uma isócrona, um
 *    pulso de rota, algumas unidades e o ponto final do gráfico.
 * 5. Parallax: painéis em profundidades diferentes (território fixo, para não
 *    sair do quadro da referência).
 *
 * Com movimento reduzido: tudo estático no estado final (= referência).
 */
export function GestoresMotion({ children, ...props }: ComponentPropsWithoutRef<"section">) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced) return;
      const q = gsap.utils.selector(ref);
      const section = ref.current!;

      // 1 · Texto
      gsap
        .timeline({
          defaults: { ease: ease.expo, duration: 1.2 },
          scrollTrigger: { trigger: section, start: "top 65%", toggleActions: "play none none reverse" },
        })
        .fromTo(q('[data-ges="label"]'), { opacity: 0, x: -24 }, { opacity: 1, x: 0, duration: 1 }, 0)
        .fromTo(q('[data-ges="label-rule"]'), { scaleX: 0 }, { scaleX: 1, transformOrigin: "left center", duration: 1.4, ease: "power3.inOut" }, 0.25)
        .fromTo(q('[data-ges="line"]'), { opacity: 1, yPercent: 115 }, { yPercent: 0, stagger: 0.12 }, 0.1)
        .fromTo(q('[data-ges="lead"]'), { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1.1 }, 0.45)
        .fromTo(q('[data-ges="pill"]'), { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1 }, 0.7)
        .fromTo(q('[data-ges="pill-pin"]'), { y: -26, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: "bounce.out" }, 0.9)
        .fromTo(q('[data-ges="wire"]'), { strokeDashoffset: 1 }, { strokeDashoffset: 0, autoRound: false, duration: 1.1, ease: "power2.inOut" }, 1.1);

      // 3 · Painéis
      const panels = q('[data-ges="panel"]');
      gsap
        .timeline({
          defaults: { ease: ease.expo },
          scrollTrigger: { trigger: section, start: "top 50%", toggleActions: "play none none reverse" },
        })
        .fromTo(
          panels,
          { opacity: 0, y: 70, rotateX: 16, scale: 0.94, filter: "blur(8px)", transformPerspective: 900, transformOrigin: "50% 100%" },
          { opacity: 1, y: 0, rotateX: 0, scale: 1, filter: "blur(0px)", duration: 1.3, stagger: 0.2, clearProps: "filter" },
          0,
        )
        .fromTo(q('[data-ges="seg"]'), { scaleX: 0, transformOrigin: "left center" }, { scaleX: 1, duration: 0.55, stagger: 0.09, ease: "power3.out" }, 0.45)
        .fromTo(q('[data-ges="legend-item"]'), { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 }, 0.8)
        .fromTo(q('[data-ges="spark"]'), { strokeDashoffset: 1 }, { strokeDashoffset: 0, autoRound: false, duration: 1.4, ease: "power2.inOut" }, 0.6)
        .fromTo(q('[data-ges="spark-fill"]'), { opacity: 0 }, { opacity: 1, duration: 0.9 }, 1.3)
        .fromTo(q('[data-ges="spark-dot"]'), { scale: 0, transformOrigin: "50% 50%" }, { scale: 1, duration: 0.45, stagger: 0.14, ease: "back.out(2.5)" }, 0.8);

      const mm = gsap.matchMedia();
      mm.add("(min-width: 80rem)", () => {
        // 2 · Território
        const iso = q('[data-ges="iso"]');
        const comets = q('[data-ges="comet"]');
        const pulses = q('[data-ges="pin-pulse"]');
        const order = PINS.map((p, i) => ({ i, d: Math.hypot(p[0] - DEST.x, (p[1] - DEST.y) * 1.9) })).sort((a, b) => a.d - b.d);
        const maxD = order[order.length - 1].d;

        const ring = (el: Element, strength = 1) =>
          gsap.fromTo(el, { attr: { rx: 6, ry: 3 }, opacity: 0.9 * strength }, { attr: { rx: 560, ry: 290 }, opacity: 0, duration: 2.6, ease: "power1.out" });
        const comet = (el: Element, d = 1.8) =>
          gsap
            .timeline()
            .set(el, { opacity: 1 })
            .fromTo(el, { strokeDashoffset: Number(el.getAttribute("stroke-dashoffset")) }, { strokeDashoffset: 0, autoRound: false, duration: d, ease: "power1.inOut" })
            .to(el, { opacity: 0, duration: 0.3 }, ">-0.3");
        const ping = (el: Element) => gsap.fromTo(el, { attr: { r: 5 }, opacity: 0.95 }, { attr: { r: 24 }, opacity: 0, duration: 1.2, ease: "power2.out" });

        const intro = gsap
          .timeline({ paused: true })
          .fromTo(q('[data-ges="halo"]'), { opacity: 0, attr: { rx: 40, ry: 20 } }, { opacity: 1, attr: { rx: 150, ry: 80 }, duration: 1.2, ease: "power2.out" }, 0);
        iso.forEach((el, i) => intro.add(ring(el), 0.1 + i * 0.32));
        order.forEach(({ i, d }) => intro.add(ping(pulses[i]), 0.25 + (d / maxD) * 1.6));
        intro.add(comet(comets[0], 1.8), 0.5).add(comet(comets[1], 2.2), 0.3);

        // 4 · Ciclo discreto
        const loop = gsap.timeline({ paused: true, repeat: -1, repeatDelay: 0.6 });
        loop.add(ring(iso[0], 0.6), 0).add(comet(comets[0], 2), 0.8);
        [3, 9, 14].forEach((k, j) => loop.add(ping(pulses[k]), 1.2 + j * 0.7));
        loop.add(comet(comets[1], 2.4), 2.4);
        loop.add(gsap.fromTo(q('[data-ges="spark-ping"]'), { attr: { r: 3.6 }, opacity: 0.8 }, { attr: { r: 11 }, opacity: 0, duration: 1.2, ease: "power2.out" }), 1.5);
        loop.to({}, { duration: 1 });

        let introDone = false;
        intro.eventCallback("onComplete", () => {
          introDone = true;
          loop.restart();
        });
        ScrollTrigger.create({
          trigger: section,
          start: "top 50%",
          onEnter: () => (introDone ? loop.play() : intro.restart()),
          onLeaveBack: () => {
            intro.pause(0);
            loop.pause(0);
            introDone = false;
          },
        });
        // Só anima o ciclo com a seção na tela
        ScrollTrigger.create({
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          onToggle: (self) => {
            if (!introDone) return;
            if (self.isActive) loop.play();
            else loop.pause();
          },
        });

        // 5 · Parallax dos painéis (zero com a seção alinhada ao topo = referência)
        q('[data-ges="panel"] > *').forEach((p) => {
          const depth = Number((p.parentElement as HTMLElement).dataset.depth ?? 1);
          gsap.fromTo(p, { y: () => 40 * depth }, { y: () => -40 * depth, ease: "none", scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: true } });
        });

        return () => {
          intro.kill();
          loop.kill();
        };
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
