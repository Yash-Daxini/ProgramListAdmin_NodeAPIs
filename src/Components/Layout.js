import { Outlet } from "react-router-dom";
import "../CSS/style.css";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
const Layout = ()=>{
    return(
        <>
            <Sidebar />
            <div class="main">
                <Topbar />
                <Outlet />
            </div>
        </>


    
    )
}

export default Layout;