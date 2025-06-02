import { useState } from "react";
import { useTranslation } from "react-i18next";
import AuthService from "../services/AuthService";
import Alert from "../components/Alert";
import Header from "../components/Header";

export default function ForgotPassword() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");
    try {
      await AuthService.forgotPassword(email);
      setMessage(t("forgotPassword.emailSent"));
    } catch (err) {
      setError(err.message || t("forgotPassword.error"));
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
          <h2 className="text-2xl font-bold mb-4">{t("forgotPassword.title")}</h2>
          {message && <Alert message={message} type="success" />}
          {error && <Alert message={error} type="error" />}
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full rounded-xl border border-gray-300 dark:border-gray-600 py-3 px-4"
            placeholder={t("forgotPassword.emailPlaceholder")}
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-600 text-white rounded-xl py-3 font-semibold"
          >
            {t("forgotPassword.sendButton")}
          </button>
        </form>
      </div>
    </div>
  );
}