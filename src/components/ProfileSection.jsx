/**
 * ProfileSection Component
 * This component renders a section in a user profile with a title and children elements.
 * @param {Object} props - Component properties.
 * @param {string} props.title - The title of the section.
 * @param {React.ReactNode} props.children - The content to display within the section.
 * @returns {JSX.Element} The rendered profile section component.
 * @example
 * <ProfileSection title="User Information">
 * <ProfileField label="Name" value="John Doe" />
 * <ProfileField label="Email" value="
*/
const ProfileSection = ({ title, children }) => (
  <div>
    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-3 pb-2 border-b border-gray-200 dark:border-gray-700">
      {title}
    </h3>
    <div className="space-y-4">
      {children}
    </div>
  </div>
);

export default ProfileSection;
