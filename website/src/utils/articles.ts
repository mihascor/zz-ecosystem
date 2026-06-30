import { getCollection, type CollectionEntry } from 'astro:content';

export type ArticleEntry = CollectionEntry<'articles'>;
export type ArticleSortMode = 'order' | 'date';

export async function getPublishedArticles(sortBy: ArticleSortMode = 'order') {
  const articles = await getCollection('articles', ({ data }) => data.published);

  return sortArticles(articles, sortBy);
}

export async function getAllArticles(sortBy: ArticleSortMode = 'order') {
  const articles = await getCollection('articles');

  return sortArticles(articles, sortBy);
}

export async function getPublishedArticleBySlug(slug: string) {
  const articles = await getPublishedArticles();

  return articles.find((article) => article.data.slug === slug) ?? null;
}

export function sortArticles(
  articles: ArticleEntry[],
  sortBy: ArticleSortMode = 'order',
) {
  return [...articles].sort((firstArticle, secondArticle) => {
    if (sortBy === 'date') {
      const firstDate = Date.parse(firstArticle.data.date);
      const secondDate = Date.parse(secondArticle.data.date);

      if (firstDate !== secondDate) {
        return secondDate - firstDate;
      }
    }

    if (firstArticle.data.order !== secondArticle.data.order) {
      return firstArticle.data.order - secondArticle.data.order;
    }

    return firstArticle.data.title.localeCompare(secondArticle.data.title, 'ru');
  });
}
