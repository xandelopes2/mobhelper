import { StyleSheet } from 'react-native';

export const chamadoStyles = StyleSheet.create({
  item: {
    backgroundColor: '#4F6F8F',
    padding: 15,
    borderRadius: 8,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  itemDetail: {
    fontSize: 14,
    color: '#E0E0E0',
    marginBottom: 4,
  },
  itemDescription: {
    fontSize: 16,
    color: '#fff',
    marginTop: 8,
  },
  emptyMessage: {
    fontSize: 16,
    color: '#ccc',
    textAlign: 'center',
    marginTop: 20,
  },
  resolucaoContainer: {
    marginTop: 10,
    padding: 10,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 5,
  },
  resolucaoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  resolucaoText: {
    fontSize: 14,
    color: '#E0E0E0',
    marginBottom: 5,
  },
  resolucaoDetail: {
    fontSize: 12,
    color: '#ccc',
    fontStyle: 'italic',
  },
  botoesContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  botaoStatus: {
    padding: 8,
    borderRadius: 5,
    marginLeft: 10,
  },
  botaoTexto: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#4F6F8F',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalInput: {
    backgroundColor: '#36454F',
    color: '#fff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  modalBotoes: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  modalBotao: {
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
    minWidth: 80,
    alignItems: 'center',
  },
});