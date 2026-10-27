import { gql, useMutation, useQuery } from "@apollo/client";
import { ErrorMessage, Form, Formik, Field } from "formik";
import * as yup from 'yup';
import { useNavigate, useParams } from "react-router-dom"
import Swal from "sweetalert2";

const OBTENER_CLIENTE = gql`
query obtenerCliente($id:ID!){
  obtenerCliente(id:$id){
nombre
apellido
email
empresa
telefono

  }
}
`

const ACTUALIZAR_CLIENTE = gql`
mutation actualizarCliente($id: ID!, $input: ClienteInput) {
  actualizarCliente(id: $id, input: $input) {
    
    nombre
apellido
empresa
  telefono
  }
  }
`

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



export default function EditarCliente() {
    const navigate = useNavigate()
    const { id } = useParams()
    //console.log(params)

    console.log(id);

    const { data, loading } = useQuery(OBTENER_CLIENTE, {
        variables: { id },
        skip: !id,
    })

    // actualizar cliente 

    const [actualizarCliente] = useMutation(ACTUALIZAR_CLIENTE, {
        refetchQueries: [
            {
                query: OBTENER_CLIENTES_USUARIO
            }
        ]
    });



    const validationSchema = yup.object({
        nombre: yup.string()
            .required('El nombre del cliente es obligatorio'),
        apellido: yup.string()
            .required('El apellido del cliente es obligatorio'),
        empresa: yup.string()
            .required('El campos empresa es obligatorio'),
        email: yup.string()
            .email('Email no válido')
            .required('El email del cliente es obligatorio'),
        telefono: yup.string().matches(/^[0-9]+$/, "Sólo números")
    })

    if (loading) return 'Cargando...'

    const cliente = data?.obtenerCliente



    return (
        <>
            <h2 className='font-light text-2xl text-gray-800 -mt-5 '>Editar cliente</h2>

            <div className="flex justify-center mt-5">
                <div className="w-full max-w-lg">
                    <Formik
                        validationSchema={validationSchema}
                        initialValues={{
                            nombre: cliente.nombre,
                            apellido: cliente.apellido,
                            empresa: cliente.empresa,
                            email: cliente.email,
                            telefono: cliente.telefono,
                        }}
                        enableReinitialize

                        onSubmit={async (valores) => {
                            try {
                                await actualizarCliente({
                                    variables: {
                                        id,
                                        input: valores,
                                    },
                                });
                                Swal.fire(
                                    "Actualizado!",
                                    'El cliente se actualizo correctamente',
                                    "success"
                                );
                                navigate("/");
                            } catch (err) {
                                console.error("Error al actualizar:", err);
                            }
                        }}
                    >

                        {() => (

                            <Form className="bg-white shadow-md px-8 pt-6 pb-8 mb-4">
                                <div>


                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">Nombre</label>
                                        <Field name="nombre" placeholder="Nombre" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                                        <ErrorMessage name="nombre" component="div" className="text-red-500 text-sm" />
                                    </div>

                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="apellido">apellido</label>
                                        <Field name="apellido" placeholder="Apellido" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                                        <ErrorMessage name="apellido" component="div" className="text-red-500 text-sm" />
                                    </div>

                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="empresa">Empresa</label>
                                        <Field name="empresa" placeholder="Empresa" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                                        <ErrorMessage name="empresa" component="div" className="text-red-500 text-sm" />
                                    </div>

                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
                                        <Field name="email" type="email" placeholder="Email" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                                        <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                                    </div>

                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="telefono">Telefono</label>
                                        <Field name="telefono" placeholder="Teléfono" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                                        <ErrorMessage name="telefono" component="div" className="text-red-500 text-sm" />
                                    </div>

                                    <button type="submit" className="bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900"
                                        value="Registrar Cliente">
                                        Guardar Cambios
                                    </button>
                                </div>
                            </Form>
                        )}

                    </Formik>
                </div>
            </div>
        </>
    )
}
