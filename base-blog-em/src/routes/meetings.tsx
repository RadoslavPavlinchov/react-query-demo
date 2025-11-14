import { createFileRoute } from "@tanstack/react-router"
import { Meetings } from "../components/meetings/Meetings"

export const Route = createFileRoute("/meetings")({
    component: RouteComponent,
})

function RouteComponent() {
    return <Meetings />
}
