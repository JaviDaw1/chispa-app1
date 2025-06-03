import { useTranslation } from 'react-i18next';
import ThemeSwitcher from './ThemeSwitcher';
import LanguageSelector from './LanguageSelector';

/**
 * TopHeader Component
 * This component renders the top header for mobile devices, including a logo and optional theme and language switchers.
 * @param {Object} props - Component properties.
 * @param {boolean} [props.showSwitcher=true] - Whether to show the theme and language switchers.
 * @param {string} [props.logoSrc="/images/logo.jpg"] - The source URL of the logo image to display.
 * @returns {JSX.Element} The rendered top header component for mobile devices.
 * @example
 * <TopHeader />
 */
export default function TopHeader({ showSwitcher = true, logoSrc = '/images/logo.jpg' }) {
  const { t } = useTranslation();

  const isLoggedIn = localStorage.getItem('token') || localStorage.getItem('usuario');

  return (
    <div className="lg:hidden fixed top-0 left-0 w-full bg-white shadow z-40 py-2 px-4 flex items-center justify-center dark:bg-gray-900">
      <img
        src={logoSrc}
        alt={t('header.title')}
        className="h-14 flex-shrink-0 rounded-2xl"
      />

      {!isLoggedIn && showSwitcher && (
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
          <ThemeSwitcher />
          <LanguageSelector showText={false} />
        </div>
      )}
    </div>
  );
}
