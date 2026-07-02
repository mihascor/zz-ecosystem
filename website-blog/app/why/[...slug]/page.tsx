import { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { allPosts } from "contentlayer/generated"

import { Mdx } from "@/components/mdx-components"

interface PostProps {
  params: {
    slug: string[]
  }
}

const section = "why"

function getPostFromParams(params: PostProps["params"]) {
  const slug = params?.slug?.join("/")
  return allPosts.find(
    (post) => post.section === section && post.slugAsParams === slug
  )
}

export function generateMetadata({ params }: PostProps): Metadata {
  const post = getPostFromParams(params)

  if (!post) {
    return {}
  }

  return {
    title: post.title,
    description: post.description,
  }
}

export function generateStaticParams(): PostProps["params"][] {
  return allPosts
    .filter((post) => post.section === section)
    .map((post) => ({
      slug: post.slugAsParams.split("/"),
    }))
}

export default function WhyPostPage({ params }: PostProps) {
  const post = getPostFromParams(params)

  if (!post) {
    notFound()
  }

  return (
    <article className="prose py-6 dark:prose-invert">
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
