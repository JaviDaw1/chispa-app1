// eslint-disable-next-line no-unused-vars
import React from 'react';

export default function Error404() {
  return (
    <div>
      <main className="h-screen flex justify-center items-center bg-white px-6 py-24 sm:py-32 lg:px-8 mx-auto max-w-lg">
        <div className="text-center">
          <p className="text-4xl font-semibold text-blue-600 sm:text-lg">404</p>
          <h1 className="mt-4 text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Página no encontrada
          </h1>
          <p className="mt-6 text-sm sm:text-base leading-7 text-gray-600">
            Lo sentimos, no se puede encontrar la página que estás buscando.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-x-6 gap-y-4 sm:gap-y-0">
            <a
              href="/"
              className="w-full sm:w-auto rounded-md bg-blue-600 px-6 py-3 text-lg sm:text-sm font-semibold text-white shadow-sm transition-all ease-in-out duration-200 hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 text-center"
            >
              Volver al inicio
            </a>
            <a
              href="#"
              className="text-sm font-semibold text-gray-900 text-center sm:text-left"
            >
              Contactar con soporte técnico <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
