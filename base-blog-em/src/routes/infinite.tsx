import { createFileRoute } from "@tanstack/react-router"
import { InfinitePeople } from "../InfinitePeople"

export const Route = createFileRoute("/infinite")({
    component: RouteComponent,
})

function RouteComponent() {
    return <InfinitePeople />
}
 