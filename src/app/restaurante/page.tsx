'use client';

import styles from "./restaurante.module.css";
import { IoMdRestaurant } from "react-icons/io";
import { FaStar } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import VisaoGeral from "./components/VisaoGeral";
import Produtos from "./components/Produtos";
import Pedidos from "./components/Pedidos";
import Perfil from "./components/Perfil";
import useAreaRestaurante from "./hooks/useAreaRestaurante";

export default function AreaRestaurante() {

    const { abaAtiva, setAbaAtiva, dados, pedidos } = useAreaRestaurante();
    
    return (
        <div className={`${styles.meuRestaurante}`}>
            {/* SEÇÃO DE INFOS DO ESTABELECIMENTO (O CARD DE APRESENTAÇÃO) */}
            <div className={styles.infos}>
                <div className={styles.icon}>
                    <IoMdRestaurant />
                </div>

                <div className={styles.dadosRestaurante}>
                    <h1>{dados.nome || "Carregando..."}</h1>

                    <div className={styles.avaliacaoRestaurante}>
                        <FaStar />
                        <span>5.0</span>
                    </div>

                    <div className={styles.enderecoRestaurante}>
                        <IoLocationOutline />
                        <span>{dados.endereco}</span>
                    </div>
                </div>
            </div>

            <nav className={styles.menuRestaurante}>
                <button className={abaAtiva === "visao-geral" ? styles.active : ""} onClick={() => setAbaAtiva("visao-geral")}>Visão Geral</button>
                <button className={abaAtiva === "produtos" ? styles.active : ""} onClick={() => setAbaAtiva("produtos")}>Produtos</button>
                <button className={abaAtiva === "pedidos" ? styles.active : ""} onClick={() => setAbaAtiva("pedidos")}>Pedidos</button>
                <button className={abaAtiva === "perfil" ? styles.active : ""} onClick={() => setAbaAtiva("perfil")}>Perfil</button>
            </nav>

            <main className={styles.conteudoRestaurante}>
                {abaAtiva === "visao-geral" && <VisaoGeral dadosLoja={dados} pedidos={pedidos} />}
                {abaAtiva === "produtos" && <Produtos dadosLoja={dados} />}
                {abaAtiva === "pedidos" && <Pedidos dadosLoja={dados}/>}
                {abaAtiva === "perfil" && <Perfil dadosLoja={dados} />}
            </main>
        </div>
    );
}
