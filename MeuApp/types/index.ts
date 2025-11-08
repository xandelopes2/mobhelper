export interface Usuario {
    id: string;
    nome: string;
    email: string;
    senha: string;
    tipo: 'admin' | 'normal';
}

export interface Chamado {
    id: number;
    urgencia: 'baixa' | 'normal' | 'alta';
    descricao: string;
    data: string;
    status: 'aberto' | 'em_andamento' | 'resolvido';
    usuarioId: string; // ID do usuário que criou
    nomeUsuario: string; // Nome do usuário que criou
    aparelho: string; // Nome/modelo do aparelho
    resolucao?: string; // Comentário sobre a resolução
    resolvidoPor?: string; // ID do admin que resolveu
    dataResolucao?: string;
}

export type RootStackParamList = {
    Login: undefined;
    Register: undefined;
    Home: undefined;
    AbrirChamado: undefined;
    ConsultarChamado: undefined;
    GerenciarChamado: { chamadoId: number };
};