import React from 'react';
import { useTranslation } from 'react-i18next';

export default function Error404() {
  const { t } = useTranslation();

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
      <main className="h-screen flex flex-col justify-center items-center px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <div className="animate-bounce">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 sm:h-32 sm:w-32 mx-auto text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-6xl font-bold text-orange-600 mb-2">404</p>
          <h1 className="mt-2 text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900 bg-clip-text bg-gradient-to-r from-orange-400 to-amber-500">
            {t('error404.title')}
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600 max-w-xl mx-auto">
            {t('error404.description')}
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6">
            <a
              href="/"
              className="w-full sm:w-auto rounded-xl bg-gradient-to-r from-orange-400 to-amber-500 px-8 py-4 text-lg font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:from-orange-500 hover:to-amber-500 transform hover:-translate-y-1"
            >
              {t('error404.backToHome')}
            </a>
            <a
              href="#"
              className="group w-full sm:w-auto rounded-xl bg-white px-6 py-3.5 text-lg font-semibold text-gray-900 shadow-sm ring-1 ring-gray-300 hover:bg-gray-50 hover:ring-gray-400 transition-all duration-200"
            >
              {t('error404.contactSupport')}
              <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform duration-200">→</span>
            </a>
          </div>
          <div className="lg:mt-10 border-t border-gray-200 pt-8">
            <p className="text-sm text-gray-500">
              {t('error404.needHelp')} <a href="#" className="font-medium text-orange-600 hover:text-orange-500">{t('error404.contactUs')}</a>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
