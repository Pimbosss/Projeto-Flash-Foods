'use client';

import { useState, useEffect } from "react";
import { api } from '@/services/api';

export interface DadosLoja {
    id: string;
    nome: string;
    endereco: string;
    usuarioId: string;
    produtos: any[];
}

export default function useAreaRestaurante() {
    const [abaAtiva, setAbaAtiva] = useState<"visao-geral" | "produtos" | "pedidos" | "perfil" >("visao-geral");
    const [dados, setDados] = useState<DadosLoja>({ id: "", nome: "", endereco: "", usuarioId: "", produtos: [] });
    const [pedidos, setPedidos] = useState([]);

    // 🔒 TRAVA DE SEGURANÇA E BUSCA RELACIONAL DA LOJA
    useEffect(() => {
        if (typeof window !== "undefined") {
            const sessao = localStorage.getItem("flashfoods:user");

            if (!sessao) {
                alert("Acesso negado! Faça login para gerenciar o restaurante. 🔐");
                window.location.href = "/login";
                return;
            }

            const usuarioLogado = JSON.parse(sessao);
            if (usuarioLogado.tipo !== "restaurante") {
                alert("⚠️ Acesso Negado! Esta área é exclusiva para estabelecimentos parceiros.");
                window.location.href = "/";
                return;
            }

            // 🔍 BUSCA POR USUÁRIO ID: Cruza os dados buscando a loja física vinculada ao dono
            api.get(`/restaurantes?usuarioId=${usuarioLogado.id}`)
                .then(resLoja => {
                    if (resLoja.data && resLoja.data.length > 0) {
                        const lojaDoBanco = resLoja.data[0];

                        setDados({
                            id: lojaDoBanco.id,
                            nome: lojaDoBanco.nome,
                            endereco: lojaDoBanco.endereco,
                            usuarioId: lojaDoBanco.usuarioId,
                            produtos: lojaDoBanco.produtos || []
                        });
                    }
                })
                .catch(err => {
                    console.error("Erro ao sincronizar dados comerciais:", err);
                });
        }
    }, []);

    return {
        abaAtiva,
        setAbaAtiva,
        dados,
        pedidos
    };
}
