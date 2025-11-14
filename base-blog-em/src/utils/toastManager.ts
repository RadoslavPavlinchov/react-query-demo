// Simple singleton to manage toasts outside React components
interface Toast {
    id: string
    message: string
    type: "error" | "success" | "info" | "warning"
}

class ToastManager {
    private listeners: ((toasts: Toast[]) => void)[] = []
    private toasts: Toast[] = []

    subscribe(listener: (toasts: Toast[]) => void) {
        this.listeners.push(listener)
        return () => {
            this.listeners = this.listeners.filter((l) => l !== listener)
        }
    }

    addToast(message: string, type: Toast["type"] = "info") {
        const id = Date.now().toString()
        this.toasts = [...this.toasts, { id, message, type }]
        this.notifyListeners()

        // Auto remove after 3 seconds
        setTimeout(() => {
            this.removeToast(id)
        }, 3000)
    }

    removeToast(id: string) {
        this.toasts = this.toasts.filter((toast) => toast.id !== id)
        this.notifyListeners()
    }

    private notifyListeners() {
        this.listeners.forEach((listener) => listener(this.toasts))
    }

    getToasts() {
        return this.toasts
    }
}

export const toastManager = new ToastManager()
