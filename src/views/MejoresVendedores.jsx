import { gql, useQuery } from "@apollo/client";
import { useEffect } from "react";
import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

/* const data = [
    {
        name: 'Page A',
        uv: 4000,
        pv: 2400,
        amt: 2400,
    },
    {
        name: 'Page B',
        uv: 3000,
        pv: 1398,
        amt: 2210,
    },
    {
        name: 'Page C',
        uv: 2000,
        pv: 9800,
        amt: 2290,
    },
    {
        name: 'Page D',
        uv: 2780,
        pv: 3908,
        amt: 2000,
    },
    {
        name: 'Page E',
        uv: 1890,
        pv: 4800,
        amt: 2181,
    },
    {
        name: 'Page F',
        uv: 2390,
        pv: 3800,
        amt: 2500,
    },
    {
        name: 'Page G',
        uv: 3490,
        pv: 4300,
        amt: 2100,
    },
]; */


const MEJORES_VENDEDORES = gql` 
query mejoresVendedores{
  mejoresVendedores{
    vendedor {
      nombre
      email
    } 
    total
  }
}
`
export default function MejoresVendedores() {
    const { data, loading, startPolling, stopPolling } = useQuery(MEJORES_VENDEDORES)
    // console.log(data)

    useEffect(() => {
        startPolling(1000)
        return () => {
            stopPolling()
        }
    }, [startPolling, stopPolling])

    if (loading) return 'cargando...'

    // console.log(data.mejoresVendedores)

    const { mejoresVendedores } = data

    const vendedorGrafica = []

    mejoresVendedores.map((vendedor, index) => {
        vendedorGrafica[index] = {
            ...vendedor.vendedor[0],
            total: vendedor.total
        }
    })

    //  console.log(vendedorGrafica)

    return (
        <div>
            <h1 className='text-2xl text-gray-800 font-light'>Mejores Vendedores</h1>
            <ResponsiveContainer
                width={'80%'}
                height={450}
            >
                <BarChart width={600} height={500} data={vendedorGrafica}
                    className="mt-10"
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="nombre" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="total" fill="#F5B027" />

                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}
