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
    status: "pendente" | "preparando" | "a caminho" | "concluido"; //  ADICIONADO: status "preparando" no contrato
    data: string;
    restaurante?: string;
    restauranteId?: string; //  Vinculo relacional
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

    const [pedidosBanco, setPedidosBanco] = useState<PedidoReal[]>([]);
    const [entregaAtual, setEntregaAtual] = useState<PedidoReal | null>(null);
    const [gpsVisivel, setGpsVisivel] = useState(true);
    const [ganhosHoje, setGanhosHoje] = useState(0);
    const [entregasTotais, setEntregasTotais] = useState(0);
    const [ganhosOntem, setGanhosOntem] = useState(0);
    const [tempoTotal, setTempoTotal] = useState(0);
    const [inicioOnline, setInicioOnline] = useState(Date.now());

    const diferencaOntem = ganhosHoje - ganhosOntem;

    const carregarCorridasDisponiveis = () => {
        api.get("/pedidos")
            .then((resp) => {
                const listaGeral = resp.data || [];

                // 🟢 Localize e ajuste INTEGRALMENTE o bloco da pedidosAdaptados dentro do seu useAreaEFunctions.ts:
                const pedidosAdaptados = listaGeral.map((p: any) => {
                    const kmCalculado = p.distancia
                        ? Number(p.distancia.replace(" km", "").replace(",", "."))
                        : Number((Math.random() * 4.3 + 1.2).toFixed(1));

                    const ganhoCorrida = 6.00 + (kmCalculado * 3.00);
                    const valorDinamic = `R$ ${ganhoCorrida.toFixed(2).replace(".", ",")}`;

                    return {
                        ...p, // Espelha tudo o que já veio do db.json
                        status: p.status, //  LINHA DE OURO: Garante que o status original ("pendente", "preparando") passe para o filtro!
                        restaurante: p.restaurante || (p.itens?.[0]?.nome ? `Restaurante ${p.itens[0].nome.split(' ')[0]}` : "Flash Foods Store"),
                        endereco: p.endereco || "Rua das Flores, 123 (Simulado)",
                        enderecoRestaurante: "Av. Paulista, 900 (Simulado)",
                        distancia: p.distancia || `${kmCalculado.toFixed(1).replace(".", ",")} km`,
                        tempo: p.tempo || `${Math.floor(kmCalculado * 5)} min`,
                        valor: p.valor || valorDinamic
                    };
                });


                // 🟢 FILTRO DE OURO: O entregador enxerga a corrida APENAS se a cozinha estiver "preparando" ou se o lanche já estiver "a caminho"!
                const corridasFiltradas = pedidosAdaptados.filter((p: any) =>
                    p.status === "preparando" || p.status === "a caminho"
                );

                setPedidosBanco(corridasFiltradas);
            })
            .catch((err) => console.error("Erro ao puxar pedidos:", err));
    };

    useEffect(() => {
        if (typeof window !== "undefined") {
            const sessao = localStorage.getItem("flashfoods:user");

            if (!sessao) {
                alert("Acesso negado! Por favor, faça login para acessar o painel do entregador. 🔐");
                window.location.href = "/login";
                return;
            }

            const usuarioLogado = JSON.parse(sessao);

            if (usuarioLogado.tipo !== "entregador") {
                alert("⚠️ Acesso Negado! Esta área é exclusiva para entregadores parceiros cadastrados.");
                window.location.href = "/";
                return;
            }
        }

        carregarCorridasDisponiveis();
    }, [entregaAtual]);

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

    // 🟢 CONECTADO OPERACIONALMENTE: Força o status a travar como "a caminho" sinalizando que a moto aceitou o frete!
    function aceitarEntrega(entrega: PedidoReal) {
        if (!online || entregaAtual) return;

        const pacoteAtualizado = {
            ...entrega,
            status: "a caminho" as const // Mantém fixado que o motoca está se deslocando
        };

        api.put(`/pedidos/${entrega.id}`, pacoteAtualizado)
            .then(() => {
                setEntregaAtual(pacoteAtualizado);
                setGpsVisivel(true);
                alert("Corrida aceita com sucesso! Dirija-se ao estabelecimento para coletar o lanche. 🏍️💨");
            })
            .catch((err) => {
                console.error("Erro Axios ao aceitar corrida:", err);
                alert("Erro ao aceitar corrida no servidor.");
            });
    }

    function finalizarEntrega() {
        if (!entregaAtual) return;

        const pacoteFinalizado = {
            ...entregaAtual,
            status: "concluido" as const // Fecha a ordem de compra como entregue de vez!
        };

        api.put(`/pedidos/${entregaAtual.id}`, pacoteFinalizado)
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
        entregas: pedidosBanco,
        setOnline,
        setGpsVisivel,
        alterarStatus,
        formatarTempo,
        aceitarEntrega,
        resetarTudo,
        finalizarEntrega
    };
}
