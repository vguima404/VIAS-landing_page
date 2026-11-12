"use client";

import { View } from "@react-three/drei";
import type { RefObject } from "react";

import type { ScreenId } from "./phone-config";
import { PhoneScene } from "./phone-scene";
import type { PhoneMotion } from "./phone-store";

/**
 * Parte 3D de um palco: uma <View> que ocupa o retângulo do slot e é
 * desenhada pelo canvas único (<PhoneCanvas>). Carregada só no cliente.
 */
export default function PhoneView({
  screen,
  motion,
  onReady,
}: {
  screen: ScreenId;
  motion?: RefObject<PhoneMotion>;
  onReady?: () => void;
}) {
  const interactive = window.matchMedia("(pointer: fine)").matches;

  return (
    <View className="absolute inset-0">
      <PhoneScene screen={screen} motion={motion} interactive={interactive} onReady={onReady} />
    </View>
  );
}
