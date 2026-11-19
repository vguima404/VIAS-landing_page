"use client";

import { usePathname } from "next/navigation";

import { visaoGeral } from "@/lib/painel-data";

import { DatabaseIcon } from "./painel-icons";

/**
 * Faixa inferior (referências 10 e 11: y 871–941), com o texto de cada
 * página e, a mais (pedido de 19/11), o aviso de que os dados são simulados.
 * Na Visão geral a referência inclui a data da consulta; em Serviços e
 * bairros, não (e o texto é um pouco maior).
 */
export function PainelRodape() {
  const visao = usePathname() === "/painel";

  return (
    <footer
      className={`relative z-10 bg-ref-rodape-10 px-5 py-4 text-[0.8125rem] leading-snug text-ref-rodape-texto-10 xl:col-span-2 xl:row-start-2 xl:flex xl:items-center xl:p-0 xl:u-pl-34 ${visao ? "xl:u-text-14.25" : "xl:u-text-15"}`}
    >
      <p className="flex items-start gap-3 xl:items-center xl:u-gap-15">
        <DatabaseIcon className="mt-0.5 size-5 shrink-0 text-ref-rodape-icone-10 xl:mt-0 xl:u-h-21 xl:u-w-20" />
        <span>
          Fonte: CNES – Ministério da Saúde
          {visao && ` · Consultado em ${visaoGeral.consultadoEm}`} · Sem dados pessoais
          <span className="text-ref-rodape-icone-10"> · </span>
          <strong className="font-semibold text-lima">Dados simulados para demonstração</strong>
        </span>
      </p>
    </footer>
  );
}
