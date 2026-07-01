import { allPosts } from "contentlayer/generated"
import Link from "next/link"

import { getTagCounts } from "@/lib/posts"

export const metadata = {
  title: "Теги | Запретные знания",
  description: "Облако тегов статического блога Запретные знания.",
}

const tagSizeClasses = [
  "text-sm",
  "text-base",
  "text-lg",
  "text-xl",
  "text-2xl",
]

function getTagSizeClass(count: number, minCount: number, maxCount: number) {
  if (maxCount === minCount) {
    return tagSizeClasses[2]
  }

  const ratio = (count - minCount) / (maxCount - minCount)
  const index = Math.round(ratio * (tagSizeClasses.length - 1))

  return tagSizeClasses[index]
}

export default function TagsPage() {
  const tags = Object.entries(getTagCounts(allPosts)).sort(([a], [b]) =>
    a.localeCompare(b, "ru")
  )
  const counts = tags.map(([, count]) => count)
  const minCount = Math.min(...counts)
  const maxCount = Math.max(...counts)

  return (
    <div className="space-y-8">
      <div className="prose dark:prose-invert">
        <h1>Теги</h1>
        <p>Темы, по которым сгруппированы статьи блога.</p>
      </div>
      <div className="flex flex-wrap items-baseline gap-x-5 gap-y-3">
        {tags.map(([tag, count]) => (
          <Link
            key={tag}
            href={`/tags/${encodeURIComponent(tag)}`}
            className={`${getTagSizeClass(
              count,
              minCount,
              maxCount
            )} font-medium text-slate-700 hover:text-slate-950 hover:underline dark:text-slate-300 dark:hover:text-white`}
          >
            {tag} ({count})
          </Link>
        ))}
      </div>
    </div>
  )
}
