import { useContext, useEffect, useState } from "react"
import PedidoContext from "../../contextpedidos/contextPedidos/PedidoContext"

export default function ProductoResumen({ producto }) {

    const pedidoContext = useContext(PedidoContext)
    const { cantidadProductos, actualizarTotal } = pedidoContext

    const { nombre, precio } = producto
    const [cantidad, setCantidad] = useState(0)

    useEffect(() => {
        actualizarCantidad()
        actualizarTotal()
    }, [cantidad])

    const actualizarCantidad = () => {
        const nuevoProducto = { ...producto, cantidad: Number(cantidad) }
        //setCantidad(nuevoProducto)
        //  console.log(nuevoProducto)
        cantidadProductos(nuevoProducto)
    }

    return (

        <div className='md:flex md:justify-between md:items-center mt-5'>
            <div className='md:2/4 mb-2 md:mb-0 mr-5'>
                <p className='text-sm w-10 text-nowrap mr-25'>{nombre}</p>
                <p className="">$ {precio}</p>
            </div>
            <input type="number"
                placeholder='Cantidad'
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline md:ml-4'
                onChange={(e) => setCantidad(e.target.value)}
                value={cantidad}
            />
        </div>

    )
}