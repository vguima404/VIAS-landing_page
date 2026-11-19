import { Footer } from "@/components/footer/footer";
import { Acessibilidade } from "@/components/sections/acessibilidade/acessibilidade";
import { ComoFunciona } from "@/components/sections/como-funciona/como-funciona";
import { Confianca } from "@/components/sections/confianca/confianca";
import { Cta } from "@/components/sections/cta/cta";
import { Gestores } from "@/components/sections/gestores/gestores";
import { Hero } from "@/components/sections/hero/hero";
import { Inteligencia } from "@/components/sections/inteligencia/inteligencia";
import { Problema } from "@/components/sections/problema/problema";

/**
 * Página única do VIAS.
 * 02 Hero (Etapa 3.1), 03 O problema (Etapa 4), 04 Como funciona (Etapa 5) e
 * 05 Acessibilidade (Etapa 6), 06 Inteligência (Etapa 7), 07 Gestores (Etapa 8)
 * 08 Confiança (Etapa 9), 09 CTA final e footer (Etapa 10): definitivos.
 */
export default function Home() {
  return (
    <>
      <main id="conteudo" tabIndex={-1} className="focus:outline-none">
        <Hero />

        <Problema />

        <ComoFunciona />

        <Acessibilidade />

        <Inteligencia />

        <Gestores />

        <Confianca />

        <Cta />
      </main>

      <Footer />
    </>
  );
}
