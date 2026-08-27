import { useEffect } from "react";
import { AppProvider, useApp } from "./context/AppContext";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import AdminDashboard from "./pages/AdminDashboard";

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
  const { currentPage, setCurrentPage } = useApp();

  useEffect(() => {
    const syncFromUrl = () => {
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

    if (currentPath !== targetPath) {
      window.history.pushState({}, "", targetPath);
    }
  }, [currentPage]);

  return <Router />;
}

export default function App() {
  return (
    <AppProvider>
      <AppShell />
    </AppProvider>
  );
}
