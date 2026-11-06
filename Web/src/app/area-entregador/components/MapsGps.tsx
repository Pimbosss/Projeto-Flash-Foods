import styles from '../area-e.module.css'
import { FiPhone } from "react-icons/fi";

interface MapsGpsProps {
    entregaAtual: any;
    finalizarEntrega: () => void;
}

export default function MapsGps({ entregaAtual, finalizarEntrega }: MapsGpsProps) {
    return (
        <div className={styles.runningGrid}>

            {/* 🍊 CARD DA ESQUERDA LARANJA COMPLETO */}
            <div className={styles.orangeCard}>
                <div className={styles.infoBlock}>
                    <div>
                        <span>Restaurante</span>
                        <h2>{entregaAtual.restaurante}</h2>
                        <p style={{ fontSize: "14px", opacity: 0.9, margin: "4px 0 0" }}>Rua Augusta, 450</p>
                    </div>
                    <div>
                        <span>Cliente</span>
                        <h2>{entregaAtual.usuarioNome}</h2>
                        <p style={{ fontSize: "14px", opacity: 0.9, margin: "4px 0 0" }}>Av. Central, 456</p>
                    </div>
                </div>

                <div className={styles.miniPills}>
                    <div className={styles.pill}>
                        <span>Distância</span>
                        <strong>{entregaAtual.distancia}</strong>
                    </div>
                    <div className={styles.pill}>
                        <span>Itens</span>
                        <strong>
                            {entregaAtual.itens ? entregaAtual.itens.reduce((total: number, i: any) => total + i.quantidade, 0) : 0} itens
                        </strong>
                    </div>
                    <div className={styles.pill}>
                        <span>ETA</span>
                        <strong>{entregaAtual.tempo}</strong>
                    </div>
                </div>
            </div>

            {/* 🗺️ CARD DA DIREITA: GPS COM MAPA E CONFIRMAÇÃO VERDE */}
            <div className={styles.gpsPanel}>
                <div className={styles.mapCanvas}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", position: "relative", zIndex: 10 }}>
                        <span style={{ background: "#ff6b00", color: "#fff", fontSize: "12px", padding: "6px 12px", borderRadius: "20px", fontWeight: "700" }}>#️⃣ Rota em andamento</span>
                        <span style={{ background: "#ffffff", border: "1px solid #cbd5e1", padding: "6px 12px", borderRadius: "12px", fontSize: "13px", fontWeight: "700" }}>Chegada em <strong style={{ color: "#ff6b00" }}>1 min</strong></span>
                    </div>
                    <div className={styles.mapGridOverlay} />
                    <div style={{ position: "absolute", bottom: "50px", left: "40%", width: "80px", height: "4px", backgroundColor: "#ff6b00" }} />
                    <div style={{ position: "absolute", bottom: "50px", left: "60%", width: "4px", height: "50px", backgroundColor: "#ff6b00" }} />
                </div>

                <div className={styles.directionBanner}>
                    <div style={{ width: "32px", height: "32px", borderRadius: "50%", border: "2px solid #fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold" }}>➔</div>
                    <div>
                        <h4 style={{ margin: 0, fontSize: "15px", fontWeight: "700" }}>Destino à direita</h4>
                        <p style={{ margin: "2px 0 0", fontSize: "12px", color: "rgba(255,255,255,0.85)" }}>Rua das Flores, 123</p>
                    </div>
                </div>

                <div style={{ display: "flex", justifyContent: "space-around", padding: "16px 20px", borderBottom: "1px solid #f1f5f9", textAlign: "center" }}>
                    <div><span style={{ fontSize: "11px", color: "#94a3b8", display: "block" }}>Distância</span><strong style={{ fontSize: "14px" }}>1.8 km</strong></div>
                    <div><span style={{ fontSize: "11px", color: "#94a3b8", display: "block" }}>Destino</span><strong style={{ fontSize: "14px" }}>Av. Central, 456</strong></div>
                </div>

                <div className={styles.actionsContainer}>
                    <div
                        style={{
                            backgroundColor: "#ecfdf5",
                            border: "1px solid #a7f3d0",
                            color: "#065f46",
                            textAlign: "center",
                            padding: "10px",
                            borderRadius: "10px",
                            fontSize: "14px",
                            fontWeight: "600"
                        }}>
                        Você chegou ao destino!
                    </div>
                    <button onClick={finalizarEntrega} className={styles.btnConfirm}>✓ Confirmar Entrega</button>
                    <div className={styles.utilButtons}>
                        <button className={styles.btnUtil}><FiPhone /> Ligar</button>
                        <button className={styles.btnUtil}>🗺️ Maps</button>
                    </div>
                </div>
            </div>

        </div>
    );
}