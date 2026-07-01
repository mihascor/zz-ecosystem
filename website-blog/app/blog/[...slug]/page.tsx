import { notFound } from "next/navigation"
import { allPosts } from "contentlayer/generated"

import { Metadata } from "next"
import Link from "next/link"
import { Mdx } from "@/components/mdx-components"
import { formatDate } from "@/lib/posts"

interface PostProps {
  params: {
    slug: string[]
  }
}

async function getPostFromParams(params: PostProps["params"]) {
  const slug = params?.slug?.join("/")
  return allPosts.find((post) => post.slugAsParams === slug)
}

export async function generateMetadata({
  params,
}: PostProps): Promise<Metadata> {
  const post = await getPostFromParams(params)

  if (!post) {
    return {}
  }

  return {
    title: post.title,
    description: post.description,
  }
}

export async function generateStaticParams(): Promise<PostProps["params"][]> {
  return allPosts.map((post) => ({
    slug: post.slugAsParams.split("/"),
  }))
}

export default async function PostPage({ params }: PostProps) {
  const post = await getPostFromParams(params)

  if (!post) {
    notFound()
  }

  return (
    <article className="prose py-6 dark:prose-invert">
      <div className="not-prose mb-6 text-sm text-slate-500 dark:text-slate-400">
        {formatDate(post.date)}
      </div>
      <h1 className="mb-2">{post.title}</h1>
      {post.description && (
        <p className="mt-0 text-xl text-slate-700 dark:text-slate-200">
          {post.description}
        </p>
      )}
      <div className="not-prose mb-8 mt-4 flex flex-wrap gap-2">
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
      <hr className="my-4" />
      <Mdx code={post.body.code} />
    </article>
  )
}
