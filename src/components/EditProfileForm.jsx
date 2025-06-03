import PrimaryButton from "./PrimaryButton";

/**
 * EditProfileForm component
 * @param {Object} props - Component properties.
 * @param {Object} props.formData - The form data containing user profile information.
 * @param {Function} props.onInputChange - Function to handle input changes.
 * @param {Function} props.onSubmit - Function to handle form submission.
 * @param {boolean} props.isLoading - Indicates if the form is in a loading state.
 * @param {Function} props.translate - Translation function for internationalization.
 * @param {Function} props.onCancel - Function to handle cancel action.
 * @returns {JSX.Element} The rendered form component.
 * @example
 * <EditProfileForm
 *   formData={formData}
 *   onInputChange={handleChange}
 *   onSubmit={handleSubmit}
 *   isLoading={loading}
 *   translate={t}
 *   onCancel={onCancel}
 * />
 */
export default function EditProfileForm({
  formData,
  onInputChange,
  onSubmit,
  isLoading,
  translate,
  onCancel,
}) {
  return (
    <form
      onSubmit={onSubmit}
      className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-4xl mx-auto"
    >
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100">
        {formData.name ? translate("profile.editProfile") : translate("profile.completeProfile")}
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* First Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {translate("signup.firstname")}*
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={onInputChange}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            required
          />
        </div>

        {/* Last Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {translate("signup.lastname")}*
          </label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={onInputChange}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            required
          />
        </div>

        {/* Gender */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {translate("signup.gender")}*
          </label>
          <select
            name="gender"
            value={formData.gender}
            onChange={onInputChange}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            required
          >
            <option value="MALE">{translate("common.male")}</option>
            <option value="FEMALE">{translate("common.female")}</option>
            <option value="OTHER">{translate("common.other")}</option>
          </select>
        </div>

        {/* Birthdate */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {translate("signup.birthdate")}*
          </label>
          <input
            type="date"
            name="birthDate"
            value={formData.birthDate}
            onChange={onInputChange}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            required
          />
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {translate("signup.location")}
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={onInputChange}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          />
        </div>

        {/* Preferred Relationship */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {translate("signup.relationship")}
          </label>
          <select
            name="preferredRelationship"
            value={formData.preferredRelationship}
            onChange={onInputChange}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          >
            <option value="FRIENDSHIP">{translate("common.friendship")}</option>
            <option value="CASUAL">{translate("common.casual")}</option>
            <option value="SERIOUS">{translate("common.serious")}</option>
            <option value="LONG_TERM">{translate("common.longTerm")}</option>
            <option value="OPEN">{translate("common.open")}</option>
            <option value="HOOKUP">{translate("common.hookup")}</option>
            <option value="MARRIAGE">{translate("common.marriage")}</option>
            <option value="NOT_SURE">{translate("common.notSure")}</option>
          </select>
        </div>

        {/* Bio (takes full width in lg) */}
        <div className="lg:col-span-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {translate("signup.bio")}
          </label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={onInputChange}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            rows={3}
          />
        </div>

        {/* Interests (takes full width in lg) */}
        <div className="lg:col-span-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {translate("signup.interests")}
          </label>
          <textarea
            name="interests"
            value={formData.interests}
            onChange={onInputChange}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            rows={2}
          />
        </div>

        {/* Profile Photo (takes full width in lg) */}
        <div className="lg:col-span-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {translate("signup.profile_photo")}
          </label>
          <input
            type="text"
            name="profilePhoto"
            value={formData.profilePhoto}
            onChange={onInputChange}
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

      {/* Buttons */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
        <PrimaryButton
          type="submit"
          className="w-full py-2 px-4 rounded-md bg-orange-600 hover:bg-orange-700 text-white font-medium flex items-center justify-center transition duration-200 ease-in-out"
          disabled={isLoading}
        >
          {isLoading ? translate("common.saving") : translate("profile.saveProfile")}
        </PrimaryButton>
        <button
          type="button"
          onClick={onCancel}
          className="w-full py-2 px-4 rounded-md bg-gray-400 hover:bg-gray-500 text-white font-medium flex items-center justify-center transition duration-200 ease-in-out"
        >
          {translate("common.cancel")}
        </button>
      </div>
    </form>
  );
}
