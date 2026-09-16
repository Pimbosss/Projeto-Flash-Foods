import { useState } from "react";
import { GoPencil } from "react-icons/go";
import { FaRegTrashAlt } from "react-icons/fa";

export default function Produtos() {
    const produtosIniciais = [
        {
            id: 1,
            tipo: "Lanches",
            nome: "X-burguer",
            descricao: "Informações do prato",
            preco: "00,00",
            vendidos: 0,
            ativo: true
        },
        {
            id: 2,
            tipo: "Pizza",
            nome: "Pizza Margherita",
            descricao: "Informações do prato",
            preco: "00,00",
            vendidos: 0,
            ativo: true
        },
        {
            id: 3,
            tipo: "Bebidas",
            nome: "Coca-Cola",
            descricao: "Informações do prato",
            preco: "00,00",
            vendidos: 0,
            ativo: true
        },
        {
            id: 4,
            tipo: "Sobremesas",
            nome: "Pudim",
            descricao: "Informações do prato",
            preco: "00,00",
            vendidos: 0,
            ativo: true
        },
        {
            id: 5,
            tipo: "Salgados",
            nome: "Coxinha",
            descricao: "Informações do prato",
            preco: "00,00",
            vendidos: 0,
            ativo: true
        }
    ];

    const [produtos, setProdutos] = useState(() => {
        const produtosSalvos = localStorage.getItem("produtos");

        return produtosSalvos
            ? JSON.parse(produtosSalvos)
            : produtosIniciais;
    });

    const [modalAberto, setModalAberto] = useState(false);
    const [produtoEditando, setProdutoEditando] = useState(null);

    const [produto, setProduto] = useState({
        tipo: "",
        nome: "",
        descricao: "",
        preco: ""
    });

    const categorias = [
        "Lanches",
        "Pizza",
        "Bebidas",
        "Sobremesas",
        "Salgados"
    ];

    const atualizarProdutos = (novosProdutos) => {
        setProdutos(novosProdutos);

        localStorage.setItem(
            "produtos",
            JSON.stringify(novosProdutos)
        );
    };

    const abrirModal = () => {
        setProdutoEditando(null);

        setProduto({
            tipo: "",
            nome: "",
            descricao: "",
            preco: ""
        });

        setModalAberto(true);
    };

    const fecharModal = () => {
        setModalAberto(false);

        setProdutoEditando(null);

        setProduto({
            tipo: "",
            nome: "",
            descricao: "",
            preco: ""
        });
    };

    const editarProduto = (item) => {
        setProdutoEditando(item.id);

        setProduto({
            tipo: item.tipo,
            nome: item.nome,
            descricao: item.descricao,
            preco: item.preco
        });

        setModalAberto(true);
    };

    const alterarCampo = (campo, valor) => {
        setProduto({
            ...produto,
            [campo]: valor
        });
    };

    const salvarProduto = (e) => {
        e.preventDefault();

        if (produtoEditando) {
            const novosProdutos = produtos.map((item) => {
                if (item.id === produtoEditando) {
                    return {
                        ...item,
                        tipo: produto.tipo,
                        nome: produto.nome,
                        descricao: produto.descricao,
                        preco: produto.preco
                    };
                }

                return item;
            });

            atualizarProdutos(novosProdutos);
        } else {
            const novoProduto = {
                id: Date.now(),
                tipo: produto.tipo,
                nome: produto.nome,
                descricao: produto.descricao,
                preco: produto.preco,
                vendidos: 0,
                ativo: true
            };

            atualizarProdutos([
                ...produtos,
                novoProduto
            ]);
        }

        fecharModal();
    };

    const alterarStatus = (id) => {
        const novosProdutos = produtos.map((item) => {
            if (item.id === id) {
                return {
                    ...item,
                    ativo: !item.ativo
                };
            }

            return item;
        });

        atualizarProdutos(novosProdutos);
    };

    const excluirProduto = (id) => {
        const confirmar = window.confirm(
            "Tem certeza que deseja excluir este produto?"
        );

        if (!confirmar) {
            return;
        }

        const novosProdutos = produtos.filter(
            (item) => item.id !== id
        );

        atualizarProdutos(novosProdutos);
    };

    return (
        <div id="home-produtos">

            <div className="cabecalho-produtos">
                <h1>
                    <span className="nprodutos">
                        {produtos.length}
                    </span>{" "}
                    Produtos cadastrados
                </h1>

                <button
                    className="btn-adicionar-produto"
                    onClick={abrirModal}
                >
                    + Adicionar Produtos
                </button>
            </div>

            {categorias.map((categoria) => {
                const produtosCategoria = produtos.filter(
                    (item) => item.tipo === categoria
                );

                if (produtosCategoria.length === 0) {
                    return null;
                }

                return (
                    <div
                        className="categoria-produtos"
                        key={categoria}
                    >
                        <h1>{categoria}</h1>

                        {produtosCategoria.map((item) => (
                            <div
                                className={`card-produto ${
                                    !item.ativo
                                        ? "produto-desativado"
                                        : ""
                                }`}
                                key={item.id}
                            >
                                <h1>{item.nome}</h1>

                                <p>
                                    R$ {item.preco}
                                </p>

                                <p>
                                    {item.descricao}
                                </p>

                                <p>
                                    {item.vendidos} vendidos
                                </p>

                                <label className="switch">
                                    <input
                                        type="checkbox"
                                        checked={item.ativo}
                                        onChange={() =>
                                            alterarStatus(item.id)
                                        }
                                    />

                                    <span className="slider"></span>
                                </label>

                                <button
                                    className="btn-editar"
                                    onClick={() =>
                                        editarProduto(item)
                                    }
                                >
                                    <GoPencil />
                                </button>

                                <button
                                    className="btn-excluir"
                                    onClick={() =>
                                        excluirProduto(item.id)
                                    }
                                >
                                    <FaRegTrashAlt />
                                </button>
                            </div>
                        ))}
                    </div>
                );
            })}

            {modalAberto && (
                <div
                    className="modal-overlay"
                    onClick={fecharModal}
                >
                    <div
                        className="modal-produto"
                        onClick={(e) =>
                            e.stopPropagation()
                        }
                    >
                        <div className="modal-header">
                            <h2>
                                {produtoEditando
                                    ? "Editar Produto"
                                    : "Adicionar Produto"}
                            </h2>

                            <button
                                className="btn-fechar"
                                type="button"
                                onClick={fecharModal}
                            >
                                ×
                            </button>
                        </div>

                        <form onSubmit={salvarProduto}>

                            <div className="campo-produto">
                                <label>Tipo</label>

                                <select
                                    value={produto.tipo}
                                    onChange={(e) =>
                                        alterarCampo(
                                            "tipo",
                                            e.target.value
                                        )
                                    }
                                    required
                                >
                                    <option value="">
                                        Selecione o tipo
                                    </option>

                                    {categorias.map(
                                        (categoria) => (
                                            <option
                                                key={categoria}
                                                value={categoria}
                                            >
                                                {categoria}
                                            </option>
                                        )
                                    )}
                                </select>
                            </div>

                            <div className="campo-produto">
                                <label>Nome</label>

                                <input
                                    type="text"
                                    value={produto.nome}
                                    onChange={(e) =>
                                        alterarCampo(
                                            "nome",
                                            e.target.value
                                        )
                                    }
                                    placeholder="Nome do produto"
                                    required
                                />
                            </div>

                            <div className="campo-produto">
                                <label>Descrição</label>

                                <input
                                    type="text"
                                    value={produto.descricao}
                                    onChange={(e) =>
                                        alterarCampo(
                                            "descricao",
                                            e.target.value
                                        )
                                    }
                                    placeholder="Descrição do produto"
                                    required
                                />
                            </div>

                            <div className="campo-produto">
                                <label>Preço</label>

                                <input
                                    type="text"
                                    value={produto.preco}
                                    onChange={(e) =>
                                        alterarCampo(
                                            "preco",
                                            e.target.value
                                        )
                                    }
                                    placeholder="00,00"
                                    required
                                />
                            </div>

                            <div className="modal-botoes">
                                <button
                                    type="button"
                                    className="btn-cancelar"
                                    onClick={fecharModal}
                                >
                                    Cancelar
                                </button>

                                <button
                                    type="submit"
                                    className="btn-adicionar"
                                >
                                    {produtoEditando
                                        ? "Salvar Alterações"
                                        : "Adicionar Produto"}
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
