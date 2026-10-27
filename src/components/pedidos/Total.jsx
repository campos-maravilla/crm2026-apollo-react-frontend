import { useContext } from "react"
import PedidoContext from "../../contextpedidos/contextPedidos/PedidoContext"

export default function Total() {
    //const total = 200
    const peididoContext = useContext(PedidoContext)
    const { total } = peididoContext
    return (
        <div className='flex items-center mt-10 justify-between bg-white p-3 '>
            <h2 className='text-gray-800 text-lg'>Total a pagar:</h2>
            <p className='text-gray-800 mt-0'>$ {total}</p>
        </div>
    )
}