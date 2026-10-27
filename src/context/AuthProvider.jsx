
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const AuthContext = React.createContext();



const AuthProvider = ({ children }) => {
    const navigate = useNavigate()
    const [mostrar, setMostrar] = useState(false);


    const handleMostrar = () => {
        setMostrar(!mostrar);
    };




    const cerrarSesion = () => {
        localStorage.removeItem('token');
        navigate('/login');
    }

    return (
        <AuthContext.Provider value={{ mostrar, handleMostrar, cerrarSesion }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider };
export { AuthContext };
export default AuthContext;