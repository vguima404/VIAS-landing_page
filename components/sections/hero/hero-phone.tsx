"use client";

import { useRef, useState } from "react";

import { PhoneSlot } from "@/components/phone";
import { gsap, useGSAP } from "@/lib/gsap";
import { ease } from "@/lib/tokens";
import { useReducedMotion } from "@/lib/use-reduced-motion";

/**
 * iPhone do Hero (palco "hero": pose e enquadramento da referência 02).
 *
 * Entrada: o poster sobe e aparece; só depois o 3D é montado. Como o poster
 * é renderizado da própria cena 3D, a troca é imperceptível, e o 3D (que é
 * desenhado num canvas acima da página, sem opacidade própria) nunca "pisca"
 * no meio da animação.
 */
export function HeroPhone({ className }: { className?: string }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [entered, setEntered] = useState(false);

  useGSAP(
    () => {
      if (reduced) return;
      gsap.fromTo(
        rootRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1.4,
          delay: 0.45,
          ease: ease.expo,
          clearProps: "transform",
          onComplete: () => setEntered(true),
        },
      );
    },
    { scope: rootRef, dependencies: [reduced] },
  );

  return (
    <div ref={rootRef} data-hero="phone" className={className}>
      <PhoneSlot stage="hero" screen="ui-01" priority hold3d={!reduced && !entered} sizes="(min-width: 1280px) 38vw, 80vw" />
    </div>
  );
}
