import { gql, useMutation } from '@apollo/client';
import React from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2';

const ELIMINAR_PRODUCTO = gql`
mutation eliminarProducto($id:ID!){
  eliminarProducto(id:$id)
}
`

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

export default function Producto({ producto }) {
    const { nombre, existencia, precio } = producto

    const [eliminarProducto] = useMutation(ELIMINAR_PRODUCTO, {
        refetchQueries: [
            {
                query: OBTENER_PRODUCTOS
            }
        ]
    })

    const confirmarEliminarCliente = (id) => {
        //  console.log('eliminando', id)
        Swal.fire({
            title: "¿Deseas eliminar a este cliente?",
            text: "Esta acciòn no se puede deshacer!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Eliminar!",
            cancelButtonText: 'No,Cancelar!'
        }).then(async (result) => {
            if (result.value) {
                try {
                    const { data } = await eliminarProducto({
                        variables: {
                            id
                        }
                    })
                    Swal.fire(
                        "Elimionado!",
                        data.eliminarCliente,
                        "success"
                    )
                } catch (error) {
                    console.log(error)
                }
            }
        });
    }


    return (
        <tr key={producto.id}>
            <td className='border px-4 py-2'>{nombre}</td>
            <td className='border px-4 py-2'>{existencia}</td>
            <td className='border px-4 py-2'>{precio}</td>
            <td className='border px-3 py-2 flex justify-between items-center gap-1'>
                <div >

                    <button
                        type="button"
                        className="flex justify-center items-center bg-red-400 py-2 px-4  w-full text-white rounded text-xl font-bold "
                        onClick={() => confirmarEliminarCliente(producto.id)}
                    >
                        <i className="fa-solid fa-trash mr-2  "></i>
                        ELIMINAR
                    </button>
                </div>
            </td>
            <td className="border px-4 py-2">
                <div className="bg-orange-400 rounded">

                    <Link
                        to={`/editarPro/${producto.id}`}
                        className="flex justify-center items-center py-2 px-4 w-full text-white  text-xs  font-bold"
                    >
                        <i className="fa-solid fa-pen-to-square mr-1 text-lg"></i>
                        EDITAR
                    </Link>
                </div>
            </td>

        </tr>
    )
}
