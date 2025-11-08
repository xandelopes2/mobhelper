import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, Chamado } from '../../types';
import { useAuth } from '../../contexts/AuthContext';

type AbrirChamadoScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'AbrirChamado'
>;

const AbrirChamadoScreen: React.FC<{ navigation: AbrirChamadoScreenNavigationProp }> = ({
  navigation,
}) => {
  const { usuario } = useAuth();
  const [urgencia, setUrgencia] = useState<'baixa' | 'normal' | 'alta'>('normal');
  const [descricao, setDescricao] = useState<string>('');
  const [aparelho, setAparelho] = useState<string>('');

  const enviarChamado = async (): Promise<void> => {
    if (descricao.trim() === '' || aparelho.trim() === '') {
      Alert.alert('Aviso', 'Por favor, preencha todos os campos antes de enviar.');
      return;
    }

    try {
      // Primeiro, vamos buscar os chamados existentes
      const armazenados = await AsyncStorage.getItem('chamados');
      const chamadosExistentes: Chamado[] = armazenados ? JSON.parse(armazenados) : [];

      // Criar o novo chamado
      const novoChamado: Chamado = {
        id: Date.now(),
        urgencia,
        descricao: descricao.trim(),
        aparelho: aparelho.trim(),
        data: new Date().toLocaleString(),
        nomeUsuario: usuario?.nome || '',
        status: 'em_andamento', // Iniciando como em_andamento para aparecer na lista
        usuarioId: usuario?.id || '',
      };

      // Adicionar o novo chamado à lista
      const atualizados = [novoChamado, ...chamadosExistentes];
      
      // Salvar no AsyncStorage
      await AsyncStorage.setItem('chamados', JSON.stringify(atualizados));

      // Limpar os campos do formulário
      setDescricao('');
      setAparelho('');
      setUrgencia('normal');

      // Mostrar mensagem de sucesso
      Alert.alert(
        'Chamado enviado!',
        'Seu chamado foi registrado com sucesso.',
        [
          {
            text: 'OK',
            onPress: () => {
              // Navegar para a tela inicial após o usuário confirmar
              navigation.navigate('Home');
            }
          }
        ]
      );
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar o chamado. Por favor, tente novamente.');
      console.error('Erro ao salvar chamado:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Abrir Chamado</Text>
      <Text style={styles.subtitle}>Preencha as informações abaixo:</Text>

      <Text style={styles.label}>Aparelho:</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o nome/modelo do aparelho"
        placeholderTextColor="#aaa"
        value={aparelho}
        onChangeText={setAparelho}
      />

      <Text style={styles.label}>Nível de Urgência:</Text>

      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={urgencia}
          onValueChange={(itemValue: string) =>
            setUrgencia(itemValue as 'baixa' | 'normal' | 'alta')
          }
          style={styles.picker}
          dropdownIconColor="#fff"
        >
          <Picker.Item label="Baixa" value="baixa" />
          <Picker.Item label="Normal" value="normal" />
          <Picker.Item label="Alta" value="alta" />
        </Picker>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Descreva a demanda..."
        placeholderTextColor="#aaa"
        value={descricao}
        onChangeText={setDescricao}
        multiline
      />

      <TouchableOpacity style={styles.button} onPress={enviarChamado}>
        <Text style={styles.buttonText}>Enviar Chamado aos Analistas</Text>
      </TouchableOpacity>
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
    marginBottom: 5,
    textAlign: 'center',
    marginTop: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#ccc',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 5,
  },
  pickerContainer: {
    backgroundColor: '#4F6F8F',
    borderRadius: 8,
    marginBottom: 15,
    overflow: 'hidden',
  },
  picker: {
    color: '#fff',
    height: 50,
  },
  input: {
    backgroundColor: '#4F6F8F',
    color: '#fff',
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    height: 100,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AbrirChamadoScreen;