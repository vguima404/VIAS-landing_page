"use client";

/**
 * Estado compartilhado entre o DOM (slots, GSAP) e o canvas único do iPhone.
 * Mutável e fora do React: lido a cada frame, sem re-render.
 */

/** Movimento ligado ao scroll, escrito pelo GSAP de cada slot */
export type PhoneMotion = {
  rx: number;
  ry: number;
  y: number;
};

export const createMotion = (): PhoneMotion => ({ rx: 0, ry: 0, y: 0 });

let invalidate: (() => void) | null = null;
let visibleSlots = 0;

export const phoneStore = {
  /** Ponteiro normalizado (-1..1) na janela; só em ponteiros finos */
  pointer: { x: 0, y: 0 },

  /** Registrado pelo canvas: pede um novo frame (frameloop "demand") */
  setInvalidate(fn: (() => void) | null) {
    invalidate = fn;
  },

  /** Pede um frame, apenas se algum palco estiver visível */
  requestRender() {
    if (visibleSlots > 0) invalidate?.();
  },

  /** Força um frame (ex.: palco acabou de entrar na tela) */
  forceRender() {
    invalidate?.();
  },

  slotVisible(visible: boolean) {
    visibleSlots = Math.max(0, visibleSlots + (visible ? 1 : -1));
    if (visible) invalidate?.();
  },

  get anyVisible() {
    return visibleSlots > 0;
  },
};
