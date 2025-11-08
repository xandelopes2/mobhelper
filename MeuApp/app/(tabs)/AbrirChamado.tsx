import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    ScrollView,
} from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Chamado } from '../../types';
import { useRouter } from 'expo-router';
import { Picker } from '@react-native-picker/picker';

export default function AbrirChamado() {
    const [descricao, setDescricao] = useState('');
    const [urgencia, setUrgencia] = useState('normal');
    const [aparelho, setAparelho] = useState('');
    const router = useRouter();
    const { usuario } = useAuth();

    const handleSubmit = async () => {
        if (!descricao.trim() || !aparelho.trim()) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos');
            return;
        }

        try {
            // Buscar chamados existentes
            const chamadosString = await AsyncStorage.getItem('chamados');
            const chamados: Chamado[] = chamadosString ? JSON.parse(chamadosString) : [];

            // Criar novo chamado
            const novoChamado: Chamado = {
                id: chamados.length + 1,
                descricao,
                urgencia: urgencia as 'baixa' | 'normal' | 'alta',
                aparelho,
                data: new Date().toLocaleString(),
                status: 'aberto',
                usuarioId: usuario?.id || '',
                nomeUsuario: usuario?.nome || '',
            };

            // Adicionar novo chamado à lista
            const novosChamados = [...chamados, novoChamado];
            await AsyncStorage.setItem('chamados', JSON.stringify(novosChamados));

            Alert.alert('Sucesso', 'Chamado aberto com sucesso!');
            setDescricao('');
            setUrgencia('normal');
            setAparelho('');
            router.back();
        } catch (error) {
            console.error('Erro ao salvar chamado:', error);
            Alert.alert('Erro', 'Ocorreu um erro ao abrir o chamado');
        }
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Abrir Novo Chamado</Text>

            <Text style={styles.label}>Aparelho</Text>
            <TextInput
                style={styles.input}
                placeholder="Nome/modelo do aparelho"
                placeholderTextColor="#aaa"
                value={aparelho}
                onChangeText={setAparelho}
            />

            <Text style={styles.label}>Descrição do Problema</Text>
            <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Descreva o problema em detalhes..."
                placeholderTextColor="#aaa"
                value={descricao}
                onChangeText={setDescricao}
                multiline
                numberOfLines={4}
            />

            <Text style={styles.label}>Urgência</Text>
            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={urgencia}
                    onValueChange={(itemValue) => setUrgencia(itemValue)}
                    style={styles.picker}
                >
                    <Picker.Item label="Baixa" value="baixa" />
                    <Picker.Item label="Normal" value="normal" />
                    <Picker.Item label="Alta" value="alta" />
                </Picker>
            </View>

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Abrir Chamado</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#36454F',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 20,
        textAlign: 'center',
    },
    label: {
        fontSize: 16,
        color: '#fff',
        marginBottom: 5,
    },
    input: {
        backgroundColor: '#4F6F8F',
        color: '#fff',
        borderRadius: 8,
        padding: 15,
        marginBottom: 15,
        fontSize: 16,
    },
    textArea: {
        height: 120,
        textAlignVertical: 'top',
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
        marginTop: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});