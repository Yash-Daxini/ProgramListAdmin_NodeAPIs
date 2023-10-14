import { Outlet } from "react-router-dom";
import "../CSS/style.css";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
const Layout = ()=>{
    return(
        <>
            <Sidebar />
            <div class="main ligthTheme">
                <Topbar />
                <Outlet />
            </div>
        </>


    
    )
}

export default Layout;