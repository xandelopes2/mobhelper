import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Alert,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

interface ResolverChamadoModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: (resolucao: string) => void;
  chamadoStatus: 'aberto' | 'em_andamento' | 'resolvido';
  onStatusChange: (status: 'em_andamento' | 'resolvido') => void;
}

export const ResolverChamadoModal: React.FC<ResolverChamadoModalProps> = ({
  visible,
  onClose,
  onConfirm,
  chamadoStatus,
  onStatusChange,
}) => {
  const [resolucao, setResolucao] = useState('');
  const [novoStatus, setNovoStatus] = useState<'em_andamento' | 'resolvido'>(
    chamadoStatus === 'aberto' ? 'em_andamento' : 'resolvido'
  );

  const handleConfirmar = () => {
    if (!resolucao.trim()) {
      Alert.alert('Erro', 'Por favor, descreva o que foi feito no atendimento');
      return;
    }
    if (novoStatus === 'resolvido') {
      onConfirm(resolucao);
    } else {
      onStatusChange(novoStatus);
    }
    setResolucao('');
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Gerenciar Chamado</Text>

          <Text style={styles.label}>Descrição do Atendimento:</Text>
          <TextInput
            style={styles.input}
            placeholder="Descreva o que foi feito no atendimento..."
            placeholderTextColor="#aaa"
            value={resolucao}
            onChangeText={setResolucao}
            multiline
            numberOfLines={6}
          />

          <Text style={styles.label}>Status do Chamado:</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={novoStatus}
              onValueChange={(itemValue) => setNovoStatus(itemValue as 'em_andamento' | 'resolvido')}
              style={styles.picker}
            >
              <Picker.Item label="Em Andamento" value="em_andamento" color="#fff" />
              <Picker.Item label="Resolvido" value="resolvido" color="#fff" />
            </Picker>
          </View>

          <View style={styles.botoesContainer}>
            <TouchableOpacity
              style={[styles.botao, { backgroundColor: '#FF6B6B' }]}
              onPress={() => {
                setResolucao('');
                onClose();
              }}
            >
              <Text style={styles.botaoTexto}>Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.botao, { backgroundColor: '#4CAF50' }]}
              onPress={handleConfirmar}
            >
              <Text style={styles.botaoTexto}>Confirmar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#36454F',
    padding: 20,
    borderRadius: 10,
    width: '100%',
    maxWidth: 500,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#4F6F8F',
    color: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    fontSize: 16,
    textAlignVertical: 'top',
    minHeight: 120,
  },
  pickerContainer: {
    backgroundColor: '#4F6F8F',
    borderRadius: 8,
    marginBottom: 20,
    overflow: 'hidden',
  },
  picker: {
    color: '#fff',
    height: 50,
  },
  botoesContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
  },
  botao: {
    padding: 12,
    borderRadius: 8,
    minWidth: 100,
    alignItems: 'center',
  },
  botaoTexto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});