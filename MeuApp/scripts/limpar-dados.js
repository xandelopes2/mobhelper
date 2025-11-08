import AsyncStorage from '@react-native-async-storage/async-storage';

const limparDados = async () => {
    try {
        await AsyncStorage.clear();
        console.log('Todos os dados foram limpos!');
        // Reinicializar os dados básicos dos usuários
        const usuariosIniciais = [
            {
                id: '1',
                nome: 'Administrador',
                email: 'admin@mobhelper.com',
                senha: 'admin123',
                tipo: 'admin'
            },
            {
                id: '2',
                nome: 'Usuário Normal',
                email: 'user@mobhelper.com',
                senha: 'user123',
                tipo: 'normal'
            }
        ];
        await AsyncStorage.setItem('usuarios', JSON.stringify(usuariosIniciais));
        console.log('Usuários padrão foram restaurados!');
    } catch (error) {
        console.error('Erro ao limpar dados:', error);
    }
};

limparDados();