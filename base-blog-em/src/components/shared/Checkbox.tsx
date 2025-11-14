interface CheckboxProps {
    id: string
    label: string
    checked: boolean
    onChange: (checked: boolean) => void
}

export default function Checkbox({
    id,
    label,
    checked,
    onChange,
}: CheckboxProps) {
    return (
        <div className="flex items-center gap-2">
            <input
                type="checkbox"
                id={id}
                checked={checked}
                onChange={(e) => onChange(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
            />
            <label
                htmlFor={id}
                className="text-sm font-medium text-gray-700 cursor-pointer"
            >
                {label}
            </label>
        </div>
    )
}
