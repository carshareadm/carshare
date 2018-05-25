/**
 * Project       - ShaCar
 * Team          - Group 3 Carshare
 * Last Modified - 2018/05/26
 * Authors
 *               - Paul Crow
 */
const addHours = function (date, hours) {
  const newDate = new Date(date.getTime() + (hours * 60 * 60 * 1000));
  return newDate;
}

const getDateInSeconds = function (date) {
  return date.getTime() / 1000;
}

module.exports = {
  addHours: addHours,
  getDateInSeconds: getDateInSeconds,
}