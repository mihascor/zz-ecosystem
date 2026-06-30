import type { ArticleEntry } from './articles';
import { getPublishedArticles, sortArticles } from './articles';

export type CategoryTree = {
  category: string;
  subcategories: {
    subcategory: string;
    articles: ArticleEntry[];
  }[];
}[];

export async function getCategoryTree(): Promise<CategoryTree> {
  const articles = await getPublishedArticles();

  return buildCategoryTree(articles);
}

export async function getArticlesByCategory(category: string) {
  const articles = await getPublishedArticles();

  return sortArticles(
    articles.filter((article) => article.data.category === category),
  );
}

export async function getArticlesBySubcategory(subcategory: string) {
  const articles = await getPublishedArticles();

  return sortArticles(
    articles.filter((article) => article.data.subcategory === subcategory),
  );
}

export function buildCategoryTree(articles: ArticleEntry[]): CategoryTree {
  const categories = new Map<string, Map<string, ArticleEntry[]>>();

  for (const article of sortArticles(articles)) {
    const category = article.data.category;
    const subcategory = article.data.subcategory;

    if (!categories.has(category)) {
      categories.set(category, new Map());
    }

    const subcategories = categories.get(category);

    if (!subcategories?.has(subcategory)) {
      subcategories?.set(subcategory, []);
    }

    subcategories?.get(subcategory)?.push(article);
  }

  return [...categories.entries()]
    .sort(([firstCategory], [secondCategory]) =>
      firstCategory.localeCompare(secondCategory, 'ru'),
    )
    .map(([category, subcategories]) => ({
      category,
      subcategories: [...subcategories.entries()]
        .sort(([firstSubcategory], [secondSubcategory]) =>
          firstSubcategory.localeCompare(secondSubcategory, 'ru'),
        )
        .map(([subcategory, groupedArticles]) => ({
          subcategory,
          articles: sortArticles(groupedArticles),
        })),
    }));
}
