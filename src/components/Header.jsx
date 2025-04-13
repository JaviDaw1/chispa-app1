import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, User, LogIn  } from "lucide-react";

const navItems = [
  { label: "Inicio", icon: <Home className="w-5 h-5" />, path: "/" },
  { label: "Perfil", icon: <User className="w-5 h-5" />, path: "/profile" },
  { label: "Iniciar Sesión", icon: <LogIn  className="w-5 h-5" />, path: "/login" },
];

const Header = () => {
  const location = useLocation();

  return (
    <>
      {/* Header superior (pantallas grandes) */}
      <nav className="hidden lg:flex justify-between items-center px-6 py-4 bg-white shadow-md fixed top-0 left-0 w-full z-50">
        <div className="text-xl font-bold">Chispa</div>
        <ul className="flex gap-6">
          {navItems.map((item) => (
            <li key={item.label}>
              <Link
                to={item.path}
                className={`flex items-center gap-2 hover:text-blue-600 transition ${
                  location.pathname === item.path ? "text-blue-600 font-semibold" : ""
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Header inferior (pantallas medianas y chicas) */}
      <nav className="lg:hidden fixed bottom-0 left-0 w-full bg-white border-t shadow-inner z-50">
        <ul className="flex justify-around py-2">
          {navItems.map((item) => (
            <li key={item.label}>
              <Link
                to={item.path}
                className={`flex flex-col items-center text-sm transition ${
                  location.pathname === item.path ? "text-blue-600 font-semibold" : "hover:text-blue-600"
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default Header;