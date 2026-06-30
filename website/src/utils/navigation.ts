import type { ArticleEntry } from './articles';
import { getPublishedArticles, sortArticles } from './articles';

export type ArticleNavigation = {
  previous: ArticleEntry | null;
  next: ArticleEntry | null;
};

export async function getArticleNavigation(
  currentSlug: string,
): Promise<ArticleNavigation> {
  const articles = await getPublishedArticles();

  return findArticleNavigation(articles, currentSlug);
}

export function findArticleNavigation(
  articles: ArticleEntry[],
  currentSlug: string,
): ArticleNavigation {
  const sortedArticles = sortArticles(articles);
  const currentIndex = sortedArticles.findIndex(
    (article) => article.data.slug === currentSlug,
  );

  if (currentIndex === -1) {
    return {
      previous: null,
      next: null,
    };
  }

  return {
    previous: sortedArticles[currentIndex - 1] ?? null,
    next: sortedArticles[currentIndex + 1] ?? null,
  };
}
