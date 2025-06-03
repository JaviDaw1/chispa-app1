/**
 * Divider Component
 * @param {Object} props - Component properties.
 * @param {ReactNode} props.children - Optional children to render inside the divider.
 * @param {string} [props.text=''] - Text to display in the center of the divider.
 * @param {string} [props.lineStyles='border-gray-300'] - Custom styles for the divider lines.
 * @param {string} [props.className=''] - Additional CSS classes for the divider container.
 * @returns {JSX.Element} The rendered divider component.
 * @example
 * <Divider text="Section Title" lineStyles="border-blue-500" className="my-4">
 *   <p>Additional content below the divider</p>
 * </Divider>
 */
export default function Divider({ children, text = '', lineStyles = 'border-gray-300', className = '', ...props }) {
  return (
    <div {...props} className={`relative ${className}`}>
      <div className="absolute inset-0 flex items-center" aria-hidden="true">
        <div className={`w-full border-t ${lineStyles} dark:border-gray-600`} />
      </div>
      <div className="relative flex justify-center">
        <span className="bg-white dark:bg-gray-900 px-2 text-sm text-gray-500 dark:text-gray-400">
          {text}
        </span>
      </div>
      {children}
    </div>
  );
}
