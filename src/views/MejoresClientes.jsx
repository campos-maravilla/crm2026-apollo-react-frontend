import { gql, useQuery } from "@apollo/client";
import { useEffect } from "react";
import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";

const MEJORES_CLIENTES = gql` 
query mejoresClientes{
  mejoresClientes{
    cliente {
      nombre
      empresa
    }
    total
  }
}
`



export default function MejoresClientes() {
    const { data, loading, startPolling, stopPolling } = useQuery(MEJORES_CLIENTES)
    // console.log(data)

    useEffect(() => {
        startPolling(1000)
        return () => {
            stopPolling()
        }
    }, [startPolling, stopPolling])

    if (loading) return 'cargando...'

    // console.log(data.mejoresVendedores)

    const { mejoresClientes } = data

    const clienteGrafica = []

    mejoresClientes.map((cliente, index) => {
        clienteGrafica[index] = {
            ...cliente.cliente[0],
            total: cliente.total
        }
    })

    console.log(clienteGrafica)

    return (
        <div>
            <h1 className='text-2xl text-gray-800 font-light'>Mejores Vendedores</h1>

            <BarChart width={600} height={500} data={clienteGrafica}
                className="mt-10"
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="nombre" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="total" fill="#F5B027" />

            </BarChart>
        </div>
    )
}
