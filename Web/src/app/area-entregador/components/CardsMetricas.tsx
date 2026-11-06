import styles from '../area-e.module.css'
import { HiOutlineCurrencyDollar, HiOutlineTrendingUp, HiOutlineClock } from "react-icons/hi";
import { FiBox, FiStar } from "react-icons/fi";

interface CardsMetricasProps {
    ganhosHoje: number;
    entregasTotais: number;
    diferencaOntem: number;
    tempoTotal: number;
    formatarTempo: (tempo: number) => string;
}

export default function CardsMetricas({ ganhosHoje, entregasTotais, diferencaOntem, tempoTotal, formatarTempo }: CardsMetricasProps) {
    return (
        <div className={styles.metricsGrid}>

            {/* CARD 1: Ganhos Hoje */}
            <div className={styles.metricCard}>
                <span>Ganhos Hoje</span>
                <h2>R\$ {ganhosHoje.toFixed(2).replace(".", ",")}</h2>
                <p style={{ fontSize: "12px", color: "#10b981", fontWeight: "600", display: "flex", alignItems: "center", gap: "4px" }}>
                    <HiOutlineTrendingUp /> {diferencaOntem >= 0 ? `+R$ ${diferencaOntem.toFixed(2)} vs ontem` : `-R$ ${Math.abs(diferencaOntem).toFixed(2)} vs ontem`}
                </p>
                <HiOutlineCurrencyDollar style={{ position: "absolute", top: "24px", right: "24px", fontSize: "24px", color: "#10b981" }} />
            </div>

            {/* CARD 2: Entregas */}
            <div className={styles.metricCard}>
                <span>Entregas</span>
                <h2>{entregasTotais}</h2>
                <p style={{ fontSize: "12px", color: "#64748b", fontWeight: "600" }}>Meta: 15 hoje</p>
                <FiBox style={{ position: "absolute", top: "24px", right: "24px", fontSize: "22px", color: "#f97316" }} />
            </div>

            {/* CARD 3: Avaliação */}
            <div className={styles.metricCard}>
                <span>Avaliação</span>
                <h2>4.9</h2>
                <p style={{ fontSize: "12px", color: "#94a3b8", fontWeight: "500" }}>2.453 avaliações</p>
                <FiStar style={{ position: "absolute", top: "24px", right: "24px", fontSize: "22px", color: "#eab308", fill: "#eab308" }} />
            </div>

            {/* CARD 4: Tempo Online */}
            <div className={styles.metricCard}>
                <span>Tempo Online</span>
                <h2>{tempoTotal > 0 ? formatarTempo(tempoTotal) : "5h 32m"}</h2>
                <p style={{ fontSize: "12px", color: "#94a3b8", fontWeight: "500" }}>Desde 09:00</p>
                <HiOutlineClock style={{ position: "absolute", top: "24px", right: "24px", fontSize: "24px", color: "#3b82f6" }} />
            </div>

        </div>
    )
}