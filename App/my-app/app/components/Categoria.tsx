import { StyleSheet, Text, View, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useState } from 'react';

import MaterialCommunityIcons from '@expo/vector-icons/build/MaterialCommunityIcons';





const ListaCategorias = [
    {
        id: 1,
        name: 'Todos',
        icon: 'silverware-fork-knife',
    },
    {
        id: 2,
        name: 'Hamburgueres',
        icon: 'hamburger',
    },
    {
        id: 3,
        name: 'Pizzas',
        icon: 'pizza',
    },
    {
        id: 4,
        name: 'Mexicano',
        icon: 'taco',
    },
    {
        id: 5,
        name: 'Japones',
        icon: 'rice'
    }
]

export default function Categoria({ categoriaSelecionada, setCategoriaSelecionada }: any){


    return (
        <View>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                {ListaCategorias.map((categoria) => (

                    <TouchableOpacity
                        key={categoria.id}
                        style={[
                            styles.categoriaContainer,
                            categoriaSelecionada === categoria.name && styles.categoriaSelecionada,
                        ]}
                        onPress={() => setCategoriaSelecionada(categoria.name)}
                    >

                        <MaterialCommunityIcons
                            name={categoria.icon as any}
                            size={18}
                            color={categoriaSelecionada === categoria.name ? '#FFF' : '#FF5C00'}
                            style={styles.icon}
                        />
                        <Text style={styles.categoriaTexto}>{categoria.name}</Text>
                    </TouchableOpacity>

                ))}
            </ScrollView>
        </View>
    )

}

const styles = StyleSheet.create({
    categoriaContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 12,
        borderRadius: 20,
        marginRight: 8,
        marginTop: 8,
        marginBottom: 8,
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#FF5C00',
    },
    categoriaSelecionada: {
        backgroundColor: '#FF5C00',
    },
    categoriaTexto: {
        color: '#1A1A1A',
        fontWeight: '600',
        textAlign: 'center',
        
        marginLeft: 5,
    },
    icon: {
        justifyContent: 'center',
        textAlign: 'center',
        
    },

})