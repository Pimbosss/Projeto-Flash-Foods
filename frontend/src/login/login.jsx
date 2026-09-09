import "./Login.css";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import React, { useState } from "react";

const baseUrl = "http://localhost:3001/users";

const initialState = {
    email: "",
    password: "",
};

export default function Login() {
    const navigate = useNavigate();

    const [credentials, setCredentials] = useState({ ...initialState });

    const updatedField = (event) => {
        const { name, value } = event.target;
        setCredentials({ ...credentials, [name]: value });
    };

    const handleLogin = (event) => {
        event.preventDefault();
        console.log("Botão clicado! Dados digitados:", credentials);
        if (!credentials.email || !credentials.password) {
            alert("Todos os campos são obrigatórios!");
            return;
        }

        axios.get(`${baseUrl}?email=${credentials.email}`)
            .then(resp => {
                const usuarioEncontrado = resp.data
                if (usuarioEncontrado.length === 0) {
                    alert("Usuário não encontrado!");
                    return;
                }
                const usuario = usuarioEncontrado[0];
                if(usuario.password == credentials.password) {
                    alert("Login realizado com sucesso!");
                    localStorage.setItem("flashfoods:user", JSON.stringify({
                        id: usuario.id,
                        email: usuario.email
                    }));
                    setCredentials(initialState);
                    window.location.href = "/Home"; // Redireciona para a página Home após o login bem-sucedido
                } else {
                    alert("Senha incorreta!");
                }
            })
            .catch(err => {
                console.error("Erro ao realizar login:", err);
                alert("Ocorreu um erro ao tentar fazer login. Por favor, tente novamente mais tarde.");
            })
    }

    return (

        <div className="login-page">

            <div className="login-box">

                <button
                    className="fechar"
                    onClick={() => navigate("/")}
                >
                    ✕
                </button>

                <h1>Entrar</h1>
                <p>Entre na sua conta Flash</p>

                <form onSubmit={handleLogin}>
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={credentials.email}
                        onChange={updatedField}
                        placeholder="Digite seu email"
                    />

                    <label>Senha</label>
                    <input
                        type="password"
                        name="password"
                        value={credentials.password}
                        onChange={updatedField}
                        placeholder="Digite sua senha"
                    />

                    <button type="submit">
                        Entrar
                    </button>
                </form>

                <p className="cadastro">
                    Ainda não tem uma conta?{" "}
                    <Link to="/Cadastro">
                        Criar conta
                    </Link>
                </p>
            </div>

        </div>
    );
}