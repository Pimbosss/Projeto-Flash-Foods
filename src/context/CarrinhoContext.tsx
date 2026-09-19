'use client'; // ⚠️ OBRIGATÓRIO: Gerencia estados na memória do navegador!

import { createContext, useContext, useState, ReactNode } from "react";

// 1. 📐 INTERFACE DO PRODUTO: Define o que um lanche tem no db.json
export interface Produto {
    id: string;
    nome: string;
    descricao: string;
    preco: number;
    categoria: string;
    imagem: string;
    quantidade: number; // Campo dinâmico controlado pelo carrinho
    restaurante?: string;
}

// 2. 🎛️ INTERFACE DO CONTEXTO: Avisa ao TypeScript quais funções e variáveis estão disponíveis
interface CarrinhoContextType {
    carrinho: Produto[];
    adicionarAoCarrinho: (produto: Omit<Produto, 'quantidade'>) => void;
    aumentarQuantidade: (id: string) => void;
    diminuirQuantidade: (id: string) => void;
    removerDoCarrinho: (id: string) => void;
    quantidadeTotal: number;
    valorTotal: number;
}

// Inicializamos o contexto avisando o formato dele para o TypeScript
const CarrinhoContext = createContext<CarrinhoContextType | undefined>(undefined);

// Tipamos a propriedade children que o Next.js exige
interface CarrinhoProviderProps {
    children: ReactNode;
}

export function CarrinhoProvider({ children }: CarrinhoProviderProps) {
    const [carrinho, setCarrinho] = useState<Produto[]>([]);

    // Adicionar lanche ao carrinho
    function adicionarAoCarrinho(produto: Omit<Produto, 'quantidade'>) {
        setCarrinho((atual) => {
            const existente = atual.find((item) => item.id === produto.id);

            if (existente) {
                return atual.map((item) =>
                    item.id === produto.id
                        ? { ...item, quantidade: item.quantidade + 1 }
                        : item
                );
            }

            // Se for novo, adiciona o objeto na lista inicializando a quantidade em 1
            return [...atual, { ...produto, quantidade: 1 } as Produto];
        });
    }

    // Aumentar a quantidade (+1)
    function aumentarQuantidade(id: string) {
        setCarrinho((atual) =>
            atual.map((item) =>
                item.id === id
                    ? { ...item, quantidade: item.quantidade + 1 }
                    : item
            )
        );
    }

    // Diminuir a quantidade (-1) e remove se chegar a zero
    function diminuirQuantidade(id: string) {
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

    // Remover o item completo da lista de uma vez
    function removerDoCarrinho(id: string) {
        setCarrinho((atual) =>
            atual.filter((item) => item.id !== id)
        );
    }

    // Cálculos matemáticos inteligentes que vocês montaram
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

// Hook personalizado nativo para consumir as funções de forma simples nas telas
export function useCarrinho() {
    const context = useContext(CarrinhoContext);
    if (!context) {
        throw new Error("useCarrinho deve ser usado dentro de um CarrinhoProvider");
    }
    return context;
}
