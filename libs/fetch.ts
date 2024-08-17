import { CardDetail } from "@interfaces/card.ts";
import { ImasparqlResponse, Binding } from "@interfaces/imasparql.ts";

const endpointUrl = "http://localhost:3030/MyDataset/sparql"; // Замените MyDataset на ваше фактическое имя

const query = `
PREFIX schema: <http://schema.org/>
PREFIX ex: <http://example.org/>

SELECT ?class ?label ?count ?icon ?link WHERE {
  ?class a schema:MenuItem ;
         schema:name ?label ;
         schema:icon ?icon ;
         schema:count ?count ;
         ex:link ?link .
}
ORDER BY ?class
`;

export async function fetchCardDetails(): Promise<CardDetail[] | undefined> {
  const url = new URL(endpointUrl);
  url.searchParams.append("query", query);

  const ctrl = new AbortController();
  const id = setTimeout(() => ctrl.abort(), 5000);

  try {
    const res = await fetch(url.toString(), { signal: ctrl.signal });

    // Отладочный вывод заголовков ответа
    console.log("Content-Type:", res.headers.get("content-type"));

    if (!res.ok) {
      console.error(`Ошибка: ${res.status} ${res.statusText}`);
      return;
    }

    const contentType = res.headers.get("content-type");
    if (!contentType || !contentType.includes("json")) {  // Проверка на наличие "json" в Content-Type
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
      link: binding.link?.value || "#", // Добавлено свойство link
    };
  });
}
