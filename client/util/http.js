const storage = require('./persistedStorage');
const axios = require('axios');

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