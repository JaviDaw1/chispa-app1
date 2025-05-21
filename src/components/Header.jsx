import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  User,
  LogIn,
  MessageCircle,
  Sparkles,
  Settings,
} from "lucide-react";
import LanguageSelector from "../components/LanguageSelector";
import { useTranslation } from 'react-i18next';
import Logo from "../../public/images/logo.jpg";

const Header = () => {
  const location = useLocation();
  const { t } = useTranslation();

  const [isAuthenticated, setIsAuthenticated] = useState(
    Boolean(localStorage.getItem("token") || localStorage.getItem("usuario"))
  );

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
        { label: t('header.nav.home'), icon: Home, path: "/" },
        { label: t('header.nav.matches'), icon: Sparkles, path: "/matches" },
        { label: t('header.nav.messages'), icon: MessageCircle, path: "/messages" },
        { label: t('header.nav.profile'), icon: User, path: "/profile" },
        { label: t('header.nav.settings'), icon: Settings, path: "/settings" },
      ]
    : [
        { label: t('header.nav.login'), icon: LogIn, path: "/login" },
      ];

  return (
    <>
      {/* Header grande (lg+) */}
      <nav className="hidden lg:flex justify-between items-center px-6 xl:px-10 py-4 bg-[#1E1E1E] border-b border-gray-700 shadow-md fixed top-0 left-0 w-full z-50">
        <div className="flex items-center gap-4">
          <img src={Logo} alt={t('header.title')} className="h-10 w-10 object-cover rounded-md" />
          <span className="text-2xl font-bold text-white">{t('header.title')}</span>
        </div>

        <ul className="flex items-center gap-6">
          {navItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <li key={item.label}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-2 transition text-base ${
                    isActive
                      ? "text-orange-500 font-semibold"
                      : "text-gray-300 hover:text-orange-500"
                  }`}
                >
                  <IconComponent className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}

          {!isAuthenticated && (
            <li>
              <LanguageSelector />
            </li>
          )}
        </ul>
      </nav>

      {/* Header móvil (sm, md) */}
      <nav className="lg:hidden fixed bottom-0 left-0 w-full bg-[#1E1E1E] border-t border-gray-700 shadow-inner z-50 py-2 px-4">
        <ul className="flex justify-around items-center">
          {navItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <li key={item.label}>
                <Link
                  to={item.path}
                  className={`flex flex-col items-center justify-center text-xs transition ${
                    isActive ? "text-orange-500" : "text-gray-400 hover:text-orange-500"
                  }`}
                >
                  <IconComponent className="w-6 h-6 md:w-7 md:h-7" />
                  <span className="mt-1 text-[10px] md:text-xs">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
        {!isAuthenticated && (
          <div className="mt-2 flex justify-center">
            <LanguageSelector />
          </div>
        )}
      </nav>
    </>
  );
};

export default Header;
