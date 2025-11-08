import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, FlatList, TextInput, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { Chamado, RootStackParamList } from '../../types';
import { useAuth } from '../../contexts/AuthContext';
import { LoginScreen } from '../login';
import { RegisterScreen } from '../register';
import HomeScreen from '../screens/HomeScreen';
import AbrirChamadoScreen from '../screens/AbrirChamadoScreen';
import ConsultarChamadoScreen from '../screens/ConsultarChamadoScreen';
import { commonStyles } from '../../styles/common-styles';
import { chamadoStyles } from '@/styles/chamado-styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import { ChamadoItem } from '../components/ChamadoItem';

const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  const { usuario, loading } = useAuth();

  if (loading) {
    return (
      <View style={[commonStyles.container, commonStyles.centered]}>
        <Text style={commonStyles.logo}>Carregando...</Text>
      </View>
    );
  }

  return (
    <Stack.Navigator 
      initialRouteName={usuario ? 'Home' : 'Login'}
      screenOptions={{
        headerStyle: {
          backgroundColor: '#1E90FF',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      {usuario ? (
        <>
          <Stack.Screen 
            name="Home" 
            component={HomeScreen} 
            options={{ title: 'MobHelper' }} 
          />
          <Stack.Screen 
            name="AbrirChamado" 
            component={AbrirChamadoScreen} 
            options={{ title: 'Novo Chamado' }} 
          />
          <Stack.Screen 
            name="ConsultarChamado" 
            component={ConsultarChamadoScreen} 
            options={{ title: 'Meus Chamados' }} 
          />
        </>
      ) : (
        <>
          <Stack.Screen 
            name="Login" 
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="Register" 
            component={RegisterScreen}
            options={{ headerShown: false }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default App;

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#36454F',
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
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
