import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useUser } from '../context/UserContext';
import Imagem from '../components/Image';

export default function PerfilScreen() {
  const { user, cadastrar, sair } = useUser();

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [endereco, setEndereco] = useState('');
  const [senha, setSenha] = useState('');
  const [carregando, setCarregando] = useState(false);

  const handleCadastro = async () => {
    if (!nome.trim() || !email.trim() || !senha.trim() || !endereco.trim()) {
      Alert.alert('Campos obrigatórios', 'Por favor, preencha todos os dados para continuar.');
      return;
    }

    setCarregando(true);

    
    const sucesso = await cadastrar({ nome, email, endereco, senha });

    setCarregando(false);


    if (sucesso) {
      setNome('');
      setEmail('');
      setEndereco('');
      setSenha('');
    }
  };

  if (user) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Meu Perfil</Text>

        <View style={styles.card}>
          <Imagem />
          <View style={styles.infoContainer}>
            <Text style={styles.label}>Nome:</Text>
            <Text style={styles.value}>{user.nome}</Text>

            <Text style={styles.label}>E-mail:</Text>
            <Text style={styles.value}>{user.email || 'Não informado'}</Text>

            <Text style={styles.label}>Endereço:</Text>
            <Text style={styles.value}>{user.endereco || 'Não informado'}</Text>
          </View>
        </View>

        <TouchableOpacity style={[styles.button, styles.logoutButton]} onPress={sair}>
          <Text style={styles.buttonText}>Sair da conta</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Crie sua conta</Text>
      <Text style={styles.subtitle}>Preencha seus dados para fazer pedidos.</Text>

      <TextInput
        style={styles.input}
        placeholder="Seu nome completo"
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={styles.input}
        placeholder="Seu e-mail"
        keyboardType="email-address"
        autoCapitalize="none" 
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Sua Senha"
        secureTextEntry={true}
        value={senha}
        onChangeText={setSenha}
      />
      <TextInput
        style={styles.input}
        placeholder="Seu endereço de entrega"
        value={endereco}
        onChangeText={setEndereco}
      />

      <TouchableOpacity 
        style={[styles.button, carregando && { opacity: 0.7 }]} 
        onPress={handleCadastro}
        disabled={carregando}
      >
        <Text style={styles.buttonText}>
          {carregando ? 'Cadastrando...' : 'Concluir Cadastro'}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
  },
  input: {
    backgroundColor: '#F7F7F7',
    padding: 14,
    borderRadius: 8,
    marginBottom: 14,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#FF5C00',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  logoutButton: {
    backgroundColor: '#333',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },
  card: {
    backgroundColor: '#F7F7F7',
    padding: 10,
    borderRadius: 12,
    marginBottom: 20,
    gap: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 85,
    height: 85,
    borderRadius: 42.5,
    marginRight: 12,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  label: {
    fontSize: 13,
    color: '#666',
    marginTop: 8,
  },
  value: {
    fontSize: 17,
    fontWeight: '600',
    color: '#1A1A1A',
  },
});
