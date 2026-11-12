"use client";

import { useEffect, useState } from "react";

/**
 * SÓ EM DESENVOLVIMENTO: sobrepõe a imagem de referência a cada seção já
 * construída, para conferir posições, tamanhos e enquadramento.
 *
 *   ?ref        liga (50% de opacidade)
 *   ?ref=70     opacidade em %
 *   tecla R     liga/desliga
 *   tecla D     alterna modo "diferença" (o que coincide fica preto)
 *
 * Renderizado só quando NODE_ENV === "development" (layout.tsx).
 */
const REFERENCES: Record<string, string> = {
  inicio: "02-hero.png",
  problema: "03-o-problema.png",
  "como-funciona": "04-como-funciona.png",
  acessibilidade: "05-acessibilidade.png",
  tecnologia: "06-inteligencia-integracao.png",
  gestores: "07-para-gestores.png",
  confianca: "08-confianca-privacidade.png",
};

type Box = { id: string; file: string; top: number; left: number; width: number };

export function ReferenceOverlay() {
  const [opacity, setOpacity] = useState<number | null>(null);
  const [visible, setVisible] = useState(true);
  const [diff, setDiff] = useState(false);
  const [boxes, setBoxes] = useState<Box[]>([]);

  useEffect(() => {
    const param = new URLSearchParams(location.search).get("ref");
    if (param === null) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- leitura única da URL
    setOpacity(param ? Math.min(100, Math.max(5, Number(param) || 50)) / 100 : 0.5);

    // Medido a cada frame, em coordenadas da tela: acompanha seções presas
    // (pin do ScrollTrigger), que não ficam na posição do documento
    let raf = 0;
    let last = "";
    const measure = () => {
      const next = Object.entries(REFERENCES).flatMap(([id, file]) => {
        const el = document.getElementById(id);
        if (!el) return [];
        const r = el.getBoundingClientRect();
        if (r.bottom < 0 || r.top > window.innerHeight) return [];
        return [{ id, file, top: r.top, left: r.left, width: r.width }];
      });
      const key = JSON.stringify(next);
      if (key !== last) {
        last = key;
        setBoxes(next);
      }
      raf = requestAnimationFrame(measure);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "r" || e.key === "R") setVisible((v) => !v);
      if (e.key === "d" || e.key === "D") setDiff((v) => !v);
    };

    measure();
    window.addEventListener("keydown", onKey);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  if (opacity === null || !visible) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[60] overflow-hidden">
      {boxes.map((b) => (
        // eslint-disable-next-line @next/next/no-img-element -- ferramenta de dev, imagem original sem otimização
        <img
          key={b.id}
          src={`/dev-ref/${b.file}`}
          alt=""
          className={`absolute max-w-none ${diff ? "mix-blend-difference" : ""}`}
          style={{ top: b.top, left: b.left, width: b.width, opacity: diff ? 1 : opacity }}
        />
      ))}
    </div>
  );
}
