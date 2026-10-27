import { gql, useMutation } from "@apollo/client"
import { useFormik } from "formik"
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2"
import * as yup from 'yup';


const NUEVO_PRODUCTO = gql` 
mutation nuevoProducto($input:ProductoInput) {
  nuevoProducto(input: $input) {
    id
    nombre
    existencia
    precio
 
  }
}
`

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

export default function NuevoProducto() {
    const navigate = useNavigate()

    const [nuevoProducto] = useMutation(NUEVO_PRODUCTO, {
        refetchQueries: [
            {
                query: OBTENER_PRODUCTOS
            }
        ]
    })



    const formik = useFormik({
        initialValues: {
            nombre: '',
            precio: '',
            existencia: '',

        },

        validationSchema: yup.object({
            nombre: yup.string()
                .required('El nombre del producto es obligatorio'),
            existencia: yup.number()
                .required('Agregar la cantidad disponible')
                .positive('No se aceptan nùmeros negativos')
                .integer('La existencia deben ser nùmeros enteros'),
            precio: yup.number()
                .required('El precio es obligatorio')
                .positive('No se aceptan nùmeros negativos')
        }),
        onSubmit: async (valores) => {

            try {


                await nuevoProducto({
                    variables: {
                        input: {
                            nombre: valores.nombre,
                            precio: valores.precio,
                            existencia: valores.existencia
                        },

                    },
                });
                Swal.fire(
                    'Creado',
                    'Producto creado correctamente',
                    'success'
                )
                navigate("/productos")
            } catch (error) {
                console.error(error);
                alert('Error al crear producto');
            }
        },
    })


    return (
        <div className="flex justify-center mt-5">
            <div className="w-full max-w-lg">
                <form onSubmit={formik.handleSubmit} className="bg-white shadow-md px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">Nombre</label>
                        <input type="text" id="nombre"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Nombre  Producto"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.nombre}
                        />
                    </div>

                    {formik.touched.nombre &&
                        formik.errors.nombre ? (
                        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                            <p className="font-bold">{formik.errors.nombre}</p>
                        </div>
                    ) : null}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="existencia">Cantidad Disponible</label>
                        <input type="number" id="existencia"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Cantidad Disponible"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.existencia}
                        />
                    </div>
                    {formik.touched.existencia &&
                        formik.errors.existencia ? (
                        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                            <p className="font-bold">{formik.errors.existencia}</p>
                        </div>
                    ) : null}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="precio">Precio</label>
                        <input type="number" id="precio"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Precio Producto"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.precio}
                        />
                    </div>
                    {formik.touched.precio &&
                        formik.errors.precio ? (
                        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                            <p className="font-bold">{formik.errors.precio}</p>
                        </div>
                    ) : null}
                    <input type="submit"
                        className="bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900"
                        value="Agregar Nuevo Producto"
                    />
                </form>
            </div>
        </div>
    )
}
