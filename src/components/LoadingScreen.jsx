import React from 'react';

const LoadingScreen = ({ message = "Cargando...", size = 'lg', color = 'gray', showLogo = false, logoSrc = '' }) => {
  const textClass = size === 'sm' ? 'text-sm' : size === 'md' ? 'text-base' : 'text-lg';

  return (
    <div className="flex items-center justify-center min-h-screen bg-white z-50 absolute top-0 left-0 w-full">
      <div className="flex flex-col items-center justify-center space-y-4">
        {/* Contenedor para el logo y el círculo de carga */}
        <div className="relative flex items-center justify-center">
          {/* Círculo de carga animado */}
          <div className={`animate-spin border-t-4 border-${color}-500 border-solid rounded-full w-32 h-32`} />
          
          {/* Logo estático en el centro */}
          {showLogo && logoSrc && (
            <img 
              src={logoSrc} 
              alt="Logo"
              className="absolute z-10 h-20 w-20" // Logo centrado dentro del círculo de carga
            />
          )}
        </div>
        
        {/* Mensaje de carga */}
        <p className={`mt-4 text-${color}-500 font-semibold ${textClass}`}>{message}</p>
      </div>

      {/* Frase pequeña en la parte inferior */}
      <div className="absolute bottom-4 text-gray-400 text-xs">
        <p>Chispa Company &copy; 2025</p>
      </div>
    </div>
  );
};

export default LoadingScreen;