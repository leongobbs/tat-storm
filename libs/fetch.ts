import { CardDetail } from "@interfaces/card.ts";
import { ImasparqlResponse, Binding } from "@interfaces/imasparql.ts";

const endpointUrl = "https://ffa6-37-235-54-71.ngrok-free.app/MyDataset/sparql"; // Замените MyDataset на ваше фактическое имя

const query = `
PREFIX schema: <http://schema.org/>
PREFIX ex: <http://example.org/>

SELECT ?class ?label ?count ?icon ?position WHERE {
  ?class a schema:MenuItem ;
         schema:name ?label ;
         schema:icon ?icon ;
         schema:count ?count ;
         schema:position ?position .
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
  return response.results.bindings.map((binding: Binding) => {
    return {
      title: binding.label?.value || "",
      count: binding.count.value,
      icon: binding.icon.value,
      position: binding.position.value, // Добавляем позицию
    };
  });
}
