import { CardDetail } from "@interfaces/card.ts";
import { ImasparqlResponse, Binding } from "@interfaces/imasparql.ts";

const endpointUrl = "https://928b-37-235-54-71.ngrok-free.app/MyDataset/sparql"; // Замените MyDataset на ваше фактическое имя

const query = `
PREFIX schema: <http://schema.org/>
PREFIX ex: <http://example.org/>

SELECT ?class ?label ?count ?icon ?position ?link WHERE {
  ?class a schema:MenuItem ;
         schema:name ?label ;
         schema:icon ?icon ;
         schema:count ?count ;
         schema:position ?position ;
         ex:link ?link .
}
ORDER BY ?position
`;

export async function fetchCardDetails(): Promise<CardDetail[] | undefined> {
  const url = new URL(endpointUrl);
  url.searchParams.append("query", query);

  const ctrl = new AbortController();
  const id = setTimeout(() => ctrl.abort(), 5000);

  try {
    const res = await fetch(url.toString(), { signal: ctrl.signal });

    if (!res.ok) {
      console.error(`Ошибка: ${res.status} ${res.statusText}`);
      return;
    }

    const contentType = res.headers.get("content-type");
    if (!contentType || !contentType.includes("json")) {
      console.error("Ответ не является JSON");
      return;
    }

    clearTimeout(id);

    const json: ImasparqlResponse = await res.json();
    return createCardDetails(json);
  } catch (err) {
    console.error("Ошибка при получении данных:", err);
    return;
  }
}

export function createCardDetails(response: ImasparqlResponse): CardDetail[] {
  // Определяем, работаем ли мы на локальном сервере или на продакшн
  const isLocalhost = typeof Deno !== "undefined" && Deno.env.get("DENO_DEPLOYMENT_ID") === undefined;
  const baseUrl = isLocalhost ? "http://localhost:8000" : "https://intellico.deno.dev";

  return response.results.bindings.map((binding: Binding) => {
    // Формируем ссылку с учетом baseUrl
    const link = binding.link?.value ? (binding.link.value.startsWith("http") ? binding.link.value : `${baseUrl}${binding.link.value}`) : "#";
    return {
      title: binding.label?.value || "",
      count: binding.count.value,
      icon: binding.icon.value,
      link: link,  // Используем сформированную ссылку
    };
  });
}
