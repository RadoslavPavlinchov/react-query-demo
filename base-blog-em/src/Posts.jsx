import { useQuery } from "@tanstack/react-query"
import { useState } from "react"

import { fetchPosts, deletePost, updatePost } from "./api"
import { PostDetail } from "./PostDetail"
const maxPostPage = 10

export function Posts() {
    const [currentPage, setCurrentPage] = useState(0)
    const [selectedPost, setSelectedPost] = useState(null)

    // fetch posts with useQuery
    const {
        data = [], // default to empty array, so we don't run into undefined issues
        isLoading, // No cached data + isFetching
        // isFetching, // async query has not resolved yet
        isError,
        error,
    } = useQuery({
        queryKey: ["posts", currentPage],
        queryFn: () => fetchPosts(currentPage + 1),
        staleTime: 2000, // data is fresh for 2 seconds
    })

    if (isLoading) return <div>Loading...</div>
    if (isError) return <div>Error: {error.message}</div>

    return (
        <>
            <ul>
                {data.map((post) => (
                    <li
                        key={post.id}
                        className="post-title"
                        onClick={() => setSelectedPost(post)}
                    >
                        {post.title}
                    </li>
                ))}
            </ul>
            <div className="pages">
                <button disabled onClick={() => {}}>
                    Previous page
                </button>
                <span>Page {currentPage + 1}</span>
                <button disabled onClick={() => {}}>
                    Next page
                </button>
            </div>
            <hr />
            {selectedPost && <PostDetail post={selectedPost} />}
        </>
    )
}
