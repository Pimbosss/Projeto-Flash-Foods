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

    const updatedField = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setCredentials({ ...credentials, [name]: value });
    };

    const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        if (document.activeElement instanceof HTMLElement) {
            document.activeElement.blur();
        }

        if (!credentials.email || !credentials.password) {
            alert("Todos os campos são obrigatórios!");
            return;
        }

        api.get(`/users?email=${credentials.email}`)
            .then(resp => {
                const usuarioEncontrado = resp.data;
                
                if (usuarioEncontrado.length === 0) {
                    alert("Usuário não encontrado!");
                    return;
                }

                const usuario = usuarioEncontrado[0];

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
