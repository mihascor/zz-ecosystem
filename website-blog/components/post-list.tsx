import { type Post } from "contentlayer/generated"
import Link from "next/link"

import { postHref } from "@/lib/posts"

interface PostListProps {
  posts: Post[]
}

export function PostList({ posts }: PostListProps) {
  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <article
          key={post._id}
          className="border-b border-slate-200 pb-6 last:border-0 dark:border-slate-800"
        >
          <Link
            href={postHref(post)}
            className="block text-xl font-semibold hover:underline"
          >
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
  )
}
