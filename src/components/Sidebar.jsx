
import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth';


export default function Sidebar() {
    const { mostrar } = useAuth();


    return (

        <aside className={`${mostrar ? "active" : "w-50"} bg-gray-800 sm:w-1/3 xl:w-1/5 p-4 sm:min-h-screen -mt-35 w-0 overflow-hidden  `} >
            <div className='flex  '>
                <img src="/logo-academia.png" alt="logo personal"
                    width={50} height={40} className=" mb-10 rounded-2xl mr-4"
                />
                <Link to={"/"} >

                    <p className='text-white text-xl font-black -ml-3 mt-3 text-nowrap'>CRM Clientes</p>
                </Link>
                {/*                 <div className=' sm:hidden @min-xs:hidden md:block  lg:block'>
                    <i
                        className="fa-solid fa-bars cursor-pointer  ml-9 text-white -mt-3 hover:text-gray-300 text-2xl "
                        onClick={handleMostrar} title="Menu desplegable"
                    ></i>

                </div> */}
            </div>

            <nav className='mt-5 list-none flex flex-col gap-7'>

                <NavLink to="/"
                    className={({ isActive }) =>
                        isActive ? 'text-orange-500  font-bold uppercase' : ' text-white font-bold uppercase'
                    } >
                    <i className="fa-solid fa-users-rectangle mr-2"></i>
                    Clientes</NavLink>

                <NavLink to="/pedidos" className={({ isActive }) =>
                    isActive ? 'text-orange-500 font-bold uppercase' : 'text-white font-bold uppercase'
                }>
                    <i className="fa-solid fa-arrow-up-short-wide mr-2"></i>
                    Pedidos</NavLink>

                <NavLink to="/productos" className={({ isActive }) =>
                    isActive ? 'text-orange-500 font-bold uppercase' : 'text-white font-bold uppercase'
                }>
                    <i className="fa-solid fa-cubes-stacked mr-2"></i>
                    Productos</NavLink>


            </nav>

            <hr className='mt-5 text-orange-900' />

            <div className='sm:mt-5 lg:mb-5'>
                <p className='text-white text-xl font-black '>Màs Opciones</p>
            </div>

            <nav className='list-none  flex flex-col gap-2'>
                <NavLink to="/mejoresvendedores" className={({ isActive }) =>
                    isActive ? 'text-orange-500 font-bold uppercase' : 'text-white font-bold uppercase'
                }>
                    <i className="fa-solid fa-arrow-up-from-bracket mr-2"></i>
                    Mejores Vendedores</NavLink>

                <NavLink to="/mejoresclientes" className={({ isActive }) =>
                    isActive ? 'text-orange-500 font-bold uppercase' : 'text-white font-bold uppercase mt-5'
                }>
                    <i className="fa-solid fa-arrow-up-from-bracket mr-2"></i>
                    Mejores Clientes</NavLink>
            </nav>
        </aside >
    )
}
