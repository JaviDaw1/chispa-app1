import React from 'react';

const LoadingScreen = ({ message = "Cargando...", size = 'lg', color = 'gray', showLogo = false, logoSrc = '' }) => {
  const textClass = size === 'sm' ? 'text-sm' : size === 'md' ? 'text-base' : 'text-lg';

  // Para Tailwind, maneja clases dinámicas con string templates con cuidado
  // Usa classnames o concatenación fija para evitar que tailwind lo elimine

  const spinnerColorClass = {
    gray: "border-gray-500",
    orange: "border-orange-500",
    amber: "border-amber-500",
  }[color] || "border-gray-500";

  return (
    <div className="flex items-center justify-center min-h-screen bg-white z-50 absolute top-0 left-0 w-full">
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="relative flex items-center justify-center">
          <div className={`animate-spin border-t-4 ${spinnerColorClass} border-solid rounded-full w-32 h-32`} />
          {showLogo && logoSrc && (
            <img 
              src={logoSrc} 
              alt="Logo"
              className="absolute z-10 h-20 w-20"
            />
          )}
        </div>
        <p className={`mt-4 text-${color}-500 font-semibold ${textClass}`}>{message}</p>
      </div>
      <div className="absolute bottom-4 text-gray-400 text-xs">
        <p>Chispa Company &copy; 2025</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
