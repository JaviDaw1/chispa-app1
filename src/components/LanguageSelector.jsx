import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { useTranslation } from 'react-i18next';

const languageOptions = [
  { code: 'es', name: 'Español', flag: '../../public/images/flags/es.png' },
  { code: 'en', name: 'English', flag: '../../public/images/flags/en.png' },
  { code: 'fr', name: 'Français', flag: '../../public/images/flags/fr.png' }
];

const LanguageSelector = ({ showText = true, showTextInDropdown = true }) => {
  const { i18n: i18nInstance } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(i18nInstance.language);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef();

  const changeLanguage = (lng) => {
    i18nInstance.changeLanguage(lng);
    setCurrentLanguage(lng);
    setShowDropdown(false);
  };

  const currentLang = languageOptions.find(l => l.code === currentLanguage) || languageOptions[0];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setShowDropdown(prev => !prev)}
        className={`inline-flex items-center justify-between gap-2 py-2 border border-gray-300 rounded-xl shadow-sm bg-white hover:bg-gray-50 transition-all
          ${showText ? "px-4 min-w-[160px]" : "px-2 min-w-[40px]"}
        `}
      >
        <img
          src={currentLang.flag}
          alt={currentLang.code}
          className="w-5 h-5 rounded-full object-cover"
        />
        {showText && <span className="text-sm font-medium">{currentLang.name}</span>}
        <ChevronDown className={`w-4 h-4 transition-transform ${showDropdown ? "rotate-180" : ""}`} />
      </button>

      {showDropdown && (
        <div className="absolute right-0 z-50 mt-2 w-56 rounded-xl shadow-xl bg-white ring-1 ring-black/5">
          <div className="py-2">
            {languageOptions.map(lang => (
              <button
                key={lang.code}
                onClick={() => changeLanguage(lang.code)}
                className={`flex items-center gap-3 w-full px-4 py-2 text-sm transition-colors
                  ${currentLanguage === lang.code
                    ? 'bg-blue-100 text-blue-700 font-semibold'
                    : 'hover:bg-gray-100 text-gray-800'}`}
              >
                <img
                  src={lang.flag}
                  alt={lang.code}
                  className="w-5 h-5 rounded-full object-cover"
                />
                {showTextInDropdown && <span>{lang.name}</span>}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
