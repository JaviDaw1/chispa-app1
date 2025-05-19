import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import AuthService from '../services/AuthService';
import Divider from '../components/Divider';
import Header from '../components/Header';
import LanguageSelector from '../components/LanguageSelector';
import Logo from '../../public/images/logo.jpg';
import { Eye, EyeOff, User, Mail, Lock, MapPin, Calendar, Heart, Smile } from 'lucide-react';

const authService = new AuthService();

export default function SignUp() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    password: '',
    gender: 'MALE',
    birthDate: '',
    location: '',
    bio: '',
    interests: '',
    profilePhoto: '',
    preferredRelationship: 'CASUAL',
  });

  const relationshipOptions = [
    { value: 'FRIENDSHIP', label: t('common.friendship') },
    { value: 'CASUAL', label: t('common.casual') },
    { value: 'SERIOUS', label: t('common.serious') },
    { value: 'LONG_TERM', label: t('common.longTerm') },
    { value: 'OPEN', label: t('common.open') },
    { value: 'HOOKUP', label: t('common.hookup') },
    { value: 'MARRIAGE', label: t('common.marriage') },
    { value: 'NOT_SURE', label: t('common.notSure') },
  ];

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!formData.firstname) newErrors.firstname = t('errors.required');
    if (!formData.lastname) newErrors.lastname = t('errors.required');
    if (!formData.username) newErrors.username = t('errors.required');
    if (!formData.email) {
      newErrors.email = t('errors.required');
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t('errors.invalid_email');
    }
    if (!formData.password) {
      newErrors.password = t('errors.required');
    } else if (formData.password.length < 6) {
      newErrors.password = t('errors.min_length', { count: 6 });
    }
    if (!formData.location) newErrors.location = t('errors.required');
    if (!formData.bio) newErrors.bio = t('errors.required');
    if (!formData.interests) newErrors.interests = t('errors.required');
    if (!formData.profilePhoto) newErrors.profilePhoto = t('errors.required');
    if (!formData.birthDate) {
      newErrors.birthDate = t('errors.required');
    } else {
      const birthDate = new Date(formData.birthDate);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      const dayDiff = today.getDate() - birthDate.getDate();
      const isUnderage = age < 18 || (age === 18 && (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)));
      if (isUnderage) newErrors.birthDate = t('errors.underage');
    }
    if (!formData.gender) newErrors.gender = t('errors.required');
    return newErrors;
  };

  const handleSignup = async () => {
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      await authService.signup(formData);
      navigate('/login');
    } catch (error) {
      console.error('Error:', error);
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'interests'
        ? value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚüÜñÑ,\s]/g, '').toLowerCase()
        : value
    }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const toggleShowPassword = () => setShowPassword((prev) => !prev);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSignup();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />
      <div className="lg:hidden fixed top-0 left-0 w-full bg-white shadow z-40 py-2 px-4 flex items-center justify-center">
        <img src={Logo} alt={t('header.title')} className="h-14 flex-shrink-0" />
        {!localStorage.getItem("token") && !localStorage.getItem("usuario") && (
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 w-20">
            <LanguageSelector showText={false} />
          </div>
        )}
      </div>

      <div className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-24 pb-20">
        <div className="w-full max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-6 sm:p-10 md:p-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 bg-clip-text bg-gradient-to-r from-orange-600 to-amber-600">
              {t('signup.title')}
            </h2>
            <p className="mt-2 text-base sm:text-lg text-gray-600">
              {t('signup.subtitle')}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* INPUTS - Usar un componente separado es ideal pero aquí mantenemos directo */}
            {[
              ['firstname', 'text', <User />, t('signup.firstname')],
              ['lastname', 'text', <User />, t('signup.lastname')],
              ['username', 'text', <User />, t('signup.username')],
              ['email', 'email', <Mail />, t('signup.emailLabel')],
              ['password', showPassword ? 'text' : 'password', <Lock />, t('signup.passwordLabel')],
              ['location', 'text', <MapPin />, t('signup.location')],
              ['birthDate', 'date', <Calendar />, t('signup.birthdate')],
              ['profilePhoto', 'url', null, t('signup.profile_photo')],
              ['interests', 'text', null, `${t('signup.interests')} (${t('signup.interests_hint')})`]
            ].map(([name, type, icon, label]) => (
              <div key={name} className={name === 'interests' || name === 'profilePhoto' ? 'md:col-span-2' : ''}>
                <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                <div className="relative">
                  {icon && <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">{icon}</div>}
                  <input
                    id={name}
                    name={name}
                    type={type}
                    value={formData[name]}
                    onChange={handleChange}
                    className={`block w-full ${icon ? 'pl-10' : 'pl-3'} rounded-xl border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:outline-none focus:ring-orange-500 sm:text-sm sm:leading-6 ${errors[name] ? 'ring-red-500' : 'ring-gray-300'}`}
                  />
                  {name === 'password' && (
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer" onClick={toggleShowPassword}>
                      {showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
                    </div>
                  )}
                </div>
                {errors[name] && <p className="mt-1 text-sm text-red-600">{errors[name]}</p>}
              </div>
            ))}

            {/* Gender */}
            <div>
              <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">{t('signup.gender')}</label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className={`block w-full rounded-xl border-0 py-3 text-gray-900 pl-3 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-orange-500 sm:text-sm sm:leading-6 ${errors.gender ? 'ring-red-500' : 'ring-gray-300'}`}
              >
                <option value="MALE">{t('common.male')}</option>
                <option value="FEMALE">{t('common.female')}</option>
                <option value="OTHER">{t('common.other')}</option>
              </select>
              {errors.gender && <p className="mt-1 text-sm text-red-600">{errors.gender}</p>}
            </div>

            {/* Preferred Relationship */}
            <div>
              <label htmlFor="preferredRelationship" className="block text-sm font-medium text-gray-700 mb-1">{t('signup.relationship')}</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Heart className="text-gray-900" />
                </div>
                <select
                  id="preferredRelationship"
                  name="preferredRelationship"
                  value={formData.preferredRelationship}
                  onChange={handleChange}
                  className={`block w-full pl-10 rounded-xl border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-orange-500 sm:text-sm sm:leading-6 ${errors.preferredRelationship ? 'ring-red-500' : 'ring-gray-300'}`}
                >
                  {relationshipOptions.map(({ value, label }) => (
                    <option key={value} value={value}>{label}</option>
                  ))}
                </select>
              </div>
              {errors.preferredRelationship && <p className="mt-1 text-sm text-red-600">{errors.preferredRelationship}</p>}
            </div>

            {/* Bio */}
            <div className="md:col-span-2">
              <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">{t('signup.bio')}</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 pt-3 flex items-start pointer-events-none">
                  <Smile className="text-gray-900" />
                </div>
                <textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  rows={3}
                  className={`block w-full pl-10 rounded-xl border-0 py-3 pr-1 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:outline-none focus:ring-orange-500 sm:text-sm sm:leading-6 ${errors.bio ? 'ring-red-500' : 'ring-gray-300'}`}
                />
              </div>
              {errors.bio && <p className="mt-1 text-sm text-red-600">{errors.bio}</p>}
            </div>

            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`flex w-full justify-center rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 px-4 py-3 text-lg font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:from-orange-500 hover:to-amber-500 transform hover:-translate-y-0.5 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg className="ease-in-out animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {t('common.loading')}
                  </span>
                ) : (
                  t('signup.submit')
                )}
              </button>
            </div>
          </form>
          <div className="mt-6 text-center">
            <Divider text={t('login.or')} className="mb-4" />
            <p className="text-sm text-gray-600">
              {t('signup.account')}{' '}
              <Link
                to="/login"
                className="font-medium text-orange-600 hover:text-orange-500 transition-colors duration-200 ease-in-out"
              >
                {t('login.log_in')}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
