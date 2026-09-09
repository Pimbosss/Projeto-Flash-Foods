import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCarrinho } from "./CarrinhoContext";
import "./Pedir-agora.css";
import { FaLocationDot } from "react-icons/fa6";
import { Link } from "react-router-dom";

const restaurantes = [
    {
        id: 1,
        nome: "Pizza Express",
        categoria: "Pizza",
        nota: 4.8,
        tempo: "25-35 min",
        letra: "P"
    },
    {
        id: 2,
        nome: "Burger King",
        categoria: "Hambúrguer",
        nota: 4.6,
        tempo: "20-30 min",
        letra: "B"
    },
    {
        id: 3,
        nome: "Sushi House",
        categoria: "Japonesa",
        nota: 4.9,
        tempo: "30-40 min",
        letra: "S"
    },
    {
        id: 4,
        nome: "Café Delícia",
        categoria: "Bebida",
        nota: 4.7,
        tempo: "15-25 min",
        letra: "C"
    },
    {
        id: 5,
        nome: "Taco Loco",
        categoria: "Mexicana",
        nota: 4.5,
        tempo: "20-30 min",
        letra: "T"
    },
    {
        id: 6,
        nome: "Pasta & Cia",
        categoria: "Massas",
        nota: 4.8,
        tempo: "25-35 min",
        letra: "P"
    }
];

const pratos = [
    {
        id: 1,
        nome: "Pizza Margherita",
        restaurante: "Pizza Express",
        categoria: "Pizza",
        descricao: "Molho de tomate, mussarela e manjericão",
        preco: 42.90,
        nota: 4.9,
        letra: "P"
    },
    {
        id: 2,
        nome: "Pizza Calabresa",
        restaurante: "Pizza Express",
        categoria: "Pizza",
        descricao: "Molho de tomate, mussarela e calabresa",
        preco: 45.90,
        nota: 4.8,
        letra: "P"
    },
    {
        id: 3,
        nome: "Whopper",
        restaurante: "Burger King",
        categoria: "Hambúrguer",
        descricao: "Hambúrguer grelhado com queijo, alface e tomate",
        preco: 28.90,
        nota: 4.7,
        letra: "W"
    },
    {
        id: 4,
        nome: "Combo Sushi",
        restaurante: "Sushi House",
        categoria: "Japonesa",
        descricao: "20 peças variadas de sushi e sashimi",
        preco: 89.90,
        nota: 4.9,
        letra: "C"
    },
    {
        id: 5,
        nome: "Cappuccino",
        restaurante: "Café Delícia",
        categoria: "Bebida",
        descricao: "Café expresso com leite vaporizado",
        preco: 12.90,
        nota: 4.6,
        letra: "C"
    },
    {
        id: 6,
        nome: "Tacos Mexicanos",
        restaurante: "Taco Loco",
        categoria: "Mexicana",
        descricao: "Trio de tacos com carne, guacamole e salsa",
        preco: 35.90,
        nota: 4.5,
        letra: "T"
    },
    {
        id: 7,
        nome: "Lasanha Bolonhesa",
        restaurante: "Pasta & Cia",
        categoria: "Massas",
        descricao: "Lasanha tradicional com molho bolonhesa",
        preco: 38.90,
        nota: 4.7,
        letra: "L"
    },
    {
        id: 8,
        nome: "Carbonara",
        restaurante: "Pasta & Cia",
        categoria: "Massas",
        descricao: "Massa com bacon, ovos e queijo parmesão",
        preco: 42.90,
        nota: 4.8,
        letra: "C"
    }
];

