// This component displays an alert message with different styles based on the type of alert.
import { AlertCircle } from "lucide-react";

// Message types can be "error", "success", "warning", or "info" and will determine the styling of the alert.
export default function Alert({ message, type = "error" }) {
  const baseStyles = "p-4 rounded flex items-start gap-3";

  // Define styles for different alert types
  const variants = {
    error:
      "bg-red-50 border-l-4 border-red-500 text-red-700 dark:bg-red-200 dark:border-red-700 dark:text-red-800",
    success:
      "bg-green-50 border-l-4 border-green-500 text-green-700 dark:bg-green-200 dark:border-green-700 dark:text-green-800",
    warning:
      "bg-yellow-50 border-l-4 border-yellow-500 text-yellow-700 dark:bg-yellow-200 dark:border-yellow-700 dark:text-yellow-800",
    info:
      "bg-blue-50 border-l-4 border-blue-500 text-blue-700 dark:bg-blue-200 dark:border-blue-700 dark:text-blue-800",
  };

  return (
    <div className={`${baseStyles} ${variants[type]}`}>
      <AlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
      <p className="text-sm">{message}</p>
    </div>
  );
}
