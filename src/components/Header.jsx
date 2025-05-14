import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, User, LogIn, MessageCircle, Sparkles, Settings, ChevronDown } from "lucide-react";
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';
import Logo from "../../public/images/logo.jpg";

const Header = () => {
  const location = useLocation();
  const { t } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);
  const [isAuthenticated, setIsAuthenticated] = useState(
    Boolean(localStorage.getItem("token") || localStorage.getItem("usuario"))
  );
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);

  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuthenticated(Boolean(localStorage.getItem("token") || localStorage.getItem("usuario")));
    };

    window.addEventListener("authChange", handleStorageChange);

    return () => {
      window.removeEventListener("authChange", handleStorageChange);
    };
  }, []);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setCurrentLanguage(lng);
    setShowLanguageDropdown(false);
  };

  const languageOptions = [
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' }
  ];

  const currentLanguageObj = languageOptions.find(lang => lang.code === currentLanguage) || languageOptions[0];

  const navItems = isAuthenticated
    ? [
        { label: t('header.nav.home'), icon: Home, path: "/" },
        { label: t('header.nav.matches'), icon: Sparkles, path: "/matches" },
        { label: t('header.nav.messages'), icon: MessageCircle, path: "/messages" },
        { label: t('header.nav.profile'), icon: User, path: "/profile" },
        { label: t('header.nav.settings'), icon: Settings, path: "/settings" },
      ]
    : [
        { label: t('header.nav.login'), icon: LogIn, path: "/login" },
      ];

  return (
    <>
      {/* Header grande (lg+) */}
      <nav className="hidden lg:flex justify-between items-center px-6 py-4 bg-white shadow-md fixed top-0 left-0 w-full z-50">
        <div className="max-w-screen-xl w-full mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img src={Logo} alt={t('header.title')} className="h-10" />
            <div className="text-2xl font-bold">{t('header.title')}</div>
          </div>
          
          <div className="flex items-center gap-8">
            <ul className="flex gap-8">
              {navItems.map((item) => {
                const IconComponent = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <li key={item.label}>
                    <Link
                      to={item.path}
                      className={`flex items-center gap-2 transition text-lg ${
                        isActive ? "text-blue-600 font-semibold" : "text-gray-700 hover:text-blue-600"
                      }`}
                    >
                      <IconComponent className="w-5 h-5" />
                      <span>{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="ml-4 relative">
              <button 
                onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                className="flex items-center gap-2 px-3 py-1 rounded-md hover:bg-gray-100 transition-colors"
              >
                <span className="text-lg">{currentLanguageObj.flag}</span>
                <span className="text-sm hidden sm:inline">{currentLanguageObj.name}</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${showLanguageDropdown ? 'rotate-180' : ''}`} />
              </button>
              
              {showLanguageDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50 border border-gray-200">
                  {languageOptions.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => changeLanguage(lang.code)}
                      className={`w-full text-left px-4 py-2 text-sm flex items-center gap-2 ${
                        currentLanguage === lang.code 
                          ? 'bg-blue-50 text-blue-600' 
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      <span className="text-lg">{lang.flag}</span>
                      <span>{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Header móvil (sm, md) */}
      <nav className="lg:hidden fixed bottom-0 left-0 w-full bg-white border-t shadow-inner z-50 py-3">
        <ul className="flex justify-around">
          {navItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <li key={item.label}>
                <Link
                  to={item.path}
                  className={`flex flex-col items-center text-xs transition ${
                    isActive ? "text-blue-600" : "text-gray-600 hover:text-blue-600"
                  }`}
                >
                  <IconComponent className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />
                  <span className="mt-1 text-xs">{item.label}</span>
                </Link>
              </li>
            );
          })}
          
          <li>
            <div className="flex flex-col items-center">
              <select
                onChange={(e) => changeLanguage(e.target.value)}
                value={currentLanguage}
                className="text-xs border border-gray-300 rounded px-1 py-0.5 mt-1 bg-transparent"
              >
                {languageOptions.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.flag} {lang.code.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Header;