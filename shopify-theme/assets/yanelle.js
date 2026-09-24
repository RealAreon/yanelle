(function () {
  const Yanelle = window.Yanelle || {};

  function qs(sel, root) {
    return (root || document).querySelector(sel);
  }
  function qsa(sel, root) {
    return Array.from((root || document).querySelectorAll(sel));
  }

  function formatMoney(cents) {
    if (window.Shopify && Shopify.formatMoney) {
      return Shopify.formatMoney(cents, Yanelle.moneyFormat);
    }
    return (cents / 100).toFixed(2);
  }

  /* Fade-in */
  function initFadeIn() {
    const nodes = qsa(".fade-in");
    if (!nodes.length) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      nodes.forEach((n) => n.classList.add("is-visible"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    nodes.forEach((n) => io.observe(n));
  }

  /* Overlay */
  const overlay = qs("[data-drawer-overlay]");
  function setOverlay(open) {
    if (!overlay) return;
    if (open) {
      overlay.hidden = false;
      requestAnimationFrame(() => overlay.classList.add("is-open"));
    } else {
      overlay.classList.remove("is-open");
      setTimeout(() => {
        overlay.hidden = true;
      }, 400);
    }
  }

  /* Mobile nav */
  function initMobileNav() {
    const nav = qs("[data-mobile-nav]");
    const openBtn = qs("[data-mobile-nav-open]");
    const closeBtns = qsa("[data-mobile-nav-close]");
    if (!nav || !openBtn) return;

    function open() {
      nav.classList.add("is-open");
      setOverlay(true);
      document.body.style.overflow = "hidden";
    }
    function close() {
      nav.classList.remove("is-open");
      if (!qs(".cart-drawer.is-open")) {
        setOverlay(false);
        document.body.style.overflow = "";
      }
    }
    openBtn.addEventListener("click", open);
    closeBtns.forEach((b) => b.addEventListener("click", close));
    nav.querySelectorAll("a").forEach((a) => a.addEventListener("click", close));
  }

  /* Cart drawer */
  function initCartDrawer() {
    const drawer = qs("[data-cart-drawer]");
    if (!drawer) return;
    const openers = qsa("[data-cart-open]");
    const closers = qsa("[data-cart-close]");

    function open() {
      drawer.classList.add("is-open");
      setOverlay(true);
      document.body.style.overflow = "hidden";
      refreshCart();
    }
    function close() {
      drawer.classList.remove("is-open");
      if (!qs(".mobile-nav.is-open")) {
        setOverlay(false);
        document.body.style.overflow = "";
      }
    }

    openers.forEach((el) => el.addEventListener("click", (e) => {
      e.preventDefault();
      open();
    }));
    closers.forEach((el) => el.addEventListener("click", close));
    if (overlay) {
      overlay.addEventListener("click", () => {
        close();
        const nav = qs("[data-mobile-nav]");
        if (nav) nav.classList.remove("is-open");
      });
    }

    window.YanelleCart = { open, close, refresh: refreshCart };
  }

  async function refreshCart() {
    const res = await fetch(Yanelle.routes.cart_url + ".js");
    const cart = await res.json();
    updateCartCount(cart.item_count);
    renderCartDrawer(cart);
  }

  function updateCartCount(count) {
    qsa("[data-cart-count]").forEach((el) => {
      el.textContent = String(count);
      el.hidden = count < 1;
    });
  }

  function renderCartDrawer(cart) {
    const body = qs("[data-cart-drawer-body]");
    const footer = qs("[data-cart-drawer-footer]");
    const subtotal = qs("[data-cart-subtotal]");
    if (!body) return;

    if (!cart.items.length) {
      body.innerHTML =
        '<div class="cart-drawer__empty"><h3 class="font-heading">' +
        (Yanelle.strings.cartEmpty || "Empty") +
        '</h3><a class="btn btn--ghost" href="/collections/all" data-cart-close>Shop</a></div>';
      if (footer) footer.hidden = true;
      return;
    }

    if (footer) footer.hidden = false;
    if (subtotal) subtotal.textContent = formatMoney(cart.total_price);

    body.innerHTML = cart.items
      .map((item) => {
        return (
          '<div class="cart-line" data-key="' +
          item.key +
          '">' +
          '<div class="cart-line__media"><img src="' +
          (item.image || "") +
          '" alt=""></div>' +
          '<div class="cart-line__info">' +
          '<a class="cart-line__title" href="' +
          item.url +
          '">' +
          item.product_title +
          "</a>" +
          '<p class="cart-line__meta">' +
          (item.variant_title || "") +
          "</p>" +
          '<p class="cart-line__price">' +
          formatMoney(item.final_line_price) +
          "</p>" +
          '<div class="cart-line__qty">' +
          '<button type="button" class="qty-btn" data-qty-change="-1" aria-label="Decrease">−</button>' +
          '<span style="width:2.25rem;text-align:center">' +
          item.quantity +
          "</span>" +
          '<button type="button" class="qty-btn" data-qty-change="1" aria-label="Increase">+</button>' +
          '<button type="button" class="qty-btn" data-qty-remove style="margin-left:auto" aria-label="Remove">×</button>' +
          "</div></div></div>"
        );
      })
      .join("");

    body.querySelectorAll(".cart-line").forEach((line) => {
      const key = line.getAttribute("data-key");
      const qtyEl = line.querySelector("span");
      line.querySelectorAll("[data-qty-change]").forEach((btn) => {
        btn.addEventListener("click", async () => {
          const delta = Number(btn.getAttribute("data-qty-change"));
          const next = Number(qtyEl.textContent) + delta;
          await changeLine(key, Math.max(0, next));
        });
      });
      const remove = line.querySelector("[data-qty-remove]");
      if (remove) {
        remove.addEventListener("click", () => changeLine(key, 0));
      }
    });
  }

  async function changeLine(key, quantity) {
    await fetch(Yanelle.routes.cart_change_url + ".js", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ id: key, quantity }),
    });
    await refreshCart();
  }

  /* Add to cart forms */
  function initProductForms() {
    qsa("form[data-product-form]").forEach((form) => {
      form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const fd = new FormData(form);
        const id = fd.get("id");
        const quantity = fd.get("quantity") || 1;
        await fetch(Yanelle.routes.cart_add_url + ".js", {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({ id: Number(id), quantity: Number(quantity) }),
        });
        if (window.YanelleCart) window.YanelleCart.open();
        else await refreshCart();
      });
    });
  }

  /* Wishlist localStorage */
  const WISH_KEY = "yanelle_wishlist";
  function getWish() {
    try {
      return JSON.parse(localStorage.getItem(WISH_KEY) || "[]");
    } catch (e) {
      return [];
    }
  }
  function setWish(ids) {
    localStorage.setItem(WISH_KEY, JSON.stringify(ids));
    updateWishUI();
  }
  function updateWishUI() {
    const ids = getWish();
    qsa("[data-wishlist-toggle]").forEach((btn) => {
      const id = btn.getAttribute("data-wishlist-toggle");
      btn.classList.toggle("is-active", ids.includes(id));
      btn.setAttribute("aria-pressed", ids.includes(id) ? "true" : "false");
    });
    const countEl = qs("[data-wishlist-count]");
    if (countEl) {
      countEl.textContent = String(ids.length);
      countEl.hidden = ids.length < 1;
    }
  }
  function initWishlist() {
    qsa("[data-wishlist-toggle]").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        const id = btn.getAttribute("data-wishlist-toggle");
        let ids = getWish();
        if (ids.includes(id)) ids = ids.filter((x) => x !== id);
        else ids.push(id);
        setWish(ids);
      });
    });
    updateWishUI();
  }

  /* Gallery thumbs */
  function initGallery() {
    const main = qs("[data-gallery-main]");
    if (!main) return;
    qsa("[data-gallery-thumb]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const src = btn.getAttribute("data-gallery-thumb");
        main.src = src;
        qsa("[data-gallery-thumb]").forEach((b) => b.classList.remove("is-active"));
        btn.classList.add("is-active");
      });
    });
  }

  /* Catalog filters */
  function initCatalog() {
    const root = qs("[data-catalog]");
    if (!root) return;
    const items = qsa("[data-catalog-item]", root);
    const search = qs("[data-catalog-search]", root);
    const category = qs("[data-catalog-category]", root);
    const tag = qs("[data-catalog-tag]", root);
    const sort = qs("[data-catalog-sort]", root);
    const countEl = qs("[data-catalog-count]", root);
    const grid = qs("[data-catalog-grid]", root);

    // populate categories from items
    if (category) {
      const types = [...new Set(items.map((i) => i.getAttribute("data-type")).filter(Boolean))];
      types.forEach((t) => {
        if (![...category.options].some((o) => o.value === t)) {
          const opt = document.createElement("option");
          opt.value = t;
          opt.textContent = t;
          category.appendChild(opt);
        }
      });
    }

    function apply() {
      const q = (search?.value || "").trim().toLowerCase();
      const cat = category?.value || "";
      const tg = tag?.value || "";
      let visible = items.filter((item) => {
        const title = item.getAttribute("data-title") || "";
        const type = item.getAttribute("data-type") || "";
        const tags = item.getAttribute("data-tags") || "";
        const okQ = !q || title.includes(q);
        const okC = !cat || type === cat;
        const okT = !tg || tags.split(",").map((x) => x.trim()).includes(tg);
        const show = okQ && okC && okT;
        item.classList.toggle("catalog-item-hidden", !show);
        return show;
      });

      const mode = sort?.value || "newest";
      visible = visible.slice().sort((a, b) => {
        const pa = Number(a.getAttribute("data-price") || 0);
        const pb = Number(b.getAttribute("data-price") || 0);
        if (mode === "price-asc") return pa - pb;
        if (mode === "price-desc") return pb - pa;
        return Number(b.getAttribute("data-new") || 0) - Number(a.getAttribute("data-new") || 0);
      });
      visible.forEach((el) => grid.appendChild(el));
      if (countEl) {
        const suffix = document.documentElement.lang === "uk" ? " речей" : " pieces";
        countEl.textContent = visible.length + suffix;
      }
    }

    [search, category, tag, sort].forEach((el) => {
      if (!el) return;
      el.addEventListener("input", apply);
      el.addEventListener("change", apply);
    });
    apply();
  }

  /* Wishlist page render via products.json */
  async function initWishlistPage() {
    const root = qs("[data-wishlist-page]");
    if (!root) return;
    const grid = qs("[data-wishlist-grid]", root);
    const empty = qs("[data-wishlist-empty]", root);
    const handles = getWish();
    if (!handles.length) {
      if (empty) empty.hidden = false;
      return;
    }
    try {
      const res = await fetch("/collections/all/products.json?limit=250");
      const data = await res.json();
      const products = (data.products || []).filter((p) => handles.includes(p.handle));
      if (!products.length) {
        if (empty) empty.hidden = false;
        return;
      }
      if (empty) empty.hidden = true;
      const heart =
        '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1.5"><path d="M19 14c1.5-1.4 3-3.1 3-5.3A4.7 4.7 0 0 0 12 6a4.7 4.7 0 0 0-10 2.7c0 2.2 1.5 3.9 3 5.3l7 6.6Z"/></svg>';
      grid.innerHTML = products
        .map((p) => {
          const img = p.images?.[0]?.src || "";
          const price = p.variants?.[0]?.price || "0";
          const title = String(p.title || "").replace(/"/g, "&quot;");
          return (
            '<article class="product-card">' +
            '<a class="product-card__media" href="/products/' +
            p.handle +
            '">' +
            (img ? '<img src="' + img + '" alt="' + title + '" loading="lazy">' : "") +
            "</a>" +
            '<button type="button" class="product-card__wish is-active" data-wishlist-toggle="' +
            p.handle +
            '" aria-pressed="true">' +
            heart +
            "</button>" +
            '<div class="product-card__meta"><div>' +
            '<a class="product-card__title" href="/products/' +
            p.handle +
            '">' +
            p.title +
            "</a>" +
            '<p class="product-card__type">' +
            (p.product_type || "") +
            "</p></div>" +
            '<div class="product-card__price"><span class="price">' +
            price +
            "</span></div></div></article>"
          );
        })
        .join("");
      initWishlist();
    } catch (e) {
      if (empty) empty.hidden = false;
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    initFadeIn();
    initMobileNav();
    initCartDrawer();
    initProductForms();
    initWishlist();
    initGallery();
    initCatalog();
    initWishlistPage();
    refreshCart().catch(() => {});
  });
})();
