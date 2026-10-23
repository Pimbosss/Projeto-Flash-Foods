'use client';

import useCarrinhoPage from "./hooks/useCarrinho";
import './carrinho.css';

export default function Carrinho() {
    // 🎛️ Extrai toda a inteligência e estados operacionais do Custom Hook isolado
    const {
        router,
        carrinho,
        valorTotal,
        aumentarQuantidade,
        diminuirQuantidade,
        removerDoCarrinho,
        lidarComFinalizarPedido
    } = useCarrinhoPage();

    return (
        <div className="carrinho-page carrinho-page-ajustada">

            <div className="carrinho-titulo-secao-ajustada">
                <button
                    onClick={() => router.push("/pedir-agora")}
                    className="voltar-link"
                >
                    ← Voltar para o Cardápio
                </button>
                <h1>🛒 Meu Carrinho</h1>
            </div>

            <main className="carrinho-container">
                {carrinho.length === 0 ? (
                    <div className="carrinho-vazio">
                        <div className="icone-vazio">🛒</div>
                        <h2>Seu carrinho está vazio</h2>
                        <p>Adicione alguns pratos para continuar.</p>
                        <button onClick={() => router.push("/pedir-agora")}>
                            Ver pratos
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="lista-carrinho">
                            {carrinho.map((item) => (
                                <div className="item-carrinho" key={item.id}>

                                    <div className="item-imagem-ajustada">
                                        {item.imagem || "🍔"}
                                    </div>

                                    <div className="item-info">
                                        <h2>{item.nome}</h2>
                                        <p>{item.restaurante || "Flash Foods"}</p>
                                        <strong>
                                            R$ {(typeof item.preco === "string"
                                                ? Number(item.preco.replace(",", "."))
                                                : Number(item.preco || 0)
                                            ).toFixed(2).replace(".", ",")}
                                        </strong>
                                    </div>

                                    <div className="quantidade">
                                        <button onClick={() => diminuirQuantidade(item.id)}>
                                            −
                                        </button>
                                        <span>{item.quantidade}</span>
                                        <button onClick={() => aumentarQuantidade(item.id)}>
                                            +
                                        </button>
                                    </div>

                                    <div className="item-subtotal">
                                        <strong>
                                            R$ {(typeof item.preco === "string"
                                                ? Number(item.preco.replace(",", "."))
                                                : Number(item.preco || 0)
                                            ).toFixed(2).replace(".", ",")}
                                        </strong>
                                        <button
                                            className="remover"
                                            onClick={() => removerDoCarrinho(item.id)}
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
                                    R$ {valorTotal.toFixed(2).replace(".", ",")}
                                </strong>
                            </div>

                            <div className="linha-resumo">
                                <span>Taxa de entrega</span>
                                <strong>R$ 5,00</strong>
                            </div>

                            <hr />

                            <div className="linha-total">
                                <span>Total</span>
                                <strong>
                                    R$ {(valorTotal + 5).toFixed(2).replace(".", ",")}
                                </strong>
                            </div>

                            <button className="finalizar" onClick={lidarComFinalizarPedido}>
                                Finalizar pedido
                            </button>
                        </div>
                    </>
                )}
            </main>
        </div>
    );
}
