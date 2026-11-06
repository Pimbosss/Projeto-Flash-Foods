import { StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import SearchBar from '../components/BarraPesquisa';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titleHeader}><FontAwesome name="map-marker" size={24} color="#FF5C00" /> Endereço... </Text>
        <FontAwesome name="bell" size={16} color="#FF5C00" style={{ position: 'absolute', right: 20, top: 20 }} />
      </View>
      <View>
        <Text style={styles.tittle}>
            Ola, (Nome...)!
        </Text>
        <Text style={styles.Subtittle}>
            O que voce deseja pedir <Text style={styles.span}>hoje?</Text>
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
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  titleHeader: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'left',
    color: '#000',
  },
  tittle: {
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'left',
    color: '#000',
    marginHorizontal: 20,
    marginTop: 50,
  },
    Subtittle: {
    fontSize: 28,
    fontWeight: '500',
    textAlign: 'left',
    color: '#000',
    marginHorizontal: 20,
    marginTop: 10,
    },
    span: {
        color: '#FF5C00',
    },

});