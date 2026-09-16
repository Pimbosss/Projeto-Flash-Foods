
import { GoPencil } from "react-icons/go";
import { FaRegTrashAlt } from "react-icons/fa";



export default function Produtos() {
    return (
        <div id="home-produtos">
            <h1><span className="nprodutos" >0 </span>Produtos cadastrados</h1>
            <button>+ Adicionar Produtos</button>
            <h1>Lanches</h1>
            <div className="card-l" >
                <h1>X-burguer</h1>
                <p>R$ 00,00</p>
                <p>informações do prato</p>
                <p>numero vendidos</p>
                <label class="switch">
                    <input type="checkbox" />
                    <span class="slider"></span>
                </label>
                <button><GoPencil /></button>
                <button><FaRegTrashAlt /></button>
            </div>
            <h1>Pizza</h1>
            <div className="card-2" >
                <h1>Pizza Margherita</h1>
                <p>R$ 00,00</p>
                <p>informações do prato</p>
                <p>numero vendidos</p>
                <label class="switch">
                    <input type="checkbox" />
                    <span class="slider"></span>
                </label>
                <button><GoPencil /></button>
                <button><FaRegTrashAlt /></button>
            </div>
            <h1>Bebidas</h1>
            <div className="card-3" >
                <h1>Coca-Cola</h1>
                <p>R$ 00,00</p>
                <p>informações do prato</p>
                <p>numero vendidos</p>
                <label class="switch">
                    <input type="checkbox" />
                    <span class="slider"></span>
                </label>
                <button><GoPencil /></button>
                <button><FaRegTrashAlt /></button>
            </div>
            <h1>Sobremesas</h1>
            <div className="card-4" >
                <h1>Pudim</h1>
                <p>R$ 00,00</p>
                <p>informações do prato</p>
                <p>numero vendidos</p>
                <label class="switch">
                    <input type="checkbox" />
                    <span class="slider"></span>
                </label>
                <button><GoPencil /></button>
                <button><FaRegTrashAlt /></button>
            </div>
            <h1>Salgados</h1>
            <div className="card-5" >
                <h1>Coxinha</h1>
                <p>R$ 00,00</p>
                <p>informações do prato</p>
                <p>numero vendidos</p>
                <label class="switch">
                    <input type="checkbox" />
                    <span class="slider"></span>
                </label>
                <button><GoPencil /></button>
                <button><FaRegTrashAlt /></button>
            </div>
        </div>
    )
}   