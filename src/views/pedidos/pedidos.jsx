import { gql, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import Pedido from "../../components/Pedido";

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


export default function Pedidos() {
    const { data, loading } = useQuery(OBTENER_PEDIDOS)

    if (loading) return 'Cargando...'
    //  console.log(data)

    const { obtenerPedidosVendedor } = data

    return (
        <div>
            <h2 className="font-light text-2xl text-gray-800  -mt-5">Pedidos</h2>

            <div className='bg-blue-700 py-2 px-5 mt-5 w-50 text-center  rounded text-white text-sm hover:bg-blue-800  mb-2 uppercase font-bold '>
                <Link to="/nuevopedido"

                >
                    Nuevo Pedido
                </Link>
            </div>
            <p className="border-1 w-28 p-1 mt-3 -mb-3">{data.obtenerPedidosVendedor.length} : Registros</p>
            {obtenerPedidosVendedor.length === 0 ? (
                <p className="mt-5 text-center bg-orange-300">No hay pedidos aùn</p>
            ) : (
                obtenerPedidosVendedor.map(pedido => (
                    <Pedido key={pedido.id} pedido={pedido} />
                ))
            )}

        </div>
    )
}
