import { useQuery, UseMutationResult } from "@tanstack/react-query"
import { fetchComments } from "./api"
import "./PostDetail.css"
import { Comment } from "./interfaces"

import { Post } from "./interfaces"

interface PostDetailProps {
    post: Post
    deleteMutation: UseMutationResult<any, Error, number, unknown>
}

export function PostDetail({ post, deleteMutation }: PostDetailProps) {
    const {
        data = [],
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["comments", post.id],
        queryFn: () => fetchComments(post.id),
    })

    if (isLoading) return <div>Loading</div>
    if (isError) return <div>Error: {error.message}</div>

    const {
        isPending,
        isError: isDeleteError,
        error: deleteError,
        isSuccess,
    } = deleteMutation

    return (
        <>
            <h3 style={{ color: "blue" }}>{post.title}</h3>
            <button
                onClick={() => deleteMutation.mutate(post.id)}
                disabled={isPending}
            >
                {isPending ? "Deleting..." : "Delete"}
            </button>{" "}
            <button>Update title</button>
            <p>{post.body}</p>
            {isPending && (
                <div style={{ color: "orange" }}>Deleting post...</div>
            )}
            {isDeleteError && (
                <div style={{ color: "red" }}>
                    Error deleting post:{" "}
                    {deleteError instanceof Error
                        ? deleteError.message
                        : String(deleteError)}
                </div>
            )}
            {isSuccess && (
                <div style={{ color: "green" }}>Post deleted successfully!</div>
            )}
            <h4>Comments</h4>
            {data.map((comment: Comment) => (
                <li key={comment.id}>
                    {comment.email}: {comment.body}
                </li>
            ))}
        </>
    )
}
