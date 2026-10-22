'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/services/api";
import Usuario from "@/core/Usuarios";


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

export default function useCadastroRestaurante() {
    const router = useRouter();
    const [restaurante, setRestaurante] = useState<CadastroRestauranteForm>({ ...formInitialState });

    const updatedField = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setRestaurante(prev => ({ ...prev, [name]: value }));
    };

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

            const respCheck = await api.get(`/users?email=${restaurante.email.toLowerCase().trim()}`);
            
            if (respCheck.data && respCheck.data.length > 0) {
                alert("Este e-mail comercial já está cadastrado no Flash Foods! Use outro e-mail. ⚠️");
                return;
            }
            
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

    return {
        restaurante,
        router,
        updatedField,
        save
    };

}