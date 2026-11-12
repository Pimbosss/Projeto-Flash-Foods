'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";

const initialState = {
    email: "",
    password: "",
};

export default function useLogin() {
    const router = useRouter();
    const [credentials, setCredentials] = useState({ ...initialState });

    const updatedField = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setCredentials({ ...credentials, [name]: value });
    };

    const handleLogin = (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (document.activeElement instanceof HTMLElement) {
            document.activeElement.blur();
        }

        if (!credentials.email || !credentials.password) {
            alert("Todos os campos são obrigatórios!");
            return;
        }

        // 📦 1. Busca a lista de usuários cadastrados no navegador
        const bancoLocal = localStorage.getItem("flashfoods:users_db");
        const listaUsuarios = bancoLocal ? JSON.parse(bancoLocal) : [];

        // 🔍 2. Procura o usuário pelo e-mail
        const emailLimpo = credentials.email.toLowerCase().trim();
        const usuario = listaUsuarios.find((u: any) => u.email.toLowerCase() === emailLimpo);

        if (!usuario) {
            alert("Usuário não encontrado! Crie uma conta primeiro.");
            return;
        }

        // 🔑 3. Valida a senha e salva a sessão ativa
        if (usuario.password === credentials.password) {
            alert("Login realizado com sucesso!");

            localStorage.setItem("flashfoods:user", JSON.stringify({
                id: usuario.id,
                name: usuario.name,
                email: usuario.email,
                tipo: usuario.tipo || 'cliente',
                restauranteId: usuario.restauranteId
            }));

            setCredentials(initialState);
            window.dispatchEvent(new Event("perfilAtualizado"));
            router.push("/", { scroll: true });
        } else {
            alert("Senha incorreta!");
        }
    };

    return {
        credentials,
        router,
        updatedField,
        handleLogin
    };
}
