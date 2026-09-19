'use client';
import '../cadastro/cadastro.css'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link'
import { api } from '@/services/api'
import Usuario from '@/core/Usuarios';

const initialState: Usuario = {
    name: "",
    email: "",
    phone: "",
    cpf: "",
    cnh: "", // 🏍️ Campo extra do entregador
    placaVeiculo: "", // 🏍️ Campo extra do entregador
    password: "",
    confirmPassword: "",
    tipo: "entregador" // 🔥 O SEGREDO: Salva travado como entregador no banco
}

export default function CadastroEntregador() {
    const router = useRouter()

    const [entregador, setEntregador] = useState<Usuario>({ ...initialState })

    const updatedField = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setEntregador(prev => ({ ...prev, [name]: value }))
    }

    const save = async (e: React.SubmitEvent) => {
        e.preventDefault()

        if (!entregador.email || !entregador.name || !entregador.password || !entregador.cnh) {
            alert("Por favor, preencha todos os campos obrigatórios! 📝");
            return;
        }

        if (entregador.password !== entregador.confirmPassword) {
            alert("As senhas não coincidem! ❌");
            return;
        }

        try {
            const { confirmPassword, ...dadosParaSalvar } = entregador

            await api.post("/users", dadosParaSalvar);
            alert("Cadastro salvo com sucesso! Faça login para ativar seu painel")

            setEntregador(initialState)
            router.push("/login")
        } catch (error) {
            console.error("Erro ao cadastrar o entregador", error)
            alert("Erro ao conectar ao servidor")
        }
    }
    return (
        <div className="cadastro-page">
            <div className="cadastro-box">
                <button className="fechar" onClick={() => router.push("/")}>✕</button>

                <h1>Seja Parceiro</h1>
                <p>Cadastre-se como entregador no Flash Foods</p>

                <form className="cadastro-form" onSubmit={save}>
                    <label htmlFor="name">Nome Completo</label>
                    <input
                        type="text"
                        id="name" name="name"
                        value={entregador.name}
                        onChange={updatedField}
                        placeholder="Digite seu Nome completo" />

                    <label htmlFor="email">Email Profissional</label>
                    <input
                        type="email"
                        id="email" name="email"
                        value={entregador.email}
                        onChange={updatedField}
                        placeholder="Digite seu email" />

                    <label htmlFor="phone">Telefone</label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={entregador.phone}
                        onChange={updatedField}
                        placeholder="Digite seu Telefone" />

                    <label htmlFor="cpf">CPF</label>
                    <input
                        type="text"
                        id="cpf"
                        name="cpf"
                        value={entregador.cpf}
                        onChange={updatedField}
                        placeholder="Digite seu CPF" />

                    {/* 🏍️ CAMPOS EXCLUSIVOS DE LOGÍSTICA */}
                    <label htmlFor="cnh">Número da CNH</label>
                    <input
                        type="text"
                        id="cnh"
                        name="cnh"
                        value={entregador.cnh}
                        onChange={updatedField}
                        placeholder="Digite sua CNH" />

                    <label htmlFor="placaVeiculo">Placa do Veículo (Moto/Carro)</label>
                    <input
                        type="text"
                        id="placaVeiculo"
                        name="placaVeiculo"
                        value={entregador.placaVeiculo}
                        onChange={updatedField}
                        placeholder="Ex: ABC1D23" />

                    <label htmlFor="password">Senha de Acesso</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={entregador.password}
                        onChange={updatedField}
                        placeholder="Crie uma senha" />

                    <label htmlFor="confirmPassword">Confirmar a Senha</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={entregador.confirmPassword}
                        onChange={updatedField}
                        placeholder="Digite a senha novamente" />

                    <button
                        type="submit">Concluir Cadastro 🏍️</button>
                </form>

                <p className="link-login">
                    Já possui uma conta? <Link href="/login">Login</Link>
                </p>
            </div>
        </div>
    );
}