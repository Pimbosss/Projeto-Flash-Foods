'use client';

import { useState, useEffect } from "react";
import { api } from "@/services/api"; // Instância unificada do Axios do seu grupo
import styles from "../restaurante.module.css"; // Seus estilos modulares unificados
import { FaStore, FaRegFileAlt, FaMapMarkerAlt } from "react-icons/fa";

interface PerfilProps {
    dadosLoja: any; // Recebe os dados de identificação vindos da page.tsx mãe
}

export default function Perfil({ dadosLoja }: PerfilProps) {
    const [loading, setLoading] = useState(false);
    
    // 📥 Estado local que controla os campos do formulário comercial
    const [formLoja, setFormLoja] = useState({
        nome: "",
        cnpj: "",
        categoria: "",
        endereco: ""
    });

    // 🔄 Sincroniza os campos do formulário assim que os dados da mãe chegam do servidor
    useEffect(() => {
        if (dadosLoja) {
            setFormLoja({
                nome: dadosLoja.nome || "",
                cnpj: dadosLoja.cnpj || "",
                categoria: dadosLoja.categoria || "Pizza",
                endereco: dadosLoja.endereco || "Av. Paulista, 900 (Unidade Cadastrada)"
            });
        }
    }, [dadosLoja]);

    const alterarCampo = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormLoja(prev => ({ ...prev, [name]: value }));
    };

    // 📤 DISPARA A ATUALIZAÇÃO DOS DADOS COMERCIAIS DIRETO NA GAVETA /RESTAURANTES
    const salvarAlteracoesComerciais = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!dadosLoja?.id) {
            alert("Erro: ID identificador do restaurante não encontrado na sessão. ❌");
            return;
        }

        setLoading(true);
        try {
            // 🛡️ RECOLA DE SEGURANÇA: Copia tudo o que a loja já tinha (incluindo o usuarioId e o CARDÁPIO de produtos!)
            // e injeta por cima apenas os dados novos digitados nos inputs!
            const dadosAtualizados = {
                ...dadosLoja, 
                nome: formLoja.nome,
                cnpj: formLoja.cnpj,
                categoria: formLoja.categoria,
                endereco: formLoja.endereco
            };

            // Dá o PUT na rota física correspondente do seu json-server
            await api.put(`/restaurantes/${dadosLoja.id}`, dadosAtualizados);
            
            alert("Dados comerciais do estabelecimento atualizados com sucesso! 🏪✨");
            
            // Força um recarregamento leve da página para atualizar o título global do topo na mesma hora
            window.location.reload();
        } catch (error) {
            console.error("Erro ao atualizar o perfil comercial do restaurante:", error);
            alert("Erro ao conectar com o servidor simulado ao tentar salvar.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.informacoesRestaurante}>
            <h1>Configurações do Estabelecimento</h1>

            <form className={styles.formRestaurante} onSubmit={salvarAlteracoesComerciais}>
                
                {/* CAMPO 1: NOME FANTASIA */}
                <div className={styles.campo}>
                    <label htmlFor="nome">Nome Fantasia do Restaurante</label>
                    <div className={styles.inputIcon}>
                        <FaStore />
                        <input 
                            type="text" 
                            id="nome" 
                            name="nome" 
                            value={formLoja.nome} 
                            onChange={alterarCampo} 
                            placeholder="Ex: Burguer Sênior Unidade Central"
                            required 
                        />
                    </div>
                </div>

                {/* CAMPO 2: CNPJ DA EMPRESA */}
                <div className={styles.campo}>
                    <label htmlFor="cnpj">CNPJ Oficial</label>
                    <div className={styles.inputIcon}>
                        <FaRegFileAlt />
                        <input 
                            type="text" 
                            id="cnpj" 
                            name="cnpj" 
                            value={formLoja.cnpj} 
                            onChange={alterarCampo} 
                            placeholder="00.000.000/0001-00"
                            required 
                        />
                    </div>
                </div>

                {/* LINHA DUPLA: CATEGORIA E ENDEREÇO */}
                <div className={styles.linhaCampos}>
                    <div className={styles.campo}>
                        <label htmlFor="categoria">Segmento / Categoria de Cozinha</label>
                        <select 
                            id="categoria" 
                            name="categoria" 
                            value={formLoja.categoria} 
                            onChange={alterarCampo}
                            style={{ width: "100%", height: "42px", padding: "0 16px", border: "1px solid #dfe3e8", borderRadius: "14px", backgroundColor: "#fff", color: "#10213b", fontSize: "13px", outline: "none" }}
                        >
                            <option value="Pizza">Pizza 🍕</option>
                            <option value="Hambúrguer">Hambúrguer 🍔</option>
                            <option value="Japonesa">Japonesa 🍣</option>
                            <option value="Bebidas">Bebidas & Refrescos 🥤</option>
                            <option value="Sobremesas">Doces & Sobremesas 🍰</option>
                            <option value="Salgados">Salgados & Lanches 🥐</option>
                        </select>
                    </div>

                    <div className={styles.campo}>
                        <label htmlFor="endereco">Endereço Comercial de Entrega</label>
                        <div className={styles.inputIcon}>
                            <FaMapMarkerAlt />
                            <input 
                                type="text" 
                                id="endereco" 
                                name="endereco" 
                                value={formLoja.endereco} 
                                onChange={alterarCampo} 
                                placeholder="Av. Paulista, 900"
                                required 
                            />
                        </div>
                    </div>
                </div>
                {/* BOTÃO SALVAR */}
                <button type="submit" className={styles.btnSalvar} disabled={loading}>
                    {loading ? "Sincronizando..." : "Salvar Alterações do Perfil 💾"}
                </button>

            </form>
        </div>
    );
}
