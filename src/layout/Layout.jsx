
import { Outlet, Link, useLocation } from "react-router-dom"; {/* Se asegura de colocar lo proveniente de otras. (así se mantienen componentes en pantalla)
rutas en el outlet. */}

const Layout = () => {

    const location = useLocation();
    const currentUrl = location.pathname;


    return (
        <div className="md:flex md:min-h-screen">
            <div className="md:w-1/4 bg-blue-900 px-5 py-10">
                <h1 className="text-4xl font-black text-center text-white">CRM - Clients </h1>
                <nav className="mt-10">
                    <Link to="/clients"
                        className={`${currentUrl==='/clients' ? 'text-blue-300': 'text-white'} 
                        text-white text-2xl block mt-2 hover:text-blue-300`}
                    >Clients</Link>
                    <Link to="/clients/new"
                        className={`${currentUrl==='/clients/new' ? 'text-blue-300': 'text-white'} 
                        text-white text-2xl block mt-2 hover:text-blue-300`}
                    >New Clients</Link>   
                </nav>
            </div> 
            <div className="md:w-3/4 p-10 md:h-screen overflow-scroll">
                <Outlet/>     
            </div> 
            
        </div>
    )
}

export default Layout
