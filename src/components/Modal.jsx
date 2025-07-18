import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

/**
 * Modal Component
 * This component renders a modal dialog with a title, message, confirmation button, and optional reason input.
 * @param {Object} props - Component properties.
 * @param {boolean} props.show - Whether the modal is visible.
 * @param {Function} props.onClose - Function to call when the modal is closed.
 * @param {Function} props.onConfirm - Function to call when the confirmation button is clicked.
 * @param {string} props.title - The title of the modal.
 * @param {string} props.message - The message to display in the modal.
 * @param {string} [props.confirmText] - Text for the confirmation button, defaults to "Confirm".
 * @param {string} [props.cancelText] - Text for the cancel button, defaults to "Cancel".
 * @param {boolean} [props.showReasonInput=false] - Whether to show a text area for the reason.
 * @param {string} [props.reason=""] - Initial value for the reason input.
 * @param {Function} [props.onReasonChange] - Function to call when the reason input changes.
 * @param {string} [props.placeholder=""] - Placeholder text for the reason input.
 * @returns {JSX.Element|null} The rendered modal component or null if not visible.
 * @example
 * <Modal
 * show={true}
 * onClose={() => console.log("Modal closed")}
 * onConfirm={() => console.log("Confirmed")}
 * title="Confirm Action"
 * message="Are you sure you want to proceed?"
 * confirmText="Yes, proceed"
 * cancelText="No, cancel"
 * showReasonInput={true}
 * reason="Optional reason"
 * onReasonChange={(value) => console.log("Reason changed:", value)}
 * placeholder="Enter your reason here"
 * />
 */
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
  hideDefaultButtons = false,
  hideClose = false,
  children,
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
        {title && <h2 className="text-xl font-bold mb-4">{title}</h2>}
        <div>{children || message}</div>

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

        {!hideDefaultButtons && (
          <div className="flex justify-end mt-6 gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
            >
              {cancelText || t("modal.cancel")}
            </button>
            <button
              onClick={handleConfirm}
              className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
            >
              {confirmText || t("modal.confirm")}
            </button>
          </div>
        )}
        {!hideClose && (
          <button
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            onClick={onClose}
            aria-label="Cerrar"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
};

export default Modal;
