import { useState, useRef, useEffect } from "react";
import { useApp } from "../context/AppContext";
import logoUrl from "../imports/logo_row.jpeg";

// ─── Icons ────────────────────────────────────────────────────────────────────

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8a19.79 19.79 0 01-3.07-8.63A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92v2z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className="w-6 h-6">
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className="w-6 h-6">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function ChevronDown() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className="w-5 h-5">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className="w-5 h-5">
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-4-4" />
    </svg>
  );
}

// ─── Header ───────────────────────────────────────────────────────────────────

function Header() {
  const { isLoggedIn, isAdmin, logout, setCurrentPage, storeSettings } = useApp();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const brandLogo = storeSettings.logoUrl || logoUrl;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(10,10,10,0.96)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(245,197,24,0.1)" : "none",
        boxShadow: scrolled ? "0 4px 30px rgba(0,0,0,0.5)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <button
            onClick={() => setCurrentPage("home")}
            className="flex items-center gap-3 group"
          >
            <div
              className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden transition-all duration-300 group-hover:scale-105"
              style={{
                border: "2px solid rgba(245,197,24,0.5)",
                boxShadow: "0 0 20px rgba(245,197,24,0.15)",
                background: "#000000",
              }}
            >
              <img src={brandLogo} alt="ROW" className="w-full h-full object-cover" style={{ objectPosition: "center" }} />
            </div>
            <div className="hidden sm:block">
              <div className="font-display font-bold text-white text-lg leading-none">{storeSettings.storeName || "ROW Restaurant"}</div>
            </div>
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {[
              { label: "الرئيسية", action: () => window.scrollTo({ top: 0, behavior: "smooth" }) },
              { label: "القائمة", action: () => scrollTo("menu-section") },
              { label: "تواصل معنا", action: () => scrollTo("contact-section") },
            ].map((item) => (
              <button
                key={item.label}
                onClick={item.action}
                className="text-sm font-medium transition-colors relative group"
                style={{ color: "#ccc" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#F5C518")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#ccc")}
              >
                {item.label}
                <span
                  className="absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full"
                  style={{ background: "#F5C518" }}
                />
              </button>
            ))}
            {isAdmin && (
              <button
                onClick={() => setCurrentPage("admin")}
                className="btn-gold px-4 py-1.5 rounded-lg text-sm"
              >
                لوحة التحكم
              </button>
            )}
            {isLoggedIn ? (
              <button
                onClick={logout}
                className="text-sm font-medium transition-colors"
                style={{ color: "#888" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#ef4444")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#888")}
              >
                تسجيل الخروج
              </button>
            ) : (
              <button
                onClick={() => setCurrentPage("login")}
                className="text-sm font-medium border px-4 py-1.5 rounded-lg transition-all"
                style={{ color: "#F5C518", borderColor: "rgba(245,197,24,0.4)" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(245,197,24,0.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                }}
              >
                تسجيل الدخول
              </button>
            )}
          </nav>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden p-2 transition-colors"
            style={{ color: menuOpen ? "#F5C518" : "#ccc" }}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="md:hidden animate-fadeIn"
          style={{
            background: "rgba(10,10,10,0.98)",
            backdropFilter: "blur(20px)",
            borderTop: "1px solid rgba(245,197,24,0.1)",
          }}
        >
          <div className="px-4 py-4 space-y-1">
            {[
              { label: "الرئيسية", action: () => { setMenuOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); } },
              { label: "القائمة", action: () => scrollTo("menu-section") },
              { label: "تواصل معنا", action: () => scrollTo("contact-section") },
            ].map((item) => (
              <button
                key={item.label}
                onClick={item.action}
                className="w-full text-right py-3 px-4 rounded-lg text-sm font-medium transition-colors"
                style={{ color: "#ccc" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#F5C518";
                  e.currentTarget.style.background = "rgba(245,197,24,0.06)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "#ccc";
                  e.currentTarget.style.background = "transparent";
                }}
                dir="rtl"
              >
                {item.label}
              </button>
            ))}
            {isAdmin && (
              <button
                onClick={() => { setMenuOpen(false); setCurrentPage("admin"); }}
                className="w-full btn-gold py-3 px-4 rounded-lg text-sm"
                dir="rtl"
              >
                لوحة التحكم
              </button>
            )}
            {isLoggedIn ? (
              <button
                onClick={() => { logout(); setMenuOpen(false); }}
                className="w-full py-3 px-4 rounded-lg text-sm transition-colors text-right"
                style={{ color: "#888" }}
                dir="rtl"
              >
                تسجيل الخروج
              </button>
            ) : (
              <button
                onClick={() => { setCurrentPage("login"); setMenuOpen(false); }}
                className="w-full py-3 px-4 rounded-lg text-sm font-medium text-right border transition-all"
                style={{ color: "#F5C518", borderColor: "rgba(245,197,24,0.3)" }}
                dir="rtl"
              >
                تسجيل الدخول
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero() {
  const { banner, storeSettings } = useApp();
  const brandLogo = storeSettings.logoUrl || logoUrl;

  const scrollToMenu = () => {
    const el = document.getElementById("menu-section");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Media background */}
      {banner.type === "video" && banner.videoUrl ? (
        <video
          src={banner.videoUrl}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <div
          className="absolute inset-0 bg-center bg-cover transition-all duration-1000"
          style={{ backgroundImage: `url(${banner.imageUrl})` }}
        />
      )}

      {/* Dark overlay with gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to bottom, rgba(10,10,10,0.4) 0%, rgba(10,10,10,0.6) 50%, rgba(10,10,10,0.9) 100%)",
        }}
      />

      {/* Gold vignette */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background: "radial-gradient(ellipse at center, rgba(245,197,24,0.15) 0%, transparent 70%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto" style={{ textAlign: "center" }}>
        {/* Logo emblem */}
        <div
          className="w-24 h-24 md:w-32 md:h-32 rounded-full mx-auto mb-8 overflow-hidden animate-fadeInUp"
          style={{
            border: "3px solid rgba(245,197,24,0.6)",
            boxShadow: "0 0 60px rgba(245,197,24,0.3), 0 0 120px rgba(245,197,24,0.1)",
            background: "#000000",
            animationDelay: "0.1s",
          }}
        >
          <img src={brandLogo} alt="ROW Restaurant" className="w-full h-full object-cover" style={{ objectPosition: "center" }} />
        </div>

        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium mb-6 animate-fadeInUp"
          style={{
            background: "rgba(245,197,24,0.12)",
            border: "1px solid rgba(245,197,24,0.3)",
            color: "#F5C518",
            letterSpacing: "0.15em",
            animationDelay: "0.2s",
          }}
        >
          <span>★</span>
          <span>جنين · شارع حيفا</span>
          <span>★</span>
        </div>

        {/* Headline */}
        <h1
          className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 animate-fadeInUp"
          style={{ animationDelay: "0.3s", textShadow: "0 4px 30px rgba(0,0,0,0.8)", lineHeight: 1.15, textAlign: "center" }}
          dir="rtl"
        >
          {banner.headline}
        </h1>

        {/* Subtext */}
        <p
          className="text-base md:text-lg mb-10 max-w-2xl mx-auto animate-fadeInUp"
          style={{ color: "rgba(255,255,255,0.75)", animationDelay: "0.4s", lineHeight: 1.8, textAlign: "center" }}
          dir="rtl"
        >
          {banner.subtext}
        </p>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fadeInUp" style={{ animationDelay: "0.5s" }}>
          <button
            onClick={scrollToMenu}
            className="btn-gold px-8 py-4 rounded-xl text-base font-bold"
          >
            استعرض القائمة
          </button>
          <button
            onClick={() => {
              const el = document.getElementById("contact-section");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-8 py-4 rounded-xl text-base font-medium transition-all"
            style={{
              border: "1px solid rgba(255,255,255,0.2)",
              color: "white",
              background: "rgba(255,255,255,0.06)",
              backdropFilter: "blur(10px)",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.12)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.06)")}
          >
            تواصل معنا
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce opacity-60">
        <ChevronDown />
      </div>
    </section>
  );
}

// ─── Product Card ─────────────────────────────────────────────────────────────

function ProductCard({ product }: { product: { id: string; name: string; description: string; image: string; price: string } }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div
      className="card-hover rounded-xl overflow-hidden group"
      style={{
        background: "#141414",
        border: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {/* Image */}
      <div className="relative overflow-hidden h-44 bg-zinc-900">
        {!imgError ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            style={{ opacity: 1, visibility: "visible", display: "block" }}
            onError={() => setImgError(true)}
            loading="eager"
            decoding="async"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center" style={{ background: "#1C1C1C" }}>
            <span className="text-4xl" style={{ opacity: 0.35 }}>🍽️</span>
          </div>
        )}
        <div className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute top-3 left-3">
          <span className="price-badge">
            {product.price === "حسب الوزن" || isNaN(Number(product.price))
              ? product.price
              : `₪${product.price}`}
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="p-4" dir="rtl">
        <h3 className="font-display font-semibold text-white text-sm leading-snug">{product.name}</h3>
        {product.description && (
          <p className="text-xs mt-1 leading-relaxed" style={{ color: "#888" }}>
            {product.description}
          </p>
        )}
      </div>
    </div>
  );
}

// ─── Menu Section ─────────────────────────────────────────────────────────────

function MenuSection() {
  const { categories, products } = useApp();
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const filterRef = useRef<HTMLDivElement>(null);

  const visibleCategories = categories.filter((c) => c.visible);
  const visibleProducts = products.filter((p) => p.visible);

  const categoryProducts = activeCategory === "all"
    ? visibleProducts
    : visibleProducts.filter((p) => p.categoryId === activeCategory);
  const normalizedQuery = searchQuery.trim().toLocaleLowerCase();
  const filtered = categoryProducts.filter((p) =>
    !normalizedQuery || `${p.name} ${p.description} ${p.price}`.toLocaleLowerCase().includes(normalizedQuery)
  );

  const handleCategoryClick = (id: string) => {
    setActiveCategory(id);
    // Scroll filter into view
    setTimeout(() => {
      const el = document.getElementById(`cat-section-${id}`);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  return (
    <section id="menu-section" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-14" dir="rtl">
          <span className="text-xs font-medium tracking-widest mb-3 block" style={{ color: "#F5C518", letterSpacing: "0.2em" }}>
            ✦ قائمتنا ✦
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-4">
            كل ما يشتهيه قلبك
          </h2>
          <p className="text-base max-w-xl mx-auto" style={{ color: "#888" }}>
            من أشهى الوجبات الرئيسية إلى أحلى المشروبات — تجربة متكاملة لكل الأذواق
          </p>
          <div className="gold-line w-24 mx-auto mt-6" />
        </div>

        {/* Category filter pills */}
        <div ref={filterRef} className="flex gap-2 overflow-x-auto pb-3 mb-10 scrollbar-hide" style={{ scrollbarWidth: "none" }}>
          <div className="relative flex-shrink-0">
            <input
              aria-label="البحث في القائمة"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث في القائمة"
              className="form-input h-10 w-48 pr-9 text-sm"
              dir="rtl"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "#F5C518" }}><SearchIcon /></span>
          </div>
          <button
            onClick={() => setActiveCategory("all")}
            className={`filter-btn px-5 py-2 rounded-full text-sm${activeCategory === "all" ? " active" : ""}`}
            style={{ background: activeCategory === "all" ? "#F5C518" : "#141414", color: activeCategory === "all" ? "#0A0A0A" : "#ccc", border: "1px solid", borderColor: activeCategory === "all" ? "#F5C518" : "rgba(255,255,255,0.1)" }}
          >
            الكل
          </button>
          {visibleCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryClick(cat.id)}
              className={`filter-btn px-5 py-2 rounded-full text-sm${activeCategory === cat.id ? " active" : ""}`}
              style={{
                background: activeCategory === cat.id ? "#F5C518" : "#141414",
                color: activeCategory === cat.id ? "#0A0A0A" : "#ccc",
                border: "1px solid",
                borderColor: activeCategory === cat.id ? "#F5C518" : "rgba(255,255,255,0.1)",
                whiteSpace: "nowrap",
              }}
              dir="rtl"
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* When showing all, group by category */}
        {normalizedQuery ? (
          <div>
            <div className="flex items-center justify-between mb-6" dir="rtl">
              <h3 className="font-display text-xl md:text-2xl font-bold text-white">نتائج البحث</h3>
              <span className="text-xs" style={{ color: "#888" }}>{filtered.length} صنف</span>
            </div>
            {filtered.length === 0 ? <p className="text-center py-10" style={{ color: "#888" }}>لا توجد منتجات مطابقة للبحث.</p> : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {filtered.map((prod) => <ProductCard key={prod.id} product={prod} />)}
              </div>
            )}
          </div>
        ) : activeCategory === "all" ? (
          <div className="space-y-16">
            {visibleCategories.map((cat) => {
              const catProducts = visibleProducts.filter((p) => p.categoryId === cat.id);
              if (catProducts.length === 0) return null;
              return (
                <div key={cat.id} id={`cat-section-${cat.id}`}>
                  {/* Category header with cover image */}
                  <div className="flex items-center gap-4 mb-8" dir="rtl">
                    <div
                      className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0"
                      style={{ border: "1px solid rgba(245,197,24,0.2)" }}
                    >
                      <img
                        src={cat.image}
                        alt={cat.name}
                        className="w-full h-full object-cover"
                        onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                      />
                    </div>
                    <div>
                      <h3 className="font-display text-xl md:text-2xl font-bold text-white">{cat.name}</h3>
                      <p className="text-xs mt-0.5" style={{ color: "#888" }}>
                        {catProducts.length} {catProducts.length === 1 ? "صنف" : "صنف"}
                      </p>
                    </div>
                    <div className="flex-1 gold-line opacity-30" />
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {catProducts.map((prod) => (
                      <ProductCard key={prod.id} product={prod} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div>
            {/* Category title */}
            {(() => {
              const cat = visibleCategories.find((c) => c.id === activeCategory);
              return cat ? (
                <div className="flex items-center gap-4 mb-8" dir="rtl">
                  <div
                    className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0"
                    style={{ border: "1px solid rgba(245,197,24,0.2)" }}
                  >
                    <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl md:text-2xl font-bold text-white">{cat.name}</h3>
                    <p className="text-xs mt-0.5" style={{ color: "#888" }}>
                      {filtered.length} صنف
                    </p>
                  </div>
                  <div className="flex-1 gold-line opacity-30" />
                </div>
              ) : null;
            })()}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {filtered.map((prod) => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

// ─── Contact Section ──────────────────────────────────────────────────────────

function ContactSection() {
  const { contact } = useApp();

  const links = [
    {
      icon: <PhoneIcon />,
      label: "هاتف",
      href: contact.phone ? `tel:${contact.phone}` : null,
      color: "#22c55e",
      bg: "rgba(34,197,94,0.1)",
    },
    {
      icon: <WhatsAppIcon />,
      label: "واتساب",
      href: contact.whatsapp ? `https://wa.me/${contact.whatsapp.replace(/\D/g, "")}` : null,
      color: "#22c55e",
      bg: "rgba(34,197,94,0.1)",
    },
    {
      icon: <InstagramIcon />,
      label: "إنستغرام",
      href: contact.instagram || null,
      color: "#e1306c",
      bg: "rgba(225,48,108,0.1)",
    },
    {
      icon: <FacebookIcon />,
      label: "فيسبوك",
      href: contact.facebook || null,
      color: "#1877f2",
      bg: "rgba(24,119,242,0.1)",
    },
  ];

  return (
    <section id="contact-section" className="py-20 px-4" style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
      <div className="max-w-2xl mx-auto text-center">
        <span className="text-xs font-medium tracking-widest mb-3 block" style={{ color: "#F5C518", letterSpacing: "0.2em" }}>
          ✦ تواصل معنا ✦
        </span>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-3" dir="rtl">
          نحن هنا لخدمتكم
        </h2>
        <p className="text-sm mb-10" style={{ color: "#888" }} dir="rtl">
          شارع حيفا، جنين — تفضل بزيارتنا أو تواصل معنا على وسائل التواصل الاجتماعي
        </p>

        <div className="flex justify-center gap-4 flex-wrap">
          {links.map((link) =>
            link.href ? (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("tel") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="group flex flex-col items-center gap-2"
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg"
                  style={{
                    background: link.bg,
                    border: `1px solid ${link.color}30`,
                    color: link.color,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = `0 8px 24px ${link.color}30`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  {link.icon}
                </div>
                <span className="text-xs" style={{ color: "#888" }}>
                  {link.label}
                </span>
              </a>
            ) : (
              <div key={link.label} className="flex flex-col items-center gap-2 opacity-30">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center"
                  style={{ background: link.bg, border: `1px solid ${link.color}30`, color: link.color }}
                >
                  {link.icon}
                </div>
                <span className="text-xs" style={{ color: "#888" }}>
                  {link.label}
                </span>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  const { storeSettings } = useApp();
  const brandLogo = storeSettings.logoUrl || logoUrl;

  return (
    <footer className="py-8 px-4 text-center" style={{ borderTop: "1px solid rgba(255,255,255,0.04)", background: "#0A0A0A" }}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full overflow-hidden" style={{ border: "1px solid rgba(245,197,24,0.3)" }}>
              <img src={brandLogo} alt="ROW" className="w-full h-full object-contain bg-black p-0.5" />
            </div>
            <span className="font-display text-sm font-semibold text-white">{storeSettings.storeName || "ROW Restaurant"}</span>
          </div>
          <p className="text-xs" style={{ color: "#444" }}>
            شارع حيفا، جنين
          </p>
          <p className="text-xs" style={{ color: "#3a3a3a" }}>
            Built by{" "}
            <a
              href="https://sitecraft.ps"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors"
              style={{ color: "#555" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#F5C518")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#555")}
            >
              SiteCraft.ps
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─── HomePage ─────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <div style={{ background: "#0A0A0A", minHeight: "100vh" }}>
      <Header />
      <Hero />
      <MenuSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
