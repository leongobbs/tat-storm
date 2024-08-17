import LinkButton from "@components/LinkButton.tsx";

export default function Header() {
  return (
    <div class="w-full px-4 py-10 flex flex-row justify-between items-center">
      <div class="flex items-center">
      <img src="/favicon.ico" alt="Логотип" class="w-10 h-10 md:w-10 md:h-10" />
        <span class="ml-3 font-medium text-md md:text-lg">
          <p>Intellico</p>
          <p>Интеллектуальный Центр Управления</p>
        </span>
      </div>
      <div class="space-x-2 md:space-x-4">
        <LinkButton title="im@sparql" /* href="https://sparql.crssnky.xyz/imas/" */>
          <i class="ti ti-database text-xl md:text-2xl" />
        </LinkButton>
        <LinkButton
          title="GitHub"
          /* href="https://github.com/arrow2nd/imasparql-data-dashboard" */
        >
          <i class="ti ti-brand-github text-xl md:text-2xl" />
        </LinkButton>
      </div>
    </div>
  );
}
