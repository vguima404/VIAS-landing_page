"use client";

/**
 * Ponto único de importação do GSAP no cliente.
 * Registra os plugins uma vez e aplica os padrões da marca.
 * Componentes importam daqui: `import { gsap, ScrollTrigger } from "@/lib/gsap"`.
 */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

import { duration, ease } from "./tokens";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin, SplitText, useGSAP);
  gsap.defaults({ ease: ease.out, duration: duration.base });
  // Evita recálculos quando a barra de endereço do mobile aparece/some
  ScrollTrigger.config({ ignoreMobileResize: true });
}

export { gsap, ScrollTrigger, DrawSVGPlugin, SplitText, useGSAP };
