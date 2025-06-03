import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import AuthService from '../services/AuthService';
import Divider from '../components/Divider';
import Header from '../components/Header';
import ImageUploader from '../components/ImageUploader';
import PrimaryButton from '../components/PrimaryButton';
import { Eye, EyeOff, User, Mail, Lock, MapPin, Calendar, Heart, Smile } from 'lucide-react';
import TopHeader from '../components/TopHeader';

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
    profilePhoto: "data:image/png;base64,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",
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

  const handleImageUpload = (base64) => {
    setFormData((prev) => ({
      ...prev,
      profilePhoto: base64,
    }));
    setErrors((prev) => ({ ...prev, profilePhoto: undefined }));
  };

  const toggleShowPassword = () => setShowPassword((prev) => !prev);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSignup();
  };

  return (
    <div className="min-h-screen">
      <Header />
      <TopHeader showSwitcher={true} logoSrc="/images/logo.jpg" />

      <div className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-24 pb-20">
        <div className="w-full max-w-4xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-6 sm:p-10 md:p-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold bg-clip-text bg-gradient-to-r from-orange-600 to-amber-600 text-transparent">
              {t('signup.title')}
            </h2>
            <p className="mt-2 text-base sm:text-lg text-gray-600 dark:text-gray-300">
              {t('signup.subtitle')}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              ['firstname', 'text', <User />, t('signup.firstname'),],
              ['lastname', 'text', <User />, t('signup.lastname')],
              ['username', 'text', <User />, t('signup.username')],
              ['email', 'email', <Mail />, t('signup.emailLabel')],
              ['password', showPassword ? 'text' : 'password', <Lock />, t('signup.passwordLabel')],
              ['location', 'text', <MapPin />, t('signup.location')],
              ['birthDate', 'date', <Calendar />, t('signup.birthdate')],
              ['interests', 'text', null, `${t('signup.interests')} (${t('signup.interests_hint')})`]
            ].map(([name, type, icon, label]) => (
              <div key={name} className={name === 'interests' ? 'md:col-span-2' : ''}>
                <label htmlFor={name} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{label}</label>
                <div className="relative">
                  {icon && <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">{icon}</div>}
                  <input
                    id={name}
                    name={name}
                    type={type}
                    value={formData[name]}
                    onChange={handleChange}
                    placeholder={label}
                    className={`block w-full ${icon ? 'pl-10' : 'pl-3'} rounded-xl border-0 py-3 text-gray-900 dark:text-white bg-white dark:bg-gray-700 shadow-sm ring-1 ring-inset placeholder:text-gray-400 dark:placeholder:text-gray-300 focus:ring-2 focus:outline-none focus:ring-orange-500 pr-2 sm:text-sm sm:leading-6 ${errors[name] ? 'ring-red-500' : 'ring-gray-300 dark:ring-gray-600'}`}
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

            <div className="md:col-span-2">
              <ImageUploader
                initialImage={formData.profilePhoto}
                onImageUpload={handleImageUpload}
                error={errors.profilePhoto}
                translate={t}
              />
            </div>

            <div>
              <label htmlFor="gender" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('signup.gender')}</label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className={`block w-full rounded-xl border-0 py-3 text-gray-900 dark:text-white bg-white dark:bg-gray-700 pl-3 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-orange-500 sm:text-sm sm:leading-6 ${errors.gender ? 'ring-red-500' : 'ring-gray-300 dark:ring-gray-600'}`}
              >
                <option value="MALE">{t('common.male')}</option>
                <option value="FEMALE">{t('common.female')}</option>
                <option value="OTHER">{t('common.other')}</option>
              </select>
              {errors.gender && <p className="mt-1 text-sm text-red-600">{errors.gender}</p>}
            </div>

            <div>
              <label htmlFor="preferredRelationship" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('signup.relationship')}</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Heart className="text-gray-900 dark:text-white" />
                </div>
                <select
                  id="preferredRelationship"
                  name="preferredRelationship"
                  value={formData.preferredRelationship}
                  onChange={handleChange}
                  className={`block w-full pl-10 rounded-xl border-0 py-3 text-gray-900 dark:text-white bg-white dark:bg-gray-700 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-orange-500 sm:text-sm sm:leading-6 ${errors.preferredRelationship ? 'ring-red-500' : 'ring-gray-300 dark:ring-gray-600'}`}
                >
                  {relationshipOptions.map(({ value, label }) => (
                    <option key={value} value={value}>{label}</option>
                  ))}
                </select>
              </div>
              {errors.preferredRelationship && <p className="mt-1 text-sm text-red-600">{errors.preferredRelationship}</p>}
            </div>

            <div className="md:col-span-2">
              <label htmlFor="bio" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('signup.bio')}</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 pt-3 flex items-start pointer-events-none">
                  <Smile className="text-gray-900 dark:text-white" />
                </div>
                <textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  rows={3}
                  className={`block w-full pl-10 rounded-xl border-0 py-3 pr-1 text-gray-900 dark:text-white bg-white dark:bg-gray-700 shadow-sm ring-1 ring-inset placeholder:text-gray-400 dark:placeholder:text-gray-300 focus:ring-2 focus:outline-none focus:ring-orange-500 sm:text-sm sm:leading-6 ${errors.bio ? 'ring-red-500' : 'ring-gray-300 dark:ring-gray-600'}`}
                />
              </div>
              {errors.bio && <p className="mt-1 text-sm text-red-600">{errors.bio}</p>}
            </div>

            <PrimaryButton type="submit" isLoading={isSubmitting} className="md:col-span-2" onClick={handleSubmit}>
              {t('signup.submit')}
            </PrimaryButton>
          </form>

          <div className="mt-6 text-center">
            <Divider text={t('login.or')} className="mb-4" />
            <p className="text-sm text-gray-600 dark:text-gray-400">
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
