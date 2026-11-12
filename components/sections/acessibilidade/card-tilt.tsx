"use client";

import { useRef, type ReactNode } from "react";

import { gsap, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/use-reduced-motion";

/**
 * Hover do cartão "Acessibilidade na rota" no mesmo espírito do iPhone 3D:
 * o cartão inclina na direção do mouse (mesmas amplitudes do aparelho,
 * POINTER_TILT: ±5,2° em Y e ±2,9° em X), com amortecimento suave, e um
 * brilho percorre a superfície acompanhando a inclinação. Ao sair, volta à
 * pose da referência.
 *
 * A pose medida na referência fica no transform base (desktop); a inclinação
 * do hover entra somada por variáveis CSS. Só em ponteiro fino, no desktop e
 * sem movimento reduzido.
 */
const TILT = { x: 2.9, y: 5.2 };

export function CardTilt({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || reduced) return;
      const mm = gsap.matchMedia();
      mm.add("(min-width: 80rem) and (pointer: fine)", () => {
        const opts = { duration: 0.7, ease: "power3.out" };
        const to = {
          rx: gsap.quickTo(el, "--tilt-x", { ...opts, unit: "deg" }),
          ry: gsap.quickTo(el, "--tilt-y", { ...opts, unit: "deg" }),
          gx: gsap.quickTo(el, "--glare-x", { ...opts, unit: "%" }),
          gy: gsap.quickTo(el, "--glare-y", { ...opts, unit: "%" }),
          go: gsap.quickTo(el, "--glare-o", opts),
        };

        const move = (e: PointerEvent) => {
          const r = el.getBoundingClientRect();
          const px = ((e.clientX - r.left) / r.width) * 2 - 1;
          const py = ((e.clientY - r.top) / r.height) * 2 - 1;
          const x = gsap.utils.clamp(-1, 1, px);
          const y = gsap.utils.clamp(-1, 1, py);
          // Lado sob o mouse se aproxima (como o aparelho seguindo o cursor)
          to.ry(x * TILT.y);
          to.rx(-y * TILT.x);
          to.gx(50 + x * 45);
          to.gy(50 + y * 45);
          to.go(1);
        };
        const leave = () => {
          to.rx(0);
          to.ry(0);
          to.gx(50);
          to.gy(50);
          to.go(0);
        };

        el.addEventListener("pointermove", move);
        el.addEventListener("pointerleave", leave);
        return () => {
          el.removeEventListener("pointermove", move);
          el.removeEventListener("pointerleave", leave);
          gsap.set(el, { "--tilt-x": "0deg", "--tilt-y": "0deg", "--glare-o": 0 });
        };
      });
    },
    { dependencies: [reduced] },
  );

  return (
    <div
      ref={ref}
      className={[
        "relative [--glare-o:0] [--glare-x:50%] [--glare-y:50%] [--tilt-x:0deg] [--tilt-y:0deg]",
        // Pose medida na referência (cantos ±6u) + inclinação do hover
        "xl:[transform:perspective(calc(var(--u)*1200))_rotateY(calc(-9.42deg+var(--tilt-y)))_rotateX(calc(1.86deg+var(--tilt-x)))_rotateZ(2.35deg)]",
      ].join(" ")}
    >
      {children}
      {/* Brilho que acompanha a inclinação (como o reflexo da tela do iPhone) */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden rounded-[calc(var(--u)*20)] bg-[radial-gradient(circle_at_var(--glare-x)_var(--glare-y),rgb(255_255_255/0.55),rgb(255_255_255/0.12)_35%,transparent_65%)] opacity-(--glare-o) mix-blend-soft-light xl:block"
      />
    </div>
  );
}
