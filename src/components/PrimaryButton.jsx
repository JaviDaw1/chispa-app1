/**
 * PrimaryButton Component
 * This component renders a primary button with a gradient background, loading state, and optional click handler.
 * @param {Object} props - Component properties.
 * @param {string} [props.type="submit"] - The type of the button, defaults to "submit".
 * @param {boolean} [props.disabled=false] - Whether the button is disabled, defaults to false.
 * @param {boolean} [props.isLoading=false] - Whether the button is in a loading state, defaults to false.
 * @param {Function} [props.onClick] - Function to call when the button is clicked.
 * @param {React.ReactNode} [props.children] - The content to display inside the button.
 * @param {string} [props.className=""] - Additional CSS classes to apply to the button.
 * @returns {JSX.Element} The rendered button component.
 * @example
 * <PrimaryButton
 *  type="button"
 *  disabled={false}
 *  isLoading={false}
 *  onClick={() => console.log('Button clicked')}
 *  className="my-custom-class"
 * >
 * Click Me
 * </PrimaryButton>
 */ 
export default function PrimaryButton({
  type = 'submit',
  disabled = false,
  isLoading = false,
  onClick,
  children,
  className = '',
}) {
  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      className={`flex w-full justify-center rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 px-4 py-3 text-lg font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:from-orange-500 hover:to-amber-500 transform hover:-translate-y-0.5 ${(disabled || isLoading) ? 'opacity-70 cursor-not-allowed' : ''
        } ${className}`}
    >
      {isLoading ? (
        <span className="flex items-center">
          <svg
            className="ease-in-out animate-spin -ml-1 mr-3 h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          Cargando...
        </span>
      ) : (
        children
      )}
    </button>
  );
}
