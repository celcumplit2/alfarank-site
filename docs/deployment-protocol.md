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
npm run lead-env:prepare
npm run lead-env:sync -- --env-file .env --lead-env-file .env.lead.production.local
npm run qa:lead-production-status -- --cloudflare-env-file .env --lead-env-file .env.lead.production.local
npm run lead-env:checklist
npm run qa:lead-launch -- --cloudflare-env-file .env --lead-env-file .env.lead.production.local
npm run qa:lead-launch -- --cloudflare-env-file .env --lead-env-file .env.lead.production.local --summary-file artifacts/lead-launch-gate-summary.json
npm run qa:lead-env
npm run qa:lead-env -- --env-file .env.lead.production.local --summary-file artifacts/lead-production-env-summary.json
npm run qa:lead-d1
npm run qa:lead-analytics
npm run qa:lead-cloudflare -- --env-file .env
npm run qa:lead-cloudflare -- --env-file .env --summary-file artifacts/lead-cloudflare-summary.json
npm run qa:lead-flow:local
npm run qa:lead-flow:remote -- --base-url <preview-or-production-url>
npm run qa:lead-readiness
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

Миграции:

```text
migrations/0001_project_requests.sql
migrations/0002_project_request_intake_fields.sql
migrations/0003_project_request_tracking_fields.sql
migrations/0004_project_request_attribution_fields.sql
migrations/0005_project_request_routing_fields.sql
migrations/0006_project_request_lifecycle_fields.sql
migrations/0007_project_request_status_events.sql
migrations/0008_project_request_notification_events.sql
migrations/0009_project_request_form_variant.sql
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
- сохранение `locale`, `form_variant`, `lead_channel`, `partner_ref`, UTM и source context;
- сохранение `lead_score`, `lead_priority`, `routing_bucket`, `next_action`.
- обновление статуса через `POST /api/lead-status`, если настроен
  `LEAD_REPORT_TOKEN`.
- запись lifecycle status event в `project_request_status_events` и наличие
  `status_events` в `/api/lead-report`.
- optional lifecycle notification `project_request.status_updated` reaches the
  configured webhook or Telegram channel after `POST /api/lead-status`; failed
  delivery must not roll back the saved D1 status update.
- notification delivery attempts are written to
  `project_request_notification_events` and appear as `notification_events` in
  `/api/lead-report`.
- CSV-выгрузка через `GET /api/lead-export`, если настроен
  `LEAD_REPORT_TOKEN`; для партнерских проверок использовать фильтр
  `partner_ref` или `form_variant`.
- внутренняя страница `/lead-desk/` загружается, закрыта `noindex` и работает
  с отчетом, UTM breakdown, partner/ref breakdown, first-response SLA,
  статусами и CSV export через `LEAD_REPORT_TOKEN`; фильтры отчета и CSV по
  status/channel/priority, bucket, offer, form_variant и partner_ref возвращают ожидаемые
  очереди.
- если включен Turnstile, форма содержит `cf-turnstile-response`, а
  `/api/start-project` отклоняет запросы без валидной проверки.
- `npm run qa:lead-env` проходит с production-переменными в окружении: проверены
  `LEAD_REPORT_TOKEN`, канал уведомлений, быстрые контакты, аналитика и
  согласованность Turnstile-ключей. Команда печатает readiness map только с
  именами переменных и статусами, без значений секретов.
- По умолчанию `qa:lead-env` также пишет JSON blocker report без секретов в
  `artifacts/lead-production-env-summary.json`: readiness-статусы, заполненные
  имена переменных, placeholder-поля, `next_required_inputs`, warnings и
  failures. Для handoff можно указать `--summary-file <path>`, для запуска без
  файла — `--no-summary`.
- `npm run qa:lead-d1` проверяет remote D1 migration/schema readiness без
  секретов: локальные migration files, отсутствие pending remote migrations,
  таблицы `project_requests`, `project_request_status_events`,
  `project_request_notification_events` и ключевые lead columns. По умолчанию
  пишет `artifacts/lead-d1-migrations-summary.json`.
- `npm run lead-env:prepare` создает локальный ignored-файл
  `.env.lead.production.local` с сильным `LEAD_REPORT_TOKEN`; реальные
  уведомления, быстрые контакты, аналитика и Turnstile заполняются явно.
- `npm run lead-env:sync -- --env-file .env --lead-env-file
  .env.lead.production.local` dry-run проверяет заполненный lead env и готовит
  Cloudflare Pages update без вывода значений; `--apply` используется только
  после проверки имен и типов. После `--apply` команда перечитывает Pages
  project и сверяет, что имена переменных появились с ожидаемыми типами.
- По умолчанию `lead-env:sync` пишет no-secret summary в
  `artifacts/lead-env-sync-summary.json`: planned variable names/types, current
  visible env names, hidden current secret names by name и post-apply check
  status.
- `npm run qa:lead-launch -- --cloudflare-env-file .env --lead-env-file
  .env.lead.production.local` в режиме `pre-apply` собирает запуск
  лидогенерации в один gate: build/readiness, analytics audit, TypeScript,
  Astro, production env preflight, Cloudflare sync dry-run, Cloudflare Pages/D1
  audit и локальный Pages smoke. После `--apply` и deploy запускать с
  `--phase live --base-url <preview-or-production-url>`, чтобы gate требовал
  strict Cloudflare env audit и remote report/status/export smoke.
- Gate по умолчанию пишет JSON-резюме без секретов в
  `artifacts/lead-launch-gate-summary.json`: фаза, env-файлы по именам,
  remote URL, список шагов, статусы и итог. Для handoff можно указать
  `--summary-file <path>`, а для запуска без артефакта — `--no-summary`.
- `npm run qa:lead-production-status -- --cloudflare-env-file .env --lead-env-file
  .env.lead.production.local` пишет единый no-secret go/no-go artifact в
  `artifacts/lead-production-status.json`: локальный production env,
  Cloudflare Pages readiness, remote D1 migration/schema audit, launch-gate
  dry-run, blockers и next actions. Команда завершается ненулевым кодом, пока
  production lead-generation launch остается заблокирован.
- `npm run lead-env:checklist` превращает текущий
  `artifacts/lead-production-status.json` в no-secret markdown checklist
  `artifacts/lead-production-checklist.md`: production inputs, sync commands,
  strict Cloudflare check, live gate and the final partner-program stage.
- `npm run qa:lead-analytics` проверяет event layer, conversion context,
  thank-you tracking, form attribution fields и vendor forwarding hooks до
  подключения финального аналитического кабинета.
- `npm run qa:lead-cloudflare -- --env-file .env` проходит против Cloudflare
  Pages: проект, домены, latest production deploy, D1 binding `DB` и имена
  production lead env variables проверены без вывода значений.
- По умолчанию Cloudflare audit пишет JSON summary без секретов в
  `artifacts/lead-cloudflare-summary.json`: domains, latest deployment,
  D1 bindings, visible env names и readiness по lead env names.
- `npm run qa:lead-flow:remote` против preview/production URL. Команда требует
  `LEAD_REPORT_TOKEN`, запускает production env preflight и не допускает
  "слепой" smoke без проверки report/status/export.
- `npm run qa:lead-flow` можно использовать как низкоуровневый smoke с
  `LEAD_SMOKE_BASE_URL`; для preview/production handoff предпочтительнее
  строгий wrapper `qa:lead-flow:remote`.
- `npm run qa:lead-flow:local` до preview/prod smoke, чтобы одной командой
  проверить локальный Pages runtime, D1 insert, report, status update, webhook
  delivery, notification event history и CSV export.
- `npm run qa:lead-readiness` после сборки, чтобы проверить формы,
  attribution hidden fields, partner-program, sitemap, Lead Desk, API endpoints,
  migrations и документацию.

## 8. Текущий статус

На момент фиксации протокола:

- GitHub repository создан: `https://github.com/celcumplit2/alfarank-site`;
- Cloudflare Pages project создан: `alfarank-site`;
- production URL: `https://alfarank-site.pages.dev/`;
- static deploy проходит успешно;
- Cloudflare Pages Function `/api/start-project` работает;
- D1 database создана: `alfarank-project-requests`;
- D1 binding `DB` включен в `wrangler.toml`;
- migrations `0001`-`0009` применены на remote D1, including notification
  delivery audit and form variant tracking;
