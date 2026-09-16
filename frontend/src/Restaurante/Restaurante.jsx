import { IoMdRestaurant } from "react-icons/io";
import { FaStar } from "react-icons/fa";
import { Link, NavLink, Outlet } from "react-router-dom";
import { IoLocationOutline } from "react-icons/io5";

import "./Restaurante.css";

export default function Restaurante() {
    return (
        <div id="Meu-restaurante">

            <div className="header">
                <Link to="/" className="logo-link">
                    <h1 id="titulo1">
                        Flash Foods
                    </h1>
                </Link>

                <div className="area-estado">
                    <p>Área do Restaurante</p>
                    <button id="aberto">
                        Aberto
                    </button>
                </div>
            </div>


            <div className="infos">

                <div className="icon">
                    <IoMdRestaurant />
                </div>

                <div className="dados-restaurante">

                    <h1 id="nome-restaurante">
                        AAA
                    </h1>

                    <div className="avaliacao-restaurante">
                        <FaStar />
                        <span>0.0</span>
                    </div>

                    <div className="endereco-restaurante">
                        <IoLocationOutline />
                        <span>Endereço</span>
                    </div>

                </div>

            </div>


            <nav className="menu-restaurante">

                <NavLink to="/Restaurante" end>
                    Visão Geral
                </NavLink>

                <NavLink to="/Restaurante/produtos">
                    Produtos
                </NavLink>

                <NavLink to="/Restaurante/pedidos">
                    Pedidos
                </NavLink>


                <NavLink to="/Restaurante/perfil">
                    Perfil
                </NavLink>

            </nav>


            <main className="conteudo-restaurante">
                <Outlet />
            </main>

        </div>
    );
}
