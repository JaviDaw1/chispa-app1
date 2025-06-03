import { useContext } from 'react'
import { ThemeContext } from '../context/ThemeContext'
import { Sun, Moon } from 'lucide-react'

/**
 * ThemeSwitcher Component
 * This component allows users to toggle between light and dark themes.
 * @returns {JSX.Element} The rendered theme switcher component.
 * @example
 * <ThemeSwitcher />
 */
const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full transition-colors bg-gray-200 dark:bg-gray-700"
      aria-label="Toggle dark mode"
    >
      {theme === 'dark' ? (
        <Sun className="text-yellow-400" />
      ) : (
        <Moon className="text-gray-900" />
      )}
    </button>
  );
};

export default ThemeSwitcher
