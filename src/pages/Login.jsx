import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from '../components/Header';
import AuthService from '../services/AuthService';
import Divider from '../components/Divider';
import LanguageSelector from '../components/LanguageSelector';
import ThemeSwitcher from '../components/ThemeSwitcher';
import PrimaryButton from '../components/PrimaryButton';
import Alert from '../components/Alert';
import Logo from '../../public/images/logo.jpg';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import LoadingScreen from '../components/LoadingScreen';
import TopHeader from '../components/TopHeader';

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
    <div className="min-h-screen flex flex-col">
      <Header />
      <TopHeader showSwitcher={true} logoSrc='/images/logo.jpg'/>

      {isSubmitting && (
        <LoadingScreen
          size="lg"
          message={t('login.loading')}
          showLogo={true}
          logoSrc={Logo}
        />
      )}

      <div className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-900 px-8 py-10 shadow-xl dark:shadow-md rounded-2xl w-full max-w-md space-y-6 border border-gray-200 dark:border-gray-700">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-amber-500 dark:from-orange-300 dark:to-amber-400">
              {t('login.title')}
            </h2>
          </div>

          {error && <Alert message={error} type="error" />}

          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                {t('login.emailLabel')}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400 dark:text-gray-300" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 rounded-xl border border-gray-300 dark:border-gray-600 py-3 text-gray-900 dark:text-white bg-white dark:bg-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-2 focus:outline-none focus:ring-orange-500 sm:text-sm sm:leading-6"
                  placeholder={t('login.emailPlaceholder')}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                {t('login.passwordLabel')}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400 dark:text-gray-300" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-10 rounded-xl border border-gray-300 dark:border-gray-600 py-3 text-gray-900 dark:text-white bg-white dark:bg-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-2 focus:outline-none focus:ring-orange-500 sm:text-sm sm:leading-6"
                  placeholder={t('login.passwordPlaceholder')}
                />
                <div
                  className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <EyeOff className="h-5 w-5 text-gray-400 dark:text-gray-300" /> : <Eye className="h-5 w-5 text-gray-400 dark:text-gray-300" />}
                </div>
              </div>
            </div>

            <PrimaryButton
              type="submit"
              disabled={isLoading}
              isLoading={isLoading}
              className="w-full"
            >
              {t('login.loginButton')}
            </PrimaryButton>
          </form>

          <div className="flex justify-end">
            <Link
              to="/forgot-password"
              className="text-sm text-orange-600 hover:underline font-medium"
            >
              {t('login.forgotPassword')}
            </Link>
          </div>

          <Divider text={t('login.or')} />

          <div className="text-center text-sm text-gray-600 dark:text-gray-400">
            {t('login.noAccount')}{' '}
            <Link to="/signup" className="text-orange-600 hover:underline font-medium">
              {t('login.register')}
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}