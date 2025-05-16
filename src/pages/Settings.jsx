import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Lock,
  Bell,
  Ban,
  Book,
  HelpCircle,
  LogOut,
  Languages 
} from "lucide-react";
import Header from "../components/Header";
import Modal from "../components/Modal";
import SettingItem from "../components/SettingItem";
import AuthService from "../services/AuthService";
import { useTranslation } from "react-i18next";

const authService = new AuthService();

export default function Settings() {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleLogout = async () => {
    try {
      await authService.logout();
      navigate("/", { replace: true });
    } catch (err) {
      console.error("Error al cerrar sesión:", err);
      navigate("/", { replace: true });
    }
  };

  const settingItemClass = `
    flex items-center justify-between 
    bg-white p-6 rounded-2xl 
    shadow-md hover:shadow-lg 
    transition-shadow duration-300 
    border border-gray-200
    hover:border-gray-300
    group
  `;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 py-16 px-6 sm:px-8 lg:px-12 lg:pt-24">
      <Header />

      <div className="max-w-lg mx-auto pb-16 lg:pt-6">
        {/* Header Section */}
        <div className="mb-6 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            {t("settings.title")}
          </h1>
          <p className="text-gray-600 mt-2 text-lg max-w-xs mx-auto leading-relaxed">
            {t("settings.subtitle")}
          </p>
        </div>

        {/* Settings Grid */}
        <div className="space-y-4">
          {[{
            to: "/settings/security",
            icon: <Lock className="text-rose-600 w-6 h-6" />,
            title: t("settings.security"),
            subtitle: t("settings.security_sub"),
            aria: "settings.security"
          }, {
            to: "/settings/notifications",
            icon: <Bell className="text-amber-600 w-6 h-6" />,
            title: t("settings.notifications"),
            subtitle: t("settings.notifications_sub"),
            aria: "settings.notifications"
          }, {
            to: "/languages",
            icon: <Languages className="text-sky-600 w-6 h-6" />,
            title: t("settings.language"),
            subtitle: t("settings.language_sub"),
            aria: "settings.language"
          }, {
            to: "/blockedUsers",
            icon: <Ban className="text-red-600 w-6 h-6" />,
            title: t("settings.blocked"),
            subtitle: t("settings.blocked_sub"),
            aria: "settings.blocked"
          }, {
            to: "/settings/documentation",
            icon: <Book className="text-blue-600 w-6 h-6" />,
            title: t("settings.docs"),
            subtitle: t("settings.docs_sub"),
            aria: "settings.docs"
          }, {
            to: "/settings/support",
            icon: <HelpCircle className="text-green-600 w-6 h-6" />,
            title: t("settings.support"),
            subtitle: t("settings.support_sub"),
            aria: "settings.support"
          }].map(({ to, icon, title, subtitle, aria }) => (
            <Link
              key={to}
              to={to}
              className={settingItemClass}
              aria-label={t(aria)}
            >
              <SettingItem icon={icon} title={title} subtitle={subtitle} />
            </Link>
          ))}

          {/* Logout Button */}
          <button
            onClick={() => setShowLogoutModal(true)}
            className={`
              ${settingItemClass} 
              w-full text-left
              border-red-300 hover:border-red-400
              bg-red-50 hover:bg-red-100
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
    </div>
  );
}
