# fido-diff for ALFA

Это локальный wrapper для FIDO `fido-diff`.

## Что уже перенесено

- `alfa-fido-diff.json` - config для проекта `D:\ALFA`.
- `run.cmd` / `run.ps1` - запуск без копирования всего FIDO.
- Output настроен в `D:\ALFA\artifacts\fido-diff`.

## Что нужно для реального diff

FIDO сравнивает сайт не с произвольной картинкой, а с Figma source bundle:

- JSON: `D:\ALFA\docs\figma-parity\templates\json\*.json`
- PNG references: `D:\ALFA\docs\figma-parity\templates\assets\*.png`

Имена в config должны совпадать:

- `desktopSlug`: `home-desktop-light`
- JSON: `docs/figma-parity/templates/json/home-desktop-light.json`
- PNG: `docs/figma-parity/templates/assets/home-desktop-light.png`

## Как запускать

1. Поднять ALFA:

```powershell
cd D:\ALFA
npm run dev
```

2. В другом терминале запустить diff:

```powershell
cd D:\ALFA
npm run fido:diff
```

или напрямую:

```powershell
D:\ALFA\tools\fido-diff\run.cmd --limit 90
```

Один маршрут:

```powershell
D:\ALFA\tools\fido-diff\run.cmd --route / --limit 40
```

## Где отчет

- HTML: `D:\ALFA\artifacts\fido-diff\index.html`
- MD: `D:\ALFA\artifacts\fido-diff\fido-diff.md`
- JSON: `D:\ALFA\artifacts\fido-diff\fido-diff.json`

## Правило blockers

По умолчанию не считаются page-specific blockers:

- `FAQ`
- `Footer`
- `Navigation bar`
- `Navigation bar - Desktop`

Порог blockers: `15 d8`, меняется в `fidoDiff.thresholdDelta8`.
