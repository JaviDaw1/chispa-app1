import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

const Modal = ({
  show,
  onClose,
  onConfirm,
  title,
  message,
  confirmText,
  cancelText,
  showReasonInput = false,
  reason = "",
  onReasonChange,
  placeholder = "",
}) => {
  const { t } = useTranslation();
  const [internalReason, setInternalReason] = useState(reason);

  useEffect(() => {
    setInternalReason(reason);
  }, [reason, show]);

  const handleConfirm = () => {
    if (onReasonChange) onReasonChange(internalReason);
    onConfirm();
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 overflow-auto bg-gray-800 bg-opacity-75 dark:bg-black dark:bg-opacity-70">
      <div className="absolute mx-4" />
      <div className="absolute bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-6 rounded-md shadow-md w-full max-w-2xl z-50">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <p className="mb-4">{message}</p>

        {showReasonInput && (
          <textarea
            className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md p-2 mb-4 resize-none"
            rows="3"
            placeholder={placeholder || t("modal.placeholder")}
            value={internalReason}
            onChange={(e) => {
              setInternalReason(e.target.value);
              if (onReasonChange) onReasonChange(e.target.value);
            }}
          />
        )}

        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 dark:bg-gray-700 dark:text-white rounded hover:bg-gray-400 dark:hover:bg-gray-600 transition-all duration-200"
          >
            {cancelText || t("modal.cancel")}
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-all duration-200"
          >
            {confirmText || t("modal.confirm")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