- remote `project_requests` содержит поля расширенной атрибуции и
  маршрутизации: `locale`, `form_variant`, `lead_channel`, `partner_ref`, `lead_score`,
  `lead_priority`, `routing_bucket`, `next_action`, а также lifecycle-поля
  `lead_owner`, `lead_follow_up_note`, `lead_status_updated_at`;
- production-форма проверена: POST возвращает redirect на
  `/start-project/thank-you/`, запись создается в D1.

## 9. Завершение production-настройки

Выполнено после появления D1-доступа:

1. Создать D1 database `alfarank-project-requests`.
2. Добавить binding `DB` в Cloudflare Pages.
3. Добавить реальный `database_id` в `wrangler.toml`.
4. Применить все D1 migrations.
5. Сделать новый commit и push.
6. Проверить отправку формы и запись в D1.

## 10. Следующие обязательные задачи

- подключить основной домен `AlfaRank.com`;
- добавить `robots.txt`;
- добавить `sitemap.xml`;
- добавить Open Graph metadata/images;
- задеплоить обновленную Pages Function после уже примененных migrations
  `0007_project_request_status_events.sql` и
  `0008_project_request_notification_events.sql`;
- настроить `LEAD_WEBHOOK_URL` / `LEAD_WEBHOOK_TOKEN` или
  `LEAD_TELEGRAM_BOT_TOKEN` / `LEAD_TELEGRAM_CHAT_ID` для уведомлений о новых
  заявках; `LEAD_TELEGRAM_MESSAGE_THREAD_ID` можно задать для Telegram topics;
  the same destinations receive `project_request.status_updated` lifecycle
  events from `/api/lead-status`.
