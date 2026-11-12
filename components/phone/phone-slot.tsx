"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useRef, useState, type RefObject } from "react";

import { ScrollTrigger, useGSAP } from "@/lib/gsap";

import { screens, type ScreenId } from "./phone-config";
import { createMotion, phoneStore, type PhoneMotion } from "./phone-store";
import { usePhoneSupport } from "./use-phone-support";

const PhoneView = dynamic(() => import("./phone-view"), { ssr: false });

/**
 * Palco do iPhone 3D.
 *
 * Sempre renderiza o poster (render do mesmo enquadramento, com a tela certa).
 * Com suporte a WebGL, o 3D carrega por cima e o poster sai por crossfade
 * quando o primeiro frame é desenhado. Sem suporte (ou com movimento reduzido)
 * o poster fica, e a troca de tela vira um crossfade entre posters.
 */
export function PhoneSlot({
  screen,
  posterScreens,
  motion,
  scrollTilt = true,
  priority = false,
  sizes = "(min-width: 1024px) 380px, 70vw",
  className,
}: {
  screen: ScreenId;
  /** Telas que este palco pode mostrar (posters pré-carregados para o modo estático) */
  posterScreens?: ScreenId[];
  /** Movimento externo (ex.: timeline de uma seção sticky). Se omitido, usa o próprio. */
  motion?: RefObject<PhoneMotion>;
  /** Rotação lateral suave enquanto o palco atravessa a viewport */
  scrollTilt?: boolean;
  /** Primeira dobra: poster com prioridade de carregamento */
  priority?: boolean;
  sizes?: string;
  className?: string;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const ownMotion = useRef<PhoneMotion>(createMotion());
  const motionRef = motion ?? ownMotion;
  const support = usePhoneSupport();
  const [ready, setReady] = useState(false);

  // Conta palcos visíveis: sem nenhum, o canvas não desenha
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    let visible = false;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting === visible) return;
        visible = entry.isIntersecting;
        phoneStore.slotVisible(visible);
      },
      { rootMargin: "10% 0px" },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      if (visible) phoneStore.slotVisible(false);
    };
  }, []);

  // Rotação lateral e flutuação ligadas ao scroll (só no 3D)
  useGSAP(
    () => {
      if (support !== "3d" || !scrollTilt || motion) return;
      const m = ownMotion.current;
      ScrollTrigger.create({
        trigger: rootRef.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const t = self.progress - 0.5; // -0.5 → 0.5
          m.ry = t * 0.22;
          m.rx = -t * 0.06;
          m.y = -t * 0.12;
          phoneStore.requestRender();
        },
      });
    },
    { dependencies: [support, scrollTilt], scope: rootRef },
  );

  const list = posterScreens ?? [screen];
  const showPoster = support !== "3d" || !ready;

  return (
    <div ref={rootRef} className={`relative aspect-[3/5] ${className ?? ""}`}>
      {list.map((id) => {
        const current = id === screen;
        return (
          <Image
            key={id}
            src={screens[id].poster}
            alt={current ? screens[id].alt : ""}
            aria-hidden={current ? undefined : true}
            width={900}
            height={1500}
            sizes={sizes}
            priority={priority && current}
            className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-700 ease-out-power3 ${
              current && showPoster ? "opacity-100" : "opacity-0"
            }`}
          />
        );
      })}

      {support === "3d" && <PhoneView screen={screen} motion={motionRef} onReady={() => setReady(true)} />}
    </div>
  );
}
