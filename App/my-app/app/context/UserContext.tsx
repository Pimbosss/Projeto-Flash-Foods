import React, { createContext, useState, useContext } from 'react';
import { Alert } from 'react-native';
import { BuscarUsuario, CadastrarUsuario } from '../../services/api';

interface UserData {
  nome: string;
  email: string;
  endereco: string;
  senha?: string;
}

interface UserContextType {
  user: UserData | null;
  cadastrar: (dados: UserData) => Promise<boolean>;
  sair: () => void;
}

const UserContext = createContext<UserContextType>({} as UserContextType);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserData | null>(null);

  async function cadastrar(dados: UserData): Promise<boolean> {
    try {
      const emailFormatado = dados.email.toLowerCase().trim();

    
      const usuariosExistentes = await BuscarUsuario();

      const emailJaExiste = usuariosExistentes.some(
        (u: UserData) => u.email.toLowerCase().trim() === emailFormatado
      );

      if (emailJaExiste) {
        Alert.alert('Atenção ⚠️', 'Este e-mail já está cadastrado no sistema!');
        return false;
      }

      const userToSave = {
        ...dados,
        email: emailFormatado,
      };

      
      await CadastrarUsuario(userToSave);

     
      setUser(userToSave);

      Alert.alert('Sucesso 🎉', 'Cadastro realizado com sucesso! Bem-vindo ao Flash Foods.');
      return true;

    } catch (error) {
      console.error('Erro ao processar o cadastro de usuário:', error);
      Alert.alert(
        'Erro',
        'Ocorreu um erro ao tentar realizar o cadastro. Verifique sua conexão com o servidor.'
      );
      return false;
    }
  }

  function sair() {
    setUser(null);
  }

  return (
    <UserContext.Provider value={{ user, cadastrar, sair }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
