import { allPosts } from "contentlayer/generated"

import { PostList } from "@/components/post-list"

export const metadata = {
  title: "Почему? | Запретные знания",
  description: "Статьи о причинах, смыслах и скрытых мотивах.",
}

export default function WhyPage() {
  const posts = allPosts
    .filter((post) => post.section === "why")
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return (
    <div className="space-y-8">
      <div className="prose dark:prose-invert">
        <h1>Почему?</h1>
        <p>Статьи о причинах, смыслах и скрытых мотивах.</p>
      </div>
      <PostList posts={posts} />
    </div>
  )
}
