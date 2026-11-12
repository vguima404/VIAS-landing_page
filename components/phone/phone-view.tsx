"use client";

import { View } from "@react-three/drei";
import type { RefObject } from "react";

import type { ScreenId, StageId } from "./phone-config";
import { PhoneScene } from "./phone-scene";
import type { PhoneMotion } from "./phone-store";

/**
 * Parte 3D de um palco: uma <View> que ocupa o retângulo do slot e é
 * desenhada pelo canvas único (<PhoneCanvas>). Carregada só no cliente.
 */
export default function PhoneView({
  stage,
  screen,
  motion,
  onReady,
}: {
  stage: StageId;
  screen: ScreenId;
  motion?: RefObject<PhoneMotion>;
  onReady?: () => void;
}) {
  const interactive = window.matchMedia("(pointer: fine)").matches;

  return (
    // A View passa 15% de cada lado do palco (ver `bleed` na PhoneScene)
    <View className="absolute -inset-[15%]">
      <PhoneScene bleed={0.15} stage={stage} screen={screen} motion={motion} interactive={interactive} onReady={onReady} />
    </View>
  );
}
