/**
 * Project       - ShaCar
 * Team          - Group 3 Carshare
 * Last Modified - 2018/05/25
 * Authors
 *               - Paul Crow
 */
const storage = require('./persistedStorage');
const axios = require('axios');

const router = require('react-router');

axios.interceptors.response.use((response) => {
  return response;
}, function (error) {
  // Do something with response error
  if (error.response.status === 401) {
      console.log('unauthorized, logging out ...');
      storage.remove(storage.Keys.JWT);
      router.replace('/login');
  }
  return Promise.reject(error.response);
});

export const client = function(headers) {
  const reqHeaders = {};
  if (headers) {
    const headerKeys = Object.keys(headers);
    headerKeys.forEach(key => reqHeaders[key] = headers[key])
  }
  const baseUrl = window.location.origin + '/api';
  const token = storage.get(storage.Keys.JWT);
  if (token && token.length > 0) {
    reqHeaders['Authorization'] = 'Bearer ' + token
    return axios.create({
      baseURL: baseUrl,
      headers: reqHeaders,
    })
  }
  return axios.create({
    baseURL: baseUrl,
    headers: reqHeaders,
  });
}

export const clientNoAuthHeader = function(headers) {
  const reqHeaders = {};
  if (headers) {
    const headerKeys = Object.keys(headers);
    headerKeys.forEach(key => reqHeaders[key] = headers[key])
  }
  const baseUrl = window.location.origin + '/api';  
  return axios.create({
    baseURL: baseUrl,
    headers: reqHeaders,
  });
}
