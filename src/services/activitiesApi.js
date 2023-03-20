import api from './api';

export async function getActivities(token, day) {
  const response = await api.get(`/activities?day=${day}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
}

export async function enrollActivity(token, actvId) {
  const response = await api.post('/activities', { activityId: actvId }, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
}
