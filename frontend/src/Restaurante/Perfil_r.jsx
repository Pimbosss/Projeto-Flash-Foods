import { useState } from "react";
import { IoLocationOutline, IoTimeOutline } from "react-icons/io5";
import "./Restaurante.css";

export default function Informacoes() {
    const [dados, setDados] = useState(() => {
        const dadosSalvos = localStorage.getItem("dadosRestaurante");

        return dadosSalvos
            ? JSON.parse(dadosSalvos)
            : {
                nome: "",
                descricao: "",
                endereco: "",
                telefone: "",
                categorias: "",
                abre: "",
                fecha: "",
                pedidoMinimo: "",
                tempoMedio: ""
            };
    });

    const alterarCampo = (campo, valor) => {
        setDados({
            ...dados,
            [campo]: valor
        });
    };

    const salvarAlteracoes = (e) => {
        e.preventDefault();

        localStorage.setItem(
            "dadosRestaurante",
            JSON.stringify(dados)
        );

        window.dispatchEvent(
            new Event("dadosRestauranteAtualizados")
        );

        alert("Alterações salvas com sucesso!");
    };

    return (
        <div id="informacoes-restaurante">
            <h1>Informações do Restaurante</h1>

            <form
                className="form-restaurante"
                onSubmit={salvarAlteracoes}
            >
                <div className="campo">
                    <label>Nome do Restaurante</label>

                    <input
                        type="text"
                        value={dados.nome}
                        onChange={(e) =>
                            alterarCampo("nome", e.target.value)
                        }
                    />
                </div>

                <div className="campo">
                    <label>Descrição</label>

                    <input
                        className="descricao-input"
                        type="text"
                        value={dados.descricao}
                        onChange={(e) =>
                            alterarCampo("descricao", e.target.value)
                        }
                    />
                </div>

                <div className="campo">
                    <label>Endereço</label>

                    <div className="input-icon">
                        <IoLocationOutline />

                        <input
                            type="text"
                            value={dados.endereco}
                            onChange={(e) =>
                                alterarCampo("endereco", e.target.value)
                            }
                        />
                    </div>
                </div>

                <div className="campo">
                    <label>Telefone / WhatsApp</label>

                    <input
                        type="text"
                        value={dados.telefone}
                        onChange={(e) =>
                            alterarCampo("telefone", e.target.value)
                        }
                    />
                </div>

                <div className="campo">
                    <label>Categorias</label>

                    <input
                        type="text"
                        value={dados.categorias}
                        onChange={(e) =>
                            alterarCampo("categorias", e.target.value)
                        }
                    />
                </div>

                <div className="linha-campos">
                    <div className="campo">
                        <label>Abre às</label>

                        <div className="input-icon">
                            <IoTimeOutline />

                            <input
                                type="text"
                                value={dados.abre}
                                onChange={(e) =>
                                    alterarCampo("abre", e.target.value)
                                }
                            />
                        </div>
                    </div>

                    <div className="campo">
                        <label>Fecha às</label>

                        <div className="input-icon">
                            <IoTimeOutline />

                            <input
                                type="text"
                                value={dados.fecha}
                                onChange={(e) =>
                                    alterarCampo("fecha", e.target.value)
                                }
                            />
                        </div>
                    </div>
                </div>

                <div className="linha-campos">
                    <div className="campo">
                        <label>Pedido mínimo (R$)</label>

                        <input
                            type="text"
                            value={dados.pedidoMinimo}
                            onChange={(e) =>
                                alterarCampo(
                                    "pedidoMinimo",
                                    e.target.value
                                )
                            }
                        />
                    </div>

                    <div className="campo">
                        <label>Tempo médio</label>

                        <input
                            type="text"
                            value={dados.tempoMedio}
                            onChange={(e) =>
                                alterarCampo(
                                    "tempoMedio",
                                    e.target.value
                                )
                            }
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="btn-salvar"
                >
                    Salvar Alterações
                </button>
            </form>
        </div>
    );
}
