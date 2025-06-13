import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import AuthService from "../services/AuthService";
import Alert from "../components/Alert";
import PrimaryButton from "../components/PrimaryButton";
import Header from "../components/Header";

export default function ResetPassword() {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");
  const [newPassword, setNewPassword] = useState(""); // Cambiado a newPassword
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const authService = new AuthService();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!token) {
      setError(t("resetPassword.invalidToken"));
      return;
    }
    if (newPassword.length < 6) {
      setError(t("resetPassword.shortPassword"));
      return;
    }
    if (newPassword !== confirm) {
      setError(t("resetPassword.passwordsDontMatch"));
      return;
    }

    setLoading(true);
    try {
      await authService.resetPassword(token, newPassword); // Usar newPassword aquí
      setMessage(t("resetPassword.success"));
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err.message || t("resetPassword.error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow flex items-center justify-center px-4">
        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-gray-900 px-8 py-10 shadow-xl rounded-2xl w-full max-w-md space-y-6 border border-gray-200 dark:border-gray-700"
        >
          <h2 className="text-2xl font-bold mb-4">{t("resetPassword.title")}</h2>
          {message && <Alert message={message} type="success" />}
          {error && <Alert message={error} type="error" />}
          <input
            type="password"
            required
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="block w-full pl-2 pr-10 rounded-xl border border-gray-300 dark:border-gray-600 py-3 text-gray-900 dark:text-white bg-white dark:bg-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-2 focus:outline-none focus:ring-orange-500 sm:text-sm sm:leading-6"
            placeholder={t("resetPassword.newPasswordPlaceholder")}
          />
          <input
            type="password"
            required
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className="block w-full pl-2 pr-10 rounded-xl border border-gray-300 dark:border-gray-600 py-3 text-gray-900 dark:text-white bg-white dark:bg-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-2 focus:outline-none focus:ring-orange-500 sm:text-sm sm:leading-6"
            placeholder={t("resetPassword.confirmPasswordPlaceholder")}
          />
          <PrimaryButton type="submit" isLoading={loading} disabled={loading}>
            {t("resetPassword.sendButton")}
          </PrimaryButton>
        </form>
      </div>
    </div>
  );
}