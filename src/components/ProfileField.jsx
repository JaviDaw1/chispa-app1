const ProfileField = ({ label, value }) => (
  <div>
    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{label}</p>
    <p className="text-gray-800 dark:text-gray-200 mt-1">{value || <span className="italic text-gray-400 dark:text-gray-500">—</span>}</p>
  </div>
);

export default ProfileField;
