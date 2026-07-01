import { allPosts } from "contentlayer/generated"

import { PostList } from "@/components/post-list"

export const metadata = {
  title: "Как? | Запретные знания",
  description: "Практические статьи о том, как применять знания.",
}

export default function HowPage() {
  const posts = allPosts
    .filter((post) => post.section === "how")
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return (
    <div className="space-y-8">
      <div className="prose dark:prose-invert">
        <h1>Как?</h1>
        <p>Практические статьи о том, как применять знания.</p>
      </div>
      {posts.length ? (
        <PostList posts={posts} />
      ) : (
        <p className="text-slate-600 dark:text-slate-300">
          В этом разделе пока нет статей.
        </p>
      )}
    </div>
  )
}
