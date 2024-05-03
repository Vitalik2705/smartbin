import {Outlet} from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";


const Layout = () => {
    return (
        <>
            <Header/>
            <div style={{minHeight: '67vh'}}>
            <Outlet/>
            </div>
            <Footer/>
        </>
    );
};

export default Layout;