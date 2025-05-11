// eslint-disable-next-line no-unused-vars
import React from 'react';

export default function Error404() {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
      <main className="h-screen flex flex-col justify-center items-center px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <div className="mb-8 animate-bounce">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-32 w-32 mx-auto text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-6xl font-bold text-blue-600 mb-2">404</p>
          <h1 className="mt-2 text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900 bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
            Página no encontrada
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600 max-w-xl mx-auto">
            Lo sentimos, no pudimos encontrar la página que estás buscando.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6">
            <a
              href="/"
              className="w-full sm:w-auto rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-4 text-lg font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:from-blue-500 hover:to-indigo-500 transform hover:-translate-y-1"
            >
              Volver al inicio
            </a>
            <a
              href="#"
              className="group w-full sm:w-auto rounded-xl bg-white px-6 py-3.5 text-lg font-semibold text-gray-900 shadow-sm ring-1 ring-gray-300 hover:bg-gray-50 hover:ring-gray-400 transition-all duration-200"
            >
              Contactar soporte técnico
              <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform duration-200">→</span>
            </a>
          </div>
          <div className="mt-16 border-t border-gray-200 pt-8">
            <p className="text-sm text-gray-500">
              ¿Necesitas ayuda? <a href="#" className="font-medium text-blue-600 hover:text-blue-500">Contáctanos</a>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}