export default function Pedir() {
    const navigate = useNavigate();

    const {
        adicionarAoCarrinho,
        quantidadeTotal
    } = useCarrinho();

    const [categoria, setCategoria] = useState("Todos");
    const [busca, setBusca] = useState("");
    const [restauranteSelecionado, setRestauranteSelecionado] = useState(null);

    const restaurantesFiltrados = restaurantes.filter((restaurante) => {
        const correspondeCategoria =
            categoria === "Todos" ||
            restaurante.categoria === categoria;

        const correspondeBusca =
            restaurante.nome
                .toLowerCase()
                .includes(busca.toLowerCase());

        return correspondeCategoria && correspondeBusca;
    });

    const pratosFiltrados = pratos.filter((prato) => {
        const correspondeCategoria =
            categoria === "Todos" ||
            prato.categoria === categoria;


        const correspondeBusca =
            prato.nome.toLowerCase().includes(busca.toLowerCase()) ||
            prato.restaurante.toLowerCase().includes(busca.toLowerCase());

        return correspondeCategoria && correspondeBusca;
    });

    const pratosDoRestaurante = restauranteSelecionado
        ? pratos.filter((prato) => prato.restaurante === restauranteSelecionado.nome)
        : pratosFiltrados;

    return (
        <div className="Pedir-page">

            <div className="header">
                <Link to="/" className="logo-link">
                    <h1 id="titulo1">
                        Flash Foods
                    </h1>
                </Link>
                <div className="carrinho">
                    <button
                        id="carrinho"
                        onClick={() => navigate("/carrinho")}
                    >
                        🛒 Carrinho
                        {quantidadeTotal > 0 && (
                            <span className="contador-carrinho">
                                {quantidadeTotal}
                            </span>
                        )}
                    </button>
                </div>

                <div className="endereço">
                    <FaLocationDot className="icone-localizacao" />
                    <input
                        type="text"
                        id="endereço"
                        placeholder="Digite seu endereço de entrega..."
                    />
                    <button type="submit">Adicionar</button>
                </div>

            </div>

            <div id="pratos-restaurantes">

                <input
                    type="text"
                    id="pratos"
                    placeholder="Buscar pratos ou restaurantes..."
                    value={busca}
                    onChange={(e) => setBusca(e.target.value)}
                />

                <div id="filtro-pratos">

                    {[
                        "Todos",
                        "Pizza",
                        "Hambúrguer",
                        "Japonesa",
                        "Bebida",
                        "Mexicana",
                        "Massas"
                    ].map((filtro) => (
                        <button
                            key={filtro}
                            className={
                                categoria === filtro
                                    ? "filtro-ativo"
                                    : ""
                            }
                            onClick={() => setCategoria(filtro)}
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

            <div id="restaurantes2">

                <section id="restaurantes3">

                    <h1>Restaurantes</h1>

                    <div className="cards-restaurantes1">

                        {restaurantesFiltrados.map((restaurante) => (

                            <div
                                className="card-restaurante"
                                key={restaurante.id}
                                onClick={() => setRestauranteSelecionado(restaurante)}
                            >

                                <h1>{restaurante.letra}</h1>

                                <p>{restaurante.nome}</p>

                                <p>⭐ {restaurante.nota}</p>

                                <p>{restaurante.categoria}</p>

                                <p>◷ {restaurante.tempo}</p>

                            </div>

                        ))}

                    </div>

                </section>

            </div>

            <section className="pratos">

                <h1 id="titulo-prato">
                    Pratos Disponíveis
                </h1>

                <div className="cards-pratos">

                    {pratosDoRestaurante.map((prato) => (

                        <div
                            className="card-prato"
                            key={prato.id}
                        >

                            <h1>{prato.letra}</h1>

                            <p>{prato.nome}</p>

                            <p>⭐ {prato.nota}</p>

                            <p>{prato.restaurante}</p>

                            <p>{prato.descricao}</p>

                            <p>
                                R$ {prato.preco.toFixed(2).replace(".", ",")}
                            </p>

                            <button
                                onClick={() =>
                                    adicionarAoCarrinho(prato)
                                }
                            >
                                + Adicionar
                            </button>

                        </div>

                    ))}

                </div>

                {pratosFiltrados.length === 0 && (
                    <p className="nenhum-resultado">
                        Nenhum prato encontrado.
                    </p>
                )}

            </section>

        </div>
    );
}