import { StyleSheet, Text, View, StatusBar, TouchableOpacity, FlatList, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchBar from '../components/BarraPesquisa';
import Endereco from '../components/Endereco';
import Categorias from '../components/Categoria';
import React, { useEffect, useState } from 'react';
import { useUser } from '../context/UserContext';
import { BuscarUsuario } from '../../services/api';



const Itens = [
    {
        id: 1,
        categoria: 'Hamburgueres',
        name: 'Hamburguer',
        description: 'Delicioso hamburguer artesanal com queijo e bacon.',
        price: 25.99,
        image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwDjKhHNsui8Gkwow-hgYTU41i279ytTXlbBW_6SdVnA&s=1024' ,
    },
    {
        id: 2,
        categoria: 'Pizzas',
        name: 'Pizza',
        description: 'Pizza de calabresa com borda recheada de catupiry.',
        price: 39.99,
        image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7yeoireixUqGc0Pz4y095iEP2AwFASz06amu6flDYbw&s=1024' ,
    },
    {
        id: 3,
        categoria: 'Mexicano',
        name: 'Mexicano',
        description: 'Taco mexicano com carne, queijo e molho especial.',
        price: 19.99,
        image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4zQQiqwnSEsqe5kj06sGGr-0pKF7NRKBmh2ndE5tgtg&s=1024' ,
    },
    {
        id: 4,
        name: 'Japones',
        categoria: 'Japones',
        description: 'Sushi de salmão fresco com arroz temperado e wasabi.',
        price: 29.99,
        image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFax7SyQQPfwFi5x0KrFcaRHJvkMKSonLRKjHvczutFg&s=1024' ,
    },
] 

export default function HomeScreen() {
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('Todos');

  const {user} = useUser()
  const itensFiltrados = Itens.filter((item) => item.categoria === categoriaSelecionada);
  useEffect(() =>{
    BuscarUsuario().then(data=> console.log(data))
  },[])

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <Endereco/>

      <View style={styles.welcomeContainer}>
        <Text style={styles.title}>Olá, {user ? user.nome: 'Visitante!'}!</Text>
        <Text style={styles.subtitle}>
          O que você deseja pedir <Text style={styles.span}>hoje?</Text>
        </Text>
      </View>

      <SearchBar />

      <Categorias 
  categoriaSelecionada={categoriaSelecionada} 
  setCategoriaSelecionada={setCategoriaSelecionada} 
/>

      <FlatList
        data={categoriaSelecionada === 'Todos' ? Itens : itensFiltrados}
        keyExtractor={(item) => item.categoria.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <View style={styles.itemImageContainer}>
              <Image source={{ uri: item.image }} style={styles.itemImage} />
            </View>
            <View style={styles.itemDetailsContainer}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemDescription}>{item.description}</Text>
              <Text style={styles.itemPrice}>R$ {item.price.toFixed(2)}</Text>
            </View>
          </View>
        )}
        contentContainerStyle={styles.itemsList}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingHorizontal: 20,

  },

  
  welcomeContainer: {
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    color: '#666',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 26,
    fontWeight: '700',
    color: '#1A1A1A',
    lineHeight: 34,
  },
  span: {
    color: '#FF5C00',
  },
 
  itemsList: {
    paddingBottom: 20,
    
  },
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
    borderRadius: 8,
    marginBottom: 16,  
  
  },
    
  itemImageContainer: {
    marginLeft: 10,
    width: 70,
    height: 70,
    borderRadius: 8,
    overflow: 'hidden',
  },
  itemImage: {
    width: '100%',
    height: '100%',
  },
  itemDetailsContainer: {
    flex: 1,
    marginLeft: 12,
  },
  itemName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  itemDescription: {
    fontSize: 14,
    color: '#999',
    marginVertical: 4,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FF5C00',
  },

});