import { MdAttachMoney } from "react-icons/md";
import { FiBox } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import { IoIosTrendingUp } from "react-icons/io";
import { LuCupSoda } from "react-icons/lu";
import { FaDrumstickBite } from "react-icons/fa";
import { IoFastFoodOutline } from "react-icons/io5";
import { CiPizza } from "react-icons/ci";

export default function VisaoGeral() {
    return (
        <div id="cards-infos">

            <div className="card1">
                <p>Receita Hoje</p>

                <MdAttachMoney />

                <p className="ganhos">
                    R$ 00.00
                </p>

                <p>
                    + R$ 00.00 vs ontem
                </p>
            </div>


            <div className="card2">
                <p>Pedidos Hoje</p>

                <FiBox />

                <p className="pedidos">
                    0
                </p>

                <p>
                    0 em andamento
                </p>
            </div>


            <div className="card3">
                <p>Avaliação Média</p>

                <FaStar />

                <p className="avaliacao">
                    0
                </p>

                <p>
                    0 avaliações
                </p>
            </div>


            <div className="card4">
                <p>Ticket Médio</p>

                <IoIosTrendingUp />

                <p className="ticket">
                    0
                </p>

                <p>
                    +R$ 0 esta semana
                </p>
            </div>


            <div id="card-dados">

                <div className="mais-vendidos">

                    <div className="titulo-card">
                        <IoIosTrendingUp />
                        <h1>Mais vendidos</h1>
                    </div>

                    <ol>
                        <li>
                            <LuCupSoda />
                            <span>Refrigerante 350ml</span>
                        </li>

                        <li>
                            <FaDrumstickBite />
                            <span>Coxinha de Frango</span>
                        </li>

                        <li>
                            <IoFastFoodOutline />
                            <span>X-burguer</span>
                        </li>

                        <li>
                            <CiPizza />
                            <span>Pizza Margherita</span>
                        </li>
                    </ol>

                </div>


                <div className="pedidos-info">

                    <div className="titulo-card">
                        <IoIosTrendingUp />
                        <h1>Pedidos Recentes</h1>
                    </div>

                    <ol>

                        <li>
                            <div>
                                <h2>#1042 · João Silva</h2>
                                <p>1x X-Burguer, 2x Refrigerante</p>
                            </div>

                            <span className="status novo">
                                Novo
                            </span>
                        </li>


                        <li>
                            <div>
                                <h2>#1041 · Maria Santos</h2>
                                <p>1x Pizza Margherita</p>
                            </div>

                            <span className="status preparando">
                                Preparando
                            </span>
                        </li>


                        <li>
                            <div>
                                <h2>#1040 · Pedro Costa</h2>
                                <p>3x Coxinha, 1x Refrigerante</p>
                            </div>

                            <span className="status pronto">
                                Pronto
                            </span>
                        </li>


                        <li>
                            <div>
                                <h2>#1039 · Ana Paula</h2>
                                <p>1x X-Burguer, 1x Brownie</p>
                            </div>

                            <span className="status entregue">
                                Entregue
                            </span>
                        </li>

                    </ol>

                </div>

            </div>

        </div>
    );
}
