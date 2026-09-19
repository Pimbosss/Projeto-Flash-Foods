'use client';

import { useRouter } from "next/navigation";
import { api } from '@/services/api'
import { useState } from "react";
import Link from 'next/link'

const initialState = {
    email: "",
    password: "",
};

export default function Login() {
    const router = useRouter();

    const [credentials, setCredentials] = useState({ ...initialState });

    const updatedField = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setCredentials({ ...credentials, [name]: value });
    };

    const handleLogin = (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (document.activeElement instanceof HTMLElement) {
            document.activeElement.blur();
        }

        if (!credentials.email || !credentials.password) {
            alert("Todos os campos são obrigatórios!");
            return;
        }

        api.get(`/users?email=${credentials.email}`)
            .then(resp => {
                const usuarioEncontrado = resp.data
                if (usuarioEncontrado.length === 0) {
                    alert("Usuário não encontrado!");
                    return;
                }
                const usuario = usuarioEncontrado[0];
                if (usuario.password == credentials.password) {
                    alert("Login realizado com sucesso!");
                    localStorage.setItem("flashfoods:user", JSON.stringify({
                        id: usuario.id,
                        name: usuario.name,
                        email: usuario.email,
                        tipo: usuario.tipo || 'cliente'
                    }));
                    setCredentials(initialState);
                    window.dispatchEvent(new Event("perfilAtualizado"))
                    router.push("/", {scroll : true}); // Redireciona para a página Home após o login bem-sucedido
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
                    onClick={() => { router.push("/", { scroll: false }) }}
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
                    <Link href="/cadastro">
                        Criar conta
                    </Link>
                </p>
            </div>
        </div>
    );
}