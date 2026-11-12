"use client";

import { useRef, useState } from "react";

import { PhoneSlot, type ScreenId } from "@/components/phone";
import { ScrollTrigger, useGSAP } from "@/lib/gsap";

const steps: { screen: ScreenId; label: string }[] = [
  { screen: "ui-01", label: "01 Necessidade" },
  { screen: "ui-02", label: "02 Unidade" },
  { screen: "ui-03", label: "03 Percurso" },
];

/**
 * Demonstração provisória (Etapa 3): a tela do iPhone troca
 * UI-01 → UI-02 → UI-03 conforme o scroll atravessa a seção.
 * A Etapa 5 substitui por um momento sticky com as três etapas.
 */
export function PhoneStepsDemo() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      ScrollTrigger.create({
        trigger: rootRef.current,
        start: "top 70%",
        end: "bottom 30%",
        onUpdate: (self) => setActive(Math.min(2, Math.floor(self.progress * 3))),
      });
    },
    { scope: rootRef },
  );

  return (
    <div ref={rootRef} className="grid items-center gap-10 md:grid-cols-[1fr_auto]">
      <ol className="grid gap-3">
        {steps.map((s, i) => (
          <li
            key={s.screen}
            aria-current={i === active ? "step" : undefined}
            className="label-mono text-salvia transition-colors duration-300 aria-[current=step]:text-rota"
          >
            {s.label}
          </li>
        ))}
      </ol>
      <PhoneSlot
        screen={steps[active].screen}
        posterScreens={steps.map((s) => s.screen)}
        className="w-64 justify-self-center lg:w-80"
      />
    </div>
  );
}
