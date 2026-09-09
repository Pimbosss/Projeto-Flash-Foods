import React from "react";
import { useNavigate } from "react-router-dom";
import { useCarrinho } from "../Pedir_agora/CarrinhoContext";
import "./Carrinho.css";

export default function Carrinho() {

    const navigate = useNavigate();

    const {
        carrinho,
        aumentarQuantidade,
        diminuirQuantidade,
        removerDoCarrinho,
        valorTotal
    } = useCarrinho();

    return (
        <div className="carrinho-page">

            <header className="carrinho-header">

                <button
                    onClick={() => navigate("/pedir")}
                    className="voltar"
                >
                    ← Voltar
                </button>

                <h1>🛒 Meu Carrinho</h1>

            </header>

            <main className="carrinho-container">

                {carrinho.length === 0 ? (

                    <div className="carrinho-vazio">

                        <div className="icone-vazio">
                            🛒
                        </div>

                        <h2>Seu carrinho está vazio</h2>

                        <p>
                            Adicione alguns pratos para continuar.
                        </p>

                        <button
                            onClick={() => navigate("/Pedir-agora")}
                        >
                            Ver pratos
                        </button>

                    </div>

                ) : (

                    <>

                        <div className="lista-carrinho">

                            {carrinho.map((item) => (

                                <div
                                    className="item-carrinho"
                                    key={item.id}
                                >

                                    <div className="item-imagem">
                                        {item.letra}
                                    </div>

                                    <div className="item-info">

                                        <h2>{item.nome}</h2>

                                        <p>{item.restaurante}</p>

                                        <strong>
                                            R$ {item.preco
                                                .toFixed(2)
                                                .replace(".", ",")}
                                        </strong>

                                    </div>

                                    <div className="quantidade">

                                        <button
                                            onClick={() =>
                                                diminuirQuantidade(item.id)
                                            }
                                        >
                                            −
                                        </button>

                                        <span>
                                            {item.quantidade}
                                        </span>

                                        <button
                                            onClick={() =>
                                                aumentarQuantidade(item.id)
                                            }
                                        >
                                            +
                                        </button>

                                    </div>

                                    <div className="item-subtotal">

                                        <strong>
                                            R$ {(item.preco * item.quantidade)
                                                .toFixed(2)
                                                .replace(".", ",")}
                                        </strong>

                                        <button
                                            className="remover"
                                            onClick={() =>
                                                removerDoCarrinho(item.id)
                                            }
                                        >
                                            Remover
                                        </button>

                                    </div>

                                </div>

                            ))}

                        </div>

                        <div className="resumo-carrinho">

                            <h2>Resumo do pedido</h2>

                            <div className="linha-resumo">
                                <span>Subtotal</span>

                                <strong>
                                    R$ {valorTotal
                                        .toFixed(2)
                                        .replace(".", ",")}
                                </strong>
                            </div>

                            <div className="linha-resumo">
                                <span>Taxa de entrega</span>

                                <strong>
                                    R$ 5,00
                                </strong>
                            </div>

                            <hr />

                            <div className="linha-total">
                                <span>Total</span>

                                <strong>
                                    R$ {(valorTotal + 5)
                                        .toFixed(2)
                                        .replace(".", ",")}
                                </strong>
                            </div>

                            <button className="finalizar">
                                Finalizar pedido
                            </button>

                        </div>

                    </>

                )}

            </main>

        </div>
    );
}