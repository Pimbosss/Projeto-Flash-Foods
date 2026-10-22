'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCarrinho } from "@/context/CarrinhoContext";
import { FaLocationDot } from "react-icons/fa6";
import { api } from '@/services/api';
import './pedir_agora.css';

interface RestauranteBanco {
    id: string;
    nome: string;
    categoria: string;
    cnpj?: string;
    produtos: any[];
}

export default function PedirAgora() {
    const router = useRouter();
    const { adicionarAoCarrinho } = useCarrinho();

    const [categoria, setCategoria] = useState("Todos");
    const [busca, setBusca] = useState("");

    const [restaurantes, setRestaurantes] = useState<RestauranteBanco[]>([]);
    const [restauranteSelecionado, setRestauranteSelecionado] = useState<RestauranteBanco | null>(null);

    useEffect(() => {
        api.get("/restaurantes")
            .then((resp) => {
                setRestaurantes(resp.data || []);
            })
            .catch((err) => {
                console.error("Erro ao carregar restaurantes do json-server:", err);
            });
    }, []);

     // 🟢 1. FILTRO DE RESTAURANTES DE ALTA INTELIGÊNCIA COM SUPORTE A SINÔNIMOS
    const restaurantesFiltrados = restaurantes.filter((restaurante) => {
        const correspondeBusca = restaurante.nome.toLowerCase().includes(busca.toLowerCase());
        if (!correspondeBusca) return false;

        if (categoria === "Todos") return true;

        const catLojaLimpa = restaurante.categoria 
            ? restaurante.categoria.normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim().toLowerCase() 
            : "";
        
        const catBotaoLimpa = categoria.normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim().toLowerCase();

        // Linha de defesa 1: Se o campo existir e bater textualmente
        if (catLojaLimpa && (catLojaLimpa.includes(catBotaoLimpa) || catBotaoLimpa.includes(catLojaLimpa))) {
            return true;
        }

        // Ajuste de Sinônimos para a Categoria da Loja (ex: Se a loja for Hamburgueria ou vender Lanches)
        if (catBotaoLimpa.includes("hamb") && (catLojaLimpa.includes("lanche") || restaurante.nome.toLowerCase().includes("hamburguer"))) {
            return true;
        }

        // Linha de defesa 2: Espiona o cardápio interno lendo o campo .tipo do produto
        const listaPratosInternos = restaurante.produtos || [];
        const vendeItemDaCategoria = listaPratosInternos.some((prato: any) => {
            if (prato.ativo === false) return false;
            
            const tipoPratoLimpo = prato.tipo ? prato.tipo.normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim().toLowerCase() : "";
            
            // 🔥 DICIONÁRIO DE SINÔNIMOS DA COZINHA: Casamento perfeito de "Lanches" com "Hambúrguer"
            if (tipoPratoLimpo.includes("hamb") && (tipoPratoLimpo.includes("lanche") || tipoPratoLimpo.includes("hamb"))) {
                return true;
            }
            if (tipoPratoLimpo.includes("beb") && (tipoPratoLimpo.includes("beb") || tipoPratoLimpo.includes("refri") || tipoPratoLimpo.includes("suco"))) {
                return true;
            }

            return tipoPratoLimpo.includes(catBotaoLimpa) || catBotaoLimpa.includes(tipoPratoLimpo);
        });

        return vendeItemDaCategoria;
    });

    // 🍕 2. FILTRO DE PRATOS UNIVERSAL COM COMPATIBILIDADE DE CATEGORIAS
    const pratosDoCardapio = (() => {
        let listaBrutaPratos: any[] = [];

        if (restauranteSelecionado) {
            listaBrutaPratos = (restauranteSelecionado.produtos || []).map(p => ({
                ...p,
                restauranteId: restauranteSelecionado.id,
                nomeRestaurante: restauranteSelecionado.nome
            }));
        } else {
            restaurantesFiltrados.forEach((loja) => {
                const pratosDaLoja = (loja.produtos || []).map(p => ({
                    ...p,
                    restauranteId: loja.id,
                    nomeRestaurante: loja.nome
                }));
                listaBrutaPratos.push(...pratosDaLoja);
            });
        }

        return listaBrutaPratos.filter((prato: any) => {
            if (prato.ativo === false) return false; 
            
            if (categoria !== "Todos") {
                const tipoPratoLimpo = prato.tipo ? prato.tipo.normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim().toLowerCase() : "";
                const filtroBotaoLimpo = categoria.normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim().toLowerCase();

                let bateuFiltro = tipoPratoLimpo.includes(filtroBotaoLimpo) || filtroBotaoLimpo.includes(filtroBotaoLimpo);

                // 🔥 PROTEÇÃO ABSOLUTA: Força o botão Hambúrguer a aceitar e listar os pratos salvos como "Lanches"!
                if (filtroBotaoLimpo.includes("hamb") && (tipoPratoLimpo.includes("lanche") || tipoPratoLimpo.includes("hamb"))) {
                    bateuFiltro = true;
                }
                if (filtroBotaoLimpo.includes("beb") && (tipoPratoLimpo.includes("beb") || tipoPratoLimpo.includes("refri") || tipoPratoLimpo.includes("suco"))) {
                    bateuFiltro = true;
                }

                if (!bateuFiltro) return false;
            }

            return prato.nome.toLowerCase().includes(busca.toLowerCase());
        });
    })();


    return (
        <div className="Pedir-page">

            {/* 📍 SEÇÃO ENDEREÇO */}
            <div className="endereço">
                <FaLocationDot className="icone-localizacao" />
                <input type="text" id="endereço" placeholder="Digite seu endereço de entrega..." />
                <button type="submit">Adicionar</button>
            </div>

            {/* 🔍 SEÇÃO BUSCA E FILTROS */}
            <div id="pratos-restaurantes">
                <input
                    type="text"
                    id="pratos"
                    placeholder="Buscar pratos ou restaurantes do cardápio..."
                    value={busca}
                    onChange={(e) => setBusca(e.target.value)}
                />

                <div id="filtro-pratos">
                    {["Todos", "Pizza", "Hambúrguer", "Japonesa", "Bebidas", "Sobremesas", "Salgados"].map((filtro) => (
                        <button
                            key={filtro}
                            className={categoria === filtro ? "filtro-ativo" : ""}
                            onClick={() => {
                                setCategoria(filtro);
                                setRestauranteSelecionado(null);
                            }}
                        >
                            {filtro}
                        </button>
                    ))}

                    <button
                        className="limpar-filtros"
                        onClick={() => {
                            setCategoria("Todos");
                            setBusca("");
                            setRestauranteSelecionado(null);
                        }}
                    >
                        Limpar filtros
                    </button>
                </div>
            </div>

            {/* 🏛️ GRID DE RESTAURANTES DISPONÍVEIS */}
            <div id="restaurantes2">
                <section id="restaurantes3">
                    <h1>Restaurantes Disponíveis ({categoria})</h1>
                    <div className="cards-restaurantes1">
                        {restaurantesFiltrados.length === 0 ? (
                            <p className="aviso-vazio">Nenhum estabelecimento ativo nesta categoria. 🏪</p>
                        ) : (
                            restaurantesFiltrados.map((restaurante) => (
                                <div
                                    className={`card-restaurante ${restauranteSelecionado?.id === restaurante.id ? "card-ativo" : ""}`}
                                    key={restaurante.id}
                                    onClick={() => setRestauranteSelecionado(restaurante)}
                                    style={{ cursor: "pointer" }} // Mantido apenas o cursor pointer interativo
                                >
                                    <h1>{restaurante.nome.charAt(0).toUpperCase()}</h1>
                                    <p><strong>{restaurante.nome}</strong></p>
                                    <p>⭐ 5.0</p>
                                    <p>{restaurante.categoria}</p>
                                    <p>◷ 20-30 min</p>
                                </div>
                            ))
                        )}
                    </div>
                </section>
            </div>

            {/* 🍕 GRID DE PRATOS DO CARDÁPIO UNIFICADO (100% LIMPO DE STYLES INLINE) */}
            <div className="pratos-container">
                <h2>{restactTituloCardapio(restauranteSelecionado, categoria)}</h2>

                <div className="cards-pratos">
                    {pratosDoCardapio.length === 0 ? (
                        <p className="aviso-vazio">Nenhum prato disponível para os filtros selecionados. 🍽️</p>
                    ) : (
                        pratosDoCardapio.map((prato: any) => {
                            const precoNumerico = typeof prato.preco === "string"
                                ? Number(prato.preco.replace(",", "."))
                                : prato.preco;

                            return (
                                <div key={prato.id} className="card-prato">
                                    <div>
                                        <span>🍔</span>
                                        <h3>{prato.nome}</h3>
                                        <p className="nome-restaurante-tag">🏪 {prato.nomeRestaurante}</p>
                                        <p>{prato.descricao}</p>
                                    </div>
                                    <div className="rodape-prato">
                                        <span className="preco-prato">
                                            R\$ {isNaN(precoNumerico) ? "0,00" : precoNumerico.toFixed(2).replace(".", ",")}
                                        </span>
                                        <button
                                            className="btn-adicionar-sacola"
                                            onClick={() => {
                                                adicionarAoCarrinho({
                                                    ...prato,
                                                    restauranteId: prato.restauranteId,
                                                    nomeRestaurante: prato.nomeRestaurante
                                                });
                                                alert(`${prato.nome} adicionado ao seu carrinho! 🛒`);
                                            }}
                                        >
                                            + Adicionar
                                        </button>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>

        </div>
    );
}

function restactTituloCardapio(selecionado: any, categoriaAtiva: string) {
    if (selecionado) return `Cardápio: ${selecionado.nome}`;
    if (categoriaAtiva === "Todos") return "Destaques do Dia";
    return `Pratos na Categoria: ${categoriaAtiva}`;
}
