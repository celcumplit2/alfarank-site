# Deployment Protocol

Рабочий протокол публикации AlfaRank.com из локального проекта в GitHub и
Cloudflare Pages.

Секреты нельзя коммитить в Git, выводить в терминал или фиксировать в
документации.

## Цель

Развернуть корпоративный сайт AlfaRank как статический Astro-проект с
Cloudflare Pages Functions для обработки формы заявки.

Целевая связка:

- локальная разработка: `Astro`;
- репозиторий: `GitHub`;
- хостинг: `Cloudflare Pages`;
- функция формы: `Cloudflare Pages Function`;
- хранение заявок: `Cloudflare D1`;
- production branch: `main`;
- build command: `npm run build`;
- output directory: `dist`.

## 1. Проверка окружения

- Проверить наличие `.env`.
- Проверить, что есть GitHub token.
- Проверить, что есть Cloudflare account ID.
- Проверить, что есть Cloudflare API token.
- Не печатать значения токенов.
- Проверять только факт наличия переменных и права доступа через API.

Ожидаемые переменные:

```text
GIT_HUB_TOKEN
CLOUDFLARE_ACCOUNT_ID
CLOUDFLARE_API_TOKEN_STREAM
```

Если Cloudflare token используется не только для Stream, он должен иметь права:

- Cloudflare Pages: edit;
- D1: edit;
- Account: read.

## 2. Проверка проекта

Перед публикацией:

```bash
npm install
npm run build
npx astro check
```

Проверить, что `.gitignore` исключает:

- `.env`;
- `.env.*`;
- `node_modules`;
- `dist`;
- `.astro`;
- логи и локальные кеши.

## 3. GitHub

Если репозиторий еще не создан:

```bash
git init
git branch -M main
git add .
git commit -m "Initial AlfaRank site"
```

Дальше создать репозиторий через GitHub API или GitHub CLI.

Рекомендуемые параметры:

- repository: `alfarank-site`;
- visibility: private или public по решению владельца;
- default branch: `main`.

После создания:

```bash
git remote add origin https://github.com/celcumplit2/alfarank-site.git
git push -u origin main
```

При push использовать токен только как временный HTTP-заголовок, не сохранять
его в remote URL.

## 4. Cloudflare Pages

Создать Pages project и связать его с GitHub repository.

Параметры проекта:

```text
Project name: alfarank-site
Production branch: main
Build command: npm run build
Build output directory: dist
Node.js version: 22.12+
```

В `wrangler.toml` обязательная базовая конфигурация:

```toml
name = "alfarank-site"
compatibility_date = "2026-05-22"
pages_build_output_dir = "dist"
```

## 5. Cloudflare D1

D1 нужна для формы `/start-project/`.

Создать базу:

```bash
npx wrangler d1 create alfarank-project-requests
```

После создания добавить реальный `database_id` в `wrangler.toml`:

```toml
[[d1_databases]]
binding = "DB"
database_name = "alfarank-project-requests"
database_id = "<real database id>"
```

Применить миграцию:

```bash
npx wrangler d1 migrations apply alfarank-project-requests
```

Важно: не добавлять placeholder `database_id`. Cloudflare Pages падает на
deploy stage, если binding указывает на несуществующую D1-базу.

## 6. Form Function

Форма отправляет данные сюда:

```text
POST /api/start-project
```

Функция:

```text
functions/api/start-project.ts
```

Миграция:

```text
migrations/0001_project_requests.sql
```

Обязательный binding в Cloudflare Pages:

```text
DB
```

Без binding `DB` production-функция должна вернуть ошибку конфигурации, а не
терять заявку молча.

## 7. Первый deploy

После GitHub push Cloudflare Pages должен запустить production deploy.

Проверить:

- `/`;
- `/capabilities/ai-automation/`;
- `/solutions/generate-more-content/`;
- `/systems/content-automation-workflows/`;
- `/start-project/`;
- `/start-project/thank-you/`;
- `POST /api/start-project`;
- появление записи в D1.

## 8. Текущий статус

На момент фиксации протокола:

- GitHub repository создан: `https://github.com/celcumplit2/alfarank-site`;
- Cloudflare Pages project создан: `alfarank-site`;
- production URL: `https://alfarank-site.pages.dev/`;
- static deploy проходит успешно;
- Cloudflare Pages Function `/api/start-project` работает;
- D1 database создана: `alfarank-project-requests`;
- D1 binding `DB` включен в `wrangler.toml`;
- migration `0001_project_requests.sql` применена на remote D1;
- production-форма проверена: POST возвращает redirect на
  `/start-project/thank-you/`, запись создается в D1.

## 9. Завершение production-настройки

Выполнено после появления D1-доступа:

1. Создать D1 database `alfarank-project-requests`.
2. Добавить binding `DB` в Cloudflare Pages.
3. Добавить реальный `database_id` в `wrangler.toml`.
4. Применить `migrations/0001_project_requests.sql`.
5. Сделать новый commit и push.
6. Проверить отправку формы и запись в D1.

## 10. Следующие обязательные задачи

- подключить основной домен `AlfaRank.com`;
- добавить `robots.txt`;
- добавить `sitemap.xml`;
- добавить Open Graph metadata/images;
- настроить уведомления о новых заявках, если они нужны кроме хранения в D1.
