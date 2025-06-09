import PrimaryButton from "./PrimaryButton";
import ImageUploader from "../components/ImageUploader";
import LocationAutocomplete from "../components/LocationAutocomplete";
import { MapPin } from 'lucide-react';

/**
 * EditProfileForm component
 * @param {Object} props - Component properties.
 * @param {Object} props.formData - The form data containing user profile information.
 * @param {Function} props.onInputChange - Function to handle input changes.
 * @param {Function} props.onSubmit - Function to handle form submission.
 * @param {boolean} props.isLoading - Indicates if the form is in a loading state.
 * @param {Function} props.translate - Translation function for internationalization.
 * @param {Function} props.onCancel - Function to handle cancel action.
 * @param {Function} props.onImageUpload - Function to handle image upload.
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
  onImageUpload
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
        
        {/* Location Autocomplete */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {translate("signup.location")}
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MapPin className="text-gray-900 dark:text-white" />
            </div>
            <LocationAutocomplete
              value={formData.location}
              onChange={(e) =>
                onInputChange({
                  target: {
                    name: "location",
                    value: e.target.value
                  }
                })
              }
              onSelect={({ address, lat, lng }) => {
                onInputChange({ target: { name: "location", value: address } });
                onInputChange({ target: { name: "latitude", value: lat } });
                onInputChange({ target: { name: "longitude", value: lng } });
              }}
              inputClassName="pl-10 w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
          </div>
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
          <ImageUploader
            initialImage={formData.profilePhoto}
            onImageUpload={onImageUpload}
            error={formData.profilePhotoError}
            translate={translate}
          />
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
