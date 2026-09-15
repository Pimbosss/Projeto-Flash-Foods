import { IoMdRestaurant } from "react-icons/io";
import { TbLocation } from "react-icons/tb";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Restaurante.css"
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
                    <button id="aberto" >Aberto</button>
                </div>
            </div>
            <div className="infos" >
                    <div className="icon" >
                        <IoMdRestaurant />
                    </div>
                    <h1 id="nome-restaurante" >AAA</h1>
                    <p></p>

            </div>
        </div>
    )
}