'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import Usuario from "@/core/Usuarios";

export interface CadastroRestauranteForm extends Usuario {
    nomeRestaurante: string;
    cnpj: string;
    categoria: string;
}

const formInitialState: CadastroRestauranteForm = {
    name: "",
    email: "",
    phone: "",
    cpf: "",
    password: "",
    confirmPassword: "",
    tipo: "restaurante",
    nomeRestaurante: "",
    cnpj: "",
    categoria: "Pizza"
};

export default function useCadastroRestaurante() {
    const router = useRouter();
    const [restaurante, setRestaurante] = useState<CadastroRestauranteForm>({ ...formInitialState });

    const updatedField = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setRestaurante(prev => ({ ...prev, [name]: value }));
    };

    const save = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!restaurante.email || !restaurante.name || !restaurante.password || !restaurante.cnpj || !restaurante.nomeRestaurante) {
            alert("Por favor, preencha todos os campos obrigatórios! 📝");
            return;
        }

        if (restaurante.password !== restaurante.confirmPassword) {
            alert("As senhas não coincidem! ❌");
            return;
        }

        const bancoUsuarios = localStorage.getItem("flashfoods:users_db");
        const listaUsuarios: Usuario[] = bancoUsuarios ? JSON.parse(bancoUsuarios) : [];

        const emailLimpo = restaurante.email.toLowerCase().trim();
        if (listaUsuarios.some(u => u.email.toLowerCase() === emailLimpo)) {
            alert("Este e-mail comercial já está cadastrado no Flash Foods! Use outro e-mail. ⚠️");
            return;
        }

        const idUsuario = `user_${Date.now()}`;
        const idLoja = `rest_${Date.now()}`;

        // 1. Cria a loja na gaveta local de restaurantes
        const bancoLojas = localStorage.getItem("flashfoods:restaurantes_db");
        const listaLojas = bancoLojas ? JSON.parse(bancoLojas) : [];

        listaLojas.push({
            id: idLoja,
            nome: restaurante.nomeRestaurante,
            cnpj: restaurante.cnpj,
            categoria: restaurante.categoria,
            usuarioId: idUsuario,
            produtos: []
        });
        localStorage.setItem("flashfoods:restaurantes_db", JSON.stringify(listaLojas));

        // 2. Cria o usuário dono amarrado ao ID da loja
        listaUsuarios.push({
            id: idUsuario,
            name: restaurante.name,
            email: emailLimpo,
            phone: restaurante.phone,
            cpf: restaurante.cpf,
            password: restaurante.password,
            tipo: "restaurante",
            restauranteId: idLoja
        });
        localStorage.setItem("flashfoods:users_db", JSON.stringify(listaUsuarios));

        alert("Restaurante cadastrado com sucesso! 🏪✨");
        setRestaurante({ ...formInitialState });
        router.push("/login");
    };

    return {
        restaurante,
        router,
        updatedField,
        save
    };
}
