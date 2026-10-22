'use client';
import { useState, useEffect } from 'react'
import { api } from '@/services/api'
import { FiClock, FiCheckCircle, FiShoppingBag } from "react-icons/fi";

interface Pedido {
    id: string;
    usuarioId: string;
    usuarioNome: string;
    itens: Array<{
        id: string;
        nome: string;
        quantidade: number;
        precoUnitario: number;
    }>;
    subtotal: number;
    taxaEntrega: number;
    total: number;
    status: string;
    data: string;
    valor?: string;
}


export default function HistoricoPedido() {
    const [pedidos, setPedidos] = useState<Pedido[]>([])
    const [carregando, setCarregando] = useState(true)
    const [tipoUsuario, setTipoUsuario] = useState<string>('cliente')

    useEffect(() => {
        const sessao = localStorage.getItem('flashfoods:user')
        if (!sessao) {
            setCarregando(false)
            return
        }

        const usuarioLogado = JSON.parse(sessao)
        const role = usuarioLogado.tipo || 'cliente'
        setTipoUsuario(role)

        api.get('/pedidos')
            .then(resp => {
                const todosOsPedidos = resp.data

                if (role === "entregador") {
                    // O entregador vê as corridas que ele mesmo finalizou na área do entregador
                    setPedidos(todosOsPedidos.filter((p: any) => p.status === "concluido"));
                } else {
                    // O cliente comum vê apenas as compras feitas pelo ID dele
                    setPedidos(todosOsPedidos.filter((p: any) => p.usuarioId === usuarioLogado.id));
                }
            })
            .catch((err) => console.error("Erro ao carregar historico", err))
            .finally(() => setCarregando(false))
    }, [])

    if (carregando) {
        return <p style={{ color: "#64748b", fontSize: "14px" }}>Carregando histórico de pedidos...</p>;
    }

    return (
        <div style={{ marginTop: "32px", borderTop: "1px solid #e2e8f0", paddingTop: "32px" }}>
            <h2 style={{ color: "#0f172a", fontSize: "20px", fontWeight: "800", marginBottom: "20px", display: "flex", alignItems: "center", gap: "8px" }}>
                <FiShoppingBag style={{ color: "#ff6600" }} />
                {tipoUsuario === "entregador" ? "Histórico de Corridas Concluídas" : "Meus Pedidos Recentes"}
            </h2>

            {pedidos.length === 0 ? (
                <div style={{ background: "#f8fafc", padding: "30px", borderRadius: "12px", textAlign: "center", border: "1px dashed #cbd5e1" }}>
                    <p style={{ color: "#64748b", fontSize: "14px", margin: 0 }}>
                        {tipoUsuario === "entregador"
                            ? "Você ainda não concluiu nenhuma entrega hoje. 🏍️"
                            : "Você ainda não realizou nenhum pedido no Flash Foods. 🍔"}
                    </p>
                </div>
            ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    {pedidos.map((pedido) => (
                        <div key={pedido.id} style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "20px", boxShadow: "0 2px 4px rgba(0,0,0,0.01)" }}>

                            {/* Cabeçalho do Card de Histórico */}
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                                <div>
                                    <span style={{ fontSize: "14px", fontWeight: "700", color: "#0f172a" }}>Pedido #{pedido.id}</span>
                                    <span style={{ fontSize: "12px", color: "#64748b", marginLeft: "12px" }}>{pedido.data}</span>
                                </div>
                                <span style={{
                                    backgroundColor: pedido.status === "concluido" ? "#ecfdf5" : "#fff7ed",
                                    color: pedido.status === "concluido" ? "#10b981" : "#f97316",
                                    padding: "4px 10px", borderRadius: "20px", fontSize: "12px", fontWeight: "700", display: "flex", alignItems: "center", gap: "4px"
                                }}>
                                    {pedido.status === "concluido" ? <FiCheckCircle /> : <FiClock />}
                                    {pedido.status.toUpperCase()}
                                </span>
                            </div>

                            {/* Lista de Itens Comprados */}
                            <div style={{ marginBottom: "12px" }}>
                                {pedido.itens?.map((item, index) => (
                                    <p key={index} style={{ margin: "4px 0", fontSize: "14px", color: "#334155" }}>
                                        <strong style={{ color: "#ff6600" }}>{item.quantidade}x</strong> {item.nome}
                                    </p>
                                ))}
                            </div>

                            {/* Rodapé com o Valor Pago Total */}
                            <div style={{ borderTop: "1px dashed #f1f5f9", paddingTop: "12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <span style={{ fontSize: "13px", color: "#64748b" }}>
                                    {tipoUsuario === "entregador" ? "Valor recebido da corrida:" : "Total pago com entrega:"}
                                </span>
                                <strong style={{ fontSize: "16px", color: "#10b981" }}>
                                    R$ {tipoUsuario === "entregador"
                                        ? // 🏍️ Para o entregador, exibe o valor calculado da corrida (ou a taxa de segurança)
                                        (pedido.valor ? pedido.valor.replace("R$", "").trim() : "15,50")
                                        : // 🍔 Para o cliente, exibe o total da compra (comida + taxa)
                                        pedido.total.toFixed(2).replace(".", ",")}
                                </strong>
                            </div>

                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
