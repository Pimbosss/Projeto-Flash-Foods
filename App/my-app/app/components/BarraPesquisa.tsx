import React, { ReactNode } from 'react';
import { StyleSheet, TextInput, TextInputProps, View } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

interface SearchBar extends TextInputProps {
  icon?: ReactNode; 
}


export default function SearchBar({ icon, ...rest }: SearchBar) {
    return (
        <View style={styles.container}>
            {/* O ícone fica aqui, solto dentro da View e antes do TextInput */}
            {icon || <FontAwesome name="search" size={20} color="#999" style={styles.icon} />}
            
            <TextInput
                style={[styles.input]}
                placeholder="Buscar pratos ou restaurantes..."
                placeholderTextColor="#999"
                {...rest}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
        padding: 10,
        margin: 10,
    },
    input: {
        fontSize: 16,
        color: '#333',
      
        padding: 0,
        marginLeft: 10,
    },
    icon: {
        marginRight: 10,
    }
});