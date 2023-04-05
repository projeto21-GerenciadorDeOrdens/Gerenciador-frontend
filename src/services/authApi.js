import api from './api';

export async function signIn(username, password) {
  const response = await api.post('/auth/sign-in', { username, password });
  return response.data;
}
//
