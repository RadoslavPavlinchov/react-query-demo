import { createFileRoute } from "@tanstack/react-router"
import { Posts } from "../Posts"
import { usePrefetchMeetings } from "../components/meetings/hooks/useMeetings"

export const Route = createFileRoute("/")({
    component: Index,
})

function Index() {
    usePrefetchMeetings()

    return <Posts />
}
