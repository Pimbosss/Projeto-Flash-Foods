import { Tabs, useRouter } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function TabLayout() {
  const router = useRouter();

  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: '#FF5C00', headerTitleAlign: 'center' }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Início',
          tabBarIcon: ({ color }) => <FontAwesome size={24} name="home" color={color as string} />,
          headerLeft: () => (
            <TouchableOpacity style={{ marginLeft: 16 }}>
              <FontAwesome name="bell" size={20} color="#000" />
            </TouchableOpacity>
          ),
        }}
      />
      <Tabs.Screen
        name="perfil"
        options={{
          title: 'Meu Perfil',
          tabBarIcon: ({ color }) => <FontAwesome size={24} name="user" color={color as string} />,
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()} style={{ marginLeft: 16 }}>
              <FontAwesome name="arrow-left" size={20} color="#000" />
            </TouchableOpacity>
            
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => router.push('/(tabs)/perfil')} style={{ marginRight: 16 }}>
              <FontAwesome name="cog" size={20} color="#000" />
            </TouchableOpacity>
          ),
        }}
      />
    </Tabs>
  );
}
