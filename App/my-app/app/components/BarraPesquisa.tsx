import React, { ReactNode } from 'react';
import { StyleSheet, TextInput, TextInputProps, View } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

interface SearchBar extends TextInputProps {
  icon?: ReactNode; 
}


export default function SearchBar({ icon, ...rest }: SearchBar) {
    return (
        <View style={styles.container}>
            
            
            
            <TextInput
                style={[styles.input]}
                placeholder=  "Buscar pratos ou restaurantes..."
                placeholderTextColor="#999"
                {...rest}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
    alignItems: 'center',
    flexDirection: 'row',

    },
    input: {
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 8,
        padding: 5,
        width: '100%',
        fontSize: 22,
    },
    icon: {
       
    }
});