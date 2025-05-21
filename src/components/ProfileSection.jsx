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
