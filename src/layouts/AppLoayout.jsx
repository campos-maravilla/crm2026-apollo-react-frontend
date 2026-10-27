import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Home from "../views/home";
import Header from "../components/Header";
import Footer from "../components/Footer";


export default function AppLoayout() {
    const location = useLocation();

    // console.log(location.pathname);
    // const isLoginPage = location.pathname === '/login';

    return (
        // Si la ruta es /login, no mostrar el layout 
        location.pathname === '/login' || location.pathname === '/register' ? (
            <div className="bg-gray-800 min-h-screen flex items-center justify-center ">
                <Outlet />
            </div>
        ) : (
            <div className="bg-gray-200 min-h-screen ">

                <Header />

                <div className="sm:flex min-h-screen " >
                    <Sidebar />

                    <main className="sm:w-2/3 xl:w-5/5 p-5 ml-10 sm:min-h-screen flex-1 sm:overflow-hidden">

                        <Outlet />

                        <hr className='mt-10 overflow-hidden -ml-15 -mr-4' />
                        <Footer />
                    </main>
                </div>
            </div>
        )
    )
}
