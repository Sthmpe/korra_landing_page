'use client';

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';

import { Search, Bag, Sliders, Close } from './Icons';
import DealCountdown from './DealCountdown';
import ProductModal from './ProductModal';
import CartModal from './CartModal';
import * as cart from '@/lib/cart';

// Max items shown in the Flash Deals / Featured rails before "View all".
const STRIP_MAX = 6;

function naira(n) {
  return `₦${Number(n || 0).toLocaleString('en-NG', { maximumFractionDigits: 0 })}`;
}
function priceOf(p) {
  const d = Number(p.discountedPrice || 0);
  return d > 0 ? d : Number(p.price || 0);
}

function buildDealMap(deals) {
  const map = new Map();
  const now = Date.now();
  for (const d of deals || []) {
    for (const pid of d.productIds || []) {
      const existing = map.get(pid);
      const running = now >= d.startAt && now < d.endAt;
      if (!existing) map.set(pid, d);
      else {
        const exRunning = now >= existing.startAt && now < existing.endAt;
        if (running && !exRunning) map.set(pid, d);
      }
    }
  }
  return map;
}

export default function Storefront({
  slug,
  store,
  deals,
  initial,
  initialCursor,
  initialProductId,
  initialProductData,
}) {
  const [products, setProducts] = useState(initial);
  const [cursor, setCursor] = useState(initialCursor);
  const [loading, setLoading] = useState(false);

  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState('none');
  const [dealsOnly, setDealsOnly] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);

  // Deep-linked product (from /store/[slug]/p/[productId]): open its modal
  // immediately, using the paginated list copy if it's already loaded there,
  // otherwise the single-product payload the page fetched for metadata.
  const [modalProduct, setModalProduct] = useState(() => {
    if (!initialProductId) return null;
    return initial.find((p) => p.id === initialProductId) || initialProductData || null;
  });
  const [cartOpen, setCartOpen] = useState(false);
  const [count, setCount] = useState(0);

  const sentinel = useRef(null);
  const gridRef = useRef(null);
  const dealMap = useMemo(() => buildDealMap(deals), [deals]);

  // Product feed layout: two hand-split masonry columns on mobile (so items
  // read left-to-right like a normal shopping list — CSS column-count masonry
  // fills top-to-bottom per column instead, which reads wrong), a uniform
  // grid on desktop. Starts false (mobile) to match what SSR renders, then
  // useLayoutEffect corrects it before paint so desktop never flashes mobile.
  const [isDesktop, setIsDesktop] = useState(false);
  useLayoutEffect(() => {
    // Matches the CSS breakpoint where store.css switches .grid to the
    // uniform desktop layout (@media (min-width: 900px)) — must stay in
    // sync or the grid renders with no layout for anything in between.
    const mq = window.matchMedia('(min-width: 900px)');
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  const scrollToGrid = useCallback(() => {
    gridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  useEffect(() => {
    const sync = () => setCount(cart.itemCount(store.id));
    sync();
    return cart.subscribe(sync);
  }, [store.id]);

  const loadMore = useCallback(async () => {
    if (loading || !cursor) return;
    setLoading(true);
    try {
      const res = await fetch(
        `/api/products?slug=${encodeURIComponent(slug)}&cursor=${encodeURIComponent(cursor)}`,
      );
      const page = await res.json();
      setProducts((prev) => [...prev, ...(page.products || [])]);
      setCursor(page.nextCursor || null);
    } catch {
      setCursor(null);
    } finally {
      setLoading(false);
    }
  }, [slug, cursor, loading]);

  useEffect(() => {
    if (!cursor) return;
    const el = sentinel.current;
    if (!el) return;
    const io = new IntersectionObserver((e) => e[0].isIntersecting && loadMore(), {
      rootMargin: '600px',
    });
    io.observe(el);
    return () => io.disconnect();
  }, [cursor, loadMore]);

  const categories = useMemo(() => {
    const set = new Set(['All']);
    products.forEach((p) => p.category && set.add(p.category));
    return [...set];
  }, [products]);

  const featured = useMemo(() => products.filter((p) => p.isFeatured), [products]);

  // Products with a running flash deal → the flash strip.
  const flashDeals = useMemo(() => {
    const now = Date.now();
    return products.filter((p) => {
      const d = dealMap.get(p.id);
      return d && now >= d.startAt && now < d.endAt;
    });
  }, [products, dealMap]);

  const filtered = useMemo(() => {
    const now = Date.now();
    let list = products.filter((p) => {
      const q = query.toLowerCase();
      const matchesQ =
        !q || p.name.toLowerCase().includes(q) || (p.code || '').toLowerCase().includes(q);
      const matchesCat = category === 'All' || p.category === category;
      const d = dealMap.get(p.id);
      const matchesDeal = !dealsOnly || (d && now < d.endAt);
      return matchesQ && matchesCat && matchesDeal;
    });
    if (sort === 'asc') list = [...list].sort((a, b) => priceOf(a) - priceOf(b));
    if (sort === 'desc') list = [...list].sort((a, b) => priceOf(b) - priceOf(a));
    return list;
  }, [products, query, category, sort, dealsOnly, dealMap]);

  const activeFilterCount = (sort !== 'none' ? 1 : 0) + (dealsOnly ? 1 : 0);
  const showDiscovery = query === '' && category === 'All' && !dealsOnly;

  return (
    <>
      {/* Search first, above the discovery strips */}
      <div className="search searchbar-top">
        <Search size={19} />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={`Search product in ${store.name}...`}
          aria-label="Search products"
        />
        {query ? (
          <button className="search-clear" onClick={() => setQuery('')} aria-label="Clear">
            <Close size={15} />
          </button>
        ) : null}
      </div>

      {/* Flash Deals (horizontal rail, max 6, rest under View all) */}
      {showDiscovery && flashDeals.length > 0 ? (
        <section className="strip-section">
          <div className="strip-head">
            <span className="strip-title flash">Flash Deals</span>
            {flashDeals.length > STRIP_MAX ? (
              <button className="view-all" onClick={scrollToGrid}>View all</button>
            ) : null}
          </div>
          <div className="hstrip">
            {flashDeals.slice(0, STRIP_MAX).map((p) => (
              <div className="hstrip-item" key={`fd-${p.id}`}>
                <Card p={p} deal={dealMap.get(p.id)} onOpen={() => setModalProduct(p)} fixed />
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {/* Featured (horizontal rail, max 6) */}
      {showDiscovery && featured.length > 0 ? (
        <section className="strip-section">
          <div className="strip-head">
            <span className="strip-title">Featured</span>
            {featured.length > STRIP_MAX ? (
              <button className="view-all" onClick={scrollToGrid}>View all</button>
            ) : null}
          </div>
          <div className="hstrip">
            {featured.slice(0, STRIP_MAX).map((p) => (
              <div className="hstrip-item" key={`f-${p.id}`}>
                <Card p={p} deal={dealMap.get(p.id)} onOpen={() => setModalProduct(p)} fixed />
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {/* Collections + sort */}
      <div className="filter-bar">
        {/* Shop by Collection */}
        {categories.length > 1 ? (
          <>
            <div className="collection-label">Shop by Collection</div>
            <div className="collections">
              {categories.map((c) => (
                <button
                  key={c}
                  className={`collection ${category === c ? 'on' : ''}`}
                  onClick={() => setCategory(c)}
                >
                  <span className="collection-ring">
                    <Bag size={18} />
                  </span>
                  <span className="collection-name">{c}</span>
                </button>
              ))}
            </div>
          </>
        ) : null}

        {/* Filter & Sort — matches the app: a label plus a Filters pill that
            opens the sheet (sort + deals only). */}
        <div className="sortrow">
          <span className={`sortlabel ${sort === 'none' ? '' : 'on'}`}>
            {sort === 'none' ? 'Filter & Sort' : sort === 'asc' ? 'Sorted: Low to High' : 'Sorted: High to Low'}
          </span>
          <button
            className={`filters-pill ${activeFilterCount > 0 ? 'on' : ''}`}
            onClick={() => setFilterOpen(true)}
          >
            <Sliders size={15} />
            <span>Filters</span>
            {activeFilterCount > 0 ? <span className="filters-badge">{activeFilterCount}</span> : null}
          </button>
        </div>
      </div>

      {/* Product feed — masonry on mobile, uniform grid on desktop */}
      {filtered.length > 0 ? (
        isDesktop ? (
          <div className="grid" ref={gridRef}>
            {filtered.map((p, i) => (
              <Card
                key={`${p.id}-${i}`}
                p={p}
                deal={dealMap.get(p.id)}
                index={i}
                onOpen={() => setModalProduct(p)}
              />
            ))}
          </div>
        ) : (
          <div className="grid-mobile" ref={gridRef}>
            {[0, 1].map((col) => (
              <div className="masonry-col" key={col}>
                {filtered
                  .map((p, i) => ({ p, i }))
                  .filter(({ i }) => i % 2 === col)
                  .map(({ p, i }) => (
                    <Card
                      key={`${p.id}-${i}`}
                      p={p}
                      deal={dealMap.get(p.id)}
                      index={i}
                      onOpen={() => setModalProduct(p)}
                    />
                  ))}
              </div>
            ))}
          </div>
        )
      ) : (
        <p className="store-desc empty-line">No products match your search.</p>
      )}

      {cursor ? (
        <div ref={sentinel} className="grid-loader">
          <span className="spinner" aria-label="Loading more" />
        </div>
      ) : null}

      {/* Floating cart */}
      <button className="cart-fab" onClick={() => setCartOpen(true)} aria-label="Open cart">
        <Bag size={20} />
        {count > 0 ? <span className="cart-count">{count}</span> : null}
      </button>

      {modalProduct ? (
        <ProductModal
          slug={slug}
          vendorId={store.id}
          storeName={store.name}
          product={modalProduct}
          deal={dealMap.get(modalProduct.id)}
          onClose={() => setModalProduct(null)}
          onAdded={() => setModalProduct(null)}
        />
      ) : null}

      {cartOpen ? (
        <CartModal slug={slug} store={store} onClose={() => setCartOpen(false)} />
      ) : null}

      {filterOpen ? (
        <div className="sheet-scrim" onClick={() => setFilterOpen(false)}>
          <div className="sheet filter-sheet" onClick={(e) => e.stopPropagation()}>
            <button className="sheet-close" onClick={() => setFilterOpen(false)} aria-label="Close">
              <Close size={18} />
            </button>
            <h3 className="p-name" style={{ marginTop: 0 }}>Filter &amp; Sort</h3>

            <div className="filter-group">
              <div className="filter-group-title">Sort by price</div>
              {[
                ['none', 'Recommended'],
                ['asc', 'Price: Low to High'],
                ['desc', 'Price: High to Low'],
              ].map(([v, label]) => (
                <button
                  key={v}
                  className={`filter-opt ${sort === v ? 'on' : ''}`}
                  onClick={() => setSort(v)}
                >
                  <span>{label}</span>
                  <span className="filter-radio" />
                </button>
              ))}
            </div>

            <div className="filter-group">
              <button
                className={`filter-opt ${dealsOnly ? 'on' : ''}`}
                onClick={() => setDealsOnly((d) => !d)}
              >
                <span>Show deals only</span>
                <span className="filter-check" />
              </button>
            </div>

            <button className="btn btn-brand cart-cta" onClick={() => setFilterOpen(false)}>
              Show results
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}

// Product card — hover cycles the gallery (like the app) and lifts. Tap/click
// opens the details modal.
function Card({ p, deal, index = 0, onOpen, fixed = false }) {
  const [imgIndex, setImgIndex] = useState(0);
  const timer = useRef(null);
  const images = p.images?.length ? p.images : [''];

  const startCycle = () => {
    if (images.length < 2 || timer.current) return;
    setImgIndex((i) => (i + 1) % images.length);
    timer.current = setInterval(() => setImgIndex((i) => (i + 1) % images.length), 1100);
  };
  const stopCycle = () => {
    clearInterval(timer.current);
    timer.current = null;
    setImgIndex(0);
  };
  useEffect(() => () => clearInterval(timer.current), []);

  const disc = Number(p.discountedPrice || 0);
  const hasDisc = disc > 0 && disc < Number(p.price || 0);
  const off = hasDisc ? Math.round((1 - disc / p.price) * 100) : 0;
  const soldOut = p.availableStock <= 0;
  const lowStock = !soldOut && p.availableStock < 5;
  const img = images[imgIndex] || '';

  return (
    <article
      className={`card card-animate ${fixed ? 'card-fixed' : ''}`}
      style={{ animationDelay: `${(index % 8) * 40}ms` }}
      onMouseEnter={startCycle}
      onMouseLeave={stopCycle}
    >
      <div className="card-img" onClick={onOpen} role="button">
        {img ? <img src={img} alt={p.name} loading="lazy" /> : <div className="card-img-empty"><Bag size={28} /></div>}
        {hasDisc ? <span className="off-badge">-{off}%</span> : null}
        {soldOut ? <span className="sold-veil">Sold out</span> : null}
        <span className="deal-badge-wrap">
          <DealCountdown deal={deal} />
        </span>
      </div>
      <div className="card-body" onClick={onOpen} role="button">
        <div className="card-name">{p.name}</div>
        {p.description ? <div className="card-sub">{p.description}</div> : null}
        <div className="card-price-row">
          <div className="card-price">
            {naira(priceOf(p))}
            {hasDisc ? <span className="card-was">{naira(p.price)}</span> : null}
          </div>
          {!fixed && lowStock ? <span className="low-stock">Only {p.availableStock} left</span> : null}
        </div>
      </div>
    </article>
  );
}
