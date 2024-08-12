import Cards from "@components/Cards.tsx";
import Err from "@components/Error.tsx";
import Header from "@components/Header.tsx";

import { fetchCardDetails } from "@libs/fetch.ts";

export default async function Home() {
  const cards = await fetchCardDetails();

  return (
    <div class="px-6 flex flex-col items-center min-h-screen">
      <Header />
      <main class="flex-1">{cards ? <Cards cards={cards} /> : <Err />}</main>

    </div>
  );
}
