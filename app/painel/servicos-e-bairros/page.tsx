import type { Metadata } from "next";

import { PageHeader } from "@/components/painel/page-header";
import { PainelMotion } from "@/components/painel/painel-motion";
import { BairrosRanking } from "@/components/painel/servicos/bairros-ranking";
import { MenosUnidades } from "@/components/painel/servicos/menos-unidades";
import { NotaCadastro } from "@/components/painel/servicos/nota-cadastro";
import { ServicosLista } from "@/components/painel/servicos/servicos-lista";

export const metadata: Metadata = { title: "Serviços e bairros" };

/**
 * Painel do gestor · Serviços e bairros
 * (referencias/gestor/11-servicos-bairros.png, com dados simulados).
 */
export default function ServicosBairrosPage() {
  return (
    <PainelMotion>
      <PageHeader title="Painel do gestor" subtitle="Acompanhe o cadastro das unidades de saúde de São Paulo." />
      <div className="mt-8 flex flex-col gap-4 xl:static xl:mt-0 xl:block">
        <ServicosLista />
        <MenosUnidades />
        <BairrosRanking />
        <NotaCadastro />
      </div>
    </PainelMotion>
  );
}
