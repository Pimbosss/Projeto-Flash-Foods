import "/templates/header.css"
import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import centralizar from "/src/functions/function1.jsx"

export default function Header() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem("flashfoods:user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("flashfoods:user");
    setUser(null);
    navigate("/");
  }

  return (
    <header>
      <div id="cabeçalho">
        <div id="titulo">
          <h1 className="logo">
            <a href="">Flash Foods</a>
          </h1>
        </div>
        
        <div id="links">
          <a
            href="#comofunciona"
            onClick={(event) => centralizar(event, 'comofunciona')}
          >
            Como funciona
          </a>
          <a 
            href="#para-entregadores"
            onClick={(event) => centralizar(event, 'para-entregadores')}
          >
            Para entregadores
          </a>
          <a 
            href="#restaurantes1"
            onClick={(event) => centralizar(event, 'restaurantes')}
          >
            Restaurantes
          </a>
        </div>

        <div id="buttons1">
          <button>Área do Entregador</button>
          <button>Meu Restaurante</button>
          {user ? (
           
            <>
              <span className="user-greeting" style={{ color: "white", marginRight: "15px" }}>
                Olá, {user.email.split('@')[0]}
              </span>
              <img 
                src="https://flaticon.com" 
                alt="Perfil" 
                onClick={() => navigate("/Perfil")}
                style={{ width: '35px', borderRadius: '50%', cursor: 'pointer', marginRight: '15px', verticalAlign: 'middle' }}
              />
              <button onClick={handleLogout} className="btn-logout">
                Sair
              </button>
            </>
          ) : (
            
            <>
              <Link to="/Login">
                <button>Entrar</button>
              </Link>
              <button onClick={() => navigate("/Cadastro")}>Fazer Pedido</button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}