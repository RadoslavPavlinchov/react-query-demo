import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query"
import { toastManager } from "../utils/toastManager"

const errorHandler = (error: any) => {
    const errorMessage =
        error?.response?.data?.error ||
        error?.message ||
        "An unexpected error occurred"
    console.error("Error:", errorMessage)
    toastManager.addToast(errorMessage, "error")
}

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 5, // 5 minutes
            gcTime: 1000 * 60 * 10, // 10 minutes
            refetchOnWindowFocus: false,
            // refetchOnMount: false,
            // refetchOnReconnect: false,
            // retry: 1,
        },
    },
    queryCache: new QueryCache({
        onError: errorHandler,
    }),
    mutationCache: new MutationCache({
        onError: errorHandler,
    }),
})
