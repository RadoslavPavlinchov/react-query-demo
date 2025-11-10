import { createFileRoute } from "@tanstack/react-router"
import { Posts } from "../Posts"

export const Route = createFileRoute("/")({
    component: Index,
})

function Index() {
    return (
        <div className="p-2">
            <h1>React Query Demo</h1>
            <Posts />
        </div>
    )
}
