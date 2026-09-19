'use client';
import './cadastro.css'
import Link from "next/link";
import { useState, useEffect } from "react";
import { api } from '@/services/api'
import { useRouter } from "next/navigation";
import Usuario from '@/core/Usuarios'


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

    const save = (event: React.FormEvent) => {
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
                router.push("/Login");
            })
            .catch(error => {
                console.error("Erro ao salvar usuário:", error);
                alert("Ocorreu um erro ao realizar o cadastro. Por favor, tente novamente.");
            });


    }

    return (
        <div className="cadastro-page">
            <div className="cadastro-box">
                <button
                    className="fechar"
                    onClick={() => router.push("/", { scroll: false })}
                >
                    ✕
                </button>

                <h1>Cadastrar</h1>
                <p>Faça parte do Flash Foods</p>

                {/* Adicionado o evento onSubmit no formulário que chama a função save */}
                <form onSubmit={save}>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email" // IMPORTANTE: igual à chave do objeto
                        value={user.email}
                        onChange={updatedField}
                        placeholder="Digite seu email"
                    />
                    <label htmlFor="nome">Nome Completo</label>
                    <input
                        type="name"
                        id="name"
                        name="name" // IMPORTANTE: igual à chave do objeto
                        value={user.name}
                        onChange={updatedField}
                        placeholder="Digite seu Nomel"
                    />

                    <label htmlFor="cpf">CPF</label>
                    <input
                        type="text" // Corrigido de email para text
                        id="cpf"
                        name="cpf"
                        value={user.cpf}
                        onChange={updatedField}
                        placeholder="Digite seu CPF"
                    />

                    <label htmlFor="phone">Telefone</label>
                    <input
                        type="tel" // Mudado de email para tel (semântica correta)
                        id="phone"
                        name="phone"
                        value={user.phone}
                        onChange={updatedField}
                        placeholder="Digite seu Telefone"
                    />

                    <label htmlFor="password">Senha</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={user.password}
                        onChange={updatedField}
                        placeholder="Crie uma senha"
                    />
                    <span style={{ color: '#9ca3af', fontSize: '11px', marginTop: '-12px', marginBottom: '16px', textAlign: 'left' }}>
                        Mínimo de 6 caracteres
                    </span>

                    <label htmlFor="confirmPassword">Confirmar a Senha</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={user.confirmPassword}
                        onChange={updatedField}
                        placeholder="Digite a senha novamente"
                    />

                    <button type="submit">
                        Criar Conta
                    </button>
                </form>

                <p className="cadastro">
                    Já tem uma conta?{" "}
                    <Link href="/login">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
}