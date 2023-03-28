import api from './api';

export async function signIn(username, password) {
  console.log('chegando no api signin', password, username);
  const response = await api.post('/auth/sign-in', { username, password });
  return response.data;
}
//
