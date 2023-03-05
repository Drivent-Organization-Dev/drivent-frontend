import api from './api';

export async function createTicketType(body, token) {
  console.log('Entrou na Função de Criar Ticket Type');
  const response = await api.post('/tickets/types', body, {
    headers: { Authorization: `Bearer ${token}`, },
  });
  console.log('AQUIIIII: ', response.data);
  return response.data;
}
