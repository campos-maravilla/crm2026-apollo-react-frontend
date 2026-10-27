import { gql, useQuery } from "@apollo/client";
import { Link, useNavigate } from "react-router-dom";
import Cliente from "../components/Cliente";

const OBTENER_CLIENTES_USUARIO = gql`
  query obtenerClientesVendedor {
    obtenerClientesVendedor {
      id
      nombre
      apellido
      empresa
      email
      telefono
    }
  }
`;

export default function Home() {
  const navigate = useNavigate();

  const { data, loading, client } = useQuery(OBTENER_CLIENTES_USUARIO);
  // console.log(data)
  // console.log(loading)
  // console.log(error)

  if (loading) return <p>Cargando...</p>;

  if (!data.obtenerClientesVendedor) {
    client.clearStore();
    navigate("/login");
    return <p>Cargando...</p>;
  }

  return (
    <>
      <h2 className="font-light text-2xl text-gray-800 -mt-5">Clientes</h2>

      <div className="bg-blue-700 py-2 px-5 mt-5 w-40 text-center  rounded text-white text-sm hover:bg-blue-800  mb-2 uppercase font-bold ">
        <Link to="/nuevocliente">Nuevo CLiente</Link>
      </div>
      <p className="border-1 w-28 p-1 mt-3 -mb-3">
        {data.obtenerClientesVendedor.length} : Registros
      </p>

      <div className="overflow-x-scroll">
        <table className="table-auto shadow-md  w-full overflow-hidden mt-5 -ml-4">
          <thead className="bg-gray-800">
            <tr className="text-white">
              <th className="w-1/5 py-2">Nombre</th>
              <th className="w-1/5 py-2">Empresa</th>
              <th className="w-1/5 py-2">Apellido</th>
              <th className="w-1/5 py-2">Email</th>
              <th className="w-1/5 py-2">Telefono</th>
              <th className="w-1/5 py-2 font-black">Eliminar</th>
              <th className="w-1/5 py-2 font-black">Editar</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {data.obtenerClientesVendedor &&
            data.obtenerClientesVendedor.length > 0 ? (
              data.obtenerClientesVendedor.map((cliente) => (
                <Cliente cliente={cliente} key={cliente.id} />
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4">
                  no hay clientes aun
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
