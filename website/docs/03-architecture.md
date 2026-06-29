# Architecture

## Общий подход

Проект реализуется как локальный статический контентный сайт на Astro.

Сайт должен быть самостоятельным проектом внутри `zz-ecosystem/website` и не зависеть от будущих сервисов экосистемы.

## Рекомендуемый стек

| Задача | Технология |
| --- | --- |
| Фреймворк | Astro |
| Язык | TypeScript |
| Контент | Markdown / MDX |
| Стили | Tailwind CSS |
| Темы | CSS variables + class-based theme switching |
| Сборка | Astro build |
| Локальная разработка | Astro dev server |
| Пакетный менеджер | npm |
| Хранение контента | локальные файлы в проекте |
| Версионирование | Git |

## Причина выбора Astro

Astro выбран для контентного сайта, потому что:

- хорошо работает со статьями;
- поддерживает Markdown и MDX;
- позволяет генерировать быстрые статические страницы;
- не требует сложной серверной инфраструктуры;
- подходит для локальной сборки;
- позволяет добавлять интерактивность только в нужных местах.

## Структура проекта

Рекомендуемая структура:

```text
website/
├─ public/
│  ├─ favicon.svg
│  ├─ favicon.png
│  ├─ robots.txt
│  └─ images/
│
├─ src/
│  ├─ assets/
│  │  └─ images/
│  │
│  ├─ components/
│  │  ├─ Header.astro
│  │  ├─ Sidebar.astro
│  │  ├─ SidebarToggle.astro
│  │  ├─ ThemeToggle.astro
│  │  ├─ ArticleCard.astro
│  │  ├─ ArticleNavigation.astro
│  │  ├─ Breadcrumbs.astro
│  │  ├─ TagList.astro
│  │  └─ CategoryTree.astro
│  │
│  ├─ content/
│  │  ├─ config.ts
│  │  └─ articles/
│  │     ├─ 001-vvedenie.md
│  │     ├─ 002-glava-1.md
│  │     └─ 003-glava-2.md
│  │
│  ├─ layouts/
│  │  ├─ BaseLayout.astro
│  │  ├─ ArticleLayout.astro
│  │  └─ CategoryLayout.astro
│  │
│  ├─ pages/
│  │  ├─ index.astro
│  │  ├─ articles/
│  │  │  ├─ index.astro
│  │  │  └─ [slug].astro
│  │  ├─ categories/
│  │  │  └─ [category].astro
│  │  ├─ subcategories/
│  │  │  └─ [subcategory].astro
│  │  └─ tags/
│  │     └─ [tag].astro
│  │
│  ├─ scripts/
│  │  ├─ theme.ts
│  │  └─ sidebar.ts
│  │
│  ├─ styles/
│  │  └─ global.css
│  │
│  └─ utils/
│     ├─ articles.ts
│     ├─ categories.ts
│     ├─ tags.ts
│     └─ navigation.ts
│
├─ astro.config.mjs
├─ package.json
├─ tsconfig.json
├─ tailwind.config.mjs
└─ README.md
```

## Основные модули

- `src/content/articles/` хранит статьи.
- `src/content/config.ts` описывает схему контента.
- `src/utils/articles.ts` отвечает за получение и фильтрацию статей.
- `src/utils/categories.ts` отвечает за группировку по категориям и подкатегориям.
- `src/utils/tags.ts` отвечает за работу с тегами.
- `src/utils/navigation.ts` отвечает за порядок чтения и предыдущую/следующую статью.
- `src/components/Sidebar.astro` и `CategoryTree.astro` отвечают за левую навигацию.
- `src/scripts/theme.ts` отвечает за тему и `localStorage`.
- `src/scripts/sidebar.ts` отвечает за состояние сайдбара и `localStorage`.

## Клиентское состояние

На клиенте хранится только UI-состояние:

- выбранная тема;
- состояние сайдбара.

Для хранения используется `localStorage`.

## Ограничения

- Не добавлять серверную часть на текущем этапе.
- Не добавлять админ-панель.
- Не подключать внешние AI/RAG-сервисы.
- Не добавлять тяжёлые зависимости без отдельного решения.
