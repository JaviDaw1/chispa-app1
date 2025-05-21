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
  onClose = () => {},
}) {
  const gradientStyles = {
    success: 'bg-gradient-to-r from-green-500 to-green-600 text-white dark:from-green-400 dark:to-green-500',
    error: 'bg-gradient-to-r from-red-500 to-red-600 text-white dark:from-red-400 dark:to-red-500',
    info: 'bg-gradient-to-r from-blue-500 to-blue-600 text-white dark:from-blue-400 dark:to-blue-500',
    like: 'bg-gradient-to-r from-orange-400 to-orange-600 text-white dark:from-orange-300 dark:to-orange-500',
    match: 'bg-gradient-to-r from-pink-500 to-purple-600 text-white dark:from-pink-400 dark:to-purple-500',
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
            className={`relative pointer-events-auto flex items-center px-6 py-4 rounded-2xl shadow-2xl dark:shadow-white/10 ${gradientStyles[type] || gradientStyles.info}`}
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
