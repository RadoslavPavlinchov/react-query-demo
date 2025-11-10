import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query"
import { useState, useEffect } from "react"

import { fetchPosts, deletePost, updatePost } from "./api"
import { PostDetail } from "./PostDetail"
import { Post } from "./interfaces"
const maxPostPage = 10

export function Posts() {
    const [currentPage, setCurrentPage] = useState(1)
    const [selectedPost, setSelectedPost] = useState<Post | null>(null)

    const queryClient = useQueryClient()

    // useMutation for deleting a post
    const deleteMutation = useMutation<any, Error, number>({
        mutationFn: (postId) => deletePost(postId),
        onSuccess: () => {
            // Invalidate and refetch posts after deletion
            // queryClient.invalidateQueries({ queryKey: ["posts"] })
        },
    })

    // Prefetching
    useEffect(() => {
        // Add check if we are on last page and there is nothing to prefetch
        const nextPage = currentPage + 1
        queryClient.prefetchQuery({
            queryKey: ["posts", nextPage],
            queryFn: () => fetchPosts(nextPage),
        })
    }, [currentPage, queryClient])

    // fetch posts with useQuery
    const {
        data = [], // default to empty array, so we don't run into undefined issues
        // isFetching, // async query has not resolved yet
        isLoading, // No cached data + isFetching
        isError,
        error,
    } = useQuery({
        queryKey: ["posts", currentPage],
        queryFn: () => fetchPosts(currentPage),
        staleTime: 2000, // data is fresh for 2 seconds
    })

    if (isLoading) return <div>Loading...</div>
    if (isError) return <div>Error: {error.message}</div>

    return (
        <>
            <ul>
                {data.map((post: Post) => (
                    <li
                        key={post.id}
                        className="post-title"
                        onClick={() => {
                            deleteMutation.reset() // important to call this reset, so the mutation resets all statuses (isSuccess and etc)
                            setSelectedPost(post)
                        }}
                    >
                        {post.title}
                    </li>
                ))}
            </ul>
            <div className="pages">
                <button
                    disabled={currentPage <= 1}
                    onClick={() => {
                        setCurrentPage((prevVal) => prevVal - 1)
                    }}
                >
                    Previous page
                </button>
                <span>Page {currentPage}</span>
                <button
                    disabled={data.length < maxPostPage}
                    onClick={() => {
                        setCurrentPage((prevVal) => prevVal + 1)
                    }}
                >
                    Next page
                </button>
            </div>
            <hr />
            {selectedPost && (
                <PostDetail
                    post={selectedPost}
                    deleteMutation={deleteMutation}
                />
            )}
        </>
    )
}
