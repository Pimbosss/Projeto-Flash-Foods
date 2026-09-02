import "./Login.css";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();

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

                <form>
                    <label>Email ou CPF</label>
                    <input
                        type="email"
                        placeholder="Digite seu email ou CPF"
                    />

                    <label>Senha</label>
                    <input
                        type="password"
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