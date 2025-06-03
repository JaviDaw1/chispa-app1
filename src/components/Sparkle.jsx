// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

/**
 * Sparkle
 * Creates a sparkling effect with animated divs that fade out and scale up.
 * @returns {JSX.Element} The rendered sparkle component.
 * @example
 * <Sparkle />
 */
export default function Sparkle() {
  const sparkleCount = 10;
  const sparkles = Array.from({ length: sparkleCount });

  return (
    <div className="absolute inset-0 pointer-events-none">
      {sparkles.map((_, index) => (
        <motion.div
          key={index}
          className="absolute w-2 h-2 bg-yellow-400 dark:bg-yellow-300 rounded-full"
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
            delay: index * 0.1,
            ease: 'easeOut',
          }}
        />
      ))}
    </div>
  );
}
