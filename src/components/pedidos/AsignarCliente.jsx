/* eslint-disable no-unused-vars */
import { gql, useQuery } from "@apollo/client";
import { useContext, useEffect, useState } from "react"
import Select from 'react-select'
import PedidoContext from "../../contextpedidos/contextPedidos/PedidoContext";

const OBTENER_CLIENTES_USUARIO = gql`
  query obtenerClientesVendedor {
  obtenerClientesVendedor{
    id
nombre
apellido
empresa
email
telefono
  }
  }
`;

export default function AsignarCliente() {

    const [cliente, setCliente] = useState([])

    const { data, loading } = useQuery(OBTENER_CLIENTES_USUARIO)
    // console.log(data)

    const pedidoContext = useContext(PedidoContext)
    const { agregarCliente } = pedidoContext

    useEffect(() => {
        // console.log(cliente)
        agregarCliente(cliente)
    }, [cliente])

    const seleccionarCliente = (clientes) => {
        agregarCliente(clientes)
    }


    if (loading) return null
    const { obtenerClientesVendedor } = data

    return (
        <>
            <p className="mt-10 my-2 bg-white border-1-4 border-gray-700 p-2 text-sm font-bold">1.- Asignar un cliente al pedido</p>
            <Select
                className="mt-3"
                options={obtenerClientesVendedor}
                //  isMulti={true}
                onChange={opcion => seleccionarCliente(opcion)}
                getOptionValue={(opciones) => opciones.id}
                getOptionLabel={(opciones) => opciones.nombre}
                placeholder="Busque o Seleccione un Cliente"
                noOptionsMessage={() => "No hay resultados"}

            />
        </>
    )
}
