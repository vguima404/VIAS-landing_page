/**
 * Cabeçalho das páginas do painel: título, selo "Dados simulados" (pedido de
 * 19/11, não está na referência), subtítulo e o traço verde.
 * Referência (quadro de conteúdo, x − 210): título 47u em x 46, subtítulo
 * 20.5u, traço 71×4.5u em (46, 139).
 */

const hidden = "[.motion-ready_&]:opacity-0";

export function PageHeader({ title, subtitle }: { title: string; subtitle: string }) {
  const words = title.split(" ");
  return (
    <header className="relative px-5 pt-8 sm:px-8 xl:static xl:p-0">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 xl:absolute xl:u-top-40.5 xl:u-left-44.5 xl:flex-nowrap xl:u-gap-20">
        <h1 className="text-[2.25rem] leading-none font-bold text-ref-tinta-10 xl:u-text-47 xl:tracking-[0.009em] xl:whitespace-nowrap">
          {words.map((word, i) => (
            <span key={i}>
              <span className="-mb-[0.12em] inline-block overflow-hidden pb-[0.12em] align-top">
                <span data-pm="title-word" className={`inline-block ${hidden}`}>
                  {word}
                </span>
              </span>
              {i < words.length - 1 && " "}
            </span>
          ))}
        </h1>
        <span
          data-pm="badge"
          className={`inline-flex items-center gap-2 rounded-full border border-[#c9e07a] bg-lima/45 px-3 py-1 text-[0.75rem] font-semibold text-ref-verde-10 xl:u-gap-8 xl:u-border-1 xl:u-px-12 xl:u-py-5 xl:u-text-13 ${hidden}`}
        >
          <span className="relative flex size-2 xl:u-size-8">
            <span className="absolute inset-0 animate-ping rounded-full bg-ref-destaque-10 opacity-60 motion-reduce:hidden" />
            <span className="relative size-full rounded-full bg-ref-destaque-10" />
          </span>
          Dados simulados
        </span>
      </div>

      <p
        data-pm="sub"
        className={`mt-3 text-[1.0625rem] leading-snug text-ref-texto-10 xl:absolute xl:u-top-101 xl:u-left-44 xl:mt-0 xl:u-text-20.25 xl:leading-none xl:whitespace-nowrap ${hidden}`}
      >
        {subtitle}
      </p>
      <span
        data-pm="accent"
        aria-hidden="true"
        className={`mt-4 block h-1 w-16 rounded-full bg-ref-destaque-10 xl:absolute xl:u-top-139 xl:u-left-46 xl:mt-0 xl:u-h-4.5 xl:u-w-71 ${hidden}`}
      />
    </header>
  );
}
