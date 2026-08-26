import { useState } from "react";
import { useApp } from "../context/AppContext";
import logoUrl from "../imports/logo_row.jpeg";

export default function LoginPage() {
  const { login, setCurrentPage } = useApp();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    const ok = login(email.trim(), password);
    setLoading(false);
    if (ok) {
      const isAdminLogin = email.trim().toLowerCase() === "deenaabed5@gmail.com";
      setCurrentPage(isAdminLogin ? "admin" : "home");
    } else {
      setError("البريد الإلكتروني أو كلمة المرور غير صحيحة");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-16"
      style={{ background: "linear-gradient(135deg, #0A0A0A 0%, #141414 50%, #0A0A0A 100%)" }}
    >
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #F5C518 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative w-full max-w-md animate-scaleIn">
        {/* Card */}
        <div
          className="rounded-2xl p-8 md:p-10"
          style={{
            background: "#141414",
            border: "1px solid rgba(245,197,24,0.15)",
            boxShadow: "0 40px 80px rgba(0,0,0,0.6), 0 0 60px rgba(245,197,24,0.05)",
          }}
        >
          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <div
              className="w-24 h-24 rounded-full flex items-center justify-center mb-4 overflow-hidden"
              style={{
                background: "#000000",
                border: "2px solid rgba(245,197,24,0.3)",
                boxShadow: "0 0 30px rgba(245,197,24,0.1)",
              }}
            >
              <img
                src={logoUrl}
                alt="ROW Restaurant"
                className="w-full h-full object-cover"
                style={{ objectPosition: "center" }}
              />
            </div>
            <h1 className="font-display text-2xl font-bold text-white">تسجيل الدخول</h1>
            <p className="text-sm mt-1" style={{ color: "#888" }}>
              ROW Restaurant & Cafe
            </p>
          </div>

          {/* Gold divider */}
          <div className="gold-line mb-8" />

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: "#ccc" }} dir="rtl">
                البريد الإلكتروني
              </label>
              <input
                className="form-input"
                type="email"
                placeholder="example@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                dir="ltr"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: "#ccc" }} dir="rtl">
                كلمة المرور
              </label>
              <div className="relative">
                <input
                  className="form-input"
                  type={showPass ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  dir="ltr"
                  style={{ paddingRight: "2.5rem" }}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  style={{ fontSize: "14px" }}
                >
                  {showPass ? "🙈" : "👁"}
                </button>
              </div>
            </div>

            {error && (
              <div
                className="text-sm text-center py-2 px-4 rounded-lg"
                style={{ background: "rgba(220,38,38,0.1)", color: "#f87171", border: "1px solid rgba(220,38,38,0.2)" }}
                dir="rtl"
              >
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-gold w-full py-3 rounded-xl text-sm font-bold tracking-wide mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span
                    className="inline-block w-4 h-4 border-2 border-black/30 border-t-black rounded-full"
                    style={{ animation: "spin 0.6s linear infinite" }}
                  />
                  جاري الدخول...
                </span>
              ) : (
                "تسجيل الدخول"
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <button
              onClick={() => setCurrentPage("home")}
              className="text-sm transition-colors"
              style={{ color: "#888" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#F5C518")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#888")}
            >
              ← العودة للرئيسية
            </button>
          </div>
        </div>

        <p className="text-center text-xs mt-6" style={{ color: "#444" }}>
          Built by{" "}
          <a
            href="https://sitecraft.ps"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors"
            style={{ color: "#666" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#F5C518")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#666")}
          >
            SiteCraft.ps
          </a>
        </p>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
