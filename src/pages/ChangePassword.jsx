import { useState, useEffect } from "react";
import Modal from "../components/Modal";
import Header from "../components/Header";
import Alert from "../components/Alert";
import LoadingScreen from "../components/LoadingScreen";
import { useTranslation } from "react-i18next";
import AuthService from "../services/AuthService";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import PrimaryButton from "../components/PrimaryButton";
import { Eye, EyeOff } from 'lucide-react';

const ChangePassword = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const authService = new AuthService();
  const user = authService.getUserInfo();

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");
  const [attemptsLeft, setAttemptsLeft] = useState(3);
  const [cooldown, setCooldown] = useState(0);
  const [loading, setLoading] = useState(false);

  const ATTEMPT_LIMIT = 3;
  const COOLDOWN_MINUTES = 5;

  useEffect(() => {
    const savedAttempts = parseInt(localStorage.getItem("attemptsLeft")) || ATTEMPT_LIMIT;
    const cooldownUntil = localStorage.getItem("cooldownUntil");

    setAttemptsLeft(savedAttempts);

    if (cooldownUntil) {
      const now = Date.now();
      const remaining = parseInt(cooldownUntil) - now;
      if (remaining > 0) {
        setCooldown(Math.ceil(remaining / 1000));
        const interval = setInterval(() => {
          const timeLeft = parseInt(cooldownUntil) - Date.now();
          if (timeLeft <= 0) {
            clearInterval(interval);
            setCooldown(0);
            localStorage.removeItem("cooldownUntil");
            localStorage.setItem("attemptsLeft", ATTEMPT_LIMIT.toString());
            setAttemptsLeft(ATTEMPT_LIMIT);
          } else {
            setCooldown(Math.ceil(timeLeft / 1000));
          }
        }, 1000);
        return () => clearInterval(interval);
      }
    }
  }, []);

  const handleSubmit = async () => {
    setLoading(true);
    const MIN_LOADING_TIME = 2000;
    const startTime = Date.now();

    try {
      await authService.changePassword({ userId: user.id, currentPassword, newPassword });
      localStorage.setItem("attemptsLeft", ATTEMPT_LIMIT.toString());
      setError("");
      const elapsed = Date.now() - startTime;
      if (elapsed < MIN_LOADING_TIME) {
        await new Promise((res) => setTimeout(res, MIN_LOADING_TIME - elapsed));
      }
      setLoading(false);
      navigate("/");
    } catch (error) {
      console.error("Error en cambio de contraseña:", error.response?.data);
      const responseMessage = error.response?.data?.message || "";

      let userFriendlyError = t("changePassword.failed");

      if (responseMessage.includes("currentPasswordIncorrect")) {
        userFriendlyError = t("changePassword.error_current_password");
      } else if (responseMessage.includes("newPasswordInvalid")) {
        userFriendlyError = t("changePassword.error_new_password");
      }

      const newAttempts = attemptsLeft - 1;
      localStorage.setItem("attemptsLeft", newAttempts.toString());
      setAttemptsLeft(newAttempts);

      setError(`${userFriendlyError} (${t("changePassword.attempts_left", { count: newAttempts })})`);

      // Aquí limpias los inputs:
      setCurrentPassword("");
      setNewPassword("");

      if (newAttempts <= 0) {
        const cooldownUntil = Date.now() + COOLDOWN_MINUTES * 60 * 1000;
        localStorage.setItem("cooldownUntil", cooldownUntil.toString());
        setCooldown(COOLDOWN_MINUTES * 60);
      }
      setShowModal(false);
      const elapsed = Date.now() - startTime;
      if (elapsed < MIN_LOADING_TIME) {
        await new Promise((res) => setTimeout(res, MIN_LOADING_TIME - elapsed));
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError("");
      }, 8000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  if (loading) {
    return <LoadingScreen
      size="lg"
      message={t('login.loading')}
      showLogo={true}
      logoSrc="/images/logo.jpg"
    />;
  }

  return (
    <div className="min-h-screen relative transition-colors duration-500">
      <Header />

      {/* Flecha de volver */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-4 left-4 text-gray-600 dark:text-gray-300 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        aria-label={t('common.back')}
      >
        <ArrowLeft size={24} />
      </button>

      {/* Contenido centrado */}
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="bg-white dark:bg-gray-900 p-8 rounded shadow-md w-full max-w-md transition-colors duration-500">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">{t("changePassword.title")}</h2>

          {error && (
            <div className="mb-4">
              <Alert message={error} type="error" />
            </div>
          )}

          {cooldown > 0 ? (
            <p className="text-red-500 mb-4">
              {t("changePassword.locked")} ({cooldown}s)
            </p>
          ) : (
            <div className="space-y-4">
              <div className="relative">
                <input
                  type={showCurrentPassword ? "text" : "password"}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:text-gray-100 pr-10"
                  placeholder={t("changePassword.current")}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400"
                  aria-label={showCurrentPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                >
                  {showCurrentPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:text-gray-100 pr-10"
                  placeholder={t("changePassword.new")}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400"
                  aria-label={showNewPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                >
                  {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              <PrimaryButton
                type="button"
                disabled={cooldown > 0 || loading || attemptsLeft <= 0}
                isLoading={loading}
                onClick={() => setShowModal(true)}
              >
                {t("changePassword.submit")}
              </PrimaryButton>
            </div>
          )}
        </div>
      </div>

      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleSubmit}
        title={t("modal.title")}
        message={t("modal.confirm_password_change")}
        confirmText={t("modal.confirm_password")}
        cancelText={t("modal.cancel")}
      />
    </div>
  );
};

export default ChangePassword;
