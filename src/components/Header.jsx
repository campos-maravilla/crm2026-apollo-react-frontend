import { useQuery, gql } from "@apollo/client"
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";


const OBTENER_USUARIO = gql` 

 query obtenerUsuario{
  obtenerUsuario{
    id
    nombre
    apellido
  }
}
 `;

export default function Header() {
    const navigate = useNavigate();
    const { handleMostrar } = useAuth();

    const { data, loading } = useQuery(OBTENER_USUARIO)
    // console.log(data)
    // console.log(loading)
    // console.log(error)

    useEffect(() => {
        if (!loading && (!data || !data.obtenerUsuario)) {
            navigate('/login');
        }
    }, [loading, data, navigate]);

    if (loading) return <p>Cargando...</p>;

    // Si no hay datos, no renderizar nada (la redirección ya ocurre en useEffect)
    if (!data || !data.obtenerUsuario) {
        return null;
    }

    const { nombre, apellido } = data.obtenerUsuario;

    const cerrarSesion = () => {
        localStorage.removeItem('token');
        navigate('/login');
    }

    return (
        <>

            <div className="sm:flex sm:justify-end  sm:flex-row sm:items-end  mb-5 gap-5 bg-violet-600 h-30 shadow-md shadow-violet-800 p-5 text-white font-bold header-container">
                <div className='  lg:block lg:mr-30  profile'>
                    <i
                        className="fa-solid fa-bars cursor-pointer  ml-9 text-white -mt-3 hover:text-gray-300 text-2xl hamburguer"
                        onClick={handleMostrar} title="Menu desplegable"
                    ></i>

                    <p className="md:mr-4 sm:mr-5  ms:flex justify-end sm:items-end -mt-10 lg:mt-0 md:mt-0 md:flex md:justify-end items-center sm:mt-0">  {nombre} {apellido} </p>
                </div>


                <button className="bg-blue-700 px-5 py-2  text-white rounded-md shadow-md hover:bg-blue-800 hover:cursor-pointer transition-transform hover:scale-105  duration-300 font-bold  btn-cerrarSesion"
                    onClick={() => cerrarSesion()}
                >
                    Cerrar Sesiòn
                </button>
            </div>

        </>
    )
}
