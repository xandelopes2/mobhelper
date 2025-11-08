import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { Chamado } from '../../types';
import { useAuth } from '../../contexts/AuthContext';
import { chamadoStyles } from '../../styles/chamado-styles';
import { ResolverChamadoModal } from './ResolverChamadoModal';

interface ChamadoItemProps {
  chamado: Chamado;
  onStatusChange?: (chamadoId: number, novoStatus: 'em_andamento' | 'resolvido', resolucao?: string) => void;
}

export const ChamadoItem: React.FC<ChamadoItemProps> = ({ chamado, onStatusChange }) => {
  const { usuario } = useAuth();
  const isAdmin = usuario?.tipo === 'admin';
  const [modalVisible, setModalVisible] = useState(false);

  const handleResolverChamado = (status: 'em_andamento' | 'resolvido', resolucao?: string) => {
    if (status === 'resolvido' && !resolucao) {
      return;
    }
    onStatusChange?.(chamado.id, status, resolucao);
    setModalVisible(false);
  };

  return (
    <View style={[
      chamadoStyles.item,
      { borderLeftColor: chamado.status === 'resolvido' ? '#4CAF50' : 
        chamado.status === 'em_andamento' ? '#FFA500' : '#FF0000',
        borderLeftWidth: 5 }
    ]}>
      <Text style={chamadoStyles.itemTitle}>
        Chamado #{chamado.id} - {chamado.status.toUpperCase()}
      </Text>
      <Text style={chamadoStyles.itemDetail}>
        Usuário: {chamado.nomeUsuario}
      </Text>
      <Text style={chamadoStyles.itemDetail}>
        Urgência: {chamado.urgencia.toUpperCase()}
      </Text>
      <Text style={chamadoStyles.itemDetail}>
        Data: {chamado.data}
      </Text>
      <Text style={chamadoStyles.itemDetail}>
        Aparelho: {chamado.aparelho}
      </Text>
      <Text style={chamadoStyles.itemDescription}>
        {chamado.descricao}
      </Text>

      {chamado.resolucao && (
        <View style={chamadoStyles.resolucaoContainer}>
          <Text style={chamadoStyles.resolucaoTitle}>Resolução:</Text>
          <Text style={chamadoStyles.resolucaoText}>{chamado.resolucao}</Text>
          <Text style={chamadoStyles.resolucaoDetail}>
            Resolvido em {chamado.dataResolucao}
          </Text>
        </View>
      )}

      {isAdmin && chamado.status !== 'resolvido' && (
        <View style={chamadoStyles.botoesContainer}>
          <TouchableOpacity
            style={[chamadoStyles.botaoStatus, { backgroundColor: '#4F6F8F' }]}
            onPress={() => setModalVisible(true)}
          >
            <Text style={chamadoStyles.botaoTexto}>Gerenciar Chamado</Text>
          </TouchableOpacity>
        </View>
      )}

      <ResolverChamadoModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onConfirm={(resolucao) => handleResolverChamado('resolvido', resolucao)}
        chamadoStatus={chamado.status}
        onStatusChange={(status) => handleResolverChamado(status)}
      />
    </View>
  );
};