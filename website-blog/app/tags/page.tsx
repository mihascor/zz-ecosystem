import { allPosts } from "contentlayer/generated"
import Link from "next/link"

import { getTagCounts } from "@/lib/posts"

export const metadata = {
  title: "Теги | Запретные знания",
  description: "Облако тегов статического блога Запретные знания.",
}

export default function TagsPage() {
  const tags = Object.entries(getTagCounts(allPosts)).sort(([a], [b]) =>
    a.localeCompare(b, "ru")
  )

  return (
    <div className="space-y-8">
      <div className="prose dark:prose-invert">
        <h1>Теги</h1>
        <p>Темы, по которым сгруппированы статьи блога.</p>
      </div>
      <div className="flex flex-wrap gap-3">
        {tags.map(([tag, count]) => (
          <Link
            key={tag}
            href={`/tags/${encodeURIComponent(tag)}`}
            className="rounded border border-slate-200 px-3 py-2 text-sm font-medium hover:border-slate-400 dark:border-slate-800 dark:hover:border-slate-600"
          >
            {tag} ({count})
          </Link>
        ))}
      </div>
    </div>
  )
}
