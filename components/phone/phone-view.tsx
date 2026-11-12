"use client";

import { View } from "@react-three/drei";
import type { RefObject } from "react";

import { DEFAULT_BLEED, stages, type StageConfig, type ScreenId, type StageId } from "./phone-config";
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
  const bleed = (stages[stage] as StageConfig).bleed ?? DEFAULT_BLEED;
  const pct = (v: number) => `${-v * 100}%`;

  return (
    // A View passa do palco pela margem de cada lado (ver `bleed` na PhoneScene)
    <View
      className="absolute"
      style={{ top: pct(bleed.top), right: pct(bleed.right), bottom: pct(bleed.bottom), left: pct(bleed.left) }}
    >
      <PhoneScene bleed={bleed} stage={stage} screen={screen} motion={motion} interactive={interactive} onReady={onReady} />
    </View>
  );
}
