// This component is the Header component that displays the navigation bar with links to different sections of the application. It also includes language and theme switchers for user customization.
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
import ThemeSwitcher from "../components/ThemeSwitcher";
import { useTranslation } from "react-i18next";

const Header = () => {
  const location = useLocation();
  const { t } = useTranslation();

  // State to manage authentication status
  const [isAuthenticated, setIsAuthenticated] = useState(
    Boolean(localStorage.getItem("token") || localStorage.getItem("usuario"))
  );

  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuthenticated(
        Boolean(localStorage.getItem("token") || localStorage.getItem("usuario"))
      );
    };

    window.addEventListener("authChange", handleStorageChange);
    return () => {
      window.removeEventListener("authChange", handleStorageChange);
    };
  }, []);

  // Define navigation items based on authentication status
  const navItems = isAuthenticated
    ? [
        { label: t("header.nav.home"), icon: Home, path: "/" },
        { label: t("header.nav.matches"), icon: Sparkles, path: "/matches" },
        { label: t("header.nav.messages"), icon: MessageCircle, path: "/messages" },
        { label: t("header.nav.profile"), icon: User, path: "/profile" },
        { label: t("header.nav.settings"), icon: Settings, path: "/settings" },
      ]
    : [{ label: t("header.nav.login"), icon: LogIn, path: "/login" }];

  return (
    <>
      {/* General Header */}
      <nav className="hidden lg:flex justify-between items-center px-8 py-4 bg-white dark:bg-gray-900 dark:text-gray-100 shadow-md fixed top-0 left-0 w-full z-50 border-b border-gray-200 dark:border-gray-700 transition-all">
        <div className="max-w-screen-xl mx-auto flex items-center justify-between w-full">
          <div className="flex items-center gap-3">
            <img
              src="/images/logo.jpg"
              alt={t("header.title")}
              className="h-10 w-10 rounded-2xl shadow-md"
            />
            <span className="text-2xl font-extrabold tracking-tight text-gray-800 dark:text-white">
              {t("header.title")}
            </span>
          </div>
          <ul className="flex items-center gap-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <li key={item.label}>
                  <Link
                    to={item.path}
                    className={`flex items-center gap-2 text-base font-medium transition-colors duration-200 ${
                      isActive
                        ? "text-orange-600"
                        : "text-gray-600 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {item.label}
                  </Link>
                </li>
              );
            })}
            {!isAuthenticated && (
              <>
                <li>
                  <LanguageSelector />
                </li>
                <li>
                  <ThemeSwitcher />
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>

      {/* Mobile Header */}
      <nav className="lg:hidden fixed bottom-0 left-0 w-full bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 shadow-inner z-50 py-2">
        <ul className="flex justify-around items-center">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <li key={item.label}>
                <Link
                  to={item.path}
                  className={`flex flex-col items-center justify-center transition-colors duration-200 ${
                    isActive
                      ? "text-orange-600"
                      : "text-gray-600 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400"
                  }`}
                >
                  <Icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />
                  <span className="mt-1 text-xs">{item.label}</span>
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
