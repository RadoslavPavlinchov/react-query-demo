import { useEffect, useState } from "react"
import { toastManager } from "../../utils/toastManager"

interface Toast {
    id: string
    message: string
    type: "error" | "success" | "info" | "warning"
}

export function ToastContainer() {
    const [toasts, setToasts] = useState<Toast[]>(toastManager.getToasts())

    useEffect(() => {
        const unsubscribe = toastManager.subscribe((updatedToasts) => {
            setToasts(updatedToasts)
        })
        return unsubscribe
    }, [])

    const getToastStyles = (type: string) => {
        switch (type) {
            case "error":
                return "bg-red-500 text-white"
            case "success":
                return "bg-green-500 text-white"
            case "warning":
                return "bg-yellow-500 text-white"
            case "info":
            default:
                return "bg-blue-500 text-white"
        }
    }

    return (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 space-y-2">
            {toasts.map((toast) => (
                <div
                    key={toast.id}
                    className={`${getToastStyles(
                        toast.type
                    )} px-4 py-3 rounded-lg shadow-lg flex items-center justify-between gap-4 animate-pulse min-w-max`}
                >
                    <p className="text-sm font-medium">{toast.message}</p>
                    <button
                        onClick={() => toastManager.removeToast(toast.id)}
                        className="text-white hover:opacity-80 transition"
                    >
                        ✕
                    </button>
                </div>
            ))}
        </div>
    )
}
