'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from '@/services/api';
import Usuario from '@/core/Usuarios';

export default function usePerfil() {
    const router = useRouter();
    const [userData, setUserData] = useState<Usuario | null>(null);

    // 🔄 Manipulador dinâmico de digitação nos inputs
    const updatedField = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        if (userData) {
            setUserData({ ...userData, [name]: value });
        }
    };

    // 🔒 TRAVA DE SEGURANÇA E BUSCA DE DADOS INICIAL
    useEffect(() => {
        const session = localStorage.getItem("flashfoods:user");

        if (!session) {
            alert('Acesso negado, Faça login.');
            router.push('/login');
            return;
        }

        const loggedUser = JSON.parse(session);

        api.get(`/users/${loggedUser.id}`)
            .then(resp => {
                setUserData(resp.data);
            })
            .catch(err => {
                console.log('Erro na requisição de perfil:', err);
            });
    }, [router]);

    // 📤 DISPARA A PERSISTÊNCIA DOS DADOS NO DB.JSON VIA PUT
    const save = () => {
        const idUsuario = userData?.id;
        if (!idUsuario) return;

        api.put(`/users/${idUsuario}`, userData)
            .then(resp => {
                alert('Dados salvos com sucesso.');
                const session = localStorage.getItem('flashfoods:user');

                if (session) {
                    const loggedUser = JSON.parse(session);
                    const novaSessao = {
                        ...loggedUser,
                        email: resp.data.email,
                        name: resp.data.name
                    };
                    // Atualiza os dados vivos do cabeçalho no navegador
                    localStorage.setItem('flashfoods:user', JSON.stringify(novaSessao));
                }
                // Emite um aviso global para atualizar o Header em tempo real
                window.dispatchEvent(new Event("perfilAtualizado"));    
            })
            .catch(err => {
                console.error("Erro ao salvar:", err);
                alert("Erro ao salvar os dados.");
            });
    };

    return {
        userData,
        router,
        updatedField,
        save
    };
}
