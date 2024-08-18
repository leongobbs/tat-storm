import { CardDetail } from "@interfaces/card.ts";

export default function Card({ title, count, icon, link }: CardDetail) {
  return (
    <a href={link} class="block px-8 py-4 w-80 md:w-96 h-32 flex justify-between items-center bg-card rounded-md shadow-sm hover:bg-card-hover transition duration-200">
      <img src={`/icons/${icon}`} class="text-icon text-6xl md:text-7xl w-10 h-10 md:w-10 md:h-10" />
      <span class="flex-1 flex justify-end items-center h-full">
        <p class="text-sm md:text-base text-right">{title}</p>
      </span>
    </a>
  );
}
