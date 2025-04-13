export default function Divider({children, text= '', linesStyles= 'border-gray-300', ...props}) {
    return (
        <div {...props} className={`relative ${props.className || ''}`}>
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className={`w-full border-t ${linesStyles || ''}`}/>
            </div>
            <div className="relative flex justify-center">
                <span className="bg-white px-2 text-sm text-gray-500">{text}</span>
            </div>
            {children}
        </div>
    )
}