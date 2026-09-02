import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./Home/Home";
import Login from "./Login/Login";
import Cadastro from "./Cadastro/Cadastro";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Cadastro" element={<Cadastro />} />

            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
}