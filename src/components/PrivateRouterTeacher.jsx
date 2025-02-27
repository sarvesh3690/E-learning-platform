import { Navigate, Outlet } from "react-router-dom";


export function PrivateRouterTeacher(props) {
    const token = JSON.parse(localStorage.getItem("user"));
    if (token.role == "modulecoordinator") {
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