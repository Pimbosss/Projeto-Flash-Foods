'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/services/api"; 
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

    const save = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!user.email || !user.cpf || !user.phone || !user.password || !user.confirmPassword || !user.name) {
            alert("Todos os campos são obrigatórios! 📝");
            return;
        }

        if (user.password !== user.confirmPassword) {
            alert("As senhas não coincidem! Por favor, digite a mesma senha nos campos de senha e confirmação. ❌");
            return;
        }

        try {
            const respCheck = await api.get(`/users?email=${user.email.toLowerCase().trim()}`);
            
            if (respCheck.data && respCheck.data.length > 0) {
                alert("Este e-mail já está cadastrado no sistema! ⚠️");
                return;
            }

            const userToSave: Usuario = {
                email: user.email.toLowerCase().trim(),
                name: user.name,
                cpf: user.cpf,
                phone: user.phone,
                password: user.password,
                tipo: "cliente"
            };

            await api.post('/users', userToSave);
            
            alert("Cadastro realizado com sucesso! Bem-vindo ao Flash Foods. 🎉");
            setUser(initialState);
            router.push("/login");

        } catch (error) {
            console.error("Erro ao processar o cadastro de usuário:", error);
            alert("Ocorreu um erro ao tentar realizar o cadastro. Por favor, tente novamente mais tarde.");
        }
    };

    return {
        router,
        user,
        updatedField,
        save
    };
}
