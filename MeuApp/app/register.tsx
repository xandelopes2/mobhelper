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
import { Usuario } from '../types';
import { useNavigation } from '@react-navigation/native';

export const RegisterScreen = () => {
    const navigation = useNavigation();
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [tipo, setTipo] = useState<'admin' | 'normal'>('normal');

    const handleRegister = async () => {
        if (!nome || !email || !senha || !confirmarSenha) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos');
            return;
        }

        if (senha !== confirmarSenha) {
            Alert.alert('Erro', 'As senhas não coincidem');
            return;
        }

        try {
            // Verificar se o e-mail já está em uso
            const usuariosStorage = await AsyncStorage.getItem('usuarios');
            const usuarios: Usuario[] = usuariosStorage ? JSON.parse(usuariosStorage) : [];
            
            if (usuarios.some(u => u.email === email)) {
                Alert.alert('Erro', 'Este e-mail já está em uso');
                return;
            }

            // Criar novo usuário
            const novoUsuario: Usuario = {
                id: Date.now().toString(),
                nome,
                email,
                senha,
                tipo
            };

            // Salvar o novo usuário
            await AsyncStorage.setItem('usuarios', JSON.stringify([...usuarios, novoUsuario]));
            
            Alert.alert(
                'Sucesso', 
                'Usuário cadastrado com sucesso!',
                [
                    {
                        text: 'OK',
                        onPress: () => navigation.navigate('Login' as never)
                    }
                ]
            );

            // Limpar os campos
            setNome('');
            setEmail('');
            setSenha('');
            setConfirmarSenha('');
            setTipo('normal');

        } catch (error) {
            Alert.alert('Erro', 'Não foi possível criar o usuário');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.logo}>MobHelper</Text>
            <Text style={styles.subtitle}>Criar nova conta</Text>

            <TextInput
                style={styles.input}
                placeholder="Nome completo"
                placeholderTextColor="#aaa"
                value={nome}
                onChangeText={setNome}
            />

            <TextInput
                style={styles.input}
                placeholder="E-mail"
                placeholderTextColor="#aaa"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />

            <TextInput
                style={styles.input}
                placeholder="Senha"
                placeholderTextColor="#aaa"
                value={senha}
                onChangeText={setSenha}
                secureTextEntry
            />

            <TextInput
                style={styles.input}
                placeholder="Confirmar senha"
                placeholderTextColor="#aaa"
                value={confirmarSenha}
                onChangeText={setConfirmarSenha}
                secureTextEntry
            />

            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={tipo}
                    onValueChange={(itemValue) => setTipo(itemValue)}
                    style={styles.picker}
                    dropdownIconColor="#fff"
                >
                    <Picker.Item label="Usuário Normal" value="normal" />
                    <Picker.Item label="Administrador" value="admin" />
                </Picker>
            </View>

            <TouchableOpacity style={styles.button} onPress={handleRegister}>
                <Text style={styles.buttonText}>Cadastrar</Text>
            </TouchableOpacity>

            <TouchableOpacity 
                style={styles.linkButton}
                onPress={() => navigation.navigate('Login' as never)}
            >
                <Text style={styles.linkText}>Já tem uma conta? Faça login</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#36454F',
        justifyContent: 'center',
    },
    logo: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        color: '#ccc',
        textAlign: 'center',
        marginBottom: 30,
    },
    input: {
        backgroundColor: '#4F6F8F',
        color: '#fff',
        borderRadius: 8,
        padding: 15,
        marginBottom: 15,
        fontSize: 16,
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
    button: {
        backgroundColor: '#4CAF50',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 15,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    linkButton: {
        padding: 10,
    },
    linkText: {
        color: '#ccc',
        textAlign: 'center',
        fontSize: 16,
    },
});