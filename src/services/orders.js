import api from './api';

export async function searchOrders(token) {
  const get = await api.get('/orders', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return get.data;
}

export async function postOrder(token, body) {
  const post = await api.post('/orders', body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return post;
}
