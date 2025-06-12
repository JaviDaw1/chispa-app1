import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Lock,
  Bell,
  Ban,
  Book,
  HelpCircle,
  LogOut,
  Languages,
  Sun,
  Moon,
} from "lucide-react";
import Header from "../components/Header";
import Modal from "../components/Modal";
import SettingItem from "../components/SettingItem";
import GuidedTutorial from "../components/GuidedTutorial";
import AuthService from "../services/AuthService";
import { useTranslation } from "react-i18next";

const authService = new AuthService();

export default function Settings() {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [showTutorial, setShowTutorial] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  // Estado para modo oscuro/claro
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      return (
        localStorage.getItem("theme") === "dark" ||
        (!localStorage.getItem("theme") &&
          window.matchMedia("(prefers-color-scheme: dark)").matches)
      );
    }
    return false;
  });

  // Función para alternar modo
  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    if (newMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const handleLogout = async () => {
    try {
      await authService.logout();
      navigate("/", { replace: true });
    } catch (err) {
      console.error("Error al cerrar sesión:", err);
      navigate("/", { replace: true });
    }
  };

  const handleCloseTutorial = () => {
    setShowTutorial(false);
  };

  const settingItemClass = `
  flex items-center justify-between 
  bg-white dark:bg-gray-900 p-6 rounded-2xl 
  shadow-md hover:shadow-lg 
  transition-shadow duration-300 
  border border-gray-200 dark:border-gray-700
  hover:border-gray-300 dark:hover:border-gray-500
  group
`;

  return (
    <div className="min-h-screen py-16 px-6 sm:px-8 lg:px-12 lg:pt-24 ">
      <Header />
      <div className="max-w-lg mx-auto pb-16 lg:pt-6">
        <div className="mb-6 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight">
            {t("settings.title")}
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2 text-lg max-w-xs mx-auto leading-relaxed">
            {t("settings.subtitle")}
          </p>
        </div>

        {/* Settings Grid */}
        <div className="space-y-4">
          {[
            {
              to: "/settings/change-password",
              icon: <Lock className="text-rose-600 w-6 h-6" />,
              title: t("settings.security"),
              subtitle: t("settings.security_sub"),
              aria: "settings.security",
            },
            // {
            //   to: "/settings/notifications",
            //   icon: <Bell className="text-amber-600 w-6 h-6" />,
            //   title: t("settings.notifications"),
            //   subtitle: t("settings.notifications_sub"),
            //   aria: "settings.notifications",
            // },
            {
              to: "/settings/languages",
              icon: <Languages className="text-sky-600 w-6 h-6" />,
              title: t("settings.language"),
              subtitle: t("settings.language_sub"),
              aria: "settings.language",
            },
            {
              to: "/settings/blocked-users",
              icon: <Ban className="text-red-600 w-6 h-6" />,
              title: t("settings.blocked"),
              subtitle: t("settings.blocked_sub"),
              aria: "settings.blocked",
            },

            {
              to: "/settings/support",
              icon: <HelpCircle className="text-green-600 w-6 h-6" />,
              title: t("settings.support"),
              subtitle: t("settings.support_sub"),
              aria: "settings.support",
            },
          ].map(({ to, icon, title, subtitle, aria }) => (
            <Link
              key={to}
              to={to}
              className={settingItemClass}
              aria-label={t(aria)}
            >
              <SettingItem icon={icon} title={title} subtitle={subtitle} />
            </Link>
          ))}

          {/* Tutorial Button */}
          <div
            className={settingItemClass + " cursor-pointer"}
            onClick={() => setShowTutorial(true)}
            role="button"
            tabIndex={0}
            aria-label={t("settings.toggleTheme")}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") setShowTutorial(true);
            }}
          >
            <SettingItem
              icon={<Book className="text-blue-600 w-6 h-6" />}
              title={t("settings.tutorial")}
              subtitle={t("settings.tutorial_sub")}
            />
          </div>

          {/* Tema oscuro/claro */}
          <div
            className={settingItemClass + " cursor-pointer"}
            onClick={toggleDarkMode}
            role="button"
            tabIndex={0}
            aria-label={t("settings.toggleTheme")}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") toggleDarkMode();
            }}
          >
            <SettingItem
              icon={
                isDarkMode ? (
                  <Sun className="text-yellow-400 w-6 h-6" />
                ) : (
                  <Moon className="text-gray-600 w-6 h-6" />
                )
              }
              title={t("settings.theme")}
              subtitle={
                isDarkMode ? t("settings.theme_dark") : t("settings.theme_light")
              }
            />
          </div>

          {/* Logout Button */}
          <button
            onClick={() => setShowLogoutModal(true)}
            className={`
              ${settingItemClass} 
              w-full text-left
              border-red-300 hover:border-red-400
              bg-red-50 hover:bg-red-100 dark:border-red-600 dark:hover:border-red-500
            `}
            aria-label={t("settings.logout")}
          >
            <SettingItem
              icon={<LogOut className="text-red-600 w-6 h-6" />}
              title={t("settings.logout")}
              subtitle={t("settings.logout_sub")}
            />
          </button>
        </div>
      </div>

      {/* Logout Modal */}
      <Modal
        show={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogout}
        message={t("settings.logout_confirm")}
        confirmText={t("settings.logout")}
        cancelText={t("modal.cancel")}
        confirmColor="red"
      />

      <GuidedTutorial show={showTutorial} onClose={handleCloseTutorial} />
    </div>
  );
}
