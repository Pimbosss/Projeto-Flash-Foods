import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./Home/Home";
import Login from "./login/login";
import Cadastro from "./Cadastro/Cadastro";
import Perfil from "./perfil/Perfil";
import Pedir from "./Pedir_agora/Pedir-agora";
import Carrinho from "./Carrinho/Carrinho";
import Restaurante from "./Restaurante/Restaurante";
import { CarrinhoProvider } from "./Pedir_agora/CarrinhoContext";
import Area_e from "./Area-Entregador/Area-E";

import VisaoGeral from "./Restaurante/visao-geral";
import Pedidos from "./Restaurante/Pedidos";
import Perfil_r from "./Restaurante/Perfil_r";
import Produtos from "./Restaurante/Produtos";

export default function AppRoutes() {
    return (
        <CarrinhoProvider>

            <Routes>

                <Route path="/" element={<Home />} />

                <Route path="/Login" element={<Login />} />

                <Route path="/Cadastro" element={<Cadastro />} />

                <Route path="/Perfil" element={<Perfil />} />

                <Route path="/Pedir-agora" element={<Pedir />} />

                <Route path="/Carrinho" element={<Carrinho />} />

                <Route path="/Area-E" element={<Area_e />} />


                <Route path="/Restaurante" element={<Restaurante />}>

                    <Route
                        index
                        element={<VisaoGeral />}
                    />

                    <Route
                        path="pedidos"
                        element={<Pedidos />}
                    />

                    <Route
                        path="produtos"
                        element={<Produtos />}
                    />

                    <Route
                        path="perfil"
                        element={<Perfil_r />}
                    />

                </Route>


                <Route
                    path="*"
                    element={<Navigate to="/" />}
                />

            </Routes>

        </CarrinhoProvider>
    );
}
