import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google";

import { PainelRodape } from "@/components/painel/painel-rodape";
import { Sidebar } from "@/components/painel/sidebar";
import { Skyline } from "@/components/painel/skyline";

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: { default: "Painel do gestor", template: "%s · Painel do gestor · VIAS" },
  description: "Demonstração do painel do VIAS para gestores públicos de saúde, com dados simulados.",
};

/**
 * Painel do gestor (referencias/gestor/10-painel-gestor.png, 1672×941).
 *
 * Desktop (xl): a tela inteira, como na referência. Barra lateral de 210u à
 * esquerda, faixa inferior de 70.5u e, à direita, o conteúdo num quadro de
 * 1462u (x 210–1672 da referência), centralizado se sobrar largura. O
 * skyline do cabeçalho fica preso ao canto superior direito.
 * Abaixo de xl: barra superior, conteúdo empilhado e faixa inferior.
 */
export default function PainelLayout({ children }: LayoutProps<"/painel">) {
  return (
    <div
      id="painel-gestor"
      className={`${interTight.variable} relative flex min-h-svh flex-col bg-ref-fundo-10 xl:grid xl:h-svh xl:min-h-0 xl:grid-cols-[calc(var(--u)*209.5)_1fr] xl:grid-rows-[1fr_calc(var(--u)*70.5)] xl:overflow-hidden font-painel`}
    >
      <Sidebar />
      <main id="conteudo" tabIndex={-1} className="relative flex-1 overflow-hidden focus:outline-none xl:col-start-2 xl:row-start-1">
        <Skyline />
        <div className="relative xl:mx-auto xl:h-full xl:u-w-1462">{children}</div>
      </main>
      <PainelRodape />
    </div>
  );
}
