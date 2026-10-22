'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from '@/services/api';

const initialState = {
    email: "",
    password: "",
};

export default function useLogin() {
    const router = useRouter();
    const [credentials, setCredentials] = useState({ ...initialState });

    // 🔄 Controla dinamicamente a digitação dos campos
    const updatedField = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setCredentials({ ...credentials, [name]: value });
    };

    // 🔑 SISTEMA CENTRAL DE AUTENTICAÇÃO E REGRA DE NEGÓCIO
    const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        // Remove o foco do botão para melhorar a experiência visual
        if (document.activeElement instanceof HTMLElement) {
            document.activeElement.blur();
        }

        // Validação de segurança inicial
        if (!credentials.email || !credentials.password) {
            alert("Todos os campos são obrigatórios!");
            return;
        }

        // Busca pelo e-mail informado
        api.get(`/users?email=${credentials.email}`)
            .then(resp => {
                const usuarioEncontrado = resp.data;
                
                if (usuarioEncontrado.length === 0) {
                    alert("Usuário não encontrado!");
                    return;
                }

                const usuario = usuarioEncontrado[0];

                // Compara a senha informada com a hash/texto do banco de dados
                if (usuario.password === credentials.password) {
                    alert("Login realizado com sucesso!");
                    
                    // Salva a sessão do usuário com todas as propriedades necessárias
                    localStorage.setItem("flashfoods:user", JSON.stringify({
                        id: usuario.id,
                        name: usuario.name,
                        email: usuario.email,
                        tipo: usuario.tipo || 'cliente',
                        restauranteId: usuario.restauranteId
                    }));

                    setCredentials(initialState);
                    
                    // Dispara o evento global para o Header se atualizar sozinho
                    window.dispatchEvent(new Event("perfilAtualizado"));
                    
                    // Redireciona de volta para a Home principal
                    router.push("/", { scroll: true }); 
                } else {
                    alert("Senha incorreta!");
                }
            })
            .catch(err => {
                console.error("Erro ao realizar login:", err);
                alert("Ocorreu um erro ao tentar fazer login. Por favor, tente novamente mais tarde.");
            });
    };

    return {
        credentials,
        router,
        updatedField,
        handleLogin
    };
}
