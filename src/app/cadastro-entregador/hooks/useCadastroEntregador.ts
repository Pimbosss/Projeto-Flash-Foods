'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from '@/services/api';
import Usuario from '@/core/Usuarios';

const initialState: Usuario = {
    name: "",
    email: "",
    phone: "",
    cpf: "",
    cnh: "",
    placaVeiculo: "",
    password: "",
    confirmPassword: "",
    tipo: "entregador"
};

export default function useCadastroEntregador() {
    const router = useRouter();
    const [entregador, setEntregador] = useState<Usuario>({ ...initialState });

    const updatedField = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEntregador(prev => ({ ...prev, [name]: value }));
    };

    const save = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        // 1. Validação de campos obrigatórios
        if (!entregador.email || !entregador.name || !entregador.password || !entregador.cnh) {
            alert("Por favor, preencha todos os campos obrigatórios! 📝");
            return;
        }

        // 2. Validação se as senhas coincidem
        if (entregador.password !== entregador.confirmPassword) {
            alert("As senhas não coincidem! ❌");
            return;
        }

        try {
            // 🔍 3. NOVO BLOQUEIO DE SEGURANÇA UNIFICADO:
            // Faz a busca exata para garantir que nenhum outro usuário já use este e-mail
            const respCheck = await api.get(`/users?email=${entregador.email.toLowerCase().trim()}`);
            
            if (respCheck.data && respCheck.data.length > 0) {
                alert("Este e-mail já está cadastrado no sistema! Por favor, use outro endereço. ⚠️");
                return;
            }

            // 4. Formata o e-mail para minúsculo e remove o confirmPassword antes de disparar
            const dadosTratados = {
                ...entregador,
                email: entregador.email.toLowerCase().trim()
            };
            const { confirmPassword, ...dadosParaSalvar } = dadosTratados;

            // 🚀 Envio definitivo para a gaveta global /users
            await api.post('/users', dadosParaSalvar);

            alert("Cadastro de entregador realizado com sucesso! Boas corridas. 🎉🏍️");
            setEntregador({ ...initialState });
            router.push("/login");
        } catch (error) {
            console.error("Erro ao cadastrar perfil de entregador:", error);
            alert("Erro ao conectar com o servidor simulado ao tentar salvar.");
        }
    };

    return { entregador, updatedField, save, router };
}
