import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";


export default function Pedidos() {
    return (
        <div id="produtos-r">
            <h1>Gerenciar Pedidos</h1>
            <div id="cards-pedido1" >
                <button><h1>#1042 . João Silva</h1>
                    <p>1x X-burguer, 2x Refrigerante</p>
                    <p>R$38,00</p> <IoIosArrowDown />
 </button>

            </div>
            <div id="cards-pedido2" >
                <button><h1>#1041 . Maria Santos</h1>
                    <p>1x Pizza Margherita</p>
                    <p>R$48,90</p> <IoIosArrowDown />
 </button>

            </div>
            <div id="cards-pedido3" >
                <button><h1>#1040 . Pedro Costa</h1>
                    <p>3x Coxinhas, 1x Refrigerante</p>
                    <p>R$33,60</p> <IoIosArrowDown />
 </button>

            </div>
            <div id="cards-pedido4" >
                <button><h1>#1039 . Ana Paula</h1>
                    <p>1x X-burguer, 1x Brownie</p>
                    <p>R$39,80</p> <IoIosArrowDown />
 </button>

            </div>
        </div>
    )
}