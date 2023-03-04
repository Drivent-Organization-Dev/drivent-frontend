import api from './api';

export async function createTicketType(body, token) {
  console.log('CHEGOU AQUI ?', body, token);
  const response = await api.post('/tickets/types', body, {
    headers: { Authorization: `Bearer ${token}`, },
  });
  console.log('AQUIIIII: ', response.data);
  return response.data;
}
