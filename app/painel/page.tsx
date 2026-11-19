import type { Metadata } from "next";

import { PageHeader } from "@/components/painel/page-header";
import { PainelMotion } from "@/components/painel/painel-motion";
import { AcessibilidadeFisica } from "@/components/painel/visao-geral/acessibilidade-fisica";
import { AtendimentoSus } from "@/components/painel/visao-geral/atendimento-sus";
import { IndicadoresPopover } from "@/components/painel/visao-geral/indicadores-popover";
import { Kpis } from "@/components/painel/visao-geral/kpis";
import { UnidadesPorTipo } from "@/components/painel/visao-geral/unidades-por-tipo";

// O template do layout só vale para as subpáginas; aqui o título é absoluto
export const metadata: Metadata = { title: { absolute: "Visão geral · Painel do gestor · VIAS" } };

/** Painel do gestor · Visão geral (referência 10, com dados simulados) */
export default function VisaoGeralPage() {
  return (
    <PainelMotion>
      <PageHeader title="Painel do gestor" subtitle="Acompanhe o cadastro das unidades de saúde de São Paulo." />
      <div className="mt-8 flex flex-col gap-4 xl:static xl:mt-0 xl:block">
        <Kpis />
        <IndicadoresPopover />
        <UnidadesPorTipo />
        <AtendimentoSus />
        <AcessibilidadeFisica />
      </div>
    </PainelMotion>
  );
}
