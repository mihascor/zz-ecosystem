# Запретные знания

Локальный контентный сайт-блог внутри экосистемы `zz-ecosystem`.

## Технологии

- Astro
- TypeScript
- Tailwind CSS
- Markdown / MDX для будущих статей

## Запуск

Установить зависимости:

```bash
npm install
```

Запустить локальный сервер разработки:

```bash
npm run dev
```

Собрать проект:

```bash
npm run build
```

Предпросмотр production-сборки:

```bash
npm run preview
```

## Структура

- `src/pages/` — страницы сайта.
- `src/layouts/` — общие шаблоны страниц.
- `src/styles/` — глобальные стили.
- `src/content/articles/` — будущие Markdown/MDX-статьи.
- `public/images/articles/` — будущие изображения статей.

## Добавление статьи

Статьи хранятся в `src/content/articles/` в формате Markdown или MDX.

Обязательные поля frontmatter:

```md
---
title: "Название статьи"
slug: "nazvanie-stati"
order: 1
category: "Категория"
subcategory: "Подкатегория"
tags:
  - тег
cover: "/images/articles/cover.svg"
description: "Краткое описание статьи."
published: true
date: "2026-06-30"
---
```

Обложки статей хранить в `public/images/articles/`.
