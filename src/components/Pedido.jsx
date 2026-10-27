/* eslint-disable no-undef */
import { gql, useMutation } from "@apollo/client"
import { useEffect, useState } from "react"
import Swal from "sweetalert2"

const ACTUALIZAR_ESTADO = gql`
mutation actualizarPedido($id:ID!,$input:PedidoInput){
  actualizarPedido(id:$id,input:$input){
     id
 
  estado
   }
}
`

const ELIMINAR_PEDIDO = gql` 
mutation eliminarPedido($id:ID!){
  eliminarPedido(id:$id)
  
}
`

const OBTENER_PEDIDOS = gql`
query  obtenerPedidosVendedor{
   obtenerPedidosVendedor{
id
}
}
`


export default function Pedido({ pedido }) {
    const { id, total, estado, cliente: { nombre, telefono, apellido, email }, cliente
    } = pedido

    const [actualizarPedido] = useMutation(ACTUALIZAR_ESTADO)
    const [eliminarPedido] = useMutation(ELIMINAR_PEDIDO, {
        refetchQueries: [
            {
                query: OBTENER_PEDIDOS
            }
        ]
    })


    const [estadoPedido, setEstadoPedido] = useState(estado)

    // mostrando el color de un pedido de acuerdo a su estado 
    const [clase, setClase] = useState('')

    useEffect(() => {
        if (estadoPedido) {
            setEstadoPedido(estadoPedido)
        }
        clasePedido()
    }, [estadoPedido])

    const clasePedido = () => {
        if (estadoPedido === 'PENDIENTE') {
            setClase('border-pink-600')
        } else if (estadoPedido === 'COMPLETADO') {
            setClase('border-green-600')
        } else {
            setClase('border-gray-400')
        }
    }

    const cambiarEstadoPedido = async (nuevoEstado) => {
        // console.log(nuevoEstado)
        try {
            const { data } = await actualizarPedido({
                variables: {
                    id,
                    input: {
                        estado: nuevoEstado,
                        cliente: cliente.id
                    }
                }
            })
            setEstadoPedido(data.actualizarPedido.estado)
        } catch (error) {
            console.log(error)
        }
    }

    const confirmarEliminarPedido = () => {
        Swal.fire({
            title: "¿Deseas eliminar a este pedido?",
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
                    await eliminarPedido({
                        variables: {
                            id
                        }
                    })
                    Swal.fire(
                        'Eliminado',
                        data.eliminarPedido,
                        'success'
                    )
                } catch (error) {
                    console.log(error)
                }
            }
        });
    }

    return (
        <div className={`${clase} border-t-4 mt-4 bg-white rounded p-6 md:grid md:grid-cols-2 md:gap-4 shadow-lg`}>
            <div>
                <p className="font-bold text-gray-800">Cliente: {nombre}  {apellido}</p>


                {email && (
                    <>

                        <p className="flex items-center my-2">
                            <i className="fa-solid fa-envelope text-xl mr-2"></i>

                            {email}
                        </p>
                    </>
                )}

                {telefono && (
                    <p className="flex items-center my-2">

                        <i className="fa-solid fa-phone mr-2 text-xl"></i>
                        {telefono}
                    </p>
                )}

                <h2 className="text-gray-800 font-bold mt-10">Estado Pedido:</h2>

                <select
                    className="mt-2 focus:outline-none  bg-green-600 border border-blue-600 text-white p-2 text-center rounded leading-tight  uppercase text-xs font-bold"
                    value={estadoPedido}
                    onChange={(e) => cambiarEstadoPedido(e.target.value)}
                >
                    <option value="COMPLETADO">COMPLETADO</option>
                    <option value="PENDIENTE">PENDIENTE</option>
                    <option value="CANCELADO">CANCELADO</option>
                </select>
            </div>

            <div>
                <h2 className="text-gray-800 font-bold mt-2">Resumen del Pedido</h2>
                {pedido.pedido.map(articulo => (
                    <div key={articulo.id} className="mt-4">
                        <p className="text-sm text-gray-600">Producto: {articulo.nombre}</p>
                        <p className="text-sm text-gray-600">Cantidad: {articulo.cantidad}</p>
                    </div>
                ))}
                <p className="text-gray-800 mt-3 font-bold">Total a pagar :
                    <span className="font-light"> $ {total}</span>
                </p>
                <div className="mt-5">
                    <button
                        className="flex items-center  bg-red-800 px-5 py-2  text-white rounded leading-tight uppercase text-sm font-bold"
                        onClick={() => confirmarEliminarPedido()}
                    >
                        <i className="fa-solid fa-trash mr-2"></i>
                        Eliminar Pedido

                    </button>
                </div>
            </div>
        </div>
    )
}
