import type { ArticleEntry } from './articles';
import { getPublishedArticles, sortArticles } from './articles';

export type TagIndex = {
  tag: string;
  count: number;
  articles: ArticleEntry[];
}[];

export async function getTagIndex(): Promise<TagIndex> {
  const articles = await getPublishedArticles();

  return buildTagIndex(articles);
}

export async function getArticlesByTag(tag: string) {
  const articles = await getPublishedArticles();

  return sortArticles(
    articles.filter((article) => article.data.tags.includes(tag)),
  );
}

export function buildTagIndex(articles: ArticleEntry[]): TagIndex {
  const tags = new Map<string, ArticleEntry[]>();

  for (const article of sortArticles(articles)) {
    for (const tag of article.data.tags) {
      const taggedArticles = tags.get(tag) ?? [];

      taggedArticles.push(article);
      tags.set(tag, taggedArticles);
    }
  }

  return [...tags.entries()]
    .sort(([firstTag], [secondTag]) => firstTag.localeCompare(secondTag, 'ru'))
    .map(([tag, taggedArticles]) => ({
      tag,
      count: taggedArticles.length,
      articles: sortArticles(taggedArticles),
    }));
}
