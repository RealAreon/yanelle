# ＹＡＮÈＬＬＥ — Shopify Liquid Theme

Нативна тема Online Store 2.0 з візуалом референсного Next.js-сайту.  
Папка `shopify-theme/` — єдине джерело вітрини для Shopify.

## Чеклист налаштування / Setup checklist

### 1. Завантаження теми / Upload theme

- Упакуй **вміст** папки `shopify-theme` у ZIP (у корені архіву одразу `layout/`, `assets/`, `templates/`…).
- **Не включай** у ZIP папки `seed/` і файл `README.md` — Shopify їх відхилить. Готовий архів: `yanelle-shopify-theme.zip` у корені проєкту.
- CSV товарів і HTML текстів сторінок: `shopify-theme/seed/` (або копія `shopify-seed/`).

  PowerShell (чистий zip без seed):

  ```powershell
  $dirs = "assets","config","layout","locales","sections","snippets","templates"
  $staging = "$env:TEMP\yanelle-theme-zip"
  Remove-Item $staging -Recurse -Force -ErrorAction SilentlyContinue
  New-Item -ItemType Directory $staging | Out-Null
  foreach ($d in $dirs) { Copy-Item "shopify-theme\$d" "$staging\$d" -Recurse }
  Compress-Archive -Path "$staging\*" -DestinationPath "yanelle-shopify-theme.zip" -Force
  ```

- **Shopify Admin → Online Store → Themes → Add theme → Upload zip file**
- Натисни **Publish** на завантаженій темі.

### 2. Доступ до магазину / Store access

- **Online Store → Preferences**: вимкни пароль магазину для публічного доступу  
  **або** залиш password page — тоді перевір вигляд на `/password`.

### 3. Товари / Products

- **Products → Import** → файл `shopify-theme/seed/products.csv`  
  (або додай товари вручну з тегами `new`, `sale`, `limited`, `featured` за потреби).

### 4. Колекції / Collections

Створи колекції з handles:

| Handle     | Тип        | Умова                          |
|------------|------------|--------------------------------|
| `all`      | Automated  | Усі товари                     |
| `limited`  | Automated  | Tag equals `limited`           |
| `new`      | Automated  | Tag equals `new`               |
| `featured` | Automated  | Tag equals `featured`          |

Каталог на головній і в меню зазвичай веде на `all` або стандартну колекцію «All products».

### 5. Сторінки / Pages

Створи сторінки з **точними handles** і признач шаблони теми:

| Handle     | Template (theme) | Призначення              |
|------------|------------------|--------------------------|
| `about`    | `page.about`     | Про бренд                |
| `lookbook` | `page.lookbook`  | Lookbook                 |
| `contact`  | `page.contact`   | Контакти                 |
| `shipping` | `page.shipping`  | Доставка та повернення   |
| `wishlist` | `page.wishlist`  | Список бажаного          |
| `terms`    | `page.terms`     | Політика використання    |
| `privacy`  | `page.privacy`   | Конфіденційність         |
| `cookies`  | `page.cookies`   | Куки-файли               |

Тексти UA можна вставити з `shopify-theme/seed/pages-content.html`. Якщо контент сторінки порожній, тема покаже запасні тексти в Liquid.

### 6. Налаштування теми / Theme settings

- **Customize → Theme settings**: handles колекцій `featured`, `limited`, `new` (якщо відрізняються від дефолту).
- Соцмережі та email у settings теми (Instagram, Telegram, WhatsApp, email).
- Сторінка **Lookbook**: у секції Page додай блоки «Lookbook image», за потреби URL зображень і «Wide column span».

### 7. Мова та валюта / Markets (optional)

- Локалі: `locales/en.default.json`, `locales/uk.json`.
- Додаткові мови та валюти — через **Markets** у Shopify Admin.

## Checkout і доставка

Оплата, Nova Poshta, COD та checkout налаштовуються в **Shopify Admin** і додатках — не в Liquid-темі.

## Референс Next.js

Папка `src/` у корені проєкту — дизайн-референс; для Shopify використовується лише `shopify-theme/`.
