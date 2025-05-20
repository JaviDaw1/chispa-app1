import React, { useEffect } from 'react';
import Sparkle from './Sparkle';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle,
  XCircle,
  Info,
  Heart,
} from 'lucide-react';

export default function Notification({
  show,
  message,
  type = "info",
  duration = 2000,
  onClose = () => { },
}) {
  const gradientStyles = {
    success: 'bg-gradient-to-r from-green-500 to-green-600 text-white',
    error: 'bg-gradient-to-r from-red-500 to-red-600 text-white',
    info: 'bg-gradient-to-r from-blue-500 to-blue-600 text-white',
    like: 'bg-gradient-to-r from-orange-400 to-orange-600 text-white',
    match: 'bg-gradient-to-r from-pink-500 to-purple-600 text-white',
  };

  const icons = {
    success: <CheckCircle className="w-5 h-5 mr-3" />,
    error: <XCircle className="w-5 h-5 mr-3" />,
    info: <Info className="w-5 h-5 mr-3" />,
    like: <Heart className="w-5 h-5 mr-3" />,
    match: <Heart className="w-5 h-5 mr-3 text-pink-100 animate-pulse" />,
  };

  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [show, duration, onClose]);

  return (
    <AnimatePresence>
      {show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            className={`pointer-events-auto flex items-center px-6 py-4 rounded-2xl shadow-2xl ${gradientStyles[type] || gradientStyles.info}`}
          >
            {type === 'like' && <Sparkle />}
            {icons[type] || icons.info}
            <span className="text-base font-semibold">{message}</span>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
