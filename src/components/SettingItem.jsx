import { ChevronRight } from "lucide-react";

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
