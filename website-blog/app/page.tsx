import { allPosts } from "@/.contentlayer/generated";
import Link from "next/link";
import { postHref } from "@/lib/posts";

export default function Home() {
  const posts = allPosts
    .slice()
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  return (
    <div className="space-y-10">
      <section className="prose dark:prose-invert">
        <h1>Запретные знания</h1>
        <blockquote className="not-prose ml-auto grid max-w-sm grid-cols-[1fr_auto] items-center gap-4 text-right text-lg font-semibold italic text-slate-900 dark:text-slate-100">
          <span>Мы сами творцы себя</span>
          <span className="h-9 w-1 bg-slate-600 dark:bg-slate-500" />
        </blockquote>
        <p>
          Почему ЗАПРЕТНЫЕ ЗНАНИЯ? Не потому, что их кто-то запретил и они
          недоступны, а потому, что мы их боимся и игнорируем, даже если знаем.
          <Link href="/blog/zapretnye-znaniya"> Читать.</Link>
        </p>
      </section>
      <section className="space-y-6">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-xl font-semibold">Последние статьи</h2>
          <Link
            href="/blog"
            className="text-sm font-medium text-slate-600 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white"
          >
            Все статьи
          </Link>
        </div>
        <div className="space-y-5">
          {posts.map((post) => (
            <article
              key={post._id}
              className="border-b border-slate-200 pb-5 last:border-0 dark:border-slate-800"
            >
              <Link
                href={postHref(post)}
                className="text-lg font-semibold hover:underline"
              >
                {post.title}
              </Link>
              {post.description && (
                <p className="mt-2 text-slate-600 dark:text-slate-300">
                  {post.description}
                </p>
              )}
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
