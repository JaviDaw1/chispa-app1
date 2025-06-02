// This component is a EditProfileForm that allows users to edit or complete their profile information.
import PrimaryButton from "./PrimaryButton";

export default function EditProfileForm({
  formData,
  handleChange,
  handleSubmit,
  loading,
  t,
  onCancel,
}) {
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-4xl mx-auto"
    >
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100">
        {formData.name ? t("profile.editProfile") : t("profile.completeProfile")}
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Nombre */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {t("signup.firstname")}*
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            required
          />
        </div>

        {/* Apellido */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {t("signup.lastname")}*
          </label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            required
          />
        </div>

        {/* Género */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {t("signup.gender")}*
          </label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            required
          >
            <option value="MALE">{t("common.male")}</option>
            <option value="FEMALE">{t("common.female")}</option>
            <option value="OTHER">{t("common.other")}</option>
          </select>
        </div>

        {/* Fecha de nacimiento */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {t("signup.birthdate")}*
          </label>
          <input
            type="date"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            required
          />
        </div>

        {/* Ubicación */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {t("signup.location")}
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          />
        </div>

        {/* Relación preferida */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {t("signup.relationship")}
          </label>
          <select
            name="preferredRelationship"
            value={formData.preferredRelationship}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          >
            <option value="FRIENDSHIP">{t("common.friendship")}</option>
            <option value="CASUAL">{t("common.casual")}</option>
            <option value="SERIOUS">{t("common.serious")}</option>
            <option value="LONG_TERM">{t("common.longTerm")}</option>
            <option value="OPEN">{t("common.open")}</option>
            <option value="HOOKUP">{t("common.hookup")}</option>
            <option value="MARRIAGE">{t("common.marriage")}</option>
            <option value="NOT_SURE">{t("common.notSure")}</option>
          </select>
        </div>

        {/* Biografía (ocupa columna completa en lg) */}
        <div className="lg:col-span-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {t("signup.bio")}
          </label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            rows={3}
          />
        </div>

        {/* Intereses (ocupa columna completa en lg) */}
        <div className="lg:col-span-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {t("signup.interests")}
          </label>
          <textarea
            name="interests"
            value={formData.interests}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            rows={2}
          />
        </div>

        {/* Foto de perfil (ocupa columna completa en lg) */}
        <div className="lg:col-span-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {t("signup.profile_photo")}
          </label>
          <input
            type="text"
            name="profilePhoto"
            value={formData.profilePhoto}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          />
          {formData.profilePhoto && (
            <img
              src={formData.profilePhoto}
              alt="Preview"
              className="w-20 h-20 rounded-full object-cover mt-2 border border-gray-300 dark:border-gray-600"
            />
          )}
        </div>
      </div>

      {/* Botones */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
        <PrimaryButton
          type="submit"
          className="w-full py-2 px-4 rounded-md bg-orange-600 hover:bg-orange-700 text-white font-medium flex items-center justify-center transition duration-200 ease-in-out"
          disabled={loading}
        >
          {loading ? t("common.saving") : t("profile.saveProfile")}
        </PrimaryButton>
        <button
          type="button"
          onClick={onCancel}
          className="w-full py-2 px-4 rounded-md bg-gray-400 hover:bg-gray-500 text-white font-medium flex items-center justify-center transition duration-200 ease-in-out"
        >
          {t("common.cancel")}
        </button>
      </div>
    </form>
  );
}
