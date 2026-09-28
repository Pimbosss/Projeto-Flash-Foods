'use client'; // ⚠️ Gerencia estados, formulários e navegação local

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { api } from "@/services/api"; // Instância unificada do seu Axios
import Usuario from "@/core/Usuarios"; // Sua interface centralizada

// 📐 CONTRATO LOCAL: Estende o Usuário global para incluir os dados comerciais da loja na tela
interface CadastroRestauranteForm extends Usuario {
    nomeRestaurante: string;
    cnpj: string;
    categoria: string;
}

// 🟢 REGRA DE COESÃO: Estado inicial isolado fora do componente
const formInitialState: CadastroRestauranteForm = {
    name: "",          // Nome do Dono / Responsável
    email: "",
    phone: "",
    cpf: "",
    password: "",
    confirmPassword: "",
    tipo: "restaurante", // Já nasce travado como tipo restaurante
    nomeRestaurante: "", // Nome fantasia da loja
    cnpj: "",            // CNPJ da empresa
    categoria: "Pizza"   // Categoria padrão do select
};

export default function CadastroRestaurante() {
    const router = useRouter();
    const [restaurante, setRestaurante] = useState<CadastroRestauranteForm>({ ...formInitialState });

    const updatedField = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setRestaurante(prev => ({ ...prev, [name]: value }));
    };

   // 🟢 SUBSTITUA INTEGRALMENTE A FUNÇÃO save POR ESTA NO SEU cadastro-restaurante/page.tsx:
// 🟢 SUBSTITUA INTEGRALMENTE A FUNÇÃO save POR ESTA NO SEU cadastro-restaurante/page.tsx:
const save = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!restaurante.email || !restaurante.name || !restaurante.password || !restaurante.cnpj || !restaurante.nomeRestaurante) {
        alert("Por favor, preencha todos os campos obrigatórios! 📝");
        return;
    }

    if (restaurante.password !== restaurante.confirmPassword) {
        alert("As senhas não coincidem! ❌");
        return;
    }

    try {
        // 📦 PASSO 1: Cria o Perfil básico na gaveta /users
        const payloadUsuarioInicial = {
            name: restaurante.name,
            email: restaurante.email,
            phone: restaurante.phone,
            cpf: restaurante.cpf,
            password: restaurante.password,
            tipo: "restaurante" as const,
            restauranteId: "" // Fica vazio para ser atualizado no final
        };

        // 🔥 PRIMEIRO DISPARO: Cria o usuário e captura o ID dele
        const resUsuario = await api.post("/users", payloadUsuarioInicial);
        const idDoUsuarioOficial = resUsuario.data.id; 

        // 🏪 PASSO 2: Cria a Loja na gaveta /restaurantes (DEIXA O JSON-SERVER GERAR O ID DELA!)
        const payloadLoja = {
            nome: restaurante.nomeRestaurante,
            cnpj: restaurante.cnpj,
            categoria: restaurante.categoria,
            usuarioId: idDoUsuarioOficial, // Vincula o dono pelo ID oficial dele
            produtos: []
        };

        // 🔥 SEGUNDO DISPARO: Salva a loja e CAPTURA O ID REAL QUE O BANCO GEROU PARA A LOJA!
        const resLoja = await api.post("/restaurantes", payloadLoja);
        const idDaLojaOficial = resLoja.data.id; // 👈 Pega a hash real gerada para a loja!

        // 🔄 PASSO 3: Faz o PUT final no usuário amarrando a ID real da loja nele!
        const payloadUsuarioFinal = {
            ...payloadUsuarioInicial,
            restauranteId: idDaLojaOficial // 🔥 Salva a hash real e idêntica gerada pelo servidor!
        };
        await api.put(`/users/${idDoUsuarioOficial}`, payloadUsuarioFinal);

        alert("Restaurante cadastrado e sincronizado com perfeição absoluta pelo banco! 🏪✨");
        setRestaurante({ ...formInitialState });
        router.push("/login");

    } catch (error) {
        console.error("Erro no fluxo em cadeia do cadastro:", error);
        alert("Erro de comunicação com o servidor simulado.");
    }
};



    return (
        <div className="login-page">
            <div className="login-box">
                <button className="fechar" onClick={() => router.push("/")}>✕</button>

                <h1>Seja Parceiro</h1>
                <p>Cadastre seu restaurante e perfil de acesso no Flash Foods</p>

                <form className="cadastro-form" onSubmit={save}>
                    {/* SEÇÃO 1: DADOS DO ESTABELECIMENTO */}
                    <h3 style={{ margin: "20px 0 10px", fontSize: "14px", color: "#ff7200", textTransform: "uppercase" }}>🏢 Dados do Restaurante</h3>

                    <label htmlFor="nomeRestaurante">Nome Fantasia do Restaurante</label>
                    <input type="text" id="nomeRestaurante" name="nomeRestaurante" value={restaurante.nomeRestaurante} onChange={updatedField} placeholder="Ex: Pizzaria Mamma Mia Unidade 1" />

                    <label htmlFor="cnpj">CNPJ da Empresa</label>
                    <input type="text" id="cnpj" name="cnpj" value={restaurante.cnpj} onChange={updatedField} placeholder="Digite o CNPJ" />

                    <label htmlFor="categoria">Categoria de Cozinha</label>
                    <select id="categoria" name="categoria" value={restaurante.categoria} onChange={updatedField} style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #cbd5e1", marginBottom: "16px", backgroundColor: "#fff", color: "#10213b" }}>
                        <option value="Pizza">Pizza 🍕</option>
                        <option value="Hambúrguer">Hambúrguer 🍔</option>
                        <option value="Japonesa">Japonesa 🍣</option>
                        <option value="Doces">Doces & Sobremesas 🍰</option>
                    </select>

                    {/* SEÇÃO 2: DADOS DO PROPRIETÁRIO */}
                    <h3 style={{ margin: "25px 0 10px", fontSize: "14px", color: "#ff7200", textTransform: "uppercase" }}>🔑 Dados do Proprietário (Acesso)</h3>

                    <label htmlFor="name">Nome Completo do Responsável</label>
                    <input type="text" id="name" name="name" value={restaurante.name} onChange={updatedField} placeholder="Digite seu nome completo" />

                    <label htmlFor="email">Email Comercial (Login)</label>
                    <input type="email" id="email" name="email" value={restaurante.email} onChange={updatedField} placeholder="Ex: contato@sualoja.com" />

                    <label htmlFor="phone">Telefone de Contato</label>
                    <input type="tel" id="phone" name="phone" value={restaurante.phone} onChange={updatedField} placeholder="Digite o Telefone" />

                    <label htmlFor="password">Senha de Acesso</label>
                    <input type="password" id="password" name="password" value={restaurante.password} onChange={updatedField} placeholder="Crie uma senha forte" />

                    <label htmlFor="confirmPassword">Confirmar a Senha</label>
                    <input type="password" id="confirmPassword" name="confirmPassword" value={restaurante.confirmPassword} onChange={updatedField} placeholder="Digite a senha novamente" />

                    <button type="submit">Cadastrar Meu Restaurante 🏪</button>
                </form>

                <p className="link-login">
                    Já possui uma conta? <Link href="/login">Login</Link>
                </p>
            </div>
        </div>
    );
}
