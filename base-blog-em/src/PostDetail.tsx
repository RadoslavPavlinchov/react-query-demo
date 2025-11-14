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
        <div className="post-detail">
            <h3>{post.title}</h3>
            <div className="mb-4">
                <button
                    className="btn-delete"
                    onClick={() => deleteMutation.mutate(post.id)}
                    disabled={isPending}
                >
                    {isPending ? "Deleting..." : "Delete"}
                </button>
                <button className="btn-update">Update title</button>
            </div>
            <p>{post.body}</p>
            {isPending && (
                <div className="status-pending">Deleting post...</div>
            )}
            {isDeleteError && (
                <div className="status-error">
                    Error deleting post:{" "}
                    {deleteError instanceof Error
                        ? deleteError.message
                        : String(deleteError)}
                </div>
            )}
            {isSuccess && (
                <div className="status-success">Post deleted successfully!</div>
            )}
            <div className="comments-section">
                <h4>Comments</h4>
                {data.map((comment: Comment) => (
                    <li key={comment.id} className="comment-item">
                        <strong>{comment.email}:</strong> {comment.body}
                    </li>
                ))}
            </div>
        </div>
    )
}
