'use client';

import styles from "../restaurante.module.css"; 
import { MdAttachMoney } from "react-icons/md";
import { FiBox } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import { IoIosTrendingUp } from "react-icons/io";
import { LuCupSoda } from "react-icons/lu";
import { FaDrumstickBite } from "react-icons/fa";
import { IoFastFoodOutline } from "react-icons/io5";
import { CiPizza } from "react-icons/ci";

interface VisaoGeralProps {
    dadosLoja: any;
    pedidos: any[]; // 🟢 Recebe a lista viva do db.json
}

export default function VisaoGeral({ dadosLoja, pedidos }: VisaoGeralProps) {
    
    // 🧮 CÁLCULOS EM TEMPO REAL BASEADOS NO BANCO DO SEU GRUPO:
    const pedidosHoje = pedidos.filter((p: any) => p.status === "concluido" || p.status === "pendente" || p.status === "a caminho");
    
    const receitaHoje = pedidosHoje
        .filter((p: any) => p.status === "concluido")
        .reduce((acc: number, p: any) => acc + (p.total || 0), 0);

    const pedidosEmAndamento = pedidos.filter((p: any) => p.status === "pendente" || p.status === "a caminho").length;

    // 🕒 ORDENAÇÃO: Pega os últimos 4 pedidos reais criados no banco (do mais novo para o mais antigo)
    const pedidosRecentes = [...pedidos]
        .reverse()
        .slice(0, 4);

    return (
        <div className={styles.cardsInfos}>
            
            {/* 📊 CARDS DE MÉTRICAS */}
            <div className={styles.card1}>
                <p>Receita Hoje</p>
                <MdAttachMoney className={styles.cardIcon} />
                <p className={styles.ganhos}>
                    R\$ {receitaHoje > 0 ? receitaHoje.toFixed(2).replace(".", ",") : "0,00"}
                </p>
                <p>+ R\$ 0,00 vs ontem</p>
            </div>

            <div className={styles.card2}>
                <p>Pedidos Hoje</p>
                <FiBox className={styles.cardIcon} />
                <p className={styles.pedidos}>
                    {pedidosHoje.length}
                </p>
                <p>{pedidosEmAndamento} em andamento</p>
            </div>

            <div className={styles.card3}>
                <p>Avaliação Média</p>
                <FaStar className={styles.cardIcon} />
                <p className={styles.avaliacao}>5.0</p>
                <p>Ainda sem avaliações</p>
            </div>

            <div className={styles.card4}>
                <p>Ticket Médio</p>
                <IoIosTrendingUp className={styles.cardIcon} />
                <p className={styles.ticket}>
                    R\$ {pedidosHoje.length > 0 ? (receitaHoje / pedidosHoje.length).toFixed(2).replace(".", ",") : "0,00"}
                </p>
                <p>+R\$ 0 esta semana</p>
            </div>

            {/* 🗂️ GRADE DE PRODUTOS E HISTÓRICO RECENTE CONECTADO */}
            <div className={styles.cardDados}>
                
                {/* MAIS VENDIDOS (Ainda estático/Simulado pelo layout) */}
                <div className={styles.maisVendidos}>
                    <div className={styles.tituloCard}>
                        <IoIosTrendingUp />
                        <h1>Mais vendidos</h1>
                    </div>
                    <ol>
                        <li><LuCupSoda /> <span>Refrigerante 350ml</span></li>
                        <li><FaDrumstickBite /> <span>Coxinha de Frango</span></li>
                        <li><IoFastFoodOutline /> <span>X-burguer</span></li>
                        <li><CiPizza /> <span>Pizza Margherita</span></li>
                    </ol>
                </div>

                {/* 📦 LADO DIREITO: PEDIDOS RECENTES 100% CONECTADOS AO BANCO DE DADOS */}
                <div className={styles.pedidosInfo}>
                    <div className={styles.tituloCard}>
                        <IoIosTrendingUp />
                        <h1>Pedidos Recentes</h1>
                    </div>
                    
                    <ol>
                        {pedidosRecentes.length === 0 ? (
                            <p style={{ color: "#7a8491", fontSize: "13px", marginTop: "20px", textAlign: "center" }}>
                                Nenhum pedido recebido ainda. 📭
                            </p>
                        ) : (
                            pedidosRecentes.map((pedido: any) => {
                                // Define a classe de estilo da tag de status dinamicamente
                                let classeStatus = styles.novo;
                                let textoStatus = "Novo";

                                if (pedido.status === "a caminho") {
                                    classeStatus = styles.preparando;
                                    textoStatus = "A Caminho";
                                } else if (pedido.status === "concluido") {
                                    classeStatus = styles.pronto;
                                    textoStatus = "Concluído";
                                }

                                return (
                                    <li key={pedido.id}>
                                        <div>
                                            <h2># {pedido.id} · {pedido.usuarioNome || "Cliente Flash"}</h2>
                                            <p>
                                                {pedido.itens?.map((item: any) => `${item.quantidade}x ${item.nome}`).join(", ") || "Itens do Pedido"}
                                            </p>
                                        </div>
                                        <span className={`${styles.status} ${classeStatus}`}>
                                            {textoStatus}
                                        </span>
                                    </li>
                                );
                            })
                        )}
                    </ol>
                </div>

            </div>
        </div>
    );
}
