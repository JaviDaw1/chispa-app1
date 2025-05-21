import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, User, LogIn, MessageCircle, Sparkles, Settings } from "lucide-react";
import LanguageSelector from "../components/LanguageSelector";
import ThemeSwitcher from "../components/ThemeSwitcher"; 
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
      <nav className="hidden lg:flex justify-between items-center px-6 py-4 bg-white dark:bg-gray-900 dark:text-gray-200 shadow-md dark:shadow-lg fixed top-0 left-0 w-full z-50">
        <div className="max-w-screen-xl w-full mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img src={Logo} alt={t('header.title')} className="h-10" />
            <div className="text-2xl font-bold">{t('header.title')}</div>
          </div>

          <ul className="flex items-center gap-6">
            {navItems.map((item) => {
              const IconComponent = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <li key={item.label}>
                  <Link
                    to={item.path}
                    className={`flex items-center gap-2 transition text-lg ${
                      isActive ? "text-orange-600 font-semibold" : "text-gray-700 hover:text-orange-600"
                    }`}
                  >
                    <IconComponent className="w-5 h-5" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
            {!isAuthenticated && (
              <>
                <li><LanguageSelector /></li>
                <li><ThemeSwitcher /></li> {/* ✅ Añadido el ThemeSwitcher */}
              </>
            )}
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
                  className={`flex flex-col items-center text-xs transition ${
                    isActive ? "text-orange-600" : "text-gray-600 hover:text-orange-600"
                  }`}
                >
                  <IconComponent className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />
                  <span className="mt-1 text-xs">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>

        {!isAuthenticated && (
          <div className="absolute top-[-60px] right-4 flex items-center gap-3">
            <LanguageSelector showText={false} />
            <ThemeSwitcher /> {/* ✅ Añadido también para móvil */}
          </div>
        )}
      </nav>
    </>
  );
};

export default Header;
