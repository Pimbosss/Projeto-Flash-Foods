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
                        <button>Restaurante</button>
                    </div>




                    <div id="como-funciona">
                        <section id='comofunciona'>
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
                        </section>

                    </div>

                    <div id="info-entregador">
                        <section id="para-entregadores">

                            <h1>Condições Justas Para <span>Nossos Entregadores</span></h1>
                            <p>Acreditamos que quem entrega merece o melhor</p>
                            <div class="cards-entregadores">
                                <div class="card-entregador">
                                    <p class="badge2 badge-verde">$</p>

                                    <h1>Ganho Garantido</h1>

                                    <p>
                                        Ganhe no mínimo R$ 12 por entrega, com bonificações
                                        por distância e horários de pico. Sem surpresas,
                                        sem taxas escondidas.
                                    </p>

                                    <ul>
                                        <li>Pagamento semanal garantido</li>
                                        <li>Bônus por produtividade</li>
                                        <li>Gorjetas 100% suas</li>
                                    </ul>
                                </div>

                                <div class="card-entregador">
                                    <p class="badge2 badge-azul">🛡️</p>

                                    <h1>Seguro Completo</h1>

                                    <p>
                                        Proteção total durante suas entregas, porque sua
                                        segurança é nossa prioridade número um.
                                    </p>

                                    <ul>
                                        <li>Seguro de vida</li>
                                        <li>Seguro contra acidentes</li>
                                        <li>Assistência 24/7</li>
                                    </ul>
                                </div>

                                <div class="card-entregador">
                                    <p class="badge2 badge-roxo">❤️</p>

                                    <h1>Benefícios Extras</h1>

                                    <p>
                                        Cuidamos de você além das entregas, com benefícios
                                        que fazem a diferença no dia a dia.
                                    </p>

                                    <ul>
                                        <li>Descontos em combustível</li>
                                        <li>Manutenção de veículo</li>
                                        <li>Plano de saúde opcional</li>
                                    </ul>
                                </div>
                            </div>
                        </section>
                        <div id="flexibilidade">
                            <p>◴</p>

                            <h1>Flexibilidade Total</h1>

                            <p>
                                Trabalhe quando quiser, defina seus próprios horários.
                                Sem metas impossíveis, sem pressão. Você escolhe quando
                                e onde trabalhar.
                            </p>

                            <button id="entregador">
                                Quero ser um Entregador Flash
                            </button>
                        </div>



                    </div>

                    <div id="infos-mentiras">
                        <div className="infos">

                            <div className="info-item">
                                <p className="badges-info">📈</p>
                                <div>
                                    <h1>2.5k+</h1>
                                    <p>Entregadores Ativos</p>
                                </div>
                            </div>

                            <div className="info-item">
                                <p className="badges-info">📦</p>
                                <div>
                                    <h1>150k+</h1>
                                    <p>Entregas por Mês</p>
                                </div>
                            </div>

                            <div className="info-item">
                                <p className="badges-info">⭐</p>
                                <div>
                                    <h1>5.0</h1>
                                    <p>Avaliação Média</p>
                                </div>
                            </div>

                            <div className="info-item">
                                <p className="badges-info">📍</p>
                                <div>
                                    <h1>50+</h1>
                                    <p>Cidades Atendidas</p>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div id='restaurantes'>
                        <section id='restaurantes1'>
                            <h1>Restaurantes Parceiros</h1>
                            <p>Os melhores sabores da sua Cidade</p>

                            <div className='cards-restaurantes'>
                                <div className='card1'>
                                    <h1>P</h1>
                                    <p>Pizza Express</p>
                                    <p>⭐4.5</p>
                                </div>
                                <div className='card2'>
                                    <h1>B</h1>
                                    <p>Burger King</p>
                                    <p>⭐4.6</p>
                                </div>
                                <div className='card3'>
                                    <h1>S</h1>
                                    <p>Sushi House</p>
                                    <p>⭐4.7</p>
                                </div>
                                <div className='card4'>
                                    <h1>C</h1>
                                    <p>Café Delícia</p>
                                    <p>⭐4.8</p>
                                </div>
                                <div className='card5'>
                                    <h1>T</h1>
                                    <p>Taco Loco</p>
                                    <p>⭐4.9</p>
                                </div>
                                <div className='card6'>
                                    <h1>P</h1>
                                    <p>Pasta & Cia</p>
                                    <p>⭐4.3</p>
                                </div>
                                <div className='card7'>
                                    <h1>A</h1>
                                    <p>Açaí Premium</p>
                                    <p>⭐5</p>
                                </div>
                                <div className='card8'>
                                    <h1>C</h1>
                                    <p>Churrasco Top</p>
                                    <p>⭐4.5</p>
                                </div>

                            </div>
                        </section>
                    </div>
                </div>

            </main>
        </>
    )
}