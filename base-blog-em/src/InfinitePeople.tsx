import { useEffect, useRef } from "react"
import { useInfiniteQuery } from "@tanstack/react-query"
import { Person } from "./Person"
import { fetchPeople } from "./api"
import { PeopleResponse } from "./interfaces"

export function InfinitePeople() {
    const observerTarget = useRef<HTMLDivElement>(null)

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        isError,
        error,
    } = useInfiniteQuery<PeopleResponse>({
        queryKey: ["people"],
        queryFn: ({ pageParam }) => fetchPeople(Number(pageParam)),
        getNextPageParam: (lastPage) => {
            if (!lastPage.next) return undefined

            const url = new URL(lastPage.next)
            return url.searchParams.get("page")
        },
        initialPageParam: 1,
    })

    // Intersection Observer to detect when user scrolls to bottom
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                // If the sentinel element is visible and there are more pages, fetch next page
                if (
                    entries[0].isIntersecting &&
                    hasNextPage &&
                    !isFetchingNextPage
                ) {
                    fetchNextPage()
                }
            },
            {
                // Trigger when element is 100px from bottom of viewport
                rootMargin: "100px",
            }
        )

        const currentTarget = observerTarget.current
        if (currentTarget) {
            observer.observe(currentTarget)
        }

        return () => {
            if (currentTarget) {
                observer.unobserve(currentTarget)
            }
        }
    }, [fetchNextPage, hasNextPage, isFetchingNextPage])

    if (isLoading) {
        return <div className="p-4">Loading...</div>
    }

    if (isError) {
        return <div className="p-4 text-red-600">Error: {error?.message}</div>
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Star Wars Characters</h1>

            <ul className="space-y-2">
                {data?.pages.map((page) =>
                    page.results.map((person) => (
                        <Person
                            key={person.name}
                            name={person.name}
                            hair_color={person.hair_color}
                            eye_color={person.eye_color}
                        />
                    ))
                )}
            </ul>

            {/* Sentinel element for Intersection Observer */}
            <div ref={observerTarget} className="mt-4 p-4 text-center">
                {isFetchingNextPage && <div>Loading more characters...</div>}
                {!hasNextPage && data?.pages && data.pages.length > 0 && (
                    <div className="text-gray-500">
                        No more characters to load
                    </div>
                )}
            </div>
        </div>
    )
}
