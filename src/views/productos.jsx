import { gql, useQuery } from "@apollo/client"
import Producto from "../components/Producto"
import { Link } from "react-router-dom"


const OBTENER_PRODUCTOS = gql` 
query obtenerProductos{
  obtenerProductos{
nombre
existencia
precio
id
  }
}
`

export default function Productos() {
    const { data, loading } = useQuery(OBTENER_PRODUCTOS)
    /* 
        console.log(data)
        console.log(loading)
        console.log(error)
     */
    if (loading) return "Cargando..."

    return (
        <div>
            <h2 className="font-light text-2xl text-gray-800 -mt-5">Productos</h2>

            <div className='bg-blue-700 py-2 px-5 mt-5 w-50 text-center  rounded text-white text-sm hover:bg-blue-800  mb-2 uppercase font-bold '>
                <Link to="/nuevoproducto"

                >
                    Nuevo Producto
                </Link>
            </div>
            <p className="border-1 w-28 p-1 mt-3 -mb-3">{data.obtenerProductos.length} : Registros</p>
            <table className='table-auto shadow-md mt-10 w-full '>
                <thead className='bg-gray-800'>
                    <tr className='text-white'>
                        <th className='w-1/5 py-2'>Nombre</th>
                        <th className='w-1/5 py-2'>Existencia</th>
                        <th className='w-1/5 py-2'>Precio</th>
                        <th className='w-1/5 py-2 font-black'>Eliminar</th>
                        <th className='w-1/5 py-2 font-black'>Editar</th>
                    </tr>
                </thead>
                <tbody className='bg-white'>
                    {data.obtenerProductos.map(producto => (
                        <Producto key={producto.id} producto={producto} />
                    ))}
                </tbody>
            </table>
        </div>
    )
}
