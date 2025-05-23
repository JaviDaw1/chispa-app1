import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Header from "../components/Header";
import LanguageSelector from "../components/LanguageSelector";

export default function LanguageSettings() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 lg:mt-16 sm:mb-8 mb-4">
      <Header />

      <div className="max-w-3xl mx-auto flex flex-col items-center">
        <div className="mb-10 w-full flex justify-between items-center">
          <button
            onClick={() => navigate(-1)}
            className="text-gray-600 dark:text-gray-300 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label={t('common.back')}
          >
            <ArrowLeft size={24} />
          </button>
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white text-center">
              {t("settings.language")}
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2 text-center">
              {t("settings.language_sub")}
            </p>
          </div>
          <div className="w-8" />
        </div>

        <div className="flex justify-center dark:bg-gray-900 p-6 rounded-xl">
          <LanguageSelector />
        </div>
      </div>
    </div>
  );
}
