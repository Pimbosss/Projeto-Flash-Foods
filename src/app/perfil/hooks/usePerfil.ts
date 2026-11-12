'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Usuario from '@/core/Usuarios';

export default function usePerfil() {
    const router = useRouter();
    const [userData, setUserData] = useState<Usuario | null>(null);

    const updatedField = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        if (userData) {
            setUserData({ ...userData, [name]: value });
        }
    };

    // 🔒 Trava de segurança e leitura do banco local do navegador
    useEffect(() => {
        const session = localStorage.getItem("flashfoods:user");

        if (!session) {
            alert('Acesso negado! Faça login para acessar o perfil. 🔐');
            router.push('/login');
            return;
        }

        const loggedUser = JSON.parse(session);
        const bancoLocal = localStorage.getItem("flashfoods:users_db");
        const listaUsuarios: Usuario[] = bancoLocal ? JSON.parse(bancoLocal) : [];

        const usuarioCompleto = listaUsuarios.find(u => String(u.id) === String(loggedUser.id));

        if (usuarioCompleto) {
            setUserData(usuarioCompleto);
        } else {
            // Fallback caso o usuário tenha sido logado antes de limpar o banco
            setUserData(loggedUser);
        }
    }, [router]);

    // 💾 Salva as alterações diretamente no localStorage
    const save = () => {
        if (!userData || !userData.id) return;

        const bancoLocal = localStorage.getItem("flashfoods:users_db");
        const listaUsuarios: Usuario[] = bancoLocal ? JSON.parse(bancoLocal) : [];

        const listaAtualizada = listaUsuarios.map(u => 
            String(u.id) === String(userData.id) ? userData : u
        );

        localStorage.setItem("flashfoods:users_db", JSON.stringify(listaAtualizada));

        // Atualiza também a sessão ativa do cabeçalho
        const session = localStorage.getItem('flashfoods:user');
        if (session) {
            const loggedUser = JSON.parse(session);
            const novaSessao = {
                ...loggedUser,
                email: userData.email,
                name: userData.name
            };
            localStorage.setItem('flashfoods:user', JSON.stringify(novaSessao));
        }

        window.dispatchEvent(new Event("perfilAtualizado"));
        alert('Dados do perfil salvos com sucesso! ✨');
    };

    return {
        userData,
        router,
        updatedField,
        save
    };
}
