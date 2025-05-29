export default function SelectInput({ disabled = false, className = '', children, ...props }) {
    return (
        <select
            {...props}
            disabled={disabled}
            className={
                `rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
                    disabled && 'opacity-50'
                } ` + className
            }
        >
            {children}
        </select>
    );
}
