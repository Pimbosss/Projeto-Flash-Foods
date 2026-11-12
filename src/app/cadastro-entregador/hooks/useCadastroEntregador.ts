'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
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

    const save = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!entregador.email || !entregador.name || !entregador.password || !entregador.cnh) {
            alert("Por favor, preencha todos os campos obrigatórios! 📝");
            return;
        }

        if (entregador.password !== entregador.confirmPassword) {
            alert("As senhas não coincidem! ❌");
            return;
        }

        const bancoLocal = localStorage.getItem("flashfoods:users_db");
        const listaUsuarios: Usuario[] = bancoLocal ? JSON.parse(bancoLocal) : [];

        const emailLimpo = entregador.email.toLowerCase().trim();
        const emailExiste = listaUsuarios.some(u => u.email.toLowerCase() === emailLimpo);

        if (emailExiste) {
            alert("Este e-mail já está cadastrado no sistema! Por favor, use outro endereço. ⚠️");
            return;
        }

        const { confirmPassword, ...dadosSemConfirmacao } = entregador;
        const novoEntregador: Usuario = {
            ...dadosSemConfirmacao,
            id: String(Date.now()),
            email: emailLimpo,
            tipo: "entregador"
        };

        listaUsuarios.push(novoEntregador);
        localStorage.setItem("flashfoods:users_db", JSON.stringify(listaUsuarios));

        alert("Cadastro de entregador realizado com sucesso! Boas corridas. 🎉🏍️");
        setEntregador({ ...initialState });
        router.push("/login");
    };

    return { entregador, updatedField, save, router };
}
