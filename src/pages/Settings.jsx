import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  User,
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

export default function Settings() {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("Sesión cerrada");
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
            Configuración
          </h1>
          <p className="text-gray-600 mt-2 text-center">
            Administra tu cuenta, privacidad y preferencias.
          </p>
        </div>

        <div className="space-y-4">
          <Link to="/configuracion/seguridad" className={itemClass}>
            <SettingItem
              icon={<Lock className="text-rose-600" />}
              title="Seguridad"
              subtitle="Contraseña y autenticación"
            />
          </Link>

          <Link to="/configuracion/notificaciones" className={itemClass}>
            <SettingItem
              icon={<Bell className="text-amber-500" />}
              title="Notificaciones"
              subtitle="Preferencias de alertas"
            />
          </Link>

          <Link to="/blockedUsers" className={itemClass}>
            <SettingItem
              icon={<Ban className="text-red-500" />}
              title="Usuarios bloqueados"
              subtitle="Usuarios que has bloqueado"
            />
          </Link>

          <Link to="/configuracion/documentacion" className={itemClass}>
            <SettingItem
              icon={<Book className="text-blue-500" />}
              title="Documentación"
              subtitle="Guías, preguntas frecuentes y más"
            />
          </Link>

          <Link to="/configuracion/soporte" className={itemClass}>
            <SettingItem
              icon={<HelpCircle className="text-green-600" />}
              title="Soporte / Ayuda"
              subtitle="Contacta con nuestro equipo"
            />
          </Link>

          <button
            onClick={() => setShowLogoutModal(true)}
            className={`${itemClass} w-full text-left`}
          >
            <SettingItem
              icon={<LogOut className="text-gray-700" />}
              title="Cerrar sesión"
              subtitle="Salir de tu cuenta"
            />
          </button>
        </div>
      </div>

      <Modal
        show={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogout}
        message="¿Estás seguro que quieres cerrar sesión?"
        confirmText="Cerrar sesión"
        cancelText="Cancelar"
      />
    </div>
  );
}
