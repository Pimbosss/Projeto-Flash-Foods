'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/services/api";
import Usuario from "@/core/Usuarios";


interface CadastroRestauranteForm extends Usuario {
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

    
    const save = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!restaurante.email || !restaurante.name || !restaurante.password || !restaurante.cnpj || !restaurante.nomeRestaurante) {
            alert("Por favor, preencha todos os campos obrigatórios! 📝");
            return;
        }

        if (restaurante.password !== restaurante.confirmPassword) {
            alert("As senhas não coincidem! ❌");
            return;
        }

        try {

            const respCheck = await api.get(`/users?email=${restaurante.email.toLowerCase().trim()}`);
            
            if (respCheck.data && respCheck.data.length > 0) {
                alert("Este e-mail comercial já está cadastrado no Flash Foods! Use outro e-mail. ⚠️");
                return;
            }
            
            const payloadUsuarioInicial = {
                name: restaurante.name,
                email: restaurante.email,
                phone: restaurante.phone,
                cpf: restaurante.cpf,
                password: restaurante.password,
                tipo: "restaurante" as const,
                restauranteId: "" 
            };

            const resUsuario = await api.post("/users", payloadUsuarioInicial);
            const idDoUsuarioOficial = resUsuario.data.id;

            const payloadLoja = {
                nome: restaurante.nomeRestaurante,
                cnpj: restaurante.cnpj,
                categoria: restaurante.categoria,
                usuarioId: idDoUsuarioOficial, 
                produtos: []
            };

            const resLoja = await api.post("/restaurantes", payloadLoja);
            const idDaLojaOficial = resLoja.data.id; 

            const payloadUsuarioFinal = {
                ...payloadUsuarioInicial,
                restauranteId: idDaLojaOficial 
            };
            await api.put(`/users/${idDoUsuarioOficial}`, payloadUsuarioFinal);

            alert("Restaurante cadastrado e sincronizado com perfeição absoluta pelo banco! 🏪✨");
            setRestaurante({ ...formInitialState });
            router.push("/login");

        } catch (error) {
            console.error("Erro no fluxo em cadeia do cadastro:", error);
            alert("Erro de comunicação com o servidor simulado.");
        }
    };

    return {
        restaurante,
        router,
        updatedField,
        save
    };

}