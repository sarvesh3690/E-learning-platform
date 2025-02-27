import { useLocation } from "react-router-dom";
import SideBar from "./SideBar";
import "../styles/App.css"
import { AppRouter } from "./AppRouter";

export function Layout(props) {
    const location = useLocation();
    const isLoginScreenActive = location.pathname === "/" || "/otpverify" || "/addpassword" || "/passwordverify";
    return (
        <div>
            {
                !isLoginScreenActive && <div className="app"><SideBar />
                   
                </div>
            }
             {props.children}

        </div>
    )
}