import Divider from '../components/Divider';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export default function Error404() {
  const { t } = useTranslation();

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900 min-h-screen transition-colors duration-500">
      <main className="h-screen flex flex-col justify-center items-center px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <div className="animate-bounce">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-20 w-20 sm:h-32 sm:w-32 mx-auto text-orange-500 dark:text-orange-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <p className="text-6xl font-bold text-orange-600 dark:text-orange-400 mb-2">404</p>
          <h1 className="mt-2 text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 bg-clip-text bg-gradient-to-r from-orange-400 to-amber-500">
            {t('error404.title')}
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
            {t('error404.description')}
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link
              to="/"
              className="w-full sm:w-auto rounded-xl bg-gradient-to-r from-orange-400 to-amber-500 px-8 py-4 text-lg font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:from-orange-500 hover:to-amber-500 transform hover:-translate-y-1"
            >
              {t('error404.backToHome')}
            </Link>

            <Link
              to="/support"
              className="group w-full sm:w-auto rounded-xl bg-white dark:bg-gray-700 px-6 py-3.5 text-lg font-semibold text-gray-900 dark:text-gray-100 shadow-sm ring-1 ring-gray-300 dark:ring-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 hover:ring-gray-400 dark:hover:ring-gray-500 transition-all duration-200"
            >
              {t('error404.contactSupport')}
              <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform duration-200">→</span>
            </Link>
          </div>

          <Divider className="my-10" />

          <div className="lg:mt-10">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {t('error404.needHelp')}{' '}
              <Link
                to="/support"
                className="font-medium text-orange-600 dark:text-orange-400 hover:text-orange-500 dark:hover:text-orange-300"
              >
                {t('error404.contactUs')}
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
