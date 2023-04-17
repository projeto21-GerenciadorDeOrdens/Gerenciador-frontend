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
  return post.data;
}

export async function finishDriverTrip(token, orderId) {
  const update = await api.put(
    `/orders/finish/${orderId}`,
    { orderId: orderId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return update.data;
}

export async function payOrder(token, orderId) {
  const update = await api.put(
    `/orders/pay/${orderId}`,
    { orderId: orderId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return update.data;
}

export async function deleteOrder(token, orderId) {
  const response = await api.delete(`/orders/${orderId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}
