const storage = require('./persistedStorage');
const axios = require('axios');

export const client = function() {
  const baseUrl = window.location.origin + '/api';
  const token = storage.get(storage.Keys.JWT);
  if (token && token.length > 0) {
    return axios.create({
      baseURL: baseUrl,
      headers: {'Authorization': 'Bearer ' + token},
    })
  }
  return axios.create({
    baseURL: baseUrl,
  });
}
