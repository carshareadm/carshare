/**
 * Project       - ShaCar
 * Team          - Group 3 Carshare
 * Last Modified - 2018/05/26
 * Authors
 *               - Paul Crow
 */
export const generate = () => {
  const random = Math.floor(100000 + Math.random() * 900000);
  return '' + random;
};