'use client';

import styles from '../area-e.module.css';
import { FiMapPin, FiNavigation, FiClock } from "react-icons/fi";

interface ListaEntregasProps {
    entregas: any[];
    online: boolean;
    aceitarEntrega: (entrega: any) => void;
}

export default function ListaEntregas({ entregas, online, aceitarEntrega }: ListaEntregasProps) {
    return (
        <div>
            <h2 className={styles.tituloLista}>
                Entregas Disponíveis
            </h2>

            <div className={styles.cardsGrid}>
                {entregas.length === 0 ? (
                    <div className={styles.avisoListaVazia}>
                        <span>📭</span>
                        <h3>Nenhuma corrida pendente</h3>
                        <p>Vá no cardápio, faça uma compra para criar um pedido real!</p>
                    </div>
                ) : (
                    entregas.map((entrega: any) => (
                        <div className={styles.cardAvailable} key={entrega.id}>
                            <div className={styles.topoCard}>
                                <div className={styles.perfilLojaContainer}>
                                    <div className={styles.iconeLoja}>🏪</div>
                                    <div>
                                        <h3 className={styles.nomeLojaSub}>{entrega.restaurante}</h3>
                                        <p className={styles.idPedidoSub}>Pedido #{entrega.id}</p>
                                    </div>
                                </div>
                                <div className={styles.valoresContainer}>
                                    <span className={styles.precoGarantido}>{entrega.valor}</span>
                                    <span className={styles.tagGarantido}>garantido</span>
                                </div>
                            </div>

                            <div className={styles.corpoCardItens}>
                                <p className={styles.enderecoTexto}>
                                    <FiMapPin /> {entrega.endereco}
                                </p>
                                <div className={styles.metricasCorrida}>
                                    <span className={styles.itemMetrica}>
                                        <FiNavigation /> {entrega.distancia || "1.2 km"}
                                    </span>
                                    <span className={styles.itemMetrica}>
                                        <FiClock /> {entrega.tempo || "15 min"}
                                    </span>
                                    <span className={styles.totalItensCorrida}>
                                        📦 {entrega.itens ? entrega.itens.reduce((total: number, i: any) => total + i.quantidade, 0) : 0} itens
                                    </span>
                                </div>
                            </div>

                            <button
                                onClick={() => aceitarEntrega(entrega)}
                                disabled={!online}
                                className={`${styles.btnAccept} ${!online ? styles.btnDisabled : ""}`}
                            >
                                Aceitar Entrega
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
