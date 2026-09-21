'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from '@/services/api'
import Usuario from '@/core/Usuarios'

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
}

export default function useCadastroEntregador() {
    const router = useRouter()
    const [entregador, setEntregador] = useState<Usuario>({ ...initialState })

    const updatedField = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setEntregador(prev => ({ ...prev, [name]: value }))
    }

    const save = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!entregador.email || !entregador.name || !entregador.password || !entregador.cnh) {
            alert("Por favor, preencha todos os campos obrigatórios! 📝");
            return
        }

        if (entregador.password !== entregador.confirmPassword) {
            alert("As senhas não coincidem! ❌");
            return
        }

        try {
            const {confirmPassword, ...dadosParaSalvar} = entregador
            await api.post('/users', dadosParaSalvar)

            alert("Cadastro de entregador realizado com sucesso")
            setEntregador({...initialState})
            router.push("/login")
        } catch(error) {
            console.error("Erro ao cadastrar", error)
            alert("Erro ao conectar com servidor")
        }
    }

    return {entregador, updatedField, save, router}
}