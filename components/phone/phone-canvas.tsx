"use client";

import { View } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import { useEffect } from "react";
import { NeutralToneMapping } from "three";

import { phoneStore } from "./phone-store";

/**
 * Canvas WebGL único da página (spec §7A, solução da Etapa 0).
 *
 * Fixo sobre a viewport, transparente e sem eventos de ponteiro. Cada palco
 * (<PhoneSlot>) registra uma <View> que desenha o iPhone exatamente sobre o
 * seu retângulo no DOM. Um só contexto WebGL, o .glb carregado uma vez.
 *
 * frameloop "demand": só desenha quando algo muda (scroll, mouse, animação)
 * e nenhum frame é pedido enquanto nenhum palco está visível.
 */
export default function PhoneCanvas() {
  const coarse = typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;

  return (
    <Canvas
      aria-hidden="true"
      frameloop="demand"
      dpr={[1, coarse ? 1.5 : 1.75]}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      style={{ position: "fixed", inset: 0, width: "100%", height: "100dvh", pointerEvents: "none", zIndex: 40 }}
      onCreated={({ gl }) => {
        gl.toneMapping = NeutralToneMapping;
        gl.setClearColor(0x000000, 0);
      }}
    >
      <View.Port />
      <RenderTriggers />
    </Canvas>
  );
}

/** Liga scroll, resize e mouse ao pedido de novos frames */
function RenderTriggers() {
  const invalidate = useThree((s) => s.invalidate);

  useEffect(() => {
    phoneStore.setInvalidate(invalidate);
    const fine = window.matchMedia("(pointer: fine)").matches;

    const onScroll = () => phoneStore.requestRender();
    const onResize = () => invalidate();
    const onPointer = (e: PointerEvent) => {
      phoneStore.pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      phoneStore.pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
      phoneStore.requestRender();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    if (fine) window.addEventListener("pointermove", onPointer, { passive: true });
    invalidate();

    return () => {
      phoneStore.setInvalidate(null);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointer);
    };
  }, [invalidate]);

  return null;
}
