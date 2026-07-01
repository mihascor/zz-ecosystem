import { type Post } from "contentlayer/generated"

export function postHref(post: Pick<Post, "section" | "slugAsParams">) {
  return `/${post.section}/${post.slugAsParams}`
}

export function formatDate(date: string) {
  return new Intl.DateTimeFormat("ru-RU", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(date))
}

export function getTagCounts(posts: Pick<Post, "tags">[]) {
  return posts.reduce<Record<string, number>>((counts, post) => {
    post.tags.forEach((tag) => {
      counts[tag] = (counts[tag] ?? 0) + 1
    })

    return counts
  }, {})
}
