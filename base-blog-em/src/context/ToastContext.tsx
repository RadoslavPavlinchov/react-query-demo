import { useState, useCallback, createContext, useContext } from "react"

interface Toast {
    id: string
    message: string
    type: "error" | "success" | "info" | "warning"
}

interface ToastContextType {
    toasts: Toast[]
    addToast: (message: string, type?: Toast["type"]) => void
    removeToast: (id: string) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function ToastProvider({ children }: { children: React.ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([])

    const addToast = useCallback(
        (message: string, type: Toast["type"] = "info") => {
            const id = Date.now().toString()
            setToasts((prev) => [...prev, { id, message, type }])

            // Auto remove after 4 seconds
            setTimeout(() => {
                removeToast(id)
            }, 4000)
        },
        []
    )

    const removeToast = useCallback((id: string) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id))
    }, [])

    return (
        <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
            {children}
        </ToastContext.Provider>
    )
}

export function useToast() {
    const context = useContext(ToastContext)
    if (!context) {
        throw new Error("useToast must be used within ToastProvider")
    }
    return context
}
