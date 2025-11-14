import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { useCallback } from "react"
import axiosInstance from "../../../api/axiosInstance"
import { Meeting } from "../../../interfaces"
import { queryKeys } from "../../../react-query/queryKeys"

// Fetch all meetings
const fetchMeetings = async (): Promise<Meeting[]> => {
    const response = await axiosInstance.get("/meetings")
    return response.data
}

// Create a new meeting
const createMeeting = async (meeting: Omit<Meeting, "id" | "createdAt">) => {
    const response = await axiosInstance.post("/meetings", meeting)
    return response.data
}

// // Update an existing meeting
// const updateMeeting = async ({ id, ...data }: Meeting & { id: string }) => {
//     const response = await axiosInstance.put(`/meetings/${id}`, data)
//     return response.data
// }

// // Delete a meeting
// const deleteMeeting = async (id: string) => {
//     const response = await axiosInstance.delete(`/meetings/${id}`)
//     return response.data
// }

export const usePrefetchMeetings = () => {
    const queryClient = useQueryClient()
    queryClient.prefetchQuery({
        queryKey: [queryKeys.meetings],
        queryFn: fetchMeetings,
    })
}

// Hook to fetch all meetings with filtering
export const useMeetings = (selectedTypes?: string[]) => {
    const selectFn = useCallback(
        (data: Meeting[]) => {
            if (!selectedTypes || selectedTypes.length === 0) {
                return data
            }

            return data.filter((meeting) =>
                selectedTypes.includes(meeting.type)
            )
        },
        [selectedTypes]
    )

    return useQuery({
        queryKey: [queryKeys.meetings, selectedTypes],
        queryFn: fetchMeetings,
        select: selectFn,
        enabled: !!selectedTypes, // don't fetch if we haven't selected anything yet
        staleTime: 0, // 0 minutes - overwrite the globals
        gcTime: 1000 * 60 * 5, // 5 minutes - overwrite the globals
        refetchOnWindowFocus: true, // overwrite the globals
        refetchInterval: 1000 * 60 * 1, // every minute!
    })
}

// Hook to create a new meeting
export const useCreateMeeting = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: createMeeting,
        onSuccess: () => {
            // if mutationFn returns data we can get it from onSuccess and update our cache directly 

            // Invalidate will trigger refetch, it does partial match, so every query that has at least this key is invalidated
            queryClient.invalidateQueries({ queryKey: [queryKeys.meetings] })

            // This onSuccess will be called first
        },
    })
}

// // Hook to update a meeting
// export const useUpdateMeeting = () => {
//     const queryClient = useQueryClient()

//     return useMutation({
//         mutationFn: updateMeeting,
//         onSuccess: () => {
//             // Invalidate and refetch
//             queryClient.invalidateQueries({ queryKey: MEETINGS_QUERY_KEY })
//         },
//     })
// }

// // Hook to delete a meeting
// export const useDeleteMeeting = () => {
//     const queryClient = useQueryClient()

//     return useMutation({
//         mutationFn: deleteMeeting,
//         onSuccess: () => {
//             // Invalidate and refetch
//             queryClient.invalidateQueries({ queryKey: MEETINGS_QUERY_KEY })
//         },
//     })
// }
