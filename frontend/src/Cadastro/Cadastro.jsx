import "./Cadastro.css";
import { Link , useNavigate} from "react-router-dom";
import React, { useState, useEffect } from "react";   
import axios from "axios";

const baseUrl = "http://localhost:3001/users";
const initialState = {
    email: "",
    cpf: "",
    phone: "",
    password: "",
    confirmPassword: "",
};

export default function Cadastro() {
    const navigate = useNavigate();
    
    const [user, setUser] = useState({...initialState});
    const [list, setList] = useState([]);

    useEffect(() => {
        axios.get(baseUrl)
            .then(resp => {
                setList(resp.data);
            })
            .catch(err => console.error("Erro ao carregar banco:", err));
    }, [])

    const updatedField = (event) => {
        const { name, value } = event.target;
        setUser({ ...user, [name]: value });
    };

    const save = (event) => {
        event.preventDefault();
        if (!user.email || !user.cpf || !user.phone || !user.password || !user.confirmPassword) {
            alert("Todos os campos são obrigatórios!");
            return;
        }

        if (user.password !== user.confirmPassword) {
            alert("Senha incorreta! Por favor, digite a mesma senha nos campos de senha e confirmação.");
            return;
        }

        const nextId = list.length > 0 ? Math.max(...list.map(u => parseInt(u.id))) + 1 : 1;

        const userToSave = {
            id: String(nextId),
            email: user.email,
            cpf: user.cpf,
            phone: user.phone,
            password: user.password
        }

        axios.post(baseUrl, userToSave)
            .then(resp => {
                alert("Cadastro realizado com sucesso!");
                setUser(initialState);
                navigate("/Login");
             })
             .catch(error => {
                console.error("Erro ao salvar usuário:", error);
                alert("Ocorreu um erro ao realizar o cadastro. Por favor, tente novamente.");
            });
        
            
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

                <h1>Cadastrar</h1>
                <p>Faça parte do Flash Foods</p>

                {/* Adicionado o evento onSubmit no formulário que chama a função save */}
                <form onSubmit={save}>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email" // IMPORTANTE: igual à chave do objeto
                        value={user.email}
                        onChange={updatedField}
                        placeholder="Digite seu email"
                    />

                    <label htmlFor="cpf">CPF</label>
                    <input
                        type="text" // Corrigido de email para text
                        id="cpf"
                        name="cpf"
                        value={user.cpf}
                        onChange={updatedField}
                        placeholder="Digite seu CPF"
                    />

                    <label htmlFor="phone">Telefone</label>
                    <input
                        type="tel" // Mudado de email para tel (semântica correta)
                        id="phone"
                        name="phone"
                        value={user.phone}
                        onChange={updatedField}
                        placeholder="Digite seu Telefone"
                    />

                    <label htmlFor="password">Senha</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={user.password}
                        onChange={updatedField}
                        placeholder="Crie uma senha"
                    />

                    <label htmlFor="confirmPassword">Confirmar a Senha</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={user.confirmPassword}
                        onChange={updatedField}
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