import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import AppLoayout from "./layouts/AppLoayout";
import Home from "./views/home";

import Login from "./views/login";
import Register from "./views/register";
import { AuthProvider } from "./context/AuthProvider";



import NuevoCliente from "./views/clientes/nuevoCliente";
import EditarCliente from "./views/clientes/EditarCliente";
import NuevoProducto from "./views/productos/nuevoProducto";
import EditarProducto from "./views/productos/EditarProducto";
import Productos from "./views/productos";
import NuevoPedido from "./views/pedidos/NuevoPedido";
import { PedidoState } from "./contextpedidos/contextPedidos/PedidoState";
import Pedidos from "./views/pedidos/pedidos";
import MejoresVendedores from "./views/MejoresVendedores";
import MejoresClientes from "./views/MejoresClientes";





export default function Router() {
    return (

        <BrowserRouter>
            <PedidoState>

                <AuthProvider>
                    <Routes>
                        <Route path="/" element={<AppLoayout />} >
                            <Route path="/" index={true} element={<Home />} />
                            <Route path="/sidebar" element={<Sidebar />} />
                            <Route path="/pedidos" element={<Pedidos />} />
                            <Route path="/productos" element={<Productos />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/nuevocliente" element={<NuevoCliente />} />
                            <Route path="/nuevopedido" element={<NuevoPedido />} />
                            <Route path="/editar/:id" element={<EditarCliente />} />
                            <Route path="/nuevoproducto" element={<NuevoProducto />} />
                            <Route path="/editarPro/:id" element={<EditarProducto />} />
                            <Route path="/mejoresvendedores" element={<MejoresVendedores />} />
                            <Route path="/mejoresclientes" element={<MejoresClientes />} />
                        </Route>
                    </Routes>
                </AuthProvider>
            </PedidoState>
        </BrowserRouter>
    )
}