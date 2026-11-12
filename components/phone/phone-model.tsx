"use client";

import { useGLTF, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, type RefObject } from "react";
import { Box3, Group, Mesh, SRGBColorSpace, Vector3, type Material, type Texture } from "three";

import { ease } from "@/lib/tokens";

import {
  BODY_MATERIAL,
  PHONE_HEIGHT,
  PHONE_MODEL_URL,
  POINTER_TILT,
  SCREEN_MATERIAL,
  SCREEN_TRANSITION,
  screenIds,
  screens,
  type Pose,
  type ScreenId,
} from "./phone-config";
import { phoneStore, type PhoneMotion } from "./phone-store";
import { ScreenController } from "./screen-material";

const textureUrls = Object.fromEntries(screenIds.map((id) => [id, screens[id].texture])) as Record<ScreenId, string>;

/** Amortecimento exponencial independente do frame rate */
const damp = (current: number, target: number, lambda: number, dt: number) =>
  current + (target - current) * (1 - Math.exp(-lambda * dt));

export function PhoneModel({
  screen,
  pose,
  motion,
  interactive = false,
  onReady,
}: {
  screen: ScreenId;
  /** Pose de repouso do palco */
  pose: Pose;
  /** Movimento ligado ao scroll (escrito pelo GSAP do slot) */
  motion?: RefObject<PhoneMotion>;
  /** Segue o mouse (só em ponteiros finos) */
  interactive?: boolean;
  /** Chamado depois do primeiro frame desenhado */
  onReady?: () => void;
}) {
  const { scene } = useGLTF(PHONE_MODEL_URL, false, true);

  const textures = useTexture(textureUrls, (loaded) => {
    Object.values(loaded as Record<string, Texture>).forEach((t) => {
      t.colorSpace = SRGBColorSpace;
      t.flipY = false;
      t.anisotropy = 8;
      t.needsUpdate = true;
    });
  }) as Record<ScreenId, Texture>;

  // Clone por palco: o corpo é compartilhado, a tela ganha material próprio
  const { root, controller, scale } = useMemo(() => {
    const root = scene.clone(true);
    let screenMesh: Mesh | null = null;

    root.traverse((obj) => {
      if (!(obj as Mesh).isMesh) return;
      const mesh = obj as Mesh;
      const material = mesh.material as Material;
      if (material.name === BODY_MATERIAL) {
        // O original vem em BLEND: sem depth write as lentes ficam pretas
        material.transparent = false;
        material.depthWrite = true;
      }
      if (material.name === SCREEN_MATERIAL) screenMesh = mesh;
    });

    const controller = new ScreenController(textures[screen], phoneStore.forceRender);
    if (screenMesh) (screenMesh as Mesh).material = controller.material;

    // Centraliza e normaliza a altura
    root.updateMatrixWorld(true);
    const box = new Box3().setFromObject(root);
    const size = box.getSize(new Vector3());
    root.position.sub(box.getCenter(new Vector3()));

    return { root, controller, scale: PHONE_HEIGHT / size.y };
    // A tela inicial só importa na criação; trocas passam pela transição abaixo
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scene, textures]);

  useEffect(() => () => controller.dispose(), [controller]);

  // Troca de tela com a varredura da Linha de Acesso
  useEffect(() => {
    controller.transitionTo(textures[screen], SCREEN_TRANSITION, ease.inOut);
  }, [screen, controller, textures]);

  // Pose: repouso + scroll + mouse, amortecidos
  const group = useRef<Group>(null);
  const current = useRef({ rx: pose.rx, ry: pose.ry, y: 0 });
  const readyFired = useRef(false);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    if (process.env.NODE_ENV === "development" && phoneStore.debugCamera) {
      const dc = phoneStore.debugCamera;
      const cam = state.camera as import("three").PerspectiveCamera;
      if (dc.fov) cam.fov = dc.fov;
      if (dc.position) cam.position.set(...dc.position);
      cam.lookAt(...(dc.target ?? [0, 0, 0]));
      cam.updateProjectionMatrix();
    }
    const dt = Math.min(delta, 0.05);
    const m = motion?.current;
    const p = interactive ? phoneStore.pointer : { x: 0, y: 0 };

    const base = process.env.NODE_ENV === "development" && phoneStore.debugPose ? { ...pose, ...phoneStore.debugPose } : pose;
    const target = {
      rx: base.rx + (m?.rx ?? 0) + p.y * POINTER_TILT.rx,
      ry: base.ry + (m?.ry ?? 0) + p.x * POINTER_TILT.ry,
      y: m?.y ?? 0,
    };

    const c = current.current;
    let moving = false;
    for (const key of ["rx", "ry", "y"] as const) {
      c[key] = damp(c[key], target[key], 5, dt);
      if (Math.abs(target[key] - c[key]) > 1e-4) moving = true;
    }

    // No .glb a tela aponta para −Z: meia-volta em Y para encarar a câmera
    g.rotation.set(c.rx, Math.PI + c.ry, base.rz);
    g.position.y = c.y;
    controller.setSheen(c.ry);

    if (moving) state.invalidate();

    if (!readyFired.current) {
      readyFired.current = true;
      requestAnimationFrame(() => onReady?.());
    }
  });

  return (
    <group ref={group}>
      <primitive object={root} scale={scale} />
    </group>
  );
}

useGLTF.preload(PHONE_MODEL_URL, false, true);
