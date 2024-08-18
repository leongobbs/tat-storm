import { h } from "preact";

export default function Main() {
  return (
    <div class="px-6 py-4">
      <h1 class="text-2xl font-bold">Главная</h1>
      <p>Добро пожаловать на главную страницу.</p>

      <a href="javascript:history.back()" class="mt-4 inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-200">
        Назад
      </a>
    </div>
  );
}
