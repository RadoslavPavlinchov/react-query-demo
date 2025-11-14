import { createRootRoute, Link, Outlet } from "@tanstack/react-router"
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools"
import { QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { queryClient } from "../react-query/queryClient"
import Loading from "../components/shared/Loading"
import { ToastContainer } from "../components/shared/ToastContainer"

const RootLayout = () => (
    <QueryClientProvider client={queryClient}>
        <Loading message="Fetching data..." />
        <ToastContainer />
        <div className="p-4 flex gap-2">
            <Link to="/" className="[&.active]:font-bold">
                Home
            </Link>{" "}
            <Link to="/infinite" className="[&.active]:font-bold">
                Infinite
            </Link>
            <Link to="/meetings" className="[&.active]:font-bold">
                Meetings
            </Link>
        </div>

        <hr />
        <Outlet />
        <TanStackRouterDevtools />
        <ReactQueryDevtools />
    </QueryClientProvider>
)

export const Route = createRootRoute({ component: RootLayout })
