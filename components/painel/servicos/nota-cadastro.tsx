import { InfoIcon } from "../painel-icons";

/**
 * Aviso inferior (referência 11: x 233–1657, y 766–819), em creme.
 */
export function NotaCadastro() {
  return (
    <p
      data-pm="note"
      className="mx-5 flex items-start gap-3 rounded-xl border border-[#e0e3cf] bg-[#faf8e7] px-4 py-3.5 text-[0.875rem] leading-snug text-[#0a2b17] sm:mx-8 xl:absolute xl:m-0 xl:block xl:u-top-766 xl:u-left-23 xl:u-h-53 xl:u-w-1425 xl:u-rounded-12 xl:u-border-1 xl:p-0 xl:u-text-16.75 xl:leading-none [.motion-ready_&]:opacity-0"
    >
      <InfoIcon className="mt-0.5 size-5 shrink-0 text-[#055237] xl:absolute xl:mt-0 xl:u-top-12.5 xl:u-left-24.5 xl:u-size-26" />
      <span className="xl:absolute xl:u-top-16.5 xl:u-left-72.5 xl:whitespace-nowrap">
        Ausência de um serviço no cadastro não significa que ele não existe na unidade; significa que a fonte não informou.
      </span>
    </p>
  );
}
