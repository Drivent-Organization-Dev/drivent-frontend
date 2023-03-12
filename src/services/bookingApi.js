import api from './api';

export async function sendBooking(token, body) {
  const response = await api.post('/booking', body, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
}

export async function listBookedRooms(token, hotelId) {
  const response = await api.get(`/booking/${hotelId}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
}

export async function getBooking(token, body) {
  const response = await api.get('/booking', {
    headers: { Authorization: `Bearer ${token}` }
  });

  return response.data;
}
