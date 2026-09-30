'use client';

import { useState, useEffect } from "react";
import { api } from "@/services/api"; 
import styles from "../restaurante.module.css"; 
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

interface PedidosProps {
    dadosLoja: any; 
}

export default function Pedidos({ dadosLoja }: PedidosProps) {
    const [pedidos, setPedidos] = useState<any[]>([]);
    const [cardExpandido, setCardExpandido] = useState<string | null>(null);

    const carregarPedidosDaCozinha = () => {
        if (dadosLoja && dadosLoja.id) {
            api.get(`/pedidos?restauranteId=${dadosLoja.id}`)
                .then((resp) => {
                    setPedidos((resp.data || []).reverse());
                })
                .catch((err) => console.error("Erro ao carregar a esteira de pedidos:", err));
        }
    };

    useEffect(() => {
        carregarPedidosDaCozinha();
        const intervalo = setInterval(carregarPedidosDaCozinha, 7000);
        return () => clearInterval(intervalo);
    }, [dadosLoja]);

    const avancarStatusPedido = async (pedido: any) => {
        let novoStatus = pedido.status;

        if (pedido.status === "pendente") {
            novoStatus = "preparando";
        } else if (pedido.status === "preparando") {
            novoStatus = "a caminho";
        } else if (pedido.status === "a caminho") {
            novoStatus = "concluido";
        } else {
            return; 
        }

        const confirmar = window.confirm(`Deseja alterar o status do pedido #${pedido.id} para "${novoStatus.toUpperCase()}"? 🚚`);
        if (!confirmar) return;

        try {
            await api.put(`/pedidos/${pedido.id}`, {
                ...pedido,
                status: novoStatus
            });
            carregarPedidosDaCozinha();
        } catch (error) {
            console.error("Erro ao avançar status da ordem de compra:", error);
            alert("Erro de comunicação com o servidor ao atualizar status.");
        }
    };

    const alternarExpansao = (id: string, e: React.MouseEvent) => {
        e.stopPropagation(); 
        setCardExpandido(cardExpandido === id ? null : id);
    };

    return (
        <div className={styles.produtosR}>
            <h1>Gerenciar Pedidos (Esteira de Produção)</h1>
            
            {pedidos.length === 0 ? (
                <p className={styles.avisoVazio}>
                    Nenhum pedido pendente ou recebido para a sua cozinha no momento. 📭
                </p>
            ) : (
                pedidos.map((pedido) => {
                    let classeDoCard = styles.cardsPedido4; 

                    if (pedido.status === "pendente") {
                        classeDoCard = styles.cardsPedido1; 
                    } else if (pedido.status === "preparando") {
                        classeDoCard = styles.cardsPedido2; 
                    } else if (pedido.status === "a caminho" || pedido.status === "concluido") {
                        classeDoCard = styles.cardsPedido3; 
                    }

                    const itensTexto = pedido.itens?.map((item: any) => `${item.quantidade}x ${item.nome}`).join(", ") || "Itens do Pedido";
                    
                    const precoTotal = typeof pedido.total === "string" 
                        ? Number(pedido.total.replace(",", ".")) 
                        : Number(pedido.total || 0);

                    const expandido = cardExpandido === pedido.id;

                    return (
                        <div 
                            className={`${classeDoCard} ${styles.cardPedidoContainer}`} 
                            key={pedido.id} 
                            onClick={() => avancarStatusPedido(pedido)}
                            title="Clique para avançar o status deste pedido na esteira"
                            style={{ height: expandido ? "auto" : "85px" }} // Unida apenas a propriedade dinâmica controlada pelo React State
                        >
                            <button type="button" className={styles.btnInvisivel}>
                                <h1>#{pedido.id} . {pedido.usuarioNome || "Cliente Flash Foods"}</h1>
                                <p className={expandido ? "" : styles.textoItens}>
                                    {itensTexto}
                                </p>
                                <p>R\$ {precoTotal.toFixed(2).replace(".", ",")}</p>
                                
                                {/* Seta para Expandir */}
                                <div className={styles.setaExpandir} onClick={(e) => alternarExpansao(pedido.id, e)}>
                                    {expandido ? <IoIosArrowUp /> : <IoIosArrowDown />}
                                </div>

                                {/* Bloco de detalhes expansível limpo e animado */}
                                {expandido && (
                                    <div className={styles.detalhesPedido}>
                                        <p>📍 <strong>Endereço de Entrega:</strong> {pedido.endereco || "Não informado pelo cliente"}</p>
                                        <p>📅 <strong>Horário do Pedido:</strong> {pedido.data || "Agora"}</p>
                                        <p>⚙️ <strong>Status Atual:</strong> <strong>{pedido.status.toUpperCase()}</strong></p>
                                        <p className={styles.dicaAcao}>💡 Dica: Clique no card para AVANÇAR o status na cozinha!</p>
                                    </div>
                                )}
                            </button>
                        </div>
                    );
                })
            )}
        </div>
    );
}
