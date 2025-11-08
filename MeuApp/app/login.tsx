import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
} from 'react-native';
import { useAuth } from '../contexts/AuthContext';

export const LoginScreen: React.FC = () => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const { signIn } = useAuth();

    const handleLogin = async () => {
        if (!email || !senha) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos');
            return;
        }

        const sucesso = await signIn(email, senha);
        if (!sucesso) {
            Alert.alert('Erro', 'E-mail ou senha inválidos');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.logo}>MobHelper</Text>
            <Text style={styles.subtitle}>Faça login para continuar</Text>

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

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>

            <View style={styles.infoContainer}>
                <Text style={styles.infoText}>Usuário admin: admin@mobhelper.com</Text>
                <Text style={styles.infoText}>Senha: admin123</Text>
                <Text style={styles.infoText}>---</Text>
                <Text style={styles.infoText}>Usuário normal: user@mobhelper.com</Text>
                <Text style={styles.infoText}>Senha: user123</Text>
            </View>
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
    button: {
        backgroundColor: '#4CAF50',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 20,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    infoContainer: {
        marginTop: 20,
        padding: 15,
        backgroundColor: 'rgba(0,0,0,0.2)',
        borderRadius: 8,
    },
    infoText: {
        color: '#ccc',
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 5,
    },
});