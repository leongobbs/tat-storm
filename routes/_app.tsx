import { asset, Head } from "$fresh/runtime.ts";
import { AppProps } from "$fresh/server.ts";

export default function App(props: AppProps) {
  const title = "AI Оценка производительности ремонтных бригад";
  const desc = "Мониторинг и Анализ эффективности ремонтных бригад для обеспечения соблюдения норм безопасности и предотвращение инцидентов за счет обнаружения неправильных действий в близи опасного оборудования путем CV анализа поз и движений в реальном времени.";

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={desc} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={desc} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={desc} />
        <link
          rel="stylesheet"
          href={asset(
            "https://api.fonts.coollabs.io/css2?family=M+PLUS+Rounded+1c:wght@400;500&display=swap",
          )}
        />
        <link
          rel="stylesheet"
          href={asset(
            "https://cdn.jsdelivr.net/npm/@tabler/icons@1.76.0/iconfont/tabler-icons.min.css",
          )}
        />
        <link rel="stylesheet" href={asset("./globals.css")} />
      </Head>
      <div class="text-text bg-background font-default">
        <props.Component />
      </div>
    </>
  );
}
