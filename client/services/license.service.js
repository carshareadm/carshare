/**
 * Project       - ShaCar
 * Team          - Group 3 Carshare
 * Last Modified - 2018/05/25
 * Authors
 *               - Paul Crow
 */
import * as http from '../util/http';

export const updateImageDetails = function(licenseId, imageId) {
  return http.client().put('/license/'+licenseId+'/image', {imageId: imageId});
};