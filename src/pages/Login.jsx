import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from '../components/Header';
import AuthService from '../services/AuthService';
import Divider from '../components/Divider';
import LanguageSelector from '../components/LanguageSelector';
import Alert from '../components/Alert';
import Logo from '../../public/images/logo.jpg';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import LoadingScreen from '../components/LoadingScreen';

export default function Login() {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setIsSubmitting(true);

    try {
      await new AuthService().login(email, password);
      setTimeout(() => navigate('/'), 2000);
    } catch (err) {
      setError(err.message || t('login.error'));
    } finally {
      setIsLoading(false);
      setTimeout(() => setIsSubmitting(false), 2000);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#121212] to-[#1a1a1a] flex flex-col">
      <Header />

      <div className="lg:hidden fixed top-0 left-0 w-full bg-[#1E1E1E]/90 backdrop-blur-sm shadow-lg z-40 py-2 px-4 flex items-center justify-center">
        <img src={Logo} alt={t('header.title')} className="h-14 flex-shrink-0" />

        {!localStorage.getItem("token") && !localStorage.getItem("usuario") && (
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 w-20">
            <LanguageSelector showText={false} />
          </div>
        )}
      </div>

      {isSubmitting && (
        <LoadingScreen
          size="lg"
          message={t('login.loading')}
          showLogo={true}
          logoSrc={Logo}
        />
      )}

      <div className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 mt-16">
        <div className="relative bg-[#1E1E1E]/90 backdrop-blur-lg px-10 py-12 shadow-2xl rounded-3xl w-full max-w-md space-y-8 border border-[#3a3a3a]/30 transition-all duration-500">
          {/* Glow effect */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-orange-500/5 to-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
          
          {/* Floating lock icon */}
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/40 to-amber-500/40 rounded-full blur-md animate-pulse"></div>
              <div className="relative p-3 bg-gradient-to-r from-orange-500/20 to-amber-500/20 rounded-full border border-[#3a3a3a]/50">
                <div className="p-3 bg-gradient-to-r from-orange-500/30 to-amber-500/30 rounded-full">
                  <Lock className="h-8 w-8 text-orange-300/90" />
                </div>
              </div>
            </div>
          </div>

          <div className="text-center space-y-2">
            <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-500 tracking-tight">
              {t('login.title')}
            </h2>
          </div>

          {error && <Alert message={error} type="error" />}

          <form className="space-y-6" onSubmit={handleLogin}>
            <div className="space-y-5">
              <div className="space-y-1">
                <label htmlFor="email" className="block text-sm font-medium text-gray-300/90 mb-1">
                  {t('login.emailLabel')}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400/80" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-10 rounded-xl border-0 py-3.5 bg-[#2A2A2A]/80 text-white placeholder:text-gray-500/70 shadow-sm ring-1 ring-inset ring-gray-600/30 focus:ring-2 focus:outline-none focus:ring-orange-500/80 sm:text-sm sm:leading-6 transition-all duration-200 hover:ring-gray-500/50"
                    placeholder={t('login.emailPlaceholder')}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label htmlFor="password" className="block text-sm font-medium text-gray-300/90 mb-1">
                  {t('login.passwordLabel')}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400/80" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-10 pr-10 rounded-xl border-0 py-3.5 bg-[#2A2A2A]/80 text-white placeholder:text-gray-500/70 shadow-sm ring-1 ring-inset ring-gray-600/30 focus:ring-2 focus:outline-none focus:ring-orange-500/80 sm:text-sm sm:leading-6 transition-all duration-200 hover:ring-gray-500/50"
                    placeholder={t('login.passwordPlaceholder')}
                  />
                  <div
                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer group/password"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400/80 hover:text-orange-400 transition-colors duration-200 group-hover/password:scale-110" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400/80 hover:text-orange-400 transition-colors duration-200 group-hover/password:scale-110" />
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-1">
              <button
                type="submit"
                disabled={isLoading}
                className="relative flex w-full justify-center rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 px-4 py-3.5 text-lg font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:from-orange-500 hover:to-amber-500 transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500 group/button overflow-hidden"
              >
                {/* Button shine effect */}
                <span className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/30 to-white/10 opacity-0 group-hover/button:opacity-100 transition-opacity duration-500 -translate-x-full group-hover/button:translate-x-full"></span>
                {isLoading ? (
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : null}
                {t('login.loginButton')}
              </button>
            </div>
          </form>

          <Divider text={t('login.or')} />

          <div className="text-center text-sm text-gray-400/80">
            {t('login.noAccount')}{' '}
            <Link 
              to="/signup" 
              className="text-orange-400 hover:text-orange-300 font-medium transition-colors duration-200 hover:underline hover:underline-offset-4 decoration-orange-400/50"
            >
              {t('login.register')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}