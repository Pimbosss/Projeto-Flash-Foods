import React, { createContext, useContext, useState } from "react";

const CarrinhoContext = createContext();

export function CarrinhoProvider({ children }) {
    const [carrinho, setCarrinho] = useState([]);

    function adicionarAoCarrinho(produto) {
        setCarrinho((atual) => {
            const existente = atual.find((item) => item.id === produto.id);

            if (existente) {
                return atual.map((item) =>
                    item.id === produto.id
                        ? { ...item, quantidade: item.quantidade + 1 }
                        : item
                );
            }

            return [...atual, { ...produto, quantidade: 1 }];
        });
    }

    function aumentarQuantidade(id) {
        setCarrinho((atual) =>
            atual.map((item) =>
                item.id === id
                    ? { ...item, quantidade: item.quantidade + 1 }
                    : item
            )
        );
    }

    function diminuirQuantidade(id) {
        setCarrinho((atual) =>
            atual
                .map((item) =>
                    item.id === id
                        ? { ...item, quantidade: item.quantidade - 1 }
                        : item
                )
                .filter((item) => item.quantidade > 0)
        );
    }

    function removerDoCarrinho(id) {
        setCarrinho((atual) =>
            atual.filter((item) => item.id !== id)
        );
    }

    const quantidadeTotal = carrinho.reduce(
        (total, item) => total + item.quantidade,
        0
    );

    const valorTotal = carrinho.reduce(
        (total, item) => total + item.preco * item.quantidade,
        0
    );

    return (
        <CarrinhoContext.Provider
            value={{
                carrinho,
                adicionarAoCarrinho,
                aumentarQuantidade,
                diminuirQuantidade,
                removerDoCarrinho,
                quantidadeTotal,
                valorTotal
            }}
        >
            {children}
        </CarrinhoContext.Provider>
    );
}

export function useCarrinho() {
    return useContext(CarrinhoContext);
}