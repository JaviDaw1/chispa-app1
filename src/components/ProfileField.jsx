/**
 * ProfileField Component
 * This component displays a label and a value for a profile field.
 * @param {Object} props - Component properties.
 * @param {string} props.label - The label for the profile field.
 * @param {string} props.value - The value for the profile field.
 * @return {JSX.Element} The rendered profile field component.
 * @example
 * <ProfileField
 *   label="Name"
 *   value="John Doe"
 * />
 */
const ProfileField = ({ label, value }) => (
  <div>
    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{label}</p>
    <p className="text-gray-800 dark:text-gray-200 mt-1">{value || <span className="italic text-gray-400 dark:text-gray-500">—</span>}</p>
  </div>
);

export default ProfileField;
