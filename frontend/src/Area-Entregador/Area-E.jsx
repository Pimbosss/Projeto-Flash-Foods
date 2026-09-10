
import { Link } from "react-router-dom";
import { TfiMoney } from "react-icons/tfi";
import { IoMdTrendingUp } from "react-icons/io";
import { LuBox } from "react-icons/lu";
import { FaStar } from "react-icons/fa";
import { FaRegClock } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { TbLocation } from "react-icons/tb";
import { LuBike } from "react-icons/lu";
import { TbNavigation } from "react-icons/tb";
import { IoMdCall } from "react-icons/io";
import { IoChevronForward } from "react-icons/io5";
import { IoArrowBack } from "react-icons/io5";
import { useEffect, useState } from "react";
import "./Area-E.css";
import useAreaEFunctions from "./Area-e-functions";

export default function Area_e() {

    const {
    online,
    entregaAtual,
    gpsVisivel,
    ganhosHoje,
    entregasTotais,
    ganhosOntem,
    diferencaOntem,
    tempoTotal,
    inicioOnline,
    entregas,
    alterarStatus,
    formatarTempo,
    aceitarEntrega,
    finalizarEntrega,
    resetarTudo
} = useAreaEFunctions();

    return (
        <div className="entregador-page">

            <div className="header">

                <Link to="/" className="logo-link">
                    <h1 id="titulo1">
                        Flash Foods
                    </h1>
                </Link>

                <p>Área do Entregador</p>

                <div className="carrinho">
                    <button
                        className={
                            online
                                ? "status-online"
                                : "status-offline"
                        }
                        onClick={alterarStatus}
                    >
                        {online ? "Online" : "Offline"}
                    </button>
                </div>

            </div>
            <div className="area-cards" >
                <div className="cards-entregador">


                    <div id="card-e-1">
                        <p>Ganhos Hoje</p>

                        <TfiMoney />

                        <p id="valor">
                            R$ {ganhosHoje.toFixed(2).replace(".", ",")}
                        </p>

                        <p className={diferencaOntem >= 0 ? "ganho-positivo" : "ganho-negativo"}>
                            <IoMdTrendingUp />

                            {diferencaOntem >= 0 ? "+" : "-"} R$ {Math.abs(diferencaOntem)
                                .toFixed(2)
                                .replace(".", ",")} vs ontem
                        </p>
                    </div>

                    <div id="card-e-2">
                        <p>Entregas</p>
                        <LuBox />
                        <p>{entregasTotais}</p>
                        <p>Meta: 15 hoje</p>
                    </div>

                    <div id="card-e-3">
                        <p>Avaliação</p>
                        <FaStar />
                        <p>4.9</p>
                        <p>2.453 avaliações</p>
                    </div>

                    <div id="card-e-4">
                        <p>Tempo Online</p>
                        <FaRegClock />
                        <p>{formatarTempo(tempoTotal)}</p>
                        <p>Desde {new Date(inicioOnline).toLocaleTimeString("pt-BR", {
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit"
                        })}</p>
                    </div>
                </div>
                <button
                    className="botao-resetar"
                    onClick={resetarTudo}
                >
                    Resetar dados
                </button>

            </div>

            {entregaAtual && online && (
                <div className="entrega-andamento">

                    <div className="andamento-header">

                        <h1>
                            Entrega em Andamento
                        </h1>

                        <div className="andamento-valor">
                            {entregaAtual.valor}
                        </div>

                        {gpsVisivel && (
                            <button
                                className="gps-button"
                                onClick={() => setGpsVisivel(false)}
                            >
                                <TbNavigation />
                                Ocultar GPS
                            </button>
                        )}

                        {!gpsVisivel && (
                            <button
                                className="gps-button"
                                onClick={() => setGpsVisivel(true)}
                            >
                                <TbNavigation />
                                Mostrar GPS
                            </button>
                        )}

                    </div>

                    <div
                        className={
                            gpsVisivel
                                ? "andamento-conteudo"
                                : "andamento-conteudo gps-oculto"
                        }
                    >

                        <div className="andamento-info">

                            <div className="info-principal">

                                <div className="info-box">
                                    <span>Restaurante</span>

                                    <strong>
                                        {entregaAtual.restaurante}
                                    </strong>

                                    <small>
                                        {entregaAtual.enderecoRestaurante}
                                    </small>
                                </div>

                                <div className="info-box">
                                    <span>Cliente</span>

                                    <strong>
                                        {entregaAtual.cliente}
                                    </strong>

                                    <small>
                                        {entregaAtual.endereco}
                                    </small>
                                </div>

                            </div>

                            <div className="info-resumo">

                                <div>
                                    <span>Distância</span>
                                    <strong>
                                        {entregaAtual.distancia}
                                    </strong>
                                </div>

                                <div>
                                    <span>Itens</span>
                                    <strong>
                                        {entregaAtual.itens}
                                    </strong>
                                </div>

                                <div>
                                    <span>ETA</span>
                                    <strong>
                                        {entregaAtual.tempo}
                                    </strong>
                                </div>

                            </div>

                            <button
                                className="finalizar-entrega"
                                onClick={finalizarEntrega}

                            >
                                <LuBike />
                                Finalizar Entrega
                            </button>

                        </div>

                        {gpsVisivel && (
                            <div className="mapa-entrega">

                                <div className="mapa-status">
                                    🚗 Buscando no restaurante
                                </div>

                                <div className="mapa-ruas rua-1"></div>
                                <div className="mapa-ruas rua-2"></div>
                                <div className="mapa-ruas rua-3"></div>
                                <div className="mapa-ruas rua-4"></div>


                                <div className="ponto-inicial"></div>

                                <div className="ponto-final">
                                    R
                                </div>

                                <div className="chegada">
                                    <span>Chegada em</span>

                                    <strong>
                                        {entregaAtual.tempo}
                                    </strong>
                                </div>

                                <div className="instrucao">

                                    <div className="instrucao-icone">
                                        <IoArrowBack />
                                    </div>

                                    <div>
                                        <strong>
                                            Vire à esquerda
                                        </strong>

                                        <span>
                                            {entregaAtual.endereco}
                                        </span>
                                    </div>

                                    <IoChevronForward />

                                </div>

                                <div className="mapa-detalhes">

                                    <div>
                                        <span>Distância</span>

                                        <strong>
                                            {entregaAtual.distancia}
                                        </strong>
                                    </div>

                                    <div>
                                        <span>Destino</span>

                                        <strong>
                                            {entregaAtual.restaurante}
                                        </strong>
                                    </div>

                                </div>

                                <div className="mapa-acoes">

                                    <button>
                                        <IoMdCall />
                                        Ligar Cliente
                                    </button>

                                    <button>
                                        <TbNavigation />
                                        Google Maps
                                    </button>

                                </div>

                            </div>
                        )}

                    </div>

                </div>
            )}

            <div className="entregas">

                <h1>
                    Entregas Disponíveis
                </h1>

                {!online ? (

                    <div className="offline-card">

                        <div className="offline-icone">
                            <LuBike />
                        </div>

                        <div className="offline-conteudo">

                            <h2>
                                Você está offline
                            </h2>

                            <p>
                                Fique online para começar a receber
                                novas oportunidades de entrega.
                            </p>

                            <div className="offline-info">

                                <span>
                                    <LuBox />
                                    Novas entregas
                                </span>

                                <span>
                                    <FaRegClock />
                                    Disponíveis em tempo real
                                </span>

                            </div>


                            <button className={
                                online
                            }
                                onClick={alterarStatus}
                            >
                                ficar online
                            </button>

                        </div>

                    </div>

                ) : entregaAtual ? (

                    <div className="entrega-bloqueada">

                        <LuBox />

                        <h2>
                            Entrega em andamento
                        </h2>

                        <p>
                            Complete a entrega atual para aceitar
                            novas entregas.
                        </p>

                        <strong>
                            {entregaAtual.restaurante} • {entregaAtual.valor}
                        </strong>

                    </div>

                ) : (

                    entregas.map((entrega, index) => (

                        <div
                            className="card-entregas"
                            key={index}
                        >

                            <LuBox />

                            <h1>
                                {entrega.restaurante}
                            </h1>

                            <h1>
                                {entrega.valor}

                                <span>
                                    garantido
                                </span>
                            </h1>

                            <p>
                                {entrega.cliente}
                            </p>

                            <IoLocationOutline />

                            <p>
                                {entrega.endereco}
                            </p>

                            <TbLocation />

                            <p>
                                {entrega.distancia}
                            </p>

                            <FaRegClock />

                            <p>
                                ~{entrega.tempo}
                            </p>

                            <LuBox />

                            <p>
                                {entrega.itens}
                            </p>

                            <button
                                onClick={() =>
                                    aceitarEntrega(entrega)
                                }
                            >
                                <LuBike />
                                Aceitar Entrega
                            </button>

                        </div>

                    ))

                )}

            </div>

        </div>
    );
}