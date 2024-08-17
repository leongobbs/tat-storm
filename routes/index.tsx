import Cards from "@components/Cards.tsx";
import Err from "@components/Error.tsx";
import Header from "@components/Header.tsx";

import { fetchCardDetails } from "@libs/fetch.ts";

export default async function Home() {
  try {
    // Получаем данные для карточек с помощью SPARQL запроса
    const cards = await fetchCardDetails();

    return (
      <div class="px-6 flex flex-col items-center min-h-screen">
        <Header />
        <main class="flex-1">
          {cards ? <Cards cards={cards} /> : <Err />}
        </main>
      </div>
    );
  } catch (error) {
    console.error("Ошибка при получении данных для карточек:", error);
    return (
      <div class="px-6 flex flex-col items-center min-h-screen">
        <Header />
        <main class="flex-1">
          <Err />
        </main>
      </div>
    );
  }
}
