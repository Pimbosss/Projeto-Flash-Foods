import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../../templates/header.jsx";
import "./Perfil.css";

const baseUrl = "http://localhost:3001/users";

export default function Perfil() {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);

    const updatedField = (event) => {
        const { name, value } = event.target;
        setUserData({ ...userData, [name]: value });
    };  

    useEffect(() => {
        const session = localStorage.getItem("flashfoods:user");

        if (!session) {
            alert("Acesso negado. Faça login.");
            navigate("/Login");
            return;
        }

        const loggedUser = JSON.parse(session);

        // Busca os dados diretamente usando o ID da sessão
        axios.get(`${baseUrl}/${loggedUser.id}`)
            .then(resp => {
                // Salva os dados no estado do React
                setUserData(resp.data);
            })
            .catch(err => {
                console.error("Erro na requisição:", err);
            });
    }, [navigate]);

    // TRAVA DE SEGURANÇA: Se userData for null, o React PARA aqui e mostra a mensagem.
    // Ele SÓ vai desenhar o formulário lá embaixo quando o userData tiver os dados reais!
    if (!userData) {
        return (
            <div style={{ color: "white", padding: "50px", textAlign: "center" }}>
                <h2>Carregando dados do servidor...</h2>
            </div>
        );
    }

    const save = () => {
    axios.put(`${baseUrl}/${userData.id}`, userData)
        .then(resp => {
            
            // 1. Pegamos a sessão atual que só tem id e email
            const session = localStorage.getItem("flashfoods:user");
            
            if (session) {
                const loggedUser = JSON.parse(session);
                
                // 2. 🪄 AQUI ESTÁ A CORREÇÃO: Montamos a nova sessão injetando o NOME
                // que o usuário acabou de digitar e salvar no servidor (resp.data.name ou .nome)
                const novaSessao = { 
                    ...loggedUser, 
                    email: resp.data.email, 
                    name: resp.data.name || resp.data.nome // Tenta pegar em inglês ou português
                };
                
                // 3. Gravamos o objeto completo e atualizado de volta no LocalStorage
                localStorage.setItem("flashfoods:user", JSON.stringify(novaSessao));
            }

            // Avisa o Header para se atualizar na hora sem precisar de F5
            window.dispatchEvent(new Event("perfilAtualizado"));

        })
        .catch(err => {
            console.error("Erro ao salvar:", err);
            alert("Erro ao salvar os dados.");
        });
};

    return (
        <div className="perfil-page">
            <Header />

            <div className="perfil-container">
                <div className="perfil-card">
                    <div className="avatar-section">
                        <h2>Meu Perfil Flash</h2>
                        <p style={{ color: "#f97316" }}>Logado como: {userData.email}</p>
                    </div>

                    <hr />

                    <div className="info-section">
                        <div className="info-group">
                            <label>E-mail</label>
                            <input type="text" name="email" value={userData.email} onChange={updatedField} />
                        </div>

                        <div className="info-group">
                            <label>Nome</label>
                            <input type="text" name="name" value={userData.name} onChange={updatedField} />
                        </div>

                        <div className="info-group">
                            <label>CPF</label>
                            <input type="text" name="cpf" value={userData.cpf || "Não informado"} onChange={updatedField} />
                        </div>

                        <div className="info-group">
                            <label>Telefone</label>
                            <input type="text" name="phone" value={userData.phone || userData.telefone || "Não informado"} onChange={updatedField} />
                        </div>
                    </div>

                    <div className="perfil-actions" style={{ marginTop: "20px", textAlign: "center" }}>
                        <button className="btn-voltar" onClick={() => navigate("/Home")}>
                            Voltar para a Home
                        </button>
                    </div>
                    <div>
                        <button className="btn-voltar" onClick={save}>
                            Salvar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}