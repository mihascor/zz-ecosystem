import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="space-y-10">
      <section className="prose dark:prose-invert">
        <h1>Запретные знания</h1>
        <blockquote className="not-prose ml-auto grid max-w-sm grid-cols-[1fr_auto] items-center gap-4 text-right text-lg font-semibold italic text-slate-900 dark:text-slate-100">
          <span>Мы сами создатели себя</span>
          <span className="h-9 w-1 bg-slate-600 dark:bg-slate-500" />
        </blockquote>
        <p>
          Почему ЗАПРЕТНЫЕ ЗНАНИЯ? Не потому, что их кто-то запретил и они
          недоступны, а потому, что мы их боимся и игнорируем, даже если знаем.
          <Link href="/why/zapretnye-znaniya"> Читать.</Link>
        </p>
      </section>
      <section className="space-y-5">
        <div className="relative aspect-video w-full overflow-hidden rounded">
          <Image
            src="/napolnenie/glavnaya/pochemu-i-kak.webp"
            alt="Почему и как"
            fill
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
          />
        </div>
        <div className="space-y-2 text-lg font-semibold">
          <p>
            Почему мы так думаем?{" "}
            <Link href="/why" className="hover:underline">
              Читать
            </Link>
          </p>
          <p>
            Как можно думать?{" "}
            <Link href="/how" className="hover:underline">
              Читать
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
