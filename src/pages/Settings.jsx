import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Lock,
  Bell,
  Ban,
  Book,
  HelpCircle,
  LogOut,
} from "lucide-react";
import Header from "../components/Header";
import Modal from "../components/Modal";
import SettingItem from "../components/SettingItem";
import AuthService from "../services/AuthService";
import { useTranslation } from "react-i18next"; // Importa useTranslation

const authService = new AuthService();

export default function Settings() {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation(); // Obtén las traducciones

  const handleLogout = () => {
    authService.logout();
    setShowLogoutModal(false);
    navigate("/login");
  };

  const itemClass =
    "flex items-center justify-between bg-white p-4 rounded-xl shadow hover:shadow-md transition-all";

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8 lg:mt-16 sm:mb-8 mb-4">
      <Header />
      <div className="max-w-3xl mx-auto flex flex-col items-center">
        <div className="mb-10">
          <h1 className="text-3xl font-extrabold text-gray-900 text-center">
            {t("settings.title")} {/* Traducción de título */}
          </h1>
          <p className="text-gray-600 mt-2 text-center">
            {t("settings.subtitle")} {/* Traducción de descripción */}
          </p>
        </div>

        <div className="space-y-4">
          <Link to="/settings/security" className={itemClass}>
            <SettingItem
              icon={<Lock className="text-rose-600" />}
              title={t("settings.security")} 
              subtitle={t("settings.security_sub")}
            />
          </Link>

          <Link to="/settings/notifications" className={itemClass}>
            <SettingItem
              icon={<Bell className="text-amber-500" />}
              title={t("settings.notifications")}
              subtitle={t("settings.notifications_sub")} 
            />
          </Link>

          <Link to="/blockedUsers" className={itemClass}>
            <SettingItem
              icon={<Ban className="text-red-500" />}
              title={t("settings.blocked")} 
              subtitle={t("settings.blocked_sub")} 
            />
          </Link>

          <Link to="/settings/documentation" className={itemClass}>
            <SettingItem
              icon={<Book className="text-blue-500" />}
              title={t("settings.docs")}
              subtitle={t("settings.docs_sub")} 
            />
          </Link>

          <Link to="/settings/support" className={itemClass}>
            <SettingItem
              icon={<HelpCircle className="text-green-600" />}
              title={t("settings.support")} 
              subtitle={t("settings.support_sub")} 
            />
          </Link>

          <button
            onClick={() => setShowLogoutModal(true)}
            className={`${itemClass} w-full text-left`}
          >
            <SettingItem
              icon={<LogOut className="text-gray-700" />}
              title={t("settings.logout")} 
              subtitle={t("settings.logout_sub")} 
            />
          </button>
        </div>
      </div>

      <Modal
        show={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogout}
        message={t("settings.logout_confirm")} 
        confirmText={t("settings.logout")} 
        cancelText={t("settings.logout_sub")} 
      />
    </div>
  );
}
