"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

/**
 * Etapa ativa de "Como funciona" (0, 1, 2), compartilhada entre a timeline
 * da seção (que escreve) e o iPhone (que troca de tela).
 * Estado inicial = etapa final (03): é o que aparece sem JS, com movimento
 * reduzido e no mobile, igual à referência.
 */
type StepContext = { step: number; setStep: (step: number) => void };

const Ctx = createContext<StepContext>({ step: 2, setStep: () => {} });

export function StepProvider({ children }: { children: ReactNode }) {
  const [step, setStep] = useState(2);
  return <Ctx.Provider value={{ step, setStep }}>{children}</Ctx.Provider>;
}

export const useComoStep = () => useContext(Ctx);
