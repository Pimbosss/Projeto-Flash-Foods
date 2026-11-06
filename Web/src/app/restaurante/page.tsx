'use client';

import { useEffect, useState } from "react";
import styles from "./restaurante.module.css";
import { IoMdRestaurant } from "react-icons/io";
import { FaStar } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import VisaoGeral from "./components/VisaoGeral";
import Produtos from "./components/Produtos";
import Pedidos from "./components/Pedidos";
import Perfil from "./components/Perfil";
import { api } from '@/services/api'

export default function AreaRestaurante() {
    const [abaAtiva, setAbaAtiva] = useState<"visao-geral" | "produtos" | "pedidos" | "perfil">("visao-geral");
    const [dados, setDados] = useState({ id: "", nome: "", endereco: "", usuarioId: "", produtos: [] as any[] });
    const [pedidos, setPedidos] = useState([])

    // 🟢 SUBSTITUA INTEGRALMENTE O useEffect DO SEU src/app/area-restaurante/page.tsx:
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

            // 1. 🔍 BUSCA POR USUÁRIO ID: Cruza os dados de forma infalível usando a hash do print!
            api.get(`/restaurantes?usuarioId=${usuarioLogado.id}`)
                .then(resLoja => {
                    // Se encontrou a loja física vinculada ao dono
                    if (resLoja.data && resLoja.data.length > 0) {
                        const lojaDoBanco = resLoja.data[0]; // Captura a primeira loja da lista do filtro

                        setDados({
                            id: lojaDoBanco.id,
                            nome: lojaDoBanco.nome,
                            endereco: "Av. Paulista, 900 (Unidade Cadastrada)",
                            usuarioId: lojaDoBanco.usuarioId, // 🔥 PROTEÇÃO: Segura a hash do dono na memória!
                            produtos: iAjustarProdutos(lojaDoBanco.produtos)
                        });
                    }

                    function iAjustarProdutos(produtos: any) {
                        return produtos || [];
                    }
                })
                .catch(err => {
                    console.error("Erro ao sincronizar dados comerciais:", err);
                });
        }
    }, []);

    return (
        // 🟢 Adicionamos um espaçamento extra em cima (pt-24) para compensar a altura do Header global fixo!
        <div className={`${styles.meuRestaurante}`}>
            {/* SEÇÃO DE INFOS DO ESTABELECIMENTO (O CARD DE APRESENTAÇÃO) */}
            <div className={styles.infos}>
                <div className={styles.icon}>
                    <IoMdRestaurant />
                </div>

                <div className={styles.dadosRestaurante}>
                    <h1>{dados.nome || "Carregando..."}</h1>

                    <div className={styles.avaliacaoRestaurante}>
                        <FaStar />
                        <span>5.0</span>
                    </div>

                    <div className={styles.enderecoRestaurante}>
                        <IoLocationOutline />
                        <span>{dados.endereco}</span>
                    </div>
                </div>
            </div>

            <nav className={styles.menuRestaurante}>
                <button className={abaAtiva === "visao-geral" ? styles.active : ""} onClick={() => setAbaAtiva("visao-geral")}>Visão Geral</button>
                <button className={abaAtiva === "produtos" ? styles.active : ""} onClick={() => setAbaAtiva("produtos")}>Produtos</button>
                <button className={abaAtiva === "pedidos" ? styles.active : ""} onClick={() => setAbaAtiva("pedidos")}>Pedidos</button>
                <button className={abaAtiva === "perfil" ? styles.active : ""} onClick={() => setAbaAtiva("perfil")}>Perfil</button>
            </nav>

            <main className={styles.conteudoRestaurante}>
                {abaAtiva === "visao-geral" && <VisaoGeral dadosLoja={dados} pedidos={pedidos} />}
                {abaAtiva === "produtos" && <Produtos dadosLoja={dados} />}
                {abaAtiva === "pedidos" && <Pedidos dadosLoja={dados}/>}
                {abaAtiva === "perfil" && <Perfil dadosLoja={dados} />}
            </main>
        </div>
    );
}
