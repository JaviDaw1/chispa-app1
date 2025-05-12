import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, User, LogIn, MessageCircle, Sparkles, Settings } from "lucide-react";

const Header = () => {
  const location = useLocation();

  const [isAuthenticated, setIsAuthenticated] = useState(Boolean(localStorage.getItem("token") || localStorage.getItem("usuario")));

  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuthenticated(Boolean(localStorage.getItem("token") || localStorage.getItem("usuario")));
    };

    window.addEventListener("authChange", handleStorageChange);

    return () => {
      window.removeEventListener("authChange", handleStorageChange);
    };
  }, []);

  const navItems = isAuthenticated
  ? [
      { label: "Inicio", icon: Home, path: "/" },
      { label: "Mis Chispazos", icon: Sparkles, path: "/matches" },
      { label: "Mensajes", icon: MessageCircle, path: "/messages" },
      { label: "Perfil", icon: User, path: "/profile" },
      { label: "Configuración", icon: Settings, path: "/settings" },
    ]
  : [
      { label: "Iniciar Sesión", icon: LogIn, path: "/login" },
    ];

  return (
    <>
      {/* Header grande (lg+) */}
      <nav className="hidden lg:flex justify-between items-center px-6 py-4 bg-white shadow-md fixed top-0 left-0 w-full z-50">
        <div className="max-w-screen-xl w-full mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold text-pink-500">Chispa</div>
          <ul className="flex gap-8">
            {navItems.map((item) => {
              const IconComponent = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <li key={item.label}>
                  <Link
                    to={item.path}
                    className={`flex items-center gap-2 transition text-lg ${isActive ? "text-blue-600 font-semibold" : "text-gray-700 hover:text-blue-600"
                      }`}
                  >
                    <IconComponent className="w-5 h-5" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      {/* Header móvil (sm, md) */}
      <nav className="lg:hidden fixed bottom-0 left-0 w-full bg-white border-t shadow-inner z-50 py-3">
        <ul className="flex justify-around">
          {navItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <li key={item.label}>
                <Link
                  to={item.path}
                  className={`flex flex-col items-center text-xs transition ${isActive ? "text-blue-600" : "text-gray-600 hover:text-blue-600"
                    }`}
                >
                  <IconComponent className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />
                  {/* Si quieres mostrar texto en móvil, descomenta la línea de abajo */}
                  {/* <span className="mt-1">{item.label}</span> */}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
};

export default Header;
