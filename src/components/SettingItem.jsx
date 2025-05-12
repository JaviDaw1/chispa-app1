import { ChevronRight } from "lucide-react";

export default function SettingItem({ icon, title, subtitle }) {
  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center gap-4">
        <div className="h-6 w-6">{icon}</div>
        <div>
          <p className="text-lg font-medium text-gray-900">{title}</p>
          <p className="text-sm text-gray-500">{subtitle}</p>
        </div>
      </div>
      <ChevronRight className="text-gray-400" />
    </div>
  );
}