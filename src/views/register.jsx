
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { gql, useMutation } from '@apollo/client';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const NUEVA_CUENTA = gql`
  mutation nuevoUsuario($input:UsuarioInput) {
  nuevoUsuario(input:$input){
    id
    nombre
    apellido
    email
  }
}`;

export default function Register() {
    const [mensaje, setMensaje] = useState(null)
    const navigate = useNavigate();
    // Mutation para crear nuevo usuario
    const [nuevoUsuario] = useMutation(NUEVA_CUENTA)

    // Validation  for the form 
    const formik = useFormik({
        initialValues: {
            nombre: '',
            apellido: '',
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            nombre: Yup.string()
                .required('El nombre es obligatorio'),
            apellido: Yup.string()
                .required('El apellido es obligatorio'),
            email: Yup.string()
                .email('El email no es válido')
                .required('El email es obligatorio'),
            password: Yup.string()
                .required('El password es obligatorio')
                .min(6, 'El password debe tener al menos 6 caracteres')
        }),
        validateOnChange: false,
        onSubmit: async valores => {
            // console.log(values);
            const { nombre, apellido, email, password } = valores;
            try {
                const data = await nuevoUsuario({
                    variables: {
                        input: {
                            nombre,
                            apellido,
                            email,
                            password
                        }
                    }
                })
                // console.log(data);
                setMensaje(`Usuario creado: ${data.data.nuevoUsuario.nombre}`);
                setTimeout(() => {
                    setMensaje(null);
                    navigate('/login');
                }, 3000);
            } catch (error) {
                // console.log(error);
                setMensaje(error.message);
                setTimeout(() => {
                    setMensaje(null);
                }, 3000);
            }
        }
    });

    const mostrarMensaje = () => {
        return (
            <div className="my-3 bg-white px-3 w-3/5 p-2 text-center mx-auto ">
                <p className="font-bold">{mensaje}</p>
            </div>
        )
    }


    return (
        <div className="w-full " >
            {mensaje && mostrarMensaje()}
            <h1 className='text-center text-2xl text-white font-light'>Nueva Cuenta</h1>

            <div className="flex justify-center mt-5">
                <div className="w-full max-w-sm flex justify-center items-center flex-col">
                    <form onSubmit={formik.handleSubmit}
                        className="w-4/5 min-w-4/5  xl:w-5/5 md:w-5/5 bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4 ">
                        {/*  */}
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">Nombre</label>
                            <input type="text" id="nombre"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Nombre Usuario"
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
                        {/*  */}

                        {/*  */}
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="apellido">Apellido</label>
                            <input type="text" id="apellido"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Apellido Usuario"
                                onChange={formik.handleChange}
                                value={formik.values.apellido}
                                onBlur={formik.handleBlur}
                            />
                        </div>
                        {formik.touched.apellido &&
                            formik.errors.apellido ? (
                            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                <p className="font-bold">{formik.errors.apellido}</p>
                            </div>
                        ) : null}
                        {/*  */}

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
                            <input type="email" id="email"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Email Usuario"
                                onChange={formik.handleChange}
                                value={formik.values.email}
                                onBlur={formik.handleBlur}
                            />
                        </div>
                        {formik.touched.email &&
                            formik.errors.email ? (
                            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                <p className="font-bold">{formik.errors.email}</p>
                            </div>
                        ) : null}
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
                            <input type="password" id="password"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Password Usuario"
                                onChange={formik.handleChange}
                                value={formik.values.password}
                                onBlur={formik.handleBlur}
                            />
                        </div>
                        {formik.touched.password &&
                            formik.errors.password ? (
                            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                <p className="font-bold">{formik.errors.password}</p>
                            </div>
                        ) : null}
                        <input type="submit"
                            className="bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:bg-gray-900"
                            value="Crear Cuenta"
                        />
                    </form>
                       
                </div>
            </div>
        </div >
    )
}
