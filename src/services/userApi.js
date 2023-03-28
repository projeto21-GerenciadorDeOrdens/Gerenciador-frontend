import api from './api';

export async function signUp(username, password) {
  const response = await api.post('/users', { username, password });
  return response.data;
}
//
