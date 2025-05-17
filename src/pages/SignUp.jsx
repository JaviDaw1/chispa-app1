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
    { value: 'FRIENDSHIP', label: t('common.friendship') },   // Amistad
    { value: 'CASUAL', label: t('common.casual') },           // Relación casual
    { value: 'SERIOUS', label: t('common.serious') },         // Relación seria
    { value: 'LONG_TERM', label: t('common.longTerm') },      // Relación a largo plazo
    { value: 'OPEN', label: t('common.open') },               // Relación abierta
    { value: 'HOOKUP', label: t('common.hookup') },           // Encuentros casuales
    { value: 'MARRIAGE', label: t('common.marriage') },       // Búsqueda de matrimonio
    { value: 'NOT_SURE', label: t('common.notSure') },        // No estoy seguro
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

      if (isUnderage) {
        newErrors.birthDate = t('errors.underage');
      }
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
    const signupData = { ...formData };
    try {
      await authService.signup(signupData);
      navigate('/login');
    } catch (error) {
      console.error('Error:', error);
      setIsSubmitting(false);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const clearError = (fieldName) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: undefined,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    let newValue = value;

    if (name === 'interests') {
      newValue = value.replace(/[^a-zA-Z,\s]/g, '').toLowerCase();
    }

    setFormData((prev) => ({ ...prev, [name]: newValue }));
    clearError(name);
  };

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

      <div className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20 pb-20">
        <div className="sm:mx-auto sm:w-full sm:max-w-3xl">
          <div className="bg-white px-8 py-12 shadow-xl rounded-2xl sm:px-12">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-extrabold text-gray-900 bg-clip-text bg-gradient-to-r from-orange-600 to-amber-600">
                {t('signup.title')}
              </h2>
              <p className="mt-2 text-lg text-gray-600">
                {t('signup.subtitle')}
              </p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* First Name */}
                <div className="relative">
                  <label htmlFor="firstname" className="block text-sm font-medium text-gray-700 mb-1">
                    {t('signup.firstname')}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="firstname"
                      name="firstname"
                      type="text"
                      value={formData.firstname}
                      onChange={handleChange}
                      className={`block w-full pl-10 rounded-xl border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:outline-none focus:ring-orange-500 sm:text-sm sm:leading-6 ${errors.firstname ? 'ring-red-500' : 'ring-gray-300'}`}
                    />
                  </div>
                  {errors.firstname && <p className="mt-1 text-sm text-red-600">{errors.firstname}</p>}
                </div>

                {/* Last Name */}
                <div className="relative">
                  <label htmlFor="lastname" className="block text-sm font-medium text-gray-700 mb-1">
                    {t('signup.lastname')}
                  </label>
                  <input
                    id="lastname"
                    name="lastname"
                    type="text"
                    value={formData.lastname}
                    onChange={handleChange}
                    className={`block w-full rounded-xl border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:outline-none pl-2 focus:ring-orange-500 sm:text-sm sm:leading-6 ${errors.lastname ? 'ring-red-500' : 'ring-gray-300'}`}
                  />
                  {errors.lastname && <p className="mt-1 text-sm text-red-600">{errors.lastname}</p>}
                </div>

                {/* Username */}
                <div className="relative">
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                    {t('signup.username')}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="username"
                      name="username"
                      type="text"
                      value={formData.username}
                      onChange={handleChange}
                      placeholder={t('signup.username_placeholder')}
                      className={`block w-full pl-10 rounded-xl border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:outline-none focus:ring-orange-500 sm:text-sm sm:leading-6 ${errors.username ? 'ring-red-500' : 'ring-gray-300'}`}
                    />
                  </div>
                  {errors.username && <p className="mt-1 text-sm text-red-600">{errors.username}</p>}
                </div>

                {/* Email */}
                <div className="relative">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    {t('signup.emailLabel')}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder={t('signup.emailPlaceholder')}
                      className={`block w-full pl-10 rounded-xl border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:outline-none focus:ring-orange-500 sm:text-sm sm:leading-6 ${errors.email ? 'ring-red-500' : 'ring-gray-300'}`}
                    />
                  </div>
                  {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                </div>

                {/* Password */}
                <div className="relative">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    {t('signup.passwordLabel')}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={handleChange}
                      placeholder={t('signup.passwordPlaceholder')}
                      className={`block w-full pl-10 rounded-xl border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:outline-none focus:ring-orange-500 sm:text-sm sm:leading-6 ${errors.password ? 'ring-red-500' : 'ring-gray-300'}`}
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer" onClick={toggleShowPassword}>
                      {showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
                    </div>
                  </div>
                  {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
                </div>

                {/* Location */}
                <div className="relative">
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                    {t('signup.location')}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MapPin className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="location"
                      name="location"
                      type="text"
                      value={formData.location}
                      onChange={handleChange}
                      className={`block w-full pl-10 rounded-xl border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:outline-none focus:ring-orange-500 sm:text-sm sm:leading-6 ${errors.location ? 'ring-red-500' : 'ring-gray-300'}`}
                    />
                  </div>
                  {errors.location && <p className="mt-1 text-sm text-red-600">{errors.location}</p>}
                </div>

                {/* Birth Date */}
                <div className="relative">
                  <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700 mb-1">
                    {t('signup.birthdate')}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Calendar className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="birthDate"
                      name="birthDate"
                      type="date"
                      value={formData.birthDate}
                      onChange={handleChange}
                      className={`block w-full pl-10 rounded-xl border-0 py-3 pr-2 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:outline-none focus:ring-orange-500 sm:text-sm sm:leading-6 ${errors.birthDate ? 'ring-red-500' : 'ring-gray-300'}`}
                    />
                  </div>
                  {errors.birthDate && <p className="mt-1 text-sm text-red-600">{errors.birthDate}</p>}
                </div>

                {/* Gender */}
                <div className="relative">
                  <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
                    {t('signup.gender')}
                  </label>
                  <select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className={`block w-full rounded-xl border-0 py-3 text-gray-900 pl-2 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-orange-500 sm:text-sm sm:leading-6 ${errors.gender ? 'ring-red-500' : 'ring-gray-300'}`}
                  >
                    <option value="MALE">{t('common.male')}</option>
                    <option value="FEMALE">{t('common.female')}</option>
                    <option value="OTHER">{t('common.other')}</option>
                  </select>
                  {errors.gender && <p className="mt-1 text-sm text-red-600">{errors.gender}</p>}
                </div>

                {/* Preferred Relationship */}
                <div className="relative">
                  <label htmlFor="preferredRelationship" className="block text-sm font-medium text-gray-700 mb-1">
                    {t('signup.relationship')}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Heart className="h-5 w-5 text-gray-400" />
                    </div>
                    <select
                      id="preferredRelationship"
                      name="preferredRelationship"
                      value={formData.preferredRelationship}
                      onChange={handleChange}
                      className={`block w-full pl-10 rounded-xl border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-orange-500 sm:text-sm sm:leading-6 ${errors.preferredRelationship ? 'ring-red-500' : 'ring-gray-300'
                        }`}
                    >
                      {relationshipOptions.map(({ value, label }) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      ))}
                    </select>
                  </div>
                  {errors.preferredRelationship && <p className="mt-1 text-sm text-red-600">{errors.preferredRelationship}</p>}
                </div>

                {/* Profile Photo */}
                <div className="relative">
                  <label htmlFor="profilePhoto" className="block text-sm font-medium text-gray-700 mb-1">
                    {t('signup.profile_photo')}
                  </label>
                  <input
                    id="profilePhoto"
                    name="profilePhoto"
                    type="url"
                    value={formData.profilePhoto}
                    onChange={handleChange}
                    className={`block w-full rounded-xl border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset pl-2 placeholder:text-gray-400 focus:ring-2 focus:outline-none focus:ring-orange-500 sm:text-sm sm:leading-6 ${errors.profilePhoto ? 'ring-red-500' : 'ring-gray-300'}`}
                  />
                  {errors.profilePhoto && <p className="mt-1 text-sm text-red-600">{errors.profilePhoto}</p>}
                </div>

                {/* Bio */}
                <div className="relative md:col-span-2">
                  <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
                    {t('signup.bio')}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 pt-3 flex items-start pointer-events-none">
                      <Smile className="h-5 w-5 text-gray-400" />
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

                {/* Interests */}
                <div className="relative md:col-span-2">
                  <label htmlFor="interests" className="block text-sm font-medium text-gray-700 mb-1">
                    {t('signup.interests')} ({t('signup.interests_hint')})
                  </label>
                  <input
                    id="interests"
                    name="interests"
                    type="text"
                    value={formData.interests}
                    onChange={handleChange}
                    placeholder={t('signup.interests_placeholder')}
                    className={`block w-full rounded-xl border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset pl-2 placeholder:text-gray-400 focus:ring-2 focus:outline-none focus:ring-orange-500 sm:text-sm sm:leading-6 ${errors.interests ? 'ring-red-500' : 'ring-gray-300'}`}
                  />
                  {errors.interests && <p className="mt-1 text-sm text-red-600">{errors.interests}</p>}
                </div>
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
            <div className="mt-8 text-center">
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
    </div>
  );
}