"use client";

import { ContactShadows, Environment, Lightformer, PerspectiveCamera } from "@react-three/drei";
import { Suspense, type RefObject } from "react";

import { colors } from "@/lib/tokens";

import { PHONE_HEIGHT, stages, type ScreenId, type StageId } from "./phone-config";
import { PhoneModel } from "./phone-model";
import type { PhoneMotion } from "./phone-store";

/**
 * Cena completa de um palco do iPhone: câmera, estúdio de luz e sombra.
 * Usada pela View no canvas único e pela geração dos posters
 * (mesmo enquadramento → o poster troca para o 3D sem salto).
 */
export function PhoneScene({
  stage = "default",
  screen,
  motion,
  interactive,
  onReady,
  bleed = 0,
}: {
  /**
   * Margem extra desenhada além do palco (fração da largura/altura em cada
   * lado), sem mudar o enquadramento: o aparelho pode girar e se mover com o
   * scroll sem ser cortado na borda do palco.
   */
  bleed?: number;
  stage?: StageId;
  screen: ScreenId;
  motion?: RefObject<PhoneMotion>;
  interactive?: boolean;
  onReady?: () => void;
}) {
  const { camera, pose } = stages[stage];

  return (
    <>
      <PerspectiveCamera
        makeDefault
        fov={camera.fov}
        position={camera.position}
        onUpdate={(cam) => {
          cam.lookAt(camera.target[0], camera.target[1], camera.target[2]);
          // A View é maior que o palco: amplia o frustum na mesma proporção
          if (bleed > 0) cam.setViewOffset(1, 1, -bleed, -bleed, 1 + 2 * bleed, 1 + 2 * bleed);
          else cam.clearViewOffset();
        }}
      />

      {/* Estúdio suave: softboxes como reflexos, sem cromado exagerado */}
      <Environment resolution={256} frames={1}>
        <Lightformer form="rect" intensity={2.4} position={[-3.5, 3, 4]} scale={[5, 7, 1]} target={[0, 0, 0]} />
        <Lightformer form="rect" intensity={0.9} position={[4.5, 0.5, 3]} scale={[3, 6, 1]} target={[0, 0, 0]} />
        <Lightformer form="rect" intensity={1.3} position={[0, 5, -3]} scale={[10, 2, 1]} target={[0, 0, 0]} />
        <Lightformer form="rect" intensity={0.35} position={[0, -4, 2]} scale={[8, 2, 1]} target={[0, 0, 0]} />
      </Environment>
      <ambientLight intensity={0.12} />

      <Suspense fallback={null}>
        <PhoneModel screen={screen} pose={pose} motion={motion} interactive={interactive} onReady={onReady} />
      </Suspense>

      <ContactShadows
        position={[0, -PHONE_HEIGHT / 2 - 0.015, 0]}
        scale={[2.4, 1.2]}
        resolution={512}
        blur={2.8}
        far={1.4}
        opacity={0.42}
        color={colors.pinho}
      />
    </>
  );
}
