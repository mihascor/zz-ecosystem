import { notFound } from "next/navigation"
import { allPages } from "contentlayer/generated"

import { Mdx } from "@/components/mdx-components"

const page = allPages.find((item) => item.slugAsParams === "about")

export const metadata = {
  title: page?.title ?? "О проекте",
  description: page?.description,
}

export default function AboutPage() {
  if (!page) {
    notFound()
  }

  return (
    <article className="prose py-6 dark:prose-invert">
      <h1>{page.title}</h1>
      {page.description && <p className="text-xl">{page.description}</p>}
      <hr />
      <Mdx code={page.body.code} />
    </article>
  )
}
