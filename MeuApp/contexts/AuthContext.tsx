import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Usuario } from '../types';

interface AuthContextData {
    usuario: Usuario | null;
    loading: boolean;
    signIn: (email: string, senha: string) => Promise<boolean>;
    signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

// Dados iniciais dos usuários (em produção, isso viria de uma API/banco de dados)
const usuariosIniciais: Usuario[] = [
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

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [usuario, setUsuario] = useState<Usuario | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function carregarUsuarios() {
            try {
                const usuariosStorage = await AsyncStorage.getItem('usuarios');
                if (!usuariosStorage) {
                    // Se não existirem usuários, cria os iniciais
                    await AsyncStorage.setItem('usuarios', JSON.stringify(usuariosIniciais));
                }
            } catch (error) {
                console.error('Erro ao carregar usuários:', error);
            }
        }

        async function carregarUsuarioSalvo() {
            try {
                const usuarioSalvo = await AsyncStorage.getItem('usuario_atual');
                if (usuarioSalvo) {
                    setUsuario(JSON.parse(usuarioSalvo));
                }
            } catch (error) {
                console.error('Erro ao carregar usuário:', error);
            } finally {
                setLoading(false);
            }
        }

        carregarUsuarios();
        carregarUsuarioSalvo();
    }, []);

    const signIn = async (email: string, senha: string): Promise<boolean> => {
        try {
            const usuariosStorage = await AsyncStorage.getItem('usuarios');
            const usuarios: Usuario[] = usuariosStorage ? JSON.parse(usuariosStorage) : [];
            
            const usuarioEncontrado = usuarios.find(
                u => u.email === email && u.senha === senha
            );

            if (usuarioEncontrado) {
                setUsuario(usuarioEncontrado);
                await AsyncStorage.setItem('usuario_atual', JSON.stringify(usuarioEncontrado));
                return true;
            }
            return false;
        } catch (error) {
            console.error('Erro no login:', error);
            return false;
        }
    };

    const signOut = async (): Promise<void> => {
        try {
            await AsyncStorage.removeItem('usuario_atual');
            setUsuario(null);
        } catch (error) {
            console.error('Erro ao fazer logout:', error);
        }
    };

    return (
        <AuthContext.Provider value={{ usuario, loading, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth deve ser usado dentro de um AuthProvider');
    }
    return context;
};