import { Navigate, Outlet } from "react-router-dom";


export function PrivateRouter(props) {
    const token = JSON.parse(localStorage.getItem("user"));
    if (token.role == "student") {
        return (
            <>
                <Outlet />
            </>
        )
    }
    else {
        return (
            <Navigate to="/"></Navigate>
        )
    }
}