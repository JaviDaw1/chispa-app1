import React from "react";
import { AlertCircle } from "lucide-react";

export default function Alert({ message, type = "error" }) {
  const baseStyles = "p-4 rounded flex items-start gap-3";
  const variants = {
    error: "bg-red-50 border-l-4 border-red-500 text-red-700",
    success: "bg-green-50 border-l-4 border-green-500 text-green-700",
    warning: "bg-yellow-50 border-l-4 border-yellow-500 text-yellow-700",
    info: "bg-blue-50 border-l-4 border-blue-500 text-blue-700",
  };

  return (
    <div className={`${baseStyles} ${variants[type]}`}>
      <AlertCircle className="h-5 w-5 mt-0.5" />
      <p className="text-sm">{message}</p>
    </div>
  );
}
