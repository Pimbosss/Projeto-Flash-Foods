'use client'; 
import { useRouter } from "next/navigation"; 
import { useCarrinho } from "@/context/CarrinhoContext"; 
import { api } from "@/services/api"; 
import './carrinho.css'

export default function Carrinho() {
    const router = useRouter();

    const {
        carrinho,
        aumentarQuantidade,
        diminuirQuantidade,
        removerDoCarrinho,
        valorTotal,
        removerDoCarrinho: limparTudo 
    } = useCarrinho();

   
    async function lidarComFinalizarPedido() {
        // 1. Segurança: Verifica se o usuário está de fato logado antes de comprar
        const sessao = localStorage.getItem("flashfoods:user");
        if (!sessao) {
            alert("Para finalizar o pedido, por favor faça login ou cadastre-se antes! 🔐");
            router.push("/login");
            return;
        }

        const usuarioLogado = JSON.parse(sessao);
        const totalComTaxa = valorTotal + 5;

        // 2. Monta o pacote de dados do pedido seguindo o padrão de mercado
        const novoPedido = {
            usuarioId: usuarioLogado.id,
            usuarioNome: usuarioLogado.name || usuarioLogado.email.split("@")[0],
            itens: carrinho.map(item => ({
                id: item.id,
                nome: item.nome,
                quantidade: item.quantidade,
                precoUnitario: item.preco
            })),
            subtotal: valorTotal,
            taxaEntrega: 5.00,
            total: totalComTaxa,
            status: "pendente", // Status inicial para o entregador conseguir pescar
            data: new Date().toLocaleString("pt-BR") // Salva o dia e hora exatos do pedido
        };

        try {
            // 🚀 ENVIO REAL: Envia o pacote para a gaveta 'pedidos' do seu db.json
            await api.post("/pedidos", novoPedido);

            alert("Pedido finalizado com sucesso! 🍔🔥 Seu lanche começou a ser preparado.");
            
            // 🪄 Faxina na memória: Remove os itens do carrinho um por um para esvaziar a sacola
            carrinho.forEach(item => removerDoCarrinho(item.id));
            
            // Chuta o usuário para a Home ou para a tela onde ele acompanha o pedido
            router.push("/");
        } catch (error) {
            console.error("Erro ao enviar pedido para o servidor:", error);
            alert("Ocorreu um erro ao conectar com o servidor simulado. Tente novamente.");
        }
    }

    return (
        <div className="carrinho-page" style={{ paddingTop: "90px" }}>
            
            <div className="carrinho-titulo-secao" style={{ maxWidth: "1200px", margin: "20px auto 0", padding: "0 20px", display: "flex", alignItems: "center", gap: "16px" }}>
                <button
                    onClick={() => router.push("/pedir-agora")}
                    className="voltar"
                    style={{ background: "none", border: "none", color: "#ff6600", fontWeight: "700", cursor: "pointer", fontSize: "16px" }}
                >
                    ← Voltar para o Cardápio
                </button>
                <h1 style={{ color: "#071d3b", fontSize: "28px", fontWeight: "800" }}>🛒 Meu Carrinho</h1>
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
                                    
                                    <div className="item-imagem" style={{ fontSize: "36px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                        {item.imagem || "🍔"}
                                    </div>

                                    <div className="item-info">
                                        <h2>{item.nome}</h2>
                                        <p>{item.restaurante || "Flash Foods"}</p>
                                        <strong>
                                            R$ {item.preco.toFixed(2).replace(".", ",")}
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
                                            R$ {(item.preco * item.quantidade).toFixed(2).replace(".", ",")}
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

                            {/* 🟢 CONECTADO: O botão agora dispara a gravação assíncrona na nuvem! */}
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
