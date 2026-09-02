import "/templates/header.css"
import { Link } from "react-router-dom";
import centralizar from "/src/functions/function1.jsx"

export default function Header() {
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
          <a href="#para-entregadores"
            onClick={(event) => centralizar(event, 'para-entregadores')}
          >Para entregadores</a>
          <a href="#restaurantes1"
            onClick={(event) => centralizar(event, 'restaurantes')}
          >Restaurantes</a>
        </div>
        <div id="buttons1">
          <button>Área do Entregador</button>
          <button>Meu Restaurante</button>
          <Link to="/Login">
            <button>↪ Entrar</button>
          </Link>
          <button>Fazer Pedido</button>
        </div>
      </div>
    </header>
  )
}