import { h } from "preact";

export default function Reports() {
  return (
    <div class="px-6 py-4">
      <h1 class="text-2xl font-bold">Отчеты</h1>
      <p>Список сгенерированных отчетов.</p>

      <a href="javascript:history.back()" class="mt-4 inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-200">
        Назад
      </a>
    </div>
  );
}
