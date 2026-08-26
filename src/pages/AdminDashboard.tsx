import { useState, useRef, useEffect } from "react";
import { useApp } from "../context/AppContext";
import { Category, Product } from "../data/menuData";
import logoUrl from "../imports/logo_row.jpeg";

type AdminSection = "overview" | "categories" | "products" | "orders" | "customers" | "banner" | "contact" | "settings";

function toBase64(file: File): Promise<string> {
  return new Promise((res, rej) => {
    const reader = new FileReader();
    reader.onload = () => res(reader.result as string);
    reader.onerror = rej;
    reader.readAsDataURL(file);
  });
}

function formatMoney(value: number, currency = "ILS") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

function statusLabel(status: string) {
  const labels: Record<string, string> = {
    pending: "قيد الانتظار",
    processing: "قيد التجهيز",
    shipped: "تم الشحن",
    completed: "مكتمل",
    cancelled: "ملغي",
  };
  return labels[status] ?? status;
}

function statusColor(status: string) {
  const colors: Record<string, string> = {
    pending: "#F5C518",
    processing: "#60a5fa",
    shipped: "#a78bfa",
    completed: "#22c55e",
    cancelled: "#ef4444",
  };
  return colors[status] ?? "#888";
}

function Overview() {
  const { categories, products, orders, customers } = useApp();
  const totalSales = orders.reduce((sum, order) => sum + Number(order.total || 0), 0);
  const totalProducts = products.length;
  const visibleProducts = products.filter((p) => p.visible).length;
  const totalCategories = categories.length;

  const stats = [
    { label: "إجمالي المبيعات", value: formatMoney(totalSales), icon: "💰", color: "#F5C518" },
    ...(orders.length > 0 ? [{ label: "إجمالي الطلبات", value: orders.length, icon: "🧾", color: "#60a5fa" }] : []),
    ...(customers.length > 0 ? [{ label: "إجمالي العملاء", value: customers.length, icon: "👥", color: "#22c55e" }] : []),
    { label: "إجمالي المنتجات", value: totalProducts, icon: "🍽️", color: "#F5C518" },
    { label: "منتجات مرئية", value: visibleProducts, icon: "✅", color: "#22c55e" },
    { label: "الأقسام", value: totalCategories, icon: "📂", color: "#a78bfa" },
  ];

  const monthlySales = Array.from({ length: 6 }, (_, idx) => {
    const monthIndex = new Date().getMonth() - (5 - idx);
    const date = new Date(new Date().getFullYear(), monthIndex, 1);
    const key = date.toLocaleDateString("en-US", { month: "short" });
    const value = orders.filter((order) => {
      const d = new Date(order.createdAt);
      return d.getMonth() === date.getMonth() && d.getFullYear() === date.getFullYear();
    }).reduce((sum, order) => sum + Number(order.total || 0), 0);
    return { month: key, value };
  });

  const recentOrders = [...orders].slice(0, 5);

  return (
    <div>
      <div className="mb-8" dir="rtl">
        <h2 className="font-display text-2xl font-bold text-white mb-1">نظرة عامة</h2>
        <p className="text-sm" style={{ color: "#888" }}>إحصائيات الموقع الحالية</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="stat-card" dir="rtl">
            <div className="flex items-start justify-between mb-3">
              <span className="text-2xl">{stat.icon}</span>
              <span className="text-3xl font-bold font-display" style={{ color: stat.color }}>
                {stat.value}
              </span>
            </div>
            <p className="text-sm" style={{ color: "#888" }}>{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-[1.4fr_1fr] gap-6 mt-8">
        <div className="rounded-xl p-5" style={{ background: "#141414", border: "1px solid rgba(255,255,255,0.06)" }} dir="rtl">
          <h3 className="font-semibold text-white mb-4">إحصائيات المبيعات</h3>
          <div className="flex items-end gap-3 h-40">
            {monthlySales.map((item) => (
              <div key={item.month} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full flex items-end justify-center h-28">
                  <div
                    className="w-full rounded-t-md"
                    style={{
                      height: `${Math.max((item.value / Math.max(...monthlySales.map((m) => m.value), 1)) * 100, 8)}%`,
                      background: "linear-gradient(180deg, #f5c518, #c9a000)",
                    }}
                  />
                </div>
                <span className="text-[10px]" style={{ color: "#888" }}>{item.month}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl p-5" style={{ background: "#141414", border: "1px solid rgba(255,255,255,0.06)" }} dir="rtl">
          <h3 className="font-semibold text-white mb-4">أحدث الطلبات</h3>
          <div className="space-y-3">
            {recentOrders.length === 0 ? (
              <p className="text-sm" style={{ color: "#888" }}>لا توجد طلبات حتى الآن.</p>
            ) : (
              recentOrders.map((order) => (
                <div key={order.id} className="rounded-lg p-3" style={{ background: "#1c1c1c" }}>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-white">{order.customerName}</span>
                    <span className="text-xs px-2 py-1 rounded-full" style={{ background: `${statusColor(order.status)}22`, color: statusColor(order.status) }}>
                      {statusLabel(order.status)}
                    </span>
                  </div>
                  <div className="mt-1 text-xs" style={{ color: "#888" }}>
                    {order.id} · {formatMoney(order.total)}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function CategoriesManager() {
  const { categories, addCategory, updateCategory, deleteCategory } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [visible, setVisible] = useState(true);
  const [preview, setPreview] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const reset = () => {
    setName("");
    setImage("");
    setPreview("");
    setVisible(true);
    setEditId(null);
    setShowForm(false);
  };

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const b64 = await toBase64(file);
    setImage(b64);
    setPreview(b64);
  };

  const handleEdit = (cat: Category) => {
    setEditId(cat.id);
    setName(cat.name);
    setImage(cat.image);
    setPreview(cat.image);
    setVisible(cat.visible);
    setShowForm(true);
  };

  const handleSave = () => {
    if (!name.trim()) return;
    if (editId) {
      updateCategory(editId, { name: name.trim(), image: image || preview, visible });
    } else {
      addCategory({ name: name.trim(), image: image || "", visible });
    }
    reset();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6" dir="rtl">
        <div>
          <h2 className="font-display text-2xl font-bold text-white">إدارة الأقسام</h2>
          <p className="text-sm mt-1" style={{ color: "#888" }}>{categories.length} قسم</p>
        </div>
        <button onClick={() => { reset(); setShowForm(!showForm); }} className="btn-gold px-4 py-2 rounded-lg text-sm">
          {showForm ? "إلغاء" : "+ إضافة قسم"}
        </button>
      </div>

      {showForm && (
        <div className="mb-8 p-6 rounded-xl animate-scaleIn" style={{ background: "#1C1C1C", border: "1px solid rgba(245,197,24,0.2)" }} dir="rtl">
          <h3 className="font-semibold text-white mb-5">{editId ? "تعديل القسم" : "إضافة قسم جديد"}</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm mb-2" style={{ color: "#ccc" }}>اسم القسم *</label>
              <input className="form-input" value={name} onChange={(e) => setName(e.target.value)} placeholder="مثال: مقبلات" />
            </div>
            <div>
              <label className="block text-sm mb-2" style={{ color: "#ccc" }}>صورة القسم</label>
              <div className="flex gap-3 items-start">
                {preview && (
                  <div className="w-20 h-20 rounded-lg overflow-hidden" style={{ border: "1px solid rgba(245,197,24,0.2)" }}>
                    <img src={preview} alt="" className="w-full h-full object-cover" style={{ opacity: 1, visibility: "visible", display: "block" }} />
                  </div>
                )}
                <div className="flex-1">
                  <input className="form-input mb-2" value={image.startsWith("data:") ? "" : image} onChange={(e) => { setImage(e.target.value); setPreview(e.target.value); }} placeholder="رابط الصورة (URL)" />
                  <button onClick={() => fileRef.current?.click()} className="text-sm px-3 py-1.5 rounded-lg transition-all" style={{ background: "#2a2a2a", color: "#F5C518", border: "1px solid rgba(245,197,24,0.3)" }}>أو رفع صورة</button>
                  <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm mb-2" style={{ color: "#ccc" }}>الرؤية</label>
              <div className="flex gap-3">
                {[true, false].map((v) => (
                  <button key={String(v)} onClick={() => setVisible(v)} className="px-4 py-2 rounded-lg text-sm transition-all" style={{ background: visible === v ? (v ? "rgba(34,197,94,0.15)" : "rgba(239,68,68,0.15)") : "#2a2a2a", color: visible === v ? (v ? "#22c55e" : "#ef4444") : "#888", border: `1px solid ${visible === v ? (v ? "rgba(34,197,94,0.4)" : "rgba(239,68,68,0.4)") : "rgba(255,255,255,0.1)"}` }}>
                    {v ? "مرئي" : "مخفي"}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <button onClick={handleSave} className="btn-gold px-6 py-2 rounded-lg text-sm">{editId ? "حفظ التعديلات" : "إضافة القسم"}</button>
              <button onClick={reset} className="px-6 py-2 rounded-lg text-sm" style={{ background: "#2a2a2a", color: "#888" }}>إلغاء</button>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {categories.map((cat) => (
          <div key={cat.id} className="flex items-center gap-4 p-4 rounded-xl" style={{ background: "#141414", border: "1px solid rgba(255,255,255,0.06)" }} dir="rtl">
            <div className="w-14 h-14 rounded-lg overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
              <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" style={{ opacity: 1, visibility: "visible", display: "block" }} />
            </div>
            <div className="flex-1">
              <div className="font-medium text-white text-sm">{cat.name}</div>
              <div className="text-xs mt-0.5" style={{ color: cat.visible ? "#22c55e" : "#888" }}>{cat.visible ? "● مرئي" : "● مخفي"}</div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => updateCategory(cat.id, { visible: !cat.visible })} className="px-3 py-1.5 rounded-lg text-xs transition-all" style={{ background: cat.visible ? "rgba(34,197,94,0.1)" : "rgba(255,255,255,0.06)", color: cat.visible ? "#22c55e" : "#888", border: "1px solid", borderColor: cat.visible ? "rgba(34,197,94,0.3)" : "rgba(255,255,255,0.1)" }}>{cat.visible ? "إخفاء" : "إظهار"}</button>
              <button onClick={() => handleEdit(cat)} className="px-3 py-1.5 rounded-lg text-xs transition-all" style={{ background: "rgba(245,197,24,0.1)", color: "#F5C518", border: "1px solid rgba(245,197,24,0.2)" }}>تعديل</button>
              <button onClick={() => { if (confirm(`هل تريد حذف قسم "${cat.name}"؟ سيتم حذف جميع منتجاته.`)) deleteCategory(cat.id); }} className="px-3 py-1.5 rounded-lg text-xs transition-all" style={{ background: "rgba(239,68,68,0.1)", color: "#ef4444", border: "1px solid rgba(239,68,68,0.2)" }}>حذف</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProductsManager() {
  const { categories, products, addProduct, updateProduct, deleteProduct } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [filterCat, setFilterCat] = useState<string>("all");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState("");
  const [visible, setVisible] = useState(true);
  const fileRef = useRef<HTMLInputElement>(null);

  const reset = () => {
    setName("");
    setDescription("");
    setPrice("");
    setCategoryId("");
    setImage("");
    setPreview("");
    setVisible(true);
    setEditId(null);
    setShowForm(false);
  };

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const b64 = await toBase64(file);
    setImage(b64);
    setPreview(b64);
  };

  const handleEdit = (prod: Product) => {
    setEditId(prod.id);
    setName(prod.name);
    setDescription(prod.description);
    setPrice(prod.price);
    setCategoryId(prod.categoryId);
    setImage(prod.image);
    setPreview(prod.image);
    setVisible(prod.visible);
    setShowForm(true);
  };

  const handleSave = () => {
    if (!name.trim() || !categoryId || !price.trim()) return;
    const prod = { name: name.trim(), description, price: price.trim(), categoryId, image: image || preview, visible };
    if (editId) updateProduct(editId, prod); else addProduct(prod);
    reset();
  };

  const filtered = products.filter((p) => filterCat === "all" || p.categoryId === filterCat);

  return (
    <div>
      <div className="flex items-center justify-between mb-6" dir="rtl">
        <div>
          <h2 className="font-display text-2xl font-bold text-white">إدارة المنتجات</h2>
          <p className="text-sm mt-1" style={{ color: "#888" }}>{products.length} منتج</p>
        </div>
        <button onClick={() => { reset(); setShowForm(!showForm); }} className="btn-gold px-4 py-2 rounded-lg text-sm">{showForm ? "إلغاء" : "+ إضافة منتج"}</button>
      </div>

      {showForm && (
        <div className="mb-8 p-6 rounded-xl animate-scaleIn" style={{ background: "#1C1C1C", border: "1px solid rgba(245,197,24,0.2)" }} dir="rtl">
          <h3 className="font-semibold text-white mb-5">{editId ? "تعديل المنتج" : "إضافة منتج جديد"}</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-2" style={{ color: "#ccc" }}>اسم المنتج *</label>
              <input className="form-input" value={name} onChange={(e) => setName(e.target.value)} placeholder="اسم المنتج" />
            </div>
            <div>
              <label className="block text-sm mb-2" style={{ color: "#ccc" }}>السعر * (₪)</label>
              <div className="relative">
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-bold" style={{ color: "#F5C518" }}>₪</span>
                <input className="form-input" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="مثال: 25 أو حسب الوزن" style={{ paddingRight: "2rem" }} dir="ltr" />
              </div>
            </div>
            <div>
              <label className="block text-sm mb-2" style={{ color: "#ccc" }}>القسم *</label>
              <select className="form-input" value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
                <option value="">اختر القسم</option>
                {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm mb-2" style={{ color: "#ccc" }}>الرؤية</label>
              <div className="flex gap-3">
                {[true, false].map((v) => (
                  <button key={String(v)} onClick={() => setVisible(v)} className="px-4 py-2 rounded-lg text-sm transition-all" style={{ background: visible === v ? (v ? "rgba(34,197,94,0.15)" : "rgba(239,68,68,0.15)") : "#2a2a2a", color: visible === v ? (v ? "#22c55e" : "#ef4444") : "#888", border: `1px solid ${visible === v ? (v ? "rgba(34,197,94,0.4)" : "rgba(239,68,68,0.4)") : "rgba(255,255,255,0.1)"}` }}>
                    {v ? "مرئي" : "مخفي"}
                  </button>
                ))}
              </div>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm mb-2" style={{ color: "#ccc" }}>وصف المنتج</label>
              <input className="form-input" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="وصف اختياري" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm mb-2" style={{ color: "#ccc" }}>صورة المنتج</label>
              <div className="flex gap-3 items-start">
                {preview && <div className="w-20 h-20 rounded-lg overflow-hidden" style={{ border: "1px solid rgba(245,197,24,0.2)" }}><img src={preview} alt="" className="w-full h-full object-cover" style={{ opacity: 1, visibility: "visible", display: "block" }} /></div>}
                <div className="flex-1">
                  <input className="form-input mb-2" value={image.startsWith("data:") ? "" : image} onChange={(e) => { setImage(e.target.value); setPreview(e.target.value); }} placeholder="رابط الصورة (URL)" dir="ltr" />
                  <button onClick={() => fileRef.current?.click()} className="text-sm px-3 py-1.5 rounded-lg transition-all" style={{ background: "#2a2a2a", color: "#F5C518", border: "1px solid rgba(245,197,24,0.3)" }}>أو رفع صورة</button>
                  <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-3 mt-5">
            <button onClick={handleSave} className="btn-gold px-6 py-2 rounded-lg text-sm">{editId ? "حفظ التعديلات" : "إضافة المنتج"}</button>
            <button onClick={reset} className="px-6 py-2 rounded-lg text-sm" style={{ background: "#2a2a2a", color: "#888" }}>إلغاء</button>
          </div>
        </div>
      )}

      <div className="flex gap-2 overflow-x-auto pb-2 mb-6" style={{ scrollbarWidth: "none" }}>
        <button onClick={() => setFilterCat("all")} className="px-4 py-1.5 rounded-full text-xs transition-all whitespace-nowrap" style={{ background: filterCat === "all" ? "#F5C518" : "#1C1C1C", color: filterCat === "all" ? "#0A0A0A" : "#888", border: "1px solid", borderColor: filterCat === "all" ? "#F5C518" : "rgba(255,255,255,0.1)" }}>الكل ({products.length})</button>
        {categories.map((c) => {
          const count = products.filter((p) => p.categoryId === c.id).length;
          return (
            <button key={c.id} onClick={() => setFilterCat(c.id)} className="px-4 py-1.5 rounded-full text-xs transition-all whitespace-nowrap" style={{ background: filterCat === c.id ? "#F5C518" : "#1C1C1C", color: filterCat === c.id ? "#0A0A0A" : "#888", border: "1px solid", borderColor: filterCat === c.id ? "#F5C518" : "rgba(255,255,255,0.1)" }} dir="rtl">
              {c.name} ({count})
            </button>
          );
        })}
      </div>

      <div className="space-y-2">
        {filtered.map((prod) => {
          const cat = categories.find((c) => c.id === prod.categoryId);
          return (
            <div key={prod.id} className="flex items-center gap-3 p-3 rounded-xl" style={{ background: "#141414", border: "1px solid rgba(255,255,255,0.05)" }} dir="rtl">
              <div className="w-12 h-12 rounded-lg overflow-hidden bg-zinc-800">
                <img src={prod.image} alt={prod.name} className="w-full h-full object-cover" style={{ opacity: 1, visibility: "visible", display: "block" }} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-white text-sm truncate">{prod.name}</div>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-xs" style={{ color: "#F5C518" }}>{prod.price === "حسب الوزن" || isNaN(Number(prod.price)) ? prod.price : `₪${prod.price}`}</span>
                  {cat && <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "rgba(255,255,255,0.06)", color: "#888" }}>{cat.name}</span>}
                  <span className="text-xs" style={{ color: prod.visible ? "#22c55e" : "#888" }}>{prod.visible ? "● مرئي" : "● مخفي"}</span>
                </div>
              </div>
              <div className="flex items-center gap-1.5 flex-shrink-0">
                <button onClick={() => updateProduct(prod.id, { visible: !prod.visible })} className="px-2.5 py-1 rounded-lg text-xs transition-all" style={{ background: prod.visible ? "rgba(34,197,94,0.1)" : "rgba(255,255,255,0.06)", color: prod.visible ? "#22c55e" : "#888", border: "1px solid", borderColor: prod.visible ? "rgba(34,197,94,0.3)" : "rgba(255,255,255,0.1)" }}>{prod.visible ? "إخفاء" : "إظهار"}</button>
                <button onClick={() => handleEdit(prod)} className="px-2.5 py-1 rounded-lg text-xs transition-all" style={{ background: "rgba(245,197,24,0.1)", color: "#F5C518", border: "1px solid rgba(245,197,24,0.2)" }}>تعديل</button>
                <button onClick={() => { if (confirm(`حذف "${prod.name}"؟`)) deleteProduct(prod.id); }} className="px-2.5 py-1 rounded-lg text-xs transition-all" style={{ background: "rgba(239,68,68,0.1)", color: "#ef4444", border: "1px solid rgba(239,68,68,0.2)" }}>حذف</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function OrdersManager() {
  const { orders, products, updateOrderStatus, deleteOrder } = useApp();
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const selectedOrder = orders.find((o) => o.id === selectedOrderId) ?? orders[0] ?? null;

  return (
    <div dir="rtl">
      <div className="mb-8">
        <h2 className="font-display text-2xl font-bold text-white">إدارة الطلبات</h2>
        <p className="text-sm mt-1" style={{ color: "#888" }}>{orders.length} طلب</p>
      </div>

      <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-6">
        <div className="space-y-3">
          {orders.length === 0 ? <p className="text-sm" style={{ color: "#888" }}>لا توجد طلبات بعد.</p> : orders.map((order) => (
            <button key={order.id} onClick={() => setSelectedOrderId(order.id)} className="w-full rounded-xl p-4 text-right" style={{ background: selectedOrder?.id === order.id ? "rgba(245,197,24,0.08)" : "#141414", border: `1px solid ${selectedOrder?.id === order.id ? "rgba(245,197,24,0.4)" : "rgba(255,255,255,0.06)"}` }}>
              <div className="flex items-center justify-between">
                <span className="text-white font-medium">{order.customerName}</span>
                <span className="text-xs px-2 py-1 rounded-full" style={{ background: `${statusColor(order.status)}22`, color: statusColor(order.status) }}>{statusLabel(order.status)}</span>
              </div>
              <div className="mt-2 text-xs" style={{ color: "#888" }}>{order.id} · {new Date(order.createdAt).toLocaleDateString("en-GB")} · {formatMoney(order.total)}</div>
            </button>
          ))}
        </div>

        <div className="rounded-xl p-5" style={{ background: "#141414", border: "1px solid rgba(255,255,255,0.06)" }}>
          {selectedOrder ? (
            <>
              <h3 className="font-display text-xl font-bold text-white mb-4">تفاصيل الطلب</h3>
              <div className="space-y-3 text-sm" style={{ color: "#ddd" }} dir="rtl">
                <div><span style={{ color: "#888" }}>العميل:</span> {selectedOrder.customerName}</div>
                <div><span style={{ color: "#888" }}>البريد:</span> {selectedOrder.email}</div>
                <div><span style={{ color: "#888" }}>الهاتف:</span> {selectedOrder.phone}</div>
                <div><span style={{ color: "#888" }}>العنوان:</span> {selectedOrder.address}</div>
                <div className="pt-2">
                  <label className="block text-xs mb-2" style={{ color: "#888" }}>تحديث الحالة</label>
                  <select className="form-input" value={selectedOrder.status} onChange={(e) => updateOrderStatus(selectedOrder.id, e.target.value as any)}>
                    <option value="pending">قيد الانتظار</option>
                    <option value="processing">قيد التجهيز</option>
                    <option value="shipped">تم الشحن</option>
                    <option value="completed">مكتمل</option>
                    <option value="cancelled">ملغي</option>
                  </select>
                </div>
                <div className="pt-3 border-t border-white/10">
                  {selectedOrder.items.map((item) => {
                    const product = products.find((p) => p.id === item.productId);
                    return (
                      <div key={`${selectedOrder.id}-${item.productId}`} className="flex items-center justify-between py-1.5">
                        <span>{item.name} × {item.quantity}</span>
                        <span>{formatMoney(item.price * item.quantity)}</span>
                      </div>
                    );
                  })}
                </div>
                <div className="flex items-center justify-between font-medium text-white pt-2 border-t border-white/10">
                  <span>الإجمالي</span>
                  <span>{formatMoney(selectedOrder.total)}</span>
                </div>
              </div>

              <button onClick={() => { if (confirm("حذف هذا الطلب؟")) deleteOrder(selectedOrder.id); }} className="mt-5 px-4 py-2 rounded-lg text-sm" style={{ background: "rgba(239,68,68,0.1)", color: "#ef4444", border: "1px solid rgba(239,68,68,0.2)" }}>حذف الطلب</button>
            </>
          ) : (
            <p className="text-sm" style={{ color: "#888" }}>اختر طلبًا لعرض التفاصيل.</p>
          )}
        </div>
      </div>
    </div>
  );
}

function CustomersManager() {
  const { customers, orders, addCustomer, updateCustomer } = useApp();
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(null);

  const selectedCustomer = customers.find((c) => c.id === selectedCustomerId) ?? customers[0] ?? null;
  const customerOrders = selectedCustomer ? orders.filter((o) => o.customerId === selectedCustomer.id) : [];

  return (
    <div dir="rtl">
      <div className="mb-8">
        <h2 className="font-display text-2xl font-bold text-white">إدارة العملاء</h2>
        <p className="text-sm mt-1" style={{ color: "#888" }}>{customers.length} عميل</p>
      </div>

      <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-6">
        <div className="space-y-3">
          {customers.length === 0 ? <p className="text-sm" style={{ color: "#888" }}>لا يوجد عملاء بعد.</p> : customers.map((customer) => (
            <button key={customer.id} onClick={() => setSelectedCustomerId(customer.id)} className="w-full rounded-xl p-4 text-right" style={{ background: selectedCustomer?.id === customer.id ? "rgba(245,197,24,0.08)" : "#141414", border: `1px solid ${selectedCustomer?.id === customer.id ? "rgba(245,197,24,0.4)" : "rgba(255,255,255,0.06)"}` }}>
              <div className="text-white font-medium">{customer.name}</div>
              <div className="text-xs mt-1" style={{ color: "#888" }}>{customer.email}</div>
            </button>
          ))}
        </div>

        <div className="rounded-xl p-5" style={{ background: "#141414", border: "1px solid rgba(255,255,255,0.06)" }}>
          {selectedCustomer ? (
            <>
              <h3 className="font-display text-xl font-bold text-white mb-4">تفاصيل العميل</h3>
              <div className="space-y-2 text-sm" style={{ color: "#ddd" }}>
                <div><span style={{ color: "#888" }}>الاسم:</span> {selectedCustomer.name}</div>
                <div><span style={{ color: "#888" }}>البريد:</span> {selectedCustomer.email}</div>
                <div><span style={{ color: "#888" }}>الهاتف:</span> {selectedCustomer.phone}</div>
                <div><span style={{ color: "#888" }}>العنوان:</span> {selectedCustomer.address}</div>
                <div><span style={{ color: "#888" }}>تاريخ الانضمام:</span> {new Date(selectedCustomer.joinedAt).toLocaleDateString("en-GB")}</div>
              </div>

              <div className="mt-6">
                <h4 className="font-semibold text-white mb-3">تاريخ الطلبات</h4>
                <div className="space-y-2">
                  {customerOrders.length === 0 ? <p className="text-sm" style={{ color: "#888" }}>لا توجد طلبات لهذا العميل.</p> : customerOrders.map((order) => (
                    <div key={order.id} className="rounded-lg p-3" style={{ background: "#1c1c1c" }}>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-white">{order.id}</span>
                        <span className="text-xs px-2 py-1 rounded-full" style={{ background: `${statusColor(order.status)}22`, color: statusColor(order.status) }}>{statusLabel(order.status)}</span>
                      </div>
                      <div className="text-xs mt-1" style={{ color: "#888" }}>{formatMoney(order.total)} · {new Date(order.createdAt).toLocaleDateString("en-GB")}</div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : <p className="text-sm" style={{ color: "#888" }}>اختر عميلًا لعرض تفاصيله.</p>}
        </div>
      </div>
    </div>
  );
}

function BannerManager() {
  const { banner, updateBanner } = useApp();
  const [localBanner, setLocalBanner] = useState(banner);
  const imgRef = useRef<HTMLInputElement>(null);
  const vidRef = useRef<HTMLInputElement>(null);
  const [saved, setSaved] = useState(false);

  const handleImageFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const b64 = await toBase64(file);
    setLocalBanner((prev) => ({ ...prev, imageUrl: b64, type: "image" }));
  };

  const handleVideoFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const b64 = await toBase64(file);
    setLocalBanner((prev) => ({ ...prev, videoUrl: b64, type: "video" }));
  };

  const handleSave = () => {
    updateBanner(localBanner);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div dir="rtl">
      <div className="mb-8">
        <h2 className="font-display text-2xl font-bold text-white">إدارة البانر</h2>
        <p className="text-sm mt-1" style={{ color: "#888" }}>تحكم في الصورة أو الفيديو الرئيسي للصفحة</p>
      </div>

      <div className="relative rounded-xl overflow-hidden mb-6 h-48 md:h-64" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
        {localBanner.type === "video" && localBanner.videoUrl ? (
          <video src={localBanner.videoUrl} autoPlay muted loop className="w-full h-full object-cover" />
        ) : (
          <img src={localBanner.imageUrl} alt="Banner preview" className="w-full h-full object-cover" style={{ opacity: 1, visibility: "visible", display: "block" }} />
        )}
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(10,10,10,0.7), transparent)" }} />
        <div className="absolute bottom-4 right-4"><span className="text-xs px-3 py-1 rounded-full" style={{ background: "rgba(0,0,0,0.7)", color: "#F5C518", border: "1px solid rgba(245,197,24,0.3)" }}>معاينة البانر</span></div>
      </div>

      <div className="mb-5">
        <label className="block text-sm mb-3" style={{ color: "#ccc" }}>نوع البانر</label>
        <div className="flex gap-3">
          {(["image", "video"] as const).map((t) => (
            <button key={t} onClick={() => setLocalBanner((prev) => ({ ...prev, type: t }))} className="px-5 py-2 rounded-lg text-sm transition-all" style={{ background: localBanner.type === t ? "rgba(245,197,24,0.15)" : "#1C1C1C", color: localBanner.type === t ? "#F5C518" : "#888", border: `1px solid ${localBanner.type === t ? "rgba(245,197,24,0.4)" : "rgba(255,255,255,0.1)"}` }}>{t === "image" ? "🖼️ صورة" : "🎬 فيديو"}</button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm mb-2" style={{ color: "#ccc" }}>صورة البانر</label>
          <div className="flex gap-2">
            <input className="form-input flex-1" value={localBanner.imageUrl.startsWith("data:") ? "" : localBanner.imageUrl} onChange={(e) => setLocalBanner((prev) => ({ ...prev, imageUrl: e.target.value }))} placeholder="رابط الصورة (URL)" dir="ltr" />
            <button onClick={() => imgRef.current?.click()} className="px-4 py-2 rounded-lg text-sm whitespace-nowrap" style={{ background: "#1C1C1C", color: "#F5C518", border: "1px solid rgba(245,197,24,0.3)" }}>رفع صورة</button>
          </div>
          <input ref={imgRef} type="file" accept="image/*" className="hidden" onChange={handleImageFile} />
        </div>

        <div>
          <label className="block text-sm mb-2" style={{ color: "#ccc" }}>فيديو البانر</label>
          <div className="flex gap-2">
            <input className="form-input flex-1" value={localBanner.videoUrl.startsWith("data:") ? "" : localBanner.videoUrl} onChange={(e) => setLocalBanner((prev) => ({ ...prev, videoUrl: e.target.value }))} placeholder="رابط الفيديو (URL)" dir="ltr" />
            <button onClick={() => vidRef.current?.click()} className="px-4 py-2 rounded-lg text-sm whitespace-nowrap" style={{ background: "#1C1C1C", color: "#F5C518", border: "1px solid rgba(245,197,24,0.3)" }}>رفع فيديو</button>
          </div>
          <input ref={vidRef} type="file" accept="video/*" className="hidden" onChange={handleVideoFile} />
        </div>

        <div>
          <label className="block text-sm mb-2" style={{ color: "#ccc" }}>العنوان الرئيسي</label>
          <input className="form-input" value={localBanner.headline} onChange={(e) => setLocalBanner((prev) => ({ ...prev, headline: e.target.value }))} />
        </div>

        <div>
          <label className="block text-sm mb-2" style={{ color: "#ccc" }}>النص المساند</label>
          <textarea className="form-input resize-none" rows={2} value={localBanner.subtext} onChange={(e) => setLocalBanner((prev) => ({ ...prev, subtext: e.target.value }))} />
        </div>

        <button onClick={handleSave} className="btn-gold px-6 py-2.5 rounded-lg text-sm">{saved ? "✓ تم الحفظ" : "حفظ التغييرات"}</button>
      </div>
    </div>
  );
}

function ContactManager() {
  const { contact, updateContact } = useApp();
  const [local, setLocal] = useState(contact);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    updateContact(local);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const fields = [
    { key: "phone" as const, label: "رقم الهاتف", placeholder: "050-000-0000", icon: "📞", hint: "مثال: 050-000-0000" },
    { key: "whatsapp" as const, label: "واتساب (رقم أو رابط)", placeholder: "9720500000000", icon: "💬", hint: "الرقم مع كود الدولة بدون +" },
    { key: "instagram" as const, label: "رابط إنستغرام", placeholder: "https://instagram.com/row.haifa", icon: "📸", hint: "الرابط الكامل" },
    { key: "facebook" as const, label: "رابط فيسبوك", placeholder: "https://facebook.com/row.haifa", icon: "👍", hint: "الرابط الكامل" },
  ];

  return (
    <div dir="rtl">
      <div className="mb-8">
        <h2 className="font-display text-2xl font-bold text-white">التواصل ووسائل التواصل الاجتماعي</h2>
        <p className="text-sm mt-1" style={{ color: "#888" }}>يتم عرض هذه البيانات في صفحة الزوار</p>
      </div>

      <div className="space-y-5">
        {fields.map((f) => (
          <div key={f.key}>
            <label className="block text-sm mb-2 flex items-center gap-2" style={{ color: "#ccc" }}><span>{f.icon}</span>{f.label}</label>
            <input className="form-input" value={local[f.key]} onChange={(e) => setLocal((prev) => ({ ...prev, [f.key]: e.target.value }))} placeholder={f.placeholder} dir="ltr" />
            <p className="text-xs mt-1" style={{ color: "#555" }}>{f.hint}</p>
          </div>
        ))}

        <button onClick={handleSave} className="btn-gold px-6 py-2.5 rounded-lg text-sm mt-2">{saved ? "✓ تم الحفظ" : "حفظ التغييرات"}</button>
      </div>
    </div>
  );
}

function StoreSettingsManager() {
  const { storeSettings, updateStoreSettings } = useApp();
  const [local, setLocal] = useState(storeSettings);
  const [saved, setSaved] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleLogoFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const dataUrl = await toBase64(file);
    setLocal((prev) => ({ ...prev, logoUrl: dataUrl }));
  };

  const handleSave = () => {
    updateStoreSettings(local);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div dir="rtl">
      <div className="mb-8">
        <h2 className="font-display text-2xl font-bold text-white">إعدادات المتجر</h2>
        <p className="text-sm mt-1" style={{ color: "#888" }}>إدارة اسم المتجر، الشعار، الاتصال والعملات</p>
      </div>

      <div className="space-y-5">
        <div>
          <label className="block text-sm mb-2" style={{ color: "#ccc" }}>اسم المتجر</label>
          <input className="form-input" value={local.storeName} onChange={(e) => setLocal((prev) => ({ ...prev, storeName: e.target.value }))} />
        </div>

        <div>
          <label className="block text-sm mb-2" style={{ color: "#ccc" }}>الشعار</label>
          <div className="space-y-3">
            {local.logoUrl && (
              <div className="w-24 h-24 rounded-xl overflow-hidden border" style={{ borderColor: "rgba(245,197,24,0.3)", background: "#000" }}>
                <img src={local.logoUrl} alt="Logo preview" className="w-full h-full object-cover" style={{ opacity: 1, visibility: "visible", display: "block" }} />
              </div>
            )}
            <div className="flex gap-3 items-center flex-wrap">
              <button type="button" onClick={() => fileRef.current?.click()} className="btn-gold px-4 py-2 rounded-lg text-sm">رفع صورة الشعار</button>
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleLogoFile} />
              <input
                className="form-input flex-1 min-w-[220px]"
                value={local.logoUrl}
                onChange={(e) => setLocal((prev) => ({ ...prev, logoUrl: e.target.value }))}
                placeholder="https://... أو رابط الصورة"
                dir="ltr"
              />
            </div>
          </div>
        </div>
        <div>
          <label className="block text-sm mb-2" style={{ color: "#ccc" }}>الهاتف</label>
          <input className="form-input" value={local.phone} onChange={(e) => setLocal((prev) => ({ ...prev, phone: e.target.value }))} dir="ltr" />
        </div>
        <div>
          <label className="block text-sm mb-2" style={{ color: "#ccc" }}>واتساب</label>
          <input className="form-input" value={local.whatsapp} onChange={(e) => setLocal((prev) => ({ ...prev, whatsapp: e.target.value }))} dir="ltr" />
        </div>
        <div>
          <label className="block text-sm mb-2" style={{ color: "#ccc" }}>إنستغرام</label>
          <input className="form-input" value={local.instagram} onChange={(e) => setLocal((prev) => ({ ...prev, instagram: e.target.value }))} dir="ltr" />
        </div>
        <div>
          <label className="block text-sm mb-2" style={{ color: "#ccc" }}>فيسبوك</label>
          <input className="form-input" value={local.facebook} onChange={(e) => setLocal((prev) => ({ ...prev, facebook: e.target.value }))} dir="ltr" />
        </div>
        <div>
          <label className="block text-sm mb-2" style={{ color: "#ccc" }}>العملة</label>
          <select className="form-input" value={local.currency} onChange={(e) => setLocal((prev) => ({ ...prev, currency: e.target.value }))}>
            <option value="ILS">ILS</option>
            <option value="USD">USD</option>
            <option value="SAR">SAR</option>
            <option value="EUR">EUR</option>
          </select>
        </div>

        <button onClick={handleSave} className="btn-gold px-6 py-2.5 rounded-lg text-sm mt-2">{saved ? "✓ تم الحفظ" : "حفظ التغييرات"}</button>
      </div>
    </div>
  );
}

const ALL_NAV_ITEMS: { id: AdminSection; label: string; icon: string }[] = [
  { id: "overview", label: "نظرة عامة", icon: "📊" },
  { id: "categories", label: "الأقسام", icon: "📂" },
  { id: "products", label: "المنتجات", icon: "🍽️" },
  { id: "orders", label: "الطلبات", icon: "🧾" },
  { id: "customers", label: "العملاء", icon: "👥" },
  { id: "banner", label: "البانر", icon: "🖼️" },
  { id: "contact", label: "التواصل", icon: "📞" },
  { id: "settings", label: "إعدادات المتجر", icon: "⚙️" },
];

export default function AdminDashboard() {
  const { logout, setCurrentPage, adminSection, setAdminSection, orders, customers, storeSettings } = useApp();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const brandLogo = storeSettings.logoUrl || logoUrl;

  const NAV_ITEMS = ALL_NAV_ITEMS.filter((item) => {
    if (item.id === "orders") return orders.length > 0;
    if (item.id === "customers") return customers.length > 0;
    return true;
  });

  useEffect(() => {
    if ((adminSection === "orders" || adminSection === "customers") && (orders.length === 0 || customers.length === 0)) {
      setAdminSection("overview");
    }
  }, [adminSection, orders.length, customers.length, setAdminSection]);

  const renderSection = () => {
    switch (adminSection) {
      case "overview": return <Overview />;
      case "categories": return <CategoriesManager />;
      case "products": return <ProductsManager />;
      case "orders": return <OrdersManager />;
      case "customers": return <CustomersManager />;
      case "banner": return <BannerManager />;
      case "contact": return <ContactManager />;
      case "settings": return <StoreSettingsManager />;
      default: return <Overview />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#0A0A0A" }}>
      <header className="flex items-center justify-between px-4 md:px-6 h-14 flex-shrink-0 z-50" style={{ background: "#111111", borderBottom: "1px solid rgba(245,197,24,0.1)" }}>
        <div className="flex items-center gap-3">
          <button className="md:hidden p-1.5 rounded-lg mr-1" style={{ color: "#888" }} onClick={() => setSidebarOpen(!sidebarOpen)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5"><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
          </button>
          <div className="w-8 h-8 rounded-full overflow-hidden" style={{ border: "1px solid rgba(245,197,24,0.3)", background: "#000000" }}>
            <img src={brandLogo} alt="ROW" className="w-full h-full object-cover" style={{ opacity: 1, visibility: "visible", display: "block", objectPosition: "center" }} />
          </div>
          <span className="font-display font-bold text-white text-sm">لوحة تحكم ROW</span>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => setCurrentPage("home")} className="text-xs px-3 py-1.5 rounded-lg transition-all hidden sm:block" style={{ background: "rgba(255,255,255,0.06)", color: "#ccc", border: "1px solid rgba(255,255,255,0.1)" }}>← الموقع</button>
          <button onClick={logout} className="text-xs px-3 py-1.5 rounded-lg transition-all" style={{ background: "rgba(239,68,68,0.1)", color: "#ef4444", border: "1px solid rgba(239,68,68,0.2)" }}>خروج</button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <aside className={`flex-shrink-0 transition-all duration-300 ${sidebarOpen ? "w-56" : "hidden"} md:block md:w-56`} style={{ background: "#111111", borderRight: "1px solid rgba(255,255,255,0.04)" }}>
          <nav className="p-3 space-y-1">
            {NAV_ITEMS.map((item) => (
              <button key={item.id} onClick={() => { setAdminSection(item.id); setSidebarOpen(false); }} className={`admin-nav-item w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-all${adminSection === item.id ? " active" : ""}`} style={{ color: adminSection === item.id ? "#F5C518" : "#888", background: adminSection === item.id ? "rgba(245,197,24,0.08)" : "transparent", borderLeft: `3px solid ${adminSection === item.id ? "#F5C518" : "transparent"}`, textAlign: "right", direction: "rtl" }}>
                <span className="text-base">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-5xl mx-auto">{renderSection()}</div>
        </main>
      </div>
    </div>
  );
}
