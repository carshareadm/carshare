// we want to save the auth JWT so it works between refreshes,
// and also between tabs and windows if local storage is available
//var storage = window.localStorage || window.sessionStorage;

export const get = function(key) {
  const val = window.localStorage.getItem(key);
  return val || null;
}

export const set = function(key, val) {
  window.localStorage.setItem(key, val);
}

export const remove = function(key) {
  window.localStorage.removeItem(key);
}

export const Keys = {
  JWT: 'JWT',
};
