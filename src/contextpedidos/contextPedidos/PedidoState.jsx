import { useReducer } from "react"
import PedidoReducer from "./PedidoReducer"
import PedidoContext from "./PedidoContext"
import { ACTUALIZAR_TOTAL, CANTIDAD_PRODUCTOS, SELECCIONAR_CLIENTE, SELECCIONAR_PRODUCTO } from "../types"

const PedidoState = ({ children }) => {

    const initialState = {
        cliente: {},
        productos: [],
        total: 0
    }

    const [state, dispatch] = useReducer(PedidoReducer, initialState)

    const agregarCliente = (cliente) => {
        dispatch({
            type: SELECCIONAR_CLIENTE,
            payload: cliente// lo que se mostro en la consola(nombre,apellido,etc)
        })
        // console.log(cliente)
    }

    // modifica los productos
    const agregarProducto = (productosSeleccionados) => {
        //console.log(productos) 
        let nuevoState

        if (state.productos.length > 0) {
            // Tomar del segundo arreglo,una copia para asignarlo al primero
            nuevoState = productosSeleccionados.map(producto => {
                const nuevoObjeto = state.productos.find(productoState => productoState.id === producto.id)
                return { ...producto, ...nuevoObjeto }
            })
        } else {
            nuevoState = productosSeleccionados
        }

        dispatch({
            type: SELECCIONAR_PRODUCTO,
            payload: nuevoState
        })
    }
    // Modifica las cantidades de los productos 

    const cantidadProductos = (nuevoProducto) => {
        //nuevoProducto puede ser cantidadProducto
        //console.log(nuevoProducto)
        dispatch({
            type: CANTIDAD_PRODUCTOS,
            payload: nuevoProducto
        })
    }


    const actualizarTotal = () => {
        dispatch({
            type: ACTUALIZAR_TOTAL
        })
    }
    return (
        <PedidoContext.Provider
            value={{
                agregarCliente, agregarProducto, productos: state.productos,
                cantidadProductos, actualizarTotal, total: state.total,
                cliente: state.cliente
            }}
        >
            {children}
        </PedidoContext.Provider>
    )
}

export { PedidoState }
export default PedidoContext