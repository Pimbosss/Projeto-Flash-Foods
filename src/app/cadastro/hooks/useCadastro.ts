'use client'

import { useState, useEffect } from "react";
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
};

export default function Cadastro() {
        const router = useRouter();
    
        const [user, setUser] = useState<Usuario>({ ...initialState });
        const [list, setList] = useState<Usuario[]>([]);
    
        useEffect(() => {
            api.get('/users')
                .then(resp => {
                    setList(resp.data);
                })
                .catch(err => console.error("Erro ao carregar banco:", err));
        }, [])
    
        const updatedField = (event: React.ChangeEvent<HTMLInputElement>) => {
            const { name, value } = event.target;
            setUser({ ...user, [name]: value });
        };
    
        const save = (event: React.SubmitEvent<HTMLFormElement>) => {
            event.preventDefault();
            if (!user.email || !user.cpf || !user.phone || !user.password || !user.confirmPassword) {
                alert("Todos os campos são obrigatórios!");
                return;
            }
    
            if (user.password !== user.confirmPassword) {
                alert("Senha incorreta! Por favor, digite a mesma senha nos campos de senha e confirmação.");
                return;
            }
            const emailExiste = list.some(u => u.email.toLowerCase() === user.email.toLowerCase());
            if (emailExiste) {
                alert("Este e-mail já está cadastrado!");
                return;
            }
    
            const userToSave: Usuario = {
                email: user.email,
                name: user.name,
                cpf: user.cpf,
                phone: user.phone,
                password: user.password
            }
    
            api.post('/users', userToSave)
                .then(resp => {
                    alert("Cadastro realizado com sucesso!");
                    setUser(initialState);
                    router.push("/login");
                })
                .catch(error => {
                    console.error("Erro ao salvar usuário:", error);
                    alert("Ocorreu um erro ao realizar o cadastro. Por favor, tente novamente.");
                });
        }

    return {
        router,
        user,
        updatedField,
        save
    }

}