

import AsignarCliente from "../../components/pedidos/AsignarCliente"
import PedidoContext from "../../contextpedidos/contextPedidos/PedidoContext"
import AsignarProducto from "../../components/pedidos/AsignarProducto"
import ResumenPedido from "../../components/pedidos/ResumenPedido"
import Total from "../../components/pedidos/Total"
import { useContext, useState } from "react"
import { gql, useMutation } from "@apollo/client"
import Swal from "sweetalert2"
import { useNavigate } from "react-router-dom"

const NUEVO_PEDIDO = gql` 
mutation nuevoPedido($input:PedidoInput){
  nuevoPedido(input:$input){
     id
  
   }
}
`

//para cuando agregamos un pedido se actualize la interfaz
const OBTENER_PEDIDOS = gql`
query  obtenerPedidosVendedor{
   obtenerPedidosVendedor{
    id
cliente{
      id
        nombre
        apellido
        email
        telefono
}

vendedor
pedido {
  id
  cantidad
nombre
}
total
estado

  }
}
`

export default function NuevoPedido() {

    const [mensaje, setMensaje] = useState(null)

    const navigate = useNavigate()

    const pedidoContext = useContext(PedidoContext)
    const { cliente, productos, total } = pedidoContext
    // console.log(cliente)
    // console.log(productos)


    const [nuevoPedido] = useMutation(NUEVO_PEDIDO,
        {
            refetchQueries: [
                {
                    query: OBTENER_PEDIDOS
                }
            ]
        }
    )

    const validarPedido = () => {
        return !productos.every(producto => producto.cantidad > 0) || total === 0 || cliente.length === 0 ? " opacity-50 cursor-not-allowed " : ""
    }

    const crearNuevoPedido = async () => {

        const { id } = cliente
        // Remover lo no deseado de productos
        const pedido = productos.map(({
            // eslint-disable-next-line no-unused-vars
            __typename,
            // eslint-disable-next-line no-unused-vars
            existencia, ...producto }) => producto)
        console.log(pedido)

        try {
            // eslint-disable-next-line no-unused-vars
            const { data } = await nuevoPedido({
                variables: {
                    input: {
                        cliente: id,
                        total,
                        pedido
                    }
                }
            })
            navigate('/pedidos')
            Swal.fire(
                'Correcto',
                'El pedido se registró correctamente',
                'success'
            )
        } catch (error) {
            // console.log(error)
            setMensaje(error.message)
            setTimeout(() => {
                setMensaje(null)
            }, 3000);
        }
    }

    const mostrarMensaje = () => {
        return (
            <div className="bg-orange-300 py-2 px-3 w-full my-3 max-w-sm text-center text-black mx-auto">
                <p>{mensaje}</p>
            </div>
        )
    }


    return (
        <>

            <h1 className='text-2xl text-gray-800 font-light'>Crear Nuevo Pedido</h1>
            {mensaje && mostrarMensaje()}
            <div className="flex justify-center mt-5">
                <div className="w-full max-w-lg">
                    <AsignarCliente />
                    <AsignarProducto />
                    <ResumenPedido />

                    <hr className="mt-5" />
                    <Total />
                    <button
                        type='button'
                        className={`bg-gray-800 w-full mt-5 p-2 text-white 
                        uppercase font-bold hover:bg-gray-900 ${validarPedido()}`}
                        onClick={() => crearNuevoPedido()}
                    >Registrar Pedido</button>
                </div>
            </div>

        </>
    )
}
