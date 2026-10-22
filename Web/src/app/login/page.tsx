'use client';

import Link from 'next/link'
import useLogin from "./hooks/useLogin";

export default function Login() {
    const { router, updatedField, handleLogin, credentials } = useLogin();

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