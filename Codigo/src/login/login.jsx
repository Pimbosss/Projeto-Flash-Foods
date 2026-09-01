
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";
export default function Login() {
    return (
        <div id="container" >

            <div>
                <input type="text" id="usuario" placeholder="Usuário" />
                <input type="text" id="usuario" placeholder="Senha" />
                <input type="button" value="Logar" />
                <Link to="/">
                    <a>X</a>
                </Link>
            </div>

        </div>
    );
}