import { useIsFetching, useIsMutating } from "@tanstack/react-query"

interface LoadingProps {
    message?: string
}

export default function Loading({ message = "Loading..." }: LoadingProps) {
    const isFetching = useIsFetching() // returns a number of fetching calls happening at this moment
    const isMutating = useIsMutating()

    if (!isFetching || !isMutating) return null

    return (
        <div className="fixed top-0 left-0 right-0 flex flex-col justify-center items-center z-40 pointer-events-none py-4">
            <div className="flex flex-col justify-center items-center gap-4">
                <div className="flex gap-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce delay-200"></div>
                </div>
                <p className="text-lg text-gray-700 font-semibold">{message}</p>
            </div>
        </div>
    )
}
