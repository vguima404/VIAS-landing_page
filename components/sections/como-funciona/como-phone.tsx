"use client";

import { PhoneSlot, type ScreenId } from "@/components/phone";

import { useComoStep } from "./como-step";

/** Tela do iPhone em cada etapa: UI-01 → UI-02 → prévia do percurso */
const SCREENS: ScreenId[] = ["ui-01", "ui-02", "ui-03-previa"];

/**
 * iPhone de "Como funciona".
 * Desktop: palco "como" (pose e enquadramento da referência 04, cortado pela
 * borda inferior da seção). Abaixo de xl: palco padrão, aparelho inteiro.
 */
export function ComoPhone() {
  const { step } = useComoStep();
  const screen = SCREENS[step];

  return (
    <>
      <div data-como="phone" className="absolute hidden u-top-500 u-left-1100 u-w-572 xl:block">
        <PhoneSlot stage="como" screen={screen} posterScreens={SCREENS} scrollTilt={false} sizes="(min-width: 1280px) 35vw, 1px" />
      </div>
      <div className="mx-auto w-60 sm:w-72 xl:hidden">
        <PhoneSlot screen="ui-03-previa" sizes="(min-width: 640px) 288px, 240px" />
      </div>
    </>
  );
}
