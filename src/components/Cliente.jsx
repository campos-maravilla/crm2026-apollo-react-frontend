import { gql, useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const ELIMINAR_CLIENTE = gql`
  mutation eliminarCliente($id: ID!) {
    eliminarCliente(id: $id)
  }
`;

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

export default function Cliente({ cliente }) {
  const [eliminarCliente] = useMutation(ELIMINAR_CLIENTE, {
    refetchQueries: [
      {
        query: OBTENER_CLIENTES_USUARIO,
      },
    ],
  });

  const confirmarEliminarCliente = (id) => {
    //  console.log('eliminando', id)
    Swal.fire({
      title: "¿Deseas eliminar a este cliente?",
      text: "Esta acciòn no se puede deshacer!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Eliminar!",
      cancelButtonText: "No,Cancelar!",
    }).then(async (result) => {
      if (result.value) {
        try {
          const { data } = await eliminarCliente({
            variables: {
              id,
            },
          });
          Swal.fire("Elimionado!", data.eliminarCliente, "success");
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  return (
    <tr key={cliente.id} className="text-center">
      <td className="border px-4 py-4">{cliente.nombre} </td>
      <td className="border px-4 py-4">{cliente.apellido} </td>
      <td className="border px-4 py-2">{cliente.empresa}</td>
      <td className="border px-4 py-2">{cliente.email}</td>
      <td className="border px-4 py-2">{cliente.telefono}</td>
      <td className="border px-3 py-2 flex justify-between items-center gap-1">
        <div>
          <button
            type="button"
            className="flex justify-center items-center bg-red-400 py-2 px-4  w-full text-white rounded text-xl font-bold "
            onClick={() => confirmarEliminarCliente(cliente.id)}
          >
            <i className="fa-solid fa-trash mr-2  "></i>
            ELIMINAR
          </button>
        </div>
      </td>
      <td className="border px-4 py-2">
        <div className="bg-orange-400 rounded">
          <Link
            to={`/editar/${cliente.id}`}
            className="flex justify-center items-center py-2 px-4 w-full text-white  text-xs  font-bold"
          >
            <i className="fa-solid fa-pen-to-square mr-1 text-lg"></i>
            EDITAR
          </Link>
        </div>
      </td>
    </tr>
  );
}
