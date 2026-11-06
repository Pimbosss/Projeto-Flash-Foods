import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import SearchBar from '../components/BarraPesquisa';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.header}>
        <View style={styles.addressContainer}>
          <FontAwesome name="map-marker" size={20} color="#FF5C00" style={styles.iconMargin} />
          <Text style={styles.titleHeader}>Endereço...</Text>
        </View>
        
        <View style={styles.bellContainer}>
          <FontAwesome name="bell" size={20} color="#FF5C00" />
        </View>
      </View>

      <View style={styles.welcomeContainer}>
        <Text style={styles.title}>Olá, (Nome...)!</Text>
        <Text style={styles.subtitle}>
          O que você deseja pedir <Text style={styles.span}>hoje?</Text>
        </Text>
      </View>

      <SearchBar />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    marginBottom: 10,
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
  },
  bellContainer: {
    padding: 6,
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF3B30',
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
});
