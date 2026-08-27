import { useEffect, useRef } from "react";
import { AppProvider, useApp } from "./context/AppContext";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import AdminDashboard from "./pages/AdminDashboard";
import logoUrl from "./imports/logo_row.jpeg";

function Router() {
  const { currentPage, isAdmin } = useApp();

  if (currentPage === "login") return <LoginPage />;
  if (currentPage === "admin") {
    if (!isAdmin) return <LoginPage />;
    return <AdminDashboard />;
  }
  return <HomePage />;
}

function AppShell() {
  const { currentPage, setCurrentPage, storeSettings } = useApp();
  const syncingFromUrl = useRef(false);
  const firstRouteEffect = useRef(true);

  useEffect(() => {
    const syncFromUrl = () => {
      syncingFromUrl.current = true;
      const hash = window.location.hash.toLowerCase();
      const path = window.location.pathname.toLowerCase();
      const route = hash.startsWith("#/") ? hash.slice(1) : path;
      if (route === "/admin") setCurrentPage("admin");
      else if (route === "/login") setCurrentPage("login");
      else setCurrentPage("home");
    };

    syncFromUrl();
    window.addEventListener("popstate", syncFromUrl);
    window.addEventListener("hashchange", syncFromUrl);
    return () => {
      window.removeEventListener("popstate", syncFromUrl);
      window.removeEventListener("hashchange", syncFromUrl);
    };
  }, [setCurrentPage]);

  useEffect(() => {
    const targetPath = currentPage === "admin" ? "#/admin" : currentPage === "login" ? "#/login" : "#/";
    const currentPath = window.location.hash.toLowerCase();

    if (firstRouteEffect.current || syncingFromUrl.current) {
      firstRouteEffect.current = false;
      syncingFromUrl.current = false;
      return;
    }

    if (currentPath !== targetPath) {
      window.history.pushState({}, "", targetPath);
    }
  }, [currentPage]);

  useEffect(() => {
    const favicon = document.querySelector<HTMLLinkElement>('link[rel="icon"]') ?? document.createElement("link");
    favicon.rel = "icon";
    favicon.href = storeSettings.logoUrl || logoUrl;
    if (!favicon.parentElement) document.head.appendChild(favicon);
  }, [storeSettings.logoUrl]);

  return <Router />;
}

export default function App() {
  return (
    <AppProvider>
      <AppShell />
    </AppProvider>
  );
}
