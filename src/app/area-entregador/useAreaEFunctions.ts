'use client';

import { useEffect, useState } from "react";
import { api } from "@/services/api";


export interface PedidoReal {
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
    status: "pendente" | "a caminho" | "concluido";
    data: string;
    restaurante?: string;
    endereco?: string;
    enderecoRestaurante?: string;
    distancia?: string;
    tempo?: string;
    valor?: string;
}

export default function useAreaEFunctions() {
    const [online, setOnline] = useState<boolean>(() => {
        if (typeof window !== "undefined") {
            const statusSalvo = localStorage.getItem("flashfoods:online");
            return statusSalvo === null ? true : statusSalvo === "true";
        }
        return true;
    });

    // 🟢 LISTA REAL: Guarda os pedidos vindos do db.json
    const [pedidosBanco, setPedidosBanco] = useState<PedidoReal[]>([]);
    const [entregaAtual, setEntregaAtual] = useState<PedidoReal | null>(null);
    const [gpsVisivel, setGpsVisivel] = useState(true);
    const [ganhosHoje, setGanhosHoje] = useState(0);
    const [entregasTotais, setEntregasTotais] = useState(0);
    const [ganhosOntem, setGanhosOntem] = useState(0);
    const [tempoTotal, setTempoTotal] = useState(0);
    const [inicioOnline, setInicioOnline] = useState(Date.now());

    const diferencaOntem = ganhosHoje - ganhosOntem;


    useEffect(() => {
        if (typeof window !== "undefined") {
        const sessao = localStorage.getItem("flashfoods:user");
        
        if (!sessao) {
            alert("Acesso negado! Por favor, faça login para acessar o painel do entregador. 🔐");
            window.location.href = "/login";
            return;
        }

        const usuarioLogado = JSON.parse(sessao);
        
        // Se o tipo for diferente de entregador, bloqueia a entrada e chuta de volta para a Home!
        if (usuarioLogado.tipo !== "entregador") {
            alert("⚠️ Acesso Negado! Esta área é exclusiva para entregadores parceiros cadastrados.");
            window.location.href = "/";
            return;
        }
    }

        api.get("/pedidos")
            .then((resp) => {
                // Filtra e adapta os dados para o layout do grupo
                const pedidosAdaptados = resp.data.map((p: any) => ({
                    ...p,
                    // Injeta valores visuais simulados baseados no pedido real caso faltem
                    restaurante: p.itens[0]?.nome ? `Restaurante ${p.itens[0].nome.split(' ')[0]}` : "Pizza Express",
                    endereco: "Rua das Flores, 123 (Simulado)",
                    enderecoRestaurante: "Av. Paulista, 900 (Simulado)",
                    distancia: `${(Math.random() * 3 + 1).toFixed(1)} km`,
                    tempo: `${Math.floor(Math.random() * 15 + 10)} min`,
                    valor: `R$ ${p.taxaEntrega ? (p.taxaEntrega + 10).toFixed(2).replace(".", ",") : "15,50"}`
                }));

                // Exibe na lista apenas os pedidos que ainda estão "pendentes"
                setPedidosBanco(pedidosAdaptados.filter((p: any) => p.status === "pendente"));
            })
            .catch((err) => console.error("Erro ao puxar pedidos:", err));
    }, [entregaAtual]); // Recarrega a lista sempre que o entregador aceitar/finalizar uma corrida

    useEffect(() => {
        if (!online) return;
        const intervalo = setInterval(() => {
            setTempoTotal(Date.now() - inicioOnline);
        }, 1000);
        return () => clearInterval(intervalo);
    }, [online, inicioOnline]);

    function resetarTudo() {
        setGanhosHoje(0);
        setEntregasTotais(0);
        setGanhosOntem(0);
        setTempoTotal(0);
    }

    function alterarStatus() {
        if (online) {
            setOnline(false);
            localStorage.setItem("flashfoods:online", "false");
        } else {
            setOnline(true);
            localStorage.setItem("flashfoods:online", "true");
            setInicioOnline(Date.now() - tempoTotal);
        }
    }

    function formatarTempo(tempo: number) {
        const segundosTotais = Math.floor(tempo / 1000);
        const horas = Math.floor(segundosTotais / 3600);
        const minutos = Math.floor((segundosTotais % 3600) / 60);
        const segundos = segundosTotais % 60;
        return `${String(horas).padStart(2, "0")}:${String(minutos).padStart(2, "0")}:${String(segundos).padStart(2, "0")}`;
    }

    // 🟢 CONECTADO: Altera o status do pedido para "a caminho" no db.json
    function aceitarEntrega(entrega: PedidoReal) {
        if (!online || entregaAtual) return;

        api.put(`/pedidos/${entrega.id}`, { ...entrega, status: "a caminho" })
            .then(() => {
                setEntregaAtual({ ...entrega, status: "a caminho" });
                setGpsVisivel(true);
                alert("Corrida aceita! Siga para o restaurante. 🏍️💨");
            })
            .catch((err) => alert("Erro ao aceitar corrida no servidor."));
    }

    // 🟢 CONECTADO: Altera o status para "concluido" e soma os ganhos reais
    function finalizarEntrega() {
        if (!entregaAtual) return;

        api.put(`/pedidos/${entregaAtual.id}`, { ...entregaAtual, status: "concluido" })
            .then(() => {
                const valorEntrega = Number(
                    (entregaAtual.valor || "R\$ 15,50")
                        .replace("R\$", "")
                        .replace(".", "")
                        .replace(",", ".")
                        .trim()
                );

                setGanhosHoje(prev => prev + valorEntrega);
                setEntregasTotais(prev => prev + 1);
                setEntregaAtual(null);
                setGpsVisivel(false);
                alert("Entrega concluída com sucesso! Dinheiro na conta. 🎉💰");
            })
            .catch((err) => alert("Erro ao finalizar entrega no servidor."));
    }

    return {
        online,
        entregaAtual,
        gpsVisivel,
        ganhosHoje,
        entregasTotais,
        ganhosOntem,
        diferencaOntem,
        tempoTotal,
        inicioOnline,
        entregas: pedidosBanco, // Substitui a lista fixa pela lista real filtrada do banco!
        setOnline,
        setGpsVisivel,
        alterarStatus,
        formatarTempo,
        aceitarEntrega,
        resetarTudo,
        finalizarEntrega
    };
}
