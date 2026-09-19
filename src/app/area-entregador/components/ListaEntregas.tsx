import styles from '../area-e.module.css'
import { FiMapPin, FiNavigation, FiClock } from "react-icons/fi";

interface ListaEntregasProps {
    entregas: any[]
    online: boolean
    aceitarEntrega: (entrega: any) => void
}

export default function ListaEntregas({ entregas, online, aceitarEntrega }: ListaEntregasProps) {
    return (
        <div>
            <h2 style={{ color: "#0f172a", fontSize: "22px", fontWeight: "800", marginBottom: "24px" }}>
                Entregas Disponíveis
            </h2>

            <div className={styles.cardsGrid}>
                {entregas.length === 0 ? (
                    <div style={{ gridColumn: "span 2", background: "#ffffff", padding: "60px 20px", borderRadius: "20px", border: "1px solid #e2e8f0", textAlign: "center", color: "#64748b" }}>
                        <span style={{ fontSize: "40px" }}>📭</span>
                        <h3 style={{ marginTop: "16px", color: "#0f172a", fontWeight: "700" }}>Nenhuma corrida pendente</h3>
                        <p style={{ fontSize: "14px", marginTop: "4px" }}>Vá no cardápio, faça uma compra para criar um pedido real!</p>
                    </div>
                ) : (
                    entregas.map((entrega: any) => (
                        <div className={styles.cardAvailable} key={entrega.id}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                                <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                                    <div style={{ width: "44px", height: "44px", background: "#fff7ed", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", color: "#f97316" }}>🏪</div>
                                    <div>
                                        <h3 style={{ fontSize: "18px", color: "#0f172a", fontWeight: "700", margin: 0 }}>{entrega.restaurante}</h3>
                                        <p style={{ fontSize: "13px", color: "#64748b", margin: "2px 0 0" }}>Pedido #{entrega.id}</p>
                                    </div>
                                </div>
                                <div style={{ textAlign: "right" }}>
                                    <span style={{ fontSize: "20px", color: "#10b981", fontWeight: "800", display: "block" }}>{entrega.valor}</span>
                                    <span style={{ fontSize: "11px", color: "#94a3b8", fontWeight: "600", textTransform: "uppercase" }}>garantido</span>
                                </div>
                            </div>

                            <div style={{ display: "flex", flexDirection: "column", gap: "8px", borderTop: "1px dashed #e2e8f0", borderBottom: "1px dashed #e2e8f0", padding: "14px 0" }}>
                                <p style={{ fontSize: "14px", color: "#475569", margin: 0, display: "flex", alignItems: "center", gap: "6px" }}>
                                    <FiMapPin /> {entrega.endereco}</p>
                                <div style={{ display: "flex", gap: "16px", marginTop: "4px" }}>
                                    <span style={{ fontSize: "13px", color: "#64748b", display: "flex", alignItems: "center", gap: "4px" }}>
                                        <FiNavigation /> {entrega.distancia}
                                    </span>
                                    <span style={{ fontSize: "13px", color: "#64748b", display: "flex", alignItems: "center", gap: "4px" }}>
                                        <FiClock /> {entrega.tempo}
                                    </span>
                                    <span style={{ fontSize: "13px", color: "#64748b" }}>
                                        📦{entrega.itens ? entrega.itens.reduce((total: number, i: any) => total + i.quantidade, 0) : 0} item
                                    </span>
                                </div>
                            </div>

                            <button
                                onClick={() => aceitarEntrega(entrega)}
                                disabled={!online}
                                style={{
                                    background: online ? "linear-gradient(135deg, #ff7100 0%, #ff4b00 100%)" : "#cbd5e1",
                                    cursor: online ? "pointer" : "not-allowed",
                                    boxShadow: online ? "0 4px 12px rgba(255,75,0,0.15)" : "none"
                                }}
                                className={styles.btnAccept}
                            >
                                Aceitar Entrega
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}