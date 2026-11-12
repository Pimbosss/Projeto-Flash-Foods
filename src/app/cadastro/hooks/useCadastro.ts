'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import Usuario from "@/core/Usuarios";

const initialState: Usuario = {
    email: "",
    cpf: "",
    name: "",
    phone: "",
    password: "",
    confirmPassword: "",
    tipo: "cliente"
};

export default function useCadastro() {
    const router = useRouter();
    const [user, setUser] = useState<Usuario>({ ...initialState });

    const updatedField = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setUser({ ...user, [name]: value });
    };

    const save = (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!user.email || !user.cpf || !user.phone || !user.password || !user.confirmPassword || !user.name) {
            alert("Todos os campos são obrigatórios! 📝");
            return;
        }

        if (user.password !== user.confirmPassword) {
            alert("As senhas não coincidem! ❌");
            return;
        }

        // 📦 1. Lê o "banco de dados" local do navegador
        const bancoLocal = localStorage.getItem("flashfoods:users_db");
        const listaUsuarios: Usuario[] = bancoLocal ? JSON.parse(bancoLocal) : [];

        // 🔍 2. Verifica duplicidade de e-mail
        const emailLimpo = user.email.toLowerCase().trim();
        const emailExiste = listaUsuarios.some(u => u.email.toLowerCase() === emailLimpo);

        if (emailExiste) {
            alert("Este e-mail já está cadastrado no sistema! ⚠️");
            return;
        }

        // 🆔 3. Monta o novo usuário gerando um ID único
        const novoUsuario: Usuario = {
            id: String(Date.now()),
            email: emailLimpo,
            name: user.name,
            cpf: user.cpf,
            phone: user.phone,
            password: user.password,
            tipo: "cliente"
        };

        // 💾 4. Salva a lista atualizada no localStorage
        listaUsuarios.push(novoUsuario);
        localStorage.setItem("flashfoods:users_db", JSON.stringify(listaUsuarios));

        alert("Cadastro realizado com sucesso! Bem-vindo ao Flash Foods. 🎉");
        setUser(initialState);
        router.push("/login");
    };

    return {
        router,
        user,
        updatedField,
        save
    };
}
