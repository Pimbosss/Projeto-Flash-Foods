import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useUser } from '../context/UserContext';

export default function Endereco() {
  const { user } = useUser();
  const [menuAberto, setMenuAberto] = useState(false);
  const [enderecoSelecionado, setEnderecoSelecionado] = useState('Fatec Araraquara');

  // Sempre que o usuário fizer o cadastro, atualiza o endereço selecionado automaticamente
  useEffect(() => {
    if (user?.endereco) {
      setEnderecoSelecionado(user.endereco);
    } else {
      setEnderecoSelecionado('Fatec Araraquara');
    }
  }, [user]);


  const listaEnderecos = [
    ...(user?.endereco ? [{ id: 'user-addr', endereco: user.endereco }] : []),
    { id: '1', endereco: 'Fatec Araraquara' },
    { id: '2', endereco: 'Fatec São Carlos' },
    { id: '3', endereco: 'Fatec Ribeirão Preto' },
  ];

  const selecionarEndereco = (endereco: string) => {
    setEnderecoSelecionado(endereco);
    setMenuAberto(false);
  };

  return (
    <View style={styles.header}>
      <TouchableOpacity 
        style={styles.addressContainer}
        onPress={() => setMenuAberto(!menuAberto)}
        activeOpacity={0.7}
      >
        <FontAwesome name="map-marker" size={20} color="#FF5C00" style={styles.iconMargin} />
        
        <Text style={styles.titleHeader} numberOfLines={1} ellipsizeMode="tail">
          {enderecoSelecionado}
        </Text>

        <FontAwesome 
          name={menuAberto ? "chevron-up" : "chevron-down"} 
          size={12} 
          color="#FF5C00" 
          style={styles.chevronIcon} 
        />
      </TouchableOpacity>

      {menuAberto && (
        <View style={styles.dropdownContainer}>
          <FlatList
            data={listaEnderecos}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity 
                style={styles.dropdownItem} 
                onPress={() => selecionarEndereco(item.endereco)}
              >
                <FontAwesome 
                  name={item.id === 'user-addr' ? 'home' : 'history'} 
                  size={14} 
                  color={item.id === 'user-addr' ? '#FF5C00' : '#666'} 
                  style={{ marginRight: 8 }} 
                />
                <Text style={styles.dropdownText} numberOfLines={1}>
                  {item.endereco}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>   
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    marginBottom: 10,
    position: 'relative',
    zIndex: 100,
    elevation: 10,
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 15,
  },
  iconMargin: {
    marginRight: 6,
  },
  chevronIcon: {
    marginLeft: 6,
  },
  titleHeader: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1A1A1A',
    maxWidth: '80%',
  },
  dropdownContainer: {
    position: 'absolute',
    top: 55,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#EAEAEA',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    zIndex: 150,
    elevation: 12,
    maxHeight: 200,
    overflow: 'hidden',
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  dropdownText: {
    fontSize: 14,
    color: '#444',
  },
});
