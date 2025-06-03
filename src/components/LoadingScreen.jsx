/**
 * LoadingScreen Component
 * This component displays a loading screen with a spinner and an optional logo.
 * It can be customized with different messages, sizes, colors, and logo visibility.
 * @param {Object} props - Component properties.
 * @param {string} [props.message="Cargando..."] - The message to display on the loading screen.
 * @param {string} [props.size='lg'] - The size of the text, can be 'sm', 'md', or 'lg'.
 * @param {string} [props.color='gray'] - The color of the spinner and text, can be 'gray', 'orange', or 'amber'.
 * @param {boolean} [props.showLogo=false] - Whether to show the logo on the loading screen.
 * @param {string} [props.logoSrc=''] - The source URL of the logo image to display.
 * @returns {JSX.Element} The rendered loading screen component.
 * @example
 * <LoadingScreen
 *  message="Cargando datos..."
 * size="md"
 * color="orange"
 * showLogo={true}
 * logoSrc="/path/to/logo.png"
 * />
 */
const LoadingScreen = ({
  message = "Cargando...",
  size = 'lg',
  color = 'gray',
  showLogo = false,
  logoSrc = '',
}) => {
  const textClass = size === 'sm' ? 'text-sm' : size === 'md' ? 'text-base' : 'text-lg';
  const spinnerColorClass = {
    gray: 'border-gray-500 dark:border-gray-400',
    orange: 'border-orange-500 dark:border-orange-400',
    amber: 'border-amber-500 dark:border-amber-400',
  }[color] || 'border-gray-500 dark:border-gray-400';
  const textColorClass = {
    gray: 'text-gray-500 dark:text-gray-400',
    orange: 'text-orange-500 dark:text-orange-400',
    amber: 'text-amber-500 dark:text-amber-400',
  }[color] || 'text-gray-500 dark:text-gray-400';

  return (
    <div className="flex items-center justify-center min-h-screen bg-white dark:bg-gray-900 z-50 absolute top-0 left-0 w-full">
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="relative flex items-center justify-center">
          <div className={`animate-spin border-t-4 ${spinnerColorClass} border-solid rounded-full w-32 h-32`} />
          {showLogo && logoSrc && (
            <img
              src={logoSrc}
              alt="Logo"
              className="absolute z-10 h-20 w-20 rounded-xl"
            />
          )}
        </div>
        <p className={`mt-4 ${textColorClass} font-semibold ${textClass}`}>
          {message}
        </p>
      </div>
      <div className="absolute bottom-4 text-gray-400 dark:text-gray-500 text-xs">
        <p>Chispa Company &copy; 2025</p>
      </div>
    </div>
  );
};

export default LoadingScreen;