import { allPosts } from "contentlayer/generated"
import Link from "next/link"

import { formatDate, postHref } from "@/lib/posts"

export const metadata = {
  title: "Блог | Запретные знания",
  description: "Все статьи проекта Запретные знания.",
}

export default function BlogPage() {
  const posts = allPosts
    .slice()
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return (
    <div className="space-y-8">
      <div className="prose dark:prose-invert">
        <h1>Блог</h1>
        <p>Статьи проекта о символах, истории и тайных обществах.</p>
      </div>
      <div className="space-y-6">
        {posts.map((post) => (
          <article key={post._id} className="border-b border-slate-200 pb-6 last:border-0 dark:border-slate-800">
            <div className="text-sm text-slate-500 dark:text-slate-400">
              {formatDate(post.date)}
            </div>
            <Link href={postHref(post)} className="mt-2 block text-xl font-semibold hover:underline">
              {post.title}
            </Link>
            {post.description && (
              <p className="mt-2 text-slate-600 dark:text-slate-300">
                {post.description}
              </p>
            )}
            <div className="mt-3 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/tags/${encodeURIComponent(tag)}`}
                  className="text-sm text-slate-500 hover:text-slate-950 dark:text-slate-400 dark:hover:text-white"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
