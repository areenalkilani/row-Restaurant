import { createContext, useContext, useState, useEffect, useRef, ReactNode } from "react";
import {
  Category,
  Product,
  initialCategories,
  initialProducts,
  initialBanner,
  initialContact,
} from "../data/menuData";

export type Page = "home" | "login" | "admin";
export type AdminSection = "overview" | "categories" | "products" | "orders" | "customers" | "banner" | "contact" | "settings";

export interface BannerConfig {
  type: "image" | "video";
  imageUrl: string;
  videoUrl: string;
  headline: string;
  subtext: string;
}

export interface ContactInfo {
  phone: string;
  whatsapp: string;
  instagram: string;
  facebook: string;
}

export interface StoreSettings {
  storeName: string;
  logoUrl: string;
  phone: string;
  whatsapp: string;
  instagram: string;
  facebook: string;
  currency: string;
}

export interface OrderItem {
  productId: string;
  name: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  status: "pending" | "processing" | "shipped" | "completed" | "cancelled";
  items: OrderItem[];
  total: number;
  createdAt: string;
  notes?: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  notes?: string;
  joinedAt: string;
}

export const initialStoreSettings: StoreSettings = {
  storeName: "ROW Restaurant",
  logoUrl: "",
  phone: "",
  whatsapp: "",
  instagram: "",
  facebook: "",
  currency: "ILS",
};

export const initialCustomers: Customer[] = [];
export const initialOrders: Order[] = [];

interface AppContextType {
  // Auth
  isLoggedIn: boolean;
  isAdmin: boolean;
  userEmail: string;
  login: (email: string, password: string) => boolean;
  logout: () => void;

  // Navigation
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  adminSection: AdminSection;
  setAdminSection: (section: AdminSection) => void;

  // Categories
  categories: Category[];
  addCategory: (cat: Omit<Category, "id">) => void;
  updateCategory: (id: string, updates: Partial<Category>) => void;
  deleteCategory: (id: string) => void;

  // Products
  products: Product[];
  addProduct: (prod: Omit<Product, "id">) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;

  // Banner
  banner: BannerConfig;
  updateBanner: (b: Partial<BannerConfig>) => void;

  // Contact
  contact: ContactInfo;
  updateContact: (c: Partial<ContactInfo>) => void;

  // Store settings
  storeSettings: StoreSettings;
  updateStoreSettings: (settings: Partial<StoreSettings>) => void;

  // Customers & orders
  customers: Customer[];
  orders: Order[];
  addCustomer: (customer: Omit<Customer, "id" | "joinedAt">) => Customer;
  updateCustomer: (id: string, customer: Partial<Customer>) => void;
  addOrder: (order: Omit<Order, "id" | "createdAt">) => Order;
  updateOrderStatus: (id: string, status: Order["status"]) => void;
  deleteOrder: (id: string) => void;
}

const AppContext = createContext<AppContextType | null>(null);

const ADMIN_EMAIL = "deenaabed5@gmail.com";
const ADMIN_PASS = "123456789";

const LS = {
  get: <T,>(key: string, fallback: T): T => {
    try {
      const v = localStorage.getItem(key);
      return v ? (JSON.parse(v) as T) : fallback;
    } catch {
      return fallback;
    }
  },
  set: (key: string, value: unknown) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {}
  },
};

type PersistedState = {
  categories: Category[];
  products: Product[];
  banner: BannerConfig;
  contact: ContactInfo;
  storeSettings: StoreSettings;
  customers: Customer[];
  orders: Order[];
};

const STATE_KEYS = {
  categories: "row_categories",
  products: "row_products",
  banner: "row_banner",
  contact: "row_contact",
  storeSettings: "row_store_settings",
  customers: "row_customers",
  orders: "row_orders",
  revision: "row_state_revision",
};

const withCategoryOrder = (items: Category[]) =>
  items
    .map((category, index) => ({
      ...category,
      order: Number.isFinite(Number(category.order)) ? Number(category.order) : index + 1,
    }))
    .sort((a, b) => a.order - b.order)
    .map((category, index) => ({ ...category, order: index + 1 }));

const persistStateLocally = (state: PersistedState, revision: number) => {
  LS.set(STATE_KEYS.categories, state.categories);
  LS.set(STATE_KEYS.products, state.products);
  LS.set(STATE_KEYS.banner, state.banner);
  LS.set(STATE_KEYS.contact, state.contact);
  LS.set(STATE_KEYS.storeSettings, state.storeSettings);
  LS.set(STATE_KEYS.customers, state.customers);
  LS.set(STATE_KEYS.orders, state.orders);
  LS.set(STATE_KEYS.revision, revision);
};

