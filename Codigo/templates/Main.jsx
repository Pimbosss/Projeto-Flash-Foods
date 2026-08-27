import './main.css'
import Header from "./header.jsx"

export default function Main() {
    return (
        <>
            <Header />
            <main id="conteudo" >
                <div id="principal" >
                    <p id="badge">⚡ Delivery que valoriza o entregador</p>

                    <h1>
                        Entrega rápida com <span>condições justas</span>
                    </h1>

                    <p id="info2">
                        Receba suas comidas favoritas em minutos, sabendo que cada entregador
                        tem garantia de ganhos justos, seguro completo e suporte 24/7.
                    </p>

                    <div id="buttons">
                        <button>Pedir Agora</button>
                        <button>Seja um Entregador</button>
                    </div>


                    <div id="como-funciona">

                        <h1>Como Funciona</h1>
                        <p>Simples, rápido e transparente</p>

                        <ol>

                            <li>
                                <p class="badge">📍</p>
                                <h3>1. Escolha</h3>
                                <p>Selecione seu restaurante favorito e monte seu pedido</p>
                            </li>

                            <li>
                                <p class="badge">📦</p>
                                <h3>2. Confirme</h3>
                                <p>Revise e confirme seu pedido com pagamento seguro</p>
                            </li>

                            <li>
                                <p class="badge">🚲</p>
                                <h3>3. Acompanhe</h3>
                                <p>Veja em tempo real o entregador chegando até você</p>
                            </li>

                            <li>
                                <p class="badge">⭐</p>
                                <h3>4. Aproveite</h3>
                                <p>Receba sua comida quentinha e avalie a experiência</p>
                            </li>

                        </ol>

                    </div>

                </div>

            </main>
        </>
    )
}