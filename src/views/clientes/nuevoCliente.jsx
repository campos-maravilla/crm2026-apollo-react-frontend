import { useFormik } from "formik";
import * as yup from "yup";
import { useMutation, gql } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Swal from "sweetalert2";

const NUEVO_CLIENTE = gql`
  mutation nuevoCliente($input: ClienteInput) {
    nuevoCliente(input: $input) {
      apellido
      nombre
      empresa
      email
      telefono
    }
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

export default function NuevoCliente() {
  const [mensaje, setMensaje] = useState(null);
  const navigate = useNavigate();

  const [nuevoCliente] = useMutation(NUEVO_CLIENTE, {
    refetchQueries: [
      {
        query: OBTENER_CLIENTES_USUARIO,
      },
    ],
  });

  const formik = useFormik({
    initialValues: {
      nombre: "",
      apellido: "",
      empresa: "",
      email: "",
      telefono: "",
    },
    validationSchema: yup.object({
      nombre: yup.string().required("El nombre del cliente es obligatorio"),
      apellido: yup.string().required("El apellido del cliente es obligatorio"),
      empresa: yup.string().required("El campos empresa es obligatorio"),
      email: yup
        .string()
        .email("Email no válido")
        .required("El email del cliente es obligatorio"),
      telefono: yup.string().required("El nùmero del telefono es obligatorio"),
    }),
    onSubmit: async (valores) => {
      //console.log(valores)
      const { nombre, apellido, empresa, email, telefono } = valores;

      try {
        // eslint-disable-next-line no-unused-vars
        const { data } = await nuevoCliente({
          variables: {
            input: {
              nombre,
              apellido,
              empresa,
              email,
              telefono,
            },
          },
        });
        // console.log(data.nuevoCliente)
        Swal.fire("Creado", "Cliente creado correctamente", "success");
        navigate("/");
      } catch (error) {
        // console.log(error)
        setMensaje(error.message.replace("GraphQL,error: ", ""));
      }
      setTimeout(() => {
        setMensaje(null);
      }, 3000);
    },
  });

  const mostrarMensaje = () => {
    return (
      <div className="bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto">
        {mensaje}
      </div>
    );
  };

  return (
    <>
      <div className="-mt-5">
        {mensaje && mostrarMensaje()}
        <div className="sm:flex sm:justify-start sm:items-start lg:flex lg:justify-center items-center mt-5">
          <div className="w-full max-w-lg">
            <form
              onSubmit={formik.handleSubmit}
              className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
            >
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="nombre"
                >
                  Nombre
                </label>
                <input
                  type="text"
                  id="nombre"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Nombre Usuario"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.nombre}
                />
              </div>

              {formik.touched.nombre && formik.errors.nombre ? (
                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                  <p className="font-bold">{formik.errors.nombre}</p>
                </div>
              ) : null}
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="apellido"
                >
                  Apellido
                </label>
                <input
                  type="text"
                  id="apellido"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Apellido Usuario"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.apellido}
                />
              </div>

              {formik.touched.apellido && formik.errors.apellido ? (
                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                  <p className="font-bold">{formik.errors.apellido}</p>
                </div>
              ) : null}
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="empresa"
                >
                  Empresa
                </label>
                <input
                  type="text"
                  id="empresa"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Empresa Cliente"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.empresa}
                />
              </div>

              {formik.touched.empresa && formik.errors.empresa ? (
                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                  <p className="font-bold">{formik.errors.empresa}</p>
                </div>
              ) : null}
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Email CLiente"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
              </div>

              {formik.touched.email && formik.errors.email ? (
                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                  <p className="font-bold">{formik.errors.email}</p>
                </div>
              ) : null}
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="telefono"
                >
                  Telefono
                </label>
                <input
                  type="text"
                  id="telefono"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Telefono cliente"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.telefono}
                />
              </div>

              {formik.touched.telefono && formik.errors.telefono ? (
                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                  <p className="font-bold">{formik.errors.telefono}</p>
                </div>
              ) : null}
              <input
                type="submit"
                className="bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900"
                value="Registrar Cliente"
              />
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
