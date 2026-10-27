
import { gql, useMutation, useQuery } from "@apollo/client";
import { ErrorMessage, Form, Formik, Field } from "formik";
import * as yup from 'yup';
import { useNavigate, useParams } from "react-router-dom"
import Swal from "sweetalert2";

const OBTENER_PRODUCTO = gql` 
query obtenerProducto($id:ID!){
  obtenerProducto(id: $id){
nombre
existencia
precio
  }
}
`


/* const OBTENER_PRODUCTOS = gql` 
query obtenerProductos{
  obtenerProductos{
nombre
existencia
precio
  }
}
` */

const ACTUALIZAR_PRODUCTO = gql`
mutation actualizarProducto($id: ID!, $input: ProductoInput) {
  actualizarProducto(id: $id, input: $input) {
     id
    nombre
    existencia
    precio
  }
}
`

export default function EditarProducto() {
    const navigate = useNavigate()
    const { id } = useParams()
    console.log(id)

    const { data, loading } = useQuery(OBTENER_PRODUCTO, {
        variables: { id },
        skip: !id,
    })

    // mutation para modificar el producto 
    const [actualizarProducto] = useMutation(ACTUALIZAR_PRODUCTO)

    const validationSchema = yup.object({
        nombre: yup.string()
            .required('El nombre del producto es obligatorio'),
        precio: yup.number()
            .required('El precio es obligatorio')
            .positive('No se aceptan nùmeros negativos'),
        existencia: yup.number()
            .required('Agregar la cantidad disponible')
            .positive('No se aceptan nùmeros negativos')
            .integer('La existencia deben ser nùmeros enteros'),
    })

    if (loading) return 'Cargando...'

    //const obtenerProducto = data
    const producto = data?.obtenerProducto

    //console.log(data)

    if (!data) {
        return 'Acción no permitida'
    }

    const actualizarInfoProducto = async valores => {
        // console.log(valores)
        const { nombre, precio, existencia } = valores

        try {
            // eslint-disable-next-line no-unused-vars
            const { data } = await actualizarProducto({
                variables: {
                    id,
                    input: {
                        nombre, existencia, precio
                    }
                }
            })
            //   console.log(data)

            Swal.fire(
                'Correcto',
                'El producto se actualizó correctamente',
                'success'
            )
            navigate('/productos')
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <h2 className='font-light text-2xl text-gray-800 -mt-5 '>Editar producto</h2>

            <div className="flex justify-center mt-5">
                <div className="w-full max-w-lg">
                    <Formik
                        enableReinitialize
                        initialValues={{
                            nombre: producto.nombre,
                            precio: producto.precio,
                            existencia: producto.existencia
                        }}
                        validationSchema={validationSchema}
                        onSubmit={valores => {
                            actualizarInfoProducto(valores)
                        }}
                    >
                        {props => {
                            return (


                                <form
                                    onSubmit={props.handleSubmit}
                                    className="bg-white shadow-md px-8 pt-6 pb-8 mb-4">
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">Nombre</label>
                                        <input type="text" id="nombre"
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            placeholder="Nombre Producto"
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.nombre}
                                        />
                                    </div>
                                    {props.touched.nombre &&
                                        props.errors.nombre ? (
                                        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                            <p className="font-bold">{props.errors.nombre}</p>
                                        </div>
                                    ) : null}
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="existencia">Cantidad Disponible</label>
                                        <input type="number" id="existencia"
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            placeholder="Cantidad Disponible"
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.existencia}
                                        />
                                    </div>
                                    {props.touched.existencia &&
                                        props.errors.existencia ? (
                                        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                            <p className="font-bold">{props.errors.existencia}</p>
                                        </div>
                                    ) : null}
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="precio">Precio</label>
                                        <input type="number" id="precio"
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            placeholder="Precio Producto"
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.precio}
                                        />
                                    </div>
                                    {props.touched.precio &&
                                        props.errors.precio ? (
                                        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                            <p className="font-bold">{props.errors.precio}</p>
                                        </div>
                                    ) : null}
                                    <input type="submit"
                                        className="bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900"
                                        value="Guardar Cambios"
                                    />
                                </form>
                            )
                        }}
                    </Formik>
                </div>
            </div>
        </>
    )
}
