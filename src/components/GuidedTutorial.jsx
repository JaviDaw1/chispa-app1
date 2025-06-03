import { useState, useEffect } from "react";
import Modal from "./Modal";
import PrimaryButton from "./PrimaryButton";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";

const steps = [
  {
    title: "¡Bienvenido a Chispa! 🔥",
    content: (
      <>
        <div className="flex justify-center mb-4">
          <motion.div
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100, damping: 10 }}
            className="relative w-24 h-24 rounded-full shadow-xl bg-gradient-to-br from-orange-500 to-pink-500 flex items-center justify-center mt-4 mb-4"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute w-28 h-28 rounded-full bg-orange-400 opacity-30"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-white z-10"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-center space-y-2"
        >
          <p className="text-lg font-semibold text-gray-800">
            Esta es una app para conocer gente, chatear y encontrar pareja o amistad.
          </p>
          <p className="text-sm text-gray-600">
            Te guiaremos en unos pasos rápidos para que aproveches al máximo <span className="font-bold text-orange-500">Chispa</span>.
          </p>
        </motion.div>
      </>
    ),
  }
  ,
  {
    title: "Explora perfiles 👀",
    content: (
      <>
        <div className="flex justify-center mb-4">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="w-64 h-96 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl shadow-lg p-4">
              <div className="h-64 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg mb-3"></div>
              <div className="h-4 bg-gray-200 rounded-full w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded-full w-1/2"></div>
            </div>
            <div className="absolute -right-6 top-1/2 transform -translate-y-1/2">
              <div className="w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
          </motion.div>
        </div>
        <p className="mb-3 text-gray-700 text-center">Desliza perfiles y descubre personas compatibles.</p>
        <p className="text-gray-600 text-center">Filtra por preferencias desde el menú de <span className="font-semibold text-purple-600">Preferencias</span>.</p>
      </>
    ),
  },
  {
    title: "Haz match y chatea 💬",
    content: (
      <>
        <div className="flex justify-center mb-8">
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
            className="relative"
          >
            <div className="flex space-x-4 mt-4">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-red-500 rounded-full"></div>
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"></div>
            </div>
            <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center mt-4">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="w-24 h-24 rounded-full bg-yellow-400 bg-opacity-30 absolute"
              ></motion.div>
            </div>
          </motion.div>
        </div>
        <p className="mb-3 text-gray-700 text-center">Si ambos os gustáis, ¡es un <span className="font-bold text-yellow-500">CHISPAZO</span>!</p>
        <p className="text-gray-600 text-center">Podrás chatear y conoceros mejor desde <span className="font-semibold text-blue-500">Mensajes</span>.</p>
      </>
    ),
  },
  {
    title: "Gestiona tu perfil ✨",
    content: (
      <>
        <div className="flex justify-center mb-4">
          <motion.div
            initial={{ rotate: -5 }}
            animate={{ rotate: 0 }}
            transition={{ duration: 0.5 }}
            className="w-64 bg-white rounded-xl shadow-lg overflow-hidden"
          >
            <div className="h-32 bg-gradient-to-r from-purple-500 to-pink-500"></div>
            <div className="p-4">
              <div className="flex items-center">
                <div className="w-16 h-16 bg-gray-200 rounded-full -mt-10 border-4 border-white"></div>
                <div className="ml-3">
                  <div className="h-4 bg-gray-200 rounded-full w-24 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded-full w-16"></div>
                </div>
              </div>
              <div className="mt-3 space-y-2">
                <div className="h-3 bg-gray-200 rounded-full w-full"></div>
                <div className="h-3 bg-gray-200 rounded-full w-5/6"></div>
                <div className="h-3 bg-gray-200 rounded-full w-4/6"></div>
              </div>
            </div>
          </motion.div>
        </div>
        <p className="mb-3 text-gray-700 text-center">Edita tu perfil, añade fotos y cuenta quién eres.</p>
        <p className="text-gray-600 text-center">Accede a <span className="font-semibold text-pink-500">Perfil</span> y personaliza tu experiencia.</p>
      </>
    ),
  },
  {
    title: "Configura y protege tu cuenta 🔒",
    content: (
      <>
        <div className="flex justify-center mb-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-64 bg-white rounded-xl shadow-lg overflow-hidden p-4"
          >
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="h-3 bg-gray-200 rounded-full w-3/4"></div>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="h-3 bg-gray-200 rounded-full w-2/3"></div>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="h-3 bg-gray-200 rounded-full w-1/2"></div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        <p className="mb-3 text-gray-700 text-center">Desde <span className="font-semibold text-indigo-500">Ajustes</span> puedes cambiar contraseña, idioma, bloquear usuarios y más.</p>
        <p className="text-gray-600 text-center font-medium">¡Listo! Ya puedes empezar a usar Chispa.</p>
      </>
    ),
  },
];

export default function GuidedTutorial({ show, onClose }) {
  const [step, setStep] = useState(0);

  const handleNext = () => {
    if (step < steps.length - 1) setStep(step + 1);
    else {
      setStep(0);
      onClose();
    }
  };

  const handlePrev = () => {
    if (step > 0) setStep(step - 1);
  };

  // Efecto para reiniciar el tutorial cuando se abre
  useEffect(() => {
    if (show) {
      setStep(0);
    }
  }, [show]);

  return (
    <Modal
      show={show}
      onClose={() => {
        setStep(0);
        onClose();
      }}
      title={steps[step].title}
      hideDefaultButtons={true}
      hideClose={step < steps.length - 1}
      width="max-w-md"
    >
      {/* Indicador de progreso */}
      <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${((step + 1) / steps.length) * 100}%` }}
          transition={{ duration: 0.5 }}
          className="h-2 rounded-full bg-gradient-to-r from-orange-400 to-pink-500"
        ></motion.div>
      </div>

      {/* Contenido animado */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="mb-6"
        >
          {steps[step].content}
        </motion.div>
      </AnimatePresence>

      {/* Controles de navegación */}
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-500">
          Paso {step + 1} de {steps.length}
        </div>
        <div className="flex space-x-3">
          {step > 0 && (
            <PrimaryButton
              type="button"
              onClick={handlePrev}
              className="w-24 bg-gray-200 hover:bg-gray-300 text-gray-800"
            >
              Atrás
            </PrimaryButton>
          )}
          <PrimaryButton
            type="button"
            onClick={handleNext}
            className={`w-24 ${step === steps.length - 1 ? 'bg-gradient-to-r from-orange-500 to-pink-500' : ''}`}
          >
            {step === steps.length - 1 ? "¡Empezar!" : "Siguiente"}
          </PrimaryButton>
        </div>
      </div>
    </Modal>
  );
}