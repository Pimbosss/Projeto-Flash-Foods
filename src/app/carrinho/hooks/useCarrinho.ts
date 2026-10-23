'use client';

import { useRouter } from "next/navigation";
import { useCarrinho } from "@/context/CarrinhoContext";
import { api } from "@/services/api";

export default function useCarrinhoPage() {
    const router = useRouter();
    
    const {
        carrinho,
        aumentarQuantidade,
        diminuirQuantidade,
        removerDoCarrinho,
        valorTotal
    } = useCarrinho();

    async function lidarComFinalizarPedido() {
        const sessao = localStorage.getItem("flashfoods:user");
        
        if (!sessao) {
            alert("Para finalizar o pedido, por favor faça login ou cadastre-se antes! 🔐");
            router.push("/login");
            return;
        }

        const usuarioLogado = JSON.parse(sessao);
        const primeiroItem = carrinho[0]; 

        const novoPedido = {
            usuarioId: usuarioLogado.id,
            usuarioNome: usuarioLogado.name,
            itens: carrinho, 
            subtotal: valorTotal,
            taxaEntrega: 5.00,
            total: valorTotal + 5.00,
            status: "pendente", 
            data: new Date().toLocaleString("pt-BR"),
            endereco: "Rua das Flores, 123 (Simulado)", 
            restauranteId: primeiroItem?.restauranteId || "rest_default",
            restaurante: primeiroItem?.nomeRestaurante || primeiroItem?.restaurante || "Restaurante Parceiro"
        };

        try {
            await api.post("/pedidos", novoPedido);
            alert("Pedido finalizado com sucesso! 🍔🔥 Seu lanche começou a ser preparado.");
            
            carrinho.forEach(item => removerDoCarrinho(item.id));
            
            router.push("/");
        } catch (error) {
            console.error("Erro ao enviar pedido para o servidor:", error);
            alert("Ocorreu um erro ao conectar com o servidor simulado. Tente novamente.");
        }
    }

    return {
        router,
        carrinho,
        valorTotal,
        aumentarQuantidade,
        diminuirQuantidade,
        removerDoCarrinho,
        lidarComFinalizarPedido
    };
}
