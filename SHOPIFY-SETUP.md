# ＹＡＮÈＬＬＥ — Shopify: повний запуск

Тема вже зібрана в **`yanelle-shopify-theme.zip`**. Товари — у **`products-import.csv`** (або `shopify-theme/seed/products.csv`).

## Обовʼязкові кроки в Admin (без цього магазин буде «порожнім»)

### 1. Тема
1. **Online Store → Themes → Add theme → Upload zip** → `yanelle-shopify-theme.zip`
2. **Publish**

### 2. Прибрати пароль (або залишити фірмову сторінку)
**Online Store → Preferences** → вимкни **Password protection**,  
інакше відвідувачі бачать лише форму пароля (не головну).

### 3. Імпорт товарів (24 шт.)
**Products → Import** → `products-import.csv` → Confirm.

### 4. Колекції (Automated)
| Handle     | Умова                    |
|------------|--------------------------|
| `featured` | Product tag = `featured` |
| `limited`  | Product tag = `limited`  |
| `new`      | Product tag = `new`      |

(Колекція «All» зʼявляється автоматично.)

### 5. Сторінки + шаблони
Створи Pages з **точними** handles і в Theme editor обери template:

| Handle     | Template        |
|------------|-----------------|
| `about`    | `page.about`    |
| `lookbook` | `page.lookbook` |
| `contact`  | `page.contact`  |
| `shipping` | `page.shipping` |
| `wishlist` | `page.wishlist` |
| `terms`    | `page.terms`    |
| `privacy`  | `page.privacy`  |
| `cookies`  | `page.cookies`  |

Тексти можна не вставляти — у темі вже є UA-fallback.  
Готовий HTML: `shopify-theme/seed/pages-content.html`.

### 6. Theme settings
**Customize → Theme settings**: колекції `featured` / `limited` / `new`.  
У Header привʼяжи сторінки Lookbook / About / Contact / Wishlist.

---

Після цього на https://fi4015-au.myshopify.com/ будуть: головна (усі секції), каталог з фільтрами, PDP, кошик-drawer, wishlist, lookbook (12 looks), about/contact/shipping/legal, анімації та кнопки як у Next.js-референсі.

Checkout / Нова Пошта / COD — у **Shopify Admin + apps**, не в темі.
