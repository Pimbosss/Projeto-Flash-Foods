'use client';

import useAreaEFunctions, { PedidoReal } from "./useAreaEFunctions";
import styles from "./area-e.module.css"; // 🟢 Importa as classes seguras
import CardsMetricas from "./components/CardsMetricas";
import MapsGps from "./components/MapsGps";
import ListaEntregas from "./components/ListaEntregas";

export default function AreaEntregador() {
    const {
        online,
        entregaAtual,
        ganhosHoje,
        entregasTotais,
        diferencaOntem,
        tempoTotal,
        entregas,
        alterarStatus,
        formatarTempo,
        aceitarEntrega,
        finalizarEntrega
    } = useAreaEFunctions();
    return (
        <>
            <div className={styles.container}>
                <CardsMetricas
                    ganhosHoje={ganhosHoje}
                    entregasTotais={entregasTotais}
                    diferencaOntem={diferencaOntem}
                    tempoTotal={tempoTotal}
                    formatarTempo={formatarTempo}
                />
                <div className={styles.statusContainer}>
                    <button onClick={alterarStatus} className={styles.statusBtn} style={{ color: online ? "#10b981" : "#ef4444" }}>
                        Status do Painel: {online ? "🟢 ONLINE" : "🔴 OFFLINE"}
                    </button>
                </div>
                <main className={styles.mainLayout}>
                    {entregaAtual ? (
                            <MapsGps
                            entregaAtual={entregaAtual}
                            finalizarEntrega={finalizarEntrega}
                            />
                    ) : (
                       <ListaEntregas
                       entregas={entregas}
                       online={online}
                       aceitarEntrega={aceitarEntrega}
                       />
                    )}
                </main>
            </div>
        </>
    )
}




