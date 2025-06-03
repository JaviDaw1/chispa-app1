import { ChevronRight } from "lucide-react";

/**
 * SettingItem Component
 * This component renders a setting item with an icon, title, and subtitle.
 * @param {Object} props - Component properties.
 * @param {React.ReactNode} props.icon - The icon to display.
 * @param {string} props.title - The title of the setting item.
 * @param {string} props.subtitle - The subtitle of the setting item.
 * @returns {JSX.Element} The rendered setting item component.
 * @example
 * <SettingItem
 *    icon={<Lock />}
 *    title="Privacy Settings"
 *    subtitle="Manage your privacy preferences"
 * />
 */
export default function SettingItem({ icon, title, subtitle }) {
  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center gap-4">
        <div className="h-6 w-6 text-gray-700 dark:text-gray-200">{icon}</div>
        <div>
          <p className="text-lg font-medium text-gray-900 dark:text-gray-100">
            {title}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {subtitle}
          </p>
        </div>
      </div>
      <ChevronRight className="text-gray-400 dark:text-gray-500" />
    </div>
  );
}
