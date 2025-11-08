import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, Chamado } from '../../types';
import { useAuth } from '../../contexts/AuthContext';
import { ChamadoItem } from '../components/ChamadoItem';
import { chamadoStyles } from '../../styles/chamado-styles';

type ConsultarChamadoScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ConsultarChamado'
>;

const ConsultarChamadoScreen: React.FC<{
  navigation: ConsultarChamadoScreenNavigationProp;
}> = ({ navigation }) => {
  const [chamados, setChamados] = useState<Chamado[]>([]);
  const [tipoListagem, setTipoListagem] = useState<'em_andamento' | 'resolvido'>('em_andamento');
  const { usuario } = useAuth();

  const carregarChamados = async (): Promise<void> => {
    try {
      const armazenados = await AsyncStorage.getItem('chamados');
      let dados: Chamado[] = armazenados ? JSON.parse(armazenados) : [];
      
      // Se não for admin, filtra apenas os chamados do usuário
      if (usuario?.tipo !== 'admin') {
        dados = dados.filter(chamado => chamado.usuarioId === usuario?.id);
      }

      setChamados(dados);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar os chamados.');
    }
  };

  const resolverChamado = async (chamadoId: number, novoStatus: 'em_andamento' | 'resolvido', resolucao?: string) => {
    try {
      const armazenados = await AsyncStorage.getItem('chamados');
      let dados: Chamado[] = armazenados ? JSON.parse(armazenados) : [];
      
      const chamadoIndex = dados.findIndex(c => c.id === chamadoId);
      if (chamadoIndex >= 0) {
        dados[chamadoIndex] = {
          ...dados[chamadoIndex],
          status: novoStatus,
          resolucao: resolucao,
          resolvidoPor: usuario?.id,
          dataResolucao: novoStatus === 'resolvido' ? new Date().toLocaleString() : undefined
        };
        
        await AsyncStorage.setItem('chamados', JSON.stringify(dados));
        await carregarChamados();
        
        Alert.alert('Sucesso', `Chamado ${novoStatus === 'resolvido' ? 'resolvido' : 'em andamento'} com sucesso!`);
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível atualizar o status do chamado.');
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      carregarChamados();
    });

    carregarChamados();
    
    return unsubscribe;
  }, [navigation]);

  const chamadosFiltrados = chamados.filter(
    chamado => chamado.status === tipoListagem
  );

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Consultar Chamado</Text>
      
      <View style={styles.botoesContainer}>
        <TouchableOpacity
          style={[
            styles.botaoFiltro,
            tipoListagem === 'em_andamento' && styles.botaoAtivo
          ]}
          onPress={() => setTipoListagem('em_andamento')}
        >
          <Text style={[
            styles.textoBotao,
            tipoListagem === 'em_andamento' && styles.textoAtivo
          ]}>Em Andamento</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.botaoFiltro,
            tipoListagem === 'resolvido' && styles.botaoAtivo
          ]}
          onPress={() => setTipoListagem('resolvido')}
        >
          <Text style={[
            styles.textoBotao,
            tipoListagem === 'resolvido' && styles.textoAtivo
          ]}>Finalizados</Text>
        </TouchableOpacity>
      </View>

      {chamadosFiltrados.length === 0 ? (
        <Text style={chamadoStyles.emptyMessage}>
          {`Você não tem chamados ${tipoListagem === 'em_andamento' ? 'em andamento' : 'finalizados'}.`}
        </Text>
      ) : (
        <FlatList
          data={chamadosFiltrados}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <ChamadoItem 
              chamado={item} 
              onStatusChange={(chamadoId, novoStatus, resolucao) => 
                resolverChamado(chamadoId, novoStatus, resolucao)
              }
            />
          )}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#36454F',
  },
  logo: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
    marginTop: 10,
  },
  botoesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingHorizontal: 10,
    width: '100%',
  },
  botaoFiltro: {
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 10,
    backgroundColor: '#1E2A35',
    width: '48%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    elevation: 3,
  },
  botaoAtivo: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  textoBotao: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  textoAtivo: {
    color: '#fff',
  },
});

export default ConsultarChamadoScreen;