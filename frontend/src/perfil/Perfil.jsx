import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../../templates/header.jsx";
import "./Perfil.css";

const baseUrl = "http://localhost:3001/users";

export default function Perfil() {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);

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
                console.log("Axios respondeu com:", resp.data);
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

    return (
        <div className="perfil-page">
            <Header />

            <div className="perfil-container">
                <div className="perfil-card">
                    <div className="avatar-section">
                        <h2>Meu Perfil Flash</h2>
                        <p style={{ color: "#ffc107" }}>Logado como: {userData.email}</p>
                    </div>

                    <hr />

                    <div className="info-section">
                        <div className="info-group">
                            <label>E-mail</label>
                            <input type="text" value={userData.email} disabled />
                        </div>

                        <div className="info-group">
                            <label>CPF</label>
                            <input type="text" value={userData.cpf || "Não informado"} disabled />
                        </div>

                        <div className="info-group">
                            <label>Telefone</label>
                            <input type="text" value={userData.phone || userData.telefone || "Não informado"} disabled />
                        </div>
                    </div>

                    <div className="perfil-actions" style={{ marginTop: "20px", textAlign: "center" }}>
                        <button className="btn-voltar" onClick={() => navigate("/Home")}>
                            Voltar para a Home
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}