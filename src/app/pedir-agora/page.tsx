'use client';

import { FaLocationDot } from "react-icons/fa6";
import './pedir_agora.css';
import usePedirAgora from "./hooks/usePedirAgora";


export default function PedirAgora() {

    const {
        categoria,
        setCategoria,
        busca,
        setBusca,
        restaurantesFiltrados,
        restauranteSelecionado,
        setRestauranteSelecionado,
        pratosDoCardapio,
        adicionarAoCarrinho,
    } = usePedirAgora();


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
