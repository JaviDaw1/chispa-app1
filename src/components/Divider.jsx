export default function Divider({ children, text = '', linesStyles = 'border-gray-300', ...props }) {
  return (
    <div {...props} className={`relative ${props.className || ''}`}>
      <div className="absolute inset-0 flex items-center" aria-hidden="true">
        <div className={`w-full border-t ${linesStyles} dark:border-gray-600`} />
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
