"use client";

import { useSyncExternalStore } from "react";

import { REDUCED_MOTION_QUERY } from "@/lib/use-reduced-motion";

/**
 * "3d"      → carrega o iPhone em WebGL
 * "static"  → só o poster (movimento reduzido, sem WebGL2, economia de dados,
 *              aparelho fraco)
 * "pending" → servidor / antes de hidratar: poster
 */
export type PhoneSupport = "3d" | "static" | "pending";

let cached: PhoneSupport | null = null;

function hasWebGL2() {
  try {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl2");
    if (!gl) return false;
    gl.getExtension("WEBGL_lose_context")?.loseContext();
    return true;
  } catch {
    return false;
  }
}

function detect(): PhoneSupport {
  if (window.matchMedia(REDUCED_MOTION_QUERY).matches) return "static";

  const nav = navigator as Navigator & {
    deviceMemory?: number;
    connection?: { saveData?: boolean };
  };
  if (nav.connection?.saveData) return "static";
  if ((nav.deviceMemory ?? 8) <= 2) return "static";

  const coarse = window.matchMedia("(pointer: coarse)").matches;
  if (coarse && (nav.hardwareConcurrency ?? 8) <= 4) return "static";

  if (cached === null) cached = hasWebGL2() ? "3d" : "static";
  return cached;
}

function subscribe(onChange: () => void) {
  const mql = window.matchMedia(REDUCED_MOTION_QUERY);
  mql.addEventListener("change", onChange);
  return () => mql.removeEventListener("change", onChange);
}

export function usePhoneSupport(): PhoneSupport {
  return useSyncExternalStore(subscribe, detect, () => "pending");
}
