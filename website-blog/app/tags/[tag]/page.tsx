import { allPosts } from "contentlayer/generated"
import Link from "next/link"
import { notFound } from "next/navigation"

import { getTagCounts, postHref } from "@/lib/posts"

interface TagPageProps {
  params: {
    tag: string
  }
}

export function generateStaticParams(): TagPageProps["params"][] {
  return Object.keys(getTagCounts(allPosts)).map((tag) => ({
    tag,
  }))
}

export function generateMetadata({ params }: TagPageProps) {
  const tag = decodeURIComponent(params.tag)

  return {
    title: `${tag} | Запретные знания`,
    description: `Статьи с тегом ${tag}.`,
  }
}

export default function TagPage({ params }: TagPageProps) {
  const tag = decodeURIComponent(params.tag)
  const posts = allPosts
    .filter((post) => post.tags.includes(tag))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  if (!posts.length) {
    notFound()
  }

  return (
    <div className="space-y-8">
      <div className="prose dark:prose-invert">
        <h1>{tag}</h1>
        <p>Статьи, связанные с выбранным тегом.</p>
      </div>
      <div className="space-y-6">
        {posts.map((post) => (
          <article key={post._id} className="border-b border-slate-200 pb-6 last:border-0 dark:border-slate-800">
            <Link href={postHref(post)} className="block text-xl font-semibold hover:underline">
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
    </div>
  )
}
