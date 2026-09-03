import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./Home/Home";
import Login from "./login/login";
import Cadastro from "./Cadastro/Cadastro";
import Perfil from "./perfil/Perfil";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Cadastro" element={<Cadastro />} />
            <Route path="/Perfil" element={<Perfil />} />
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
}