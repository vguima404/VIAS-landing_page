import { readFile } from "node:fs/promises";
import path from "node:path";

/**
 * SÓ EM DESENVOLVIMENTO: serve as imagens de referencias/landing para a
 * sobreposição de conferência (?ref). Em produção responde 404, e as
 * referências nunca são publicadas.
 */
export async function GET(_request: Request, ctx: RouteContext<"/dev-ref/[file]">) {
  if (process.env.NODE_ENV !== "development") return new Response("Not found", { status: 404 });

  const { file } = await ctx.params;
  if (!/^\d{2}-[a-z-]+\.png$/.test(file)) return new Response("Not found", { status: 404 });

  try {
    const data = await readFile(path.join(process.cwd(), "referencias", "landing", file));
    return new Response(new Uint8Array(data), { headers: { "content-type": "image/png", "cache-control": "no-store" } });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}
