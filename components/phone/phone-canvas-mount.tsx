"use client";

import dynamic from "next/dynamic";

import { usePhoneSupport } from "./use-phone-support";

const PhoneCanvas = dynamic(() => import("./phone-canvas"), { ssr: false });

/**
 * Monta o canvas único só quando o aparelho suporta o 3D.
 * three.js, R3F e drei ficam num chunk separado, carregado sob demanda.
 */
export function PhoneCanvasMount() {
  const support = usePhoneSupport();
  return support === "3d" ? <PhoneCanvas /> : null;
}
