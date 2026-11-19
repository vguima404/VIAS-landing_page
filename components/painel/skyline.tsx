"use client";

import Image from "next/image";
import { useRef } from "react";

import { gsap, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/use-reduced-motion";

/**
 * Skyline com a ponte estaiada no canto superior direito (referência:
 * x ~790–1672, y 0–178), com a ilustração fornecida. Some para a esquerda
 * em degradê, como na referência.
 *
 * Movimento: entra subindo de leve e, no desktop, acompanha o mouse com um
 * deslocamento sutil (parallax), sem nunca sair do enquadramento.
 */
export function Skyline() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced) return;
      const img = ref.current!.querySelector("[data-skyline]");
      gsap.fromTo(img, { opacity: 0, y: 26, scale: 1.04 }, { opacity: 1, y: 0, scale: 1, duration: 2, ease: "expo.out" });

      const mm = gsap.matchMedia();
      mm.add("(min-width: 80rem) and (pointer: fine)", () => {
        const toX = gsap.quickTo(img, "x", { duration: 1.4, ease: "power3.out" });
        const move = (e: PointerEvent) => toX((e.clientX / innerWidth - 0.5) * -14);
        addEventListener("pointermove", move);
        return () => removeEventListener("pointermove", move);
      });
    },
    { scope: ref, dependencies: [reduced] },
  );

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute top-0 right-0 h-28 opacity-35 xl:opacity-100 w-[min(100%,48rem)] overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_38%)] sm:h-40 xl:u-h-178 xl:u-w-800"
    >
      <div data-skyline className="absolute -top-[22%] -right-[1%] aspect-[2000/634] w-[102%] [.motion-ready_&]:opacity-0 xl:-u-top-25 xl:right-0 xl:u-w-740">
        <Image src="/images/painel/skyline-cabecalho.webp" alt="" fill sizes="60vw" className="object-cover opacity-90" priority />
      </div>
    </div>
  );
}
