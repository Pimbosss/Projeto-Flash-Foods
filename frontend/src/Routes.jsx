import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./Home/Home";
import Login from "./login/login";
import Cadastro from "./Cadastro/Cadastro";
import Perfil from "./perfil/Perfil";
import Pedir from "./Pedir_agora/Pedir-agora";
import Carrinho from "./Carrinho/Carrinho";
import { CarrinhoProvider } from "./Pedir_agora/CarrinhoContext";
import Area_e from "./Area-Entregador/Area-E";

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
                <Route path="*" element={<Navigate to="/" />} />
                <Route path="/Area-E" element={<Area_e />}/>
            </Routes>
        </CarrinhoProvider>
    );
}