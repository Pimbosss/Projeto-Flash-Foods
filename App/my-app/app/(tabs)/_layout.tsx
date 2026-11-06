
import { Tabs } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Slot } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: '#FF5C00' }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Início',
         tabBarIcon: ({ color }) => <FontAwesome size={24} name="home" color={color as string} />,

        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Ajustes',
          tabBarIcon: ({ color }) => <FontAwesome size={24} name="gear" color={color as string} />,

        }}
      />
    </Tabs>
  );
}
