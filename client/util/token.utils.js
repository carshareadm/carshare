import * as storage from './persistedStorage';

const token = () => {
  const t = storage.get(storage.Keys.JWT);
  return !t ? null : JSON.parse(atob(t.split('.')[1]));
};

const isExpired = (t) => {
  const exp = (+t['exp']) * 1000;
  const now = new Date();
  const expDate = new Date(exp);
  return expDate.getTime() < now.getTime();
};

const isAdmin = (t) => {
  return t['isAdmin'] && t['isAdmin'] === true;
};

const setToken = (t) => {
  storage.set(storage.Keys.JWT, t);
};

const clearToken = () => {
  storage.remove(storage.Keys.JWT);
};

module.exports = {
  token: token,
  isExpired: isExpired,
  isAdmin: isAdmin,
  setToken: setToken,
  clearToken: clearToken,
};