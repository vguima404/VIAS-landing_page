"use client";

import { useRef, type ComponentPropsWithoutRef } from "react";

import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { ease } from "@/lib/tokens";
import { useReducedMotion } from "@/lib/use-reduced-motion";

const VIDEO_SRC = "/videos/06-camadas.mp4";

/**
 * Movimento da seção 06 · Inteligência e integração.
 *
 * - Entrada: rótulo, título por linhas e parágrafo.
 * - Desktop (xl): momento sticky. O vídeo das camadas (1,5×, todos os
 *   quadros-chave) avança e recua com o scroll; perto do fim, quando as
 *   placas se empilham, os fios saem dos nós e os cartões 01 → 04 entram.
 *   O último quadro é a composição da referência.
 *
 * O vídeo é baixado inteiro (blob) quando a seção se aproxima, para que a
 * busca de quadros não dependa da rede durante o scroll. Até ele carregar,
 * fica visível a imagem do último quadro. Abaixo de xl e com movimento
 * reduzido: só a imagem, sem pin.
 */
export function InteligenciaMotion({ children, ...props }: ComponentPropsWithoutRef<"section">) {
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
          scrollTrigger: { trigger: section, start: "top 60%", toggleActions: "play none none reverse" },
        })
        .fromTo(q('[data-intel="label"]'), { opacity: 0, x: -24 }, { opacity: 1, x: 0, duration: 1 }, 0)
        .fromTo(q('[data-intel="line"]'), { opacity: 1, yPercent: 115 }, { yPercent: 0, stagger: 0.12 }, 0.1)
        .fromTo(q('[data-intel="lead"]'), { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1.1 }, 0.45);

      const mm = gsap.matchMedia();

      // Abaixo de xl: cartões entram em sequência
      mm.add("(max-width: 79.999rem)", () => {
        gsap.fromTo(
          q('[data-intel="card"]'),
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.9,
            ease: ease.expo,
            scrollTrigger: { trigger: q('[data-intel="card"]')[0], start: "top 90%", toggleActions: "play none none reverse" },
          },
        );
      });

      mm.add("(min-width: 80rem)", () => {
        const video = q('[data-intel="video"]')[0] as HTMLVideoElement;
        const cards = q('[data-intel="card"]');
        const wires = q('[data-intel="wire"]');
        const nodes = q('[data-intel="node"]');
        let objectUrl: string | null = null;
        let ready = false;
        const state = { t: 0 };

        // Busca do quadro: no máximo uma em andamento; a última pedida vence
        let pending: number | null = null;
        const seek = (t: number) => {
          if (!ready) return;
          if (video.seeking) {
            pending = t;
            return;
          }
          if (Math.abs(video.currentTime - t) > 0.001) video.currentTime = t;
        };
        const onSeeked = () => {
          if (pending !== null) {
            const t = pending;
            pending = null;
            seek(t);
          }
        };
        video.addEventListener("seeked", onSeeked);

        // Baixa o vídeo inteiro quando a seção está a ~1,5 tela de distância
        let aborted = false;
        const load = () => {
          if (objectUrl || aborted) return;
          objectUrl = "pending";
          fetch(VIDEO_SRC)
            .then((r) => r.blob())
            .then((blob) => {
              if (aborted) return;
              objectUrl = URL.createObjectURL(blob);
              video.src = objectUrl;
              video.addEventListener(
                "loadeddata",
                () => {
                  ready = true;
                  seek(state.t * video.duration);
                  gsap.to(video, { opacity: 1, duration: 0.4 });
                },
                { once: true },
              );
              video.load();
            })
            .catch(() => {
              objectUrl = null;
            });
        };
        ScrollTrigger.create({ trigger: section, start: "top bottom+=150%", onEnter: load, onEnterBack: load });

        // Momento sticky: vídeo + cartões
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=170%",
            pin: true,
            scrub: 0.5,
            anticipatePin: 1,
          },
        });

        tl.to(state, {
          t: 1,
          duration: 10,
          onUpdate: () => {
            if (ready) seek(state.t * (video.duration - 0.01));
          },
        });

        // Cartões: quando as placas se empilham (últimos ~30% do vídeo)
        layersIn(tl, wires, nodes, cards);
        tl.to({}, { duration: 1.2 }); // respiro no estado final (= referência)

        ScrollTrigger.sort();
        ScrollTrigger.refresh();

        return () => {
          aborted = true;
          video.removeEventListener("seeked", onSeeked);
          if (objectUrl && objectUrl !== "pending") URL.revokeObjectURL(objectUrl);
          video.removeAttribute("src");
          video.load();
          gsap.set(video, { opacity: 0 });
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

function layersIn(tl: gsap.core.Timeline, wires: Element[], nodes: Element[], cards: Element[]) {
  cards.forEach((card, i) => {
    const at = 6.6 + i * 0.75;
    tl.fromTo(nodes[i], { scale: 0 }, { scale: 1, duration: 0.35, ease: "back.out(2.5)" }, at)
      .fromTo(wires[i], { scaleX: 0 }, { scaleX: 1, duration: 0.5, ease: "power2.out" }, at + 0.15)
      .fromTo(card, { opacity: 0, x: 40 }, { opacity: 1, x: 0, duration: 0.8, ease: ease.expo }, at + 0.35);
  });
}
