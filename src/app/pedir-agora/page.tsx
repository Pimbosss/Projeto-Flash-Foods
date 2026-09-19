'use client'; // ⚠️ OBRIGATÓRIO: Lida com filtros, busca e clique do carrinho

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Roteador oficial do Next moderno
import { useCarrinho, Produto } from "@/context/CarrinhoContext"; // Importa seu novo carrinho global
import { FaLocationDot } from "react-icons/fa6";
import { api } from '@/services/api'
import './pedir_agora.css'

interface Restaurante {
    id: number;
    nome: string;
    categoria: string;
    nota: number;
    tempo: string;
    letra: string;
}

const restaurantes: Restaurante[] = [
    { id: 1, nome: "Pizza Express", categoria: "Pizza", nota: 4.8, tempo: "25-35 min", letra: "P" },
    { id: 2, nome: "Burger King", categoria: "Hambúrguer", nota: 4.6, tempo: "20-30 min", letra: "B" },
    { id: 3, nome: "Sushi House", categoria: "Japonesa", nota: 4.9, tempo: "30-40 min", letra: "S" },
    { id: 4, nome: "Café Delícia", categoria: "Bebida", nota: 4.7, tempo: "15-25 min", letra: "C" },
    { id: 5, nome: "Taco Loco", categoria: "Mexicana", nota: 4.5, tempo: "20-30 min", letra: "T" },
    { id: 6, nome: "Pasta & Cia", categoria: "Massas", nota: 4.8, tempo: "25-35 min", letra: "P" }
];

export default function PedirAgora() {
    const router = useRouter();
    const { adicionarAoCarrinho, quantidadeTotal } = useCarrinho();

    const [categoria, setCategoria] = useState("Todos");
    const [busca, setBusca] = useState("");
    const [restauranteSelecionado, setRestauranteSelecionado] = useState<Restaurante | null>(null);
    const [pratos, setPratos] = useState<Produto[]>([])

    useEffect(() => {
        api.get("/produtos")
            .then((resp) => {
                setPratos(resp.data);
            })
            .catch((err) => {
                console.error("Erro ao carregar o cardápio do json-server:", err);
            });
    }, []);


    const restaurantesFiltrados = restaurantes.filter((restaurante) => {
        const correspondeCategoria = categoria === "Todos" || restaurante.categoria === categoria;
        const correspondeBusca = restaurante.nome.toLowerCase().includes(busca.toLowerCase());
        return correspondeCategoria && correspondeBusca;
    });


    const pratosFiltrados = pratos.filter((prato: any) => {
        const correspondeCategoria = categoria === "Todos" || prato.categoria === categoria;
        const correspondeBusca = prato.nome.toLowerCase().includes(busca.toLowerCase());
        return correspondeCategoria && correspondeBusca;
    });

    const pratosDoRestaurante = pratosFiltrados.filter((prato: any) => {
        if (!restauranteSelecionado) return true;
        return prato.restaurante === restauranteSelecionado.nome;
    });

    return (
        <div className="Pedir-page">

            {/* 📍 SEÇÃO ENDEREÇO */}
            <div className="endereço">
                <FaLocationDot className="icone-localizacao" />
                <input
                    type="text"
                    id="endereço"
                    placeholder="Digite seu endereço de entrega..."
                />
                <button type="submit">Adicionar</button>
            </div>

            {/* 🔍 SEÇÃO BUSCA E FILTROS */}
            <div id="pratos-restaurantes">
                <input
                    type="text"
                    id="pratos"
                    placeholder="Buscar pratos ou restaurantes..."
                    value={busca}
                    onChange={(e) => setBusca(e.target.value)}
                />

                <div id="filtro-pratos">
                    {["Todos", "Pizza", "Hambúrguer", "Japonesa", "Bebida", "Mexicana", "Massas"].map((filtro) => (
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

            {/* 🏛️ GRID DE RESTAURANTES */}
            <div id="restaurantes2">
                <section id="restaurantes3">
                    <h1>Restaurantes</h1>
                    <div className="cards-restaurantes1">
                        {restaurantesFiltrados.map((restaurante) => (
                            <div
                                className={`card-restaurante ${restauranteSelecionado?.id === restaurante.id ? "card-ativo" : ""}`}
                                key={restaurante.id}
                                onClick={() => setRestauranteSelecionado(restaurante)}
                                style={{ cursor: "pointer" }}
                            >
                                <h1>{restaurante.letra}</h1>
                                <p><strong>{restaurante.nome}</strong></p>
                                <p>⭐ {restaurante.nota}</p>
                                <p>{restaurante.categoria}</p>
                                <p>◷ {restaurante.tempo}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </div>

            {/* 🍕 GRID DE PRATOS / CARDÁPIO */}
            <div className="pratos-container" style={{ maxWidth: "1200px", margin: "40px auto", padding: "0 20px" }}>
                <h2>{restauranteSelecionado ? `Cardápio: ${restauranteSelecionado.nome}` : "Pratos Disponíveis"}</h2>

                <div className="cards-pratos" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px", marginTop: "20px" }}>
                    {pratosDoRestaurante.map((prato) => (
                        <div key={prato.id} className="card-prato" style={{ border: "1px solid #dfe4eb", borderRadius: "12px", padding: "20px", background: "#fff", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                            <div>
                                <span style={{ fontSize: "32px" }}>{prato.imagem}</span>
                                <h3 style={{ margin: "10px 0 6px", color: "#071d3b" }}>{prato.nome}</h3>
                                <p style={{ fontSize: "14px", color: "#50627a", marginBottom: "12px" }}>{prato.descricao}</p>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "10px" }}>
                                <span style={{ fontWeight: "700", color: "#ff6600", fontSize: "18px" }}>
                                    R$ {prato.preco.toFixed(2)}
                                </span>
                                <button
                                    onClick={() => {
                                        adicionarAoCarrinho(prato);
                                    }}
                                    style={{ background: "#ff6600", color: "#fff", border: "none", padding: "8px 16px", borderRadius: "20px", fontWeight: "600", cursor: "pointer" }}
                                >
                                    + Adicionar
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
}
