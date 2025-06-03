import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { useTranslation } from 'react-i18next';

// Language options with flags and names
const languageOptions = [
  { code: 'es', name: 'Español', flag: '/images/flags/es.png' },
  { code: 'en', name: 'English', flag: '/images/flags/en.png' },
  { code: 'fr', name: 'Français', flag: '/images/flags/fr.png' }
];

/**
 * LanguageSelector Component
 * This component allows users to select their preferred language from a dropdown menu.
 * @param {Object} props - Component properties.
 * @param {boolean} [props.showText=true] - Whether to show the language name next to the flag.
 * @param {boolean} [props.showTextInDropdown=true] - Whether to show the language name in the dropdown options.
 * @return {JSX.Element} The rendered language selector component.
 * @example
 * <LanguageSelector />
 */
const LanguageSelector = ({ showText = true, showTextInDropdown = true }) => {
  const { i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const dropdownRef = useRef();

  const handleLanguageChange = (languageCode) => {
    i18n.changeLanguage(languageCode);
    setSelectedLanguage(languageCode);
    setIsDropdownVisible(false);
  };

  const currentLanguageOption = languageOptions.find(({ code }) => code === selectedLanguage) || languageOptions[0];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setIsDropdownVisible((prev) => !prev)}
        className={`inline-flex items-center justify-between gap-2 py-2 border rounded-xl shadow-sm 
        bg-white border-gray-300 hover:bg-gray-50 transition-all
        dark:bg-gray-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:text-gray-200
        ${showText ? "px-4 min-w-[160px]" : "px-2 min-w-[40px]"}`}
      >
        <img
          src={currentLanguageOption.flag}
          alt={currentLanguageOption.code}
          className="w-5 h-5 rounded-full object-cover"
        />
        {showText && <span className="text-sm font-medium">{currentLanguageOption.name}</span>}
        <ChevronDown className={`w-4 h-4 transition-transform ${isDropdownVisible ? "rotate-180" : ""}`} />
      </button>

      {isDropdownVisible && (
        <div className="absolute right-0 z-50 mt-2 w-56 rounded-xl shadow-xl bg-white dark:bg-gray-700 ring-1 ring-black/5 dark:ring-white/10">
          <div className="py-2">
            {languageOptions.map(({ code, flag, name }) => (
              <button
                key={code}
                onClick={() => handleLanguageChange(code)}
                className={`flex items-center gap-3 w-full px-4 py-2 text-sm transition-colors
                  ${selectedLanguage === code
                    ? 'bg-blue-100 text-blue-700 font-semibold dark:bg-blue-900 dark:text-blue-200'
                    : 'hover:bg-gray-100 text-gray-800 dark:hover:bg-gray-600 dark:text-gray-100'}`}
              >
                <img
                  src={flag}
                  alt={code}
                  className="w-5 h-5 rounded-full object-cover"
                />
                {showTextInDropdown && <span>{name}</span>}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;