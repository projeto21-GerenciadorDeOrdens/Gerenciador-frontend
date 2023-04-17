import api from './api';

export async function searchSenders(token) {
  const get = await api.get('/related/sender', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return get.data;
}

export async function searchSendersByName(token, name) {
  const get = await api.get(`/related/sender/${name}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return get.data;
}

export async function searchRecipientsByName(token, name) {
  const get = await api.get(`/related/recipient/${name}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return get.data;
}

export async function searchDriversByName(token, name) {
  const get = await api.get(`/related/driver/${name}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return get.data;
}

export async function searchDriversByPlate(token, plate) {
  const get = await api.get(`/related/plate/${plate}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return get.data;
}

export async function postSender(token, body) {
  const post = await api.post('/related/sender', body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return post.data;
}

export async function postRecipient(token, body) {
  const post = await api.post('/related/recipient', body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return post.data;
}

export async function postDriver(token, body) {
  const post = await api.post('/related/driver', body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return post.data;
}