- настроить `LEAD_REPORT_TOKEN`, если нужен защищенный JSON-отчет по лидам на
  `/api/lead-report`, CSV export `/api/lead-export` и lifecycle endpoint
  `/api/lead-status`; этот же токен использует внутренняя страница
  `/lead-desk/`; отчет и Lead Desk показывают pipeline conversion totals
  (`active`, `contacted`, `qualified+`, `won/lost`) и lifecycle
  `status_events` для контроля обработки лидов после запуска трафика;
- настроить `PUBLIC_TURNSTILE_SITE_KEY` и `TURNSTILE_SECRET_KEY`, если нужно
  включить Cloudflare Turnstile на публичных формах; для автоматического smoke
  POST можно передать `LEAD_SMOKE_TURNSTILE_TOKEN` в preview/test окружении;
- выбрать и включить production-аналитику через build variables:
  `PUBLIC_GTM_ID`, `PUBLIC_GA_ID` или `PUBLIC_PLAUSIBLE_DOMAIN`;
- задать быстрые контактные каналы через build variables, если они должны
  отображаться на сайте: `PUBLIC_CONTACT_EMAIL`,
  `PUBLIC_CONTACT_TELEGRAM_URL`, `PUBLIC_CONTACT_WHATSAPP_URL`.
- запускать `npm run qa:lead-env` после задания production-переменных; команда
  не выводит секреты, но валидирует, что прием, уведомления, аналитика и
  быстрые контакты готовы к запуску трафика.
- держать `npm run qa:lead-readiness` в pre-launch checklist; для строгой
  production-среды можно запускать с `LEAD_AUDIT_REQUIRE_ENV=1`, чтобы missing
  production env считались ошибкой.