export function AppProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(() => LS.get("row_logged_in", false));
  const [isAdmin, setIsAdmin] = useState(() => LS.get("row_is_admin", false));
  const [userEmail, setUserEmail] = useState(() => LS.get("row_user_email", ""));
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [adminSection, setAdminSection] = useState<AdminSection>("overview");
  const databaseReady = useRef(false);
  const saveQueue = useRef(Promise.resolve());
  const stateRevision = useRef(LS.get(STATE_KEYS.revision, 0));

  const [categories, setCategories] = useState<Category[]>(() => {
    const savedCategories = LS.get(STATE_KEYS.categories, initialCategories);
    return withCategoryOrder(savedCategories).map((category) => {
      const seedCategory = initialCategories.find((seed) => seed.id === category.id);
      const isMenuPageImage = ["min1.jpeg", "min2.jpeg", "min3.jpeg", "min4.jpeg", "min5.jpeg"].some((fileName) => category.image.includes(fileName));
      return isMenuPageImage && seedCategory ? { ...category, image: seedCategory.image } : category;
    });
  });
  const [products, setProducts] = useState<Product[]>(() => {
    const savedProducts = LS.get(STATE_KEYS.products, initialProducts);
    return savedProducts.map((product) => {
      const seedProduct = initialProducts.find((seed) => seed.id === product.id);
      const isMenuPageImage = ["min1.jpeg", "min2.jpeg", "min3.jpeg", "min4.jpeg", "min5.jpeg"].some((fileName) => product.image.includes(fileName));
      return isMenuPageImage && seedProduct ? { ...product, image: seedProduct.image } : product;
    });
  });
  const [banner, setBanner] = useState<BannerConfig>(() => {
    const savedBanner = LS.get(STATE_KEYS.banner, initialBanner);
    if (savedBanner.headline === "مرحباً بكم في ROW") {
      return { ...savedBanner, headline: initialBanner.headline };
    }
    if (
      savedBanner.subtext === "تجربة طعام استثنائية في جنين — نكهات أصيلة وأجواء لا تُنسى" ||
      savedBanner.subtext === "تجربة طعام استثنائية من قلب جنين — من أفضل ما في شارع حيفا"
    ) {
      return { ...savedBanner, subtext: initialBanner.subtext };
    }
    return savedBanner;
  });
  const [contact, setContact] = useState<ContactInfo>(() =>
    LS.get(STATE_KEYS.contact, initialContact)
  );
  const [storeSettings, setStoreSettings] = useState<StoreSettings>(() =>
    LS.get(STATE_KEYS.storeSettings, initialStoreSettings)
  );
  const [customers, setCustomers] = useState<Customer[]>(() =>
    LS.get(STATE_KEYS.customers, initialCustomers)
  );
  const [orders, setOrders] = useState<Order[]>(() =>
    LS.get(STATE_KEYS.orders, initialOrders)
  );

  useEffect(() => {
    let active = true;
    fetch("/api/state")
      .then(async (response) => {
        if (!response.ok) return null;
        return {
          revision: Number(response.headers.get("X-State-Revision")) || 0,
          state: (await response.json()) as PersistedState | null,
        };
      })
      .then((remote) => {
        if (!active) return;
        if (remote?.state && remote.revision > stateRevision.current) {
          const saved = remote.state;
          const remoteBanner = saved.banner || initialBanner;
          const remoteCategories = withCategoryOrder(saved.categories || initialCategories);
          setCategories(remoteCategories);
          setProducts(saved.products || initialProducts);
          setBanner(remoteBanner.headline === "مرحباً بكم في ROW" ? { ...remoteBanner, headline: initialBanner.headline } : remoteBanner);
          setContact(saved.contact || initialContact);
          setStoreSettings(saved.storeSettings || initialStoreSettings);
          setCustomers(saved.customers || initialCustomers);
          setOrders(saved.orders || initialOrders);
          stateRevision.current = remote.revision;
          persistStateLocally(
            {
              categories: remoteCategories,
              products: saved.products || initialProducts,
              banner: remoteBanner,
              contact: saved.contact || initialContact,
              storeSettings: saved.storeSettings || initialStoreSettings,
              customers: saved.customers || initialCustomers,
              orders: saved.orders || initialOrders,
            },
            remote.revision,
          );
        } else {
          const initialState: PersistedState = { categories, products, banner, contact, storeSettings, customers, orders };
          stateRevision.current = Math.max(Date.now(), stateRevision.current + 1);
          persistStateLocally(initialState, stateRevision.current);
          saveQueue.current = saveQueue.current.then(() => fetch("/api/state", {
            method: "PUT",
            headers: { "Content-Type": "application/json", "X-State-Revision": String(stateRevision.current) },
            body: JSON.stringify(initialState),
          }).then(() => undefined).catch(() => undefined));
        }
        databaseReady.current = true;
      })
      .catch(() => {
        databaseReady.current = true;
      });
    return () => { active = false; };
  }, []);

  useEffect(() => {
    if (!databaseReady.current) return;
    const state: PersistedState = { categories, products, banner, contact, storeSettings, customers, orders };
    stateRevision.current = Math.max(Date.now(), stateRevision.current + 1);
    const revision = stateRevision.current;
    persistStateLocally(state, revision);
    saveQueue.current = saveQueue.current.then(() => fetch("/api/state", {
      method: "PUT",
      headers: { "Content-Type": "application/json", "X-State-Revision": String(revision) },
      body: JSON.stringify(state),
    }).then((response) => {
      if (!response.ok) throw new Error(`State save failed: ${response.status}`);
    }).catch(() => undefined));
  }, [categories, products, banner, contact, storeSettings, customers, orders]);

  const login = (email: string, password: string): boolean => {
    if (email === ADMIN_EMAIL && password === ADMIN_PASS) {
      setIsLoggedIn(true);
      setIsAdmin(true);
      setUserEmail(email);
      LS.set("row_logged_in", true);
      LS.set("row_is_admin", true);
      LS.set("row_user_email", email);
      return true;
    }
    // any other credentials = normal user (demo: non-empty email + password)
    if (email && password) {
      setIsLoggedIn(true);
      setIsAdmin(false);
      setUserEmail(email);
      LS.set("row_logged_in", true);
      LS.set("row_is_admin", false);
      LS.set("row_user_email", email);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
    setUserEmail("");
    LS.set("row_logged_in", false);
    LS.set("row_is_admin", false);
    LS.set("row_user_email", "");
    setCurrentPage("home");
  };

  const markStateChanged = () => {
    if (!databaseReady.current) databaseReady.current = true;
  };

  const addCategory = (cat: Omit<Category, "id">) => {
    markStateChanged();
    const next: Category = {
      ...cat,
      id: `cat-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    };
    setCategories((prev) => {
      const ordered = withCategoryOrder(prev);
      const order = Math.min(Math.max(1, Math.round(Number(next.order) || ordered.length + 1)), ordered.length + 1);
      ordered.splice(order - 1, 0, { ...next, order });
      return withCategoryOrder(ordered);
    });
  };

  const updateCategory = (id: string, updates: Partial<Category>) => {
    markStateChanged();
    setCategories((prev) => {
      const ordered = withCategoryOrder(prev);
      const currentIndex = ordered.findIndex((category) => category.id === id);
      if (currentIndex === -1) return ordered;
      const updated = { ...ordered[currentIndex], ...updates };
      ordered.splice(currentIndex, 1);
      if (updates.order !== undefined) {
        const nextIndex = Math.min(Math.max(0, Math.round(Number(updates.order) || 1) - 1), ordered.length);
        ordered.splice(nextIndex, 0, updated);
      } else {
        ordered.splice(currentIndex, 0, updated);
      }
      return withCategoryOrder(ordered);
    });
  };

  const deleteCategory = (id: string) => {
    markStateChanged();
    setCategories((prev) => prev.filter((c) => c.id !== id));
    setProducts((prev) => prev.filter((p) => p.categoryId !== id));
  };

  const addProduct = (prod: Omit<Product, "id">) => {
    markStateChanged();
    const next: Product = { ...prod, id: `prod-${Date.now()}-${Math.random().toString(36).slice(2, 8)}` };
    setProducts((prev) => [...prev, next]);
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    markStateChanged();
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
    );
  };

  const deleteProduct = (id: string) => {
    markStateChanged();
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const updateBanner = (b: Partial<BannerConfig>) => {
    markStateChanged();
    setBanner((prev) => ({ ...prev, ...b }));
  };

  const updateContact = (c: Partial<ContactInfo>) => {
    markStateChanged();
    setContact((prev) => ({ ...prev, ...c }));
  };

  const updateStoreSettings = (settings: Partial<StoreSettings>) => {
    markStateChanged();
    setStoreSettings((prev) => ({ ...prev, ...settings }));
  };

  const addCustomer = (customer: Omit<Customer, "id" | "joinedAt">): Customer => {
    markStateChanged();
    const next: Customer = {
      ...customer,
      id: `cust-${Date.now()}`,
      joinedAt: new Date().toISOString(),
    };
    setCustomers((prev) => [next, ...prev]);
    return next;
  };

  const updateCustomer = (id: string, customer: Partial<Customer>) => {
    markStateChanged();
    setCustomers((prev) => prev.map((c) => (c.id === id ? { ...c, ...customer } : c)));
  };

  const addOrder = (order: Omit<Order, "id" | "createdAt">): Order => {
    markStateChanged();
    const next: Order = {
      ...order,
      id: `ord-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    setOrders((prev) => [next, ...prev]);
    return next;
  };

  const updateOrderStatus = (id: string, status: Order["status"]) => {
    markStateChanged();
    setOrders((prev) => prev.map((order) => (order.id === id ? { ...order, status } : order)));
  };

  const deleteOrder = (id: string) => {
    markStateChanged();
    setOrders((prev) => prev.filter((order) => order.id !== id));
  };

  return (
    <AppContext.Provider
      value={{
        isLoggedIn,
        isAdmin,
        userEmail,
        login,
        logout,
        currentPage,
        setCurrentPage,
        adminSection,
        setAdminSection,
        categories,
        addCategory,
        updateCategory,
        deleteCategory,
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        banner,
        updateBanner,
        contact,
        updateContact,
        storeSettings,
        updateStoreSettings,
        customers,
        orders,
        addCustomer,
        updateCustomer,
        addOrder,
        updateOrderStatus,
        deleteOrder,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be inside AppProvider");
  return ctx;
}
