import { allPosts } from "@/.contentlayer/generated"
import Link from "next/link"
import { postHref } from "@/lib/posts"

export default function Home() {
  const posts = allPosts
    .slice()
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3)

  return (
    <div className="space-y-10">
      <section className="prose dark:prose-invert">
        <h1>Запретные знания</h1>
        <p>
          Легкий статический блог о символах, закрытых обществах, забытых
          текстах и исторических сюжетах на стыке фактов и интерпретаций.
        </p>
      </section>
      <section className="space-y-6">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-xl font-semibold">Последние статьи</h2>
          <Link href="/blog" className="text-sm font-medium text-slate-600 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white">
            Все статьи
          </Link>
        </div>
        <div className="space-y-5">
          {posts.map((post) => (
            <article key={post._id} className="border-b border-slate-200 pb-5 last:border-0 dark:border-slate-800">
              <Link href={postHref(post)} className="text-lg font-semibold hover:underline">
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
  )
}
