/* eslint-disable no-unused-vars */
import { gql, useQuery } from "@apollo/client";
import { useContext, useEffect, useState } from "react"
import Select from 'react-select'
import PedidoContext from "../../contextpedidos/contextPedidos/PedidoContext";

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

export default function AsignarProducto() {

    const [productos, setProductos] = useState([])

    const { data, loading } = useQuery(OBTENER_PRODUCTOS)
    // console.log(data)

    const pedidoContext = useContext(PedidoContext)
    const { agregarProducto } = pedidoContext

    useEffect(() => {
        agregarProducto(productos)
    }, [productos])

    const seleccionarProducto = (producto) => {
        setProductos(producto)
    }


    if (loading) return null
    const { obtenerProductos } = data

    return (
        <>
            <p className="mt-10 my-2 bg-white border-1-4 border-gray-700 p-2 text-sm font-bold">1.- Asignar un producto al pedido</p>
            <Select
                className="mt-3"
                options={obtenerProductos}
                isMulti={true}
                onChange={opcion => seleccionarProducto(opcion)}
                getOptionValue={(opciones) => opciones.id}
                getOptionLabel={(opciones) => `${opciones.nombre} - ${opciones.existencia} Disponibles `}
                placeholder="Busque o Seleccione un Producto"
                noOptionsMessage={() => "No hay resultados"}

            />
        </>
    )
}
