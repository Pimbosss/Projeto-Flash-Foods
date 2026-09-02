import "./Cadastro.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Cadastro() {
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

                <h1>Cadastrar</h1>
                <p>Faça parte do Flash Foods</p>

                <form>
                    <label>Email</label>
                    <input
                        type="email"
                        placeholder="Digite seu email"
                    />
                    <label>CPF</label>
                    <input
                        type="email"
                        placeholder="Digite seu CPF"
                    />
                    <label>Telefone</label>
                    <input
                        type="email"
                        placeholder="Digite seu Telefone"
                    />

                    <label>Senha</label>
                    <input
                        type="password"
                        placeholder="Crie uma senha"
                    />
                    <label>Corfirmar a Senha</label>
                    <input
                        type="password"
                        placeholder="Digite a senha novamente"
                    />

                    <button type="submit">
                        Criar Conta
                    </button>
                </form>

                <p className="cadastro">
                    Já tem uma conta?{" "}
                    <Link to="/Login">
                        Login
                    </Link>
                </p>

            </div>

        </div>
    );
}