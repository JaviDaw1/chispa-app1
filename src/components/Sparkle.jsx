import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

export default function Sparkle() {
  const sparkles = Array.from({ length: 10 });

  return (
    <div className="absolute inset-0 pointer-events-none">
      {sparkles.map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-yellow-400 rounded-full"
          initial={{
            opacity: 1,
            top: '50%',
            left: '50%',
            scale: 1,
          }}
          animate={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            opacity: 0,
            scale: 2,
          }}
          transition={{
            duration: 1,
            delay: i * 0.1,
            ease: 'easeOut',
          }}
        />
      ))}
    </div>
  );
}
