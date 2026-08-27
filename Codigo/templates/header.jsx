import "/templates/header.css"
export default function Header(){
  return(
    <header>
      <div id = "cabeçalho">
        <div id="titulo">
          <h1>Flash Foods</h1>
        </div>
        <div id="links">
          <a href="#">Como funciona</a>
          <a href="#">Para entregadores</a>
          <a href="#">Restaurantes</a>
        </div>
        <div id="buttons">
          <button>Área do Entregador</button>
          <button>Meu Restaurante</button>
          <button>Entrar</button>
          <button>Fazer Pedido</button>
        </div>
      </div>
    </header>
  )
}