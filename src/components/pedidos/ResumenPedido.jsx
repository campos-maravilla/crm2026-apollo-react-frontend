import React, { useContext } from 'react'
import PedidoContext from '../../contextpedidos/contextPedidos/PedidoContext'
import ProductoResumen from './Productoresumen'


export default function ResumenPedido() {
    const pedidoContext = useContext(PedidoContext)
    const { productos } = pedidoContext
    // console.log(productos)

    return (
        <>
            <p className='mt-10 my-2 bg-white border-1-4 border-gray-800 text-gray-700 p-2 text-sm font-bold'>3.-Ajustar las cantidades del producto</p>
            {productos.length > 0 ? (
                <>
                    {/* <p>si hay productos</p> */}
                    {productos.map(producto => (
                        <ProductoResumen key={producto.id} producto={producto} />
                    ))}
                </>
            ) : (
                <p className='mt-5 text-sm'>Aùn no hay productos</p>
            )}
        </>
    )
}
