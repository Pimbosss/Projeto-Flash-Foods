'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from './perfil.module.css'
import { api } from '@/services/api'
import Usuario from '@/core/Usuarios'

export default function Perfil() {
    const router = useRouter()
    const [userData, setUserData] = useState<Usuario | null>(null)

    const updatedField = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target
        if(userData) {
            setUserData({...userData, [name]: value})
        }
    }

    useEffect( ()=> {
        const session = localStorage.getItem("flashfoods:user")

        if(!session) {
            alert('Acesso negado, Faça login.')
            router.push('/login')
            return;
        }

        const loggedUser = JSON.parse(session)

        api.get(`/users/${loggedUser.id}`)
            .then(resp => {
                setUserData(resp.data)
            })
            .catch(err => {
                console.log('Erro na requisiçao:', err)
            })
    }, [router])

    const save = () => {

        const idUsuario = userData?.id
        if(!idUsuario) return

        api.put(`/users/${idUsuario}`, userData)
            .then(resp => {
                alert('Dados salvos com sucesso.')
                const session = localStorage.getItem('flashfoods:user')

                if(session) {
                    const loggedUser = JSON.parse(session)
                    const novaSessao = {
                        ...loggedUser,
                        email: resp.data.email,
                        name: resp.data.name
                    }
                    localStorage.setItem('flashfoods:user', JSON.stringify(novaSessao))
                }
                window.dispatchEvent(new Event("perfilAtualizado"));    
            })
            .catch(err => {
                console.error("Erro ao salvar:", err);
                alert("Erro ao salvar os dados.");
            });
    }

    if(!userData) {
        return (
            <div className={styles.carregando}>
                <h2>Carregando dados do servidor...</h2>
            </div>
        );
    }
     return (
        <>
        <div className={styles.perfilPage}>
            {/* ✕ Botão Flutuante Superior para fechar e voltar à Home rápido */}
            <button className={styles.fechar} onClick={() => router.push("/", { scroll: false })}>
                ✕
            </button>

            <div className={styles.perfilBox}>
                <div className={styles.avatarHeader}>
                    {/* Cria um avatar circular automático com a inicial do nome do usuário */}
                    <div className={styles.avatar}>
                        {userData.name ? userData.name.charAt(0).toUpperCase() : "U"}
                    </div>
                    <h1>Meu Perfil Flash</h1>
                    <p style={{ color: "#ff6600", fontWeight: 600 }}>Logado como: {userData.email}</p>
                </div>

                <div className={styles.infoGroup}>
                    <div className={styles.infoField}>
                        <span className={styles.label}>E-mail</span>
                        <input 
                            type="text" 
                            name="email" 
                            value={userData.email} 
                            onChange={updatedField} 
                        />
                    </div>

                    <div className={styles.infoField}>
                        <span className={styles.label}>Nome Completo</span>
                        <input 
                            type="text" 
                            name="name" 
                            value={userData.name} 
                            onChange={updatedField} 
                        />
                    </div>

                    <div className={styles.infoField}>
                        <span className={styles.label}>CPF</span>
                        <input 
                            type="text" 
                            name="cpf" 
                            value={userData.cpf || ""} 
                            onChange={updatedField} 
                            placeholder="000.000.000-00"
                        />
                    </div>

                    <div className={styles.infoField}>
                        <span className={styles.label}>Telefone</span>
                        <input 
                            type="text" 
                            name="phone" 
                            value={userData.phone || ""} 
                            onChange={updatedField} 
                            placeholder="(00) 00000-0000"
                        />
                    </div>
                </div>

                <div className={styles.acoes}>
                    {/* Botão de submit que dispara a gravação no json-server */}
                    <button className={styles.btnEditar} onClick={save}>
                        Salvar Alterações
                    </button>
                    
                    <button className={styles.btnSair} onClick={() => router.push("/", { scroll: false })}>
                        Voltar para a Home
                    </button>
                </div>
            </div>
        </div>
        </>
    );
}